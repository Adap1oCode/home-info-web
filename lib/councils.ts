import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { tracker } from "@/config/site";

/**
 * Council data for the /councils pages.
 *
 * ── The publishing rule ─────────────────────────────────────────────────────
 * We only render a field when we can say where it came from. The API returns
 * everything it holds, but values whose per-field provenance is unknown arrive
 * under `unverified` and are NOT rendered by default. To publish one, add it to
 * PUBLISHABLE below with an explicit source — that single edit is the editorial
 * decision, and it is deliberately hard to make by accident.
 *
 * See docs/council-pages-data-audit.md for why: `councils.seed_source` is a
 * row-level column overwritten on every update, so it cannot attribute an
 * individual field.
 */

export type PublicCouncil = {
  slug: string;
  name: string;
  short_name: string | null;
  ons_code: string | null;
  council_type: string | null;
  region: string | null;
  county: string | null;
  website_url: string | null;
  planning_portal_url: string | null;
  unverified: {
    hmlr_migration_status: string | null;
    water_supplier: string | null;
    sewerage_undertaker: string | null;
    planning_authority: string | null;
    highway_authority: string | null;
    building_control_authority: string | null;
    lead_local_flood_authority: string | null;
    personal_search_available: boolean | null;
  };
};

/**
 * Fields from `unverified` that have been cleared for publication, each with
 * the source we would cite if challenged. Empty by design.
 *
 * Do not add an entry here without being able to complete the `source` string
 * truthfully.
 */
export const PUBLISHABLE: Partial<
  Record<keyof PublicCouncil["unverified"], { label: string; source: string }>
> = {
  // Example, once per-field provenance exists:
  // hmlr_migration_status: { label: "Local land charges", source: "HM Land Registry migration schedule" },
};

/* --------------------------------------------------------------- fetching */

/**
 * Every council we hold, including ones that no longer exist.
 * Most callers want getPublishableCouncils() instead.
 */
export async function getAllCouncils(): Promise<PublicCouncil[]> {
  try {
    const res = await fetch(`${tracker.apiUrl}/api/public/councils`, {
      next: { revalidate: tracker.revalidate },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { councils?: PublicCouncil[] };
    return json.councils ?? [];
  } catch {
    return [];
  }
}

/**
 * Councils we will publish a page for.
 *
 * The gate is simple: it must match a **current** ONS local authority district
 * (LAD24). That single rule does a lot of work — a council abolished in the
 * 2020–2023 reorganisations has no LAD24 code, so it drops out automatically
 * rather than needing a hand-maintained exclusion list.
 *
 * Of the 16 in our table without a code: 11 are genuinely abolished (the North
 * Yorkshire and Somerset mergers), 3 are name mismatches worth fixing in the
 * database, and 2 are national park authorities which are not local authority
 * districts at all.
 *
 * Worth knowing: a competitor generating the same kind of pages publishes 25
 * authorities that were abolished between 2020 and 2023 — Allerdale, Carlisle,
 * Aylesbury Vale, Corby and so on. Being current is a low bar that is easy to
 * fail if the source list is seeded once and never refreshed.
 */
export async function getPublishableCouncils(): Promise<PublicCouncil[]> {
  const all = await getAllCouncils();
  const publishable = all.filter((c) => Boolean(c.ons_code));

  /*
   * Fail the build rather than quietly shipping an empty site.
   *
   * getAllCouncils() returns [] when the reseller API is unreachable, which is
   * the right behaviour at runtime — a page degrades instead of erroring. At
   * BUILD time it is the opposite: a deploy during an API outage would emit
   * zero council pages and a sitemap missing 300+ URLs, telling search engines
   * the whole section had been deleted. Recovering from mass deindexing takes
   * far longer than fixing a red build.
   *
   * Caught this the hard way: a build with the API down produced 16 pages
   * instead of 350, and reported success.
   */
  if (
    publishable.length === 0 &&
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_EMPTY_COUNCILS !== "1"
  ) {
    throw new Error(
      "No councils returned from the performance API — refusing to build a site with no " +
        "council pages. Check that PERFORMANCE_API_URL is reachable " +
        `(currently ${tracker.apiUrl}). To build anyway, set ALLOW_EMPTY_COUNCILS=1.`,
    );
  }

  return publishable;
}

/** @deprecated prefer getPublishableCouncils — kept so callers fail loudly, not silently. */
export const getCouncils = getPublishableCouncils;

export async function getCouncil(slug: string): Promise<PublicCouncil | null> {
  const all = await getCouncils();
  return all.find((c) => c.slug === slug) ?? null;
}

/* ------------------------------------------------------- picker payload */

/**
 * The minimal shape the council picker widget needs on the client.
 *
 * Deliberately small: the full council payload is ~230 KB, which has no place
 * in a browser bundle. This is name, slug, region and — only for the councils
 * that reach the reporting threshold — four numbers. Around 25 KB for all 318.
 */
export type PickerCouncil = {
  slug: string;
  name: string;
  region: string | null;
  stat: { avg: number; quickestHours: number; longest: number; n: number } | null;
};

export async function getPickerCouncils(): Promise<PickerCouncil[]> {
  const { getPerformance, shortCouncil } = await import("@/lib/performance");
  const [councils, perf] = await Promise.all([getPublishableCouncils(), getPerformance()]);

  // The performance API names councils from order data, so match on the
  // normalised short name rather than expecting an exact string equality.
  const stats = new Map(
    (perf?.councils ?? []).map((c) => [shortCouncil(c.council).toLowerCase(), c]),
  );

  return councils.map((c) => {
    const s = stats.get(shortCouncil(c.name).toLowerCase());
    return {
      slug: c.slug,
      name: c.name,
      region: c.region,
      stat: s
        ? {
            avg: s.average_work_days,
            quickestHours: s.quickest_hours,
            longest: s.longest_work_days,
            n: s.n,
          }
        : null,
    };
  });
}

/* -------------------------------------------------------------- boundaries */

type Boundary = { name: string; path: string; viewBox: string };
let boundaryCache: Record<string, Boundary> | null = null;

/**
 * Boundaries come from the ONS Open Geography Portal under the Open Government
 * Licence v3 — not Ordnance Survey, whose API terms permit a live in-app view
 * only and forbid reproduction (see E:\Dev\home-info\docs\os\licensing-position.md).
 *
 * Read from disk rather than imported, so the 0.35 MB file never enters a
 * client bundle. Regenerate with: node scripts/fetch-council-boundaries.mjs
 */
export async function getBoundary(onsCode: string | null): Promise<Boundary | null> {
  if (!onsCode) return null;
  if (!boundaryCache) {
    try {
      const raw = await readFile(join(process.cwd(), "data", "council-boundaries.json"), "utf8");
      boundaryCache = JSON.parse(raw) as Record<string, Boundary>;
    } catch {
      boundaryCache = {};
    }
  }
  return boundaryCache[onsCode] ?? null;
}

export const BOUNDARY_ATTRIBUTION =
  "Contains OS data © Crown copyright and database right 2024. Source: Office for National Statistics licensed under the Open Government Licence v3.0.";

/* --------------------------------------------------------------- helpers */

const TYPE_LABELS: Record<string, string> = {
  district: "District council",
  unitary: "Unitary authority",
  city_unitary: "Unitary authority",
  metropolitan_borough: "Metropolitan borough",
  london_borough: "London borough",
};

export const councilTypeLabel = (t: string | null) =>
  t ? (TYPE_LABELS[t] ?? t.replace(/_/g, " ")) : null;

/** Groups councils by region for the index page, regions alphabetical. */
export function groupByRegion(councils: PublicCouncil[]) {
  const map = new Map<string, PublicCouncil[]>();
  for (const c of councils) {
    const key = c.region ?? "Other";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(c);
  }
  return Array.from(map.entries())
    .map(([region, list]) => ({ region, councils: list }))
    .sort((a, b) => (a.region === "Other" ? 1 : b.region === "Other" ? -1 : a.region.localeCompare(b.region)));
}

import { NextRequest, NextResponse } from "next/server";

import { getAllCouncils } from "@/lib/councils";
import { getPerformance } from "@/lib/performance";
import { tracker } from "@/config/site";

/**
 * Postcode → council, water company, and our measured turnaround there.
 *
 * ── Why this sits on the marketing site rather than calling Elan directly ───
 * The platform's /api/elan/template answers with council, water company AND
 * pricing. The pricing must never reach a browser: a sell price is
 * `council × price band`, the band belongs to the customer, and the bands are
 * named after individual firms (INFOTRACK, ACUMEN, SEARCHES UK …). Publishing
 * any of them would put a named client's negotiated rate on a public page, and
 * there is no list band to fall back on — 36 of 55 customer profiles have no
 * band set at all.
 *
 * So this route is the boundary. It reads the two fields it is allowed to
 * publish and never puts the rest into its own response. `products` and
 * `packages` are not destructured, not logged, not passed through.
 *
 * ── Migration note ──────────────────────────────────────────────────────────
 * /api/elan/template is currently reachable unauthenticated from the open
 * internet, which is how this works today and is also a problem in its own
 * right. When it is locked down, the right shape is a purpose-built
 * /api/public/property-lookup on the platform following the same pattern as
 * /api/public/performance — allowlisted reseller, CORS, cached. Only the fetch
 * below changes; the response contract here stays the same.
 */

export const revalidate = 86_400;

/** Loose UK postcode shape. Rejects obvious junk before spending an API call. */
const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export type PropertyLookup = {
  postcode: string;
  /** `slug` is null when the council has no published page to link to. */
  council: { name: string; slug: string | null } | null;
  waterCompany: string | null;
  /** Present only for councils inside the tracker's top 20 by volume. */
  turnaround: { completed: number; quickestHours: number; averageWorkDays: number } | null;
  source: "elan" | "postcodes.io";
};

/**
 * Resolve Elan's council name to a real /councils page.
 *
 * Slugifying the name looks like it works and does not: Elan returns
 * "Westminster (London Borough of)", which slugifies to
 * "westminster-(london-borough-of)" and 404s — the page is at "westminster".
 * So the name is matched against the published council list and the slug comes
 * from there. No match means no link, rather than a link to nothing.
 */
async function resolveSlug(name: string): Promise<string | null> {
  const councils = await getAllCouncils().catch(() => []);
  const norm = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const target = norm(name);

  const exact = councils.find((c) => norm(c.name) === target);
  if (exact) return exact.slug;

  /* Elan and the register disagree on suffixes often enough to be worth a
     second pass — "Rochdale" against "Rochdale Metropolitan Borough Council". */
  const loose = councils.find((c) => {
    const n = norm(c.name);
    return n.startsWith(target + " ") || target.startsWith(n + " ");
  });
  return loose?.slug ?? null;
}

function normalise(raw: string): string {
  const c = raw.toUpperCase().replace(/\s+/g, "");
  return `${c.slice(0, -3)} ${c.slice(-3)}`.trim();
}

async function fromElan(postcode: string) {
  const url = new URL("/api/elan/template", tracker.apiUrl);
  url.searchParams.set("postcode", postcode);
  url.searchParams.set("property_type", "residential");

  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) return null;

  /* Read only the two publishable fields. Deliberately not `const { products,
     packages, ...rest }` — nothing else enters this scope. */
  const payload = (await res.json()) as { local_authority?: unknown; water_company?: unknown };
  const council = typeof payload.local_authority === "string" ? payload.local_authority.trim() : "";
  const water = typeof payload.water_company === "string" ? payload.water_company.trim() : "";
  if (!council) return null;

  return { council, water: water || null };
}

/** Council only — postcodes.io does not know about water undertakers. */
async function fromPostcodesIo(postcode: string) {
  const res = await fetch(
    `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode.replace(/\s+/g, ""))}`,
    { next: { revalidate } },
  );
  if (!res.ok) return null;
  const body = (await res.json()) as { result?: { admin_district?: string } };
  const council = body.result?.admin_district?.trim();
  return council ? { council, water: null } : null;
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("postcode")?.trim() ?? "";
  if (!POSTCODE.test(raw)) {
    return NextResponse.json({ error: "That does not look like a UK postcode." }, { status: 400 });
  }
  const postcode = normalise(raw);

  let hit = await fromElan(postcode).catch(() => null);
  let source: PropertyLookup["source"] = "elan";
  if (!hit) {
    hit = await fromPostcodesIo(postcode).catch(() => null);
    source = "postcodes.io";
  }

  if (!hit) {
    return NextResponse.json(
      { error: "We could not place that postcode. Send it to us and we will look it up by hand." },
      { status: 404 },
    );
  }

  /* Turnaround comes from the same payload the tracker publishes, so the figure
     here can never disagree with the figure on that page. Only the top 20
     councils by volume are in it; everywhere else this is simply absent, which
     the panel handles rather than inventing a number. */
  const perf = await getPerformance().catch(() => null);
  const stat = perf?.councils.find((c) => c.council.toLowerCase() === hit!.council.toLowerCase());

  const body: PropertyLookup = {
    postcode,
    council: { name: hit.council, slug: await resolveSlug(hit.council) },
    waterCompany: hit.water,
    turnaround: stat
      ? {
          completed: stat.n,
          quickestHours: stat.quickest_hours,
          averageWorkDays: stat.average_work_days,
        }
      : null,
    source,
  };

  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}

import { tracker } from "@/config/site";

/**
 * Mirrors the payload from the reseller platform's public endpoint:
 *   E:\Dev\home-info\src\app\api\public\performance\route.ts
 *
 * That endpoint returns AGGREGATES ONLY — no order-level or customer data.
 *
 * Deliberately absent: any single blended turnaround figure across councils.
 * compute.ts refuses to produce one ("blended average banned") because
 * averaging a fast council with a slow one describes neither. Do not derive it
 * here either.
 */
/**
 * One council's turnaround distribution, mirroring compute.ts.
 *
 * Everything suffixed `_work_days` is on the same working-day clock and is safe
 * to show side by side. `quickest_hours` is NOT — it is elapsed wall-clock time,
 * so a "24 min" quickest beside a "13.7 day" average is two different clocks
 * presented as one scale. Use `quickest_work_days` when you need a low end.
 *
 * Publish p10..p90 as the range rather than min..max:
 *  - min is not a best case. 12% of orders score 0 working days, and an order
 *    completed on a Saturday scores 0 by construction. Liverpool's min is 0
 *    against a median of 13.
 *  - max is not comparable between councils — it grows with n, and it is usually
 *    a single file. Durham's p90 is 12 days; its max is 43, on n=34.
 */
export type CouncilStat = {
  council: string;
  n: number;
  /** Elapsed clock hours of the quickest order. Different clock — see above. */
  quickest_hours: number;
  /** Mean. Always present. */
  average_work_days: number;
  longest_work_days: number;

  /*
   * The percentile fields below are NOT in the live payload yet.
   *
   * They were typed as required ahead of the compute.ts change that produces
   * them, so TypeScript believed in them, the council pages called
   * .toFixed(1) on median_work_days, and every top-20 council page shipped
   * with "undefined" in three of its four tiles — 41 of them on Rochdale
   * alone — until a build finally crashed on Oldham.
   *
   * Optional until the API sends them. Anything reading these must check
   * first; hasPercentiles() below is the guard.
   */
  quickest_work_days?: number;
  /** 1 in 10 back this fast or faster — the honest "best case". */
  p10_work_days?: number;
  /** The typical file. Preferred headline: one bad order cannot move it. */
  median_work_days?: number;
  /** 9 in 10 back by here — the honest "worst case". */
  p90_work_days?: number;
};

/**
 * True when the API has sent the percentile fields.
 *
 * Callers render the richer best/typical/worst tiles when this passes and fall
 * back to the mean, the quickest and the longest when it does not — so the
 * pages upgrade on their own the day compute.ts starts sending them.
 */
export function hasPercentiles(
  s: CouncilStat,
): s is CouncilStat & { p10_work_days: number; median_work_days: number; p90_work_days: number } {
  return (
    typeof s.p10_work_days === "number" &&
    typeof s.median_work_days === "number" &&
    typeof s.p90_work_days === "number"
  );
}

export type ProductStat = { code: string; name: string; orders: number; share_pct: number };
export type MonthStat = { month: string; label: string; received: number; partial: boolean };

export type PerformancePayload = {
  reseller: { id: string; name: string };
  as_of: string;
  window_days: number;
  /** Completed orders held out of the turnaround figures, but still counted in the KPIs. */
  excluded_from_turnaround: number;
  kpis: {
    completed_week: number;
    completed_month: number;
    completed_quarter: number;
    councils_served: number;
    within_5_days_of_top: number;
    top_count: number;
  };
  fastest: { council: string; minutes: number } | null;
  councils: CouncilStat[];
  products: ProductStat[];
  monthly: MonthStat[];
};

/**
 * Returns null when the API is unreachable. Every consumer must handle that —
 * the site should degrade to "figures are refreshing" rather than showing a
 * zero, which would read as a real measurement.
 */
export async function getPerformance(): Promise<PerformancePayload | null> {
  try {
    const res = await fetch(
      `${tracker.apiUrl}/api/public/performance?reseller=${tracker.resellerSlug}`,
      { next: { revalidate: tracker.revalidate } },
    );
    if (!res.ok) return null;
    return (await res.json()) as PerformancePayload;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------ formatting */

/**
 * Turnaround band. Thresholds match the tracker dashboard.
 *
 * Feed this the MEDIAN, not the mean. Banding on the mean lets one dragged file
 * recolour a whole council — Durham's median is 10 working days and its mean is
 * 11.8, entirely because 3 of its 34 orders sit past the 90th percentile.
 */
export function band(medianWorkDays: number) {
  if (medianWorkDays <= 3) return { key: "fast", label: "3 days or under", color: "var(--color-band-fast)" } as const;
  if (medianWorkDays <= 7) return { key: "good", label: "4–7 days", color: "var(--color-band-good)" } as const;
  if (medianWorkDays <= 14) return { key: "watch", label: "8–14 days", color: "var(--color-band-watch)" } as const;
  return { key: "slow", label: "15 days or more", color: "var(--color-band-slow)" } as const;
}

export function formatQuickest(hours: number): string {
  if (hours < 1) {
    const m = Math.round(hours * 60);
    return `${m} min`;
  }
  if (hours < 48) {
    const h = Math.round(hours);
    return `${h} ${h === 1 ? "hr" : "hrs"}`;
  }
  const d = Math.round(hours / 24);
  return `${d} ${d === 1 ? "day" : "days"}`;
}

/**
 * Picks a representative spread rather than the top N.
 *
 * The API returns councils sorted fastest-first, so taking the first five would
 * show only our best results while the copy alongside claims we publish the
 * slow ones too. This keeps the fastest few and always includes the slowest, so
 * the section says what it shows.
 */
/**
 * The handful of councils shown on the homepage, by volume.
 *
 * This used to take the four fastest plus the single slowest, which sounds
 * balanced and is not: it is a flattering sample with one alibi attached. On
 * live data it showed Salford (62 completed searches) and Blackpool (98) while
 * dropping Rochdale — the second busiest council we serve, at 200 — purely
 * because three others happened to be quicker. Someone scanning this is looking
 * for the council their case is in, and that is a question about volume.
 *
 * No band is engineered in or out. On current data the busiest five span 0.8 to
 * 21.6 working days on their own, which is a fairer picture than any hand-picked
 * spread would be — and the full set is a click away on the tracker.
 *
 * `excludeCouncil` keeps the dial's council out of the rows beneath it.
 */
/** The median where we have it, the mean where we do not. */
export const typical = (c: CouncilStat) => c.median_work_days ?? c.average_work_days;

export function representativeCouncils(
  councils: CouncilStat[],
  count = 5,
  excludeCouncil?: string,
): CouncilStat[] {
  return [...councils]
    .filter((c) => c.council !== excludeCouncil)
    .sort((a, b) => b.n - a.n)
    .slice(0, count)
    /* Fastest first: the rows read as a ladder rather than an unsorted list.
       Sorts on the median where the API sends one and the mean where it does
       not, so this keeps working either side of the percentile rollout. */
    .sort((a, b) => typical(a) - typical(b) || (a.p90_work_days ?? a.longest_work_days) - (b.p90_work_days ?? b.longest_work_days));
}

export function shortCouncil(name: string): string {
  return name
    .replace(/\bMetropolitan Borough Council\b/, "MBC")
    .replace(/\bBorough Council\b/, "BC")
    .replace(/\bCity Council\b/, "")
    .replace(/\bCounty Council\b/, "")
    .replace(/\bCouncil\b/, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const formatInt = (n: number) => n.toLocaleString("en-GB");

/**
 * The on-page methodology note. Generated from config so it can never drift
 * from the constants it describes.
 */
export function methodologyNote(): string {
  return (
    `Working days (weekends and bank holidays excluded), from order placed to completed, ` +
    `over the last ${tracker.windowDays} days. Typical is the median — half of searches ` +
    `come back faster. Best and worst case are the 10th and 90th percentiles, so eight ` +
    `searches in ten land between them; we publish those rather than our single fastest ` +
    `and slowest, which describe one file each. Councils with fewer than ` +
    `${tracker.minCompletionsPerCouncil} completed searches are not shown. ` +
    `Top ${tracker.topCouncils} by volume. Updated daily.`
  );
}

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
export type CouncilStat = {
  council: string;
  n: number;
  quickest_hours: number;
  average_work_days: number;
  longest_work_days: number;
};

export type ProductStat = { code: string; name: string; orders: number; share_pct: number };
export type MonthStat = { month: string; label: string; received: number; partial: boolean };

export type PerformancePayload = {
  reseller: { id: string; name: string };
  as_of: string;
  window_days: number;
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

/** Turnaround band. Thresholds match the tracker dashboard. */
export function band(averageWorkDays: number) {
  if (averageWorkDays <= 3) return { key: "fast", label: "3 days or under", color: "var(--color-band-fast)" } as const;
  if (averageWorkDays <= 7) return { key: "good", label: "4–7 days", color: "var(--color-band-good)" } as const;
  if (averageWorkDays <= 14) return { key: "watch", label: "8–14 days", color: "var(--color-band-watch)" } as const;
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
export function representativeCouncils(councils: CouncilStat[], count = 5): CouncilStat[] {
  if (councils.length <= count) return councils;
  const fastest = councils.slice(0, count - 1);
  const slowest = councils[councils.length - 1];
  return [...fastest, slowest];
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
    `over the last ${tracker.windowDays} days. Councils with fewer than ` +
    `${tracker.minCompletionsPerCouncil} completed searches are not shown. ` +
    `Top ${tracker.topCouncils} by volume. Updated daily.`
  );
}

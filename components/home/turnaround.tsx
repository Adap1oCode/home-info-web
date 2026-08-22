import Link from "next/link";

import { routes, tracker } from "@/config/site";
import {
  band,
  formatInt,
  formatQuickest,
  methodologyNote,
  representativeCouncils,
  shortCouncil,
  type CouncilStat,
  type PerformancePayload,
} from "@/lib/performance";

/**
 * The showpiece, and one of only two dark sections on the page.
 *
 * Shows per-council figures only. The busiest council gets a dial; the rest are
 * rows. No blended average is derived anywhere — see lib/performance.ts.
 */
export default function Turnaround({ data }: { data: PerformancePayload | null }) {
  const councils = data?.councils ?? [];
  // The dial features the highest-volume council, which is the most representative sample.
  const busiest = councils.length ? [...councils].sort((a, b) => b.n - a.n)[0] : null;
  // Fastest few plus the slowest, so the section shows what the copy claims.
  const rows = representativeCouncils(councils, 5);
  const worst = Math.max(...rows.map((c) => c.average_work_days), 1);

  return (
    /*
     * Full-bleed and square-cornered, unlike the inset rounded sections either
     * side. This is the proof section — letting it run edge to edge, like the
     * hero, marks it as the spine of the page rather than one more card.
     */
    <section
      id="turnaround"
      className="section-y overflow-hidden bg-ink text-white"
    >
      <div className="relative mx-auto max-w-[1240px] px-17 max-lg:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-95 -right-65 h-205 w-205 rounded-full"
          style={{ background: "radial-gradient(circle, rgb(52 140 220 / 0.42), transparent 62%)" }}
        />

        <div className="relative mb-18 max-w-[54rem] max-lg:mb-12">
          <span className="eyebrow bg-white/10 text-white">
            <span className="pip bg-brand-light" />
            Live turnaround tracker
          </span>
          <h2 className="mt-6 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
            Their published target, next to what we actually achieved.
          </h2>
          <p className="mt-6 max-w-[40em] text-[19px] leading-relaxed text-white/65">
            Every local authority publishes a target. We measure every search we complete — order
            placed to delivered, in working days — and publish the quickest, the average and the
            longest for each council, including the ones where we are slower than we would like.
          </p>
        </div>

        {!data ? (
          <p className="relative rounded-panel border border-white/12 bg-white/5 p-10 text-white/70">
            Our turnaround figures are refreshing. They will be back shortly.
          </p>
        ) : (
          <div className="relative grid grid-cols-[340px_1fr] items-start gap-10 max-[1080px]:grid-cols-1">
            {busiest && <Dial council={busiest} />}

            <div>
              <ul className="list-none">
                {rows.map((c) => (
                  <CouncilRow key={c.council} c={c} worst={worst} />
                ))}
              </ul>

              <div className="mt-11 flex flex-wrap items-center gap-3">
                <Link
                  href={routes.councils}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-brand-light"
                >
                  All {formatInt(data.kpis.councils_served)} councils <span aria-hidden>&rarr;</span>
                </Link>
                {/* "Council Watch" and "How we measure" pointed at /turnaround/*,
                    which was never built. The live tracker is the real page. */}
                <Link
                  href={routes.tracker}
                  className="inline-flex items-center rounded-full border-[1.5px] border-white/30 px-7 py-4 text-[15px] font-semibold transition hover:border-white hover:bg-white/8"
                >
                  Open the live tracker
                </Link>
                <p className="ml-auto max-w-[30em] text-[13px] leading-relaxed text-white/40">
                  {methodologyNote()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Arc showing one council's average against the tracker's slowest band. */
function Dial({ council }: { council: CouncilStat }) {
  const R = 90;
  const C = 2 * Math.PI * R;
  // Scale against 20 working days — beyond that the arc simply reads as full.
  const pct = Math.min(council.average_work_days / 20, 1);
  const b = band(council.average_work_days);

  return (
    <div className="rounded-panel border border-white/10 bg-white/5 p-9 text-center max-[1080px]:max-w-100">
      <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-white/50">
        Busiest authority
      </p>
      <p className="mt-2 font-display text-[24px] font-semibold tracking-[-0.028em]">
        {shortCouncil(council.council)}
      </p>

      <div className="relative mx-auto mt-6 h-54 w-54">
        <svg width="216" height="216" viewBox="0 0 216 216" className="-rotate-90">
          <circle cx="108" cy="108" r={R} fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="15" />
          <circle
            cx="108"
            cy="108"
            r={R}
            fill="none"
            stroke={b.color}
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
          />
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <span className="font-display text-[56px] leading-none font-bold tracking-[-0.05em]" style={{ color: b.color }}>
            {council.average_work_days.toFixed(1)}
          </span>
          <span className="mt-1.5 text-[11.5px] tracking-[0.09em] text-white/50">WORKING DAYS</span>
        </div>
      </div>

      <p className="mt-6 border-t border-white/14 pt-5.5 text-[14px] leading-relaxed text-white/60">
        Quickest <b className="text-white">{formatQuickest(council.quickest_hours)}</b> &middot; longest{" "}
        <b className="text-white">{council.longest_work_days.toFixed(0)} days</b>
        <br />
        Based on <b className="text-white">{formatInt(council.n)}</b> completed searches
      </p>
    </div>
  );
}

function CouncilRow({ c, worst }: { c: CouncilStat; worst: number }) {
  const b = band(c.average_work_days);
  return (
    <li>
      <Link
        href={`/councils/${encodeURIComponent(c.council.toLowerCase().replace(/\s+/g, "-"))}`}
        className="mb-3 grid grid-cols-[1.4fr_0.8fr_1.5fr_auto] items-center gap-6 rounded-full bg-white/5 px-7.5 py-5 transition hover:translate-x-1 hover:bg-white/10 max-[820px]:grid-cols-[1fr_auto] max-[820px]:gap-x-4 max-[820px]:gap-y-2.5 max-[820px]:rounded-panel"
      >
        <span className="font-display text-[18px] font-semibold tracking-[-0.025em]">
          {shortCouncil(c.council)}
          <span className="mt-0.5 block font-sans text-[11.5px] font-normal tracking-normal text-white/40">
            {formatInt(c.n)} completed searches
          </span>
        </span>

        <span className="text-[13.5px] text-white/45 max-[820px]:order-4 max-[820px]:col-span-full">
          Longest {c.longest_work_days.toFixed(0)} days
        </span>

        <span className="flex items-center gap-3.5 max-[820px]:order-3 max-[820px]:col-span-full">
          <span className="h-[7px] min-w-17.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full rounded-full"
              style={{ width: `${Math.max((c.average_work_days / worst) * 100, 6)}%`, background: b.color }}
            />
          </span>
          <span className="font-display text-[19px] font-bold tracking-[-0.03em] whitespace-nowrap" style={{ color: b.color }}>
            {c.average_work_days.toFixed(1)}d
          </span>
        </span>

        <span
          className="rounded-full px-3.5 py-1.5 text-[11.5px] font-bold tracking-[0.04em] whitespace-nowrap"
          style={{ background: `color-mix(in srgb, ${b.color} 16%, transparent)`, color: b.color }}
        >
          Quickest {formatQuickest(c.quickest_hours)}
        </span>
      </Link>
    </li>
  );
}

export const trackerConfig = tracker;

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ----------------------------- data contract ----------------------------- */

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

/* ------------------------------- helpers ---------------------------------- */

const SORA = "var(--font-sora)";

function shortCouncil(name: string): string {
  return name
    .replace(/\bMetropolitan Borough Council\b/, "MBC")
    .replace(/\bBorough Council\b/, "BC")
    .replace(/\bCity Council\b/, "")
    .replace(/\bCounty Council\b/, "")
    .replace(/\bCouncil\b/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function fmtQuickest(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  if (hours < 48) return `${Math.round(hours)} hrs`;
  return `${Math.round(hours / 24)} days`;
}

function band(avg: number) {
  if (avg <= 3) return { key: "fast", color: "#10b981", soft: "#d1fae5", label: "≤ 3 days" };
  if (avg <= 7) return { key: "good", color: "#4C96DE", soft: "#dbeafe", label: "4–7 days" };
  if (avg <= 14) return { key: "mid", color: "#f59e0b", soft: "#fef3c7", label: "8–14 days" };
  return { key: "slow", color: "#ef4444", soft: "#fee2e2", label: "15+ days" };
}

/* animated count-up, respects reduced-motion + only when scrolled into view */
function useCountUp(target: number, active: boolean, duration = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(target * eased);
      if (k < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

/* fire `active` once the element scrolls into view */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/* -------------------------------- KPIs ------------------------------------ */

function Kpi({
  value,
  suffix,
  decimals = 0,
  label,
  sub,
  active,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  sub: string;
  active: boolean;
}) {
  const v = useCountUp(value, active);
  const display =
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-GB");
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-[#4C96DE]/50">
      <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#4C96DE]/20 blur-2xl transition-opacity group-hover:opacity-80" />
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-white md:text-5xl" style={{ fontFamily: SORA }}>
          {display}
        </span>
        {suffix ? (
          <span className="text-xl font-semibold text-[#7fb6ec]" style={{ fontFamily: SORA }}>
            {suffix}
          </span>
        ) : null}
      </div>
      <div className="mt-2 text-sm font-medium text-white">{label}</div>
      <div className="text-xs text-slate-400">{sub}</div>
    </div>
  );
}

/* ---------------------------- council leaderboard ------------------------- */

function Leaderboard({ councils }: { councils: CouncilStat[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [q, setQ] = useState("");
  const axisMax = Math.max(21, Math.ceil(Math.max(...councils.map((c) => c.average_work_days))));

  const rows = councils.filter((c) => c.council.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <div ref={ref}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for a council…"
            className="w-64 rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#4C96DE] focus:ring-4 focus:ring-[#4C96DE]/10"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 fill-gray-400" viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 111.41-1.41l4.35 4.34-1.42 1.42-4.34-4.35zM8 14a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
          {[
            { c: "#10b981", t: "≤3d" },
            { c: "#4C96DE", t: "4–7d" },
            { c: "#f59e0b", t: "8–14d" },
            { c: "#ef4444", t: "15d+" },
          ].map((l) => (
            <span key={l.t} className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.c }} />
              {l.t} avg
            </span>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {rows.map((c, i) => {
          const b = band(c.average_work_days);
          const w = Math.min((c.average_work_days / axisMax) * 100, 100);
          const longPos = Math.min((c.longest_work_days / axisMax) * 100, 100);
          return (
            <div
              key={c.council}
              className="grid grid-cols-[1.4rem_9rem_1fr_5rem] items-center gap-3 py-3 sm:grid-cols-[1.6rem_12rem_1fr_6rem] sm:gap-4"
            >
              <div className="text-right text-xs font-semibold text-gray-300" style={{ fontFamily: SORA }}>
                {i + 1}
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-gray-900" title={c.council}>
                  {shortCouncil(c.council)}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current">
                      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
                    </svg>
                    {fmtQuickest(c.quickest_hours)}
                  </span>
                  <span className="text-[10px] text-gray-400">{c.n.toLocaleString()} searches</span>
                </div>
              </div>

              <div className="relative h-7">
                <div className="absolute inset-y-0 left-0 right-0 my-auto h-2.5 rounded-full bg-gray-100" />
                <div
                  className="absolute inset-y-0 left-0 my-auto h-2.5 rounded-full transition-[width] duration-1000 ease-out"
                  style={{
                    width: inView ? `${w}%` : "0%",
                    background: `linear-gradient(90deg, ${b.color}cc, ${b.color})`,
                    transitionDelay: `${i * 45}ms`,
                  }}
                />
                {/* longest marker */}
                <div
                  className="absolute inset-y-0 my-auto h-4 w-[3px] rounded-full bg-gray-300"
                  style={{ left: `calc(${longPos}% - 1.5px)` }}
                  title={`Longest: ${c.longest_work_days} working days`}
                />
              </div>

              <div className="text-right">
                <span className="text-lg font-bold text-gray-900" style={{ fontFamily: SORA }}>
                  {c.average_work_days % 1 ? c.average_work_days.toFixed(1) : c.average_work_days}
                </span>
                <span className="ml-0.5 text-[11px] text-gray-400">days</span>
              </div>
            </div>
          );
        })}
        {rows.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400">No council matches “{q}”.</div>
        )}
      </div>
      <p className="mt-4 text-xs text-gray-400">
        Bar = average working days (fastest first). Grey tick = the single longest we recorded. Lightning badge = the
        quickest. “n” = searches completed.
      </p>
    </div>
  );
}

/* ------------------------------ product donut ----------------------------- */

const DONUT_COLORS = ["#123a5e", "#1f6f8b", "#4C96DE", "#2a9d8f", "#57cc99", "#a7d84f", "#e9c46a", "#cbd5e1"];

function ProductDonut({ products }: { products: ProductStat[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const total = products.reduce((s, p) => s + p.orders, 0);
  const R = 62;
  const C = 2 * Math.PI * R;
  let acc = 0;
  const segs = products.map((p, i) => {
    const frac = p.orders / total;
    const seg = { p, i, frac, offset: acc, color: DONUT_COLORS[i % DONUT_COLORS.length] };
    acc += frac;
    return seg;
  });

  return (
    <div ref={ref} className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
      <div className="relative shrink-0">
        <svg width="170" height="170" viewBox="0 0 170 170" className="-rotate-90">
          <circle cx="85" cy="85" r={R} fill="none" stroke="#eef2f7" strokeWidth="20" />
          {segs.map((s) => (
            <circle
              key={s.p.code}
              cx="85"
              cy="85"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth="20"
              strokeDasharray={`${(inView ? s.frac : 0) * C} ${C}`}
              strokeDashoffset={-s.offset * C}
              style={{ transition: `stroke-dasharray 900ms ease ${s.i * 90}ms` }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: SORA }}>
            {total.toLocaleString()}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-gray-400">searches</span>
        </div>
      </div>
      <ul className="min-w-0 flex-1 space-y-2">
        {segs.map((s) => (
          <li key={s.p.code} className="flex items-center gap-2.5 text-sm">
            <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: s.color }} />
            <span className="min-w-0 flex-1 truncate text-gray-700" title={s.p.name}>
              {s.p.name || s.p.code}
            </span>
            <span className="font-semibold text-gray-900" style={{ fontFamily: SORA }}>
              {s.p.share_pct}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------- volume area ------------------------------ */

function VolumeArea({ monthly }: { monthly: MonthStat[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const W = 520;
  const H = 200;
  const PAD = { t: 16, r: 12, b: 26, l: 12 };
  const max = Math.max(...monthly.map((m) => m.received)) * 1.12;
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const x = (i: number) => PAD.l + (monthly.length === 1 ? iw / 2 : (i / (monthly.length - 1)) * iw);
  const y = (v: number) => PAD.t + ih - (v / max) * ih;

  const pts = monthly.map((m, i) => [x(i), y(m.received)] as const);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0]},${PAD.t + ih} L${pts[0][0]},${PAD.t + ih} Z`;

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="volfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4C96DE" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4C96DE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#volfill)" style={{ opacity: inView ? 1 : 0, transition: "opacity 700ms ease 200ms" }} />
        <path
          d={line}
          fill="none"
          stroke="#1f6f8b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1400,
            strokeDashoffset: inView ? 0 : 1400,
            transition: "stroke-dashoffset 1400ms ease",
          }}
        />
        {monthly.map((m, i) => (
          <g key={m.month}>
            <circle
              cx={x(i)}
              cy={y(m.received)}
              r={i === monthly.length - 1 ? 5 : 3.2}
              fill={i === monthly.length - 1 ? "#4C96DE" : "#1f6f8b"}
              stroke="#fff"
              strokeWidth="2"
              style={{ opacity: inView ? 1 : 0, transition: `opacity 400ms ease ${600 + i * 40}ms` }}
            />
            <text x={x(i)} y={H - 8} textAnchor="middle" className="fill-gray-400 text-[10px]">
              {m.label}
              {m.partial ? "*" : ""}
            </text>
          </g>
        ))}
        {/* peak label */}
        {(() => {
          const peakIdx = monthly.reduce((bi, m, i) => (m.received > monthly[bi].received ? i : bi), 0);
          const p = monthly[peakIdx];
          return (
            <text
              x={x(peakIdx)}
              y={y(p.received) - 10}
              textAnchor="middle"
              className="fill-gray-700 text-[11px] font-semibold"
              style={{ fontFamily: SORA, opacity: inView ? 1 : 0, transition: "opacity 500ms ease 900ms" }}
            >
              {p.received.toLocaleString()}
            </text>
          );
        })()}
      </svg>
      <p className="mt-1 text-xs text-gray-400">Searches received per month. *current month in progress.</p>
    </div>
  );
}

/* --------------------------------- shell ---------------------------------- */

export default function TrackerDashboard({ data }: { data: PerformancePayload }) {
  const hero = useInView<HTMLDivElement>();

  const derived = useMemo(() => {
    const within2w = data.councils.filter((c) => c.average_work_days <= 10).length;
    const monthlyAvg = Math.round(
      data.monthly.filter((m) => !m.partial).reduce((s, m) => s + m.received, 0) /
        Math.max(1, data.monthly.filter((m) => !m.partial).length),
    );
    return { within2w, monthlyAvg };
  }, [data]);

  const asOf = new Date(data.as_of).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      {/* ============================ HERO / PITCH ============================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1826] via-[#16283f] to-[#0d1826] pt-28 pb-16 text-white md:pt-36 md:pb-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 right-0 h-[520px] w-[520px] rounded-full bg-[#4C96DE]/20 blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-[#2a9d8f]/15 blur-[150px]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        <div ref={hero.ref} className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            LIVE PERFORMANCE · UPDATED DAILY
          </div>

          <h1
            className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
            style={{ fontFamily: SORA }}
          >
            Searches back in <span className="text-[#7fb6ec]">minutes</span>,
            <br className="hidden sm:block" /> not weeks.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate-300 md:text-lg">
            Real turnaround times, published council by council and refreshed every day. This is exactly how fast, how
            consistent, and how much we deliver — with nothing hidden.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Kpi
              value={data.kpis.completed_quarter}
              label="Searches completed"
              sub="in the last 90 days"
              active={hero.inView}
            />
            <Kpi
              value={data.fastest ? data.fastest.minutes : 0}
              suffix="min"
              label="Fastest search"
              sub={data.fastest ? shortCouncil(data.fastest.council) : "this quarter"}
              active={hero.inView}
            />
            <Kpi value={data.kpis.councils_served} label="Councils covered" sub="England & Wales" active={hero.inView} />
            <Kpi
              value={derived.monthlyAvg}
              label="Searches a month"
              sub="12-month average"
              active={hero.inView}
            />
          </div>
        </div>
      </section>

      {/* ========================= COUNCIL LEADERBOARD ======================= */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#4C96DE]">Turnaround, council by council</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl" style={{ fontFamily: SORA }}>
              Our {data.kpis.top_count} busiest councils, fastest first
            </h2>
            <p className="mt-3 text-gray-600">
              A blended average would be meaningless — turnaround depends entirely on the local authority. So we publish
              every busy council we work with: the ones that answer in minutes, and the few that take longer.{" "}
              <span className="font-semibold text-gray-900">
                {derived.within2w} of {data.kpis.top_count}
              </span>{" "}
              come back within two working weeks.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-xl shadow-gray-200/60 sm:p-8">
            <Leaderboard councils={data.councils} />
          </div>
        </div>
      </section>

      {/* ===================== PRODUCTS + VOLUME (two-up) ==================== */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#4C96DE]">Everything under one roof</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: SORA }}>
              What we search
            </h3>
            <p className="mb-6 mt-2 text-sm text-gray-600">
              From full regulated local authority searches to drainage, environmental and chancel — one supplier for the
              whole file.
            </p>
            <ProductDonut products={data.products} />
          </div>

          <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2a9d8f]">Trusted at scale</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: SORA }}>
              Thousands of searches, every month
            </h3>
            <p className="mb-6 mt-2 text-sm text-gray-600">
              A steady, growing volume of completed searches — the sign of a supplier that’s established and here for the
              long term.
            </p>
            <VolumeArea monthly={data.monthly} />
          </div>
        </div>
      </section>

      {/* ============================== CTA BAND ============================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1826] via-[#16283f] to-[#0d1826] py-16 text-white md:py-20">
        <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-[#4C96DE]/20 blur-[140px]" />
        <div className="mx-auto w-full max-w-[1180px] px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: SORA }}>
            Fast, transparent, and built to last.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            The numbers on this page update every day from our live order system. Put us to the test on your next file.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/#contact"
              className="rounded-xl bg-[#4C96DE] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4C96DE]/30 transition hover:bg-[#4C96DE]/90"
            >
              Order a search
            </a>
            <a
              href="/faqs"
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              How it works
            </a>
          </div>
          <p className="mt-10 text-xs text-slate-400">
            Turnaround measured in working days (weekends &amp; bank holidays excluded), from order placed to completed
            search returned, over the rolling {data.window_days} days to {asOf}. Completed orders only; councils with
            fewer than 5 searches are excluded.
          </p>
        </div>
      </section>
    </>
  );
}

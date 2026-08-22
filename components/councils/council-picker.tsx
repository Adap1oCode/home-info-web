"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import type { PickerCouncil } from "@/lib/councils";

/**
 * Reusable council turnaround widget.
 *
 * Drop it anywhere a reader might reasonably ask "yes, but how long in MY
 * area?" — guide pages, the turnaround hub, product pages. It takes its data as
 * a prop from a server component, so it never fetches and never shows a
 * loading state.
 *
 * The honest-empty behaviour matters as much as the populated state: a council
 * we have not done enough work in says so, rather than showing a figure drawn
 * from three orders.
 */

const MAX_RESULTS = 7;

function formatQuickest(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  if (hours < 48) {
    const h = Math.round(hours);
    return `${h} ${h === 1 ? "hr" : "hrs"}`;
  }
  const d = Math.round(hours / 24);
  return `${d} ${d === 1 ? "day" : "days"}`;
}

/** Matches the bands used on the tracker and the council pages. */
function bandColour(avg: number): string {
  if (avg <= 3) return "var(--color-band-fast)";
  if (avg <= 7) return "var(--color-band-good)";
  if (avg <= 14) return "var(--color-band-watch)";
  return "var(--color-band-slow)";
}

export default function CouncilPicker({
  councils,
  heading = "How long does it take where you are?",
  intro = "Pick a council and we will show you what we actually measured there.",
}: {
  councils: PickerCouncil[];
  heading?: string;
  intro?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [chosen, setChosen] = useState<PickerCouncil | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    // Prefix matches first — typing "man" should surface Manchester, not
    // every council with "man" somewhere in the middle of its name.
    const starts: PickerCouncil[] = [];
    const contains: PickerCouncil[] = [];
    for (const c of councils) {
      const name = c.name.toLowerCase();
      if (name.startsWith(q)) starts.push(c);
      else if (name.includes(q)) contains.push(c);
      if (starts.length >= MAX_RESULTS) break;
    }
    return [...starts, ...contains].slice(0, MAX_RESULTS);
  }, [query, councils]);

  // Close the listbox on an outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function choose(c: PickerCouncil) {
    setChosen(c);
    setQuery(c.name);
    setOpen(false);
    inputRef.current?.blur();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open || matches.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % matches.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + matches.length) % matches.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = matches[active];
      if (pick) choose(pick);
    }
  }

  if (councils.length === 0) return null;

  return (
    <div
      ref={rootRef}
      className="rounded-hero border border-[#CFE2F5] bg-sky p-8 max-sm:p-6"
      data-widget="council-turnaround"
    >
      <h2 className="font-display text-[21px] leading-snug font-semibold tracking-[-0.025em]">
        {heading}
      </h2>
      <p className="mt-2 max-w-[44em] text-[15px] leading-relaxed text-tx-mid">{intro}</p>

      {/* ------------------------------------------------------- combobox */}
      <div className="relative mt-5">
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search for a council
        </label>
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-tx-low"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>

        <input
          id={`${listId}-input`}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open && matches.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && matches[active] ? `${listId}-opt-${active}` : undefined
          }
          autoComplete="off"
          placeholder="Start typing a council name…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
            if (chosen) setChosen(null);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full rounded-full border-[1.5px] border-mist bg-white py-4 pr-5 pl-12 text-[16px] text-tx placeholder:text-tx-low focus:border-brand focus:ring-2 focus:ring-brand/25 focus:outline-none"
        />

        {open && matches.length > 0 && (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-20 mt-2 max-h-[320px] w-full overflow-auto rounded-card border border-mist bg-white py-2 shadow-[0_24px_48px_-20px_rgb(13_31_51_/_0.35)]"
          >
            {matches.map((c, i) => (
              <li
                key={c.slug}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(c);
                }}
                className={`flex cursor-pointer items-center justify-between gap-4 px-5 py-3 text-[15px] ${
                  i === active ? "bg-sky text-brand-dark" : "text-tx"
                }`}
              >
                <span className="font-medium">{c.name}</span>
                <span className="shrink-0 text-[12px] text-tx-low">
                  {c.stat ? `${c.stat.avg.toFixed(1)} days` : c.region}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --------------------------------------------------------- result */}
      {chosen && (
        <div className="mt-6 rounded-panel border border-mist bg-white p-7 max-sm:p-5">
          <p className="font-display text-[19px] font-semibold tracking-[-0.025em]">{chosen.name}</p>

          {chosen.stat ? (
            <>
              <div className="mt-5 grid grid-cols-4 gap-4 max-[560px]:grid-cols-2">
                <Metric
                  value={chosen.stat.avg.toFixed(1)}
                  unit="working days"
                  label="Average"
                  colour={bandColour(chosen.stat.avg)}
                />
                <Metric value={formatQuickest(chosen.stat.quickestHours)} label="Quickest" />
                <Metric
                  value={chosen.stat.longest.toFixed(0)}
                  unit="working days"
                  label="Longest"
                />
                <Metric value={chosen.stat.n.toLocaleString("en-GB")} label="Searches" />
              </div>
              <p className="mt-5 text-[12.5px] leading-relaxed text-tx-low">
                Working days, order placed to delivered, over the last 90 days.
              </p>
            </>
          ) : (
            <p className="mt-3 max-w-[44em] text-[15.5px] leading-relaxed text-tx-mid">
              We have not completed enough searches here recently to publish a figure we would stand
              behind. Rather than show an average drawn from a handful of orders, we show nothing —
              but we can tell you what we are seeing if you ask.
            </p>
          )}

          <Link
            href={`/councils/${chosen.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-brand-dark"
          >
            Everything we know about {chosen.name} <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      )}
    </div>
  );
}

function Metric({
  value,
  unit,
  label,
  colour,
}: {
  value: string;
  unit?: string;
  label: string;
  colour?: string;
}) {
  return (
    <div>
      <div
        className="font-display text-[30px] leading-none font-bold tracking-[-0.045em]"
        style={colour ? { color: colour } : undefined}
      >
        {value}
      </div>
      {unit && <div className="mt-1 text-[11.5px] text-tx-low">{unit}</div>}
      <div className="mt-2 text-[13px] font-medium text-tx-mid">{label}</div>
    </div>
  );
}

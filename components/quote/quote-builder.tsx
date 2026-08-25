"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { ProductSearchItem } from "@/lib/products";

/**
 * Quote builder — pick reports, say what volume, tell us who you are.
 *
 * Two modes, switched from config/site.ts:
 *   enquiry    — no numbers shown, we come back with a price (current)
 *   indicative — a guide price alongside (needs price data on the public API)
 *
 * Council-priced reports never show a figure in either mode. Their price
 * genuinely varies by local authority, so any single number would be wrong.
 */

type Mode = "enquiry" | "indicative";
type Band = { id: string; label: string; hint: string };

export default function QuoteBuilder({
  products,
  groups,
  volumeBands,
  mode,
  respondWithin,
  phone,
  phoneHref,
}: {
  products: ProductSearchItem[];
  groups: string[];
  volumeBands: readonly Band[];
  mode: Mode;
  respondWithin: string;
  phone: string;
  phoneHref: string;
}) {
  const [picked, setPicked] = useState<Record<string, ProductSearchItem>>({});
  const [query, setQuery] = useState("");
  const [openGroup, setOpenGroup] = useState<string | null>(groups[0] ?? null);
  const [volume, setVolume] = useState<string>("");
  const [form, setForm] = useState({ propertyAddress: "", name: "", firmName: "", email: "", phone: "", note: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const chosen = Object.values(picked);
  const canSubmit = chosen.length > 0 && form.name && form.firmName && form.email;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.tagline?.toLowerCase().includes(q) ?? false) ||
        (p.supplier?.toLowerCase().includes(q) ?? false),
    );
  }, [query, products]);

  const toggle = (p: ProductSearchItem) =>
    setPicked((prev) => {
      const next = { ...prev };
      if (next[p.slug]) delete next[p.slug];
      else next[p.slug] = p;
      return next;
    });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          volume,
          products: chosen.map((p) => ({ name: p.name, supplier: p.supplier, group: p.group })),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  /* ------------------------------------------------------------- sent */
  if (status === "sent") {
    return (
      <div className="rounded-hero border border-[#CFE2F5] bg-sky p-10 text-center max-sm:p-7">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7" />
          </svg>
        </span>
        <h2 className="mt-5 text-[26px] tracking-[-0.03em]">That&rsquo;s with us</h2>
        <p className="mx-auto mt-3 max-w-[40em] text-[16.5px] leading-relaxed text-tx-mid">
          We will come back to you within {respondWithin} with a price for the{" "}
          {chosen.length} report{chosen.length === 1 ? "" : "s"} you picked. If it is urgent, ring{" "}
          <a href={phoneHref} className="font-semibold text-brand-dark">
            {phone}
          </a>{" "}
          and we will deal with it now.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-[1fr_340px] gap-8 max-[1000px]:grid-cols-1">
      {/* ------------------------------------------------------ selection */}
      <div>
        <Step n={1} title="What do you need?" />

        <div className="relative mt-5">
          <label htmlFor="quote-search" className="sr-only">
            Search reports
          </label>
          <span aria-hidden className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-tx-low">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input
            id="quote-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports, or browse by type below…"
            autoComplete="off"
            className="w-full rounded-full border-[1.5px] border-mist bg-white py-3.5 pr-5 pl-12 text-[15.5px] placeholder:text-tx-low focus:border-brand focus:ring-2 focus:ring-brand/25 focus:outline-none"
          />
        </div>

        {visible ? (
          <div className="mt-6">
            <p className="mb-3 text-[13.5px] text-tx-mid">
              {visible.length} {visible.length === 1 ? "match" : "matches"}
            </p>
            <ul className="list-none space-y-2">
              {visible.map((p) => (
                <ProductRow key={p.slug} p={p} on={!!picked[p.slug]} toggle={toggle} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-6 space-y-2">
            {groups.map((g) => {
              const inGroup = products.filter((p) => p.group === g);
              const count = inGroup.filter((p) => picked[p.slug]).length;
              const isOpen = openGroup === g;
              return (
                <div key={g} className="overflow-hidden rounded-card border border-mist bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(isOpen ? null : g)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-chalk"
                  >
                    <span className="text-[16px] font-semibold">{g}</span>
                    <span className="flex items-center gap-3">
                      {count > 0 && (
                        <span className="rounded-full bg-brand px-2.5 py-1 text-[11.5px] font-bold text-white">
                          {count}
                        </span>
                      )}
                      <span className="text-[12.5px] text-tx-low">{inGroup.length}</span>
                      <span
                        aria-hidden
                        className={`text-tx-low transition-transform ${isOpen ? "rotate-180" : ""}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </span>
                  </button>

                  {isOpen && (
                    <ul className="list-none space-y-2 border-t border-mist bg-chalk px-4 py-4">
                      {inGroup.map((p) => (
                        <ProductRow key={p.slug} p={p} on={!!picked[p.slug]} toggle={toggle} />
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* --------------------------------------------------- volume */}
        <div className="mt-12">
          <Step n={2} title="Roughly how many a month?" />
          <p className="mt-2 text-[15px] text-tx-mid">
            A rough answer is fine. It changes what we can do on price.
          </p>
          <ul className="mt-5 grid list-none grid-cols-3 gap-3 max-[640px]:grid-cols-1">
            {volumeBands.map((b) => (
              <li key={b.id}>
                <button
                  type="button"
                  aria-pressed={volume === b.id}
                  onClick={() => setVolume(volume === b.id ? "" : b.id)}
                  className={`h-full w-full rounded-card border px-5 py-4 text-left transition ${
                    volume === b.id
                      ? "border-brand bg-brand text-white"
                      : "border-mist bg-white hover:border-brand"
                  }`}
                >
                  <span className="block text-[15px] font-semibold">{b.label}</span>
                  <span
                    className={`mt-1 block text-[12.5px] ${volume === b.id ? "text-white/75" : "text-tx-low"}`}
                  >
                    {b.hint}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* --------------------------------------------------- details */}
        <div className="mt-12">
          <Step n={3} title="Who should we come back to?" />

          {/* The address was missing entirely, while three places on the site told
              the reader to send one — the homepage CTA, the tools section and the
              FAQ that promises "send an address and you will have a figure back".
              A conveyancer following that instruction had nowhere to put it but
              the free-text note. It stays optional: some enquiries are genuinely
              "what do you charge at volume" rather than "price this house". */}
          <div className="mt-5">
            <Field
              label="Property address or postcode"
              value={form.propertyAddress}
              onChange={(v) => setForm({ ...form, propertyAddress: v })}
            />
            <p className="mt-1.5 text-[13px] text-tx-low">
              Optional, but it lets us price against the right council&rsquo;s fees first time.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
            <Field label="Your name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Firm" required value={form.firmName} onChange={(v) => setForm({ ...form, firmName: v })} />
            <Field label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          </div>
          <div className="mt-4">
            <label htmlFor="quote-note" className="mb-1.5 block text-[13.5px] font-semibold text-tx">
              Anything else worth knowing?
            </label>
            <textarea
              id="quote-note"
              rows={3}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="Particular councils, deadlines, or something unusual about the work."
              className="w-full rounded-card border-[1.5px] border-mist bg-white px-5 py-3.5 text-[15.5px] placeholder:text-tx-low focus:border-brand focus:ring-2 focus:ring-brand/25 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------- summary */}
      <aside>
        <div className="sticky top-28 rounded-hero border border-mist bg-white p-7">
          <p className="text-[11px] font-bold tracking-[0.14em] text-tx-low uppercase">Your selection</p>

          {chosen.length === 0 ? (
            <p className="mt-4 text-[15px] leading-relaxed text-tx-mid">
              Nothing picked yet. Search above, or open a category and tick what you need.
            </p>
          ) : (
            <ul className="mt-4 max-h-[280px] list-none space-y-2 overflow-auto pr-1">
              {chosen.map((p) => (
                <li key={p.slug} className="flex items-start justify-between gap-3">
                  <span className="text-[14px] leading-snug">{p.name}</span>
                  <button
                    type="button"
                    onClick={() => toggle(p)}
                    aria-label={`Remove ${p.name}`}
                    className="shrink-0 text-tx-low transition hover:text-band-slow"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 border-t border-mist pt-5">
            {mode === "indicative" ? (
              <p className="text-[14px] leading-relaxed text-tx-mid">
                A guide price appears here once pricing is switched on. Council-priced reports will
                always show as priced by council rather than a figure.
              </p>
            ) : (
              <p className="text-[14px] leading-relaxed text-tx-mid">
                We price per property, because most of these depend on the local authority. Send this
                over and we will come back within <strong className="text-tx">{respondWithin}</strong>.
              </p>
            )}
          </div>

          {error && (
            <p className="mt-4 rounded-card bg-band-slow/10 px-4 py-3 text-[13.5px] text-band-slow">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || status === "sending"}
            className="mt-5 w-full rounded-full bg-brand px-6 py-4 text-[15px] font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-mist disabled:text-tx-low"
          >
            {status === "sending" ? "Sending…" : "Send this to us"}
          </button>

          {!canSubmit && chosen.length > 0 && (
            <p className="mt-3 text-center text-[12.5px] text-tx-low">
              Add your name, firm and email to send.
            </p>
          )}

          <p className="mt-4 text-center text-[13px] text-tx-mid">
            or call{" "}
            <a href={phoneHref} className="font-semibold text-coral-ink">
              {phone}
            </a>
          </p>

          <p className="mt-5 border-t border-mist pt-4 text-[12px] leading-relaxed text-tx-low">
            Not sure what a report covers?{" "}
            <Link href="/products" className="font-semibold text-brand-dark">
              Read the descriptions
            </Link>
            .
          </p>
        </div>
      </aside>
    </form>
  );
}

/* -------------------------------------------------------------- pieces */

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-display text-[14px] font-bold text-white">
        {n}
      </span>
      <h2 className="text-[22px] tracking-[-0.028em]">{title}</h2>
    </div>
  );
}

function ProductRow({
  p,
  on,
  toggle,
}: {
  p: ProductSearchItem;
  on: boolean;
  toggle: (p: ProductSearchItem) => void;
}) {
  return (
    <li>
      <label
        className={`flex cursor-pointer items-start gap-3.5 rounded-card border px-5 py-3.5 transition ${
          on ? "border-brand bg-sky" : "border-mist bg-white hover:border-brand-light"
        }`}
      >
        <input
          type="checkbox"
          checked={on}
          onChange={() => toggle(p)}
          className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded border-mist text-brand focus:ring-brand"
        />
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[14.5px] leading-snug font-semibold">{p.name}</span>
            {p.supplier && (
              <span className="rounded-full bg-chalk px-2 py-0.5 text-[11px] font-semibold text-tx-mid">
                {p.supplier}
              </span>
            )}
          </span>
          {p.tagline && (
            <span className="mt-1 block text-[13px] leading-relaxed text-tx-mid">{p.tagline}</span>
          )}
        </span>
      </label>
    </li>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = `quote-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-semibold text-tx">
        {label}
        {required && <span className="text-coral-ink"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-card border-[1.5px] border-mist bg-white px-5 py-3.5 text-[15.5px] focus:border-brand focus:ring-2 focus:ring-brand/25 focus:outline-none"
      />
    </div>
  );
}

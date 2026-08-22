"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { ProductSearchItem } from "@/lib/products";

/**
 * Search across the whole catalogue by product name, tagline or supplier.
 *
 * Supplier is searchable because the business chose to name suppliers publicly:
 * a conveyancer who knows they want a Landmark report can type "Landmark" and
 * see everything we can order from them.
 *
 * Optional by design — the page is complete without it, and it only takes over
 * once someone types.
 */
export default function ProductSearch({
  products,
  suppliers,
}: {
  products: ProductSearchItem[];
  suppliers: string[];
}) {
  const [query, setQuery] = useState("");
  const [supplier, setSupplier] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && !supplier) return null; // null = "not searching", show the groups instead

    return products.filter((p) => {
      if (supplier && p.supplier !== supplier) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.tagline?.toLowerCase().includes(q) ?? false) ||
        (p.supplier?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [query, supplier, products]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[280px] flex-1">
          <label htmlFor="product-search" className="sr-only">
            Search products
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
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by report, or by supplier…"
            autoComplete="off"
            className="w-full rounded-full border-[1.5px] border-mist bg-white py-3.5 pr-5 pl-12 text-[15.5px] text-tx placeholder:text-tx-low focus:border-brand focus:ring-2 focus:ring-brand/25 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {suppliers.map((s) => {
            const on = supplier === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => setSupplier(on ? null : s)}
                className={`rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition ${
                  on
                    ? "border-brand bg-brand text-white"
                    : "border-mist bg-white text-tx-mid hover:border-brand hover:text-brand-dark"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {results && (
        <div className="mt-8" aria-live="polite">
          <p className="mb-5 text-[14px] text-tx-mid">
            {results.length === 0
              ? "Nothing matched. Try a supplier name, or the type of report."
              : `${results.length} ${results.length === 1 ? "report" : "reports"}`}
          </p>

          <ul className="grid list-none grid-cols-2 gap-3 max-[820px]:grid-cols-1">
            {results.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.groupSlug}#${p.slug}`}
                  className="flex h-full flex-col rounded-card border border-mist bg-white px-6 py-5 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_16px_34px_-24px_rgb(52_140_220_/_0.7)]"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-[15.5px] leading-snug font-semibold">{p.name}</span>
                    {p.supplier && (
                      <span className="shrink-0 rounded-full bg-sky px-2.5 py-1 text-[11px] font-semibold text-brand-dark">
                        {p.supplier}
                      </span>
                    )}
                  </span>
                  {p.tagline && (
                    <span className="mt-2 text-[13.5px] leading-relaxed text-tx-mid">
                      {p.tagline}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

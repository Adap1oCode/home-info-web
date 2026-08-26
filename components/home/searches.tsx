import Link from "next/link";

import { routes, searches } from "@/config/site";

/**
 * Per-product turnaround is deliberately NOT shown. The performance payload
 * returns product order counts and share only — there is no per-product
 * turnaround figure to source, so claiming one would be invention.
 */
export default function Searches() {
  return (
    <section id="searches" className="section-y">
      <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
        <div className="mb-18 max-w-[54rem] max-lg:mb-12">
          {/*
            Was "What we order, chase and check." — three verbs describing our
            back office, with the ordering attributed to us rather than to the
            reader doing the ordering. The heading now names the thing and says
            whose action it is. Eyebrow matches the nav label: one word for this
            across the nav, the footer, the breadcrumbs and here.
          */}
          <span className="eyebrow">Searches</span>
          <h2 className="mt-6 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
            The searches you can order from us.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-5.5 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
          {searches.map((s, i) => (
            /*
             * These pointed at /searches/<slug>, which was never built — six
             * dead links in one grid. The live catalogue is the products hub,
             * whose group slugs come from the database, so they cannot be
             * hardcoded here. Sending every card to the hub is honest; deep
             * links can follow once these categories are mapped to real groups.
             */
            <Link
              key={s.id}
              href={routes.products}
              /* `reveal` animates `transform`; the hover lift above uses the
                 separate `translate` property, so the two compose instead of
                 one overriding the other. Do not rewrite either in terms of
                 the other. */
              className="reveal flex flex-col rounded-hero border border-mist bg-white p-9.5 pb-8.5 transition duration-200 hover:-translate-y-1.5 hover:border-brand-light hover:shadow-[0_28px_56px_-34px_rgb(52_140_220_/_0.6)]"
              style={{ ["--reveal-offset" as string]: `${(i % 3) * 6}%` }}
            >
              <h3 className="mb-3.5 text-[25px]">{s.name}</h3>
              <p className="mb-6.5 flex-1 text-[15px] leading-relaxed text-tx-mid">{s.blurb}</p>
              <span className="inline-flex w-fit items-center rounded-full bg-chalk px-4 py-2.5 text-[12.5px] font-semibold text-tx-mid">
                {s.fromPriceGBP === null ? (
                  "Priced per council"
                ) : (
                  <>
                    From <b className="ml-1 font-display font-bold">&pound;{s.fromPriceGBP}</b>
                  </>
                )}
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-[15.5px] text-tx-mid">
          Prices vary by council, because the council&rsquo;s own fee does.{" "}
          <Link href={routes.quote} className="inline-flex items-center gap-2 font-semibold text-brand-dark">
            Get a quote for a specific property <span aria-hidden>&rarr;</span>
          </Link>
        </p>
      </div>
    </section>
  );
}

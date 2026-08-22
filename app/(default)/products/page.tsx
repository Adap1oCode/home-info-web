import type { Metadata } from "next";
import Link from "next/link";

import ProductSearch from "@/components/products/product-search";
import { nav, seo } from "@/config/site";
import { getProducts, groupProducts, toSearchItems, GROUP_INTROS } from "@/lib/products";

export const revalidate = 86_400;

export const metadata: Metadata = {
  /* Leads with what the page is rather than with a phrase about us. The old
     "What we can order for you" put four function words before the first term
     anyone searches for, and read as a page about our purchasing. */
  title: "Property searches and reports",
  description:
    "The full range of property searches, environmental and drainage reports, and client due diligence you can order from us — grouped by type, with the supplier named for each.",
  alternates: { canonical: `${seo.siteUrl}/products` },
};

export default async function ProductsHub() {
  const products = await getProducts();
  const groups = groupProducts(products);
  const suppliers = Array.from(
    new Set(products.map((p) => p.supplier).filter(Boolean) as string[]),
  ).sort();

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-16 text-white max-lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(820px 560px at 86% -12%, rgb(52 140 220 / 0.38), transparent 64%)," +
              "linear-gradient(160deg, #0D1F33 0%, #143050 55%, #0D1F33 100%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-8 max-sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-[13.5px] text-white/55">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-white/80">Searches</span>
          </nav>

          <h1 className="max-w-[16em] text-[clamp(30px,3.6vw,46px)] leading-[1.06] tracking-[-0.03em]">
            Every search and report you can order from us
          </h1>
          <p className="mt-5 max-w-[46em] text-[17px] leading-relaxed text-white/70">
            {products.length > 0 ? `${products.length} reports` : "Reports"} across searches,
            environmental, drainage and client due diligence — with the supplier named for each, so
            you know exactly whose report you are getting.
          </p>
          <p className="mt-4 max-w-[46em] text-[15px] leading-relaxed text-white/50">
            Prices are not listed because most of them depend on the local authority. Ask and we
            will quote for the specific property.
          </p>
        </div>
      </section>

      <section className="py-20 max-lg:py-14">
        <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
          {products.length === 0 ? (
            <p className="text-[17px] text-tx-mid">
              Our catalogue is refreshing. Please check back shortly, or{" "}
              <Link href={nav.primaryCta.href} className="font-semibold text-brand-dark">
                ask us what you need
              </Link>
              .
            </p>
          ) : (
            <>
              <ProductSearch products={toSearchItems(products)} suppliers={suppliers} />

              <div className="mt-14 grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
                {groups.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/products/${g.slug}`}
                    className="group flex h-full flex-col rounded-hero border border-mist bg-white p-8 transition hover:-translate-y-1 hover:border-brand hover:shadow-[0_24px_50px_-32px_rgb(52_140_220_/_0.55)]"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-[22px] leading-snug">{g.name}</h2>
                      <span className="shrink-0 font-display text-[15px] font-bold text-tx-low">
                        {g.products.length}
                      </span>
                    </div>

                    {GROUP_INTROS[g.name] && (
                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-tx-mid">
                        {GROUP_INTROS[g.name]}
                      </p>
                    )}

                    {g.suppliers.length > 0 && (
                      <ul className="mt-5 flex list-none flex-wrap gap-1.5">
                        {g.suppliers.map((s) => (
                          <li
                            key={s}
                            className="rounded-full bg-sky px-2.5 py-1 text-[11.5px] font-semibold text-brand-dark"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}

                    <span className="mt-5 flex items-center gap-2 text-[13.5px] font-semibold text-brand-dark">
                      See what&rsquo;s in it <span aria-hidden>&rarr;</span>
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

import QuoteBuilder from "@/components/quote/quote-builder";
import { contact, phoneHref, quote } from "@/config/site";
import { getProducts, groupProducts, toSearchItems } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 86_400;

export const metadata = pageMetadata({
  title: "Build a quote",
  description:
    "Pick the reports you need, tell us roughly what volume you do, and we will come back with a price. No account needed and no obligation.",
  path: "/quote",
});

export default async function QuotePage() {
  const products = await getProducts();
  const groups = groupProducts(products);

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-14 text-white max-lg:py-11">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(760px 520px at 88% -14%, rgb(52 140 220 / 0.36), transparent 64%)," +
              "linear-gradient(160deg, #0D1F33 0%, #143050 55%, #0D1F33 100%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-8 max-sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-[13.5px] text-white/55">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-white/80">Build a quote</span>
          </nav>

          <h1 className="max-w-[16em] text-[clamp(30px,3.6vw,46px)] leading-[1.06] tracking-[-0.03em]">
            Tell us what you need and we will price it
          </h1>
          <p className="mt-5 max-w-[46em] text-[17px] leading-relaxed text-white/70">
            Pick the reports, say roughly what volume you do, and we will come back within{" "}
            {quote.respondWithin}. No account needed, and nothing obliges you to go ahead.
          </p>
        </div>
      </section>

      <section className="py-16 max-lg:py-12">
        <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
          {products.length === 0 ? (
            <p className="text-[17px] text-tx-mid">
              Our catalogue is refreshing. Please try again shortly, or call{" "}
              <a href={phoneHref} className="font-semibold text-brand-dark">
                {contact.phone.display}
              </a>
              .
            </p>
          ) : (
            <QuoteBuilder
              products={toSearchItems(products)}
              groups={groups.map((g) => g.name)}
              volumeBands={quote.volumeBands}
              mode={quote.mode}
              respondWithin={quote.respondWithin}
              phone={contact.phone.display}
              phoneHref={phoneHref}
            />
          )}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import FaqList, { FaqJsonLd } from "@/components/faq-list";
import { Unconfirmed } from "@/components/ui/unconfirmed";
import { contact, phoneHref, routes, seo } from "@/config/site";
import { faqs } from "@/content/faqs";
import { guides } from "@/content/guides";

export const metadata: Metadata = {
  title: "Property search FAQs",
  description:
    "Which searches a purchase needs, what they cost, how long they stay valid and whether lenders accept a personal search — answered for conveyancers in England and Wales.",
  alternates: { canonical: `${seo.siteUrl}${routes.faqs}` },
};

/**
 * The full set, from content/faqs.ts. The homepage carries six of the same
 * entries; this page is the canonical home for all of them.
 *
 * The previous version of this page kept its own copy of five answers, one of
 * which promised "3–5 working days" — the exact figure the turnaround guide
 * exists to argue against. Sharing the content file is what stops that.
 */
export default function FAQs() {
  return (
    <>
      <FaqJsonLd items={faqs} />

      {/* ---------------------------------------------------------- header */}
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
            <Link href={routes.home} className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-white/80">FAQs</span>
          </nav>

          <h1 className="max-w-[17em] text-[clamp(28px,3.3vw,42px)] leading-[1.08] tracking-[-0.03em]">
            Frequently asked questions.
          </h1>
          <p className="mt-5 max-w-[46em] text-[16.5px] leading-relaxed text-white/70">
            Cost, validity, lender acceptance, and what happens when something is missed.
            Anything that needs more than a few sentences has a guide of its own.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ body */}
      <div className="mx-auto max-w-[1240px] px-8 py-16 max-lg:py-12 max-sm:px-6">
        <div className="grid grid-cols-[minmax(0,72ch)_290px] gap-16 max-[1080px]:grid-cols-1 max-[1080px]:gap-12">
          <FaqList items={faqs} />

          <aside className="self-start rounded-hero border border-mist bg-chalk p-8 max-[1080px]:max-w-[46em]">
            <h2 className="text-[20px]">Not answered here?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-tx-mid">
              If the question is about a specific property, the address is usually all we
              need to give you a straight answer.
            </p>
            <a
              href={phoneHref}
              className="mt-5 block font-display text-[24px] leading-none font-bold tracking-[-0.04em] text-brand-dark hover:text-brand"
            >
              <Unconfirmed when={contact.phone.confirmed} title={contact.phone.note}>
                {contact.phone.display}
              </Unconfirmed>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="mt-3 block text-[14.5px] font-semibold text-tx-mid hover:text-brand-dark"
            >
              {contact.email}
            </a>

            <div className="mt-7 border-t border-mist pt-6">
              <p className="text-[14.5px] leading-relaxed text-tx-mid">
                Longer explanations live in the guides — {guides.length} of them, one
                question each.
              </p>
              <Link
                href={routes.guides}
                className="mt-3 inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand-dark hover:text-brand"
              >
                Read the guides <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

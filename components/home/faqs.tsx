import Link from "next/link";

import FaqList, { FaqJsonLd } from "@/components/faq-list";
import { Unconfirmed } from "@/components/ui/unconfirmed";
import { contact, phoneHref, routes } from "@/config/site";
import { faqs, featuredFaqs } from "@/content/faqs";

/**
 * Six questions here, the full set on /faqs.
 *
 * The subset is not padding — showing all ten on both pages would put the same
 * ten answers on two URLs and give a crawler no reason to index the second one.
 */
export default function Faqs() {
  return (
    <section id="faqs" className="section-y">
      <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-16 max-[980px]:grid-cols-1 max-[980px]:gap-10">
          {/* Sticky on desktop, so the heading and the phone number stay with
              the reader as they work down the answers. */}
          <div className="sticky top-28 self-start max-[980px]:static">
            <span className="eyebrow">Common questions</span>
            <h2 className="mt-6 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
              The things we get asked most.
            </h2>
            <p className="mt-6 max-w-[34em] text-[16.5px] leading-relaxed text-tx-mid">
              Straight answers, including the ones that end in &ldquo;you do not need
              that&rdquo;. If yours is not here, it is usually a two-minute phone call.
            </p>

            <a
              href={phoneHref}
              className="mt-7 inline-block font-display text-[30px] leading-none font-bold tracking-[-0.04em] text-brand-dark hover:text-brand"
            >
              <Unconfirmed when={contact.phone.confirmed} title={contact.phone.note}>
                {contact.phone.display}
              </Unconfirmed>
            </a>

            <p className="mt-7 text-[15.5px] text-tx-mid">
              <Link
                href={routes.faqs}
                className="inline-flex items-center gap-2 font-semibold text-brand-dark"
              >
                All {faqs.length} questions <span aria-hidden>&rarr;</span>
              </Link>
            </p>
          </div>

          <FaqList items={featuredFaqs} />
        </div>
      </div>

      <FaqJsonLd items={featuredFaqs} />
    </section>
  );
}

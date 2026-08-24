import Link from "next/link";

import FaqList, { FaqJsonLd } from "@/components/faq-list";
import { routes } from "@/config/site";
import { faqs, featuredFaqs } from "@/content/faqs";

/**
 * Six questions here, the full set on /faqs.
 *
 * The subset is not padding — showing all ten on both pages would put the same
 * ten answers on two URLs and give a crawler no reason to index the second one.
 *
 * No phone number here. It used to sit in a sticky side column at 30px, one
 * section above the closing CTA which shows it again at 42px — two large
 * renderings of the same eleven digits within a screen of each other, on a page
 * that also carries it in the header and the footer. The section directly below
 * is the one whose whole subject is calling her; this one's job is answering the
 * question without a call.
 */
export default function Faqs() {
  return (
    <section id="faqs" className="section-y">
      <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
        {/* Heading across the top rather than in a sticky side column, so the
            questions get the full width and sit two abreast. */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-5 max-lg:mb-9">
          <div>
            <span className="eyebrow">Common questions</span>
            <h2 className="mt-6 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
              The things we get asked most.
            </h2>
          </div>
          <p className="max-w-[30em] text-[16.5px] leading-relaxed text-tx-mid">
            Straight answers, including the ones that end in &ldquo;you do not need
            that&rdquo;.{" "}
            <Link href={routes.faqs} className="font-semibold text-brand-dark whitespace-nowrap">
              All {faqs.length} questions &rarr;
            </Link>
          </p>
        </div>

        <FaqList items={featuredFaqs} columns={2} />
      </div>

      <FaqJsonLd items={featuredFaqs} />
    </section>
  );
}

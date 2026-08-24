import Link from "next/link";

import type { Faq } from "@/content/faqs";

/**
 * The accordion list, shared by the homepage section and /faqs.
 *
 * Built on native <details>, deliberately. The old components/accordion.tsx is a
 * client component holding open state in React, which means the answers are not
 * in the markup until it hydrates — the worst possible arrangement for the one
 * section on the page whose entire job is to be read by a crawler. <details>
 * ships the answers in the HTML, works with JavaScript off, and gets keyboard
 * and screen reader behaviour from the browser rather than from ARIA we maintain.
 */
export default function FaqList({
  items,
  /** Index opened on load. -1 leaves them all closed. */
  openIndex = 0,
  /**
   * Two columns on desktop, one below 900px.
   *
   * A grid rather than CSS `columns`: opening a <details> in a multi-column
   * flow reflows every item after it across the column break, so answers jump
   * between columns as the reader opens them. In a grid an open answer only
   * grows its own row.
   */
  columns = 1,
}: {
  items: Faq[];
  openIndex?: number;
  columns?: 1 | 2;
}) {
  /* first:border-t only reaches item one, which leaves the second column
     opening without a top rule. In two columns the first *row* needs it. */
  const grid =
    columns === 2
      ? "grid grid-cols-2 gap-x-14 max-[900px]:grid-cols-1 [&>*:nth-child(-n+2)]:border-t max-[900px]:[&>*:nth-child(2)]:border-t-0"
      : "";

  return (
    <div className={grid}>
      {items.map((faq, i) => (
        <details
          key={faq.id}
          id={faq.id}
          open={i === openIndex}
          className="group border-b border-mist first:border-t"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-7 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="text-[19.5px] leading-snug text-tx transition group-hover:text-brand-dark max-sm:text-[17.5px]">
              {faq.question}
            </h3>
            <span
              aria-hidden
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-mist bg-white text-[17px] leading-none font-semibold text-brand-dark transition duration-200 group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white"
            >
              +
            </span>
          </summary>

          <div className="pb-7 pr-14 max-sm:pr-0">
            <p className="text-[15.5px] leading-relaxed text-tx-mid">{faq.answer}</p>
            {faq.link && (
              <Link
                href={faq.link.href}
                className="mt-4 inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand-dark hover:text-brand"
              >
                {faq.link.label} <span aria-hidden>&rarr;</span>
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

/**
 * FAQPage schema for the questions actually rendered.
 *
 * Pass the same array you passed to FaqList — schema that does not match what is
 * on the page is a manual action waiting to happen, so the two are never allowed
 * to be built from different lists.
 */
export function FaqJsonLd({ items }: { items: Faq[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

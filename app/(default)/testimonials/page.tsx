import type { Metadata } from "next";
import Link from "next/link";

import { company, contact, phoneHref, routes, seo, testimonials } from "@/config/site";

/**
 * The testimonials page.
 *
 * Every quote comes from `testimonials` in config/site.ts and must carry
 * `confirmed: true` to appear. Nothing is written for a client, and nothing is
 * paraphrased into better copy than they wrote — on a site whose proposition is
 * "we publish what we actually achieve", an improved quote is the same lie as
 * an invented turnaround figure.
 *
 * ── On star ratings ─────────────────────────────────────────────────────────
 * Deliberately none. We do not operate a rating system, so five drawn stars
 * would be decoration standing in for a score nobody gave. The homepage section
 * still draws them; that is worth revisiting.
 *
 * ── On Review schema ────────────────────────────────────────────────────────
 * We emit `Review` objects but no `aggregateRating`. Self-serving aggregate
 * ratings on your own Organization breach Google's structured-data guidelines
 * and risk a manual action — the exact opposite of what this page is for.
 */
export const metadata: Metadata = {
  title: "What our clients say",
  description: `Conveyancers and solicitors across ${company.coverage}, in their own words, on working with ${company.tradingName}.`,
  alternates: { canonical: `${seo.siteUrl}${routes.testimonials}` },
};

export default function TestimonialsPage() {
  const shown = testimonials.filter((t) => t.confirmed);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    url: seo.siteUrl,
    review: shown.map((t) => ({
      "@type": "Review",
      reviewBody: t.quote,
      author: { "@type": "Person", name: t.name, worksFor: { "@type": "Organization", name: t.role } },
    })),
  };

  return (
    <>
      {shown.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}

      <section className="relative overflow-hidden bg-ink py-16 text-white max-lg:py-12">
        <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
          {/* Not `.eyebrow` — that utility is bg-sky + text-brand-dark, built for light
              sections. On this navy hero it rendered as a pale pill with white text on
              it, i.e. an invisible label. Matches the founder page's dark-hero chip. */}
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/8 px-4 py-2 text-[13px] font-medium text-white/85">
            From the firms who use us
          </span>
          <h1 className="mt-6 max-w-[20ch] font-display text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.03em]">
            What our clients say.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-white/70">
            Unedited, and attributed to the firm that sent them. We do not publish anonymous
            praise — if a quote is worth reading, it is worth knowing who wrote it.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
          {shown.length === 0 ? (
            /* Not a placeholder: if every quote were unconfirmed this page must
               still say something true rather than render an empty grid. */
            <p className="max-w-[52ch] text-[17px] text-tx-low">
              We are collecting these properly, with permission, rather than putting up
              anonymous lines nobody can check. In the meantime,{" "}
              <Link href={routes.tracker} className="underline underline-offset-4">
                our published turnaround times
              </Link>{" "}
              are the more useful evidence anyway.
            </p>
          ) : (
            <ul className="grid list-none gap-5.5 md:grid-cols-2">
              {shown.map((t, i) => (
                <li
                  key={`${t.name}-${i}`}
                  className="flex flex-col rounded-hero border border-mist bg-white p-9.5"
                >
                  <blockquote className="flex-1 font-display text-[21px] leading-snug font-medium tracking-[-0.022em]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-6.5 border-t border-mist pt-5.5 text-[13px] text-tx-low">
                    <b className="block text-[14.5px] font-bold text-tx">{t.name}</b>
                    {t.role}
                    {t.location ? ` · ${t.location}` : ""}
                  </footer>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-16 rounded-hero border border-mist bg-sky p-9.5 max-sm:p-7">
            <h2 className="font-display text-[24px] tracking-[-0.025em]">
              Want to see the numbers instead?
            </h2>
            <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-tx-low">
              We publish our actual turnaround times council by council — not target times,
              the real ones, including the councils where we are slower than we would like.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={routes.tracker} className="inline-flex items-center gap-2.5 rounded-xl bg-coral-deep px-7 py-3.5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-coral">
                See the live tracker
              </Link>
              <a href={phoneHref} className="inline-flex items-center gap-2.5 rounded-xl border border-mist bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-brand-light">
                Call {contact.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

import { company, founder } from "@/config/site";
import { ConfigValue } from "@/components/ui/unconfirmed";

/**
 * The founder section — the part of the site a competitor cannot copy.
 *
 * The pull quote renders ONLY when founder.pullQuote is confirmed. If we have
 * nothing genuine from her, the section runs without it rather than with words
 * written on her behalf.
 */
export default function Story() {
  const quote = founder.pullQuote;
  const hasQuote = quote.confirmed && quote.value.length > 0;

  return (
    <section id="story" className="section-y mx-8 rounded-hero bg-white max-lg:mx-3.5">
      <div className="mx-auto max-w-[1240px] px-17 max-lg:px-6">
        <div className="grid grid-cols-[0.8fr_1.2fr] items-center gap-19.5 max-[980px]:grid-cols-1 max-[980px]:gap-14">
          <div className="relative max-[980px]:mx-auto max-[980px]:max-w-90">
            <div className="absolute -right-8 bottom-10 z-[3] grid h-34 w-34 place-content-center rounded-full bg-brand text-center text-white shadow-[0_22px_48px_-22px_rgb(13_31_51_/_0.5)] max-[980px]:-right-3">
              <span className="font-display text-[42px] leading-none font-bold tracking-[-0.05em]">
                <ConfigValue field={company.yearsInSearch} />
              </span>
              <span className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] opacity-70">
                Years in
              </span>
            </div>

            <div className="aspect-[1/1.16] overflow-hidden rounded-t-full rounded-b-panel bg-gradient-to-b from-brand-light to-sky shadow-[0_40px_80px_-52px_rgb(13_31_51_/_0.55)]">
              <div className="unconfirmed flex h-full w-full items-center justify-center p-8 text-center">
                <span className="text-[14px] leading-relaxed font-medium text-navy/70">
                  Photograph for the story section.
                  <br />
                  <span className="text-[12.5px]">Her at work, or the team. Not stock.</span>
                </span>
              </div>
            </div>
          </div>

          <div>
            <span className="eyebrow">Who you&rsquo;re actually dealing with</span>
            <h2 className="mt-6 mb-7.5 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
              <ConfigValue field={company.yearsInSearch} format={(v) => `${v} years`} /> in property
              search, and a family business before that.
            </h2>

            <p className="mb-5.5 max-w-[38em] text-[16.5px] leading-loose text-tx-mid">
              <ConfigValue field={founder.name} /> has worked in property search since{" "}
              <ConfigValue field={company.founderStartYear} />, in a family that was doing it before
              that. Over that time the independent sector has grown, consolidated and largely been
              bought up. We are still here, and still independent.
            </p>

            <p className="mb-5.5 max-w-[38em] text-[16.5px] leading-loose text-tx-mid">
              {/* Was "Independent Property Search Agents". IPSA's own site gives
                  the name as the Association of Independent Personal Search
                  Agents — personal, not property. Confirm with her before go-live. */}
              She sits on the executive board of <strong className="font-semibold text-tx">IPSA</strong>,
              the Association of Independent Personal Search Agents, so she is involved in setting the
              standards independent search agents work to — and tends to hear early when a particular
              authority starts to slip.
            </p>

            {hasQuote ? (
              <figure className="my-9 rounded-panel border-l-4 border-coral bg-coral-soft p-8">
                <blockquote className="font-display text-[24px] leading-snug font-medium tracking-[-0.026em] text-tx">
                  {quote.value}
                </blockquote>
                <figcaption className="mt-4 text-[13.5px] font-semibold text-coral-ink">
                  &mdash; {quote.attribution}
                </figcaption>
              </figure>
            ) : (
              <p className="unconfirmed my-9 rounded-panel border-l-4 border-coral bg-coral-soft p-8 text-[15px] leading-relaxed text-tx-mid">
                A pull quote belongs here, in her own words, taken from a recorded conversation.
                Nothing renders until <code className="font-mono text-[13px]">founder.pullQuote</code>{" "}
                is filled in and confirmed — deliberately, so no one is quoted saying something they
                did not say.
              </p>
            )}

            <p className="max-w-[38em] text-[16.5px] leading-loose text-tx-mid">
              Most of our work comes from firms who have used us for years, and from the people they
              refer to us. That is the part of the business we care most about keeping.
            </p>

            <div className="mt-8.5 flex flex-wrap gap-6.5 border-t border-mist pt-7.5">
              <Link href={founder.href} className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand-dark">
                More about <ConfigValue field={founder.shortName} /> <span aria-hidden>&rarr;</span>
              </Link>
              {/* "What IPSA membership means" pointed at /about/ipsa, which was
                  never built. Worth writing — until then there is no link. */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

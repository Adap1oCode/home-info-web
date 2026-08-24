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
            {/* Val, in the roundel that used to hold the number.
                Small and circular on purpose. A candid phone photograph reads as
                intentional at this size in a way it never does blown up across the
                arch, and the ring does the framing a studio backdrop would. The
                brand blue survives as the ring rather than as a filled disc, so the
                composition keeps its blue anchor. */}
            <div className="absolute -right-8 bottom-10 z-[3] h-34 w-34 overflow-hidden rounded-full bg-brand ring-4 ring-brand shadow-[0_22px_48px_-22px_rgb(13_31_51_/_0.5)] outline outline-4 outline-white max-[980px]:-right-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={founder.photo.src}
                alt={founder.photo.alt}
                className="h-full w-full object-cover"
              />
            </div>

            {/* The years moved off the roundel to make room, and became a chip on
                the arch. It is the same claim the heading makes alongside, so it is
                reinforcement rather than the only place the number appears. */}
            <div className="absolute top-6 -left-5 z-[3] rounded-full bg-white px-4.5 py-2.5 text-center shadow-[0_18px_38px_-20px_rgb(13_31_51_/_0.55)] max-[980px]:-left-2">
              <span className="font-display text-[19px] leading-none font-bold tracking-[-0.03em] text-brand-dark">
                <ConfigValue field={company.yearsInSearch} format={(v) => `${v} years`} />
              </span>
              <span className="mt-1 block text-[9.5px] font-bold tracking-[0.12em] text-tx-low uppercase">
                In property search
              </span>
            </div>

            {/* The arch holds a place, not a person.
                A stock face here would be read as Val or as her team, directly under
                a heading that says who you are actually dealing with — which is the
                one thing this section cannot fake. A Georgian terrace is honest
                scenery: it is the work, not a stand-in for the people doing it. The
                arched windows also rhyme with the arch they sit inside.
                Vetted already — see scripts/fetch-stock.mjs. */}
            <div className="relative aspect-[1/1.16] overflow-hidden rounded-t-full rounded-b-panel bg-navy shadow-[0_40px_80px_-52px_rgb(13_31_51_/_0.55)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/stock/conservation-street.jpg"
                alt="A brick Georgian terrace with arched sash windows"
                className="h-full w-full object-cover"
              />
              {/* The roundel sits bottom-right over this, so the wash is weighted
                  there — it keeps white-on-blue legible against a busy brick
                  facade without flattening the whole photograph. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_75%_85%,rgb(13_31_51_/_0.55)_0%,transparent_58%)]"
              />
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

            {/* The "More about Val" link is hidden with the rest of the founder
                route — see nav.primary in config/site.ts. "What IPSA membership
                means" pointed at /about/ipsa, which was never built. With both
                gone this row holds nothing, so the rule above it goes too. */}
          </div>
        </div>
      </div>
    </section>
  );
}

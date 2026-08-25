import Link from "next/link";

import { company, contact, routes } from "@/config/site";
import type { PerformancePayload } from "@/lib/performance";
import { ConfigValue, Unconfirmed } from "@/components/ui/unconfirmed";

/**
 * The three pillars: accuracy, speed, service — in that order.
 *
 * ORDER
 * -----
 * Speed used to lead. It now sits second, because speed is what every search
 * provider claims and accuracy is what a conveyancer is actually exposed to: a
 * fast report with a missed entry costs them far more than a slow one. Leading
 * on accuracy also makes the speed card land better, since "we publish what we
 * achieved" reads as confidence rather than as a boast once the reader already
 * knows a person checked the thing.
 *
 * COPY
 * ----
 * The old headings were clauses rather than claims — "Checked by a person
 * before it reaches you", "A person on the phone" — and the sharpest line in
 * the whole section ("Read, not just forwarded") was buried in small type at
 * the bottom of a card. Each heading is now the claim itself, and each card
 * makes one point rather than three.
 *
 * ALIGNMENT
 * ---------
 * The cards are a subgrid. The container owns five rows — label, heading, body,
 * proof, link — and each card spans all five, so those five bands line up
 * across all three cards no matter how long the individual headings and
 * paragraphs run. This is what the old markup could not do: it flexed each card
 * independently, so a two-line heading in one card pushed its rule, its figure
 * and its link out of step with its neighbours, and the row of proof blocks
 * read as three unrelated fragments.
 *
 * The proof values are also now one type size and one shape across all three —
 * a short value with a caption beneath. They were 38px in the first card and
 * 26px in the others, which broke the alignment even where the rows agreed.
 * Keep new values short (roughly twelve characters) or they wrap and the
 * caption drops out of line.
 */
export default function Pillars({ data }: { data: PerformancePayload | null }) {
  const k = data?.kpis;

  return (
    /*
     * White, against the chalk page background. That gives the run of sections
     * three distinct bands — chalk behind the accreditation logos, white here,
     * then the full-bleed navy tracker — so each reads as its own block rather
     * than as one continuous scroll.
     */
    <section className="section-y bg-white">
      <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
        <div className="mb-18 max-w-[54rem] max-lg:mb-12">
          <span className="eyebrow">Why firms move to us</span>
          <h2 className="mt-6 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
            Three things we are judged on.
          </h2>
        </div>

        {/* Five named rows, shared by all three cards via subgrid. The body row
            is the only flexible one, so it absorbs the difference in paragraph
            length and everything below it stays level. */}
        <div className="grid grid-cols-3 grid-rows-[auto_auto_1fr_auto_auto] gap-5.5 max-lg:grid-cols-1 max-lg:grid-rows-none">
          {/* 1 — accuracy. The dark anchor card, and now the one that leads. */}
          <Card
            n="01"
            pillar="Accuracy"
            heading="Read by a person, not just forwarded"
            tone="dark"
            body={
              <>
                {/* The first sentence was word for word step three of the process
                    section below. One statement, in the place it belongs. */}
                Where there is something you will want to look at twice, we say so at the top, not
                on page nine.
              </>
            }
            value="Every report"
            caption="checked against the property, the title and the enquiry"
            /* /how-we-work does not exist. The product catalogue is the nearest
               real page — it names the supplier behind every report. */
            href={routes.products}
            cta="What we check, report by report"
          />

          {/* 2 — speed */}
          <Card
            n="02"
            pillar="Speed"
            /* Left as it was. The criticism was of the accuracy and service
               headings, which were clauses; this one is already a claim, and
               lengthening it pushed the card to a three-line heading against
               its neighbours' two. */
            heading="Speed you can check"
            tone="light"
            body={
              <>
                {/* "The quickest, the average and the longest" was said three times on
                    this page, and the tracker two sections below shows the numbers. */}
                Most providers quote a range. We publish the figures council by council.
              </>
            }
            value={k ? `${k.within_5_days_of_top} of ${k.top_count}` : "Council by council"}
            caption="of our busiest councils returned within 5 working days"
            href={routes.tracker}
            cta="See every council"
          />

          {/* 3 — service. Coral: the palette reserves it for the human side. */}
          <Card
            n="03"
            pillar="Service"
            heading="Answered by the people doing the work"
            tone="coral"
            body={
              <>
                {/* The second sentence was near word for word the "Some things are
                    quicker on the phone" section, and the years are the story
                    section's headline. Both are better where they already are. */}
                One direct number, not a ticket queue, answered by someone who already knows the
                file.
              </>
            }
            value={
              <Unconfirmed when={contact.hours.confirmed} title={contact.hours.note}>
                {contact.hours.from}&ndash;{contact.hours.to}
              </Unconfirmed>
            }
            caption={`${contact.hours.days}, answered by ${contact.answeredBy.toLowerCase()}`}
            href="#talk"
            cta="How to reach us"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * One tone per pillar, so the three cards read as a set rather than as one
 * styled card and two defaults.
 *
 * Note `badge` on the coral card: `coral-deep`, not `coral`. White on plain
 * coral is 3.18:1, and a 16px bold numeral is not large text, so it would fail
 * AA — see the token comments in app/css/style.css.
 */
const tones = {
  dark: {
    shell: "border-transparent bg-navy text-white",
    badge: "bg-brand-light text-ink",
    pillar: "text-brand-light",
    body: "text-white/70",
    rule: "border-white/20",
    value: "text-brand-light",
    caption: "text-white/55",
    link: "text-brand-light",
  },
  light: {
    shell: "border-mist bg-white",
    badge: "bg-sky text-brand-dark",
    pillar: "text-brand-dark",
    body: "text-tx-mid",
    rule: "border-mist",
    value: "text-brand-dark",
    caption: "text-tx-low",
    link: "text-brand-dark",
  },
  coral: {
    shell: "border-[#F8D6CC] bg-coral-soft",
    badge: "bg-coral-deep text-white",
    pillar: "text-coral-ink",
    body: "text-tx-mid",
    rule: "border-[#F8D6CC]",
    value: "text-coral-ink",
    caption: "text-tx-mid",
    link: "text-coral-ink",
  },
} as const;

function Card({
  n,
  pillar,
  heading,
  body,
  value,
  caption,
  href,
  cta,
  tone,
}: {
  n: string;
  pillar: string;
  heading: string;
  body: React.ReactNode;
  value: React.ReactNode;
  caption: string;
  href: string;
  cta: string;
  tone: keyof typeof tones;
}) {
  const t = tones[tone];

  return (
    /*
     * `row-span-5` plus `grid-rows-subgrid` is what holds the three cards in
     * step. Dropped to a plain flex column below lg, where the cards stack and
     * there is nothing left to align them with.
     */
    <article
      className={`grid grid-rows-subgrid row-span-5 rounded-hero border p-10 pb-9.5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_70px_-46px_rgb(13_31_51_/_0.6)] max-lg:flex max-lg:flex-col ${t.shell}`}
    >
      {/* The pillar is named now. A bare numbered circle told the reader there
          were three of something, but not what any one of them was. */}
      <span className="mb-7 flex items-center gap-3">
        <span
          className={`grid h-10.5 w-10.5 shrink-0 place-items-center rounded-full font-display text-[15px] font-bold ${t.badge}`}
        >
          {n}
        </span>
        <span className={`text-[11.5px] font-bold tracking-[0.16em] uppercase ${t.pillar}`}>
          {pillar}
        </span>
      </span>

      <h3 className="mb-4 text-[26px] text-balance">{heading}</h3>

      <p className={`text-[15.5px] leading-relaxed ${t.body}`}>{body}</p>

      <span className={`mt-7.5 block border-t pt-6 ${t.rule}`}>
        <b
          className={`mb-2 block font-display text-[34px] leading-none font-bold tracking-[-0.04em] ${t.value}`}
        >
          {value}
        </b>
        <span className={`block text-[13.5px] leading-snug ${t.caption}`}>{caption}</span>
      </span>

      <Link
        href={href}
        className={`mt-6.5 inline-flex items-center gap-2 self-start text-[14.5px] font-semibold ${t.link}`}
      >
        {cta} <span aria-hidden>&rarr;</span>
      </Link>
    </article>
  );
}

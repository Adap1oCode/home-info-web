import Link from "next/link";

import { routes } from "@/config/site";
import { guides as allGuides } from "@/content/guides";

/**
 * Driven from content/guides.ts rather than a hardcoded list.
 *
 * The three cards here used to be written out by hand and pointed at
 * /guides/why-council-searches-take-time, /guides/llc1-versus-personal-search
 * and /guides/searches-for-auction-purchases — none of which exist. The guides
 * that do exist had different slugs entirely, so the section advertised three
 * articles nobody could read. Taking the first three from the real content file
 * means the links cannot drift out of step again.
 */
const featured = allGuides.slice(0, 3);

export default function Guides() {
  return (
    /*
     * The one properly coloured band on the page's lower half. Sky is already
     * the palette's reading surface — it backs every eyebrow and the category
     * pills inside these very cards — so a full band of it reads as "reference"
     * rather than as decoration, and the white cards sit on it more brightly
     * than they ever did on chalk.
     *
     * The hairline underneath matters: sky and chalk are close enough in value
     * that without it the band's bottom edge dissolves into the FAQ section and
     * the break is wasted. The top edge needs nothing — it meets the white
     * Tools band, which is contrast enough.
     */
    <section className="section-y border-b border-sky-deep bg-sky">
      <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
        <div className="mb-18 max-w-[54rem] max-lg:mb-12">
          {/* bg-white, because .eyebrow is bg-sky and this is the one section
              standing on a sky band — left alone the pill vanishes and the
              label reads as loose blue text while every other section on the
              page shows it as a pill. */}
          <span className="eyebrow bg-white">Worth reading</span>
          <h2 className="mt-6 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
            Guides and explainers.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-5.5 max-[900px]:grid-cols-1">
          {featured.map((g) => (
            <Link
              key={g.slug}
              href={`${routes.guides}/${g.slug}`}
              className="flex flex-col rounded-hero border border-mist bg-white p-9.5 transition hover:-translate-y-1 hover:border-brand-light hover:bg-[#F3F9FE]"
            >
              <span className="w-fit rounded-full bg-sky px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.09em] text-brand-dark">
                {g.category}
              </span>
              <h3 className="mt-5 mb-3 text-[21px] leading-snug">{g.question}</h3>
              <p className="flex-1 text-[14.5px] leading-relaxed text-tx-mid">{g.answer}</p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-[15.5px] text-tx-mid">
          <Link href={routes.guides} className="inline-flex items-center gap-2 font-semibold text-brand-dark">
            All {allGuides.length} guides <span aria-hidden>&rarr;</span>
          </Link>
        </p>
      </div>
    </section>
  );
}

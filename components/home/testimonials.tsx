import { testimonials } from "@/config/site";

/**
 * How many columns a given number of quotes should take.
 *
 * The grid used to be a fixed three tracks whatever the count, so today's
 * single quote sat in the left third with two thirds of the row empty beside
 * it — which reads as a section still waiting for its content rather than a
 * deliberate one. A lone quote now takes the whole width as a feature panel
 * (see `feature` below), and the section fills out as quotes arrive.
 *
 * Four is the other awkward count: three across leaves one orphan underneath,
 * so four pairs off two-by-two instead. Five and up go three across, where a
 * short last row is ordinary rather than conspicuous.
 */
function columnsFor(count: number) {
  if (count <= 1) return 1;
  if (count === 2 || count === 4) return 2;
  return 3;
}

/**
 * Tailwind scans source for whole class names, so these are spelled out rather
 * than built from `columnsFor`'s return value.
 *
 * An intermediate two-across step at 900–1100px was tried and removed: three
 * cards are 297px wide in that band, which is tight, but dropping them to two
 * leaves the third alone in a half-empty row — the same hole this section was
 * changed to close, just at a narrower window. Cramped beats conspicuous, and
 * three-to-one is what the section already shipped with.
 */
const GRID_CLASS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2 max-[900px]:grid-cols-1",
  3: "grid-cols-3 max-[900px]:grid-cols-1",
};

/**
 * Renders nothing while config.testimonials is empty.
 *
 * That is the point: an absent section is better than an invented one, and it
 * means nobody has to remember to delete placeholder quotes before launch.
 */
export default function Testimonials() {
  const shown = testimonials.filter((t) => t.confirmed);
  if (shown.length === 0) return null;

  const columns = columnsFor(shown.length);
  /* One quote, laid out across the full width: the quote itself set larger on
     the left, attribution in its own column on the right. Simply stretching
     the card to 1240px would have given a 140-character measure, which is
     worse to read than the narrow card it replaced. */
  const feature = columns === 1;

  return (
    /* `id` makes /#testimonials a linkable anchor for outreach, and /testimonials
       301s here (next.config.js). The global `section` rule in app/css/style.css
       carries the scroll-margin that clears the sticky header. */
    /* Dark, to break up the run of light sections.
       Between the tracker at the top of the page and the closing CTA there were
       nine pale sections in a row — white, chalk, a blue panel, an apricot panel,
       white again — which flattens out however good each one is on its own. This
       is the midpoint of that run. `bg-ink` rather than a new colour: it is the
       site's dark-section ground, already carrying the tracker and the CTA, and a
       third near-navy would read as a mistake rather than a third choice. */
    <section id="testimonials" className="section-y bg-ink text-white">
      <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
        <div className="mb-18 max-w-[54rem] max-lg:mb-12">
          {/* The default eyebrow is a pale blue pill with dark blue text, which
              disappears into the ground here. Same override the tracker and the
              CTA use. */}
          <span className="eyebrow bg-white/10 text-white">
            From the firms who use us
          </span>
          <h2 className="mt-6 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
            What our clients say.
          </h2>
        </div>

        <ul className={`grid list-none gap-5.5 ${GRID_CLASS[columns]}`}>
          {shown.map((t, i) => (
            /* Every card white, and no border.
               The middle one used to be picked out in `bg-sky` against its white
               neighbours. On a dark ground that distinction all but vanishes —
               #EAF2FB and #FFFFFF are a hair apart once everything around them is
               near-black — so it would read as a printing fault rather than an
               accent. The cards are already the bright thing in the section; that
               is contrast enough. The border went for the same reason: an edge
               drawn in `mist` did work against a pale page and does nothing here.
               `text-tx` resets the white inherited from the section. */
            <li
              key={`${t.name}-${i}`}
              style={{ ["--reveal-offset" as string]: `${(i % 3) * 6}%` }}
              className={`reveal rounded-hero bg-white text-tx ${
                feature
                  ? "grid grid-cols-[1.45fr_0.55fr] items-center gap-13 p-13 max-[900px]:grid-cols-1 max-[900px]:gap-7 max-[900px]:p-9.5"
                  : "flex flex-col p-9.5"
              }`}
            >
              <div className={feature ? undefined : "flex flex-1 flex-col"}>
                <p
                  aria-hidden
                  className="mb-5 text-[14px] tracking-[3px] text-coral"
                >
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </p>
                {/* font-normal, not font-medium. Sora at 500 was heavier than
                      a quote needs to be at this size, and heavier than the
                      reading weight used anywhere else on the page. */}
                <blockquote
                  className={`font-display leading-snug font-normal ${
                    feature
                      ? "text-[clamp(21px,2.3vw,28px)] tracking-[-0.028em]"
                      : "flex-1 text-[20px] tracking-[-0.022em]"
                  }`}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <footer
                className={`border-mist ${
                  feature
                    ? "border-l pl-13 max-[900px]:border-t max-[900px]:border-l-0 max-[900px]:pt-6 max-[900px]:pl-0"
                    : "mt-6.5 border-t pt-5.5"
                }`}
              >
                {/* Sora at 600, not Inter at 700.
                      Every other small name on this site is display-set with
                      negative tracking — accreditations.tsx and integrations.tsx
                      both use font-display ... tracking-[-0.02em] at this size.
                      This one was the outlier: Inter bold at default tracking,
                      which renders wider and heavier than the 20px quote it
                      belongs to, so the attribution outweighed the words.

                      `cite`, not `b`. This is the source of a quotation, which is
                      that element's actual job; `b` only ever meant "bold", and
                      the weight is set by class anyway. */}
                <cite className="block font-display text-[14.5px] leading-tight font-semibold tracking-[-0.02em] text-tx not-italic">
                  {t.name}
                </cite>
                {/* Stacked rather than joined with a middot.
                      Janet's role carries a firm as well as a job title, so the
                      joined form read "Residential Conveyancer, Lowick Mckay ·
                      Stockport" — a comma and a middot doing the same work in one
                      line, then wrapping mid-separator in a 377px column. One
                      fact per line, stepping down in colour rather than falling
                      off a 700-to-400 cliff. */}
                {t.role ? (
                  <span className="mt-1.5 block text-[13px] leading-snug text-tx-mid">
                    {t.role}
                  </span>
                ) : null}
                {t.location ? (
                  <span className="mt-0.5 block text-[13px] leading-snug text-tx-low">
                    {t.location}
                  </span>
                ) : null}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

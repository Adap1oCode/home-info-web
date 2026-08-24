import { testimonials } from "@/config/site";

/**
 * Renders nothing while config.testimonials is empty.
 *
 * That is the point: an absent section is better than an invented one, and it
 * means nobody has to remember to delete placeholder quotes before launch.
 */
export default function Testimonials() {
  const shown = testimonials.filter((t) => t.confirmed);
  if (shown.length === 0) return null;

  return (
    /* `id` makes /#testimonials a linkable anchor for outreach. scroll-mt clears
       the sticky header, which otherwise covers the heading on jump. */
    <section id="testimonials" className="section-y scroll-mt-24">
      <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
        <div className="mb-18 max-w-[54rem] max-lg:mb-12">
          <span className="eyebrow">From the firms who use us</span>
          <h2 className="mt-6 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
            What our clients say.
          </h2>
        </div>

        <ul className="grid list-none grid-cols-3 gap-5.5 max-[900px]:grid-cols-1">
          {shown.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              className={`flex flex-col rounded-hero border p-9.5 ${
                i === 1 ? "border-[#CFE2F5] bg-sky" : "border-mist bg-white"
              }`}
            >
              <p aria-hidden className="mb-5 text-[14px] tracking-[3px] text-coral">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </p>
              <blockquote className="flex-1 font-display text-[20px] leading-snug font-medium tracking-[-0.022em]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className={`mt-6.5 border-t pt-5.5 text-[13px] text-tx-low ${i === 1 ? "border-[#CFE2F5]" : "border-mist"}`}>
                <b className="block text-[14.5px] font-bold text-tx">{t.name}</b>
                {t.role}
                {t.location ? ` · ${t.location}` : ""}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

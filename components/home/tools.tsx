import Link from "next/link";

import { routes, tracker } from "@/config/site";

/**
 * All three cards used to point at /tools/*, none of which was ever built.
 * Two had a real equivalent already live and now point at it. "Risk check"
 * had none, so it is gone rather than linking nowhere — bring it back when the
 * page exists.
 */
const tools = [
  {
    href: routes.quote,
    title: "Build a quote",
    body: "Pick the reports you need and tell us the property. We price it against that council's own official fees and come back to you.",
    cta: "Get a quote",
    icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  },
  {
    href: routes.councils,
    title: "Check a council",
    body: `Find the authority you are buying in and see the quickest, average and longest turnaround we have recorded there over the last ${tracker.windowDays} days.`,
    cta: "Find a council",
    icon: (
      <>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M12 6.5V12l3.5 2" />
      </>
    ),
  },
];

export default function Tools() {
  return (
    /*
     * White band, and the cards invert to chalk to stay legible on it.
     *
     * Testimonials renders null while no quote is confirmed, so the live tail
     * of this page was Tools, Guides and FAQs — three sections running on the
     * bare chalk page colour, each one an eyebrow over a heading over a grid of
     * white cards. Roughly two screens of identical grey before the dark CTA.
     * This band and the sky one under Guides break that run into white, blue
     * and chalk, so the last third of the page has the same alternation the
     * middle of it already had.
     */
    <section id="tools" className="section-y bg-white">
      <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
        <div className="mb-18 max-w-[54rem] max-lg:mb-12">
          <span className="eyebrow">Work it out yourself</span>
          <h2 className="mt-6 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
            Answers before you&rsquo;ve spoken to anyone.
          </h2>
          <p className="mt-6 max-w-[40em] text-[19px] leading-relaxed text-tx-mid">
            These use the same live data as our turnaround tracker and the same pricing as your
            invoice.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5.5 max-[900px]:grid-cols-1">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              /* chalk on white, the reverse of every other card grid on the
                 page — a white card on a white band would only be a border.
                 Hover lifts it to white so the card brightens rather than
                 dulls. */
              className="group flex flex-col rounded-hero border border-mist bg-chalk p-10 pb-8.5 transition duration-200 hover:-translate-y-1.5 hover:border-brand-light hover:bg-white hover:shadow-[0_28px_56px_-34px_rgb(52_140_220_/_0.55)]"
            >
              <span className="mb-6.5 grid h-14 w-14 place-items-center rounded-[14px] bg-sky text-brand-dark transition group-hover:bg-brand group-hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {t.icon}
                </svg>
              </span>
              <h3 className="mb-3 text-[24px]">{t.title}</h3>
              <p className="mb-6 flex-1 text-[14.5px] leading-relaxed text-tx-mid">{t.body}</p>
              <span className="flex items-center gap-2 text-[13.5px] font-bold text-brand-dark">
                {t.cta} <span aria-hidden>&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

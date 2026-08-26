const steps = [
  {
    n: 1,
    title: "You send it over",
    body: "Portal, email, or a phone call if that is quicker. An address and a title number is usually enough for us to work out the rest.",
  },
  {
    n: 2,
    title: "We chase, not you",
    body: "We deal with the councils directly and follow up on anything outstanding. If a search is going to be late, you should hear it from us first.",
  },
  {
    n: 3,
    title: "A person reads it",
    body: "Read against the property, the title and the enquiry before it goes out.",
  },
  {
    n: 4,
    title: "Delivered, with a note",
    body: "Straight to your case file. If there is something you will want to look at twice, we say so at the top rather than leaving you to find it.",
  },
];

export default function Process() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
        <div className="mb-18 max-w-[54rem] max-lg:mb-12">
          <span className="eyebrow">How an order runs</span>
          <h2 className="mt-6 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
            Four steps — and we do the chasing in all of them.
          </h2>
        </div>

        <ol className="relative grid list-none grid-cols-4 gap-8.5 max-[860px]:grid-cols-2 max-[860px]:gap-x-7.5 max-[860px]:gap-y-12 max-[480px]:grid-cols-1">
          <span
            aria-hidden
            className="absolute top-10 right-[11%] left-[11%] h-0.5 bg-[repeating-linear-gradient(90deg,var(--color-mist)_0_8px,transparent_8px_16px)] max-[860px]:hidden"
          />
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="reveal group relative text-center"
              style={{ ["--reveal-offset" as string]: `${i * 5}%` }}
            >
              <span className="relative z-[2] mx-auto mb-6.5 grid h-20 w-20 place-items-center rounded-full border-2 border-mist bg-white font-display text-[26px] font-bold text-brand-dark transition group-hover:scale-105 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                {s.n}
              </span>
              <h3 className="mb-3 text-[20px]">{s.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-tx-mid">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

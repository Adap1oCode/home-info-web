import Link from "next/link";

import { glossary, guideCategories, guides } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guides for conveyancers",
  description:
    "Short, direct answers to the questions conveyancers actually ask about property searches: timing, ordering, what each search covers, and when you do not need one.",
  path: "/guides",
});

export default function GuidesHub() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink py-16 text-white max-lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(820px 560px at 86% -12%, rgb(52 140 220 / 0.38), transparent 64%)," +
              "linear-gradient(160deg, #0D1F33 0%, #143050 55%, #0D1F33 100%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-8 max-sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-[13.5px] text-white/55">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-white/80">Guides</span>
          </nav>

          <h1 className="max-w-[16em] text-[clamp(30px,3.6vw,46px)] leading-[1.06] tracking-[-0.03em]">
            Straight answers, without the padding
          </h1>
          <p className="mt-5 max-w-[44em] text-[17px] leading-relaxed text-white/70">
            The questions we get asked most often, answered in the first two sentences. If the answer
            is &ldquo;it depends&rdquo;, we say what it depends on rather than leaving you to guess.
          </p>
        </div>
      </section>

      <section className="py-20 max-lg:py-14">
        <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
          {guideCategories.map((category) => {
            const inCategory = guides.filter((g) => g.category === category);
            if (inCategory.length === 0) return null;

            return (
              <div key={category} className="mb-14 last:mb-0">
                <h2 className="mb-1 text-[22px] tracking-[-0.028em]">{category}</h2>
                <p className="mb-6 text-[13.5px] text-tx-low">
                  {inCategory.length} {inCategory.length === 1 ? "question" : "questions"}
                </p>

                <ul className="grid list-none grid-cols-2 gap-4 max-[820px]:grid-cols-1">
                  {inCategory.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/guides/${g.slug}`}
                        className="group flex h-full flex-col rounded-hero border border-mist bg-white p-8 transition hover:-translate-y-1 hover:border-brand hover:shadow-[0_24px_50px_-32px_rgb(52_140_220_/_0.55)]"
                      >
                        <h3 className="text-[21px] leading-snug">{g.question}</h3>
                        <p className="mt-3.5 flex-1 text-[15px] leading-relaxed text-tx-mid">
                          {g.answer.split(". ")[0]}.
                        </p>
                        <span className="mt-5 flex items-center gap-2 text-[13.5px] font-semibold text-brand-dark">
                          Read the answer <span aria-hidden>&rarr;</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* glossary */}
          <Link
            href="/guides/glossary"
            className="mt-4 flex items-center gap-8 rounded-hero border border-[#CFE2F5] bg-sky p-9 transition hover:-translate-y-1 hover:border-brand max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-5"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[16px] bg-brand text-white">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H19v16H5.5A1.5 1.5 0 0 1 4 18.5Z" />
                <path d="M8 8.5h7M8 12h7" />
              </svg>
            </span>
            <span className="flex-1">
              <span className="block font-display text-[22px] font-semibold tracking-[-0.028em]">
                Glossary
              </span>
              <span className="mt-2 block max-w-[44em] text-[15px] leading-relaxed text-tx-mid">
                {glossary.length} terms explained plainly — LLC1, CON29, CON29O, chancel repair,
                Article 4 and the rest. One page, so you can search it.
              </span>
            </span>
            <span className="text-[14px] font-semibold whitespace-nowrap text-brand-dark">
              Open <span aria-hidden>&rarr;</span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

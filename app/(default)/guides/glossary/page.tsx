import type { Metadata } from "next";
import Link from "next/link";

import { seo } from "@/config/site";
import { glossary } from "@/content/guides";

export const metadata: Metadata = {
  title: "Property search glossary",
  description:
    "LLC1, CON29, CON29O, chancel repair, Article 4 and the rest — the terms that appear on a search report, explained plainly and on one page.",
  alternates: { canonical: `${seo.siteUrl}/guides/glossary` },
};

const anchor = (term: string) => term.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function GlossaryPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink py-14 text-white max-lg:py-11">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(760px 520px at 88% -14%, rgb(52 140 220 / 0.36), transparent 64%)," +
              "linear-gradient(160deg, #0D1F33 0%, #143050 55%, #0D1F33 100%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-8 max-sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-[13.5px] text-white/55">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/guides" className="hover:text-white">
              Guides
            </Link>
            <span className="px-2">/</span>
            <span className="text-white/80">Glossary</span>
          </nav>

          <h1 className="text-[clamp(30px,3.6vw,46px)] leading-[1.06] tracking-[-0.03em]">
            Property search glossary
          </h1>
          <p className="mt-5 max-w-[44em] text-[17px] leading-relaxed text-white/70">
            {glossary.length} terms, on one page so you can search it with Ctrl+F rather than
            clicking through twenty of them.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-8 py-16 max-lg:py-12 max-sm:px-6">
        {/* jump links — also gives crawlers the full term list up front */}
        <nav aria-label="Terms" className="mb-12 flex flex-wrap gap-2">
          {glossary.map((t) => (
            <a
              key={t.term}
              href={`#${anchor(t.term)}`}
              className="inline-flex rounded-full border border-mist bg-white px-4 py-2 text-[13px] font-medium transition hover:border-brand hover:text-brand-dark"
            >
              {t.term}
            </a>
          ))}
        </nav>

        <dl className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
          {glossary.map((t) => (
            <div
              key={t.term}
              id={anchor(t.term)}
              className="scroll-mt-28 rounded-hero border border-mist bg-white p-8 max-sm:p-6"
            >
              <dt className="font-display text-[19px] font-semibold tracking-[-0.025em]">
                {t.term}
              </dt>
              <dd className="mt-3 text-[15.5px] leading-relaxed text-tx-mid">{t.definition}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 rounded-hero border border-[#CFE2F5] bg-sky p-8 max-sm:p-6">
          <p className="font-display text-[19px] leading-snug font-semibold tracking-[-0.025em]">
            Something here not clear?
          </p>
          <p className="mt-2.5 max-w-[46em] text-[15.5px] leading-relaxed text-tx-mid">
            If a term on a report is not covered, tell us and we will add it. The list exists because
            people ask — it is not meant to be complete for its own sake.
          </p>
          <Link
            href="/guides"
            className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-brand-dark"
          >
            Back to guides <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </>
  );
}

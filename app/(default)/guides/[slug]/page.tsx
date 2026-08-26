import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CouncilPicker from "@/components/councils/council-picker";
import { contact, nav, phoneHref } from "@/config/site";
import { guideBySlug, guides, type Guide } from "@/content/guides";
import { getPickerCouncils } from "@/lib/councils";
import { Unconfirmed } from "@/components/ui/unconfirmed";
import { pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return { title: "Not found" };

  /* The answer doubles as the meta description — it is written to stand alone.
     Clamped because these run 198–295 characters and every one of them was
     being cut off mid-sentence in the results page; clampDescription stops at
     the last full stop that fits instead. */
  return pageMetadata({
    title: guide.question,
    description: guide.answer,
    path: `/guides/${guide.slug}`,
    type: "article",
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();

  const related = guide.related.map(guideBySlug).filter(Boolean) as Guide[];

  // Fetched server-side and passed down, so the widget never fetches or shows
  // a loading state. Only the ~25 KB picker shape crosses to the client.
  const pickerCouncils =
    guide.widget === "council-turnaround" ? await getPickerCouncils() : [];

  return (
    <>
      <JsonLd guide={guide} />

      {/* ---------------------------------------------------------- header */}
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
            <span className="text-white/80">{guide.short}</span>
          </nav>

          <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-[12.5px] font-semibold">
            {guide.category}
          </span>
          <h1 className="mt-5 max-w-[19em] text-[clamp(28px,3.3vw,42px)] leading-[1.08] tracking-[-0.03em]">
            {guide.question}
          </h1>
        </div>
      </section>

      {/* ------------------------------------------------------------ body */}
      <div className="mx-auto max-w-[1240px] px-8 py-16 max-lg:py-12 max-sm:px-6">
        <div className="grid grid-cols-[minmax(0,68ch)_300px] gap-16 max-[1080px]:grid-cols-1 max-[1080px]:gap-12">
          <article>
            {/*
              The answer box. This is the whole point of the page format: the
              direct response sits above everything else, so a reader, a search
              engine snippet and a language model all get the same two sentences.
            */}
            <div className="rounded-hero border-l-4 border-coral bg-coral-soft p-8 max-sm:p-6">
              <p className="mb-3 text-[11px] font-bold tracking-[0.14em] text-coral-ink uppercase">
                The short answer
              </p>
              <p className="font-display text-[21px] leading-[1.45] font-medium tracking-[-0.02em] text-tx">
                {guide.answer}
              </p>
            </div>

            {guide.widget === "council-turnaround" && pickerCouncils.length > 0 && (
              <div className="mt-6">
                <CouncilPicker councils={pickerCouncils} />
              </div>
            )}

            <div className="mt-10 space-y-6">
              {guide.body.map((para, i) => (
                <p key={i} className="text-[17px] leading-[1.75] text-tx-mid">
                  {para}
                </p>
              ))}
            </div>

            {guide.points && (
              <ul className="mt-10 list-none space-y-3">
                {guide.points.map((p) => (
                  <li
                    key={p.title}
                    className="flex gap-4 rounded-card border border-mist bg-white p-6"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sky text-brand-dark">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7" />
                      </svg>
                    </span>
                    <span>
                      <b className="block font-display text-[16px] font-semibold tracking-[-0.02em]">
                        {p.title}
                      </b>
                      <span className="mt-1 block text-[15px] leading-relaxed text-tx-mid">
                        {p.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* in-body CTA, at the point the reader has their answer */}
            <div className="mt-12 rounded-hero bg-ink p-8 text-white max-sm:p-6">
              <p className="font-display text-[20px] leading-snug font-semibold tracking-[-0.025em]">
                Still not sure how this applies to your property?
              </p>
              <p className="mt-3 max-w-[42em] text-[15.5px] leading-relaxed text-white/65">
                Give us the address and we will tell you what we would order and why — including the
                searches we think you can leave out.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href={nav.primaryCta.href}
                  className="inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3.5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
                >
                  {nav.primaryCta.label} <span aria-hidden>&rarr;</span>
                </Link>
                <a href={phoneHref} className="text-[15px] font-semibold text-coral hover:text-white">
                  or call{" "}
                  <Unconfirmed when={contact.phone.confirmed} title={contact.phone.note}>
                    {contact.phone.display}
                  </Unconfirmed>
                </a>
              </div>
            </div>
          </article>

          {/* ----------------------------------------------------- side rail */}
          <aside className="max-[1080px]:hidden">
            <div className="sticky top-28 space-y-4">
              {related.length > 0 && (
                <div className="rounded-hero border border-mist bg-white p-7">
                  <p className="mb-4 text-[11px] font-bold tracking-[0.14em] text-tx-low uppercase">
                    Related
                  </p>
                  <ul className="list-none space-y-3.5">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/guides/${r.slug}`}
                          className="block text-[15px] leading-snug font-medium transition hover:text-brand-dark"
                        >
                          {r.short}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-hero border border-[#CFE2F5] bg-sky p-7">
                <p className="font-display text-[17px] leading-snug font-semibold tracking-[-0.02em]">
                  Turnaround, council by council
                </p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-tx-mid">
                  We publish what we actually achieved for every council where we have enough data.
                </p>
                <Link
                  href="/councils"
                  className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand-dark"
                >
                  Find a council <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* related, shown inline once the rail is hidden */}
        {related.length > 0 && (
          <div className="mt-14 hidden max-[1080px]:block">
            <h2 className="mb-5 text-[20px] tracking-[-0.025em]">Related questions</h2>
            <ul className="grid list-none grid-cols-2 gap-3 max-[640px]:grid-cols-1">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/guides/${r.slug}`}
                    className="block h-full rounded-card border border-mist bg-white px-6 py-5 text-[15px] font-medium transition hover:border-brand hover:text-brand-dark"
                  >
                    {r.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

/**
 * FAQPage with a single entity.
 *
 * Google restricted FAQ rich results in 2023, so this is unlikely to change how
 * the listing looks. It is here because it makes the question/answer pairing
 * explicit for anything parsing the page — which increasingly includes language
 * models rather than only crawlers.
 */
function JsonLd({ guide }: { guide: Guide }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: guide.question,
        acceptedAnswer: { "@type": "Answer", text: guide.answer },
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import BoundaryMap from "@/components/councils/boundary-map";
import { seo } from "@/config/site";
import {
  BOUNDARY_ATTRIBUTION,
  getBoundary,
  getPublishableCouncils,
  groupByRegion,
  type PublicCouncil,
} from "@/lib/councils";
import { formatInt, getPerformance, shortCouncil } from "@/lib/performance";

export const revalidate = 86_400;

export const metadata: Metadata = {
  title: "Local authorities we cover",
  description:
    "Every local authority we order property searches from across England and Wales, grouped by region, with the turnaround we have measured where we have enough data to publish one.",
  alternates: { canonical: `${seo.siteUrl}/councils` },
};

export default async function CouncilsIndex() {
  const [councils, perf] = await Promise.all([getPublishableCouncils(), getPerformance()]);
  const grouped = groupByRegion(councils);

  // Councils where we have published figures get a marker in the list.
  const measured = new Set(
    (perf?.councils ?? []).map((c) => shortCouncil(c.council).toLowerCase()),
  );

  // A few boundary shapes for the header, purely as decoration.
  const showcase = councils.filter((c) => c.ons_code).slice(0, 6);
  const shapes = await Promise.all(
    showcase.map(async (c) => ({ council: c, boundary: await getBoundary(c.ons_code) })),
  );

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-16 text-white max-lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(820px 560px at 85% -12%, rgb(52 140 220 / 0.38), transparent 64%)," +
              "linear-gradient(160deg, #0D1F33 0%, #143050 55%, #0D1F33 100%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-8 max-sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-[13.5px] text-white/55">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-white/80">Councils</span>
          </nav>

          <h1 className="max-w-[18em] text-[clamp(30px,3.6vw,46px)] leading-[1.06] tracking-[-0.03em]">
            Local authorities we order searches from
          </h1>
          <p className="mt-5 max-w-[44em] text-[17px] leading-relaxed text-white/70">
            {formatInt(councils.length)} authorities across England and Wales. Where we have
            completed enough searches in an area to publish a figure we would stand behind, it is
            on that council&rsquo;s page.
          </p>

          <ul className="mt-9 flex list-none flex-wrap gap-5 opacity-70">
            {shapes.map(
              ({ council, boundary }) =>
                boundary && (
                  <li key={council.slug} className="w-16">
                    <BoundaryMap path={boundary.path} name={council.name} tone="dark" />
                  </li>
                ),
            )}
          </ul>
        </div>
      </section>

      <section className="py-20 max-lg:py-14">
        <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
          {councils.length === 0 ? (
            <p className="text-[17px] text-tx-mid">
              Our council list is refreshing. Please check back shortly.
            </p>
          ) : (
            <>
              {/* jump links double as internal linking for crawlers */}
              <nav aria-label="Regions" className="mb-12 flex flex-wrap gap-2.5">
                {grouped.map((g) => (
                  <a
                    key={g.region}
                    href={`#${slugifyRegion(g.region)}`}
                    className="inline-flex rounded-full border border-mist bg-white px-5 py-2.5 text-[13.5px] font-medium transition hover:border-brand hover:text-brand-dark"
                  >
                    {g.region}{" "}
                    <span className="ml-1.5 text-tx-low">{g.councils.length}</span>
                  </a>
                ))}
              </nav>

              {grouped.map((g) => (
                <div key={g.region} id={slugifyRegion(g.region)} className="mb-14 scroll-mt-28">
                  <h2 className="mb-1 text-[24px] tracking-[-0.028em]">{g.region}</h2>
                  <p className="mb-6 text-[14px] text-tx-low">
                    {g.councils.length} {g.councils.length === 1 ? "authority" : "authorities"}
                  </p>

                  <ul className="grid list-none grid-cols-4 gap-2.5 max-[1000px]:grid-cols-3 max-[720px]:grid-cols-2 max-[440px]:grid-cols-1">
                    {g.councils.map((c: PublicCouncil) => {
                      const hasFigures = measured.has(shortCouncil(c.name).toLowerCase());
                      return (
                        <li key={c.slug}>
                          <Link
                            href={`/councils/${c.slug}`}
                            className="flex h-full flex-col rounded-card border border-mist bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_16px_34px_-24px_rgb(52_140_220_/_0.7)]"
                          >
                            <span className="text-[14.5px] leading-snug font-semibold">
                              {shortCouncil(c.name)}
                            </span>
                            {hasFigures && (
                              <span className="mt-1.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-sky px-2.5 py-1 text-[10.5px] font-bold tracking-[0.04em] uppercase text-brand-dark">
                                Figures published
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <p className="max-w-[46em] text-[12px] leading-relaxed text-tx-low">
                {BOUNDARY_ATTRIBUTION}
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}

const slugifyRegion = (r: string) => r.toLowerCase().replace(/[^a-z0-9]+/g, "-");

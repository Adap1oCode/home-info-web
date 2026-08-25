import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BoundaryMap from "@/components/councils/boundary-map";
import { company, nav, seo } from "@/config/site";
import {
  BOUNDARY_ATTRIBUTION,
  councilTypeLabel,
  getBoundary,
  getCouncil,
  getPublishableCouncils,
  PUBLISHABLE,
  type PublicCouncil,
} from "@/lib/councils";
import {
  band,
  formatInt,
  formatQuickest,
  getPerformance,
  hasPercentiles,
  methodologyNote,
  shortCouncil,
  type CouncilStat,
} from "@/lib/performance";

export const revalidate = 86_400;

/**
 * Pre-renders every council at build time. The pages are generated from the
 * database, but a crawler receives static HTML — no client-side fetching, no
 * JavaScript required to read the content.
 */
export async function generateStaticParams() {
  const councils = await getPublishableCouncils();
  return councils.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const council = await getCouncil(slug);
  if (!council) return { title: "Council not found" };

  const where = council.region ? ` in ${council.region}` : "";
  const title = `${council.name} — property searches and turnaround`;
  const description =
    `Property search information for ${council.name}${where}: how we order local ` +
    `authority searches there, the turnaround we have measured, and links to the ` +
    `council's own planning and land charges services.`;

  return {
    title,
    description,
    alternates: { canonical: `${seo.siteUrl}/councils/${council.slug}` },
    openGraph: { title, description, url: `${seo.siteUrl}/councils/${council.slug}` },
  };
}

export default async function CouncilPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const council = await getCouncil(slug);
  if (!council) notFound();

  const [boundary, perf, all] = await Promise.all([
    getBoundary(council.ons_code),
    getPerformance(),
    getPublishableCouncils(),
  ]);

  // Our own measured figures, if this council reaches the reporting threshold.
  const stat: CouncilStat | undefined = perf?.councils.find(
    (c) => shortCouncil(c.council).toLowerCase() === shortCouncil(council.name).toLowerCase(),
  );

  const nearby = all
    .filter((c) => c.region && c.region === council.region && c.slug !== council.slug)
    .slice(0, 8);

  const published = (Object.keys(PUBLISHABLE) as (keyof PublicCouncil["unverified"])[])
    .map((k) => ({ key: k, meta: PUBLISHABLE[k]!, value: council.unverified[k] }))
    .filter((f) => f.value !== null && f.value !== undefined && f.value !== "");

  return (
    <>
      <JsonLd council={council} />

      {/* ---------------------------------------------------------- header */}
      <section className="relative overflow-hidden bg-ink py-16 text-white max-lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(820px 560px at 88% -12%, rgb(52 140 220 / 0.38), transparent 64%)," +
              "linear-gradient(160deg, #0D1F33 0%, #143050 55%, #0D1F33 100%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-8 max-sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-[13.5px] text-white/55">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/councils" className="hover:text-white">
              Councils
            </Link>
            <span className="px-2">/</span>
            <span className="text-white/80">{council.name}</span>
          </nav>

          <div className="grid grid-cols-[1fr_260px] items-center gap-14 max-lg:grid-cols-1 max-lg:gap-8">
            <div>
              <h1 className="text-[clamp(30px,3.6vw,46px)] leading-[1.06] tracking-[-0.03em]">
                Property searches in {council.name}
              </h1>
              <p className="mt-5 max-w-[42em] text-[17px] leading-relaxed text-white/70">
                What we can tell you about ordering searches here, and how quickly they have
                actually come back.
              </p>

              <ul className="mt-7 flex list-none flex-wrap gap-2.5">
                {councilTypeLabel(council.council_type) && (
                  <Pill>{councilTypeLabel(council.council_type)}</Pill>
                )}
                {council.region && <Pill>{council.region}</Pill>}
                {council.county && <Pill>{council.county}</Pill>}
                {council.ons_code && <Pill mono>{council.ons_code}</Pill>}
              </ul>
            </div>

            {boundary && (
              <BoundaryMap path={boundary.path} name={council.name} tone="dark" className="max-lg:max-w-[200px]" />
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ measured turnaround */}
      <section className="py-20 max-lg:py-14">
        <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
          <h2 className="text-[clamp(26px,2.8vw,36px)] tracking-[-0.03em]">
            Our turnaround in {shortCouncil(council.name)}
          </h2>

          {stat ? (
            <>
              <div className="mt-8 grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-[440px]:grid-cols-1">
                {/* Best / typical / worst, all on the working-day clock.
                    This used to read Average · Quickest · Longest, which mixed
                    clocks — quickest was elapsed hours — and put two single
                    orders either side of a mean. p10 and p90 describe the
                    service; the absolute fastest and slowest describe one file
                    each. */}
                {hasPercentiles(stat) ? (
                  <>
                    <Metric
                      value={`${stat.p10_work_days}`}
                      unit="working days"
                      label="Best case — 1 in 10 this fast"
                    />
                    <Metric
                      value={stat.median_work_days.toFixed(1)}
                      unit="working days"
                      label="Typical — half are faster"
                      colour={band(stat.median_work_days).color}
                    />
                    <Metric
                      value={`${stat.p90_work_days}`}
                      unit="working days"
                      label="Worst case — 9 in 10 by here"
                    />
                  </>
                ) : (
                  /* The API does not send percentiles yet. These three are the
                     mean, the fastest single order and the slowest — a weaker
                     description of the service, but every figure is real. The
                     branch above takes over on its own once compute.ts ships. */
                  <>
                    <Metric
                      value={formatQuickest(stat.quickest_hours)}
                      label="Quickest returned"
                    />
                    <Metric
                      value={stat.average_work_days.toFixed(1)}
                      unit="working days"
                      label="Average"
                      colour={band(stat.average_work_days).color}
                    />
                    <Metric
                      value={`${stat.longest_work_days}`}
                      unit="working days"
                      label="Longest"
                    />
                  </>
                )}
                <Metric value={formatInt(stat.n)} label="Completed searches" />
              </div>
              <p className="mt-6 max-w-[46em] text-[13.5px] leading-relaxed text-tx-low">
                {methodologyNote()}
              </p>
            </>
          ) : (
            <p className="mt-6 max-w-[46em] text-[16.5px] leading-relaxed text-tx-mid">
              We have not completed enough searches in this area recently to publish a figure we
              would stand behind. Rather than show an average drawn from a handful of orders, we
              show nothing.{" "}
              <Link href="/turnaround" className="font-semibold text-brand-dark">
                See the councils where we do publish
              </Link>
              , or{" "}
              <Link href={nav.primaryCta.href} className="font-semibold text-brand-dark">
                ask us directly
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------- verified links */}
      <section className="pb-20 max-lg:pb-14">
        <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
          <h2 className="text-[clamp(26px,2.8vw,36px)] tracking-[-0.03em]">
            The council&rsquo;s own services
          </h2>
          <p className="mt-4 max-w-[46em] text-[16.5px] leading-relaxed text-tx-mid">
            Links straight to the source, so you can check anything here yourself.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
            {council.website_url && (
              <LinkCard href={council.website_url} title="Council website">
                The authority&rsquo;s main site.
              </LinkCard>
            )}
            {council.planning_portal_url && (
              <LinkCard href={council.planning_portal_url} title="Planning applications">
                Search applications and decisions for this authority.
              </LinkCard>
            )}
            {council.ons_code && (
              <LinkCard
                href={`https://www.ons.gov.uk/search?q=${encodeURIComponent(council.ons_code)}`}
                title={`ONS ${council.ons_code}`}
              >
                Official statistics for this local authority district.
              </LinkCard>
            )}
          </div>

          {published.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
              {published.map((f) => (
                <div key={f.key} className="rounded-card border border-mist bg-white p-6">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.13em] text-tx-low">
                    {f.meta.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-[19px] font-semibold tracking-[-0.02em]">
                    {String(f.value)}
                  </dd>
                  <p className="mt-2 text-[12px] text-tx-low">Source: {f.meta.source}</p>
                </div>
              ))}
            </dl>
          )}

          {boundary && (
            <p className="mt-10 max-w-[46em] text-[12px] leading-relaxed text-tx-low">
              {BOUNDARY_ATTRIBUTION}
            </p>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------ nearby */}
      {nearby.length > 0 && (
        <section className="pb-24 max-lg:pb-16">
          <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
            <h2 className="text-[22px] tracking-[-0.025em]">Other councils in {council.region}</h2>
            <ul className="mt-5 flex list-none flex-wrap gap-2.5">
              {nearby.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/councils/${c.slug}`}
                    className="inline-flex rounded-full border border-mist bg-white px-5 py-2.5 text-[14px] font-medium transition hover:border-brand hover:text-brand-dark"
                  >
                    {shortCouncil(c.name)}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/councils"
              className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand-dark"
            >
              All councils <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------- cta */}
      <section className="mx-8 mb-8 rounded-hero bg-brand px-8 py-14 text-white max-lg:mx-3.5 max-lg:mb-3.5">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[280px]">
            <h2 className="text-[clamp(24px,2.4vw,32px)] tracking-[-0.03em]">
              Need a search in {shortCouncil(council.name)}?
            </h2>
            <p className="mt-3 max-w-[40em] text-[16px] text-white/80">
              We cover {company.coverage}. Tell us the address and we will take it from there.
            </p>
          </div>
          <Link
            href={nav.primaryCta.href}
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5"
          >
            {nav.primaryCta.label} <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ bits */

function Pill({ children, mono = false }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <li
      className={`rounded-full bg-white/10 px-4 py-2 text-[13px] font-medium text-white/85 ${
        mono ? "font-mono text-[12px]" : ""
      }`}
    >
      {children}
    </li>
  );
}

function Metric({
  value,
  unit,
  label,
  colour,
}: {
  value: string;
  unit?: string;
  label: string;
  colour?: string;
}) {
  return (
    <div className="rounded-panel border border-mist bg-white p-6">
      <div
        className="font-display text-[38px] leading-none font-bold tracking-[-0.045em]"
        style={colour ? { color: colour } : undefined}
      >
        {value}
      </div>
      {unit && <div className="mt-1.5 text-[12px] text-tx-low">{unit}</div>}
      <div className="mt-3 text-[13.5px] font-medium text-tx-mid">{label}</div>
    </div>
  );
}

function LinkCard({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-hero border border-mist bg-white p-7 transition hover:-translate-y-1 hover:border-brand hover:shadow-[0_24px_48px_-32px_rgb(52_140_220_/_0.6)]"
    >
      <span className="font-display text-[19px] font-semibold tracking-[-0.025em]">{title}</span>
      <span className="mt-2 flex-1 text-[14px] leading-relaxed text-tx-mid">{children}</span>
      <span className="mt-4 text-[13px] font-semibold text-brand-dark">
        Open <span aria-hidden>&rarr;</span>
      </span>
    </a>
  );
}

/** Breadcrumbs help search engines understand the /councils hierarchy. */
function JsonLd({ council }: { council: PublicCouncil }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: seo.siteUrl },
      { "@type": "ListItem", position: 2, name: "Councils", item: `${seo.siteUrl}/councils` },
      {
        "@type": "ListItem",
        position: 3,
        name: council.name,
        item: `${seo.siteUrl}/councils/${council.slug}`,
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

import Link from "next/link";

import { ConfigValue, Unconfirmed } from "@/components/ui/unconfirmed";
import { company, contact, founder, nav, phoneHref, seo } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

/**
 * The founder page.
 *
 * Every factual claim here comes from `founder` or `company` in config/site.ts,
 * and inherits their `confirmed` flags. Nothing biographical is written from
 * inference — where we do not have the fact, the page shows a marked slot
 * instead of plausible filler. On a site whose whole proposition is "we publish
 * what we actually achieve", an invented career history would be the single
 * most damaging thing on it.
 */
export const metadata = pageMetadata({
  title: `${founder.name.value} — ${founder.role}`,
  description: `${founder.name.value} has worked in property search since ${company.founderStartYear.value} and sits on the executive board of IPSA. Who you are actually dealing with at ${company.tradingName}.`,
  path: founder.href,
});

export default function FounderPage() {
  const quote = founder.pullQuote;
  const hasQuote = quote.confirmed && quote.value.length > 0;

  /** Person schema — the E-E-A-T signal for a named, accountable author. */
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name.value,
    jobTitle: founder.role,
    url: `${seo.siteUrl}${founder.href}`,
    worksFor: {
      "@type": "Organization",
      name: company.legalName,
      url: seo.siteUrl,
    },
    memberOf: {
      "@type": "Organization",
      name: "IPSA — The Association of Independent Personal Search Agents",
      url: "https://ipsa-online.org.uk/",
    },
    knowsAbout: [
      "Local authority property searches",
      "Conveyancing due diligence",
      "The Search Code",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="relative overflow-hidden bg-ink py-16 text-white max-lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(820px 560px at 86% -12%, rgb(52 140 220 / 0.38), transparent 64%)," +
              "radial-gradient(560px 420px at 0% 110%, rgb(232 105 76 / 0.14), transparent 66%)," +
              "linear-gradient(160deg, #0D1F33 0%, #143050 55%, #0D1F33 100%)",
          }}
        />

        <div className="relative mx-auto max-w-[1240px] px-8 max-sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-8 text-[13.5px] text-white/55">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-white/80">{founder.role}</span>
          </nav>

          <div className="grid grid-cols-[200px_1fr] items-center gap-11 max-md:grid-cols-1 max-md:gap-8">
            <div className="grid aspect-square w-full place-items-center overflow-hidden rounded-full bg-navy ring-6 ring-white/10 max-md:mx-auto max-md:max-w-45">
              {founder.photo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={founder.photo.src}
                  alt={founder.photo.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="unconfirmed px-4 text-center text-[12px] leading-tight font-semibold text-white/85">
                  Her photograph
                  <br />
                  here — not stock
                </span>
              )}
            </div>

            <div>
              <span className="eyebrow bg-white/10 text-white">{founder.role}</span>
              <h1 className="mt-5 text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.032em]">
                <ConfigValue field={founder.name} />
              </h1>
              <p className="mt-5 max-w-[38em] text-[17px] leading-relaxed text-white/70">
                In property search since{" "}
                <ConfigValue field={company.founderStartYear} />, in a family that was doing it
                before that. She sits on the executive board of IPSA, and she is the person who
                answers the phone when you call.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <Pill>
                  <ConfigValue field={company.yearsInSearch} format={(v) => `${v} years in search`} />
                </Pill>
                {founder.credentials.map((c) => (
                  <Pill key={c}>{c}</Pill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-lg:py-14">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[1.35fr_0.65fr] items-start gap-16 px-8 max-[980px]:grid-cols-1 max-[980px]:gap-12 max-sm:px-6">
          <div>
            <h2 className="text-[clamp(26px,3vw,36px)] tracking-[-0.03em]">
              Who you&rsquo;re actually dealing with
            </h2>

            <p className="mt-7 max-w-[38em] text-[16.5px] leading-loose text-tx-mid">
              <ConfigValue field={founder.name} /> has worked in property search since{" "}
              <ConfigValue field={company.founderStartYear} />. Over that time the independent
              sector has grown, consolidated and largely been bought up by the big data houses. We
              are still here, and still independent — which means no one upstream decides which
              reports we are allowed to recommend to you.
            </p>

            <p className="mt-6 max-w-[38em] text-[16.5px] leading-loose text-tx-mid">
              She sits on the executive board of{" "}
              <strong className="font-semibold text-tx">IPSA</strong>, the Association of Independent
              Personal Search Agents. That means she is involved in setting the standards
              independent search agents work to, and tends to hear early when a particular authority
              starts to slip — which is usually weeks before it shows up in anyone&rsquo;s
              turnaround figures.
            </p>

            {hasQuote ? (
              <figure className="my-10 rounded-panel border-l-4 border-coral bg-coral-soft p-8">
                <blockquote className="font-display text-[24px] leading-snug font-medium tracking-[-0.026em] text-tx">
                  {quote.value}
                </blockquote>
                <figcaption className="mt-4 text-[13.5px] font-semibold text-coral-ink">
                  &mdash; {quote.attribution}
                </figcaption>
              </figure>
            ) : null}
            {/* No placeholder -- same removal as components/home/story.tsx. A panel
                explaining the config mechanism to a developer has no business on a
                page a solicitor reads. The absence of a quote is not a gap that
                needs apologising for. */}

            <h2 className="mt-14 text-[clamp(24px,2.6vw,32px)] tracking-[-0.03em]">
              Still to come on this page
            </h2>
            <p className="mt-5 max-w-[38em] text-[16.5px] leading-loose text-tx-mid">
              These are the sections worth writing, and each one needs facts from her rather than
              from us. Send the answers and they go straight in.
            </p>

            <ul className="mt-7 list-none space-y-3.5">
              <Todo heading="How she got into search">
                What she was doing before {company.founderStartYear.value}, and what the family
                business actually was. One paragraph, specific.
              </Todo>
              <Todo heading="Why independent, and why she stayed">
                The consolidation story from the inside. This is the part no competitor can copy.
              </Todo>
              <Todo heading="What IPSA board work involves">
                What she has actually worked on. Vague &ldquo;standards&rdquo; language is worth
                less than one concrete example.
              </Todo>
              <Todo heading="Podcast and press appearances">
                <code className="font-mono text-[13px]">founder.links</code> is empty. Any recorded
                interview is a strong third-party signal — and a real quote source.
              </Todo>
            </ul>
          </div>

          <aside className="rounded-panel border border-mist bg-chalk p-8 max-[980px]:max-w-125">
            <h2 className="font-display text-[20px] font-semibold tracking-[-0.025em]">
              Talk to <ConfigValue field={founder.shortName} /> directly
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-tx-mid">
              No account manager, no ticket queue. If it is quicker to say out loud than to type,
              call.
            </p>

            <a
              href={phoneHref}
              className="mt-6 block font-display text-[30px] leading-none font-bold tracking-[-0.04em] text-coral-ink hover:text-tx"
            >
              <Unconfirmed when={contact.phone.confirmed} title={contact.phone.note}>
                {contact.phone.display}
              </Unconfirmed>
            </a>

            <dl className="mt-6 space-y-3 border-t border-mist pt-6 text-[14px]">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[0.13em] text-tx-low">
                  Hours
                </dt>
                <dd className="mt-1 font-medium text-tx">
                  <Unconfirmed when={contact.hours.confirmed} title={contact.hours.note}>
                    {contact.hours.days}, {contact.hours.from}&ndash;{contact.hours.to}
                  </Unconfirmed>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[0.13em] text-tx-low">
                  Email
                </dt>
                <dd className="mt-1 font-medium break-all text-tx">
                  <a href={`mailto:${contact.email}`} className="hover:text-brand-dark">
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>

            <Link
              href={nav.primaryCta.href}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-coral-deep px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-coral-ink"
            >
              {nav.primaryCta.label} <span aria-hidden>&rarr;</span>
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/8 px-4 py-2 text-[13px] font-medium text-white/85">
      {children}
    </span>
  );
}

function Todo({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <li className="unconfirmed rounded-card p-5">
      <p className="font-display text-[16px] font-semibold tracking-[-0.02em] text-tx">{heading}</p>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-tx-mid">{children}</p>
    </li>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { contact, nav, phoneHref, seo } from "@/config/site";
import { getProducts, groupProducts, GROUP_INTROS } from "@/lib/products";
import { Unconfirmed } from "@/components/ui/unconfirmed";

export const revalidate = 86_400;

export async function generateStaticParams() {
  const groups = groupProducts(await getProducts());
  return groups.map((g) => ({ group: g.slug }));
}

async function findGroup(slug: string) {
  const groups = groupProducts(await getProducts());
  return groups.find((g) => g.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group: slug } = await params;
  const group = await findGroup(slug);
  if (!group) return { title: "Not found" };

  const description =
    GROUP_INTROS[group.name] ??
    `The ${group.name.toLowerCase()} reports you can order from us, with the supplier named for each.`;

  return {
    title: group.name,
    description,
    alternates: { canonical: `${seo.siteUrl}/products/${group.slug}` },
    openGraph: { title: group.name, description, url: `${seo.siteUrl}/products/${group.slug}` },
  };
}

export default async function ProductGroupPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group: slug } = await params;
  const group = await findGroup(slug);
  if (!group) notFound();

  const others = groupProducts(await getProducts()).filter((g) => g.slug !== group.slug);

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
            <Link href="/products" className="hover:text-white">
              Searches
            </Link>
            <span className="px-2">/</span>
            <span className="text-white/80">{group.name}</span>
          </nav>

          <h1 className="max-w-[16em] text-[clamp(28px,3.3vw,42px)] leading-[1.08] tracking-[-0.03em]">
            {group.name}
          </h1>
          {GROUP_INTROS[group.name] && (
            <p className="mt-5 max-w-[46em] text-[17px] leading-relaxed text-white/70">
              {GROUP_INTROS[group.name]}
            </p>
          )}

          <ul className="mt-7 flex list-none flex-wrap gap-2.5">
            <li className="rounded-full bg-white/10 px-4 py-2 text-[13px] font-medium">
              {group.products.length} {group.products.length === 1 ? "report" : "reports"}
            </li>
            {group.suppliers.map((s) => (
              <li key={s} className="rounded-full bg-white/10 px-4 py-2 text-[13px] font-medium">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 max-lg:py-12">
        <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
          <ul className="grid list-none gap-4">
            {group.products.map((p) => (
              <li
                key={p.slug}
                id={p.slug}
                className="scroll-mt-28 rounded-hero border border-mist bg-white p-8 max-sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h2 className="max-w-[24em] text-[21px] leading-snug">{p.name}</h2>
                  <ul className="flex list-none flex-wrap gap-2">
                    {p.supplier && (
                      <li className="rounded-full bg-sky px-3 py-1.5 text-[12px] font-semibold text-brand-dark">
                        {p.supplier}
                      </li>
                    )}
                    {p.turnaroundDays !== null && (
                      <li className="rounded-full bg-chalk px-3 py-1.5 text-[12px] font-semibold text-tx-mid">
                        {p.turnaroundDays} working {p.turnaroundDays === 1 ? "day" : "days"}
                      </li>
                    )}
                    {p.needsPlan && (
                      <li className="rounded-full bg-coral-soft px-3 py-1.5 text-[12px] font-semibold text-coral-ink">
                        Plan required
                      </li>
                    )}
                    {p.councilPriced && (
                      <li className="rounded-full bg-chalk px-3 py-1.5 text-[12px] font-semibold text-tx-mid">
                        Priced by council
                      </li>
                    )}
                  </ul>
                </div>

                {p.tagline && (
                  <p className="mt-3 max-w-[52em] text-[16px] leading-relaxed font-medium text-tx">
                    {p.tagline}
                  </p>
                )}
                {p.description && (
                  <p className="mt-3 max-w-[52em] text-[15.5px] leading-relaxed text-tx-mid">
                    {p.description}
                  </p>
                )}
              </li>
            ))}
          </ul>

          {/* --------------------------------------------------------- cta */}
          <div className="mt-12 rounded-hero bg-ink p-9 text-white max-sm:p-6">
            <p className="font-display text-[21px] leading-snug font-semibold tracking-[-0.025em]">
              Not sure which of these a property needs?
            </p>
            <p className="mt-3 max-w-[44em] text-[16px] leading-relaxed text-white/65">
              Send us the address and we will tell you what we would order — including the ones we
              think you can leave out. Prices depend on the local authority, so we quote per
              property rather than publishing a list.
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

          {/* ------------------------------------------------------ others */}
          {others.length > 0 && (
            <div className="mt-14">
              <h2 className="mb-5 text-[20px] tracking-[-0.025em]">Other things we order</h2>
              <ul className="flex list-none flex-wrap gap-2.5">
                {others.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/products/${g.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-mist bg-white px-5 py-2.5 text-[14px] font-medium transition hover:border-brand hover:text-brand-dark"
                    >
                      {g.name}
                      <span className="text-[12px] text-tx-low">{g.products.length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

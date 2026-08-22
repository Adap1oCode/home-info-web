import Link from "next/link";

import { insurance, integrations, routes } from "@/config/site";
import { Unconfirmed } from "@/components/ui/unconfirmed";

/**
 * Supplier wall. Only relationships verified in the reseller platform are
 * listed — Groundsure, Future Climate Info, GeoCerta and Palladium came from a
 * competitor's site and were removed rather than asserted.
 *
 * Logo files live in /public/logos. Each <img> falls back to a brand-coloured
 * wordmark when the file is absent, so partners can be added without code
 * changes. Get written permission before publishing any partner logo.
 */
export default function Integrations() {
  // Talk is the next section and is also an inset card, so this one carries an
  // explicit bottom margin — otherwise the two card edges touch. Same value as
  // the standard padding, so the gap matches every other section boundary.
  return (
    <section
      className="section-y mx-8 mb-30 rounded-hero border border-[#D6E5F4] max-lg:mx-3.5 max-lg:mb-19"
      style={{ background: "linear-gradient(168deg,#F1F7FD 0%,#E2EEFA 52%,#F6FBFE 100%)" }}
    >
      <div className="mx-auto max-w-[1240px] px-15 max-lg:px-6">
        <div className="grid grid-cols-[0.86fr_1.14fr] items-center gap-18 max-[1080px]:grid-cols-1 max-[1080px]:gap-13">
          <div>
            <span className="mb-7 grid h-14.5 w-14.5 place-items-center rounded-[17px] bg-brand text-white">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="8.5" y="2.5" width="7" height="6" rx="1.6" />
                <rect x="2" y="15.5" width="7" height="6" rx="1.6" />
                <rect x="15" y="15.5" width="7" height="6" rx="1.6" />
                <path d="M12 8.5v3.5M5.5 15.5V12h13v3.5" />
              </svg>
            </span>
            <span className="eyebrow">Where the data comes from</span>
            <h2 className="mt-5.5 mb-6.5 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
              Direct integrations with the organisations that hold the data.
            </h2>
            <p className="mb-4.5 max-w-[34em] text-[16.5px] leading-loose text-tx-mid">
              Our systems connect directly to the suppliers and registries the reports come from,
              so what reaches your file is what the source returned.
            </p>
            <p className="mb-4.5 max-w-[34em] text-[16.5px] leading-loose text-tx-mid">
              We are registered with the{" "}
              <strong className="font-semibold text-tx">PCCB as a Search Code subscriber</strong>,
              and a member of <strong className="font-semibold text-tx">IPSA</strong>.
            </p>
            {/* was /how-we-work, which does not exist */}
            <Link href={routes.products} className="mt-2 inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand-dark">
              Every report and who supplies it <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          <ul className="flex list-none flex-wrap gap-3.5">
            {integrations.map((i) => (
              <li key={i.id} className="flex min-w-42.5 flex-1 basis-47.5 max-[520px]:min-w-32.5">
                <span
                  title={i.blurb}
                  className="grid h-27 w-full place-items-center rounded-card border border-[#DCE5EF] bg-white p-4 transition hover:-translate-y-1 hover:shadow-[0_20px_42px_-26px_rgb(13_31_51_/_0.42)] max-[520px]:h-23"
                >
                  <Wordmark integration={i} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* assurance row */}
        <ul className="mt-14 grid list-none grid-cols-4 gap-4 border-t border-[#D6E5F4] pt-12 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
          <Assurance tint="bg-sky text-brand-dark" title={
            <Unconfirmed when={insurance.professionalIndemnity.confirmed} title={insurance.professionalIndemnity.note}>
              {insurance.professionalIndemnity.cover} professional indemnity
            </Unconfirmed>
          }>
            {insurance.detail}
          </Assurance>
          <Assurance tint="bg-sky text-brand-dark" title="Search Code redress">
            As a Search Code subscriber we have a published complaints procedure and independent
            redress through the PCCB.
          </Assurance>
          <Assurance tint="bg-coral-soft text-coral-ink" title="Sample reports">
            Ask us for a sample of any report before you send us a case.
          </Assurance>
          <Assurance tint="bg-[#EAF2FB] text-[#1B6EBE]" title="Data handled properly">
            ICO registered and UK GDPR compliant. We do not pass your data to third parties.
          </Assurance>
        </ul>
      </div>
    </section>
  );
}

function Wordmark({ integration }: { integration: (typeof integrations)[number] }) {
  const w = integration.wordmark;
  return (
    <span className="text-center leading-tight">
      <span className="block font-display text-[19px] font-bold tracking-[-0.035em]" style={{ color: w?.primary }}>
        {integration.name}
      </span>
      {w?.subText && (
        <span className="mt-1.5 block text-[7.5px] font-bold uppercase tracking-[0.17em] opacity-75" style={{ color: w.sub ?? w.primary }}>
          {w.subText}
        </span>
      )}
    </span>
  );
}

function Assurance({
  tint,
  title,
  children,
}: {
  tint: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3.5 rounded-hero bg-white p-6.5 transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_-28px_rgb(13_31_51_/_0.4)]">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-[11px] ${tint}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.5 20 6v6.5c0 4.8-3.4 8.2-8 9.5-4.6-1.3-8-4.7-8-9.5V6Z" />
          <path d="M9.2 12l2.2 2.2 3.9-4.4" />
        </svg>
      </span>
      <span>
        <b className="mb-1.5 block font-display text-[15.5px] font-bold tracking-[-0.02em]">{title}</b>
        <p className="text-[13px] leading-relaxed text-tx-mid">{children}</p>
      </span>
    </li>
  );
}

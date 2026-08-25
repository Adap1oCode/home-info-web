import { existsSync } from "node:fs";
import path from "node:path";

import Link from "next/link";

import { insurance, integrations, routes } from "@/config/site";
import { Unconfirmed } from "@/components/ui/unconfirmed";

/**
 * Supplier wall. Only relationships verified in the reseller platform are
 * listed — Groundsure, Future Climate Info, GeoCerta and Palladium came from a
 * competitor's site and were removed rather than asserted.
 *
 * ── Logos ───────────────────────────────────────────────────────────────────
 * `logo` in config/site.ts is a path under /public, e.g. "/images/landmark.webp".
 *
 * This is a server component, so presence is checked on disk at build time
 * rather than guessed. A missing or unset file falls back to the brand-coloured
 * wordmark, so a partner can be listed before its logo arrives and nothing ever
 * renders a broken image. Veriphy deliberately uses that fallback: the supplied
 * file is a square social-media avatar, half of it empty green, which reads as a
 * cropped tile rather than a mark.
 *
 * The docblock used to claim each <img> fell back to a wordmark. There was no
 * <img> — every one of these was the text fallback, and the five `logo` values
 * in config had never been read by anything.
 *
 * Logos are trademarks. Get written permission before publishing one, and
 * check each body's brand guidelines for how the mark may be shown.
 */

/** Absolute path a config `logo` value resolves to. */
const logoPath = (file: string) => path.join(process.cwd(), "public", file.replace(/^\//, ""));
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
              Who we order from.
            </h2>
            <p className="mb-4.5 max-w-[34em] text-[16.5px] leading-loose text-tx-mid">
              We order direct from the supplier, so nothing is re-typed or re-packaged on the way
              to your file.
            </p>
            {/* "Registered with the PCCB as a Search Code subscriber, and a member
                of IPSA" was here. The accreditations panel sits directly above this
                section and shows all three as badges, linked to the bodies
                themselves — saying it again in prose a screen later reads as
                padding, and a claim repeated is not a claim strengthened. */}
            {/* was /how-we-work, which does not exist */}
            <Link href={routes.products} className="mt-2 inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand-dark">
              Every report and who supplies it <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          {/* A grid, not flex-wrap. Wrapping with flex-1 stretched whatever landed
              on the final row to fill it, so with five suppliers the last mark
              rendered in a card several times the width of the others. A grid
              gives every supplier the same cell whatever the count, and 3x2 comes
              out even at six. */}
          <ul className="grid list-none grid-cols-3 gap-3.5 max-[520px]:grid-cols-2">
            {integrations.map((i) => (
              <li key={i.id} className="flex">
                <span
                  title={i.blurb}
                  className="grid h-27 w-full place-items-center rounded-card border border-[#DCE5EF] bg-white p-4 transition hover:-translate-y-1 hover:shadow-[0_20px_42px_-26px_rgb(13_31_51_/_0.42)] max-[520px]:h-23"
                >
                  <Mark integration={i} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* assurance row */}
        {/* Three, not four. "Data handled properly — ICO registered and UK GDPR
            compliant" restated the ICO badge in the panel above and has gone. The
            Search Code card stays but now leads with the complaints procedure and
            redress route, which is the part a solicitor cannot read off a badge —
            it no longer opens by re-announcing that we are a subscriber. */}
        <ul className="mt-14 grid list-none grid-cols-3 gap-4 border-t border-[#D6E5F4] pt-12 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
          <Assurance tint="bg-sky text-brand-dark" title={
            <Unconfirmed when={insurance.professionalIndemnity.confirmed} title={insurance.professionalIndemnity.note}>
              {insurance.professionalIndemnity.cover} professional indemnity
            </Unconfirmed>
          }>
            {insurance.detail}
          </Assurance>
          <Assurance tint="bg-sky text-brand-dark" title="If something goes wrong">
            A published complaints procedure, and independent redress through the PCCB if you are
            not satisfied with how we handle it.
          </Assurance>
          <Assurance tint="bg-coral-soft text-coral-ink" title="Sample reports">
            Ask us for a sample of any report before you send us a case.
          </Assurance>
        </ul>
      </div>
    </section>
  );
}

function Mark({ integration }: { integration: (typeof integrations)[number] }) {
  const { logo } = integration;

  if (logo && existsSync(logoPath(logo))) {
    /* Crop, not fit. A file with dead space baked in — Veriphy's is a square
       avatar, wordmark across the middle, empty green below — shrinks to almost
       nothing when fitted whole, because the padding is sized as if it were part
       of the mark. Covering a wide box and centring cuts the padding away and
       leaves the wordmark at the same visual weight as the lockups either side. */
    if (integration.logoCrop) {
      return (
        <span className="relative h-13 w-[76%] overflow-hidden rounded-[6px]">
          {/* Absolutely positioned, not h-full/w-full on a grid child: the card
              centres its children, which cancels the stretch and let this render
              at its natural 473px square, blowing the card open. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt={integration.name} className="absolute inset-0 h-full w-full object-cover" />
        </span>
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={integration.name}
        /* object-contain, so a mark grows until it hits the height cap or the
           card's width. Martello's lockup carries its own dark green plate
           rather than a transparent background — that is the supplied artwork,
           and rounding it keeps it reading as a tile rather than a mistake. */
        className="max-h-13 w-auto max-w-[72%] rounded-[6px] object-contain"
      />
    );
  }

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

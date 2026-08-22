import { accreditations, type Accreditation } from "@/config/site";
import { Unconfirmed } from "@/components/ui/unconfirmed";

/**
 * The credibility row.
 *
 * Real logo files now exist for IPSA, PCCB, the Search Code and The Property
 * Ombudsman. Each sits on its own white plate, `object-contain`, so the whole
 * mark is visible and nothing is cropped — a clipped regulator's logo looks
 * like carelessness on exactly the row that is meant to demonstrate the
 * opposite.
 *
 * Where a body has an official site, the cell is an outbound link. That is the
 * point of the row: a conveyancer can go and check us rather than take a badge
 * on our own site as evidence. Anything still unverified in config renders with
 * the placeholder marker and is blocked from a production build.
 *
 * THE PANEL
 * ---------
 * This used to be a bare uppercase label with six separately-bordered cards
 * loose on the chalk background, and it read as unplaced — a label floating in
 * whitespace above a row of fragments, with nothing tying the two together or
 * marking where the block started and stopped. It is now a single panel: the
 * label lives inside it as a titled header, and the marks sit in one lattice
 * beneath a rule.
 *
 * The lattice is drawn with `gap-px` over a mist-coloured list, so every cell's
 * white background leaves the gaps showing as hairlines. An empty grid slot is
 * therefore not neutral — it shows as a solid mist block — so the last row must
 * always be full. Five marks divide cleanly into five columns; at three and two
 * they leave one slot short, which is why the final cell spans two below
 * 1140px. Change the number of marks and that arithmetic has to be redone.
 *
 * Professional indemnity used to sit here as a sixth badge. It was the only
 * entry that was not an accreditation — a policy value dressed up with a drawn
 * umbrella to look like a regulator's mark, among five real ones. The £2m is
 * still stated, in the integrations section, where it belongs alongside the
 * rest of what backs a report.
 *
 * Cells cannot use the lift-on-hover the rest of the site's cards use — moving
 * one cell tears the hairline it shares with its neighbours. They tint instead,
 * which is also what makes the white logo plates visible: at rest they are
 * invisible against a white cell, on hover they read as plates.
 *
 * Logos are trademarks. Confirm permitted use with each body before go-live —
 * most set conditions on how their mark may be displayed.
 */

/** Wide, text-heavy marks need less height than square ones to read as equals. */
const logoHeight: Record<NonNullable<Accreditation["logoAspect"]>, string> = {
  square: "max-h-16",
  tall: "max-h-16",
  wide: "max-h-12",
};

export default function Accreditations() {
  return (
    /*
     * Top padding is the one documented exception to `.section-y`. This strip
     * is not a section in its own right — it is the second half of the hero's
     * proof, continuing the stat cards that straddle the banner above it. At a
     * full 120px it detached from them and sat in no-man's-land between the
     * banner and the first real section. The bottom keeps the shared rhythm, so
     * the block reads as belonging upwards and separating downwards.
     */
    <section className="section-y pt-18 max-lg:pt-12">
      <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
        <div className="overflow-hidden rounded-panel border border-mist bg-white shadow-[0_28px_60px_-42px_rgb(13_31_51_/_0.5)]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-1.5 border-b border-mist px-7 py-5 max-sm:px-5">
            <h2 className="text-[11.5px] font-bold tracking-[0.15em] text-tx-mid uppercase">
              Accredited, regulated and insured
            </h2>
            <p className="text-[13px] leading-snug text-tx-low">
              Each badge links to the issuing body, so you can check us rather than take our word for
              it.
            </p>
          </div>

          <ul className="grid list-none grid-cols-5 gap-px bg-mist max-[1140px]:grid-cols-3 max-[1140px]:[&>li:last-child]:col-span-2 max-[620px]:grid-cols-2">
            {accreditations.map((a) => (
              <li key={a.id} className="grid bg-white">
                <Cell
                  logo={a.logo}
                  logoAspect={a.logoAspect}
                  name={a.name}
                  status={a.status}
                  url={a.url}
                  confirmed={a.confirmed}
                  note={a.note}
                  lead={a.lead}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Cell({
  logo,
  logoAspect = "square",
  name,
  status,
  url,
  confirmed,
  note,
  lead = false,
}: {
  logo?: string;
  logoAspect?: Accreditation["logoAspect"];
  name: string;
  status: string;
  url?: string;
  confirmed: boolean;
  note?: string;
  lead?: boolean;
}) {
  const body = (
    <>
      {/* White plate so the Search Code and ICO JPGs' baked-in backgrounds
          disappear into it — at rest against the white cell, and on hover
          against the tint. overflow-hidden so nothing escapes the radius.
          Every body now supplies a real mark; the fallback below is only for
          an entry added to config before its logo file arrives. */}
      <span className="grid h-20 w-full place-items-center overflow-hidden rounded-xl bg-white px-3">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt=""
            className={`w-auto max-w-full object-contain ${logoHeight[logoAspect ?? "square"]}`}
          />
        ) : (
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand-dark"
            aria-hidden
          >
            <path d="M12 3 4.5 6v6c0 4.2 3.1 7.6 7.5 9 4.4-1.4 7.5-4.8 7.5-9V6L12 3Z M9 12l2 2 4-4" />
          </svg>
        )}
      </span>

      <b className="mt-4 block font-display text-[14px] leading-tight font-bold tracking-[-0.02em] text-balance text-tx">
        <Unconfirmed when={confirmed} title={note}>
          {name}
        </Unconfirmed>
      </b>
      {/* Not a flex row. Several of these statuses wrap at cell width, and as a
          flex sibling the arrow then centred itself against the full two-line
          block and floated off at the cell's right edge, detached from the
          words. Inline keeps it on the heels of the last one. */}
      <span
        className={`mt-1.5 block text-[11.5px] leading-snug text-balance ${
          lead ? "font-semibold text-brand-dark" : "text-tx-low"
        }`}
      >
        {status}
        {url && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            className="ml-1 inline-block align-middle opacity-70"
            aria-hidden
          >
            <path d="M8 5h11v11M19 5 6 18" />
          </svg>
        )}
      </span>
    </>
  );

  /*
   * Cells carry no border of their own — the hairline between them is the
   * lattice gap showing through, so a border here would double every rule.
   * `h-full` matters: it is what makes the cell paint to the full row height
   * and keeps the gaps reading as continuous lines rather than dashes.
   */
  const shell =
    "flex h-full flex-col items-center bg-white px-4 py-6 text-center transition-colors hover:bg-sky/60";

  if (!url) return <div className={shell}>{body}</div>;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={shell}>
      {body}
      <span className="sr-only">(opens the official site in a new tab)</span>
    </a>
  );
}

import Link from "next/link";

import { company, heroCycleSeconds, heroPhotos, nav, routes } from "@/config/site";
import { formatInt, formatQuickest, type PerformancePayload } from "@/lib/performance";
import { ConfigValue } from "@/components/ui/unconfirmed";

/**
 * Full-bleed dark banner, sized to sit above the fold on a laptop.
 *
 * Spacing here is deliberately tight: header (78px) plus this banner lands
 * around 620px, so the headline and both CTAs are visible without scrolling.
 * Resist adding vertical padding at the TOP — this is the one section where
 * height is a hard constraint rather than a taste question.
 *
 * The bottom padding is a separate matter and is deliberately larger. The
 * roundel is the tallest thing in the grid, so it defines the content box and
 * its bottom edge lands exactly `pb` above the banner edge. With a symmetric
 * py-14 that left the photograph 8px clear of the stat cards below — they read
 * as colliding. Clearance is always `pb` minus the cards' negative margin, so
 * it can only be bought with bottom padding. Capping the roundel (below) pays
 * for it, and the banner ends up fractionally shorter than it was.
 *
 * Every figure is a COUNT from the live payload. There is deliberately no
 * blended turnaround average — see lib/performance.ts.
 */
export default function Hero({ data }: { data: PerformancePayload | null }) {
  const k = data?.kpis;

  return (
    <header>
      <div className="relative overflow-hidden bg-ink pt-14 pb-24 text-white max-lg:pt-11 max-lg:pb-20">
        {/* brand glow top-right, a touch of coral bottom-left */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 620px at 88% -10%, rgb(52 140 220 / 0.42), transparent 64%)," +
              "radial-gradient(620px 460px at 2% 108%, rgb(232 105 76 / 0.16), transparent 66%)," +
              "linear-gradient(160deg, #0D1F33 0%, #143050 52%, #0D1F33 100%)",
          }}
        />
        {/* faint dot field, masked back so it never competes with the copy */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgb(255 255 255 / 0.18) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "linear-gradient(115deg, #000 0%, transparent 55%)",
            WebkitMaskImage: "linear-gradient(115deg, #000 0%, transparent 55%)",
          }}
        />

        <div className="relative mx-auto max-w-[1240px] px-8 max-sm:px-6">
          <div className="grid grid-cols-[1.12fr_0.88fr] items-center gap-14 max-lg:grid-cols-1 max-lg:gap-10">
            <div>
              <span className="eyebrow bg-white/10 text-white">
                <span className="pip bg-brand-light" />
                Trusted by conveyancers and solicitors across {company.coverage}
              </span>

              {/*
                The highlight is coral text rather than a blue underline band.
                A blue highlighter on a blue banner read as a printing fault, and
                coral is the only hue in the palette that separates from the
                background at this size. `coral-light` clears AA here; plain
                `coral` does not.
              */}
              <h1 className="mt-5 text-[clamp(34px,4vw,54px)] leading-[1.05] tracking-[-0.032em]">
                Specialist property searches for{" "}
                <span className="text-coral-light">legal professionals</span>
              </h1>

              <p className="mt-5 max-w-[34em] text-[17px] leading-relaxed text-white/70">
                Fast, accurate and Search Code compliant. We publish our turnaround times council by
                council, so you can see what we actually achieve before you send us anything.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={nav.primaryCta.href}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-coral-deep px-7 py-3.5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-coral"
                >
                  {nav.primaryCta.label} <span aria-hidden>&rarr;</span>
                </Link>
                <Link
                  href={routes.tracker}
                  className="inline-flex items-center rounded-full border-[1.5px] border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:border-white hover:bg-white/8"
                >
                  See our turnaround times
                </Link>
              </div>

              {/*
                The "Prefer to talk it through? Call Val on…" line has been
                removed. The number now lives in the header pill, immediately
                above and always on screen, so repeating it here only added a
                third thing to read under two buttons.
              */}
            </div>

            <HeroImagery fastest={data?.fastest ?? null} />
          </div>
        </div>
      </div>

      {/* Stat cards straddle the banner's bottom edge, roughly half in and half
          out. Tried them sitting clear of it — the banner then read as a closed
          box with an unrelated row beneath, and the overlap is what ties the
          two together. Keep the negative margin at about half the card height. */}
      <div className="mx-auto max-w-[1240px] px-8 max-sm:px-6">
        <div className="relative z-10 -mt-12 grid grid-cols-4 gap-4 max-lg:-mt-11 max-lg:grid-cols-2 max-[440px]:grid-cols-1">
          <Stat
            value={k ? formatInt(k.completed_quarter) : "—"}
            label={`searches completed in the last ${data?.window_days ?? 90} days`}
          />
          <Stat
            value={k ? formatInt(k.councils_served) : "—"}
            label="councils served, each published separately"
            accent
          />
          <Stat
            value={k ? `${k.within_5_days_of_top}/${k.top_count}` : "—"}
            label="of our busiest councils returned within 5 working days"
          />
          <Stat value={<ConfigValue field={company.yearsInSearch} />} label="years in property search" />
        </div>
      </div>
    </header>
  );
}

function Stat({
  value,
  label,
  accent = false,
}: {
  value: React.ReactNode;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-panel border p-6 pb-5 shadow-[0_20px_44px_-26px_rgb(13_31_51_/_0.55)] ${
        accent ? "border-brand bg-brand" : "border-mist bg-white"
      }`}
    >
      <div
        className={`font-display text-[36px] leading-none font-bold tracking-[-0.045em] ${
          accent ? "text-white" : "text-tx"
        }`}
      >
        {value}
      </div>
      <div className={`mt-2.5 flex-1 text-[13px] leading-snug ${accent ? "text-white/80" : "text-tx-mid"}`}>
        {label}
      </div>
    </div>
  );
}

/**
 * Circular imagery, echoing the three roundels in the logo.
 *
 * One property photograph and three floating callouts. Deliberately no people
 * and no founder portrait — see the note further down.
 *
 * Capped rather than filling its grid cell. Left to fill, the roundel is 493px
 * at 1240px wide and drives the whole banner's height; capping it buys back the
 * bottom padding that separates the photograph from the stat cards without
 * making the banner any taller. Raise this and you spend that clearance again.
 */
function HeroImagery({ fastest }: { fastest: { council: string; minutes: number } | null }) {
  return (
    <div className="relative mx-auto w-full max-w-[450px] max-lg:max-w-[340px]">
      <Chip className="top-[6%] -left-10 max-lg:-left-2">
        Search Code <b className="font-display font-bold">Subscriber</b>
      </Chip>
      {fastest && (
        <Chip className="top-[40%] -right-10 max-lg:-right-2" delay="0.8s">
          Quickest, last 90 days{" "}
          <b className="font-display font-bold text-brand-dark">{formatQuickest(fastest.minutes / 60)}</b>
        </Chip>
      )}
      <Chip className="bottom-[2%] right-0 max-lg:right-2" delay="1.6s">
        IPSA <b className="font-display font-bold">Executive Board</b>
      </Chip>

      {/* main roundel */}
      <div
        className="relative aspect-square overflow-hidden rounded-full ring-8 ring-white/10 shadow-[0_40px_90px_-40px_rgb(0_0_0_/_0.85)]"
        style={{ ["--hero-cycle" as string]: `${heroCycleSeconds}s` }}
      >
        {heroPhotos.map((photo, i) => {
          /*
           * Negative delay, and NOT `-i * slot`.
           *
           * A negative delay starts an animation part-way through, so it brings
           * a photograph's turn forward rather than pushing it back. To put
           * photo `i` in slot `i` it has to be advanced by the slots that come
           * after it, which is `(count - i)`. Getting this backwards runs the
           * set in reverse and puts the eagerly-loaded first photograph last.
           */
          const slot = heroCycleSeconds / heroPhotos.length;
          const delay = i === 0 ? 0 : -(heroPhotos.length - i) * slot;

          return (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={photo.src}
              src={photo.src}
              /* One announcement, not four. They all say the same thing to a
                 screen reader, and only one is on screen at a time. */
              alt={i === 0 ? photo.alt : ""}
              aria-hidden={i === 0 ? undefined : true}
              /* The first is the LCP element. The rest are not needed for
                 seven seconds, so they must not compete for it. */
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              width={900}
              height={900}
              className="hero-photo"
              style={{ animationDelay: `${delay}s` }}
            />
          );
        })}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,transparent_40%,rgb(13_31_51_/_0.45)_100%)]" />
      </div>

      {/*
        Val's roundel and caption used to overlap the bottom-left of the photo.
        Both were removed: the caption sat on top of the photograph and was
        genuinely unreadable, and the roundel was an empty placeholder. She is
        introduced properly in the story section and on /founder, which is where
        a real photograph belongs. Do not reinstate this with a stock face.
      */}
    </div>
  );
}

function Chip({
  children,
  className = "",
  delay = "0s",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  /*
   * Two nested elements on purpose: the outer one plays the entrance once, the
   * inner one drifts forever. Putting both animations on a single element means
   * the second `transform` overwrites the first and the entrance never shows.
   * Squarer corners now, to match the buttons rather than the phone pill.
   */
  return (
    <div
      style={{ animationDelay: delay }}
      className={`absolute z-[4] animate-chip-in [animation-fill-mode:backwards] max-[560px]:hidden ${className}`}
    >
      <div
        style={{ animationDelay: delay }}
        className="flex animate-drift items-center gap-2 rounded-[10px] bg-white px-4 py-2.5 text-[12.5px] font-medium whitespace-nowrap text-tx shadow-[0_16px_38px_-12px_rgb(0_0_0_/_0.55)] [animation-duration:6.5s]"
      >
        {children}
      </div>
    </div>
  );
}

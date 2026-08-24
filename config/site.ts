/**
 * ============================================================================
 * SITE CONFIG — the single source of truth for every editable value.
 * ============================================================================
 *
 * Nothing in `components/` or `app/` should hard-code a phone number, an
 * accreditation, a person's name, a fee, or an opening hour. It all lives here
 * so it is changed in exactly one place.
 *
 * ── How to edit ─────────────────────────────────────────────────────────────
 * Change the value, save, done. TypeScript will tell you if you break a shape.
 *
 * ── The `confirmed` flag ────────────────────────────────────────────────────
 * Anything factual that has not been verified with the business carries
 * `confirmed: false`. The site renders those with a visible placeholder marker
 * in development, and `npm run check:config` fails the build if any remain set
 * to false when NEXT_PUBLIC_ALLOW_UNCONFIRMED is not set. That is deliberate:
 * regulatory and insurance claims must not reach production unverified.
 *
 * Search this file for `confirmed: false` to see everything still outstanding.
 */

/* ---------------------------------------------------------------- helpers */

/** Turns "07702 316 899" into "tel:07702316899". */
export const telHref = (display: string) => `tel:${display.replace(/[^\d+]/g, "")}`;

/* ------------------------------------------------------------------ types */

export type Confirmable = {
  /** false = not yet verified with the business; renders as a placeholder. */
  confirmed: boolean;
  /** Optional note explaining what still needs checking. */
  note?: string;
};

export type Accreditation = Confirmable & {
  id: string;
  /** Displayed as the bold line. */
  name: string;
  /** Displayed underneath, e.g. "Executive Board Member". */
  status: string;
  /** Path under /public. Falls back to a drawn mark if missing. */
  logo?: string;
  /** Official site. Renders the card as an outbound link so a visitor can check us. */
  url?: string;
  /** Logos vary from square to 16:9 — the card reserves width accordingly. */
  logoAspect?: "square" | "tall" | "wide";
  /** One entry may be highlighted as the lead credential. */
  lead?: boolean;
};

export type Integration = Confirmable & {
  id: string;
  name: string;
  blurb: string;
  logo?: string;
  /** Brand colours used by the wordmark fallback when no logo file exists. */
  wordmark?: { primary: string; sub?: string; subText?: string };
};

export type SearchProduct = {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  /** Leave null until the pricing endpoint is live — renders as "On request". */
  fromPriceGBP: number | null;
};

export type Testimonial = Confirmable & {
  quote: string;
  name: string;
  role: string;
  location?: string;
  source?: "direct" | "google" | "trustpilot";
};

/* ----------------------------------------------------------------- routes */

/**
 * Canonical paths for pages that actually exist.
 *
 * Nothing outside this list should be linked to. Before this existed the
 * homepage pointed at eleven routes that 404'd — including both hero buttons
 * and the main nav's "Turnaround" item, which is the site's headline feature.
 *
 * When a page is built, add it here and repoint the links, rather than
 * scattering string literals through the components again.
 */
export const routes = {
  home: "/",
  /** The live tracker. `/turnaround` was linked all over the site and is not a page. */
  tracker: "/live-turnaround-tracker",
  councils: "/councils",
  products: "/products",
  guides: "/guides",
  glossary: "/guides/glossary",
  quote: "/quote",
  founder: "/founder",
  testimonials: "/testimonials",
  faqs: "/faqs",
} as const;

/* ---------------------------------------------------------------- company */

export const company = {
  legalName: "Home Information Searches (HIS) Ltd",
  tradingName: "Home Information Searches",
  shortName: "HIS",

  /** Companies House number — shown in the footer. */
  companyNumber: { value: "07718782", confirmed: true },
  registeredIn: "England & Wales",
  vatNumber: { value: "", confirmed: false, note: "Only shown if non-empty" },

  /** Where we operate. Used in copy and schema. */
  coverage: "England and Wales",

  /** Years trading. Drives the hero, the story section and the stat row. */
  yearsInSearch: { value: 30, confirmed: false, note: "Confirm exact number" },
  founderStartYear: { value: 1994, confirmed: false, note: "Year she started in search" },
  /* Corroborated by Roger Bower's testimonial: he instructed Val "and her late
     father" from the nineteen eighties. See `testimonials` below. */
  familyBusinessBefore: { value: true, confirmed: true },
} as const;

/* ---------------------------------------------------------------- founder */

export const founder = {
  name: {
    value: "Val Bennett",
    confirmed: true,
  },
  /** Warmer form, used where the copy is speaking rather than crediting. */
  shortName: { value: "Val", confirmed: true },
  role: "Founder",
  /** Her own page. Linked from the hero, the story section and the footer. */
  href: routes.founder,
  /** /public/images/founder.jpg — a real photograph, not stock. */
  photo: { src: "", alt: "", confirmed: false, note: "Real photo required; do not use stock" },
  credentials: ["Executive Board Member, IPSA"],
  /**
   * Pull quote for the story section.
   * MUST be her own words from a recorded conversation. If we have nothing
   * genuine, set confirmed:false and the section renders without a quote
   * rather than with one written for her.
   */
  pullQuote: {
    value: "",
    attribution: "",
    confirmed: false,
    note: "Take from a recorded conversation. Never write this for her.",
  },
  links: {
    podcast: { url: "", confirmed: false },
    press: { url: "", confirmed: false },
  },
} as const;

/* ---------------------------------------------------------------- contact */

export const contact = {
  phone: {
    display: "07702 316 899",
    confirmed: true,
    note: "A landline would carry better with law firms than a mobile, but this is the number she gives out.",
  },
  email: "info@homeinformationsearches.co.uk",

  hours: {
    days: "Mon–Fri",
    from: "8:30",
    to: "18:00",
    confirmed: false,
    note: "Confirm actual opening hours",
  },

  /** Matches the promise already made on the current live site. */
  emailResponse: "Within one working day",

  /** Who actually picks up. Kept vague on purpose — no "<3 rings" claims. */
  answeredBy: "The team who run your searches",
} as const;

export const phoneHref = telHref(contact.phone.display);

/* --------------------------------------------------------- accreditations */

/**
 * NOTE ON COPSO / PCCB
 * --------------------
 * Read back from your message: COPSO is now PCCB, so they are a single entry
 * rather than two, and IPSA membership is current. Please confirm that reading
 * before this goes live — getting a regulatory body's name wrong on the page of
 * a Search Code subscriber is exactly the kind of error that gets noticed.
 *
 * The current live site claims "Members of COPSO and IPSA".
 */
export const accreditations: Accreditation[] = [
  {
    id: "ipsa",
    name: "IPSA",
    status: "Executive Board Member",
    logo: "/images/ipsa.png",
    logoAspect: "square",
    url: "https://ipsa-online.org.uk/",
    lead: true,
    confirmed: true,
    note: "IPSA's own announcement: Val 'accepted an invitation to join the IPSA Executive Board'. Executive, not non-executive — the two are different roles and this is IPSA's published wording.",
  },
  {
    id: "pccb",
    name: "PCCB",
    status: "Member — formerly COPSO",
    logo: "/images/pccb-logo.png",
    logoAspect: "tall",
    url: "https://pccb.org.uk/",
    confirmed: false,
    note: "Confirm: is COPSO now PCCB, and is the correct wording 'member' or 'monitored'?",
  },
  {
    id: "search-code",
    name: "Search Code",
    status: "Registered subscriber",
    logo: "/images/search_code_logo.jpg",
    logoAspect: "square",
    url: "https://pccb.org.uk/",
    confirmed: false,
    note: "Confirm subscriber status and the exact permitted wording. Replace the URL with our own entry on the PCCB register once we have it — a link a visitor can check beats a logo they cannot.",
  },
  {
    id: "property-ombudsman",
    name: "The Property Ombudsman",
    status: "Redress scheme",
    logo: "/images/property-ombudsman.png",
    logoAspect: "wide",
    url: "https://www.tpos.co.uk/",
    confirmed: false,
    note: "Confirm membership and the scheme reference. PCCB registration commits a firm to TPO redress, so this is expected — but confirm before publishing.",
  },
  {
    id: "ico",
    name: "ICO",
    status: "Registered · UK GDPR",
    logo: "/images/ico-logo-blue.jpg",
    // `logoAspect` is a height preset, not a claim about the file's ratio.
    // This one is 3:2, but the "ico." wordmark and its strapline only fill part
    // of that canvas, so on the `wide` preset it rendered visibly lighter than
    // the marks either side of it. Sized by eye against them, not by ratio.
    logoAspect: "square",
    confirmed: false,
    note: "Confirm ICO registration number. Logo supplied.",
  },
];

export const insurance = {
  professionalIndemnity: {
    cover: "£2m",
    confirmed: false,
    note: "Real figure from the current policy schedule",
  },
  detail: "Certificate available on request.",
};

/* ----------------------------------------------------------- integrations */

/**
 * Only suppliers verified in the reseller platform (E:\Dev\home-info) are
 * listed. Groundsure, Future Climate Info, GeoCerta and Palladium Insurance
 * were removed — they came from a competitor's site and appear nowhere in our
 * codebase. Add them back only once the business confirms the relationship.
 *
 * Logos are trademarks: get written permission before publishing.
 */
export const integrations: Integration[] = [
  {
    id: "hmlr",
    name: "HM Land Registry",
    blurb:
      "Official copies, title plans and local land charges direct, with each council's migration status tracked so we use the right route.",
    logo: "hm-land-registry.svg",
    wordmark: { primary: "#4A4A4A", sub: "#8CAD1F", subText: "HM Government" },
    confirmed: true,
  },
  {
    id: "ordnance-survey",
    name: "Ordnance Survey",
    blurb: "Licensed OS Data Hub mapping on every report, correctly attributed.",
    logo: "ordnance-survey.svg",
    wordmark: { primary: "#4A3A8C", sub: "#E6007E", subText: "OS Data Hub" },
    confirmed: true,
    note: "Check docs/os/licensing-position.md before publishing the logo",
  },
  {
    id: "landmark",
    name: "Landmark",
    blurb: "Environmental, flood, contaminated land and ground stability data.",
    logo: "landmark.svg",
    wordmark: { primary: "#1A1A1A", sub: "#E2231A", subText: "Information Group" },
    confirmed: true,
  },
  {
    id: "martello",
    name: "Martello",
    blurb: "Drainage and water enquiries routed to the correct undertaker for the property.",
    logo: "martello.svg",
    wordmark: { primary: "#1F5E3D", subText: "Drainage & Water" },
    confirmed: true,
  },
  {
    id: "veriphy",
    name: "Veriphy",
    blurb:
      "ID and AML, company checks and lawyer checks, so due diligence and searches come from one place.",
    logo: "veriphy.svg",
    wordmark: { primary: "#12466E", sub: "#2E8BC0", subText: "ID · AML · Checks" },
    confirmed: true,
  },
];

/* -------------------------------------------------------------- searches */

export const searches: SearchProduct[] = [
  {
    id: "local-authority",
    slug: "local-authority",
    name: "Local Authority",
    blurb:
      "LLC1 and CON29R, official or personal depending on the council. CON29O enquiries added wherever you need them.",
    fromPriceGBP: null,
  },
  {
    id: "environmental",
    slug: "environmental",
    name: "Environmental",
    blurb:
      "Contaminated land, flood risk, ground stability, radon and energy infrastructure, with a clear pass or further-action outcome.",
    fromPriceGBP: null,
  },
  {
    id: "drainage-water",
    slug: "drainage-and-water",
    name: "Drainage & Water",
    blurb:
      "CON29DW from the relevant undertaker — public sewer position, water supply, billing and build-over risk.",
    fromPriceGBP: null,
  },
  {
    id: "title",
    slug: "title-and-land-registry",
    name: "Title & Land Registry",
    blurb:
      "Official copies, title plans, ownership, easements and restrictive covenants, usually back with you the same day.",
    fromPriceGBP: null,
  },
  {
    id: "mining",
    slug: "mining-and-ground-stability",
    name: "Mining & ground",
    blurb:
      "Coal, tin, clay, brine and limestone where the location calls for it — and we will say so when it does not.",
    fromPriceGBP: null,
  },
  {
    id: "bespoke",
    slug: "bespoke",
    name: "Anything unusual",
    blurb:
      "Chancel, commons, HS2, or an unusual enquiry a client has raised. If you are not sure whether we can do it, ask.",
    fromPriceGBP: null,
  },
];

/**
 * Search types offered in the contact form's dropdown.
 * Kept aligned with the existing /api/contact route's `searchTypeLabels`.
 */
export const enquiryTypes = [
  { value: "local-authority", label: "Local Authority" },
  { value: "environmental", label: "Environmental" },
  { value: "drainage-water", label: "Drainage & Water" },
  { value: "title", label: "Title" },
  { value: "other", label: "Other" },
] as const;

/* ------------------------------------------------------------ quote tool */

/**
 * The quote builder.
 *
 * `mode` is the open decision, pending Val:
 *
 *   "enquiry"    — the reader picks products and volume, we come back with a
 *                  price. Nothing numeric is shown. This is the safe default.
 *
 *   "indicative" — the same flow, but a guide price is shown alongside. This
 *                  requires exposing price data on the public products
 *                  endpoint, which today deliberately strips every price field.
 *                  Do not switch this on without making that change first.
 *
 * Even in "indicative" mode, council-priced products must never show a figure —
 * their price genuinely varies by local authority, so any single number would
 * be wrong. The builder enforces that regardless of mode.
 */
export const quote = {
  mode: "enquiry" as "enquiry" | "indicative",

  /** How quickly we say we will respond. Shown on the form and in the email. */
  respondWithin: "one working day",

  /**
   * Volume bands. These shape the conversation more than the price — someone
   * doing 200 a month is a different discussion from someone doing one.
   */
  volumeBands: [
    { id: "one-off", label: "Just this one", hint: "A single property" },
    { id: "under-10", label: "Under 10 a month", hint: "Occasional work" },
    { id: "10-50", label: "10–50 a month", hint: "Regular caseload" },
    { id: "50-200", label: "50–200 a month", hint: "Busy department" },
    { id: "200-plus", label: "200+ a month", hint: "Volume arrangement" },
  ],
} as const;

export type VolumeBandId = (typeof quote.volumeBands)[number]["id"];

/* ---------------------------------------------------------- testimonials */

/**
 * Real, attributable quotes only — supplied by the business, never written for
 * a client. The section renders nothing while this array is empty, and each
 * entry must carry `confirmed: true` to appear at all.
 *
 * Keep the sender's own words. Light punctuation to join their line breaks into
 * sentences is fine; rewriting them is not.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "I must be one of Val Bennett's oldest clients, having instructed her, and her late father, as long ago as the nineteen eighties. Fantastic service — nothing too much trouble. I would wholeheartedly recommend them to anyone.",
    name: "Roger Bower",
    role: "Lowick Mckay Solicitors",
    location: "Hale Barns, Cheshire",
    source: "direct",
    confirmed: true,
    note: "Sent direct to the business. Full postal address on the original withheld deliberately — town and county place the firm without publishing its street.",
  },
];

/* ---------------------------------------------------- performance tracker */

/**
 * Mirrors the contract in E:\Dev\home-info\src\lib\performance\compute.ts.
 * If those constants change, change them here too — they are quoted verbatim
 * in the methodology note under the tracker.
 */
export const tracker = {
  apiUrl: process.env.PERFORMANCE_API_URL ?? "http://localhost:3001",
  resellerSlug: "his",
  /** Seconds. Matches the API's own 24h cache. */
  revalidate: 86_400,

  /** Quoted in the on-page methodology note — keep in step with compute.ts. */
  windowDays: 90,
  minCompletionsPerCouncil: 5,
  topCouncils: 20,

  /**
   * The API returns counts only. A single blended turnaround figure across
   * councils is explicitly banned in compute.ts, because averaging a fast
   * council with a slow one describes neither. Do not add one.
   */
  blendedAverageAllowed: false,
} as const;

/* -------------------------------------------------------------- navigation */

export const nav = {
  /**
   * "Tools" (quote / turnaround checker / risk check) has been removed — none
   * of it existed, so it was a nav item pointing at 404s. The live product
   * catalogue takes the slot.
   *
   * The label was "What we order", which put the ordering on the wrong party:
   * the reader orders, we carry the work out, so it read as a page about what
   * this company buys. It is also the word this audience actually scans a
   * conveyancing supplier's nav for. Say "searches" in the nav, the footer, the
   * breadcrumbs and the homepage section — one word for one thing, everywhere.
   */
  /* Founder is hidden for now — the page still exists and still renders a
     placeholder where her photograph should be, so nothing links to it until
     there is a real photograph. Restore this entry, the footer link, the
     story-section link and the sitemap entry together. */
  primary: [
    { label: "Searches", href: routes.products },
    { label: "Live Tracker", href: routes.tracker },
    { label: "Councils", href: routes.councils },
    { label: "Guides", href: routes.guides },
  ],
  /** Deep-links to the real client portal in the reseller platform. */
  portalUrl: { value: "", confirmed: false, note: "Production URL of /portal in home-info" },
  /**
   * "Open an account" pointed at a page that does not exist, and asked for more
   * commitment than a first-time visitor will give. The quote builder is the
   * real first step: it is live, it is low friction, and it ends with us
   * holding their contact details anyway.
   */
  primaryCta: { label: "Get a quote", href: routes.quote },
};

/**
 * Only real pages.
 *
 * Removed: the whole "Searches" column (/searches/* was never built), the
 * "Tools" column (/tools/quote, /tools/turnaround-checker, /tools/risk-check
 * and /portal — four 404s), and /turnaround/tracker, /turnaround/warnings,
 * /turnaround/how-we-measure, /about, /about/ipsa and /contact.
 *
 * A footer full of dead links is worse than a short footer: it is the first
 * thing a crawler follows and the last thing a visitor trusts.
 */
export const footerNav = [
  {
    heading: "Searches",
    links: [
      /* "All searches", not "Searches" — a link must not repeat its own column
         heading. Matches "All councils A–Z" and "All guides" alongside it. */
      { label: "All searches", href: routes.products },
      { label: "Get a quote", href: routes.quote },
    ],
  },
  {
    heading: "Turnaround",
    links: [
      { label: "Live tracker", href: routes.tracker },
      { label: "All councils A–Z", href: routes.councils },
    ],
  },
  {
    heading: "Guides",
    links: [
      { label: "All guides", href: routes.guides },
      { label: "Glossary", href: routes.glossary },
      { label: "FAQs", href: routes.faqs },
    ],
  },
  {
    heading: "Company",
    links: [{ label: "What clients say", href: routes.testimonials }],
  },
];

/**
 * /complaints, /search-code and /accessibility were listed here but do not
 * exist. They are removed rather than left 404ing — but note that a Search Code
 * subscriber is expected to publish a complaints procedure, so those two are a
 * real obligation to build, not just a tidy-up.
 */
export const legalNav = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-of-use" },
];

/* ------------------------------------------------------------------- seo */

/**
 * True when the build is rendering content that has NOT been verified with the
 * business — unconfirmed regulatory claims, insurance figures, placeholder
 * company numbers.
 *
 * Such a build must never be indexed. `app/robots.ts` disallows every crawler
 * and `app/layout.tsx` emits `noindex, nofollow` while this is true, so the
 * escape hatch that lets a staging site build is the same switch that keeps it
 * out of Google. Forgetting one of the two is the failure this couples away.
 */
export const isUnverifiedBuild = process.env.NEXT_PUBLIC_ALLOW_UNCONFIRMED === "1";

export const seo = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.homeinformationsearches.co.uk",
  titleTemplate: "%s | Home Information Searches",
  defaultTitle: "Home Information Searches — independent property searches",
  defaultDescription:
    "Independent property searches for conveyancers and solicitors across England and Wales, with turnaround times published council by council.",
  /* Was "/images/og-default.png", which does not exist — every share preview
     on LinkedIn, WhatsApp and Slack was falling back to nothing. Points at a
     real file until a purpose-made 1200x630 card exists. */
  ogImage: "/images/hero-buyers.jpg",
  locale: "en_GB",
};

/* ----------------------------------------------------------------- export */

export const site = {
  company,
  founder,
  contact,
  phoneHref,
  accreditations,
  insurance,
  integrations,
  searches,
  enquiryTypes,
  testimonials,
  tracker,
  nav,
  footerNav,
  legalNav,
  seo,
};

export default site;

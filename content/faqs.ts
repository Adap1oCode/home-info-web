import { contact, routes, tracker } from "@/config/site";

/**
 * FAQ content.
 *
 * One source for the homepage section and /faqs, so the two can never drift
 * apart and say different things to the same reader.
 *
 * ── How these were chosen ───────────────────────────────────────────────────
 * The old set ("Who are your services for?", "What types of searches do you
 * offer?") answered questions nobody types into a search engine, and repeated
 * what the page above it already said. These are written the other way round:
 * each one is a question a conveyancer — or a client pushing their conveyancer —
 * genuinely searches for, and each has an answer that stands on its own.
 *
 * They deliberately do not overlap with content/guides.ts. Turnaround, personal
 * vs official, indemnity insurance, mining, CON29O and HMLR migration all have
 * their own pages; where an FAQ touches one, it answers the narrow question and
 * links onward rather than competing with the guide for the same query.
 *
 * ── Rules ───────────────────────────────────────────────────────────────────
 * `answer` is plain text, because it is used verbatim in FAQPage schema as well
 * as on the page. No markup, no line breaks. Two to four sentences: long enough
 * to actually answer, short enough to be lifted whole into a snippet or by a
 * language model.
 *
 * ── Claims to verify before launch ──────────────────────────────────────────
 * Two answers rest on things outside our own records:
 *   • "searches-valid-for" and "lender-accept-personal-search" cite the six
 *     month rule in the UK Finance Mortgage Lenders' Handbook. Check the current
 *     wording of Part 1 before publishing.
 *   • "something-missed" describes the Search Code complaints and redress route.
 *     `accreditations` in config/site.ts still carries confirmed:false for the
 *     Search Code and Property Ombudsman entries — this answer must not go live
 *     ahead of those being confirmed.
 */

export type Faq = {
  id: string;
  /** Phrase it the way it would be typed or asked out loud. */
  question: string;
  /** Plain text. Used on the page and verbatim in FAQPage schema. */
  answer: string;
  /** Optional onward link, rendered under the answer. */
  link?: { label: string; href: string };
  /** Shown in the homepage section. The rest live on /faqs only. */
  featured?: boolean;
};

export const faqs: Faq[] = [
  {
    id: "which-searches-are-needed",
    question: "Which searches does a property purchase actually need?",
    answer:
      "Three are close to standard on a residential purchase: a local authority search (LLC1 and CON29), a drainage and water enquiry, and an environmental report. Everything beyond that is decided by where the property is and what the buyer intends to do with it — a mining report where there were workings, optional CON29O enquiries where a right of way, common land or road scheme is a live question. Tell us the address and we will say which of those the location calls for, including the ones it does not.",
    link: { label: "See every search we offer", href: routes.products },
    featured: true,
  },

  {
    id: "how-much-do-searches-cost",
    question: "How much do property searches cost?",
    answer:
      "There is no honest single figure, because a large share of the cost is the council's own fee and that varies from one authority to the next — the same pack of searches can differ by tens of pounds across a county boundary. We price per property against the searches that property actually needs, rather than selling a fixed bundle that includes reports the location does not warrant. Send an address and you will have a figure back, itemised, within one working day.",
    link: { label: "Get a quote for a specific property", href: routes.quote },
    featured: true,
  },

  {
    id: "searches-valid-for",
    question: "How long are property searches valid for?",
    answer:
      "There is no statutory expiry date on a search, but lenders impose one in practice: the UK Finance Mortgage Lenders' Handbook works to searches being no more than six months old at completion, and an individual lender can set something shorter in its Part 2 entry. If a transaction slips past that point the options are to refresh the search or to cover the gap with a no-search indemnity policy — which manages the money, not the uncertainty.",
    link: {
      label: "Where indemnity insurance helps, and where it does not",
      href: `${routes.guides}/is-search-indemnity-insurance-an-alternative`,
    },
    featured: true,
  },

  {
    id: "lender-accept-personal-search",
    question: "Will a mortgage lender accept a personal search?",
    answer:
      "Most will, provided the search is carried out by a firm registered under the Search Code and backed by professional indemnity insurance. It is a per-lender question rather than a general one, though: a small number still require an official search answered by the council, and some accept a personal search only with specific insurance in place. Check the lender's Part 2 entry before the search is ordered, because finding out afterwards means paying twice.",
    link: {
      label: "Personal search or official search?",
      href: `${routes.guides}/personal-search-or-official-search`,
    },
    featured: true,
  },

  {
    id: "know-turnaround-before-ordering",
    question: "Can you tell me how long a council will take before I order?",
    answer:
      `Yes — that is the point of the tracker. We publish the quickest, average and longest turnaround we achieved for each council over the last ${tracker.windowDays} days, in working days from order to delivery, instead of quoting one national average that describes nobody's council. Where we have not completed enough searches in an area to be confident of the figure, the tracker says so rather than estimating.`,
    link: { label: "Check your council's turnaround", href: routes.tracker },
    featured: true,
  },

  {
    id: "something-missed",
    question: "What happens if something is missed in a search report?",
    answer:
      "Our reports are backed by professional indemnity insurance, so a matter that should have been reported and was not is an insurance claim rather than an argument. Search Code registration also requires a published complaints procedure with an independent redress route, which means you are not dependent on our goodwill if we get something wrong. In practice the more common case is a report that is technically correct but easy to misread — which is why a person reads every one before it reaches you, and flags anything you will want to look at twice.",
    featured: true,
  },

  {
    id: "coverage",
    question: "Do you cover the whole of England and Wales?",
    answer:
      "Yes, every local authority in England and Wales. Coverage is not the same thing as speed, though: what a search takes is set by the council answering it, not by where we are, so it is worth checking the individual authority before you commit to a completion date.",
    link: { label: "All councils A–Z", href: routes.councils },
  },

  {
    id: "account-needed",
    question: "Do I need to open an account before I can order?",
    answer:
      `No. A first order can come in by email to ${contact.email}, over the phone, or through the quote form, and an address with a title number is usually enough for us to work out the rest. An account gets set up when the volume makes it worth having, not as a hurdle in front of the first search.`,
    link: { label: "Start with a quote", href: routes.quote },
  },

  {
    id: "switching-provider",
    question: "Can we move our searches to you part-way through a caseload?",
    answer:
      "Yes, and you do not have to move everything at once. Nothing ties a file to a provider, but searches already ordered elsewhere still have to be paid for, so switching at the point of a new instruction is usually cheaper than re-ordering work in progress. Most firms start with the one or two councils that have been causing them trouble and widen it from there.",
  },

  {
    id: "auction-and-remortgage",
    question: "Can you do searches for auction packs and remortgages?",
    answer:
      "Yes. An auction pack needs the same searches as any other purchase but on a much shorter clock, which usually means a personal search where the council's own queue would not make the date, plus the title documents. Remortgage work is generally lighter — often title and a local authority search — and it is worth telling us the deadline up front so we can say honestly whether it is achievable.",
    link: { label: "Talk to us about a deadline", href: routes.quote },
  },
];

/** The homepage subset. Keeps the section short and /faqs the fuller answer. */
export const featuredFaqs = faqs.filter((f) => f.featured);

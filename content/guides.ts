/**
 * Guide content.
 *
 * One question per page, answer first. The `answer` field is the two-sentence
 * direct response that appears in the box at the top — it is what a search
 * engine lifts for a snippet and what a language model quotes, so it must stand
 * alone without the body copy underneath it.
 *
 * These eight are a starting set chosen to be answerable without inventing
 * data. They should be replaced or reordered once we know the eight questions
 * she is actually asked on the phone — that is better targeting than any
 * keyword tool.
 */

export type Guide = {
  slug: string;
  /** The H1. Phrase it the way someone would type or ask it. */
  question: string;
  /** Shorter label for cards and related lists. */
  short: string;
  category: "Timing" | "Ordering" | "The searches" | "Risk";
  /** Two sentences, max. Appears in the answer box and the meta description. */
  answer: string;
  /** Body paragraphs. Plain prose — no headings needed at this length. */
  body: string[];
  /** Optional closing list, rendered as a checklist. */
  points?: { title: string; detail: string }[];
  /**
   * Renders an interactive widget directly under the answer box.
   * A question whose honest answer is "it depends on your council" is better
   * served by letting the reader check their council than by more prose.
   */
  widget?: "council-turnaround";
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: "how-long-do-local-authority-searches-take",
    question: "How long do local authority searches take?",
    short: "How long do searches take?",
    category: "Timing",
    answer:
      "It depends almost entirely on the council, not on the search provider — the same search can come back in two days from one authority and six weeks from another. Rather than quote a range, we publish what we actually achieved for each council we work with.",
    body: [
      "Most providers answer this with “three to five working days”. That figure describes a good council on a good week, and it is the reason the question keeps getting asked: the number people are given rarely matches what happens.",
      "The variable is the local authority. Some run a well-staffed land charges team and turn work around in days. Others are short-handed, mid-way through migrating their records to HM Land Registry, or working through a backlog. None of that is visible from the outside, which is why a single national average is close to meaningless.",
      "What we can tell you is what we measured. For every council where we have completed enough searches to be confident, we publish the quickest, the average and the longest, in working days, from the order being placed to the report being delivered. Where we have not done enough work in an area to be sure, we say that instead of estimating.",
      "If you need a realistic date for a specific property, the council page for that authority is the fastest way to get one — or ring us and we will tell you what we are seeing there this week.",
    ],
    widget: "council-turnaround",
    related: [
      "why-do-some-councils-take-longer-than-others",
      "can-i-order-searches-before-exchange",
      "what-happens-when-a-council-migrates-to-hm-land-registry",
    ],
  },

  {
    slug: "can-i-order-searches-before-exchange",
    question: "Can I order searches before contracts are exchanged?",
    short: "Can I order searches early?",
    category: "Ordering",
    answer:
      "Yes, and ordering early is usually the single most effective way to stop searches delaying a transaction. Searches can be placed as soon as you have an address and a title number — there is nothing that requires you to wait for the contract pack.",
    body: [
      "Searches are frequently ordered late, after the draft contract arrives, because that is when the file becomes active. By then the clock has already been running for weeks, and a slow council turns into a slow transaction.",
      "Nothing prevents an earlier order. We need the address and, ideally, the title number. If a plan is required for the authority in question, we will tell you when you place the order rather than after the council has rejected it.",
      "The risk people raise is wasted cost if the sale falls through. That is a real consideration, and it is worth weighing against the cost of a completion date slipping. In practice, the searches most worth ordering early are the ones with the longest and least predictable turnaround — which is almost always the local authority search.",
      "If you are unsure whether it is worth ordering early for a particular authority, look at what that council has actually been doing recently. Where the average is two days, waiting costs you little. Where it is three weeks, it costs you the transaction.",
    ],
    related: [
      "how-long-do-local-authority-searches-take",
      "why-do-some-councils-take-longer-than-others",
      "is-search-indemnity-insurance-an-alternative",
    ],
  },

  {
    slug: "personal-search-or-official-search",
    question: "Personal search or official search — what is the difference?",
    short: "Personal vs official search",
    category: "The searches",
    answer:
      "An official search is answered by the council itself; a personal search is compiled by a search agent inspecting the same public registers. Both cover the same ground, but they differ in who stands behind the answers, how quickly they come back, and whether a particular lender will accept them.",
    body: [
      "With an official search, the local authority answers the CON29 enquiries directly and issues the LLC1 from its own register. The council is the source and the council is accountable for the content.",
      "With a personal search, a search agent inspects the same registers and records the results, with the report backed by professional indemnity insurance rather than by the council. Personal searches are regulated under the Search Code and, for a competent agent, cover the same enquiries.",
      "The practical differences are speed and acceptance. Personal searches are often quicker, because they do not sit in the council's queue. Acceptance varies by lender: some accept personal searches without qualification, others require an official search, and some accept a personal search only with specific insurance in place. That is a per-lender question and it is worth checking before you order rather than after.",
      "There is also a third factor which is becoming more relevant: whether the council's land charges register has migrated to HM Land Registry. Once it has, the LLC1 element comes from HMLR rather than the council, which changes the route regardless of which type of search you choose.",
    ],
    related: [
      "what-happens-when-a-council-migrates-to-hm-land-registry",
      "is-search-indemnity-insurance-an-alternative",
      "how-long-do-local-authority-searches-take",
    ],
  },

  {
    slug: "is-search-indemnity-insurance-an-alternative",
    question: "Is search indemnity insurance an alternative to searches?",
    short: "Search indemnity insurance",
    category: "Risk",
    answer:
      "No — indemnity insurance covers the financial consequence of something the searches would have found, but it does not tell you what is there. It is a way of managing a known timing problem, not a substitute for knowing what you are buying.",
    body: [
      "A search indemnity policy pays out if a matter that a search would have revealed later causes a loss. That is genuinely useful when a transaction has to complete before a slow council can respond, and it is a legitimate tool.",
      "What it does not do is inform anybody. If the property is affected by a planning enforcement notice, a proposed road scheme, or an unadopted road with no maintenance agreement, the policy does not tell your client that before they commit. It only responds afterwards, and only within its terms.",
      "The distinction matters most where the buyer is going to do something with the property. Someone intending to extend, convert, or build will care very much about what the CON29 says. A policy is no help to them at the point they need it.",
      "Our view is that indemnity has a place when the searches have been ordered and the council is the bottleneck. It is a poor substitute for ordering the search in the first place, which is the situation it is most often used to rescue.",
    ],
    related: [
      "can-i-order-searches-before-exchange",
      "personal-search-or-official-search",
      "how-long-do-local-authority-searches-take",
    ],
  },

  {
    slug: "do-i-need-a-coal-mining-search",
    question: "Do I need a coal mining search?",
    short: "Do I need a mining search?",
    category: "Risk",
    answer:
      "Only if the property sits in a coalfield area, which is a matter of location rather than judgement. If it does not, the search adds cost and time without adding information, and we will tell you so.",
    body: [
      "Coal mining reports matter in the former coalfields — much of the North East, Yorkshire, the North West, the Midlands, South Wales and parts of Kent and Somerset. In those areas past workings can genuinely affect ground stability, and a report is the sensible course.",
      "Outside them, the answer is usually straightforward: there is no coal, so there is nothing to report on. Ordering one anyway is not harmful, but it is a cost passed to the client for no benefit.",
      "The same logic applies to the other extraction searches — tin, clay, brine and limestone — each of which is relevant to a specific and fairly small part of the country.",
      "If you tell us the address, we will tell you which of these the location actually calls for. We would rather say “you do not need that one” than add a line to the invoice.",
    ],
    points: [
      {
        title: "Location decides it, not the property",
        detail:
          "Two houses on the same street have the same answer. It is the ground beneath them that matters.",
      },
      {
        title: "Ask before ordering the full set",
        detail:
          "A standard pack often includes searches the property does not need. It is worth a call.",
      },
    ],
    related: [
      "what-is-a-con29o",
      "personal-search-or-official-search",
      "why-do-some-councils-take-longer-than-others",
    ],
  },

  {
    slug: "what-is-a-con29o",
    question: "What is a CON29O, and when should I add one?",
    short: "What is a CON29O?",
    category: "The searches",
    answer:
      "CON29O is the set of optional enquiries that sit alongside the standard CON29 — things like public paths, common land, road proposals and pipelines. They are worth adding when something about the property or its surroundings makes one of them a live question.",
    body: [
      "The standard CON29 covers the enquiries that apply to most properties: planning history, building regulations, highways adoption, enforcement, and so on. The optional enquiries cover matters that only affect some properties, which is why they are charged separately and per enquiry.",
      "The judgement is not difficult once you know what to look for. A rural property with a track running past it raises public rights of way. A house backing onto open land raises common land and town greens. A property near a proposed route raises road schemes. A large garden raises the question of what is underneath it.",
      "The cost is modest per enquiry, but adding all of them as a matter of routine is not sensible either — most will come back with nothing to report, and the client pays for the privilege.",
      "If you send us the address and tell us what the buyer intends to do with the property, we will suggest which of the optional enquiries are worth the money and which are not.",
    ],
    related: [
      "do-i-need-a-coal-mining-search",
      "personal-search-or-official-search",
      "can-i-order-searches-before-exchange",
    ],
  },

  {
    slug: "why-do-some-councils-take-longer-than-others",
    question: "Why do some councils take so much longer than others?",
    short: "Why are some councils slower?",
    category: "Timing",
    answer:
      "The main causes are staffing in the land charges team, the state of the council's records, and whether it is part-way through migrating those records to HM Land Registry. None of this is visible from outside, which is why turnaround varies so widely between neighbouring authorities.",
    body: [
      "Land charges is a small team in most councils, often one or two people. A single period of absence, or a vacancy that takes months to fill, is enough to turn a fast authority into a slow one, and there is rarely any announcement when it happens.",
      "The condition of the records matters just as much. Where a register is fully digitised and indexed, answering an enquiry is quick. Where parts of it still sit in paper deposits or on a legacy system, somebody has to go and look, and that takes as long as it takes.",
      "Migration to HM Land Registry adds a third factor. It is a good thing once complete, but the transition period can be disruptive while records are being prepared and validated.",
      "The practical consequence is that you cannot reason about this from the outside — you can only measure it. That is why we publish per-council figures rather than one national average, and why the average across all councils would tell you nothing useful about the one you are dealing with.",
    ],
    widget: "council-turnaround",
    related: [
      "how-long-do-local-authority-searches-take",
      "what-happens-when-a-council-migrates-to-hm-land-registry",
      "can-i-order-searches-before-exchange",
    ],
  },

  {
    slug: "what-happens-when-a-council-migrates-to-hm-land-registry",
    question: "What happens to local land charges when a council migrates to HM Land Registry?",
    short: "HMLR land charges migration",
    category: "The searches",
    answer:
      "Responsibility for the local land charges register transfers from the council to HM Land Registry, so the LLC1 element comes from HMLR rather than from the authority. The CON29 enquiries stay with the council, which means a migrated area is answered by two different bodies.",
    body: [
      "HM Land Registry has been taking on local land charges registers from councils in stages since 2018. Once an authority has migrated, its LLC1 data sits with HMLR and is available directly, which is generally faster and more consistent than the equivalent council service.",
      "What does not move is the CON29. Those enquiries remain with the local authority, because they concern matters only the council holds — planning history, building control, highways, enforcement. So for a migrated council, a full local authority search draws on two sources.",
      "This is worth understanding because it explains why turnaround can improve for part of a search and not the rest, and why a council that has migrated may still be slow on the CON29 side.",
      "Migration is still in progress nationally, and different authorities are at different stages. We track where each council has got to, because it determines the route we use when we place the order.",
    ],
    related: [
      "personal-search-or-official-search",
      "why-do-some-councils-take-longer-than-others",
      "how-long-do-local-authority-searches-take",
    ],
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);

export const guideCategories = ["Timing", "Ordering", "The searches", "Risk"] as const;

/* ------------------------------------------------------------- glossary */

export type Term = { term: string; definition: string };

/**
 * One page with anchor links, rather than a page per term. Individual pages
 * are only worth breaking out for terms with real search demand — that is a
 * decision to make from analytics, not up front.
 */
export const glossary: Term[] = [
  {
    term: "LLC1",
    definition:
      "The official certificate of search of the local land charges register. It lists charges registered against the property — planning conditions, tree preservation orders, financial charges and similar. Where a council has migrated, it is issued by HM Land Registry rather than the council.",
  },
  {
    term: "CON29",
    definition:
      "The standard set of enquiries of the local authority, covering planning history, building regulations, highways adoption, enforcement notices, road schemes and related matters. Answered by the council in all cases, including where land charges have migrated to HM Land Registry.",
  },
  {
    term: "CON29O",
    definition:
      "The optional enquiries that can be added to a CON29 — public rights of way, common land and town greens, road proposals, pipelines and others. Charged per enquiry and added where the property or its surroundings make one relevant.",
  },
  {
    term: "CON29DW",
    definition:
      "The drainage and water enquiry, answered by the water and sewerage undertaker for the area rather than the council. Covers the position of public sewers, whether the property is connected for foul and surface water, and where the boundary of responsibility falls.",
  },
  {
    term: "Personal search",
    definition:
      "A local authority search compiled by a regulated search agent inspecting the public registers, rather than answered by the council. Covers the same enquiries, is backed by professional indemnity insurance, and is accepted by many but not all lenders.",
  },
  {
    term: "Official search",
    definition:
      "A local authority search answered by the council itself, with the council as the source of the answers.",
  },
  {
    term: "Search Code",
    definition:
      "The code of practice governing search reports on residential property, monitored by the Property Codes Compliance Board. It sets minimum standards for accuracy, complaints handling and independent redress.",
  },
  {
    term: "PCCB",
    definition:
      "The Property Codes Compliance Board, which monitors subscribers to the Search Code and provides an independent complaints route.",
  },
  {
    term: "IPSA",
    definition:
      "The Independent Property Search Agents association, the trade body for independent search firms.",
  },
  {
    term: "Chancel repair liability",
    definition:
      "A historic obligation on some land to contribute to the repair of a parish church. Registration requirements changed in 2013, and the risk is usually addressed by a search or by indemnity insurance.",
  },
  {
    term: "Commons registration",
    definition:
      "An enquiry establishing whether land is registered as common land or a town or village green, which can severely restrict development and access.",
  },
  {
    term: "Article 4 direction",
    definition:
      "A direction removing permitted development rights in a defined area, so alterations that would normally not need permission do require it. Common in conservation areas.",
  },
  {
    term: "Section 38 agreement",
    definition:
      "An agreement under the Highways Act by which a developer's road is adopted as publicly maintainable. Its absence is why some estate roads remain private.",
  },
  {
    term: "Section 278 agreement",
    definition:
      "An agreement for works to an existing public highway carried out in connection with a development, such as a new junction or crossing.",
  },
  {
    term: "Radon affected area",
    definition:
      "An area where the estimated proportion of homes above the radon action level exceeds a defined threshold. Assessed at area level rather than for an individual property.",
  },
  {
    term: "Contaminated land register",
    definition:
      "The register a council maintains under Part IIA of the Environmental Protection Act 1990, recording land formally determined as contaminated. Very few entries exist nationally, so a nil result is normal and not reassurance in itself.",
  },
  {
    term: "UPRN",
    definition:
      "The Unique Property Reference Number, a persistent identifier for an addressable location. Never reused, which makes it a reliable key for matching a property across systems.",
  },
  {
    term: "Search indemnity insurance",
    definition:
      "A policy covering the financial consequences of a matter that a search would have revealed. It does not report what is there, so it manages risk rather than removing uncertainty.",
  },
];

# Home Information Searches — Site Map & Content Architecture

_Draft 1 — for review. Structure only; copy comes later._

---

## 1. The position this structure serves

The current site sells on adjectives ("fast, accurate, fully compliant") that every
competitor in the sector also uses. That is not a position.

The real proposition is **a named, deeply-experienced person who answers the phone**,
in an industry that is consolidating into faceless portals and ticketing systems.

> **Thirty years in searches. One number to call. And every turnaround time published.**

Three pillars, each with a concrete proof device on the site. The published turnaround
data is **evidence for the speed claim — not the position itself.**

| Pillar | The claim | Proof device |
| --- | --- | --- |
| **Speed** | We're quick, and we don't hide behind "3–5 working days" | Live Turnaround Tracker + Council Watch |
| **Quality** | Every report is read by someone who knows what they're looking at | `/how-we-work` + IPSA standards + query/rework figures |
| **Service** | You get a person, on the phone, who can flex when you need something odd or urgent | `/speak-to-us` + named team + direct line + response promise |
| _Underneath all three:_ **Authority** | 30 years personally, two generations of family behind it, IPSA executive board, podcast, press — and the volume to prove a tight ship | `/about/founder`, `/about/ipsa`, `/podcast`, `/press` |

**Deliberate contrast with Property Searches Direct:** they went *around* the conveyancer,
direct to the home mover. We work **through** the conveyancer. That is a real, statable
difference — not a copy — and it protects the customer base rather than competing with it.

**The engagement model** is borrowed from `talktalklegal`: interactive tools that give a
genuine answer, each pre-filling a callback form with its own context. Tools qualify the
lead and demonstrate expertise at the same time.

---

## 2. Site map

Legend: **★** = new build · **◆** = exists, needs rework · **⚙** = generated from data ·
**✎** = must be written from interviews with her, cannot be automated

```
/                                                    ★ Home
```

### Searches — the product layer

```
/searches                                            ★ Overview & compare
/searches/local-authority                            ★ ✎  LLC1 + CON29R, official vs personal
/searches/environmental                              ★ ✎
/searches/drainage-and-water                         ★ ✎
/searches/title-and-land-registry                    ★ ✎
/searches/mining-and-ground-stability                ★ ✎
/searches/specialist                                 ★ ✎  chancel, HS2, commons, etc.
/searches/packages                                   ★ ⚙  bundles, priced from the engine
/searches/bespoke                                    ★ ✎  "Need something unusual? Ring me."
```

Each product page: what it is · what it protects the buyer from · what's actually in it ·
sample report · **our measured turnaround for this product** ⚙ · price ⚙ · when you'd add it.

### Turnaround — the speed pillar

```
/turnaround                                          ★ Hub — the promise, the numbers
/turnaround/tracker                                  ◆ ⚙  (move from /live-turnaround-tracker)
/turnaround/warnings                                 ★ ⚙  "Council Watch" — who's slipping now
/turnaround/how-we-measure                           ★ ✎  Methodology; defends the numbers
/turnaround/alerts                                   ★     Subscribe to the delay email
```

`/turnaround/warnings` is the page she rates on PSD — but ours can be **better**: theirs is
updated fortnightly from published claims; ours is daily from **measured completions**.

`/turnaround/alerts` is a lead-capture asset disguised as a service. Fortnightly email,
"these five councils slipped this week" — lands in conveyancers' inboxes with our name on it.

### Councils — the programmatic engine (~330 pages)

```
/councils                                            ★     Index: A–Z, searchable, map, coverage
/councils/[slug]                                     ★ ⚙   ~330 generated pages
```

Every field on these pages already exists in the reseller database (see §3). Each page:

- **Stated vs actual** — "This council says 10 working days. We measured 4.2." ⚙
  This single comparison is the strongest content unit on the site and no competitor has it.
- Our measured average / quickest / longest / volume ⚙
- Official fees — LLC1, CON29R standard & premium, CON29O per enquiry ⚙
- LLC1 source, personal search availability, HMLR migration status ⚙
- **Area risk profile** — radon, flood zone, contaminated land register, conservation
  areas, listed buildings, TPOs ⚙
- Utilities — sewerage undertaker, water supplier, lead local flood authority ⚙
- Planning & highways authority, local plan links ⚙
- "What's unusual about this council" ✎ — one or two lines of her actual knowledge, added
  over time. This is what makes the page un-copyable.
- Order CTA + link to the quote tool

### Risk & hazards — the second SEO layer

```
/risk                                                ★ ✎  Hub — what these hazards mean
/risk/radon                                          ★ ✎⚙ explainer + league table of councils
/risk/flooding                                       ★ ✎⚙
/risk/coal-mining-and-ground-stability               ★ ✎⚙
/risk/contaminated-land                              ★ ✎⚙
/risk/japanese-knotweed                              ★ ✎
```

Deliberately **not** one page per hazard per council — that would be thin. Hazard
*explainers* live here; the per-council numbers live on `/councils/[slug]`. Each explainer
carries a generated league table ("the 20 councils with the highest radon potential"),
which is a genuinely linkable asset and drives traffic into the council pages.

### Who we help

```
/for/conveyancers                                    ★ ✎
/for/solicitors                                      ★ ✎
/for/estate-agents                                   ★ ✎
/for/developers-and-new-build                        ★ ✎
/for/auction-and-fast-completion                     ★ ✎  high-intent, speed pillar
/for/home-movers                                     ★ ✎  "ask your conveyancer for us" —
                                                          states the through-not-around position
```

### The people — the actual differentiator

```
/about                                               ★ ✎  The firm, the story, the volume
/about/founder                                       ★ ✎  Her. 30 years, the family history,
                                                          thick and thin. The most important
                                                          page on the site.
/about/ipsa                                          ★ ✎  What an IPSA executive board seat
                                                          actually means for a client
/how-we-work                                         ★ ✎  Quality pillar — how every report
                                                          gets checked before it leaves
/speak-to-us                                         ★ ✎  Service pillar — a person, a direct
                                                          number, a response promise
/reviews                                             ★ ✎  Testimonials, named where possible
/podcast                                             ★ ✎  Her episodes — authority
/press                                               ★ ✎  In the press — authority
```

### Tools — the engagement layer (the talktalklegal model)

```
/tools                                               ★ Hub
/tools/quote                                         ★ ⚙  postcode → council → pack →
                                                          price + expected turnaround
/tools/turnaround-checker                            ★ ⚙  "When will my search come back?"
/tools/search-pack-builder                           ★ ⚙  Which searches does this property need?
/tools/risk-check                                    ★ ⚙  postcode → area hazard flags →
                                                          which searches that implies
/tools/report-reader                                 ★ ✎  "What does my CON29 actually say?"
```

Every tool ends in the same place: a pre-filled callback request. That is how TTL converts,
and it suits her — the tool does the qualifying, then she does what she's best at and picks
up the phone.

`/tools/quote` is the single highest-value build on this list. Nobody in the sector gives an
instant price *and* an evidenced turnaround for a specific council. The pricing engine
already supports it.

### Knowledge

```
/guides                                              ★ Hub
/guides/[slug]                                       ★ ✎ ~25 at launch
```

Launch set, drawn from her expertise and our data:

- What a CON29 actually tells you (and what it doesn't)
- LLC1 vs personal search — and why it matters more since HMLR migration
- Regulated vs personal searches: the honest comparison
- Why council searches take so long — with our own data naming names
- Search indemnity insurance: when it's fine, when it isn't
- Ordering searches for an auction purchase
- The HMLR local land charges migration: where each council is up to ⚙

```
/news                                                ★ Council & industry changes
/news/[slug]                                         ★
```

### Commercial

```
/pricing                                             ★ ⚙  Transparent, + the quote tool
/open-an-account                                     ★     Primary B2B conversion — not
                                                          "contact us"
/portal                                              ★     Marketing page for the client
                                                          portal, screenshots of the real UI
  → sign in                                          ◆     Deep-link to the real portal in
                                                          home-info (currently a dead
                                                          template page)
/contact                                             ◆
```

### Legal & compliance

```
/privacy-policy                                      ◆
/terms-of-use                                        ◆
/complaints                                          ★  trust signal in a regulated sector
/search-code                                         ★  trust signal
/accessibility                                       ★
```

**Approximate page count at launch:** ~60 editorial + ~330 generated council pages +
~25 guides ≈ **415 pages**, against 6 today.

---

## 3. What can be automated — the answer is "most of it"

The `councils` table in `E:\Dev\home-info` already carries, **per council**, nearly every
field the council pages need. No external data licensing required, no scraping:

**Risk profile** (this is the "risk profile per council" content she remembers seeing)
`radon_risk_area` · `flood_risk_zone` · `contaminated_land_register` · `conservation_areas` ·
`listed_buildings_register` · `tree_preservation_orders`

**Fees** `llc1_fee_official` · `con29r_standard_fee` · `con29r_premium_fee` ·
`con29o_fee_per_enquiry` · `inspection_search_fee` · `hmlr_official_search_fee`

**Stated turnaround** `llc1_turnaround` · `con29r_turnaround_standard` ·
`con29r_turnaround_premium` · `councils_emails.turn_around`

**Measured turnaround** — `computeResellerPerformance` in
`src/lib/performance/compute.ts`, already live behind `/api/public/performance`

**Authorities & utilities** `planning_authority` · `highway_authority` ·
`lead_local_flood_authority` · `sewerage_undertaker` · `water_supplier` ·
`building_control_authority`

**Process facts** `llc1_source` · `personal_search_available` ·
`inspection_search_available` · `hmlr_migration_status` · `hmlr_migration_date` ·
`con29r_submission_methods` · `con29r_nlis_accepted`

**Identity** `ons_code` · `region` · `county` · `council_type` · `website_url`

### What this means practically

- **Council Watch** (`/turnaround/warnings`) is fully automatable and needs no human input:
  flag any council whose rolling 30-day average exceeds its own 12-month baseline by a set
  threshold. Daily, from measured data. PSD updates theirs fortnightly from published claims.
- **Stated vs actual** is a derived field — two columns we already hold, subtracted.
  It is the most defensible content on the site.
- **The quote tool** needs the pricing engine exposed on a public read-only endpoint,
  in the same fail-closed, aggregates-only style as `/api/public/performance`.
- The existing public API returns **top 15 councils only** with a minimum-N suppression.
  For per-council pages it needs widening — with an explicit "not enough data yet" state
  rather than a silent omission, so the pages stay honest.

### Two constraints to respect

1. **Never republish licensed data.** Landmark, Groundsure and OS-licensed content cannot
   go on public pages. Everything above is either our own measured data or council-level
   public fact, which is fine. Where we want richer hazard data, use Open Government
   Licence sources (UKHSA radon maps, Environment Agency flood data, Coal Authority,
   planning.data.gov.uk) with attribution.
2. **Automation builds the floor, not the ceiling.** Generated pages get us 330 indexable,
   genuinely useful pages that no competitor can match. They do not get us a brand. The ✎
   pages — her story, the IPSA seat, how reports get checked, what's odd about a given
   council — are the differentiator, and they can only come from her.

**Recommendation:** record three or four hours of conversation with her. Her voice on the
family history, on what she's seen go wrong, on why she still rings people back — that is
the entire ✎ content library, and it's the half of this site that can't be copied. The
podcast transcript is a free head start.

---

## 4. Suggested build order

1. **Design system + home** — establish the visual language, fix the live bugs
   (dead `tel:` link, mismatched email, template auth pages, "Sign In - Simple" metadata)
2. **`/about/founder`, `/speak-to-us`, `/how-we-work`** — the position, on the page
3. **`/councils/[slug]` + `/councils`** — the SEO engine; largest single traffic win
4. **`/turnaround/*`** — hub, move the tracker, ship Council Watch and the alert email
5. **`/tools/quote`** — the conversion asset
6. **Product pages + `/for/*` segments**
7. **`/guides`, `/podcast`, `/press`** — ongoing

Steps 1–3 are the ones that change the business. Everything after compounds.

# Council pages — what the data can actually support

_Audit of `public.councils` (334 rows) before building `/councils/[slug]`._

The instinct to populate the database rather than hand-build pages is right. But the audit
changes **what** needs populating, and it corrects two things I told you earlier.

---

## 1. Two corrections to what I said before

### `radon_risk_area` is empty

I said this column was "the per-council risk profile she remembers seeing". The column
**exists but is 0% populated** — all 334 rows are null. There is no radon data in the
database today.

### Flood risk and contaminated land are boilerplate, not data

Both are 99% "populated", which is why they looked good in the schema. They are the same
sentence on every row:

| Column | Value | Rows |
| --- | --- | --- |
| `flood_risk_zone` | `Via Environment Agency – https://check-long-term-flood-risk.service.gov.uk` | 332 of 334 |
| `contaminated_land_register` | `Held by council under Part IIA Environmental Protection Act 1990` | 332 of 334 |

These are process notes, not per-council facts. Publishing them as a "risk profile" would
put the identical paragraph on 332 pages — which is precisely the thin, templated content
that gets a site filtered rather than ranked. **They should appear as an explainer once,
not as a per-council data point.**

---

## 2. What is genuinely per-council and varies

This is real, and enough to build good pages on.

| Field | Filled | Why it is worth publishing |
| --- | --- | --- |
| `hmlr_migration_status` | 99% | **The strongest field we have.** Genuinely varies: `not_started` 165, `gold` 97, `migrated` 66, `complete` 2, `in_progress` 1. Live industry issue, changes over time, and nobody else publishes a per-council view. |
| `water_supplier` | 99% | Real variance — Severn Trent 60, Thames 48, South East 45, Anglian 41, United Utilities 35, Dŵr Cymru 23, Yorkshire 22, South West 20, Northumbrian 12, Affinity… |
| `sewerage_undertaker` | 99% | Same, and differs from the water supplier in many areas — which is exactly the thing people get wrong when ordering CON29DW. |
| `planning_authority` | 95% | Differs from the billing authority in two-tier areas. |
| `highway_authority` | 96% | Same. |
| `building_control_authority` | 95% | Same. |
| `lead_local_flood_authority` | 95% | Same. |
| `council_type` | 95% | district 164, unitary 83, metropolitan 36, London borough 33. |
| `region` / `county` / `ons_code` | 89 / 70 / 95% | Navigation, grouping, and the ONS code makes each page linkable to open data. |
| `personal_search_available` | 99% | Directly affects what we can offer for that council. |
| `planning_software` | 99% | Varies. Niche but real. |
| `website_url`, `planning_portal_url`, `br_portal_url`, `air_quality_info_url` | 83–99% | Genuinely useful outbound links. |
| `llc1_source` | 50% | Useful where present. |

Plus, from the performance API: **our own measured turnaround** — but only for the top 20
councils by volume, and only where there have been at least 5 completed searches.

---

## 3. What is missing and would need populating

| Field | Filled | Note |
| --- | --- | --- |
| `radon_risk_area` | 0% | Nothing there |
| `con29r_standard_fee`, `con29r_premium_fee`, `con29o_fee_per_enquiry`, `fees_*` | 0% | No fee data at all |
| `llc1_fee_official` | 46% | Partial |
| `llc1_turnaround`, `con29r_turnaround_standard/premium` | 0% | Empty |
| `councils_emails.turn_around` | **85% null** (284 of 334) | Only ~50 councils have a stated target |

### This weakens the "stated vs actual" idea

I pitched stated-vs-actual as the flagship content unit. With `turn_around` null for 284
councils and our own measured figures covering only the top 20 by volume, the comparison
can be made for roughly **a dozen councils**, not 334.

It is still worth building — it is genuinely strong where it exists — but it has to be a
conditional block that appears when both numbers are present, not the spine of the page.

---

## 4. Recommended approach

**Build the page so it adapts to what exists**, section by section, rather than rendering
empty rows. A council with rich data gets a long page; a sparse one gets a short, honest
page. No "Data not available" filler.

Suggested sections, best-supported first:

1. **Who actually handles what** — planning, highways, building control, lead local flood
   authority, water supplier, sewerage undertaker. Real variance, immediately useful,
   and the water/sewerage split answers a question people get wrong.
2. **Local land charges status** — `hmlr_migration_status` plus `llc1_source` and
   `personal_search_available`. Our most differentiated field.
3. **Our turnaround here** — measured, where we have ≥5 completions. Otherwise omitted.
4. **Stated vs actual** — only where `turn_around` exists too.
5. **Useful links** — council site, planning portal, building regs portal, air quality.
6. **Order CTA.**

### Worth populating next, cheapest first

| Source | Licence | Gives us |
| --- | --- | --- |
| **UKHSA / UKradon indicative maps** | OGL | Real `radon_risk_area` per area — the field she asked about |
| **Environment Agency flood risk API** | OGL | Actual per-area flood data instead of one boilerplate sentence |
| **Coal Authority development risk areas** | OGL | Mining risk, which currently has no column at all |
| **planning.data.gov.uk** | OGL | Conservation areas, listed buildings, article 4 directions as real counts per authority |
| **OS Data Hub** | Existing licence | Boundaries for maps — check `docs/os/licensing-position.md` before publishing |
| **Council fee schedules** | Public | The fee columns, which are entirely empty and would unlock the quote tool |

Fees are the highest commercial value (they feed the instant-quote tool). Radon and flood
are the highest content value (they make each council page genuinely different).

---

## 5. What I would not do

Do not generate 334 pages on the fields available today alone. Roughly a third of each page
would be identical across every council, and the boilerplate flood/contaminated-land lines
would repeat verbatim 332 times. Build the template and ship the councils where the data
justifies a page, then let the page count grow as the database fills.

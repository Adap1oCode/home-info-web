# Data sourcing strategy — what we can own, publish, and be believed on

_Decision document. Nothing gets built from this until the sources are agreed._

---

## 0. The finding that changes the question

**OS OpenData and OS Premium API Data are two completely different licensing regimes, and we have been treating them as one.**

`E:\Dev\home-info\docs\os\licensing-position.md` is entirely about the **Vector Tile API** — Premium API Data. Its conclusions are correct: live view only, no reproduction, 24-hour cache limit. That is why I did not use OS for the council boundaries.

But **OS OpenData is 18 datasets published under the Open Government Licence** — free, unrestricted commercial reuse, no view-only constraint, no cache limit. It is the same organisation and the same data hub, under opposite terms.

So the answer to "is there anything free from OS Hub we can use" is: **a great deal, and some of it is exactly what we need.**

---

## 1. What each source actually gives us

Confidence column is about the **licence**, not the data quality. Anything below "Confirmed" needs checking before we publish from it.

### Tier 1 — confirmed OGL, free, commercial reuse permitted

| Source | Dataset | What it gives us | Joins on | Licence confidence |
| --- | --- | --- | --- | --- |
| **OS OpenData** | **Code-Point Open** | Every current GB postcode unit with coordinates (~1.7m) | postcode | Confirmed OGL |
| **OS OpenData** | **OS Open UPRN** | Every UPRN with coordinates | UPRN | Confirmed OGL |
| **OS OpenData** | **OS Open Linked Identifiers** | UPRN ↔ TOID ↔ USRN crosswalk | UPRN/USRN | Confirmed OGL |
| **OS OpenData** | **Boundary-Line** | Every admin boundary — wards, parishes, constituencies, districts | ONS code | Confirmed OGL |
| **OS OpenData** | **OS Open Names** | 42,000+ settlements, places, postcodes with coordinates | name/postcode | Confirmed OGL |
| **OS OpenData** | **OS Open Zoomstack** | A complete GB basemap | — | Confirmed OGL |
| **OS OpenData** | OS Open Roads / Rivers / Greenspace / USRN / Terrain 50 | Streets, watercourses, open space, terrain | USRN/geometry | Confirmed OGL |
| **BGS + UKHSA** | **Indicative Atlas of Radon** | Radon potential by 1 km grid square — the % of homes above the action level | grid → postcode | Confirmed OGL (hosted on OS Data Hub as open data) |
| **ONS** | Open Geography LAD24 boundaries | Council boundaries — already implemented | ONS LAD code | Confirmed OGL |
| **HM Land Registry** | **INSPIRE Index Polygons** | Registered title extents — we already hold this | title / geometry | OGL since 2020, **but see §2** |
| **HM Land Registry** | Price Paid Data | Every registered sale price since 1995 | postcode | Confirmed OGL |

### Tier 2 — believed OGL, verify before publishing

| Source | Dataset | What it gives us | Licence confidence |
| --- | --- | --- | --- |
| **Environment Agency** | Flood Map for Planning (Zones 2/3), Risk of Flooding from Rivers and Sea | Real flood risk by location | Believed OGL — **confirm** |
| **Coal Authority** | Development High Risk Areas | Whether a coal mining report is actually needed | Believed OGL — **confirm** |
| **planning.data.gov.uk** | Conservation areas, listed buildings, article 4 directions, tree preservation orders, brownfield land | Real per-authority planning constraints | Believed OGL — **confirm** |
| **Historic England** | Listed buildings, scheduled monuments | Heritage constraints | Believed OGL — **confirm** |

### Tier 3 — not free, do not assume

| Source | Dataset | Why it is excluded |
| --- | --- | --- |
| **BGS** | **Radon Potential dataset** (detailed 50 m) | This is the *definitive* radon map and it requires a **paid commercial licence**. Only the coarse Indicative Atlas is free. Do not conflate the two. |
| **BGS** | GeoSure (ground stability) | Licensed product |
| **OS** | Vector Tile API, Places API, premium mapping | Premium API Data — see the existing licensing note |
| **Landmark / Groundsure** | Environmental datasets | Supplied under commercial agreement for reports, not for republication |

---

## 2. Two licensing traps worth naming

**INSPIRE carries an OS dependency.** HMLR released INSPIRE Index Polygons under OGL in 2020 and commercial use is permitted. But the polygons are derived from OS mapping, and HMLR's own terms say the OGL "does not cover the use of third party rights which we are not authorised to license" — you must still comply with OS terms for the geometry. So INSPIRE is fine to *use operationally*; publishing the polygon shapes publicly needs the OS position resolved first. Attribution required:

> This information is subject to Crown copyright and database rights [year] and is reproduced with the permission of HM Land Registry.

**Radon has a free version and a paid version, and they are easy to confuse.** The free Indicative Atlas is 1 km resolution and expresses radon potential as a band. The paid Radon Potential dataset is the fine-grained one used in commercial reports. If we publish, we publish the Indicative Atlas, we say so, and we say it is indicative — never as a property-level answer.

---

## 3. The architecture this points to

Every one of these joins through a small set of keys we either already hold or can get free:

```
UPRN ──── OS Open UPRN, OS Open Linked Identifiers, INSPIRE
  │
postcode ── Code-Point Open ── radon grid, flood, coal, price paid
  │
ONS LAD code ── ONS boundaries, planning.data.gov.uk, our councils table
  │
USRN / TOID ── OS Open Roads, OS Open Linked Identifiers
```

We already hold UPRN integration on 78% of councils and ONS codes on 95%. **Code-Point Open is the missing link** — it turns a postcode into coordinates, and coordinates into every hazard dataset above. It is one free download.

---

## 4. What this is worth, honestly

### To the business (this is the bigger prize)

- **Order validation.** Postcode → UPRN → council. Wrong-council orders are the expensive failure in this business, and this fixes them at the point of entry.
- **Search pack recommendation.** If the coal, radon and flood layers say a property needs a mining report, the system can say so rather than relying on someone remembering.
- **Fewer queries back.** The single biggest cost in a search business is rework.

### To the site

- **Postcode-level pages are the real SEO play.** People search *"M20 flood risk"* and *"do I need a coal mining search in Barnsley"*, not "Manchester council property searches". There are ~2,900 postcode districts and ~11,000 sectors — a sensible page count at district level.
- **Nobody has assembled this in one place with sources shown.** The competitor publishes the same hazard categories with **no stated provenance at all**, and 25 of their 346 council pages are for authorities abolished between 2020 and 2023. The bar is lower than it looks.
- **Cited data is the differentiator.** "Radon: low" is worthless. "Radon potential band 1 (under 1% of homes above the action level) — BGS/UKHSA Indicative Atlas, 1 km grid" is a resource a conveyancer would bookmark.

---

## 5. Suggested order — cheapest first, most useful first

| # | Action | Effort | Unlocks |
| --- | --- | --- | --- |
| 1 | Load **Code-Point Open** into our DB | Low — one OGL download | Every postcode-based join below |
| 2 | Load **Indicative Atlas of Radon** | Low — OGL, on OS Data Hub | The radon field she asked for, properly sourced |
| 3 | Add **per-field provenance** (`field_sources jsonb`) | Low | Makes existing data publishable instead of stuck |
| 4 | Confirm **EA flood** and **Coal Authority** licences | Low — an email each | The two most valuable hazard layers |
| 5 | Load **OS Open UPRN** + **Linked Identifiers** | Medium — large files | Order validation, property-level accuracy |
| 6 | Load **planning.data.gov.uk** constraints | Medium | Real per-authority planning counts |
| 7 | Council fee schedules | High — manual, per council | The quote tool |

Steps 1–3 are days, not weeks, and they turn the council pages from four fields into something genuinely useful.

---

## 6. The rule I would hold to

Publish a value only when the page can name its source next to it. That is already enforced in code — `lib/councils.ts` has a `PUBLISHABLE` map that is empty by default, and adding a field requires writing a `source` string that then renders on the page.

Everything in Tier 1 can satisfy that today. Nothing in Tier 3 can. Tier 2 needs four short emails first.

---

## 7. Open questions for you

1. **Who validates?** You mentioned getting someone to check the data over time. Which fields matter enough to warrant human sign-off — fees and turnaround targets, presumably, rather than hazard layers that come with their own provenance?
2. **How far down do we go?** Council pages only, or council + postcode district? District roughly quadruples the page count but is where the search volume actually is.
3. **Do we publish the hazard layers at all, or use them internally first?** There is a defensible position where these improve ordering accuracy for a year before anything goes public.

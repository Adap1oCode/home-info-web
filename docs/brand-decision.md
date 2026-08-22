# Brand palette — decided

**Decision: the palette was rebuilt around the existing logo.** The logo stays as it is;
the site moved to meet it.

## The colours came from the file, not from a guess

`public/images/logo.png` was sampled pixel by pixel. Ignoring white and near-white, the
dominant colours are:

| Sampled | Where it appears | Became |
| --- | --- | --- |
| `#3888d8` – `#3090e0` (clustered) | Roundels, "Home Information" | `--color-brand: #348CDC` |
| `#303030` / `#282828` | "SEARCHES." wordmark | informs `--color-tx: #16222E` |

## The palette

| Token | Value | Role |
| --- | --- | --- |
| `brand` | `#348CDC` | The logo blue. Primary actions, links, data highlights. |
| `brand-dark` | `#1B6EBE` | Hover states, link text on light surfaces. |
| `brand-light` | `#8FC2EC` | Accents on dark surfaces. |
| `ink` | `#0D1F33` | The two dark sections — the tracker and the closing CTA. |
| `navy` | `#16324F` | Raised dark surfaces. |
| `chalk` | `#F7F9FC` | Page ground. |
| `sky` / `sky-deep` | `#EAF2FB` / `#D9E8F7` | Soft blue tints, eyebrow pills, icon backgrounds. |
| `mist` | `#DCE5EF` | Hairlines and card borders. |
| **`coral`** | `#E8694C` | **The one additional hue.** |
| `coral-soft` / `coral-ink` | `#FDEDE7` / `#A63C25` | Its tint and its readable text weight. |

### Why coral is the second colour

Everything else on this site is cool. Coral is the only warm thing on the page, and it is
reserved for one job: **the human side** — the phone number in the header, the direct-line
callout in the hero, the "Some things are quicker on the phone" section, her story panel,
the professional-indemnity mark.

That does two things. It gives the phone — the actual differentiator — a colour of its own
that nothing else competes with. And it stops a blue site reading like every other search
provider, which was the original worry about going blue at all.

## Turnaround bands are semantic and quarantined

`band-fast` `#1F9D6B`, `band-good` `#348CDC`, `band-watch` `#E1A130`, `band-slow` `#C7402F`.

These belong to turnaround performance and appear **only inside the tracker**. Green and
amber exist nowhere else on the site, so when a reader sees green they know it means fast,
not "decorative".

## Still outstanding

- `logo.svg` — the current asset is a raster PNG and does not scale cleanly
- `logo-white.svg` — the footer and dark sections apply `brightness-0 invert` as a stopgap,
  which flattens the two-tone lockup to solid white
- A favicon matching the mark (currently `/images/title.png`)
- An Open Graph share image — `seo.ogImage` points at `/images/og-default.png`, which does
  not exist yet

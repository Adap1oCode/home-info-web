# Gap check — current site vs. homepage mockup

_What we'd lose if we replaced the current site with the mockup as it stands._

---

## 1. Must carry over — real gaps

### 1.1 The contact form (critical)
`components/contact-form.tsx` → `app/api/contact/route.ts`

This is **the only working conversion path on the site today.** Nodemailer over SMTP,
formatted HTML email to `SMTP_TO`, subject line built from firm name + search type.

Fields: name · firm name · email · phone · search type · message
Search-type taxonomy: `local-authority` · `environmental` · `drainage-water` · `title` · `other`

The mockup's "Open an account" and "Send us a test search" buttons both point at `#`.
**Do not ship without wiring these up.** Suggest splitting into `/open-an-account`
(the B2B primary) and `/contact` (general), both posting to the existing route.

Env vars already in use: `SMTP_HOST` `SMTP_PORT` `SMTP_USER` `SMTP_PASSWORD` `SMTP_FROM` `SMTP_TO`.

### 1.2 FAQs — homepage section and `/faqs` page
`components/faqs-section.tsx` · `components/accordion.tsx` · `app/(default)/faqs/page.tsx`

Five Q&As currently live, and the mockup has **no FAQ anywhere**. They answer real
objections and are the obvious home for FAQPage schema.

| Question | Note for the rewrite |
| --- | --- |
| Who are your services for? | Keep — reinforces the B2B, through-the-conveyancer position |
| What types of searches do you offer? | Keep |
| How do I request a search? | Update — currently says "contact form or email" |
| What is your turnaround time? | **Rewrite** — currently claims a flat "3–5 working days". Replace with the live figure and a link to the tracker |
| Is my data secure? | Keep |

### 1.3 Client login
The current site has `/signin`, `/signup`, `/reset-password` — dead template pages, but
they signal that a login exists. A **real portal exists** at `src/app/portal/orders` in
`E:\Dev\home-info`.

**The mockup nav has no sign-in at all.** Existing clients will look for it top-right.
Add a login link that deep-links to the real portal, and a `/portal` marketing page.

### 1.4 "Transparent, fixed-fee pricing"
A claim in the current `trust-signals.tsx` that the mockup drops entirely. Fixed-fee is a
genuine differentiator against providers who quote per council. Worth a line on the
homepage and its own row on `/pricing`.

### 1.5 Two built tracker features not represented
`components/tracker/tracker-dashboard.tsx` already renders:

- **`ProductDonut`** — product mix by share of orders
- **`VolumeArea`** — monthly volume received, with a partial-month flag

Volume is direct evidence for her "we run a tight ship / we do the numbers" pillar and
currently appears nowhere on the mockup homepage. Consider surfacing the volume trend
alongside the turnaround dial.

---

## 2. Conflicts to resolve before launch

| Item | Current site | Mockup | Action |
| --- | --- | --- | --- |
| Email response time | "We typically respond within one business day" | "Same working day" | Confirm which is true — the mockup makes the stronger promise |
| Turnaround claim | Flat "3–5 working days" | Live measured figures | Mockup is better, but every instance of the old claim must go |
| Phone hours | Not stated | "Mon–Fri 8:30–18:00" | Placeholder — confirm |

---

## 3. Nothing lost — safe to drop

- **No robots.txt, no sitemap.xml, no structured data exist today.** Nothing to preserve;
  everything here is net new.
- `/signin` `/signup` `/reset-password` — unstyled Cruip template pages, still branded
  "Simple", with placeholder email `corybarker@email.com`. Replace with a real portal link.
- `/api/hello` — template scaffold.
- Unused components: `banner.tsx` `cta.tsx` `features-planet.tsx` `large-testimonial.tsx`
  `business-categories.tsx` `page-illustration.tsx`, plus `planet*.png`, `stripes*.svg`,
  `logo-0*.svg` (nine placeholder logos), `avatar-0*.jpg` (six stock avatars).
- The giant `Property` word in the footer.

**Bugs the mockup already fixes:** the dead `tel:01234567890` link (displayed
`07702 316 899`), the mismatched `mailto:info@propertysearchsolutions.co.uk`, the
`"Sign In - Simple"` metadata, and the trailing-dash page titles.

---

## 4. Preserve as-is

- `app/(default)/live-turnaround-tracker/page.tsx` and its `PERFORMANCE_API_URL` fetch,
  24h revalidate, and graceful "data is refreshing" fallback. Restyle only — the data
  contract works.
- `/privacy-policy` and `/terms-of-use` content.
- The `PerformancePayload` type contract shared with the reseller API.

---

## 5. Net new in the mockup (not on the current site)

Accreditation lockups · supplier logo wall · assurance row (PI cover, Search Code redress,
sample report, UK data) · integrations narrative · founder story and pull quote ·
IPSA board seat · how-we-work process · dedicated phone section · tools teaser
(quote / turnaround checker / risk check) · testimonials · guides · stated-vs-actual
turnaround table · Council Watch · live stat row.

---

## 6. Pre-launch checklist

- [ ] Contact form wired to `/api/contact`, both CTA paths
- [ ] FAQ section + `/faqs` rebuilt, turnaround answer updated, FAQPage schema added
- [ ] Client login in the nav, pointing at the real portal
- [ ] Fixed-fee pricing claim reinstated
- [ ] Founder's real name, photo and bio
- [ ] Real PI cover figure and company registration number
- [ ] Supplier list confirmed (Groundsure, FCI, GeoCerta, Palladium are **unverified**)
- [ ] Partner and accreditation logo permissions obtained
- [ ] Real testimonials, or the section removed
- [ ] All placeholder figures replaced with live API data
- [ ] robots.txt, sitemap.xml, Organization + FAQPage schema, OG images
- [ ] Cookie/consent banner if analytics is added

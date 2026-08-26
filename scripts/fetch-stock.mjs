/**
 * Pulls a curated set of stock photography from Pexels into
 * public/images/stock/, and records who took each one in credits.json.
 *
 * ── Scope rule ──────────────────────────────────────────────────────────────
 * This rule was "places and documents only, no faces". The business has
 * changed it: a page of streets and civic buildings is accurate and completely
 * cold, and the moment this company actually sits inside — someone getting the
 * keys — has a person in it. Warmth is the point, so people are now wanted.
 *
 * The original concern was never faces as such. It was stock people standing
 * in for US: a fake team, a solicitor shaking a client's hand, anything a
 * reader could take as a photograph of this firm. That line holds, and it is
 * the one to judge new photographs against:
 *
 *   WANTED  — the client's moment. Keys, boxes, a doorstep, an empty room on
 *             moving day. Plainly illustrative, and nobody mistakes it for us.
 *   NOT     — anyone who could read as our staff or our office. No handshakes,
 *             no headsets, no suited group round a laptop, no "advisor with
 *             clipboard". Every competitor has those and they fool no one.
 *
 * Judge warmth as strictly as accuracy. A forced grin is worse than a street.
 *
 * Real photography of Val and the team is commissioned separately, and the
 * story-section placeholder stays a placeholder until it exists.
 *
 *   node scripts/fetch-stock.mjs
 *
 * Needs PEXELS_API_KEY in .env.local. Re-running skips files already present,
 * so it is safe to run repeatedly.
 */

import { createWriteStream } from "node:fs";
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "stock");

/**
 * `id` becomes the filename. `query` is what Pexels is asked for; `pick` is the
 * index into the results, so a specific photo can be pinned once chosen rather
 * than changing every time the script runs.
 */
/**
 * ── Every one of these was reviewed by eye before being kept ────────────────
 * Half the first batch had to be thrown away, and none of it was obvious from
 * the search term. What came back for "legal documents" was a US at-will
 * employment contract; "architectural plans" returned drawings captioned in
 * Russian; "flooded street" returned tropical flooding under palm trees; "old
 * map" returned Mongolia. All plausible-looking, all wrong for a site about
 * English and Welsh property.
 *
 * So: look at the file before you ship it. A stock photo that is subtly from
 * the wrong country is worse than no photo, because the people most likely to
 * notice are conveyancers, and noticing is their job.
 */
const WANTED = [
  // ── kept from the first batch, reviewed and correct ──
  { id: "terraced-street", query: "british terraced houses street", pick: 0 },
  { id: "victorian-semis", query: "english suburban houses brick", pick: 0 },
  { id: "town-hall", query: "english town hall civic building", pick: 0 },
  { id: "village-cottages", query: "english village cottages", pick: 0 },
  { id: "new-build-estate", query: "new build housing estate uk", pick: 0 },
  { id: "coastline-erosion", query: "british coastline cliffs houses", pick: 0 },

  // ── replacements for the six rejected above ──
  { id: "flood-plain", query: "flooded field river england countryside", pick: 0 },
  { id: "canal-terraces", query: "canal houses england industrial town", pick: 0 },
  { id: "welsh-valley-houses", query: "wales terraced houses hillside", pick: 0 },
  { id: "conservation-street", query: "georgian townhouses england street", pick: 0 },

  /* ── people: the client's moment ─────────────────────────────────────────
     A first pass at this lost six of seven, and the reasons are worth keeping
     so nobody repeats them: "couple holding keys new home smiling" returned
     studio hands against a green wall with a cannabis-leaf keyring; "family
     outside front door new house" returned a styled vintage editorial shot in
     Eastern Europe; two queries returned the same engagement-portrait couple
     against a wooden wall; "first time buyers" returned a flat lay with the
     words hand-lettered into the photograph.

     What fixed it: name the OBJECT as well as the feeling. Boxes, a sold sign,
     a kitchen. "Happy couple" alone returns lifestyle portraiture that could be
     advertising anything; "unpacking boxes in their new home" returns the
     moment. `pick` is an index into an UNFILTERED search — do not add an
     orientation filter to these without re-checking every index, because the
     filter reorders the results and the pins silently point at other photos. */
  { id: "family-boxes", query: "family moving house cardboard boxes", pick: 1, orientation: "any" },
  { id: "family-kitchen", query: "family unpacking new home smiling", pick: 2, orientation: "any" },
  { id: "couple-boxes", query: "moving day boxes living room", pick: 3, orientation: "any" },
  { id: "sold-sign", query: "sold sign house uk", pick: 1, orientation: "any" },
  { id: "keys-indoors", query: "woman smiling holding house keys", pick: 4, orientation: "any" },
  { id: "couple-keys-door", query: "couple keys front door new home", pick: 4, orientation: "any" },
];

async function readKey() {
  const raw = await readFile(path.join(ROOT, ".env.local"), "utf8").catch(() => "");
  const line = raw.split(/\r?\n/).find((l) => l.trim().startsWith("PEXELS_API_KEY="));
  const key = line?.split("=").slice(1).join("=").trim();
  if (!key) {
    console.error("PEXELS_API_KEY not found in .env.local — nothing to do.");
    process.exit(1);
  }
  return key;
}

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  );

async function main() {
  const key = await readKey();
  await mkdir(OUT_DIR, { recursive: true });

  const credits = [];
  let downloaded = 0;
  let skipped = 0;

  for (const want of WANTED) {
    const file = path.join(OUT_DIR, `${want.id}.jpg`);

    const url = new URL("https://api.pexels.com/v1/search");
    url.searchParams.set("query", want.query);
    // "any" leaves the filter off entirely — see the note on `pick` above.
    const orientation = want.orientation ?? "landscape";
    if (orientation !== "any") url.searchParams.set("orientation", orientation);
    url.searchParams.set("per_page", "10");

    const res = await fetch(url, { headers: { Authorization: key } });
    if (!res.ok) {
      console.error(`  ! ${want.id}: Pexels returned ${res.status}`);
      continue;
    }

    const { photos = [] } = await res.json();
    const photo = photos[want.pick];
    if (!photo) {
      console.error(`  ! ${want.id}: no result at index ${want.pick} for "${want.query}"`);
      continue;
    }

    // Attribution is recorded whether or not the file is re-downloaded, so
    // credits.json stays complete on a partial run.
    credits.push({
      id: want.id,
      file: `/images/stock/${want.id}.jpg`,
      query: want.query,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      sourceUrl: photo.url,
      alt: photo.alt || "",
      source: "Pexels",
    });

    if (await exists(file)) {
      skipped++;
      console.log(`  = ${want.id} (already downloaded)`);
      continue;
    }

    const img = await fetch(photo.src.large2x ?? photo.src.large);
    if (!img.ok || !img.body) {
      console.error(`  ! ${want.id}: image download returned ${img.status}`);
      continue;
    }
    await pipeline(Readable.fromWeb(img.body), createWriteStream(file));
    downloaded++;
    console.log(`  + ${want.id}  —  ${photo.photographer}`);
  }

  await writeFile(
    path.join(OUT_DIR, "credits.json"),
    JSON.stringify(
      {
        note: "Pexels licence: free for commercial use, no attribution required, but recorded here so it can be given.",
        rule: "Places and documents only — no stock photographs of people on this site.",
        photos: credits,
      },
      null,
      2,
    ) + "\n",
  );

  console.log(`\n${downloaded} downloaded, ${skipped} already present. Credits written.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

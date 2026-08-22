/**
 * Pulls a curated set of stock photography from Pexels into
 * public/images/stock/, and records who took each one in credits.json.
 *
 * ── Scope rule, deliberately enforced here rather than left to judgement ────
 * Places and documents only. No faces, no "team" shots, no stock people
 * standing in for us or for our clients. The site's whole proposition is that
 * the numbers on it are real; a stock handshake on the same page undercuts
 * that, and every competitor already has one.
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
    url.searchParams.set("orientation", "landscape");
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

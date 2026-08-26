/**
 * Crops the hero photographs to the square the roundel actually renders, and
 * re-encodes them.
 *
 * Why this exists rather than pointing <img> straight at the originals: the
 * roundel is 450px across at most (340px on mobile) and is a circle, but the
 * source photographs are 1900–3500px wide landscape frames. Serving those meant
 * shipping roughly ten times the pixels needed, having the browser throw away
 * the ends of every frame, and doing it on the LCP element. These are plain
 * <img> tags — Next's optimiser is deliberately bypassed in the hero — so
 * nothing else was going to fix it.
 *
 * `position` is the crop anchor, set per photograph and checked by eye against
 * the output — the subject is not centred in every frame, and a circle throws
 * away the corners on top of whatever the square already lost. If you change a
 * source file, look at the result before shipping it. The same warning as
 * fetch-stock.mjs applies, for the same reason.
 *
 *   node scripts/build-hero-images.mjs
 */
import { statSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "hero");

/** Rendered at 450px; 900 is the 2x asset. Beyond that is waste on the LCP. */
const SIZE = 900;

const SOURCES = [
  { src: "public/images/hero-buyers.jpg", id: "keys-on-the-floor", position: "centre" },
  { src: "public/images/stock/family-boxes.jpg", id: "child-in-the-box", position: "centre" },
  { src: "public/images/stock/family-kitchen.jpg", id: "unpacking-together", position: "centre" },
  { src: "public/images/stock/couple-boxes.jpg", id: "first-night-in", position: "right" },
];

await mkdir(OUT_DIR, { recursive: true });

let total = 0;
for (const { src, id, position } of SOURCES) {
  const from = path.join(ROOT, src);
  const to = path.join(OUT_DIR, `${id}.jpg`);
  const before = await sharp(from).metadata();

  await sharp(from)
    .resize(SIZE, SIZE, { fit: "cover", position })
    .jpeg({ quality: 76, mozjpeg: true })
    .toFile(to);

  const kb = statSync(to).size / 1024;
  total += kb;
  console.log(`  ${id.padEnd(20)} ${before.width}x${before.height} -> ${SIZE}x${SIZE}  ${kb.toFixed(0)} KB`);
}
console.log(`\n${SOURCES.length} images, ${total.toFixed(0)} KB total.`);

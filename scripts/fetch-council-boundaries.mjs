/**
 * Fetch council boundaries from the ONS Open Geography Portal and convert them
 * to ready-to-render SVG paths.
 *
 *   node scripts/fetch-council-boundaries.mjs
 *
 * ── Why ONS and not Ordnance Survey ─────────────────────────────────────────
 * OS Data Hub mapping is Premium API Data. Its terms license a *live view
 * inside the application* only: no reproduction, no redistribution, and cached
 * data must not survive 24 hours (see E:\Dev\home-info\docs\os\licensing-
 * position.md, which already records a live attribution defect). Baking OS
 * tiles into a public marketing page would sit outside that grant.
 *
 * ONS Open Geography publishes Local Authority District boundaries under the
 * Open Government Licence v3 — free to use, publish and adapt with attribution.
 * The BUC ("ultra generalised") variant is ~1–3 KB per council, which is small
 * enough to inline as an SVG path with no map library, no tile requests, and
 * nothing loaded at runtime.
 *
 * ── Attribution (required, rendered on every map) ───────────────────────────
 *   Contains OS data © Crown copyright and database right 2024
 *   Source: Office for National Statistics licensed under the Open Government
 *   Licence v.3.0
 *
 * Output: data/council-boundaries.json
 *   { "E09000011": { name, path, viewBox, areaRank }, ... }
 *
 * The path is normalised into a 0–100 viewBox with latitude correction, so a
 * council renders correctly at any size without further projection work.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "data", "council-boundaries.json");

const SERVICE =
  "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/" +
  "Local_Authority_Districts_May_2024_Boundaries_UK_BUC/FeatureServer/0/query";

/** Page through the feature service — it caps each response. */
async function fetchAll() {
  const all = [];
  let offset = 0;
  const page = 200;

  for (;;) {
    const url =
      `${SERVICE}?where=1%3D1&outFields=LAD24CD,LAD24NM&f=geojson` +
      `&resultOffset=${offset}&resultRecordCount=${page}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`ONS returned ${res.status} at offset ${offset}`);
    const json = await res.json();
    const feats = json.features ?? [];
    all.push(...feats);
    process.stdout.write(`\r  fetched ${all.length} boundaries…`);
    if (feats.length < page) break;
    offset += page;
  }
  process.stdout.write("\n");
  return all;
}

/** Every ring in a Polygon or MultiPolygon, largest first. */
function rings(geometry) {
  const out =
    geometry.type === "Polygon"
      ? geometry.coordinates
      : geometry.coordinates.flatMap((poly) => poly);
  return out.filter((r) => Array.isArray(r) && r.length > 2);
}

/**
 * Project lon/lat into a normalised 0–100 box.
 *
 * Longitude is scaled by cos(latitude) so councils are not horizontally
 * stretched — at UK latitudes an unweighted plot squashes everything noticeably.
 */
function toSvgPath(geometry) {
  const all = rings(geometry);
  if (!all.length) return null;

  const lats = all.flat().map((c) => c[1]);
  const midLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const kx = Math.cos((midLat * Math.PI) / 180);

  const projected = all.map((ring) => ring.map(([lon, lat]) => [lon * kx, lat]));
  const xs = projected.flat().map((p) => p[0]);
  const ys = projected.flat().map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const span = Math.max(maxX - minX, maxY - minY) || 1;

  // centre the smaller axis inside the square box
  const padX = (span - (maxX - minX)) / 2;
  const padY = (span - (maxY - minY)) / 2;

  const d = projected
    .map((ring) => {
      const pts = ring.map(([x, y]) => {
        const px = ((x - minX + padX) / span) * 100;
        // SVG y grows downward; latitude grows upward
        const py = 100 - ((y - minY + padY) / span) * 100;
        return `${px.toFixed(2)},${py.toFixed(2)}`;
      });
      return `M${pts.join("L")}Z`;
    })
    .join("");

  return d;
}

const features = await fetchAll();
console.log(`  ONS returned ${features.length} local authority districts`);

const boundaries = {};
let skipped = 0;

for (const f of features) {
  const code = f.properties?.LAD24CD;
  const name = f.properties?.LAD24NM;
  if (!code || !f.geometry) {
    skipped++;
    continue;
  }
  const path = toSvgPath(f.geometry);
  if (!path) {
    skipped++;
    continue;
  }
  boundaries[code] = { name, path, viewBox: "0 0 100 100" };
}

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(boundaries), "utf8");

const bytes = Buffer.byteLength(JSON.stringify(boundaries));
console.log(`\n  wrote ${Object.keys(boundaries).length} boundaries to data/council-boundaries.json`);
console.log(`  ${(bytes / 1024 / 1024).toFixed(2)} MB (server-side only — never shipped to the browser)`);
if (skipped) console.log(`  skipped ${skipped} without usable geometry`);
console.log(
  "\n  Attribution required wherever these render:\n" +
    "    Contains OS data © Crown copyright and database right 2024\n" +
    "    Source: ONS, licensed under the Open Government Licence v3.0\n",
);

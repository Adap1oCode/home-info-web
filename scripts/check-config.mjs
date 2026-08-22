/**
 * Fails the build if config/site.ts still contains unconfirmed factual claims.
 *
 *   npm run check:config
 *
 * The point: regulatory, insurance and identity claims must not reach
 * production unverified. Anything carrying `confirmed: false` is listed here
 * with its note so it is obvious what is still outstanding.
 *
 * To build anyway (staging, previews, work in progress):
 *   NEXT_PUBLIC_ALLOW_UNCONFIRMED=1 npm run build
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "config", "site.ts");
const src = readFileSync(file, "utf8");
const lines = src.split("\n");

const findings = [];

/** Comment lines mention `confirmed: false` in prose — they are not values. */
const isComment = (l) => /^\s*(\/\/|\/\*|\*)/.test(l);

lines.forEach((line, i) => {
  if (isComment(line)) return;
  if (!/confirmed:\s*false/.test(line)) return;

  // Walk back for the nearest identifying label, and forward for the note.
  let label = "";
  for (let j = i; j >= Math.max(0, i - 8); j--) {
    const m =
      lines[j].match(/^\s*(?:id|name):\s*["']([^"']+)["']/) ??
      lines[j].match(/^\s*([A-Za-z][\w]*)\s*:\s*\{/);
    if (m) {
      label = m[1];
      break;
    }
  }

  let note = "";
  for (let j = i; j <= Math.min(lines.length - 1, i + 4); j++) {
    const m = lines[j].match(/note:\s*$/) ? null : lines[j].match(/note:\s*["']([^"']+)["']/);
    if (m) {
      note = m[1];
      break;
    }
  }

  findings.push({ line: i + 1, label: label || "(unlabelled)", note });
});

if (findings.length === 0) {
  console.log("check:config — every value in config/site.ts is confirmed.");
  process.exit(0);
}

const allow = process.env.NEXT_PUBLIC_ALLOW_UNCONFIRMED === "1";
const heading = allow ? "WARNING" : "BLOCKED";

console.log(`\n  ${heading}: ${findings.length} unconfirmed value(s) in config/site.ts\n`);
for (const f of findings) {
  console.log(`   config/site.ts:${String(f.line).padEnd(4)} ${f.label}`);
  if (f.note) console.log(`   ${" ".repeat(4)}     ↳ ${f.note}`);
}

if (allow) {
  console.log("\n  NEXT_PUBLIC_ALLOW_UNCONFIRMED=1 is set — continuing.\n");
  process.exit(0);
}

console.log(
  "\n  Confirm these with the business and set confirmed: true, or build with" +
    "\n  NEXT_PUBLIC_ALLOW_UNCONFIRMED=1 for a staging preview.\n",
);
process.exit(1);

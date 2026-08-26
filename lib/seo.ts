import type { Metadata } from "next";

import { seo } from "@/config/site";

/**
 * One place that builds a page's metadata.
 *
 * ── What this fixes ─────────────────────────────────────────────────────────
 * The dynamic routes — councils/[slug], guides/[slug], products/[group] —
 * already set a title, a description, a canonical AND an openGraph block. The
 * static pages set only the first two or three, and `openGraph` is inherited
 * whole from the root layout rather than merged field by field. The result was
 * that all ten static pages emitted the SAME og:title: "Home Information
 * Searches — independent property searches". Every share of every page — the
 * tracker, a guide, the quote builder — previewed as the homepage.
 *
 * Next.js does not copy `title` into `openGraph.title` for you, and the title
 * template is not applied to openGraph either, so it has to be done here.
 *
 * ── Use ─────────────────────────────────────────────────────────────────────
 *   export const metadata = pageMetadata({
 *     title: "Build a quote",
 *     description: "...",
 *     path: "/quote",
 *   });
 *
 * `title` is the bare page title. The " | Home Information Searches" suffix
 * comes from seo.titleTemplate in the root layout — do not repeat the company
 * name here, which is what three of these pages were doing.
 */

/** Google renders about this much of a description before truncating. */
export const MAX_DESCRIPTION = 160;

/**
 * Trims to the last sentence that fits, rather than cutting mid-word.
 *
 * Used because the guide pages pass a hand-written answer straight through as
 * the description, and those run 198–295 characters — every one of them was
 * being cut off mid-sentence in the results page. Stopping at a full stop
 * keeps the author's own words and just stops earlier. Falls back to a word
 * boundary and an ellipsis when there is no sentence break to use.
 */
export function clampDescription(text: string, max: number = MAX_DESCRIPTION): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const head = clean.slice(0, max + 1);
  const lastStop = Math.max(head.lastIndexOf(". "), head.lastIndexOf("? "), head.lastIndexOf("! "));
  if (lastStop > max * 0.5) return clean.slice(0, lastStop + 1);

  const lastSpace = head.lastIndexOf(" ");
  return clean.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd() + "…";
}

export type PageMetaInput = {
  /** Bare page title, without the company name. */
  title: string;
  description: string;
  /** Root-relative, leading slash. "/" for the homepage. */
  path: string;
  /** Guides are articles; everything else is a plain page. */
  type?: "website" | "article";
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetaInput): Metadata {
  const url = `${seo.siteUrl}${path === "/" ? "" : path}` || seo.siteUrl;
  const shortened = clampDescription(description);

  return {
    title,
    description: shortened,
    alternates: { canonical: url || `${seo.siteUrl}/` },
    openGraph: {
      title,
      description: shortened,
      url: url || `${seo.siteUrl}/`,
      type,
    },
    /* Twitter falls back to the openGraph tags for everything it does not find
       here, but not for the title — so it needs saying twice. */
    twitter: { title, description: shortened },
  };
}

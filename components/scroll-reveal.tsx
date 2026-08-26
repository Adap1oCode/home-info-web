"use client";

import { useEffect } from "react";

/**
 * Reveals `.reveal` cards as they scroll into view.
 *
 * ── Why this is not a CSS scroll-driven animation ───────────────────────────
 * It was one, using `animation-timeline: view()`, and it never ran anywhere.
 * Two reasons, and the second is why the approach was abandoned rather than
 * repaired:
 *
 *   1. `html, body { overflow-x: hidden }` made <body> a scroll container —
 *      when one axis is `hidden` the other's `visible` computes to `auto`. So
 *      `view()` bound its timeline to <body>, which never scrolls because the
 *      document scroller is <html>, and the timeline stayed inactive for ever.
 *      That is fixed in style.css and was a genuine defect on its own.
 *   2. Even fixed, `animation-timeline` is not in Firefox. Half the point of
 *      the CSS approach was that it degrades to "no motion"; but "no motion"
 *      is exactly the bug report, so degrading that way is not good enough.
 *
 * An observer works in every browser and can be verified.
 *
 * ── The fail-safe is unchanged ──────────────────────────────────────────────
 * The server renders every card visible and unstyled. This only ever ADDS the
 * hidden state, and only to cards that are already below the fold, where the
 * change cannot be seen. If this script never runs — JS disabled, an error, an
 * old browser — the page is simply the page, fully readable. Nothing is hidden
 * waiting for JavaScript that may not arrive.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (cards.length === 0) return;

    /* Checked here rather than only in CSS: with `reduce` set we want no
       classes touched at all, not an animation that is instantly skipped. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        }
      },
      /* A card counts as arrived a little before its top edge reaches the
         bottom of the window, so the movement finishes under the reader's eye
         rather than starting after they have already read it. */
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    for (const card of cards) {
      /* Anything already on screen at load stays exactly as rendered. Hiding
         it now would be a visible flash, and it has no entrance to make. */
      if (card.getBoundingClientRect().top < window.innerHeight) continue;
      card.classList.add("reveal-pending");
      observer.observe(card);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}

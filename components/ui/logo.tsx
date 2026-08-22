import Image from "next/image";
import Link from "next/link";

import { company } from "@/config/site";

/**
 * The real wordmark from /public/images/logo.png.
 *
 * The site palette is derived FROM this file rather than the other way round —
 * --color-brand is #348CDC, sampled from the roundels and the "Home Information"
 * wordmark. See docs/brand-decision.md.
 *
 * `tone="light"` inverts the mark for dark backgrounds. That is a stopgap: it
 * flattens the two-tone lockup to solid white. A proper reversed-out asset
 * (logo-white.svg) should replace it.
 */
export default function Logo({
  tone = "dark",
  size = "default",
}: {
  tone?: "dark" | "light";
  size?: "default" | "large";
}) {
  const { width, height } = size === "large" ? { width: 200, height: 67 } : { width: 168, height: 56 };

  return (
    <Link href="/" className="inline-flex shrink-0" aria-label={`${company.tradingName} — home`}>
      <Image
        src="/images/logo.png"
        alt={company.tradingName}
        width={width}
        height={height}
        className={`h-auto w-auto ${tone === "light" ? "brightness-0 invert" : ""}`}
        priority
      />
    </Link>
  );
}

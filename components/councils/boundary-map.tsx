import { BOUNDARY_ATTRIBUTION } from "@/lib/councils";

/**
 * A council boundary as a plain inline SVG path.
 *
 * No map library, no tiles, no runtime network requests — the geometry is
 * baked into the HTML at build time, so it costs nothing to load and renders
 * identically for a crawler and a browser.
 */
export default function BoundaryMap({
  path,
  name,
  tone = "light",
  className = "",
}: {
  path: string;
  name: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const stroke = tone === "dark" ? "var(--color-brand-light)" : "var(--color-brand)";
  const fill = tone === "dark" ? "var(--color-brand-light)" : "var(--color-brand)";

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={`Approximate boundary of ${name}`}
        className="h-auto w-full overflow-visible"
      >
        <path
          d={path}
          fill={fill}
          fillOpacity={tone === "dark" ? 0.22 : 0.14}
          fillRule="evenodd"
          stroke={stroke}
          strokeWidth={1.1}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <figcaption className="sr-only">{BOUNDARY_ATTRIBUTION}</figcaption>
    </figure>
  );
}

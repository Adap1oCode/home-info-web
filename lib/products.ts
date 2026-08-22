import { tracker } from "@/config/site";

/**
 * Product catalogue for /products.
 *
 * Sourced from the reseller platform's public endpoint, which strips every
 * pricing field before it leaves the building. Nothing here can expose a price,
 * a margin or an internal SKU because none of it is ever sent.
 *
 * Suppliers ARE named, by decision of the business — Landmark, Martello and
 * Veriphy are recognised names in the sector and saying who produces a report
 * is a selling point rather than a disclosure.
 */

export type PublicProduct = {
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  group: string | null;
  groupSlug: string | null;
  supplier: string | null;
  turnaroundDays: number | null;
  category: string | null;
  needsPlan: boolean;
  councilPriced: boolean;
};

/** The lighter shape the client-side search needs — descriptions excluded. */
export type ProductSearchItem = {
  slug: string;
  name: string;
  tagline: string | null;
  supplier: string | null;
  group: string | null;
  groupSlug: string | null;
};

export async function getProducts(): Promise<PublicProduct[]> {
  try {
    const res = await fetch(`${tracker.apiUrl}/api/public/products`, {
      next: { revalidate: tracker.revalidate },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { products?: PublicProduct[] };
    return json.products ?? [];
  } catch {
    return [];
  }
}

export type ProductGroup = {
  name: string;
  slug: string;
  products: PublicProduct[];
  suppliers: string[];
};

/**
 * Groups exactly as the platform groups them, largest first — the catalogue is
 * weighted towards environmental and drainage work and the page should reflect
 * that rather than imposing an arbitrary order.
 */
export function groupProducts(products: PublicProduct[]): ProductGroup[] {
  const map = new Map<string, PublicProduct[]>();
  for (const p of products) {
    const key = p.group ?? "Other";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }

  return Array.from(map.entries())
    .map(([name, list]) => ({
      name,
      slug: list[0]?.groupSlug ?? slugify(name),
      products: list,
      suppliers: Array.from(new Set(list.map((p) => p.supplier).filter(Boolean) as string[])).sort(),
    }))
    .sort((a, b) => b.products.length - a.products.length);
}

export const toSearchItems = (products: PublicProduct[]): ProductSearchItem[] =>
  products.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    supplier: p.supplier,
    group: p.group,
    groupSlug: p.groupSlug,
  }));

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Short blurbs for each group, written once rather than derived. */
export const GROUP_INTROS: Record<string, string> = {
  "Environmental & Ground":
    "Contaminated land, flood, ground stability, radon and energy infrastructure — the reports that tell a buyer whether the ground and its surroundings carry a risk worth knowing about.",
  "Drainage, Water & Flood":
    "Where the public sewers and water mains run, who bills for them, whether the property connects, and what the flood position looks like.",
  "AML & KYC":
    "Identity, anti-money-laundering and sanctions screening. Ordered alongside searches, on the same account and the same invoice.",
  "Chancel & Legal":
    "Chancel repair liability and the related legal indemnities, sized by the extent of the land.",
  "Local Authority Searches":
    "The regulated local search — LLC1 and CON29 — plus the building regulations and highways elements that sit alongside it.",
  "KYB & Company Checks":
    "Company, director and lawyer verification for transactions involving corporate parties.",
  "Source of Funds":
    "Establishing where a buyer's money has come from, to the standard your compliance team needs.",
};

import type { MetadataRoute } from "next";

import { routes, seo } from "@/config/site";
import { guides } from "@/content/guides";
import { getPublishableCouncils } from "@/lib/councils";
import { getProducts, groupProducts } from "@/lib/products";

/**
 * Generated from the database, so council pages enter the sitemap the moment
 * they exist — no manual list to keep in step.
 *
 * The site had no sitemap.xml at all before this.
 */
export const revalidate = 86_400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${seo.siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${seo.siteUrl}/councils`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    {
      /* Was "/turnaround", which is not a route — see routes.tracker in config/site.ts. */
      url: `${seo.siteUrl}${routes.tracker}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    /* /faqs and /testimonials are homepage anchors now, not URLs. A fragment
       is not a separate page and must never be listed as one. */
    { url: `${seo.siteUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${seo.siteUrl}/terms-of-use`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const guidePages: MetadataRoute.Sitemap = [
    { url: `${seo.siteUrl}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${seo.siteUrl}/guides/glossary`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...guides.map((g) => ({
      url: `${seo.siteUrl}/guides/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const groups = groupProducts(await getProducts());
  const productPages: MetadataRoute.Sitemap = [
    { url: `${seo.siteUrl}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...groups.map((g) => ({
      url: `${seo.siteUrl}/products/${g.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const councils = await getPublishableCouncils();
  const councilPages: MetadataRoute.Sitemap = councils.map((c) => ({
    url: `${seo.siteUrl}/councils/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...guidePages, ...councilPages];
}

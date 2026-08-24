import type { MetadataRoute } from "next";

import { isUnverifiedBuild, seo } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  /* A staging build carries unverified regulatory claims. Block everything —
     an indexed staging copy competes with the real site and publishes claims
     nobody has signed off. */
  if (isUnverifiedBuild) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* The template auth pages this used to hide are deleted, not hidden —
           they were unmodified Cruip scaffolding, complete with a mock browser
           showing cruip.com and a dead "Register" form. */
        disallow: ["/api/"],
      },
    ],
    sitemap: `${seo.siteUrl}/sitemap.xml`,
  };
}

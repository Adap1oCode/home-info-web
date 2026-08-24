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
        // Template auth pages pending replacement with a real portal link.
        disallow: ["/api/", "/signin", "/signup", "/reset-password"],
      },
    ],
    sitemap: `${seo.siteUrl}/sitemap.xml`,
  };
}

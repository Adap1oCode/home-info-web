import type { MetadataRoute } from "next";

import { seo } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
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

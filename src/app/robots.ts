import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/**
 * robots.txt — allow everything and point crawlers at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

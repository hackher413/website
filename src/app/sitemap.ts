import type { MetadataRoute } from "next";

import { siteConfig, mainNav, applyNav } from "@/lib/site";

/**
 * Sitemap generated from the route config. Home ranks highest; primary nav and
 * Apply follow. Kept in sync automatically as `mainNav` changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...mainNav.map((n) => n.href), applyNav.href];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === applyNav.href ? 0.9 : 0.8,
  }));
}

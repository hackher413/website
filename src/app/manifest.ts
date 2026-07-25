import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Web app manifest — enables "Add to Home Screen" and PWA metadata. Colors
 * match the brand: honey theme on the warm-white background.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#fff1b5",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { brand } from "@/lib/design/tokens";

/**
 * Web app manifest - "Add to Home Screen" metadata. Colors match brand tokens.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: brand.honeySoft,
    theme_color: brand.honey,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't get confused by lockfiles in parent
  // directories (e.g. a stray ~/package-lock.json).
  turbopack: {
    root: __dirname,
  },
  images: {
    // Sanity CDN will be added here when the CMS is wired up (Step 8).
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;

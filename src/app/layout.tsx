import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Providers } from "@/components/providers";
import "./globals.css";

/**
 * Base metadata. Page-level SEO (OpenGraph, Twitter, JSON-LD, per-route titles)
 * is layered on in Step 9; this establishes the title template and defaults.
 */
export const metadata: Metadata = {
  title: {
    default: "Hack(H)er413 — Where women and gender minorities build in tech",
    template: "%s · Hack(H)er413",
  },
  description:
    "Hack(H)er413 is a collegiate hackathon creating an inclusive, empowering space for women and gender minorities in technology.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1513" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Fonts are self-hosted via the `geist` package — no runtime fetch.
      // suppressHydrationWarning is required for next-themes' class injection.
      className={`${GeistSans.variable} ${GeistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          {/* Keyboard users can jump straight to content. */}
          <a
            href="#main"
            className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
          >
            Skip to content
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}

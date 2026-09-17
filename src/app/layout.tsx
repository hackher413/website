import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Providers } from "@/components/providers";
import { siteConfig } from "@/lib/site";
import { brand } from "@/lib/design/tokens";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const title = `${siteConfig.name} — Where women and gender minorities build in tech`;

/**
 * Root metadata. `metadataBase` resolves all relative URLs (OG image, canonical)
 * against the production origin. Per-route pages extend this via their own
 * `metadata` export; the title `template` appends the brand to each page title.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: "%s · Hack(H)er413",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "hackathon",
    "Hack(H)er413",
    "women in tech",
    "gender minorities in tech",
    "UMass Amherst",
    "collegiate hackathon",
    "diversity in tech",
    "learn to code",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    creator: "@hackher413",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: brand.honeySoft,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <a
            href="#main"
            className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
          >
            Skip to content
          </a>
          {children}
        </Providers>
        <OrganizationJsonLd />
      </body>
    </html>
  );
}

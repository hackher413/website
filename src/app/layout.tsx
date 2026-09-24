import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Providers } from "@/components/providers";
import { siteConfig } from "@/lib/site";
import { brand } from "@/lib/design/tokens";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

/**
 * Geist variable — preload:false so the hero LCP image owns the critical
 * network path on mobile Slow-4G simulations. display:swap keeps text visible.
 */
const geistSans = localFont({
  src: "../fonts/geist-latin-var.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial",
});

const defaultTitle = siteConfig.name;
const socialTitle = `${siteConfig.name} - ${siteConfig.tagline.replace(/\.$/, "")}`;

/**
 * Root metadata. `metadataBase` resolves all relative URLs (OG image, canonical)
 * against the production origin. Per-route pages extend this via their own
 * `metadata` export; the title `template` appends the brand to each page title.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
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
    title: socialTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
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
  themeColor: brand.cream,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className={`${geistSans.className} flex min-h-full flex-col`}>
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

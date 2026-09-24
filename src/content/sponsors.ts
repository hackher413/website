/**
 * Sponsors content. Grouped by tier; tiers render largest-first with decreasing
 * prominence. `logo` is optional - until real assets land we fall back to a
 * styled wordmark in the SponsorCard, so the page never looks broken.
 *
 * Names reflect current and past supporters of Hack(H)er413.
 */

export type SponsorTier = "current" | "past" | "contributor" | "partner";

export type Sponsor = {
  name: string;
  url: string;
  /** Path under /public, e.g. "/sponsors/acme.svg". Optional. */
  logo?: string;
  tier: SponsorTier;
};

export const sponsors: Sponsor[] = [
  // Current sponsors
  { name: "Manning CICS", url: "https://www.cics.umass.edu/", logo: "/sponsors/manning-cics.jpg", tier: "current" },
  { name: "WFUM", url: "https://womenforumass.org/wfum/", logo: "/sponsors/wfum.jpeg", tier: "current" },
  { name: "Innovate413", url: "https://www.innovate413.org/", logo: "/sponsors/innovate413.avif", tier: "current" },

  // Past sponsors
  { name: "Massachusetts State Lottery", url: "https://www.masslottery.com/", logo: "/sponsors/mass-lottery.webp", tier: "past" },
  { name: "Akamai", url: "https://www.akamai.com/", logo: "/sponsors/akamai.webp", tier: "past" },
  { name: "Travelers Insurance", url: "https://www.travelers.com/", logo: "/sponsors/travelers.png", tier: "past" },
  { name: "Nord Security", url: "https://nordsecurity.com/", logo: "/sponsors/nord-security.png", tier: "past" },
  { name: "MassMutual", url: "https://www.massmutual.com/", logo: "/sponsors/massmutual.webp", tier: "past" },

  // Past contributors
  { name: "Adobe Express", url: "https://www.adobe.com/express/", logo: "/sponsors/adobe-express.png", tier: "contributor" },
  { name: "Insight Global", url: "https://insightglobal.com/", logo: "/sponsors/insight-global.png", tier: "contributor" },
  { name: "Subway", url: "https://www.subway.com/", logo: "/sponsors/subway.jpg", tier: "contributor" },
  { name: "Incogni", url: "https://incogni.com/", logo: "/sponsors/incogni.png", tier: "contributor" },
  { name: "Wolfram", url: "https://www.wolfram.com/", logo: "/sponsors/wolfram.png", tier: "contributor" },

  // Past partners
  { name: "Sticker Mule", url: "https://www.stickermule.com/", logo: "/sponsors/sticker-mule.png", tier: "partner" },
  { name: "Google Cloud", url: "https://cloud.google.com/", logo: "/sponsors/google-cloud.png", tier: "partner" },
  { name: "Stand Out Stickers", url: "https://www.standoutstickers.com/", logo: "/sponsors/standout-stickers.png", tier: "partner" },
  { name: "MathWorks", url: "https://www.mathworks.com/", logo: "/sponsors/mathworks.png", tier: "partner" },
  { name: "Echo3D", url: "https://www.echo3d.com/", logo: "/sponsors/echo3d.avif", tier: "partner" },
];

export const tierMeta: Record<
  SponsorTier,
  { label: string; blurb: string; columns: string }
> = {
  current: {
    label: "2026 sponsors",
    blurb: "The partners who made our most recent event possible.",
    columns: "grid-cols-1 sm:grid-cols-3",
  },
  past: {
    label: "Past sponsors",
    blurb: "",
    columns: "grid-cols-2 sm:grid-cols-3",
  },
  contributor: {
    label: "Past contributors",
    blurb: "",
    columns: "grid-cols-2 sm:grid-cols-3",
  },
  partner: {
    label: "Past partners",
    blurb: "",
    columns: "grid-cols-2 sm:grid-cols-3",
  },
};

/** Tier render order, most prominent first. */
export const tierOrder: SponsorTier[] = [
  "current",
  "past",
  "contributor",
  "partner",
];

export const sponsorCta = {
  title: "Sponsor the next Hack(H)er413.",
  description:
    "Reach hundreds of early-career builders and help open the door to tech a little wider.",
};

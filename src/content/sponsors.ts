/**
 * Sponsors content. Grouped by tier; tiers render largest-first with decreasing
 * prominence. `logo` is optional — until real assets land we fall back to a
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
  { name: "Manning CICS", url: "https://www.cics.umass.edu/", tier: "current" },
  { name: "WFUM", url: "https://example.com", tier: "current" },
  { name: "Innovate413", url: "https://example.com", tier: "current" },

  // Past sponsors
  { name: "Massachusetts State Lottery", url: "https://example.com", tier: "past" },
  { name: "Akamai", url: "https://www.akamai.com/", tier: "past" },
  { name: "Travelers Insurance", url: "https://www.travelers.com/", tier: "past" },
  { name: "Nord Security", url: "https://nordsecurity.com/", tier: "past" },
  { name: "MassMutual", url: "https://www.massmutual.com/", tier: "past" },

  // Past contributors
  { name: "Adobe Express", url: "https://www.adobe.com/express/", tier: "contributor" },
  { name: "Insight Global", url: "https://insightglobal.com/", tier: "contributor" },
  { name: "Subway", url: "https://www.subway.com/", tier: "contributor" },
  { name: "Incogni", url: "https://incogni.com/", tier: "contributor" },
  { name: "Wolfram", url: "https://www.wolfram.com/", tier: "contributor" },

  // Past partners
  { name: "Sticker Mule", url: "https://www.stickermule.com/", tier: "partner" },
  { name: "Major League Hacking", url: "https://mlh.io/", tier: "partner" },
  { name: "Google Cloud", url: "https://cloud.google.com/", tier: "partner" },
  { name: "Stand Out Stickers", url: "https://www.standoutstickers.com/", tier: "partner" },
  { name: "MathWorks", url: "https://www.mathworks.com/", tier: "partner" },
  { name: "Echo3D", url: "https://www.echo3d.com/", tier: "partner" },
];

export const tierMeta: Record<
  SponsorTier,
  { label: string; blurb: string; columns: string }
> = {
  current: {
    label: "This year's sponsors",
    blurb: "The partners making our 2026 event possible.",
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
  title: "Want to sponsor Hack(H)er413?",
  description:
    "Partner with us to reach hundreds of driven, early-career builders and help close the gender gap in tech.",
};

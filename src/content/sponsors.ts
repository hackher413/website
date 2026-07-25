/**
 * Sponsors content. Grouped by tier; tiers render largest-first with decreasing
 * prominence. `logo` is optional — until real assets land we fall back to a
 * styled wordmark in the SponsorCard, so the page never looks broken.
 */

export type SponsorTier = "presenting" | "gold" | "silver" | "community";

export type Sponsor = {
  name: string;
  url: string;
  /** Path under /public, e.g. "/sponsors/acme.svg". Optional. */
  logo?: string;
  tier: SponsorTier;
};

export const sponsors: Sponsor[] = [
  { name: "Honeycomb Labs", url: "https://example.com", tier: "presenting" },
  { name: "Northeast Tech", url: "https://example.com", tier: "gold" },
  { name: "Bright Byte", url: "https://example.com", tier: "gold" },
  { name: "Valley Ventures", url: "https://example.com", tier: "silver" },
  { name: "Pioneer Software", url: "https://example.com", tier: "silver" },
  { name: "River Systems", url: "https://example.com", tier: "silver" },
  { name: "Local Coffee Co.", url: "https://example.com", tier: "community" },
  { name: "Campus Makerspace", url: "https://example.com", tier: "community" },
  { name: "413 Dev Collective", url: "https://example.com", tier: "community" },
];

export const tierMeta: Record<
  SponsorTier,
  { label: string; blurb: string; columns: string }
> = {
  presenting: {
    label: "Presenting sponsor",
    blurb: "The partner making this year possible.",
    columns: "grid-cols-1",
  },
  gold: {
    label: "Gold",
    blurb: "",
    columns: "grid-cols-1 sm:grid-cols-2",
  },
  silver: {
    label: "Silver",
    blurb: "",
    columns: "grid-cols-2 sm:grid-cols-3",
  },
  community: {
    label: "Community partners",
    blurb: "",
    columns: "grid-cols-2 sm:grid-cols-3",
  },
};

/** Tier render order, most prominent first. */
export const tierOrder: SponsorTier[] = [
  "presenting",
  "gold",
  "silver",
  "community",
];

export const sponsorCta = {
  title: "Want to sponsor Hack(H)er413?",
  description:
    "Partner with us to reach hundreds of driven, early-career builders and help close the gender gap in tech.",
};

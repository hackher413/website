/**
 * Brand tokens for JS/canvas/OG land.
 *
 * CSS custom properties in `globals.css` are the source for Tailwind utilities.
 * Keep these hex values identical to the ones registered there.
 */

export const brand = {
  /** Soft brown - primary brand / body text on light surfaces. */
  brown: "#5a4326",
  /** Warm cream on brown surfaces. */
  brownForeground: "#fffdf2",
  /** Honey yellow accent. */
  honey: "#fff1b5",
  honeyForeground: "#5a4326",
  /** Soft honey wash (accents / stats, not page bg). */
  honeySoft: "#fff8da",
  /** Sky accent. */
  sky: "#c1dbe8",
  skyForeground: "#43302e",
  skySoft: "#e6f1f7",
  /** Espresso field under the honeycomb hero / OG / dark bands. */
  espresso: "#1b1210",
  /** Page cream + text on espresso. */
  cream: "#fbf6ee",
  /** Gold ring / highlight. */
  gold: "#d9a441",
} as const;

export type BrandColor = keyof typeof brand;

/** Ordered accents for decorative sequences (honey → sky). */
export const accentPalette = [
  brand.honey,
  brand.sky,
  brand.honeySoft,
  brand.skySoft,
] as const;

/** Shared hexagon clip-path for avatars, ticks, and marks. */
export const HEX_CLIP =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

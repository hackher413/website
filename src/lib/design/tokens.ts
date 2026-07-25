/**
 * Brand tokens mirrored in TypeScript.
 *
 * The CSS custom properties in `globals.css` are the single source of truth for
 * anything rendered with Tailwind utilities. This module exists for the few
 * places that need brand values in JS/SVG land — most notably the HoneycombHero,
 * where cell fills are interpolated and animated and can't reference CSS
 * utilities directly.
 *
 * Keep these in sync with `globals.css`.
 */

export const brand = {
  brown: "#43302E",
  brownForeground: "#FFFDF7",
  honey: "#FFF1B5",
  honeySoft: "#FFF8DA",
  sky: "#C1DBE8",
  skySoft: "#E6F1F7",
  white: "#FFFFFF",
} as const;

export type BrandColor = keyof typeof brand;

/**
 * Ordered accent palette used to color honeycomb cells and other decorative
 * sequences. Intentionally warm-to-cool for pleasing adjacency.
 */
export const accentPalette = [
  brand.honey,
  brand.sky,
  brand.honeySoft,
  brand.skySoft,
] as const;

/**
 * Shared motion tokens for CSS animations (no Framer Motion dependency).
 * Keep durations/easings aligned with utilities like `animate-hero-cta`.
 */

export const easeCss = "cubic-bezier(0.22, 1, 0.36, 1)";

export const duration = {
  fast: "200ms",
  base: "400ms",
  slow: "600ms",
} as const;

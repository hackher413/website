/**
 * Centralized Framer Motion primitives.
 *
 * Everything animated on the site should pull from here so motion feels like a
 * single system (à la Linear / Vercel / Stripe): restrained, consistent easing,
 * and short durations. Import variants rather than defining ad-hoc animations in
 * components.
 *
 * For accessibility, wrap usage with the `useReducedMotion` hook from
 * `framer-motion` — or use `<MotionConfig reducedMotion="user">` at the app
 * root — so animations collapse gracefully when the user prefers reduced motion.
 */
import type { Transition, Variants } from "framer-motion";

/** Signature easing curve — a gentle, confident ease-out. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
} as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

/** Fade + rise. The workhorse entrance for headings, cards, and sections. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease },
  },
};

/** Plain fade — for backgrounds and decorative layers. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease } },
};

/** Scale-in for emphasis elements (badges, stat numbers). */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springSoft,
  },
};

/**
 * Parent container that staggers its children. Pair with `fadeUp` (or any
 * variant) on the children and identical `hidden`/`visible` state names.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Shared `whileInView` config so scroll reveals fire once, slightly early. */
export const inViewOnce = {
  once: true,
  margin: "0px 0px -12% 0px",
} as const;

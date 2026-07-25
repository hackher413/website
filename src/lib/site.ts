/**
 * Static site configuration — the single source of truth for routes, external
 * links, and org identity used by the Navbar, Footer, and SEO layer.
 *
 * Yearly/editable content (dates, sponsors, apply URL, etc.) will live in the
 * content layer (Step 8), NOT here. This file holds only the things that are
 * intrinsic to the site's structure.
 */

export const siteConfig = {
  name: "Hack(H)er413",
  shortName: "HH413",
  url: "https://www.hackher413.com",
  tagline: "Where women and gender minorities build in tech.",
  description:
    "Hack(H)er413 is a collegiate hackathon creating an inclusive, empowering space for women and gender minorities in technology.",
  social: {
    instagram: "https://www.instagram.com/hackher413/",
    linkedin: "https://www.linkedin.com/company/hackher413/",
    email: "mailto:hackher413@gmail.com",
  },
} as const;

export type NavItem = {
  title: string;
  href: string;
};

/** Primary navigation. Order defines display order in the Navbar. */
export const mainNav: NavItem[] = [
  { title: "About", href: "/about" },
  { title: "Schedule", href: "/schedule" },
  { title: "Sponsors", href: "/sponsors" },
  { title: "Team", href: "/team" },
  { title: "FAQ", href: "/faq" },
];

/** The primary conversion action, surfaced as a button in the Navbar. */
export const applyNav: NavItem = { title: "Apply", href: "/apply" };

/** Footer link groups. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Event",
    items: [
      { title: "About", href: "/about" },
      { title: "Schedule", href: "/schedule" },
      { title: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Community",
    items: [
      { title: "Team", href: "/team" },
      { title: "Sponsors", href: "/sponsors" },
      { title: "Apply", href: "/apply" },
    ],
  },
];

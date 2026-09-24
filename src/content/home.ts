/**
 * Homepage content. Copy lives here so it can change without touching JSX.
 */

export type HomeFeature = {
  title: string;
  description: string;
};

export const homeFeatures: HomeFeature[] = [
  {
    title: "Built around who shows up",
    description:
      "Tracks, mentors, and the room itself are set up so women and gender minorities feel supported from first commit to final demo.",
  },
  {
    title: "First-timers thrive here",
    description:
      "Guided tracks, starter kits, and mentors who expect beginners - 88 first-timers built with us in 2026.",
  },
  {
    title: "Workshops you can ship from",
    description:
      "Web, AI, hardware, and design sessions that turn into real projects before Sunday's demos.",
  },
  {
    title: "People who stick around",
    description:
      "Builders, mentors, and recruiters who stay in touch long after closing ceremony.",
  },
];

export const homeMission = {
  title: "Technology is better when everyone helps build it.",
  body: [
    "Our mission is to create a welcoming and inclusive environment for all women - cis and trans - and non-binary students of every ethnic, gender, socioeconomic, and educational background.",
    "We bring students together to innovate, learn, and feel safe while doing so - a weekend where taking creative risks is exactly the point.",
  ],
};

export const homeCta = {
  title: "2026 is a wrap. 2027 is next.",
  description:
    "Applications are closed for this year. Join the list and we'll email you the moment the next cycle opens.",
};

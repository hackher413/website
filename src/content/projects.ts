/**
 * Past hackathon winners, grouped by year.
 *
 * Local, typed content module (same pattern as sponsors.ts / team.ts) so the
 * roster can be edited without touching the page. Add a new `ProjectYear` entry
 * each year; years render newest-first via `projectYearOrder`.
 *
 * Descriptions and links are drawn from the event's Devpost gallery.
 */

export type Project = {
  name: string;
  /** One-line tagline / description. */
  description: string;
  /** Link to the project (Devpost page). */
  url: string;
  /** Thumbnail under /public, e.g. "/projects/name.png" (the Devpost cover). */
  image: string;
  /** Award won, e.g. "Best AI/ML Hack". Optional. */
  award?: string;
};

export type ProjectYear = {
  year: number;
  projects: Project[];
};

export const projectYears: ProjectYear[] = [
  {
    year: 2026,
    projects: [
      {
        name: "ReadyPresent",
        description:
          "The simplest way to prepare a presentation, with live feedback as you rehearse.",
        url: "https://devpost.com/software/ready-present",
        image: "/projects/ready-present.jpeg",
      },
      {
        name: "CourtVision",
        description:
          "An AI-powered NBA intelligence layer delivering real-time player projections and predictive game analysis.",
        url: "https://devpost.com/software/courtvision-ydejwi",
        image: "/projects/courtvision.png",
      },
      {
        name: "Hiring Manager Pro",
        description:
          "Structured hiring decisions — because they shouldn't rely on vibes alone.",
        url: "https://devpost.com/software/hiring-manager-pro",
        image: "/projects/hiring-manager-pro.png",
      },
      {
        name: "Closure",
        description: "Bring closure to your team with clearer project wrap-ups.",
        url: "https://devpost.com/software/closure-xgb6f3",
        image: "/projects/closure.png",
      },
      {
        name: "WhereDaMilk?",
        description:
          "An AI-powered vision assistant that helps visually impaired users shop independently.",
        url: "https://devpost.com/software/wheredamilk",
        image: "/projects/wheredamilk.png",
      },
      {
        name: "Give Me Peace",
        description: "Need somewhere to study? Give Me Peace helps you find it.",
        url: "https://devpost.com/software/give-me-peace",
        image: "/projects/give-me-peace.jpeg",
      },
      {
        name: "Fuzzy Wuzzy Study Buddies",
        description:
          "Machine-learning eye tracking with real-time face rendering to keep you focused while you study.",
        url: "https://devpost.com/software/fuzzy-wuzzy-study-buddies",
        image: "/projects/fuzzy-wuzzy.png",
      },
      {
        name: "Eyes on You",
        description:
          "An AI-powered YouTube focus assistant that enforces what you meant to do, not what the algorithm tempts you to.",
        url: "https://devpost.com/software/eyes-on-you-7oija3",
        image: "/projects/eyes-on-you.png",
      },
      {
        name: "Dialyn",
        description:
          "A voice AI that handles customer calls and books doctor appointments as an AI receptionist.",
        url: "https://devpost.com/software/dialyn",
        image: "/projects/dialyn.png",
      },
      {
        name: "Witness",
        description:
          "Turns your phone into a blockchain-secured, AI-structured, legally defensible proof machine.",
        url: "https://devpost.com/software/witness-x4sz3r",
        image: "/projects/witness.png",
      },
      {
        name: "ShareBooth",
        description: "A photobooth from anywhere — capture the moment, together.",
        url: "https://devpost.com/software/sharebooth",
        image: "/projects/sharebooth.png",
      },
      {
        name: "CHRONEXIS",
        description:
          "Simulates hundreds of delivery outcomes with probabilistic modeling to forecast realistic timelines and risks.",
        url: "https://devpost.com/software/chronexis",
        image: "/projects/chronexis.png",
      },
    ],
  },
];

/** Year render order, most recent first. */
export const projectYearOrder = projectYears
  .map((y) => y.year)
  .sort((a, b) => b - a);

export const projectsCta = {
  title: "Your project could be here in 2027.",
  description:
    "Bring an idea — or just your curiosity — and ship something you're proud of before Sunday demos.",
};

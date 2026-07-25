import {
  HeartHandshake,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Homepage content.
 *
 * Local, typed content module — the intermediate step toward Sanity (Step 8).
 * Keeping copy out of the JSX means editors (and, later, a CMS) can change it
 * without touching components. Icons stay in code since they're presentational.
 */

export type HomeStat = { value: string; label: string };

export const homeStats: HomeStat[] = [
  { value: "400+", label: "Attendees" },
  { value: "80+", label: "Universities" },
  { value: "19", label: "Countries" },
  { value: "24", label: "Hours" },
];

export type HomeFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: "honey" | "sky";
};

export const homeFeatures: HomeFeature[] = [
  {
    icon: HeartHandshake,
    title: "Built for belonging",
    description:
      "A space designed for women and gender minorities to feel seen, supported, and celebrated — from your first commit to your final demo.",
    tone: "honey",
  },
  {
    icon: Sparkles,
    title: "Beginners genuinely welcome",
    description:
      "Never been to a hackathon? Perfect. Guided tracks, starter kits, and mentors make your first build approachable and fun.",
    tone: "sky",
  },
  {
    icon: Wrench,
    title: "Learn by making",
    description:
      "Hands-on workshops in web, AI, hardware, and design. Turn an idea into something real over one unforgettable weekend.",
    tone: "honey",
  },
  {
    icon: Users,
    title: "Find your people",
    description:
      "Meet teammates, mentors, and companies who care. The connections you make here outlast the weekend.",
    tone: "sky",
  },
];

export const homeMission = {
  eyebrow: "Our mission",
  title: "Technology is better when everyone helps build it.",
  body: [
    "Our mission is to create a welcoming and inclusive environment for all women — cis and trans — and non-binary students of every ethnic, gender, socioeconomic, and educational background.",
    "We bring students together to innovate, learn, and feel safe while doing so — a weekend where taking creative risks and discovering you belong in tech is exactly the point.",
  ],
};

export const homeCta = {
  title: "Ready to build something with us?",
  description:
    "Bring your curiosity — we'll bring the mentors, workshops, food, and a room full of people cheering you on.",
};

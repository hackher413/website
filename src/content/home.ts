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
  { value: "500+", label: "Hackers" },
  { value: "36", label: "Hours" },
  { value: "40+", label: "Workshops" },
  { value: "$10k", label: "In prizes" },
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
    "Hack(H)er413 is a collegiate hackathon on a mission to close the gender gap in tech — not with a lecture, but with a weekend of building, learning, and community.",
    "We create an environment where women and gender minorities can take creative risks, learn new skills, and discover they belong in this industry, exactly as they are.",
  ],
};

export const homeCta = {
  title: "Ready to build something with us?",
  description:
    "Applications are open. Bring your curiosity — we'll bring the rest.",
};

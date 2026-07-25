import {
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * About-page content. Local, typed module — the intermediate step toward Sanity
 * (Step 8). Copy lives here so editors (and, later, a CMS) can change it without
 * touching components.
 */

export const aboutIntro = {
  eyebrow: "About us",
  title: "We're building a more welcoming front door to tech.",
  lead: "Hack(H)er413 is a collegiate hackathon in Western Massachusetts, created for women and gender minorities and open to everyone who shares our mission.",
};

export const aboutStory = {
  eyebrow: "Our story",
  title: "Started by students who wanted a seat at the table.",
  body: [
    "Hack(H)er413 began with a simple observation: hackathons are incredible places to learn, but too many people never walk through the door because they don't see themselves reflected inside.",
    "So a group of students in the 413 set out to build the event they wished they'd had — one where a first-timer is just as celebrated as a seasoned competitor, where mentors outnumber the intimidating jargon, and where the whole weekend is designed around belonging.",
    "Every year we grow, but the mission stays fixed: close the gender gap in tech by making the on-ramp genuinely accessible.",
  ],
};

export type AboutValue = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: "honey" | "sky";
};

export const aboutValues: AboutValue[] = [
  {
    icon: HeartHandshake,
    title: "Belonging first",
    description:
      "Every decision — from track design to snacks — is made so more people feel they belong here.",
    tone: "honey",
  },
  {
    icon: Lightbulb,
    title: "Curiosity over credentials",
    description:
      "You don't need a perfect résumé to build something great. You just need to be curious and willing to try.",
    tone: "sky",
  },
  {
    icon: ShieldCheck,
    title: "Safe and supported",
    description:
      "A clear code of conduct, present organizers, and mentors mean you can take creative risks without fear.",
    tone: "honey",
  },
  {
    icon: Users,
    title: "Community that lasts",
    description:
      "The teammates and mentors you meet become a network that carries well beyond the weekend.",
    tone: "sky",
  },
];

export const aboutStats = [
  { value: "500+", label: "Hackers" },
  { value: "36", label: "Hours" },
  { value: "50+", label: "Mentors" },
  { value: "8", label: "Years running" },
];

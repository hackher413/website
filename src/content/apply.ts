import {
  CalendarCheck,
  FileText,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";

/**
 * Apply-page content. The application itself lives in an external form; this
 * page sells the decision and sets expectations. `applyUrl` is the one link to
 * update each cycle.
 */

export const applyIntro = {
  eyebrow: "Apply",
  title: "Your spot at the hive is waiting.",
  lead: "Applications take about ten minutes. No experience required — just bring your curiosity.",
};

/** External application link. Update per cycle (or move to a CMS in Step 8). */
export const applyUrl = "https://example.com/apply";

export const applyStatus = {
  isOpen: true,
  /** Shown near the CTA. */
  deadline: "Applications close two weeks before the event.",
};

export type ApplyStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const applySteps: ApplyStep[] = [
  {
    icon: FileText,
    title: "Fill out the form",
    description:
      "Tell us a bit about you and why you want to hack with us. It's short, we promise.",
  },
  {
    icon: CalendarCheck,
    title: "Get your decision",
    description:
      "We review on a rolling basis and email you with next steps and event details.",
  },
  {
    icon: PartyPopper,
    title: "Show up and build",
    description:
      "Arrive at check-in, meet your people, and make something you're proud of.",
  },
];

export const applyEligibility = [
  "Currently enrolled college or university students.",
  "Beginners and first-time hackers are especially encouraged.",
  "All majors and disciplines welcome — not just CS.",
];

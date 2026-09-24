/**
 * About-page content. Copy lives here so it can change without touching JSX.
 */

export const aboutIntro = {
  title: "A front door to tech that feels like yours.",
  lead: "Hack(H)er413 is a collegiate hackathon at UMass Amherst for women and non-binary students - open to allies who share the mission.",
};

export const aboutStory = {
  title: "Started by students who wanted a seat at the table.",
  body: [
    "Hack(H)er413 began with a simple observation: hackathons are incredible places to learn, but too many people never walk through the door because they don't see themselves reflected inside.",
    "So students at UMass Amherst built the event they wished they'd had - one where a first-timer is celebrated as much as a seasoned competitor, mentors outnumber the jargon, and the weekend is designed so more people can take creative risks.",
    "In 2026 we welcomed 400+ attendees from 80+ universities across 19 countries. The scale changes; the mission doesn't: a space where women and non-binary students innovate, learn, and feel safe doing it.",
  ],
};

export type AboutValue = {
  title: string;
  description: string;
};

export const aboutValues: AboutValue[] = [
  {
    title: "People first",
    description:
      "From track design to snacks, we choose what helps more people feel they can show up and stay.",
  },
  {
    title: "Curiosity over credentials",
    description:
      "You don't need a perfect résumé. You need curiosity and a willingness to try.",
  },
  {
    title: "Safe to take risks",
    description:
      "A clear code of conduct, present organizers, and mentors mean you can experiment without fear.",
  },
  {
    title: "Community that lasts",
    description:
      "Teammates and mentors become a network that carries well beyond Sunday night.",
  },
];

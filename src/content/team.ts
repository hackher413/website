/**
 * Team content. Organizers grouped by team (committee). `image` is optional —
 * OrganizerCard falls back to a monogram avatar so the page looks intentional
 * before real headshots are added.
 */

export type Organizer = {
  name: string;
  role: string;
  /** Path under /public, e.g. "/team/jane.jpg". Optional. */
  image?: string;
  linkedin?: string;
};

export type TeamGroup = {
  name: string;
  members: Organizer[];
};

export const teamIntro = {
  eyebrow: "Our team",
  title: "The people behind the hive.",
  lead: "Hack(H)er413 is organized entirely by students who volunteer their time to build something bigger than themselves.",
};

export const team: TeamGroup[] = [
  {
    name: "Directors",
    members: [
      { name: "Ada Rivera", role: "Executive Director" },
      { name: "Priya Nadar", role: "Deputy Director" },
    ],
  },
  {
    name: "Logistics",
    members: [
      { name: "Sam Okafor", role: "Operations Lead" },
      { name: "Jordan Lee", role: "Venue & Safety" },
      { name: "Mina Torres", role: "Food & Supplies" },
    ],
  },
  {
    name: "Sponsorship",
    members: [
      { name: "Robin Chen", role: "Sponsorship Lead" },
      { name: "Alex Morgan", role: "Partnerships" },
    ],
  },
  {
    name: "Design & Web",
    members: [
      { name: "Kai Patel", role: "Design Lead" },
      { name: "Noor Haddad", role: "Web Developer" },
    ],
  },
  {
    name: "Marketing",
    members: [
      { name: "Lena Fischer", role: "Marketing Lead" },
      { name: "Tomás Ruiz", role: "Social Media" },
    ],
  },
];

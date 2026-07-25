/**
 * Team content. Organizers grouped by team (committee). `image` is optional —
 * OrganizerCard falls back to a monogram avatar so the page looks intentional
 * before real headshots are added.
 *
 * Roster reflects the 2026 organizing team.
 */

export type Organizer = {
  name: string;
  role: string;
  pronouns?: string;
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
  lead: "Hack(H)er413 is organized entirely by UMass Amherst students who volunteer their time to build something bigger than themselves.",
};

export const team: TeamGroup[] = [
  {
    name: "Directors",
    members: [
      { name: "Ananya Koduru", role: "Co-Director", pronouns: "she/her" },
      { name: "Advaya Venbakkam", role: "Co-Director", pronouns: "she/her" },
    ],
  },
  {
    name: "Sponsorship & Finance",
    members: [
      { name: "Carol Ding", role: "Head of Sponsorship", pronouns: "she/her" },
      {
        name: "Kaustubha Vohra",
        role: "Assistant Head of Sponsorship",
        pronouns: "he/him",
      },
      { name: "Naysa Arora", role: "Head of Finance", pronouns: "she/her" },
    ],
  },
  {
    name: "Outreach & Marketing",
    members: [
      { name: "Vidhika Tiwari", role: "Head of Outreach", pronouns: "she/her" },
      { name: "Gianna Leidich", role: "Head of Marketing", pronouns: "she/her" },
      { name: "Hiya Dagli", role: "Head of Social Media", pronouns: "she/her" },
      {
        name: "Rakshita Saroha",
        role: "Head of Diversity & Inclusion",
        pronouns: "she/her",
      },
    ],
  },
  {
    name: "Technology",
    members: [
      { name: "Priyal Nanda", role: "Head of Technology", pronouns: "she/her" },
      {
        name: "Niharika Elangovan",
        role: "Assistant Head of Technology",
        pronouns: "she/her",
      },
      {
        name: "Jennifer Ye",
        role: "Assistant Head of Technology",
        pronouns: "she/her",
      },
      {
        name: "Jeba Shalin",
        role: "Assistant Head of Technology",
        pronouns: "she/her",
      },
    ],
  },
  {
    name: "Logistics & Hardware",
    members: [
      { name: "Elizabeth Peter", role: "Head of Logistics", pronouns: "she/her" },
      {
        name: "Shriya Gautam",
        role: "Assistant Head of Logistics",
        pronouns: "she/her",
      },
      { name: "Monil Bhavsar", role: "Co-Head of Hardware", pronouns: "he/him" },
      { name: "Jessie Wang", role: "Co-Head of Hardware", pronouns: "she/her" },
    ],
  },
];

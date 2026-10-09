/**
 * Event photo strip content. Paths live under /public/photos/{year}/.
 * `orientation` sets tile width in the horizontal scroller.
 */

export type EventPhoto = {
  src: string;
  alt: string;
  orientation: "landscape" | "portrait";
};

export const photosIntro = {
  eyebrow: "2026 in the room",
  title: "What the weekend looked like.",
  description: "Mentors, demos, snacks, and the sticky-note bee - hover to pause.",
};

/** Ordered for the homepage strip - strong openers, mixed rhythm, no near-duplicates. */
export const eventPhotos2026: EventPhoto[] = [
  {
    src: "/photos/2026/organizers.jpg",
    alt: "Hack(H)er413 organizers in matching green sweatshirts posing under gold balloon letters and a sticky-note bee.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/atrium.jpg",
    alt: "High-angle view of the hackathon atrium filled with teams working at numbered tables.",
    orientation: "portrait",
  },
  {
    src: "/photos/2026/lobby.jpg",
    alt: "The event lobby with the pixel bee mural, gold HackHer branding, and teams working nearby.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/mentoring.jpg",
    alt: "Students and a mentor gathered around laptops at a team table near snowy windows.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/collaborating.jpg",
    alt: "Three students focused on a laptop screen while collaborating at their table.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/cookies.jpg",
    alt: "Three organizers in green sweatshirts celebrating open boxes of cookies at the snack table.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/hardware.jpg",
    alt: "Two builders working on a laptop and breadboard hardware project amid a busy hall.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/sponsors.jpg",
    alt: "Attendees browsing sponsor table stickers and MLH materials near the Snack Overflow sign.",
    orientation: "portrait",
  },
  {
    src: "/photos/2026/ready-present.jpg",
    alt: "Four students presenting ReadyPresent on two laptop screens at demo time.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/auditorium.jpg",
    alt: "A full auditorium of attendees seated for a hackathon ceremony.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/team-demo.jpg",
    alt: "A five-person team posing behind their project table with laptops and a small prototype.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/panel.jpg",
    alt: "Speakers on stage with microphones during a hybrid panel projected on a large screen.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/build.jpg",
    alt: "Two builders smiling with a handmade wooden hardware game in the atrium.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/meal.jpg",
    alt: "Attendees gathering around a long table of sandwiches and drinks during a meal break.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/workshop.jpg",
    alt: "A student presenting a React demo from a podium with code projected behind them.",
    orientation: "landscape",
  },
  {
    src: "/photos/2026/community.jpg",
    alt: "A group of attendees in Hack(H)er413 shirts posing in front of the wooden grandstand seating.",
    orientation: "landscape",
  },
];

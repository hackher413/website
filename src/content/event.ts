/**
 * Core event facts - the yearly-changing details referenced across pages.
 * Kept in one place so a new cycle is a single edit.
 */

export const event = {
  /** Display date range for the current cycle. */
  dates: "February 21-22, 2026",
  year: 2026,
  duration: "24 hours",
  venue: {
    name: "Computer Science Building",
    org: "University of Massachusetts Amherst",
    location: "Amherst, Massachusetts",
  },
  cost: "Free to attend",
  /**
   * The current event has concluded. When true, pages surface a wrap-up state
   * instead of an open call to action.
   */
  isConcluded: true,
  concludedMessage:
    "Our 2026 hackathon has wrapped - thank you to everyone who joined us. Stay tuned for 2027!",
} as const;

export type EventStat = { value: string; label: string };

/**
 * Canonical stats for the current cycle. About picks a subset plus extras;
 * nowhere else should invent its own numbers.
 */
export const eventStats: EventStat[] = [
  { value: "400+", label: "Attendees" },
  { value: "80+", label: "Universities" },
  { value: "19", label: "Countries" },
  { value: "24", label: "Hours" },
  { value: "45", label: "Majors" },
  { value: "88", label: "First-timers" },
];

/** Stats shown on the About page. */
export const aboutStats: EventStat[] = [
  eventStats[0],
  eventStats[1],
  eventStats[4],
  eventStats[5],
];

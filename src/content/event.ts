/**
 * Core event facts — the yearly-changing details referenced across pages.
 * Kept in one place so a new cycle is a single edit (and a clean Sanity swap).
 */

export const event = {
  /** Display date range for the current cycle. */
  dates: "February 21–22, 2026",
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
    "Our 2026 hackathon has wrapped — thank you to everyone who joined us. Stay tuned for 2027!",
} as const;

/** Headline stats for the current cycle (shown on the homepage + About). */
export const eventStats = [
  { value: "400+", label: "Attendees" },
  { value: "25+", label: "Sponsors" },
  { value: "24", label: "Hours" },
  { value: "80+", label: "Universities" },
];

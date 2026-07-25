/**
 * Data that drives the honeycomb hero.
 *
 * These stats are placeholders with the final shape the content layer (Step 8)
 * / Sanity will provide, so wiring the CMS later is a drop-in swap. Only a
 * handful of cells reveal a stat; the rest are decorative.
 */

export type HoneycombStat = {
  /** Big number/label, e.g. "500+". */
  value: string;
  /** Short descriptor, e.g. "hackers". */
  label: string;
};

export const honeycombStats: HoneycombStat[] = [
  { value: "400+", label: "attendees" },
  { value: "80+", label: "universities" },
  { value: "19", label: "countries" },
  { value: "24", label: "hours" },
  { value: "45", label: "majors" },
  { value: "100%", label: "beginner friendly" },
  { value: "free", label: "to attend" },
];

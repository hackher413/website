"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import type { EventKind, ScheduleEvent } from "@/content/schedule";

/** Marker accent per event kind. Meals/activities stay quiet; milestones pop. */
const kindDot: Record<EventKind, string> = {
  ceremony: "bg-honey border-honey",
  milestone: "bg-sky border-sky",
  workshop: "bg-brand border-brand",
  meal: "bg-muted border-border",
  activity: "bg-muted border-border",
};

/**
 * Vertical timeline of schedule events. A single continuous rail on the left,
 * with a marker per event and staggered scroll-in reveals. Reusable for any
 * time-ordered list.
 */
export function Timeline({ events }: { events: ScheduleEvent[] }) {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={staggerContainer}
      className="relative ml-1.5 border-l border-border"
    >
      {events.map((event, i) => (
        <motion.li
          key={`${event.time}-${i}`}
          variants={fadeUp}
          className="relative pb-10 pl-8 last:pb-0"
        >
          <span
            className={cn(
              "absolute -left-[7px] top-1.5 size-3 rounded-full border-2",
              kindDot[event.kind],
            )}
            aria-hidden="true"
          />
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {event.time}
          </div>
          <h3 className="mt-1 text-lg font-semibold text-balance">
            {event.title}
          </h3>
          {event.description ? (
            <p className="mt-1 text-muted-foreground text-pretty">
              {event.description}
            </p>
          ) : null}
          {event.location ? (
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden="true" />
              {event.location}
            </p>
          ) : null}
        </motion.li>
      ))}
    </motion.ol>
  );
}

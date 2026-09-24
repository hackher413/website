import { cn } from "@/lib/utils";
import { HEX_CLIP } from "@/lib/design/tokens";
import type { EventKind, ScheduleEvent } from "@/content/schedule";

/** Marker accent per event kind. */
const kindDot: Record<EventKind, string> = {
  ceremony: "bg-honey",
  milestone: "bg-sky",
  workshop: "bg-brand",
  meal: "bg-border",
  activity: "bg-border",
};

/**
 * Vertical timeline of schedule events. Continuous rail on the left with a
 * hex marker per event.
 */
export function Timeline({ events }: { events: ScheduleEvent[] }) {
  return (
    <ol className="relative ml-1.5 border-l border-border">
      {events.map((event, i) => (
        <li
          key={`${event.time}-${i}`}
          className="relative pb-10 pl-8 last:pb-0"
        >
          <span
            className={cn(
              "absolute -left-[6px] top-1.5 size-3",
              kindDot[event.kind],
            )}
            style={{ clipPath: HEX_CLIP }}
            aria-hidden="true"
          />
          <div className="text-sm text-muted-foreground">{event.time}</div>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-balance">
            {event.title}
          </h3>
          {event.description ? (
            <p className="mt-1 text-muted-foreground text-pretty">
              {event.description}
            </p>
          ) : null}
          {event.location ? (
            <p className="mt-2 text-sm text-muted-foreground">{event.location}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

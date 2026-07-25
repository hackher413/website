import type { Metadata } from "next";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Section } from "@/components/layout";
import { PageHeader, Timeline, CtaBand } from "@/components/content";
import { applyNav } from "@/lib/site";
import { schedule, scheduleNote, prizeCategories } from "@/content/schedule";
import { event } from "@/content/event";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The full weekend, hour by hour — ceremonies, workshops, meals, judging, and prizes.",
};

const facts = [
  { icon: CalendarDays, label: event.dates },
  { icon: Clock, label: event.duration },
  { icon: MapPin, label: `${event.venue.name}, ${event.venue.org}` },
];

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Schedule"
        title="The whole weekend, hour by hour."
        lead="24 hours of building, learning, and community. Here's how it flows."
      />

      <Section spacing="sm">
        <dl className="flex flex-col gap-4 sm:flex-row sm:gap-10">
          {facts.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon
                className="size-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <dd className="font-medium">{label}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section spacing="lg">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          {schedule.map((day) => (
            <div key={day.label}>
              <div className="mb-8 flex items-baseline gap-3">
                <h2 className="text-display font-heading">{day.label}</h2>
                <span className="text-lead text-muted-foreground">
                  {day.date}
                </span>
              </div>
              <Timeline events={day.events} />
            </div>
          ))}
        </div>
        <p className="mt-14 text-sm text-muted-foreground">{scheduleNote}</p>
      </Section>

      <Section tone="muted" spacing="lg">
        <h2 className="text-display font-heading">Prizes</h2>
        <p className="mt-4 max-w-2xl text-lead text-muted-foreground text-pretty">
          Winners are crowned at the closing ceremony across these categories,
          plus sponsor challenges.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prizeCategories.map((prize) => (
            <li
              key={prize.title}
              className="rounded-xl border border-border/70 bg-card p-6"
            >
              <h3 className="font-semibold">{prize.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                {prize.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Want to be part of it?"
        description="Join our mailing list to hear the moment 2027 applications open."
        primary={{ label: "Get involved", href: applyNav.href }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}

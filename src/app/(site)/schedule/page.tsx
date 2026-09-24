import type { Metadata } from "next";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Section } from "@/components/layout";
import { PageHeader, Timeline } from "@/components/content";
import { schedule, scheduleNote, prizeCategories } from "@/content/schedule";
import { event } from "@/content/event";
import { primaryCta } from "@/content/apply";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The full weekend, hour by hour - ceremonies, workshops, meals, judging, and prizes.",
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

      <Section spacing="sm" className="pt-4 sm:pt-8">
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
        <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {prizeCategories.map((prize) => (
            <div key={prize.title}>
              <dt className="font-heading text-lg font-semibold">
                {prize.title}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground text-pretty">
                {prize.description}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section spacing="lg">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-lg text-muted-foreground text-pretty">
            Want the 2027 dates first? Join the list - we&apos;ll email you when
            applications open.
          </p>
          <div className="flex flex-wrap gap-3">
            {primaryCta.external ? (
              <Button asChild size="xl" variant="honey">
                <a
                  href={primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {primaryCta.label}
                </a>
              </Button>
            ) : (
              <Button asChild size="xl" variant="honey">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            )}
            <Button asChild size="xl" variant="outline">
              <Link href="/faq">Read the FAQ</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

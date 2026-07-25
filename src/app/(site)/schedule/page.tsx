import type { Metadata } from "next";

import { Section } from "@/components/layout";
import { PageHeader, Timeline, CtaBand } from "@/components/content";
import { applyNav } from "@/lib/site";
import { schedule, scheduleNote } from "@/content/schedule";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The full weekend, hour by hour — ceremonies, workshops, meals, and judging.",
};

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Schedule"
        title="The whole weekend, hour by hour."
        lead="Two days of building, learning, and community. Here's how it flows."
      />

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

      <CtaBand
        title="Ready to join us?"
        description="Applications are open — grab your spot before they close."
        primary={{ label: "Apply now", href: applyNav.href }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}

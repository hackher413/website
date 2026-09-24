import { Section } from "@/components/layout";
import { SectionHeading } from "@/components/content";
import { homeMission } from "@/content/home";

/**
 * Mission teaser - two-column on desktop: heading left, prose right.
 */
export function Mission() {
  return (
    <Section spacing="lg">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <SectionHeading
          eyebrow={homeMission.eyebrow}
          title={homeMission.title}
        />
        <div className="flex flex-col gap-5 text-lg text-muted-foreground text-pretty lg:pt-10">
          {homeMission.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}

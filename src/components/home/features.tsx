import { Section } from "@/components/layout";
import { SectionHeading } from "@/components/content";
import { homeFeatures } from "@/content/home";

/**
 * "Why Hack(H)er413" - editorial list, not icon cards.
 */
export function Features() {
  return (
    <Section tone="muted" spacing="lg">
      <SectionHeading
        align="center"
        eyebrow="Why Hack(H)er413"
        title="A weekend built so you can actually build."
        description="Mentors, workshops, and a room that expects beginners - not just another hackathon flyer."
      />
      <ul className="mx-auto mt-14 max-w-3xl divide-y divide-border/80">
        {homeFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <li
              key={feature.title}
              className="flex gap-5 py-8 first:pt-0 last:pb-0 sm:gap-8"
            >
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center text-honey-foreground">
                <Icon className="size-6" aria-hidden="true" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-heading text-xl font-semibold text-balance sm:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground text-pretty">
                  {feature.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

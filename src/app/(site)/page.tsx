import { Section } from "@/components/layout";
import { Button } from "@/components/ui/button";

/**
 * Temporary homepage — a smoke test for the design system (tokens, type scale,
 * layout primitives, button variants). Replaced by the real homepage in Step 6.
 */
export default function Home() {
  return (
    <>
      <Section spacing="lg">
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          Design system preview
        </p>
        <h1 className="mt-4 text-display-2xl font-heading text-balance">
          Where women and gender minorities build in tech.
        </h1>
        <p className="mt-6 max-w-2xl text-lead text-muted-foreground text-pretty">
          A collegiate hackathon creating an inclusive, empowering space to
          learn, build, and belong.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button size="xl">Apply now</Button>
          <Button size="xl" variant="honey">
            Become a sponsor
          </Button>
          <Button size="xl" variant="sky">
            Meet the team
          </Button>
          <Button size="xl" variant="outline">
            Learn more
          </Button>
        </div>
      </Section>

      <Section tone="muted" spacing="md">
        <h2 className="text-display">Muted band</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Sections compose vertical rhythm and tone. This one uses the warm
          neutral surface.
        </p>
      </Section>

      <Section tone="honey" spacing="md">
        <h2 className="text-display">Honey wash</h2>
      </Section>

      <Section tone="sky" spacing="md">
        <h2 className="text-display">Sky wash</h2>
      </Section>

      <Section tone="brand" spacing="md">
        <h2 className="text-display">Brand band</h2>
        <p className="mt-4 max-w-2xl opacity-80">
          Inverted dark-brown surface for high-emphasis moments.
        </p>
      </Section>
    </>
  );
}

import { Section } from "@/components/layout";
import { HexMark } from "@/components/content/hex-mark";
import { homeFeatures } from "@/content/home";

/**
 * Why attend - sky honeycomb band, numbered hex list (no Lucide icons).
 */
export function Features() {
  return (
    <Section tone="sky" spacing="lg" className="bg-honeycomb-sky">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-16">
        <div>
          <p className="text-sm font-medium text-sky-foreground/70">
            Why this weekend
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Mentors, workshops, and a room that expects beginners.
          </h2>
        </div>

        <ol className="divide-y divide-sky-foreground/15">
          {homeFeatures.map((feature, index) => (
            <li
              key={feature.title}
              className="flex gap-5 py-8 first:pt-0 last:pb-0 sm:gap-7"
            >
              <span className="relative mt-1 flex size-8 shrink-0 items-center justify-center">
                <HexMark size="lg" tone="honey" className="absolute inset-0 size-8" />
                <span className="relative font-mono text-[0.65rem] font-semibold tabular-nums text-honey-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sky-foreground/75 text-pretty">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

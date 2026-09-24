import { applySteps } from "@/content/apply";
import { HexMark } from "@/components/content/hex-mark";

/**
 * Numbered how-it-works steps with hex markers.
 */
export function ApplySteps() {
  return (
    <ol className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
      {applySteps.map((step, index) => (
        <li key={step.title} className="flex flex-col gap-3">
          <span className="relative flex size-8 items-center justify-center">
            <HexMark size="lg" tone="honey" className="absolute inset-0 size-8" />
            <span className="relative font-mono text-[0.65rem] font-semibold tabular-nums text-honey-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
          </span>
          <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
          <p className="text-sky-foreground/75 text-pretty">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

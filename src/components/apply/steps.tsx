import { applySteps } from "@/content/apply";

/**
 * Numbered how-it-works steps — not the same card pattern as homepage features.
 */
export function ApplySteps() {
  return (
    <ol className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
      {applySteps.map((step, index) => (
        <li key={step.title} className="flex flex-col gap-3">
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
          <p className="text-muted-foreground text-pretty">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

import { cn } from "@/lib/utils";

/**
 * A column of paragraphs for story / mission prose.
 */
export function RevealProse({
  paragraphs,
  className,
}: {
  paragraphs: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 text-lg text-muted-foreground text-pretty",
        className,
      )}
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

import { aboutValues } from "@/content/about";
import { HexMark } from "@/components/content/hex-mark";
import { cn } from "@/lib/utils";

/**
 * Values as an editorial grid - hex ticks, no Lucide icons.
 */
export function Values({ tone = "default" }: { tone?: "default" | "onDark" }) {
  const onDark = tone === "onDark";

  return (
    <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-x-14 lg:gap-y-12">
      {aboutValues.map((value) => (
        <li key={value.title} className="flex flex-col gap-3">
          <h3
            className={cn(
              "flex items-center gap-2.5 text-xl font-semibold tracking-tight",
              onDark && "text-cream",
            )}
          >
            <HexMark size="sm" tone={onDark ? "sky" : "honey"} />
            {value.title}
          </h3>
          <p
            className={cn(
              "pl-[1.375rem] text-pretty",
              onDark ? "text-cream/70" : "text-muted-foreground",
            )}
          >
            {value.description}
          </p>
        </li>
      ))}
    </ul>
  );
}

import { cn } from "@/lib/utils";
import { HEX_CLIP } from "@/lib/design/tokens";

type HexMarkProps = {
  className?: string;
  /** Fill color utility class (e.g. bg-honey, bg-sky). */
  tone?: "honey" | "sky" | "cream" | "brand";
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "size-2.5",
  md: "size-3.5",
  lg: "size-5",
} as const;

const toneClass = {
  honey: "bg-honey",
  sky: "bg-sky",
  cream: "bg-cream",
  brand: "bg-brand",
} as const;

/**
 * Honeycomb cell accent - section ticks, list markers, brand punctuation.
 */
export function HexMark({
  className,
  tone = "honey",
  size = "sm",
}: HexMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block shrink-0",
        sizeClass[size],
        toneClass[tone],
        className,
      )}
      style={{ clipPath: HEX_CLIP }}
    />
  );
}

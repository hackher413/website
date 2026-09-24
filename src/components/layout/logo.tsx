import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
  /** Larger wordmark for hero / display contexts. */
  size?: "md" | "lg" | "display";
  /** Light text on espresso / dark surfaces. */
  tone?: "default" | "onDark";
  /** When false, renders a non-linking wordmark (e.g. in the hero). */
  linked?: boolean;
};

const sizeClass = {
  md: "text-lg",
  lg: "text-2xl sm:text-3xl",
  display: "text-4xl sm:text-5xl md:text-6xl",
} as const;

const beeClass = {
  md: "h-7 sm:h-8",
  lg: "h-9 sm:h-10",
  display: "h-12 sm:h-14",
} as const;

/**
 * Brand mark: pixel bee + Hack(H)er413 wordmark.
 * Bee is the year's logo; type adapts for light vs dark surfaces.
 */
export function Logo({
  className,
  href = "/",
  size = "md",
  tone = "default",
  linked = true,
}: LogoProps) {
  const classes = cn(
    "group inline-flex items-center gap-2 font-heading font-semibold tracking-tight rounded-sm",
    sizeClass[size],
    tone === "onDark" ? "text-cream" : "text-foreground",
    linked &&
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className,
  );

  const mark = (
    <>
      <Image
        src="/brand/bee-mark.webp"
        alt=""
        width={80}
        height={64}
        unoptimized
        className={cn(beeClass[size], "w-auto shrink-0")}
        style={{
          imageRendering: "pixelated",
          ...(tone === "onDark"
            ? {
                filter:
                  "drop-shadow(0 0 0.55px rgba(251,246,238,0.9)) drop-shadow(0 0 0.55px rgba(251,246,238,0.9))",
              }
            : {}),
        }}
      />
      <span className="inline-flex items-baseline">
        <span>Hack</span>
        <span
          aria-hidden="true"
          className="mx-0.5 rounded-[0.3em] bg-honey px-1 text-honey-foreground transition-colors duration-300 group-hover:bg-sky group-hover:text-sky-foreground"
        >
          (H)
        </span>
        <span>er</span>
        <span className={tone === "onDark" ? "text-cream" : "text-foreground"}>
          413
        </span>
      </span>
    </>
  );

  if (!linked) {
    return (
      <span className={classes} aria-label="Hack(H)er413">
        {mark}
      </span>
    );
  }

  return (
    <Link href={href} aria-label="Hack(H)er413 home" className={classes}>
      {mark}
    </Link>
  );
}

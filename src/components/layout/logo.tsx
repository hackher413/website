import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Wordmark for Hack(H)er413. The parenthetical "(H)" is the brand's signature
 * detail, so it's emphasized with the honey accent. Purely typographic — scales
 * crisply and needs no image asset.
 */
export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Hack(H)er413 home"
      className={cn(
        "group inline-flex items-baseline font-heading text-lg font-semibold tracking-tight text-foreground rounded-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span>Hack</span>
      <span
        aria-hidden="true"
        className="mx-0.5 rounded-[0.3em] bg-honey px-1 text-honey-foreground transition-colors duration-300 group-hover:bg-sky group-hover:text-sky-foreground"
      >
        (H)
      </span>
      <span>er</span>
      <span className="text-muted-foreground">413</span>
    </Link>
  );
}

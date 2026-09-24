"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { mainNav, siteConfig } from "@/lib/site";
import { primaryCta } from "@/content/apply";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";

const MobileNav = dynamic(
  () =>
    import("@/components/layout/mobile-nav").then((m) => m.MobileNav),
  {
    ssr: false,
    loading: () => (
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open menu"
        disabled
      >
        <span className="size-5" />
      </Button>
    ),
  },
);

function useIsActive() {
  const pathname = usePathname();
  return React.useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname],
  );
}

function NavCta({
  className,
  size,
}: {
  className?: string;
  size?: "default" | "xl";
}) {
  const cta = primaryCta;
  if (cta.external) {
    return (
      <Button asChild size={size} className={className}>
        <a href={cta.href} target="_blank" rel="noopener noreferrer">
          {cta.label}
        </a>
      </Button>
    );
  }
  return (
    <Button asChild size={size} className={className}>
      <Link href={cta.href}>{cta.label}</Link>
    </Button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isActive = useIsActive();
  const [scrolled, setScrolled] = React.useState(false);
  const overHero = pathname === "/" && !scrolled;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background"
          : overHero
            ? // Solid espresso so cream nav text stays ≥4.5:1 over the honeycomb
              "border-b border-white/10 bg-espresso"
            : "border-b border-border bg-background",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo tone={overHero ? "onDark" : "default"} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {mainNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  overHero
                    ? active
                      ? "text-cream"
                      : "text-cream hover:text-white"
                    : active
                      ? "text-foreground"
                      : "text-foreground hover:text-foreground",
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <NavCta
            className={cn(
              "hidden md:inline-flex",
              overHero &&
                "bg-honey text-honey-foreground hover:bg-honey/90",
            )}
          />
          <MobileNav overHero={overHero} />
        </div>
      </Container>
      <span className="sr-only">{siteConfig.name} navigation</span>
    </header>
  );
}

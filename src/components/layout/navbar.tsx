"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav, siteConfig } from "@/lib/site";
import { primaryCta } from "@/content/apply";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";

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
  const [open, setOpen] = React.useState(false);
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
          ? "border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
          : overHero
            ? "border-b border-white/10 bg-espresso/70 backdrop-blur-md supports-[backdrop-filter]:bg-espresso/55"
            : "border-b border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85",
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
                      : "text-cream/80 hover:text-cream"
                    : active
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground",
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

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "md:hidden",
                  overHero &&
                    "text-cream hover:bg-white/10 hover:text-cream",
                )}
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Mobile"
                className="mt-2 flex flex-col gap-1 px-4"
              >
                {mainNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  );
                })}
                <SheetClose asChild>
                  <span className="mt-4 block">
                    <NavCta size="xl" className="w-full" />
                  </span>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
      <span className="sr-only">{siteConfig.name} navigation</span>
    </header>
  );
}

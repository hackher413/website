"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/site";
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
import { Logo } from "@/components/layout/logo";

function NavCta({ className }: { className?: string }) {
  const cta = primaryCta;
  if (cta.external) {
    return (
      <Button asChild size="xl" className={className}>
        <a href={cta.href} target="_blank" rel="noopener noreferrer">
          {cta.label}
        </a>
      </Button>
    );
  }
  return (
    <Button asChild size="xl" className={className}>
      <Link href={cta.href}>{cta.label}</Link>
    </Button>
  );
}

/**
 * Mobile drawer - isolated so Radix Sheet stays out of the initial bundle
 * until the menu button is pressed (or this chunk is prefetched).
 */
export function MobileNav({ overHero }: { overHero: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "md:hidden",
            overHero && "text-cream hover:bg-white/10 hover:text-cream",
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
        <nav aria-label="Mobile" className="mt-2 flex flex-col gap-1 px-4">
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
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
              <NavCta className="w-full" />
            </span>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

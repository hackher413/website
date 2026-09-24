import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { HexMark } from "@/components/content/hex-mark";
import { HoneycombCanvasDeferred } from "@/components/honeycomb/honeycomb-canvas-deferred";
import { event } from "@/content/event";
import { primaryCta } from "@/content/apply";

/**
 * Signature hero: immersive honeycomb as the visual plane.
 * Brand lockup is the hero signal; one line of support + one CTA.
 * Asymmetric bottom-left — not a centered marketing stack.
 *
 * Server Component shell so the LCP lockup is in the initial HTML.
 * Native <picture> + fetchPriority=high (Next/Image was dropping the hint
 * with unoptimized). Canvas mounts after idle so it doesn't compete.
 */
export function HoneycombHero() {
  const primary = primaryCta;

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full items-end overflow-hidden bg-espresso text-cream">
      {/* LCP preload — fetchpriority on the preload, not only the img */}
      <link
        rel="preload"
        as="image"
        href="/brand/logo-on-dark-sm.webp"
        type="image/webp"
        fetchPriority="high"
        media="(max-width: 639px)"
      />
      <link
        rel="preload"
        as="image"
        href="/brand/logo-on-dark.webp"
        type="image/webp"
        fetchPriority="high"
        media="(min-width: 640px)"
      />

      <HoneycombCanvasDeferred className="absolute inset-0" />

      {/* Read plane on the left/bottom; right third stays open so the comb reads */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(27,18,16,0.82) 0%, rgba(27,18,16,0.42) 34%, rgba(27,18,16,0.1) 58%, transparent 78%), linear-gradient(to top, rgba(27,18,16,0.55) 0%, transparent 42%)",
        }}
      />

      <Container className="pointer-events-none relative z-10 w-full pb-14 pt-28 sm:pb-20 sm:pt-32">
        <div className="flex max-w-lg flex-col items-start text-left">
          <h1 className="sr-only">Hack(H)er413</h1>
          <picture>
            <source
              type="image/webp"
              media="(max-width: 639px)"
              srcSet="/brand/logo-on-dark-sm.webp"
            />
            <source type="image/webp" srcSet="/brand/logo-on-dark.webp" />
            <source
              media="(max-width: 639px)"
              srcSet="/brand/logo-on-dark-sm.png"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- LCP lockup needs fetchPriority + pixelated; next/image dropped the hint when unoptimized */}
            <img
              src="/brand/logo-on-dark.png"
              alt=""
              width={493}
              height={314}
              fetchPriority="high"
              decoding="async"
              className="h-32 w-auto sm:h-40 md:h-48"
              style={{ imageRendering: "pixelated" }}
            />          </picture>

          <p className="mt-6 max-w-sm text-base text-cream/80 text-pretty sm:mt-8 sm:text-lg">
            {event.isConcluded
              ? event.concludedMessage
              : "UMass Amherst · women & gender minorities in tech · beginners welcome"}
          </p>

          <div className="pointer-events-auto mt-8 animate-hero-cta sm:mt-10">
            <Button asChild size="xl" variant="honey">
              {primary.external ? (
                <a href={primary.href} target="_blank" rel="noopener noreferrer">
                  {primary.label}
                </a>
              ) : (
                <Link href={primary.href}>{primary.label}</Link>
              )}
            </Button>
          </div>
        </div>
      </Container>

      {/* Desktop / fine-pointer only — permission, not a sticker */}
      <p className="pointer-events-none absolute bottom-5 right-5 z-10 hidden items-center gap-2 text-sm text-cream/45 motion-reduce:hidden [@media(hover:hover)_and_(pointer:fine)]:flex sm:bottom-8 sm:right-8">
        <HexMark size="sm" tone="honey" className="opacity-70" />
        Move to light the comb
      </p>
    </section>
  );
}

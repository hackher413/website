import { CtaBand } from "@/components/content";
import { HoneycombHero } from "@/components/honeycomb/honeycomb-hero";
import { Mission } from "@/components/home/mission";
import { Features } from "@/components/home/features";
import { homeCta } from "@/content/home";
import { primaryCta } from "@/content/apply";

/**
 * Homepage - honeycomb hero, mission, why attend, closing CTA.
 * CTAs follow `primaryCta` so open/closed event state stays consistent.
 * Hero copy SSRs; only the canvas is client-deferred.
 */
export default function Home() {
  return (
    <>
      <HoneycombHero />
      <Mission />
      <Features />
      <CtaBand
        title={homeCta.title}
        description={homeCta.description}
        primary={primaryCta}
      />
    </>
  );
}

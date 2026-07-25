import { HoneycombHero } from "@/components/honeycomb";
import { StatsBand } from "@/components/home/stats-band";
import { Mission } from "@/components/home/mission";
import { Features } from "@/components/home/features";
import { CtaBand } from "@/components/content";
import { applyNav } from "@/lib/site";
import { homeCta } from "@/content/home";

/**
 * Homepage — the signature honeycomb hero followed by a marketing narrative:
 * stats → mission → why attend → closing CTA. `page.tsx` stays a Server
 * Component; only the interactive pieces (hero canvas, scroll reveals) ship JS.
 */
export default function Home() {
  return (
    <>
      <HoneycombHero />
      <StatsBand />
      <Mission />
      <Features />
      <CtaBand
        title={homeCta.title}
        description={homeCta.description}
        primary={{ label: "Apply now", href: applyNav.href }}
        secondary={{ label: "Meet the team", href: "/team" }}
      />
    </>
  );
}

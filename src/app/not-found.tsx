import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout";
import { HexMark } from "@/components/content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * Root 404. Lives at the app root (not inside the (site) group) so it renders
 * without the marketing chrome would-be mismatch - but we still give it the
 * brand voice and a clear way home.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-espresso text-cream">
      <Container>
        <div className="flex max-w-lg flex-col items-start">
          <p className="flex items-center gap-2 font-mono text-sm text-cream/50">
            <HexMark size="sm" tone="honey" />
            404
          </p>
          <h1 className="mt-4 text-display-xl text-balance">Page not found.</h1>
          <p className="mt-4 text-lead text-cream/70 text-pretty">
            That URL doesn&rsquo;t exist. Let&rsquo;s get you back somewhere
            familiar.
          </p>
          <div className="mt-8">
            <Button asChild size="xl" variant="honey">
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}

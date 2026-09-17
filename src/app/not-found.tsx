import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * Root 404. Lives at the app root (not inside the (site) group) so it renders
 * without the marketing chrome would-be mismatch — but we still give it the
 * brand voice and a clear way home.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center">
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <p className="text-sm text-muted-foreground">404</p>
          <h1 className="mt-4 text-display-xl font-heading text-balance">
            Page not found.
          </h1>
          <p className="mt-4 text-lead text-muted-foreground text-pretty">
            That URL doesn&rsquo;t exist. Let&rsquo;s get you back somewhere
            familiar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="xl" variant="honey">
              <Link href="/">Back home</Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/faq">Read the FAQ</Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}

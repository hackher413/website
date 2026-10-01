import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        403
      </p>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Organizers only
      </h1>
      <p className="max-w-md text-muted-foreground">
        You need an organizer role to view this page. If you think this is a
        mistake, ask a teammate to set{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
          publicMetadata.role
        </code>{" "}
        to <code className="rounded bg-muted px-1.5 py-0.5 text-sm">organizer</code>{" "}
        in Clerk.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Back home</Link>
      </Button>
    </main>
  );
}

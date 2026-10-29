import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { fetchAppsList } from "@/app/(site)/organizer/apps/actions";

export const metadata: Metadata = {
  title: "Applications",
  description: "Organizer application queue.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

/** Authorization lives in `fetchAppsList` (same pattern as the detail loader). */
export default async function OrganizerAppsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = (typeof params.q === "string" ? params.q : "").trim();
  const appLst = await fetchAppsList(query);

  return (
    <>
      <PageHeader
        title="Applications"
        lead="Find an applicant by name or email and open their application to review their answers."
      />

      <Section spacing="md" className="pt-4 sm:pt-8">
        <form action="/organizer/apps" method="get" className="mb-6 flex flex-col gap-3">
          <Label htmlFor="application-search">Search by name or email</Label>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              id="application-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Name or email"
              className="h-10 w-full sm:max-w-md"
            />
            <Button type="submit">Search</Button>
            {query ? (
              <Button asChild variant="outline">
                <Link href="/organizer/apps">Clear search</Link>
              </Button>
            ) : null}
          </div>
        </form>
        <p className="mb-4 text-sm text-muted-foreground">
          {appLst.length} application{appLst.length === 1 ? "" : "s"}
          {query ? ` matching “${query}”` : ""}
        </p>
        {appLst.length === 0 ? (
          <p className="border-y border-border py-8 text-muted-foreground">
            {query
              ? "No applications match your search. Try a different name or email."
              : "No applications yet."}
          </p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {appLst.map((app) => (
              <li key={app.id}>
                <Link
                  href={`/organizer/apps/${app.id}`}
                  className="flex flex-col gap-1 py-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <div>
                    <p className="font-medium text-foreground">{[app.firstName, app.lastName].filter(Boolean).join(" ") || app.email}</p>
                    <p className="text-sm text-muted-foreground">{app.email}</p>
                  </div>
                  <p className="text-sm capitalize text-muted-foreground">
                    {app.status}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}

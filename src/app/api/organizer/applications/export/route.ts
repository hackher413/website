import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { getCurrentRole, isOrganizerRole } from "@/lib/auth";
import { buildApplicationsCsv } from "@/lib/applications/applications-csv";
import { listApplications } from "@/lib/applications/list-applications";

export const runtime = "nodejs";

/** `hackher413-applications-2026-10-29.csv`, dated in the event's timezone. */
function exportFilename(now: Date): string {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return `hackher413-applications-${date}.csv`;
}

/**
 * Organizer CSV export of applications, honoring the same `q` search as the
 * list page. Route Handlers do not get `requireOrganizer()`'s redirect/403
 * pages, so the checks return JSON statuses instead.
 */
export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = await getCurrentRole();
  if (!isOrganizerRole(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const query = (request.nextUrl.searchParams.get("q") ?? "").trim();
  const apps = await listApplications(query);
  const csv = buildApplicationsCsv(apps, { origin: request.nextUrl.origin });

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${exportFilename(new Date())}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

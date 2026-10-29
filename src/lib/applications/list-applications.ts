import { and, desc, eq, ilike, inArray, or, type SQL } from "drizzle-orm";

import { db } from "@/db";
import { applications } from "@/db/schema";
import {
  DEFAULT_REVIEW_TAB,
  parseReviewTabStatus,
  type ReviewTabStatus,
} from "@/lib/applications/review-status";

function searchFilters(query: string): SQL[] {
  const terms = query.trim().split(/\s+/).filter(Boolean);
  return terms.map((term) => {
    // Treat LIKE wildcards as literal characters in names and email addresses.
    const pattern = `%${term.replace(/[\\%_]/g, "\\$&")}%`;
    return or(
      ilike(applications.firstName, pattern),
      ilike(applications.lastName, pattern),
      ilike(applications.email, pattern),
    )!;
  });
}

function statusFilter(status: ReviewTabStatus): SQL {
  // Flagged queue = still needs a decision (exclude already accepted/denied).
  if (status === "flagged") {
    return and(
      eq(applications.flagged, true),
      eq(applications.status, "submitted"),
    )!;
  }
  // Legacy waitlisted rows surface under Not accepted.
  if (status === "denied") {
    return inArray(applications.status, ["denied", "waitlisted"]);
  }
  return eq(applications.status, status);
}

/**
 * Name/email (+ optional review-tab status) search over applications, newest
 * first. Shared by CSV export. Does not authorize; callers must check the role.
 */
export async function listApplications(
  query = "",
  status: ReviewTabStatus = DEFAULT_REVIEW_TAB,
) {
  const filters = searchFilters(query);
  return db
    .select()
    .from(applications)
    .where(and(statusFilter(status), ...filters))
    .orderBy(desc(applications.createdAt), applications.id);
}

/** Parse export/list search params the same way as the organizer apps page. */
export function listApplicationsFromSearchParams(params: URLSearchParams) {
  const query = (params.get("q") ?? "").trim();
  const status = parseReviewTabStatus(params.get("status") ?? undefined);
  return listApplications(query, status);
}

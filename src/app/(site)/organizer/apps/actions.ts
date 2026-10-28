"use server";

import { db } from "@/db";
import { applications } from "@/db/schema";
import { requireOrganizer } from "@/lib/auth";
import { and, desc, ilike, or } from "drizzle-orm";

/**
 * Organizer list read. Status update / Accept-Deny actions must also call
 * `requireOrganizer()` and enforce transition rules (task 31/37) — do not
 * add applicant-callable writes here.
 */
export async function fetchAppsList(query = "") {
  await requireOrganizer();
  const terms = query.trim().split(/\s+/).filter(Boolean);
  const filters = terms.map((term) => {
    // Treat LIKE wildcards as literal characters in names and email addresses.
    const pattern = `%${term.replace(/[\\%_]/g, "\\$&")}%`;
    return or(
      ilike(applications.firstName, pattern),
      ilike(applications.lastName, pattern),
      ilike(applications.email, pattern),
    );
  });

  return db.select().from(applications)
    .where(and(...filters))
    .orderBy(desc(applications.createdAt), applications.id);
}

import { db } from "@/db";
import { applications } from "@/db/schema";
import { and, desc, ilike, or } from "drizzle-orm";

/**
 * Name/email search over applications, newest first. Shared by the organizer
 * list and CSV export. Does not authorize; callers must check the role first.
 */
export async function listApplications(query = "") {
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

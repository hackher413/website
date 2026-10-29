"use server";

import { listApplications } from "@/lib/applications/list-applications";
import { requireOrganizer } from "@/lib/auth";

/**
 * Organizer list read. Status update / Accept-Deny actions must also call
 * `requireOrganizer()` and enforce transition rules (task 31/37) — do not
 * add applicant-callable writes here.
 */
export async function fetchAppsList(query = "") {
  await requireOrganizer();
  return listApplications(query);
}

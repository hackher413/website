import { auth, currentUser } from "@clerk/nextjs/server";
import { forbidden } from "next/navigation";

/** Roles stored on Clerk `publicMetadata.role` (see .env.example). */
export type AppRole = "attendee" | "organizer" | "admin";

export function isOrganizerRole(role: unknown): role is "organizer" | "admin" {
  return role === "organizer" || role === "admin";
}

function readRole(metadata: unknown): AppRole | undefined {
  if (!metadata || typeof metadata !== "object") return undefined;
  const role = (metadata as { role?: unknown }).role;
  if (role === "attendee" || role === "organizer" || role === "admin") {
    return role;
  }
  return undefined;
}

/**
 * Require a signed-in Clerk user. Redirects to sign-in when anonymous.
 * Use in Server Components, Server Actions, and Route Handlers.
 */
export async function requireUser() {
  const { userId } = await auth.protect();
  return { userId };
}

/**
 * Require a signed-in organizer or admin. Anonymous users go to sign-in;
 * signed-in non-organizers get a 403 (`forbidden()`).
 */
export async function requireOrganizer() {
  const { userId } = await requireUser();
  const user = await currentUser();
  const role = readRole(user?.publicMetadata);

  if (!isOrganizerRole(role)) {
    forbidden();
  }

  return { userId, role };
}

/** Soft role lookup for UI (never throws). */
export async function getCurrentRole(): Promise<AppRole | undefined> {
  const user = await currentUser();
  return readRole(user?.publicMetadata);
}

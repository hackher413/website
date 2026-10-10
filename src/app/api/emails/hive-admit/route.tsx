import { renderHiveAdmitTicket } from "@/lib/emails/hive-admit";

export const runtime = "nodejs";

/**
 * Personalized Hive Admit ticket PNG for acceptance emails / local preview.
 *
 *   /api/emails/hive-admit?firstName=Alex&lastName=Bee
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const firstName = searchParams.get("firstName")?.trim() || "Hacker";
  const lastName = searchParams.get("lastName")?.trim() || undefined;
  const role = searchParams.get("role")?.trim() || undefined;

  return renderHiveAdmitTicket({ firstName, lastName, role });
}

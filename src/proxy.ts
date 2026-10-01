import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Next.js 16+ uses `proxy.ts` (middleware.ts is deprecated).
 * Route protection lives in `requireUser` / `requireOrganizer`, not here.
 * This only wires Clerk session handling for the app.
 */
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files unless in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

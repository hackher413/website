/**
 * Feature flags for gradual rollout.
 *
 * `NEXT_PUBLIC_VERCEL_ENV` is set by Vercel at build time
 * (`production` | `preview` | `development`). Unset on plain localhost.
 */

/** Sign-in / account UI — localhost + Preview only until applications launch. */
export const authUiEnabled =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

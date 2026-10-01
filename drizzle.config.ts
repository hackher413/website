import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Kit runs outside Next.js - load local env files explicitly.
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

/**
 * Prefer the direct (unpooled) Neon URL for migrations when available.
 * The app runtime should keep using the pooled `DATABASE_URL`.
 */
const migrationUrl =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!migrationUrl) {
  throw new Error(
    "DATABASE_URL (or DATABASE_URL_UNPOOLED) is required for drizzle-kit.",
  );
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: migrationUrl,
  },
});

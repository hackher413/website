import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

/**
 * Server-only Drizzle client (Neon HTTP). Next injects env for the app;
 * do not import this module from Client Components.
 */
function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and add the Neon pooled connection string.",
    );
  }

  return drizzle(neon(url), { schema });
}

export const db = createDb();
export type Db = typeof db;

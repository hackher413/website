import {
  boolean,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Application lifecycle. `draft` / `submitted` are applicant-facing;
 * decision statuses are set by organizers later.
 */
export const applicationStatusEnum = pgEnum("application_status", [
  "draft",
  "submitted",
  "accepted",
  "denied",
  "waitlisted",
]);

export type ApplicationStatus =
  (typeof applicationStatusEnum.enumValues)[number];

/**
 * Year-specific answers that are not worth promoting to columns.
 * Field keys should match the application-form config SSOT (task 14/16).
 */
export type ApplicationCustomFields = Record<string, unknown>;

/**
 * One row per Clerk user. Core columns are stable across years;
 * everything else lives in `customFields` JSON.
 */
export const applications = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkUserId: text("clerk_user_id").notNull().unique(),
    email: text("email").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    status: applicationStatusEnum("status").notNull().default("draft"),
    customFields: jsonb("custom_fields")
      .$type<ApplicationCustomFields>()
      .notNull()
      .default({}),
    /** Optional until resume upload vs URL is decided (tracker task 29). */
    resumeUrl: text("resume_url"),
    flagged: boolean("flagged").notNull().default(false),
    submittedAt: timestamp("submitted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("applications_status_idx").on(table.status),
    index("applications_email_idx").on(table.email),
  ],
);

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;

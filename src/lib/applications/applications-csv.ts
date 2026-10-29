import {
  applicationFormFields,
  type ApplicationField,
} from "@/content/application-form";
import type { Application } from "@/db/schema";
import {
  applicationFieldLabel,
  safeApplicationLink,
} from "@/lib/applications/display";
import { customKeyFor } from "@/lib/applications/map-form-to-db";
import { resumeViewHref } from "@/lib/applications/resume-url";

// Spreadsheet apps evaluate cells that start with these after optional
// whitespace or a tab/CR, so they get a leading apostrophe to stay text.
const FORMULA_TRIGGER = /^[\t\r ]*[=+\-@]/;
const NEEDS_QUOTES = /[",\r\n]/;

/** Excel reads UTF-8 CSVs correctly (accented names) only with a BOM. */
const UTF8_BOM = "﻿";

type Column = { header: string; cell: (app: Application) => string };

/** RFC 4180 cell: quote when needed, escape quotes, neutralize formulas. */
export function escapeCsvCell(value: string): string {
  const safe = FORMULA_TRIGGER.test(value) ? `'${value}` : value;
  return NEEDS_QUOTES.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export function toCsv(headers: string[], rows: string[][]): string {
  return [headers, ...rows]
    .map((cells) => cells.map(escapeCsvCell).join(","))
    .join("\r\n") + "\r\n";
}

/**
 * Cell text for stored answers. Missing values are empty (not "Not provided")
 * so spreadsheets can filter and count them; option IDs become their labels.
 */
function plainValue(value: unknown, field?: ApplicationField): string {
  if (value == null) return "";
  if (typeof value === "string") {
    const text = value.trim();
    return field?.options?.find((option) => option.value === text)?.label ?? text;
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) {
    return value.map((item) => plainValue(item, field)).filter(Boolean).join(", ");
  }
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function isoDate(value: Date | null): string {
  return value ? value.toISOString() : "";
}

/** Absolute link so the resume opens from a spreadsheet, via the auth proxy for private blobs. */
function resumeCell(resumeUrl: string | null, origin: string): string {
  const href = safeApplicationLink(resumeUrl);
  return href ? new URL(resumeViewHref(href), origin).href : "";
}

const customFieldKeys = new Set(
  applicationFormFields
    .filter((field) => field.storage === "customFields")
    .map(customKeyFor),
);

const systemColumns: Column[] = [
  { header: "Application ID", cell: (app) => app.id },
  { header: "Clerk user ID", cell: (app) => app.clerkUserId },
  { header: "Email", cell: (app) => app.email },
  { header: "Status", cell: (app) => app.status },
  { header: "Flagged", cell: (app) => plainValue(app.flagged) },
  { header: "Created", cell: (app) => isoDate(app.createdAt) },
  { header: "Submitted", cell: (app) => isoDate(app.submittedAt) },
  { header: "Last updated", cell: (app) => isoDate(app.updatedAt) },
];

function formColumns(origin: string): Column[] {
  return applicationFormFields.map((field) => ({
    header: field.label,
    cell: (app) => {
      if (field.storage === "core") {
        if (field.id === "resumeUrl") return resumeCell(app.resumeUrl, origin);
        return plainValue(field.id === "firstName" ? app.firstName : app.lastName);
      }
      const answers: Record<string, unknown> = app.customFields ?? {};
      return plainValue(answers[customKeyFor(field)], field);
    },
  }));
}

/**
 * Answers stored in JSON but no longer on the form (legacy keys). Exported as
 * trailing columns so historical data is not silently dropped.
 */
function legacyColumns(apps: Application[]): Column[] {
  const keys = new Set(apps.flatMap((app) => Object.keys(app.customFields ?? {})));
  return [...keys]
    .filter((key) => !customFieldKeys.has(key))
    .sort()
    .map((key) => ({
      header: applicationFieldLabel(key),
      cell: (app) => {
        const answers: Record<string, unknown> = app.customFields ?? {};
        return plainValue(answers[key]);
      },
    }));
}

/** Applications as CSV with a header row. `origin` makes resume links absolute. */
export function buildApplicationsCsv(
  apps: Application[],
  { origin }: { origin: string },
): string {
  const columns = [...systemColumns, ...formColumns(origin), ...legacyColumns(apps)];
  return UTF8_BOM + toCsv(
    columns.map((column) => column.header),
    apps.map((app) => columns.map((column) => column.cell(app))),
  );
}

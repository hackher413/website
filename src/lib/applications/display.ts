import type { ApplicationField } from "@/content/application-form";

/** Keep false/zero distinct from unanswered fields, including historical JSON. */
export function formatApplicationValue(
  value: unknown,
  field?: ApplicationField,
): string {
  if (value == null || (typeof value === "string" && !value.trim())) {
    return "Not provided";
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) {
    return value.length
      ? value.map((item) => formatApplicationValue(item, field)).join(", ")
      : "Not provided";
  }
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  const text = String(value);
  return field?.options?.find((option) => option.value === text)?.label ?? text;
}

export function applicationFieldLabel(key: string): string {
  const label = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function safeApplicationLink(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function formatApplicationTimestamp(value: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(value) + " (America/New_York)";
}

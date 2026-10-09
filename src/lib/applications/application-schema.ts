import { z } from "zod";

import {
  applicationFormFields,
  type ApplicationField,
} from "@/content/application-form";

export type ApplicationFormValue = string | string[] | boolean;

export type ApplicationFormValues = Record<
  string,
  ApplicationFormValue | undefined
>;

function requiredMessage(label: string) {
  return `${label} is required.`;
}

function requiredString(label: string) {
  return z.string().trim().min(1, requiredMessage(label));
}

/**
 * Builds the validation rule for one config field. `optional` overrides the
 * field's own `required` flag (used for conditional fields that are only
 * required while visible).
 */
export function buildFieldSchema(
  field: ApplicationField,
  options: { optional?: boolean } = {},
): z.ZodTypeAny {
  const optional = options.optional ?? !field.required;
  const label = field.label;

  switch (field.type) {
    case "text":
    case "textarea":
      return optional ? z.string().optional() : requiredString(label);

    case "tel": {
      const base = z
        .string()
        .trim()
        .regex(
          /^[+()\-.\s\d]{7,}$/,
          `${label} does not look like a valid phone number.`,
        );
      return optional ? z.union([base, z.literal("")]).optional() : base;
    }

    case "url": {
      const base = z.string().trim().url(`Enter a valid URL for ${label}.`);
      return optional ? z.union([base, z.literal("")]).optional() : base;
    }

    case "select": {
      if (optional) return z.string().optional();
      const values = (field.options ?? []).map((option) => option.value);
      return z.string().superRefine((value, ctx) => {
        if (value.trim().length === 0) {
          ctx.addIssue({ code: "custom", message: requiredMessage(label) });
        } else if (!values.includes(value)) {
          ctx.addIssue({
            code: "custom",
            message: `Choose a valid option for ${label}.`,
          });
        }
      });
    }

    case "multiselect": {
      const base = z.array(z.string());
      return optional
        ? base.optional()
        : base.min(1, `Select at least one option for ${label}.`);
    }

    case "toggle":
      return optional
        ? z.boolean().optional()
        : z.boolean().refine((value) => value === true, requiredMessage(label));

    case "checkbox":
      return optional
        ? z.boolean().optional()
        : z.boolean().refine(
            (value) => value === true,
            "This agreement is required.",
          );

    default:
      return z.string().optional();
  }
}

const shape: Record<string, z.ZodTypeAny> = {};

for (const field of applicationFormFields) {
  const conditionalRequired = Boolean(field.showWhen) && field.required;
  shape[field.id] = buildFieldSchema(field, {
    optional: !field.required || conditionalRequired,
  });
}

export const applicationSchema = z.object(shape).superRefine((values, ctx) => {
  for (const field of applicationFormFields) {
    if (!field.showWhen || !field.required) continue;
    if (values[field.showWhen.fieldId] !== field.showWhen.equals) continue;

    const result = buildFieldSchema(field, { optional: false }).safeParse(
      values[field.id],
    );
    if (!result.success) {
      ctx.addIssue({
        code: "custom",
        path: [field.id],
        message:
          result.error.issues[0]?.message ?? requiredMessage(field.label),
      });
    }
  }
});

export const defaultApplicationValues: ApplicationFormValues =
  Object.fromEntries(
    applicationFormFields.map((field) => {
      if (field.type === "multiselect") return [field.id, [] as string[]];
      if (field.type === "toggle" || field.type === "checkbox") {
        return [field.id, false];
      }
      return [field.id, ""];
    }),
  );

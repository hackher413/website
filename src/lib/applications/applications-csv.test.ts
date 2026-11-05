import { describe, expect, it } from "vitest";
import type { Application } from "@/db/schema";
import { applicationFixture, fullAnswers } from "@/test/application-fixture";
import { buildApplicationsCsv, escapeCsvCell, toCsv } from "./applications-csv";

const origin = "https://hackher413.test";

/** Minimal RFC 4180 parser for asserting round-trips (handles quoted cells). */
function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (quoted) {
      if (char === '"' && csv[i + 1] === '"') { cell += '"'; i++; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(cell); cell = ""; }
    else if (char === "\r" && csv[i + 1] === "\n") {
      row.push(cell); rows.push(row); row = []; cell = ""; i++;
    } else cell += char;
  }
  expect(cell).toBe("");
  expect(row).toEqual([]);
  return rows;
}

function columnsOf(csv: string) {
  const [headers, ...rows] = parseCsv(csv.replace(/^﻿/, ""));
  return (header: string) => {
    const index = headers.indexOf(header);
    expect(index, header).toBeGreaterThanOrEqual(0);
    return rows.map((row) => row[index]);
  };
}

describe("escapeCsvCell", () => {
  it.each([
    ["plain text", "Priya Chen", "Priya Chen"],
    ["comma", "Chen, Priya", '"Chen, Priya"'],
    ["double quote", 'say "hi"', '"say ""hi"""'],
    ["line feed", "line1\nline2", '"line1\nline2"'],
    ["carriage return", "a\rb", '"a\rb"'],
    ["empty", "", ""],
  ])("quotes only when required: %s", (_name, value, expected) => {
    expect(escapeCsvCell(value)).toBe(expected);
  });

  it.each([
    ['=HYPERLINK("http://x")', `"'=HYPERLINK(""http://x"")"`],
    ["+1 (413) 555-0123", "'+1 (413) 555-0123"],
    ["-2+3", "'-2+3"],
    ["@SUM(A1)", "'@SUM(A1)"],
    ["\t=cmd", "'\t=cmd"],
    ["\r=cmd", '"\'\r=cmd"'],
    ["  =1+1", "'  =1+1"],
  ])("neutralizes formula trigger %j", (value, expected) => {
    expect(escapeCsvCell(value)).toBe(expected);
  });

  it("neutralizes formulas and still quotes the result when it contains commas", () => {
    expect(escapeCsvCell("=1,2")).toBe("\"'=1,2\"");
  });

  it("does not treat mid-string operators as formulas", () => {
    expect(escapeCsvCell("Ada-Lovelace")).toBe("Ada-Lovelace");
    expect(escapeCsvCell("a=b")).toBe("a=b");
  });
});

describe("toCsv", () => {
  it("uses CRLF line endings and a trailing newline", () => {
    expect(toCsv(["a", "b"], [["1", "2"], ["3", "4"]])).toBe("a,b\r\n1,2\r\n3,4\r\n");
  });

  it("writes a header row even with no records", () => {
    expect(toCsv(["a", "b"], [])).toBe("a,b\r\n");
  });
});

describe("buildApplicationsCsv", () => {
  it("starts with a UTF-8 BOM so spreadsheet apps read accented names correctly", () => {
    expect(buildApplicationsCsv([applicationFixture()], { origin }).startsWith("﻿")).toBe(true);
  });

  it("has unique, human-readable headers", () => {
    const [headers] = parseCsv(buildApplicationsCsv([], { origin }).replace(/^﻿/, ""));
    expect(new Set(headers).size).toBe(headers.length);
    expect(headers).toEqual(expect.arrayContaining([
      "Application ID", "Clerk user ID", "Email", "Status", "Flagged", "Created",
      "Submitted", "Last updated", "First name", "Last name", "Resume", "Phone",
      "School", "Food allergies / dietary restrictions",
    ]));
  });

  it("writes header-only output for an empty result", () => {
    const csv = buildApplicationsCsv([], { origin });
    expect(parseCsv(csv.replace(/^﻿/, ""))).toHaveLength(1);
    expect(csv.endsWith("\r\n")).toBe(true);
  });

  it("exports one row per application with resolved option labels and Yes/No answers", () => {
    const column = columnsOf(buildApplicationsCsv([applicationFixture()], { origin }));
    expect(column("First name")).toEqual(["Priya"]);
    expect(column("Email")).toEqual(["priya.chen@example.edu"]);
    expect(column("Status")).toEqual(["submitted"]);
    expect(column("Flagged")).toEqual(["Yes"]);
    expect(column("Created")).toEqual(["2026-10-20T12:00:00.000Z"]);
    expect(column("School")).toEqual(["University of Massachusetts Amherst"]);
    expect(column("Food allergies / dietary restrictions")).toEqual(["Vegan, Gluten-free, Nut allergy"]);
    expect(column("Interested in hosting a workshop or talk?")).toEqual(["Yes"]);
  });

  it("keeps multi-line applicant text intact inside one cell", () => {
    const [, row] = parseCsv(buildApplicationsCsv([applicationFixture()], { origin }).replace(/^﻿/, ""));
    const [headers] = parseCsv(buildApplicationsCsv([applicationFixture()], { origin }).replace(/^﻿/, ""));
    expect(row).toHaveLength(headers.length);
    expect(row[headers.indexOf("Dietary notes")]).toBe(fullAnswers.dietaryNotes);
  });

  it("leaves missing and blank answers as empty cells, not placeholder text", () => {
    const app = applicationFixture({
      submittedAt: null, resumeUrl: null, customFields: { phone: "   ", dietaryRestrictions: [] },
    });
    const csv = buildApplicationsCsv([app], { origin });
    const column = columnsOf(csv);
    expect(column("Submitted")).toEqual([""]);
    expect(column("Resume")).toEqual([""]);
    expect(column("Phone")).toEqual([""]);
    expect(column("Food allergies / dietary restrictions")).toEqual([""]);
    expect(column("Age")).toEqual([""]);
    expect(csv).not.toContain("Not provided");
  });

  it("handles null customFields from legacy rows without throwing", () => {
    const app = applicationFixture({ customFields: null as unknown as Application["customFields"] });
    expect(columnsOf(buildApplicationsCsv([app], { origin }))("School")).toEqual([""]);
  });

  it("neutralizes applicant-controlled formulas in every exported field", () => {
    const app = applicationFixture({
      firstName: "=cmd|' /C calc'!A0", lastName: "+SUM(1,1)",
      customFields: { dietaryNotes: "@HYPERLINK(\"http://evil\")", phone: "-5" },
    });
    const csv = buildApplicationsCsv([app], { origin });
    const column = columnsOf(csv);
    expect(column("First name")).toEqual(["'=cmd|' /C calc'!A0"]);
    expect(column("Last name")).toEqual(["'+SUM(1,1)"]);
    expect(column("Dietary notes")).toEqual(["'@HYPERLINK(\"http://evil\")"]);
    expect(column("Phone")).toEqual(["'-5"]);
  });

  it("escapes commas, quotes and newlines so every row keeps its column count", () => {
    const app = applicationFixture({
      lastName: 'Chen, "Jr."', customFields: { ...fullAnswers, dietaryNotes: 'line1\nline2, "quoted"' },
    });
    const csv = buildApplicationsCsv([app], { origin });
    const [headers, row] = parseCsv(csv.replace(/^﻿/, ""));
    expect(row).toHaveLength(headers.length);
    expect(row[headers.indexOf("Last name")]).toBe('Chen, "Jr."');
    expect(row[headers.indexOf("Dietary notes")]).toBe('line1\nline2, "quoted"');
  });

  it("exports the resume as an absolute link through the auth proxy for private blobs", () => {
    const column = columnsOf(buildApplicationsCsv([applicationFixture()], { origin }));
    expect(column("Resume")).toEqual([
      `${origin}/api/resume/file?url=${encodeURIComponent("https://resumes.private.blob.vercel-storage.com/priya.pdf")}`,
    ]);
  });

  it("exports external resume links directly and drops non-web schemes", () => {
    const external = columnsOf(buildApplicationsCsv([applicationFixture({
      resumeUrl: "https://priya.example.com/resume.pdf",
    })], { origin }));
    expect(external("Resume")).toEqual(["https://priya.example.com/resume.pdf"]);

    const unsafe = columnsOf(buildApplicationsCsv([applicationFixture({
      resumeUrl: "javascript:alert(1)",
    })], { origin }));
    expect(unsafe("Resume")).toEqual([""]);
  });

  it("keeps legacy JSON answers that are no longer on the form as trailing columns", () => {
    const apps = [
      applicationFixture({
        customFields: { ...fullAnswers, legacyAnswer: "Needs wheelchair access" } as Application["customFields"],
      }),
      applicationFixture({
        id: "22222222-2222-4222-8222-222222222222",
        customFields: { previousEvents: 0 } as unknown as Application["customFields"],
      }),
    ];
    const csv = buildApplicationsCsv(apps, { origin });
    const [headers] = parseCsv(csv.replace(/^﻿/, ""));
    expect(headers.slice(-2)).toEqual(["Legacy Answer", "Previous Events"]);
    const column = columnsOf(csv);
    expect(column("Legacy Answer")).toEqual(["Needs wheelchair access", ""]);
    expect(column("Previous Events")).toEqual(["", "0"]);
  });

  it("does not repeat known form fields as legacy columns", () => {
    const [headers] = parseCsv(buildApplicationsCsv([applicationFixture()], { origin }).replace(/^﻿/, ""));
    expect(headers.filter((header) => header === "School")).toHaveLength(1);
  });
});

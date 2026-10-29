import { getTableColumns } from "drizzle-orm";
import { drizzle } from "drizzle-orm/pg-proxy";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { applications, type Application } from "@/db/schema";
import { applicationFixture } from "./application-fixture";

const session = vi.hoisted(() => ({
  auth: vi.fn(), currentUser: vi.fn(), query: vi.fn(),
}));
vi.mock("@clerk/nextjs/server", () => ({
  auth: session.auth, currentUser: session.currentUser,
}));
vi.mock("@/db", () => ({ db: drizzle(session.query) }));

import { GET } from "@/app/api/organizer/applications/export/route";

const FILENAME = "hackher413-applications-2026-10-29.csv";
let rows: Application[];

function exportRequest(search = "") {
  return new NextRequest(`https://hackher413.test/api/organizer/applications/export${search}`);
}

beforeEach(() => {
  vi.clearAllMocks();
  // Only Date is faked so the filename's calendar date is deterministic.
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-10-29T15:00:00Z"));
  session.auth.mockResolvedValue({ userId: "user_director" });
  session.currentUser.mockResolvedValue({ publicMetadata: { role: "organizer" } });
  rows = [applicationFixture()];
  session.query.mockImplementation(async () => ({
    // pg-proxy returns positional column values; Drizzle maps timestamps back.
    rows: rows.map((row) => Object.keys(getTableColumns(applications)).map((key) => {
      const value = row[key as keyof Application];
      return value instanceof Date ? value.toISOString() : value;
    })),
  }));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("export authorization (server-side, before any database read)", () => {
  it("returns 401 for anonymous requests", async () => {
    session.auth.mockResolvedValue({ userId: null });
    const response = await GET(exportRequest());
    expect(response.status).toBe(401);
    expect(session.query).not.toHaveBeenCalled();
  });

  it.each(["attendee", undefined, "Organizer", "superuser"])("returns 403 for role %s", async (role) => {
    session.currentUser.mockResolvedValue({ publicMetadata: { role } });
    const response = await GET(exportRequest());
    expect(response.status).toBe(403);
    expect(response.headers.get("content-type")).not.toContain("text/csv");
    expect(session.query).not.toHaveBeenCalled();
  });

  it("returns 403 when the signed-in Clerk user no longer exists", async () => {
    session.currentUser.mockResolvedValue(null);
    const response = await GET(exportRequest());
    expect(response.status).toBe(403);
    expect(session.query).not.toHaveBeenCalled();
  });

  it.each(["organizer", "admin"])("allows %s to download", async (role) => {
    session.currentUser.mockResolvedValue({ publicMetadata: { role } });
    const response = await GET(exportRequest());
    expect(response.status).toBe(200);
    expect(session.query).toHaveBeenCalledTimes(1);
  });
});

describe("export response", () => {
  it("sends a CSV attachment with a descriptive dated filename and no caching", async () => {
    const response = await GET(exportRequest());
    expect(response.headers.get("content-type")).toBe("text/csv; charset=utf-8");
    expect(response.headers.get("content-disposition")).toBe(`attachment; filename="${FILENAME}"`);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(await response.text()).toContain("priya.chen@example.edu");
  });

  it("dates the filename in America/New_York, not UTC", async () => {
    // 02:00 UTC on Oct 30 is still Oct 29 in New York (EDT).
    vi.setSystemTime(new Date("2026-10-30T02:00:00Z"));
    const response = await GET(exportRequest());
    expect(response.headers.get("content-disposition")).toContain(FILENAME);
  });
});

describe("export filtering", () => {
  it("applies the same name/email search as the list page", async () => {
    await GET(exportRequest("?q=Priya"));
    const [sql, params] = session.query.mock.calls[0];
    expect(sql).toContain('("applications"."first_name" ilike $1 or "applications"."last_name" ilike $2 or "applications"."email" ilike $3)');
    expect(params).toEqual(Array(3).fill("%Priya%"));
    expect(sql).toContain('order by "applications"."created_at" desc, "applications"."id"');
  });

  it("ANDs multiple search terms", async () => {
    await GET(exportRequest("?q=%20Priya%20%20Chen%20"));
    const [, params] = session.query.mock.calls[0];
    expect(params).toEqual(["%Priya%", "%Priya%", "%Priya%", "%Chen%", "%Chen%", "%Chen%"]);
  });

  it("escapes LIKE wildcards in the search term", async () => {
    await GET(exportRequest("?q=a%25b_c"));
    expect(session.query.mock.calls[0][1]).toEqual(Array(3).fill("%a\\%b\\_c%"));
  });

  it.each(["", "?q=", "?q=%20%20"])("exports every application when the search is empty (%s)", async (search) => {
    await GET(exportRequest(search));
    const [sql, params] = session.query.mock.calls[0];
    expect(sql).not.toContain(" where ");
    expect(params).toEqual([]);
  });

  it("sends the search term to the database query and exports only what it returns", async () => {
    const sam = applicationFixture({ id: "22222222-2222-4222-8222-222222222222", firstName: "Sam", email: "sam@example.edu" });
    session.query.mockImplementation(async () => ({
      rows: [Object.keys(getTableColumns(applications)).map((key) => {
        const value = sam[key as keyof Application];
        return value instanceof Date ? value.toISOString() : value;
      })],
    }));
    const response = await GET(exportRequest("?q=Sam"));
    expect(session.query.mock.calls[0][1]).toEqual(Array(3).fill("%Sam%"));
    const lines = (await response.text()).replace(/^﻿/, "").split("\r\n");
    expect(lines).toHaveLength(3);
    expect(lines[1]).toContain(",Sam,Chen,");
    expect(lines[1]).not.toContain("Priya");
  });
});

describe("export empty results", () => {
  it("returns a header-only CSV when the database has no applications", async () => {
    rows = [];
    const response = await GET(exportRequest());
    expect(response.status).toBe(200);
    const body = await response.text();
    const lines = body.replace(/^﻿/, "").split("\r\n");
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain("Email");
    expect(lines[1]).toBe("");
  });

  it("returns a header-only CSV when the search matches nothing", async () => {
    rows = [];
    const response = await GET(exportRequest("?q=nobody"));
    expect(response.status).toBe(200);
    expect(response.headers.get("content-disposition")).toContain(FILENAME);
    const body = await response.text();
    expect(body).not.toContain("priya");
    expect(body.replace(/^﻿/, "").split("\r\n")).toHaveLength(2);
  });
});

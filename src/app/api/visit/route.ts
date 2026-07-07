import { NextResponse } from "next/server";

import { addDocument, getDocument, setDocument } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

type VisitPayload = {
  path?: string;
  referrer?: string;
  language?: string;
  timezone?: string;
  screen?: string;
};

function clean(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim().slice(0, 500) : fallback;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as VisitPayload;
    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const ipAddress = forwardedFor.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "Unknown";
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const now = new Date().toISOString();

    await addDocument("websiteVisitors", {
      path: clean(payload.path, "/"),
      referrer: clean(payload.referrer, "Direct"),
      language: clean(payload.language),
      timezone: clean(payload.timezone),
      screen: clean(payload.screen),
      ipAddress: clean(ipAddress),
      userAgent: clean(userAgent, "Unknown"),
      createdAt: now,
    });

    const stats = await getDocument("cms/visitorStats");
    const currentTotal = Number(stats?.total || 0);
    const total = currentTotal + 1;

    await setDocument("cms/visitorStats", {
      total,
      updatedAt: now,
    });

    return NextResponse.json({ ok: true, total });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

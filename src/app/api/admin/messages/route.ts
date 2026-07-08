import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/adminAuth";
import { listDocuments } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireAdminPermission("messages"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const messages = (await listDocuments("websiteMessages")).sort((a, b) =>
    String(b.createdAt || "").localeCompare(String(a.createdAt || ""))
  );

  return NextResponse.json({ ok: true, messages });
}

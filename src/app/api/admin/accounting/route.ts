import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/adminAuth";
import { addDocument, deleteDocument } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

type AccountingPayload = {
  type?: string;
  title?: string;
  amount?: string;
  category?: string;
  date?: string;
  party?: string;
  reference?: string;
  status?: string;
  notes?: string;
  documentUrl?: string;
};

function clean(value: unknown, limit = 1200) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  if (!(await requireAdminPermission("accounting"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const payload = (await request.json()) as AccountingPayload;
  const type = clean(payload.type, 80) || "Expense";
  const title = clean(payload.title, 200);
  const amount = clean(payload.amount, 40);
  const date = clean(payload.date, 40) || new Date().toISOString().slice(0, 10);

  if (!title || !amount) {
    return NextResponse.json({ ok: false, message: "Title and amount are required." }, { status: 400 });
  }

  const item = await addDocument("accountingRecords", {
    type,
    title,
    amount,
    category: clean(payload.category, 120),
    date,
    party: clean(payload.party, 180),
    reference: clean(payload.reference, 180),
    status: clean(payload.status, 80) || "Recorded",
    notes: clean(payload.notes, 1200),
    documentUrl: clean(payload.documentUrl, 950000),
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, item });
}

export async function DELETE(request: Request) {
  if (!(await requireAdminPermission("accounting"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = clean(searchParams.get("id"), 200);

  if (!id) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await deleteDocument(`accountingRecords/${id}`);

  return NextResponse.json({ ok: true });
}

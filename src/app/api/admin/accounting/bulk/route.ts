import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/adminAuth";
import { addDocument } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

type AccountingRow = {
  type?: string;
  title?: string;
  amount?: string;
  category?: string;
  date?: string;
  party?: string;
  reference?: string;
  status?: string;
  notes?: string;
};

function clean(value: unknown, limit = 1200) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function cleanDate(value: unknown) {
  const date = clean(value, 40);

  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : new Date().toISOString().slice(0, 10);
}

export async function POST(request: Request) {
  if (!(await requireAdminPermission("accounting:create"))) {
    return NextResponse.json({ ok: false, message: "You do not have access to import accounting records." }, { status: 403 });
  }

  const payload = (await request.json()) as { rows?: AccountingRow[] };
  const rows = (payload.rows || []).slice(0, 250);

  if (!rows.length) {
    return NextResponse.json({ ok: false, message: "No accounting rows found." }, { status: 400 });
  }

  const created = [];

  for (const row of rows) {
    const type = clean(row.type, 80) || "Expense";
    const title = clean(row.title, 200);
    const amount = clean(row.amount, 40);

    if (!title || !amount) {
      continue;
    }

    created.push(await addDocument("accountingRecords", {
      type,
      title,
      amount,
      category: clean(row.category, 140),
      date: cleanDate(row.date),
      party: clean(row.party, 180),
      reference: clean(row.reference, 180),
      status: clean(row.status, 80) || (type.toLowerCase().includes("received") ? "Received" : "Recorded"),
      notes: clean(row.notes, 1200),
      documentUrl: "",
      createdAt: new Date().toISOString(),
    }));
  }

  return NextResponse.json({
    ok: true,
    records: created,
    summary: `Imported ${created.length} accounting records.`,
  });
}

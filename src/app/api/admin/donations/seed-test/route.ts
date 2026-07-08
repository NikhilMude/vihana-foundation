import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/adminAuth";
import { donorDocumentId, hashPassword } from "@/lib/donorAuth";
import { setDocument } from "@/lib/firestoreAdmin";
import { getSiteContent } from "@/lib/siteData";

export const runtime = "nodejs";

type SeedDonationRow = {
  name?: string;
  email?: string;
  phone?: string;
  amount?: string;
  date?: string;
  method?: string;
  purpose?: string;
  pan?: string;
  address?: string;
};

function isoAt(date: string, hour = "10:00:00") {
  return `${date}T${hour}.000+05:30`;
}

function receiptNumber(index: number) {
  return `VF/TEST/${String(index + 1).padStart(4, "0")}`;
}

function clean(value: unknown, limit = 500) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function cleanEmail(value: unknown) {
  return clean(value, 180).toLowerCase();
}

function cleanDate(value: unknown) {
  const date = clean(value, 40);

  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : new Date().toISOString().slice(0, 10);
}

function testDonationId(email: string, index: number, date: string) {
  return `seed-upload-${donorDocumentId(email)}-${date}-${String(index + 1).padStart(4, "0")}`;
}

export async function POST(request: Request) {
  if (!(await requireAdminPermission("dashboard:test"))) {
    return NextResponse.json({ ok: false, message: "You do not have access to create test donations." }, { status: 403 });
  }

  const content = await getSiteContent();

  if (String(content.dashboardTestingEnabled || "true").toLowerCase() === "false") {
    return NextResponse.json({ ok: false, message: "Dashboard testing is disabled in CMS." }, { status: 403 });
  }

  const payload = (await request.json().catch(() => ({}))) as { rows?: SeedDonationRow[] };
  const rows = (payload.rows || []).slice(0, 250);

  if (!rows.length) {
    return NextResponse.json({ ok: false, message: "Upload the test donation sample first." }, { status: 400 });
  }

  let donationIndex = 0;
  const donorEmails = new Set<string>();

  for (const row of rows) {
    const name = clean(row.name, 160);
    const email = cleanEmail(row.email);
    const amount = clean(row.amount, 40);

    if (!name || !email || !amount) {
      continue;
    }

    const donorId = donorDocumentId(email);
    const date = cleanDate(row.date);
    const method = clean(row.method, 80) || "Cash";
    const purpose = clean(row.purpose, 120) || "General Fund";
    const phone = clean(row.phone, 40);
    const pan = clean(row.pan, 20).toUpperCase();
    const address = clean(row.address, 500) || "Test donor address for dashboard validation";

    await setDocument(`donors/${donorId}`, {
      id: donorId,
      name,
      email,
      phone,
      donorType: "Indian Citizen",
      pan,
      address,
      passwordHash: hashPassword("Vihana@123"),
      createdAt: isoAt("2024-10-01"),
    });
    donorEmails.add(email);

    const receipt = receiptNumber(donationIndex);
    const donationId = testDonationId(email, donationIndex, date);

    await setDocument(`donationIntents/${donationId}`, {
      id: donationId,
      name,
      email,
      phone,
      amount,
      method,
      transactionId: `${method.toUpperCase().replace(/\s+/g, "-")}-TEST-${String(donationIndex + 1).padStart(4, "0")}`,
      donorType: "Indian Citizen",
      donorCategory: "Account Holder Donor",
      frequency: "One Time",
      purpose,
      pan,
      address,
      receiptRequired: "Yes",
      donorEmail: email,
      message: "Seeded from uploaded dashboard test donation sheet.",
      status: "Test payment received / receipt generated",
      receiptNumber: receipt,
      receiptStatus: "Test receipt generated",
      receiptIssuedAt: isoAt(date, "10:30:00"),
      createdAt: isoAt(date),
    });

    await setDocument(`accountingRecords/${donationId}`, {
      id: donationId,
      type: "Receipt",
      title: `Donation received from ${name}`,
      amount,
      category: purpose,
      date,
      party: name,
      reference: receipt,
      status: "Received",
      notes: `Seeded test record from uploaded sheet. Payment method: ${method}.`,
      documentUrl: "",
      createdAt: isoAt(date),
    });

    donationIndex += 1;
  }

  return NextResponse.json({
    ok: true,
    message: `Created/updated ${donorEmails.size} test donor accounts and ${donationIndex} test donations with receipts.`,
  });
}

import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/adminAuth";
import { addDocument } from "@/lib/firestoreAdmin";
import { generateReceiptNumber } from "@/lib/receiptNumber";
import { getDonationIntents, getSiteContent } from "@/lib/siteData";

export const runtime = "nodejs";

type AdminDonationPayload = {
  name?: string;
  email?: string;
  phone?: string;
  amount?: string;
  method?: string;
  transactionId?: string;
  purpose?: string;
  pan?: string;
  address?: string;
  message?: string;
  receiptRequired?: string;
};

function clean(value: unknown, limit = 500) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  if (!(await requireAdminPermission("donations:create"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const payload = (await request.json()) as AdminDonationPayload;
  const name = clean(payload.name, 160);
  const email = clean(payload.email, 180).toLowerCase();
  const phone = clean(payload.phone, 40);
  const amount = clean(payload.amount, 40);
  const purpose = clean(payload.purpose, 120) || "General Fund";
  const method = clean(payload.method, 80) || "Cash";
  const transactionId = clean(payload.transactionId, 140) || `CASH-${Date.now()}`;
  const createdAt = new Date().toISOString();
  const content = await getSiteContent();
  const existingDonations = await getDonationIntents();
  const generatedReceiptNumber = generateReceiptNumber(
    content,
    existingDonations.map((donation) => donation.receiptNumber).filter(Boolean)
  );

  if (!name || !amount) {
    return NextResponse.json({ ok: false, message: "Donor name and amount are required." }, { status: 400 });
  }

  const donation = await addDocument("donationIntents", {
    name,
    email,
    phone,
    amount,
    method,
    transactionId,
    donorType: "Indian Citizen",
    frequency: "One Time",
    purpose,
    pan: clean(payload.pan, 20).toUpperCase(),
    address: clean(payload.address, 500),
    receiptRequired: clean(payload.receiptRequired, 20) || "Yes",
    donorEmail: email,
    message: clean(payload.message, 900),
    status: method === "Cash" ? "Cash received / receipt generated" : "Offline payment received",
    receiptNumber: generatedReceiptNumber,
    receiptStatus: "Provisional receipt generated",
    receiptIssuedAt: createdAt,
    createdAt,
  });

  const accountingRecord = await addDocument("accountingRecords", {
    type: "Receipt",
    title: `Donation received from ${name}`,
    amount,
    category: purpose,
    date: createdAt.slice(0, 10),
    party: name,
    reference: generatedReceiptNumber,
    status: "Received",
    notes: `Payment method: ${method}. Reference: ${transactionId}.`,
    documentUrl: "",
    createdAt,
  });

  return NextResponse.json({ ok: true, donation, accountingRecord });
}

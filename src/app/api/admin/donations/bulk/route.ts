import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/adminAuth";
import { donorDocumentId, hashPassword, saveDonorAccount } from "@/lib/donorAuth";
import { addDocument, listDocuments } from "@/lib/firestoreAdmin";
import { generateReceiptNumber } from "@/lib/receiptNumber";
import { getDonationIntents, getSiteContent } from "@/lib/siteData";

export const runtime = "nodejs";

type BulkDonationPayload = {
  createMissingDonors?: boolean;
  rows?: {
    name?: string;
    email?: string;
    phone?: string;
    amount?: string;
    date?: string;
    method?: string;
    purpose?: string;
    transactionId?: string;
    pan?: string;
    address?: string;
    message?: string;
  }[];
};

function clean(value: unknown, limit = 500) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function cleanEmail(value: unknown) {
  return clean(value, 180).toLowerCase();
}

function createdAtFromDate(value: string) {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T10:00:00+05:30`) : new Date(value);

  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function donorKey(value?: string) {
  return String(value || "").trim().toLowerCase();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  if (!(await requireAdminPermission("donations:create"))) {
    return NextResponse.json({ ok: false, message: "You do not have access to import donations." }, { status: 403 });
  }

  const payload = (await request.json()) as BulkDonationPayload;
  const rows = (payload.rows || []).slice(0, 250);
  const createMissingDonors = payload.createMissingDonors !== false;

  if (!rows.length) {
    return NextResponse.json({ ok: false, message: "No donation rows found." }, { status: 400 });
  }

  const content = await getSiteContent();
  const [existingDonations, donors] = await Promise.all([
    getDonationIntents(),
    listDocuments("donors").catch(() => []),
  ]);
  const donorByEmail = new Map(donors.map((donor) => [donorKey(String(donor.email || "")), donor]));
  const donorByName = new Map(donors.map((donor) => [donorKey(String(donor.name || "")), donor]));
  const usedReceiptNumbers = existingDonations.map((donation) => donation.receiptNumber).filter(Boolean);
  const createdDonations = [];
  const createdAccountingRecords = [];
  let createdDonorCount = 0;
  let accountHolderCount = 0;
  let nonAccountHolderCount = 0;

  for (const row of rows) {
    const name = clean(row.name, 160);
    const email = cleanEmail(row.email);
    const amount = clean(row.amount, 40);

    if (!name || !amount) {
      continue;
    }

    let matchedDonor = (email && donorByEmail.get(email)) || donorByName.get(donorKey(name));

    if (!matchedDonor && createMissingDonors && isEmail(email)) {
      const donorId = donorDocumentId(email);
      const createdAtForDonor = new Date().toISOString();
      const newDonor = {
        id: donorId,
        name,
        email,
        phone: clean(row.phone, 40),
        donorType: "Indian Citizen",
        pan: clean(row.pan, 20).toUpperCase(),
        address: clean(row.address, 500),
        passwordHash: hashPassword("Vihana@123"),
        createdAt: createdAtForDonor,
      };

      await saveDonorAccount(newDonor);
      matchedDonor = newDonor;
      donorByEmail.set(donorKey(email), newDonor);
      donorByName.set(donorKey(name), newDonor);
      createdDonorCount += 1;
    }

    const donorCategory = matchedDonor ? "Account Holder Donor" : "Non Account Holder Donor";
    const donorEmail = matchedDonor ? String(matchedDonor.email || email) : email;
    const createdAt = createdAtFromDate(clean(row.date, 40));
    const receiptNumber = generateReceiptNumber(content, usedReceiptNumbers, new Date(createdAt));

    usedReceiptNumbers.push(receiptNumber);
    if (matchedDonor) accountHolderCount += 1;
    else nonAccountHolderCount += 1;

    const donation = await addDocument("donationIntents", {
      name: matchedDonor ? String(matchedDonor.name || name) : name,
      email,
      phone: clean(row.phone, 40) || String(matchedDonor?.phone || ""),
      amount,
      method: clean(row.method, 80) || "Cash",
      transactionId: clean(row.transactionId, 140) || `BULK-${Date.now()}`,
      donorType: "Indian Citizen",
      donorCategory,
      frequency: "One Time",
      purpose: clean(row.purpose, 120) || "General Fund",
      pan: clean(row.pan, 20).toUpperCase() || String(matchedDonor?.pan || ""),
      address: clean(row.address, 500) || String(matchedDonor?.address || ""),
      receiptRequired: "Yes",
      donorEmail,
      message: clean(row.message, 900) || "Bulk imported by admin.",
      status: "Bulk imported / receipt generated",
      receiptNumber,
      receiptStatus: "Provisional receipt generated",
      receiptIssuedAt: createdAt,
      createdAt,
    });

    const accountingRecord = await addDocument("accountingRecords", {
      type: "Receipt",
      title: `Donation received from ${name}`,
      amount,
      category: clean(row.purpose, 120) || "General Fund",
      date: createdAt.slice(0, 10),
      party: name,
      reference: receiptNumber,
      status: "Received",
      notes: `Bulk import. Donor category: ${donorCategory}. Payment method: ${clean(row.method, 80) || "Cash"}.`,
      documentUrl: "",
      createdAt,
    });

    createdDonations.push(donation);
    createdAccountingRecords.push(accountingRecord);
  }

  return NextResponse.json({
    ok: true,
    donations: createdDonations,
    accountingRecords: createdAccountingRecords,
    summary: `Imported ${createdDonations.length} donations: ${accountHolderCount} account-holder and ${nonAccountHolderCount} non-account-holder donors.`,
    createdDonorCount,
  });
}

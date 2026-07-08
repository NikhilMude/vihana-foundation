import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/adminAuth";
import { donorDocumentId, hashPassword } from "@/lib/donorAuth";
import { setDocument } from "@/lib/firestoreAdmin";
import { testDonationDonors, testDonationSchedule } from "@/lib/testDonationSeed";

export const runtime = "nodejs";

function isoAt(date: string, hour = "10:00:00") {
  return `${date}T${hour}.000+05:30`;
}

function receiptNumber(index: number) {
  return `VF/TEST/${String(index + 1).padStart(4, "0")}`;
}

export async function POST() {
  if (!(await requireAdminPermission("donations:create"))) {
    return NextResponse.json({ ok: false, message: "You do not have access to create test donations." }, { status: 403 });
  }

  let donationIndex = 0;

  for (const donor of testDonationDonors) {
    const donorId = donorDocumentId(donor.email);
    await setDocument(`donors/${donorId}`, {
      id: donorId,
      name: donor.name,
      email: donor.email,
      phone: donor.phone,
      donorType: "Indian Citizen",
      pan: "",
      address: "Test donor address for dashboard validation",
      passwordHash: hashPassword(donor.password),
      createdAt: isoAt("2024-10-01"),
    });

    const [start, end] = donor.range;
    for (let scheduleIndex = start; scheduleIndex < end; scheduleIndex += 1) {
      const [amount, date, method, purpose] = testDonationSchedule[scheduleIndex];
      const receipt = receiptNumber(donationIndex);
      const donationId = `seed-${donorId}-${scheduleIndex + 1}`;

      await setDocument(`donationIntents/${donationId}`, {
        id: donationId,
        name: donor.name,
        email: donor.email,
        phone: donor.phone,
        amount,
        method,
        transactionId: `${method.toUpperCase().replace(/\s+/g, "-")}-TEST-${String(donationIndex + 1).padStart(4, "0")}`,
        donorType: "Indian Citizen",
        donorCategory: "Account Holder Donor",
        frequency: "One Time",
        purpose,
        pan: "",
        address: "Test donor address for dashboard validation",
        receiptRequired: "Yes",
        donorEmail: donor.email,
        message: "Seeded from Test donation Data.xlsx for dashboard testing.",
        status: "Test payment received / receipt generated",
        receiptNumber: receipt,
        receiptStatus: "Test receipt generated",
        receiptIssuedAt: isoAt(date, "10:30:00"),
        createdAt: isoAt(date),
      });

      await setDocument(`accountingRecords/${donationId}`, {
        id: donationId,
        type: "Receipt",
        title: `Donation received from ${donor.name}`,
        amount,
        category: purpose,
        date,
        party: donor.name,
        reference: receipt,
        status: "Received",
        notes: `Seeded test record. Payment method: ${method}.`,
        documentUrl: "",
        createdAt: isoAt(date),
      });

      donationIndex += 1;
    }
  }

  return NextResponse.json({
    ok: true,
    message: `Created/updated ${testDonationDonors.length} test donor accounts and ${donationIndex} test donations with receipts.`,
  });
}

import { NextResponse } from "next/server";

import { getAuthenticatedDonorEmail } from "@/lib/donorAuth";
import { addDocument } from "@/lib/firestoreAdmin";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

type DonationPayload = {
  name?: string;
  email?: string;
  phone?: string;
  amount?: string;
  method?: string;
  transactionId?: string;
  message?: string;
  donorType?: string;
  frequency?: string;
  purpose?: string;
  pan?: string;
  address?: string;
  receiptRequired?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as DonationPayload;
    const name = clean(payload.name);
    const email = clean(payload.email).toLowerCase();
    const phone = clean(payload.phone);
    const amount = clean(payload.amount);
    const method = clean(payload.method) || "UPI";
    const transactionId = clean(payload.transactionId) || "Test / pending";
    const message = clean(payload.message);
    const donorType = clean(payload.donorType) || "Indian Citizen";
    const frequency = clean(payload.frequency) || "One Time";
    const purpose = clean(payload.purpose) || "General Fund";
    const pan = clean(payload.pan).toUpperCase();
    const address = clean(payload.address);
    const receiptRequired = clean(payload.receiptRequired) || "No";
    const donorEmail = await getAuthenticatedDonorEmail();

    if (!name || !isEmail(email) || !amount) {
      return NextResponse.json({ ok: false, message: "Please enter name, email and amount." }, { status: 400 });
    }

    if (donorType === "Foreign Citizen / OCI") {
      return NextResponse.json(
        {
          ok: false,
          message:
            "We are not accepting foreign citizen or OCI donations at this time while compliance and payment setup is being updated.",
        },
        { status: 403 }
      );
    }

    const createdAt = new Date().toISOString();

    await addDocument("donationIntents", {
      name,
      email,
      phone,
      amount,
      method,
      transactionId,
      donorType,
      frequency,
      purpose,
      pan,
      address,
      receiptRequired,
      donorEmail: donorEmail || email,
      message,
      status: transactionId === "Test / pending" ? "Pledged / pending payment" : "Self-reported / awaiting verification",
      createdAt,
    });

    await sendEmail({
      to: email,
      subject: "Thank you for supporting Vihana Foundation",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for supporting Vihana Foundation.</p>
        <p>We received your ${frequency.toLowerCase()} donation intent for <strong>INR ${amount}</strong> toward <strong>${purpose}</strong>.</p>
        <p>Payment method: <strong>${method}</strong></p>
        <p>Transaction/reference: ${transactionId}</p>
        <p>This is a test-mode acknowledgement until verified payment integration and official receipts are configured.</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Could not record donation right now." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

import { getAuthenticatedDonorEmail } from "@/lib/donorAuth";
import { addDocument } from "@/lib/firestoreAdmin";
import { renderEmailTemplate, sendEmail, textToEmailHtml } from "@/lib/email";
import { getSiteContent } from "@/lib/siteData";

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

function receiptNumber() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `VF-${stamp}-${random}`;
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
    const content = await getSiteContent();
    const generatedReceiptNumber = receiptNumber();
    const receiptIssuedAt = createdAt;
    const receiptStatus = receiptRequired === "Yes" ? "Provisional receipt generated" : "Receipt not requested";

    const donationRecord = await addDocument("donationIntents", {
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
      receiptNumber: generatedReceiptNumber,
      receiptStatus,
      receiptIssuedAt,
      createdAt,
    });
    const receiptDownloadUrl = new URL(`/api/donor/receipt?id=${donationRecord.id}`, request.url).toString();
    const templateValues = {
      name,
      email,
      phone: phone || "Not provided",
      amount,
      method,
      transactionId,
      donorType,
      frequency,
      purpose,
      pan: pan || "Not provided",
      address: address || "Not provided",
      receiptRequired,
      receiptNumber: generatedReceiptNumber,
      receiptStatus,
      receiptIssuedAt: new Date(receiptIssuedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      receiptDownloadUrl,
      message: message || "No message",
      createdAt: new Date(createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    await sendEmail({
      to: email,
      from: content.emailFrom,
      subject: renderEmailTemplate(content.donationVisitorEmailSubject, templateValues),
      html: textToEmailHtml(renderEmailTemplate(content.donationVisitorEmailBody, templateValues)),
    });

    await sendEmail({
      to: content.donationNotificationEmail || content.contactEmail,
      from: content.emailFrom,
      subject: renderEmailTemplate(content.donationAdminEmailSubject, templateValues),
      html: textToEmailHtml(renderEmailTemplate(content.donationAdminEmailBody, templateValues)),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Could not record donation right now." }, { status: 500 });
  }
}

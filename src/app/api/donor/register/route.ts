import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  createDonorCookie,
  donorCookieName,
  donorDocumentId,
  hashPassword,
  saveDonorAccount,
} from "@/lib/donorAuth";
import { renderEmailTemplate, sendEmail, textToEmailHtml } from "@/lib/email";
import { getDocument } from "@/lib/firestoreAdmin";
import { getSiteContent } from "@/lib/siteData";

export const runtime = "nodejs";

type RegisterPayload = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  donorType?: string;
  pan?: string;
  address?: string;
};

function clean(value: unknown, limit = 500) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as RegisterPayload;
    const name = clean(payload.name, 120);
    const email = clean(payload.email, 180).toLowerCase();
    const phone = clean(payload.phone, 40);
    const password = clean(payload.password, 120);
    const donorType = clean(payload.donorType, 80) || "Indian Citizen";
    const pan = clean(payload.pan, 20).toUpperCase();
    const address = clean(payload.address, 800);

    if (!name || !isEmail(email) || password.length < 8) {
      return NextResponse.json({ ok: false, message: "Enter name, valid email and minimum 8 character password." }, { status: 400 });
    }

    if (donorType === "Foreign Citizen / OCI") {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Foreign citizen / OCI donor accounts are currently unavailable while compliance and payment setup is being updated.",
        },
        { status: 403 }
      );
    }

    const id = donorDocumentId(email);
    const existing = await getDocument(`donors/${id}`);

    if (existing) {
      return NextResponse.json({ ok: false, message: "Account already exists. Please login." }, { status: 409 });
    }

    const createdAt = new Date().toISOString();

    await saveDonorAccount({
      id,
      name,
      email,
      phone,
      donorType,
      pan,
      address,
      passwordHash: hashPassword(password),
      createdAt,
    });

    const content = await getSiteContent();
    const templateValues = {
      name,
      email,
      phone: phone || "Not provided",
      donorType,
      pan: pan || "Not provided",
      address: address || "Not provided",
      createdAt: new Date(createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    await sendEmail({
      to: email,
      from: content.emailFrom,
      subject: renderEmailTemplate(content.donorWelcomeEmailSubject, templateValues),
      html: textToEmailHtml(renderEmailTemplate(content.donorWelcomeEmailBody, templateValues)),
    });

    await sendEmail({
      to: content.donorNotificationEmail || content.contactEmail,
      from: content.emailFrom,
      subject: renderEmailTemplate(content.donorAdminEmailSubject, templateValues),
      html: textToEmailHtml(renderEmailTemplate(content.donorAdminEmailBody, templateValues)),
    });

    const cookieStore = await cookies();
    cookieStore.set(donorCookieName, createDonorCookie(email), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Could not create donor account." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

import { addDocument } from "@/lib/firestoreAdmin";
import { renderEmailTemplate, sendEmail, textToEmailHtml } from "@/lib/email";
import { getSiteContent } from "@/lib/siteData";

export const runtime = "nodejs";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 300) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: string };
    const email = clean(payload.email).toLowerCase();

    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, message: "Please enter a valid email." }, { status: 400 });
    }

    await addDocument("newsletterSubscribers", {
      email,
      source: "website",
      createdAt: new Date().toISOString(),
    });

    const content = await getSiteContent();
    const templateValues = { email, createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) };

    await sendEmail({
      to: email,
      from: content.emailFrom,
      subject: renderEmailTemplate(content.newsletterWelcomeEmailSubject, templateValues),
      html: textToEmailHtml(renderEmailTemplate(content.newsletterWelcomeEmailBody, templateValues)),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Could not subscribe right now." }, { status: 500 });
  }
}

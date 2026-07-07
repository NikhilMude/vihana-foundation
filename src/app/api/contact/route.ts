import { NextResponse } from "next/server";

import { renderEmailTemplate, sendEmail, textToEmailHtml } from "@/lib/email";
import { getSiteContent } from "@/lib/siteData";

const messageTypes = new Set(["Birthday Campaign", "Volunteer", "Donation", "Partnership", "General"]);

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  company?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 1200) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    if (clean(payload.company)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(payload.name);
    const email = clean(payload.email).toLowerCase();
    const phone = clean(payload.phone);
    const interest = clean(payload.interest);
    const message = clean(payload.message);

    if (!name || !isEmail(email) || !message || !messageTypes.has(interest)) {
      return NextResponse.json(
        { ok: false, message: "Please check the form and try again." },
        { status: 400 }
      );
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const apiKey = process.env.FIREBASE_WEB_API_KEY;

    if (!projectId || !apiKey) {
      return NextResponse.json(
        { ok: false, message: "Firebase is not connected yet." },
        { status: 503 }
      );
    }

    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/websiteMessages?key=${apiKey}`;

    const response = await fetch(firestoreUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          name: { stringValue: name },
          email: { stringValue: email },
          phone: { stringValue: phone },
          interest: { stringValue: interest },
          message: { stringValue: message },
          source: { stringValue: "vihana-foundation-website" },
          createdAt: { timestampValue: new Date().toISOString() },
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: "We could not save your message right now." },
        { status: 502 }
      );
    }

    const content = await getSiteContent();
    const adminEmail =
      process.env.CONTACT_EMAIL_TO ||
      (interest === "Volunteer"
        ? content.volunteerNotificationEmail
        : interest === "Donation"
          ? content.donationNotificationEmail
          : content.contactNotificationEmail || content.contactEmail);
    const templateValues = {
      name,
      email,
      phone: phone || "Not provided",
      interest,
      message,
      createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    const adminEmailResult = await sendEmail({
      to: adminEmail,
      from: content.emailFrom,
      subject: renderEmailTemplate(content.contactAdminEmailSubject, templateValues),
      html: textToEmailHtml(renderEmailTemplate(content.contactAdminEmailBody, templateValues)),
    });

    const visitorEmailResult = await sendEmail({
      to: email,
      from: content.emailFrom,
      subject: renderEmailTemplate(content.contactVisitorEmailSubject, templateValues),
      html: textToEmailHtml(renderEmailTemplate(content.contactVisitorEmailBody, templateValues)),
    });

    const emailSent = adminEmailResult.ok && visitorEmailResult.ok;

    return NextResponse.json({
      ok: true,
      emailSent,
      emailMessage: emailSent
        ? "Confirmation email sent."
        : "Message saved. Email could not be sent. Please check RESEND_API_KEY, EMAIL_FROM and verified sender domain.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

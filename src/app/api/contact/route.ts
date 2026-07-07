import { NextResponse } from "next/server";

import { sendEmail } from "@/lib/email";
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
    const adminEmail = process.env.CONTACT_EMAIL_TO || content.contactEmail;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeInterest = escapeHtml(interest);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const adminEmailResult = await sendEmail({
      to: adminEmail,
      subject: `New Vihana Foundation message from ${name}`,
      html: `
        <h2>New website message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Interest:</strong> ${safeInterest}</p>
        <p><strong>Message:</strong><br />${safeMessage}</p>
      `,
    });

    const visitorEmailResult = await sendEmail({
      to: email,
      subject: "We received your message - Vihana Foundation",
      html: `
        <p>Dear ${safeName},</p>
        <p>Thank you for reaching out to Vihana Foundation. We received your message and will review it soon.</p>
        <p><strong>Your interest:</strong> ${safeInterest}</p>
        <p><strong>Your message:</strong><br />${safeMessage}</p>
        <p>With gratitude,<br />Vihana Foundation</p>
      `,
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

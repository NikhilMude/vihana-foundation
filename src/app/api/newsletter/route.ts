import { NextResponse } from "next/server";

import { addDocument } from "@/lib/firestoreAdmin";
import { sendEmail } from "@/lib/email";

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

    await sendEmail({
      to: email,
      subject: "You are subscribed to Vihana Foundation updates",
      html: `
        <p>Thank you for subscribing to Vihana Foundation updates.</p>
        <p>We will share meaningful updates about campaigns, volunteer opportunities and stories of impact.</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Could not subscribe right now." }, { status: 500 });
  }
}

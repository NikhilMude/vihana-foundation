import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/adminAuth";
import { sendEmail } from "@/lib/email";
import { addDocument, listDocuments } from "@/lib/firestoreAdmin";
import { getSiteContent } from "@/lib/siteData";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await requireAdminPermission("subscribers"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const payload = (await request.json()) as {
    subject?: string;
    body?: string;
  };

  const subject = String(payload.subject || "").trim();
  const body = String(payload.body || "").trim();
  const content = await getSiteContent();

  if (!subject || !body) {
    return NextResponse.json({ ok: false, message: "Subject and body are required." }, { status: 400 });
  }

  const subscribers = await listDocuments("newsletterSubscribers");
  const emails = Array.from(
    new Set(
      subscribers
        .map((subscriber) => String(subscriber.email || "").trim().toLowerCase())
        .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    )
  );

  let sent = 0;
  let skipped = false;

  for (const email of emails) {
    const result = await sendEmail({
      to: email,
      from: content.emailFrom,
      subject,
      html: body
        .split("\n")
        .map((line) => `<p>${line || "&nbsp;"}</p>`)
        .join(""),
    });

    if (result.skipped) {
      skipped = true;
      break;
    }

    if (result.ok) {
      sent += 1;
    }
  }

  await addDocument("newsletterCampaigns", {
    subject,
    body,
    recipients: emails.length,
    sent,
    status: skipped ? "Email provider not configured" : "Sent",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    recipients: emails.length,
    sent,
    skipped,
  });
}

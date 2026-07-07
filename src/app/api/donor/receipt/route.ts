import { NextResponse } from "next/server";

import { getAuthenticatedDonor } from "@/lib/donorAuth";
import { createReceiptPdf } from "@/lib/receiptPdf";
import { getDonationIntents, getSiteContent } from "@/lib/siteData";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const donor = await getAuthenticatedDonor();

  if (!donor) {
    return NextResponse.json({ ok: false, message: "Please login to download receipt." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";
  const donations = await getDonationIntents();
  const donation = donations.find(
    (item) =>
      item.id === id &&
      (item.email.toLowerCase() === donor.email.toLowerCase() ||
        item.donorEmail.toLowerCase() === donor.email.toLowerCase())
  );

  if (!donation) {
    return NextResponse.json({ ok: false, message: "Receipt not found." }, { status: 404 });
  }

  const content = await getSiteContent();
  const pdf = createReceiptPdf(content, donation);
  const filename = `${donation.receiptNumber || donation.id || "vihana-receipt"}.pdf`;

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

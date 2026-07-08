import { NextResponse } from "next/server";

import { donorDocumentId, getAuthenticatedDonorEmail, hashPassword, verifyPassword } from "@/lib/donorAuth";
import { getDocument, setDocument } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

type DonorProfilePayload = {
  name?: string;
  phone?: string;
  pan?: string;
  address?: string;
  currentPassword?: string;
  newPassword?: string;
};

function clean(value: unknown, limit = 500) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function PATCH(request: Request) {
  const email = await getAuthenticatedDonorEmail();

  if (!email) {
    return NextResponse.json({ ok: false, message: "Please login again." }, { status: 401 });
  }

  const donor = await getDocument(`donors/${donorDocumentId(email)}`);

  if (!donor) {
    return NextResponse.json({ ok: false, message: "Donor account not found." }, { status: 404 });
  }

  const payload = (await request.json()) as DonorProfilePayload;
  const newPassword = clean(payload.newPassword, 160);
  const update: Record<string, string> = {
    name: clean(payload.name, 140) || String(donor.name || ""),
    phone: clean(payload.phone, 40),
    pan: clean(payload.pan, 20).toUpperCase(),
    address: clean(payload.address, 800),
    updatedAt: new Date().toISOString(),
  };

  if (newPassword) {
    const currentPassword = clean(payload.currentPassword, 160);

    if (newPassword.length < 8) {
      return NextResponse.json({ ok: false, message: "New password must be at least 8 characters." }, { status: 400 });
    }

    if (!verifyPassword(currentPassword, String(donor.passwordHash || ""))) {
      return NextResponse.json({ ok: false, message: "Current password is incorrect." }, { status: 403 });
    }

    update.passwordHash = hashPassword(newPassword);
  }

  await setDocument(`donors/${donorDocumentId(email)}`, update);

  return NextResponse.json({ ok: true, donor: { ...update, email } });
}

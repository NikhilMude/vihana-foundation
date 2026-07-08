import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/adminAuth";
import { donorDocumentId, hashPassword, saveDonorAccount } from "@/lib/donorAuth";
import { getDocument } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

type AdminDonorPayload = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
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
  if (!(await requireAdminPermission("donors:create"))) {
    return NextResponse.json({ ok: false, message: "You do not have access to create donors." }, { status: 403 });
  }

  const payload = (await request.json()) as AdminDonorPayload;
  const name = clean(payload.name, 140);
  const email = clean(payload.email, 180).toLowerCase();
  const password = clean(payload.password, 140);
  const phone = clean(payload.phone, 40);
  const pan = clean(payload.pan, 20).toUpperCase();
  const address = clean(payload.address, 800);

  if (!name || !isEmail(email) || password.length < 8) {
    return NextResponse.json({ ok: false, message: "Name, valid email and 8 character password are required." }, { status: 400 });
  }

  const id = donorDocumentId(email);
  const existing = await getDocument(`donors/${id}`);

  if (existing) {
    return NextResponse.json({ ok: false, message: "Donor account already exists." }, { status: 409 });
  }

  const createdAt = new Date().toISOString();

  await saveDonorAccount({
    id,
    name,
    email,
    phone,
    donorType: "Indian Citizen",
    pan,
    address,
    passwordHash: hashPassword(password),
    createdAt,
  });

  return NextResponse.json({
    ok: true,
    donor: {
      id,
      name,
      email,
      phone,
      donorType: "Indian Citizen",
      pan,
      address,
      createdAt,
    },
  });
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  createDonorCookie,
  donorCookieName,
  donorDocumentId,
  verifyPassword,
} from "@/lib/donorAuth";
import { getDocument } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 180) : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: string; password?: string };
    const email = clean(payload.email).toLowerCase();
    const password = clean(payload.password);
    const donor = await getDocument(`donors/${donorDocumentId(email)}`);

    if (!donor || !verifyPassword(password, String(donor.passwordHash || ""))) {
      return NextResponse.json({ ok: false, message: "Invalid email or password." }, { status: 401 });
    }

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
    return NextResponse.json({ ok: false, message: "Could not login right now." }, { status: 500 });
  }
}

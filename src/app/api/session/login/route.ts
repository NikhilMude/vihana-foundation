import { NextResponse } from "next/server";

import { cookieName, createAdminCookie, findAdminUser, verifyAdminPassword } from "@/lib/adminAuth";
import { createDonorCookie, donorCookieName, donorDocumentId, verifyPassword } from "@/lib/donorAuth";
import { getDocument } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

function clean(value: unknown, limit = 180) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: string; password?: string };
    const email = clean(payload.email).toLowerCase();
    const password = clean(payload.password);
    const adminPassword = process.env.ADMIN_PASSWORD || "";

    if (!password) {
      return NextResponse.json({ ok: false, message: "Please enter your password." }, { status: 400 });
    }

    if (adminPassword && password === adminPassword) {
      const response = NextResponse.json({ ok: true, accountType: "admin", redirectTo: "/admin/operations" });
      response.cookies.set(cookieName, createAdminCookie(), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 12,
      });

      return response;
    }

    const adminUser = await findAdminUser(email);

    if (adminUser && verifyAdminPassword(password, adminUser.passwordHash)) {
      const response = NextResponse.json({ ok: true, accountType: "admin", redirectTo: "/admin/operations" });
      response.cookies.set(
        cookieName,
        createAdminCookie({
          id: adminUser.id,
          name: adminUser.name,
          email: adminUser.email,
          role: adminUser.role,
          permissions: adminUser.permissions,
          owner: false,
        }),
        {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 12,
        }
      );

      return response;
    }

    const donor = await getDocument(`donors/${donorDocumentId(email)}`);

    if (!donor || !verifyPassword(password, String(donor.passwordHash || ""))) {
      return NextResponse.json({ ok: false, message: "Invalid email or password." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true, accountType: "donor", redirectTo: "/donor" });
    response.cookies.set(donorCookieName, createDonorCookie(email), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch {
    return NextResponse.json({ ok: false, message: "Could not login right now." }, { status: 500 });
  }
}

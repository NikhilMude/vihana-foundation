import { NextResponse } from "next/server";

import { cookieName, createAdminCookie, findAdminUser, verifyAdminPassword } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as { email?: string; password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || !password) {
    return NextResponse.json({ ok: false, message: "Incorrect password." }, { status: 401 });
  }

  let cookieValue = "";

  if (!email && password === adminPassword) {
    cookieValue = createAdminCookie();
  } else {
    const user = await findAdminUser(email || "");

    if (!user || !verifyAdminPassword(password, user.passwordHash)) {
      return NextResponse.json({ ok: false, message: "Incorrect email or password." }, { status: 401 });
    }

    cookieValue = createAdminCookie({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      owner: false,
    });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(cookieName, cookieValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}

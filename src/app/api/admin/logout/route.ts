import { NextResponse } from "next/server";

import { cookieName } from "@/lib/adminAuth";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.delete(cookieName);

  return response;
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { donorCookieName } from "@/lib/donorAuth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(donorCookieName);

  return NextResponse.json({ ok: true });
}

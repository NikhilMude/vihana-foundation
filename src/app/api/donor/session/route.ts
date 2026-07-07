import { NextResponse } from "next/server";

import { getAuthenticatedDonor } from "@/lib/donorAuth";

export const runtime = "nodejs";

export async function GET() {
  const donor = await getAuthenticatedDonor();

  if (!donor) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    name: donor.name,
    email: donor.email,
  });
}

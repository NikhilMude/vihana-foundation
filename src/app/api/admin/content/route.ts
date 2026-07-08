import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/adminAuth";
import { mergeSiteContent, SiteContent } from "@/lib/cmsContent";
import { getSiteContent, invalidateSiteDataCache } from "@/lib/siteData";
import { setDocument } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireAdminPermission("cms:view"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true, content: await getSiteContent({ fresh: true }) });
}

export async function PUT(request: Request) {
  if (!(await requireAdminPermission("cms:edit"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { content } = (await request.json()) as { content?: Partial<SiteContent> };
  const merged = mergeSiteContent(content);

  await setDocument("cms/siteContent", {
    data: JSON.stringify(merged),
    updatedAt: new Date().toISOString(),
  });
  invalidateSiteDataCache();

  return NextResponse.json({ ok: true, content: merged });
}

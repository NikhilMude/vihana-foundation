import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/adminAuth";
import { defaultSiteContent, mergeSiteContent, SiteContent } from "@/lib/cmsContent";
import { getSiteContent } from "@/lib/siteData";
import { setDocument } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true, content: await getSiteContent() });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { content } = (await request.json()) as { content?: Partial<SiteContent> };
  const cleaned = Object.fromEntries(
    Object.keys(defaultSiteContent).map((key) => [
      key,
      String(content?.[key as keyof SiteContent] || defaultSiteContent[key as keyof SiteContent]).trim(),
    ])
  ) as SiteContent;

  const merged = mergeSiteContent(cleaned);

  await setDocument("cms/siteContent", {
    data: JSON.stringify(merged),
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, content: merged });
}

import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/adminAuth";
import { addDocument, deleteDocument } from "@/lib/firestoreAdmin";
import { getGalleryItems, invalidateSiteDataCache } from "@/lib/siteData";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireAdminPermission("cms:view"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true, items: await getGalleryItems({ fresh: true }) });
}

export async function POST(request: Request) {
  if (!(await requireAdminPermission("cms:edit"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = (await request.json()) as {
    title?: string;
    description?: string;
    tag?: string;
    imageUrl?: string;
  };

  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const tag = String(body.tag || "Gallery").trim();
  const imageUrl = String(body.imageUrl || "").trim();

  if (!title || !description) {
    return NextResponse.json({ ok: false, message: "Title and description are required." }, { status: 400 });
  }

  if (imageUrl.length > 850000) {
    return NextResponse.json({ ok: false, message: "Image is too large. Please choose a smaller image." }, { status: 400 });
  }

  const item = await addDocument("galleryItems", {
    title,
    description,
    tag,
    imageUrl,
    createdAt: new Date().toISOString(),
  });
  invalidateSiteDataCache();

  return NextResponse.json({ ok: true, item });
}

export async function DELETE(request: Request) {
  if (!(await requireAdminPermission("cms:edit"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ ok: false, message: "Missing gallery item." }, { status: 400 });
  }

  await deleteDocument(`galleryItems/${id}`);
  invalidateSiteDataCache();

  return NextResponse.json({ ok: true });
}

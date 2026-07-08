import { NextResponse } from "next/server";

import { getAllAdminPermissions, hashAdminPassword, parsePermissions, requireAdminPermission } from "@/lib/adminAuth";
import { addDocument, deleteDocument } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

type AdminUserPayload = {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  permissions?: string[];
};

function clean(value: unknown, limit = 300) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  if (!(await requireAdminPermission("users"))) {
    return NextResponse.json({ ok: false, message: "You do not have access to manage admin users." }, { status: 403 });
  }

  const payload = (await request.json()) as AdminUserPayload;
  const name = clean(payload.name, 160);
  const email = clean(payload.email, 180).toLowerCase();
  const password = clean(payload.password, 160);
  const role = clean(payload.role, 80) || "Admin";
  const permissions = parsePermissions((payload.permissions || []).join(","));

  if (!name || !isEmail(email) || password.length < 8) {
    return NextResponse.json({ ok: false, message: "Name, valid email and 8 character password are required." }, { status: 400 });
  }

  if (!permissions.length) {
    return NextResponse.json({ ok: false, message: "Select at least one module permission." }, { status: 400 });
  }

  const item = await addDocument("adminUsers", {
    name,
    email,
    role,
    permissions: permissions.join(","),
    passwordHash: hashAdminPassword(password),
    status: "Active",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    user: {
      id: item.id,
      name,
      email,
      role,
      permissions: permissions.join(","),
      status: "Active",
      createdAt: item.createdAt,
    },
  });
}

export async function DELETE(request: Request) {
  if (!(await requireAdminPermission("users"))) {
    return NextResponse.json({ ok: false, message: "You do not have access to manage admin users." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = clean(searchParams.get("id"), 200);

  if (!id) {
    return NextResponse.json({ ok: false, message: "Missing user." }, { status: 400 });
  }

  await deleteDocument(`adminUsers/${id}`);

  return NextResponse.json({ ok: true });
}

export async function GET() {
  if (!(await requireAdminPermission("users"))) {
    return NextResponse.json({ ok: false, message: "You do not have access to manage admin users." }, { status: 403 });
  }

  return NextResponse.json({ ok: true, permissions: getAllAdminPermissions() });
}

import { NextResponse } from "next/server";

import { getAllAdminPermissions, hashAdminPassword, parsePermissions, requireAdminPermission } from "@/lib/adminAuth";
import { addDocument, deleteDocument, getDocument, setDocument } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";

type AdminUserPayload = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  permissions?: string[];
  status?: string;
};

function clean(value: unknown, limit = 300) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function userPublicRecord(data: Record<string, string>) {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    permissions: data.permissions,
    status: data.status,
    createdAt: data.createdAt,
  };
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  if (!(await requireAdminPermission("users:create"))) {
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
    user: userPublicRecord({
      id: item.id,
      name,
      email,
      role,
      permissions: permissions.join(","),
      status: "Active",
      createdAt: String(item.createdAt || ""),
    }),
  });
}

export async function PATCH(request: Request) {
  if (!(await requireAdminPermission("users:edit"))) {
    return NextResponse.json({ ok: false, message: "You do not have access to update dashboard users." }, { status: 403 });
  }

  const payload = (await request.json()) as AdminUserPayload;
  const id = clean(payload.id, 220);

  if (!id) {
    return NextResponse.json({ ok: false, message: "Missing user." }, { status: 400 });
  }

  const existing = await getDocument(`adminUsers/${id}`);

  if (!existing) {
    return NextResponse.json({ ok: false, message: "Dashboard user not found." }, { status: 404 });
  }

  const name = clean(payload.name, 160) || String(existing.name || "");
  const email = clean(payload.email, 180).toLowerCase();
  const role = clean(payload.role, 80) || "Admin";
  const password = clean(payload.password, 160);
  const permissions = parsePermissions((payload.permissions || String(existing.permissions || "").split(",")).join(","));

  if (!name || !isEmail(email)) {
    return NextResponse.json({ ok: false, message: "Name and valid email are required." }, { status: 400 });
  }

  if (!permissions.length) {
    return NextResponse.json({ ok: false, message: "Select at least one permission." }, { status: 400 });
  }

  const update: Record<string, string> = {
    name,
    email,
    role,
    permissions: permissions.join(","),
    status: clean(payload.status, 40) || String(existing.status || "Active"),
    updatedAt: new Date().toISOString(),
  };

  if (password) {
    if (password.length < 8) {
      return NextResponse.json({ ok: false, message: "Password must be at least 8 characters." }, { status: 400 });
    }

    update.passwordHash = hashAdminPassword(password);
  }

  await setDocument(`adminUsers/${id}`, update);

  return NextResponse.json({
    ok: true,
    user: userPublicRecord({
      id,
      ...update,
      createdAt: String(existing.createdAt || ""),
    }),
  });
}

export async function DELETE(request: Request) {
  if (!(await requireAdminPermission("users:delete"))) {
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
  if (!(await requireAdminPermission("users:view"))) {
    return NextResponse.json({ ok: false, message: "You do not have access to manage admin users." }, { status: 403 });
  }

  return NextResponse.json({ ok: true, permissions: getAllAdminPermissions() });
}

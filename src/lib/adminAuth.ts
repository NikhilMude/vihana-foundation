import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

import { listDocuments } from "@/lib/firestoreAdmin";

const cookieName = "vihana_admin";
const allAdminPermissions = [
  "cms:view",
  "cms:edit",
  "donations:view",
  "donations:create",
  "donations:edit",
  "donations:delete",
  "receipts:view",
  "receipts:create",
  "accounting:view",
  "accounting:create",
  "accounting:edit",
  "accounting:delete",
  "donors:view",
  "donors:create",
  "donors:edit",
  "donors:delete",
  "reports:view",
  "reports:export",
  "dashboard:test",
  "users:view",
  "users:create",
  "users:edit",
  "users:delete",
  "messages:view",
  "newsletter:view",
  "newsletter:send",
  "visitors:view",
] as const;

export type AdminPermission = (typeof allAdminPermissions)[number];

export type AdminSession = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: AdminPermission[];
  owner: boolean;
};

function secret() {
  return process.env.ADMIN_PASSWORD || "";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const actualBuffer = Buffer.from(a);
  const expectedBuffer = Buffer.from(b);

  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

function ownerSession(): AdminSession {
  return {
    id: "owner",
    name: "Owner Admin",
    email: "owner",
    role: "Owner",
    permissions: [...allAdminPermissions],
    owner: true,
  };
}

export function createAdminCookie(session: AdminSession = ownerSession()) {
  const payload = Buffer.from(
    JSON.stringify({
      ...session,
      permissions: session.owner ? [...allAdminPermissions] : session.permissions,
      timestamp: Date.now(),
    })
  ).toString("base64url");

  return `v2.${payload}.${sign(payload)}`;
}

export function createLegacyAdminCookie() {
  const timestamp = Date.now().toString();
  return `${timestamp}.${sign(timestamp)}`;
}

export function getAllAdminPermissions() {
  return [...allAdminPermissions];
}

export function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${hash}`;
}

export function verifyAdminPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const actual = scryptSync(password, salt, 64).toString("hex");

  return safeEqual(actual, hash);
}

export function parsePermissions(value: unknown): AdminPermission[] {
  const legacyGroups: Record<string, AdminPermission[]> = {
    overview: ["cms:view"],
    pageStudio: ["cms:view", "cms:edit"],
    content: ["cms:view", "cms:edit"],
    email: ["cms:view", "cms:edit"],
    media: ["cms:view", "cms:edit"],
    navigation: ["cms:view", "cms:edit"],
    order: ["cms:view", "cms:edit"],
    sections: ["cms:view", "cms:edit"],
    pages: ["cms:view", "cms:edit"],
    gallery: ["cms:view", "cms:edit"],
    messages: ["messages:view"],
    donations: ["donations:view", "donations:create", "donations:edit", "donations:delete", "receipts:view", "receipts:create", "reports:view", "reports:export"],
    accounting: ["accounting:view", "accounting:create", "accounting:edit", "accounting:delete", "reports:view", "reports:export"],
    dashboardTesting: ["dashboard:test"],
    donors: ["donors:view", "donors:create", "donors:edit", "donors:delete"],
    users: ["users:view", "users:create", "users:edit", "users:delete"],
    subscribers: ["newsletter:view", "newsletter:send"],
    visitors: ["visitors:view"],
  };
  const permissions = String(value || "")
    .split(",")
    .map((item) => item.trim())
    .flatMap((item) => legacyGroups[item] || [item])
    .filter((item): item is AdminPermission => allAdminPermissions.includes(item as AdminPermission));

  return Array.from(new Set(permissions));
}

export async function findAdminUser(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return null;
  }

  const users = await listDocuments("adminUsers");
  const user = users.find((item) => String(item.email || "").toLowerCase() === normalizedEmail);

  if (!user || String(user.status || "Active") !== "Active") {
    return null;
  }

  return {
    id: String(user.id || ""),
    name: String(user.name || ""),
    email: String(user.email || "").toLowerCase(),
    role: String(user.role || "Admin"),
    passwordHash: String(user.passwordHash || ""),
    permissions: parsePermissions(user.permissions),
    status: String(user.status || "Active"),
    createdAt: String(user.createdAt || ""),
  };
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const password = secret();

  if (!password) {
    return null;
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName)?.value;

  if (!cookie) {
    return null;
  }

  if (cookie.startsWith("v2.")) {
    const [, payload, signature] = cookie.split(".");

    if (!payload || !signature || !safeEqual(signature, sign(payload))) {
      return null;
    }

    try {
      const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession & { timestamp?: number };
      const age = Date.now() - Number(parsed.timestamp || 0);

      if (Number.isNaN(age) || age > 1000 * 60 * 60 * 12) {
        return null;
      }

      return {
        id: String(parsed.id || ""),
        name: String(parsed.name || "Admin"),
        email: String(parsed.email || ""),
        role: String(parsed.role || "Admin"),
        permissions: parsed.owner ? [...allAdminPermissions] : parsePermissions(parsed.permissions?.join(",")),
        owner: Boolean(parsed.owner),
      };
    } catch {
      return null;
    }
  }

  const [timestamp, signature] = cookie.split(".");
  const age = Date.now() - Number(timestamp);

  if (!timestamp || !signature || Number.isNaN(age) || age > 1000 * 60 * 60 * 12) {
    return null;
  }

  const expected = sign(timestamp);

  return safeEqual(signature, expected) ? ownerSession() : null;
}

export async function isAdminAuthenticated() {
  return Boolean(await getAdminSession());
}

export async function hasAdminPermission(permission: AdminPermission) {
  const session = await getAdminSession();

  return Boolean(session?.owner || session?.permissions.includes(permission));
}

export async function requireAdminPermission(permission: AdminPermission) {
  return hasAdminPermission(permission);
}

export { cookieName };

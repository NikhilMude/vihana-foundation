import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

import { getDocument, setDocument } from "@/lib/firestoreAdmin";

export const donorCookieName = "vihana_donor";

export type DonorAccount = {
  id: string;
  name: string;
  email: string;
  phone: string;
  donorType: string;
  pan: string;
  address: string;
  createdAt: string;
};

function authSecret() {
  return process.env.DONOR_AUTH_SECRET || process.env.ADMIN_PASSWORD || process.env.RESEND_API_KEY || "";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function donorDocumentId(email: string) {
  return Buffer.from(normalizeEmail(email)).toString("base64url");
}

function sign(value: string) {
  return createHmac("sha256", authSecret()).update(value).digest("hex");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const actual = Buffer.from(scryptSync(password, salt, 64).toString("hex"));
  const expected = Buffer.from(hash);

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createDonorCookie(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const encodedEmail = Buffer.from(normalizedEmail).toString("base64url");
  const timestamp = Date.now().toString();
  const payload = `${encodedEmail}.${timestamp}`;

  return `${payload}.${sign(payload)}`;
}

export async function getAuthenticatedDonorEmail() {
  const secret = authSecret();

  if (!secret) {
    return "";
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get(donorCookieName)?.value;

  if (!cookie) {
    return "";
  }

  const [encodedEmail, timestamp, signature] = cookie.split(".");
  const age = Date.now() - Number(timestamp);

  if (!encodedEmail || !timestamp || !signature || Number.isNaN(age) || age > 1000 * 60 * 60 * 24 * 30) {
    return "";
  }

  const payload = `${encodedEmail}.${timestamp}`;
  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);

  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return "";
  }

  return Buffer.from(encodedEmail, "base64url").toString("utf8");
}

export async function getAuthenticatedDonor() {
  const email = await getAuthenticatedDonorEmail();

  if (!email) {
    return null;
  }

  const donor = await getDocument(`donors/${donorDocumentId(email)}`);

  if (!donor) {
    return null;
  }

  return {
    id: String(donor.id || ""),
    name: String(donor.name || ""),
    email: String(donor.email || ""),
    phone: String(donor.phone || ""),
    donorType: String(donor.donorType || "Indian Citizen"),
    pan: String(donor.pan || ""),
    address: String(donor.address || ""),
    createdAt: String(donor.createdAt || ""),
  } satisfies DonorAccount;
}

export async function saveDonorAccount(account: DonorAccount & { passwordHash: string }) {
  await setDocument(`donors/${donorDocumentId(account.email)}`, account);
}

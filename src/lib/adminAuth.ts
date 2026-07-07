import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "vihana_admin";

function secret() {
  return process.env.ADMIN_PASSWORD || "";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createAdminCookie() {
  const timestamp = Date.now().toString();
  return `${timestamp}.${sign(timestamp)}`;
}

export async function isAdminAuthenticated() {
  const password = secret();

  if (!password) {
    return false;
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName)?.value;

  if (!cookie) {
    return false;
  }

  const [timestamp, signature] = cookie.split(".");
  const age = Date.now() - Number(timestamp);

  if (!timestamp || !signature || Number.isNaN(age) || age > 1000 * 60 * 60 * 12) {
    return false;
  }

  const expected = sign(timestamp);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export { cookieName };

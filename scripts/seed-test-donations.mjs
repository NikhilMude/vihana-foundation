import { createSign, randomBytes, scryptSync } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const donationSchedule = [
  ["100", "2025-02-20", "UPI", "Health Support"],
  ["200", "2025-12-20", "UPI", "General Fund"],
  ["300", "2024-10-16", "Bank Transfer", "Health Support"],
  ["400", "2024-12-20", "QR Code", "General Fund"],
  ["500", "2025-01-01", "UPI", "Health Support"],
  ["600", "2025-02-02", "UPI", "General Fund"],
  ["700", "2025-03-06", "Bank Transfer", "Health Support"],
  ["800", "2025-04-07", "QR Code", "General Fund"],
  ["900", "2025-05-09", "UPI", "Health Support"],
  ["1000", "2025-06-10", "UPI", "General Fund"],
  ["1100", "2025-07-12", "Bank Transfer", "Health Support"],
  ["1200", "2025-08-13", "QR Code", "General Fund"],
  ["1300", "2025-09-14", "UPI", "Health Support"],
  ["1400", "2025-10-16", "UPI", "General Fund"],
  ["1500", "2025-11-17", "Bank Transfer", "Health Support"],
  ["1600", "2025-12-19", "QR Code", "General Fund"],
  ["1700", "2026-01-20", "UPI", "Health Support"],
  ["1800", "2026-02-21", "UPI", "General Fund"],
  ["1900", "2026-03-25", "Bank Transfer", "Health Support"],
  ["2000", "2026-04-26", "QR Code", "General Fund"],
  ["2100", "2026-05-28", "UPI", "Health Support"],
  ["2200", "2026-03-31", "UPI", "General Fund"],
  ["2300", "2026-04-10", "Bank Transfer", "Health Support"],
  ["2400", "2026-05-11", "QR Code", "General Fund"],
  ["2500", "2026-06-11", "UPI", "Health Support"],
  ["2600", "2026-07-05", "UPI", "General Fund"],
];

const donors = [
  { name: "Vihana", email: "vihu@gmail.com", phone: "1234567896", password: "password123", range: [0, 26] },
  { name: "Nikhil1", email: "nikhil1@gmail.com", phone: "1234567896", password: "password123", range: [0, 4] },
  { name: "Nikhil2", email: "nikhil2@gmail.com", phone: "1234567896", password: "password123", range: [4, 9] },
  { name: "Nikhil3", email: "nikhil3@gmail.com", phone: "1234567896", password: "password123", range: [9, 15] },
  { name: "Nikhil4", email: "nikhil4@gmail.com", phone: "1234567896", password: "password123", range: [15, 22] },
  { name: "Nikhil5", email: "nikhil5@gmail.com", phone: "1234567896", password: "password123", range: [22, 26] },
];

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = rest.join("=").replace(/^["']|["']$/g, "");
    }
  }
}

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function accessToken() {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey || !process.env.FIREBASE_PROJECT_ID) {
    throw new Error("Firebase admin credentials are missing in .env.local.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  }));
  const unsignedJwt = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedJwt);
  signer.end();
  const signature = signer.sign(privateKey, "base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsignedJwt}.${signature}` }),
  });
  if (!response.ok) throw new Error("Could not authenticate with Firebase.");
  return (await response.json()).access_token;
}

function encodeFields(data) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => {
    if (typeof value === "number") return [key, { integerValue: String(value) }];
    if (typeof value === "boolean") return [key, { booleanValue: value }];
    if (key.toLowerCase().includes("createdat") || key.toLowerCase().includes("issuedat") || key.toLowerCase().includes("updatedat")) {
      return [key, { timestampValue: String(value) }];
    }
    return [key, { stringValue: String(value ?? "") }];
  }));
}

async function setDocument(token, path, data) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields: encodeFields(data) }),
  });
  if (!response.ok) {
    throw new Error(`Could not save ${path}: ${await response.text()}`);
  }
}

function donorDocumentId(email) {
  return Buffer.from(email.trim().toLowerCase()).toString("base64url");
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function receiptNumber(index) {
  return `VF/TEST/${String(index + 1).padStart(4, "0")}`;
}

function isoAt(date, hour = "10:00:00") {
  return `${date}T${hour}.000+05:30`;
}

loadEnv();
const token = await accessToken();
let donationIndex = 0;

for (const donor of donors) {
  const donorId = donorDocumentId(donor.email);
  await setDocument(token, `donors/${donorId}`, {
    id: donorId,
    name: donor.name,
    email: donor.email,
    phone: donor.phone,
    donorType: "Indian Citizen",
    pan: "",
    address: "Test donor address for dashboard validation",
    passwordHash: hashPassword(donor.password),
    createdAt: isoAt("2024-10-01"),
  });

  const [start, end] = donor.range;
  for (let scheduleIndex = start; scheduleIndex < end; scheduleIndex += 1) {
    const [amount, date, method, purpose] = donationSchedule[scheduleIndex];
    const receipt = receiptNumber(donationIndex);
    const donationId = `seed-${donorId}-${scheduleIndex + 1}`;
    await setDocument(token, `donationIntents/${donationId}`, {
      id: donationId,
      name: donor.name,
      email: donor.email,
      phone: donor.phone,
      amount,
      method,
      transactionId: `${method.toUpperCase().replace(/\s+/g, "-")}-TEST-${String(donationIndex + 1).padStart(4, "0")}`,
      donorType: "Indian Citizen",
      frequency: "One Time",
      purpose,
      pan: "",
      address: "Test donor address for dashboard validation",
      receiptRequired: "Yes",
      donorEmail: donor.email,
      message: "Seeded from Test donation Data.xlsx for dashboard testing.",
      status: "Test payment received / receipt generated",
      receiptNumber: receipt,
      receiptStatus: "Test receipt generated",
      receiptIssuedAt: isoAt(date, "10:30:00"),
      createdAt: isoAt(date),
    });

    await setDocument(token, `accountingRecords/${donationId}`, {
      id: donationId,
      type: "Receipt",
      title: `Donation received from ${donor.name}`,
      amount,
      category: purpose,
      date,
      party: donor.name,
      reference: receipt,
      status: "Received",
      notes: `Seeded test record. Payment method: ${method}.`,
      documentUrl: "",
      createdAt: isoAt(date),
    });
    donationIndex += 1;
  }
}

console.log(`Seed complete: ${donors.length} donors and ${donationIndex} donations/receipts.`);

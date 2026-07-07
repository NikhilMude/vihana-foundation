import { createSign } from "crypto";

type FirestoreValue =
  | { stringValue: string }
  | { timestampValue: string }
  | { integerValue: string }
  | { booleanValue: boolean };

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
  createTime?: string;
  updateTime?: string;
};

let cachedToken: { token: string; expiresAt: number } | null = null;

function getFirebaseConfig() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase admin credentials are not configured.");
  }

  return { projectId, clientEmail, privateKey };
}

function base64Url(input: string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) {
    return cachedToken.token;
  }

  const { clientEmail, privateKey } = getFirebaseConfig();
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/datastore",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  );
  const unsignedJwt = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");

  signer.update(unsignedJwt);
  signer.end();

  const signature = signer
    .sign(privateKey, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const jwt = `${unsignedJwt}.${signature}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not authenticate with Firebase.");
  }

  const result = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: result.access_token,
    expiresAt: Date.now() + result.expires_in * 1000,
  };

  return cachedToken.token;
}

function apiBase() {
  const { projectId } = getFirebaseConfig();
  return `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;
}

function encodeFields(data: Record<string, string | boolean | number>) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (typeof value === "boolean") {
        return [key, { booleanValue: value }];
      }

      if (typeof value === "number") {
        return [key, { integerValue: value.toString() }];
      }

      if (key.toLowerCase().includes("createdat") || key.toLowerCase().includes("updatedat")) {
        return [key, { timestampValue: value }];
      }

      return [key, { stringValue: value }];
    })
  );
}

function decodeField(value: FirestoreValue) {
  if ("stringValue" in value) {
    return value.stringValue;
  }

  if ("timestampValue" in value) {
    return value.timestampValue;
  }

  if ("integerValue" in value) {
    return Number(value.integerValue);
  }

  if ("booleanValue" in value) {
    return value.booleanValue;
  }

  return "";
}

export function decodeDocument(document: FirestoreDocument): { id: string } & Record<string, string | number | boolean> {
  const id = document.name.split("/").pop() || "";
  const fields = Object.fromEntries(
    Object.entries(document.fields || {}).map(([key, value]) => [key, decodeField(value)])
  );

  return { id, ...fields };
}

export async function getDocument(path: string) {
  const token = await getAccessToken();
  const response = await fetch(`${apiBase()}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Could not read Firebase document.");
  }

  return decodeDocument((await response.json()) as FirestoreDocument);
}

export async function setDocument(path: string, data: Record<string, string | boolean | number>) {
  const token = await getAccessToken();
  const response = await fetch(`${apiBase()}/${path}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: encodeFields(data),
    }),
  });

  if (!response.ok) {
    throw new Error("Could not save Firebase document.");
  }

  return decodeDocument((await response.json()) as FirestoreDocument);
}

export async function addDocument(collection: string, data: Record<string, string | boolean | number>) {
  const token = await getAccessToken();
  const response = await fetch(`${apiBase()}/${collection}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: encodeFields(data),
    }),
  });

  if (!response.ok) {
    throw new Error("Could not create Firebase document.");
  }

  return decodeDocument((await response.json()) as FirestoreDocument);
}

export async function deleteDocument(path: string) {
  const token = await getAccessToken();
  const response = await fetch(`${apiBase()}/${path}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not delete Firebase document.");
  }
}

export async function listDocuments(collection: string) {
  const token = await getAccessToken();
  const response = await fetch(`${apiBase()}/${collection}?pageSize=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Could not list Firebase documents.");
  }

  const result = (await response.json()) as { documents?: FirestoreDocument[] };
  return (result.documents || []).map(decodeDocument);
}

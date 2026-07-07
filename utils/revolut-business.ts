import { createPrivateKey, randomUUID, sign } from "node:crypto";

const REVOLUT_API_BASE_URL = "https://b2b.revolut.com";
const REVOLUT_TOKEN_PATH = "/api/1.0/auth/token";
const REVOLUT_JWT_AUDIENCE = "https://revolut.com";

function base64Url(value: Buffer | string) {
  return Buffer.from(value).toString("base64url");
}

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function createClientAssertion() {
  const clientId = getRequiredEnv("REVOLUT_CLIENT_ID");
  const issuer = process.env.REVOLUT_JWT_ISSUER?.trim() || process.env.REVOLUT_CLIENT_ASSERTION_ISSUER?.trim() || "www.jeroenandpaws.com";
  const privateKey = getRequiredEnv("REVOLUT_PRIVATE_KEY").replace(/\\n/g, "\n");
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    aud: REVOLUT_JWT_AUDIENCE,
    exp: now + 300,
    iat: now,
    iss: issuer,
    jti: randomUUID(),
    sub: clientId,
  };
  const signingInput = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(payload))}`;
  const signature = sign("RSA-SHA256", Buffer.from(signingInput), createPrivateKey(privateKey));

  return `${signingInput}.${signature.toString("base64url")}`;
}

export async function getRevolutAccessToken() {
  const refreshToken = getRequiredEnv("REVOLUT_REFRESH_TOKEN");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    client_assertion: createClientAssertion(),
  });
  const response = await fetch(`${REVOLUT_API_BASE_URL}${REVOLUT_TOKEN_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await response.json().catch(() => null) as { access_token?: string } | null;

  if (!response.ok || !data?.access_token) {
    throw new Error(`Revolut token request failed (${response.status}).`);
  }

  return data.access_token;
}

export async function revolutBusinessGet<T>(path: string, query?: Record<string, string | number | undefined>) {
  const token = await getRevolutAccessToken();
  const url = new URL(path, REVOLUT_API_BASE_URL);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim()) url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString(), {
    cache: "no-store",
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  });
  const data = await response.json().catch(() => null) as T;

  if (!response.ok) throw new Error(`Revolut API request failed (${response.status}).`);

  return data;
}
export type PortalAuthSession = { accessToken: string; refreshToken: string; expiresIn: number; user: { phone?: string; email?: string } };

async function postJson<T>(baseUrl: string, path: string, body: Record<string, unknown>) {
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const payload = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(payload.error || "Authentication failed.");
  return payload;
}

export function startPortalPhoneRegistration(baseUrl: string, input: { phone: string; email?: string; fullName: string; inviteCode: string }) {
  return postJson<{ challengeId: string; expiresAt: string }>(baseUrl, "/api/portal/auth/start", input);
}

export function verifyPortalPhoneRegistration(baseUrl: string, input: { challengeId: string; code: string; password: string; redirectTo: string }) {
  return postJson<PortalAuthSession>(baseUrl, "/api/portal/auth/verify", input);
}

export function registerPortalByEmail(baseUrl: string, input: { inviteCode: string; fullName: string; email: string; password: string; redirectTo: string }) {
  return postJson<{ ok: true }>(baseUrl, "/api/portal/auth/register-email", input);
}
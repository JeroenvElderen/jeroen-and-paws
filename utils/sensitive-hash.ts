import { createHash } from "node:crypto";

export function hashSensitiveValue(value: string) {
  const secret = process.env.PORTAL_AUTH_HASH_SECRET;
  if (!secret) throw new Error("Portal authentication is not configured.");
  return createHash("sha256").update(`${secret}:${value}`).digest("hex");
}
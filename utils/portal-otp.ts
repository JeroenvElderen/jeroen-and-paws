import { randomInt, timingSafeEqual } from "node:crypto";

import { hashSensitiveValue } from "@/utils/sensitive-hash";

export const OTP_LIFETIME_MS = 10 * 60_000;

export function generateOtp() {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export function hashOtp(code: string) {
  return hashSensitiveValue(code);
}

export function otpExpiresAt(now = Date.now()) {
  return new Date(now + OTP_LIFETIME_MS).toISOString();
}

export function verifyOtp(code: string, expectedHash: string, expiresAt: string, now = Date.now()) {
  if (new Date(expiresAt).getTime() <= now) return false;

  const submittedHash = Buffer.from(hashOtp(code), "hex");
  const storedHash = Buffer.from(expectedHash, "hex");
  return submittedHash.length === storedHash.length && timingSafeEqual(submittedHash, storedHash);
}
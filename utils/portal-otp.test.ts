import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { generateOtp, hashOtp, OTP_LIFETIME_MS, otpExpiresAt, verifyOtp } from "./portal-otp";

describe("portal OTP", () => {
  beforeEach(() => {
    process.env.PORTAL_AUTH_HASH_SECRET = "test-hash-secret";
  });

  afterEach(() => {
    delete process.env.PORTAL_AUTH_HASH_SECRET;
  });

  it("generates exactly six numeric digits", () => {
    for (let index = 0; index < 100; index += 1) {
      expect(generateOtp()).toMatch(/^\d{6}$/);
    }
  });

  it("hashes OTPs without retaining the plaintext", () => {
    const hash = hashOtp("042381");

    expect(hash).toMatch(/^[a-f\d]{64}$/);
    expect(hash).toBe(hashOtp("042381"));
    expect(hash).not.toContain("042381");
  });

  it("sets OTP expiry to ten minutes", () => {
    const now = Date.parse("2026-07-29T12:00:00.000Z");

    expect(Date.parse(otpExpiresAt(now)) - now).toBe(OTP_LIFETIME_MS);
  });

  it("successfully verifies a matching code before expiry", () => {
    expect(verifyOtp("042381", hashOtp("042381"), "2026-07-29T12:10:00.000Z", Date.parse("2026-07-29T12:05:00.000Z"))).toBe(true);
  });

  it("rejects an incorrect code", () => {
    expect(verifyOtp("123456", hashOtp("042381"), "2026-07-29T12:10:00.000Z", Date.parse("2026-07-29T12:05:00.000Z"))).toBe(false);
  });

  it("rejects an expired code", () => {
    expect(verifyOtp("042381", hashOtp("042381"), "2026-07-29T12:10:00.000Z", Date.parse("2026-07-29T12:10:00.000Z"))).toBe(false);
  });
});
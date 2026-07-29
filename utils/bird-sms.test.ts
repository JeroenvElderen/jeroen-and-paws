import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { sendOtpSms } from "./bird-sms";

describe("Bird SMS client", () => {
  beforeEach(() => {
    process.env.BIRD_ACCESS_KEY = "test-access-key";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete process.env.BIRD_ACCESS_KEY;
  });

  it("sends an OTP through the Bird SMS template", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: "accepted" }), { status: 202 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "info").mockImplementation(() => undefined);

    await expect(sendOtpSms("+31612345678", "042381")).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith("https://eu1.platform.bird.com/v1/sms/messages", {
      method: "POST",
      headers: {
        Authorization: "Bearer test-access-key",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "+31612345678",
        template: {
          name: "bird_otp_verification",
          parameters: { code: "042381" },
        },
      }),
    });
  });

  it("logs provider details and returns a friendly error when Bird rejects the SMS", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ errors: [{ message: "Template not found" }] }), { status: 400 })));

    await expect(sendOtpSms("+31612345678", "042381")).rejects.toThrow("Unable to send the security code right now. Please try again.");
    expect(consoleError).toHaveBeenCalledWith("Bird SMS request failed", {
      status: 400,
      message: "Template not found",
      recipient: "+31612345678",
    });
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain("042381");
  });
});
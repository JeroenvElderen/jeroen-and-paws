import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { sendBirdOtp, verifyBirdOtp } from "./bird-verify";

describe("Bird Verify client", () => {
  beforeEach(() => {
    process.env.BIRD_ACCESS_KEY = "bk_test_secret";
    process.env.BIRD_WORKSPACE_ID = "workspace-id";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.BIRD_ACCESS_KEY;
    delete process.env.BIRD_WORKSPACE_ID;
  });

  it("starts an SMS verification using the server-side Bird access key", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "verification-id", status: "pending" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendBirdOtp("+31612345678")).resolves.toBe("verification-id");
    expect(fetchMock).toHaveBeenCalledWith("https://api.bird.com/workspaces/workspace-id/verify", expect.objectContaining({
      method: "POST",
      headers: expect.objectContaining({ Authorization: "AccessKey bk_test_secret" }),
      body: JSON.stringify({ recipient: "+31612345678", type: "sms", timeout: 300, codeLength: 6, maxAttempts: 5 }),
    }));
  });

  it("verifies a code against the Bird verification ID", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: "verified" }), { status: 200 })));
    await expect(verifyBirdOtp("verification-id", "123456")).resolves.toBe(true);
  });

  it("rejects legacy access keys", async () => {
    process.env.BIRD_ACCESS_KEY = "legacy-key";
    await expect(sendBirdOtp("+31612345678")).rejects.toThrow("Bird Verify is not configured.");
  });
});
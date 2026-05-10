import { describe, expect, it } from "vitest";

import { POST } from "./route";

describe("contact API", () => {
  it("rejects malformed JSON", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: "not-json",
      }),
    );

    expect(response.status).toBe(400);
  });

  it("validates required fields", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({ email: "bad-email" }),
      }),
    );

    expect(response.status).toBe(400);
  });

  it("silently accepts honeypot submissions", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Bot",
          email: "bot@example.com",
          message: "Hello",
          company: "Spam Ltd",
        }),
      }),
    );

    expect(response.status).toBe(200);
  });
});

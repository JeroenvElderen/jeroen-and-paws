import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { maybeSingle } = vi.hoisted(() => ({ maybeSingle: vi.fn() }));

vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          eq: () => ({ maybeSingle }),
        }),
      }),
    }),
  }),
}));

import { GET } from "./route";

describe("Android app download", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("streams the configured APK with a stable filename", async () => {
    maybeSingle.mockResolvedValue({ data: { download_url: "https://example.com/generated-name.apk" }, error: null });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("apk contents", {
      headers: { "Content-Length": "12", "Content-Type": "application/octet-stream" },
    })));

    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-disposition")).toBe('attachment; filename="jeroen-and-paws.apk"');
    expect(response.headers.get("content-type")).toBe("application/vnd.android.package-archive");
    expect(response.headers.get("content-length")).toBe("12");
    expect(await response.text()).toBe("apk contents");
    expect(fetch).toHaveBeenCalledWith("https://example.com/generated-name.apk", { cache: "no-store" });
  });

  it("returns not found when no Android APK is configured", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: null });

    const response = await GET();

    expect(response.status).toBe(404);
  });

  it("does not expose an upstream download failure", async () => {
    maybeSingle.mockResolvedValue({ data: { download_url: "https://example.com/app.apk" }, error: null });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 500 })));

    const response = await GET();

    expect(response.status).toBe(502);
  });
});

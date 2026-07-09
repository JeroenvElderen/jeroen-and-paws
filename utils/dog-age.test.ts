import { describe, expect, it } from "vitest";

import { formatDogAge } from "./dog-age";

describe("formatDogAge", () => {
  it("formats an ISO date of birth as years, months, and days", () => {
    expect(formatDogAge("2020-05-10", new Date(2026, 6, 9))).toBe("6 years, 1 month, 29 days");
  });

  it("keeps legacy free-text ages unchanged", () => {
    expect(formatDogAge("3-ish")).toBe("3-ish");
  });
});
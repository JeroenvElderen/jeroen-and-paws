import { describe, expect, it } from "vitest";

import { createPortalRegistrationCode } from "./portal-registration-code";

describe("portal registration codes", () => {
  it("builds a branded code from one dog name", () => {
    expect(createPortalRegistrationCode("Milo", 2026)).toBe("MILO-Jeroen&Paws-2026");
  });

  it("joins multiple normalized dog names", () => {
    expect(createPortalRegistrationCode("Luna, Mr. Béar", 2026)).toBe("LUNA&MR-BEAR-Jeroen&Paws-2026");
  });

  it("rejects an empty dog-name segment", () => {
    expect(() => createPortalRegistrationCode(" , & ", 2026)).toThrow("Enter at least one dog name.");
  });
});

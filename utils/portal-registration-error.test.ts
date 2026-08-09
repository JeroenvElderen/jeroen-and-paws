import { describe, expect, it } from "vitest";

import { getEmailRegistrationError } from "./portal-registration-error";

describe("email registration errors", () => {
  it.each(["email_exists", "user_already_exists"])("maps Supabase %s errors to a login prompt", (code) => {
    expect(getEmailRegistrationError({ code, message: "Auth failed" })).toEqual({
      message: "An account already exists for this email address. Please log in instead.",
      status: 409,
    });
  });

  it("explains when invite registration cannot send its confirmation email", () => {
    expect(getEmailRegistrationError(new Error("Resend is not configured. Add RESEND_API_KEY to send confirmation emails."))).toEqual({
      message: "Confirmation email is temporarily unavailable. Please contact Jeroen & Paws for help.",
      status: 503,
    });
  });

  it("does not expose unexpected provider or database details", () => {
    expect(getEmailRegistrationError(new Error("secret provider response"))).toEqual({
      message: "Unable to create the account right now. Please try again later.",
      status: 500,
    });
  });
});

type RegistrationError = {
  code?: string;
  message?: string;
};

export function getEmailRegistrationError(error: unknown) {
  const authError = error as RegistrationError | null;
  const code = authError?.code?.toLowerCase() ?? "";
  const message = authError?.message ?? "";

  if (
    code === "email_exists" ||
    code === "user_already_exists" ||
    /already (?:been )?registered|already exists/i.test(message)
  ) {
    return {
      message: "An account already exists for this email address. Please log in instead.",
      status: 409,
    } as const;
  }

  if (/resend is not configured/i.test(message)) {
    return {
      message: "Confirmation email is temporarily unavailable. Please contact Jeroen & Paws for help.",
      status: 503,
    } as const;
  }

  return {
    message: "Unable to create the account right now. Please try again later.",
    status: 500,
  } as const;
}

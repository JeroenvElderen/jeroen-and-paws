import { readFile } from "node:fs/promises";
import path from "node:path";

const confirmationTemplatePath = path.join(process.cwd(), "supabase/email-templates/confirm-signup.html");

export async function renderConfirmationEmail(confirmationUrl: string) {
  const template = await readFile(confirmationTemplatePath, "utf8");

  return template.replaceAll("{{ .ConfirmationURL }}", confirmationUrl);
}

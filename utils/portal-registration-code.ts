const registrationCodeSuffix = "Jeroen&Paws";

export function createPortalRegistrationCode(dogNames: string, year = new Date().getUTCFullYear()) {
  const names = dogNames
    .split(/[,&]+/)
    .map((name) => name.trim().normalize("NFKD").replace(/[\u0300-\u036f]/g, ""))
    .map((name) => name.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, ""))
    .filter(Boolean);

  if (!names.length) throw new Error("Enter at least one dog name.");

  return `${names.join("&").toUpperCase()}-${registrationCodeSuffix}-${year}`;
}

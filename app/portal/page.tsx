import { Header } from "@/components/site/layout/header";
import { PortalShell } from "@/components/portal/portal-shell";

export const metadata = {
  title: "Customer Portal | Jeroen & Paws",
  description:
    "A warm customer portal concept for Jeroen & Paws to view bookings, care updates, photos, invoices, and keepsakes.",
};

export default async function PortalPage({
  searchParams,
}: {
  searchParams: Promise<{ invite?: string | string[] }>;
}) {
  const invite = (await searchParams).invite;
  const inviteCode = typeof invite === "string" ? invite : "";

  return (
    <>
      <Header activePage="portal" />
      <PortalShell inviteCode={inviteCode} />
    </>
  );
}

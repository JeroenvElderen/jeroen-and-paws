import { Header } from "@/components/site/layout/header";
import { PortalShell } from "@/components/portal/portal-shell";

export const metadata = {
  title: "Customer Portal | Jeroen & Paws",
  description:
    "A warm customer portal concept for Jeroen & Paws to view bookings, care updates, photos, invoices, and keepsakes.",
};

export default function PortalPage() {
  return (
    <>
      <Header activePage="portal" />
      <PortalShell />
    </>
  );
}
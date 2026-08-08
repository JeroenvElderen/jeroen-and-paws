import { BackendDashboard } from "@/components/backend/backend-dashboard";

export const metadata = { title: "Mobile App | Jeroen & Paws Admin" };

export default function MobileAppAdminPage() {
  return <BackendDashboard initialView="mobile-app" />;
}

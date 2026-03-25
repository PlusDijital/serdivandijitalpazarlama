import { redirect } from "next/navigation";
import AdminPanelClient from "@/components/admin/AdminPanelClient";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { getCmsData } from "@/lib/cms";

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    redirect("/admin/login");
  }

  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const cms = await getCmsData();
  return <AdminPanelClient initialData={cms} />;
}

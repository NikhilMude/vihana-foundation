import { redirect } from "next/navigation";

import { isAdminAuthenticated } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/operations");
  }

  redirect("/donor");
}

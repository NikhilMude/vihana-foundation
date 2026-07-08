import { redirect } from "next/navigation";

import AdminOperationsDashboard from "@/components/admin/AdminOperationsDashboard";
import { getAdminSession, getAllAdminPermissions } from "@/lib/adminAuth";
import { listDocuments } from "@/lib/firestoreAdmin";
import { getDonationIntents, getSiteContent } from "@/lib/siteData";

export const dynamic = "force-dynamic";

type Donor = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
};

type AccountingRecord = {
  id: string;
  type?: string;
  title?: string;
  amount?: string;
  date?: string;
};

type AdminUser = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  permissions?: string;
  status?: string;
  createdAt?: string;
};

export default async function AdminOperationsPage() {
  const currentAdmin = await getAdminSession();

  if (!currentAdmin) {
    redirect("/donor");
  }

  const [content, donations, donors, accountingRecords, adminUsers] = await Promise.all([
    getSiteContent({ fresh: true }),
    currentAdmin.owner || currentAdmin.permissions.includes("donations:view") || currentAdmin.permissions.includes("reports:view") ? getDonationIntents() : Promise.resolve([]),
    currentAdmin.owner || currentAdmin.permissions.includes("donors:view")
      ? listDocuments("donors")
          .then((items) =>
            items
              .map((donor) => ({
                id: String(donor.id || ""),
                name: String(donor.name || ""),
                email: String(donor.email || ""),
                phone: String(donor.phone || ""),
                createdAt: String(donor.createdAt || ""),
              }))
              .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
          )
          .catch(() => [] as Donor[])
      : Promise.resolve([]),
    currentAdmin.owner || currentAdmin.permissions.includes("accounting:view") || currentAdmin.permissions.includes("reports:view")
      ? listDocuments("accountingRecords")
          .then((items) =>
            items
              .map((record) => ({
                id: String(record.id || ""),
                type: String(record.type || ""),
                title: String(record.title || ""),
                amount: String(record.amount || ""),
                date: String(record.date || ""),
              }))
              .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
          )
          .catch(() => [] as AccountingRecord[])
      : Promise.resolve([]),
    currentAdmin.owner || currentAdmin.permissions.includes("users:view")
      ? listDocuments("adminUsers")
          .then((items) =>
            items
              .map((user) => ({
                id: String(user.id || ""),
                name: String(user.name || ""),
                email: String(user.email || ""),
                role: String(user.role || ""),
                permissions: String(user.permissions || ""),
                status: String(user.status || ""),
                createdAt: String(user.createdAt || ""),
              }))
              .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
          )
          .catch(() => [] as AdminUser[])
      : Promise.resolve([]),
  ]);

  return (
    <AdminOperationsDashboard
      currentAdmin={currentAdmin}
      content={content}
      adminUsers={adminUsers}
      donations={donations}
      donors={donors}
      accountingRecords={accountingRecords}
      allPermissions={getAllAdminPermissions()}
    />
  );
}

import { redirect } from "next/navigation";

import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAdminSession } from "@/lib/adminAuth";
import { listDocuments } from "@/lib/firestoreAdmin";
import {
  getDonationIntents,
  getGalleryItems,
  getNewsletterSubscribers,
  getRecentVisitors,
  getSiteContent,
  getVisitorStats,
} from "@/lib/siteData";

export const dynamic = "force-dynamic";

type Message = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  createdAt?: string;
};

type Donor = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  donorType?: string;
  pan?: string;
  address?: string;
  createdAt?: string;
};

type AccountingRecord = {
  id: string;
  type?: string;
  title?: string;
  amount?: string;
  category?: string;
  date?: string;
  party?: string;
  reference?: string;
  status?: string;
  notes?: string;
  documentUrl?: string;
  createdAt?: string;
};

export default async function AdminDashboardPage() {
  const currentAdmin = await getAdminSession();

  if (!currentAdmin) {
    redirect("/donor");
  }

  const cmsPermissions = ["overview", "pageStudio", "content", "email", "media", "navigation", "order", "sections", "pages", "gallery"];

  if (!currentAdmin.owner && !currentAdmin.permissions.some((permission) => cmsPermissions.includes(permission))) {
    redirect("/admin/operations");
  }

  const [
    content,
    galleryItems,
    visitorStats,
    visitors,
    donations,
    subscribers,
    messages,
    donors,
    accountingRecords,
  ] = await Promise.all([
    getSiteContent({ fresh: true }),
    getGalleryItems({ fresh: true }),
    getVisitorStats(),
    getRecentVisitors(),
    getDonationIntents(),
    getNewsletterSubscribers(),
    listDocuments("websiteMessages")
      .then((items) =>
        items
          .map((message) => ({
            id: String(message.id || ""),
            name: String(message.name || ""),
            email: String(message.email || ""),
            phone: String(message.phone || ""),
            interest: String(message.interest || ""),
            message: String(message.message || ""),
            createdAt: String(message.createdAt || ""),
          }))
          .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
      )
      .catch(() => [] as Message[]),
    listDocuments("donors")
      .then((items) =>
        items
          .map((donor) => ({
            id: String(donor.id || ""),
            name: String(donor.name || ""),
            email: String(donor.email || ""),
            phone: String(donor.phone || ""),
            donorType: String(donor.donorType || ""),
            pan: String(donor.pan || ""),
            address: String(donor.address || ""),
            createdAt: String(donor.createdAt || ""),
          }))
          .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
      )
      .catch(() => [] as Donor[]),
    listDocuments("accountingRecords")
      .then((items) =>
        items
          .map((record) => ({
            id: String(record.id || ""),
            type: String(record.type || ""),
            title: String(record.title || ""),
            amount: String(record.amount || ""),
            category: String(record.category || ""),
            date: String(record.date || ""),
            party: String(record.party || ""),
            reference: String(record.reference || ""),
            status: String(record.status || ""),
            notes: String(record.notes || ""),
            documentUrl: String(record.documentUrl || ""),
            createdAt: String(record.createdAt || ""),
          }))
          .sort((a, b) => String(b.date || b.createdAt || "").localeCompare(String(a.date || a.createdAt || "")))
      )
      .catch(() => [] as AccountingRecord[]),
  ]);

  return (
    <AdminDashboard
      initialContent={content}
      initialGalleryItems={galleryItems}
      initialMessages={messages}
      initialVisitors={visitors}
      visitorCount={visitorStats.total}
      initialDonations={donations}
      initialDonors={donors}
      initialSubscribers={subscribers}
      initialAccountingRecords={accountingRecords}
    />
  );
}

import { redirect } from "next/navigation";

import AdminDashboard from "@/components/admin/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/adminAuth";
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

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  let messages: Message[] = [];
  let donors: Donor[] = [];
  const visitorStats = await getVisitorStats();
  const visitors = await getRecentVisitors();
  const donations = await getDonationIntents();
  const subscribers = await getNewsletterSubscribers();

  try {
    messages = (await listDocuments("websiteMessages"))
      .map((message) => ({
        id: String(message.id || ""),
        name: String(message.name || ""),
        email: String(message.email || ""),
        phone: String(message.phone || ""),
        interest: String(message.interest || ""),
        message: String(message.message || ""),
        createdAt: String(message.createdAt || ""),
      }))
      .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  } catch {
    messages = [];
  }

  try {
    donors = (await listDocuments("donors"))
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
      .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  } catch {
    donors = [];
  }

  return (
    <AdminDashboard
      initialContent={await getSiteContent({ fresh: true })}
      initialGalleryItems={await getGalleryItems({ fresh: true })}
      initialMessages={messages}
      initialVisitors={visitors}
      visitorCount={visitorStats.total}
      initialDonations={donations}
      initialDonors={donors}
      initialSubscribers={subscribers}
    />
  );
}

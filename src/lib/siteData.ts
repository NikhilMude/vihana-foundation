import {
  defaultGalleryItems,
  defaultSiteContent,
  GalleryItem,
  mergeSiteContent,
  SiteContent,
} from "@/lib/cmsContent";
import { getDocument, listDocuments } from "@/lib/firestoreAdmin";

const siteDataCache = {
  content: null as SiteContent | null,
  contentExpiresAt: 0,
  galleryItems: null as GalleryItem[] | null,
  galleryExpiresAt: 0,
};

const cacheTtl = 45000;

export function invalidateSiteDataCache() {
  siteDataCache.content = null;
  siteDataCache.contentExpiresAt = 0;
  siteDataCache.galleryItems = null;
  siteDataCache.galleryExpiresAt = 0;
}

export async function getSiteContent(options: { fresh?: boolean } = {}): Promise<SiteContent> {
  if (!options.fresh && siteDataCache.content && siteDataCache.contentExpiresAt > Date.now()) {
    return siteDataCache.content;
  }

  try {
    const document = await getDocument("cms/siteContent");
    const parsed = document?.data ? (JSON.parse(String(document.data)) as Partial<SiteContent>) : null;

    const content = mergeSiteContent(parsed);
    siteDataCache.content = content;
    siteDataCache.contentExpiresAt = Date.now() + cacheTtl;

    return content;
  } catch {
    return defaultSiteContent;
  }
}

export async function getGalleryItems(options: { fresh?: boolean } = {}): Promise<GalleryItem[]> {
  if (!options.fresh && siteDataCache.galleryItems && siteDataCache.galleryExpiresAt > Date.now()) {
    return siteDataCache.galleryItems;
  }

  try {
    const items = await listDocuments("galleryItems");

    if (!items.length) {
      siteDataCache.galleryItems = defaultGalleryItems;
      siteDataCache.galleryExpiresAt = Date.now() + cacheTtl;

      return defaultGalleryItems;
    }

    const galleryItems = items
      .map((item) => ({
        id: String(item.id || ""),
        title: String(item.title || ""),
        description: String(item.description || ""),
        imageUrl: String(item.imageUrl || ""),
        tag: String(item.tag || "Gallery"),
      }))
      .filter((item) => item.title);

    siteDataCache.galleryItems = galleryItems;
    siteDataCache.galleryExpiresAt = Date.now() + cacheTtl;

    return galleryItems;
  } catch {
    return defaultGalleryItems;
  }
}

export async function getVisitorStats() {
  try {
    const stats = await getDocument("cms/visitorStats");

    return {
      total: Number(stats?.total || 0),
    };
  } catch {
    return {
      total: 0,
    };
  }
}

export async function getRecentVisitors() {
  try {
    const visitors = await listDocuments("websiteVisitors");

    return visitors
      .map((visitor) => ({
        id: String(visitor.id || ""),
        path: String(visitor.path || ""),
        referrer: String(visitor.referrer || ""),
        language: String(visitor.language || ""),
        timezone: String(visitor.timezone || ""),
        screen: String(visitor.screen || ""),
        ipAddress: String(visitor.ipAddress || ""),
        userAgent: String(visitor.userAgent || ""),
        createdAt: String(visitor.createdAt || ""),
      }))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 50);
  } catch {
    return [];
  }
}

export async function getDonationIntents() {
  try {
    const donations = await listDocuments("donationIntents");

    return donations
      .map((donation) => ({
        id: String(donation.id || ""),
        name: String(donation.name || ""),
        email: String(donation.email || ""),
        phone: String(donation.phone || ""),
        amount: String(donation.amount || ""),
        method: String(donation.method || ""),
        transactionId: String(donation.transactionId || ""),
        donorType: String(donation.donorType || ""),
        frequency: String(donation.frequency || ""),
        purpose: String(donation.purpose || ""),
        pan: String(donation.pan || ""),
        address: String(donation.address || ""),
        receiptRequired: String(donation.receiptRequired || ""),
        donorEmail: String(donation.donorEmail || ""),
        message: String(donation.message || ""),
        status: String(donation.status || ""),
        createdAt: String(donation.createdAt || ""),
      }))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export async function getDonationsForEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const donations = await getDonationIntents();

  return donations.filter(
    (donation) =>
      donation.email.toLowerCase() === normalizedEmail ||
      donation.donorEmail.toLowerCase() === normalizedEmail
  );
}

export async function getNewsletterSubscribers() {
  try {
    const subscribers = await listDocuments("newsletterSubscribers");

    return subscribers
      .map((subscriber) => ({
        id: String(subscriber.id || ""),
        email: String(subscriber.email || ""),
        source: String(subscriber.source || ""),
        createdAt: String(subscriber.createdAt || ""),
      }))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

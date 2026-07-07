import {
  defaultGalleryItems,
  defaultSiteContent,
  GalleryItem,
  mergeSiteContent,
  SiteContent,
} from "@/lib/cmsContent";
import { getDocument, listDocuments } from "@/lib/firestoreAdmin";

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const document = await getDocument("cms/siteContent");
    const parsed = document?.data ? (JSON.parse(String(document.data)) as Partial<SiteContent>) : null;

    return mergeSiteContent(parsed);
  } catch {
    return defaultSiteContent;
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const items = await listDocuments("galleryItems");

    if (!items.length) {
      return defaultGalleryItems;
    }

    return items
      .map((item) => ({
        id: String(item.id || ""),
        title: String(item.title || ""),
        description: String(item.description || ""),
        imageUrl: String(item.imageUrl || ""),
        tag: String(item.tag || "Gallery"),
      }))
      .filter((item) => item.title);
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

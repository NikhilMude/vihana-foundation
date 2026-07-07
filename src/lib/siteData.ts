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

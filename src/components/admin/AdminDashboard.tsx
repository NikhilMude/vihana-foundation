"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  FileText,
  ImagePlus,
  Inbox,
  LayoutList,
  Link as LinkIcon,
  Loader2,
  Navigation,
  Pencil,
  Plus,
  Save,
  Settings,
  Trash2,
  Users,
  BadgeIndianRupee,
  Download,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { CmsPage, EditableItem, GalleryItem, NavigationItem, SectionConfig, SiteContent, SocialLink } from "@/lib/cmsContent";

type Message = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  createdAt?: string;
};

type Visitor = {
  id: string;
  path?: string;
  referrer?: string;
  language?: string;
  timezone?: string;
  screen?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt?: string;
};

type DonationRecord = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  amount?: string;
  method?: string;
  transactionId?: string;
  donorType?: string;
  frequency?: string;
  purpose?: string;
  pan?: string;
  address?: string;
  receiptRequired?: string;
  donorEmail?: string;
  message?: string;
  status?: string;
  createdAt?: string;
};

type DonorRecord = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  donorType?: string;
  pan?: string;
  address?: string;
  createdAt?: string;
};

type SubscriberRecord = {
  id: string;
  email?: string;
  source?: string;
  createdAt?: string;
};

type AdminDashboardProps = {
  initialContent: SiteContent;
  initialGalleryItems: GalleryItem[];
  initialMessages: Message[];
  initialVisitors: Visitor[];
  visitorCount: number;
  initialDonations: DonationRecord[];
  initialDonors: DonorRecord[];
  initialSubscribers: SubscriberRecord[];
};

type Tab =
  | "content"
  | "email"
  | "media"
  | "navigation"
  | "order"
  | "sections"
  | "pages"
  | "gallery"
  | "messages"
  | "donations"
  | "donors"
  | "subscribers"
  | "visitors";
type ListKey =
  | "missionPillars"
  | "programCards"
  | "whyFeatures"
  | "impactStats"
  | "impactNotes"
  | "volunteerActions"
  | "eventItems"
  | "annualReports"
  | "testimonials"
  | "faqs"
  | "newsItems";

const contentFields: { key: keyof SiteContent; label: string; multiline?: boolean }[] = [
  { key: "brandName", label: "Website logo name" },
  { key: "brandTagline", label: "Website logo small text" },
  { key: "heroBadge", label: "Hero badge" },
  { key: "heroTitle", label: "Hero title" },
  { key: "heroHighlight", label: "Hero highlighted title" },
  { key: "heroDescription", label: "Hero description", multiline: true },
  { key: "heroPrimaryLabel", label: "Hero primary button text" },
  { key: "heroPrimaryHref", label: "Hero primary button link" },
  { key: "heroSecondaryLabel", label: "Hero secondary button text" },
  { key: "heroSecondaryHref", label: "Hero secondary button link" },
  { key: "heroStatValue", label: "Hero stat value" },
  { key: "heroStatLabel", label: "Hero stat label" },
  { key: "heroMiniTitle", label: "Hero small card title" },
  { key: "heroMiniDescription", label: "Hero small card description", multiline: true },
  { key: "metaTitle", label: "SEO title" },
  { key: "metaDescription", label: "SEO description", multiline: true },
  { key: "metaKeywords", label: "SEO keywords" },
  { key: "ogImageUrl", label: "Open Graph image URL" },
  { key: "floatingDonateText", label: "Floating donate text" },
  { key: "floatingDonateHref", label: "Floating donate link" },
  { key: "floatingDonateColor", label: "Floating donate background color" },
  { key: "floatingDonateTextColor", label: "Floating donate text color" },
  { key: "whatsappEnabled", label: "WhatsApp enabled (true/false)" },
  { key: "whatsappNumber", label: "WhatsApp number with country code" },
  { key: "whatsappMessage", label: "WhatsApp default message", multiline: true },
  { key: "whatsappButtonText", label: "WhatsApp button text" },
  { key: "missionTitle", label: "Mission title" },
  { key: "missionEyebrow", label: "Mission small label" },
  { key: "missionDescription", label: "Mission description", multiline: true },
  { key: "missionStoryEyebrow", label: "Mission photo section small label" },
  { key: "missionStoryTitle", label: "Mission photo section title" },
  { key: "missionStoryDescription", label: "Mission photo section description", multiline: true },
  { key: "programsTitle", label: "Programs title" },
  { key: "programsEyebrow", label: "Programs small label" },
  { key: "programsDescription", label: "Programs description", multiline: true },
  { key: "whyTitle", label: "Why Vihana title" },
  { key: "whyEyebrow", label: "Why Vihana small label" },
  { key: "whyDescription", label: "Why Vihana description", multiline: true },
  { key: "impactTitle", label: "Impact title" },
  { key: "impactEyebrow", label: "Impact small label" },
  { key: "impactDescription", label: "Impact description", multiline: true },
  { key: "galleryTitle", label: "Gallery title" },
  { key: "galleryEyebrow", label: "Gallery small label" },
  { key: "galleryFeatureTitle", label: "Gallery feature title" },
  { key: "galleryFeatureDescription", label: "Gallery feature description", multiline: true },
  { key: "donateTitle", label: "Donate title" },
  { key: "donateEyebrow", label: "Donate small label" },
  { key: "donateDescription", label: "Donate description", multiline: true },
  { key: "donationStoryEyebrow", label: "Donation photo section small label" },
  { key: "donationStoryTitle", label: "Donation photo section title" },
  { key: "donationStoryDescription", label: "Donation photo section description", multiline: true },
  { key: "ctaHeading", label: "CTA banner heading" },
  { key: "ctaDescription", label: "CTA banner description", multiline: true },
  { key: "ctaButtonText", label: "CTA button text" },
  { key: "ctaButtonHref", label: "CTA button link" },
  { key: "ctaBackground", label: "CTA background color" },
  { key: "storyEyebrow", label: "Featured story small label" },
  { key: "testimonialsEyebrow", label: "Testimonials small label" },
  { key: "testimonialsTitle", label: "Testimonials title" },
  { key: "faqEyebrow", label: "FAQ small label" },
  { key: "faqTitle", label: "FAQ title" },
  { key: "newsEyebrow", label: "News small label" },
  { key: "newsTitle", label: "News title" },
  { key: "eventsEyebrow", label: "Events small label" },
  { key: "eventsTitle", label: "Events title" },
  { key: "annualReportsEyebrow", label: "Annual reports small label" },
  { key: "annualReportsTitle", label: "Annual reports title" },
  { key: "newsletterHeading", label: "Newsletter heading" },
  { key: "newsletterDescription", label: "Newsletter description", multiline: true },
  { key: "newsletterPlaceholder", label: "Newsletter input placeholder" },
  { key: "newsletterButtonText", label: "Newsletter button text" },
  { key: "newsletterEmailSubject", label: "Newsletter email subject" },
  { key: "newsletterEmailBody", label: "Newsletter email body", multiline: true },
  { key: "upiId", label: "UPI ID" },
  { key: "bankAccountName", label: "Bank account name" },
  { key: "bankAccountNumber", label: "Bank account number" },
  { key: "bankIfsc", label: "IFSC" },
  { key: "bankName", label: "Bank name" },
  { key: "legalStatusNote", label: "Legal status note" },
  { key: "registrationNumber", label: "Registration number" },
  { key: "panNumber", label: "PAN number" },
  { key: "taxExemptionNote", label: "80G / 12A note" },
  { key: "annualReportHref", label: "Annual report link" },
  { key: "founderStory", label: "Founder story", multiline: true },
  { key: "volunteerTitle", label: "Volunteer title" },
  { key: "volunteerEyebrow", label: "Volunteer small label" },
  { key: "volunteerDescription", label: "Volunteer description", multiline: true },
  { key: "contactEmail", label: "Contact email" },
  { key: "contactPhone", label: "Contact phone" },
  { key: "contactLocation", label: "Contact location" },
  { key: "footerLegalTitle", label: "Footer legal links title" },
];

const listLabels: Record<ListKey, string> = {
  missionPillars: "Mission Cards",
  programCards: "Program Cards",
  whyFeatures: "Why Vihana Cards",
  impactStats: "Impact Numbers",
  impactNotes: "Impact Notes",
  volunteerActions: "Volunteer Actions",
  eventItems: "Events",
  annualReports: "Annual Reports / PDFs",
  testimonials: "Testimonials",
  faqs: "FAQ",
  newsItems: "News / Activities",
};

const socialIconPresets = [
  { label: "Instagram", mark: "IG" },
  { label: "Facebook", mark: "f" },
  { label: "YouTube", mark: "YT" },
  { label: "LinkedIn", mark: "in" },
  { label: "X", mark: "X" },
  { label: "Website", mark: "WWW" },
];

const contentGroups: {
  id: string;
  label: string;
  description: string;
  fields: (keyof SiteContent)[];
}[] = [
  {
    id: "home",
    label: "Home / Hero",
    description: "Main top section, buttons, hero stat and SEO preview image.",
    fields: [
      "brandName",
      "brandTagline",
      "heroBadge",
      "heroTitle",
      "heroHighlight",
      "heroDescription",
      "heroPrimaryLabel",
      "heroPrimaryHref",
      "heroSecondaryLabel",
      "heroSecondaryHref",
      "heroStatValue",
      "heroStatLabel",
      "heroMiniTitle",
      "heroMiniDescription",
    ],
  },
  {
    id: "mission",
    label: "Mission",
    description: "Mission copy, founder story and the mission image section text.",
    fields: [
      "missionTitle",
      "missionEyebrow",
      "missionDescription",
      "missionStoryEyebrow",
      "missionStoryTitle",
      "missionStoryDescription",
      "founderStory",
    ],
  },
  {
    id: "programs",
    label: "Programs / Impact",
    description: "Program headings, why section, impact headings and gallery text.",
    fields: [
      "programsTitle",
      "programsEyebrow",
      "programsDescription",
      "whyTitle",
      "whyEyebrow",
      "whyDescription",
      "impactTitle",
      "impactEyebrow",
      "impactDescription",
      "galleryTitle",
      "galleryEyebrow",
      "galleryFeatureTitle",
      "galleryFeatureDescription",
    ],
  },
  {
    id: "donate",
    label: "Donate",
    description: "Donation copy, bank/UPI details, legal trust signals and floating donate button.",
    fields: [
      "donateTitle",
      "donateEyebrow",
      "donateDescription",
      "donationStoryEyebrow",
      "donationStoryTitle",
      "donationStoryDescription",
      "upiId",
      "bankAccountName",
      "bankAccountNumber",
      "bankIfsc",
      "bankName",
      "legalStatusNote",
      "registrationNumber",
      "panNumber",
      "taxExemptionNote",
      "annualReportHref",
      "floatingDonateText",
      "floatingDonateHref",
      "floatingDonateColor",
      "floatingDonateTextColor",
    ],
  },
  {
    id: "contact",
    label: "Contact / Footer",
    description: "Volunteer, contact, WhatsApp, footer and CTA banner text.",
    fields: [
      "volunteerTitle",
      "volunteerEyebrow",
      "volunteerDescription",
      "contactEmail",
      "contactPhone",
      "contactLocation",
      "whatsappEnabled",
      "whatsappNumber",
      "whatsappMessage",
      "whatsappButtonText",
      "footerLegalTitle",
      "ctaHeading",
      "ctaDescription",
      "ctaButtonText",
      "ctaButtonHref",
      "ctaBackground",
    ],
  },
  {
    id: "news",
    label: "News / Email",
    description: "News, events, reports, testimonials, FAQ and newsletter text.",
    fields: [
      "storyEyebrow",
      "testimonialsEyebrow",
      "testimonialsTitle",
      "faqEyebrow",
      "faqTitle",
      "newsEyebrow",
      "newsTitle",
      "eventsEyebrow",
      "eventsTitle",
      "annualReportsEyebrow",
      "annualReportsTitle",
      "newsletterHeading",
      "newsletterDescription",
      "newsletterPlaceholder",
      "newsletterButtonText",
      "newsletterEmailSubject",
      "newsletterEmailBody",
    ],
  },
  {
    id: "seo",
    label: "SEO",
    description: "Google/social sharing metadata.",
    fields: ["metaTitle", "metaDescription", "metaKeywords", "ogImageUrl"],
  },
];

function uniqueId(prefix: string) {
  return `${prefix}-${Date.now()}`;
}

function emptyItem(prefix: string): EditableItem {
  return {
    id: uniqueId(prefix),
    title: "New item",
    description: "Write description here.",
    value: "",
    imageUrl: "",
    name: "",
    role: "",
    quote: "",
    question: "",
    answer: "",
    date: "",
    summary: "",
    linkLabel: "",
    linkHref: "",
  };
}

function emptyPage(): CmsPage {
  return {
    id: uniqueId("page"),
    slug: "new-page",
    title: "New Page",
    description: "Short page description.",
    imageUrl: "",
    body: "Write the page content here.",
    buttonLabel: "Contact Us",
    buttonHref: "/#volunteer",
    published: true,
  };
}

function emptySocialLink(): SocialLink {
  return {
    id: uniqueId("social"),
    label: "Instagram",
    href: "",
    iconImageUrl: "",
  };
}

function currencyAmount(value?: string) {
  return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
}

function downloadCsv(filename: string, rows: Record<string, string | number | undefined>[]) {
  const headers = Object.keys(rows[0] || { empty: "" });
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard({
  initialContent,
  initialGalleryItems,
  initialMessages,
  initialVisitors,
  visitorCount,
  initialDonations,
  initialDonors,
  initialSubscribers,
}: AdminDashboardProps) {
  const [tab, setTab] = useState<Tab>("content");
  const [content, setContent] = useState(initialContent);
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [messages] = useState(initialMessages);
  const [visitors] = useState(initialVisitors);
  const [donations] = useState(initialDonations);
  const [donors] = useState(initialDonors);
  const [subscribers] = useState(initialSubscribers);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [sendingNewsletter, setSendingNewsletter] = useState(false);
  const [contentGroup, setContentGroup] = useState(contentGroups[0].id);
  const [activePageId, setActivePageId] = useState(initialContent.pages[0]?.id || "");

  const tabs = useMemo(
    () => [
      { id: "content" as const, label: "Website Text", icon: Pencil },
      { id: "pages" as const, label: "Pages", icon: FileText },
      { id: "sections" as const, label: "Section Cards", icon: LayoutList },
      { id: "media" as const, label: "Images", icon: ImagePlus },
      { id: "gallery" as const, label: "Gallery", icon: ImagePlus },
      { id: "navigation" as const, label: "Menu & Social", icon: Navigation },
      { id: "order" as const, label: "Homepage Order", icon: Settings },
      { id: "email" as const, label: "Email Template", icon: Mail },
      { id: "donations" as const, label: "Donations", icon: BadgeIndianRupee },
      { id: "donors" as const, label: "Donors", icon: Users },
      { id: "messages" as const, label: "Messages", icon: Inbox },
      { id: "subscribers" as const, label: "Newsletter", icon: Mail },
      { id: "visitors" as const, label: "Visitors", icon: Users },
    ],
    []
  );
  const activeContentGroup = contentGroups.find((group) => group.id === contentGroup) || contentGroups[0];
  const visibleContentFields = contentFields.filter((field) => activeContentGroup.fields.includes(field.key));
  const activePageIndex = content.pages.findIndex((page) => page.id === activePageId);
  const safeActivePageIndex = activePageIndex >= 0 ? activePageIndex : 0;
  const activePage = content.pages[safeActivePageIndex];
  const donationSummary = useMemo(() => {
    const total = donations.reduce((sum, donation) => sum + currencyAmount(donation.amount), 0);
    const receiptCount = donations.filter((donation) => donation.receiptRequired === "Yes").length;
    const monthlyCount = donations.filter((donation) => donation.frequency === "Monthly").length;
    const uniqueDonors = new Set(donations.map((donation) => donation.email?.toLowerCase()).filter(Boolean)).size;
    const byPurpose = donations.reduce<Record<string, number>>((accumulator, donation) => {
      const purpose = donation.purpose || "General Fund";
      accumulator[purpose] = (accumulator[purpose] || 0) + currencyAmount(donation.amount);
      return accumulator;
    }, {});
    const byMethod = donations.reduce<Record<string, number>>((accumulator, donation) => {
      const method = donation.method || "Unknown";
      accumulator[method] = (accumulator[method] || 0) + 1;
      return accumulator;
    }, {});

    return { total, receiptCount, monthlyCount, uniqueDonors, byPurpose, byMethod };
  }, [donations]);

  async function persistContent(
    nextContent: SiteContent,
    successMessage = "Website saved.",
    savingMessage = "Saving changes..."
  ) {
    setSaving(true);
    setStatus(savingMessage);

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: nextContent }),
    });

    setSaving(false);
    setStatus(response.ok ? successMessage : "Could not save website.");
  }

  async function saveContent(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    await persistContent(content);
  }

  function updateContent(key: keyof SiteContent, value: string) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  function updateNavigation(index: number, key: keyof NavigationItem, value: string) {
    setContent((current) => ({
      ...current,
      navigationItems: current.navigationItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      ),
    }));
  }

  function addNavigationItem() {
    setContent((current) => ({
      ...current,
      navigationItems: [...current.navigationItems, { label: "New Link", href: "/" }],
    }));
    setStatus("Navigation updated. Click Save to publish it.");
  }

  function removeNavigationItem(index: number) {
    setContent((current) => ({
      ...current,
      navigationItems: current.navigationItems.filter((_, itemIndex) => itemIndex !== index),
    }));
    setStatus("Navigation updated. Click Save to publish it.");
  }

  function moveNavigationItem(index: number, direction: -1 | 1) {
    const target = index + direction;

    if (target < 0 || target >= content.navigationItems.length) {
      return;
    }

    const navigationItems = [...content.navigationItems];
    [navigationItems[index], navigationItems[target]] = [navigationItems[target], navigationItems[index]];

    const nextContent = { ...content, navigationItems };
    setContent(nextContent);
    void persistContent(nextContent, "Navigation order saved.", "Saving navigation order...");
  }

  function updateSocialLink(index: number, key: keyof SocialLink, value: string) {
    setContent((current) => ({
      ...current,
      socialLinks: current.socialLinks.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      ),
    }));
  }

  function addSocialLink() {
    setContent((current) => ({
      ...current,
      socialLinks: [...current.socialLinks, emptySocialLink()],
    }));
    setStatus("Social links updated. Click Save to publish it.");
  }

  function removeSocialLink(index: number) {
    setContent((current) => ({
      ...current,
      socialLinks: current.socialLinks.filter((_, itemIndex) => itemIndex !== index),
    }));
    setStatus("Social links updated. Click Save to publish it.");
  }

  function applySocialPreset(index: number, label: string) {
    setContent((current) => ({
      ...current,
      socialLinks: current.socialLinks.map((item, itemIndex) =>
        itemIndex === index ? { ...item, label, iconImageUrl: "" } : item
      ),
    }));
    setStatus("Social icon selected. Click Save to publish it.");
  }

  function updateSectionConfig(index: number, key: keyof SectionConfig, value: string | boolean) {
    setContent((current) => ({
      ...current,
      sectionOrder: current.sectionOrder.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [key]: value } : section
      ),
    }));
  }

  function moveSection(index: number, direction: -1 | 1) {
    const target = index + direction;

    if (target < 0 || target >= content.sectionOrder.length) {
      return;
    }

    const sectionOrder = [...content.sectionOrder];
    [sectionOrder[index], sectionOrder[target]] = [sectionOrder[target], sectionOrder[index]];

    const nextContent = { ...content, sectionOrder };
    setContent(nextContent);
    void persistContent(nextContent, "Homepage order saved.", "Saving homepage order...");
  }

  function updateListItem(listKey: ListKey, index: number, key: keyof EditableItem, value: string) {
    setContent((current) => ({
      ...current,
      [listKey]: current[listKey].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      ),
    }));
  }

  function addListItem(listKey: ListKey) {
    setContent((current) => ({
      ...current,
      [listKey]: [...current[listKey], emptyItem(listKey)],
    }));
    setStatus("Card list updated. Click Save to publish it.");
  }

  function removeListItem(listKey: ListKey, index: number) {
    setContent((current) => ({
      ...current,
      [listKey]: current[listKey].filter((_, itemIndex) => itemIndex !== index),
    }));
    setStatus("Card list updated. Click Save to publish it.");
  }

  function moveListItem(listKey: ListKey, index: number, direction: -1 | 1) {
    const target = index + direction;
    const items = content[listKey];

    if (target < 0 || target >= items.length) {
      return;
    }

    const nextItems = [...items];
    [nextItems[index], nextItems[target]] = [nextItems[target], nextItems[index]];

    const nextContent = { ...content, [listKey]: nextItems } as SiteContent;
    setContent(nextContent);
    void persistContent(nextContent, "Card order saved.", "Saving card order...");
  }

  function updateFeaturedStory(key: keyof EditableItem, value: string) {
    setContent((current) => ({
      ...current,
      featuredStory: {
        ...current.featuredStory,
        [key]: value,
      },
    }));
  }

  function updatePage(index: number, key: keyof CmsPage, value: string | boolean) {
    setContent((current) => ({
      ...current,
      pages: current.pages.map((page, pageIndex) => (pageIndex === index ? { ...page, [key]: value } : page)),
    }));
  }

  function addPage() {
    const page = emptyPage();

    setContent((current) => ({
      ...current,
      pages: [...current.pages, page],
    }));
    setActivePageId(page.id);
    setStatus("Page list updated. Click Save to publish it.");
  }

  function removePage(index: number) {
    const nextActivePage = content.pages[index - 1] || content.pages[index + 1];

    setContent((current) => ({
      ...current,
      pages: current.pages.filter((_, pageIndex) => pageIndex !== index),
    }));
    setActivePageId(nextActivePage?.id || "");
    setStatus("Page list updated. Click Save to publish it.");
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>, callback: (value: string) => void) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 700000) {
      setStatus("Please choose a smaller image under 700 KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => callback(String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  function handleDocumentUpload(event: ChangeEvent<HTMLInputElement>, callback: (value: string) => void) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 1800000) {
      setStatus("Please choose a PDF under 1.8 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => callback(String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  async function addGalleryItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: String(formData.get("title") || ""),
        description: String(formData.get("description") || ""),
        tag: String(formData.get("tag") || ""),
        imageUrl: imagePreview,
      }),
    });

    const result = (await response.json()) as { ok: boolean; item?: GalleryItem; message?: string };
    setSaving(false);

    if (!response.ok || !result.item) {
      setStatus(result.message || "Could not add gallery item.");
      return;
    }

    setGalleryItems((items) => [result.item as GalleryItem, ...items]);
    setImagePreview("");
    form.reset();
    setStatus("Gallery item added.");
  }

  async function deleteGalleryItem(id: string) {
    setStatus("");
    const response = await fetch(`/api/admin/gallery?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setGalleryItems((items) => items.filter((item) => item.id !== id));
      setStatus("Gallery item deleted.");
    }
  }

  async function sendNewsletter() {
    setSendingNewsletter(true);
    setStatus("");

    const response = await fetch("/api/admin/newsletter/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: content.newsletterEmailSubject,
        body: content.newsletterEmailBody,
      }),
    });

    const result = (await response.json()) as {
      ok: boolean;
      recipients?: number;
      sent?: number;
      skipped?: boolean;
      message?: string;
    };

    setSendingNewsletter(false);

    if (!response.ok || !result.ok) {
      setStatus(result.message || "Could not send newsletter.");
      return;
    }

    setStatus(
      result.skipped
        ? "Newsletter saved, but email provider is not configured."
        : `Newsletter sent to ${result.sent || 0} of ${result.recipients || 0} subscribers.`
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-4 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">Vihana Foundation Admin</p>
            <h1 className="mt-1 truncate font-[family-name:var(--font-playfair)] text-3xl font-bold text-slate-950">Website CMS</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {status ? <p className="rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">{status}</p> : null}
            <a href="/" target="_blank" className="inline-flex h-11 items-center rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">
              View Site
            </a>
            <Button type="button" onClick={() => saveContent()} disabled={saving} className="h-11 rounded-full bg-teal-700 px-6 hover:bg-teal-800">
              {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              Save Changes
            </Button>
            <form action="/api/admin/logout" method="post">
              <Button type="submit" variant="outline" className="h-11 rounded-full px-6">Logout</Button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-6">
        <div className="rounded-[8px] border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-wrap gap-2">
          {tabs.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition ${
                  tab === item.id ? "bg-teal-700 text-white shadow-sm" : "bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-teal-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
          </div>
        </div>

        {tab === "content" ? (
          <form onSubmit={saveContent} className="mt-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Edit Website Text</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  Choose one website area, update the fields, then click Save Changes.
                </p>
              </div>
              <Button type="submit" disabled={saving} className="h-11 rounded-full bg-teal-700 px-6 hover:bg-teal-800">
                {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                Save Text
              </Button>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[260px_1fr]">
              <div className="grid gap-2 self-start rounded-[8px] bg-slate-50 p-3">
                {contentGroups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setContentGroup(group.id)}
                    className={`rounded-[8px] px-4 py-3 text-left text-sm font-bold transition ${
                      contentGroup === group.id ? "bg-white text-teal-800 shadow-sm" : "text-slate-600 hover:bg-white hover:text-slate-950"
                    }`}
                  >
                    {group.label}
                  </button>
                ))}
              </div>

              <div>
                <div className="rounded-[8px] bg-teal-50 px-4 py-3">
                  <h3 className="font-bold text-teal-950">{activeContentGroup.label}</h3>
                  <p className="mt-1 text-sm leading-6 text-teal-800">{activeContentGroup.description}</p>
                </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {visibleContentFields.map((field) => (
                <label key={field.key} className={field.multiline ? "lg:col-span-2" : ""}>
                  <span className="text-sm font-bold text-slate-800">{field.label}</span>
                  {field.multiline ? (
                    <textarea
                      rows={4}
                      value={String(content[field.key])}
                      onChange={(event) => updateContent(field.key, event.target.value)}
                      className="mt-2 w-full resize-none rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600 focus:bg-white"
                    />
                  ) : (
                    <input
                      value={String(content[field.key])}
                      onChange={(event) => updateContent(field.key, event.target.value)}
                      className="mt-2 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600 focus:bg-white"
                    />
                  )}
                </label>
              ))}
            </div>
              </div>
            </div>
          </form>
        ) : null}

        {tab === "email" ? (
          <form onSubmit={saveContent} className="mt-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="max-w-4xl">
              <h2 className="text-xl font-bold text-slate-950">Newsletter Email Template</h2>
              <p className="mt-2 leading-7 text-slate-600">
                This is the email sent from the Newsletter tab to all subscribers.
              </p>

              <label className="mt-6 block">
                <span className="text-sm font-bold text-slate-800">Email subject</span>
                <input
                  value={content.newsletterEmailSubject}
                  onChange={(event) => updateContent("newsletterEmailSubject", event.target.value)}
                  className="mt-2 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600 focus:bg-white"
                />
              </label>

              <label className="mt-5 block">
                <span className="text-sm font-bold text-slate-800">Email body</span>
                <textarea
                  rows={12}
                  value={content.newsletterEmailBody}
                  onChange={(event) => updateContent("newsletterEmailBody", event.target.value)}
                  className="mt-2 w-full resize-y rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 leading-7 outline-none focus:border-teal-600 focus:bg-white"
                />
              </label>

              <div className="mt-6 rounded-[8px] bg-slate-50 p-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Preview</p>
                <h3 className="mt-3 text-lg font-bold text-slate-950">{content.newsletterEmailSubject}</h3>
                <p className="mt-3 whitespace-pre-line leading-7 text-slate-700">{content.newsletterEmailBody}</p>
              </div>

              <Button type="submit" disabled={saving} className="mt-6 h-12 rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800">
                {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                Save Email Template
              </Button>
            </div>
          </form>
        ) : null}

        {tab === "media" ? (
          <div className="mt-6 grid gap-6">
            <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Website Logo</h2>
              <p className="mt-2 text-slate-600">Upload the logo shown in the header and footer.</p>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageUpload(event, (value) => updateContent("logoImageUrl", value))}
                className="mt-5 w-full rounded-[8px] border border-dashed border-slate-300 bg-slate-50 p-4 text-sm"
              />
              {content.logoImageUrl ? (
                <div className="mt-5 flex items-center gap-4 rounded-[8px] border border-slate-200 bg-slate-50 p-4">
                  <Image
                    src={content.logoImageUrl}
                    alt="Logo preview"
                    width={88}
                    height={88}
                    unoptimized
                    className="h-16 w-16 rounded-[8px] object-contain"
                  />
                  <Button type="button" onClick={() => updateContent("logoImageUrl", "")} className="h-10 rounded-full bg-slate-950 px-5 hover:bg-slate-800">
                    Remove Logo Image
                  </Button>
                </div>
              ) : null}
            </section>

            <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Hero Image</h2>
              <p className="mt-2 text-slate-600">Upload the main image shown at the top of the homepage.</p>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageUpload(event, (value) => updateContent("heroImageUrl", value))}
                className="mt-5 w-full rounded-[8px] border border-dashed border-slate-300 bg-slate-50 p-4 text-sm"
              />
              {content.heroImageUrl ? (
                <Image
                  src={content.heroImageUrl}
                  alt="Hero preview"
                  width={760}
                  height={520}
                  unoptimized
                  className="mt-5 max-h-[420px] w-full rounded-[8px] object-contain"
                />
              ) : null}
            </section>

            <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Mission Story Image</h2>
              <p className="mt-2 text-slate-600">Upload the image used in the mission storytelling section.</p>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageUpload(event, (value) => updateContent("missionImageUrl", value))}
                className="mt-5 w-full rounded-[8px] border border-dashed border-slate-300 bg-slate-50 p-4 text-sm"
              />
              {content.missionImageUrl ? (
                <Image
                  src={content.missionImageUrl}
                  alt="Mission story preview"
                  width={760}
                  height={520}
                  unoptimized
                  className="mt-5 max-h-[420px] w-full rounded-[8px] object-cover"
                />
              ) : null}
            </section>

            <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Donation Campaign Image</h2>
              <p className="mt-2 text-slate-600">Upload the image used near donation and campaign storytelling.</p>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageUpload(event, (value) => updateContent("donationImageUrl", value))}
                className="mt-5 w-full rounded-[8px] border border-dashed border-slate-300 bg-slate-50 p-4 text-sm"
              />
              {content.donationImageUrl ? (
                <Image
                  src={content.donationImageUrl}
                  alt="Donation campaign preview"
                  width={760}
                  height={520}
                  unoptimized
                  className="mt-5 max-h-[420px] w-full rounded-[8px] object-cover"
                />
              ) : null}
            </section>
          </div>
        ) : null}

        {tab === "navigation" ? (
          <div className="mt-6 grid gap-6">
            <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-slate-950">Navigation Links</h2>
                <Button type="button" onClick={addNavigationItem} className="h-10 rounded-full bg-teal-700 px-5 hover:bg-teal-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Link
                </Button>
              </div>
              <div className="mt-5 grid gap-4">
                {content.navigationItems.map((item, index) => (
                  <div key={`${item.label}-${index}`} className="grid gap-3 rounded-[8px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto_auto_auto]">
                    <input value={item.label} onChange={(event) => updateNavigation(index, "label", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Label" />
                    <input value={item.href} onChange={(event) => updateNavigation(index, "href", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="/page or #section" />
                    <button
                      type="button"
                      disabled={saving || index === 0}
                      onClick={() => moveNavigationItem(index, -1)}
                      className="rounded-[8px] bg-white px-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-teal-50 hover:text-teal-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      disabled={saving || index === content.navigationItems.length - 1}
                      onClick={() => moveNavigationItem(index, 1)}
                      className="rounded-[8px] bg-white px-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-teal-50 hover:text-teal-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Down
                    </button>
                    <button type="button" onClick={() => removeNavigationItem(index)} className="inline-flex items-center justify-center rounded-[8px] px-4 text-sm font-bold text-rose-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-slate-950">Social Media Links</h2>
                <Button type="button" onClick={addSocialLink} className="h-10 rounded-full bg-teal-700 px-5 hover:bg-teal-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Social Link
                </Button>
              </div>
              <div className="mt-5 grid gap-4">
                {content.socialLinks.map((item, index) => (
                  <div key={item.id} className="grid gap-3 rounded-[8px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[0.7fr_1fr_auto]">
                    <div className="grid grid-cols-[auto_1fr] gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                        {socialIconPresets.find((preset) => preset.label === item.label)?.mark || "WWW"}
                      </div>
                      <select
                        value={item.label}
                        onChange={(event) => applySocialPreset(index, event.target.value)}
                        className="h-11 rounded-[8px] border border-slate-200 px-4"
                        aria-label="Choose social icon"
                      >
                        {socialIconPresets.map((preset) => (
                          <option key={preset.label} value={preset.label}>
                            {preset.mark} {preset.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      value={item.href}
                      onChange={(event) => updateSocialLink(index, "href", event.target.value)}
                      className="h-11 rounded-[8px] border border-slate-200 px-4"
                      placeholder="https://..."
                    />
                    <button type="button" onClick={() => removeSocialLink(index)} className="inline-flex items-center justify-center rounded-[8px] px-4 text-sm font-bold text-rose-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid gap-3 md:col-span-3 md:grid-cols-[1fr_auto] md:items-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageUpload(event, (value) => updateSocialLink(index, "iconImageUrl", value))}
                        className="rounded-[8px] border border-dashed border-slate-300 bg-white p-3 text-sm"
                      />
                      {item.iconImageUrl ? (
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.iconImageUrl}
                            alt={`${item.label} icon preview`}
                            width={44}
                            height={44}
                            unoptimized
                            className="h-11 w-11 rounded-full bg-white object-contain p-1 shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => updateSocialLink(index, "iconImageUrl", "")}
                            className="h-10 rounded-full bg-slate-950 px-4 text-sm font-bold text-white"
                          >
                            Remove Icon
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : null}

        {tab === "order" ? (
          <div className="mt-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Homepage Section Order</h2>
            <p className="mt-2 text-slate-600">Show, hide and reorder homepage sections.</p>
            <div className="mt-5 grid gap-3">
              {content.sectionOrder.map((section, index) => (
                <div key={section.id} className="grid gap-3 rounded-[8px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[auto_1fr_auto_auto] md:items-center">
                  <label className="inline-flex items-center gap-2 text-sm font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={section.visible}
                      onChange={(event) => updateSectionConfig(index, "visible", event.target.checked)}
                    />
                    Show
                  </label>
                  <input
                    value={section.label}
                    onChange={(event) => updateSectionConfig(index, "label", event.target.value)}
                    className="h-11 rounded-[8px] border border-slate-200 px-4"
                  />
                  <button
                    type="button"
                    disabled={saving || index === 0}
                    onClick={() => moveSection(index, -1)}
                    className="rounded-[8px] bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-teal-50 hover:text-teal-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    disabled={saving || index === content.sectionOrder.length - 1}
                    onClick={() => moveSection(index, 1)}
                    className="rounded-[8px] bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-teal-50 hover:text-teal-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Down
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === "sections" ? (
          <div className="mt-6 grid gap-6">
            <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Featured Impact Story</h2>
              <div className="mt-5 grid gap-3 lg:grid-cols-2">
                <input value={content.featuredStory.name || ""} onChange={(event) => updateFeaturedStory("name", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Child/person name" />
                <input value={content.featuredStory.title} onChange={(event) => updateFeaturedStory("title", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Story title" />
                <textarea value={content.featuredStory.description} onChange={(event) => updateFeaturedStory("description", event.target.value)} rows={4} className="rounded-[8px] border border-slate-200 px-4 py-3 lg:col-span-2" placeholder="Story" />
                <input value={content.featuredStory.linkLabel || ""} onChange={(event) => updateFeaturedStory("linkLabel", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Button text" />
                <input value={content.featuredStory.linkHref || ""} onChange={(event) => updateFeaturedStory("linkHref", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Button link" />
                <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, (value) => updateFeaturedStory("imageUrl", value))} className="rounded-[8px] border border-dashed border-slate-300 bg-slate-50 p-4 text-sm lg:col-span-2" />
              </div>
            </section>

            {(Object.keys(listLabels) as ListKey[]).map((listKey) => (
              <section key={listKey} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-slate-950">{listLabels[listKey]}</h2>
                  <Button type="button" onClick={() => addListItem(listKey)} className="h-10 rounded-full bg-teal-700 px-5 hover:bg-teal-800">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
                <div className="mt-5 grid gap-4">
                  {content[listKey].map((item, index) => (
                    <div key={item.id} className="grid gap-3 rounded-[8px] border border-slate-200 bg-slate-50 p-4 lg:grid-cols-2">
                      <input value={item.title} onChange={(event) => updateListItem(listKey, index, "title", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Title / name / question" />
                      <input value={item.value || ""} onChange={(event) => updateListItem(listKey, index, "value", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Number/value/date/role" />
                      <textarea value={item.description || item.quote || item.answer || item.summary || ""} onChange={(event) => updateListItem(listKey, index, "description", event.target.value)} rows={3} className="rounded-[8px] border border-slate-200 px-4 py-3 lg:col-span-2" placeholder="Description / quote / answer / summary" />
                      <input value={item.linkLabel || ""} onChange={(event) => updateListItem(listKey, index, "linkLabel", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Button text, if needed" />
                      <div className="flex gap-3">
                        <input value={item.linkHref || ""} onChange={(event) => updateListItem(listKey, index, "linkHref", event.target.value)} className="h-11 flex-1 rounded-[8px] border border-slate-200 px-4" placeholder="Button link, if needed" />
                        <button
                          type="button"
                          disabled={saving || index === 0}
                          onClick={() => moveListItem(listKey, index, -1)}
                          className="h-11 rounded-[8px] bg-white px-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-teal-50 hover:text-teal-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Up
                        </button>
                        <button
                          type="button"
                          disabled={saving || index === content[listKey].length - 1}
                          onClick={() => moveListItem(listKey, index, 1)}
                          className="h-11 rounded-[8px] bg-white px-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-teal-50 hover:text-teal-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Down
                        </button>
                        <button type="button" onClick={() => removeListItem(listKey, index)} className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] text-rose-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageUpload(event, (value) => updateListItem(listKey, index, "imageUrl", value))}
                        className="rounded-[8px] border border-dashed border-slate-300 bg-white p-3 text-sm lg:col-span-2"
                      />
                      {listKey === "annualReports" ? (
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(event) => handleDocumentUpload(event, (value) => updateListItem(listKey, index, "linkHref", value))}
                          className="rounded-[8px] border border-dashed border-slate-300 bg-white p-3 text-sm lg:col-span-2"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {tab === "pages" ? (
          <div className="mt-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Edit Pages</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Select one page, update text/image/button, then save.</p>
              </div>
              <Button type="button" onClick={addPage} className="h-10 rounded-full bg-teal-700 px-5 hover:bg-teal-800">
                <Plus className="mr-2 h-4 w-4" />
                Add Page
              </Button>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[280px_1fr]">
              <div className="grid gap-2 self-start rounded-[8px] bg-slate-50 p-3">
                {content.pages.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => setActivePageId(page.id)}
                    className={`rounded-[8px] px-4 py-3 text-left transition ${
                      activePage?.id === page.id ? "bg-white shadow-sm" : "hover:bg-white"
                    }`}
                  >
                    <span className="block text-sm font-bold text-slate-950">{page.title}</span>
                    <span className="mt-1 block truncate text-xs text-slate-500">/{page.slug}</span>
                  </button>
                ))}
              </div>

              {activePage ? (
                <div className="rounded-[8px] border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-sm font-bold text-slate-700">
                      <input type="checkbox" checked={activePage.published} onChange={(event) => updatePage(safeActivePageIndex, "published", event.target.checked)} />
                      Published
                    </label>
                    <div className="flex gap-4">
                      <a href={`/${activePage.slug}`} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700">
                        <LinkIcon className="h-4 w-4" />
                        Open page
                      </a>
                      <button type="button" onClick={() => removePage(safeActivePageIndex)} className="inline-flex items-center gap-2 text-sm font-bold text-rose-700">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 lg:grid-cols-2">
                    <input value={activePage.title} onChange={(event) => updatePage(safeActivePageIndex, "title", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Page title" />
                    <input value={activePage.slug} onChange={(event) => updatePage(safeActivePageIndex, "slug", event.target.value.replace(/[^a-z0-9-]/g, "-"))} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="page-url" />
                    <input value={activePage.description} onChange={(event) => updatePage(safeActivePageIndex, "description", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4 lg:col-span-2" placeholder="Short description" />
                    <input value={activePage.imageUrl || ""} onChange={(event) => updatePage(safeActivePageIndex, "imageUrl", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4 lg:col-span-2" placeholder="Page image URL" />
                    <div className="grid gap-3 lg:col-span-2 lg:grid-cols-[0.7fr_1.3fr]">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageUpload(event, (value) => updatePage(safeActivePageIndex, "imageUrl", value))}
                        className="rounded-[8px] border border-dashed border-slate-300 bg-white p-3 text-sm"
                      />
                      {activePage.imageUrl ? (
                        <Image src={activePage.imageUrl} alt={activePage.title} width={520} height={220} unoptimized className="h-36 w-full rounded-[8px] object-cover" />
                      ) : (
                        <div className="flex h-36 items-center justify-center rounded-[8px] border border-dashed border-slate-300 bg-white text-sm font-bold text-slate-400">
                          Page image preview
                        </div>
                      )}
                    </div>
                    <textarea value={activePage.body} onChange={(event) => updatePage(safeActivePageIndex, "body", event.target.value)} rows={10} className="rounded-[8px] border border-slate-200 px-4 py-3 lg:col-span-2" placeholder="Page content" />
                    <input value={activePage.buttonLabel} onChange={(event) => updatePage(safeActivePageIndex, "buttonLabel", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Button label" />
                    <input value={activePage.buttonHref} onChange={(event) => updatePage(safeActivePageIndex, "buttonHref", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Button link" />
                  </div>
                </div>
              ) : (
                <div className="rounded-[8px] border border-dashed border-slate-300 p-8 text-center text-slate-600">
                  Add a page to start editing.
                </div>
              )}
            </div>
          </div>
        ) : null}

        {tab === "gallery" ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <form onSubmit={addGalleryItem} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Add Gallery Item</h2>
              <input name="title" required className="mt-5 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" placeholder="Title" />
              <input name="tag" className="mt-4 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" placeholder="Tag" />
              <textarea name="description" required rows={4} className="mt-4 w-full resize-none rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600" placeholder="Description" />
              <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, setImagePreview)} className="mt-4 w-full rounded-[8px] border border-dashed border-slate-300 bg-slate-50 p-4 text-sm" />
              {imagePreview ? <Image src={imagePreview} alt="Preview" width={600} height={320} unoptimized className="mt-4 h-44 w-full rounded-[8px] object-cover" /> : null}
              <Button type="submit" disabled={saving} className="mt-5 h-12 w-full rounded-full bg-teal-700 text-base hover:bg-teal-800">
                {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ImagePlus className="mr-2 h-5 w-5" />}
                Add To Gallery
              </Button>
            </form>

            <div className="grid gap-4 md:grid-cols-2">
              {galleryItems.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
                  {item.imageUrl ? <Image src={item.imageUrl} alt={item.title} width={600} height={320} unoptimized className="h-44 w-full object-cover" /> : null}
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">{item.tag}</p>
                    <h3 className="mt-2 text-lg font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{item.description}</p>
                    <button type="button" onClick={() => deleteGalleryItem(item.id)} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-rose-700">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === "messages" ? (
          <div className="mt-6 grid gap-4">
            {messages.length ? (
              messages.map((message) => (
                <div key={message.id} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col justify-between gap-2 md:flex-row">
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">{message.name}</h3>
                      <p className="text-sm text-slate-500">
                        {message.email} {message.phone ? `| ${message.phone}` : ""}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-teal-700">{message.interest}</p>
                  </div>
                  <p className="mt-4 leading-7 text-slate-700">{message.message}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{message.createdAt}</p>
                </div>
              ))
            ) : (
              <div className="rounded-[8px] border border-slate-200 bg-white p-8 text-center text-slate-600">
                No messages received yet.
              </div>
            )}
          </div>
        ) : null}

        {tab === "donations" ? (
          <div className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Total pledged</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">INR {donationSummary.total.toLocaleString("en-IN")}</h2>
              </div>
              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Donors</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">{donationSummary.uniqueDonors}</h2>
              </div>
              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Monthly pledges</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">{donationSummary.monthlyCount}</h2>
              </div>
              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Receipt requests</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">{donationSummary.receiptCount}</h2>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold text-slate-950">Purpose report</h2>
                <div className="mt-4 grid gap-3">
                  {Object.entries(donationSummary.byPurpose).map(([purpose, total]) => (
                    <div key={purpose} className="flex items-center justify-between rounded-[8px] bg-slate-50 px-4 py-3 text-sm">
                      <span className="font-bold text-slate-700">{purpose}</span>
                      <span className="font-black text-teal-700">INR {total.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <h2 className="text-lg font-bold text-slate-950">Export reports</h2>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => downloadCsv("vihana-donation-report.csv", donations)}
                    className="h-10 rounded-full"
                    disabled={!donations.length}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Donation CSV
                  </Button>
                </div>
                <div className="mt-4 grid gap-3">
                  {Object.entries(donationSummary.byMethod).map(([method, count]) => (
                    <div key={method} className="flex items-center justify-between rounded-[8px] bg-slate-50 px-4 py-3 text-sm">
                      <span className="font-bold text-slate-700">{method}</span>
                      <span className="font-black text-teal-700">{count} records</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button type="button" variant="outline" onClick={() => downloadCsv("vihana-messages-report.csv", messages)} className="h-10 rounded-full">
                    Messages CSV
                  </Button>
                  <Button type="button" variant="outline" onClick={() => downloadCsv("vihana-subscribers-report.csv", subscribers)} className="h-10 rounded-full">
                    Subscribers CSV
                  </Button>
                  <Button type="button" variant="outline" onClick={() => downloadCsv("vihana-visitors-report.csv", visitors)} className="h-10 rounded-full">
                    Visitors CSV
                  </Button>
                  <Button type="button" variant="outline" onClick={() => downloadCsv("vihana-donor-accounts.csv", donors)} className="h-10 rounded-full">
                    Donors CSV
                  </Button>
                </div>
              </div>
            </div>

            {donations.length ? (
              donations.map((donation) => (
                <div key={donation.id} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col justify-between gap-2 md:flex-row">
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">{donation.name}</h3>
                      <p className="text-sm text-slate-500">
                        {donation.email} {donation.phone ? `| ${donation.phone}` : ""}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-teal-700">INR {donation.amount}</p>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                    <p><span className="font-bold text-slate-800">Donor type:</span> {donation.donorType || "Not recorded"}</p>
                    <p><span className="font-bold text-slate-800">Frequency:</span> {donation.frequency || "One Time"}</p>
                    <p><span className="font-bold text-slate-800">Purpose:</span> {donation.purpose || "General Fund"}</p>
                    <p><span className="font-bold text-slate-800">Method:</span> {donation.method}</p>
                    <p><span className="font-bold text-slate-800">Reference:</span> {donation.transactionId}</p>
                    <p><span className="font-bold text-slate-800">Receipt:</span> {donation.receiptRequired || "No"}</p>
                    <p><span className="font-bold text-slate-800">PAN:</span> {donation.pan || "Not provided"}</p>
                    <p><span className="font-bold text-slate-800">Address:</span> {donation.address || "Not provided"}</p>
                    <p><span className="font-bold text-slate-800">Status:</span> {donation.status}</p>
                    <p><span className="font-bold text-slate-800">Date:</span> {donation.createdAt}</p>
                  </div>
                  {donation.message ? <p className="mt-4 leading-7 text-slate-700">{donation.message}</p> : null}
                </div>
              ))
            ) : (
              <div className="rounded-[8px] border border-slate-200 bg-white p-8 text-center text-slate-600">
                No donation records yet.
              </div>
            )}
          </div>
        ) : null}

        {tab === "donors" ? (
          <div className="mt-6 grid gap-4">
            <div className="flex flex-col justify-between gap-3 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-600">Registered Donors</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">{donors.length}</h2>
              </div>
              <Button type="button" variant="outline" onClick={() => downloadCsv("vihana-donor-accounts.csv", donors)} className="h-10 rounded-full" disabled={!donors.length}>
                <Download className="mr-2 h-4 w-4" />
                Donor CSV
              </Button>
            </div>

            {donors.length ? (
              donors.map((donor) => (
                <div key={donor.id} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col justify-between gap-2 md:flex-row">
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">{donor.name}</h3>
                      <p className="text-sm text-slate-500">
                        {donor.email} {donor.phone ? `| ${donor.phone}` : ""}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-teal-700">{donor.donorType || "Donor"}</p>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                    <p><span className="font-bold text-slate-800">PAN:</span> {donor.pan || "Not provided"}</p>
                    <p><span className="font-bold text-slate-800">Joined:</span> {donor.createdAt}</p>
                    <p className="md:col-span-2"><span className="font-bold text-slate-800">Address:</span> {donor.address || "Not provided"}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[8px] border border-slate-200 bg-white p-8 text-center text-slate-600">
                No donor accounts yet.
              </div>
            )}
          </div>
        ) : null}

        {tab === "subscribers" ? (
          <div className="mt-6 grid gap-4">
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Send Newsletter</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Edit the subject and body in the Text tab, then send it to all subscribers here.
              </p>
              <div className="mt-5 rounded-[8px] bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-800">Subject</p>
                <p className="mt-1 text-slate-700">{content.newsletterEmailSubject}</p>
                <p className="mt-4 text-sm font-bold text-slate-800">Body</p>
                <p className="mt-1 whitespace-pre-line leading-7 text-slate-700">{content.newsletterEmailBody}</p>
              </div>
              <Button type="button" onClick={sendNewsletter} disabled={sendingNewsletter} className="mt-5 h-12 rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800">
                {sendingNewsletter ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Mail className="mr-2 h-5 w-5" />}
                Send Newsletter
              </Button>
            </div>

            {subscribers.length ? (
              subscribers.map((subscriber) => (
                <div key={subscriber.id} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-slate-950">{subscriber.email}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {subscriber.source || "website"} | {subscriber.createdAt}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-[8px] border border-slate-200 bg-white p-8 text-center text-slate-600">
                No newsletter subscribers yet.
              </div>
            )}
          </div>
        ) : null}

        {tab === "visitors" ? (
          <div className="mt-6">
            <div className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-600">Website Traffic</p>
              <h2 className="mt-2 text-4xl font-bold text-slate-950">{visitorCount}</h2>
              <p className="mt-2 text-slate-600">Total tracked visits</p>
            </div>

            <div className="mt-5 grid gap-4">
              {visitors.length ? (
                visitors.map((visitor) => (
                  <div key={visitor.id} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col justify-between gap-2 md:flex-row">
                      <div>
                        <h3 className="font-bold text-slate-950">{visitor.path || "/"}</h3>
                        <p className="mt-1 text-sm text-slate-500">{visitor.createdAt}</p>
                      </div>
                      <p className="text-sm font-bold text-teal-700">{visitor.ipAddress || "Unknown IP"}</p>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                      <p><span className="font-bold text-slate-800">Referrer:</span> {visitor.referrer || "Direct"}</p>
                      <p><span className="font-bold text-slate-800">Language:</span> {visitor.language || "Unknown"}</p>
                      <p><span className="font-bold text-slate-800">Timezone:</span> {visitor.timezone || "Unknown"}</p>
                      <p><span className="font-bold text-slate-800">Screen:</span> {visitor.screen || "Unknown"}</p>
                    </div>
                    <p className="mt-3 break-words text-xs text-slate-400">{visitor.userAgent}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-[8px] border border-slate-200 bg-white p-8 text-center text-slate-600">
                  No visitor details captured yet.
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

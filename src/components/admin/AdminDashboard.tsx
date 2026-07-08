"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
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
  HelpCircle,
  Mail,
  ReceiptText,
  Search,
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
  receiptNumber?: string;
  receiptStatus?: string;
  receiptIssuedAt?: string;
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

type AdminDashboardProps = {
  initialContent: SiteContent;
  initialGalleryItems: GalleryItem[];
  initialMessages: Message[];
  initialVisitors: Visitor[];
  visitorCount: number;
  initialDonations: DonationRecord[];
  initialDonors: DonorRecord[];
  initialSubscribers: SubscriberRecord[];
  initialAccountingRecords: AccountingRecord[];
};

type Tab =
  | "overview"
  | "pageStudio"
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
  | "accounting"
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
  | "teamMembers"
  | "testimonials"
  | "faqs"
  | "newsItems";

type SearchResult = {
  id: string;
  title: string;
  description: string;
  tab: Tab;
  action: () => void;
};

const contentFields: { key: keyof SiteContent; label: string; multiline?: boolean }[] = [
  { key: "brandName", label: "Website logo name" },
  { key: "brandTagline", label: "Website tagline" },
  { key: "faviconImageUrl", label: "Favicon image URL" },
  { key: "brandPrimaryColor", label: "Palette primary color" },
  { key: "brandSecondaryColor", label: "Palette gold/secondary color" },
  { key: "brandAccentColor", label: "Palette accent color" },
  { key: "brandTextColor", label: "Palette text color" },
  { key: "brandBackgroundColor", label: "Palette background color" },
  { key: "logoMarkColor", label: "Logo mark color" },
  { key: "logoAccentColor", label: "Logo sunrise accent color" },
  { key: "logoTextColor", label: "Logo text color" },
  { key: "logoTaglineColor", label: "Logo tagline color" },
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
  { key: "emailFrom", label: "Email sender to use" },
  { key: "contactNotificationEmail", label: "Contact enquiry inbox" },
  { key: "volunteerNotificationEmail", label: "Volunteer enquiry inbox" },
  { key: "donationNotificationEmail", label: "Donation notification inbox" },
  { key: "donorNotificationEmail", label: "Donor account notification inbox" },
  { key: "contactAdminEmailSubject", label: "Contact admin email subject" },
  { key: "contactAdminEmailBody", label: "Contact admin email body", multiline: true },
  { key: "contactVisitorEmailSubject", label: "Contact visitor email subject" },
  { key: "contactVisitorEmailBody", label: "Contact visitor email body", multiline: true },
  { key: "donationAdminEmailSubject", label: "Donation admin email subject" },
  { key: "donationAdminEmailBody", label: "Donation admin email body", multiline: true },
  { key: "donationVisitorEmailSubject", label: "Donation visitor email subject" },
  { key: "donationVisitorEmailBody", label: "Donation visitor email body", multiline: true },
  { key: "donorWelcomeEmailSubject", label: "Donor welcome email subject" },
  { key: "donorWelcomeEmailBody", label: "Donor welcome email body", multiline: true },
  { key: "donorAdminEmailSubject", label: "Donor admin email subject" },
  { key: "donorAdminEmailBody", label: "Donor admin email body", multiline: true },
  { key: "newsletterWelcomeEmailSubject", label: "Newsletter welcome email subject" },
  { key: "newsletterWelcomeEmailBody", label: "Newsletter welcome email body", multiline: true },
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
  { key: "receiptTitle", label: "Receipt PDF title" },
  { key: "receiptSubtitle", label: "Receipt PDF subtitle" },
  { key: "receiptLegalNote", label: "Receipt legal note", multiline: true },
  { key: "receiptFooterNote", label: "Receipt footer note", multiline: true },
  { key: "receiptSignatureName", label: "Receipt signature name" },
  { key: "founderStory", label: "Founder story", multiline: true },
  { key: "teamEyebrow", label: "Team section small label" },
  { key: "teamTitle", label: "Team section title" },
  { key: "teamDescription", label: "Team section description", multiline: true },
  { key: "volunteerTitle", label: "Volunteer title" },
  { key: "volunteerEyebrow", label: "Volunteer small label" },
  { key: "volunteerDescription", label: "Volunteer description", multiline: true },
  { key: "contactEmail", label: "Contact email" },
  { key: "contactPhone", label: "Contact phone" },
  { key: "contactLocation", label: "Contact location" },
  { key: "footerLegalTitle", label: "Footer legal links title" },
];

function isColorField(key: keyof SiteContent) {
  return String(key).toLowerCase().includes("color") || key === "ctaBackground";
}

const listLabels: Record<ListKey, string> = {
  missionPillars: "Mission Cards",
  programCards: "Program Cards",
  whyFeatures: "Why Vihana Cards",
  impactStats: "Impact Numbers",
  impactNotes: "Impact Notes",
  volunteerActions: "Volunteer Actions",
  eventItems: "Events",
  annualReports: "Annual Reports / PDFs",
  teamMembers: "Team Members",
  testimonials: "Testimonials",
  faqs: "FAQ",
  newsItems: "News / Activities",
};

const listHelp: Record<ListKey, { first: string; second: string; body: keyof EditableItem; bodyLabel: string }> = {
  missionPillars: { first: "Title", second: "Small label / value", body: "description", bodyLabel: "Description" },
  programCards: { first: "Program title", second: "Small label / value", body: "description", bodyLabel: "Description" },
  whyFeatures: { first: "Title", second: "Small label / value", body: "description", bodyLabel: "Description" },
  impactStats: { first: "Label", second: "Number", body: "description", bodyLabel: "Short explanation" },
  impactNotes: { first: "Title", second: "Small label / value", body: "description", bodyLabel: "Description" },
  volunteerActions: { first: "Action title", second: "Small label / value", body: "description", bodyLabel: "Description" },
  eventItems: { first: "Event title", second: "Date", body: "description", bodyLabel: "Event details" },
  annualReports: { first: "Report title", second: "Year / status", body: "description", bodyLabel: "Description" },
  teamMembers: { first: "Name", second: "Role", body: "description", bodyLabel: "Bullet points, one per line" },
  testimonials: { first: "Person name", second: "Role", body: "quote", bodyLabel: "Quote" },
  faqs: { first: "Question", second: "Optional label", body: "answer", bodyLabel: "Answer" },
  newsItems: { first: "News title", second: "Date", body: "summary", bodyLabel: "Summary" },
};

const quickActions: { tab: Tab; title: string; description: string; icon: typeof Pencil }[] = [
  { tab: "pageStudio", title: "Page Studio", description: "Start here to edit the website page by page.", icon: LayoutList },
  { tab: "content", title: "Edit Website Text", description: "Hero, mission, donate, contact, footer and SEO text.", icon: Pencil },
  { tab: "pages", title: "Edit Pages", description: "About, Contact, Legal pages and any new page.", icon: FileText },
  { tab: "media", title: "Change Images", description: "Logo, favicon, hero image, mission image and donation image.", icon: ImagePlus },
  { tab: "sections", title: "Edit Cards", description: "Programs, impact numbers, FAQ, news, events and reports.", icon: LayoutList },
  { tab: "navigation", title: "Menu & Social Links", description: "Website menu, footer links and social media.", icon: Navigation },
  { tab: "donations", title: "Donation Reports", description: "Donation records, donor reports and CSV downloads.", icon: BadgeIndianRupee },
  { tab: "accounting", title: "Accounting", description: "Expenses, receipts, bills and annual statements.", icon: ReceiptText },
];

const socialIconPresets = [
  { label: "Instagram", mark: "IG" },
  { label: "Facebook", mark: "f" },
  { label: "YouTube", mark: "YT" },
  { label: "LinkedIn", mark: "in" },
  { label: "X", mark: "X" },
  { label: "Website", mark: "WWW" },
];

const cmsGuardrails = [
  ["Hero title", "Keep each headline line under 28 characters. Put the emotional word in the highlighted title field."],
  ["Section titles", "Aim for 35-55 characters. Long titles should be split naturally with commas or short phrases."],
  ["Descriptions", "Use 120-180 characters for section descriptions and 220 characters maximum for card descriptions."],
  ["Buttons", "Keep button text between 2-4 words, for example Donate Now, Join Us, Our Story."],
  ["Gallery/Event cards", "Use short titles under 45 characters and descriptions under 140 characters."],
  ["Legal pages", "Long text is fine, but use short paragraphs separated by blank lines."],
];

const imageGuardrails = [
  ["Logo", "Square PNG/SVG, 512 x 512 px recommended, transparent background preferred."],
  ["Favicon", "Square PNG/SVG, 64 x 64 or 512 x 512 px. Keep it simple with no text."],
  ["Hero image", "Landscape 1600 x 1100 px, under 700 KB, subject centered for mobile crop."],
  ["Page images", "Landscape 1400 x 720 px, under 700 KB, avoid text inside images."],
  ["Gallery/Event images", "Landscape 1200 x 900 px or 4:3 ratio, under 700 KB."],
  ["Team photos", "Square 800 x 800 px, face centered, consistent lighting."],
];

const mediaUploadTips: Record<string, string> = {
  logoImageUrl: "Recommended: square 512 x 512 px PNG/SVG, transparent background, under 700 KB. Avoid tiny text inside the logo.",
  faviconImageUrl: "Recommended: square 64 x 64 or 512 x 512 px PNG/SVG, under 200 KB. Use only the icon mark, no words.",
  heroImageUrl: "Recommended: landscape 1600 x 1100 px, under 700 KB. Keep the main face/subject centered for mobile cropping.",
  missionImageUrl: "Recommended: landscape 1400 x 900 px, under 700 KB. Use warm real program-style photos with space around faces.",
  donationImageUrl: "Recommended: landscape 1400 x 900 px, under 700 KB. Avoid text in the image and keep people centered.",
};

const fieldGuides: Partial<Record<keyof SiteContent, string>> = {
  brandName: "Recommended: 2-4 words. Example: Vihana Foundation.",
  brandTagline: "Recommended: 3-6 words. Example: Small Steps. Lifelong Impact.",
  heroTitle: "Recommended: under 28 characters. Keep this as the first bold line.",
  heroHighlight: "Recommended: under 28 characters. Use the emotional highlight here.",
  heroDescription: "Recommended: 120-180 characters. Keep it warm, clear and easy to read on mobile.",
  heroPrimaryLabel: "Recommended: 2-4 words. Example: Join the Movement.",
  heroSecondaryLabel: "Recommended: 2-4 words. Example: Our Story.",
  missionTitle: "Recommended: 35-55 characters. Avoid very long single-line headings.",
  missionDescription: "Recommended: 120-180 characters. One clear paragraph works best.",
  programsTitle: "Recommended: 35-60 characters. Keep it scan-friendly.",
  programsDescription: "Recommended: 120-180 characters.",
  impactTitle: "Recommended: 35-55 characters.",
  galleryTitle: "Recommended: 35-55 characters.",
  galleryFeatureTitle: "Recommended: 45 characters or less.",
  galleryFeatureDescription: "Recommended: 120-160 characters.",
  donateTitle: "Recommended: 35-55 characters.",
  donateDescription: "Recommended: 140-220 characters. Mention trust and clarity.",
  ctaHeading: "Recommended: 35-60 characters.",
  ctaDescription: "Recommended: 120-180 characters.",
  newsletterHeading: "Recommended: 35-55 characters.",
  newsletterDescription: "Recommended: 120-160 characters.",
  contactEmail: "Use a working inbox, for example contact@vihanafoundation.org.",
  contactPhone: "Use country code format, for example +91 98765 43210.",
  metaTitle: "Recommended: 50-60 characters for Google results.",
  metaDescription: "Recommended: 140-160 characters for Google results.",
};

function getFieldGuide(field: { key: keyof SiteContent; label: string; multiline?: boolean }) {
  if (fieldGuides[field.key]) {
    return fieldGuides[field.key];
  }

  if (isColorField(field.key)) {
    return "Use a 6-digit hex color, for example #0f766e.";
  }

  if (field.label.toLowerCase().includes("title")) {
    return "Recommended: 35-60 characters so headings stay clean on mobile.";
  }

  if (field.label.toLowerCase().includes("description") || field.multiline) {
    return "Recommended: 120-180 characters unless this is a legal/page body field.";
  }

  if (field.label.toLowerCase().includes("button")) {
    return "Recommended: 2-4 words.";
  }

  return "Keep this concise. Short text prevents layout breaks on mobile.";
}

function getFieldPlaceholder(field: { key: keyof SiteContent; label: string; multiline?: boolean }) {
  if (isColorField(field.key)) {
    return "#0f766e";
  }

  if (field.key === "brandName") {
    return "Vihana Foundation";
  }

  if (field.key === "brandTagline") {
    return "Small Steps. Lifelong Impact.";
  }

  if (field.label.toLowerCase().includes("button")) {
    return "Donate Now";
  }

  if (field.label.toLowerCase().includes("title")) {
    return "Short, clear heading";
  }

  if (field.multiline) {
    return "Write one clear paragraph. Keep it short for mobile.";
  }

  return field.label;
}

const contentGroups: {
  id: string;
  label: string;
  description: string;
  fields: (keyof SiteContent)[];
}[] = [
  {
    id: "home",
    label: "Brand / Hero",
    description: "Logo text, favicon, palette, main top section, buttons, hero stat and SEO preview image.",
    fields: [
      "brandName",
      "brandTagline",
      "faviconImageUrl",
      "brandPrimaryColor",
      "brandSecondaryColor",
      "brandAccentColor",
      "brandTextColor",
      "brandBackgroundColor",
      "logoMarkColor",
      "logoAccentColor",
      "logoTextColor",
      "logoTaglineColor",
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
    label: "Mission / About",
    description: "Mission copy, founder story, About page team section and the mission image section text.",
    fields: [
      "missionTitle",
      "missionEyebrow",
      "missionDescription",
      "missionStoryEyebrow",
      "missionStoryTitle",
      "missionStoryDescription",
      "founderStory",
      "teamEyebrow",
      "teamTitle",
      "teamDescription",
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
      "receiptTitle",
      "receiptSubtitle",
      "receiptLegalNote",
      "receiptFooterNote",
      "receiptSignatureName",
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
      "emailFrom",
      "contactNotificationEmail",
      "volunteerNotificationEmail",
      "donationNotificationEmail",
      "donorNotificationEmail",
      "contactAdminEmailSubject",
      "contactAdminEmailBody",
      "contactVisitorEmailSubject",
      "contactVisitorEmailBody",
      "donationAdminEmailSubject",
      "donationAdminEmailBody",
      "donationVisitorEmailSubject",
      "donationVisitorEmailBody",
      "donorWelcomeEmailSubject",
      "donorWelcomeEmailBody",
      "donorAdminEmailSubject",
      "donorAdminEmailBody",
      "newsletterWelcomeEmailSubject",
      "newsletterWelcomeEmailBody",
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

const pageWorkspaces: {
  id: string;
  title: string;
  description: string;
  guide: string[];
  actions: {
    label: string;
    tab: Tab;
    contentGroup?: string;
    pageSlug?: string;
    listKey?: ListKey | "featured";
  }[];
}[] = [
  {
    id: "home",
    title: "Home Page",
    description: "Hero, homepage message, main image, section order and first donation paths.",
    guide: ["Edit the hero headline and buttons.", "Replace the homepage hero image.", "Show, hide or reorder homepage sections."],
    actions: [
      { label: "Edit Home Text", tab: "content", contentGroup: "home" },
      { label: "Change Home Images", tab: "media" },
      { label: "Homepage Order", tab: "order" },
    ],
  },
  {
    id: "about",
    title: "About Vihana",
    description: "Foundation story, mission language, founder note, team members and About page content.",
    guide: ["Update the mission and founder story.", "Edit the About page body.", "Add, update or delete team members."],
    actions: [
      { label: "Mission Text", tab: "content", contentGroup: "mission" },
      { label: "About Page", tab: "pages", pageSlug: "about-vihana" },
      { label: "Team Members", tab: "sections", listKey: "teamMembers" },
      { label: "Mission Image", tab: "media" },
    ],
  },
  {
    id: "programs",
    title: "Programs, Impact & Gallery",
    description: "Program cards, impact numbers, news, events, reports and gallery photos.",
    guide: ["Update program and impact headings.", "Edit cards, FAQs, testimonials, news and reports.", "Add real photos to the gallery."],
    actions: [
      { label: "Programs Text", tab: "content", contentGroup: "programs" },
      { label: "Cards & FAQs", tab: "sections" },
      { label: "Gallery Photos", tab: "gallery" },
    ],
  },
  {
    id: "donate",
    title: "Donate Page",
    description: "Donation copy, UPI, bank details, legal trust signals and donation reports.",
    guide: ["Update donation text and payment details.", "Review transaction reports.", "Keep legal trust information accurate."],
    actions: [
      { label: "Donate Text", tab: "content", contentGroup: "donate" },
      { label: "Donation Image", tab: "media" },
      { label: "Donation Reports", tab: "donations" },
    ],
  },
  {
    id: "contact",
    title: "Contact & Volunteer",
    description: "Contact details, WhatsApp, volunteer copy, footer CTA and received messages.",
    guide: ["Update email, phone, location and WhatsApp.", "Read volunteer/contact submissions.", "Edit the Contact page if needed."],
    actions: [
      { label: "Contact Text", tab: "content", contentGroup: "contact" },
      { label: "Contact Page", tab: "pages", pageSlug: "contact-us" },
      { label: "Messages", tab: "messages" },
    ],
  },
  {
    id: "legal",
    title: "Legal Pages",
    description: "Privacy Policy, Terms, Cookie Policy, Disclaimer and Refund Policy pages.",
    guide: ["Open each legal page.", "Add final registration, PAN and 80G details after verification.", "Keep donation policy language legally reviewed."],
    actions: [
      { label: "Privacy Policy", tab: "pages", pageSlug: "privacy-policy" },
      { label: "Terms", tab: "pages", pageSlug: "terms-and-conditions" },
      { label: "Refund Policy", tab: "pages", pageSlug: "refund-cancellation-policy" },
    ],
  },
  {
    id: "newsletter",
    title: "Newsletter",
    description: "Newsletter website section, email template, subscribers and send controls.",
    guide: ["Edit website newsletter text.", "Edit the outgoing email template.", "Send only after checking the preview."],
    actions: [
      { label: "Newsletter Text", tab: "content", contentGroup: "news" },
      { label: "Email Template", tab: "email" },
      { label: "Subscribers", tab: "subscribers" },
    ],
  },
  {
    id: "accounting",
    title: "Accounting & Compliance",
    description: "Donation ledger, expenses, receipts, bills, statements and supporting documents.",
    guide: ["Add expenses, bills and receipt records.", "Attach bill or receipt documents.", "Export CSV for accountant or annual reporting."],
    actions: [
      { label: "Accounting Register", tab: "accounting" },
      { label: "Donation Reports", tab: "donations" },
      { label: "Annual Reports", tab: "sections", listKey: "annualReports" },
    ],
  },
  {
    id: "navigation",
    title: "Menu, Footer & Social",
    description: "Website navigation, social media icons, footer links and SEO metadata.",
    guide: ["Update menu labels and links.", "Add social accounts and icons.", "Update SEO title, description and share image."],
    actions: [
      { label: "Menu & Social", tab: "navigation" },
      { label: "SEO", tab: "content", contentGroup: "seo" },
      { label: "Images", tab: "media" },
    ],
  },
];

const emailTemplateComposers: {
  id: string;
  title: string;
  description: string;
  subjectKey: keyof SiteContent;
  bodyKey: keyof SiteContent;
  sentTo: string;
  placeholders: string[];
}[] = [
  {
    id: "contact-admin",
    title: "Admin alert: contact / volunteer enquiry",
    description: "Sent to the selected internal inbox when someone submits the contact or volunteer form.",
    subjectKey: "contactAdminEmailSubject",
    bodyKey: "contactAdminEmailBody",
    sentTo: "Contact, volunteer or donation inbox based on enquiry type",
    placeholders: ["{{name}}", "{{email}}", "{{phone}}", "{{interest}}", "{{message}}", "{{createdAt}}"],
  },
  {
    id: "contact-visitor",
    title: "Visitor reply: contact / volunteer enquiry",
    description: "Sent to the person who submitted the contact or volunteer form.",
    subjectKey: "contactVisitorEmailSubject",
    bodyKey: "contactVisitorEmailBody",
    sentTo: "Website visitor",
    placeholders: ["{{name}}", "{{email}}", "{{phone}}", "{{interest}}", "{{message}}"],
  },
  {
    id: "donation-admin",
    title: "Admin alert: donation intent",
    description: "Sent to the donation inbox when a donation intent or transaction reference is submitted.",
    subjectKey: "donationAdminEmailSubject",
    bodyKey: "donationAdminEmailBody",
    sentTo: "Donation inbox",
    placeholders: ["{{name}}", "{{email}}", "{{phone}}", "{{amount}}", "{{frequency}}", "{{purpose}}", "{{method}}", "{{transactionId}}", "{{receiptRequired}}", "{{receiptNumber}}", "{{receiptStatus}}", "{{receiptIssuedAt}}", "{{pan}}", "{{address}}", "{{message}}", "{{createdAt}}"],
  },
  {
    id: "donation-visitor",
    title: "Donor reply: donation acknowledgement",
    description: "Sent to the donor after they submit donation details.",
    subjectKey: "donationVisitorEmailSubject",
    bodyKey: "donationVisitorEmailBody",
    sentTo: "Donor",
    placeholders: ["{{name}}", "{{amount}}", "{{frequency}}", "{{purpose}}", "{{method}}", "{{transactionId}}", "{{receiptNumber}}", "{{receiptStatus}}", "{{receiptIssuedAt}}", "{{receiptDownloadUrl}}"],
  },
  {
    id: "donor-welcome",
    title: "Donor account welcome",
    description: "Sent when a donor creates an account.",
    subjectKey: "donorWelcomeEmailSubject",
    bodyKey: "donorWelcomeEmailBody",
    sentTo: "Donor account email",
    placeholders: ["{{name}}", "{{email}}", "{{phone}}", "{{donorType}}"],
  },
  {
    id: "donor-admin",
    title: "Admin alert: donor account created",
    description: "Sent internally when a donor account is created.",
    subjectKey: "donorAdminEmailSubject",
    bodyKey: "donorAdminEmailBody",
    sentTo: "Donor notification inbox",
    placeholders: ["{{name}}", "{{email}}", "{{phone}}", "{{donorType}}", "{{pan}}", "{{address}}", "{{createdAt}}"],
  },
  {
    id: "newsletter-welcome",
    title: "Newsletter welcome email",
    description: "Sent when someone subscribes to the newsletter.",
    subjectKey: "newsletterWelcomeEmailSubject",
    bodyKey: "newsletterWelcomeEmailBody",
    sentTo: "Subscriber",
    placeholders: ["{{email}}", "{{createdAt}}"],
  },
  {
    id: "newsletter-campaign",
    title: "Newsletter campaign",
    description: "This is the campaign template sent from the Newsletter tab to all subscribers.",
    subjectKey: "newsletterEmailSubject",
    bodyKey: "newsletterEmailBody",
    sentTo: "All subscribers",
    placeholders: [],
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

function dateParts(value?: string) {
  const date = value ? new Date(value) : new Date();

  if (Number.isNaN(date.getTime())) {
    return { day: "Unknown date", month: "Unknown month", year: "Unknown year" };
  }

  const day = date.toISOString().slice(0, 10);
  const month = date.toLocaleString("en-IN", { month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
  const year = date.toLocaleString("en-IN", { year: "numeric", timeZone: "Asia/Kolkata" });

  return { day, month, year };
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
  initialAccountingRecords,
}: AdminDashboardProps) {
  const [tab, setTab] = useState<Tab>("pageStudio");
  const [content, setContent] = useState(initialContent);
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [messages] = useState(initialMessages);
  const [visitors] = useState(initialVisitors);
  const [donations, setDonations] = useState(initialDonations);
  const [donors] = useState(initialDonors);
  const [subscribers] = useState(initialSubscribers);
  const [accountingRecords, setAccountingRecords] = useState(initialAccountingRecords);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [accountingDocumentPreview, setAccountingDocumentPreview] = useState("");
  const [sendingNewsletter, setSendingNewsletter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [donationSearch, setDonationSearch] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [contentGroup, setContentGroup] = useState(contentGroups[0].id);
  const [activePageId, setActivePageId] = useState(initialContent.pages[0]?.id || "");
  const [activeListKey, setActiveListKey] = useState<ListKey | "featured" | "all">("all");

  const tabs = useMemo(
    () => [
      { id: "overview" as const, label: "Dashboard", icon: Settings },
      { id: "pageStudio" as const, label: "Page Studio", icon: LayoutList },
      { id: "content" as const, label: "Website Text", icon: Pencil },
      { id: "pages" as const, label: "Pages", icon: FileText },
      { id: "sections" as const, label: "Section Cards", icon: LayoutList },
      { id: "media" as const, label: "Images", icon: ImagePlus },
      { id: "gallery" as const, label: "Gallery", icon: ImagePlus },
      { id: "navigation" as const, label: "Menu & Social", icon: Navigation },
      { id: "order" as const, label: "Homepage Order", icon: Settings },
      { id: "email" as const, label: "Email Composer", icon: Mail },
      { id: "donations" as const, label: "Donations", icon: BadgeIndianRupee },
      { id: "accounting" as const, label: "Accounting", icon: ReceiptText },
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
  const visibleListKeys = activeListKey === "all" || activeListKey === "featured" ? (Object.keys(listLabels) as ListKey[]) : [activeListKey];
  const cmsSearchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    const matches = (...parts: unknown[]) =>
      parts
        .filter((part) => part !== undefined && part !== null)
        .join(" ")
        .toLowerCase()
        .includes(query);

    const results: SearchResult[] = [];

    contentFields.forEach((field) => {
      const group = contentGroups.find((item) => item.fields.includes(field.key)) || contentGroups[0];
      const value = String(content[field.key] || "");

      if (matches(field.label, field.key, value, group.label)) {
        results.push({
          id: `content-${String(field.key)}`,
          title: field.label,
          description: `Website Text / ${group.label}`,
          tab: "content",
          action: () => {
            setTab("content");
            setContentGroup(group.id);
          },
        });
      }
    });

    content.pages.forEach((page) => {
      if (matches(page.title, page.slug, page.description, page.body, page.buttonLabel, page.buttonHref)) {
        results.push({
          id: `page-${page.id}`,
          title: page.title || page.slug,
          description: `Pages / ${page.slug}`,
          tab: "pages",
          action: () => {
            setTab("pages");
            setActivePageId(page.id);
          },
        });
      }
    });

    if (
      matches(
        "Featured Impact Story",
        content.featuredStory.title,
        content.featuredStory.name,
        content.featuredStory.description,
        content.featuredStory.linkLabel,
        content.featuredStory.linkHref
      )
    ) {
      results.push({
        id: "featured-story",
        title: content.featuredStory.title || "Featured Impact Story",
        description: "Section Cards / Featured Impact Story",
        tab: "sections",
        action: () => {
          setActiveListKey("featured");
          setTab("sections");
        },
      });
    }

    (Object.keys(listLabels) as ListKey[]).forEach((listKey) => {
      content[listKey].forEach((item, index) => {
        if (
          matches(
            listLabels[listKey],
            item.title,
            item.description,
            item.value,
            item.name,
            item.role,
            item.quote,
            item.question,
            item.answer,
            item.summary,
            item.date,
            item.linkLabel,
            item.linkHref
          )
        ) {
          results.push({
            id: `${listKey}-${item.id || index}`,
            title: item.title || item.name || item.question || listLabels[listKey],
            description: `Section Cards / ${listLabels[listKey]}`,
            tab: "sections",
            action: () => {
              setActiveListKey(listKey);
              setTab("sections");
            },
          });
        }
      });
    });

    galleryItems.forEach((item) => {
      if (matches(item.title, item.description, item.tag, item.imageUrl)) {
        results.push({
          id: `gallery-${item.id}`,
          title: item.title || "Gallery image",
          description: "Gallery / Images",
          tab: "gallery",
          action: () => setTab("gallery"),
        });
      }
    });

    content.navigationItems.forEach((item, index) => {
      if (matches(item.label, item.href)) {
        results.push({
          id: `navigation-${index}`,
          title: item.label || "Navigation item",
          description: "Menu & Social / Website menu",
          tab: "navigation",
          action: () => setTab("navigation"),
        });
      }
    });

    content.socialLinks.forEach((item, index) => {
      if (matches(item.label, item.href, item.iconImageUrl)) {
        results.push({
          id: `social-${item.id || index}`,
          title: item.label || "Social media link",
          description: "Menu & Social / Social links",
          tab: "navigation",
          action: () => setTab("navigation"),
        });
      }
    });

    donations.forEach((item) => {
      if (matches(item.name, item.email, item.phone, item.amount, item.method, item.transactionId, item.purpose, item.status, item.createdAt)) {
        results.push({
          id: `donation-${item.id}`,
          title: item.name || item.email || "Donation record",
          description: `Donations / ${item.amount || "Amount not entered"}`,
          tab: "donations",
          action: () => setTab("donations"),
        });
      }
    });

    donors.forEach((item) => {
      if (matches(item.name, item.email, item.phone, item.donorType, item.pan, item.address, item.createdAt)) {
        results.push({
          id: `donor-${item.id}`,
          title: item.name || item.email || "Donor account",
          description: "Donors / Accounts",
          tab: "donors",
          action: () => setTab("donors"),
        });
      }
    });

    messages.forEach((item) => {
      if (matches(item.name, item.email, item.phone, item.interest, item.message, item.createdAt)) {
        results.push({
          id: `message-${item.id}`,
          title: item.name || item.email || "Message",
          description: "Messages / Contact and volunteer forms",
          tab: "messages",
          action: () => setTab("messages"),
        });
      }
    });

    subscribers.forEach((item) => {
      if (matches(item.email, item.source, item.createdAt)) {
        results.push({
          id: `subscriber-${item.id}`,
          title: item.email || "Newsletter subscriber",
          description: "Newsletter / Subscribers",
          tab: "subscribers",
          action: () => setTab("subscribers"),
        });
      }
    });

    accountingRecords.forEach((item) => {
      if (matches(item.type, item.title, item.amount, item.category, item.date, item.party, item.reference, item.status, item.notes)) {
        results.push({
          id: `accounting-${item.id}`,
          title: item.title || "Accounting record",
          description: `Accounting / ${item.type || "Record"}`,
          tab: "accounting",
          action: () => setTab("accounting"),
        });
      }
    });

    visitors.forEach((item) => {
      if (matches(item.path, item.referrer, item.language, item.timezone, item.ipAddress, item.createdAt)) {
        results.push({
          id: `visitor-${item.id}`,
          title: item.path || "Visitor",
          description: "Visitors / Analytics",
          tab: "visitors",
          action: () => setTab("visitors"),
        });
      }
    });

    return results.slice(0, 18);
  }, [accountingRecords, content, donations, donors, galleryItems, messages, searchQuery, subscribers, visitors]);
  const donationSummary = useMemo(() => {
    const total = donations.reduce((sum, donation) => sum + currencyAmount(donation.amount), 0);
    const receiptCount = donations.filter((donation) => donation.receiptRequired === "Yes").length;
    const monthlyCount = donations.filter((donation) => donation.frequency === "Monthly").length;
    const uniqueDonors = new Set(donations.map((donation) => donation.email?.toLowerCase()).filter(Boolean)).size;
    const todayKey = dateParts(new Date().toISOString()).day;
    const monthKey = dateParts(new Date().toISOString()).month;
    const yearKey = dateParts(new Date().toISOString()).year;
    const byDay: Record<string, number> = {};
    const byMonth: Record<string, number> = {};
    const byYear: Record<string, number> = {};
    const byDonor: Record<string, number> = {};
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

    donations.forEach((donation) => {
      const amount = currencyAmount(donation.amount);
      const parts = dateParts(donation.createdAt || donation.receiptIssuedAt);
      const donorKey = donation.name || donation.email || donation.phone || "Unknown donor";
      byDay[parts.day] = (byDay[parts.day] || 0) + amount;
      byMonth[parts.month] = (byMonth[parts.month] || 0) + amount;
      byYear[parts.year] = (byYear[parts.year] || 0) + amount;
      byDonor[donorKey] = (byDonor[donorKey] || 0) + amount;
    });

    return {
      total,
      todayTotal: byDay[todayKey] || 0,
      monthTotal: byMonth[monthKey] || 0,
      yearTotal: byYear[yearKey] || 0,
      receiptCount,
      monthlyCount,
      uniqueDonors,
      byPurpose,
      byMethod,
      byDay: Object.entries(byDay).sort(([a], [b]) => b.localeCompare(a)).slice(0, 7),
      byMonth: Object.entries(byMonth).slice(-6).reverse(),
      byYear: Object.entries(byYear).sort(([a], [b]) => b.localeCompare(a)),
      byDonor: Object.entries(byDonor).sort(([, a], [, b]) => b - a).slice(0, 10),
    };
  }, [donations]);
  const filteredDonations = useMemo(() => {
    const query = donationSearch.trim().toLowerCase();

    if (!query) {
      return donations;
    }

    return donations.filter((donation) =>
      [
        donation.name,
        donation.email,
        donation.phone,
        donation.amount,
        donation.method,
        donation.transactionId,
        donation.purpose,
        donation.receiptNumber,
        donation.receiptStatus,
        donation.status,
        donation.createdAt,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [donationSearch, donations]);
  const accountingSummary = useMemo(() => {
    const byType = accountingRecords.reduce<Record<string, number>>((accumulator, record) => {
      const type = record.type || "Record";
      accumulator[type] = (accumulator[type] || 0) + currencyAmount(record.amount);
      return accumulator;
    }, {});
    const expenses = accountingRecords
      .filter((record) => (record.type || "").toLowerCase().includes("expense") || (record.type || "").toLowerCase().includes("bill"))
      .reduce((sum, record) => sum + currencyAmount(record.amount), 0);
    const receipts = accountingRecords
      .filter((record) => (record.type || "").toLowerCase().includes("receipt"))
      .reduce((sum, record) => sum + currencyAmount(record.amount), 0);

    return { byType, expenses, receipts };
  }, [accountingRecords]);

  useEffect(() => {
    if (!hasUnsavedChanges) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  function markUnsaved(message = "You have unsaved changes. Click Save Changes to publish them.") {
    setHasUnsavedChanges(true);
    setStatus(message);
  }

  function changeTab(nextTab: Tab) {
    if (hasUnsavedChanges && nextTab !== tab && !window.confirm("You have unsaved changes. Switch sections without saving?")) {
      return;
    }

    setTab(nextTab);
  }

  function openWorkspaceAction(action: (typeof pageWorkspaces)[number]["actions"][number]) {
    if (action.contentGroup) {
      setContentGroup(action.contentGroup);
    }

    if (action.pageSlug) {
      const page = content.pages.find((item) => item.slug === action.pageSlug);
      if (page) {
        setActivePageId(page.id);
      }
    }

    if (action.listKey) {
      setActiveListKey(action.listKey);
    }

    changeTab(action.tab);
  }

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
    if (response.ok) {
      setHasUnsavedChanges(false);
    }
    setStatus(response.ok ? successMessage : "Could not save website.");
  }

  async function saveContent(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    await persistContent(content);
  }

  function updateContent(key: keyof SiteContent, value: string) {
    setContent((current) => ({ ...current, [key]: value }));
    markUnsaved();
  }

  function updateNavigation(index: number, key: keyof NavigationItem, value: string) {
    setContent((current) => ({
      ...current,
      navigationItems: current.navigationItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      ),
    }));
    markUnsaved();
  }

  function addNavigationItem() {
    setContent((current) => ({
      ...current,
      navigationItems: [...current.navigationItems, { label: "New Link", href: "/" }],
    }));
    markUnsaved("Navigation updated. Click Save to publish it.");
  }

  function removeNavigationItem(index: number) {
    if (!window.confirm("Delete this navigation link?")) {
      return;
    }

    setContent((current) => ({
      ...current,
      navigationItems: current.navigationItems.filter((_, itemIndex) => itemIndex !== index),
    }));
    markUnsaved("Navigation updated. Click Save to publish it.");
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
    markUnsaved();
  }

  function addSocialLink() {
    setContent((current) => ({
      ...current,
      socialLinks: [...current.socialLinks, emptySocialLink()],
    }));
    markUnsaved("Social links updated. Click Save to publish it.");
  }

  function removeSocialLink(index: number) {
    if (!window.confirm("Delete this social media link?")) {
      return;
    }

    setContent((current) => ({
      ...current,
      socialLinks: current.socialLinks.filter((_, itemIndex) => itemIndex !== index),
    }));
    markUnsaved("Social links updated. Click Save to publish it.");
  }

  function applySocialPreset(index: number, label: string) {
    setContent((current) => ({
      ...current,
      socialLinks: current.socialLinks.map((item, itemIndex) =>
        itemIndex === index ? { ...item, label, iconImageUrl: "" } : item
      ),
    }));
    markUnsaved("Social icon selected. Click Save to publish it.");
  }

  function updateSectionConfig(index: number, key: keyof SectionConfig, value: string | boolean) {
    setContent((current) => ({
      ...current,
      sectionOrder: current.sectionOrder.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [key]: value } : section
      ),
    }));
    markUnsaved();
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
    markUnsaved();
  }

  function addListItem(listKey: ListKey) {
    setContent((current) => ({
      ...current,
      [listKey]: [...current[listKey], emptyItem(listKey)],
    }));
    setActiveListKey(listKey);
    markUnsaved("Card list updated. Click Save to publish it.");
  }

  function removeListItem(listKey: ListKey, index: number) {
    if (!window.confirm(`Delete this item from ${listLabels[listKey]}?`)) {
      return;
    }

    setContent((current) => ({
      ...current,
      [listKey]: current[listKey].filter((_, itemIndex) => itemIndex !== index),
    }));
    markUnsaved("Card list updated. Click Save to publish it.");
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
    markUnsaved();
  }

  function updatePage(index: number, key: keyof CmsPage, value: string | boolean) {
    setContent((current) => ({
      ...current,
      pages: current.pages.map((page, pageIndex) => (pageIndex === index ? { ...page, [key]: value } : page)),
    }));
    markUnsaved();
  }

  function addPage() {
    const page = emptyPage();

    setContent((current) => ({
      ...current,
      pages: [...current.pages, page],
    }));
    setActivePageId(page.id);
    markUnsaved("Page list updated. Click Save to publish it.");
  }

  function removePage(index: number) {
    if (!window.confirm("Delete this page? This cannot be undone after saving.")) {
      return;
    }

    const nextActivePage = content.pages[index - 1] || content.pages[index + 1];

    setContent((current) => ({
      ...current,
      pages: current.pages.filter((_, pageIndex) => pageIndex !== index),
    }));
    setActivePageId(nextActivePage?.id || "");
    markUnsaved("Page list updated. Click Save to publish it.");
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

    if (file.size > 650000) {
      setStatus("Please choose a compressed PDF or image under 650 KB.");
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
    if (!window.confirm("Delete this gallery image?")) {
      return;
    }

    setStatus("");
    const response = await fetch(`/api/admin/gallery?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setGalleryItems((items) => items.filter((item) => item.id !== id));
      setStatus("Gallery item deleted.");
    }
  }

  async function addCashDonation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("Recording cash donation...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        amount: String(formData.get("amount") || ""),
        method: String(formData.get("method") || "Cash"),
        transactionId: String(formData.get("transactionId") || ""),
        purpose: String(formData.get("purpose") || ""),
        pan: String(formData.get("pan") || ""),
        address: String(formData.get("address") || ""),
        message: String(formData.get("message") || ""),
        receiptRequired: "Yes",
      }),
    });
    const result = (await response.json()) as { ok: boolean; donation?: DonationRecord; accountingRecord?: AccountingRecord; message?: string };

    setSaving(false);

    if (!response.ok || !result.donation) {
      setStatus(result.message || "Could not record cash donation.");
      return;
    }

    setDonations((records) => [result.donation as DonationRecord, ...records]);
    if (result.accountingRecord) {
      setAccountingRecords((records) => [result.accountingRecord as AccountingRecord, ...records]);
    }
    form.reset();
    setStatus(`Cash donation recorded. Receipt ${result.donation.receiptNumber || "generated"} is ready.`);
  }

  async function addAccountingRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("Saving accounting record...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/accounting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: String(formData.get("type") || ""),
        title: String(formData.get("title") || ""),
        amount: String(formData.get("amount") || ""),
        category: String(formData.get("category") || ""),
        date: String(formData.get("date") || ""),
        party: String(formData.get("party") || ""),
        reference: String(formData.get("reference") || ""),
        status: String(formData.get("status") || ""),
        notes: String(formData.get("notes") || ""),
        documentUrl: accountingDocumentPreview,
      }),
    });
    const result = (await response.json()) as { ok: boolean; item?: AccountingRecord; message?: string };

    setSaving(false);

    if (!response.ok || !result.item) {
      setStatus(result.message || "Could not save accounting record.");
      return;
    }

    setAccountingRecords((records) => [result.item as AccountingRecord, ...records]);
    setAccountingDocumentPreview("");
    form.reset();
    setStatus("Accounting record saved.");
  }

  async function deleteAccountingRecord(id: string) {
    if (!window.confirm("Delete this accounting record?")) {
      return;
    }

    const response = await fetch(`/api/admin/accounting?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setStatus("Could not delete accounting record.");
      return;
    }

    setAccountingRecords((records) => records.filter((record) => record.id !== id));
    setStatus("Accounting record deleted.");
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

  function openSearchResult(result: SearchResult) {
    result.action();
    setSearchQuery("");
    setStatus(`Opened ${result.title}. Update it, then click Save Changes.`);
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
            {hasUnsavedChanges ? <p className="rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700">Unsaved changes</p> : null}
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
        <section className="rounded-[8px] border border-teal-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">CMS Finder</p>
              <h2 className="mt-1 text-xl font-bold text-slate-950">Search anything you want to update</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Search page names, hero text, donations, emails, gallery items, FAQ, menu links or visitors. Click a result to open the correct editor.
              </p>
            </div>
            <div className="rounded-[8px] bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-amber-900 lg:max-w-sm">
              <HelpCircle className="mr-2 inline h-4 w-4" />
              After editing, always click Save Changes at the top before checking the website.
            </div>
          </div>

          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Example: hero, about page, donate amount, FAQ, newsletter, donor email..."
              className="h-14 w-full rounded-full border border-slate-200 bg-slate-50 pl-12 pr-5 text-base font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:shadow-sm"
            />
          </div>

          {searchQuery.trim() ? (
            <div className="mt-4 rounded-[8px] border border-slate-200 bg-slate-50 p-3">
              {cmsSearchResults.length ? (
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {cmsSearchResults.map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => openSearchResult(result)}
                      className="rounded-[8px] border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-sm"
                    >
                      <span className="block text-sm font-black text-slate-950">{result.title}</span>
                      <span className="mt-1 block text-xs font-bold uppercase tracking-[0.14em] text-teal-700">{result.description}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-[8px] bg-white p-5 text-sm font-semibold text-slate-600">
                  No result found. Try a shorter word like home, image, donation, contact, FAQ, page or email.
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {[
                ["1", "Search", "Type what you want to change."],
                ["2", "Open", "Click the matching result."],
                ["3", "Edit", "Update text, image, page or record."],
                ["4", "Save", "Click Save Changes and view site."],
              ].map(([step, title, description]) => (
                <div key={step} className="rounded-[8px] bg-teal-50 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black text-teal-700 shadow-sm">{step}</div>
                  <p className="mt-3 font-black text-slate-950">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-4 rounded-[8px] border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-wrap gap-2">
          {tabs.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => changeTab(item.id)}
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

        {tab === "pageStudio" ? (
          <div className="mt-6 grid gap-6">
            <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-700">Page-by-page CMS</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-950">Choose the website area you want to update</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                    These cards group the CMS by real website pages and admin jobs. Use them when you are not sure which technical tab contains the content.
                  </p>
                </div>
                <Button type="button" onClick={() => saveContent()} disabled={saving} className="h-11 rounded-full bg-teal-700 px-6 hover:bg-teal-800">
                  {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                  Save Changes
                </Button>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[8px] border border-teal-100 bg-teal-50 p-4">
                  <h3 className="text-sm font-black uppercase tracking-[0.18em] text-teal-900">Safe Text Lengths</h3>
                  <div className="mt-3 grid gap-2">
                    {cmsGuardrails.map(([label, detail]) => (
                      <p key={label} className="text-sm leading-6 text-teal-950">
                        <span className="font-bold">{label}:</span> {detail}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-[8px] border border-amber-100 bg-amber-50 p-4">
                  <h3 className="text-sm font-black uppercase tracking-[0.18em] text-amber-900">Image Size Guide</h3>
                  <div className="mt-3 grid gap-2">
                    {imageGuardrails.map(([label, detail]) => (
                      <p key={label} className="text-sm leading-6 text-amber-950">
                        <span className="font-bold">{label}:</span> {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {pageWorkspaces.map((workspace) => (
                  <article key={workspace.id} className="rounded-[8px] border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black text-slate-950">{workspace.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{workspace.description}</p>
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-white text-teal-700 shadow-sm">
                        <FileText className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-4 rounded-[8px] bg-white p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Guide</p>
                      <ul className="mt-3 grid gap-2">
                        {workspace.guide.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {workspace.actions.map((action) => (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() => openWorkspaceAction(action)}
                          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-teal-800 shadow-sm transition hover:bg-teal-700 hover:text-white"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : null}

        {tab === "overview" ? (
          <div className="mt-6 grid gap-6">
            <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-600">Start Here</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-950">What do you want to update?</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                    Use these shortcuts for common tasks. Save Changes at the top publishes website content updates.
                  </p>
                </div>
                <Button type="button" onClick={() => saveContent()} disabled={saving} className="h-11 rounded-full bg-teal-700 px-6 hover:bg-teal-800">
                  {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                  Save Changes
                </Button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={action.title}
                      type="button"
                      onClick={() => changeTab(action.tab)}
                      className="rounded-[8px] border border-slate-200 bg-slate-50 p-5 text-left transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:shadow-sm"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-white text-teal-700 shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-slate-950">{action.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              {[
                ["Messages", messages.length],
                ["Donations", donations.length],
                ["Accounting", accountingRecords.length],
                ["Donors", donors.length],
                ["Subscribers", subscribers.length],
                ["Visitors", visitorCount],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
                </div>
              ))}
            </section>
          </div>
        ) : null}

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
                <div className="my-4 rounded-[8px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Editing guide</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {cmsGuardrails.slice(0, 4).map(([label, detail]) => (
                      <p key={label} className="text-xs leading-5 text-slate-600">
                        <span className="font-bold text-slate-900">{label}:</span> {detail}
                      </p>
                    ))}
                  </div>
                </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {visibleContentFields.map((field) => (
                <label key={field.key} className={field.multiline ? "lg:col-span-2" : ""}>
                  <span className="text-sm font-bold text-slate-800">{field.label}</span>
                  {field.multiline ? (
                    <textarea
                      rows={4}
                      value={String(content[field.key])}
                      placeholder={getFieldPlaceholder(field)}
                      onChange={(event) => updateContent(field.key, event.target.value)}
                      className="mt-2 w-full resize-none rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600 focus:bg-white"
                    />
                  ) : (
                    <div className={isColorField(field.key) ? "mt-2 flex gap-2" : ""}>
                      {isColorField(field.key) ? (
                        <input
                          type="color"
                          value={/^#[0-9a-fA-F]{6}$/.test(String(content[field.key])) ? String(content[field.key]) : "#0f766e"}
                          onChange={(event) => updateContent(field.key, event.target.value)}
                          className="h-12 w-14 shrink-0 cursor-pointer rounded-[8px] border border-slate-200 bg-white p-1"
                          aria-label={`${field.label} picker`}
                        />
                      ) : null}
                      <input
                        value={String(content[field.key])}
                        placeholder={getFieldPlaceholder(field)}
                        onChange={(event) => updateContent(field.key, event.target.value)}
                        className={`${isColorField(field.key) ? "" : "mt-2"} h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600 focus:bg-white`}
                      />
                    </div>
                  )}
                  <p className="mt-2 text-xs leading-5 text-slate-500">{getFieldGuide(field)}</p>
                </label>
              ))}
            </div>
              </div>
            </div>
          </form>
        ) : null}

        {tab === "email" ? (
          <form onSubmit={saveContent} className="mt-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Email Template Composer</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  Edit every automatic email and choose which foundation inbox receives each type of enquiry.
                </p>
              </div>
              <Button type="submit" disabled={saving} className="h-11 rounded-full bg-teal-700 px-6 hover:bg-teal-800">
                {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                Save Email Settings
              </Button>
            </div>

            <section className="mt-5 rounded-[8px] bg-teal-50 p-4">
              <h3 className="font-black text-teal-950">Sending settings</h3>
              <p className="mt-1 text-sm leading-6 text-teal-800">
                The sender must be verified in Resend. Your current aliases are added as editable defaults.
              </p>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {[
                  ["emailFrom", "Sender email to use"],
                  ["contactNotificationEmail", "General contact inbox"],
                  ["volunteerNotificationEmail", "Volunteer enquiry inbox"],
                  ["donationNotificationEmail", "Donation inbox"],
                  ["donorNotificationEmail", "Donor account inbox"],
                ].map(([key, label]) => (
                  <label key={key}>
                    <span className="text-sm font-bold text-slate-800">{label}</span>
                    <input
                      value={String(content[key as keyof SiteContent] || "")}
                      onChange={(event) => updateContent(key as keyof SiteContent, event.target.value)}
                      className="mt-2 h-12 w-full rounded-[8px] border border-teal-100 bg-white px-4 outline-none focus:border-teal-600"
                    />
                  </label>
                ))}
              </div>
            </section>

            <div className="mt-5 grid gap-5">
              {emailTemplateComposers.map((template) => (
                <section key={template.id} className="rounded-[8px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
                    <div>
                      <h3 className="text-xl font-black text-slate-950">{template.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{template.description}</p>
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-700">Sent to: {template.sentTo}</p>
                    </div>
                    {template.placeholders.length ? (
                      <div className="rounded-[8px] bg-white p-3 lg:max-w-md">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Available placeholders</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {template.placeholders.map((placeholder) => (
                            <code key={placeholder} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                              {placeholder}
                            </code>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
                    <div className="grid gap-4">
                      <label>
                        <span className="text-sm font-bold text-slate-800">Subject</span>
                        <input
                          value={String(content[template.subjectKey] || "")}
                          onChange={(event) => updateContent(template.subjectKey, event.target.value)}
                          className="mt-2 h-12 w-full rounded-[8px] border border-slate-200 bg-white px-4 outline-none focus:border-teal-600"
                        />
                      </label>
                      <label>
                        <span className="text-sm font-bold text-slate-800">Email body</span>
                        <textarea
                          rows={8}
                          value={String(content[template.bodyKey] || "")}
                          onChange={(event) => updateContent(template.bodyKey, event.target.value)}
                          className="mt-2 w-full resize-y rounded-[8px] border border-slate-200 bg-white px-4 py-3 leading-7 outline-none focus:border-teal-600"
                        />
                      </label>
                    </div>

                    <div className="rounded-[8px] bg-white p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Preview</p>
                      <h4 className="mt-3 font-bold text-slate-950">{String(content[template.subjectKey] || "")}</h4>
                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{String(content[template.bodyKey] || "")}</p>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </form>
        ) : null}

        {tab === "media" ? (
          <div className="mt-6 grid gap-6">
            <section className="rounded-[8px] border border-amber-100 bg-amber-50 p-5 shadow-sm">
              <h2 className="text-xl font-bold text-amber-950">Image Upload Guide</h2>
              <p className="mt-2 text-sm leading-6 text-amber-900">
                Keep images compressed under 700 KB. Avoid placing important faces or text near the edges because mobile screens crop images differently.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {imageGuardrails.map(([label, detail]) => (
                  <div key={label} className="rounded-[8px] bg-white/70 p-3">
                    <p className="text-sm font-black text-slate-950">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Website Logo</h2>
              <p className="mt-2 text-slate-600">Upload the logo shown in the header and footer.</p>
              <p className="mt-3 rounded-[8px] bg-teal-50 px-3 py-2 text-sm font-semibold leading-6 text-teal-900">{mediaUploadTips.logoImageUrl}</p>
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
              <h2 className="text-xl font-bold text-slate-950">Favicon</h2>
              <p className="mt-2 text-slate-600">Upload the small browser-tab icon. A square PNG/SVG works best.</p>
              <p className="mt-3 rounded-[8px] bg-teal-50 px-3 py-2 text-sm font-semibold leading-6 text-teal-900">{mediaUploadTips.faviconImageUrl}</p>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageUpload(event, (value) => updateContent("faviconImageUrl", value))}
                className="mt-5 w-full rounded-[8px] border border-dashed border-slate-300 bg-slate-50 p-4 text-sm"
              />
              {content.faviconImageUrl ? (
                <div className="mt-5 flex items-center gap-4 rounded-[8px] border border-slate-200 bg-slate-50 p-4">
                  <Image
                    src={content.faviconImageUrl}
                    alt="Favicon preview"
                    width={64}
                    height={64}
                    unoptimized
                    className="h-12 w-12 rounded-[8px] object-contain"
                  />
                  <Button type="button" onClick={() => updateContent("faviconImageUrl", "/favicon.svg")} className="h-10 rounded-full bg-slate-950 px-5 hover:bg-slate-800">
                    Use Default Favicon
                  </Button>
                </div>
              ) : null}
            </section>

            <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Hero Image</h2>
              <p className="mt-2 text-slate-600">Upload the main image shown at the top of the homepage.</p>
              <p className="mt-3 rounded-[8px] bg-teal-50 px-3 py-2 text-sm font-semibold leading-6 text-teal-900">{mediaUploadTips.heroImageUrl}</p>
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
              <p className="mt-3 rounded-[8px] bg-teal-50 px-3 py-2 text-sm font-semibold leading-6 text-teal-900">{mediaUploadTips.missionImageUrl}</p>
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
              <p className="mt-3 rounded-[8px] bg-teal-50 px-3 py-2 text-sm font-semibold leading-6 text-teal-900">{mediaUploadTips.donationImageUrl}</p>
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
                      <p className="text-xs leading-5 text-slate-500 md:col-span-2">
                        Icon guide: square PNG/SVG, 128 x 128 px or 512 x 512 px, transparent background, under 200 KB.
                      </p>
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
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">Section Cards Filter</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Show only the group you want to edit, or show everything.</p>
                </div>
                <Button type="button" onClick={() => saveContent()} disabled={saving} className="h-10 rounded-full bg-teal-700 px-5 hover:bg-teal-800">
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Cards
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { key: "all" as const, label: "All" },
                  { key: "featured" as const, label: "Featured Story" },
                  ...(Object.keys(listLabels) as ListKey[]).map((key) => ({ key, label: listLabels[key] })),
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveListKey(item.key)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      activeListKey === item.key ? "bg-teal-700 text-white" : "bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-teal-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </section>

            {activeListKey === "all" || activeListKey === "featured" ? (
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
            ) : null}

            {visibleListKeys.map((listKey) => (
              <section key={listKey} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">{listLabels[listKey]}</h2>
                    <p className="mt-1 text-sm text-slate-500">Add, edit, delete and reorder these website items.</p>
                  </div>
                  <Button type="button" onClick={() => addListItem(listKey)} className="h-10 rounded-full bg-teal-700 px-5 hover:bg-teal-800">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
                <div className="mt-5 grid gap-4">
                  {content[listKey].map((item, index) => (
                    <div key={item.id} className="grid gap-3 rounded-[8px] border border-slate-200 bg-slate-50 p-4 lg:grid-cols-2">
                      <input
                        value={listKey === "testimonials" || listKey === "teamMembers" ? item.name || item.title : listKey === "faqs" ? item.question || item.title : item.title}
                        onChange={(event) => updateListItem(listKey, index, listKey === "testimonials" || listKey === "teamMembers" ? "name" : listKey === "faqs" ? "question" : "title", event.target.value)}
                        className="h-11 rounded-[8px] border border-slate-200 px-4"
                        placeholder={listHelp[listKey].first}
                      />
                      <input
                        value={listKey === "testimonials" || listKey === "teamMembers" ? item.role || item.value || "" : item.value || ""}
                        onChange={(event) => updateListItem(listKey, index, listKey === "testimonials" || listKey === "teamMembers" ? "role" : "value", event.target.value)}
                        className="h-11 rounded-[8px] border border-slate-200 px-4"
                        placeholder={listHelp[listKey].second}
                      />
                      {listKey === "teamMembers" ? (
                        <input
                          value={item.tag || ""}
                          onChange={(event) => updateListItem(listKey, index, "tag", event.target.value)}
                          className="h-11 rounded-[8px] border border-slate-200 px-4 lg:col-span-2"
                          placeholder="Superpowers: empathy, leadership, partnerships"
                        />
                      ) : null}
                      <textarea
                        value={String(item[listHelp[listKey].body] || "")}
                        onChange={(event) => updateListItem(listKey, index, listHelp[listKey].body, event.target.value)}
                        rows={3}
                        className="rounded-[8px] border border-slate-200 px-4 py-3 lg:col-span-2"
                        placeholder={listHelp[listKey].bodyLabel}
                      />
                      <p className="text-xs leading-5 text-slate-500 lg:col-span-2">
                        Text guide: keep titles under 45 characters, descriptions under 140 characters, and button text under 4 words.
                      </p>
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
                      <p className="text-xs leading-5 text-slate-500 lg:col-span-2">
                        Image guide: use 1200 x 900 px for cards/events/gallery, 800 x 800 px for team photos, under 700 KB.
                      </p>
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
                    <p className="text-xs leading-5 text-slate-500 lg:col-span-2">Page text guide: title under 55 characters, description 120-160 characters, body can be longer with short paragraphs separated by blank lines.</p>
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
                    <p className="text-xs leading-5 text-slate-500 lg:col-span-2">Page image guide: landscape 1400 x 720 px, under 700 KB, no text inside image.</p>
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
              <p className="mt-2 rounded-[8px] bg-teal-50 px-3 py-2 text-sm font-semibold leading-6 text-teal-900">
                Gallery guide: image 1200 x 900 px, under 700 KB. Title under 45 characters, description under 140 characters.
              </p>
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
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Total received</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">INR {donationSummary.total.toLocaleString("en-IN")}</h2>
              </div>
              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Today</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">INR {donationSummary.todayTotal.toLocaleString("en-IN")}</h2>
              </div>
              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">This month</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">INR {donationSummary.monthTotal.toLocaleString("en-IN")}</h2>
              </div>
              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">This year</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">INR {donationSummary.yearTotal.toLocaleString("en-IN")}</h2>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <form onSubmit={addCashDonation} className="rounded-[8px] border border-teal-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">Cash receipt</p>
                <h2 className="mt-2 text-xl font-black text-slate-950">Record offline donation</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use this when a donor gives cash or an offline transfer. A receipt number is generated instantly.
                </p>
                <datalist id="admin-donor-emails">
                  {donors.map((donor) => (
                    <option key={donor.id} value={donor.email}>
                      {donor.name}
                    </option>
                  ))}
                </datalist>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input name="name" required placeholder="Donor name" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="email" type="email" list="admin-donor-emails" placeholder="Email, if available" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="phone" placeholder="Phone" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="amount" required inputMode="numeric" placeholder="Amount received" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <select name="method" defaultValue="Cash" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600">
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                    <option>Cheque</option>
                  </select>
                  <select name="purpose" defaultValue="General Fund" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600">
                    <option>General Fund</option>
                    <option>Child Education</option>
                    <option>Nutritious Meals</option>
                    <option>Health and Wellness</option>
                    <option>Birthday Kindness Drive</option>
                  </select>
                  <input name="transactionId" placeholder="Reference / cheque no. optional" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="pan" placeholder="PAN for receipt, optional" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 uppercase outline-none focus:border-teal-600" />
                  <textarea name="address" rows={2} placeholder="Address for receipt records" className="rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600 sm:col-span-2" />
                  <textarea name="message" rows={2} placeholder="Internal note or dedication" className="rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600 sm:col-span-2" />
                </div>
                <Button disabled={saving} className="mt-4 h-11 rounded-full bg-teal-700 px-6 hover:bg-teal-800">
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ReceiptText className="mr-2 h-4 w-4" />}
                  Save Cash Donation & Generate Receipt
                </Button>
              </form>

              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">Reports</p>
                    <h2 className="mt-2 text-xl font-black text-slate-950">Donation dashboard</h2>
                  </div>
                  <Button type="button" variant="outline" onClick={() => downloadCsv("vihana-donation-report.csv", donations)} className="h-10 rounded-full" disabled={!donations.length}>
                    <Download className="mr-2 h-4 w-4" />
                    Donation CSV
                  </Button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Donors", donationSummary.uniqueDonors],
                    ["Monthly pledges", donationSummary.monthlyCount],
                    ["Receipt requests", donationSummary.receiptCount],
                    ["Records", donations.length],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[8px] bg-slate-50 px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                      <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
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

            <div className="grid gap-4 lg:grid-cols-4">
              {[
                ["Daily", donationSummary.byDay],
                ["Monthly", donationSummary.byMonth],
                ["Yearly", donationSummary.byYear],
                ["Donor wise", donationSummary.byDonor],
              ].map(([title, rows]) => (
                <div key={title as string} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-950">{title as string}</h2>
                  <div className="mt-4 grid gap-2">
                    {(rows as [string, number][]).length ? (
                      (rows as [string, number][]).map(([label, total]) => (
                        <div key={label} className="flex items-start justify-between gap-3 rounded-[8px] bg-slate-50 px-3 py-2 text-sm">
                          <span className="font-bold text-slate-700">{label}</span>
                          <span className="shrink-0 font-black text-teal-700">INR {total.toLocaleString("en-IN")}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">No records yet.</p>
                    )}
                  </div>
                </div>
              ))}
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
                <h2 className="text-lg font-bold text-slate-950">Method report</h2>
                <div className="mt-4 grid gap-3">
                  {Object.entries(donationSummary.byMethod).map(([method, count]) => (
                    <div key={method} className="flex items-center justify-between rounded-[8px] bg-slate-50 px-4 py-3 text-sm">
                      <span className="font-bold text-slate-700">{method}</span>
                      <span className="font-black text-teal-700">{count} records</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">Receipt search</p>
                  <h2 className="mt-2 text-xl font-black text-slate-950">Find donation or receipt</h2>
                </div>
                <label className="flex h-11 min-w-0 items-center gap-2 rounded-[8px] border border-slate-200 bg-slate-50 px-4 lg:w-[420px]">
                  <Search className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    value={donationSearch}
                    onChange={(event) => setDonationSearch(event.target.value)}
                    placeholder="Search name, email, phone, receipt no, reference..."
                    className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                </label>
              </div>
            </div>

            {filteredDonations.length ? (
              filteredDonations.map((donation) => (
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
                    <p><span className="font-bold text-slate-800">Receipt no:</span> {donation.receiptNumber || "Not generated"}</p>
                    <p><span className="font-bold text-slate-800">Receipt status:</span> {donation.receiptStatus || "Not available"}</p>
                    <p><span className="font-bold text-slate-800">PAN:</span> {donation.pan || "Not provided"}</p>
                    <p><span className="font-bold text-slate-800">Address:</span> {donation.address || "Not provided"}</p>
                    <p><span className="font-bold text-slate-800">Status:</span> {donation.status}</p>
                    <p><span className="font-bold text-slate-800">Date:</span> {donation.createdAt}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Button asChild type="button" variant="outline" className="h-10 rounded-full">
                      <a href={`/api/donor/receipt?id=${encodeURIComponent(donation.id)}`}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Receipt
                      </a>
                    </Button>
                    {donation.message ? <p className="text-sm leading-6 text-slate-700">{donation.message}</p> : null}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[8px] border border-slate-200 bg-white p-8 text-center text-slate-600">
                No donation records match this search.
              </div>
            )}
          </div>
        ) : null}

        {tab === "accounting" ? (
          <div className="mt-6 grid gap-5">
            <section className="grid gap-4 md:grid-cols-4">
              {[
                ["Records", accountingRecords.length],
                ["Expenses / Bills", `INR ${accountingSummary.expenses.toLocaleString("en-IN")}`],
                ["Receipts", `INR ${accountingSummary.receipts.toLocaleString("en-IN")}`],
                ["Net", `INR ${(accountingSummary.receipts - accountingSummary.expenses).toLocaleString("en-IN")}`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                  <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
                </div>
              ))}
            </section>

            <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
              <form onSubmit={addAccountingRecord} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-600">Accounting</p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">Add compliance record</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Maintain expenses, receipts, bills and annual statement records for transparency.
                  </p>
                </div>

                <div className="mt-5 grid gap-3">
                  <select name="type" defaultValue="Expense" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600">
                    <option>Donation</option>
                    <option>Expense</option>
                    <option>Receipt</option>
                    <option>Bill</option>
                    <option>Annual Statement</option>
                  </select>
                  <input name="title" required placeholder="Title, e.g. School kit purchase" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input name="amount" required inputMode="numeric" placeholder="Amount" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                    <input name="date" type="date" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input name="category" placeholder="Category" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                    <input name="party" placeholder="Vendor / donor / party" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input name="reference" placeholder="Bill / receipt / transaction no." className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                    <select name="status" defaultValue="Recorded" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600">
                      <option>Recorded</option>
                      <option>Pending verification</option>
                      <option>Verified</option>
                      <option>Audited</option>
                    </select>
                  </div>
                  <textarea name="notes" rows={4} placeholder="Notes for audit or transparency" className="rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600" />
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={(event) => handleDocumentUpload(event, setAccountingDocumentPreview)}
                    className="rounded-[8px] border border-dashed border-slate-300 bg-slate-50 p-4 text-sm"
                  />
                  {accountingDocumentPreview ? (
                    <p className="rounded-[8px] bg-teal-50 px-4 py-3 text-sm font-bold text-teal-800">
                      Document attached. Save the record to store it.
                    </p>
                  ) : null}
                </div>

                <Button type="submit" disabled={saving} className="mt-5 h-12 w-full rounded-full bg-teal-700 text-base hover:bg-teal-800">
                  {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ReceiptText className="mr-2 h-5 w-5" />}
                  Save Accounting Record
                </Button>
              </form>

              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-black text-slate-950">Accounting register</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Use this as an internal transparency ledger.</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => downloadCsv("vihana-accounting-register.csv", accountingRecords)}
                    className="h-10 rounded-full"
                    disabled={!accountingRecords.length}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </div>

                <div className="mt-5 grid gap-3">
                  {Object.entries(accountingSummary.byType).length ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {Object.entries(accountingSummary.byType).map(([type, total]) => (
                        <div key={type} className="rounded-[8px] bg-slate-50 px-4 py-3 text-sm">
                          <p className="font-bold text-slate-700">{type}</p>
                          <p className="mt-1 font-black text-teal-700">INR {total.toLocaleString("en-IN")}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {accountingRecords.length ? (
                    accountingRecords.map((record) => (
                      <article key={record.id} className="rounded-[8px] border border-slate-200 bg-slate-50 p-4">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-600">{record.type || "Record"}</p>
                            <h3 className="mt-1 font-bold text-slate-950">{record.title}</h3>
                            <p className="mt-1 text-sm text-slate-500">{record.category || "General"} | {record.date || "Date not added"}</p>
                          </div>
                          <p className="text-lg font-black text-teal-700">INR {record.amount}</p>
                        </div>
                        <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                          <p><span className="font-bold text-slate-800">Party:</span> {record.party || "Not added"}</p>
                          <p><span className="font-bold text-slate-800">Reference:</span> {record.reference || "Not added"}</p>
                          <p><span className="font-bold text-slate-800">Status:</span> {record.status || "Recorded"}</p>
                          <p><span className="font-bold text-slate-800">Created:</span> {record.createdAt || "Not available"}</p>
                        </div>
                        {record.notes ? <p className="mt-3 text-sm leading-6 text-slate-600">{record.notes}</p> : null}
                        <div className="mt-4 flex flex-wrap gap-3">
                          {record.documentUrl ? (
                            <a href={record.documentUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-teal-700">
                              View document
                            </a>
                          ) : null}
                          <button type="button" onClick={() => deleteAccountingRecord(record.id)} className="inline-flex h-10 items-center rounded-full px-4 text-sm font-bold text-rose-700">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="rounded-[8px] border border-dashed border-slate-300 p-8 text-center text-slate-600">
                      No accounting records yet.
                    </div>
                  )}
                </div>
              </div>
            </section>
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

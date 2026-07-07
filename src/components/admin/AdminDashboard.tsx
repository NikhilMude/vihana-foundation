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
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { CmsPage, EditableItem, GalleryItem, NavigationItem, SectionConfig, SiteContent } from "@/lib/cmsContent";

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

type AdminDashboardProps = {
  initialContent: SiteContent;
  initialGalleryItems: GalleryItem[];
  initialMessages: Message[];
  initialVisitors: Visitor[];
  visitorCount: number;
};

type Tab = "content" | "media" | "navigation" | "order" | "sections" | "pages" | "gallery" | "messages" | "visitors";
type ListKey =
  | "missionPillars"
  | "programCards"
  | "whyFeatures"
  | "impactStats"
  | "impactNotes"
  | "volunteerActions"
  | "testimonials"
  | "faqs"
  | "newsItems";

const contentFields: { key: keyof SiteContent; label: string; multiline?: boolean }[] = [
  { key: "heroBadge", label: "Hero badge" },
  { key: "heroTitle", label: "Hero title" },
  { key: "heroHighlight", label: "Hero highlighted title" },
  { key: "heroDescription", label: "Hero description", multiline: true },
  { key: "heroPrimaryLabel", label: "Hero primary button text" },
  { key: "heroPrimaryHref", label: "Hero primary button link" },
  { key: "heroSecondaryLabel", label: "Hero secondary button text" },
  { key: "heroSecondaryHref", label: "Hero secondary button link" },
  { key: "metaTitle", label: "SEO title" },
  { key: "metaDescription", label: "SEO description", multiline: true },
  { key: "metaKeywords", label: "SEO keywords" },
  { key: "ogImageUrl", label: "Open Graph image URL" },
  { key: "floatingDonateText", label: "Floating donate text" },
  { key: "floatingDonateHref", label: "Floating donate link" },
  { key: "floatingDonateColor", label: "Floating donate background color" },
  { key: "floatingDonateTextColor", label: "Floating donate text color" },
  { key: "missionTitle", label: "Mission title" },
  { key: "missionEyebrow", label: "Mission small label" },
  { key: "missionDescription", label: "Mission description", multiline: true },
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
  { key: "newsletterHeading", label: "Newsletter heading" },
  { key: "newsletterDescription", label: "Newsletter description", multiline: true },
  { key: "newsletterPlaceholder", label: "Newsletter input placeholder" },
  { key: "newsletterButtonText", label: "Newsletter button text" },
  { key: "upiId", label: "UPI ID" },
  { key: "bankAccountName", label: "Bank account name" },
  { key: "bankAccountNumber", label: "Bank account number" },
  { key: "bankIfsc", label: "IFSC" },
  { key: "bankName", label: "Bank name" },
  { key: "volunteerTitle", label: "Volunteer title" },
  { key: "volunteerEyebrow", label: "Volunteer small label" },
  { key: "volunteerDescription", label: "Volunteer description", multiline: true },
  { key: "contactEmail", label: "Contact email" },
  { key: "contactPhone", label: "Contact phone" },
  { key: "contactLocation", label: "Contact location" },
];

const listLabels: Record<ListKey, string> = {
  missionPillars: "Mission Cards",
  programCards: "Program Cards",
  whyFeatures: "Why Vihana Cards",
  impactStats: "Impact Numbers",
  impactNotes: "Impact Notes",
  volunteerActions: "Volunteer Actions",
  testimonials: "Testimonials",
  faqs: "FAQ",
  newsItems: "News / Activities",
};

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
    body: "Write the page content here.",
    buttonLabel: "Contact Us",
    buttonHref: "/#volunteer",
    published: true,
  };
}

export default function AdminDashboard({
  initialContent,
  initialGalleryItems,
  initialMessages,
  initialVisitors,
  visitorCount,
}: AdminDashboardProps) {
  const [tab, setTab] = useState<Tab>("content");
  const [content, setContent] = useState(initialContent);
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [messages] = useState(initialMessages);
  const [visitors] = useState(initialVisitors);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const tabs = useMemo(
    () => [
      { id: "content" as const, label: "Text", icon: Pencil },
      { id: "media" as const, label: "Images", icon: ImagePlus },
      { id: "navigation" as const, label: "Navigation", icon: Navigation },
      { id: "order" as const, label: "Order", icon: Settings },
      { id: "sections" as const, label: "Cards", icon: LayoutList },
      { id: "pages" as const, label: "Pages", icon: FileText },
      { id: "gallery" as const, label: "Gallery", icon: ImagePlus },
      { id: "messages" as const, label: "Messages", icon: Inbox },
      { id: "visitors" as const, label: "Visitors", icon: Users },
    ],
    []
  );

  async function saveContent(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setSaving(true);
    setStatus("");

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    setSaving(false);
    setStatus(response.ok ? "Website saved." : "Could not save website.");
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
  }

  function removeNavigationItem(index: number) {
    setContent((current) => ({
      ...current,
      navigationItems: current.navigationItems.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function moveNavigationItem(index: number, direction: -1 | 1) {
    setContent((current) => {
      const next = [...current.navigationItems];
      const target = index + direction;

      if (target < 0 || target >= next.length) {
        return current;
      }

      [next[index], next[target]] = [next[target], next[index]];
      return { ...current, navigationItems: next };
    });
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
    setContent((current) => {
      const next = [...current.sectionOrder];
      const target = index + direction;

      if (target < 0 || target >= next.length) {
        return current;
      }

      [next[index], next[target]] = [next[target], next[index]];
      return { ...current, sectionOrder: next };
    });
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
  }

  function removeListItem(listKey: ListKey, index: number) {
    setContent((current) => ({
      ...current,
      [listKey]: current[listKey].filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function moveListItem(listKey: ListKey, index: number, direction: -1 | 1) {
    setContent((current) => {
      const next = [...current[listKey]];
      const target = index + direction;

      if (target < 0 || target >= next.length) {
        return current;
      }

      [next[index], next[target]] = [next[target], next[index]];
      return { ...current, [listKey]: next };
    });
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
    setContent((current) => ({
      ...current,
      pages: [...current.pages, emptyPage()],
    }));
  }

  function removePage(index: number) {
    setContent((current) => ({
      ...current,
      pages: current.pages.filter((_, pageIndex) => pageIndex !== index),
    }));
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

  return (
    <div className="min-h-screen bg-stone-50 px-5 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 rounded-[8px] bg-slate-950 p-6 text-white md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-300">Private Admin</p>
            <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-4xl font-bold">Vihana CMS</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => saveContent()} disabled={saving} className="h-11 rounded-full bg-amber-400 px-6 text-slate-950 hover:bg-amber-300">
              {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              Save
            </Button>
            <form action="/api/admin/logout" method="post">
              <Button className="h-11 rounded-full bg-white px-6 text-slate-950 hover:bg-slate-200">Logout</Button>
            </form>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition ${
                  tab === item.id ? "bg-teal-700 text-white" : "bg-white text-slate-700 shadow-sm"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {status ? <p className="mt-5 rounded-[8px] bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">{status}</p> : null}

        {tab === "content" ? (
          <form onSubmit={saveContent} className="mt-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-5 lg:grid-cols-2">
              {contentFields.map((field) => (
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

            <Button disabled={saving} className="mt-6 h-12 rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800">
              {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              Save Text
            </Button>
          </form>
        ) : null}

        {tab === "media" ? (
          <div className="mt-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
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
          </div>
        ) : null}

        {tab === "navigation" ? (
          <div className="mt-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-950">Navigation Links</h2>
              <Button onClick={addNavigationItem} className="h-10 rounded-full bg-teal-700 px-5 hover:bg-teal-800">
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </div>
            <div className="mt-5 grid gap-4">
              {content.navigationItems.map((item, index) => (
                <div key={`${item.label}-${index}`} className="grid gap-3 rounded-[8px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto_auto_auto]">
                  <input value={item.label} onChange={(event) => updateNavigation(index, "label", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Label" />
                  <input value={item.href} onChange={(event) => updateNavigation(index, "href", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="/page or #section" />
                  <button onClick={() => moveNavigationItem(index, -1)} className="rounded-[8px] px-3 text-sm font-bold text-slate-700">Up</button>
                  <button onClick={() => moveNavigationItem(index, 1)} className="rounded-[8px] px-3 text-sm font-bold text-slate-700">Down</button>
                  <button onClick={() => removeNavigationItem(index)} className="inline-flex items-center justify-center rounded-[8px] px-4 text-sm font-bold text-rose-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
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
                  <button onClick={() => moveSection(index, -1)} className="rounded-[8px] px-3 text-sm font-bold text-slate-700">Up</button>
                  <button onClick={() => moveSection(index, 1)} className="rounded-[8px] px-3 text-sm font-bold text-slate-700">Down</button>
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
                  <Button onClick={() => addListItem(listKey)} className="h-10 rounded-full bg-teal-700 px-5 hover:bg-teal-800">
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
                        <button onClick={() => moveListItem(listKey, index, -1)} className="h-11 rounded-[8px] px-3 text-sm font-bold text-slate-700">Up</button>
                        <button onClick={() => moveListItem(listKey, index, 1)} className="h-11 rounded-[8px] px-3 text-sm font-bold text-slate-700">Down</button>
                        <button onClick={() => removeListItem(listKey, index)} className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] text-rose-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageUpload(event, (value) => updateListItem(listKey, index, "imageUrl", value))}
                        className="rounded-[8px] border border-dashed border-slate-300 bg-white p-3 text-sm lg:col-span-2"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {tab === "pages" ? (
          <div className="mt-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-950">Pages</h2>
              <Button onClick={addPage} className="h-10 rounded-full bg-teal-700 px-5 hover:bg-teal-800">
                <Plus className="mr-2 h-4 w-4" />
                Add Page
              </Button>
            </div>
            <div className="mt-5 grid gap-5">
              {content.pages.map((page, index) => (
                <div key={page.id} className="rounded-[8px] border border-slate-200 bg-slate-50 p-4">
                  <div className="grid gap-3 lg:grid-cols-2">
                    <input value={page.title} onChange={(event) => updatePage(index, "title", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Page title" />
                    <input value={page.slug} onChange={(event) => updatePage(index, "slug", event.target.value.replace(/[^a-z0-9-]/g, "-"))} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="page-url" />
                    <input value={page.description} onChange={(event) => updatePage(index, "description", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4 lg:col-span-2" placeholder="Short description" />
                    <textarea value={page.body} onChange={(event) => updatePage(index, "body", event.target.value)} rows={7} className="rounded-[8px] border border-slate-200 px-4 py-3 lg:col-span-2" placeholder="Page content" />
                    <input value={page.buttonLabel} onChange={(event) => updatePage(index, "buttonLabel", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Button label" />
                    <input value={page.buttonHref} onChange={(event) => updatePage(index, "buttonHref", event.target.value)} className="h-11 rounded-[8px] border border-slate-200 px-4" placeholder="Button link" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-sm font-bold text-slate-700">
                      <input type="checkbox" checked={page.published} onChange={(event) => updatePage(index, "published", event.target.checked)} />
                      Published
                    </label>
                    <div className="flex gap-4">
                      <a href={`/${page.slug}`} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700">
                        <LinkIcon className="h-4 w-4" />
                        Open page
                      </a>
                      <button onClick={() => removePage(index)} className="inline-flex items-center gap-2 text-sm font-bold text-rose-700">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
              <Button disabled={saving} className="mt-5 h-12 w-full rounded-full bg-teal-700 text-base hover:bg-teal-800">
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
                    <button onClick={() => deleteGalleryItem(item.id)} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-rose-700">
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

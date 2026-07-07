"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import { ImagePlus, Inbox, Loader2, Pencil, Save, Trash2 } from "lucide-react";

import { GalleryItem, SiteContent } from "@/lib/cmsContent";
import { Button } from "@/components/ui/Button";

type Message = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  createdAt?: string;
};

type AdminDashboardProps = {
  initialContent: SiteContent;
  initialGalleryItems: GalleryItem[];
  initialMessages: Message[];
};

const fields: { key: keyof SiteContent; label: string; multiline?: boolean }[] = [
  { key: "heroBadge", label: "Hero badge" },
  { key: "heroTitle", label: "Hero title" },
  { key: "heroHighlight", label: "Hero highlighted title" },
  { key: "heroDescription", label: "Hero description", multiline: true },
  { key: "missionTitle", label: "Mission title" },
  { key: "missionDescription", label: "Mission description", multiline: true },
  { key: "programsTitle", label: "Programs title" },
  { key: "programsDescription", label: "Programs description", multiline: true },
  { key: "whyTitle", label: "Why Vihana title" },
  { key: "whyDescription", label: "Why Vihana description", multiline: true },
  { key: "impactTitle", label: "Impact title" },
  { key: "impactDescription", label: "Impact description", multiline: true },
  { key: "galleryTitle", label: "Gallery title" },
  { key: "galleryFeatureTitle", label: "Gallery feature title" },
  { key: "galleryFeatureDescription", label: "Gallery feature description", multiline: true },
  { key: "donateTitle", label: "Donate title" },
  { key: "donateDescription", label: "Donate description", multiline: true },
  { key: "upiId", label: "UPI ID" },
  { key: "bankAccountName", label: "Bank account name" },
  { key: "bankAccountNumber", label: "Bank account number" },
  { key: "bankIfsc", label: "IFSC" },
  { key: "bankName", label: "Bank name" },
  { key: "volunteerTitle", label: "Volunteer title" },
  { key: "volunteerDescription", label: "Volunteer description", multiline: true },
  { key: "contactEmail", label: "Contact email" },
  { key: "contactPhone", label: "Contact phone" },
  { key: "contactLocation", label: "Contact location" },
];

export default function AdminDashboard({
  initialContent,
  initialGalleryItems,
  initialMessages,
}: AdminDashboardProps) {
  const [tab, setTab] = useState<"content" | "gallery" | "messages">("content");
  const [content, setContent] = useState(initialContent);
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [messages] = useState(initialMessages);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const tabs = useMemo(
    () => [
      { id: "content" as const, label: "Content", icon: Pencil },
      { id: "gallery" as const, label: "Gallery", icon: ImagePlus },
      { id: "messages" as const, label: "Messages", icon: Inbox },
    ],
    []
  );

  async function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    setStatus(response.ok ? "Website content saved." : "Could not save content.");
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

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 700000) {
      setStatus("Please choose a smaller image under 700 KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen bg-stone-50 px-5 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 rounded-[8px] bg-slate-950 p-6 text-white md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-300">Private Admin</p>
            <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-4xl font-bold">Vihana CMS</h1>
          </div>

          <form action="/api/admin/logout" method="post">
            <Button className="h-11 rounded-full bg-white px-6 text-slate-950 hover:bg-slate-200">Logout</Button>
          </form>
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
              {fields.map((field) => (
                <label key={field.key} className={field.multiline ? "lg:col-span-2" : ""}>
                  <span className="text-sm font-bold text-slate-800">{field.label}</span>
                  {field.multiline ? (
                    <textarea
                      rows={4}
                      value={content[field.key]}
                      onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))}
                      className="mt-2 w-full resize-none rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600 focus:bg-white"
                    />
                  ) : (
                    <input
                      value={content[field.key]}
                      onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))}
                      className="mt-2 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600 focus:bg-white"
                    />
                  )}
                </label>
              ))}
            </div>

            <Button disabled={saving} className="mt-6 h-12 rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800">
              {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              Save Website Content
            </Button>
          </form>
        ) : null}

        {tab === "gallery" ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <form onSubmit={addGalleryItem} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Add Gallery Item</h2>

              <label className="mt-5 block">
                <span className="text-sm font-bold text-slate-800">Title</span>
                <input name="title" required className="mt-2 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-bold text-slate-800">Tag</span>
                <input name="tag" placeholder="Education, Food, Health" className="mt-2 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-bold text-slate-800">Description</span>
                <textarea name="description" required rows={4} className="mt-2 w-full resize-none rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600" />
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-bold text-slate-800">Upload image</span>
                <input type="file" accept="image/*" onChange={handleImage} className="mt-2 w-full rounded-[8px] border border-dashed border-slate-300 bg-slate-50 p-4 text-sm" />
              </label>

              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={600}
                  height={320}
                  unoptimized
                  className="mt-4 h-44 w-full rounded-[8px] object-cover"
                />
              ) : null}

              <Button disabled={saving} className="mt-5 h-12 w-full rounded-full bg-teal-700 text-base hover:bg-teal-800">
                {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ImagePlus className="mr-2 h-5 w-5" />}
                Add To Gallery
              </Button>
            </form>

            <div className="grid gap-4 md:grid-cols-2">
              {galleryItems.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={600}
                      height={320}
                      unoptimized
                      className="h-44 w-full object-cover"
                    />
                  ) : null}
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
      </div>
    </div>
  );
}

import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { SiteContent } from "@/lib/cmsContent";

export default function FloatingWhatsApp({ content }: { content: SiteContent }) {
  if (content.whatsappEnabled !== "true" || !content.whatsappNumber.trim()) {
    return null;
  }

  const number = content.whatsappNumber.replace(/[^\d]/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(content.whatsappMessage || "Hello Vihana Foundation")}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-16 right-3 z-50 inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-emerald-600 text-sm font-bold text-white shadow-2xl shadow-slate-900/20 hover:bg-emerald-700 sm:bottom-20 sm:right-5 sm:h-12 sm:w-auto sm:px-5"
    >
      <MessageCircle className="h-4 w-4" />
      <span className="sr-only sm:not-sr-only">{content.whatsappButtonText}</span>
    </Link>
  );
}

import Link from "next/link";
import { HeartHandshake } from "lucide-react";

import { SiteContent } from "@/lib/cmsContent";

export default function FloatingDonate({ content }: { content: SiteContent }) {
  if (!content.floatingDonateText || !content.floatingDonateHref) {
    return null;
  }

  return (
    <Link
      href={content.floatingDonateHref}
      className="fixed bottom-5 right-5 z-50 inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-bold shadow-2xl shadow-slate-900/20"
      style={{
        background: content.floatingDonateColor || "#0f766e",
        color: content.floatingDonateTextColor || "#ffffff",
      }}
    >
      <HeartHandshake className="h-4 w-4" />
      {content.floatingDonateText}
    </Link>
  );
}

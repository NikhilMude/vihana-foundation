import { HeartHandshake } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { SiteContent } from "@/lib/cmsContent";

export default function FloatingDonate({ content }: { content: SiteContent }) {
  if (!content.floatingDonateText || !content.floatingDonateHref) {
    return null;
  }

  return (
    <SmartNavLink
      href={content.floatingDonateHref}
      className="fixed bottom-4 right-4 z-50 inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-bold shadow-2xl shadow-slate-900/20 sm:bottom-5 sm:right-5 sm:h-12 sm:px-5"
      style={{
        background: content.floatingDonateColor || "#0f766e",
        color: content.floatingDonateTextColor || "#ffffff",
      }}
    >
      <HeartHandshake className="h-4 w-4" />
      {content.floatingDonateText}
    </SmartNavLink>
  );
}

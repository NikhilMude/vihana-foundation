"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const pendingSectionKey = "vihanaPendingSection";

function getCurrentSectionId() {
  if (typeof window === "undefined") {
    return "";
  }

  const pendingSection = window.sessionStorage.getItem(pendingSectionKey) || "";
  const hashSection = window.location.hash.replace("#", "");

  console.log("[HashScrollManager] getCurrentSectionId", { pendingSection, hashSection });

  return pendingSection || hashSection;
}

function scrollToSection(sectionId: string, attempt = 0) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    console.log("[HashScrollManager] scrollToSection - scrolled to", sectionId);
    window.sessionStorage.removeItem(pendingSectionKey);
    return;
  }

  if (attempt < 12) {
    window.setTimeout(() => scrollToSection(sectionId, attempt + 1), 80);
  }
}

export function setPendingSection(sectionId: string) {
  console.log("[HashScrollManager] setPendingSection", sectionId);
  window.sessionStorage.setItem(pendingSectionKey, sectionId);
}

export default function HashScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionId = getCurrentSectionId();

    console.log("[HashScrollManager] useEffect", { pathname, sectionId });

    if (!sectionId) {
      return;
    }

    window.requestAnimationFrame(() => scrollToSection(sectionId));
  }, [pathname]);

  return null;
}

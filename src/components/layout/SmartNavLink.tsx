"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

type SmartNavLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  title?: string;
  "aria-label"?: string;
};

function normalizeHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

function getSectionId(href: string) {
  const normalizedHref = normalizeHref(href);

  if (!normalizedHref.startsWith("/#")) {
    return "";
  }

  return normalizedHref.replace("/#", "");
}

export default function SmartNavLink({
  href,
  className,
  children,
  onClick,
  title,
  "aria-label": ariaLabel,
}: SmartNavLinkProps) {
  const pathname = usePathname();
  const normalizedHref = normalizeHref(href);
  const sectionId = getSectionId(normalizedHref);

  function handleSamePageSection(event: MouseEvent<HTMLAnchorElement>) {
    if (!sectionId || pathname !== "/") {
      onClick?.();
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) {
      onClick?.();
      return;
    }

    event.preventDefault();
    onClick?.();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", normalizedHref);
  }

  if (sectionId && pathname !== "/") {
    return (
      <a href={normalizedHref} className={className} onClick={onClick} title={title} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={normalizedHref}
      prefetch
      className={className}
      onClick={handleSamePageSection}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

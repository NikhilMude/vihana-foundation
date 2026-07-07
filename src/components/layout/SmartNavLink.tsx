"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CSSProperties, MouseEvent, ReactNode, forwardRef } from "react";

import { setPendingSection } from "@/components/layout/HashScrollManager";

type SmartNavLinkProps = {
  href: string;
  className?: string;
  style?: CSSProperties;
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

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:|data:)/.test(href);
}

const SmartNavLink = forwardRef<HTMLAnchorElement, SmartNavLinkProps>(function SmartNavLink(
  {
    href,
    className,
    style,
    children,
    onClick,
    title,
    "aria-label": ariaLabel,
  },
  ref
) {
  const pathname = usePathname();
  const router = useRouter();
  const normalizedHref = normalizeHref(href);
  const sectionId = getSectionId(normalizedHref);

  if (isExternalHref(normalizedHref)) {
    return (
      <a ref={ref} href={normalizedHref} className={className} style={style} onClick={onClick} title={title} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    console.log("[SmartNavLink] click", { href, normalizedHref, sectionId, pathname });

    if (!sectionId) {
      onClick?.();
      return;
    }

    event.preventDefault();
    onClick?.();

    const section = document.getElementById(sectionId);

    if (pathname === "/" && section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      console.log("[SmartNavLink] pushState", normalizedHref);
      window.history.pushState(null, "", normalizedHref);
      return;
    }

    console.log("[SmartNavLink] setPending and router.push", { sectionId, normalizedHref });
    setPendingSection(sectionId);
    router.push(normalizedHref, { scroll: false });
  }

  return (
    <Link
      href={normalizedHref}
      prefetch
      ref={ref}
      className={className}
      style={style}
      onClick={handleClick}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
});

export default SmartNavLink;

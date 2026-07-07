import Image from "next/image";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NavigationItem, SiteContent } from "@/lib/cmsContent";

function getSocialMark(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("instagram")) {
    return "IG";
  }

  if (normalized.includes("facebook")) {
    return "f";
  }

  if (normalized.includes("youtube")) {
    return "YT";
  }

  if (normalized.includes("linkedin")) {
    return "in";
  }

  if (normalized === "x" || normalized.includes("twitter")) {
    return "X";
  }

  return "";
}

export default function Footer({
  content,
  navigation,
}: {
  content: SiteContent;
  navigation: NavigationItem[];
}) {
  const socialLinks = content.socialLinks.filter((item) => item.href.trim());
  const exploreLinks = navigation
    .filter((item) => item.href !== "/donor")
    .filter((item, index, items) => items.findIndex((link) => link.href === item.href) === index);
  const legalPages = content.pages.filter((page) =>
    page.published &&
    ["privacy-policy", "terms-and-conditions", "cookie-policy", "disclaimer", "refund-cancellation-policy", "refund-and-cancellation-policy"].includes(page.slug)
  );

  return (
    <footer className="bg-slate-950 py-6 text-white sm:py-12">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_0.75fr_1fr] lg:gap-10">
          <div>
            <div className="[&_p]:text-white [&_p:last-child]:text-slate-400">
              <Logo brandName={content.brandName} brandTagline={content.brandTagline} logoImageUrl={content.logoImageUrl} />
            </div>

            <p className="mt-3 max-w-md text-sm leading-5 text-slate-400 sm:mt-6 sm:text-base sm:leading-7">
              Every Birthday. A Thousand Smiles. Building kinder communities through education, nutrition, health and dignity.
            </p>

            {socialLinks.length ? (
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                {socialLinks.map((item) => {
                  const mark = getSocialMark(item.label);

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      title={item.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-xs font-black text-white transition hover:border-amber-300/60 hover:bg-white hover:text-slate-950 sm:h-10 sm:w-10 sm:text-sm"
                    >
                      {item.iconImageUrl ? (
                        <Image
                          src={item.iconImageUrl}
                          alt={`${item.label} icon`}
                          width={24}
                          height={24}
                          unoptimized
                          className="h-5 w-5 object-contain"
                        />
                      ) : mark ? (
                        mark
                      ) : (
                        <Globe className="h-4 w-4" />
                      )}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-300">
              Explore
            </h3>

            <div className="mt-3 grid gap-2 sm:mt-4 sm:gap-2.5">
              {exploreLinks.map((item) => (
                <SmartNavLink
                  key={item.label}
                  href={item.href}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {item.label}
                </SmartNavLink>
              ))}
            </div>
          </div>

          {legalPages.length ? (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-300">
                {content.footerLegalTitle}
              </h3>

              <div className="mt-3 grid gap-2 sm:mt-4 sm:gap-2.5">
                {legalPages.map((page) => (
                  <SmartNavLink
                    key={page.id}
                    href={`/${page.slug}`}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {page.title}
                  </SmartNavLink>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-300">
              Contact
            </h3>

            <div className="mt-3 grid gap-2.5 text-sm text-slate-400 sm:mt-4 sm:gap-3">
              <p className="flex min-w-0 items-center gap-3 break-words">
                <Mail className="h-4 w-4 text-amber-300" />
                <span className="min-w-0 break-all">{content.contactEmail}</span>
              </p>

              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-amber-300" />
                {content.contactPhone}
              </p>

              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-amber-300" />
                {content.contactLocation}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 sm:mt-10 sm:pt-5">
          <p className="text-sm text-slate-500">Copyright 2026 Vihana Foundation. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

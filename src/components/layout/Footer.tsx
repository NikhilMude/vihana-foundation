import Link from "next/link";
import Image from "next/image";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

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
  const legalPages = content.pages.filter((page) =>
    page.published &&
    ["privacy-policy", "terms-and-conditions", "cookie-policy", "disclaimer", "refund-cancellation-policy"].includes(page.slug)
  );

  return (
    <footer className="bg-slate-950 py-10 text-white sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.75fr_0.75fr_1fr] lg:gap-10">
          <div>
            <div className="[&_p]:text-white [&_p:last-child]:text-slate-400">
              <Logo brandName={content.brandName} brandTagline={content.brandTagline} logoImageUrl={content.logoImageUrl} />
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400 sm:mt-6 sm:text-base sm:leading-7">
              Every Birthday. A Thousand Smiles. Building kinder communities through education, nutrition, health and dignity.
            </p>

            {socialLinks.length ? (
              <div className="mt-6 flex flex-wrap gap-3">
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
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm font-black text-white transition hover:border-amber-300/60 hover:bg-white hover:text-slate-950"
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

            <div className="mt-5 grid gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {legalPages.length ? (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-300">
                {content.footerLegalTitle}
              </h3>

              <div className="mt-5 grid gap-3">
                {legalPages.map((page) => (
                  <Link
                    key={page.id}
                    href={`/${page.slug}`}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-300">
              Contact
            </h3>

            <div className="mt-5 grid gap-4 text-sm text-slate-400">
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

        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-12">
          <p className="text-sm text-slate-500">Copyright 2026 Vihana Foundation. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

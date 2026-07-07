import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NavigationItem, SiteContent } from "@/lib/cmsContent";

export default function Footer({
  content,
  navigation,
}: {
  content: SiteContent;
  navigation: NavigationItem[];
}) {
  return (
    <footer className="bg-slate-950 py-16 text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="[&_p]:text-white [&_p:last-child]:text-slate-400">
              <Logo />
            </div>

            <p className="mt-6 max-w-md leading-7 text-slate-400">
              Every Birthday. A Thousand Smiles. Building kinder communities through education, nutrition, health and dignity.
            </p>
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

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-300">
              Contact
            </h3>

            <div className="mt-5 grid gap-4 text-sm text-slate-400">
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-amber-300" />
                {content.contactEmail}
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

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-sm text-slate-500">Copyright 2026 Vihana Foundation. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

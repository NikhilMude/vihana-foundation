"use client";

import { useEffect, useState } from "react";
import { HeartHandshake, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import SmartNavLink from "@/components/layout/SmartNavLink";
import { NavigationItem, SiteContent } from "@/lib/cmsContent";

export default function Navbar({ content, navigation }: { content: SiteContent; navigation: NavigationItem[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Logo brandName={content.brandName} brandTagline={content.brandTagline} logoImageUrl={content.logoImageUrl} />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <SmartNavLink
              key={item.label}
              href={item.href}
              className="relative text-sm font-semibold text-slate-700 transition duration-300 hover:text-teal-700 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-teal-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </SmartNavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="h-11 rounded-full bg-teal-700 px-6 shadow-sm transition-all duration-300 hover:bg-teal-800">
            <SmartNavLink href="/#donate">
              <HeartHandshake className="mr-2 h-4 w-4" />
              Donate
            </SmartNavLink>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 shadow-sm lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </Container>

      <div
        className={`overflow-hidden border-t bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? "max-h-[34rem]" : "max-h-0 border-transparent"
        }`}
      >
        <Container className="py-4">
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <SmartNavLink
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] px-4 py-3.5 text-base font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-800"
              >
                {item.label}
              </SmartNavLink>
            ))}

            <Button asChild className="mt-4 h-12 rounded-full bg-teal-700 text-base hover:bg-teal-800">
              <SmartNavLink href="/#donate" onClick={() => setOpen(false)}>
                <HeartHandshake className="mr-2 h-4 w-4" />
                Donate
              </SmartNavLink>
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}

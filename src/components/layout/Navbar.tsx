"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeartHandshake, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NavigationItem } from "@/lib/cmsContent";

function normalizeHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export default function Navbar({ navigation }: { navigation: NavigationItem[] }) {
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
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={normalizeHref(item.href)}
              className="relative text-sm font-semibold text-slate-700 transition duration-300 hover:text-teal-700 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-teal-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="h-11 rounded-full bg-teal-700 px-6 shadow-sm transition-all duration-300 hover:bg-teal-800">
            <Link href="/#donate">
              <HeartHandshake className="mr-2 h-4 w-4" />
              Donate
            </Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-[8px] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </Container>

      <div
        className={`overflow-hidden border-t bg-white transition-all duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0 border-transparent"
        }`}
      >
        <Container className="py-5">
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={normalizeHref(item.href)}
                onClick={() => setOpen(false)}
                className="rounded-[8px] px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-teal-700"
              >
                {item.label}
              </Link>
            ))}

            <Button asChild className="mt-4 h-11 rounded-full bg-teal-700 hover:bg-teal-800">
              <Link href="/#donate" onClick={() => setOpen(false)}>
                <HeartHandshake className="mr-2 h-4 w-4" />
                Donate
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}

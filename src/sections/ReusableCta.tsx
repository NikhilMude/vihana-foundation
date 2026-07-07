import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function ReusableCta({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-16">
      <Container>
        <Reveal>
          <div
            className="rounded-[8px] p-7 text-white shadow-xl shadow-slate-900/10 sm:p-10 lg:p-12"
            style={{ background: content.ctaBackground || "#0f766e" }}
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight">
                  {content.ctaHeading}
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-white/85">{content.ctaDescription}</p>
              </div>

              <Button asChild className="h-12 rounded-full bg-white px-7 text-base text-slate-950 hover:bg-amber-100">
                <Link href={content.ctaButtonHref}>
                  {content.ctaButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

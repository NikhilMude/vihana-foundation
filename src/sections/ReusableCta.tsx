import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function ReusableCta({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <Reveal>
          <div
            className="rounded-[8px] p-5 text-white shadow-xl shadow-slate-900/10 sm:p-10 lg:p-12"
            style={{ background: content.ctaBackground || "#0f766e" }}
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight sm:text-4xl">
                  {content.ctaHeading}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">{content.ctaDescription}</p>
              </div>

              <Button asChild className="h-12 w-full rounded-full bg-white px-7 text-base text-slate-950 hover:bg-amber-100 sm:w-fit">
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


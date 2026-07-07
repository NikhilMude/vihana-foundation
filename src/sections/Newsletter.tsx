import { Mail } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function Newsletter({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-[8px] border border-slate-200 bg-stone-50 p-7 text-center shadow-sm sm:p-10">
            <Mail className="mx-auto h-10 w-10 text-teal-700" />
            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950">
              {content.newsletterHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">{content.newsletterDescription}</p>
            <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder={content.newsletterPlaceholder}
                className="h-12 flex-1 rounded-full border border-slate-200 bg-white px-5 outline-none focus:border-teal-600"
              />
              <Button type="button" className="h-12 rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800">
                {content.newsletterButtonText}
              </Button>
            </form>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

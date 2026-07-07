import Image from "next/image";
import { Quote } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function Testimonials({ content }: { content: SiteContent }) {
  return (
    <section className="bg-stone-50 py-8 md:py-12">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
              {content.testimonialsEyebrow}
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
              {content.testimonialsTitle}
            </h2>
          </div>
        </Reveal>

        <div className="-mx-4 mt-7 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:mt-8 sm:gap-5 sm:px-0">
          {content.testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="min-w-[84vw] snap-start rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:min-w-[420px] sm:p-6">
                <Quote className="h-7 w-7 text-amber-500 sm:h-8 sm:w-8" />
                <p className="mt-4 text-base leading-7 text-slate-700 sm:mt-5 sm:text-lg sm:leading-8">{item.description || item.quote}</p>
                <div className="mt-5 flex items-center gap-3 sm:mt-6 sm:gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-teal-50">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name || item.title} fill unoptimized={item.imageUrl.startsWith("data:")} className="object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-slate-950">{item.name || item.title}</h3>
                    <p className="text-sm text-slate-500">{item.role || item.value}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}


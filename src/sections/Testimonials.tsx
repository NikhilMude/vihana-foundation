import Image from "next/image";
import { Quote } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function Testimonials({ content }: { content: SiteContent }) {
  return (
    <section className="bg-stone-50 py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.26em] text-amber-600">
              {content.testimonialsEyebrow}
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              {content.testimonialsTitle}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 flex snap-x gap-5 overflow-x-auto pb-4">
          {content.testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="min-w-[300px] snap-start rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm sm:min-w-[420px]">
                <Quote className="h-8 w-8 text-amber-500" />
                <p className="mt-5 text-lg leading-8 text-slate-700">{item.description || item.quote}</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-teal-50">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name || item.title} fill unoptimized className="object-cover" />
                    ) : null}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950">{item.name || item.title}</h3>
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

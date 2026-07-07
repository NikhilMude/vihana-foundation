import Image from "next/image";
import { ArrowUpRight, Calendar } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function News({ content }: { content: SiteContent }) {
  return (
    <section className="bg-stone-50 py-6 md:py-12">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
              {content.newsEyebrow}
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
              {content.newsTitle}
            </h2>
          </div>
        </Reveal>

        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-5">
          {content.newsItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
                <div className="relative h-44 bg-teal-50 sm:h-52">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.title} fill unoptimized={item.imageUrl.startsWith("data:")} className="object-cover" />
                  ) : null}
                </div>
                <div className="p-5 sm:p-6">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Calendar className="h-4 w-4 text-amber-500" />
                    {item.date || item.value}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-slate-950 sm:mt-4 sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">{item.description || item.summary}</p>
                  {item.linkHref ? (
                    <SmartNavLink href={item.linkHref} className="mt-5 inline-flex items-center text-sm font-bold text-teal-700">
                      {item.linkLabel || "Read More"}
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </SmartNavLink>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}


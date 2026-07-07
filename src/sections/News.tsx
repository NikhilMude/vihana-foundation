import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function News({ content }: { content: SiteContent }) {
  return (
    <section className="bg-stone-50 py-12 md:py-16">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.26em] text-amber-600">
              {content.newsEyebrow}
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              {content.newsTitle}
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content.newsItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
                <div className="relative h-52 bg-teal-50">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.title} fill unoptimized className="object-cover" />
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Calendar className="h-4 w-4 text-amber-500" />
                    {item.date || item.value}
                  </p>
                  <h3 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.description || item.summary}</p>
                  {item.linkHref ? (
                    <Link href={item.linkHref} className="mt-5 inline-flex items-center text-sm font-bold text-teal-700">
                      {item.linkLabel || "Read More"}
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
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


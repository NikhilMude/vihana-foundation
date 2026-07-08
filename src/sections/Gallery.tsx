"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, GraduationCap, HeartPulse, Soup, X } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { GalleryItem, SiteContent } from "@/lib/cmsContent";

const fallbackIcons = [Soup, GraduationCap, HeartPulse];
const fallbackColors = ["bg-amber-100 text-amber-800", "bg-sky-100 text-sky-800", "bg-rose-100 text-rose-800"];

export default function Gallery({ content, items }: { content: SiteContent; items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="bg-stone-50 py-5 md:py-9">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 sm:text-xs sm:tracking-[0.24em]">
              {content.galleryEyebrow}
            </span>

            <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-[1.55rem] font-bold leading-tight text-slate-950 sm:mt-3 sm:text-4xl lg:text-[2.65rem]">
              {content.galleryTitle}
            </h2>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-3 lg:mt-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-4">
          <Reveal>
            <div className="flex min-h-[140px] flex-col justify-end rounded-[8px] bg-[linear-gradient(135deg,#0f766e,#0ea5e9)] p-4 text-white shadow-xl shadow-slate-900/10 sm:min-h-[260px] sm:p-5 lg:min-h-[300px]">
              <Camera className="h-6 w-6 text-amber-200 sm:h-8 sm:w-8" />
              <h3 className="mt-3 max-w-xl font-[family-name:var(--font-playfair)] text-[1.35rem] font-bold leading-tight sm:mt-4 sm:text-3xl">
                {content.galleryFeatureTitle}
              </h3>
              <p className="mt-2 max-w-xl text-xs leading-5 text-white/85 sm:mt-3 sm:text-sm sm:leading-6">
                {content.galleryFeatureDescription}
              </p>
            </div>
          </Reveal>

          <div className="columns-2 gap-3 sm:columns-2 lg:columns-2 lg:gap-4">
            {items.map((moment, index) => {
              const Icon = fallbackIcons[index % fallbackIcons.length];

              return (
                  <Reveal key={moment.id || moment.title} delay={index * 0.06}>
                  <a
                    href={moment.imageUrl || "#"}
                    onClick={(e) => {
                      if (moment.imageUrl) {
                        e.preventDefault();
                        setSelected(moment);
                      }
                    }}
                    role="button"
                    className="mb-3 w-full break-inside-avoid overflow-hidden rounded-[8px] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:mb-4"
                  >
                    {moment.imageUrl ? (
                      <Image
                        src={moment.imageUrl}
                        alt={moment.title}
                        width={600}
                        height={320}
                        className="aspect-[4/3] w-full object-cover"
                        unoptimized={moment.imageUrl.startsWith("data:")}
                        loading="lazy"
                      />
                    ) : null}
                    <div className="p-3 sm:p-4">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-[8px] sm:h-9 sm:w-9 ${fallbackColors[index % fallbackColors.length]}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-600 sm:text-[11px] sm:tracking-[0.16em]">{moment.tag}</p>
                      <h3 className="mt-1 text-sm font-bold text-slate-950 sm:text-lg">{moment.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{moment.description}</p>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>

      {selected ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 p-3 sm:p-5" onClick={() => setSelected(null)}>
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[8px] bg-white" onClick={(event) => event.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 shadow"
              aria-label="Close image"
            >
              <X className="h-5 w-5" />
            </button>
            <Image src={selected.imageUrl} alt={selected.title} width={1200} height={800} unoptimized={selected.imageUrl.startsWith("data:")} className="max-h-[75vh] w-full object-contain" />
            <div className="p-4 sm:p-5">
              <h3 className="text-xl font-bold text-slate-950">{selected.title}</h3>
              <p className="mt-2 text-slate-600">{selected.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

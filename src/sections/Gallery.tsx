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
    <section id="gallery" className="bg-stone-50 py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.26em] text-amber-600">
              {content.galleryEyebrow}
            </span>

            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              {content.galleryTitle}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="flex min-h-[420px] flex-col justify-end rounded-[8px] bg-[linear-gradient(135deg,#0f766e,#0ea5e9)] p-7 text-white shadow-xl shadow-slate-900/10">
              <Camera className="h-10 w-10 text-amber-200" />
              <h3 className="mt-6 max-w-xl font-[family-name:var(--font-playfair)] text-4xl font-bold">
                {content.galleryFeatureTitle}
              </h3>
              <p className="mt-4 max-w-xl leading-7 text-white/85">
                {content.galleryFeatureDescription}
              </p>
            </div>
          </Reveal>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-1">
            {items.map((moment, index) => {
              const Icon = fallbackIcons[index % fallbackIcons.length];

              return (
                <Reveal key={moment.id || moment.title} delay={index * 0.06}>
                  <button
                    onClick={() => moment.imageUrl && setSelected(moment)}
                    className="mb-5 w-full break-inside-avoid overflow-hidden rounded-[8px] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {moment.imageUrl ? (
                      <Image
                        src={moment.imageUrl}
                        alt={moment.title}
                        width={600}
                        height={380}
                        className="h-auto w-full object-cover"
                        unoptimized
                        loading="lazy"
                      />
                    ) : null}
                    <div className="p-6">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-[8px] ${fallbackColors[index % fallbackColors.length]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-amber-600">{moment.tag}</p>
                      <h3 className="mt-2 text-xl font-bold text-slate-950">{moment.title}</h3>
                      <p className="mt-2 leading-7 text-slate-600">{moment.description}</p>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>

      {selected ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 p-5" onClick={() => setSelected(null)}>
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[8px] bg-white" onClick={(event) => event.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 shadow"
              aria-label="Close image"
            >
              <X className="h-5 w-5" />
            </button>
            <Image src={selected.imageUrl} alt={selected.title} width={1200} height={800} unoptimized className="max-h-[75vh] w-full object-contain" />
            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-950">{selected.title}</h3>
              <p className="mt-2 text-slate-600">{selected.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

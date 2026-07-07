import Image from "next/image";
import { Camera, GraduationCap, HeartPulse, Soup } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { GalleryItem, SiteContent } from "@/lib/cmsContent";

const fallbackIcons = [Soup, GraduationCap, HeartPulse];
const fallbackColors = ["bg-amber-100 text-amber-800", "bg-sky-100 text-sky-800", "bg-rose-100 text-rose-800"];

export default function Gallery({ content, items }: { content: SiteContent; items: GalleryItem[] }) {
  return (
    <section id="gallery" className="bg-stone-50 py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.26em] text-amber-600">
              Gallery
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

          <div className="grid gap-5">
            {items.map((moment, index) => {
              const Icon = fallbackIcons[index % fallbackIcons.length];

              return (
                <Reveal key={moment.title} delay={index * 0.06}>
                  <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
                    {moment.imageUrl ? (
                      <Image
                        src={moment.imageUrl}
                        alt={moment.title}
                        width={600}
                        height={380}
                        className="h-48 w-full object-cover"
                        unoptimized
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
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

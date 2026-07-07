import Image from "next/image";
import { BookOpen, HeartHandshake, ShieldCheck, Soup } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

const icons = [BookOpen, Soup, HeartHandshake, ShieldCheck];

export default function Mission({ content }: { content: SiteContent }) {
  return (
    <section id="mission" className="bg-white py-6 md:py-12">
      <Container>
        <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
          <Reveal>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
                {content.missionEyebrow}
              </span>

              <h2 className="mt-2 max-w-2xl font-[family-name:var(--font-playfair)] text-[1.75rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
                {content.missionTitle}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-lg sm:leading-8">
              {content.missionDescription}
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-4 grid overflow-hidden rounded-[8px] border border-slate-200 bg-slate-950 shadow-xl shadow-slate-900/10 lg:mt-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[170px] sm:min-h-[260px]">
              <Image
                src={content.missionImageUrl || "/images/generated/vihana-meal-support-photo.jpg"}
                alt="Vihana Foundation community support"
                fill
                unoptimized={content.missionImageUrl.startsWith("data:")}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent lg:hidden" />
            </div>

            <div className="flex flex-col justify-center p-4 text-white sm:p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                {content.missionStoryEyebrow}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-[1.65rem] font-bold leading-tight sm:mt-4 sm:text-4xl">
                {content.missionStoryTitle}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-4 sm:text-base">
                {content.missionStoryDescription}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-4">
          {content.missionPillars.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="h-full rounded-[8px] border border-slate-200 bg-slate-50 p-3 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-slate-900/8 sm:p-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-teal-700 text-white sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-slate-950 sm:mt-6 sm:text-xl">{item.title}</h3>

                  <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


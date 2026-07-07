import { BookOpen, HeartHandshake, ShieldCheck, Soup } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

const icons = [BookOpen, Soup, HeartHandshake, ShieldCheck];

export default function Mission({ content }: { content: SiteContent }) {
  return (
    <section id="mission" className="bg-white py-10 md:py-16">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
          <Reveal>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
                {content.missionEyebrow}
              </span>

              <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
                {content.missionTitle}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {content.missionDescription}
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-4">
          {content.missionPillars.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="h-full rounded-[8px] border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-slate-900/8 sm:p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-teal-700 text-white sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-950 sm:mt-6 sm:text-xl">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


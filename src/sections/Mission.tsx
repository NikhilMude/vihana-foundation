import { BookOpen, HeartHandshake, ShieldCheck, Soup } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

const icons = [BookOpen, Soup, HeartHandshake, ShieldCheck];

export default function Mission({ content }: { content: SiteContent }) {
  return (
    <section id="mission" className="bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.26em] text-amber-600">
                {content.missionEyebrow}
              </span>

              <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                {content.missionTitle}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              {content.missionDescription}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.missionPillars.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="h-full rounded-[8px] border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-slate-900/8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-teal-700 text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-950">{item.title}</h3>

                  <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

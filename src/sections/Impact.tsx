import { BadgeCheck, CalendarHeart, HandCoins } from "lucide-react";

import { Container } from "@/components/ui/Container";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

const noteIcons = [CalendarHeart, HandCoins, BadgeCheck];

export default function Impact({ content }: { content: SiteContent }) {
  return (
    <section id="impact" className="bg-teal-800 py-8 text-white md:py-12">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-200 sm:text-sm sm:tracking-[0.26em]">
              {content.impactEyebrow}
            </p>

            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight sm:mt-5 sm:text-5xl">
              {content.impactTitle}
            </h2>

            <p className="mt-4 text-base leading-7 text-teal-50/85 sm:mt-6 sm:text-lg sm:leading-8">
              {content.impactDescription}
            </p>
          </div>
        </Reveal>

        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-4">
          {content.impactStats.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <div className="rounded-[8px] border border-white/15 bg-white/10 p-4 text-center backdrop-blur sm:p-6">
                <p className="text-3xl font-bold sm:text-5xl">
                  <AnimatedNumber value={item.value || item.title} />
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-teal-50/75">
                  {item.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-7 grid gap-3 lg:mt-8 lg:grid-cols-3 lg:gap-4">
          {content.impactNotes.map((note, index) => {
            const Icon = noteIcons[index % noteIcons.length];

            return (
              <Reveal key={note.title} delay={index * 0.06}>
                <div className="h-full rounded-[8px] bg-white p-5 text-slate-950 sm:p-6">
                  <Icon className="h-7 w-7 text-amber-500" />
                  <h3 className="mt-5 text-xl font-bold">{note.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">{note.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


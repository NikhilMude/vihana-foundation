import { BadgeCheck, CalendarHeart, HandCoins } from "lucide-react";

import { Container } from "@/components/ui/Container";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

const noteIcons = [CalendarHeart, HandCoins, BadgeCheck];

export default function Impact({ content }: { content: SiteContent }) {
  return (
    <section id="impact" className="bg-teal-800 py-12 text-white md:py-16">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-amber-200">
              {content.impactEyebrow}
            </p>

            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight sm:text-5xl">
              {content.impactTitle}
            </h2>

            <p className="mt-6 text-lg leading-8 text-teal-50/85">
              {content.impactDescription}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.impactStats.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <div className="rounded-[8px] border border-white/15 bg-white/10 p-6 text-center backdrop-blur">
                <p className="text-4xl font-bold sm:text-5xl">
                  <AnimatedNumber value={item.value || item.title} />
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-teal-50/75">
                  {item.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {content.impactNotes.map((note, index) => {
            const Icon = noteIcons[index % noteIcons.length];

            return (
              <Reveal key={note.title} delay={index * 0.06}>
                <div className="h-full rounded-[8px] bg-white p-6 text-slate-950">
                  <Icon className="h-7 w-7 text-amber-500" />
                  <h3 className="mt-5 text-xl font-bold">{note.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{note.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


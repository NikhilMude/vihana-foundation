import Image from "next/image";
import { ArrowUpRight, GraduationCap, HeartPulse, Soup, Trees } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

const icons = [GraduationCap, Soup, HeartPulse, Trees];
const accents = ["bg-sky-100 text-sky-700", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700", "bg-emerald-100 text-emerald-700"];

export default function Programs({ content }: { content: SiteContent }) {
  return (
    <section id="programs" className="bg-stone-50 py-10 md:py-16">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
              {content.programsEyebrow}
            </span>

            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
              {content.programsTitle}
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
              {content.programsDescription}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 xl:grid-cols-4">
          {content.programCards.map((program, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Reveal key={program.title} delay={index * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/8">
                  {program.imageUrl ? (
                    <div className="relative h-40 bg-teal-50">
                      <Image
                        src={program.imageUrl}
                        alt={program.title}
                        fill
                        unoptimized
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-[8px] sm:h-12 sm:w-12 ${accents[index % accents.length]}`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-950 sm:mt-6 sm:text-xl">{program.title}</h3>

                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">{program.description}</p>

                    <SmartNavLink
                      href={program.linkHref || "#volunteer"}
                      className="mt-7 inline-flex items-center text-sm font-bold text-teal-700 transition group-hover:text-teal-800"
                    >
                      {program.linkLabel || "Support this program"}
                      <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </SmartNavLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


import Link from "next/link";
import { ArrowUpRight, GraduationCap, HeartPulse, Soup, Trees } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

const icons = [GraduationCap, Soup, HeartPulse, Trees];
const accents = ["bg-sky-100 text-sky-700", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700", "bg-emerald-100 text-emerald-700"];

export default function Programs({ content }: { content: SiteContent }) {
  return (
    <section id="programs" className="bg-stone-50 py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.26em] text-amber-600">
              Our Programs
            </span>

            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              {content.programsTitle}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {content.programsDescription}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {content.programCards.map((program, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Reveal key={program.title} delay={index * 0.06}>
                <article className="group flex h-full flex-col rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/8">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-[8px] ${accents[index % accents.length]}`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-950">{program.title}</h3>

                  <p className="mt-3 flex-1 leading-7 text-slate-600">{program.description}</p>

                  <Link
                    href={program.linkHref || "#volunteer"}
                    className="mt-7 inline-flex items-center text-sm font-bold text-teal-700 transition group-hover:text-teal-800"
                  >
                    {program.linkLabel || "Support this program"}
                    <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

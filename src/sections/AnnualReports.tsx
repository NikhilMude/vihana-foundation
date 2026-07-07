import { ArrowUpRight, FileText } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function AnnualReports({ content }: { content: SiteContent }) {
  return (
    <section className="bg-stone-50 py-6 md:py-12">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
              {content.annualReportsEyebrow}
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-[1.75rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
              {content.annualReportsTitle}
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-4 grid max-w-4xl gap-3 sm:mt-7 sm:gap-4">
          {content.annualReports.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="grid gap-3 rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-teal-50 text-teal-700 sm:h-12 sm:w-12">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-600 sm:text-sm sm:tracking-[0.18em]">{item.value}</p>
                  <h3 className="mt-1 text-base font-bold text-slate-950 sm:mt-2 sm:text-xl">{item.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-600 sm:mt-2 sm:text-base sm:leading-6">{item.description}</p>
                </div>
                {item.linkHref ? (
                  <SmartNavLink href={item.linkHref} className="inline-flex h-10 items-center justify-center rounded-full bg-teal-700 px-4 text-sm font-bold text-white hover:bg-teal-800 sm:h-11 sm:px-5">
                    {item.linkLabel || "View"}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </SmartNavLink>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

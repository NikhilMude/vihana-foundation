import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function AnnualReports({ content }: { content: SiteContent }) {
  return (
    <section className="bg-stone-50 py-10 md:py-16">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
              {content.annualReportsEyebrow}
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
              {content.annualReportsTitle}
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4">
          {content.annualReports.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="grid gap-4 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-teal-50 text-teal-700">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">{item.value}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">{item.description}</p>
                </div>
                {item.linkHref ? (
                  <Link href={item.linkHref} className="inline-flex h-11 items-center justify-center rounded-full bg-teal-700 px-5 text-sm font-bold text-white hover:bg-teal-800">
                    {item.linkLabel || "View"}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

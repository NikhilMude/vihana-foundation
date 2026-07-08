"use client";

import { ArrowUpRight, FileImage, FileSpreadsheet, FileText, Globe2, Mail, MessageCircle, Share2 } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { EditableItem, SiteContent } from "@/lib/cmsContent";

function reportIcon(type?: string) {
  const normalized = String(type || "").toLowerCase();

  if (normalized.includes("excel") || normalized.includes("sheet")) return FileSpreadsheet;
  if (normalized.includes("image")) return FileImage;
  if (normalized.includes("external") || normalized.includes("link")) return Globe2;
  if (normalized.includes("pdf") || normalized.includes("doc") || normalized.includes("word") || normalized.includes("ppt") || normalized.includes("presentation")) return FileText;
  return FileText;
}

function shareText(item: EditableItem, content: SiteContent) {
  return `${item.title} - ${content.brandName}. ${item.description || ""} ${item.linkHref || ""}`.trim();
}

async function shareReport(item: EditableItem, content: SiteContent) {
  const text = shareText(item, content);

  if (navigator.share) {
    await navigator.share({ title: item.title, text, url: item.linkHref || window.location.href });
  }
}

export default function AnnualReports({ content }: { content: SiteContent }) {
  return (
    <section className="overflow-hidden bg-stone-50 py-6 md:py-12">
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

        <div className="mt-5 overflow-x-auto pb-3 [scrollbar-width:none] sm:mt-8">
          <div className="vihana-report-track flex w-max gap-4">
          {content.annualReports.map((item, index) => {
            const Icon = reportIcon(item.tag);
            const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareText(item, content))}`;
            const emailHref = `mailto:?subject=${encodeURIComponent(item.title)}&body=${encodeURIComponent(shareText(item, content))}`;

            return (
              <Reveal key={`${item.id}-${index}`} delay={index * 0.04}>
                <article className="min-w-[280px] max-w-[280px] overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm sm:min-w-[340px] sm:max-w-[340px]">
                  <div className="relative h-36 bg-teal-50 sm:h-40">
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-teal-700">
                        <Icon className="h-12 w-12" />
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-teal-700">
                      {item.tag || "PDF"}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-600">{item.value}</p>
                    <h3 className="mt-2 text-lg font-black leading-tight text-slate-950">{item.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.linkHref ? (
                        <SmartNavLink href={item.linkHref} className="inline-flex h-9 items-center rounded-full bg-teal-700 px-3 text-xs font-black text-white hover:bg-teal-800">
                          {item.linkLabel || "View"}
                          <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                        </SmartNavLink>
                      ) : (
                        <span className="inline-flex h-9 items-center rounded-full border border-slate-200 bg-slate-100 px-3 text-xs font-black text-slate-500">
                          No link provided
                        </span>
                      )}
                      <button type="button" onClick={() => void shareReport(item, content)} className="inline-flex h-9 items-center rounded-full border border-slate-200 px-3 text-xs font-black text-slate-700 hover:bg-slate-50">
                        <Share2 className="mr-1.5 h-3.5 w-3.5" />
                        Share
                      </button>
                      <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center rounded-full border border-slate-200 px-3 text-xs font-black text-slate-700 hover:bg-slate-50">
                        <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                      <a href={emailHref} className="inline-flex h-9 items-center rounded-full border border-slate-200 px-3 text-xs font-black text-slate-700 hover:bg-slate-50">
                        <Mail className="mr-1.5 h-3.5 w-3.5" />
                        Email
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
          </div>
        </div>
      </Container>
    </section>
  );
}

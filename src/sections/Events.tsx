import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function Events({ content }: { content: SiteContent }) {
  const shouldAutoScroll = content.eventItems.length > 1;
  const visibleEvents = shouldAutoScroll ? [...content.eventItems, ...content.eventItems] : content.eventItems;

  return (
    <section className="bg-white py-6 md:py-12">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
              {content.eventsEyebrow}
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-[1.75rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
              {content.eventsTitle}
            </h2>
          </div>
        </Reveal>

        <div className="vf-scroll-shell mt-4 overflow-x-auto overflow-y-hidden lg:mt-8">
          <div className={`flex w-max gap-3 pb-2 lg:gap-4 ${shouldAutoScroll ? "vf-auto-scroll" : ""}`}>
            {visibleEvents.map((item, index) => (
              <article
                key={`${item.id}-${index}`}
                className="flex h-[25.5rem] w-[76vw] max-w-[20rem] shrink-0 snap-start flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-stone-50 shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-700 sm:h-[27rem] sm:w-[19rem] lg:w-[21rem]"
                style={{ animationDelay: `${(index % content.eventItems.length) * 0.04}s`, animationFillMode: "both" }}
              >
                  <div className="relative h-32 shrink-0 bg-teal-50 sm:h-44">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.title} fill unoptimized={item.imageUrl.startsWith("data:")} className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-teal-700">
                        <CalendarDays className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
                    <div className="min-w-0 flex-1">
                      <p className="flex min-w-0 items-start gap-2 text-xs font-bold leading-5 text-teal-700 sm:text-sm">
                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" />
                        <span className="min-w-0 break-words">{item.value || "Date to be announced"}</span>
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-slate-950 sm:mt-3 sm:text-xl">{item.title}</h3>
                      <p className="mt-1 line-clamp-3 text-sm leading-5 text-slate-600 sm:mt-2 sm:leading-6">{item.description}</p>
                      {item.tag ? (
                        <p className="mt-2 flex min-w-0 items-start gap-2 text-sm font-semibold leading-5 text-slate-500 sm:mt-4">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                          <span className="min-w-0 break-words">{item.tag}</span>
                        </p>
                      ) : null}
                    </div>
                    {item.linkHref ? (
                      <SmartNavLink href={item.linkHref} className="mt-3 inline-flex w-fit items-center whitespace-nowrap text-sm font-bold text-teal-700">
                        {item.linkLabel || "Learn More"}
                        <ArrowUpRight className="ml-2 h-4 w-4 shrink-0" />
                      </SmartNavLink>
                    ) : null}
                  </div>
                </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

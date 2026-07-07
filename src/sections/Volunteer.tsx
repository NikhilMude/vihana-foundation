import { Gift, HandHeart, Mail } from "lucide-react";

import ContactForm from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

const icons = [Gift, HandHeart, Mail];

export default function Volunteer({ content }: { content: SiteContent }) {
  return (
    <section id="volunteer" className="bg-white py-6 md:py-12">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-8">
          <Reveal>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
                {content.volunteerEyebrow}
              </span>

              <h2 className="mt-2 max-w-2xl font-[family-name:var(--font-playfair)] text-[1.75rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
                {content.volunteerTitle}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                {content.volunteerDescription}
              </p>

              <div className="mt-4 grid gap-2 sm:mt-8 sm:gap-4">
                {content.volunteerActions.map((action, index) => {
                  const Icon = icons[index % icons.length];

                  return (
                    <div key={action.title} className="rounded-[8px] border border-slate-200 bg-slate-50 p-3 sm:p-5">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-white text-teal-700 shadow-sm sm:h-11 sm:w-11">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-950">{action.title}</h3>
                          <p className="mt-1 text-sm leading-5 text-slate-600 sm:text-base sm:leading-7">{action.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}


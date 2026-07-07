import { Gift, HandHeart, Mail } from "lucide-react";

import ContactForm from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

const icons = [Gift, HandHeart, Mail];

export default function Volunteer({ content }: { content: SiteContent }) {
  return (
    <section id="volunteer" className="bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.26em] text-amber-600">
                {content.volunteerEyebrow}
              </span>

              <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                {content.volunteerTitle}
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {content.volunteerDescription}
              </p>

              <div className="mt-8 grid gap-4">
                {content.volunteerActions.map((action, index) => {
                  const Icon = icons[index % icons.length];

                  return (
                    <div key={action.title} className="rounded-[8px] border border-slate-200 bg-slate-50 p-5">
                      <div className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-white text-teal-700 shadow-sm">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-950">{action.title}</h3>
                          <p className="mt-1 leading-7 text-slate-600">{action.description}</p>
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

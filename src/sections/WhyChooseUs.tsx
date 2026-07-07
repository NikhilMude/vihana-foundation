import { HandHeart, Heart, Leaf, Users } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

const icons = [Heart, Users, Leaf, HandHeart];

export default function WhyChooseUs({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-6 md:py-12">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-10">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
                {content.whyEyebrow}
              </span>

              <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-[1.75rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
                {content.whyTitle}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                {content.whyDescription}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:gap-4">
            {content.whyFeatures.map((feature, index) => {
              const Icon = icons[index % icons.length];

              return (
                <Reveal key={feature.title} delay={index * 0.06}>
                  <div className="h-full rounded-[8px] border border-slate-200 bg-slate-50 p-3 sm:p-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-white text-teal-700 shadow-sm sm:h-11 sm:w-11">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-slate-950 sm:mt-5 sm:text-xl">{feature.title}</h3>

                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">{feature.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}


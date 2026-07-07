import { HandHeart, Heart, Leaf, Users } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

const features = [
  {
    icon: Heart,
    title: "Personal Origin",
    description:
      "Inspired by Vihana, the foundation carries a deeply human promise: celebrate life by improving another child's day.",
  },
  {
    icon: Users,
    title: "Local Partnerships",
    description:
      "Programs are delivered with schools, volunteers and community partners who know where support matters most.",
  },
  {
    icon: Leaf,
    title: "Sustainable Action",
    description:
      "We focus on repeatable, practical initiatives that can grow without losing care, accountability or warmth.",
  },
  {
    icon: HandHeart,
    title: "Dignity First",
    description:
      "Every act of service is designed to respect families, protect children and create confidence rather than dependency.",
  },
];

export default function WhyChooseUs({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="text-sm font-bold uppercase tracking-[0.26em] text-amber-600">
                Why Vihana
              </span>

              <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                {content.whyTitle}
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {content.whyDescription}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Reveal key={feature.title} delay={index * 0.06}>
                  <div className="h-full rounded-[8px] border border-slate-200 bg-slate-50 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-white text-teal-700 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-slate-950">{feature.title}</h3>

                    <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
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

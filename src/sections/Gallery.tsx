import { Camera, GraduationCap, HeartPulse, Soup } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const moments = [
  {
    icon: Soup,
    title: "Meal Drives",
    description: "Fresh, nourishing food shared with children and families.",
    className: "bg-amber-100 text-amber-800",
  },
  {
    icon: GraduationCap,
    title: "School Support",
    description: "Kits, supplies and mentoring that make learning easier.",
    className: "bg-sky-100 text-sky-800",
  },
  {
    icon: HeartPulse,
    title: "Health Camps",
    description: "Preventive care and wellness awareness in local communities.",
    className: "bg-rose-100 text-rose-800",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-stone-50 py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.26em] text-amber-600">
              Gallery
            </span>

            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              Moments of kindness, captured in action.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="flex min-h-[420px] flex-col justify-end rounded-[8px] bg-[linear-gradient(135deg,#0f766e,#0ea5e9)] p-7 text-white shadow-xl shadow-slate-900/10">
              <Camera className="h-10 w-10 text-amber-200" />
              <h3 className="mt-6 max-w-xl font-[family-name:var(--font-playfair)] text-4xl font-bold">
                A celebration becomes a child&apos;s brighter tomorrow.
              </h3>
              <p className="mt-4 max-w-xl leading-7 text-white/85">
                The gallery will grow with real photos from drives, school outreach, health camps and birthday campaigns.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {moments.map((moment, index) => {
              const Icon = moment.icon;

              return (
                <Reveal key={moment.title} delay={index * 0.06}>
                  <div className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-[8px] ${moment.className}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-slate-950">{moment.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{moment.description}</p>
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

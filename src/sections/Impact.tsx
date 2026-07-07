import { BadgeCheck, CalendarHeart, HandCoins } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { value: "500+", label: "Children supported" },
  { value: "10K+", label: "Meals served" },
  { value: "100+", label: "Volunteers engaged" },
  { value: "2K+", label: "Trees planted" },
];

const notes = [
  {
    icon: CalendarHeart,
    title: "Birthday campaigns",
    text: "Families can dedicate birthdays to meals, school supplies or health support.",
  },
  {
    icon: HandCoins,
    title: "Direct giving",
    text: "Contributions are directed toward practical, visible community needs.",
  },
  {
    icon: BadgeCheck,
    title: "Accountable delivery",
    text: "Programs are tracked so supporters can understand the difference they helped create.",
  },
];

export default function Impact() {
  return (
    <section id="impact" className="bg-teal-800 py-24 text-white md:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-amber-200">
              Our Impact
            </p>

            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight sm:text-5xl">
              Small acts become measurable change.
            </h2>

            <p className="mt-6 text-lg leading-8 text-teal-50/85">
              These numbers represent shared meals, steady learning, timely care and volunteers choosing to show up.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.05}>
              <div className="rounded-[8px] border border-white/15 bg-white/10 p-6 text-center backdrop-blur">
                <p className="text-4xl font-bold sm:text-5xl">{item.value}</p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-teal-50/75">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {notes.map((note, index) => {
            const Icon = note.icon;

            return (
              <Reveal key={note.title} delay={index * 0.06}>
                <div className="h-full rounded-[8px] bg-white p-6 text-slate-950">
                  <Icon className="h-7 w-7 text-amber-500" />
                  <h3 className="mt-5 text-xl font-bold">{note.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{note.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

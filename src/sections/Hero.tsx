import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Gift, HeartHandshake } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const promises = ["Education support", "Nutritious meals", "Health and wellness"];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_48%,#fff7ed_100%)] pt-28">
      <Container className="grid min-h-[calc(100vh-5rem)] items-center gap-12 pb-16 pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-700 shadow-sm backdrop-blur">
            <Gift className="h-4 w-4" />
            Founded in honor of Vihana
          </div>

          <h1 className="mt-8 max-w-4xl font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.02] text-slate-950 sm:text-6xl lg:text-7xl">
            Every Birthday.
            <span className="block text-teal-700">A Thousand Smiles.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Vihana Foundation turns celebrations into meaningful care for children through learning support, nourishing meals, health access and community-led kindness.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800">
              <Link href="#volunteer">
                <HeartHandshake className="mr-2 h-5 w-5" />
                Join the Movement
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-slate-300 bg-white/70 px-7 text-base hover:bg-white">
              <Link href="#mission">
                Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {promises.map((promise) => (
              <div key={promise} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-teal-700" />
                {promise}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-8 hidden rounded-[8px] bg-white p-4 shadow-xl shadow-slate-900/10 sm:block">
            <p className="text-3xl font-bold text-teal-700">10K+</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Meals shared
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[8px] border border-white/70 bg-white shadow-2xl shadow-teal-950/10">
            <Image
              src="/illustrations/hero.png"
              alt="Children supported by Vihana Foundation programs"
              width={760}
              height={760}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 right-5 rounded-[8px] bg-slate-950 p-5 text-white shadow-xl shadow-slate-900/20">
            <p className="text-sm font-semibold text-amber-200">Birthday to impact</p>
            <p className="mt-1 max-w-48 text-sm leading-6 text-slate-300">
              A simple celebration can become food, care and confidence.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

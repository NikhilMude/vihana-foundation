import Image from "next/image";
import { ArrowRight, CheckCircle2, Gift, HeartHandshake } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SiteContent } from "@/lib/cmsContent";

const promises = ["Education support", "Nutritious meals", "Health and wellness"];

export default function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="home" className="relative overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_48%,#fff7ed_100%)] pt-20 sm:pt-28">
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0))]" />
      <Container className="grid items-center gap-8 pb-10 pt-6 sm:min-h-[calc(88vh-5rem)] sm:gap-10 sm:pb-12 sm:pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:pb-16">
        <div className="relative z-10 max-w-3xl text-center lg:text-left">
          <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-amber-200 bg-white/85 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700 shadow-sm backdrop-blur sm:px-4 sm:text-xs sm:tracking-[0.22em] lg:mx-0">
            <Gift className="h-4 w-4" />
            <span className="truncate">{content.heroBadge}</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl font-[family-name:var(--font-playfair)] text-[2.75rem] font-bold leading-[0.98] text-slate-950 sm:mt-8 sm:text-6xl lg:mx-0 lg:text-7xl">
            {content.heroTitle}
            <span className="block text-teal-700">{content.heroHighlight}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-7 sm:text-xl sm:leading-8 lg:mx-0">
            {content.heroDescription}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:justify-center lg:justify-start">
            <Button asChild size="lg" className="h-12 w-full rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800 sm:w-auto">
              <SmartNavLink href={content.heroPrimaryHref}>
                <HeartHandshake className="mr-2 h-5 w-5" />
                {content.heroPrimaryLabel}
              </SmartNavLink>
            </Button>

            <Button asChild variant="outline" size="lg" className="h-12 w-full rounded-full border-slate-300 bg-white/80 px-7 text-base hover:bg-white sm:w-auto">
              <SmartNavLink href={content.heroSecondaryHref}>
                {content.heroSecondaryLabel}
                <ArrowRight className="ml-2 h-5 w-5" />
              </SmartNavLink>
            </Button>
          </div>

          <div className="mx-auto mt-7 grid max-w-md gap-3 text-left sm:mt-10 sm:max-w-none sm:grid-cols-3 lg:mx-0">
            {promises.map((promise) => (
              <div key={promise} className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm sm:bg-transparent sm:px-0 sm:shadow-none">
                <CheckCircle2 className="h-5 w-5 text-teal-700" />
                {promise}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[26rem] lg:max-w-none">
          <div className="relative overflow-hidden rounded-[8px] border border-white/80 bg-[#fffdf8] p-2 shadow-2xl shadow-teal-950/10">
            <Image
              src={content.heroImageUrl || "/illustrations/hero.png"}
              alt="Children supported by Vihana Foundation programs"
              width={760}
              height={760}
              priority
              unoptimized={content.heroImageUrl.startsWith("data:")}
              className="relative aspect-[4/3] w-full rounded-[8px] object-cover saturate-[0.92]"
            />
            <div className="pointer-events-none absolute inset-2 rounded-[8px] bg-[linear-gradient(135deg,rgba(13,148,136,0.22),rgba(255,255,255,0)_42%,rgba(251,191,36,0.16))]" />
            <div className="pointer-events-none absolute inset-x-2 bottom-2 h-1/3 rounded-b-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(248,250,252,0.26))]" />
          </div>

          <div className="-mt-8 grid grid-cols-2 gap-3 px-4 sm:gap-4">
            <div className="relative rounded-[8px] bg-white p-4 shadow-xl shadow-slate-900/10 sm:p-5">
              <p className="text-2xl font-bold text-teal-700 sm:text-3xl">{content.heroStatValue}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {content.heroStatLabel}
              </p>
            </div>

            <div className="relative rounded-[8px] bg-slate-950 p-4 text-white shadow-xl shadow-slate-900/20 sm:p-5">
              <p className="text-sm font-semibold text-amber-200">{content.heroMiniTitle}</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                {content.heroMiniDescription}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


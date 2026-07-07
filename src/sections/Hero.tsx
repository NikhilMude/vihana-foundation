import Image from "next/image";
import { ArrowRight, CheckCircle2, Gift, HeartHandshake } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SiteContent } from "@/lib/cmsContent";

const promises = ["Education support", "Nutritious meals", "Health and wellness"];

export default function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="home" className="relative overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_48%,#fff7ed_100%)] pt-14 sm:pt-24">
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0))]" />
      <Container className="grid items-center gap-5 pb-6 pt-5 sm:min-h-[calc(80vh-5rem)] sm:gap-9 sm:pb-10 sm:pt-7 lg:grid-cols-[1.02fr_0.98fr] lg:pb-12">
        <div className="relative z-10 max-w-3xl text-center lg:text-left">
          <div className="mx-auto inline-flex max-w-full items-center gap-1.5 rounded-full border border-amber-200 bg-white/85 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-amber-700 shadow-sm backdrop-blur sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.22em] lg:mx-0">
            <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="truncate">{content.heroBadge}</span>
          </div>

          <h1 className="mx-auto mt-4 max-w-4xl font-[family-name:var(--font-playfair)] text-[2.35rem] font-bold leading-[0.95] text-slate-950 sm:mt-7 sm:text-6xl lg:mx-0 lg:text-7xl">
            {content.heroTitle}
            <span className="block text-teal-700">{content.heroHighlight}</span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8 lg:mx-0">
            {content.heroDescription}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-row sm:justify-center sm:gap-3 lg:justify-start">
            <Button asChild size="lg" className="h-10 w-full rounded-full bg-teal-700 px-3 text-sm hover:bg-teal-800 sm:h-12 sm:w-auto sm:px-7 sm:text-base">
              <SmartNavLink href={content.heroPrimaryHref}>
                <HeartHandshake className="mr-1.5 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
                {content.heroPrimaryLabel}
              </SmartNavLink>
            </Button>

            <Button asChild variant="outline" size="lg" className="h-10 w-full rounded-full border-slate-300 bg-white/80 px-3 text-sm hover:bg-white sm:h-12 sm:w-auto sm:px-7 sm:text-base">
              <SmartNavLink href={content.heroSecondaryHref}>
                {content.heroSecondaryLabel}
                <ArrowRight className="ml-1.5 h-4 w-4 sm:ml-2 sm:h-5 sm:w-5" />
              </SmartNavLink>
            </Button>
          </div>

          <div className="mx-auto mt-4 grid max-w-md grid-cols-3 gap-2 text-left sm:mt-8 sm:max-w-none sm:grid-cols-3 lg:mx-0">
            {promises.map((promise) => (
              <div key={promise} className="flex min-h-10 items-center gap-1.5 rounded-full bg-white/75 px-2 py-1.5 text-[11px] font-semibold leading-4 text-slate-700 shadow-sm sm:bg-transparent sm:px-0 sm:text-sm sm:shadow-none">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-700 sm:h-5 sm:w-5" />
                <span>{promise}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none">
          <div className="relative overflow-hidden rounded-[8px] border border-white/80 bg-[#fffdf8] p-2 shadow-2xl shadow-teal-950/10">
            <Image
              src={content.heroImageUrl || "/illustrations/hero.png"}
              alt="Children supported by Vihana Foundation programs"
              width={760}
              height={760}
              priority
              unoptimized={content.heroImageUrl.startsWith("data:")}
              className="relative aspect-[16/10] w-full rounded-[8px] object-cover saturate-[0.92] sm:aspect-[4/3]"
            />
            <div className="pointer-events-none absolute inset-2 rounded-[8px] bg-[linear-gradient(135deg,rgba(13,148,136,0.22),rgba(255,255,255,0)_42%,rgba(251,191,36,0.16))]" />
            <div className="pointer-events-none absolute inset-x-2 bottom-2 h-1/3 rounded-b-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(248,250,252,0.26))]" />
          </div>

          <div className="-mt-8 hidden grid-cols-2 gap-3 px-4 sm:grid sm:gap-4">
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


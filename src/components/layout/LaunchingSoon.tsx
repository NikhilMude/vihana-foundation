import Image from "next/image";
import Link from "next/link";
import { Gift, Mail, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SiteContent } from "@/lib/cmsContent";

export default function LaunchingSoon({ content }: { content: SiteContent }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_48%,#fff7ed_100%)] text-slate-950">
      <Container className="flex min-h-screen flex-col py-5">
        <div className="flex items-center justify-between">
          <Logo
            brandName={content.brandName}
            brandTagline={content.brandTagline}
            logoImageUrl={content.logoImageUrl}
            logoMarkColor={content.logoMarkColor}
            logoAccentColor={content.logoAccentColor}
            logoTextColor={content.logoTextColor}
            logoTaglineColor={content.logoTaglineColor}
          />
          <Link
            href={`mailto:${content.contactEmail}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white/80 px-4 text-sm font-bold text-teal-800 shadow-sm backdrop-blur hover:bg-white"
          >
            <Mail className="h-4 w-4" />
            Contact
          </Link>
        </div>

        <section className="grid flex-1 items-center gap-7 py-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-3xl text-center lg:text-left">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700 shadow-sm backdrop-blur lg:mx-0">
              <Sparkles className="h-4 w-4" />
              Launching soon
            </div>

            <h1 className="mx-auto mt-5 max-w-4xl font-[family-name:var(--font-playfair)] text-[2.7rem] font-bold leading-[0.98] text-slate-950 sm:text-6xl lg:mx-0 lg:text-7xl">
              Small Steps. Lifelong Impact.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mx-0">
              Vihana Foundation is preparing a home for kindness, transparent giving, volunteering and child-focused impact stories.
            </p>

            <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-3 lg:mx-0">
              {[
                ["Education", "School support"],
                ["Nutrition", "Meal drives"],
                ["Care", "Community help"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[8px] bg-white/85 px-4 py-4 text-left shadow-sm backdrop-blur">
                  <Gift className="h-5 w-5 text-teal-700" />
                  <p className="mt-2 font-bold text-teal-900">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">{text}</p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-xl rounded-[8px] bg-white/75 px-4 py-3 text-sm font-semibold leading-6 text-slate-700 shadow-sm backdrop-blur lg:mx-0">
              Official website updates are in progress. For enquiries, write to {content.contactEmail}.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[34rem]">
            <div className="overflow-hidden rounded-[8px] border border-white/70 bg-white p-2 shadow-2xl shadow-slate-900/15">
              <Image
                src={content.heroImageUrl || "/images/generated/vihana-hero-photo.jpg"}
                alt="Vihana Foundation launching soon"
                width={900}
                height={680}
                priority
                className="aspect-[4/3] w-full rounded-[8px] object-cover"
              />
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}

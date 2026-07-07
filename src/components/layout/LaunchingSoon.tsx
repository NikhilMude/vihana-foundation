import Image from "next/image";
import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SiteContent } from "@/lib/cmsContent";

export default function LaunchingSoon({ content }: { content: SiteContent }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_48%,#fff7ed_100%)] text-slate-950">
      <Container className="flex min-h-screen flex-col py-6">
        <div className="flex items-center justify-between">
          <Logo brandName={content.brandName} brandTagline={content.brandTagline} logoImageUrl={content.logoImageUrl} />
          <Link
            href={`mailto:${content.contactEmail}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white/80 px-4 text-sm font-bold text-teal-800 shadow-sm backdrop-blur hover:bg-white"
          >
            <Mail className="h-4 w-4" />
            Contact
          </Link>
        </div>

        <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-3xl text-center lg:text-left">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700 shadow-sm backdrop-blur lg:mx-0">
              <Sparkles className="h-4 w-4" />
              Launching soon
            </div>

            <h1 className="mx-auto mt-6 max-w-4xl font-[family-name:var(--font-playfair)] text-[3rem] font-bold leading-[0.98] text-slate-950 sm:text-6xl lg:mx-0 lg:text-7xl">
              Vihana Foundation is getting ready to welcome you.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-xl sm:leading-8 lg:mx-0">
              We are preparing a thoughtful space for kindness, volunteering, transparent giving and stories of impact.
            </p>

            <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-3 lg:mx-0">
              {["Education", "Nutrition", "Care"].map((item) => (
                <div key={item} className="rounded-[8px] bg-white/80 px-4 py-4 text-center font-bold text-teal-800 shadow-sm backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
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

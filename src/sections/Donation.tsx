import { BadgeIndianRupee, Building2, Copy, QrCode } from "lucide-react";

import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function Donation({ content }: { content: SiteContent }) {
  const donationOptions = [
    {
      icon: BadgeIndianRupee,
      title: "UPI",
      value: content.upiId,
      note: "Use only verified payment details before public fundraising.",
    },
    {
      icon: Building2,
      title: "Bank Transfer",
      value: `${content.bankAccountName} | ${content.bankAccountNumber} | ${content.bankIfsc}`,
      note: content.bankName,
    },
    {
      icon: QrCode,
      title: "QR Code",
      value: "Coming soon",
      note: "Add a verified payment QR image before publishing donations.",
    },
  ];

  return (
    <section id="donate" className="bg-stone-50 py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.26em] text-amber-600">
              {content.donateEyebrow}
            </span>

            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              {content.donateTitle}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {content.donateDescription}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {donationOptions.map((option, index) => {
            const Icon = option.icon;

            return (
              <Reveal key={option.title} delay={index * 0.06}>
                <div className="h-full rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-teal-50 text-teal-700">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-950">{option.title}</h3>

                  <div className="mt-3 flex items-center justify-between gap-3 rounded-[8px] bg-slate-50 px-4 py-3">
                    <p className="text-sm font-bold text-slate-800">{option.value}</p>
                    <Copy className="h-4 w-4 shrink-0 text-slate-400" />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-500">{option.note}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

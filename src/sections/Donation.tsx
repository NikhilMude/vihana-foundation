import { BadgeIndianRupee, Building2, Copy, FileCheck2, QrCode } from "lucide-react";

import { Container } from "@/components/ui/Container";
import DonationIntentForm from "@/components/forms/DonationIntentForm";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function Donation({ content }: { content: SiteContent }) {
  const donationOptions = [
    {
      icon: BadgeIndianRupee,
      title: "UPI",
      value: content.upiId || "test-vihana@upi",
      note: "Dummy test UPI. Replace before accepting real donations.",
    },
    {
      icon: Building2,
      title: "Bank Transfer",
      value: `${content.bankAccountName || "Vihana Foundation Test"} | ${content.bankAccountNumber || "000000000000"} | ${content.bankIfsc || "TEST0001234"}`,
      note: content.bankName || "Test Bank",
    },
    {
      icon: QrCode,
      title: "QR Code",
      value: "TEST-QR-VIHANA",
      note: "Dummy QR reference for testing only.",
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

        <Reveal>
          <div className="mt-8 rounded-[8px] border border-teal-200 bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-teal-50 text-teal-700">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-950">Trust and transparency</h3>
                <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-600 md:grid-cols-2">
                  <p><span className="font-bold text-slate-800">Legal status:</span> {content.legalStatusNote}</p>
                  <p><span className="font-bold text-slate-800">Registration:</span> {content.registrationNumber || "To be updated"}</p>
                  <p><span className="font-bold text-slate-800">PAN:</span> {content.panNumber || "To be updated"}</p>
                  <p><span className="font-bold text-slate-800">80G / 12A:</span> {content.taxExemptionNote || "To be updated"}</p>
                </div>
                {content.annualReportHref ? (
                  <a href={content.annualReportHref} className="mt-4 inline-flex text-sm font-bold text-teal-700">
                    View annual report
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>

        <DonationIntentForm />
      </Container>
    </section>
  );
}

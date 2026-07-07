import Image from "next/image";
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
    <section id="donate" className="bg-stone-50 py-6 md:py-12">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
              {content.donateEyebrow}
            </span>

            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
              {content.donateTitle}
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
              {content.donateDescription}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-7 grid overflow-hidden rounded-[8px] bg-slate-950 shadow-xl shadow-slate-900/10 lg:mt-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[260px] lg:order-2">
              <Image
                src={content.donationImageUrl || "/images/generated/vihana-meal-support-photo.jpg"}
                alt="Vihana Foundation donation campaign"
                fill
                unoptimized={content.donationImageUrl.startsWith("data:")}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-5 text-white sm:p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                {content.donationStoryEyebrow}
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight sm:text-4xl">
                {content.donationStoryTitle}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {content.donationStoryDescription}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-7 grid gap-4 lg:mt-8 lg:grid-cols-3 lg:gap-5">
          {donationOptions.map((option, index) => {
            const Icon = option.icon;

            return (
              <Reveal key={option.title} delay={index * 0.06}>
                <div className="h-full rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-teal-50 text-teal-700 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-950 sm:mt-6 sm:text-xl">{option.title}</h3>

                  <div className="mt-3 flex items-center justify-between gap-3 rounded-[8px] bg-slate-50 px-3 py-3 sm:px-4">
                    <p className="min-w-0 break-words text-sm font-bold leading-6 text-slate-800">{option.value}</p>
                    <Copy className="h-4 w-4 shrink-0 text-slate-400" />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-500">{option.note}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-6 rounded-[8px] border border-teal-200 bg-white p-5 shadow-sm sm:mt-8 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-teal-50 text-teal-700">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950 sm:text-xl">Trust and transparency</h3>
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


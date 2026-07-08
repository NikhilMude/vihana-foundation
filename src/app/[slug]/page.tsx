import Image from "next/image";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import VisitTracker from "@/components/analytics/VisitTracker";
import BrandTheme from "@/components/layout/BrandTheme";
import Footer from "@/components/layout/Footer";
import FloatingDonate from "@/components/layout/FloatingDonate";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import LaunchingSoon from "@/components/layout/LaunchingSoon";
import Navbar from "@/components/layout/Navbar";
import SmartNavLink from "@/components/layout/SmartNavLink";
import TeamSection from "@/components/pages/TeamSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { shouldShowLaunchSoon } from "@/lib/launchGate";
import { getSiteContent } from "@/lib/siteData";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CmsPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const requestHeaders = await headers();

  if (shouldShowLaunchSoon(requestHeaders.get("host"))) {
    return (
      <>
        <BrandTheme content={content} />
        <LaunchingSoon content={content} />
      </>
    );
  }

  const page = content.pages.find((item) => item.slug === slug && item.published);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <BrandTheme content={content} />
      <Navbar content={content} navigation={content.navigationItems} />
      <VisitTracker />

      <main className="pt-14 sm:pt-20">
        <section className="py-4 sm:py-12">
          <Container>
            <div className="max-w-4xl">
              <h1 className="font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight text-slate-950 sm:text-6xl">
                {page.title}
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-5 sm:text-xl sm:leading-8">{page.description}</p>
            </div>

            {page.imageUrl ? (
              <div className="mt-4 overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm sm:mt-8">
                <Image
                  src={page.imageUrl}
                  alt={page.title}
                  width={1400}
                  height={720}
                  unoptimized={page.imageUrl.startsWith("data:")}
                  className="aspect-[16/9] w-full object-cover"
                  priority
                />
              </div>
            ) : null}

            <article className="mt-4 max-w-4xl rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-8">
              <div className="whitespace-pre-line text-sm leading-6 text-slate-700 sm:text-lg sm:leading-9">{page.body}</div>

              {page.buttonLabel && page.buttonHref ? (
                <Button asChild className="mt-5 h-10 w-full rounded-full bg-teal-700 px-5 text-sm hover:bg-teal-800 sm:mt-8 sm:h-12 sm:w-fit sm:px-7 sm:text-base">
                  <SmartNavLink href={page.buttonHref}>
                    {page.buttonLabel}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </SmartNavLink>
                </Button>
              ) : null}
            </article>

            {page.slug === "about-vihana" ? <TeamSection content={content} /> : null}
          </Container>
        </section>
      </main>

      <FloatingDonate content={content} />
      <FloatingWhatsApp content={content} />
      <Footer content={content} navigation={content.navigationItems} />
    </div>
  );
}

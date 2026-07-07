import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import VisitTracker from "@/components/analytics/VisitTracker";
import Footer from "@/components/layout/Footer";
import FloatingDonate from "@/components/layout/FloatingDonate";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
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
  const page = content.pages.find((item) => item.slug === slug && item.published);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <Navbar content={content} navigation={content.navigationItems} />
      <VisitTracker />

      <main className="pt-20 sm:pt-28">
        <section className="py-10 sm:py-20">
          <Container>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="mt-6 max-w-4xl sm:mt-8">
              <h1 className="font-[family-name:var(--font-playfair)] text-[2.5rem] font-bold leading-tight text-slate-950 sm:text-6xl">
                {page.title}
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8">{page.description}</p>
            </div>

            <article className="mt-8 max-w-4xl rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:mt-12 sm:p-10">
              <div className="whitespace-pre-line text-base leading-8 text-slate-700 sm:text-lg sm:leading-9">{page.body}</div>

              {page.buttonLabel && page.buttonHref ? (
                <Button asChild className="mt-8 h-12 w-full rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800 sm:w-fit">
                  <Link href={page.buttonHref}>
                    {page.buttonLabel}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : null}
            </article>
          </Container>
        </section>
      </main>

      <FloatingDonate content={content} />
      <FloatingWhatsApp content={content} />
      <Footer content={content} navigation={content.navigationItems} />
    </div>
  );
}

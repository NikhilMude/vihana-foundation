import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Footer from "@/components/layout/Footer";
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
      <Navbar navigation={content.navigationItems} />

      <main className="pt-28">
        <section className="py-20">
          <Container>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="mt-8 max-w-4xl">
              <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-bold leading-tight text-slate-950 sm:text-6xl">
                {page.title}
              </h1>

              <p className="mt-6 text-xl leading-8 text-slate-600">{page.description}</p>
            </div>

            <article className="mt-12 max-w-4xl rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
              <div className="whitespace-pre-line text-lg leading-9 text-slate-700">{page.body}</div>

              {page.buttonLabel && page.buttonHref ? (
                <Button asChild className="mt-8 h-12 rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800">
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

      <Footer content={content} navigation={content.navigationItems} />
    </div>
  );
}

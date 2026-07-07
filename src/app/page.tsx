import type { Metadata } from "next";

import VisitTracker from "@/components/analytics/VisitTracker";
import Footer from "@/components/layout/Footer";
import FloatingDonate from "@/components/layout/FloatingDonate";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import Navbar from "@/components/layout/Navbar";
import AnnualReports from "@/sections/AnnualReports";
import Donation from "@/sections/Donation";
import Events from "@/sections/Events";
import Faq from "@/sections/Faq";
import FeaturedStory from "@/sections/FeaturedStory";
import Gallery from "@/sections/Gallery";
import Hero from "@/sections/Hero";
import Impact from "@/sections/Impact";
import Mission from "@/sections/Mission";
import News from "@/sections/News";
import Newsletter from "@/sections/Newsletter";
import Programs from "@/sections/Programs";
import ReusableCta from "@/sections/ReusableCta";
import Testimonials from "@/sections/Testimonials";
import Volunteer from "@/sections/Volunteer";
import WhyChooseUs from "@/sections/WhyChooseUs";
import { getRenderableSections } from "@/lib/cmsContent";
import { getGalleryItems, getSiteContent } from "@/lib/siteData";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.metaKeywords,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      images: content.ogImageUrl ? [content.ogImageUrl] : undefined,
    },
  };
}

export default async function Home() {
  const content = await getSiteContent();
  const galleryItems = await getGalleryItems();

  const sectionMap = {
    hero: <Hero key="hero" content={content} />,
    mission: <Mission key="mission" content={content} />,
    programs: <Programs key="programs" content={content} />,
    why: <WhyChooseUs key="why" content={content} />,
    impact: <Impact key="impact" content={content} />,
    story: <FeaturedStory key="story" content={content} />,
    cta: <ReusableCta key="cta" content={content} />,
    testimonials: <Testimonials key="testimonials" content={content} />,
    faq: <Faq key="faq" content={content} />,
    gallery: <Gallery key="gallery" content={content} items={galleryItems} />,
    events: <Events key="events" content={content} />,
    news: <News key="news" content={content} />,
    annualReports: <AnnualReports key="annualReports" content={content} />,
    newsletter: <Newsletter key="newsletter" content={content} />,
    donate: <Donation key="donate" content={content} />,
    volunteer: <Volunteer key="volunteer" content={content} />,
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <Navbar content={content} navigation={content.navigationItems} />
      <VisitTracker />

      <main className="overflow-x-hidden">
        {getRenderableSections(content, galleryItems)
          .map((section) => sectionMap[section.id as keyof typeof sectionMap])
          .filter(Boolean)}
      </main>

      <FloatingDonate content={content} />
      <FloatingWhatsApp content={content} />
      <Footer content={content} navigation={content.navigationItems} />
    </div>
  );
}

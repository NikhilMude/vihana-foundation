import type { Metadata } from "next";
import { headers } from "next/headers";

import VisitTracker from "@/components/analytics/VisitTracker";
import Footer from "@/components/layout/Footer";
import FloatingDonate from "@/components/layout/FloatingDonate";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import LaunchingSoon from "@/components/layout/LaunchingSoon";
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
import { shouldShowLaunchSoon } from "@/lib/launchGate";
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
  const requestHeaders = await headers();

  if (shouldShowLaunchSoon(requestHeaders.get("host"))) {
    return <LaunchingSoon content={content} />;
  }

  const galleryItems = await getGalleryItems();

  function renderSection(id: string) {
    switch (id) {
      case "hero":
        return <Hero key="hero" content={content} />;
      case "mission":
        return <Mission key="mission" content={content} />;
      case "programs":
        return <Programs key="programs" content={content} />;
      case "why":
        return <WhyChooseUs key="why" content={content} />;
      case "impact":
        return <Impact key="impact" content={content} />;
      case "story":
        return <FeaturedStory key="story" content={content} />;
      case "cta":
        return <ReusableCta key="cta" content={content} />;
      case "testimonials":
        return <Testimonials key="testimonials" content={content} />;
      case "faq":
        return <Faq key="faq" content={content} />;
      case "gallery":
        return <Gallery key="gallery" content={content} items={galleryItems} />;
      case "events":
        return <Events key="events" content={content} />;
      case "news":
        return <News key="news" content={content} />;
      case "annualReports":
        return <AnnualReports key="annualReports" content={content} />;
      case "newsletter":
        return <Newsletter key="newsletter" content={content} />;
      case "donate":
        return <Donation key="donate" content={content} />;
      case "volunteer":
        return <Volunteer key="volunteer" content={content} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <Navbar content={content} navigation={content.navigationItems} />
      <VisitTracker />

      <main className="overflow-x-hidden">
        {getRenderableSections(content, galleryItems).map((section) => renderSection(section.id))}
      </main>

      <FloatingDonate content={content} />
      <FloatingWhatsApp content={content} />
      <Footer content={content} navigation={content.navigationItems} />
    </div>
  );
}

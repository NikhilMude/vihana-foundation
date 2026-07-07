import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/sections/Hero";
import Mission from "@/sections/Mission";
import Programs from "@/sections/Programs";
import WhyChooseUs from "@/sections/WhyChooseUs";
import Impact from "@/sections/Impact";
import Gallery from "@/sections/Gallery";
import Donation from "@/sections/Donation";
import Volunteer from "@/sections/Volunteer";
import { getGalleryItems, getSiteContent } from "@/lib/siteData";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  const galleryItems = await getGalleryItems();

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <Navbar navigation={content.navigationItems} />

      <main className="overflow-x-hidden">
        <Hero content={content} />
        <Mission content={content} />
        <Programs content={content} />
        <WhyChooseUs content={content} />
        <Impact content={content} />
        <Gallery content={content} items={galleryItems} />
        <Donation content={content} />
        <Volunteer content={content} />
      </main>

      <Footer content={content} navigation={content.navigationItems} />
    </div>
  );
}

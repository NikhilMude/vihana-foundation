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

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />
        <Mission />
        <Programs />
        <WhyChooseUs />
        <Impact />
        <Gallery />
        <Donation />
        <Volunteer />
      </main>

      <Footer />
    </div>
  );
}

import { headers } from "next/headers";

import VisitTracker from "@/components/analytics/VisitTracker";
import DonorPortal from "@/components/donor/DonorPortal";
import Footer from "@/components/layout/Footer";
import FloatingDonate from "@/components/layout/FloatingDonate";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import LaunchingSoon from "@/components/layout/LaunchingSoon";
import Navbar from "@/components/layout/Navbar";
import { Container } from "@/components/ui/Container";
import { getAuthenticatedDonor } from "@/lib/donorAuth";
import { shouldShowLaunchSoon } from "@/lib/launchGate";
import { getDonationsForEmail, getSiteContent } from "@/lib/siteData";

export const dynamic = "force-dynamic";

export default async function DonorPage() {
  const content = await getSiteContent();
  const requestHeaders = await headers();

  if (shouldShowLaunchSoon(requestHeaders.get("host"))) {
    return <LaunchingSoon content={content} />;
  }

  const donor = await getAuthenticatedDonor();
  const donations = donor ? await getDonationsForEmail(donor.email) : [];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <Navbar content={content} navigation={content.navigationItems} />
      <VisitTracker />

      <main className="pt-20 sm:pt-24">
        <section className="py-6 sm:py-10">
          <Container>
            <DonorPortal donor={donor} donations={donations} />
          </Container>
        </section>
      </main>

      <FloatingDonate content={content} />
      <FloatingWhatsApp content={content} />
      <Footer content={content} navigation={content.navigationItems} />
    </div>
  );
}

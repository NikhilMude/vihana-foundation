import type { Metadata } from "next";
import "./globals.css";

import CookieConsent from "@/components/layout/CookieConsent";
import HashScrollManager from "@/components/layout/HashScrollManager";

export const metadata: Metadata = {
  metadataBase: new URL("https://vihanafoundation.org"),
  title: "Vihana Foundation | Every Birthday. A Thousand Smiles.",
  description:
    "Vihana Foundation turns celebrations into education, nutrition, healthcare and community support for children and families.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Vihana Foundation",
    description:
      "Every Birthday. A Thousand Smiles. Creating opportunities for children through care, learning and kindness.",
    type: "website",
    images: ["/illustrations/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HashScrollManager />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

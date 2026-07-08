import Image from "next/image";
import { HeartHandshake } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";

type LogoProps = {
  brandName?: string;
  brandTagline?: string;
  logoImageUrl?: string;
};

export function Logo({ brandName = "Vihana Foundation", brandTagline = "Small Steps. Lifelong Impact.", logoImageUrl = "" }: LogoProps) {
  return (
    <SmartNavLink href="/#home" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label={`${brandName} ${brandTagline} home`}>
      {logoImageUrl ? (
        <Image
          src={logoImageUrl}
          alt={`${brandName} ${brandTagline} logo`}
          width={44}
          height={44}
          unoptimized
          className="h-9 w-9 rounded-[8px] object-contain sm:h-11 sm:w-11"
        />
      ) : (
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[linear-gradient(135deg,#0f766e,#0d9488)] text-white shadow-lg shadow-teal-900/15 ring-1 ring-teal-500/20 sm:h-12 sm:w-12">
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_0_4px_rgba(252,211,77,0.2)]" />
          <HeartHandshake className="h-5 w-5 stroke-[2.4] sm:h-6 sm:w-6" />
        </div>
      )}

      <div className="min-w-0">
        <p className="truncate font-[family-name:var(--font-playfair)] text-base font-bold leading-none text-slate-950 sm:text-xl">
          {brandName}
        </p>
        <p className="mt-1 truncate text-[9px] font-bold leading-none text-teal-700 sm:text-[11px]">
          {brandTagline}
        </p>
      </div>
    </SmartNavLink>
  );
}

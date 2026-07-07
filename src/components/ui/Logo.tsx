import Link from "next/link";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";

type LogoProps = {
  brandName?: string;
  brandTagline?: string;
  logoImageUrl?: string;
};

export function Logo({ brandName = "Vihana", brandTagline = "Foundation", logoImageUrl = "" }: LogoProps) {
  return (
    <Link href="/#home" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label={`${brandName} ${brandTagline} home`}>
      {logoImageUrl ? (
        <Image
          src={logoImageUrl}
          alt={`${brandName} ${brandTagline} logo`}
          width={44}
          height={44}
          unoptimized
          className="h-10 w-10 rounded-[8px] object-contain sm:h-11 sm:w-11"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-teal-700 text-white shadow-sm sm:h-11 sm:w-11">
          <HeartHandshake className="h-5 w-5" />
        </div>
      )}

      <div className="min-w-0">
        <p className="truncate font-[family-name:var(--font-playfair)] text-lg font-bold leading-none text-slate-950 sm:text-xl">
          {brandName}
        </p>
        <p className="truncate text-[9px] font-bold uppercase tracking-[0.24em] text-slate-500 sm:text-[10px] sm:tracking-[0.28em]">
          {brandTagline}
        </p>
      </div>
    </Link>
  );
}

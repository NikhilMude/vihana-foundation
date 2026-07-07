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
    <Link href="/#home" className="flex items-center gap-3" aria-label={`${brandName} ${brandTagline} home`}>
      {logoImageUrl ? (
        <Image
          src={logoImageUrl}
          alt={`${brandName} ${brandTagline} logo`}
          width={44}
          height={44}
          unoptimized
          className="h-11 w-11 rounded-[8px] object-contain"
        />
      ) : (
        <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-teal-700 text-white shadow-sm">
          <HeartHandshake className="h-5 w-5" />
        </div>
      )}

      <div>
        <p className="font-[family-name:var(--font-playfair)] text-xl font-bold leading-none text-slate-950">
          {brandName}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">
          {brandTagline}
        </p>
      </div>
    </Link>
  );
}

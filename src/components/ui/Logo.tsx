import Image from "next/image";

import SmartNavLink from "@/components/layout/SmartNavLink";

type LogoProps = {
  brandName?: string;
  brandTagline?: string;
  logoImageUrl?: string;
  logoMarkColor?: string;
  logoAccentColor?: string;
  logoTextColor?: string;
  logoTaglineColor?: string;
};

function cleanColor(value: string | undefined, fallback: string) {
  return value && /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

export function Logo({
  brandName = "Vihana Foundation",
  brandTagline = "Small Steps. Lifelong Impact.",
  logoImageUrl = "",
  logoMarkColor = "#0f766e",
  logoAccentColor = "#fbbf24",
  logoTextColor = "#020617",
  logoTaglineColor = "#0f766e",
}: LogoProps) {
  const markColor = cleanColor(logoMarkColor, "#0f766e");
  const accentColor = cleanColor(logoAccentColor, "#fbbf24");
  const textColor = cleanColor(logoTextColor, "#020617");
  const taglineColor = cleanColor(logoTaglineColor, "#0f766e");

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
        <div
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] text-white shadow-lg shadow-teal-900/15 ring-1 ring-black/5 sm:h-12 sm:w-12"
          style={{ background: `linear-gradient(135deg, ${markColor}, color-mix(in srgb, ${markColor} 82%, #020617))` }}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true" className="h-8 w-8 sm:h-9 sm:w-9">
            <path
              d="M24 13.8c2.2-4.4 9.2-4.1 11.4.5 2 4.1-.5 8.4-4.4 11.8L24 32.2l-7-6.1c-3.9-3.4-6.4-7.7-4.4-11.8 2.2-4.6 9.2-4.9 11.4-.5Z"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.6"
            />
            <path
              d="M13 31.8c3.3 3.7 7.1 5.6 11 5.6s7.7-1.9 11-5.6"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeWidth="3.2"
            />
            <path d="M24 7.5v3.1M17.8 9.8l1.5 2.7M30.2 9.8l-1.5 2.7" stroke={accentColor} strokeLinecap="round" strokeWidth="2.6" />
            <circle cx="24" cy="15" r="3.1" fill={accentColor} />
          </svg>
        </div>
      )}

      <div className="min-w-0">
        <p className="truncate font-[family-name:var(--font-playfair)] text-base font-bold leading-none sm:text-xl" style={{ color: textColor }}>
          {brandName}
        </p>
        <p className="mt-1 truncate text-[9px] font-bold leading-none sm:text-[11px]" style={{ color: taglineColor }}>
          {brandTagline}
        </p>
      </div>
    </SmartNavLink>
  );
}

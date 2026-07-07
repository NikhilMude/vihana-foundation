import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export function Logo() {
  return (
    <Link href="#home" className="flex items-center gap-3" aria-label="Vihana Foundation home">
      <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-teal-700 text-white shadow-sm">
        <HeartHandshake className="h-5 w-5" />
      </div>

      <div>
        <p className="font-[family-name:var(--font-playfair)] text-xl font-bold leading-none text-slate-950">
          Vihana
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">
          Foundation
        </p>
      </div>
    </Link>
  );
}

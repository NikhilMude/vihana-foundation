import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-white text-xl shadow-lg">
        ❤
      </div>

      <div>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-none">
          Vihana
        </h2>

        <p className="text-xs uppercase tracking-[4px] text-slate-500">
          Foundation
        </p>
      </div>
    </Link>
  );
}
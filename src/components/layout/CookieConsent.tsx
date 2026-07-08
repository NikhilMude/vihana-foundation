"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CookieChoice = "accepted" | "essential" | "rejected";

const storageKey = "vihana_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(!localStorage.getItem(storageKey));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function saveChoice(choice: CookieChoice) {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        choice,
        savedAt: new Date().toISOString(),
      })
    );
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-white/10 bg-slate-950 text-white shadow-2xl shadow-slate-950/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold">We use cookies</p>
          <p className="mt-1 text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6">
            We use essential cookies for site functions and may use analytics cookies to understand visits and improve Vihana Foundation&apos;s website. You can choose what to allow.
          </p>
          <Link href="/cookie-policy" className="mt-2 inline-flex text-xs font-bold text-amber-300 underline underline-offset-4">
            Cookie Policy
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:flex sm:shrink-0">
          <button
            type="button"
            onClick={() => saveChoice("accepted")}
            className="h-10 rounded-[8px] bg-teal-600 px-3 text-xs font-bold text-white transition hover:bg-teal-500 sm:px-5 sm:text-sm"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => saveChoice("essential")}
            className="h-10 rounded-[8px] border border-white/20 bg-white/10 px-3 text-xs font-bold text-white transition hover:bg-white/15 sm:px-5 sm:text-sm"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => saveChoice("rejected")}
            className="h-10 rounded-[8px] border border-white/15 px-3 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white sm:px-5 sm:text-sm"
          >
            Reject All
          </button>
        </div>
      </div>
    </div>
  );
}

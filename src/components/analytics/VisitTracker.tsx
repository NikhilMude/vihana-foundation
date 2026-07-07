"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    const key = `vihana-visit-${new Date().toISOString().slice(0, 10)}`;

    if (sessionStorage.getItem(key)) {
      return;
    }

    sessionStorage.setItem(key, "true");

    fetch("/api/visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || "Direct",
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: `${window.screen.width}x${window.screen.height}`,
      }),
      keepalive: true,
    }).catch(() => undefined);
  }, []);

  return null;
}

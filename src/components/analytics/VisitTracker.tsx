"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    const key = `vihana-visit-${new Date().toISOString().slice(0, 10)}`;

    if (sessionStorage.getItem(key)) {
      return;
    }

    sessionStorage.setItem(key, "true");

    const payload = JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || "Direct",
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: `${window.screen.width}x${window.screen.height}`,
      });
    const sendVisit = () => {
      fetch("/api/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
        keepalive: true,
      }).catch(() => undefined);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(sendVisit, { timeout: 2500 });

      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(sendVisit, 1200);

    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return null;
}

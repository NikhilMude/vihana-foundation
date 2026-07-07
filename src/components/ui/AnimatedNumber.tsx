"use client";

import { useEffect, useRef, useState } from "react";

function parseValue(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  return {
    number: Number(match[1]),
    suffix: match[2] || "",
  };
}

export default function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const parsed = parseValue(value);

    if (!parsed || !ref.current) {
      setDisplay(value);
      return;
    }

    const targetNumber = parsed.number;
    const suffix = parsed.suffix;
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        const start = performance.now();
        const duration = 1100;

        function frame(time: number) {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(targetNumber * eased);

          setDisplay(`${current}${suffix}`);

          if (progress < 1) {
            requestAnimationFrame(frame);
          }
        }

        requestAnimationFrame(frame);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

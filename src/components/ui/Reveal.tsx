import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
}

export default function Reveal({
  children,
  delay = 0,
}: RevealProps) {
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-3 duration-700"
      style={delay ? { animationDelay: `${delay}s`, animationFillMode: "both" } : undefined}
    >
      {children}
    </div>
  );
}

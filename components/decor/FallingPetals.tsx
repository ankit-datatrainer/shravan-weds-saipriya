"use client";

import { useEffect, useState } from "react";

interface Petal {
  left: number;
  size: number;
  dur: number;
  delay: number;
  sway: number;
  spin: number;
  kind: 0 | 1 | 2;
}

const COLORS = ["#efb3a9", "#f5a623", "#e48a7c"];

/** Rose & marigold petals drifting down over the whole page. */
export default function FallingPetals({ count = 14 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // generated client-side only, so SSR markup stays deterministic
    setPetals(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 12,
        dur: 9 + Math.random() * 10,
        delay: Math.random() * 12,
        sway: (Math.random() - 0.5) * 160,
        spin: 180 + Math.random() * 420,
        kind: Math.floor(Math.random() * 3) as 0 | 1 | 2,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <svg
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
              "--sway": `${p.sway}px`,
              "--spin": `${p.spin}deg`,
            } as React.CSSProperties
          }
          viewBox="0 0 20 20"
          fill="none"
        >
          {p.kind === 2 ? (
            <circle cx="10" cy="10" r="7" fill={COLORS[p.kind]} opacity="0.85" />
          ) : (
            <path d="M10 2 C 16 6, 16 14, 10 18 C 4 14, 4 6, 10 2 Z" fill={COLORS[p.kind]} opacity="0.85" />
          )}
        </svg>
      ))}
    </div>
  );
}

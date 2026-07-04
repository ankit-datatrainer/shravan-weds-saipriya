"use client";

import { useEffect, useState } from "react";

interface Flower {
  left: number;
  size: number;
  dur: number;
  delay: number;
  sway: number;
  spin: number;
  color: string;
  heart: boolean;
}

/** One color per ceremony: amber (haldi), rose (mehendi), violet (sangeet), deep red (wedding). */
const COLORS = ["#f5a623", "#e8890c", "#e48a7c", "#c94f5e", "#a78bfa", "#7c3aed", "#efb3a9"];

/** Falling love-flowers & hearts, tinted per the events on this page, scoped to its own container. */
export default function EventFlowers({ count = 16 }: { count?: number }) {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    setFlowers(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 14 + Math.random() * 14,
        dur: 10 + Math.random() * 9,
        delay: Math.random() * 10,
        sway: (Math.random() - 0.5) * 160,
        spin: 150 + Math.random() * 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        heart: Math.random() > 0.72,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {flowers.map((f, i) => (
        <svg
          key={i}
          className="petal-local"
          style={
            {
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              "--dur": `${f.dur}s`,
              "--delay": `${f.delay}s`,
              "--sway": `${f.sway}px`,
              "--spin": `${f.spin}deg`,
            } as React.CSSProperties
          }
          viewBox="0 0 24 24"
          fill={f.color}
        >
          {f.heart ? (
            <path
              opacity="0.85"
              d="M12 21s-7.5-4.9-10-9.3C.4 8.6 2 5 5.5 5c2 0 3.4 1.1 4.1 2.3.5.9.8 1.4.8 1.4s.3-.5.8-1.4C12 6.1 13.4 5 15.4 5 19 5 20.6 8.6 19 11.7 17.5 16.1 12 21 12 21Z"
            />
          ) : (
            <g opacity="0.9">
              <circle cx="12" cy="6" r="4" />
              <circle cx="12" cy="18" r="4" />
              <circle cx="6" cy="12" r="4" />
              <circle cx="18" cy="12" r="4" />
              <circle cx="12" cy="12" r="3" fill="#fff5f2" />
            </g>
          )}
        </svg>
      ))}
    </div>
  );
}

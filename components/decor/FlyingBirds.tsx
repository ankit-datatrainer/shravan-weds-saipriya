"use client";

import { useEffect, useState } from "react";

interface Bird {
  top: number;
  size: number;
  dur: number;
  delay: number;
  flip: boolean;
}

/** A few cute silhouette birds gliding across their (relative) parent. */
export default function FlyingBirds({ count = 3 }: { count?: number }) {
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    setBirds(
      Array.from({ length: count }, (_, i) => ({
        top: 6 + i * (60 / count) + Math.random() * 10,
        size: 30 + Math.random() * 14,
        dur: 16 + Math.random() * 10,
        delay: i * 3.5 + Math.random() * 2,
        flip: Math.random() > 0.5,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {birds.map((b, i) => (
        <svg
          key={i}
          className={`bird-fly ${b.flip ? "-scale-x-100" : ""}`}
          style={
            {
              top: `${b.top}%`,
              width: b.size,
              height: b.size * 0.6,
              "--dur": `${b.dur}s`,
              "--delay": `${b.delay}s`,
            } as React.CSSProperties
          }
          viewBox="0 0 40 24"
          fill="none"
        >
          <path
            className="wing-flap"
            d="M20 13 C14 3, 4 3, 0 9 C6 11, 14 12, 20 13 Z"
            fill="#e48a7c"
            stroke="#7a1f2b"
            strokeWidth="0.6"
            opacity="0.9"
          />
          <path
            className="wing-flap"
            d="M20 13 C26 3, 36 3, 40 9 C34 11, 26 12, 20 13 Z"
            fill="#f0a89b"
            stroke="#7a1f2b"
            strokeWidth="0.6"
            opacity="0.9"
          />
          {/* body */}
          <ellipse cx="20" cy="13" rx="4" ry="3" fill="#fdf6f4" stroke="#7a1f2b" strokeWidth="0.6" />
          {/* head + beak */}
          <circle cx="24.5" cy="10.5" r="2.3" fill="#fdf6f4" stroke="#7a1f2b" strokeWidth="0.6" />
          <path d="M26.5 10.5 L29 11.3 L26.5 12 Z" fill="#f5a623" />
        </svg>
      ))}
    </div>
  );
}

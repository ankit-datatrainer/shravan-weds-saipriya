"use client";

import { useEffect, useState } from "react";

interface Rose {
  left: number;
  size: number;
  dur: number;
  delay: number;
  sway: number;
  spin: number;
  img: string;
}

const WHITE_ROSE_IMAGES = ["/images/white_rose_1.png", "/images/white_rose_2.png"];
const RED_ROSE_IMAGES = ["/images/rose1.png"];

/** Small cute roses drifting down randomly over the whole page. */
export default function FallingPetals({ count = 20, color = "white" }: { count?: number, color?: "white" | "red" }) {
  const [roses, setRoses] = useState<Rose[]>([]);

  useEffect(() => {
    const images = color === "red" ? RED_ROSE_IMAGES : WHITE_ROSE_IMAGES;
    
    setRoses(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 25 + Math.random() * 15, // Medium flowers
        dur: 11 + Math.random() * 10,
        delay: -(Math.random() * 20), // Negative delay so they start immediately
        sway: (Math.random() - 0.5) * 180,
        spin: 120 + Math.random() * 360,
        img: images[Math.floor(Math.random() * images.length)],
      }))
    );
  }, [count, color]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {roses.map((p, i) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={i}
          src={p.img}
          alt=""
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              objectFit: "contain",
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
              "--sway": `${p.sway}px`,
              "--spin": `${p.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}


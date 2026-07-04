"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/lib/config";
import Image from "next/image";
import BackgroundMusic from "./BackgroundMusic";

/** Filigree pattern for a card door; mirrored for the right side. */
function DoorOrnament({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 600"
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${mirrored ? "-scale-x-100" : ""}`}
      aria-hidden="true"
      fill="none"
    >
      {/* vine along outer edge */}
      <path d="M30 0 C 60 100, 10 200, 40 300 C 70 400, 15 500, 40 600" stroke="#d4af37" strokeWidth="1.5" opacity="0.5" />
      <path d="M15 0 C 40 120, 0 240, 25 360 C 50 480, 5 560, 20 600" stroke="#d4af37" strokeWidth="1" opacity="0.3" />
      {Array.from({ length: 8 }, (_, i) => {
        const y = 40 + i * 74;
        return (
          <g key={i} opacity="0.55">
            <path d={`M32 ${y} q 18 -10 34 2 q -18 10 -34 -2 Z`} fill="#d4af37" opacity="0.35" />
            <circle cx={36} cy={y} r="2.5" fill="#d4af37" />
          </g>
        );
      })}
      {/* Large outer medallion ring, empty center to frame text */}
      <g opacity="0.65">
        <circle cx="200" cy="300" r="92" stroke="#d4af37" strokeWidth="1.5" />
        <circle cx="200" cy="300" r="82" stroke="#d4af37" strokeWidth="0.75" />
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          const x = 200 + Math.cos(a) * 87;
          const y = 300 + Math.sin(a) * 87;
          return <circle key={i} cx={x} cy={y} r="1.5" fill="#d4af37" />;
        })}
      </g>
    </svg>
  );
}

/**
 * A closed wedding card: two ornate doors that swing open in 3D
 * when tapped, revealing the invitation behind them.
 */
export default function InviteReveal({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);

  const door = "absolute inset-y-0 w-1/2 bg-gradient-to-b from-maroon-800 via-maroon-900 to-maroon-800 border-gold-500/40 overflow-hidden";

  return (
    <>
      <AnimatePresence>
        {!gone && (
          <motion.div
            key="card-gate"
            className="fixed inset-0 z-50 overflow-hidden"
            style={{ perspective: "1600px" }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          >
            {/* left door */}
            <motion.div
              className={`${door} left-0 border-r card-3d`}
              style={{ transformOrigin: "left center" }}
              animate={opened ? { rotateY: -108 } : { rotateY: 0 }}
              transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
              onAnimationComplete={() => opened && setGone(true)}
            >
              <DoorOrnament />
            </motion.div>

            {/* right door */}
            <motion.div
              className={`${door} right-0 border-l card-3d`}
              style={{ transformOrigin: "right center" }}
              animate={opened ? { rotateY: 108 } : { rotateY: 0 }}
              transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
            >
              <DoorOrnament mirrored />
            </motion.div>

            {/* face content on the closed card */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
              animate={opened ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 inset-x-0 h-14 sm:h-20">
              </div>

              <button
                type="button"
                onClick={() => setOpened(true)}
                disabled={opened}
                className="group flex flex-col items-center justify-center gap-3 sm:gap-4 outline-none max-w-[85vw] mx-auto"
                aria-label="Open the wedding invitation"
              >
                <motion.div
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full ornate-border overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] relative"
                >
                  <Image src="/images/ganesha.png" alt="Lord Ganesha" fill className="object-cover" />
                </motion.div>

                <p className="font-devanagari text-gold-300 text-xs sm:text-sm md:text-base tracking-wide mt-1">
                  {wedding.shloka.devanagari}
                </p>

                <p className="section-eyebrow text-gold-300/90 mt-2 text-[10px] sm:text-xs tracking-[0.2em]">You&apos;re Invited to the Wedding of</p>

                <h1 className="font-script flex flex-col items-center justify-center text-4xl sm:text-5xl md:text-6xl gold-text leading-none py-1 drop-shadow-sm break-words text-center">
                  <span>{wedding.groom.name}</span>
                  <span className="text-2xl sm:text-3xl my-1 sm:my-2 text-gold-400 font-sans italic">&amp;</span>
                  <span>{wedding.bride.name}</span>
                </h1>

                <span className="mt-2 sm:mt-4 inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-maroon-950/40 backdrop-blur-sm px-6 sm:px-8 py-2 sm:py-2.5 text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold-200 group-hover:bg-gold-400 group-hover:text-maroon-900 transition-colors duration-500 shadow-xl">
                  Tap to Open
                </span>

                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-cream/50 mt-1 sm:mt-2">
                  {wedding.dateDisplay}
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: opened ? 0.55 : 0 }}
      >
        {children}
      </motion.div>

      <BackgroundMusic playWhen={opened} />
    </>
  );
}

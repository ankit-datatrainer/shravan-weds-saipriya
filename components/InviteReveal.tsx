"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/lib/config";
import Image from "next/image";
import BackgroundMusic from "./BackgroundMusic";

/**
 * A beautiful "tap to begin" splash screen with custom background images
 * for mobile and desktop, overlaid with animated wedding text.
 */
export default function InviteReveal({
  children,
  musicSrc,
  musicLoopStart,
  musicLoopEnd,
  variant = "invite",
}: {
  children: React.ReactNode;
  musicSrc?: string;
  musicLoopStart?: number;
  musicLoopEnd?: number;
  variant?: "home" | "invite";
}) {
  const [started, setStarted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!started && (
          variant === "home" ? (
            <motion.div
              key="start-gate-home"
              className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900 px-6 text-center"
              exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.9, ease: "easeInOut" } }}
            >
              {/* poster peeking through */}
              <div className="absolute inset-0 opacity-25">
                <Image src="/images/intro-poster-mobile.jpg" alt="" fill className="object-cover" priority />
              </div>
              <div className="absolute inset-0 bg-maroon-900/50" />

              <button
                type="button"
                onClick={() => setStarted(true)}
                className="group relative flex flex-col items-center justify-center gap-4 outline-none"
                aria-label="Open the wedding invitation"
              >
                <motion.div
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative shrink-0 h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full ornate-border shadow-[0_0_40px_rgba(212,175,55,0.45)] mb-2"
                >
                  <Image src="/images/ganesh_ji.png" alt="Lord Ganesha" fill className="object-contain p-2 drop-shadow-xl" />
                </motion.div>

                <p className="mt-3 font-devanagari text-base tracking-wide text-gold-300 sm:text-xl font-medium shrink-0">
                  {wedding.shloka.devanagari}
                </p>

                <p className="section-eyebrow mt-3 text-[10px] tracking-[0.25em] text-gold-300/90 sm:text-xs">
                  You&apos;re Invited to the Wedding of
                </p>

                <h1 className="font-script flex flex-col items-center leading-none gold-text">
                  <span className="text-5xl sm:text-6xl md:text-7xl">{wedding.groom.name}</span>
                  <span className="my-2 font-sans text-3xl italic text-gold-400 sm:text-4xl">&amp;</span>
                  <span className="text-5xl sm:text-6xl md:text-7xl">{wedding.bride.name}</span>
                </h1>

                <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-400 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-9 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-maroon-900 shadow-xl shadow-gold-500/20 transition group-active:scale-95 sm:px-10 md:text-xs">
                  Tap to Open
                </span>

                <span className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cream/70 md:text-xs">
                  {wedding.dateDisplay}
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="start-gate-invite"
              className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
              exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.9, ease: "easeInOut" } }}
            >
              {/* Background Image – Mobile */}
              <Image
                src="/images/front_image_mobile.png"
                alt="Wedding Invitation Background"
                fill
                className="object-cover object-center sm:hidden"
                priority
              />
              {/* Background Image – Desktop */}
              <Image
                src="/images/front_image_desktop.png"
                alt="Temple Background"
                fill
                className="object-fill hidden sm:block w-full h-full"
                priority
              />

              {/* Clickable overlay with animated text */}
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center outline-none cursor-pointer overflow-y-auto pt-4 pb-2 sm:pt-6 sm:pb-4"
                aria-label="Open the wedding invitation"
              >
                {/* Ganesha icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, rotate: [0, 3, -3, 0] }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.1 },
                    scale: { duration: 0.8, delay: 0.1, ease: "easeOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                  }}
                  className="relative shrink-0 h-24 w-24 sm:h-28 sm:w-28 mb-1 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)] ring-[3px] ring-[#d4af37]/50 overflow-hidden bg-gradient-to-b from-[#fdf6ea] to-[#f5e6c8]"
                >
                  <Image src="/images/ganesh_ji.png" alt="Lord Ganesha" fill className="object-contain p-2 drop-shadow-xl" />
                </motion.div>

                {/* Shloka */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="font-devanagari text-sm sm:text-lg tracking-wider text-[#6b1524] drop-shadow-sm font-medium shrink-0"
                >
                  {wedding.shloka.devanagari}
                </motion.p>

                {/* Invitation line */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex items-center gap-3 mt-3 sm:mt-4"
                >
                  <div className="w-10 sm:w-16 h-px bg-[#d4af37]/60"></div>
                  <p className="text-[9px] sm:text-[11px] tracking-[0.2em] text-[#6b1524]/80 uppercase font-semibold">
                    You&apos;re Invited To The Wedding Of
                  </p>
                  <div className="w-10 sm:w-16 h-px bg-[#d4af37]/60"></div>
                </motion.div>

                {/* Names */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                  className="font-script flex flex-col items-center leading-tight mt-2 sm:mt-3"
                >
                  <span className="text-5xl sm:text-7xl md:text-8xl text-[#6b1524] drop-shadow-sm">
                    {wedding.groom.name}
                  </span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: "backOut" }}
                    className="my-1 sm:my-2 font-sans text-xl sm:text-3xl italic text-[#d4af37] drop-shadow-sm"
                  >
                    and
                  </motion.span>
                  <span className="text-5xl sm:text-7xl md:text-8xl text-[#6b1524] drop-shadow-sm">
                    {wedding.bride.name}
                  </span>
                </motion.h1>

                {/* Date section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col items-center gap-1 mt-3 sm:mt-4 border-y border-[#d4af37]/40 py-2 sm:py-3 px-8"
                >
                  <span className="text-[9px] sm:text-[10px] tracking-[0.3em] font-semibold text-[#6b1524]/70 uppercase">
                    Saturday
                  </span>
                  <div className="flex items-center gap-3 sm:gap-5 text-[#6b1524]">
                    <span className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">August</span>
                    <span className="text-3xl sm:text-5xl font-serif font-light">23</span>
                    <span className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">2026</span>
                  </div>
                </motion.div>

                {/* Blessing text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.0 }}
                  className="mt-3 sm:mt-4 text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#6b1524]/80 max-w-[280px] sm:max-w-xs leading-relaxed font-semibold text-center"
                >
                  With the blessings of our families<br />
                  we joyfully invite you to celebrate our<br />
                  new beginning
                </motion.p>

                {/* Tap to Begin button */}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 sm:mt-5 inline-flex items-center justify-center rounded-md bg-[#6b1524] px-10 sm:px-14 py-2.5 sm:py-3 text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.25em] text-[#fdf6ea] shadow-lg shadow-[#6b1524]/30 border border-[#d4af37]/60"
                >
                  Tap to Open
                </motion.span>
              </button>
            </motion.div>
          )
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: started ? 0.5 : 0 }}
      >
        {children}
      </motion.div>

      <BackgroundMusic
        playWhen={started}
        src={musicSrc}
        loopStart={musicLoopStart}
        loopEnd={musicLoopEnd}
      />
    </>
  );
}

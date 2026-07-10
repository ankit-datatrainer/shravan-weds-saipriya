"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/lib/config";
import Image from "next/image";
import BackgroundMusic from "./BackgroundMusic";

/**
 * A minimal "tap to begin" splash over the cinematic intro. The tap is a
 * user gesture, which lets the background music start (mobile autoplay
 * rules) and reveals the scroll-scrubbed experience underneath.
 */
export default function InviteReveal({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!started && (
          <motion.div
            key="start-gate"
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
                className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full ornate-border shadow-[0_0_40px_rgba(212,175,55,0.45)]"
              >
                <Image src="/images/ganesha.png" alt="Lord Ganesha" fill className="object-contain p-2" />
              </motion.div>

              <p className="mt-2 font-devanagari text-sm tracking-wide text-gold-300 sm:text-base">
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
                Tap to Begin
              </span>

              <span className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cream/70 md:text-xs">
                {wedding.dateDisplay}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: started ? 0.5 : 0 }}
      >
        {children}
      </motion.div>

      <BackgroundMusic playWhen={started} />
    </>
  );
}

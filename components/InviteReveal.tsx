"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/lib/config";
import GaneshaMotif from "./GaneshaMotif";
import FloralCorner from "./FloralCorner";

export default function InviteReveal({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="gate"
            exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-700 px-6 text-center overflow-hidden"
          >
            <FloralCorner className="absolute top-0 left-0 w-32 md:w-52 opacity-60" />
            <FloralCorner className="absolute top-0 right-0 w-32 md:w-52 -scale-x-100 opacity-60" />
            <FloralCorner className="absolute bottom-0 left-0 w-32 md:w-52 -scale-y-100 opacity-60" />
            <FloralCorner className="absolute bottom-0 right-0 w-32 md:w-52 -scale-x-100 -scale-y-100 opacity-60" />

            <motion.button
              type="button"
              onClick={() => setOpened(true)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="group relative flex flex-col items-center gap-6"
            >
              <motion.div
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full ornate-border overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.35)]"
              >
                <GaneshaMotif className="w-full h-full" />
              </motion.div>

              <p className="font-devanagari text-gold-300 text-base md:text-lg tracking-wide">
                {wedding.shloka.devanagari}
              </p>

              <p className="section-eyebrow text-gold-300/90">You&apos;re Invited</p>

              <h1 className="font-script text-4xl md:text-6xl gold-text leading-tight px-4">
                {wedding.groom.name} &amp; {wedding.bride.name}
              </h1>

              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-400/70 px-8 py-3 text-xs md:text-sm uppercase tracking-[0.35em] text-gold-300 group-hover:bg-gold-400 group-hover:text-maroon-900 transition-colors duration-500">
                Tap to Open
              </span>

              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/40">
                A Wedding Invitation
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: opened ? 0.3 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}

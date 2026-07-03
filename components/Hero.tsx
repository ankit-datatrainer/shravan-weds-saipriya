"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/config";
import Garland from "./decor/Garland";
import Peacock from "./decor/Peacock";
import CoupleIllustration from "./decor/CoupleIllustration";
import Sparkles from "./decor/Sparkles";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.22, duration: 0.9, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden paper-texture px-3 sm:px-6 pb-16 sm:pb-24">
      {/* toran across the very top */}
      <div className="relative -mx-3 sm:-mx-6">
        <Garland className="w-full h-14 sm:h-20 md:h-24 animate-sway origin-top" />
      </div>

      {/* peacocks flanking the card */}
      <Peacock className="pointer-events-none absolute bottom-6 -left-8 w-40 opacity-70 hidden lg:block" />
      <Peacock className="pointer-events-none absolute bottom-6 -right-8 w-40 opacity-70 -scale-x-100 hidden lg:block" />

      {/* the card panel with arch top */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative mx-auto mt-6 sm:mt-10 max-w-2xl rounded-t-[9rem] sm:rounded-t-[12rem] rounded-b-3xl border border-gold-400/50 bg-white/55 px-5 sm:px-10 md:px-14 pt-16 sm:pt-20 pb-10 sm:pb-14 text-center shadow-[0_20px_60px_rgba(122,31,43,0.08)]"
      >
        {/* inner arch line */}
        <div className="pointer-events-none absolute inset-2 sm:inset-3 rounded-t-[8.4rem] sm:rounded-t-[11.2rem] rounded-b-2xl border border-gold-400/35" />
        <Sparkles />

        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-devanagari text-maroon-700 text-base sm:text-lg tracking-wide"
        >
          {wedding.shloka.devanagari}
        </motion.p>

        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-5 font-script text-xl sm:text-2xl md:text-3xl text-leaf-600"
        >
          Two souls, one sacred journey
        </motion.p>

        <motion.h1
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 font-heading text-4xl sm:text-5xl md:text-6xl tracking-[0.18em] sm:tracking-[0.25em] text-leaf-700"
        >
          WELCOME
        </motion.h1>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="mx-auto mt-3 h-px w-40 sm:w-56 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          <p className="mt-3 font-heading text-sm sm:text-base tracking-[0.35em] text-maroon-700/80 uppercase">
            To the Wedding of
          </p>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4"
        >
          <span className="font-script text-4xl sm:text-5xl md:text-6xl gold-text leading-tight break-words">
            {wedding.groom.name}
          </span>
          <span className="font-script text-3xl sm:text-4xl text-rosegold">&amp;</span>
          <span className="font-script text-4xl sm:text-5xl md:text-6xl gold-text leading-tight break-words">
            {wedding.bride.name}
          </span>
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-4 space-y-1 text-[11px] sm:text-sm text-maroon-700/65"
        >
          <p>{wedding.groom.parents}</p>
          <p>{wedding.bride.parents}</p>
        </motion.div>

        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 sm:mt-8"
        >
          <CoupleIllustration className="mx-auto w-56 sm:w-72 md:w-80" />
        </motion.div>

        <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp} className="mt-4">
          <p className="font-heading text-lg sm:text-2xl tracking-[0.2em] text-maroon-700">
            {wedding.dateDisplay}
          </p>
          <p className="mt-2 section-eyebrow">{wedding.hashtag}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

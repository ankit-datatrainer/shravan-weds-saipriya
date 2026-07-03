"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { wedding } from "@/lib/config";
import FloralCorner from "./FloralCorner";
import TempleBell from "./TempleBell";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.25, duration: 0.9, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blush-100 via-cream to-blush-50 flex flex-col items-center justify-center px-6 py-24 text-center">
      <FloralCorner className="absolute top-0 left-0 w-40 md:w-64 animate-float" />
      <FloralCorner className="absolute top-0 right-0 w-40 md:w-64 -scale-x-100 animate-float" />
      <FloralCorner className="absolute bottom-0 left-0 w-40 md:w-64 -scale-y-100" />
      <FloralCorner className="absolute bottom-0 right-0 w-40 md:w-64 -scale-x-100 -scale-y-100" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 hidden md:flex gap-24 lg:gap-40">
        <TempleBell className="w-10 h-24 origin-top animate-swing" />
        <TempleBell className="w-8 h-20 origin-top animate-swing [animation-delay:0.6s]" />
        <TempleBell className="w-10 h-24 origin-top animate-swing [animation-delay:1.2s]" />
      </div>

      <motion.p
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="font-devanagari text-maroon-700 text-lg md:text-xl tracking-wide"
      >
        {wedding.shloka.devanagari}
      </motion.p>

      <motion.p
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-8 max-w-xl font-heading text-base md:text-lg italic text-maroon-700/80"
      >
        {wedding.shloka.blessing}
      </motion.p>

      <motion.h1
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-10 font-script text-6xl md:text-8xl gold-text leading-tight"
      >
        {wedding.groom.name}
      </motion.h1>

      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="my-4 flex items-center gap-4 text-rosegold"
      >
        <span className="h-px w-16 bg-rosegold/50" />
        <Heart className="w-5 h-5 fill-rosegold" />
        <span className="font-heading italic text-2xl">weds</span>
        <Heart className="w-5 h-5 fill-rosegold" />
        <span className="h-px w-16 bg-rosegold/50" />
      </motion.div>

      <motion.h1
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="font-script text-6xl md:text-8xl text-maroon-700 leading-tight"
      >
        {wedding.bride.name}
      </motion.h1>

      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-10 space-y-1 text-sm md:text-base text-maroon-700/70 font-body"
      >
        <p>{wedding.groom.parents}</p>
        <p>{wedding.bride.parents}</p>
      </motion.div>

      <motion.p
        custom={6}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-8 section-eyebrow"
      >
        {wedding.hashtag}
      </motion.p>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { wedding } from "@/lib/config";
import Peacock from "./decor/Peacock";
import Sparkles from "./decor/Sparkles";

export default function Venue() {
  return (
    <section id="venue" className="relative bg-cream py-16 sm:py-24 px-4 sm:px-6 text-center overflow-hidden">
      <Peacock className="pointer-events-none absolute -left-10 bottom-0 w-36 opacity-40 hidden md:block" />
      <Peacock className="pointer-events-none absolute -right-10 bottom-0 w-36 opacity-40 -scale-x-100 hidden md:block" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-xl rounded-t-[6rem] rounded-b-3xl border border-gold-400/50 bg-white/60 px-6 sm:px-10 pt-12 pb-10"
      >
        <div className="pointer-events-none absolute inset-2 rounded-t-[5.5rem] rounded-b-2xl border border-gold-400/30" />
        <Sparkles />

        <p className="section-eyebrow flex items-center justify-center gap-3">
          <MapPin className="w-4 h-4" /> The Venue
        </p>
        <h2 className="mt-4 font-heading text-2xl sm:text-4xl md:text-5xl text-maroon-800 break-words">
          {wedding.venue.name}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-maroon-700/70">{wedding.venue.address}</p>
        <a
          href={wedding.venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-8 inline-flex items-center gap-2 rounded-full border border-gold-400 px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold-600 hover:bg-gold-400 hover:text-white transition"
        >
          <Navigation className="w-4 h-4" /> Get Directions
        </a>
      </motion.div>
    </section>
  );
}

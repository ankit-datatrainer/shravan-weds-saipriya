"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { wedding } from "@/lib/config";

export default function Venue() {
  return (
    <section id="venue" className="bg-cream py-24 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto"
      >
        <p className="section-eyebrow flex items-center justify-center gap-3">
          <MapPin className="w-4 h-4" /> The Venue
        </p>
        <h2 className="mt-4 font-heading text-4xl md:text-5xl text-maroon-800">
          {wedding.venue.name}
        </h2>
        <p className="mt-3 text-maroon-700/70">{wedding.venue.address}</p>
        <a
          href={wedding.venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold-400 px-8 py-3 text-sm uppercase tracking-[0.25em] text-gold-600 hover:bg-gold-400 hover:text-white transition"
        >
          <Navigation className="w-4 h-4" /> Get Directions
        </a>
      </motion.div>
    </section>
  );
}

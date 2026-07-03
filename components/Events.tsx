"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Sparkles } from "lucide-react";
import { wedding } from "@/lib/config";

const themes = {
  haldi: {
    bg: "from-amber-50 via-yellow-50 to-orange-50",
    accent: "text-amber-700",
    border: "border-amber-300/60",
    chip: "bg-amber-100 text-amber-800",
  },
  mehendi: {
    bg: "from-green-50 via-emerald-50 to-lime-50",
    accent: "text-emerald-700",
    border: "border-emerald-300/60",
    chip: "bg-emerald-100 text-emerald-800",
  },
  wedding: {
    bg: "from-blush-50 via-rose-50 to-red-50",
    accent: "text-maroon-700",
    border: "border-rose-300/60",
    chip: "bg-rose-100 text-maroon-700",
  },
  sangeet: {
    bg: "from-indigo-50 via-violet-50 to-purple-50",
    accent: "text-indigo-800",
    border: "border-indigo-300/60",
    chip: "bg-indigo-100 text-indigo-800",
  },
};

export default function Events() {
  return (
    <section id="events" className="bg-gradient-to-b from-cream to-blush-50 py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="font-heading text-4xl md:text-6xl tracking-[0.2em] text-maroon-800 uppercase">
          Events Schedule
        </h2>
        <p className="mt-3 section-eyebrow">Celebrate With Us</p>
      </motion.div>

      <div className="mt-16 max-w-3xl mx-auto space-y-10">
        {wedding.events.map((event, i) => {
          const t = themes[event.theme];
          return (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative rounded-2xl border ${t.border} bg-gradient-to-br ${t.bg} p-8 md:p-12 text-center shadow-lg shadow-blush-200/40`}
            >
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs uppercase tracking-[0.3em] ${t.chip}`}
              >
                <Sparkles className="w-3.5 h-3.5" /> {wedding.hashtag}
              </span>
              <p className="mt-6 text-sm italic text-maroon-700/70 font-heading">
                Please join us for a morning {event.tagline.toLowerCase()}
              </p>
              <h3
                className={`mt-4 font-heading text-3xl md:text-5xl uppercase tracking-[0.15em] ${t.accent}`}
              >
                {event.name}
              </h3>
              <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-sm text-maroon-700/80">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> {event.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {event.time}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {event.venue}
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

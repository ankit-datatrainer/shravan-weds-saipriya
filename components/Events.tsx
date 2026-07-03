"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { wedding } from "@/lib/config";
import TiltCard from "./TiltCard";
import EventMotif from "./decor/EventMotif";
import Garland from "./decor/Garland";

const themes = {
  haldi: {
    bg: "from-amber-50 via-yellow-50/70 to-ivory",
    accent: "text-amber-700",
    border: "border-amber-300/60",
    ring: "bg-amber-100/80",
  },
  mehendi: {
    bg: "from-green-50 via-emerald-50/70 to-ivory",
    accent: "text-emerald-700",
    border: "border-emerald-300/60",
    ring: "bg-emerald-100/80",
  },
  sangeet: {
    bg: "from-indigo-50 via-violet-50/70 to-ivory",
    accent: "text-indigo-800",
    border: "border-indigo-300/60",
    ring: "bg-indigo-100/80",
  },
  wedding: {
    bg: "from-blush-50 via-rose-50/70 to-ivory",
    accent: "text-maroon-700",
    border: "border-rose-300/60",
    ring: "bg-rose-100/80",
  },
};

export default function Events() {
  return (
    <section id="events" className="relative paper-texture py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl tracking-[0.12em] sm:tracking-[0.2em] text-maroon-800 uppercase">
          Events Schedule
        </h2>
        <p className="mt-3 section-eyebrow">Four Days of Celebration</p>
        <Garland className="mx-auto mt-4 h-10 w-64 sm:w-96 opacity-80" />
      </motion.div>

      <div className="mt-10 sm:mt-16 mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
        {wedding.events.map((event, i) => {
          const t = themes[event.theme];
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 60, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.15, ease: "easeOut" }}
            >
              <TiltCard
                className={`h-full rounded-t-[5rem] rounded-b-2xl border ${t.border} bg-gradient-to-b ${t.bg} px-6 sm:px-8 pt-10 pb-8 text-center shadow-lg shadow-blush-200/40`}
              >
                {/* inner arch line */}
                <div className="pointer-events-none absolute inset-2 rounded-t-[4.5rem] rounded-b-xl border border-gold-400/30" />

                <div className={`mx-auto flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full ${t.ring} ring-1 ring-gold-400/40`}>
                  <EventMotif kind={event.theme} className="h-20 w-20 sm:h-24 sm:w-24" />
                </div>

                <h3 className={`mt-5 font-heading text-2xl sm:text-3xl uppercase tracking-[0.1em] ${t.accent} break-words`}>
                  {event.name}
                </h3>
                <p className="mt-2 font-script text-lg sm:text-xl text-maroon-700/70">
                  {event.tagline}
                </p>

                <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />

                <div className="mt-4 space-y-2 text-xs sm:text-sm text-maroon-700/80">
                  <p className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 shrink-0" /> {event.date}
                  </p>
                  <br />
                  <p className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0" /> {event.time}
                  </p>
                  <br />
                  <p className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" /> {event.venue}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

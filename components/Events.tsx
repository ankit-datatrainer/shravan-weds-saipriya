"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { wedding } from "@/lib/config";
import TiltCard from "./TiltCard";
import Garland from "./decor/Garland";
import EventFlowers from "./decor/EventFlowers";
import FlyingBirds from "./decor/FlyingBirds";

const eventImages: Record<string, string> = {
  haldi: "/images/events/haldi-ai.png",
  mehendi: "/images/events/mehendi-ai.png",
  sangeet: "/images/events/sangeet-ai.png",
  wedding: "/images/events/wedding-ai.png",
};

const themes = {
  haldi: {
    bg: "from-amber-950/80 via-amber-900/60 to-amber-800/40",
    accent: "text-amber-300",
    border: "border-amber-400/40",
    badge: "bg-amber-500/20 text-amber-200 border-amber-400/40",
    glow: "shadow-amber-900/50",
  },
  mehendi: {
    bg: "from-emerald-950/80 via-emerald-900/60 to-emerald-800/40",
    accent: "text-emerald-300",
    border: "border-emerald-400/40",
    badge: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
    glow: "shadow-emerald-900/50",
  },
  sangeet: {
    bg: "from-indigo-950/80 via-violet-900/60 to-purple-800/40",
    accent: "text-violet-200",
    border: "border-violet-400/40",
    badge: "bg-violet-500/20 text-violet-200 border-violet-400/40",
    glow: "shadow-violet-900/50",
  },
  wedding: {
    bg: "from-rose-950/80 via-maroon-900/60 to-rose-800/40",
    accent: "text-rose-200",
    border: "border-rose-400/40",
    badge: "bg-rose-500/20 text-rose-200 border-rose-400/40",
    glow: "shadow-rose-900/50",
  },
};

export default function Events() {
  return (
    <section id="events" className="relative paper-texture py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <EventFlowers />
      <FlyingBirds />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl tracking-[0.12em] sm:tracking-[0.2em] text-maroon-800 uppercase">
          Events Schedule
        </h2>
        <p className="mt-3 section-eyebrow">Four Days of Celebration</p>
        <Garland className="mx-auto mt-4 h-10 w-64 sm:w-96 opacity-80" />
      </motion.div>

      <div className="relative z-10 mt-10 sm:mt-16 mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
        {wedding.events.map((event, i) => {
          const t = themes[event.theme as keyof typeof themes] ?? themes.wedding;
          const img = eventImages[event.theme] ?? eventImages.wedding;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.15, ease: "easeOut" }}
            >
              <TiltCard
                className={`group h-full overflow-hidden rounded-2xl border ${t.border} shadow-2xl ${t.glow} bg-maroon-950`}
              >
                {/* Photo banner */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                  <Image
                    src={img}
                    alt={event.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient overlay on the photo for readability */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${t.bg}`} />

                  {/* Event name floated over photo */}
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <h3 className={`font-heading text-2xl sm:text-3xl uppercase tracking-[0.1em] ${t.accent} drop-shadow-lg`}>
                      {event.name}
                    </h3>
                    <p className="mt-1 font-script text-base sm:text-lg text-white/70 drop-shadow">
                      {event.tagline}
                    </p>
                  </div>
                </div>

                {/* Details section */}
                <div className="px-6 py-5 space-y-3 bg-maroon-950">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
                  <div className="space-y-2 text-xs sm:text-sm text-cream/90">
                    <p className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 shrink-0 text-gold-400" />
                      {event.date}
                    </p>
                    <br />
                    <p className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-gold-400" />
                      {event.time}
                    </p>
                    <br />
                    <p className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-gold-400" />
                      {event.venue}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

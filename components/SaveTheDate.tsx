"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarHeart, Clock } from "lucide-react";
import { wedding } from "@/lib/config";
import ScratchReveal from "./ScratchReveal";
import Sparkles from "./decor/Sparkles";

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

export default function SaveTheDate() {
  const target = new Date(wedding.date).getTime();
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = time
    ? ([
        ["Days", time.days],
        ["Hours", time.hours],
        ["Minutes", time.minutes],
        ["Seconds", time.seconds],
      ] as const)
    : ([
        ["Days", "--"],
        ["Hours", "--"],
        ["Minutes", "--"],
        ["Seconds", "--"],
      ] as const);

  return (
    <section id="save-the-date" className="relative bg-cream py-16 sm:py-24 px-4 sm:px-6 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="section-eyebrow flex items-center justify-center gap-3">
          <CalendarHeart className="w-4 h-4" /> Save The Date
        </p>
        <h2 className="mt-4 font-heading text-3xl sm:text-4xl md:text-6xl tracking-[0.12em] sm:tracking-[0.2em] text-maroon-800 uppercase">
          The Big Day
        </h2>
        <p className="mt-4 text-sm sm:text-base text-maroon-700/70 max-w-md mx-auto">
          A little surprise from{" "}
          <span className="name-highlight text-xl sm:text-2xl align-middle">
            {wedding.groom.name} &amp; {wedding.bride.name}
          </span>
          , sealed in gold — scratch the card below to unveil our wedding date.
        </p>

        {/* scratch card */}
        <div className="mt-8 sm:mt-10 mx-auto max-w-md">
          <div className="ornate-border rounded-2xl bg-white/80 p-2 sm:p-3">
            <ScratchReveal hint="Scratch to reveal the date" onRevealed={() => setRevealed(true)}>
              <div className="relative flex h-44 sm:h-52 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-blush-50 via-cream to-gold-300/25 px-4 overflow-hidden">
                {revealed && <Sparkles />}
                <p className="section-eyebrow">Shubh Vivah Muhurat</p>
                <p className="mt-3 font-heading text-3xl sm:text-4xl md:text-5xl tracking-wide text-maroon-700">
                  {wedding.dateDisplay}
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm sm:text-base text-maroon-700/75">
                  <Clock className="h-4 w-4" /> 11:23 AM — Auspicious Hour
                </p>
              </div>
            </ScratchReveal>
          </div>
        </div>

        {/* countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 sm:mt-14 grid grid-cols-4 gap-2 sm:gap-3 md:gap-6 max-w-xl mx-auto"
        >
          {units.map(([label, value]) => (
            <div
              key={label}
              className="ornate-border rounded-lg bg-white/80 py-3 sm:py-4 md:py-6 flex flex-col items-center"
            >
              <span className="font-heading text-xl sm:text-3xl md:text-5xl text-maroon-700 tabular-nums">
                {typeof value === "number" ? String(value).padStart(2, "0") : value}
              </span>
              <span className="mt-1 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] text-rosegold">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

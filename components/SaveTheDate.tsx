"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import { wedding } from "@/lib/config";

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
    <section id="save-the-date" className="relative bg-cream py-24 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        <p className="section-eyebrow flex items-center justify-center gap-3">
          <CalendarHeart className="w-4 h-4" /> Save The Date
        </p>
        <div className="mt-8 inline-block ornate-border rounded-lg bg-white/70 px-10 py-6 md:px-16">
          <p className="font-heading text-3xl md:text-5xl tracking-widest text-maroon-700">
            {wedding.dateDisplay}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-4 gap-3 md:gap-6 max-w-xl mx-auto">
          {units.map(([label, value]) => (
            <div
              key={label}
              className="ornate-border rounded-lg bg-white/80 py-4 md:py-6 flex flex-col items-center"
            >
              <span className="font-heading text-3xl md:text-5xl text-maroon-700 tabular-nums">
                {typeof value === "number" ? String(value).padStart(2, "0") : value}
              </span>
              <span className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.25em] text-rosegold">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

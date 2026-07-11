"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Clock } from "lucide-react";
import Image from "next/image";
import { wedding } from "@/lib/config";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.7, ease: "easeOut" },
  }),
};

/** A small hand-drawn flourish divider in the warm-gold ink of the card. */
function Flourish() {
  return (
    <svg viewBox="0 0 200 20" className="mx-auto h-4 w-40 sm:w-52" fill="none" aria-hidden="true">
      <path d="M10 10 H80" stroke="#a98545" strokeWidth="1" />
      <path d="M190 10 H120" stroke="#a98545" strokeWidth="1" />
      <path
        d="M100 3 C 108 3 108 10 100 10 C 92 10 92 17 100 17 C 108 17 108 10 100 10 C 92 10 92 3 100 3 Z"
        stroke="#a98545"
        strokeWidth="1"
      />
      <circle cx="83" cy="10" r="1.6" fill="#a98545" />
      <circle cx="117" cy="10" r="1.6" fill="#a98545" />
    </svg>
  );
}

/**
 * A single, self-contained wedding invitation card in a soft pastel
 * watercolor style. Designed for guests who only need the essentials —
 * who, whose family, when and where. Rendered over a generated floral
 * frame and shared as its own page (/invite).
 */
export default function InvitationCard() {
  const [, day, monthYear] = (() => {
    // "23rd August 2026" -> ["23rd August 2026", "23", "August 2026"]
    const m = wedding.dateDisplay.match(/(\d+)\w*\s+(.+)/);
    return m ?? ["", wedding.dateDisplay, ""];
  })();
  const [month, year] = monthYear.split(" ");

  return (
    <section className="relative px-3 sm:px-6 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative mx-auto max-w-[38rem] overflow-hidden rounded-[1.5rem] shadow-[0_25px_70px_rgba(120,90,50,0.22)] ring-1 ring-[#e6d8bf]"
      >
        {/* Watercolor floral frame background */}
        <Image
          src="/images/invite-frame.png"
          alt=""
          fill
          priority
          className="object-cover object-top -z-10"
          sizes="(max-width: 640px) 100vw, 608px"
        />

        {/* Content in the open cream centre — generous side padding keeps
            text clear of the painted florals on every edge. */}
        <div className="flex flex-col items-center px-[13%] sm:px-[15%] pt-[16%] pb-[15%] text-center text-[#7c5e33]">
          <motion.p
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-devanagari text-[0.8rem] sm:text-base tracking-wide text-[#9a7b42]"
          >
            {wedding.shloka.devanagari}
          </motion.p>

          <motion.p
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-5 font-heading text-[0.72rem] sm:text-sm uppercase tracking-[0.28em] text-[#8a6f45]"
          >
            Together with their families
          </motion.p>
          <motion.p
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-heading text-[0.72rem] sm:text-sm uppercase tracking-[0.28em] text-[#8a6f45]"
          >
            request the pleasure of your company
          </motion.p>

          {/* Names */}
          <motion.h1
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-6 flex flex-col items-center leading-none"
          >
            <span className="font-script text-[2.6rem] sm:text-6xl text-[#9c7226]">
              {wedding.groom.name}
            </span>
            <span className="my-1 font-heading text-xl sm:text-2xl italic text-[#b08a4a]">and</span>
            <span className="font-script text-[2.6rem] sm:text-6xl text-[#9c7226]">
              {wedding.bride.name}
            </span>
          </motion.h1>

          <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Flourish />
          </motion.div>

          {/* Date + time */}
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-1 flex items-center justify-center gap-3 font-heading text-[#7c5e33]"
          >
            <span className="text-base sm:text-xl uppercase tracking-[0.15em]">{month}</span>
            <span className="text-[#c9b48a]">|</span>
            <span className="text-2xl sm:text-4xl font-semibold">{day}</span>
            <span className="text-[#c9b48a]">|</span>
            <span className="text-base sm:text-xl tracking-[0.1em]">{year}</span>
          </motion.div>
          <motion.p
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-3 inline-flex items-center gap-2 text-[0.8rem] sm:text-sm text-[#8a6f45]"
          >
            <Clock className="h-3.5 w-3.5" />
            {wedding.events.find((e) => e.theme === "wedding")?.time ?? "11:23 AM"}
          </motion.p>

          {/* Families */}
          <motion.div
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-7 space-y-4 text-[#7c5e33]"
          >
            <div>
              <p className="font-heading text-base sm:text-lg text-[#8a5a2e]">{wedding.groom.fullName}</p>
              <p className="mt-0.5 text-[0.72rem] sm:text-[0.85rem] text-[#8a6f45]">{wedding.groom.parents}</p>
            </div>
            <p className="font-script text-2xl text-[#b08a4a]">&amp;</p>
            <div>
              <p className="font-heading text-base sm:text-lg text-[#8a5a2e]">{wedding.bride.fullName}</p>
              <p className="mt-0.5 text-[0.72rem] sm:text-[0.85rem] text-[#8a6f45]">{wedding.bride.parents}</p>
            </div>
          </motion.div>

          {/* Venue */}
          <motion.div
            custom={6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-7"
          >
            <p className="inline-flex items-center gap-2 font-heading text-[0.72rem] sm:text-sm uppercase tracking-[0.28em] text-[#8a6f45]">
              <MapPin className="h-3.5 w-3.5" /> Venue
            </p>
            <p className="mt-2 font-heading text-base sm:text-xl text-[#8a5a2e]">{wedding.venue.name}</p>
            <p className="mt-1 text-[0.72rem] sm:text-[0.85rem] text-[#8a6f45]">{wedding.venue.address}</p>
            <a
              href={wedding.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#c9a44f] bg-white/40 px-5 py-2 text-[0.68rem] sm:text-xs uppercase tracking-[0.2em] text-[#8a5a2e] backdrop-blur-sm transition hover:bg-[#c9a44f] hover:text-white"
            >
              <Navigation className="h-3.5 w-3.5" /> Get Directions
            </a>
          </motion.div>

          <motion.p
            custom={7}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-7 font-heading text-[0.68rem] sm:text-xs uppercase tracking-[0.3em] text-[#9a7b42]"
          >
            {wedding.hashtag}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

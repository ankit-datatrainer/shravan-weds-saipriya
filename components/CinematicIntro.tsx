"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/config";

/**
 * A scroll-scrubbed cinematic opening (Lando-style). A tall scroll track
 * holds a sticky, full-screen video whose playhead is driven by scroll
 * position, so scrolling "plays" the temple push-in. Couple names, the
 * shloka and date fade in/out over the footage as the user scrolls.
 */
export default function CinematicIntro() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Pick the right orientation once on mount.
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const track = trackRef.current;
    if (!video || !track) return;

    let raf = 0;
    let targetTime = 0;

    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const p = scrollable > 0 ? scrolled / scrollable : 0;
      setProgress(p);
      const dur = video.duration || 10;
      targetTime = p * (dur - 0.05);
    };

    // Smoothly chase the scroll-derived target time each frame.
    const tick = () => {
      if (video.readyState >= 2) {
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.008) {
          video.currentTime += diff * 0.28;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  // Fade helpers based on scroll progress (0..1).
  const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
  // Opening title: visible at start, gone by ~15%.
  const titleOpacity = clamp(1 - progress / 0.15);
  // Names: rise in around 15%–35%.
  const namesOpacity =
    progress < 0.15 ? 0 : progress < 0.35 ? clamp((progress - 0.15) / 0.20) : clamp(1 - (progress - 0.8) / 0.15);
  // Scroll hint fades out as soon as you start.
  const hintOpacity = clamp(1 - progress / 0.12);
  // Dark vignette deepens toward the end so text stays readable.
  const veil = 0.15 + progress * 0.35;

  const src = isMobile ? "/video/intro-mobile.mp4" : "/video/intro-desktop.mp4";
  const poster = isMobile ? "/images/intro-poster-mobile.jpg" : "/video/intro-poster.jpg";

  return (
    <section ref={trackRef} className="relative h-[320vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          key={src}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* readability veil: darkens top+bottom always, strengthens on scroll */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/70"
          style={{ opacity: veil }}
        />

        {/* extra scrim focused behind the center text so it reads on any footage */}
        <div className="pointer-events-none absolute inset-0 bg-black/35" />
        <div className="pointer-events-none absolute inset-x-0 top-1/3 -translate-y-1/2 h-72 bg-black/30 blur-3xl" />

        {/* Opening title */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: titleOpacity, transform: `scale(${1 + progress * 0.15})` }}
        >
          <p className="font-devanagari text-white text-lg sm:text-2xl font-bold tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm border border-gold-400/30">
            {wedding.shloka.devanagari}
          </p>
          <p className="section-eyebrow mt-6 text-[10px] sm:text-xs tracking-[0.35em] text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Together with our families
          </p>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl md:text-6xl tracking-[0.2em] text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.9),0_4px_24px_rgba(0,0,0,0.9)]">
            YOU&apos;RE INVITED
          </h2>
          <p className="mt-4 font-script text-3xl sm:text-5xl text-gold-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            {wedding.groom.name} &amp; {wedding.bride.name}
          </p>
        </div>

        {/* Names reveal */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ 
            opacity: namesOpacity,
            transform: `scale(${0.9 + (namesOpacity * 0.1)}) translateY(${(1 - namesOpacity) * 30}px)`
          }}
        >
          <h1 className="font-script flex flex-col items-center gap-2 leading-none">
            <span className="px-4 text-[2.4rem] leading-tight sm:text-7xl md:text-8xl text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_6px_28px_rgba(0,0,0,0.9)]">
              {wedding.groom.name}
            </span>
            <span className="my-1 font-sans text-2xl sm:text-3xl italic text-gold-300 [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
              &amp;
            </span>
            <span className="px-4 text-[2.4rem] leading-tight sm:text-7xl md:text-8xl text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_6px_28px_rgba(0,0,0,0.9)]">
              {wedding.bride.name}
            </span>
          </h1>
          <div className="mt-6 h-px w-40 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p className="mt-4 text-[11px] sm:text-sm uppercase tracking-[0.35em] text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            {wedding.dateDisplay}
          </p>
        </div>

        {/* Scroll hint */}
        <div
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 rounded-full bg-black/40 px-4 py-3 backdrop-blur-sm"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">Scroll</span>
          <span className="h-9 w-5 rounded-full border border-white/80 flex justify-center pt-1.5">
            <span className="h-2 w-1 rounded-full bg-white animate-bounce" />
          </span>
        </div>
      </div>
    </section>
  );
}

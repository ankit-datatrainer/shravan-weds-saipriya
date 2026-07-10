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
  // Opening title: visible at start, gone by ~40%.
  const titleOpacity = clamp(1 - progress / 0.42);
  // Names: rise in around 45%–75%.
  const namesOpacity =
    progress < 0.4 ? 0 : progress < 0.62 ? clamp((progress - 0.4) / 0.22) : clamp(1 - (progress - 0.72) / 0.18);
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

        {/* readability veil */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
          style={{ opacity: veil }}
        />

        {/* Opening title */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: titleOpacity, transform: `scale(${1 + progress * 0.15})` }}
        >
          <p className="font-devanagari text-gold-200 text-sm sm:text-lg tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {wedding.shloka.devanagari}
          </p>
          <p className="section-eyebrow mt-4 text-[10px] sm:text-xs tracking-[0.35em] text-cream/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Together with our families
          </p>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl md:text-6xl tracking-[0.2em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]">
            YOU&apos;RE INVITED
          </h2>
        </div>

        {/* Names reveal */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: namesOpacity }}
        >
          <h1 className="font-script flex flex-col items-center gap-2 leading-none">
            <span className="px-4 text-[2.4rem] leading-tight sm:text-7xl md:text-8xl text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.85)]">
              {wedding.groom.name}
            </span>
            <span className="my-1 font-sans text-2xl sm:text-3xl italic text-gold-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              &amp;
            </span>
            <span className="px-4 text-[2.4rem] leading-tight sm:text-7xl md:text-8xl text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.85)]">
              {wedding.bride.name}
            </span>
          </h1>
          <div className="mt-6 h-px w-40 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p className="mt-4 text-[11px] sm:text-sm uppercase tracking-[0.35em] text-cream/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {wedding.dateDisplay}
          </p>
        </div>

        {/* Scroll hint */}
        <div
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream/80">Scroll</span>
          <span className="h-9 w-5 rounded-full border border-cream/60 flex justify-center pt-1.5">
            <span className="h-2 w-1 rounded-full bg-cream/80 animate-bounce" />
          </span>
        </div>
      </div>
    </section>
  );
}

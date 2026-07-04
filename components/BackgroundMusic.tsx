"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Loops the wedding bgm once `playWhen` turns true (i.e. after the
 * card is opened, so it counts as a user gesture for autoplay rules),
 * and exposes a small floating toggle so guests can mute it.
 */
export default function BackgroundMusic({ playWhen }: { playWhen: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (playWhen && !started && audioRef.current) {
      audioRef.current.volume = 0.45;
      audioRef.current.play().catch(() => {});
      setStarted(true);
    }
  }, [playWhen, started]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    setMuted((m) => !m);
  }

  function handleTimeUpdate() {
    if (audioRef.current && audioRef.current.currentTime >= 28) {
      audioRef.current.currentTime = 0;
    }
  }

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/audio/bgm.mp3" 
        loop 
        preload="none" 
        onTimeUpdate={handleTimeUpdate} 
      />
      {started && (
        <button
          type="button"
          onClick={toggle}
          aria-label={muted ? "Play background music" : "Pause background music"}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gold-400/60 bg-maroon-800/90 text-gold-300 shadow-lg backdrop-blur-sm transition hover:bg-maroon-700 active:scale-95"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}
    </>
  );
}

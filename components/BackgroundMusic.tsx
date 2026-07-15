"use client";

import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Volume2, VolumeX } from "lucide-react";

export interface BackgroundMusicRef {
  playMusic: () => void;
}

/**
 * Loops a chosen segment of a track once `playMusic()` is called via ref 
 * (i.e. on direct user click, satisfying strict autoplay rules), and exposes 
 * a small floating toggle so guests can mute it.
 */
const BackgroundMusic = forwardRef<BackgroundMusicRef, {
  src?: string;
  loopStart?: number;
  loopEnd?: number;
}>(({ src = "/audio/bgm.mp3", loopStart = 0, loopEnd = 28 }, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useImperativeHandle(ref, () => ({
    playMusic: () => {
      if (audioRef.current && !started) {
        audioRef.current.currentTime = loopStart;
        audioRef.current.volume = 0.7;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
        setStarted(true);
      }
    }
  }));

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
    const audio = audioRef.current;
    if (audio && audio.currentTime >= loopEnd) {
      audio.currentTime = loopStart;
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
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
});

BackgroundMusic.displayName = "BackgroundMusic";

export default BackgroundMusic;

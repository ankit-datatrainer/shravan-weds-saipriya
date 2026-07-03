import { Heart } from "lucide-react";
import { wedding } from "@/lib/config";
import Garland from "./decor/Garland";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon-900 text-cream text-center">
      <Garland className="w-full h-12 sm:h-16 opacity-80" />
      <div className="px-4 sm:px-6 pb-14 sm:pb-20 pt-8 sm:pt-12">
        <p className="font-script text-4xl sm:text-5xl md:text-6xl gold-text break-words">
          {wedding.groom.name} &amp; {wedding.bride.name}
        </p>
        <p className="mt-4 flex items-center justify-center gap-2 text-sm tracking-[0.3em] uppercase text-cream/70">
          {wedding.dateDisplay}
        </p>
        <p className="mt-6 inline-flex items-center gap-2 text-cream/60 text-sm">
          Made with <Heart className="w-4 h-4 fill-rosegold text-rosegold" /> for our loved ones
        </p>
        <p className="mt-3 text-xs tracking-[0.4em] uppercase text-gold-300">{wedding.hashtag}</p>
      </div>
    </footer>
  );
}

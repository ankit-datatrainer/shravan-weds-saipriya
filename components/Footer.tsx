import { Heart } from "lucide-react";
import { wedding } from "@/lib/config";
import FloralCorner from "./FloralCorner";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon-800 text-cream py-20 px-6 text-center">
      <FloralCorner className="absolute bottom-0 left-0 w-36 -scale-y-100 opacity-30" />
      <FloralCorner className="absolute bottom-0 right-0 w-36 -scale-x-100 -scale-y-100 opacity-30" />
      <p className="font-script text-5xl md:text-6xl gold-text">
        {wedding.groom.name} &amp; {wedding.bride.name}
      </p>
      <p className="mt-4 flex items-center justify-center gap-2 text-sm tracking-[0.3em] uppercase text-cream/70">
        {wedding.dateDisplay}
      </p>
      <p className="mt-6 inline-flex items-center gap-2 text-cream/60 text-sm">
        Made with <Heart className="w-4 h-4 fill-rosegold text-rosegold" /> for our loved ones
      </p>
      <p className="mt-3 text-xs tracking-[0.4em] uppercase text-gold-300">{wedding.hashtag}</p>
    </footer>
  );
}

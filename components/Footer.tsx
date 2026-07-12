import { Heart } from "lucide-react";
import { wedding } from "@/lib/config";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon-900 text-cream text-center pt-20 pb-16">
      {/* Decorative Top Border using Roses */}
      <div className="absolute top-0 left-0 w-full h-12 flex justify-between items-start pointer-events-none opacity-80">
        <Image 
          src="/images/white_rose_1.png" 
          alt="rose" 
          width={100} 
          height={100} 
          className="w-24 h-24 object-contain -translate-y-1/2 -translate-x-1/2 rotate-12" 
        />
        <Image 
          src="/images/white_rose_2.png" 
          alt="rose" 
          width={100} 
          height={100} 
          className="w-24 h-24 object-contain -translate-y-1/2 translate-x-1/2 -rotate-12" 
        />
      </div>

      <div className="px-6 relative z-10">
        <p className="font-script text-5xl md:text-7xl gold-text break-words mb-2 drop-shadow-md">
          {wedding.groom.name} &amp; {wedding.bride.name}
        </p>
        
        <p className="flex items-center justify-center gap-3 text-sm md:text-base tracking-[0.4em] uppercase text-cream/90 font-medium">
          <span className="w-8 h-px bg-rosegold/50 hidden sm:block"></span>
          {wedding.dateDisplay}
          <span className="w-8 h-px bg-rosegold/50 hidden sm:block"></span>
        </p>
        
        <div className="mt-12 flex flex-col items-center gap-2">
          <p className="inline-flex items-center gap-2 text-cream/70 text-sm italic font-serif">
            Made with <Heart className="w-4 h-4 fill-rosegold text-rosegold" /> for our loved ones
          </p>
          <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-gold-300 font-bold mt-2">
            {wedding.hashtag}
          </p>
        </div>
      </div>
    </footer>
  );
}

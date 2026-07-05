"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, MailOpen, Users } from "lucide-react";

type Status = "idle" | "sending" | "done" | "error";

const EVENT_OPTIONS = [
  "Mehendi",
  "Sangeeth",
  "Haldi",
  "Wedding",
  "All",
  "Not attending"
];

export default function Rsvp() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const handleEventChange = (val: string) => {
    if (val === "Not attending") {
      setSelectedEvents(["Not attending"]);
    } else if (val === "All") {
      setSelectedEvents(["All"]);
    } else {
      let next = selectedEvents.filter(e => e !== "Not attending" && e !== "All");
      if (next.includes(val)) {
        next = next.filter(e => e !== val);
      } else {
        next.push(val);
      }
      setSelectedEvents(next);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedEvents.length === 0) {
      setError("Please select at least one event option.");
      return;
    }
    
    setStatus("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.events = selectedEvents.join(", ");
    
    try {
      const existing = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
      const newEntry = {
        id: crypto.randomUUID(),
        ...payload,
        at: new Date().toISOString(),
      };
      existing.push(newEntry);
      localStorage.setItem("wedding_rsvps", JSON.stringify(existing));
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError("Failed to save locally.");
    }
  }

  return (
    <section id="rsvp" className="paper-texture py-16 sm:py-24 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto text-center"
      >
        <p className="section-eyebrow flex items-center justify-center gap-3">
          <MailOpen className="w-4 h-4" /> Kindly Respond
        </p>
        <h2 className="mt-4 font-heading text-3xl sm:text-4xl md:text-6xl tracking-[0.1em] sm:tracking-[0.15em] text-maroon-800 uppercase">
          RSVP
        </h2>
        <p className="mt-4 text-sm sm:text-base text-maroon-700/70">
          Your presence is the greatest gift. Please let us know which events you can join!
        </p>
        <p className="mt-2 text-sm sm:text-base text-maroon-700 font-medium">
          For any questions, contact Ankit: <a href="tel:+16692120592" className="underline decoration-gold-400 decoration-2 underline-offset-4">+1 (669) 212-0592</a>
        </p>

        {status === "done" ? (
          <div className="mt-10 sm:mt-12 ornate-border rounded-2xl bg-white/80 p-6 sm:p-10">
            <CheckCircle2 className="mx-auto w-10 h-10 sm:w-12 sm:h-12 text-sage" />
            <p className="mt-4 font-heading text-xl sm:text-2xl text-maroon-700">
              Thank you! Your response has been recorded.
            </p>
            <p className="mt-2 text-sm text-maroon-700/60">We can&apos;t wait to celebrate with you.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 sm:mt-12 ornate-border rounded-t-[3.5rem] rounded-b-2xl bg-white/80 p-5 sm:p-8 md:p-10 text-left space-y-5">
            <div>
              <label htmlFor="name" className="text-xs uppercase tracking-[0.25em] text-rosegold">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                required
                minLength={2}
                className="mt-2 w-full rounded-lg border border-blush-200 bg-cream px-4 py-3 text-base outline-none focus:border-rosegold transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-xs uppercase tracking-[0.25em] text-rosegold">
                Phone / WhatsApp
              </label>
              <input
                id="phone"
                name="phone"
                required
                pattern="[+0-9\s-]{7,15}"
                className="mt-2 w-full rounded-lg border border-blush-200 bg-cream px-4 py-3 text-base outline-none focus:border-rosegold transition"
                placeholder="+91 98765 43210"
              />
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-[0.25em] text-rosegold block mb-3">
                Events Attending
              </label>
              <div className="grid grid-cols-2 gap-3">
                {EVENT_OPTIONS.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <div 
                      onClick={(e) => { e.preventDefault(); handleEventChange(opt); }}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedEvents.includes(opt) ? 'bg-maroon-700 border-maroon-700' : 'border-blush-200 bg-cream group-hover:border-rosegold'}`}>
                      {selectedEvents.includes(opt) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span onClick={() => handleEventChange(opt)} className="text-sm text-maroon-800">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="guests" className="text-xs uppercase tracking-[0.25em] text-rosegold">
                Number of Guests
              </label>
              <input
                id="guests"
                name="guests"
                type="number"
                min={1}
                max={10}
                defaultValue={1}
                required
                className="mt-2 w-full rounded-lg border border-blush-200 bg-cream px-4 py-3 text-base outline-none focus:border-rosegold transition"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="text-xs uppercase tracking-[0.25em] text-rosegold">
                Wishes for the couple (optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                maxLength={500}
                className="mt-2 w-full rounded-lg border border-blush-200 bg-cream px-4 py-3 text-base outline-none focus:border-rosegold transition resize-none"
                placeholder="Your blessings & wishes"
              />
            </div>
            {status === "error" && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-maroon-700 hover:bg-maroon-800 text-cream py-4 uppercase tracking-[0.3em] text-sm transition disabled:opacity-60"
            >
              {status === "sending" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Users className="w-4 h-4" />
              )}
              {status === "sending" ? "Sending..." : "Send RSVP"}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, MailOpen, Users } from "lucide-react";

type Status = "idle" | "sending" | "done" | "error";

export default function Rsvp() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="rsvp" className="bg-blush-50 py-24 px-6">
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
        <h2 className="mt-4 font-heading text-4xl md:text-6xl tracking-[0.15em] text-maroon-800 uppercase">
          RSVP
        </h2>
        <p className="mt-4 text-maroon-700/70">
          Your presence is the greatest gift. Please let us know if you can join us.
        </p>

        {status === "done" ? (
          <div className="mt-12 ornate-border rounded-2xl bg-white/80 p-10">
            <CheckCircle2 className="mx-auto w-12 h-12 text-sage" />
            <p className="mt-4 font-heading text-2xl text-maroon-700">
              Thank you! Your response has been recorded.
            </p>
            <p className="mt-2 text-sm text-maroon-700/60">We can&apos;t wait to celebrate with you.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 ornate-border rounded-2xl bg-white/80 p-8 md:p-10 text-left space-y-5">
            <div>
              <label htmlFor="name" className="text-xs uppercase tracking-[0.25em] text-rosegold">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                required
                minLength={2}
                className="mt-2 w-full rounded-lg border border-blush-200 bg-cream px-4 py-3 outline-none focus:border-rosegold transition"
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
                className="mt-2 w-full rounded-lg border border-blush-200 bg-cream px-4 py-3 outline-none focus:border-rosegold transition"
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label htmlFor="attending" className="text-xs uppercase tracking-[0.25em] text-rosegold">
                  Attending?
                </label>
                <select
                  id="attending"
                  name="attending"
                  required
                  className="mt-2 w-full rounded-lg border border-blush-200 bg-cream px-4 py-3 outline-none focus:border-rosegold transition"
                >
                  <option value="yes">Joyfully accepts</option>
                  <option value="no">Regretfully declines</option>
                </select>
              </div>
              <div>
                <label htmlFor="guests" className="text-xs uppercase tracking-[0.25em] text-rosegold">
                  Guests
                </label>
                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={1}
                  required
                  className="mt-2 w-full rounded-lg border border-blush-200 bg-cream px-4 py-3 outline-none focus:border-rosegold transition"
                />
              </div>
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
                className="mt-2 w-full rounded-lg border border-blush-200 bg-cream px-4 py-3 outline-none focus:border-rosegold transition resize-none"
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

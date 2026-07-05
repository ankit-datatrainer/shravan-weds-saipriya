"use client";

import { useState, useEffect } from "react";
import { Users, MailOpen, Phone } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import RsvpTable from "@/components/RsvpTable";

interface RsvpEntry {
  id?: string;
  name: string;
  phone: string;
  events: string;
  guests: string;
  message: string;
  at: string;
}

export default function AdminPage() {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wedding_rsvps");
      if (stored) {
        const parsed = JSON.parse(stored) as RsvpEntry[];
        parsed.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
        setRsvps(parsed);
      }
    } catch (err) {
      console.error("Failed to fetch RSVPs from local storage", err);
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Count metrics
  const totalRsvps = rsvps.length;
  const totalGuestsAttending = rsvps
    .filter(r => r.events !== "Not attending")
    .reduce((sum, r) => sum + Number(r.guests || 1), 0);

  return (
    <div className="min-h-screen bg-cream p-6 sm:p-12 font-sans text-maroon-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="border-b border-blush-200 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading tracking-widest uppercase">Admin Dashboard</h1>
            <p className="text-maroon-700/70 mt-1">Manage and view your RSVPs (Local Storage)</p>
          </div>
          <LogoutButton />
        </header>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-blush-200 shadow-sm flex flex-col items-center justify-center text-center">
            <MailOpen className="w-6 h-6 text-rosegold mb-2" />
            <div className="text-3xl font-bold text-maroon-800">{totalRsvps}</div>
            <div className="text-xs uppercase tracking-widest text-maroon-700/60 mt-1">Total Submissions</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-blush-200 shadow-sm flex flex-col items-center justify-center text-center">
            <Users className="w-6 h-6 text-rosegold mb-2" />
            <div className="text-3xl font-bold text-maroon-800">{totalGuestsAttending}</div>
            <div className="text-xs uppercase tracking-widest text-maroon-700/60 mt-1">Total Guests Attending</div>
          </div>
        </div>
        {/* RSVPs Table Component */}
        <RsvpTable initialData={rsvps} />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Users, MailOpen, Phone } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import RsvpTable from "@/components/RsvpTable";

interface RsvpEntry {
  id: string;
  name: string;
  phone: string;
  events: string;
  guests: string;
  message: string;
  created_at: string;
}

export default function AdminPage() {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    fetch("/api/rsvp")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setRsvps(data.rsvps ?? []);
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Failed to load RSVPs"))
      .finally(() => setMounted(true));
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
            <p className="text-maroon-700/70 mt-1">Manage and view your RSVPs (Supabase)</p>
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
        {loadError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {loadError}
          </p>
        )}

        {/* RSVPs Table Component */}
        <RsvpTable initialData={rsvps} />
      </div>
    </div>
  );
}

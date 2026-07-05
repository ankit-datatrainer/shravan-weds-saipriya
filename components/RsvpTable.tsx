"use client";

import { useState } from "react";
import { Trash2, Pencil, X, Save, Loader2 } from "lucide-react";

type RsvpEntry = {
  id?: string;
  name: string;
  phone: string;
  events: string;
  guests: string;
  message: string;
  at: string;
};

export default function RsvpTable({ initialData }: { initialData: RsvpEntry[] }) {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>(initialData);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<RsvpEntry>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this RSVP?")) return;

    setIsDeleting(id);
    try {
      const stored = localStorage.getItem("wedding_rsvps");
      if (stored) {
        const parsed = JSON.parse(stored) as RsvpEntry[];
        const updated = parsed.filter(r => (r.id || r.at) !== id);
        localStorage.setItem("wedding_rsvps", JSON.stringify(updated));
        setRsvps(prev => prev.filter((r) => (r.id || r.at) !== id));
      }
    } catch (err) {
      alert("Error deleting RSVP");
    } finally {
      setIsDeleting(null);
    }
  };

  const startEdit = (rsvp: RsvpEntry) => {
    setIsEditing(rsvp.id || rsvp.at);
    setEditForm(rsvp);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!isEditing) return;
    setIsSaving(true);
    
    try {
      const stored = localStorage.getItem("wedding_rsvps");
      if (stored) {
        const parsed = JSON.parse(stored) as RsvpEntry[];
        const updated = parsed.map(r => 
          (r.id || r.at) === isEditing ? { ...r, ...editForm } as RsvpEntry : r
        );
        localStorage.setItem("wedding_rsvps", JSON.stringify(updated));
        setRsvps(prev =>
          prev.map((r) => ((r.id || r.at) === isEditing ? { ...r, ...editForm } as RsvpEntry : r))
        );
        setIsEditing(null);
      }
    } catch (err) {
      alert("Error updating RSVP");
    } finally {
      setIsSaving(false);
    }
  };

  if (rsvps.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-blush-200">
        <p className="text-maroon-700/60">No RSVPs received yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-blush-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-maroon-800 uppercase bg-blush-100/50 font-heading tracking-wider">
            <tr>
              <th className="px-6 py-4">Guest Name</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Events Attending</th>
              <th className="px-6 py-4 text-center">Count</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((entry, index) => {
              const entryId = entry.id || entry.at;
              const isThisEditing = isEditing === entryId;

              return (
                <tr
                  key={entryId}
                  className={`border-b border-blush-100 last:border-0 ${
                    index % 2 === 0 ? "bg-white" : "bg-cream/30"
                  }`}
                >
                  {isThisEditing ? (
                    // Edit Mode Row
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.name || ""}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full p-2 border border-blush-200 rounded outline-none focus:border-rosegold"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.phone || ""}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full p-2 border border-blush-200 rounded outline-none focus:border-rosegold"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.events || ""}
                          onChange={(e) => setEditForm({ ...editForm, events: e.target.value })}
                          className="w-full p-2 border border-blush-200 rounded outline-none focus:border-rosegold"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <select
                          value={editForm.guests || "1"}
                          onChange={(e) => setEditForm({ ...editForm, guests: e.target.value })}
                          className="p-2 border border-blush-200 rounded outline-none focus:border-rosegold"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4+">4+</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <textarea
                          value={editForm.message || ""}
                          onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                          className="w-full p-2 border border-blush-200 rounded outline-none focus:border-rosegold text-xs"
                          rows={1}
                        />
                      </td>
                      <td className="px-6 py-4 text-maroon-700/60 whitespace-nowrap">
                        {new Date(entry.at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Save"
                        >
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  ) : (
                    // View Mode Row
                    <>
                      <td className="px-6 py-4 font-medium text-maroon-800">
                        {entry.name}
                      </td>
                      <td className="px-6 py-4 text-maroon-700 font-mono text-xs">
                        {entry.phone}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 whitespace-pre-wrap max-w-[150px]">
                          {entry.events || "All"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-maroon-800">
                        {entry.guests}
                      </td>
                      <td className="px-6 py-4 text-maroon-700 max-w-[200px] truncate">
                        {entry.message || "-"}
                      </td>
                      <td className="px-6 py-4 text-maroon-700/60 whitespace-nowrap">
                        {new Date(entry.at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={() => startEdit(entry)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(entryId)}
                          disabled={isDeleting === entryId}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                          title="Delete"
                        >
                          {isDeleting === entryId ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

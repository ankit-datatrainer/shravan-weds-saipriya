"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-2 text-sm text-maroon-700 hover:text-maroon-800 font-medium px-4 py-2 rounded-lg hover:bg-maroon-700/10 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}

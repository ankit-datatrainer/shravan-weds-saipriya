"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to admin dashboard
        router.push("/admin");
        router.refresh(); // Force refresh to ensure middleware picks up the cookie
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-blush-200 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blush-100 mb-4">
            <Lock className="w-6 h-6 text-maroon-700" />
          </div>
          <h1 className="text-2xl font-heading tracking-widest uppercase text-maroon-800">
            Admin Login
          </h1>
          <p className="text-sm text-maroon-700/60 mt-2">
            Enter your credentials to access the portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-rosegold block mb-2">
              Admin ID
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-blush-200 bg-cream px-4 py-3 text-base outline-none focus:border-rosegold transition"
              placeholder="Enter ID"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-rosegold block mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-blush-200 bg-cream px-4 py-3 text-base outline-none focus:border-rosegold transition"
              placeholder="Enter Password"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-maroon-700 hover:bg-maroon-800 text-cream py-4 uppercase tracking-[0.2em] text-sm transition disabled:opacity-60 mt-4"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {isLoading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

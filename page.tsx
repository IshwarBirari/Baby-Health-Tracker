"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Container } from "@/components/Container";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMsg("Signup successful. Check your email if confirmation is enabled.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/";
      }
    } catch (e: any) {
      setMsg(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1 className="text-2xl font-semibold pt-2">Baby Tracker</h1>
      <p className="text-sm text-gray-600">Sign in to start tracking.</p>

      <div className="mt-6 rounded-2xl border p-4">
        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 rounded-xl py-2 ${mode === "signin" ? "bg-black text-white" : "border"}`}
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>
          <button
            className={`flex-1 rounded-xl py-2 ${mode === "signup" ? "bg-black text-white" : "border"}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <label className="text-sm">Email</label>
        <input
          className="w-full border rounded-xl p-3 mt-1 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label className="text-sm">Password</label>
        <input
          className="w-full border rounded-xl p-3 mt-1 mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <button
          onClick={submit}
          disabled={loading || !email || !password}
          className="w-full rounded-2xl py-3 font-semibold bg-indigo-600 text-white disabled:opacity-40"
        >
          {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>

        {msg ? <p className="text-sm text-gray-700 mt-3">{msg}</p> : null}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Tip: In Supabase Auth settings, you can disable email confirmation for easier local testing.
      </p>
    </Container>
  );
}

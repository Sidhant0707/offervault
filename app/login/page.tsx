"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import BackButton from "@/components/BackButton";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      // TypeScript Fix: Type Narrowing instead of 'any'
      if (err instanceof Error) {
        console.error("Login error:", err.message);
        setError(err.message);
      } else {
        console.error("An unexpected error occurred:", err);
        setError("An unexpected error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center relative bg-black">
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 opacity-20"
        style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
      />

      <div className="w-full max-w-md px-6 relative z-10 mb-6">
        <BackButton href="/" label="Return to Hub" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6 relative z-10"
      >
        <div className="glass-card p-10 rounded-3xl border border-white/10 shadow-2xl bg-[#050505]/50 backdrop-blur-xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Welcome Back</h1>
            <p className="text-slate-500 text-sm">Enter your credentials to access the vault.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-500">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="text-xs font-medium leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                Email Address
              </label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-white/30 focus:bg-white/5 outline-none transition-all placeholder:text-slate-700"
                placeholder="name@university.edu"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pr-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                  Password
                </label>
                <Link href="#" className="text-[9px] font-bold text-slate-500 hover:text-white transition-colors">
                  Reset
                </Link>
              </div>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-white/30 focus:bg-white/5 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Authorize Access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-center text-slate-500 text-xs mt-6">
              Don't have an account?{" "}
              <Link href="/signup" className="text-white font-bold hover:underline">
                Create Identity
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
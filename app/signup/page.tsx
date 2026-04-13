"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import BackButton from "@/components/BackButton";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    college: "",
    email: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // --- SECURITY PROTOCOL: EMAIL DOMAIN VALIDATION ---
    const emailLower = formData.email.toLowerCase();
    const isCollegeEmail = emailLower.endsWith('.edu') || 
                           emailLower.endsWith('.ac.in') || 
                           emailLower.endsWith('.edu.in');

    if (!isCollegeEmail) {
      setError("Access Denied: You must use a valid university email (.edu, .ac.in, or .edu.in) to access the vault.");
      setIsLoading(false);
      return;
    }
    // --------------------------------------------------

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            college: formData.college,
          },
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Signup error:", err.message);
        setError(err.message || "Failed to initialize account. Please try again.");
      } else {
        setError("An unexpected error occurred during signup.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen pt-32 pb-12 flex items-center justify-center bg-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md p-10 glass-card rounded-3xl border border-white/10 bg-[#050505]/50 backdrop-blur-xl"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <CheckCircle2 className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Identity Created</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Welcome to OfferVault. Please check your university email to verify your account and access the registry.
          </p>
          <Link 
            href="/login" 
            className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-200 transition-all flex items-center justify-center"
          >
            Proceed to Login
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center relative bg-black">
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
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Create Identity</h1>
            <p className="text-slate-500 text-sm">Join the peer-to-peer data network.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-500">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="text-xs font-medium leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">Full Name (Private)</label>
              <input 
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-white/5 outline-none transition-all placeholder:text-slate-700"
                placeholder="e.g. Ayush Kumar"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">Institution</label>
              <input 
                type="text"
                name="college"
                required
                value={formData.college}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-white/5 outline-none transition-all placeholder:text-slate-700"
                placeholder="e.g. VIT Vellore"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">University Email</label>
              <input 
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-white/5 outline-none transition-all placeholder:text-slate-700"
                placeholder="name@university.edu"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">Password</label>
              <input 
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-white/5 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Initialize Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-center text-slate-500 text-xs mt-6">
              Already have access?{" "}
              <Link href="/login" className="text-white font-bold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
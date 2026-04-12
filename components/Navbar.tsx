"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Database } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const linkClass = (path: string) =>
    `text-xs font-bold uppercase tracking-widest hover:text-white transition-colors ${
      pathname === path ? "text-white" : "text-slate-400"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white rounded flex items-center justify-center">
            <Database className="text-black w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Offer<span className="text-slate-400">Vault</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link href="/search" className={linkClass("/search")}>Explore</Link>
          <Link href="/leaderboard" className={linkClass("/leaderboard")}>Leaderboard</Link>
          {user ? (
            <>
              <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
              <button
                onClick={handleSignOut}
                className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className={linkClass("/login")}>Log in</Link>
          )}
          <Link
            href="/submit"
            className="px-6 py-2.5 bg-white hover:bg-slate-200 text-black text-xs font-black uppercase tracking-widest rounded transition-all"
          >
            Submit Data
          </Link>
        </div>
      </div>
    </nav>
  );
}
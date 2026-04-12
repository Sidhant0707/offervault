import BackButton from "@/components/BackButton";
import { ShieldCheck, Lock, Database } from "lucide-react";

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <BackButton href="/" label="Back to Vault" />
        
        <h1 className="text-4xl font-bold text-white mb-12 mt-8 italic tracking-tighter">Security Protocols</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 glass-card border border-white/10 rounded-2xl bg-white/5">
            <ShieldCheck className="w-5 h-5 text-white mb-4" />
            <h3 className="text-white text-xs font-bold mb-2">Verified Only</h3>
            <p className="text-slate-500 text-[11px] leading-relaxed">Mandatory .edu and .ac.in email verification for all contributors.</p>
          </div>
          <div className="p-6 glass-card border border-white/10 rounded-2xl bg-white/5">
            <Lock className="w-5 h-5 text-white mb-4" />
            <h3 className="text-white text-xs font-bold mb-2">Encrypted</h3>
            <p className="text-slate-500 text-[11px] leading-relaxed">Data is encrypted at rest using industry-standard AES-256 protocols via Supabase.</p>
          </div>
          <div className="p-6 glass-card border border-white/10 rounded-2xl bg-white/5">
            <Database className="w-5 h-5 text-white mb-4" />
            <h3 className="text-white text-xs font-bold mb-2">Isolated</h3>
            <p className="text-slate-500 text-[11px] leading-relaxed">Row-level security (RLS) ensures users only access what they are authorized to see.</p>
          </div>
        </div>

        <section className="border-l border-white/10 pl-8 ml-2">
          <h2 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">Infrastructure</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Our database is hosted on a distributed PostgreSQL network. We utilize secure edge functions to process data, minimizing latency while maximizing protection against DDoS and injection attacks.
          </p>
          <div className="text-[10px] font-mono text-slate-600">
            SYSTEM_STATUS: SECURE // TLS_ENCRYPTION: ACTIVE // FIREWALL: OPERATIONAL
          </div>
        </section>
      </div>
    </main>
  );
}
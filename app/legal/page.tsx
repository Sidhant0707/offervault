import BackButton from "@/components/BackButton";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <BackButton href="/" label="Back to Vault" />
        
        <h1 className="text-4xl font-bold text-white mb-12 mt-8 italic tracking-tighter">Legal Protocols</h1>
        
        <div className="space-y-16">
          <section id="privacy">
            <h2 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">01. Privacy Policy</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              OfferVault is built on the principle of absolute anonymity. We do not store real names alongside salary data. Institutional emails are used solely for verification and are hashed to prevent tracking.
            </p>
          </section>

          <section id="terms">
            <h2 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">02. Terms of Service</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              By accessing the Vault, you agree to provide truthful, non-hallucinated data. Users found submitting intentionally false CTC data will have their institutional access revoked permanently.
            </p>
          </section>

          <section id="security">
            <h2 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">03. Security Architecture</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              All data is stored in encrypted PostgreSQL instances via Supabase. We utilize Row Level Security (RLS) to ensure that users can only manage their own submissions.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
import BackButton from "@/components/BackButton";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <BackButton href="/" label="Back to Vault" />
        
        <h1 className="text-4xl font-bold text-white mb-12 mt-8 italic tracking-tighter">Terms of Service</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">01. Acceptance of Terms</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              By accessing the OfferVault peer-to-peer network, you agree to abide by the protocols established for data integrity. This platform is for informational purposes for the Indian engineering community.
            </p>
          </section>

          <section>
            <h2 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">02. Data Accuracy</h2>
            <p className="text-slate-400 text-sm leading-relaxed font-mono bg-white/5 p-4 rounded-xl border border-white/10">
              FATAL ERROR PREVENTION: Users are strictly prohibited from submitting "hallucinated" or intentionally misleading salary data. Integrity is the core value of the Vault.
            </p>
          </section>

          <section>
            <h2 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">03. Usage Limits</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automated scraping or bulk extraction of data from this platform without explicit authorization is prohibited. Access is granted to verified students only.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
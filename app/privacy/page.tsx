import BackButton from "@/components/BackButton";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <BackButton href="/" label="Back to Vault" />
        <h1 className="text-4xl font-bold text-white mb-8 mt-8 italic tracking-tighter">Privacy Protocol</h1>
        <div className="prose prose-invert">
          <p className="text-slate-400 leading-relaxed">
            Your identity is encrypted at the source. OfferVault does not store 
            identifiable metadata alongside salary submissions. We use institutional 
            emails for verification only.
          </p>
          {/* Add more paragraphs as needed */}
        </div>
      </div>
    </main>
  );
}
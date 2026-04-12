"use client";

import React, { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { PieChart, Briefcase, ShieldCheck, Bookmark, Share2, Loader2, AlertCircle } from "lucide-react";
import DataRecordCard from "@/components/DataRecordCard";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { supabase } from "@/lib/supabase"; // Import Supabase client

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// We will keep your static similar offers for the bottom section
// until we build a complex recommendation query in the database
const STATIC_SIMILAR = [
  { college: "BITS Pilani", branch: "Computer Science", year: "2024", company: "NVIDIA", ctc: "44.0", status: "Verified", category: "High Tier", isPending: false },
  { college: "IIT Delhi", branch: "Computer Science", year: "2024", company: "Zomato", ctc: "42.0", status: "Verified", category: "Product Tier", isPending: false },
  { college: "DTU", branch: "Computer Science", year: "2024", company: "Adobe", ctc: "18.0", status: "Verified", category: "Recent", isPending: false },
];

export default function OfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [saved, setSaved] = useState(false);
  
  // State for our database data
  const [offer, setOffer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the data from Supabase when the page loads
  useEffect(() => {
    async function fetchOffer() {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from("offers")
          .select("*")
          .eq("id", id)
          .single(); // Get exactly one row

        if (error) throw error;
        setOffer(data);
      } catch (err: any) {
        console.error("Error fetching offer:", err);
        setError("Could not find this record. It may have been removed.");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchOffer();
    }
  }, [id]);

  // Show a loading spinner while fetching
  if (isLoading) {
    return (
      <main className="min-h-screen pt-44 pb-24 bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Decrypting Record...</span>
        </div>
      </main>
    );
  }

  // Show error if the ID doesn't exist
  if (error || !offer) {
    return (
      <main className="min-h-screen pt-44 pb-24 bg-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <BackButton label="Back to Database" />
          <div className="mt-20 p-12 border border-white/10 rounded-3xl bg-[#050505]">
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Record Not Found</h1>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  // Fallback values for UI elements that might not be in the database yet
  const displayRole = offer.title || "Software Engineer";
  const displayCompany = offer.company || "Unknown Company";
  const displayCollege = offer.college || "Unknown College";
  const displayYear = offer.year || "2024";
  const displayBase = offer.base ? `₹${offer.base},00,000` : "--";
  const displayBonus = offer.bonus ? `₹${offer.bonus},00,000` : "--";
  const displayEquity = offer.stocks ? `₹${offer.stocks},00,000` : "--";
  const displayStatus = offer.status || (offer.is_verified ? "Verified" : "Pending Audit");

  return (
    <main className="pt-44 pb-24 relative bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-10">
          <span>Explore</span>
          <span className="text-slate-700">/</span>
          <span>{displayCollege}</span>
          <span className="text-slate-700">/</span>
          <span className="text-slate-300">{displayCompany}</span>
        </div>

        {/* Title Area */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 border-b border-white/5 pb-12"
        >
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded ${displayStatus === "Verified" ? "bg-white/10 text-white border border-white/20" : "bg-slate-800 text-slate-300"}`}>
                {displayStatus}
              </span>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                Ref ID: OV-{id.substring(0, 6)}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-2">
              ₹{offer.ctc || "0"} LPA{" "}
              <span className="text-slate-500">at</span> {displayCompany}
            </h1>
            <p className="text-lg text-slate-400 font-medium">
              {displayRole} &bull; {displayCollege} &bull; Class of {displayYear}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-4">
            <button
              type="button"
              onClick={() => setSaved(!saved)}
              className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Bookmark className={`w-5 h-5 ${saved ? "fill-white" : ""}`} />
              <span className="text-xs font-bold uppercase tracking-widest">
                {saved ? "Saved" : "Save"}
              </span>
            </button>
            <button
              type="button"
              className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Share</span>
            </button>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">

          {/* Main Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-8 space-y-12"
          >
            {/* Package Breakdown */}
            <section className="bg-[#050505]/50 border border-white/10 backdrop-blur-md p-10 rounded-2xl">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-white">
                <PieChart className="w-5 h-5 text-slate-400" />
                Package Breakdown
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Base Salary", sub: "Fixed monthly component", value: displayBase },
                  { label: "Performance Bonus", sub: "Targeted annual incentive", value: displayBonus },
                  { label: "Equity (RSUs)", sub: "Vested over 4 years", value: displayEquity },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    className={`flex justify-between items-center py-4 ${i < 2 ? "border-b border-white/5" : ""}`}
                  >
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-widest">{item.label}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white">{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Job Metadata */}
            <section className="bg-[#050505]/50 border border-white/10 backdrop-blur-md p-10 rounded-2xl">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5 text-slate-400" />
                Job Metadata
              </h3>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {[
                  { label: "Job Function", value: displayRole },
                  { label: "Location", value: "India" }, // Defaulting since location isn't in submit form
                  { label: "Offer Source", value: offer.offerType === "ppo" ? "PPO" : "Campus Recruitment" },
                  { label: "Timeline", value: `Batch of ${displayYear}` },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Verification */}
            <section className="bg-[#050505]/50 border border-white/10 backdrop-blur-md p-10 rounded-2xl border-l-4 border-l-white">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Verification Proof</h3>
                  <p className="text-sm text-slate-500">Validated using university email protocol.</p>
                </div>
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div className="aspect-video bg-black rounded-xl border border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Redacted Preview</p>
                  <p className="text-xs text-slate-700 mt-2">Document available after login</p>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#050505] border border-white/10 p-8 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded flex items-center justify-center shrink-0 font-black text-black text-lg">
                  {displayCompany[0]}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">{displayCompany}</h4>
                  <p className="text-xs text-slate-500">Recruiter</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Offer Type</span>
                  <span className="text-white font-bold">{offer.offerType || "Standard"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Vault Rating</span>
                  <span className="text-white font-bold">4.8 / 5.0</span>
                </div>
              </div>
            </motion.div>

            {/* Contributor Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#050505] border border-white/10 p-8 rounded-2xl"
            >
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Contributor Profile</h4>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-white/5 font-black text-slate-400">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Anonymized #{id.substring(id.length - 4)}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Verified Student Contributor</p>
                </div>
              </div>
              <ul className="space-y-3">
                {["1 Contribution", "Verified Member"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Context Analysis (Static for now to preserve UI) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 bg-white/5 border border-white/5 rounded-2xl"
            >
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Contextual Analysis</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                This package represents a competitive offer for the {displayYear} batch at {displayCollege}.
              </p>
              <div className="h-2 bg-black rounded-full overflow-hidden flex">
                <div className="h-full bg-slate-600" style={{ width: "65%" }} />
                <div className="h-full bg-white" style={{ width: "20%" }} />
                <div className="h-full bg-slate-800" style={{ width: "15%" }} />
              </div>
            </motion.div>
          </aside>
        </div>

        {/* Similar Offers (Using static data to keep your layout working) */}
        <div className="mt-32 pt-20 border-t border-white/10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Similar Verified Offers</h2>
              <p className="text-sm text-slate-500">Contextual placement data from similar institutions.</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {STATIC_SIMILAR.map((record, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <DataRecordCard {...record} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </main>
  );
}
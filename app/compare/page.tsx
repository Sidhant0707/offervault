"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swords, TrendingUp, ShieldCheck, Users, Trophy, Loader2, Scale } from "lucide-react";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// Static Metadata (Immutable facts not stored in the offers table)
const INSTITUTION_META: Record<string, any> = {
  "VIT Vellore": { nirf: "#19", type: "Private", location: "Tamil Nadu" },
  "BITS Pilani": { nirf: "#27", type: "Private", location: "Rajasthan" },
  "NIT Trichy": { nirf: "#9", type: "Public (NIT)", location: "Tamil Nadu" },
  "IIT Bombay": { nirf: "#3", type: "Public (IIT)", location: "Maharashtra" },
  "IIT Delhi": { nirf: "#2", type: "Public (IIT)", location: "New Delhi" },
  "DTU Delhi": { nirf: "#29", type: "Public", location: "New Delhi" },
  "IIIT Hyderabad": { nirf: "#55", type: "Public-Private", location: "Telangana" },
};

const AVAILABLE_COLLEGES = Object.keys(INSTITUTION_META);

export default function ComparePage() {
  const [collegeA, setCollegeA] = useState(AVAILABLE_COLLEGES[0]); // VIT Vellore
  const [collegeB, setCollegeB] = useState(AVAILABLE_COLLEGES[1]); // BITS Pilani

  const [isLoading, setIsLoading] = useState(true);
  const [metricsA, setMetricsA] = useState<any>(null);
  const [metricsB, setMetricsB] = useState<any>(null);

  // Aggregation Engine
  const calculateMetrics = (data: any[]) => {
    if (!data || data.length === 0) return { avgCtc: 0, highestCtc: 0, totalOffers: 0, trustScore: 0 };
    
    let totalCTC = 0;
    let highest = 0;
    let verifiedCount = 0;

    data.forEach((offer) => {
      const ctc = parseFloat(offer.ctc || "0");
      totalCTC += ctc;
      if (ctc > highest) highest = ctc;
      if (offer.status === "Verified" || offer.is_verified) verifiedCount++;
    });

    return {
      avgCtc: (totalCTC / data.length).toFixed(1),
      highestCtc: highest.toFixed(1),
      totalOffers: data.length,
      trustScore: Math.round((verifiedCount / data.length) * 100),
    };
  };

  // Fetch from Supabase whenever selections change
  useEffect(() => {
    async function fetchComparisonData() {
      setIsLoading(true);
      try {
        const [resA, resB] = await Promise.all([
          supabase.from("offers").select("*").ilike("college", `%${collegeA}%`),
          supabase.from("offers").select("*").ilike("college", `%${collegeB}%`)
        ]);

        setMetricsA(calculateMetrics(resA.data || []));
        setMetricsB(calculateMetrics(resB.data || []));
      } catch (err) {
        console.error("Error fetching comparison:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComparisonData();
  }, [collegeA, collegeB]);

  // Helper to determine the "Winner" styling
  const getWinnerClass = (valA: number, valB: number, isA: boolean) => {
    if (valA === valB) return "text-white";
    if (isA) return valA > valB ? "text-white font-extrabold" : "text-slate-500";
    return valB > valA ? "text-white font-extrabold" : "text-slate-500";
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <BackButton label="Return to Hub" />

        {/* Header & Controls */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-16">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10">
              <Scale className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Institutional Benchmarking</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-12">
            Head-to-Head <span className="text-slate-500">Analysis.</span>
          </motion.h1>

          {/* Selection Interface */}
          <motion.div variants={fadeUp} className="p-4 bg-[#050505]/50 border border-white/10 backdrop-blur-md rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Side A</span>
              <select 
                value={collegeA} 
                onChange={(e) => setCollegeA(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-20 pr-4 text-sm text-white font-bold appearance-none outline-none focus:border-white/30 cursor-pointer"
              >
                {AVAILABLE_COLLEGES.map(c => <option key={c} value={c} disabled={c === collegeB}>{c}</option>)}
              </select>
            </div>
            
            <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 z-10">
              <Swords className="w-4 h-4 text-white" />
            </div>

            <div className="w-full relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Side B</span>
              <select 
                value={collegeB} 
                onChange={(e) => setCollegeB(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-20 pr-4 text-sm text-white font-bold appearance-none outline-none focus:border-white/30 cursor-pointer"
              >
                {AVAILABLE_COLLEGES.map(c => <option key={c} value={c} disabled={c === collegeA}>{c}</option>)}
              </select>
            </div>
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4 border border-white/5 rounded-3xl bg-[#050505]">
            <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Processing Matrix...</span>
          </div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
            
            {/* Hero Stats Comparison */}
            <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* College A Hero */}
              <motion.div variants={fadeUp} className="p-12 bg-black flex flex-col items-center text-center">
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-full mb-6">
                  {INSTITUTION_META[collegeA]?.type || "Institution"}
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">{collegeA}</h2>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-10">{INSTITUTION_META[collegeA]?.location || "India"}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2">Average CTC</p>
                <div className={`text-6xl tracking-tighter ${getWinnerClass(Number(metricsA?.avgCtc), Number(metricsB?.avgCtc), true)}`}>
                  ₹{metricsA?.avgCtc} <span className="text-2xl text-slate-600">LPA</span>
                </div>
              </motion.div>

              {/* College B Hero */}
              <motion.div variants={fadeUp} className="p-12 bg-[#050505] flex flex-col items-center text-center">
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-full mb-6">
                  {INSTITUTION_META[collegeB]?.type || "Institution"}
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">{collegeB}</h2>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-10">{INSTITUTION_META[collegeB]?.location || "India"}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2">Average CTC</p>
                <div className={`text-6xl tracking-tighter ${getWinnerClass(Number(metricsA?.avgCtc), Number(metricsB?.avgCtc), false)}`}>
                  ₹{metricsB?.avgCtc} <span className="text-2xl text-slate-600">LPA</span>
                </div>
              </motion.div>
            </div>

            {/* Detailed Data Matrix */}
            <motion.div variants={fadeUp} className="bg-[#050505]/50 border border-white/10 backdrop-blur-md rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="p-6 w-1/3 text-left pl-10 text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">Metric</th>
                      <th className="p-6 w-1/3 text-[10px] font-bold uppercase tracking-widest text-slate-400">{collegeA}</th>
                      <th className="p-6 w-1/3 text-[10px] font-bold uppercase tracking-widest text-slate-400">{collegeB}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    
                    {/* Highest CTC Row */}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-6 pl-10 text-left">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold text-white uppercase tracking-widest">Highest Package</span>
                        </div>
                      </td>
                      <td className={`p-6 text-xl tracking-tight ${getWinnerClass(Number(metricsA?.highestCtc), Number(metricsB?.highestCtc), true)}`}>
                        ₹{metricsA?.highestCtc} <span className="text-[10px] uppercase text-slate-600 ml-1">LPA</span>
                      </td>
                      <td className={`p-6 text-xl tracking-tight ${getWinnerClass(Number(metricsA?.highestCtc), Number(metricsB?.highestCtc), false)}`}>
                        ₹{metricsB?.highestCtc} <span className="text-[10px] uppercase text-slate-600 ml-1">LPA</span>
                      </td>
                    </tr>

                    {/* Total Verified Offers Row */}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-6 pl-10 text-left">
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold text-white uppercase tracking-widest">Verified Records</span>
                        </div>
                      </td>
                      <td className={`p-6 text-lg font-bold ${getWinnerClass(metricsA?.totalOffers, metricsB?.totalOffers, true)}`}>
                        {metricsA?.totalOffers}
                      </td>
                      <td className={`p-6 text-lg font-bold ${getWinnerClass(metricsA?.totalOffers, metricsB?.totalOffers, false)}`}>
                        {metricsB?.totalOffers}
                      </td>
                    </tr>

                    {/* Trust Score Row */}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-6 pl-10 text-left">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold text-white uppercase tracking-widest">Data Trust Score</span>
                        </div>
                      </td>
                      <td className={`p-6 text-lg font-bold ${getWinnerClass(metricsA?.trustScore, metricsB?.trustScore, true)}`}>
                        {metricsA?.trustScore}%
                      </td>
                      <td className={`p-6 text-lg font-bold ${getWinnerClass(metricsA?.trustScore, metricsB?.trustScore, false)}`}>
                        {metricsB?.trustScore}%
                      </td>
                    </tr>

                    {/* NIRF Rank Row (Lower is better) */}
                    <tr className="hover:bg-white/[0.02] transition-colors bg-black/20">
                      <td className="p-6 pl-10 text-left">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold text-white uppercase tracking-widest">NIRF Ranking</span>
                        </div>
                      </td>
                      <td className={`p-6 text-sm font-bold ${getWinnerClass(
                        parseInt(INSTITUTION_META[collegeB]?.nirf.replace('#','')), 
                        parseInt(INSTITUTION_META[collegeA]?.nirf.replace('#','')), 
                        true
                      )}`}>
                        {INSTITUTION_META[collegeA]?.nirf || "N/A"}
                      </td>
                      <td className={`p-6 text-sm font-bold ${getWinnerClass(
                        parseInt(INSTITUTION_META[collegeA]?.nirf.replace('#','')), 
                        parseInt(INSTITUTION_META[collegeB]?.nirf.replace('#','')), 
                        true
                      )}`}>
                        {INSTITUTION_META[collegeB]?.nirf || "N/A"}
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </motion.div>

          </motion.div>
        )}
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </main>
  );
}
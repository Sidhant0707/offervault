"use client";

import React, { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { GraduationCap, CheckCircle, Shield, Loader2, AlertCircle } from "lucide-react";
import DataRecordCard from "@/components/DataRecordCard";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { supabase } from "@/lib/supabase"; // Supabase client

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// We keep your static data for metadata that isn't in the 'offers' table yet
const COLLEGE_DATA: Record<string, any> = {
  "vit-vellore": {
    name: "VIT Vellore",
    location: "Vellore, Tamil Nadu",
    tier: "Tier 2 Institution",
    nirf: "#19 (Engineering)",
    founded: "1984",
    recruiters: [
      { name: "Google", icon: "G", offers: "42 Offers" },
      { name: "Amazon", icon: "A", offers: "38 Offers" },
      { name: "Microsoft", icon: "M", offers: "25 Offers" },
      { name: "TCS", icon: "T", offers: "156 Offers" },
    ],
    progression: [
      { year: "2021", value: 45, label: "8.2" },
      { year: "2022", value: 60, label: "9.4" },
      { year: "2023", value: 80, label: "10.8" },
      { year: "2024", value: 100, label: "11.2" },
    ],
  },
  "nit-trichy": {
    name: "NIT Trichy",
    location: "Trichy, Tamil Nadu",
    tier: "Tier 1 Institution",
    nirf: "#9 (Engineering)",
    founded: "1964",
    recruiters: [
      { name: "Google", icon: "G", offers: "42 Offers" },
      { name: "Amazon", icon: "A", offers: "38 Offers" },
      { name: "Microsoft", icon: "M", offers: "25 Offers" },
      { name: "TCS", icon: "T", offers: "156 Offers" },
    ],
    progression: [
      { year: "2021", value: 60, label: "12.4" },
      { year: "2022", value: 75, label: "14.2" },
      { year: "2023", value: 88, label: "15.8" },
      { year: "2024", value: 100, label: "16.8" },
    ],
  },
  "bits-pilani": {
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    tier: "Tier 1 Institution",
    nirf: "#27 (Engineering)",
    founded: "1964",
    recruiters: [
      { name: "NVIDIA", icon: "N", offers: "38 Offers" },
      { name: "Google", icon: "G", offers: "30 Offers" },
      { name: "Microsoft", icon: "M", offers: "28 Offers" },
      { name: "Flipkart", icon: "F", offers: "22 Offers" },
    ],
    progression: [
      { year: "2021", value: 55, label: "16.2" },
      { year: "2022", value: 70, label: "18.0" },
      { year: "2023", value: 85, label: "20.1" },
      { year: "2024", value: 100, label: "21.5" },
    ],
  },
};

const DEFAULT_COLLEGE = {
  name: "Institution",
  location: "India",
  tier: "Unknown",
  nirf: "—",
  founded: "—",
  recruiters: [],
  progression: [],
};

export default function CollegePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const staticData = COLLEGE_DATA[slug] || { ...DEFAULT_COLLEGE, name: slug.replace(/-/g, " ").toUpperCase() };
  
  const [branchFilter, setBranchFilter] = useState("All Branches");
  const [yearFilter, setYearFilter] = useState("Class of 2024");
  
  // Dynamic Supabase State
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    avgCtc: "0.0",
    medianCtc: "0.0",
    highestCtc: "0.0",
    verifiedCount: "0",
    trustScore: "0",
  });

  useEffect(() => {
    async function fetchCollegeData() {
      setIsLoading(true);
      const searchTerm = slug.replace(/-/g, " "); // 'nit-trichy' -> 'nit trichy'
      
      try {
        const { data, error } = await supabase
          .from("offers")
          .select("*")
          .ilike("college", `%${searchTerm}%`)
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          // Calculate Real Metrics
          let totalCTC = 0;
          let highest = 0;
          let verifiedCount = 0;
          let ctcArray: number[] = [];

          data.forEach((offer) => {
            const ctc = parseFloat(offer.ctc || "0");
            totalCTC += ctc;
            ctcArray.push(ctc);
            if (ctc > highest) highest = ctc;
            if (offer.status === "Verified" || offer.is_verified) verifiedCount++;
          });

          // Calculate Median
          ctcArray.sort((a, b) => a - b);
          const mid = Math.floor(ctcArray.length / 2);
          const median = ctcArray.length % 2 !== 0 ? ctcArray[mid] : (ctcArray[mid - 1] + ctcArray[mid]) / 2;

          setMetrics({
            avgCtc: (totalCTC / data.length).toFixed(1),
            medianCtc: median.toFixed(1),
            highestCtc: highest.toFixed(1),
            verifiedCount: verifiedCount.toString(),
            trustScore: Math.round((verifiedCount / data.length) * 100).toString(),
          });
          setRecords(data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCollegeData();
  }, [slug]);

  return (
    <main className="flex-1 pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <BackButton label="Back to Database" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT SIDEBAR (Static + Filters) */}
          <aside className="w-full lg:w-[280px] shrink-0 space-y-8">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="glass-card p-6 rounded-2xl bg-[#050505]/50 border border-white/10">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl mb-6 flex items-center justify-center">
                  <GraduationCap className="text-white w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold mb-1 text-white">{staticData.name}</h1>
                <p className="text-sm text-slate-500 mb-4">{staticData.location}</p>
                <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded">
                  {staticData.tier}
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-3 mt-6">
                {[
                  { label: "NIRF Rank", value: staticData.nirf },
                  { label: "Founded", value: staticData.founded },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                    <span className="text-sm font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1 space-y-12">
            
            {/* Dynamic Hero Stats */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { label: "Average CTC", value: metrics.avgCtc, border: "border-l-white" },
                { label: "Median CTC", value: metrics.medianCtc, border: "border-l-slate-700" },
                { label: "Highest CTC", value: metrics.highestCtc, border: "border-l-white/20" },
              ].map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className={`p-8 bg-[#050505]/50 border border-white/10 backdrop-blur-md rounded-2xl border-l-4 ${stat.border}`}>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{stat.label}</p>
                  <h2 className="text-4xl font-bold tracking-tighter text-white">
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin mt-2" /> : `₹${stat.value}`}
                    {!isLoading && <span className="text-slate-500 text-lg ml-1">LPA</span>}
                  </h2>
                </motion.div>
              ))}
            </motion.section>

            {/* Trust Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between px-8 py-5 bg-white/5 border border-white/10 rounded-xl"
            >
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">{metrics.verifiedCount} Verified Offers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">{metrics.trustScore}% Trust Score</span>
                </div>
              </div>
            </motion.div>

            {/* Static Content: Top Recruiters */}
            {staticData.recruiters.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <motion.h3 variants={fadeUp} className="text-lg font-bold mb-6 tracking-tight text-white">Primary Recruiters</motion.h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {staticData.recruiters.map((r: any) => (
                    <motion.div key={r.name} variants={fadeUp} className="p-6 bg-[#050505] border border-white/10 rounded-xl text-center hover:bg-white/5 transition-colors">
                      <div className="w-10 h-10 bg-white/5 rounded-lg mx-auto mb-4 flex items-center justify-center font-black text-lg text-white">
                        {r.icon}
                      </div>
                      <p className="font-bold text-white">{r.name}</p>
                      <p className="text-[9px] text-slate-500 font-black uppercase mt-1">{r.offers}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Static Content: Salary Progression */}
            {staticData.progression.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-8 bg-[#050505]/50 border border-white/10 backdrop-blur-md rounded-2xl"
              >
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">Salary Progression</h3>
                    <p className="text-xs text-slate-500">Historical average CTC trends</p>
                  </div>
                </div>
                <div className="h-48 flex items-end gap-12 px-6">
                  {staticData.progression.map((bar: any) => (
                    <div key={bar.year} className="flex-1 flex flex-col items-center gap-3">
                      <div
                        className="w-full bg-white/10 hover:bg-white/20 rounded-t-sm relative group transition-colors"
                        style={{ height: `${bar.value}%` }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {bar.label} LPA
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-slate-600">{bar.year}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Dynamic Registry Feed */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex justify-between items-end mb-8">
                <h3 className="text-xl font-bold tracking-tight text-white">Live Registry Feed</h3>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {isLoading ? (
                   <div className="col-span-2 py-12 flex justify-center text-slate-500"><Loader2 className="w-6 h-6 animate-spin" /></div>
                ) : records.length > 0 ? (
                  records.map((record, i) => (
                    <motion.div key={i} variants={fadeUp}>
                      <DataRecordCard 
                        college={record.college}
                        branch={record.branch || "General"}
                        year={record.year || "2024"}
                        company={record.company || "Unknown"}
                        ctc={record.ctc?.toString() || "0"}
                        status={record.status || (record.is_verified ? "Verified" : "Pending Audit")}
                        category={record.offerType || "Standard"}
                        isPending={record.status !== "Verified" && !record.is_verified}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 py-16 border border-white/5 rounded-xl bg-[#050505] text-center">
                    <p className="text-sm font-bold text-white mb-2">No data yet.</p>
                    <p className="text-xs text-slate-500">Be the first to submit a record for {staticData.name}.</p>
                  </div>
                )}
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </main>
  );
}
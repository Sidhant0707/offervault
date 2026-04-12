"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ArrowUpRight 
} from "lucide-react";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const INSTITUTIONS = [
  { rank: "01", name: "IIT Bombay", location: "Mumbai, MH", avg: "24.8", verified: "1,420", trust: 98, trend: "up" },
  { rank: "02", name: "BITS Pilani", location: "Pilani, RJ", avg: "21.5", verified: "1,085", trust: 96, trend: "up" },
  { rank: "03", name: "IIT Delhi", location: "Delhi, DL", avg: "20.9", verified: "1,150", trust: 95, trend: "down" },
  { rank: "04", name: "VIT Vellore", location: "Vellore, TN", avg: "11.2", verified: "5,240", trust: 91, trend: "flat" },
  { rank: "05", name: "DTU Delhi", location: "Delhi, DL", avg: "16.8", verified: "1,240", trust: 94, trend: "up" },
  { rank: "06", name: "NIT Trichy", location: "Trichy, TN", avg: "15.4", verified: "1,180", trust: 93, trend: "up" },
  { rank: "07", name: "IIIT Hyderabad", location: "Hyderabad, TS", avg: "18.2", verified: "890", trust: 92, trend: "up" },
  { rank: "08", name: "NIT Warangal", location: "Warangal, TS", avg: "12.8", verified: "920", trust: 90, trend: "flat" },
];

const COMPANIES = [
  { rank: "01", name: "Google India", location: "Bangalore, KA", avg: "38.5", verified: "420", trust: 99, trend: "up" },
  { rank: "02", name: "Microsoft", location: "Hyderabad, TS", avg: "32.0", verified: "580", trust: 98, trend: "up" },
  { rank: "03", name: "NVIDIA", location: "Pune, MH", avg: "44.0", verified: "210", trust: 97, trend: "up" },
  { rank: "04", name: "Amazon", location: "Bangalore, KA", avg: "28.5", verified: "1,240", trust: 96, trend: "down" },
  { rank: "05", name: "Zomato", location: "Gurugram, HR", avg: "24.0", verified: "380", trust: 94, trend: "up" },
  { rank: "06", name: "Adobe", location: "Noida, UP", avg: "22.5", verified: "290", trust: 95, trend: "flat" },
  { rank: "07", name: "Flipkart", location: "Bangalore, KA", avg: "26.0", verified: "440", trust: 93, trend: "up" },
  { rank: "08", name: "TCS", location: "Pan India", avg: "3.8", verified: "12,400", trust: 88, trend: "flat" },
];

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-white" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-slate-600" />;
  return <Minus className="w-4 h-4 text-slate-600" />;
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"institutions" | "companies">("institutions");
  const data = activeTab === "institutions" ? INSTITUTIONS : COMPANIES;

  return (
    <main className="pt-44 pb-24 relative px-6 md:px-12 lg:px-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Reusable Back Button Component */}
        <BackButton href="/" label="Return to Hub" />

        <motion.header
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-500 text-[10px] font-bold uppercase mb-8 tracking-[0.2em]">
            <Trophy className="w-3 h-3" />
            Market Benchmarks 2024
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-none text-white">
            The <span className="text-slate-500">Leaderboard.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            The definitive ranking of engineering institutions and recruiting companies based on peer-verified salary data.
          </motion.p>
        </motion.header>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-1 p-1 bg-[#0a0a0a] rounded-xl border border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab("institutions")}
              className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg transition-all ${
                activeTab === "institutions" ? "bg-white text-black shadow-xl scale-[1.02]" : "text-slate-500 hover:text-white"
              }`}
            >
              Institutions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("companies")}
              className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg transition-all ${
                activeTab === "companies" ? "bg-white text-black shadow-xl scale-[1.02]" : "text-slate-500 hover:text-white"
              }`}
            >
              Companies
            </button>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="hidden md:block overflow-hidden border border-white/10 rounded-2xl bg-[#050505]/50 backdrop-blur-md"
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.03] border-b border-white/10">
              <tr>
                {["Rank", "Name", "Avg CTC", "Verified", "Trust Score", "Trend"].map((h) => (
                  <th key={h} className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((row, i) => (
                <motion.tr
                  key={row.rank}
                  variants={fadeUp}
                  className="group transition-colors hover:bg-white/[0.02] cursor-pointer"
                >
                  <td className={`px-8 py-8 font-black text-xl tracking-tighter italic ${i === 0 ? "text-white" : "text-slate-700"}`}>
                    #{row.rank}
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-lg group-hover:text-white transition-colors">{row.name}</div>
                      <ArrowUpRight className="w-3 h-3 text-slate-700 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">{row.location}</div>
                  </td>
                  <td className="px-8 py-8">
                    <span className="font-bold text-white tracking-tight text-lg">₹{row.avg}</span>
                    <span className="text-[10px] text-slate-500 font-bold ml-1">LPA</span>
                  </td>
                  <td className="px-8 py-8">
                     <span className="text-xs font-bold text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                       {row.verified} offers
                     </span>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[10px] text-white tracking-widest">{row.trust}%</span>
                      <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${row.trust}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="bg-white h-full" 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <TrendIcon trend={row.trend} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid md:hidden gap-4"
        >
          {data.map((row, i) => (
            <motion.div
              key={row.rank}
              variants={fadeUp}
              className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`font-black text-3xl italic ${i === 0 ? "text-white" : "text-slate-700"}`}>#{row.rank}</div>
                <TrendIcon trend={row.trend} />
              </div>
              <h3 className="text-2xl font-bold mb-1">{row.name}</h3>
              <p className="text-[10px] text-slate-500 mb-8 font-black uppercase tracking-widest">{row.location}</p>
              
              <div className="grid grid-cols-2 gap-8 py-6 border-y border-white/5">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-2">Avg Package</div>
                  <div className="text-white text-xl font-bold tracking-tight">₹{row.avg} LPA</div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-2">Trust Score</div>
                  <div className="text-white text-xl font-bold tracking-tight">{row.trust}%</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Lock, 
  Search, 
  ArrowRight, 
  EyeOff, 
  Users, 
  FileCheck, 
  GraduationCap, 
  Shield 
} from "lucide-react";
import DataRecordCard from "@/components/DataRecordCard";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <main className="pt-40 pb-24 relative overflow-x-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full h-[70%] z-0"
        style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)" }}
      />

      <section className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div 
            variants={fadeUp} 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] font-bold uppercase mb-10 tracking-[0.2em]"
          >
            <Lock className="w-3 h-3" />
            Verified Peer-to-Peer Data Network
          </motion.div>

          <motion.h1 
            variants={fadeUp} 
            className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9] text-white"
          >
            Colleges lie about placement.<br />
            <span className="text-slate-500">We provide the truth.</span>
          </motion.h1>

          <motion.p 
            variants={fadeUp} 
            className="text-xl text-slate-400 max-w-xl mx-auto mb-14 leading-relaxed font-medium"
          >
            India&apos;s first crowdsourced database of verified placement offers.
            Professional. Anonymous. Community-driven.
          </motion.p>

          <motion.div variants={fadeUp} className="max-w-3xl mx-auto mb-24">
            <form
              onSubmit={handleSearch}
              className="relative flex items-center p-1.5 rounded-xl bg-[#0a0a0a] border border-white/10 focus-within:border-white/40 transition-all duration-300 shadow-2xl"
            >
              <div className="pl-5 text-slate-600">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search college, branch, or company..."
                className="w-full bg-transparent border-none outline-none py-4 px-5 text-lg text-white placeholder:text-slate-700 font-medium"
              />
              <button
                type="submit"
                className="hidden sm:block bg-white text-black px-8 py-4 rounded-lg transition-all duration-300 hover:bg-slate-200 active:scale-95 group"
              >
                <span className="flex items-center gap-3">
                  {/* Using Cabinet Grotesk with medium weight for a cleaner, modern look */}
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] font-[family-name:var(--font-cabinet)]">
                    Execute Search
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <span className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">Trending:</span>
              {["VIT Vellore", "BITS Pilani", "IIT Bombay"].map((name) => (
                <Link 
                  key={name} 
                  href={`/search?q=${encodeURIComponent(name)}`} 
                  className="text-[10px] text-slate-400 hover:text-white uppercase tracking-widest font-bold transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border-y border-white/10 py-16"
        >
          {[
            { value: "12.5k", label: "Submissions" },
            { value: "450+", label: "Institutions" },
            { value: "95%", label: "Accuracy" },
            { value: "100%", label: "Anonymity" },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="px-8 bg-black">
              <div className="text-4xl font-bold text-white mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="max-w-7xl mx-auto px-6 py-40"
      >
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <h2 className="text-4xl font-bold mb-6 tracking-tight leading-tight">
              Designed for absolute transparency.
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Every entry is cross-referenced with industry benchmarks and verified by peer clusters within the same cohort.
            </p>
            <Link href="/about" className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group text-white">
              Learn our methodology
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="lg:col-span-8 grid md:grid-cols-3 gap-8">
            {[
              { icon: <EyeOff className="w-5 h-5" />, title: "Blind Submission", desc: "Identity-stripped data entry ensuring privacy while maintaining accountability." },
              { icon: <Users className="w-5 h-5" />, title: "Peer Audit", desc: "Verification layers requiring confirmation from peers within the same cohort." },
              { icon: <FileCheck className="w-5 h-5" />, title: "Offer Validation", desc: "Optional document upload for Tier 1 status via local-first encryption." },
            ].map((card) => (
              <motion.div key={card.title} variants={fadeUp} className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-colors">
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center mb-8 rounded">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold mb-4">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="bg-[#050505] border-y border-white/5 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-4">Latest Verified Entries</h2>
                <p className="text-slate-500 text-sm">Real-time audited records from the last 24 hours.</p>
              </div>
              <Link href="/search" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                View Full Registry
              </Link>
            </motion.div>

            <motion.div variants={stagger} className="grid lg:grid-cols-3 gap-8">
              {[
                { college: "VIT Vellore", branch: "CSE", year: "2024", company: "Google", ctc: "32.5", status: "Verified", category: "Recent" },
                { college: "BITS Pilani", branch: "Electronics", year: "2024", company: "NVIDIA", ctc: "44.0", status: "Verified", category: "Verified" },
                { college: "SRM IST", branch: "IT", year: "2024", company: "TCS Ninja", ctc: "3.6", status: "Audit Pending", category: "Audit", isPending: true },
              ].map((card) => (
                <motion.div key={card.college} variants={fadeUp}>
                  <DataRecordCard {...card} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="max-w-7xl mx-auto px-6 py-40"
      >
        <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-16 bg-white text-black">
            <GraduationCap className="w-10 h-10 mb-8" />
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Find your market value.</h2>
            <p className="text-black/60 text-lg mb-12 font-medium">
              Access raw data across 450+ institutions and make informed career decisions.
            </p>
            <Link href="/search" className="inline-flex items-center justify-center px-10 py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded hover:scale-[1.02] active:scale-95 transition-all">
              Explore Database
            </Link>
          </div>
          <div className="p-16 bg-[#0a0a0a] text-white">
            <Shield className="w-10 h-10 mb-8 text-slate-400" />
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Help your peers.</h2>
            <p className="text-slate-500 text-lg mb-12 font-medium">
              Contribute your offer letter anonymously and build India&apos;s most trusted registry.
            </p>
            <Link href="/submit" className="inline-flex items-center justify-center px-10 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded hover:scale-[1.02] active:scale-95 transition-all">
              Submit Your Offer
            </Link>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </main>
  );
}
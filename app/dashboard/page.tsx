"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  ShieldCheck, 
  FileText, 
  Bookmark, 
  Settings, 
  LogOut, 
  AlertCircle,
  ChevronRight
} from "lucide-react";
import BackButton from "@/components/BackButton";
import DataRecordCard from "@/components/DataRecordCard";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// Mock Data for the Dashboard
const MOCK_USER = {
  name: "Ayush Kumar",
  email: "ayush.k@vit.edu",
  trustScore: 85,
  status: "Tier 2 Verified",
  joinDate: "Oct 2024"
};

const MY_SUBMISSIONS = [
  { college: "VIT Vellore", branch: "Computer Science", year: "2024", company: "Google India", ctc: "32.5", status: "Verified", category: "Full-Time", isPending: false },
  { college: "VIT Vellore", branch: "Computer Science", year: "2024", company: "Amazon", ctc: "28.0", status: "Audit Pending", category: "Internship", isPending: true },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"submissions" | "saved" | "settings">("submissions");

  return (
    <main className="min-h-screen pt-32 pb-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation */}
        <BackButton href="/" label="Return to Hub" />

        <div className="grid lg:grid-cols-12 gap-12 mt-8">
          
          {/* Left Sidebar: Identity & Navigation */}
          <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-32 h-fit">
            
            {/* Identity Card */}
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeUp}
              className="p-8 rounded-3xl bg-[#050505]/50 border border-white/10 backdrop-blur-md"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-1">{MOCK_USER.name}</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">{MOCK_USER.email}</p>
              
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Trust Score</span>
                    <span className="text-sm font-bold text-white">{MOCK_USER.trustScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${MOCK_USER.trustScore}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{MOCK_USER.status}</span>
                </div>
              </div>
            </motion.div>

            {/* Dashboard Navigation */}
            <motion.nav 
              initial="hidden" 
              animate="visible" 
              variants={fadeUp}
              className="space-y-2"
            >
              {[
                { id: "submissions", icon: FileText, label: "My Submissions" },
                { id: "saved", icon: Bookmark, label: "Saved Profiles" },
                { id: "settings", icon: Settings, label: "Account Settings" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                    activeTab === item.id 
                      ? "bg-white text-black" 
                      : "bg-transparent text-slate-500 hover:bg-[#0a0a0a] hover:text-white"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}

              <button className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-all mt-8">
                <LogOut className="w-4 h-4" />
                Terminate Session
              </button>
            </motion.nav>
          </aside>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Action Required Banner */}
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeUp}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4 text-slate-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Boost your Trust Score to 99%</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                    Upload a redacted offer letter for your Amazon internship to verify the entry. Verified data helps thousands of peers negotiate better.
                  </p>
                </div>
              </div>
              <button className="shrink-0 px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-200 transition-colors">
                Upload Document
              </button>
            </motion.div>

            {/* Dynamic Content based on Active Tab */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[500px]"
            >
              {activeTab === "submissions" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-white">My Submissions</h2>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{MY_SUBMISSIONS.length} Records</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {MY_SUBMISSIONS.map((record, i) => (
                      <DataRecordCard key={i} {...record} />
                    ))}
                    
                    {/* Add New Contribution Card */}
                    <a href="/submit" className="group p-8 rounded-2xl border-2 border-dashed border-white/10 hover:border-white/30 bg-[#050505] flex flex-col items-center justify-center text-center transition-colors min-h-[300px]">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                        <FileText className="w-5 h-5 text-slate-400 group-hover:text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2">Contribute Data</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Add another placement record</p>
                    </a>
                  </div>
                </div>
              )}

              {activeTab === "saved" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Saved Profiles</h2>
                  </div>
                  <div className="p-16 border border-white/5 rounded-2xl bg-[#050505] text-center">
                    <Bookmark className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-white font-bold mb-2">No profiles saved yet.</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Explore the leaderboard or database to bookmark institutions and track their placement trends over time.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Security & Protocol</h2>
                  </div>
                  <div className="p-8 border border-white/5 rounded-2xl bg-[#050505] space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Encryption Keys</h4>
                      <div className="p-4 bg-[#0a0a0a] border border-white/10 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white mb-1">Anonymity Protocol</p>
                          <p className="text-[10px] text-slate-500">Your identity is stripped from all public data.</p>
                        </div>
                        <div className="px-3 py-1 bg-white/10 text-white text-[9px] font-black uppercase tracking-widest rounded">Active</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Account Danger Zone</h4>
                      <button className="px-6 py-3 border border-red-500/20 text-red-500 hover:bg-red-500/10 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors">
                        Purge Account & Data
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
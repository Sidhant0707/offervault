"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import DataRecordCard from "@/components/DataRecordCard";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton"; // Included BackButton
import { supabase } from "@/lib/supabase";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// Static Data Array
const ALL_RECORDS = [
  { college: "VIT Vellore", branch: "Computer Science", year: "2024", company: "Google India", ctc: "32.5", status: "Verified", category: "Top Tier", isPending: false },
  { college: "IIT Bombay", branch: "Mechanical Eng", year: "2024", company: "Tata Motors", ctc: "18.2", status: "Verified", category: "On-Campus", isPending: false },
  { college: "BITS Pilani", branch: "Electronics", year: "2024", company: "NVIDIA", ctc: "44.0", status: "Verified", category: "High Growth", isPending: false },
  { college: "NIT Trichy", branch: "Production", year: "2024", company: "Schlumberger", ctc: "15.5", status: "Verified", category: "Premium", isPending: false },
  { college: "DTU Delhi", branch: "Mathematics & Computing", year: "2024", company: "Tower Research", ctc: "68.0", status: "Verified", category: "Quant", isPending: false },
  { college: "Thapar Institute", branch: "Computer Science", year: "2024", company: "Amazon", ctc: "24.0", status: "Pending Audit", category: "Audit Required", isPending: true },
  { college: "IIT Delhi", branch: "Computer Science", year: "2024", company: "Microsoft", ctc: "42.0", status: "Verified", category: "Top Tier", isPending: false },
  { college: "IIIT Hyderabad", branch: "Computer Science", year: "2024", company: "Oracle", ctc: "54.0", status: "Verified", category: "High Growth", isPending: false },
  { college: "NIT Warangal", branch: "Electronics", year: "2023", company: "Qualcomm", ctc: "28.0", status: "Verified", category: "Core Tech", isPending: false },
  { college: "SRM IST", branch: "Information Tech", year: "2024", company: "TCS Ninja", ctc: "3.6", status: "Pending Audit", category: "Mass Recruiter", isPending: true },
  { college: "VIT Vellore", branch: "Electronics", year: "2023", company: "Samsung R&D", ctc: "14.5", status: "Verified", category: "R&D", isPending: false },
  { college: "BITS Goa", branch: "Computer Science", year: "2024", company: "Flipkart", ctc: "36.0", status: "Verified", category: "Startup", isPending: false },
];

// Inner component that handles the search params logic
function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [collegeFilter, setCollegeFilter] = useState(initialQuery);
  const [records, setRecords] = useState<typeof ALL_RECORDS>([]);
  const [loading, setLoading] = useState(true);
  const [branchFilter, setBranchFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Highest Package");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("offers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setRecords(ALL_RECORDS);
      } else if (data && data.length > 0) {
        const mapped = data.map((r) => ({
          college: r.college,
          branch: r.branch,
          year: r.year,
          company: r.company,
          ctc: String(r.total_ctc),
          status: r.status,
          category: r.category,
          isPending: r.is_pending,
        }));
        setRecords(mapped);
      } else {
        setRecords(ALL_RECORDS);
      }
      setLoading(false);
    };

    fetchRecords();
  }, []);

  // Filter Logic
  const filtered = records
    .filter((r) => {
      if (collegeFilter && !r.college.toLowerCase().includes(collegeFilter.toLowerCase()) && !r.company.toLowerCase().includes(collegeFilter.toLowerCase()) && !r.branch.toLowerCase().includes(collegeFilter.toLowerCase())) return false;
      if (branchFilter && branchFilter !== "All Specializations" && r.branch !== branchFilter) return false;
      if (yearFilter && yearFilter !== "All Years" && r.year !== yearFilter) return false;
      if (verifiedOnly && r.isPending) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "Highest Package") return parseFloat(b.ctc) - parseFloat(a.ctc);
      if (sortBy === "Lowest Package") return parseFloat(a.ctc) - parseFloat(b.ctc);
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  // Active Filter Tags
  const activeTags = [
    collegeFilter && { label: `Search: ${collegeFilter}`, clear: () => setCollegeFilter("") },
    branchFilter && branchFilter !== "All Specializations" && { label: `Branch: ${branchFilter}`, clear: () => setBranchFilter("") },
    yearFilter && yearFilter !== "All Years" && { label: `Year: ${yearFilter}`, clear: () => setYearFilter("") },
    verifiedOnly && { label: "Verified Only", clear: () => setVerifiedOnly(false) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div className="max-w-7xl mx-auto px-6">
      
      {/* Top Back Navigation */}
      <BackButton label="Back to Hub" />

      <div className="flex flex-col lg:flex-row gap-12 items-start mt-4">
        
        {/* Sidebar Filters - Now enclosed in a Glassmorphism Card */}
        <aside className="w-full lg:w-72 space-y-8 lg:sticky lg:top-32 p-8 rounded-2xl bg-[#050505]/50 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-white">Registry Filters</h2>
            <button
              onClick={() => { setCollegeFilter(""); setBranchFilter(""); setYearFilter(""); setVerifiedOnly(false); }}
              className="text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 block">Institution / Firm</label>
            <input
              type="text"
              value={collegeFilter}
              onChange={(e) => { setCollegeFilter(e.target.value); setCurrentPage(1); }}
              placeholder="Search database..."
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:border-white/30 focus:bg-white/5 outline-none transition-all"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 block">Specialization</label>
            <select
              value={branchFilter}
              onChange={(e) => { setBranchFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-white/30 outline-none appearance-none cursor-pointer"
            >
              <option>All Specializations</option>
              <option>Computer Science</option>
              <option>Electronics</option>
              <option>Mechanical Eng</option>
              <option>Information Tech</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 block">Cohort Year</label>
            <select
              value={yearFilter}
              onChange={(e) => { setYearFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-white/30 outline-none appearance-none cursor-pointer"
            >
              <option>All Years</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${verifiedOnly ? "bg-white border-white" : "border-white/20 group-hover:border-white/40"}`}>
                {verifiedOnly && <X className="w-3 h-3 text-black" />} {/* Custom styled checkbox */}
              </div>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => { setVerifiedOnly(e.target.checked); setCurrentPage(1); }}
                className="hidden" // Hiding default to use our custom box
              />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Verified Only</span>
            </label>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 w-full space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-none">Database Query</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{filtered.length} verified records retrieved</p>
            </div>
            
            <div className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 px-4 py-2 rounded-lg">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-white border-none outline-none cursor-pointer"
              >
                <option>Highest Package</option>
                <option>Lowest Package</option>
                <option>Most Recent</option>
              </select>
            </div>
          </div>

          {/* Active Tags */}
          {activeTags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {activeTags.map((tag) => (
                <div key={tag.label} className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                  <span>{tag.label}</span>
                  <button onClick={tag.clear} className="hover:text-white hover:bg-white/10 rounded-full p-0.5 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Records Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid md:grid-cols-2 gap-6"
          >
            {paginated.length > 0 ? (
              paginated.map((record, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <DataRecordCard {...record} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 py-20 text-center border border-white/5 rounded-2xl bg-[#050505]">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">No matching records found.</p>
              </div>
            )}
          </motion.div>

          {/* Pagination Component */}
          {filtered.length > 0 && (
            <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                Displaying {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} results
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 border border-white/10 bg-[#0a0a0a] rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:border-white/30 transition-all disabled:opacity-30 disabled:hover:border-white/10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                      currentPage === page
                        ? "bg-white text-black"
                        : "bg-[#0a0a0a] border border-white/10 text-slate-500 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 border border-white/10 bg-[#0a0a0a] rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:border-white/30 transition-all disabled:opacity-30 disabled:hover:border-white/10"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Export wrapping the search logic in Suspense
export default function SearchPage() {
  return (
    <main className="flex-1 pt-32 pb-24 bg-black min-h-screen">
      <Suspense 
        fallback={
          <div className="w-full h-[50vh] flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Initializing Database Protocol...
          </div>
        }
      >
        <SearchContent />
      </Suspense>
      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
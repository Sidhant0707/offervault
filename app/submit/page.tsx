"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, UploadCloud, Check } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function SubmitPage() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    college: "",
    branch: "",
    company: "",
    year: "2024",
    base: "",
    bonus: "",
    stocks: "",
    title: "",
    offerType: "on-campus",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return alert("Please agree to the privacy protocol.");

    const totalCtc =
      (parseFloat(form.base) || 0) +
      (parseFloat(form.bonus) || 0) / 10 +
      (parseFloat(form.stocks) || 0) / 4;

    const { error } = await supabase.from("offers").insert({
      college: form.college,
      branch: form.branch,
      company: form.company,
      year: form.year,
      base_salary: parseFloat(form.base) || 0,
      joining_bonus: parseFloat(form.bonus) || 0,
      stocks: parseFloat(form.stocks) || 0,
      total_ctc: parseFloat(totalCtc.toFixed(1)),
      job_title: form.title,
      offer_type: form.offerType,
      status: "Pending Audit",
      is_pending: true,
      category: "Recent",
    });

    if (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter mb-4">Submission Received.</h1>
          <p className="text-slate-400 leading-relaxed mb-8">
            Your data has been encrypted and queued for peer verification. Thank you for contributing to placement transparency.
          </p>
          <Link href="/" className="inline-flex items-center px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded hover:bg-slate-200 transition-all">
            Back to Home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-44 pb-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-12"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-5 h-5 text-slate-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Secure End-to-End Submission</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
            Contribute to the Truth.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Your contribution helps build a transparent ecosystem. All data is anonymized and encrypted before storage.
          </motion.p>
        </motion.header>

        {/* Step Indicator */}
        <div className="flex items-center gap-8 mb-12 border-b border-white/5">
          {["Context", "Package", "Verification"].map((step, i) => (
            <div key={step} className={`pb-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${i === 0 ? "text-white border-b-2 border-white" : "text-slate-600"}`}>
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] ${i === 0 ? "border-white" : "border-slate-600"}`}>{i + 1}</span>
              {step}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">

              {/* Step 1: Context */}
              <section className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Institution Name</label>
                    <input
                      type="text"
                      name="college"
                      value={form.college}
                      onChange={handleChange}
                      placeholder="e.g. NIT Trichy"
                      required
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-white font-medium focus:border-white/30 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Academic Branch</label>
                    <select
                      name="branch"
                      value={form.branch}
                      onChange={handleChange}
                      required
                      title="Select your academic branch"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-white font-medium focus:border-white/30 outline-none appearance-none"
                    >
                      <option value="">Select Branch</option>
                      <option>Computer Science</option>
                      <option>Information Technology</option>
                      <option>Electronics & Comm.</option>
                      <option>Electrical</option>
                      <option>Mechanical</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="e.g. Google India"
                      required
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-white font-medium focus:border-white/30 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Batch Year</label>
                    <select
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-white font-medium focus:border-white/30 outline-none appearance-none"
                    >
                      <option>2025</option>
                      <option>2024</option>
                      <option>2023</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Step 2: Compensation */}
              <section className="space-y-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold tracking-tight">Compensation Breakdown</h3>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Base Salary (Annual LPA)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold">₹</span>
                      <input
                        type="number"
                        name="base"
                        value={form.base}
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 pl-8 text-white font-medium focus:border-white/30 outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Joining Bonus</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold">₹</span>
                      <input
                        type="number"
                        name="bonus"
                        value={form.bonus}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 pl-8 text-white font-medium focus:border-white/30 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Stocks / RSUs (Total Value)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold">₹</span>
                    <input
                      type="number"
                      name="stocks"
                      value={form.stocks}
                      onChange={handleChange}
                      placeholder="Total value over vesting period"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 pl-8 text-white font-medium focus:border-white/30 outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-slate-600 font-medium uppercase tracking-widest pt-1">Typically vested over 4 years</p>
                </div>
              </section>

              {/* Step 3: Role & Verification */}
              <section className="space-y-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold tracking-tight">Offer Type & Verification</h3>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Job Title</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g. Software Development Engineer-I"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-white font-medium focus:border-white/30 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Offer Type</label>
                    <select
                      name="offerType"
                      value={form.offerType}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-white font-medium focus:border-white/30 outline-none appearance-none"
                    >
                      <option value="on-campus">On-Campus</option>
                      <option value="off-campus">Off-Campus</option>
                      <option value="ppo">PPO</option>
                    </select>
                  </div>
                </div>

                {/* Upload */}
                <div className="space-y-4 p-8 border-2 border-dashed border-white/5 rounded-2xl bg-[#050505] flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-2">
                    <UploadCloud className="w-6 h-6 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1">Upload Offer Letter (Optional)</p>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                      Uploading gives your entry a Tier 1 Verified badge. We automatically redact your name and contact info.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-black uppercase tracking-widest rounded transition-colors"
                  >
                    Browse PDF/JPG
                  </button>
                </div>

                {/* Consent */}
                <div className="p-6 glass-card rounded-xl">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-white"
                    />
                    <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                      I confirm that the data provided is accurate. I understand that OfferVault will anonymize this data and share it for public benefit.
                    </span>
                  </label>
                </div>
              </section>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-12">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-12 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  Finalize Submission
                  <Check className="w-5 h-5" />
                </button>
                <a href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors">
                  Discard Changes
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="p-8 glass-card rounded-2xl">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6">Submission Review</h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Data Status</span>
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[8px] font-black uppercase tracking-widest rounded">Encryption Active</span>
                  </div>
                  <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">Estimated CTC</span>
                      <span className="text-xs font-bold">
                        {form.base ? `₹${form.base} LPA` : "-- LPA"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">Verification Level</span>
                      <span className="text-xs font-bold">Tier 3 (Self)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-8 h-8 mb-6 text-slate-400" />
                <h4 className="text-lg font-bold mb-3 tracking-tight">Privacy Guarantee</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We do not use cookies for tracking. We do not store IP addresses. Your submission is linked to your university email purely for one-time verification, then the link is severed permanently.
                </p>
              </div>
            </aside>
          </div>
        </form>
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </main>
  );
}
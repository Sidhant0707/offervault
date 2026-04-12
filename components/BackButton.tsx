"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface BackButtonProps {
  href?: string; // Optional: If provided, it links to a specific page.
  label?: string; // Optional: Custom text label.
}

export default function BackButton({ href, label = "Return to Hub" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    // If no href is provided, we use the browser's native back functionality
    if (!href) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-12"
    >
      {href ? (
        /* Scenario A: Links to a specific path */
        <Link 
          href={href} 
          className="inline-flex items-center gap-3 text-slate-500 hover:text-white transition-all group"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">{label}</span>
        </Link>
      ) : (
        /* Scenario B: Acts as a standard browser "Back" button */
        <button 
          onClick={handleBack}
          className="inline-flex items-center gap-3 text-slate-500 hover:text-white transition-all group"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">{label}</span>
        </button>
      )}
    </motion.div>
  );
}
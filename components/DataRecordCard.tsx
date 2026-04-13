import { Trash2 } from "lucide-react";

interface DataRecordCardProps {
  college: string;
  branch: string;
  year: string;
  company: string;
  ctc: string;
  status: string;
  category: string;
  isPending?: boolean;
  onDelete?: () => void; // 1. Added onDelete to the Interface
}

export default function DataRecordCard({
  college,
  branch,
  year,
  company,
  ctc,
  status,
  category,
  isPending = false,
  onDelete, // 2. Added onDelete to the props
}: DataRecordCardProps) {
  return (
    <div className="p-8 bg-[#0a0a0a] border border-white/10 rounded-xl transition-all hover:border-white/20">
      <div className="flex justify-between items-start mb-8">
        <span
          className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded transition-colors ${
            isPending
              ? "bg-black text-slate-500 border border-white/10"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          {status}
        </span>
        
        {/* Grouped the Category and Trash icon together on the right */}
        <div className="flex items-center gap-4">
          <span className="text-slate-600 text-[10px] uppercase font-bold tracking-widest">
            {category}
          </span>
          
          {/* 3. The Delete Button */}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Delete Submission"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <h4 className="text-xl font-bold mb-1">{college}</h4>
      <p className="text-xs text-slate-500 mb-6">{branch} &bull; {year}</p>
      
      <div className="py-4 border-y border-white/5 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company</span>
        <span className="text-sm font-bold">{company}</span>
      </div>
      
      <div className="py-4 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total CTC</span>
        <span className="text-xl font-bold tracking-tighter">₹{ctc} LPA</span>
      </div>
    </div>
  );
}
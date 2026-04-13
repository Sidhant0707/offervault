"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const FALLBACK_ITEMS = [
  { name: "Ayush", college: "NIT Trichy", ctc: "28.5", company: "TCS", time: "2 minutes ago" },
  { name: "Priya", college: "BITS Pilani", ctc: "35", company: "Microsoft", time: "5 minutes ago" },
  { name: "Rahul", college: "IIT Delhi", ctc: "42", company: "Zomato", time: "8 minutes ago" },
  { name: "Sneha", college: "DTU", ctc: "18", company: "Adobe", time: "12 minutes ago" },
  { name: "Karan", college: "IIIT Hyderabad", ctc: "54", company: "Oracle", time: "15 minutes ago" },
];

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff} minutes ago`;
  const hrs = Math.floor(diff / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

export default function SubmissionTicker() {
  const [items, setItems] = useState(FALLBACK_ITEMS.map(i => ({
    college: i.college,
    ctc: i.ctc,
    company: i.company,
    time: i.time,
  })));

  useEffect(() => {
    const fetchRecent = async () => {
      const { data, error } = await supabase
        .from("offers")
        .select("college, total_ctc, company, created_at")
        .order("created_at", { ascending: false })
        .limit(8);

      if (!error && data && data.length >= 3) {
        const mapped = data.map((r) => ({
          college: r.college,
          ctc: String(r.total_ctc),
          company: r.company,
          time: timeAgo(r.created_at),
        }));
        setItems(mapped);
      }
    };

    fetchRecent();
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-black border-b border-white/5 h-10 flex items-center overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="ticker-track flex items-center gap-16 px-16">
        {doubled.map((item, i) => (
          <div key={i} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
            Anonymous from {item.college} just submitted {item.ctc} LPA from {item.company}{" "}
            <span className="text-slate-600 tracking-normal font-medium">&bull; {item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
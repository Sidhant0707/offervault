"use client";

const TICKER_ITEMS = [
  { name: "Ayush", college: "NIT Trichy", ctc: "28.5", company: "TCS", time: "2 minutes ago" },
  { name: "Priya", college: "BITS Pilani", ctc: "35", company: "Microsoft", time: "5 minutes ago" },
  { name: "Rahul", college: "IIT Delhi", ctc: "42", company: "Zomato", time: "8 minutes ago" },
  { name: "Sneha", college: "DTU", ctc: "18", company: "Adobe", time: "12 minutes ago" },
  { name: "Karan", college: "IIIT Hyderabad", ctc: "54", company: "Oracle", time: "15 minutes ago" },
];

export default function SubmissionTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-black border-b border-white/5 h-10 flex items-center overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="ticker-track flex items-center gap-16 px-16">
        {items.map((item, i) => (
          <div key={i} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
            {item.name} from {item.college} just submitted {item.ctc} LPA from {item.company}{" "}
            <span className="text-slate-600 tracking-normal font-medium">&bull; {item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
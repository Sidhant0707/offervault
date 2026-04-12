import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                <Image 
                  src="/logo-white-Photoroom.png" 
                  alt="OfferVault Logo" 
                  width={40} 
                  height={40}
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">OfferVault</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              The definitive source for unfiltered engineering placement data in
              India. Professional, anonymous, and community-verified.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-8">
            <h5 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">Ecosystem</h5>
            <ul className="space-y-4">
              <li><Link href="/search" className="text-slate-500 hover:text-white text-xs font-bold transition-colors">Database</Link></li>
              <li><Link href="/leaderboard" className="text-slate-500 hover:text-white text-xs font-bold transition-colors">Leaderboard</Link></li>
              <li><Link href="/signup" className="text-slate-500 hover:text-white text-xs font-bold transition-colors">Verification</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">Legal</h5>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-slate-500 hover:text-white text-xs font-bold transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-slate-500 hover:text-white text-xs font-bold transition-colors">Terms</Link></li>
              <li><Link href="/security" className="text-slate-500 hover:text-white text-xs font-bold transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
            &copy; 2024 OfferVault. Peer-to-Peer Data Consortium.
          </p>
          <div className="flex gap-8">
            <Link 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              Twitter
            </Link>
            <Link 
              href="https://linkedin.com/in/sidhant07" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              LinkedIn
            </Link>
            <Link 
              href="https://github.com/Sidhant0707" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
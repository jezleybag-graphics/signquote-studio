import React from 'react';
import { UserCheck, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Header({ onOpenDrawer }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* BRAND LOCKUP WITH JEZREEL'S PERSONAL LOGO */}
        <a href="#" className="flex items-center gap-3.5 group text-decoration-none">
          <div className="w-11 h-11 rounded-xl bg-[#111213] p-1.5 flex items-center justify-center shadow-md shadow-black/5 border border-gray-800 transition-transform group-hover:scale-105">
            <img 
              src="/branding/on white_2.png" 
              alt="Jezreel Dave Leybag Personal Logo" 
              className="w-full h-full object-contain filter invert"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-[#111213]">
                JEZREEL DAVE LEYBAG
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FFF6EB] text-[#F79223] border border-[#F79223]/20">
                FASTSIGNS® OPS
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium tracking-tight">
              AI Signage Estimator & Wholesale Sourcing OS
            </p>
          </div>
        </a>

        {/* SPACIOUS DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-100/70 p-1.5 rounded-full border border-gray-200/60 text-xs font-semibold text-gray-600">
          <a href="#overview" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all">
            Overview
          </a>
          <a href="#projects" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all">
            Commercial Projects
          </a>
          <a href="#cad-studio" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all">
            Architectural CAD
          </a>
          <a href="#lead-intake" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all">
            AI Takeoff
          </a>
          <a href="#trade-sourcing" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all">
            Trade Sourcing
          </a>
          <a href="#margin-engine" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all">
            Margin Engine
          </a>
        </nav>

        {/* RIGHT ACTION CLUSTER */}
        <div className="flex items-center gap-3">
          {/* AVAILABILITY PILL */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-badge"></span>
            <span>US EST Full-Time Ready</span>
          </div>

          {/* CANDIDATE DOSSIER BUTTON */}
          <button 
            onClick={onOpenDrawer}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-300 hover:border-gray-900 text-gray-900 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95 cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-[#F79223]" />
            <span>Candidate Dossier</span>
          </button>

          {/* DIRECT CONTACT CTA */}
          <a 
            href="mailto:jezreelleybag.graphics@gmail.com?subject=FASTSIGNS%20Estimator%20Candidate%20Interview" 
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F79223] hover:bg-[#E07E12] text-white text-xs font-bold shadow-sm shadow-[#F79223]/25 transition-all active:scale-95 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Schedule Call</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </header>
  );
}

import React from 'react';
import { UserCheck, Mail, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Header({ onOpenDrawer }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/92 border-b border-gray-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* BRAND LOCKUP WITH JEZREEL'S AUTHENTIC BRAND MARK */}
        <a href="#" className="flex items-center gap-3.5 group select-none">
          <div className="w-11 h-11 rounded-xl bg-[#111213] p-2 flex items-center justify-center shadow-sm border border-gray-800 transition-transform group-hover:scale-105 shrink-0">
            <img 
              src="/branding/logo-mark-light.png" 
              alt="Jezreel Dave Official Logo Mark" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#111213] group-hover:text-[#F79223] transition-colors">
                JEZREEL DAVE LEYBAG
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium tracking-tight">
              AI Signage Estimator &amp; Technical Sourcing Specialist
            </p>
          </div>
        </a>

        {/* STREAMLINED DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-full border border-gray-200/70 text-xs font-semibold text-gray-600">
          <a href="#overview" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all">
            Overview
          </a>
          <a href="#projects" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all">
            Commercial Projects
          </a>
          <a href="#cad-studio" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all">
            3D &amp; CAD Studio
          </a>
          <a href="#estimating-workbench" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all">
            Estimating Workbench
          </a>
          <a href="#roi" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all">
            Franchise ROI
          </a>
        </nav>

        {/* REFINED ACTION CLUSTER & BUTTON HIERARCHY */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* SUBTLE AVAILABILITY STATUS PILL */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/70 text-emerald-800 text-[11px] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>US EST Full-Time Ready</span>
          </div>

          {/* SECONDARY ACTION: CANDIDATE DOSSIER */}
          <button 
            onClick={onOpenDrawer}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white border border-gray-300 hover:border-gray-900 text-gray-800 hover:text-gray-950 text-xs font-bold shadow-xs hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">Candidate</span>
            <span>Dossier</span>
          </button>

          {/* PRIMARY ACTION: SCHEDULE CALL */}
          <a 
            href="mailto:jezreelleybag.graphics@gmail.com?subject=FASTSIGNS%20Estimator%20Candidate%20Interview%20-%20Jezreel%20Dave%20Leybag" 
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#F79223] hover:bg-[#E07E12] text-white text-xs font-bold shadow-sm shadow-[#F79223]/20 active:scale-95 transition-all cursor-pointer group"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Schedule Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

        </div>

      </div>
    </header>
  );
}

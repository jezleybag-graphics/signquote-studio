import React from 'react';
import { UserCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function Header({ onOpenDrawer, onOpenGuide }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-gray-200/80 transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* BRAND LOCKUP WITH JEZREEL'S AUTHENTIC LOGO MARK */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#111213] p-1.5 flex items-center justify-center border border-gray-800 shadow-xs transition-transform group-hover:scale-105 shrink-0">
            <img 
              src="/branding/logo-mark-light.png" 
              alt="Jezreel Dave Official Logo Mark" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#111213] group-hover:text-[#F79223] transition-colors whitespace-nowrap">
                JEZREEL DAVE LEYBAG
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
              <span className="whitespace-nowrap">AI Signage Estimator</span>
              <span className="text-gray-300">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Available (US EST)</span>
              </span>
            </div>
          </div>
        </a>

        {/* STREAMLINED DESKTOP NAVIGATION */}
        <nav className="hidden xl:flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-full border border-gray-200/70 text-xs font-semibold text-gray-600">
          <button 
            onClick={onOpenGuide}
            className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all whitespace-nowrap cursor-pointer"
          >
            Overview &amp; Guide
          </button>
          <a href="#projects" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all whitespace-nowrap">
            Projects
          </a>
          <a href="#cad-studio" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all whitespace-nowrap">
            3D &amp; CAD Studio
          </a>
          <a href="#estimating-workbench" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all whitespace-nowrap">
            Estimating Workbench
          </a>
          <a href="#roi" className="px-3.5 py-1.5 rounded-full hover:text-[#111213] hover:bg-white transition-all whitespace-nowrap">
            Franchise ROI
          </a>
        </nav>

        {/* CLEAN 2-BUTTON EXECUTIVE ACTION CLUSTER (NEVER WRAPS) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* SECONDARY ACTION: CANDIDATE DOSSIER */}
          <button 
            onClick={onOpenDrawer}
            className="h-10 px-3.5 sm:px-4 rounded-xl bg-white border border-gray-300 hover:border-gray-900 text-gray-800 hover:text-gray-950 text-xs font-bold shadow-xs hover:bg-gray-50 active:scale-95 transition-all cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap"
          >
            <UserCheck className="w-4 h-4 text-gray-500 shrink-0" />
            <span>Candidate Dossier</span>
          </button>

          {/* PRIMARY ACTION: SCHEDULE CALL */}
          <a 
            href="mailto:jezreelleybag.graphics@gmail.com?subject=Signage%20Estimator%20Candidate%20Interview%20-%20Jezreel%20Dave%20Leybag" 
            className="h-10 px-4 sm:px-5 rounded-xl bg-[#F79223] hover:bg-[#E07E12] text-white text-xs font-bold shadow-sm shadow-[#F79223]/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap group"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>Schedule Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>

        </div>

      </div>
    </header>
  );
}

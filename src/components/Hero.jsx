import React from 'react';
import { Clock, ShieldCheck, Building2, Zap, ArrowDown } from 'lucide-react';

export default function Hero({ onExploreClick, onOpenCertificate }) {
  return (
    <section id="overview" className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-gray-200/70 bg-gradient-to-b from-white to-gray-50/60">
      
      {/* SUBTLE BRAND GLOW IN BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#F79223]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP CREDENTIAL BADGE */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={onOpenCertificate}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFF6EB] border border-[#F79223]/30 text-[#111213] text-xs font-bold shadow-sm hover:border-[#F79223] transition-all cursor-pointer group active:scale-95"
            title="Click to view verified Google Gemini Certificate"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F79223] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F79223]"></span>
            </span>
            <span>GOOGLE GEMINI CERTIFIED</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-600 font-semibold group-hover:text-[#F79223] transition-colors flex items-center gap-1">
              <span>VIEW CERTIFICATE</span>
              <span className="text-[10px]">↗</span>
            </span>
          </button>
        </div>

        {/* MAIN HEADLINE WITH BREATHING ROOM */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111213] tracking-tight leading-[1.15] mb-6">
            AI-Accelerated Signage Estimating &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F79223] to-[#D97706]">
              50% Gross Margin Protection.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            A production-grade operational system engineered by <strong className="text-gray-900 font-bold">Jezreel Dave Leybag</strong>. Automates unstructured contractor RFP spec extraction, generates submittal-ready architectural shop drawings, coordinates North American wholesale trade fabricators, and locks margin defense.
          </p>

          {/* SINGLE PURPOSEFUL HERO ACTION */}
          <div className="flex justify-center mb-16">
            <button 
              onClick={onExploreClick}
              className="h-12 sm:h-13 px-8 rounded-2xl bg-[#111213] hover:bg-black text-white text-sm sm:text-base font-bold shadow-xl shadow-black/10 transition-all flex items-center gap-3 cursor-pointer active:scale-98 group border border-gray-800 hover:border-gray-700"
            >
              <span>Explore Interactive Studio</span>
              <ArrowDown className="w-4 h-4 text-[#F79223] group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4 HIGH-VISIBILITY VALUE CARDS WITH GENEROUS BREATHING ROOM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          
          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm hover:border-[#F79223]/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-[#FFF6EB] flex items-center justify-center text-[#F79223] mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-[#111213] tracking-tight font-mono mb-1">
              &lt; 10 Mins
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
              Takeoff Velocity
            </div>
            <p className="text-xs text-gray-500 leading-normal">
              Reduces manual 45-minute blueprint takeoff to automated, submittal-ready specs in minutes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm hover:border-emerald-500/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-600 tracking-tight font-mono mb-1">
              50.0% GM
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
              Margin Safeguard
            </div>
            <p className="text-xs text-gray-500 leading-normal">
              Enforces true Gross Margin math to prevent the standard $840+ profit leakage per job.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm hover:border-[#F79223]/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-[#FFF6EB] flex items-center justify-center text-[#F79223] mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-[#111213] tracking-tight font-mono mb-1">
              4 Wholesale
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
              North American Portals
            </div>
            <p className="text-xs text-gray-500 leading-normal">
              Integrated sourcing across DSW, Gemini Made, Quality Mfg, and Howard Industries.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm hover:border-blue-500/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-[#111213] tracking-tight font-mono mb-1">
              NEC 80% Rule
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
              UL 48 Pre-Flight QC
            </div>
            <p className="text-xs text-gray-500 leading-normal">
              Automated electrical headroom sizing (48W max on 60W Class 2 drivers) &amp; landlord checks.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Clock, ShieldCheck, CheckCircle2, Sparkles, Award, Mail, ArrowUpRight } from 'lucide-react';
import { getGmailComposeUrl } from '../utils/contact';

export default function RoiSection() {
  const badges = [
    "ACM (Aluminum Composite Material)",
    "Cast Acrylic (#7328 / #2447)",
    "Polycarbonate (Lexan Impact Faces)",
    "HDU (High-Density Urethane Precision Board)",
    "Expanded PVC (Sintra / Komatex)",
    "Front-Lit Channel Letters",
    "Reverse Halo-Lit Channel Letters",
    "Landlord Raceway Wireway Systems",
    "Direct Flush Stud Masonry Mount",
    "Machined Architectural Standoffs",
    "UL 48 Electric Sign Safety Sizing",
    "NEC 80% Driver Headroom Rule",
    "CoreBridge V3 ERP Assemblies",
    "3M Series 3630 Translucent Vinyl"
  ];

  return (
    <section className="py-16 md:py-24 border-b border-gray-200/70 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#F79223] mb-2 flex items-center justify-center gap-2">
            <Award className="w-3.5 h-3.5" />
            <span>EXECUTIVE ROI &amp; ENTERPRISE VALUE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111213] tracking-tight mb-4">
            How This Operational Workbench Protects Commercial Sign Profitability
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Eliminating the three most expensive friction points in modern commercial signage estimating: slow inbound takeoff turnaround, naive margin calculation, and incomplete wholesale trade RFQs.
          </p>
        </div>

        {/* 3 EXPANSIVE VALUE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="p-8 rounded-3xl bg-gray-50/60 border border-gray-200/80 hover:border-gray-400 transition-all hover:bg-white hover:shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF6EB] flex items-center justify-center text-[#F79223] mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#111213] tracking-tight mb-3">
              1. 75% Faster Quote Velocity
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Compresses unstructured architectural blueprint takeoffs from 45 minutes down to under 10 minutes. In commercial sign bidding, responding first with complete engineering drawings wins over 60% of contested contractor bids.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gray-50/60 border border-gray-200/80 hover:border-gray-400 transition-all hover:bg-white hover:shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#111213] tracking-tight mb-3">
              2. 50% Margin Lockdown
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Enforces mathematically rigorous Gross Margin calculations (<code className="font-mono text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">COGS / (1 - GM%)</code>) on all wholesale contracts, systematically preventing the standard $840+ margin-vs-markup profit leakage.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gray-50/60 border border-gray-200/80 hover:border-gray-400 transition-all hover:bg-white hover:shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#111213] tracking-tight mb-3">
              3. Zero-Revision Trade RFQs
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Dispatches standardized, production-ready RFQs directly to North American fabricator queues (DSW, Gemini, QM) with complete electrical, weeping, crating, and 1:1 paper pattern specifications on the first send.
            </p>
          </div>

        </div>

        {/* TECHNICAL SUBSTRATE COMPETENCIES STRIP */}
        <div className="p-8 rounded-3xl bg-gray-50/80 border border-gray-200/80 text-center">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
            Core Substrate Expertise &amp; Fabrication Methodologies
          </h4>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 shadow-2xs hover:border-[#F79223] transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* EXECUTIVE CONVERSION CALL-TO-ACTION BANNER */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-[#111213] text-white border border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F79223] block mb-2">
              COMMERCIAL CAPACITY READY • US EST
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2">
              Ready to Expand Your Signage Quoting Throughput?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Equip your sign company with senior-level blueprint takeoff speed, flawless CoreBridge-aligned margin defense, and North American wholesale routing.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href={getGmailComposeUrl({
                subject: 'Signage Estimator Candidate Opportunity - Jezreel Dave Leybag',
                body: 'Hi Jezreel,\n\nI reviewed your SignQuote workbench and ROI metrics. I would like to schedule a call regarding commercial signage estimating operations.\n\nBest regards,'
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#F79223] hover:bg-[#E07E12] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#F79223]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group whitespace-nowrap"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Schedule Call</span>
              <ArrowUpRight className="w-4 h-4 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

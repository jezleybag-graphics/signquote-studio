import React from 'react';
import { X, Mail, Phone, ExternalLink, Award, CheckCircle2, ShieldCheck, Briefcase, ArrowUpRight } from 'lucide-react';
import { getGmailComposeUrl } from '../utils/contact';

export default function CandidateDrawer({ isOpen, onClose, onOpenCertificate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* SCRIM BACKDROP */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* DRAWER MODAL */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gray-200">
          
          {/* DRAWER TOP BAR */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79223]"></span>
              <h3 className="text-sm font-extrabold text-[#111213] uppercase tracking-wider">
                Operator Profile &amp; Credentials
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* DRAWER SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* PROFILE BIO HEADER */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#F79223] shadow-md shadow-[#F79223]/20 shrink-0 bg-gray-100">
                <img 
                  src="/jezreel-photo.jpg" 
                  alt="Jezreel Dave Leybag" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-[#111213] tracking-tight">
                  Jezreel Dave Leybag
                </h4>
                <p className="text-xs text-gray-500 font-medium">
                  Signage Estimator &amp; Vendor Sourcing Specialist
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Available for Full-Time US EST Overlap</span>
                </div>
              </div>
            </div>

            {/* VALUE PROPOSITION TO CLIENTS & FIRMS */}
            <div className="p-4 rounded-2xl bg-[#FFF6EB] border border-[#F79223]/30">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#F79223] block mb-1">
                Commercial Operations &amp; Technical Fit
              </span>
              <p className="text-xs text-gray-800 leading-relaxed">
                Direct commercial print production &amp; substrate experience combined with Google Gemini AI workflows. Engineered specifically to double quoting turnaround speed, eliminate CoreBridge data-entry bottlenecks, and protect 50% gross margins on wholesale contracts.
              </p>
            </div>

            {/* VERIFIED CERTIFICATIONS & RESUME */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Verified Credentials &amp; Resume
              </span>
              <div className="space-y-2.5">
                {/* 1-PAGE ATS RESUME DOWNLOAD */}
                <a 
                  href="/Jezreel_Dave_Resume_Signage_Estimator.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/60 flex items-start justify-between gap-3 cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-all group shadow-2xs"
                  title="Open 1-Page ATS PDF Resume"
                >
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-gray-900 block group-hover:text-sky-900 transition-colors">
                        1-Page ATS Resume (PDF)
                      </strong>
                      <span className="text-[11px] text-gray-600 block">
                        Signage Estimator &amp; Vendor Sourcing Specialist
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-sky-700 bg-white px-2 py-0.5 rounded border border-sky-200 group-hover:bg-[#0284c7] group-hover:text-white transition-colors shrink-0 flex items-center gap-0.5">
                    <span>View PDF</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>

                {/* VERIFIED CERTIFICATE */}
                <div 
                  onClick={() => {
                    if (onOpenCertificate) onOpenCertificate();
                  }}
                  className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-start justify-between gap-3 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all group shadow-2xs"
                  title="Click to view verified certificate"
                >
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-gray-900 block group-hover:text-emerald-900 transition-colors">
                        Generative AI for Educators with Gemini
                      </strong>
                      <span className="text-[11px] text-gray-600 block">
                        Google for Education &amp; MIT RAISE • Score: 100%
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0 flex items-center gap-0.5">
                    <span>View Cert</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* OPERATIONAL BACKGROUND */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Real Commercial Experience
              </span>
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Co-Owner &amp; Operations Lead — Morpho Cafe and Studio (2024–Present):</strong> Manage business operations, vendor purchasing, budget discipline, supply logistics, and 30%+ digital growth.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">International Remote Work (2021–Present):</strong> 4+ years track record delivering creative and production assets for clients across Canada, UAE, and Italy with strict revision deadlines and proactive English communication.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Creator of SignQuote Studio Workbench (2024):</strong> Architected this live platform to demonstrate commercial sign estimating math, CoreBridge logic, 50% gross margin defense, and Gemini AI RFP takeoff.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">US EST Dedicated Workspace:</strong> Dedicated private office setup in the Philippines with 300Mbps fiber internet, LTE backup, and dual UPS battery power redundancy.
                  </div>
                </li>
              </ul>
            </div>

            {/* CONTACT & PROFILES */}
            <div className="pt-4 border-t border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Direct Contact &amp; Links
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Email:</span>
                  <a 
                    href={getGmailComposeUrl({
                      subject: 'Commercial Signage Inquiry - Jezreel Dave Leybag',
                      body: 'Hi Jezreel,\n\nI reviewed your SignQuote workbench and would like to connect regarding commercial signage estimating.\n\nBest regards,'
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[#F79223] font-bold hover:underline"
                    title="Click to email Jezreel in Gmail (opens new tab)"
                  >
                    jezreelleybag.graphics@gmail.com
                  </a>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">WhatsApp:</span>
                  <span className="font-mono text-gray-900 font-bold">+63 939-399-1289</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">LinkedIn:</span>
                  <a 
                    href="https://linkedin.com/in/jezreel-dave-leybag-a01528152/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#F79223] font-bold flex items-center gap-1 hover:underline"
                  >
                    <span>View LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* DRAWER FOOTER CTA */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <a 
              href={getGmailComposeUrl({
                subject: 'Signage Estimator Screening Call - Jezreel Dave Leybag',
                body: 'Hi Jezreel,\n\nWe reviewed your Candidate Dossier and would like to schedule a screening call regarding commercial signage estimating.\n\nBest regards,'
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-[#F79223] hover:bg-[#E07E12] text-white text-xs font-bold shadow-md shadow-[#F79223]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 group"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Schedule Call</span>
              <ArrowUpRight className="w-4 h-4 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

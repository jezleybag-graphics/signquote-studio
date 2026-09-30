import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Award, CheckCircle2, ShieldCheck, Copy, Check, Mail, ArrowUpRight } from 'lucide-react';
import { getGmailComposeUrl } from '../utils/contact';

export default function CertificateModal({ isOpen, onClose }) {
  const [copiedId, setCopiedId] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText('475981211').then(() => {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2200);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn select-none">
      
      {/* BACKDROP SCRIM WITH BLUR */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-200/90 overflow-hidden my-auto z-10 flex flex-col">
        
        {/* TOP BRAND HEADER (GOOGLE + MIT RAISE INITIATIVE) */}
        <div className="bg-[#FAFAFA] border-b border-gray-200/80 px-6 py-4 relative flex items-center justify-between">
          <div className="h-7 sm:h-8 flex items-center">
            <img 
              src="/credentials/google-cert-banner.png" 
              alt="Google in collaboration with MIT RAISE Initiative" 
              className="h-full object-contain"
            />
          </div>

          {/* CLOSE BUTTON */}
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-200/60 transition-colors cursor-pointer"
            title="Close dialog (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CERTIFICATE DISPLAY BODY */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          
          {/* OFFICIAL GOOGLE BADGE */}
          <div className="relative mb-5 group">
            <div className="absolute inset-0 bg-blue-500/15 rounded-full blur-xl scale-110 pointer-events-none" />
            <img 
              src="/credentials/google-gemini-badge.png" 
              alt="Generative AI for Educators with Gemini Official Badge" 
              className="relative w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* VERIFIED BADGE PILL */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>OFFICIAL GOOGLE CREDENTIAL VERIFIED</span>
          </div>

          {/* CERTIFICATE TITLE */}
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111213] tracking-tight mb-1">
            Generative AI for Educators with Gemini
          </h2>
          <p className="text-xs text-gray-500 font-medium mb-6">
            Issued by <strong className="text-gray-800 font-bold">Google for Education</strong> in collaboration with <strong className="text-gray-800 font-bold">MIT RAISE Initiative</strong>
          </p>

          {/* CERTIFICATE METADATA GRID */}
          <div className="w-full bg-gray-50/80 rounded-2xl border border-gray-200/80 p-4 sm:p-5 mb-6 text-left">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                  Recipient
                </span>
                <strong className="text-sm font-extrabold text-gray-900 block tracking-tight">
                  JEZREEL DAVE LEYBAG
                </strong>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                  Issue Date
                </span>
                <span className="font-semibold text-gray-800 block">
                  August 18, 2026
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                  Examination Score
                </span>
                <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                  100% (Perfect Score)
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                  Completion ID
                </span>
                <button
                  onClick={handleCopyId}
                  className="font-mono text-gray-800 hover:text-[#F79223] font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                  title="Click to copy ID"
                >
                  <span>475981211</span>
                  {copiedId ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-gray-200/70 text-[11px] text-gray-600 leading-relaxed">
              <strong className="text-gray-900 font-semibold">Verified Scope:</strong> Demonstrates mastery in generative AI prompt engineering, multi-turn reasoning, structured document processing, automated takeoff pipelines, and responsible AI system architecture.
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://edu.exceedlms.com/student/award/vPL2aLiSCu3wRWRoLZHmGz38"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#111213] hover:bg-black text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 group"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#F79223]" />
              <span>Verify on Google Education Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={getGmailComposeUrl({
                subject: 'Inquiry regarding Google AI Certified Estimator - Jezreel Dave Leybag',
                body: 'Hi Jezreel,\n\nI reviewed your Google Generative AI Certification credential and would like to schedule a call regarding commercial signage estimating operations.\n\nBest regards,'
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#F79223] hover:bg-[#E07E12] text-white text-xs font-bold shadow-sm shadow-[#F79223]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 group whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Schedule Call</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}

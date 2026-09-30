import React, { useEffect } from 'react';
import { X, Sparkles, Box, ShieldAlert, ArrowRight, UserCheck, Mail, CheckCircle2, Info } from 'lucide-react';

export default function WelcomeModal({ isOpen, onClose, onOpenDossier }) {
  // Close on ESC key press
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

  const handleDismiss = (dontShowAgain = false) => {
    if (dontShowAgain) {
      localStorage.setItem('signquote_welcome_dismissed', 'true');
    }
    onClose();
  };

  const handleStartTour = () => {
    handleDismiss(true);
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn select-none">
      
      {/* BACKDROP SCRIM WITH BLUR */}
      <div 
        onClick={() => handleDismiss(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200/90 overflow-hidden my-auto z-10 flex flex-col">
        
        {/* HEADER BANNER */}
        <div className="p-6 sm:p-8 bg-[#111213] text-white relative border-b border-gray-800">
          
          {/* CLOSE BUTTON */}
          <button 
            onClick={() => handleDismiss(false)}
            className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
            title="Close dialog (ESC)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* BRAND LOCKUP */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-11 h-11 rounded-xl bg-black border border-gray-700 p-2 flex items-center justify-center shrink-0 shadow-sm">
              <img 
                src="/branding/logo-mark-light.png" 
                alt="Jezreel Dave Official Logo Mark" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#F79223] block">
                Executive Portfolio &amp; Technical Prototype
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Welcome to SignQuote Studio
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
            An interactive commercial signage estimating and submittal platform engineered by <strong className="text-white font-bold">Jezreel Dave Leybag</strong>. This studio models the full pipeline from raw contractor inquiry to profitable CoreBridge work order.
          </p>

        </div>

        {/* BODY: WHAT TO EXPLORE (3 KEY PILLARS) */}
        <div className="p-6 sm:p-8 space-y-6 bg-gray-50/50">
          
          <div className="text-xs font-extrabold uppercase tracking-wider text-gray-500 font-mono">
            How to Test This Operational Studio:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            {/* PILLAR 1: 3D CAD & ELEVATIONS */}
            <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                  <Box className="w-4 h-4" />
                </div>
                <strong className="text-xs font-extrabold text-gray-900 block mb-1">
                  1. 3D &amp; CAD Studio
                </strong>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Explode 3D channel letters into physical fabrication layers. Inspect Section A-A cross-sections and UL 48 wiring details.
                </p>
              </div>
            </div>

            {/* PILLAR 2: AI INBOUND TAKEOFF */}
            <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#F79223] flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <strong className="text-xs font-extrabold text-gray-900 block mb-1">
                  2. AI Spec Extraction
                </strong>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Test Gemini AI parsing raw contractor emails into structured engineering Bill of Materials (BOM) in seconds.
                </p>
              </div>
            </div>

            {/* PILLAR 3: MARGIN ENGINE */}
            <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <strong className="text-xs font-extrabold text-gray-900 block mb-1">
                  3. Margin Defense
                </strong>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Route to wholesale fabricators and see how the true CoreBridge margin formula safeguards thousands in profit.
                </p>
              </div>
            </div>

          </div>

          {/* CANDIDATE FIT HIGHLIGHT */}
          <div className="p-4 rounded-2xl bg-[#FFF6EB] border border-[#F79223]/30 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#F79223] shrink-0 bg-gray-200">
              <img 
                src="/jezreel-photo.jpg" 
                alt="Jezreel Dave Leybag" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs text-gray-700 leading-relaxed">
              <strong className="font-extrabold text-gray-900 block text-xs">
                About Jezreel Dave Leybag
              </strong>
              <span>
                12+ years in graphic design, print production, and substrate engineering. Google Gemini AI Certified (86%). Available for full-time US EST operational roles.
              </span>
            </div>
          </div>

        </div>

        {/* MODAL FOOTER ACTIONS */}
        <div className="p-5 sm:p-6 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleDismiss(true);
                if (onOpenDossier) onOpenDossier();
              }}
              className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-900 text-gray-800 text-xs font-bold transition-all hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-gray-500" />
              <span>View Candidate Dossier</span>
            </button>
          </div>

          <button
            onClick={handleStartTour}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F79223] hover:bg-[#E07E12] text-white text-xs font-bold shadow-md shadow-[#F79223]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
          >
            <span>Start Interactive Tour</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </div>
  );
}

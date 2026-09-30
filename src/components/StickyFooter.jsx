import React, { useState, useEffect } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { getGmailComposeUrl } from '../utils/contact';

export default function StickyFooter({ onOpenDrawer }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#111213]/95 backdrop-blur-md text-white border-t border-gray-800 shadow-2xl py-3 px-4 sm:px-8 transition-transform duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#111213] border border-gray-700 p-1 flex items-center justify-center shrink-0">
            <img 
              src="/branding/logo-mark-light.png" 
              alt="Jezreel Dave Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Ready to accelerate your commercial sign quoting capacity?</span>
              <span className="hidden md:inline-block text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                Full-Time US EST Ready
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Built &amp; operated by Jezreel Dave Leybag — Google Gemini Certified (86%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDrawer}
            className="px-3.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Candidate Dossier
          </button>
          <a
            href={getGmailComposeUrl({
              subject: 'Signage Estimator Screening Call - Jezreel Dave Leybag',
              body: 'Hi Jezreel,\n\nI reviewed your SignQuote AI & Architectural Studio workbench and would like to schedule a call regarding commercial signage estimating and operational workflows.\n\nBest regards,'
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#F79223] hover:bg-[#E07E12] text-white text-xs font-bold shadow-md shadow-[#F79223]/25 transition-all cursor-pointer group active:scale-95"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span>Schedule Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>
        </div>

      </div>
    </div>
  );
}

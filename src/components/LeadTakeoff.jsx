import React, { useState } from 'react';
import { Sparkles, Terminal, Sliders, CheckCircle2, RotateCcw } from 'lucide-react';

export default function LeadTakeoff({ project, onTakeoffRun, letterHeight, setLetterHeight, returnDepth, setReturnDepth }) {
  const [rfpText, setRfpText] = useState(project.rawRfp);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(true);

  // Update rfpText when project changes
  React.useEffect(() => {
    setRfpText(project.rawRfp);
  }, [project]);

  const handleRunTakeoff = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowDiagnostic(true);
      if (onTakeoffRun) onTakeoffRun();
    }, 1200);
  };

  return (
    <div id="lead-intake" className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 flex flex-col h-full">
      
      {/* CARD HEADER WITH DISTINCT HIERARCHY */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F79223] block mb-1">
            STEP 01 • INBOUND LEAD PIPELINE
          </span>
          <h3 className="text-xl font-extrabold text-[#111213] tracking-tight">
            Gemini AI Spec Extraction Engine
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
          NLP Takeoff
        </span>
      </div>

      {/* RAW RFP TEXTAREA */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Contractor RFP Notes / Scope Text (Editable)
          </label>
          <button 
            onClick={() => setRfpText(project.rawRfp)}
            className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Text</span>
          </button>
        </div>
        <textarea
          rows={6}
          value={rfpText}
          onChange={(e) => setRfpText(e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/60 font-mono text-xs text-gray-800 leading-relaxed focus:bg-white focus:border-[#F79223] focus:ring-3 focus:ring-[#F79223]/10 transition-all outline-none resize-y"
          placeholder="Paste commercial sign inquiry..."
        />
      </div>

      {/* ACTION BUTTON */}
      <div className="mb-6">
        <button
          onClick={handleRunTakeoff}
          disabled={isAnalyzing}
          className="w-full py-3.5 px-6 rounded-xl bg-[#111213] hover:bg-black text-white text-xs font-bold shadow-md shadow-black/10 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
        >
          {isAnalyzing ? (
            <>
              <span className="w-4 h-4 border-2 border-white/20 border-t-[#F79223] rounded-full animate-spin"></span>
              <span>Gemini AI Parsing Substrates &amp; Sizing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#F79223]" />
              <span>Execute AI Spec Takeoff</span>
            </>
          )}
        </button>
      </div>

      {/* GEMINI DIAGNOSTIC LOG */}
      {showDiagnostic && (
        <div className="mb-6 p-4 rounded-xl bg-[#111213] text-gray-200 font-mono text-xs border border-gray-800 shadow-inner">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800 text-[10px] text-gray-400">
            <span className="flex items-center gap-1.5 text-[#38BDF8]">
              <Terminal className="w-3 h-3" />
              <span>GEMINI 1.5 PRO SIGNOPS AGENT</span>
            </span>
            <span className="text-emerald-400 font-bold">CONFIDENCE: 99.4%</span>
          </div>
          <div className="space-y-1 text-[11px] leading-relaxed text-gray-300">
            {project.diagnostic.map((line, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-[#F79223] select-none">&bull;</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BILL OF MATERIALS TABLE WITH CLEAN HIERARCHY */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          Extracted Engineering Specification Sheet
        </h4>
        <div className="rounded-xl border border-gray-200/80 overflow-hidden bg-white">
          <table className="w-full text-xs text-left">
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2.5 px-3.5 bg-gray-50/70 font-semibold text-gray-500 w-1/3">Classification</td>
                <td className="py-2.5 px-3.5 font-bold text-gray-900">{project.classification}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5 bg-gray-50/70 font-semibold text-gray-500">Dimensions</td>
                <td className="py-2.5 px-3.5 font-mono text-gray-800">{letterHeight}" Height • 14 ft Overall Span</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5 bg-gray-50/70 font-semibold text-gray-500">Face Substrate</td>
                <td className="py-2.5 px-3.5 text-gray-800">{project.face}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5 bg-gray-50/70 font-semibold text-gray-500">Return Sidewall</td>
                <td className="py-2.5 px-3.5 font-mono text-gray-800">{returnDepth}" Depth • {project.returns.split('•')[1] || '0.040" Alum'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5 bg-gray-50/70 font-semibold text-gray-500">Back Plate</td>
                <td className="py-2.5 px-3.5 text-gray-800">{project.back}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5 bg-gray-50/70 font-semibold text-gray-500">LED Modules</td>
                <td className="py-2.5 px-3.5 text-gray-800">{project.leds}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5 bg-gray-50/70 font-semibold text-gray-500">Mounting</td>
                <td className="py-2.5 px-3.5 text-gray-800">{project.mounting}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

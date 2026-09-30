import React, { useState } from 'react';
import { Sparkles, Terminal, CheckCircle2, RotateCcw, ArrowRight, FileText, Check } from 'lucide-react';

export default function LeadTakeoff({ 
  project, 
  onTakeoffRun, 
  letterHeight, 
  setLetterHeight, 
  returnDepth, 
  setReturnDepth,
  onNextStep,
  isGuided = true
}) {
  const [rfpText, setRfpText] = useState(project.rawRfp);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(true);
  const [hasRunTakeoff, setHasRunTakeoff] = useState(false);

  // Update rfpText when project changes
  React.useEffect(() => {
    setRfpText(project.rawRfp);
    setHasRunTakeoff(false);
  }, [project]);

  const handleRunTakeoff = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowDiagnostic(true);
      setHasRunTakeoff(true);
      if (onTakeoffRun) onTakeoffRun();
    }, 1000);
  };

  return (
    <div id="lead-intake" className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 flex flex-col h-full">
      
      {/* CARD HEADER WITH DISTINCT HIERARCHY */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F79223]">
              STEP 01 • INBOUND LEAD PIPELINE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h3 className="text-xl font-extrabold text-[#111213] tracking-tight">
            Gemini AI Spec Extraction Engine
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {hasRunTakeoff ? (
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Takeoff Verified (99.4%)</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>NLP Intake Active</span>
            </span>
          )}
        </div>
      </div>

      {/* DUAL-COLUMN CONTENT FOR GUIDED MODE */}
      <div className={`grid gap-6 ${isGuided ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        
        {/* LEFT COLUMN: RAW RFP & ACTION (5 COLS IN GUIDED) */}
        <div className={isGuided ? 'lg:col-span-5 flex flex-col gap-4' : 'flex flex-col gap-4'}>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Contractor RFP Notes / Scope Text
              </label>
              <button 
                onClick={() => setRfpText(project.rawRfp)}
                className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 cursor-pointer transition-colors"
                title="Reset to default inquiry text"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo Text</span>
              </button>
            </div>
            <textarea
              rows={isGuided ? 7 : 5}
              value={rfpText}
              onChange={(e) => setRfpText(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/60 font-mono text-xs text-gray-800 leading-relaxed focus:bg-white focus:border-[#F79223] focus:ring-3 focus:ring-[#F79223]/10 transition-all outline-none resize-y shadow-inner"
              placeholder="Paste commercial sign inquiry..."
            />
          </div>

          <button
            onClick={handleRunTakeoff}
            disabled={isAnalyzing}
            className="w-full py-3 px-6 rounded-xl bg-[#111213] hover:bg-black text-white text-xs font-bold shadow-md shadow-black/10 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
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

          {/* QUICK SCOPE SUMMARY CARD */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 text-xs">
            <span className="text-[10px] uppercase font-extrabold text-gray-400 block mb-1.5">
              Fastsigns Scope Identification
            </span>
            <div className="flex items-center justify-between text-gray-700 mb-1">
              <span>Target Client:</span>
              <strong className="text-gray-900 font-bold truncate max-w-[200px]">{project.client.split('—')[0]}</strong>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span>Job Classification:</span>
              <span className="font-semibold text-[#0284C7]">{project.classification.split(' ')[0]} Signage</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI LOG & EXTRACTED SPEC SHEET (7 COLS IN GUIDED) */}
        <div className={isGuided ? 'lg:col-span-7 flex flex-col gap-4' : 'flex flex-col gap-4'}>
          
          {/* GEMINI DIAGNOSTIC LOG */}
          {showDiagnostic && (
            <div className="p-4 rounded-xl bg-[#111213] text-gray-200 font-mono text-xs border border-gray-800 shadow-inner">
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
          <div className="rounded-xl border border-gray-200/80 overflow-hidden bg-white shadow-xs">
            <div className="px-3.5 py-2 bg-gray-50/90 border-b border-gray-200 flex items-center justify-between">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-600">
                Extracted Engineering Specification Sheet
              </h4>
              <span className="text-[10px] font-mono font-bold text-gray-400">BOM SPEC CAD-01</span>
            </div>
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 px-3.5 bg-gray-50/40 font-semibold text-gray-500 w-1/3">Classification</td>
                  <td className="py-2 px-3.5 font-bold text-gray-900">{project.classification}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3.5 bg-gray-50/40 font-semibold text-gray-500">Dimensions</td>
                  <td className="py-2 px-3.5 font-mono text-gray-800">{letterHeight}" Height • 14 ft Overall Span</td>
                </tr>
                <tr>
                  <td className="py-2 px-3.5 bg-gray-50/40 font-semibold text-gray-500">Face Substrate</td>
                  <td className="py-2 px-3.5 text-gray-800">{project.face}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3.5 bg-gray-50/40 font-semibold text-gray-500">Return Sidewall</td>
                  <td className="py-2 px-3.5 font-mono text-gray-800">{returnDepth}" Depth • {project.returns.split('•')[1] || '0.040" Alum'}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3.5 bg-gray-50/40 font-semibold text-gray-500">Back Plate</td>
                  <td className="py-2 px-3.5 text-gray-800">{project.back}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3.5 bg-gray-50/40 font-semibold text-gray-500">LED Modules</td>
                  <td className="py-2 px-3.5 text-gray-800">{project.leds}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3.5 bg-gray-50/40 font-semibold text-gray-500">Mounting Hardware</td>
                  <td className="py-2 px-3.5 text-gray-800">{project.mounting}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* FOOTER ACTION BAR */}
      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Extracted specs are linked live to 3D Assembly &amp; CoreBridge pricing</span>
        </div>
        
        {onNextStep && (
          <button
            onClick={onNextStep}
            className="px-5 py-2.5 rounded-xl bg-[#111213] hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer group active:scale-98"
          >
            <span>Proceed to Step 02: Wholesale Sourcing</span>
            <ArrowRight className="w-4 h-4 text-[#F79223] group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

    </div>
  );
}

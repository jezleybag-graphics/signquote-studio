import React, { useState } from 'react';
import { DollarSign, ShieldAlert, Download, Check, AlertTriangle } from 'lucide-react';

export default function MarginEngine({ 
  wholesale, setWholesale,
  freight, setFreight,
  laborHours, setLaborHours,
  targetMargin, setTargetMargin,
  project
}) {
  const [copiedJson, setCopiedJson] = useState(false);

  const laborCost = laborHours * 75.0;
  const totalCogs = wholesale + freight + laborCost;
  const marginDec = targetMargin / 100.0;
  
  // Real CoreBridge Gross Margin Math: Price = COGS / (1 - GM%)
  const retailPrice = totalCogs / (1.0 - marginDec);
  const grossProfit = retailPrice - totalCogs;
  const effectiveMarkup = (grossProfit / totalCogs) * 100.0;

  // Profit leakage calculation: what if someone erroneously used markup instead of margin?
  const naiveMarkupPrice = totalCogs * (1.0 + marginDec);
  const profitLeakage = retailPrice - naiveMarkupPrice;

  const handleExportJson = () => {
    const payload = {
      fastsigns_corebridge_work_order: {
        job_id: project.jobId,
        client: project.client,
        estimator: "Jezreel Dave Leybag (Gemini AI Certified)",
        specs: {
          classification: project.classification,
          dimensions: project.dims,
          face: project.face,
          returns: project.returns,
          back: project.back,
          mounting: project.mounting,
          ul_48_certified: true
        },
        financial_cogs: {
          wholesale_fabrication: wholesale,
          freight_crating: freight,
          inhouse_staging_labor_hours: laborHours,
          total_cogs: totalCogs,
          target_gross_margin: targetMargin,
          selling_price: retailPrice,
          gross_dollar_profit: grossProfit,
          effective_markup_pct: effectiveMarkup
        }
      }
    };

    navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(() => {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2500);
    });
  };

  return (
    <div id="margin-engine" className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 flex flex-col h-full">
      
      {/* CARD HEADER */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F79223] block mb-1">
            STEP 03 • FINANCIAL PROTECTION
          </span>
          <h3 className="text-xl font-extrabold text-[#111213] tracking-tight">
            CoreBridge Margin Protection Engine
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 font-mono">
          {targetMargin.toFixed(1)}% Target GM
        </span>
      </div>

      {/* 2-COLUMN SLIDERS & PRICING HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        
        {/* SLIDERS COLUMN */}
        <div className="space-y-4">
          
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="text-gray-600">Wholesale Base Fabrication</span>
              <span className="font-mono text-gray-900">${wholesale.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="300"
              max="5000"
              step="50"
              value={wholesale}
              onChange={(e) => setWholesale(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#111213]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="text-gray-600">Freight &amp; Heavy Wooden Crating</span>
              <span className="font-mono text-gray-900">${freight.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="25"
              value={freight}
              onChange={(e) => setFreight(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#111213]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="text-gray-600">In-House Staging &amp; QA Labor ($75/hr)</span>
              <span className="font-mono text-gray-900">${laborCost.toFixed(2)} ({laborHours.toFixed(1)} hrs)</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="6.0"
              step="0.5"
              value={laborHours}
              onChange={(e) => setLaborHours(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#111213]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="text-gray-600">Target Gross Margin %</span>
              <span className="font-mono text-[#F79223] font-extrabold">{targetMargin.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="35"
              max="65"
              step="1"
              value={targetMargin}
              onChange={(e) => setTargetMargin(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F79223]"
            />
          </div>

        </div>

        {/* PRICING HERO CARD */}
        <div className="p-6 rounded-2xl bg-[#111213] text-white flex flex-col justify-between shadow-lg shadow-black/10">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold block mb-1">
              Recommended CoreBridge Selling Price
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#38BDF8] font-mono tracking-tight my-2">
              ${retailPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-400">
              Gross Dollar Profit: <strong className="text-emerald-400 font-mono">${grossProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </p>
          </div>

          <div className="pt-4 border-t border-gray-800 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold block">Total COGS</span>
              <strong className="font-mono text-gray-200">${totalCogs.toFixed(2)}</strong>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold block">Actual Margin</span>
              <strong className="font-mono text-[#38BDF8]">{targetMargin.toFixed(1)}%</strong>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold block">Req. Markup</span>
              <strong className="font-mono text-[#F79223]">{effectiveMarkup.toFixed(1)}%</strong>
            </div>
          </div>
        </div>

      </div>

      {/* PROFIT LEAKAGE SAFEGUARD ALARM */}
      <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 mb-6">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 leading-relaxed">
            <strong className="font-bold">Fastsigns Margin vs. Markup Formula Safeguard:</strong>{' '}
            In commercial signage, mistaking a {targetMargin.toFixed(0)}% gross margin for a standard {targetMargin.toFixed(0)}% markup quotes this job at ${naiveMarkupPrice.toFixed(2)} instead of ${retailPrice.toFixed(2)}, leaking an immediate{' '}
            <strong className="text-red-600 font-extrabold font-mono">${profitLeakage.toFixed(2)} in lost profit</strong> on this single project.
          </div>
        </div>
      </div>

      {/* EXPORT WORK ORDER BUTTON */}
      <div className="mt-auto">
        <button
          onClick={handleExportJson}
          className="w-full py-3.5 px-6 rounded-xl bg-white border border-gray-300 hover:border-gray-900 text-gray-900 text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          {copiedJson ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">CoreBridge Work Order JSON Exported</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-[#F79223]" />
              <span>Export CoreBridge Work Order JSON</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}

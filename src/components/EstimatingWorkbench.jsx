import React, { useState } from 'react';
import { Sparkles, Building2, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';
import LeadTakeoff from './LeadTakeoff';
import TradeSourcing from './TradeSourcing';
import MarginEngine from './MarginEngine';
import { wholesaleVendors } from '../data/scenarios';

export default function EstimatingWorkbench({
  project,
  selectedPartnerId,
  onSelectPartner,
  wholesale,
  setWholesale,
  freight,
  setFreight,
  laborHours,
  setLaborHours,
  targetMargin,
  setTargetMargin,
  letterHeight,
  setLetterHeight,
  returnDepth,
  setReturnDepth,
  onTakeoffRun,
  showToast
}) {
  const [activeStep, setActiveStep] = useState('step1');

  const selectedPartner = wholesaleVendors[selectedPartnerId] || wholesaleVendors.dsw;
  const laborCost = laborHours * 75.0;
  const totalCogs = wholesale + freight + laborCost;
  const marginDec = targetMargin / 100.0;
  const retailPrice = totalCogs / (1.0 - marginDec);

  const handleStepChange = (step) => {
    setActiveStep(step);
    const element = document.getElementById('estimating-workbench');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const steps = [
    {
      id: 'step1',
      num: '01',
      title: 'Inbound RFP Takeoff',
      badge: 'NLP AI Parsing',
      summary: `${letterHeight}" Height • ${project.classification.split(' ')[0]}`,
      icon: Sparkles
    },
    {
      id: 'step2',
      num: '02',
      title: 'Wholesale Sourcing',
      badge: 'Trade Network',
      summary: `${selectedPartner.name.split(' ')[0]} (${selectedPartner.leadTime})`,
      icon: Building2
    },
    {
      id: 'step3',
      num: '03',
      title: 'Margin Protection',
      badge: 'CoreBridge ERP',
      summary: `${targetMargin.toFixed(0)}% GM • $${Math.round(retailPrice).toLocaleString()}`,
      icon: DollarSign
    }
  ];

  return (
    <section id="estimating-workbench" className="py-16 md:py-24 border-b border-gray-200/70 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-[#F79223]/30 mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#F79223] animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B45309] font-mono">
              Live Estimating Workbench
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111213] tracking-tight mb-2.5">
            Full Pipeline: Inbound Lead to CoreBridge Work Order
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Follow the 3-stage commercial sign estimating lifecycle. Extract engineering specs with AI, route to pre-cleared wholesale fabricators, and safeguard franchise gross margin.
          </p>
        </div>

        {/* WORKBENCH STEPPER TABS (FULL-WIDTH 3-STEP PIPELINE) */}
        <div className="mb-6 bg-white p-2 sm:p-2.5 rounded-2xl border border-gray-200/90 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = activeStep === s.id;
              
              return (
                <button
                  key={s.id}
                  onClick={() => handleStepChange(s.id)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#111213] text-white shadow-md shadow-black/10 ring-2 ring-[#F79223]'
                      : 'bg-gray-50/80 hover:bg-gray-100 text-gray-700 border border-gray-200/80'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                    isActive
                      ? 'bg-[#F79223] text-[#111213]'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}>
                    {s.num}
                  </div>
                  
                  <div className="min-w-0 pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold tracking-tight truncate">{s.title}</span>
                    </div>
                    <span className={`text-[11px] block truncate font-medium ${
                      isActive ? 'text-[#38BDF8]' : 'text-gray-400'
                    }`}>
                      {s.summary}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* WORKBENCH CONTENT CONTAINER (FOCUSED 1-STEP AT A TIME) */}
        <div className="transition-all duration-300">
          {activeStep === 'step1' && (
            <LeadTakeoff 
              project={project}
              onTakeoffRun={onTakeoffRun}
              letterHeight={letterHeight}
              setLetterHeight={setLetterHeight}
              returnDepth={returnDepth}
              setReturnDepth={setReturnDepth}
              onNextStep={() => handleStepChange('step2')}
              isGuided={true}
            />
          )}

          {activeStep === 'step2' && (
            <TradeSourcing 
              selectedPartnerId={selectedPartnerId}
              onSelectPartner={onSelectPartner}
              project={project}
              onNextStep={() => handleStepChange('step3')}
              onPrevStep={() => handleStepChange('step1')}
              isGuided={true}
            />
          )}

          {activeStep === 'step3' && (
            <MarginEngine 
              wholesale={wholesale}
              setWholesale={setWholesale}
              freight={freight}
              setFreight={setFreight}
              laborHours={laborHours}
              setLaborHours={setLaborHours}
              targetMargin={targetMargin}
              setTargetMargin={setTargetMargin}
              project={project}
              onPrevStep={() => handleStepChange('step2')}
              isGuided={true}
            />
          )}
        </div>

        {/* BOTTOM ESTIMATING HUD STATUS BAR */}
        <div className="mt-8 p-4 rounded-2xl bg-[#111213] text-white border border-gray-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* LEFT: JOB & CONTRACT IDENTITY */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-[#F79223]/40 flex items-center justify-center shrink-0">
              <span className="text-[#F79223] font-mono font-bold text-xs">FS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <strong className="text-xs font-bold text-gray-200">
                  {project.client.split('—')[0]}
                </strong>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                  {project.jobId}
                </span>
              </div>
              <span className="text-[11px] text-gray-400 block truncate">
                Subcontractor: <strong className="text-gray-300 font-semibold">{selectedPartner.name}</strong> • Lead: {selectedPartner.leadTime}
              </span>
            </div>
          </div>

          {/* RIGHT: ESTIMATING FINANCIAL METRICS */}
          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-gray-800 pt-3 md:pt-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Total COGS</span>
              <span className="text-xs font-mono font-bold text-gray-300">${totalCogs.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Target GM</span>
              <span className="text-xs font-mono font-extrabold text-[#F79223]">{targetMargin.toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Selling Price</span>
              <span className="text-sm font-mono font-extrabold text-[#38BDF8]">
                ${retailPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

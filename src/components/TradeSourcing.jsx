import React, { useState } from 'react';
import { Building2, Copy, Check, Clock, Phone, MapPin, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { wholesaleVendors } from '../data/scenarios';

export default function TradeSourcing({ 
  selectedPartnerId, 
  onSelectPartner, 
  project, 
  onNextStep,
  onPrevStep,
  isGuided = true 
}) {
  const vendors = Object.values(wholesaleVendors);
  const [copied, setCopied] = useState(false);
  const [includePattern, setIncludePattern] = useState(true);
  const [includeUL, setIncludeUL] = useState(true);
  const [includeLiftgate, setIncludeLiftgate] = useState(true);

  const selectedPartner = wholesaleVendors[selectedPartnerId] || wholesaleVendors.dsw;

  const handleCopyRfq = () => {
    const emailBody = `TO: ${selectedPartner.name} Estimating Queue (${selectedPartner.location})
FROM: Fastsigns Franchise Estimating & Sourcing Desk [Center #2041]
SUBJECT: RFQ: Wholesale Fabrication Quote - ${project.jobId}

Hello Team,

Please provide a wholesale fabrication quote, crating, and freight to our Fastsigns center [Zip 19001] for the following job specs:

Project: ${project.client}
Product: ${project.classification}
Dimensions: ${project.dims}
Face Material: ${project.face}
Returns / Depth: ${project.returns}
Back: ${project.back}
Illumination & Drivers: ${project.drivers}
Mounting Hardware: ${project.mounting}
1:1 Paper Installation Template: ${includePattern ? "YES (Required)" : "NO"}
UL 48 Electric Sign Label: ${includeUL ? "YES (Serialized Tag Required)" : "NO"}
Liftgate Delivery: ${includeLiftgate ? "YES" : "NO"}

Target Production Turnaround: Standard ${selectedPartner.leadTime} window.
Vector artwork ready in DXF/AI format upon PO issuance.

Thank you,
Jezreel Dave Leybag
Signage Estimator & Vendor Sourcing Specialist
Fastsigns Center Operations #2041`;

    navigator.clipboard.writeText(emailBody).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div id="trade-sourcing" className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 flex flex-col h-full">
      
      {/* CARD HEADER */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F79223]">
              STEP 02 • WHOLESALE FABRICATION
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h3 className="text-xl font-extrabold text-[#111213] tracking-tight">
            North American Trade Fabricators
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>Active Partner: {selectedPartner.name.split(' ')[0]}</span>
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-5 leading-relaxed">
        Fastsigns centers rely on pre-cleared wholesale partners to absorb overflow fabrication. Select a partner below to route specifications, dynamically update wholesale costs, and dispatch an RFQ package.
      </p>

      {/* VENDOR CARDS LIST */}
      <div className={`grid gap-3.5 mb-6 ${
        isGuided 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-2'
      }`}>
        {vendors.map((vendor) => {
          const isSelected = selectedPartnerId === vendor.id;
          const estBase = Math.round(project.baseCost * (vendor.costFactor || 1.0));
          const estFreight = Math.max(80, Math.round(project.freight + (vendor.freightDelta || 0)));
          
          return (
            <div
              key={vendor.id}
              onClick={() => onSelectPartner(vendor.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative text-left flex flex-col justify-between group ${
                isSelected
                  ? 'bg-gradient-to-b from-[#FFFDF9] to-white border-[#F79223] shadow-md shadow-[#F79223]/10 ring-2 ring-[#F79223]'
                  : 'bg-white border-gray-200 hover:border-gray-400 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <strong className="text-xs font-extrabold text-gray-900 block truncate">
                    {vendor.name}
                  </strong>
                  <span className="text-[10px] font-bold text-gray-500 font-mono">
                    {vendor.rating}
                  </span>
                </div>
                
                <div className="text-[11px] text-gray-500 flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate">{vendor.location}</span>
                </div>

                <div className="text-[10px] text-gray-600 flex items-center gap-1 mb-2 font-medium">
                  <Clock className="w-3 h-3 text-gray-400 shrink-0" />
                  <span>Lead Time: {vendor.leadTime}</span>
                </div>

                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 mb-3 truncate max-w-full">
                  {vendor.specialty}
                </span>
              </div>

              {/* ESTIMATED PRICING CHIP */}
              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-400 font-medium">Est. Base:</span>
                <span className="font-mono font-bold text-gray-800">${estBase.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* RFQ CUSTOMIZATION CHECKBOXES */}
      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 mb-6">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 block mb-2.5">
          Wholesale RFQ Mandatory Production Adders
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-semibold text-gray-700">
          <label className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-white transition-colors">
            <input 
              type="checkbox" 
              checked={includePattern} 
              onChange={(e) => setIncludePattern(e.target.checked)}
              className="rounded text-[#F79223] focus:ring-[#F79223]"
            />
            <span>1:1 Paper Template</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-white transition-colors">
            <input 
              type="checkbox" 
              checked={includeUL} 
              onChange={(e) => setIncludeUL(e.target.checked)}
              className="rounded text-[#F79223] focus:ring-[#F79223]"
            />
            <span>UL 48 Serial Tag</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-white transition-colors">
            <input 
              type="checkbox" 
              checked={includeLiftgate} 
              onChange={(e) => setIncludeLiftgate(e.target.checked)}
              className="rounded text-[#F79223] focus:ring-[#F79223]"
            />
            <span>Liftgate Delivery</span>
          </label>
        </div>
      </div>

      {/* FOOTER ACTION BAR */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-3">
        {onPrevStep ? (
          <button
            onClick={onPrevStep}
            className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Step 01</span>
          </button>
        ) : <div />}

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyRfq}
            className="py-2.5 px-4 rounded-xl bg-white border border-gray-300 hover:border-gray-900 text-gray-900 text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-98"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">RFQ Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#F79223]" />
                <span>Copy RFQ Dispatch</span>
              </>
            )}
          </button>

          {onNextStep && (
            <button
              onClick={onNextStep}
              className="py-2.5 px-5 rounded-xl bg-[#111213] hover:bg-black text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer group active:scale-98"
            >
              <span>Proceed to Step 03: Margin Engine</span>
              <ArrowRight className="w-4 h-4 text-[#F79223] group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

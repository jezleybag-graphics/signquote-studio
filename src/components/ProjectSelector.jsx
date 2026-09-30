import React from 'react';
import { Briefcase, CheckCircle2, ChevronRight } from 'lucide-react';
import { projectsData } from '../data/scenarios';

export default function ProjectSelector({ selectedProjectId, onSelectProject }) {
  const projects = Object.values(projectsData);

  return (
    <section id="projects" className="py-12 border-b border-gray-200/70 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER WITH CLEAR HIERARCHY */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#F79223] mb-2 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>COMMERCIAL CONTRACT ARCHETYPES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111213] tracking-tight">
              Select an Active Commercial Sign Submittal
            </h2>
          </div>
          <p className="text-xs text-gray-500 max-w-md">
            Clicking an archetype synchronizes all engineering parameters, architectural CAD blueprints, wholesale trade quotes, and CoreBridge ERP formulas.
          </p>
        </div>

        {/* 3 ELEGANT PROJECT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((proj) => {
            const isSelected = selectedProjectId === proj.id;
            return (
              <div 
                key={proj.id}
                onClick={() => onSelectProject(proj.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer relative text-left group ${
                  isSelected 
                    ? 'bg-gradient-to-b from-[#FFFDF9] to-white border-[#F79223] shadow-lg shadow-[#F79223]/10 ring-2 ring-[#F79223]/20' 
                    : 'bg-white border-gray-200/90 hover:border-gray-400 hover:shadow-md'
                }`}
              >
                {/* ACTIVE BADGE */}
                {isSelected && (
                  <span className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF6EB] text-[#F79223] text-[11px] font-extrabold border border-[#F79223]/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ACTIVE</span>
                  </span>
                )}

                <div className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {proj.jobId}
                </div>

                <h3 className="text-base font-extrabold text-[#111213] tracking-tight mb-1 group-hover:text-[#F79223] transition-colors">
                  {proj.client.split('—')[0]}
                </h3>

                <p className="text-xs text-gray-500 mb-4 line-clamp-1">
                  {proj.subtitle}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Contract Value</span>
                    <span className="text-sm font-extrabold font-mono text-[#111213]">{proj.contractValue}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Fabrication Type</span>
                    <span className="text-xs font-semibold text-gray-700">{proj.productionBadge}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

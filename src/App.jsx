import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectSelector from './components/ProjectSelector';
import ArchitecturalStudio from './components/ArchitecturalStudio';
import LeadTakeoff from './components/LeadTakeoff';
import TradeSourcing from './components/TradeSourcing';
import MarginEngine from './components/MarginEngine';
import RoiSection from './components/RoiSection';
import CandidateDrawer from './components/CandidateDrawer';
import StickyFooter from './components/StickyFooter';
import { projectsData } from './data/scenarios';
import { Check } from 'lucide-react';

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(() => {
    return localStorage.getItem('signquote_selected_project') || 'case3';
  });
  const project = projectsData[selectedProjectId] || projectsData.case3;

  // Active state
  const [selectedPartnerId, setSelectedPartnerId] = useState(project.partnerId);
  const [wholesale, setWholesale] = useState(project.baseCost);
  const [freight, setFreight] = useState(project.freight);
  const [laborHours, setLaborHours] = useState(project.laborHours);
  const [targetMargin, setTargetMargin] = useState(50.0);
  const [letterHeight, setLetterHeight] = useState(project.letterHeight);
  const [returnDepth, setReturnDepth] = useState(project.returnDepth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Sync state when project changes
  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    localStorage.setItem('signquote_selected_project', projectId);
    const newProj = projectsData[projectId];
    if (newProj) {
      setSelectedPartnerId(newProj.partnerId);
      setWholesale(newProj.baseCost);
      setFreight(newProj.freight);
      setLaborHours(newProj.laborHours);
      setLetterHeight(newProj.letterHeight);
      setReturnDepth(newProj.returnDepth);
      showToast(`Loaded: ${newProj.client.split('—')[0]}`);
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 2800);
  };

  const handleTakeoffRun = () => {
    showToast("Engineering takeoff synchronized with CAD & CoreBridge");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1B1B] font-sans antialiased pb-24">
      
      {/* 1. ULTRA-PREMIUM EXECUTIVE HEADER */}
      <Header onOpenDrawer={() => setIsDrawerOpen(true)} />

      {/* 2. SPACIOUS HERO SECTION */}
      <Hero onExploreClick={() => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 3. COMMERCIAL CONTRACT ARCHETYPES */}
      <ProjectSelector 
        selectedProjectId={selectedProjectId} 
        onSelectProject={handleSelectProject} 
      />

      {/* 4. ARCHITECTURAL CAD & ELEVATION STUDIO (FULL-WIDTH, BREATHING) */}
      <ArchitecturalStudio 
        project={project}
        letterHeight={letterHeight}
        returnDepth={returnDepth}
      />

      {/* 5. DUAL OPERATIONAL WORKBENCH (LEAD TAKEOFF & WHOLESALE MARGINS) */}
      <section className="py-16 md:py-24 border-b border-gray-200/70 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F79223] block mb-2">
              LIVE ESTIMATING WORKBENCH
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111213] tracking-tight mb-3">
              Full Pipeline: Inbound Lead to CoreBridge Work Order
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Test the AI intake parser, adjust wholesale freight assumptions, and watch the true gross margin protection formula dynamically safeguard franchise profitability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* LEFT: INBOUND LEAD INTAKE */}
            <div className="flex flex-col h-full">
              <LeadTakeoff 
                project={project}
                onTakeoffRun={handleTakeoffRun}
                letterHeight={letterHeight}
                setLetterHeight={setLetterHeight}
                returnDepth={returnDepth}
                setReturnDepth={setReturnDepth}
              />
            </div>

            {/* RIGHT: WHOLESALE SOURCING & COREBRIDGE MARGIN ENGINE */}
            <div className="flex flex-col gap-8 h-full">
              <TradeSourcing 
                selectedPartnerId={selectedPartnerId}
                onSelectPartner={(id) => {
                  setSelectedPartnerId(id);
                  showToast("Updated wholesale trade partner");
                }}
                project={project}
              />

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
              />
            </div>

          </div>

        </div>
      </section>

      {/* 6. ENTERPRISE ROI & SUBSTRATE COMPETENCY */}
      <RoiSection />

      {/* 7. SLIDE-OVER CANDIDATE DOSSIER DRAWER */}
      <CandidateDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />

      {/* 8. CONVERSION STICKY FOOTER */}
      <StickyFooter onOpenDrawer={() => setIsDrawerOpen(true)} />

      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111213] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-gray-800 animate-fade-in">
          <Check className="w-4 h-4 text-[#F79223]" />
          <span>{toastMsg}</span>
        </div>
      )}

    </div>
  );
}

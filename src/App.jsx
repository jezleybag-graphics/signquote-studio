import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectSelector from './components/ProjectSelector';
import ArchitecturalStudio from './components/ArchitecturalStudio';
import EstimatingWorkbench from './components/EstimatingWorkbench';
import RoiSection from './components/RoiSection';
import CandidateDrawer from './components/CandidateDrawer';
import WelcomeModal from './components/WelcomeModal';
import CertificateModal from './components/CertificateModal';
import StickyFooter from './components/StickyFooter';
import { projectsData, wholesaleVendors } from './data/scenarios';
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
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Auto-prompt Welcome Modal on first visit (after smooth initial render)
  useEffect(() => {
    const dismissed = localStorage.getItem('signquote_welcome_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsWelcomeModalOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

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

  const handleSelectPartner = (partnerId) => {
    setSelectedPartnerId(partnerId);
    const vendor = wholesaleVendors[partnerId];
    if (vendor && project) {
      const factor = vendor.costFactor || 1.0;
      const freightDelta = vendor.freightDelta || 0;
      const newWholesale = Math.round(project.baseCost * factor);
      const newFreight = Math.max(80, Math.round(project.freight + freightDelta));
      setWholesale(newWholesale);
      setFreight(newFreight);
      showToast(`Routed to ${vendor.name} • Base: $${newWholesale.toLocaleString()} • Freight: $${newFreight}`);
    } else {
      showToast("Updated wholesale trade partner");
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
      <Header 
        onOpenDrawer={() => setIsDrawerOpen(true)} 
        onOpenGuide={() => setIsWelcomeModalOpen(true)}
      />

      {/* 2. SPACIOUS HERO SECTION */}
      <Hero 
        onExploreClick={() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} 
        onOpenCertificate={() => setIsCertModalOpen(true)}
      />

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

      {/* 5. UNIFIED OPERATIONAL ESTIMATING WORKBENCH (FULL PIPELINE) */}
      <EstimatingWorkbench
        project={project}
        selectedPartnerId={selectedPartnerId}
        onSelectPartner={handleSelectPartner}
        wholesale={wholesale}
        setWholesale={setWholesale}
        freight={freight}
        setFreight={setFreight}
        laborHours={laborHours}
        setLaborHours={setLaborHours}
        targetMargin={targetMargin}
        setTargetMargin={setTargetMargin}
        letterHeight={letterHeight}
        setLetterHeight={setLetterHeight}
        returnDepth={returnDepth}
        setReturnDepth={setReturnDepth}
        onTakeoffRun={handleTakeoffRun}
        showToast={showToast}
      />

      {/* 6. ENTERPRISE ROI & SUBSTRATE COMPETENCY */}
      <RoiSection />

      {/* 7. SLIDE-OVER CANDIDATE DOSSIER DRAWER */}
      <CandidateDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onOpenCertificate={() => setIsCertModalOpen(true)}
      />

      {/* 8. EXECUTIVE WELCOME & ORIENTATION MODAL */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        onOpenDossier={() => setIsDrawerOpen(true)}
      />

      {/* 9. GOOGLE GEMINI CERTIFICATE MODAL */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />

      {/* 10. CONVERSION STICKY FOOTER */}
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

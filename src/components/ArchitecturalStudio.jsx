import React, { useState } from 'react';
import { 
  Layers, Sun, Moon, Printer, FileText, CheckCircle2, Info, Compass, 
  ShieldAlert, Zap, Search, Eye, Sparkles, Shield, ShieldCheck, Box, 
  Maximize2, Cpu, CircleDot, LayoutGrid, Droplets 
} from 'lucide-react';

// COMPONENT SCHEMATIC THUMBNAIL RENDERER
function ComponentVisualThumbnail({ item }) {
  const type = item?.iconType || item?.id;
  
  if (type === 'plaque') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-cyan-500/40 p-1 shrink-0 shadow-sm">
        <rect x="6" y="10" width="42" height="34" rx="4" fill="#0284C7" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="9" y="13" width="36" height="28" rx="2" fill="none" stroke="#7DD3FC" strokeWidth="0.75" strokeDasharray="2 1" />
        {[[10, 14], [44, 14], [10, 40], [44, 40]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill="#E2E8F0" stroke="#0284C7" strokeWidth="0.75" />
        ))}
      </svg>
    );
  }

  if (type === 'logo') {
    return (
      <div className="w-12 h-12 rounded-xl bg-[#111213] border border-[#F79223]/50 p-1 shrink-0 shadow-sm flex flex-col items-center justify-center gap-0.5">
        <img src="/branding/logo-mark.png" alt="J.STUDIO Logo" className="w-7 h-7 object-contain" />
        <span className="text-[7.5px] font-black tracking-wider text-[#F79223] font-mono leading-none">J.STUDIO</span>
      </div>
    );
  }

  if (type === 'standoffs') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-slate-600/40 p-1 shrink-0 shadow-sm">
        <circle cx="27" cy="27" r="14" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
        <circle cx="27" cy="27" r="9" fill="#334155" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="27" cy="27" r="4" fill="#F8FAFC" />
        <line x1="27" y1="9" x2="27" y2="45" stroke="#94A3B8" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
      </svg>
    );
  }

  if (type === 'lighting') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-amber-500/40 p-1 shrink-0 shadow-sm">
        <rect x="22" y="8" width="10" height="8" rx="2" fill="#94A3B8" />
        <polygon points="19,16 35,16 46,46 8,46" fill="#FDE047" fillOpacity="0.25" />
        <circle cx="27" cy="18" r="4" fill="#FEF08A" />
        <line x1="12" y1="46" x2="42" y2="46" stroke="#FDE047" strokeWidth="1" strokeDasharray="2 1" />
      </svg>
    );
  }

  if (type === 'metal-face') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-slate-700 p-1 shrink-0 shadow-sm">
        <rect x="8" y="10" width="38" height="34" rx="4" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" />
        <text x="27" y="33" fontSize="16" fontWeight="900" fill="#F8FAFC" textAnchor="middle">A</text>
        <circle cx="12" cy="14" r="1.5" fill="#38BDF8" />
        <circle cx="42" cy="14" r="1.5" fill="#38BDF8" />
      </svg>
    );
  }

  if (type === 'acrylic-face') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-red-500/40 p-1 shrink-0 shadow-sm">
        <rect x="8" y="10" width="38" height="34" rx="4" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
        <rect x="12" y="14" width="30" height="26" rx="2" fill="#FFFFFF" fillOpacity="0.3" />
        <text x="27" y="34" fontSize="15" fontWeight="900" fill="#FFFFFF" textAnchor="middle">M</text>
      </svg>
    );
  }

  if (type === 'trim') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-gray-600 p-1 shrink-0 shadow-sm">
        <path d="M 12 14 L 38 14 L 38 20 L 20 20 L 20 40 L 12 40 Z" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
        <rect x="20" y="20" width="22" height="20" fill="#EF4444" fillOpacity="0.7" />
        <text x="31" y="34" fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">1" TRIM</text>
      </svg>
    );
  }

  if (type === 'return') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-slate-700 p-1 shrink-0 shadow-sm">
        <path d="M 14 10 L 40 10 L 40 40 L 32 40 L 32 18 L 14 18 Z" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" />
        <circle cx="23" cy="14" r="1.5" fill="#38BDF8" />
        <circle cx="36" cy="29" r="1.5" fill="#38BDF8" />
        <text x="27" y="48" fontSize="6.5" fill="#94A3B8" fontWeight="bold" textAnchor="middle">ALUM RETURN</text>
      </svg>
    );
  }

  if (type === 'raceway') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-stone-600 p-1 shrink-0 shadow-sm">
        <rect x="8" y="14" width="38" height="26" rx="3" fill="#D6CEBE" stroke="#A89F8D" strokeWidth="1.5" />
        <rect x="14" y="20" width="16" height="14" rx="2" fill="#0F172A" />
        <circle cx="38" cy="27" r="3" fill="#EF4444" />
        <text x="27" y="47" fontSize="6" fill="#D6CEBE" fontWeight="bold" textAnchor="middle">7"x4.5" RACEWAY</text>
      </svg>
    );
  }

  if (type === 'drivers') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-amber-500/40 p-1 shrink-0 shadow-sm">
        <rect x="8" y="16" width="38" height="22" rx="3" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="14" cy="27" r="2" fill="#10B981" />
        <line x1="22" y1="23" x2="38" y2="23" stroke="#94A3B8" strokeWidth="1" />
        <line x1="22" y1="29" x2="38" y2="29" stroke="#94A3B8" strokeWidth="1" />
        <text x="27" y="45" fontSize="6.5" fill="#FEF08A" fontWeight="bold" textAnchor="middle">60W CLASS 2</text>
      </svg>
    );
  }

  if (type === 'leds') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-amber-500/40 p-1 shrink-0 shadow-sm">
        <rect x="12" y="18" width="30" height="18" rx="4" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
        <circle cx="27" cy="27" r="5" fill="#FEF08A" />
        <line x1="4" y1="27" x2="12" y2="27" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="42" y1="27" x2="50" y2="27" stroke="#1E293B" strokeWidth="1.5" />
        <text x="27" y="45" fontSize="6.5" fill="#FEF08A" fontWeight="bold" textAnchor="middle">12V IP67</text>
      </svg>
    );
  }

  if (type === 'polycarb') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-sky-500/40 p-1 shrink-0 shadow-sm">
        <rect x="10" y="10" width="34" height="34" rx="3" fill="#BAE6FD" fillOpacity="0.4" stroke="#0284C7" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="42" y2="42" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
        <circle cx="16" cy="16" r="2" fill="#0F172A" />
        <circle cx="38" cy="38" r="2" fill="#0F172A" />
        <text x="27" y="30" fontSize="7" fill="#0284C7" fontWeight="bold" textAnchor="middle">LEXAN</text>
      </svg>
    );
  }

  if (type === 'backer') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-gray-700 p-1 shrink-0 shadow-sm">
        <rect x="8" y="12" width="38" height="30" rx="3" fill="#090D16" stroke="#475569" strokeWidth="1.5" />
        <line x1="8" y1="20" x2="46" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="3 2" />
        <text x="27" y="32" fontSize="7" fill="#94A3B8" fontWeight="bold" textAnchor="middle">3MM ACM</text>
      </svg>
    );
  }

  if (type === 'weep') {
    return (
      <svg viewBox="0 0 54 54" className="w-12 h-12 rounded-xl bg-[#0F172A] border border-rose-500/40 p-1 shrink-0 shadow-sm">
        <circle cx="27" cy="27" r="14" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" />
        <path d="M 27 18 C 27 18 20 26 20 30 C 20 34 23 37 27 37 C 31 37 34 34 34 30 C 34 26 27 18 27 18 Z" fill="#38BDF8" />
        <circle cx="27" cy="27" r="2" fill="#FFFFFF" />
      </svg>
    );
  }

  return (
    <div className="w-12 h-12 rounded-xl bg-[#FFF6EB] flex items-center justify-center text-[#F79223] shrink-0 border border-[#F79223]/20 shadow-sm">
      <Info className="w-6 h-6" />
    </div>
  );
}

// TOGGLE BUTTON ICON RENDERER
function renderToggleIcon(iconType, isSelected) {
  const iconClass = `w-3.5 h-3.5 ${isSelected ? 'text-[#F79223]' : 'text-gray-500'}`;
  switch (iconType) {
    case 'plaque':
      return <Layers className={iconClass} />;
    case 'logo':
      return <Sparkles className={iconClass} />;
    case 'standoffs':
      return <CircleDot className={iconClass} />;
    case 'lighting':
      return <Sun className={iconClass} />;
    case 'metal-face':
      return <Shield className={iconClass} />;
    case 'acrylic-face':
      return <Layers className={iconClass} />;
    case 'trim':
      return <Maximize2 className={iconClass} />;
    case 'return':
      return <Box className={iconClass} />;
    case 'raceway':
      return <Cpu className={iconClass} />;
    case 'drivers':
      return <Zap className={iconClass} />;
    case 'leds':
      return <Zap className={iconClass} />;
    case 'polycarb':
      return <ShieldCheck className={iconClass} />;
    case 'backer':
      return <LayoutGrid className={iconClass} />;
    case 'weep':
      return <Droplets className={iconClass} />;
    default:
      return <CheckCircle2 className={iconClass} />;
  }
}

export default function ArchitecturalStudio({ project, letterHeight, returnDepth }) {
  const [viewMode, setViewMode] = useState('elev'); // 'elev' | 'cad' | 'elec' | 'cb'
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeInspector, setActiveInspector] = useState(project.inspectorItems[0]);

  // When project changes, update default active inspector
  React.useEffect(() => {
    if (project.inspectorItems && project.inspectorItems.length > 0) {
      setActiveInspector(project.inspectorItems[0]);
    }
  }, [project]);

  return (
    <section id="cad-studio" className="py-16 md:py-20 border-b border-gray-200/70 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER WITH AIRY PACING */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#F79223] mb-2 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              <span>ARCHITECTURAL SHOP DRAWINGS &amp; SUBMITTALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111213] tracking-tight">
              Interactive CAD Blueprints &amp; Storefront Elevation
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
              Authentic engineering submittal drawings prepared to FASTSIGNS® center standards. Toggle between storefront elevation, precision CAD cross-sections, UL 48 electrical schedules, and CoreBridge ERP work orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:border-gray-900 text-gray-800 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-gray-500" />
              <span>Print Submittal Sheet</span>
            </button>
          </div>
        </div>

        {/* MAIN STUDIO VIEWPORT CARD */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden">
          
          {/* STUDIO CONTROLS TOOLBAR */}
          <div className="px-6 py-4 border-b border-gray-200/80 bg-gray-50/70 flex flex-wrap items-center justify-between gap-4">
            
            {/* VIEW MODE TABS */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
              <button
                onClick={() => setViewMode('elev')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'elev' 
                    ? 'bg-[#111213] text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>Storefront Elevation</span>
              </button>
              <button
                onClick={() => setViewMode('cad')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'cad' 
                    ? 'bg-[#111213] text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>CAD Section Detail</span>
              </button>
              <button
                onClick={() => setViewMode('elec')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'elec' 
                    ? 'bg-[#111213] text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>UL 48 Electrical</span>
              </button>
              <button
                onClick={() => setViewMode('cb')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'cb' 
                    ? 'bg-[#111213] text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>CoreBridge Work Order</span>
              </button>
            </div>

            {/* RIGHT CONTROLS: ACTIVE INSPECTOR FOCUS HUD + ILLUMINATION TOGGLE */}
            <div className="flex items-center gap-3">
              {activeInspector && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-[#F79223]/30 text-xs font-mono font-bold text-gray-800 shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F79223] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F79223]"></span>
                  </span>
                  <span className="text-gray-400 font-semibold text-[10px] uppercase">Focus:</span>
                  <span className="text-[#F79223] uppercase font-extrabold tracking-wide">{activeInspector?.name}</span>
                </div>
              )}

              <button
                onClick={() => setIsNightMode(!isNightMode)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isNightMode 
                    ? 'bg-[#111213] border-[#111213] text-[#FEF08A] shadow-md shadow-black/10' 
                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-900'
                }`}
              >
                {isNightMode ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#FEF08A]" />
                    <span>Night Illumination Active</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#F79223]" />
                    <span>Daylight View</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* VIEWPORT CANVAS */}
          <div className="relative p-4 sm:p-8 bg-white flex flex-col items-center justify-center min-h-[420px]">

            {/* VIEW 1: ELEVATION VIEW */}
            {viewMode === 'elev' && (
              <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-gray-200/90 shadow-inner bg-gray-50">
                {/* CASE 1: APEX DENTAL ELEVATION */}
                {project.id === 'case1' && (
                  <svg viewBox="0 0 880 340" className="w-full h-auto block select-none">
                    <defs>
                      <pattern id="brick-pat-elev" width="44" height="22" patternUnits="userSpaceOnUse">
                        <rect width="44" height="22" fill={isNightMode ? "#0F172A" : "#334155"} />
                        <rect x="0" y="0" width="42" height="10" fill={isNightMode ? "#1E293B" : "#475569"} rx="1" />
                        <rect x="22" y="11" width="42" height="10" fill={isNightMode ? "#1E293B" : "#475569"} rx="1" />
                      </pattern>
                      <filter id="halo-glow-fx" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="blur" />
                        <feFlood floodColor="#FEF08A" floodOpacity="0.85" result="color" />
                        <feComposite in2="blur" operator="in" />
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* BRICK FACADE */}
                    <rect width="880" height="340" fill="url(#brick-pat-elev)" />
                    
                    {/* ARCHITECTURAL COPING */}
                    <rect x="0" y="0" width="880" height="30" fill={isNightMode ? "#090D16" : "#1E293B"} />
                    <text x="24" y="20" fontSize="9.5" fill="#94A3B8" fontWeight="700" letterSpacing="1.5">
                      NORTH ELEVATION • LEVEL 2 MAIN RETAIL ENTRANCE
                    </text>

                    {/* 3MM BLACK ACM BACKER TRAY */}
                    <rect 
                      x="70" y="60" width="740" height="150" rx="4" 
                      fill="#090D16" 
                      stroke={activeInspector?.id === 'backer' ? '#F79223' : '#334155'} 
                      strokeWidth={activeInspector?.id === 'backer' ? '3' : '2'} 
                    />
                    
                    {/* HALO GLOW LAYER (NIGHT MODE OR LED INSPECT) */}
                    {(isNightMode || activeInspector?.id === 'leds') && (
                      <g>
                        <text x="470" y="152" fontSize="52" fontWeight="800" fill="#FEF08A" textAnchor="middle" letterSpacing="14" filter="url(#halo-glow-fx)" opacity="0.95">
                          APEX DENTAL
                        </text>
                        <circle cx="160" cy="135" r="34" fill="#FEF08A" filter="url(#halo-glow-fx)" opacity="0.8" />
                      </g>
                    )}

                    {/* STANDOFF MARKERS */}
                    {activeInspector?.id === 'standoffs' && (
                      <g>
                        {[160, 260, 360, 470, 580, 680, 770].map((x, i) => (
                          <g key={i}>
                            <circle cx={x} cy="135" r="14" fill="none" stroke="#F79223" strokeWidth="2" strokeDasharray="3 3" />
                            <circle cx={x} cy="135" r="3" fill="#F79223" />
                          </g>
                        ))}
                      </g>
                    )}

                    {/* DENTAL LOGO EMBLEM */}
                    <g transform="translate(130, 100)">
                      <rect x="0" y="0" width="60" height="60" rx="14" fill="#0F172A" stroke="#475569" strokeWidth="2" />
                      <path d="M 20 30 L 40 30 M 30 20 L 30 40" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="30" cy="30" r="18" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
                    </g>

                    {/* CHANNEL LETTERS */}
                    {!isNightMode && (
                      <text x="472" y="154" fontSize="50" fontWeight="800" fill="#000000" textAnchor="middle" letterSpacing="14" opacity="0.65">
                        APEX DENTAL
                      </text>
                    )}
                    <text 
                      x="470" y="152" fontSize="50" fontWeight="800" 
                      fill="#0F172A" 
                      stroke={activeInspector?.id === 'face' ? '#F79223' : '#1E293B'} 
                      strokeWidth={activeInspector?.id === 'face' ? '3' : '1.5'} 
                      textAnchor="middle" letterSpacing="14"
                    >
                      APEX DENTAL
                    </text>

                    {/* SUB-TITLE ON BACKER */}
                    <text x="470" y="185" fontSize="10.5" fontWeight="700" fill="#38BDF8" textAnchor="middle" letterSpacing="5">
                      FAMILY &amp; COSMETIC DENTISTRY
                    </text>

                    {/* STOREFRONT WINDOWS */}
                    <rect x="0" y="260" width="880" height="80" fill="#0F172A" opacity="0.95" />
                    <rect x="70" y="270" width="220" height="70" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                    <rect x="330" y="270" width="220" height="70" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                    <rect x="590" y="270" width="220" height="70" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                    <text x="440" y="305" fontSize="10" fill="#64748B" textAnchor="middle" fontWeight="600">
                      SUITE 104 • ENTRANCE VESTIBULE GLASS
                    </text>

                    {/* CAD DIMENSIONS */}
                    <line x1="70" y1="45" x2="810" y2="45" stroke="#38BDF8" strokeWidth="1.2" />
                    <line x1="70" y1="40" x2="70" y2="50" stroke="#38BDF8" strokeWidth="1.2" />
                    <line x1="810" y1="40" x2="810" y2="50" stroke="#38BDF8" strokeWidth="1.2" />
                    <rect x="355" y="35" width="170" height="20" fill="#0F172A" rx="4" />
                    <text x="440" y="49" fontSize="10" fill="#38BDF8" textAnchor="middle" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                      14'-0" [168.0"] OVERALL SPAN
                    </text>
                  </svg>
                )}

                {/* CASE 2: METRO BURGER ELEVATION */}
                {project.id === 'case2' && (
                  <svg viewBox="0 0 880 340" className="w-full h-auto block select-none">
                    <rect width="880" height="340" fill={isNightMode ? "#0F172A" : "#E2E8F0"} />
                    
                    {/* Horizontal Timber Cladding */}
                    <g opacity={isNightMode ? "0.1" : "0.3"}>
                      {[40, 60, 80, 100, 120, 140, 160, 180].map(y => (
                        <line key={y} x1="0" y1={y} x2="880" y2={y} stroke="#78350F" strokeWidth="14" />
                      ))}
                    </g>

                    {/* 7" x 4.5" EXTRUDED RACEWAY */}
                    <rect 
                      x="60" y="160" width="760" height="42" 
                      fill="#D6CEBE" 
                      stroke={activeInspector?.id === 'raceway' ? '#F79223' : '#A89F8D'} 
                      strokeWidth={activeInspector?.id === 'raceway' ? '3' : '2'} 
                      rx="2" 
                    />
                    <text x="75" y="152" fontSize="9.5" fill={activeInspector?.id === 'raceway' ? '#D97706' : '#57534E'} fontWeight="700">
                      7" x 4.5" EXTRUDED ALUMINUM RACEWAY (PAINTED KHAKI BEIGE)
                    </text>

                    {/* INTERNAL DRIVERS INSPECTION OVERLAY */}
                    {activeInspector?.id === 'drivers' && (
                      <g>
                        {[160, 430, 700].map((dx, i) => (
                          <g key={i}>
                            <rect x={dx} y="166" width="60" height="30" rx="4" fill="#0F172A" stroke="#F79223" strokeWidth="2" />
                            <text x={dx + 30} y="184" fontSize="7.5" fill="#FEF08A" fontWeight="bold" textAnchor="middle">60W UL</text>
                          </g>
                        ))}
                      </g>
                    )}

                    {/* FRONT-LIT RED CHANNEL LETTERS */}
                    <text 
                      x="440" y="150" fontSize="64" fontWeight="900" 
                      fill="#0F172A" 
                      stroke={activeInspector?.id === 'trim' ? '#F79223' : '#0F172A'} 
                      strokeWidth={activeInspector?.id === 'trim' ? '16' : '12'} 
                      strokeLinejoin="round" textAnchor="middle" letterSpacing="8"
                    >
                      METRO BURGER
                    </text>
                    <text 
                      x="440" y="150" fontSize="64" fontWeight="900" 
                      fill={isNightMode ? "#FF4D4D" : (activeInspector?.id === 'face' ? '#EF4444' : '#DC2626')} 
                      textAnchor="middle" letterSpacing="8"
                      stroke={activeInspector?.id === 'face' ? '#FEF08A' : 'none'}
                      strokeWidth={activeInspector?.id === 'face' ? '2' : '0'}
                      style={{ filter: (isNightMode || activeInspector?.id === 'face') ? 'drop-shadow(0 0 18px rgba(239, 68, 68, 0.95))' : 'none' }}
                    >
                      METRO BURGER
                    </text>

                    {/* DIMENSION CHAINS */}
                    <line x1="60" y1="40" x2="820" y2="40" stroke="#0284C7" strokeWidth="1.2" />
                    <rect x="350" y="29" width="180" height="22" fill="#0F172A" rx="4" />
                    <text x="440" y="44" fontSize="10" fill="#38BDF8" textAnchor="middle" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                      18'-0" [216.0"] OVERALL SPAN
                    </text>

                    {/* STOREFRONT WINDOWS */}
                    <rect x="40" y="240" width="800" height="100" fill="#1E293B" opacity="0.9" />
                    <text x="440" y="290" fontSize="11" fill="#94A3B8" textAnchor="middle" fontWeight="600">
                      UNIT 12 • SHOPPES AT LEGACY CREEK
                    </text>
                  </svg>
                )}

                {/* CASE 3: J.STUDIO ARCHITECTURAL ELEVATION (WITH JEZREEL'S BRANDING) */}
                {project.id === 'case3' && (
                  <svg viewBox="0 0 880 340" className="w-full h-auto block select-none">
                    <rect width="880" height="340" fill={isNightMode ? "#090D16" : "#F8FAFC"} />
                    
                    {/* ACOUSTIC WOOD SLATS */}
                    <g opacity="0.15">
                      <rect x="640" y="0" width="240" height="340" fill="#475569" />
                    </g>

                    {/* OVERHEAD GALLERY SPOTLIGHT WASH */}
                    {(isNightMode || activeInspector?.id === 'lighting') && (
                      <polygon points="320,0 560,0 700,320 180,320" fill="#FEF08A" opacity={activeInspector?.id === 'lighting' ? "0.32" : "0.18"} />
                    )}

                    {/* 48" x 72" CLEAR ACRYLIC PLAQUE */}
                    <rect x="200" y="55" width="480" height="230" rx="8" fill="#0F172A" opacity="0.08" />
                    <rect 
                      x="190" y="45" width="480" height="230" rx="8" 
                      fill="#E0F2FE" opacity="0.5" 
                      stroke={activeInspector?.id === 'plaque' ? '#F79223' : '#38BDF8'} 
                      strokeWidth={activeInspector?.id === 'plaque' ? '3' : '2'} 
                    />
                    
                    {/* 6x GYFORD MACHINED STAINLESS STANDOFFS (4 CORNERS + 2 MID PERIMETER) */}
                    {[
                      [220, 65], [640, 65],
                      [220, 160], [640, 160],
                      [220, 255], [640, 255]
                    ].map(([cx, cy], i) => (
                      <g key={i}>
                        {activeInspector?.id === 'standoffs' && (
                          <circle cx={cx} cy={cy} r="18" fill="none" stroke="#F79223" strokeWidth="2" strokeDasharray="3 3" />
                        )}
                        <circle cx={cx} cy={cy} r="10" fill={activeInspector?.id === 'standoffs' ? "#F79223" : "#94A3B8"} stroke="#475569" strokeWidth="2" />
                        <circle cx={cx} cy={cy} r="4" fill="#CBD5E1" />
                      </g>
                    ))}

                    {/* J.STUDIO ARCHITECTURAL BRAND EMBLEM & TYPOGRAPHY */}
                    <g transform="translate(430, 160)">
                      {/* ACTIVE SELECTION GLOW / FOCUS RING */}
                      {activeInspector?.id === 'logo' && (
                        <rect 
                          x="-135" y="-72" width="270" height="142" rx="14" 
                          fill="rgba(247, 146, 35, 0.07)" 
                          stroke="#F79223" strokeWidth="1.5" strokeDasharray="4 3" 
                        />
                      )}

                      {/* AUTHENTIC BRAND EMBLEM (JEZREEL DAVE LEYBAG OFFICIAL MARK) */}
                      <image 
                        href={isNightMode ? "/branding/logo-mark-light.png" : "/branding/logo-mark.png"} 
                        x="-27" y="-64" width="54" height="57" 
                        preserveAspectRatio="xMidYMid meet"
                        style={{ filter: isNightMode ? 'drop-shadow(0 0 12px rgba(254, 240, 138, 0.8))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))' }}
                      />

                      {/* J.STUDIO TYPOGRAPHY - REFINED DUAL-TONE ORANGE/OBSIDIAN */}
                      <text 
                        x="0" y="26" fontSize="24" fontWeight="900" 
                        textAnchor="middle" letterSpacing="2.5"
                        fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                      >
                        <tspan fill="#F79223">J.</tspan>
                        <tspan fill={activeInspector?.id === 'logo' ? '#D97706' : (isNightMode ? '#F8FAFC' : '#111213')}>STUDIO</tspan>
                      </text>

                      {/* PRIMARY ARCHITECTURAL TAGLINE */}
                      <text 
                        x="0" y="44" fontSize="8" fontWeight="700" 
                        fill={isNightMode ? "#94A3B8" : "#475569"} 
                        textAnchor="middle" letterSpacing="3.5"
                        fontFamily="'Inter', -apple-system, sans-serif"
                      >
                        ARCHITECTURAL DESIGN &amp; SIGNAGE
                      </text>

                      {/* SECONDARY EXECUTIVE SUITE IDENTIFIER */}
                      <text 
                        x="0" y="58" fontSize="6.5" fontWeight="600" 
                        fill={isNightMode ? "#64748B" : "#64748B"} 
                        textAnchor="middle" letterSpacing="1.8"
                        fontFamily="'Inter', -apple-system, sans-serif"
                      >
                        JEZREEL DAVE LEYBAG • EXECUTIVE SUITE 400
                      </text>
                    </g>

                    {/* DIMENSION STRINGS */}
                    <line x1="190" y1="30" x2="670" y2="30" stroke="#0284C7" strokeWidth="1.2" />
                    <rect x="350" y="19" width="160" height="20" fill="#0F172A" rx="4" />
                    <text x="430" y="33" fontSize="10" fill="#38BDF8" textAnchor="middle" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                      72.0" [6'-0"] PLAQUE WIDTH
                    </text>
                  </svg>
                )}
              </div>
            )}

            {/* VIEW 2: HIGH-FIDELITY ARCHITECTURAL CAD SECTION DETAIL */}
            {viewMode === 'cad' && (
              <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-gray-300 shadow-sm bg-white">
                
                {/* CASE 1: CAD SECTION A-A (APEX DENTAL - REVERSE HALO) */}
                {project.id === 'case1' && (
                  <svg viewBox="0 0 960 480" className="w-full h-auto block select-none font-sans bg-[#F8FAFC]">
                    <defs>
                      <pattern id="blueprint-grid-1" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.75" />
                      </pattern>
                      <pattern id="brick-hatch-cad-1" width="16" height="16" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="0" y2="16" stroke="#94A3B8" strokeWidth="1.5" />
                      </pattern>
                      <pattern id="pe-core-hatch-1" width="8" height="8" patternUnits="userSpaceOnUse">
                        <rect width="8" height="8" fill="#1E293B" />
                      </pattern>
                    </defs>

                    <rect width="960" height="480" fill="url(#blueprint-grid-1)" />
                    <rect x="15" y="15" width="930" height="450" fill="none" stroke="#94A3B8" strokeWidth="1.5" />

                    {/* DRAWING HEADER */}
                    <g transform="translate(30, 22)">
                      <text x="0" y="14" fontSize="11" fontWeight="800" fill="#0F172A" letterSpacing="0.8">
                        SECTION A-A: REVERSE HALO-LIT CHANNEL LETTER PROFILE
                      </text>
                      <text x="0" y="27" fontSize="8" fill="#64748B" fontWeight="600">
                        SCALE: 3" = 1'-0" [HALF SIZE: N.T.S.] • FASTSIGNS COMMERCIAL SPEC CAD-01
                      </text>
                    </g>

                    {/* 1. FACADE BRICK WALL */}
                    <rect x="780" y="65" width="130" height="280" fill="url(#brick-hatch-cad-1)" stroke="#475569" strokeWidth="2" />
                    <text x="845" y="362" fontSize="9" fontWeight="700" fill="#475569" textAnchor="middle">
                      SPLIT-FACE BRICK
                    </text>

                    {/* Anchors */}
                    <rect x="730" y="120" width="70" height="12" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                    <polygon points="800,120 815,126 800,132" fill="#475569" />
                    <rect x="730" y="250" width="70" height="12" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                    <polygon points="800,250 815,256 800,262" fill="#475569" />

                    {/* Conduit */}
                    <rect x="690" y="185" width="140" height="16" fill="#E2E8F0" stroke="#0284C7" strokeWidth="1.5" />
                    <path d="M 770 178 Q 775 193 770 208" stroke="#0284C7" strokeWidth="3" fill="none" />

                    {/* 3. 3MM BLACK ACM BACKER PANEL */}
                    <rect 
                      x="675" y="75" width="14" height="260" 
                      fill="url(#pe-core-hatch-1)" 
                      stroke={activeInspector?.id === 'backer' ? '#F79223' : '#0F172A'} 
                      strokeWidth={activeInspector?.id === 'backer' ? '3' : '1.5'} 
                      rx="1" 
                    />

                    {/* 4. 1.5" STANDOFF BARRELS */}
                    <rect 
                      x="595" y="115" width="80" height="22" 
                      fill="#CBD5E1" 
                      stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#334155'} 
                      strokeWidth={activeInspector?.id === 'standoffs' ? '3' : '1.5'} 
                    />
                    <line x1="585" y1="126" x2="730" y2="126" stroke="#0F172A" strokeWidth="2.5" strokeDasharray="4 2" />
                    <rect 
                      x="595" y="245" width="80" height="22" 
                      fill="#CBD5E1" 
                      stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#334155'} 
                      strokeWidth={activeInspector?.id === 'standoffs' ? '3' : '1.5'} 
                    />
                    <line x1="585" y1="256" x2="730" y2="256" stroke="#0F172A" strokeWidth="2.5" strokeDasharray="4 2" />

                    {/* 5. POLYCARBONATE BACK */}
                    <rect 
                      x="583" y="90" width="12" height="210" 
                      fill="#BAE6FD" opacity="0.65" 
                      stroke={activeInspector?.id === 'polycarb' ? '#F79223' : '#0284C7'} 
                      strokeWidth={activeInspector?.id === 'polycarb' ? '3' : '1.5'} 
                    />

                    {/* 6. ALUMINUM RETURN SIDEWALLS */}
                    <rect 
                      x="295" y="90" width="288" height="8" 
                      fill="#1E293B" 
                      stroke={activeInspector?.id === 'return' ? '#F79223' : 'none'} 
                      strokeWidth={activeInspector?.id === 'return' ? '2' : '0'} 
                    />
                    <rect x="565" y="98" width="18" height="12" fill="#334155" />
                    <rect 
                      x="295" y="292" width="288" height="8" 
                      fill="#1E293B" 
                      stroke={activeInspector?.id === 'return' ? '#F79223' : 'none'} 
                      strokeWidth={activeInspector?.id === 'return' ? '2' : '0'} 
                    />
                    <rect x="565" y="280" width="18" height="12" fill="#334155" />

                    {/* 7. ALUMINUM FACE */}
                    <rect 
                      x="280" y="85" width="15" height="220" 
                      fill="#0F172A" 
                      stroke={activeInspector?.id === 'face' ? '#F79223' : '#0F172A'} 
                      strokeWidth={activeInspector?.id === 'face' ? '3' : '2'} 
                      rx="1" 
                    />

                    {/* 8. 12V LED MODULES */}
                    {[115, 185, 255].map((y, idx) => (
                      <g key={idx}>
                        <rect 
                          x="435" y={y} width="30" height="18" rx="3" 
                          fill="#F59E0B" 
                          stroke={activeInspector?.id === 'leds' ? '#F79223' : '#D97706'} 
                          strokeWidth={activeInspector?.id === 'leds' ? '2.5' : '1.5'} 
                        />
                        <circle cx="450" cy={y + 9} r="4" fill="#FEF08A" />
                      </g>
                    ))}

                    {/* 9. WEEP HOLE WITH DEDICATED LEADER LINE */}
                    <circle cx="340" cy="296" r="3.5" fill="#FFFFFF" stroke={activeInspector?.id === 'weep' ? '#F79223' : '#EF4444'} strokeWidth="2" />
                    <line x1="340" y1="300" x2="315" y2="326" stroke="#EF4444" strokeWidth="1" />
                    <line x1="315" y1="326" x2="240" y2="326" stroke="#EF4444" strokeWidth="1" />
                    <text x="235" y="324" fontSize="7.5" fill="#EF4444" fontWeight="800" textAnchor="end">
                      1/4" WEEP HOLE {activeInspector?.id === 'weep' && '★'}
                    </text>
                    <text x="235" y="334" fontSize="6.5" fill="#64748B" textAnchor="end">
                      Condensation Drainage
                    </text>

                    {/* RETURN DEPTH DIMENSION LINE */}
                    <line x1="295" y1="348" x2="583" y2="348" stroke="#475569" strokeWidth="1.2" />
                    <line x1="295" y1="342" x2="295" y2="354" stroke="#475569" strokeWidth="1.2" />
                    <line x1="583" y1="342" x2="583" y2="354" stroke="#475569" strokeWidth="1.2" />
                    <rect x="384" y="341" width="110" height="14" fill="#F8FAFC" rx="2" />
                    <text x="439" y="352" fontSize="8" fontWeight="800" fill="#0F172A" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">
                      3.50" RETURN DEPTH
                    </text>

                    {/* STANDOFF PROJECTION DIMENSION LINE */}
                    <line x1="595" y1="190" x2="675" y2="190" stroke="#475569" strokeWidth="1.2" />
                    <line x1="595" y1="184" x2="595" y2="196" stroke="#475569" strokeWidth="1.2" />
                    <line x1="675" y1="184" x2="675" y2="196" stroke="#475569" strokeWidth="1.2" />
                    <rect x="617" y="183" width="36" height="14" fill="#F8FAFC" rx="2" />
                    <text x="635" y="193" fontSize="7.5" fontWeight="800" fill="#0F172A" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">
                      1.50"
                    </text>

                    {/* CALLOUT LABELS */}
                    {/* Face Callout */}
                    <line x1="285" y1="110" x2="160" y2="93" stroke={activeInspector?.id === 'face' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'face' ? '1.5' : '1'} />
                    <rect x="25" y="80" width="135" height="26" rx="4" fill={activeInspector?.id === 'face' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'face' ? '#F79223' : '#CBD5E1'} />
                    <text x="150" y="92" fontSize="8" fill={activeInspector?.id === 'face' ? '#FFFFFF' : '#0F172A'} fontWeight="800" textAnchor="end">
                      0.063" 5052-H32 FACE {activeInspector?.id === 'face' && '★'}
                    </text>
                    <text x="150" y="101" fontSize="6.5" fill={activeInspector?.id === 'face' ? '#FFFFFF' : '#64748B'} textAnchor="end">
                      Satin Black Polyurethane
                    </text>

                    {/* Return Callout */}
                    <line x1="390" y1="90" x2="440" y2="55" stroke={activeInspector?.id === 'return' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'return' ? '1.5' : '1'} />
                    <rect x="440" y="42" width="155" height="26" rx="4" fill={activeInspector?.id === 'return' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'return' ? '#F79223' : '#CBD5E1'} />
                    <text x="448" y="54" fontSize="8" fill={activeInspector?.id === 'return' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      3.50" DEPTH ALUM RETURN {activeInspector?.id === 'return' && '★'}
                    </text>
                    <text x="448" y="63" fontSize="6.5" fill={activeInspector?.id === 'return' ? '#FFFFFF' : '#64748B'}>
                      0.040" Flanged Sidewalls
                    </text>

                    {/* LEDs Callout */}
                    <line x1="465" y1="194" x2="520" y2="175" stroke={activeInspector?.id === 'leds' ? '#F79223' : '#D97706'} strokeWidth={activeInspector?.id === 'leds' ? '1.5' : '1'} />
                    <rect x="520" y="162" width="140" height="26" rx="4" fill={activeInspector?.id === 'leds' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'leds' ? '#F79223' : '#CBD5E1'} />
                    <text x="528" y="174" fontSize="8" fill={activeInspector?.id === 'leds' ? '#FFFFFF' : '#D97706'} fontWeight="800">
                      12V IP67 LED MODULES {activeInspector?.id === 'leds' && '★'}
                    </text>
                    <text x="528" y="183" fontSize="6.5" fill={activeInspector?.id === 'leds' ? '#FFFFFF' : '#64748B'}>
                      6500K Halo Illumination
                    </text>

                    {/* Standoff Callout */}
                    <line x1="635" y1="137" x2="615" y2="139" stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'standoffs' ? '1.5' : '1'} />
                    <rect x="615" y="126" width="145" height="26" rx="4" fill={activeInspector?.id === 'standoffs' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#CBD5E1'} />
                    <text x="623" y="138" fontSize="8" fill={activeInspector?.id === 'standoffs' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      1.50" MACHINED STANDOFF {activeInspector?.id === 'standoffs' && '★'}
                    </text>
                    <text x="623" y="147" fontSize="6.5" fill={activeInspector?.id === 'standoffs' ? '#FFFFFF' : '#64748B'}>
                      6061-T6 Aluminum Barrel
                    </text>

                    {/* FASTSIGNS TITLE BLOCK */}
                    <g transform="translate(500, 380)">
                      <rect x="0" y="0" width="420" height="70" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.2" />
                      <line x1="135" y1="0" x2="135" y2="70" stroke="#0F172A" strokeWidth="1" />
                      <line x1="290" y1="0" x2="290" y2="70" stroke="#0F172A" strokeWidth="1" />
                      <line x1="135" y1="35" x2="420" y2="35" stroke="#0F172A" strokeWidth="1" />
                      
                      <text x="10" y="20" fontSize="11" fontWeight="900" fill="#C5221F" letterSpacing="1">FASTSIGNS®</text>
                      <text x="10" y="34" fontSize="7.5" fontWeight="700" fill="#0F172A">COMMERCIAL OPS #2041</text>
                      <text x="10" y="47" fontSize="7.5" fill="#64748B">12+ YRS FASTSIGNS FRANCHISE</text>
                      <text x="10" y="60" fontSize="7.5" fill="#059669" fontWeight="700">UL 48 LISTED ENCLOSURE</text>

                      <text x="145" y="15" fontSize="7" fill="#64748B" fontWeight="700">PROJECT / CLIENT</text>
                      <text x="145" y="28" fontSize="8" fontWeight="800" fill="#0F172A">{project.client.split('—')[0]}</text>
                      <text x="145" y="49" fontSize="7" fill="#64748B" fontWeight="700">PRE-FLIGHT ESTIMATOR</text>
                      <text x="145" y="62" fontSize="7.5" fontWeight="800" fill="#0369A1">Jezreel Dave Leybag (Gemini Cert)</text>

                      <text x="300" y="15" fontSize="7" fill="#64748B" fontWeight="700">DWG NO. / REV</text>
                      <text x="300" y="28" fontSize="8" fontWeight="800" fill="#0F172A">CAD-01 • REV B</text>
                      <text x="300" y="49" fontSize="7" fill="#64748B" fontWeight="700">PERMIT STATUS</text>
                      <text x="300" y="62" fontSize="8" fontWeight="800" fill="#059669">APPROVED FOR PERMIT</text>
                    </g>
                  </svg>
                )}

                {/* CASE 2: CAD SECTION B-B (METRO BURGER - FRONT-LIT ON RACEWAY) */}
                {project.id === 'case2' && (
                  <svg viewBox="0 0 960 480" className="w-full h-auto block select-none font-sans bg-[#F8FAFC]">
                    <defs>
                      <pattern id="blueprint-grid-2" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.75" />
                      </pattern>
                      <pattern id="timber-hatch" width="12" height="12" patternTransform="rotate(25 0 0)" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="0" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
                      </pattern>
                    </defs>

                    <rect width="960" height="480" fill="url(#blueprint-grid-2)" />
                    <rect x="15" y="15" width="930" height="450" fill="none" stroke="#94A3B8" strokeWidth="1.5" />

                    {/* DRAWING HEADER */}
                    <g transform="translate(30, 22)">
                      <text x="0" y="14" fontSize="11" fontWeight="800" fill="#0F172A" letterSpacing="0.8">
                        SECTION B-B: FRONT-LIT CHANNEL LETTER ON EXTRUDED RACEWAY
                      </text>
                      <text x="0" y="27" fontSize="8" fill="#64748B" fontWeight="600">
                        SCALE: 3" = 1'-0" [HALF SIZE: N.T.S.] • FASTSIGNS COMMERCIAL SPEC CAD-02
                      </text>
                    </g>

                    {/* 1. STOREFRONT BUILDING FASCIA */}
                    <rect x="800" y="65" width="110" height="280" fill="url(#timber-hatch)" stroke="#475569" strokeWidth="2" />
                    <text x="855" y="362" fontSize="9" fontWeight="700" fill="#475569" textAnchor="middle">
                      BUILDING FASCIA
                    </text>

                    {/* Fascia Lag Bolts */}
                    <rect x="740" y="140" width="70" height="12" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                    <rect x="740" y="230" width="70" height="12" fill="#94A3B8" stroke="#334155" strokeWidth="1" />

                    {/* 2. 7" x 4.5" EXTRUDED ALUMINUM RACEWAY WIREWAY */}
                    <rect 
                      x="610" y="105" width="140" height="180" rx="4"
                      fill="#D6CEBE" 
                      stroke={activeInspector?.id === 'raceway' ? '#F79223' : '#78716C'} 
                      strokeWidth={activeInspector?.id === 'raceway' ? '3' : '2'} 
                    />
                    <text x="680" y="128" fontSize="9" fill="#44403C" fontWeight="800" textAnchor="middle">
                      7" x 4.5" WIREWAY
                    </text>

                    {/* 3. UL CLASS 2 DRIVERS INSIDE RACEWAY */}
                    <rect 
                      x="635" y="145" width="90" height="50" rx="4"
                      fill="#0F172A" 
                      stroke={activeInspector?.id === 'drivers' ? '#F79223' : '#38BDF8'} 
                      strokeWidth={activeInspector?.id === 'drivers' ? '2.5' : '1.5'} 
                    />
                    <text x="680" y="166" fontSize="8" fill="#FEF08A" fontWeight="800" textAnchor="middle">
                      60W UL DRIVER
                    </text>
                    <text x="680" y="178" fontSize="7" fill="#94A3B8" textAnchor="middle">
                      12V DC Constant V
                    </text>

                    {/* Disconnect Toggle */}
                    <circle cx="680" cy="245" r="7" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
                    <text x="680" y="268" fontSize="6.5" fill="#57534E" textAnchor="middle" fontWeight="bold">UL TOGGLE</text>

                    {/* 4. CHANNEL LETTER CAN */}
                    <rect x="590" y="90" width="14" height="210" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
                    
                    {/* 5" Return Sidewalls */}
                    <rect 
                      x="230" y="90" width="360" height="10" 
                      fill="#0F172A" 
                      stroke={activeInspector?.id === 'return' ? '#F79223' : '#1E293B'} 
                      strokeWidth={activeInspector?.id === 'return' ? '2' : '0'} 
                    />
                    <rect 
                      x="230" y="290" width="360" height="10" 
                      fill="#0F172A" 
                      stroke={activeInspector?.id === 'return' ? '#F79223' : '#1E293B'} 
                      strokeWidth={activeInspector?.id === 'return' ? '2' : '0'} 
                    />

                    {/* 5. 3/16" SIGN WHITE ACRYLIC FACE */}
                    <rect 
                      x="215" y="86" width="16" height="218" rx="1"
                      fill="#FFFFFF" 
                      stroke={activeInspector?.id === 'face' ? '#F79223' : '#EF4444'} 
                      strokeWidth={activeInspector?.id === 'face' ? '3' : '2'} 
                    />
                    <rect x="215" y="86" width="4" height="218" fill="#DC2626" />

                    {/* 6. 1" JEWELITE BUTYRATE TRIM CAP */}
                    <rect 
                      x="208" y="82" width="30" height="16" rx="2"
                      fill="#1E293B" 
                      stroke={activeInspector?.id === 'trim' ? '#F79223' : '#0F172A'} 
                      strokeWidth={activeInspector?.id === 'trim' ? '2.5' : '1.5'} 
                    />
                    <rect 
                      x="208" y="292" width="30" height="16" rx="2"
                      fill="#1E293B" 
                      stroke={activeInspector?.id === 'trim' ? '#F79223' : '#0F172A'} 
                      strokeWidth={activeInspector?.id === 'trim' ? '2.5' : '1.5'} 
                    />

                    {/* Dual-Row High Output LEDs */}
                    {[125, 160, 220, 260].map((y, idx) => (
                      <g key={idx}>
                        <rect x="520" y={y} width="26" height="16" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
                        <circle cx="533" cy={y + 8} r="3" fill="#FEF08A" />
                        <path d={`M 520 ${y+8} L 240 ${y-10} M 520 ${y+8} L 240 ${y+25}`} stroke="#FEF08A" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
                      </g>
                    ))}

                    {/* WEEP HOLE WITH DEDICATED LEADER LINE */}
                    <circle cx="280" cy="296" r="3.5" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
                    <line x1="280" y1="300" x2="255" y2="326" stroke="#EF4444" strokeWidth="1" />
                    <line x1="255" y1="326" x2="180" y2="326" stroke="#EF4444" strokeWidth="1" />
                    <text x="175" y="324" fontSize="7.5" fill="#EF4444" fontWeight="800" textAnchor="end">
                      1/4" WEEP HOLE
                    </text>
                    <text x="175" y="334" fontSize="6.5" fill="#64748B" textAnchor="end">
                      Condensation Baffle
                    </text>

                    {/* RETURN DEPTH DIMENSION LINE */}
                    <line x1="230" y1="348" x2="590" y2="348" stroke="#475569" strokeWidth="1.2" />
                    <line x1="230" y1="342" x2="230" y2="354" stroke="#475569" strokeWidth="1.2" />
                    <line x1="590" y1="342" x2="590" y2="354" stroke="#475569" strokeWidth="1.2" />
                    <rect x="350" y="341" width="120" height="14" fill="#F8FAFC" rx="2" />
                    <text x="410" y="352" fontSize="8" fontWeight="800" fill="#0F172A" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">
                      5.00" RETURN DEPTH
                    </text>

                    {/* 7.0" RACEWAY DEPTH DIMENSION LINE */}
                    <line x1="610" y1="315" x2="750" y2="315" stroke="#475569" strokeWidth="1.2" />
                    <line x1="610" y1="309" x2="610" y2="321" stroke="#475569" strokeWidth="1.2" />
                    <line x1="750" y1="309" x2="750" y2="321" stroke="#475569" strokeWidth="1.2" />
                    <rect x="640" y="308" width="80" height="14" fill="#F8FAFC" rx="2" />
                    <text x="680" y="319" fontSize="7.5" fontWeight="800" fill="#0F172A" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">
                      7.0" WIREWAY
                    </text>

                    {/* CALLOUT LABELS */}
                    {/* Face Callout */}
                    <line x1="215" y1="95" x2="160" y2="93" stroke={activeInspector?.id === 'face' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'face' ? '1.5' : '1'} />
                    <rect x="25" y="80" width="135" height="26" rx="4" fill={activeInspector?.id === 'face' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'face' ? '#F79223' : '#CBD5E1'} />
                    <text x="150" y="92" fontSize="8" fill={activeInspector?.id === 'face' ? '#FFFFFF' : '#0F172A'} fontWeight="800" textAnchor="end">
                      3/16" ACRYLIC FACE {activeInspector?.id === 'face' && '★'}
                    </text>
                    <text x="150" y="101" fontSize="6.5" fill={activeInspector?.id === 'face' ? '#FFFFFF' : '#64748B'} textAnchor="end">
                      #7328 White + 3M Red
                    </text>

                    {/* Trim Cap Callout */}
                    <line x1="220" y1="95" x2="165" y2="138" stroke={activeInspector?.id === 'trim' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'trim' ? '1.5' : '1'} />
                    <rect x="25" y="125" width="140" height="26" rx="4" fill={activeInspector?.id === 'trim' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'trim' ? '#F79223' : '#CBD5E1'} />
                    <text x="33" y="137" fontSize="8" fill={activeInspector?.id === 'trim' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      1.0" JEWELITE TRIM CAP {activeInspector?.id === 'trim' && '★'}
                    </text>
                    <text x="33" y="146" fontSize="6.5" fill={activeInspector?.id === 'trim' ? '#FFFFFF' : '#64748B'}>
                      Bonded CAB Butyrate
                    </text>

                    {/* Return Callout */}
                    <line x1="380" y1="90" x2="420" y2="55" stroke={activeInspector?.id === 'return' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'return' ? '1.5' : '1'} />
                    <rect x="420" y="42" width="140" height="26" rx="4" fill={activeInspector?.id === 'return' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'return' ? '#F79223' : '#CBD5E1'} />
                    <text x="428" y="54" fontSize="8" fill={activeInspector?.id === 'return' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      5.0" RETURN DEPTH {activeInspector?.id === 'return' && '★'}
                    </text>
                    <text x="428" y="63" fontSize="6.5" fill={activeInspector?.id === 'return' ? '#FFFFFF' : '#64748B'}>
                      0.040" Pre-Coated Black
                    </text>

                    {/* Raceway Callout */}
                    <line x1="680" y1="105" x2="657" y2="68" stroke={activeInspector?.id === 'raceway' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'raceway' ? '1.5' : '1'} />
                    <rect x="585" y="42" width="145" height="26" rx="4" fill={activeInspector?.id === 'raceway' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'raceway' ? '#F79223' : '#CBD5E1'} />
                    <text x="593" y="54" fontSize="8" fill={activeInspector?.id === 'raceway' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      7" x 4.5" ALUM RACEWAY {activeInspector?.id === 'raceway' && '★'}
                    </text>
                    <text x="593" y="63" fontSize="6.5" fill={activeInspector?.id === 'raceway' ? '#FFFFFF' : '#64748B'}>
                      Landlord Spec Painted
                    </text>

                    {/* FASTSIGNS TITLE BLOCK */}
                    <g transform="translate(500, 380)">
                      <rect x="0" y="0" width="420" height="70" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.2" />
                      <line x1="135" y1="0" x2="135" y2="70" stroke="#0F172A" strokeWidth="1" />
                      <line x1="290" y1="0" x2="290" y2="70" stroke="#0F172A" strokeWidth="1" />
                      <line x1="135" y1="35" x2="420" y2="35" stroke="#0F172A" strokeWidth="1" />
                      
                      <text x="10" y="20" fontSize="11" fontWeight="900" fill="#C5221F" letterSpacing="1">FASTSIGNS®</text>
                      <text x="10" y="34" fontSize="7.5" fontWeight="700" fill="#0F172A">COMMERCIAL OPS #2041</text>
                      <text x="10" y="47" fontSize="7.5" fill="#64748B">12+ YRS FASTSIGNS FRANCHISE</text>
                      <text x="10" y="60" fontSize="7.5" fill="#059669" fontWeight="700">UL 48 LISTED ENCLOSURE</text>

                      <text x="145" y="15" fontSize="7" fill="#64748B" fontWeight="700">PROJECT / CLIENT</text>
                      <text x="145" y="28" fontSize="8" fontWeight="800" fill="#0F172A">{project.client.split('—')[0]}</text>
                      <text x="145" y="49" fontSize="7" fill="#64748B" fontWeight="700">PRE-FLIGHT ESTIMATOR</text>
                      <text x="145" y="62" fontSize="7.5" fontWeight="800" fill="#0369A1">Jezreel Dave Leybag (Gemini Cert)</text>

                      <text x="300" y="15" fontSize="7" fill="#64748B" fontWeight="700">DWG NO. / REV</text>
                      <text x="300" y="28" fontSize="8" fontWeight="800" fill="#0F172A">CAD-02 • REV A</text>
                      <text x="300" y="49" fontSize="7" fill="#64748B" fontWeight="700">PERMIT STATUS</text>
                      <text x="300" y="62" fontSize="8" fontWeight="800" fill="#059669">APPROVED FOR PERMIT</text>
                    </g>
                  </svg>
                )}

                {/* CASE 3: CAD SECTION C-C (J.STUDIO - INTERIOR STANDOFF PLAQUE) */}
                {project.id === 'case3' && (
                  <svg viewBox="0 0 960 480" className="w-full h-auto block select-none font-sans bg-[#F8FAFC]">
                    <defs>
                      <pattern id="blueprint-grid-3" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.75" />
                      </pattern>
                      <pattern id="drywall-hatch" width="10" height="10" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="5" x2="10" y2="5" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />
                      </pattern>
                    </defs>

                    <rect width="960" height="480" fill="url(#blueprint-grid-3)" />
                    <rect x="15" y="15" width="930" height="450" fill="none" stroke="#94A3B8" strokeWidth="1.5" />

                    {/* DRAWING HEADER */}
                    <g transform="translate(30, 22)">
                      <text x="0" y="14" fontSize="11" fontWeight="800" fill="#0F172A" letterSpacing="0.8">
                        SECTION C-C: J.STUDIO ARCHITECTURAL STANDOFF PLAQUE DETAIL
                      </text>
                      <text x="0" y="27" fontSize="8" fill="#64748B" fontWeight="600">
                        SCALE: 6" = 1'-0" [QUARTER SIZE: N.T.S.] • FASTSIGNS COMMERCIAL SPEC CAD-03
                      </text>
                    </g>

                    {/* OVERHEAD GALLERY TRACK SPOTLIGHT BEAM */}
                    <polygon 
                      points="180,40 260,40 480,260 280,260" 
                      fill="#FEF08A" 
                      opacity={activeInspector?.id === 'lighting' ? "0.35" : "0.15"} 
                    />
                    <line x1="220" y1="40" x2="380" y2="210" stroke="#EAB308" strokeWidth="1" strokeDasharray="3 2" />

                    {/* 1. 5/8" COMMERCIAL DRYWALL & METAL STUD WALL */}
                    <rect x="680" y="65" width="22" height="290" fill="url(#drywall-hatch)" stroke="#475569" strokeWidth="1.5" />
                    <text x="735" y="362" fontSize="9" fontWeight="700" fill="#475569" textAnchor="middle">
                      5/8" TYPE X DRYWALL
                    </text>
                    <rect x="702" y="65" width="40" height="290" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" opacity="0.4" />
                    <text x="722" y="150" fontSize="7.5" fill="#64748B" transform="rotate(90 722 150)">25GA STEEL STUD</text>

                    {/* Toggle Bolt Anchor through Wall */}
                    <rect x="580" y="127" width="130" height="6" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                    <path d="M 706 120 L 720 130 L 706 140 Z" fill="#475569" />
                    <rect x="580" y="247" width="130" height="6" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                    <path d="M 706 240 L 720 250 L 706 260 Z" fill="#475569" />

                    {/* 2. 1.0" OD x 1.0" PROJECTION GYFORD STAINLESS STANDOFFS */}
                    <rect 
                      x="580" y="115" width="100" height="30" rx="3"
                      fill="#CBD5E1" 
                      stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#334155'} 
                      strokeWidth={activeInspector?.id === 'standoffs' ? '3' : '1.5'} 
                    />
                    <circle cx="560" cy="130" r="10" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                    <text x="630" y="133" fontSize="7.5" fill="#0F172A" fontWeight="bold" textAnchor="middle">GYFORD 1"x1"</text>

                    <rect 
                      x="580" y="235" width="100" height="30" rx="3"
                      fill="#CBD5E1" 
                      stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#334155'} 
                      strokeWidth={activeInspector?.id === 'standoffs' ? '3' : '1.5'} 
                    />
                    <circle cx="560" cy="250" r="10" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                    <text x="630" y="253" fontSize="7.5" fill="#0F172A" fontWeight="bold" textAnchor="middle">GYFORD 1"x1"</text>

                    {/* 3. 1/4" CLEAR CAST ACRYLIC BACKER PLAQUE */}
                    <rect 
                      x="550" y="80" width="20" height="230" rx="2"
                      fill="#BAE6FD" opacity="0.6" 
                      stroke={activeInspector?.id === 'plaque' ? '#F79223' : '#0284C7'} 
                      strokeWidth={activeInspector?.id === 'plaque' ? '3' : '2'} 
                    />
                    <polygon points="550,80 570,80 570,85 550,88" fill="#38BDF8" opacity="0.7" />
                    <polygon points="550,310 570,310 570,305 550,302" fill="#38BDF8" opacity="0.7" />

                    {/* 4. 1/2" ACRYLIC J.STUDIO LOGO WITH BRONZE CHEMETAL FACE */}
                    <rect 
                      x="510" y="110" width="40" height="160" rx="2"
                      fill="#78350F" 
                      stroke={activeInspector?.id === 'logo' ? '#F79223' : '#B45309'} 
                      strokeWidth={activeInspector?.id === 'logo' ? '3' : '2'} 
                    />
                    <rect 
                      x="504" y="110" width="6" height="160" 
                      fill="#D97706" 
                      stroke={activeInspector?.id === 'logo' ? '#F79223' : '#92400E'} 
                      strokeWidth={activeInspector?.id === 'logo' ? '1.5' : '1'} 
                    />

                    {/* DIMENSION STRINGS */}
                    {/* Standoff 1.0" Projection */}
                    <line x1="580" y1="190" x2="680" y2="190" stroke="#475569" strokeWidth="1.2" />
                    <line x1="580" y1="184" x2="580" y2="196" stroke="#475569" strokeWidth="1.2" />
                    <line x1="680" y1="184" x2="680" y2="196" stroke="#475569" strokeWidth="1.2" />
                    <rect x="605" y="183" width="50" height="14" fill="#F8FAFC" rx="2" />
                    <text x="630" y="193" fontSize="7.5" fontWeight="800" fill="#0F172A" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">
                      1.00" PROJ
                    </text>

                    {/* Plaque 1/4" Thickness */}
                    <line x1="550" y1="335" x2="570" y2="335" stroke="#475569" strokeWidth="1.2" />
                    <line x1="550" y1="329" x2="550" y2="341" stroke="#475569" strokeWidth="1.2" />
                    <line x1="570" y1="329" x2="570" y2="341" stroke="#475569" strokeWidth="1.2" />
                    <rect x="535" y="343" width="50" height="14" fill="#F8FAFC" rx="2" />
                    <text x="560" y="353" fontSize="7.5" fontWeight="800" fill="#0F172A" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">
                      1/4" PLAQUE
                    </text>

                    {/* CALLOUT LABELS */}
                    {/* Spotlight Callout */}
                    <line x1="195" y1="42" x2="163" y2="83" stroke={activeInspector?.id === 'lighting' ? '#F79223' : '#EAB308'} strokeWidth={activeInspector?.id === 'lighting' ? '1.5' : '1'} />
                    <rect x="25" y="70" width="138" height="26" rx="4" fill={activeInspector?.id === 'lighting' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'lighting' ? '#F79223' : '#CBD5E1'} />
                    <text x="33" y="82" fontSize="8" fill={activeInspector?.id === 'lighting' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      GALLERY SPOTLIGHTS {activeInspector?.id === 'lighting' && '★'}
                    </text>
                    <text x="33" y="91" fontSize="6.5" fill={activeInspector?.id === 'lighting' ? '#FFFFFF' : '#64748B'}>
                      3000K Overhead Track Wash
                    </text>

                    {/* J.STUDIO Bronze Logo Callout */}
                    <line x1="504" y1="135" x2="355" y2="128" stroke={activeInspector?.id === 'logo' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'logo' ? '1.5' : '1'} />
                    <rect x="180" y="115" width="175" height="26" rx="4" fill={activeInspector?.id === 'logo' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'logo' ? '#F79223' : '#CBD5E1'} />
                    <text x="350" y="127" fontSize="8" fill={activeInspector?.id === 'logo' ? '#FFFFFF' : '#0F172A'} fontWeight="800" textAnchor="end">
                      J.STUDIO BRONZE LOGO {activeInspector?.id === 'logo' && '★'}
                    </text>
                    <text x="350" y="136" fontSize="6.5" fill={activeInspector?.id === 'logo' ? '#FFFFFF' : '#64748B'} textAnchor="end">
                      Chemetal #903 on 1/2" Acrylic Core
                    </text>

                    {/* Acrylic Plaque Callout */}
                    <line x1="550" y1="210" x2="375" y2="208" stroke={activeInspector?.id === 'plaque' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'plaque' ? '1.5' : '1'} />
                    <rect x="200" y="195" width="175" height="26" rx="4" fill={activeInspector?.id === 'plaque' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'plaque' ? '#F79223' : '#CBD5E1'} />
                    <text x="368" y="207" fontSize="8" fill={activeInspector?.id === 'plaque' ? '#FFFFFF' : '#0F172A'} fontWeight="800" textAnchor="end">
                      1/4" CLEAR ACRYLIC PLAQUE {activeInspector?.id === 'plaque' && '★'}
                    </text>
                    <text x="368" y="216" fontSize="6.5" fill={activeInspector?.id === 'plaque' ? '#FFFFFF' : '#64748B'} textAnchor="end">
                      Flame-Polished Beveled Edges
                    </text>

                    {/* Gyford Standoff Callout */}
                    <line x1="630" y1="115" x2="600" y2="68" stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'standoffs' ? '1.5' : '1'} />
                    <rect x="490" y="42" width="160" height="26" rx="4" fill={activeInspector?.id === 'standoffs' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#CBD5E1'} />
                    <text x="498" y="54" fontSize="8" fill={activeInspector?.id === 'standoffs' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      GYFORD STANDOFFS (6x) {activeInspector?.id === 'standoffs' && '★'}
                    </text>
                    <text x="498" y="63" fontSize="6.5" fill={activeInspector?.id === 'standoffs' ? '#FFFFFF' : '#64748B'}>
                      1.0" OD x 1.0" Projection SS
                    </text>

                    {/* FASTSIGNS TITLE BLOCK */}
                    <g transform="translate(500, 380)">
                      <rect x="0" y="0" width="420" height="70" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.2" />
                      <line x1="135" y1="0" x2="135" y2="70" stroke="#0F172A" strokeWidth="1" />
                      <line x1="290" y1="0" x2="290" y2="70" stroke="#0F172A" strokeWidth="1" />
                      <line x1="135" y1="35" x2="420" y2="35" stroke="#0F172A" strokeWidth="1" />
                      
                      <text x="10" y="20" fontSize="11" fontWeight="900" fill="#C5221F" letterSpacing="1">FASTSIGNS®</text>
                      <text x="10" y="34" fontSize="7.5" fontWeight="700" fill="#0F172A">COMMERCIAL OPS #2041</text>
                      <text x="10" y="47" fontSize="7.5" fill="#64748B">12+ YRS FASTSIGNS FRANCHISE</text>
                      <text x="10" y="60" fontSize="7.5" fill="#059669" fontWeight="700">ARCHITECTURAL DISPLAY</text>

                      <text x="145" y="15" fontSize="7" fill="#64748B" fontWeight="700">PROJECT / CLIENT</text>
                      <text x="145" y="28" fontSize="8" fontWeight="800" fill="#0F172A">{project.client.split('—')[0]}</text>
                      <text x="145" y="49" fontSize="7" fill="#64748B" fontWeight="700">PRE-FLIGHT ESTIMATOR</text>
                      <text x="145" y="62" fontSize="7.5" fontWeight="800" fill="#0369A1">Jezreel Dave Leybag (Gemini Cert)</text>

                      <text x="300" y="15" fontSize="7" fill="#64748B" fontWeight="700">DWG NO. / REV</text>
                      <text x="300" y="28" fontSize="8" fontWeight="800" fill="#0F172A">CAD-03 • REV C</text>
                      <text x="300" y="49" fontSize="7" fill="#64748B" fontWeight="700">PERMIT STATUS</text>
                      <text x="300" y="62" fontSize="8" fontWeight="800" fill="#059669">PERMIT EXEMPT (INTERIOR)</text>
                    </g>
                  </svg>
                )}

              </div>
            )}

            {/* VIEW 3: UL 48 ELECTRICAL SCHEDULE (PROJECT AWARE) */}
            {viewMode === 'elec' && (
              <div className="w-full max-w-4xl p-6 rounded-2xl bg-white border border-gray-200">
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-extrabold text-[#111213]">
                      {project.id === 'case3' 
                        ? 'UL 48 / NEC Article 600 Compliance & Lighting Schedule'
                        : 'UL 48 Single-Line Electric Sign Wiring Schedule'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {project.id === 'case3'
                        ? 'Non-Illuminated Architectural Display Exemption & Photometric Wash Schedule'
                        : 'NEC Article 600 Compliance & Power Supply Loading Calculation'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    project.id === 'case3'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {project.id === 'case3' ? 'NEC 600.3 Exemption Verified' : 'NEC 80% Headroom Verified'}
                  </span>
                </div>

                {project.id === 'case1' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                      <h4 className="text-xs font-extrabold uppercase text-gray-700 mb-3 tracking-wider">
                        Driver Capacity &amp; Safety Headroom
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Primary Feed:</span>
                          <span className="font-bold text-gray-900">120V AC, 60Hz, 15A Dedicated</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Power Supplies:</span>
                          <span className="font-bold text-gray-900">2x 60W UL Class 2 Drivers</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">NEC 80% Continuous Limit:</span>
                          <span className="font-bold text-blue-600">48.0W Max per Driver</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Actual Calculated Load:</span>
                          <span className="font-extrabold text-emerald-600">42.0W (87.5% capacity - SAFE)</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Disconnect Switch:</span>
                          <span className="font-bold text-gray-900">External Toggle in Sight of Sign</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                      <h4 className="text-xs font-extrabold uppercase text-gray-700 mb-3 tracking-wider">
                        LED Module Layout Specifications
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Module Model:</span>
                          <span className="font-bold text-gray-900">Hanley / Acrovane 12V IP67</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Module Wattage:</span>
                          <span className="font-bold text-gray-900">0.72 Watts / module</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Total Modules:</span>
                          <span className="font-bold text-gray-900">116 Modules across 10 Letters</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Secondary Wiring:</span>
                          <span className="font-bold text-gray-900">18 AWG 2-Conductor Tinned Copper</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Safety Label:</span>
                          <span className="font-bold text-[#C5221F]">Serialized UL 48 Holographic Label</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {project.id === 'case2' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                      <h4 className="text-xs font-extrabold uppercase text-gray-700 mb-3 tracking-wider">
                        Raceway-Mounted Driver Layout
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Primary Feed:</span>
                          <span className="font-bold text-gray-900">120V AC Dedicated Strip Circuit</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Power Supplies:</span>
                          <span className="font-bold text-gray-900">3x 60W Class 2 in Raceway</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Continuous Duty Limit:</span>
                          <span className="font-bold text-blue-600">48.0W Max per Driver</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Actual Calculated Load:</span>
                          <span className="font-extrabold text-emerald-600">44.0W per Driver (SAFE)</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Raceway Disconnect:</span>
                          <span className="font-bold text-gray-900">Primary Toggle on Wireway Endcap</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                      <h4 className="text-xs font-extrabold uppercase text-gray-700 mb-3 tracking-wider">
                        Dual-Row Red Front-Lit Modules
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Module Model:</span>
                          <span className="font-bold text-gray-900">SloanLED Prism Red IP67</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Module Wattage:</span>
                          <span className="font-bold text-gray-900">0.66 Watts / module</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Total Modules:</span>
                          <span className="font-bold text-gray-900">198 Modules (11 Large Characters)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Pre-Wired in Raceway:</span>
                          <span className="font-bold text-gray-900">Factory Bench-Tested 100%</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Safety Label:</span>
                          <span className="font-bold text-[#C5221F]">Serialized UL 48 Electric Sign Label</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {project.id === 'case3' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                      <h4 className="text-xs font-extrabold uppercase text-gray-700 mb-3 tracking-wider">
                        Code Exemption &amp; ADA Clearance
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Electrical Permitting:</span>
                          <span className="font-bold text-emerald-600">Exempt (NEC 600.3 Non-Electric)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Total Projection:</span>
                          <span className="font-bold text-gray-900">1.75" (Standoff + Plaque + Logo)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">ADA Title III Limit:</span>
                          <span className="font-bold text-blue-600">4.0" Max Corridor Obstruction (SAFE)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Mounting Shear Load:</span>
                          <span className="font-extrabold text-emerald-600">18.4 lbs total (3.06 lbs / standoff)</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Hardware Rating:</span>
                          <span className="font-bold text-gray-900">Gyford Heavy-Duty Toggles (50 lbs/ea)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                      <h4 className="text-xs font-extrabold uppercase text-gray-700 mb-3 tracking-wider">
                        Photometric Gallery Track Spec
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Light Source:</span>
                          <span className="font-bold text-gray-900">Overhead 120V Directional Track</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Color Temperature:</span>
                          <span className="font-bold text-gray-900">3000K Warm White (95 CRI)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Beam Angle:</span>
                          <span className="font-bold text-gray-900">36° Flood (Even Face Illumination)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Total Fixture Load:</span>
                          <span className="font-bold text-gray-900">3x 12W LED = 36W Total</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Glare Mitigation:</span>
                          <span className="font-bold text-emerald-600">Cross-Baffle Honeycomb Louver</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 4: COREBRIDGE WORK ORDER TABLE */}
            {viewMode === 'cb' && (
              <div className="w-full max-w-4xl p-6 rounded-2xl bg-white border border-gray-200">
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
                  <h3 className="text-base font-extrabold text-[#111213]">
                    CoreBridge ERP Itemized Work Order Breakout
                  </h3>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-gray-100 text-gray-800">
                    IMPORT READY
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                        <th className="py-2.5 px-3">Item Code</th>
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-3">Qty</th>
                        <th className="py-2.5 px-3 text-right">Unit Cost</th>
                        <th className="py-2.5 px-3 text-right">Retail Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {project.cbItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-gray-900">{item.code}</td>
                          <td className="py-3 px-3 text-gray-700">{item.desc}</td>
                          <td className="py-3 px-3 font-semibold text-gray-600">{item.qty}</td>
                          <td className="py-3 px-3 font-mono text-right text-gray-600">${item.cost.toFixed(2)}</td>
                          <td className="py-3 px-3 font-mono text-right font-extrabold text-[#0284C7]">${item.retail.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* INTERACTIVE COMPONENT HOTSPOT INSPECTOR BAR */}
          <div className="px-6 py-5 border-t border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              
              {/* COMPONENT INFO CARD WITH DEDICATED VISUAL SCHEMATIC THUMBNAIL */}
              <div className="flex items-start sm:items-center gap-4">
                <ComponentVisualThumbnail item={activeInspector} />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                      Interactive Subassembly Inspector
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-[#D97706] text-[10px] font-bold">
                      ● LIVE IN BLUEPRINT
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <strong className="text-sm font-extrabold text-gray-900">
                      {activeInspector?.name || 'Component Spec'}
                    </strong>
                    <span className="text-xs text-gray-500 font-mono font-semibold">
                      ({activeInspector?.code})
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
                    {activeInspector?.detail}
                  </p>

                  {/* SUBASSEMBLY METADATA PILLS */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {activeInspector?.vendor && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-semibold border border-gray-200">
                        🏭 Source: {activeInspector.vendor}
                      </span>
                    )}
                    {activeInspector?.material && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                        📐 Material: {activeInspector.material}
                      </span>
                    )}
                    {activeInspector?.qc && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                        🛡️ QC: {activeInspector.qc}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* TACTILE TOGGLE BUTTONS WITH DEDICATED ELEMENT ICONS */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {project.inspectorItems.map((item) => {
                  const isSelected = activeInspector?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveInspector(item)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none group ${
                        isSelected
                          ? 'bg-[#111213] text-white ring-2 ring-[#F79223] shadow-md shadow-black/15 scale-105'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <span className="shrink-0">
                        {renderToggleIcon(item.iconType || item.id, isSelected)}
                      </span>
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

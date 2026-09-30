import React, { useState } from 'react';
import { Layers, Sun, Moon, Printer, FileText, CheckCircle2, Info, Compass, ShieldAlert } from 'lucide-react';

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
              Authentic engineering submittal drawings prepared to FASTSIGNS® center standards. Toggle between full storefront facade elevation (with live day/night illumination simulation) and high-precision CAD cross-section details.
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
                <span>CAD Section Detail A-A</span>
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

            {/* ILLUMINATION TOGGLE */}
            <div className="flex items-center gap-3">
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
          <div className="p-4 sm:p-8 bg-white flex flex-col items-center justify-center min-h-[420px]">
            
            {/* VIEW 1: ELEVATION VIEW */}
            {viewMode === 'elev' && (
              <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-gray-200/90 shadow-inner bg-gray-50">
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
                    <text x="24" y="20" fontSize="10" fill="#94A3B8" fontWeight="700" letterSpacing="1.5">
                      NORTH ELEVATION • LEVEL 2 MAIN RETAIL ENTRANCE
                    </text>

                    {/* 3MM BLACK ACM BACKER TRAY */}
                    <rect 
                      x="70" y="60" width="740" height="150" rx="4" 
                      fill="#090D16" stroke="#334155" strokeWidth="2" 
                    />
                    
                    {/* HALO GLOW LAYER (NIGHT MODE) */}
                    {isNightMode && (
                      <g>
                        <text x="470" y="152" fontSize="52" fontWeight="800" fill="#FEF08A" textAnchor="middle" letterSpacing="14" filter="url(#halo-glow-fx)" opacity="0.95">
                          APEX DENTAL
                        </text>
                        <circle cx="160" cy="135" r="34" fill="#FEF08A" filter="url(#halo-glow-fx)" opacity="0.8" />
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
                    <text x="470" y="152" fontSize="50" fontWeight="800" fill="#0F172A" stroke="#1E293B" strokeWidth="1.5" textAnchor="middle" letterSpacing="14">
                      APEX DENTAL
                    </text>

                    {/* SUB-TITLE ON BACKER */}
                    <text x="470" y="185" fontSize="11" fontWeight="700" fill="#38BDF8" textAnchor="middle" letterSpacing="5">
                      FAMILY &amp; COSMETIC DENTISTRY
                    </text>

                    {/* STOREFRONT WINDOWS */}
                    <rect x="0" y="260" width="880" height="80" fill="#0F172A" opacity="0.95" />
                    <rect x="70" y="270" width="220" height="70" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                    <rect x="330" y="270" width="220" height="70" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                    <rect x="590" y="270" width="220" height="70" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                    <text x="440" y="305" fontSize="11" fill="#64748B" textAnchor="middle" fontWeight="600">
                      SUITE 104 • ENTRANCE VESTIBULE GLASS
                    </text>

                    {/* CAD DIMENSIONS */}
                    <line x1="70" y1="45" x2="810" y2="45" stroke="#38BDF8" strokeWidth="1.5" />
                    <line x1="70" y1="40" x2="70" y2="50" stroke="#38BDF8" strokeWidth="1.5" />
                    <line x1="810" y1="40" x2="810" y2="50" stroke="#38BDF8" strokeWidth="1.5" />
                    <rect x="350" y="34" width="180" height="22" fill="#0F172A" rx="4" />
                    <text x="440" y="49" fontSize="11" fill="#38BDF8" textAnchor="middle" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                      14'-0" [168.0"] OVERALL SPAN
                    </text>
                  </svg>
                )}

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
                    <rect x="60" y="160" width="760" height="42" fill="#D6CEBE" stroke="#A89F8D" strokeWidth="2" rx="2" />
                    <text x="75" y="152" fontSize="10" fill="#57534E" fontWeight="700">
                      7" x 4.5" EXTRUDED ALUMINUM RACEWAY (PAINTED KHAKI BEIGE)
                    </text>

                    {/* FRONT-LIT RED CHANNEL LETTERS */}
                    <text x="440" y="150" fontSize="64" fontWeight="900" fill="#0F172A" stroke="#0F172A" strokeWidth="12" strokeLinejoin="round" textAnchor="middle" letterSpacing="8">
                      METRO BURGER
                    </text>
                    <text 
                      x="440" y="150" fontSize="64" fontWeight="900" 
                      fill={isNightMode ? "#FF4D4D" : "#DC2626"} 
                      textAnchor="middle" letterSpacing="8"
                      style={{ filter: isNightMode ? 'drop-shadow(0 0 18px rgba(239, 68, 68, 0.95))' : 'none' }}
                    >
                      METRO BURGER
                    </text>

                    {/* DIMENSION CHAINS */}
                    <line x1="60" y1="40" x2="820" y2="40" stroke="#0284C7" strokeWidth="1.5" />
                    <rect x="340" y="28" width="200" height="24" fill="#0F172A" rx="4" />
                    <text x="440" y="44" fontSize="11" fill="#38BDF8" textAnchor="middle" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                      18'-0" [216.0"] OVERALL SPAN
                    </text>

                    {/* STOREFRONT WINDOWS */}
                    <rect x="40" y="240" width="800" height="100" fill="#1E293B" opacity="0.9" />
                    <text x="440" y="290" fontSize="12" fill="#94A3B8" textAnchor="middle" fontWeight="600">
                      UNIT 12 • SHOPPES AT LEGACY CREEK
                    </text>
                  </svg>
                )}

                {project.id === 'case3' && (
                  <svg viewBox="0 0 880 340" className="w-full h-auto block select-none">
                    <rect width="880" height="340" fill={isNightMode ? "#090D16" : "#F8FAFC"} />
                    
                    {/* ACOUSTIC WOOD SLATS */}
                    <g opacity="0.15">
                      <rect x="640" y="0" width="240" height="340" fill="#475569" />
                    </g>

                    {/* OVERHEAD GALLERY SPOTLIGHT WASH */}
                    {isNightMode && (
                      <polygon points="320,0 560,0 700,320 180,320" fill="#FEF08A" opacity="0.18" />
                    )}

                    {/* 48" x 72" CLEAR ACRYLIC PLAQUE */}
                    <rect x="200" y="55" width="480" height="230" rx="8" fill="#0F172A" opacity="0.08" />
                    <rect x="190" y="45" width="480" height="230" rx="8" fill="#E0F2FE" opacity="0.5" stroke="#38BDF8" strokeWidth="2" />
                    
                    {/* 6x GYFORD MACHINED STAINLESS STANDOFFS */}
                    {[
                      [220, 65], [430, 65], [640, 65],
                      [220, 255], [430, 255], [640, 255]
                    ].map(([cx, cy], i) => (
                      <g key={i}>
                        <circle cx={cx} cy={cy} r="10" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
                        <circle cx={cx} cy={cy} r="4" fill="#CBD5E1" />
                      </g>
                    ))}

                    {/* 36" CIRCULAR BRONZE LOGO & TYPOGRAPHY */}
                    <g transform="translate(430, 140)">
                      <circle cx="0" cy="-15" r="32" fill="#78350F" stroke="#B45309" strokeWidth="3" />
                      <path d="M -16 -15 L 16 -15 M 0 -31 L 0 1" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
                      <text x="0" y="38" fontSize="26" fontWeight="800" fill="#78350F" textAnchor="middle" letterSpacing="6">
                        LUMINA BIOTECH
                      </text>
                      <text x="0" y="56" fontSize="11" fontWeight="700" fill="#0284C7" textAnchor="middle" letterSpacing="3">
                        LIFE SCIENCE INNOVATION LABS
                      </text>
                    </g>

                    {/* DIMENSION STRINGS */}
                    <line x1="190" y1="30" x2="670" y2="30" stroke="#0284C7" strokeWidth="1.5" />
                    <text x="430" y="24" fontSize="11" fill="#0284C7" textAnchor="middle" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                      72.0" [6'-0"] PLAQUE WIDTH
                    </text>
                  </svg>
                )}
              </div>
            )}

            {/* VIEW 2: HIGH-FIDELITY ARCHITECTURAL CAD SECTION DETAIL A-A */}
            {viewMode === 'cad' && (
              <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-gray-300 shadow-sm bg-white">
                <svg viewBox="0 0 960 470" className="w-full h-auto block select-none font-sans bg-[#F8FAFC]">
                  <defs>
                    <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.75" />
                    </pattern>
                    <pattern id="brick-hatch-cad" width="16" height="16" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="16" stroke="#94A3B8" strokeWidth="1.5" />
                    </pattern>
                    <pattern id="pe-core-hatch" width="8" height="8" patternUnits="userSpaceOnUse">
                      <rect width="8" height="8" fill="#1E293B" />
                    </pattern>
                  </defs>

                  {/* BLUEPRINT GRID BACKGROUND */}
                  <rect width="960" height="470" fill="url(#blueprint-grid)" />
                  <rect x="15" y="15" width="930" height="440" fill="none" stroke="#94A3B8" strokeWidth="1.5" />

                  {/* DRAWING HEADER (CLEARLY SEPARATED) */}
                  <g transform="translate(30, 24)">
                    <text x="0" y="18" fontSize="13" fontWeight="800" fill="#0F172A" letterSpacing="0.8">
                      SECTION A-A: REVERSE HALO-LIT CHANNEL LETTER PROFILE
                    </text>
                    <text x="0" y="34" fontSize="10.5" fill="#64748B" fontWeight="600">
                      SCALE: 3" = 1'-0" [HALF SIZE: N.T.S.] • FASTSIGNS COMMERCIAL SPEC CAD-01
                    </text>
                  </g>

                  {/* 1. BUILDING FACADE BRICK WALL */}
                  <rect x="780" y="65" width="130" height="270" fill="url(#brick-hatch-cad)" stroke="#475569" strokeWidth="2" />
                  <text x="845" y="355" fontSize="10" fontWeight="700" fill="#475569" textAnchor="middle">
                    SPLIT-FACE BRICK
                  </text>

                  {/* Concrete Anchors */}
                  <rect x="730" y="120" width="70" height="12" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                  <polygon points="800,120 815,126 800,132" fill="#475569" />
                  <rect x="730" y="250" width="70" height="12" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                  <polygon points="800,250 815,256 800,262" fill="#475569" />

                  {/* 2. CONDUIT PASS-THROUGH SLEEVE */}
                  <rect x="690" y="185" width="140" height="16" fill="#E2E8F0" stroke="#0284C7" strokeWidth="1.5" />
                  <path d="M 770 178 Q 775 193 770 208" stroke="#0284C7" strokeWidth="3" fill="none" />

                  {/* 3. 3MM BLACK ACM BACKER PANEL */}
                  <rect x="675" y="75" width="14" height="250" fill="url(#pe-core-hatch)" stroke="#0F172A" strokeWidth="1.5" rx="1" />

                  {/* 4. 1.5" MACHINED ALUMINUM STANDOFF BARRELS */}
                  <rect x="595" y="115" width="80" height="22" fill="#CBD5E1" stroke="#334155" strokeWidth="1.5" />
                  <line x1="585" y1="126" x2="730" y2="126" stroke="#0F172A" strokeWidth="3" strokeDasharray="4 2" />
                  <rect x="595" y="245" width="80" height="22" fill="#CBD5E1" stroke="#334155" strokeWidth="1.5" />
                  <line x1="585" y1="256" x2="730" y2="256" stroke="#0F172A" strokeWidth="3" strokeDasharray="4 2" />

                  {/* 5. 3/16" CLEAR OPTICAL POLYCARBONATE BACK */}
                  <rect x="583" y="90" width="12" height="210" fill="#BAE6FD" opacity="0.65" stroke="#0284C7" strokeWidth="1.5" />

                  {/* 6. 3.5" ALUMINUM RETURN SIDEWALLS */}
                  <rect x="295" y="90" width="288" height="8" fill="#1E293B" />
                  <rect x="565" y="98" width="18" height="12" fill="#334155" />
                  <rect x="295" y="292" width="288" height="8" fill="#1E293B" />
                  <rect x="565" y="280" width="18" height="12" fill="#334155" />

                  {/* 7. OPAQUE ALUMINUM FACE (0.063" ROUTER CUT) */}
                  <rect x="280" y="85" width="15" height="220" fill="#0F172A" stroke="#0F172A" strokeWidth="2" rx="1" />

                  {/* 8. 12V LED MODULES INSIDE CAN */}
                  <rect x="435" y="115" width="30" height="18" rx="3" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
                  <circle cx="450" cy="124" r="4" fill="#FEF08A" />
                  <rect x="435" y="185" width="30" height="18" rx="3" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
                  <circle cx="450" cy="194" r="4" fill="#FEF08A" />
                  <rect x="435" y="255" width="30" height="18" rx="3" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
                  <circle cx="450" cy="264" r="4" fill="#FEF08A" />

                  {/* Optical reflection paths */}
                  <path d="M 465 124 L 595 100 M 465 124 L 595 150" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 465 264 L 595 240 M 465 264 L 595 290" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />

                  {/* 9. 1/4" WEEP HOLE */}
                  <circle cx="355" cy="296" r="3" fill="#FFFFFF" stroke="#EF4444" strokeWidth="1.5" />
                  <text x="355" y="325" fontSize="8.5" fill="#EF4444" fontWeight="700" textAnchor="middle">
                    1/4" WEEP HOLE
                  </text>

                  {/* ================= REPOSITIONED LEADER LINES (NO OVERLAP) ================= */}
                  
                  {/* Face Callout (Left Side, clear of borders) */}
                  <line x1="285" y1="120" x2="220" y2="120" stroke="#0284C7" strokeWidth="1" />
                  <line x1="220" y1="120" x2="160" y2="100" stroke="#0284C7" strokeWidth="1" />
                  <text x="155" y="98" fontSize="9" fill="#0F172A" fontWeight="700" textAnchor="end">
                    0.063" 5052-H32 ALUMINUM FACE
                  </text>
                  <text x="155" y="110" fontSize="8" fill="#64748B" textAnchor="end">
                    Satin Black Polyurethane Enamel
                  </text>

                  {/* Return Sidewall Callout (Top Center, clearly below header) */}
                  <line x1="390" y1="90" x2="390" y2="65" stroke="#0284C7" strokeWidth="1" />
                  <line x1="390" y1="65" x2="480" y2="65" stroke="#0284C7" strokeWidth="1" />
                  <text x="485" y="63" fontSize="9" fill="#0F172A" fontWeight="700">
                    3.50" DEPTH 0.040" ALUM RETURN
                  </text>
                  <text x="485" y="74" fontSize="8" fill="#64748B">
                    Clinch-Riveted Flange &amp; Weep Holes
                  </text>

                  {/* LEDs Callout */}
                  <line x1="465" y1="194" x2="520" y2="175" stroke="#D97706" strokeWidth="1" />
                  <line x1="520" y1="175" x2="540" y2="175" stroke="#D97706" strokeWidth="1" />
                  <text x="545" y="173" fontSize="9" fill="#D97706" fontWeight="700">
                    12V DC IP67 LED MODULES
                  </text>
                  <text x="545" y="184" fontSize="8" fill="#64748B">
                    6500K • 160° Batwing Lens
                  </text>

                  {/* Standoff & Backer Callouts */}
                  <line x1="635" y1="137" x2="635" y2="160" stroke="#0284C7" strokeWidth="1" />
                  <line x1="635" y1="160" x2="670" y2="160" stroke="#0284C7" strokeWidth="1" />
                  <text x="675" y="158" fontSize="8.5" fill="#0F172A" fontWeight="700">
                    1.50" MACHINED STANDOFF
                  </text>

                  {/* DIMENSION STRINGS */}
                  <line x1="295" y1="315" x2="583" y2="315" stroke="#334155" strokeWidth="1.5" />
                  <line x1="295" y1="308" x2="295" y2="322" stroke="#334155" strokeWidth="1.5" />
                  <line x1="583" y1="308" x2="583" y2="322" stroke="#334155" strokeWidth="1.5" />
                  <text x="439" y="328" fontSize="10" fontWeight="700" fill="#0F172A" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">
                    3.50" RETURN DEPTH
                  </text>

                  <line x1="595" y1="210" x2="675" y2="210" stroke="#334155" strokeWidth="1.5" />
                  <line x1="595" y1="204" x2="595" y2="216" stroke="#334155" strokeWidth="1.5" />
                  <line x1="675" y1="204" x2="675" y2="216" stroke="#334155" strokeWidth="1.5" />
                  <text x="635" y="206" fontSize="9" fontWeight="700" fill="#0F172A" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">
                    1.50"
                  </text>

                  {/* ================= REFINED FASTSIGNS TITLE BLOCK (NO COLLISION) ================= */}
                  <g transform="translate(480, 365)">
                    <rect x="0" y="0" width="430" height="75" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
                    
                    {/* Vertical Dividing Lines */}
                    <line x1="140" y1="0" x2="140" y2="75" stroke="#0F172A" strokeWidth="1" />
                    <line x1="300" y1="0" x2="300" y2="75" stroke="#0F172A" strokeWidth="1" />
                    
                    {/* Horizontal Dividing Line */}
                    <line x1="140" y1="38" x2="430" y2="38" stroke="#0F172A" strokeWidth="1" />

                    {/* Column 1: Fastsigns Center Branding */}
                    <text x="12" y="22" fontSize="12" fontWeight="900" fill="#C5221F" letterSpacing="1">
                      FASTSIGNS®
                    </text>
                    <text x="12" y="37" fontSize="8.5" fontWeight="700" fill="#0F172A">
                      COMMERCIAL OPS #2041
                    </text>
                    <text x="12" y="50" fontSize="8" fill="#64748B">
                      12+ YRS FASTSIGNS FRANCHISE
                    </text>
                    <text x="12" y="64" fontSize="8" fill="#059669" fontWeight="700">
                      UL 48 LISTED ENCLOSURE
                    </text>

                    {/* Column 2 Top: Project */}
                    <text x="150" y="16" fontSize="7.5" fill="#64748B" fontWeight="700">PROJECT / CLIENT</text>
                    <text x="150" y="30" fontSize="9" fontWeight="800" fill="#0F172A">Apex Dental (FS-2026-084)</text>

                    {/* Column 2 Bottom: Estimator */}
                    <text x="150" y="52" fontSize="7.5" fill="#64748B" fontWeight="700">PRE-FLIGHT ESTIMATOR</text>
                    <text x="150" y="65" fontSize="8.5" fontWeight="800" fill="#0369A1">Jezreel Dave Leybag (Gemini Cert)</text>

                    {/* Column 3 Top: Dwg No */}
                    <text x="310" y="16" fontSize="7.5" fill="#64748B" fontWeight="700">DWG NO. / REV</text>
                    <text x="310" y="30" fontSize="9" fontWeight="800" fill="#0F172A">CAD-01 • REV B</text>

                    {/* Column 3 Bottom: Status */}
                    <text x="310" y="52" fontSize="7.5" fill="#64748B" fontWeight="700">PERMIT STATUS</text>
                    <text x="310" y="65" fontSize="8.5" fontWeight="800" fill="#059669">APPROVED FOR PERMIT</text>
                  </g>
                </svg>
              </div>
            )}

            {/* VIEW 3: UL 48 ELECTRICAL SCHEDULE */}
            {viewMode === 'elec' && (
              <div className="w-full max-w-4xl p-6 rounded-2xl bg-white border border-gray-200">
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-extrabold text-[#111213]">
                      UL 48 Single-Line Electric Sign Wiring Schedule
                    </h3>
                    <p className="text-xs text-gray-500">
                      NEC Article 600 Compliance &amp; Power Supply Loading Calculation
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    NEC 80% Headroom Verified
                  </span>
                </div>

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFF6EB] flex items-center justify-center text-[#F79223] shrink-0">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">
                    Interactive Component Inspector
                  </span>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-extrabold text-gray-900">
                      {activeInspector?.name || 'Component Spec'}
                    </strong>
                    <span className="text-xs text-gray-500 font-mono">
                      ({activeInspector?.code})
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {activeInspector?.detail}
                  </p>
                </div>
              </div>

              {/* CHIP SELECTORS */}
              <div className="flex flex-wrap gap-1.5">
                {project.inspectorItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveInspector(item)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      activeInspector?.id === item.id
                        ? 'bg-[#111213] text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Layers, Sun, Moon, Printer, FileText, CheckCircle2, Info, Compass, ShieldAlert, Zap, Search, Eye, Sparkles } from 'lucide-react';

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
          <div className="relative p-4 sm:p-8 bg-white flex flex-col items-center justify-center min-h-[420px]">
            
            {/* LIVE CANVAS FOCUS HUD BADGE */}
            <div className="absolute top-6 right-8 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 border border-gray-300 shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#F79223] animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F79223] absolute left-3.5" />
              <span className="text-[11px] font-bold text-gray-800 font-mono">
                FOCUS: <span className="text-[#F79223] uppercase">{activeInspector?.name}</span>
              </span>
            </div>

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

                    {/* STANDOFF MARKERS (IF STANDOFFS INSPECTED) */}
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

                {/* CASE 3: LUMINA BIOTECH ELEVATION */}
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
                    
                    {/* 6x GYFORD MACHINED STAINLESS STANDOFFS */}
                    {[
                      [220, 65], [430, 65], [640, 65],
                      [220, 255], [430, 255], [640, 255]
                    ].map(([cx, cy], i) => (
                      <g key={i}>
                        {activeInspector?.id === 'standoffs' && (
                          <circle cx={cx} cy={cy} r="18" fill="none" stroke="#F79223" strokeWidth="2" strokeDasharray="3 3" />
                        )}
                        <circle cx={cx} cy={cy} r="10" fill={activeInspector?.id === 'standoffs' ? "#F79223" : "#94A3B8"} stroke="#475569" strokeWidth="2" />
                        <circle cx={cx} cy={cy} r="4" fill="#CBD5E1" />
                      </g>
                    ))}

                    {/* 36" CIRCULAR BRONZE LOGO & TYPOGRAPHY */}
                    <g transform="translate(430, 140)">
                      <circle 
                        cx="0" cy="-15" r="32" 
                        fill="#78350F" 
                        stroke={activeInspector?.id === 'logo' ? '#F79223' : '#B45309'} 
                        strokeWidth={activeInspector?.id === 'logo' ? '4' : '3'} 
                      />
                      <path d="M -16 -15 L 16 -15 M 0 -31 L 0 1" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
                      <text 
                        x="0" y="38" fontSize="26" fontWeight="800" 
                        fill={activeInspector?.id === 'logo' ? '#B45309' : '#78350F'} 
                        textAnchor="middle" letterSpacing="6"
                      >
                        LUMINA BIOTECH
                      </text>
                      <text x="0" y="56" fontSize="10.5" fontWeight="700" fill="#0284C7" textAnchor="middle" letterSpacing="3">
                        LIFE SCIENCE INNOVATION LABS
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
                    <g transform="translate(30, 24)">
                      <text x="0" y="16" fontSize="11.5" fontWeight="800" fill="#0F172A" letterSpacing="0.8">
                        SECTION A-A: REVERSE HALO-LIT CHANNEL LETTER PROFILE
                      </text>
                      <text x="0" y="30" fontSize="9" fill="#64748B" fontWeight="600">
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

                    {/* 9. WEEP HOLE WITH DEDICATED LEADER LINE (POINTING LEFT, NO COLLISION) */}
                    <circle cx="340" cy="296" r="3.5" fill="#FFFFFF" stroke={activeInspector?.id === 'weep' ? '#F79223' : '#EF4444'} strokeWidth="2" />
                    <line x1="340" y1="300" x2="315" y2="326" stroke="#EF4444" strokeWidth="1" />
                    <line x1="315" y1="326" x2="240" y2="326" stroke="#EF4444" strokeWidth="1" />
                    <text x="235" y="324" fontSize="7.5" fill="#EF4444" fontWeight="800" textAnchor="end">
                      1/4" WEEP HOLE {activeInspector?.id === 'weep' && '★'}
                    </text>
                    <text x="235" y="334" fontSize="6.5" fill="#64748B" textAnchor="end">
                      Condensation Drainage
                    </text>

                    {/* RETURN DEPTH DIMENSION LINE (HORIZONTAL, SPACED DOWN AT Y=348) */}
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

                    {/* CALLOUT LABELS (COMPACT & AIRY) */}
                    {/* Face Callout */}
                    <line x1="285" y1="120" x2="160" y2="100" stroke={activeInspector?.id === 'face' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'face' ? '1.5' : '1'} />
                    <rect x="15" y="88" width="140" height="26" rx="4" fill={activeInspector?.id === 'face' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'face' ? '#F79223' : '#CBD5E1'} />
                    <text x="150" y="100" fontSize="8" fill={activeInspector?.id === 'face' ? '#FFFFFF' : '#0F172A'} fontWeight="800" textAnchor="end">
                      0.063" 5052-H32 FACE {activeInspector?.id === 'face' && '★'}
                    </text>
                    <text x="150" y="109" fontSize="6.5" fill={activeInspector?.id === 'face' ? '#FFFFFF' : '#64748B'} textAnchor="end">
                      Satin Black Polyurethane
                    </text>

                    {/* Return Callout */}
                    <line x1="390" y1="90" x2="480" y2="65" stroke={activeInspector?.id === 'return' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'return' ? '1.5' : '1'} />
                    <rect x="480" y="52" width="160" height="26" rx="4" fill={activeInspector?.id === 'return' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'return' ? '#F79223' : '#CBD5E1'} />
                    <text x="488" y="64" fontSize="8" fill={activeInspector?.id === 'return' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      3.50" DEPTH ALUM RETURN {activeInspector?.id === 'return' && '★'}
                    </text>
                    <text x="488" y="73" fontSize="6.5" fill={activeInspector?.id === 'return' ? '#FFFFFF' : '#64748B'}>
                      0.040" Flanged Sidewalls
                    </text>

                    {/* LEDs Callout */}
                    <line x1="465" y1="194" x2="540" y2="175" stroke={activeInspector?.id === 'leds' ? '#F79223' : '#D97706'} strokeWidth={activeInspector?.id === 'leds' ? '1.5' : '1'} />
                    <rect x="540" y="162" width="140" height="26" rx="4" fill={activeInspector?.id === 'leds' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'leds' ? '#F79223' : '#CBD5E1'} />
                    <text x="548" y="174" fontSize="8" fill={activeInspector?.id === 'leds' ? '#FFFFFF' : '#D97706'} fontWeight="800">
                      12V IP67 LED MODULES {activeInspector?.id === 'leds' && '★'}
                    </text>
                    <text x="548" y="183" fontSize="6.5" fill={activeInspector?.id === 'leds' ? '#FFFFFF' : '#64748B'}>
                      6500K Halo Illumination
                    </text>

                    {/* Standoff Callout */}
                    <line x1="635" y1="137" x2="680" y2="140" stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'standoffs' ? '1.5' : '1'} />
                    <rect x="680" y="126" width="150" height="26" rx="4" fill={activeInspector?.id === 'standoffs' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#CBD5E1'} />
                    <text x="688" y="138" fontSize="8" fill={activeInspector?.id === 'standoffs' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      1.50" MACHINED STANDOFF {activeInspector?.id === 'standoffs' && '★'}
                    </text>
                    <text x="688" y="147" fontSize="6.5" fill={activeInspector?.id === 'standoffs' ? '#FFFFFF' : '#64748B'}>
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
                    <g transform="translate(30, 24)">
                      <text x="0" y="16" fontSize="11.5" fontWeight="800" fill="#0F172A" letterSpacing="0.8">
                        SECTION B-B: FRONT-LIT CHANNEL LETTER ON EXTRUDED RACEWAY
                      </text>
                      <text x="0" y="30" fontSize="9" fill="#64748B" fontWeight="600">
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

                    {/* WEEP HOLE WITH DEDICATED LEADER LINE (POINTING LEFT, NO COLLISION) */}
                    <circle cx="280" cy="296" r="3.5" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
                    <line x1="280" y1="300" x2="255" y2="326" stroke="#EF4444" strokeWidth="1" />
                    <line x1="255" y1="326" x2="180" y2="326" stroke="#EF4444" strokeWidth="1" />
                    <text x="175" y="324" fontSize="7.5" fill="#EF4444" fontWeight="800" textAnchor="end">
                      1/4" WEEP HOLE
                    </text>
                    <text x="175" y="334" fontSize="6.5" fill="#64748B" textAnchor="end">
                      Condensation Baffle
                    </text>

                    {/* RETURN DEPTH DIMENSION LINE (HORIZONTAL, SPACED DOWN AT Y=348) */}
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
                    <line x1="215" y1="120" x2="140" y2="100" stroke={activeInspector?.id === 'face' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'face' ? '1.5' : '1'} />
                    <rect x="15" y="88" width="130" height="26" rx="4" fill={activeInspector?.id === 'face' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'face' ? '#F79223' : '#CBD5E1'} />
                    <text x="140" y="100" fontSize="8" fill={activeInspector?.id === 'face' ? '#FFFFFF' : '#0F172A'} fontWeight="800" textAnchor="end">
                      3/16" ACRYLIC FACE {activeInspector?.id === 'face' && '★'}
                    </text>
                    <text x="140" y="109" fontSize="6.5" fill={activeInspector?.id === 'face' ? '#FFFFFF' : '#64748B'} textAnchor="end">
                      #7328 White + 3M Red
                    </text>

                    {/* Trim Cap Callout */}
                    <line x1="230" y1="82" x2="310" y2="60" stroke={activeInspector?.id === 'trim' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'trim' ? '1.5' : '1'} />
                    <rect x="310" y="48" width="140" height="26" rx="4" fill={activeInspector?.id === 'trim' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'trim' ? '#F79223' : '#CBD5E1'} />
                    <text x="318" y="60" fontSize="8" fill={activeInspector?.id === 'trim' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      1.0" JEWELITE TRIM CAP {activeInspector?.id === 'trim' && '★'}
                    </text>
                    <text x="318" y="69" fontSize="6.5" fill={activeInspector?.id === 'trim' ? '#FFFFFF' : '#64748B'}>
                      Bonded CAB Butyrate
                    </text>

                    {/* Return Callout */}
                    <line x1="410" y1="90" x2="490" y2="60" stroke={activeInspector?.id === 'return' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'return' ? '1.5' : '1'} />
                    <rect x="490" y="48" width="140" height="26" rx="4" fill={activeInspector?.id === 'return' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'return' ? '#F79223' : '#CBD5E1'} />
                    <text x="498" y="60" fontSize="8" fill={activeInspector?.id === 'return' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      5.0" RETURN DEPTH {activeInspector?.id === 'return' && '★'}
                    </text>
                    <text x="498" y="69" fontSize="6.5" fill={activeInspector?.id === 'return' ? '#FFFFFF' : '#64748B'}>
                      0.040" Pre-Coated Black
                    </text>

                    {/* Raceway Callout */}
                    <line x1="680" y1="105" x2="680" y2="60" stroke={activeInspector?.id === 'raceway' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'raceway' ? '1.5' : '1'} />
                    <rect x="650" y="38" width="150" height="26" rx="4" fill={activeInspector?.id === 'raceway' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'raceway' ? '#F79223' : '#CBD5E1'} />
                    <text x="658" y="50" fontSize="8" fill={activeInspector?.id === 'raceway' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      7" x 4.5" ALUM RACEWAY {activeInspector?.id === 'raceway' && '★'}
                    </text>
                    <text x="658" y="59" fontSize="6.5" fill={activeInspector?.id === 'raceway' ? '#FFFFFF' : '#64748B'}>
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

                {/* CASE 3: CAD SECTION C-C (LUMINA BIOTECH - INTERIOR STANDOFF PLAQUE) */}
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
                    <g transform="translate(30, 24)">
                      <text x="0" y="16" fontSize="11.5" fontWeight="800" fill="#0F172A" letterSpacing="0.8">
                        SECTION C-C: INTERIOR ARCHITECTURAL STANDOFF PLAQUE DETAIL
                      </text>
                      <text x="0" y="30" fontSize="9" fill="#64748B" fontWeight="600">
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

                    {/* 4. 1/2" ACRYLIC LOGO WITH BRONZE CHEMETAL FACE */}
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
                    {/* Bronze Logo Callout */}
                    <line x1="504" y1="140" x2="360" y2="120" stroke={activeInspector?.id === 'logo' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'logo' ? '1.5' : '1'} />
                    <rect x="190" y="108" width="165" height="26" rx="4" fill={activeInspector?.id === 'logo' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'logo' ? '#F79223' : '#CBD5E1'} />
                    <text x="345" y="120" fontSize="8" fill={activeInspector?.id === 'logo' ? '#FFFFFF' : '#0F172A'} fontWeight="800" textAnchor="end">
                      BRONZE METAL LAMINATE {activeInspector?.id === 'logo' && '★'}
                    </text>
                    <text x="345" y="129" fontSize="6.5" fill={activeInspector?.id === 'logo' ? '#FFFFFF' : '#64748B'} textAnchor="end">
                      Chemetal #903 on 1/2" Acrylic
                    </text>

                    {/* Acrylic Plaque Callout */}
                    <line x1="550" y1="95" x2="420" y2="70" stroke={activeInspector?.id === 'plaque' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'plaque' ? '1.5' : '1'} />
                    <rect x="260" y="58" width="155" height="26" rx="4" fill={activeInspector?.id === 'plaque' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'plaque' ? '#F79223' : '#CBD5E1'} />
                    <text x="405" y="70" fontSize="8" fill={activeInspector?.id === 'plaque' ? '#FFFFFF' : '#0F172A'} fontWeight="800" textAnchor="end">
                      1/4" CLEAR ACRYLIC PLAQUE {activeInspector?.id === 'plaque' && '★'}
                    </text>
                    <text x="405" y="79" fontSize="6.5" fill={activeInspector?.id === 'plaque' ? '#FFFFFF' : '#64748B'} textAnchor="end">
                      Flame-Polished Beveled Edges
                    </text>

                    {/* Gyford Standoff Callout */}
                    <line x1="630" y1="115" x2="630" y2="70" stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#0284C7'} strokeWidth={activeInspector?.id === 'standoffs' ? '1.5' : '1'} />
                    <rect x="545" y="48" width="160" height="26" rx="4" fill={activeInspector?.id === 'standoffs' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'standoffs' ? '#F79223' : '#CBD5E1'} />
                    <text x="553" y="60" fontSize="8" fill={activeInspector?.id === 'standoffs' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      GYFORD STANDOFFS (6x) {activeInspector?.id === 'standoffs' && '★'}
                    </text>
                    <text x="553" y="69" fontSize="6.5" fill={activeInspector?.id === 'standoffs' ? '#FFFFFF' : '#64748B'}>
                      1.0" OD x 1.0" Projection SS
                    </text>

                    {/* Spotlight Callout */}
                    <line x1="220" y1="40" x2="160" y2="40" stroke={activeInspector?.id === 'lighting' ? '#F79223' : '#EAB308'} strokeWidth={activeInspector?.id === 'lighting' ? '1.5' : '1'} />
                    <rect x="25" y="28" width="130" height="26" rx="4" fill={activeInspector?.id === 'lighting' ? '#F79223' : '#FFFFFF'} stroke={activeInspector?.id === 'lighting' ? '#F79223' : '#CBD5E1'} />
                    <text x="33" y="40" fontSize="8" fill={activeInspector?.id === 'lighting' ? '#FFFFFF' : '#0F172A'} fontWeight="800">
                      GALLERY SPOTLIGHTS {activeInspector?.id === 'lighting' && '★'}
                    </text>
                    <text x="33" y="49" fontSize="6.5" fill={activeInspector?.id === 'lighting' ? '#FFFFFF' : '#64748B'}>
                      3000K Overhead Track Wash
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
              
              {/* COMPONENT INFO CARD */}
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FFF6EB] flex items-center justify-center text-[#F79223] shrink-0 border border-[#F79223]/20 shadow-sm">
                  <Info className="w-5 h-5" />
                </div>
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

              {/* TACTILE TOGGLE BUTTONS */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {project.inspectorItems.map((item) => {
                  const isSelected = activeInspector?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveInspector(item)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                        isSelected
                          ? 'bg-[#111213] text-white ring-2 ring-[#F79223] shadow-md shadow-black/15 scale-105'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <span 
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-[#F79223] animate-pulse' : 'bg-gray-300'
                        }`} 
                      />
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

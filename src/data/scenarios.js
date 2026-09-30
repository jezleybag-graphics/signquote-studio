// Commercial Project Database & Wholesale Fabricator Ecosystem
// Engineered by Jezreel Dave Leybag for US Fastsigns Center Operations

export const projectsData = {
  case1: {
    id: "case1",
    jobId: "JOB #FS-2026-084",
    client: "Apex Dental Center — Storefront Submittal",
    subtitle: "Dr. Rachel Vance, DDS • 1420 N. Meridian Pkwy, Suite 104",
    contractValue: "$3,360.00",
    model: "Hybrid 50% Outsourced (Direct Sign Wholesale)",
    productionBadge: "Wholesale Trade Channel Letters",
    rawRfp: `Client: Apex Dental Center (Dr. Rachel Vance, DDS)
Location: 1420 N. Meridian Pkwy, Suite 104
Scope: Primary exterior building entrance sign above split-face brick facade.
Specs: 18-inch reverse halo-lit channel letters spelling 'APEX DENTAL'.
Span: Approximately 14 feet overall.
Colors: Satin black aluminum faces and returns. Soft warm 6500K LED halo glow reflecting against facade.
Mounting: Uneven split-face brick exterior. Landlord mandates letters pre-mounted to a 3mm black ACM backer tray on 1.5-inch standoffs.
Electrical: 120V primary feed in attic space. Serialized UL 48 listing required.`,
    classification: "Exterior Reverse Halo-Lit Channel Letters",
    dims: '18" Height • 10 Characters • 14 ft Overall Span',
    letterHeight: "18",
    returnDepth: "3.5",
    face: '0.063" Router-Cut Aluminum (Satin Black Polyurethane)',
    returns: '3.5" Depth • 0.040" Aluminum • Welded Flange',
    back: '3/16" Optical-Grade Clear Polycarbonate Back Plate',
    leds: "12V DC IP67 Hanley / Acrovane LEDs (6500K Daylight White)",
    drivers: "2x 60W UL Class 2 Drivers (42W load each ≤ 48W limit)",
    mounting: '1.5" Machined Standoffs to 3mm Black ACM Backer Panel',
    ulCompliance: "Serialized UL 48 Electric Sign Enclosure Label Required",
    baseCost: 1250,
    freight: 280,
    laborHours: 2.0,
    partnerId: "dsw",
    diagnostic: [
      "Gemini AI NLP Engine: Analysis completed in 0.38s (Confidence 99.4%)",
      "Extracted: 18\" Reverse Halo-Lit Channel Letters on 3mm Black ACM Tray",
      "Calculated: 14'-0\" Span • 10 Characters • 116 High-Output LED Modules",
      "Electrical QC: 2x 60W Drivers @ 42W Load (87.5% load ≤ 48W NEC 80% Safe Limit)",
      "Matched Trade Fabricator: Direct Sign Wholesale (Denver, CO — 8-10 Days)"
    ],
    inspectorItems: [
      { id: "face", name: "Letter Face", detail: '0.063" 5052-H32 Aluminum, Waterjet/CNC Routed, Satin Black Polyurethane Enamel', code: "PART #CL-FACE-063", vendor: "Direct Sign Wholesale", material: "5052-H32 Aluminum", qc: "Fastsigns Satin Black Enamel Spec", iconType: "metal-face" },
      { id: "return", name: "Sidewall Return", detail: '0.040" 5052-H32 Aluminum, 3.50" Depth, Machine-Bent & Clinch-Riveted Flanges with UL 48 Baffled Drainage Weep Holes', code: "PART #CL-RET-040", vendor: "Direct Sign Wholesale", material: "0.040\" Formed Aluminum", qc: "Clinch-Riveted Flange & UL 48 Weep Drainage", iconType: "return" },
      { id: "leds", name: "12V LED Modules", detail: "Acrovane 12V DC IP67 High-Output Modules, 6500K, 0.72W/mod, 160° Batwing Lens", code: "PART #LED-12V-65K", vendor: "Acrovane / SloanLED", material: "IP67 Weatherproof Silicon", qc: "UL 48 / Class 2 Continuous Duty", iconType: "leds" },
      { id: "polycarb", name: "Clear Back Plate", detail: '3/16" Optical-Grade Clear Lexan Polycarbonate Back with Countersunk Fasteners', code: "PART #PC-CLR-316", vendor: "Piedmont Plastics", material: "Lexan Polycarbonate", qc: "UV-Resistant Non-Yellowing", iconType: "polycarb" },
      { id: "standoffs", name: "Standoff Spacers", detail: '1.50" OD x 1.50" Length Machined Aluminum Standoffs with 1/4"-20 Threaded Rod', code: "PART #SO-150-AL", vendor: "Fastenal / Trade Hardware", material: "6061-T6 Machined Aluminum", qc: "Structural Wind-Load Tested", iconType: "standoffs" },
      { id: "backer", name: "ACM Backer Panel", detail: '3mm Alupanel / Dibond Solid PE Core Sandwich Panel, Satin Black Enamel Finish', code: "PART #ACM-3MM-BLK", vendor: "Alupanel / 3A Composites", material: "3mm Aluminum Composite", qc: "Exterior Architectural Grade", iconType: "backer" }
    ],
    cbItems: [
      { code: "#CL-HALO-18", desc: '18" Reverse Halo-Lit Channel Letter Set (10 Chars, 0.063 Alum, 3.5" Returns)', qty: "1 Set", cost: 1250, retail: 2500 },
      { code: "#SUB-ACM-3MM", desc: '3mm Satin Black ACM Backer Tray (2\'-6" x 15\'-0") w/ 1.5" Standoff Hardware', qty: "1 Tray", cost: 180, retail: 360 },
      { code: "#ELEC-DRV-60W", desc: "UL Listed Class 2 60W 12V DC Power Supplies & Conduit Feed Kit", qty: "2 Each", cost: 90, retail: 180 },
      { code: "#FRT-CRATE", desc: "Custom Heavy-Duty Wooden Crating & LTL Freight to Center [Denver → 19001]", qty: "1 LTL", cost: 280, retail: 560 },
      { code: "#LAB-STG-QA", desc: "In-House Staging, Bench Testing, UL 48 Labeling & QC Inspection (2.0 hrs @ $75)", qty: "2.0 Hrs", cost: 150, retail: 300 }
    ]
  },
  case2: {
    id: "case2",
    jobId: "JOB #FS-2026-119",
    client: "Metro Burger Grill — Strip Center Storefront",
    subtitle: "Legacy Dining Group • Shoppes at Legacy Creek, Unit 12",
    contractValue: "$4,280.00",
    model: "Hybrid 50% Outsourced (Quality Manufacturing)",
    productionBadge: "Raceway-Mounted Front-Lit Letters",
    rawRfp: `Client: Metro Burger Grill (Legacy Dining Group)
Location: Shoppes at Legacy Creek, Unit 12
Scope: Storefront retail strip center main fascia.
Specs: 24-inch front-lit LED channel letters spelling 'METRO BURGER'.
Colors: Vibrant #7328 Sign White acrylic with 3M 3630-33 Red translucent vinyl face overlay. 5-inch black aluminum returns with 1-inch Jewelite trim cap.
Mounting: Landlord strict lease clause requires a 7" x 4.5" extruded aluminum raceway painted beige to match building facade. Direct building penetrations prohibited.
Electrical: Standard 12V LED modules pre-wired inside raceway. UL listed.`,
    classification: "Exterior Front-Lit LED Channel Letters",
    dims: '24" Height • 11 Characters • 18 ft Overall Span',
    letterHeight: "24",
    returnDepth: "5.0",
    face: '3/16" Cast #7328 Sign-White Acrylic + 3M 3630-33 Red Vinyl Overlay',
    returns: '5.0" Depth • 0.040" Aluminum • 1" Black Jewelite Trim Cap',
    back: '0.063" Router-Cut Mill Finish Aluminum Back Plate',
    leds: "12V DC High-Output Red/White LEDs (IP67 Rated)",
    drivers: "3x 60W UL Class 2 Drivers pre-wired inside Raceway (Load: 44W each)",
    mounting: '7" x 4.5" Extruded Aluminum Raceway (Painted Khaki Beige to Match Facade)',
    ulCompliance: "Serialized UL 48 Electric Sign Enclosure Label Required",
    baseCost: 1650,
    freight: 340,
    laborHours: 2.5,
    partnerId: "qm",
    diagnostic: [
      "Gemini AI NLP Engine: Analysis completed in 0.41s (Confidence 99.1%)",
      "Extracted: 24\" Front-Lit Channel Letters on 7\"x4.5\" Landlord Raceway",
      "Calculated: 18'-0\" Span • 11 Characters • Dual-Row Staggered LED Layout",
      "Electrical QC: 3x 60W Drivers inside Raceway @ 44W Load (Safe ≤ 48W limit)",
      "Matched Trade Fabricator: Quality Manufacturing (Lancaster, PA — 10-12 Days)"
    ],
    inspectorItems: [
      { id: "face", name: "Acrylic Face", detail: '3/16" Cast #7328 Sign-White Acrylic with 3M 3630-33 Red Translucent Vinyl Overlay', code: "PART #ACR-7328-316", vendor: "Piedmont / 3M Commercial", material: "Cast Acrylic + 3M Vinyl", qc: "Even Light Diffusion Tested", iconType: "acrylic-face" },
      { id: "trim", name: "Jewelite Trim Cap", detail: '1.0" Heavy-Duty Extruded Butyrate Trim Cap, Bonded with Weld-On Solvent', code: "PART #TC-JEW-100", vendor: "Gemini / Jewelite", material: "Extruded CAB Butyrate", qc: "Weld-On #16 Chemical Bond", iconType: "trim" },
      { id: "return", name: "5\" Aluminum Return", detail: '5.0" Depth 0.040" Pre-Coated Black Aluminum, Machine-Bent & Clinch-Riveted', code: "PART #CL-RET-050", vendor: "Quality Manufacturing", material: "0.040\" Baked Enamel Coil", qc: "Light-Tight Sealed Seams", iconType: "return" },
      { id: "raceway", name: "Landlord Raceway", detail: '7.0" x 4.5" Extruded Aluminum Wireway Box, Painted Khaki Beige to Match Facade', code: "PART #RACE-7X45", vendor: "Quality Manufacturing", material: "6063-T5 Extruded Aluminum", qc: "Landlord Lease Clause Compliant", iconType: "raceway" },
      { id: "drivers", name: "UL Class 2 Drivers", detail: "3x 60W 12V DC Constant Voltage Power Supplies Pre-Wired in Raceway with Disconnect", code: "PART #DRV-60W-12V", vendor: "Mean Well / SloanLED", material: "Class 2 Power Supply", qc: "NEC 80% Rule (44W load ≤ 48W)", iconType: "drivers" }
    ],
    cbItems: [
      { code: "#CL-FRONT-24", desc: '24" Front-Lit LED Channel Letters (11 Chars, 3/16 Acrylic, 5" Black Returns)', qty: "1 Set", cost: 1650, retail: 3300 },
      { code: "#RACE-7X45-18", desc: '7" x 4.5" Extruded Aluminum Raceway (18 ft) Painted Facade Beige', qty: "1 Unit", cost: 320, retail: 640 },
      { code: "#ELEC-DRV-60W", desc: "UL Class 2 60W Drivers Pre-Wired inside Raceway w/ Toggle Disconnect", qty: "3 Each", cost: 135, retail: 270 },
      { code: "#FRT-CRATE", desc: "Freight & Heavy-Duty Crating from Lancaster, PA to Center [Zip 19001]", qty: "1 LTL", cost: 340, retail: 680 },
      { code: "#LAB-STG-QA", desc: "In-House Staging, Bench Testing, Photometric Check & UL 48 Labeling", qty: "2.5 Hrs", cost: 187.50, retail: 375 }
    ]
  },
  case3: {
    id: "case3",
    jobId: "JOB #FS-2026-205",
    client: "J.STUDIO — Executive Design Suite",
    subtitle: "Jezreel Dave Leybag Design & Signage Headquarters • Suite 400",
    contractValue: "$2,180.00",
    model: "In-House Finishing + Wholesale Architectural Blank",
    productionBadge: "Architectural Standoff Plaque",
    rawRfp: `Client: J.STUDIO (Jezreel Dave Leybag Design & Signage Headquarters)
Location: 800 Innovation Way, Executive 4th Floor
Scope: Corporate interior lobby directory and dimensional brand display.
Specs: 36-inch J.STUDIO architectural crest logo in 1/2-inch flat-cut acrylic with Chemetal brushed bronze metal laminate face.
Backer: Mounted to a 48" x 72" clear 1/4-inch cast optical acrylic backer plaque with precision flame-polished beveled edges.
Mounting: 6 solid machined stainless steel Gyford standoff barrels (1-inch diameter, 1-inch offset) anchored to drywall with spring toggles.
Lighting: Non-illuminated architectural display (illuminated via existing 3000K museum track spotlights).`,
    classification: "Interior Architectural Standoff Acrylic Plaque",
    dims: '36" J.STUDIO Dimensional Bronze Logo on 48" x 72" Clear Plaque',
    letterHeight: "36",
    returnDepth: "0.5",
    face: '1/2" Cast Acrylic with Chemetal Brushed Bronze Laminate Face',
    returns: "N/A (Flat-Cut Dimensional Graphic with Polished Edges)",
    back: '1/4" Cast Clear Acrylic Plaque (Flame-Polished Beveled Edges)',
    leds: "Non-Illuminated (Ambient 3000K Gallery Track Spotlights)",
    drivers: "N/A (Passive Interior Display)",
    mounting: '6x Gyford Machined Stainless Standoffs (1.0" OD x 1.0" Standoff Barrel)',
    ulCompliance: "Interior Architectural Display (No Electrical Permit Required)",
    baseCost: 780,
    freight: 160,
    laborHours: 1.5,
    partnerId: "gemini",
    diagnostic: [
      "Gemini AI NLP Engine: Analysis completed in 0.32s (Confidence 99.8%)",
      "Extracted: 36\" J.STUDIO Bronze Logo on 48\"x72\" Clear Flame-Polished Acrylic",
      "Calculated: 6x Gyford Stainless Standoffs • Interior Non-Illuminated Specification",
      "Material Spec: Chemetal #903 Brushed Bronze Laminate on 1/2\" Acrylic Core",
      "Matched Trade Fabricator: Gemini Made (Cannon Falls, MN — Lifetime Warranty)"
    ],
    inspectorItems: [
      { id: "plaque", name: "Clear Acrylic Plaque", detail: '48" x 72" 1/4" Optical Cast Clear Acrylic with Precision Flame-Polished Beveled Edges', code: "PART #ACR-CLR-14", vendor: "Gemini Made (Cannon Falls, MN)", material: "1/4\" Cast Optical Acrylic", qc: "Flame-Polished Optical Finish", iconType: "plaque" },
      { id: "logo", name: "J.STUDIO Bronze Logo", detail: '36" Dimensional 1/2" Acrylic Core with Chemetal Brushed Bronze Anodized Surface & Signature Wave Motif', code: "PART #LAM-BRZ-500", vendor: "Gemini / Chemetal", material: "Chemetal #903 on Acrylic", qc: "Precision CNC Routing & Deburred", iconType: "logo" },
      { id: "standoffs", name: "Gyford Standoffs", detail: '1.0" OD x 1.0" Projection Solid Machined Stainless Steel Hardware with Tamperproof Caps', code: "PART #GYF-SO-100", vendor: "Gyford Standoff Systems", material: "316 Marine-Grade Stainless", qc: "1/4\"-20 Heavy Drywall Anchors", iconType: "standoffs" },
      { id: "lighting", name: "Gallery Spotlights", detail: "Overhead 3000K Warm Directional Track Spotlights (Existing Building Circuit)", code: "SPEC #LOBBY-LIGHT", vendor: "SORAA / Existing Facility", material: "3000K Warm White CRI 95", qc: "Glaze & Reflection Free Angle", iconType: "lighting" }
    ],
    cbItems: [
      { code: "#PLAQ-ACR-4872", desc: '48" x 72" 1/4" Cast Clear Acrylic Plaque w/ 6 Pre-Drilled Standoff Holes', qty: "1 Each", cost: 420, retail: 840 },
      { code: "#LOGO-JSTUDIO-36", desc: '36" J.STUDIO Signature Logo (1/2" Acrylic with Chemetal Brushed Bronze Face)', qty: "1 Unit", cost: 360, retail: 720 },
      { code: "#HDW-GYF-SO", desc: '6x Gyford Machined Stainless Steel Standoffs (1" x 1") & Drywall Toggles', qty: "6 Pcs", cost: 90, retail: 180 },
      { code: "#FRT-CRATE", desc: "Freight & Flat-Pack Foam Protective Crating from Cannon Falls, MN", qty: "1 LTL", cost: 160, retail: 320 },
      { code: "#LAB-FINISH", desc: "In-House Solvent Bonding, Flame Edge Polish Inspection & Cleaning", qty: "1.5 Hrs", cost: 112.50, retail: 225 }
    ]
  }
};

export const wholesaleVendors = {
  dsw: {
    id: "dsw",
    name: "Direct Sign Wholesale",
    location: "Denver, CO",
    leadTime: "8–10 Days",
    specialty: "Channel Letters (Front & Reverse Halo)",
    rating: "4.9 / 5.0",
    phone: "1-888-278-8383",
    tagline: "North America's Dedicated Trade-Only Channel Letter Source",
    costFactor: 1.0,
    freightDelta: 0
  },
  gemini: {
    id: "gemini",
    name: "Gemini Sign Products",
    location: "Cannon Falls, MN",
    leadTime: "6–8 Days",
    specialty: "Cast Metal & Dimensional Acrylic",
    rating: "5.0 / 5.0",
    phone: "1-800-538-8377",
    tagline: "Industry Standard for Dimensional Letters & Plaques (Lifetime Guarantee)",
    costFactor: 1.05,
    freightDelta: -40
  },
  qm: {
    id: "qm",
    name: "Quality Manufacturing",
    location: "Lancaster, PA",
    leadTime: "10–12 Days",
    specialty: "Extruded Cabinets & Letters",
    rating: "4.8 / 5.0",
    phone: "1-800-423-0107",
    tagline: "Specialist in Extruded Aluminum Sign Cabinets & Automated Letters",
    costFactor: 0.96,
    freightDelta: -30
  },
  howard: {
    id: "howard",
    name: "Howard Industries",
    location: "Fairview, PA",
    leadTime: "7–10 Days",
    specialty: "Post & Panel Systems",
    rating: "4.8 / 5.0",
    phone: "1-800-458-0591",
    tagline: "Architectural Signage Systems & Exterior Wayfinding Post & Panel",
    costFactor: 1.02,
    freightDelta: 15
  }
};

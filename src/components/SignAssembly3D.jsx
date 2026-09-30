import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  RotateCw, Layers, Compass, Lightbulb
} from 'lucide-react';

// ============================================================================
// EXACT 2D CONTOUR PATHS FOR THE 4 J.STUDIO BRAND GLYPHS
// Mathematically extracted from official branding/logo-mark.png
// ============================================================================
function getBrandLogoShapes() {
  // Shape 1 (Left orange teardrop / curved crescent)
  const s1 = new THREE.Shape();
  const pts1 = [
    [-7.62, -1.123], [-7.931, -1.227], [-8.285, -1.538], [-8.638, -1.975],
    [-9.033, -2.62], [-9.387, -3.597], [-9.47, -4.116], [-9.47, -4.802],
    [-9.241, -5.821], [-8.992, -6.383], [-8.638, -6.944], [-8.326, -7.339],
    [-7.973, -7.672], [-7.661, -7.796], [-7.328, -7.796], [-7.121, -7.734],
    [-6.85, -7.568], [-6.684, -7.38], [-6.538, -7.006], [-6.538, -1.913],
    [-6.663, -1.58], [-6.933, -1.289], [-7.349, -1.123]
  ];
  s1.moveTo(pts1[0][0], pts1[0][1]);
  for (let i = 1; i < pts1.length; i++) s1.lineTo(pts1[i][0], pts1[i][1]);
  s1.closePath();

  // Shape 2 (Orange rounded capsule pill)
  const s2 = new THREE.Shape();
  const pts2 = [
    [-2.755, 1.081], [-3.233, 0.977], [-3.669, 0.707], [-3.981, 0.312],
    [-4.127, -0.104], [-4.148, -8.669], [-3.96, -9.272], [-3.628, -9.667],
    [-3.129, -9.938], [-2.547, -10.0], [-2.131, -9.896], [-1.778, -9.688],
    [-1.445, -9.314], [-1.237, -8.69], [-1.237, -0.229], [-1.424, 0.353],
    [-1.757, 0.748], [-2.193, 0.998]
  ];
  s2.moveTo(pts2[0][0], pts2[0][1]);
  for (let i = 1; i < pts2.length; i++) s2.lineTo(pts2[i][0], pts2[i][1]);
  s2.closePath();

  // Shape 3 (Tall obsidian capsule pill - tallest element)
  const s3 = new THREE.Shape();
  const pts3 = [
    [2.547, 10.0], [1.653, 9.647], [1.341, 9.272], [1.154, 8.69],
    [1.154, -8.586], [1.32, -9.127], [1.715, -9.584], [2.214, -9.834],
    [2.775, -9.875], [3.524, -9.563], [3.857, -9.189], [4.064, -8.586],
    [4.064, 8.69], [3.94, 9.148], [3.607, 9.605], [3.191, 9.875]
  ];
  s3.moveTo(pts3[0][0], pts3[0][1]);
  for (let i = 1; i < pts3.length; i++) s3.lineTo(pts3[i][0], pts3[i][1]);
  s3.closePath();

  // Shape 4 (Obsidian curved outer wing / crescent)
  const s4 = new THREE.Shape();
  const pts4 = [
    [7.266, 5.842], [6.788, 5.634], [6.601, 5.426], [6.455, 5.031],
    [6.455, -4.927], [6.58, -5.281], [6.83, -5.551], [7.121, -5.696],
    [7.495, -5.738], [7.89, -5.613], [8.16, -5.364], [8.805, -3.909],
    [9.324, -1.83], [9.47, 0.146], [9.262, 2.308], [9.012, 3.368],
    [8.638, 4.47], [8.119, 5.53], [7.786, 5.78]
  ];
  s4.moveTo(pts4[0][0], pts4[0][1]);
  for (let i = 1; i < pts4.length; i++) s4.lineTo(pts4[i][0], pts4[i][1]);
  s4.closePath();

  return [s1, s2, s3, s4];
}

// Create High-Resolution Typographic Texture for J.STUDIO plaque (TRANSPARENT BACKGROUND, NO GREY BOX)
function createJStudioTextTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');

  // Completely clear transparent canvas
  ctx.clearRect(0, 0, 1024, 300);

  // Wordmark: J. (Bronze/Orange) STUDIO (Obsidian Charcoal)
  ctx.font = '900 108px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const jWidth = ctx.measureText('J.').width;
  const studioWidth = ctx.measureText('STUDIO').width;
  const totalWidth = jWidth + studioWidth;
  const startX = 512 - totalWidth / 2;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#F79223';
  ctx.fillText('J.', startX, 110);

  ctx.fillStyle = '#111213';
  ctx.fillText('STUDIO', startX + jWidth, 110);

  // Subtitle: ARCHITECTURAL DESIGN & SIGNAGE
  ctx.textAlign = 'center';
  ctx.font = '700 24px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#475569';
  ctx.letterSpacing = '5px';
  ctx.fillText('ARCHITECTURAL DESIGN & SIGNAGE', 512, 190);

  // Executive Identifier
  ctx.font = '600 18px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.letterSpacing = '3px';
  ctx.fillText('JEZREEL DAVE LEYBAG • EXECUTIVE SUITE 400', 512, 235);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  return texture;
}

// ============================================================================
// LAYER POSITION DEFINITIONS
// BaseZ = exact attached contact position at 0% (zero spacing).
// DeltaZ = physical explosion translation offset at 100%.
// ============================================================================
const LAYER_SCHEMATICS = {
  case3: {
    wall:            { baseZ: -0.5, deltaZ: -3.0 },
    standoffBarrels: { baseZ:  0.0, deltaZ: -1.0 },
    plaque:          { baseZ:  2.5, deltaZ:  9.0 },
    standoffCaps:    { baseZ:  3.1, deltaZ: 18.0 },
    logoCore:        { baseZ:  3.1, deltaZ: 26.0 },
    logoFace:        { baseZ:  3.5, deltaZ: 36.0 },
    lighting:        { baseZ:  0.0, deltaZ:  2.0 },
  },
  case1: {
    wall:      { baseZ: -0.5, deltaZ: -3.0 },
    backer:    { baseZ:  0.0, deltaZ:  0.0 },
    standoffs: { baseZ:  0.3, deltaZ:  8.0 },
    polycarb:  { baseZ:  2.8, deltaZ: 18.0 },
    leds:      { baseZ:  3.2, deltaZ: 28.0 },
    return:    { baseZ:  3.1, deltaZ: 40.0 },
    face:      { baseZ:  6.6, deltaZ: 55.0 },
  },
  case2: {
    wall:    { baseZ: -0.5, deltaZ: -3.0 },
    raceway: { baseZ:  0.0, deltaZ:  0.0 },
    drivers: { baseZ:  2.2, deltaZ: 10.0 },
    return:  { baseZ:  4.5, deltaZ: 22.0 },
    leds:    { baseZ:  6.0, deltaZ: 34.0 },
    face:    { baseZ:  8.0, deltaZ: 48.0 },
    trim:    { baseZ:  7.9, deltaZ: 60.0 },
  }
};

// ============================================================================
// MAIN 3D SIGN ASSEMBLY COMPONENT
// ============================================================================
export default function SignAssembly3D({ 
  project, 
  activeInspector, 
  setActiveInspector 
}) {
  const mountRef = useRef(null);
  const [explodeFactor, setExplodeFactor] = useState(0); // 0 = 100% attached altogether
  const [autoRotate, setAutoRotate] = useState(false);
  const [galleryLightsOn, setGalleryLightsOn] = useState(true);

  // References for three.js objects
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const layersGroupRef = useRef({});
  const spotLightsRef = useRef([]);
  const volumetricConesRef = useRef([]);

  // Initialize Three.js Scene (Clean Architectural Daylight Studio)
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. SCENE & ENVIRONMENT
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const bgColor = 0xF8FAFC;
    scene.background = new THREE.Color(bgColor);

    // 2. CAMERA (Airy framing to fit whole sign and lights comfortably)
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(50, 26, 125);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.minDistance = 35;
    controls.maxDistance = 260;
    controls.target.set(0, 0, 2.5);
    controlsRef.current = controls;

    // 5. BALANCED DAYLIGHT LIGHTING (Soft contact shadows directly behind sign)
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1.3);
    dirLight.position.set(25, 45, 70); // Frontal-top key light
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.camera.left = -60;
    dirLight.shadow.camera.right = 60;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    dirLight.shadow.bias = -0.0003;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xE2E8F0, 0.5);
    fillLight.position.set(-50, 30, 40);
    scene.add(fillLight);

    // 6. BUILD PROCEDURAL 3D SIGN FABRICATION LAYERS
    const layerObjects = {};
    const spotLightsList = [];
    const conesList = [];

    buildSignLayers(scene, project, layerObjects, spotLightsList, conesList);
    layersGroupRef.current = layerObjects;
    spotLightsRef.current = spotLightsList;
    volumetricConesRef.current = conesList;

    // Set initial attached positions at explodeFactor = 0
    applyExplodeOffsets(layerObjects, project.id, 0);

    // 7. ANIMATION LOOP
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.0;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. RESIZE LISTENER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, [project.id]);

  // Handle Gallery Spotlight visibility toggle without reloading WebGL scene
  useEffect(() => {
    spotLightsRef.current.forEach(spot => {
      spot.visible = galleryLightsOn;
    });
    volumetricConesRef.current.forEach(cone => {
      cone.visible = galleryLightsOn;
    });
  }, [galleryLightsOn]);

  // Handle Z-Axis Exploded Assembly Dynamic Offsets
  useEffect(() => {
    const layers = layersGroupRef.current;
    if (!layers) return;
    applyExplodeOffsets(layers, project.id, explodeFactor);
  }, [explodeFactor, project.id]);

  // Highlight active subassembly mesh when activeInspector changes
  useEffect(() => {
    const layers = layersGroupRef.current;
    if (!layers || !activeInspector) return;

    Object.entries(layers).forEach(([key, group]) => {
      const isMatch = activeInspector.id === key || 
        (activeInspector.id === 'metal-face' && key === 'face') ||
        (activeInspector.id === 'acrylic-face' && key === 'face') ||
        (activeInspector.id === 'standoffs' && (key === 'standoffBarrels' || key === 'standoffCaps' || key === 'standoffs'));

      group.traverse((child) => {
        if (child.isMesh && child.material && child.material.isMeshStandardMaterial) {
          if (!child.userData.origMaterial) {
            child.userData.origMaterial = child.material;
          }
          if (isMatch) {
            child.material = child.material.clone();
            child.material.emissive = new THREE.Color(0xF79223);
            child.material.emissiveIntensity = 0.55;
          } else {
            child.material = child.userData.origMaterial;
          }
        }
      });
    });
  }, [activeInspector]);

  // Camera preset handlers with balanced framing
  const setCameraView = (type) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (type === 'front') {
      camera.position.set(0, 0, 135);
      controls.target.set(0, 0, 2.5);
    } else if (type === 'side') {
      camera.position.set(130, 0, 3);
      controls.target.set(0, 0, 2.5);
    } else if (type === 'iso') {
      camera.position.set(50, 26, 125);
      controls.target.set(0, 0, 2.5);
    } else if (type === 'top') {
      camera.position.set(0, 130, 10);
      controls.target.set(0, 0, 2.5);
    }
    controls.update();
  };

  return (
    <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-slate-900 flex flex-col select-none">
      
      {/* 3D VIEWPORT TOP OVERLAY CONTROLS */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* CAMERA PRESET BUTTONS */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-md pointer-events-auto">
          <button 
            onClick={() => setCameraView('iso')} 
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-gray-800 hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-1.5"
            title="Isometric 3D Perspective"
          >
            <Compass className="w-3.5 h-3.5 text-[#F79223]" />
            <span>3D ISO</span>
          </button>
          <button 
            onClick={() => setCameraView('front')} 
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
            title="Orthographic Front Elevation"
          >
            Elevation
          </button>
          <button 
            onClick={() => setCameraView('side')} 
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
            title="Cross-Section Profile"
          >
            Cross-Section
          </button>
          <button 
            onClick={() => setCameraView('top')} 
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
            title="Top Plan View"
          >
            Plan
          </button>
        </div>

        {/* TOP RIGHT CONTROLS: GALLERY SPOTLIGHT TOGGLE & TURNTABLE */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {project.id === 'case3' && (
            <button
              onClick={() => setGalleryLightsOn(!galleryLightsOn)}
              className={`px-3 py-1.5 rounded-2xl border text-[11px] font-bold backdrop-blur-md shadow-md transition-all cursor-pointer flex items-center gap-1.5 ${
                galleryLightsOn 
                  ? 'bg-amber-500/15 border-[#F79223] text-amber-900 bg-white' 
                  : 'bg-white/90 border-gray-300 text-gray-500'
              }`}
            >
              <Lightbulb className={`w-3.5 h-3.5 ${galleryLightsOn ? 'text-[#F79223] fill-[#F79223]' : 'text-gray-400'}`} />
              <span>Spotlights: {galleryLightsOn ? 'ON' : 'OFF'}</span>
            </button>
          )}

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-2xl border text-[11px] font-bold backdrop-blur-md shadow-md transition-all cursor-pointer flex items-center gap-1.5 ${
              autoRotate 
                ? 'bg-[#F79223] border-[#F79223] text-white' 
                : 'bg-white/95 border-gray-200/90 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>Turntable</span>
          </button>
        </div>

      </div>

      {/* WEBGL CANVAS CONTAINER */}
      <div 
        ref={mountRef} 
        className="w-full h-[470px] sm:h-[530px] cursor-grab active:cursor-grabbing focus:outline-none"
      />

      {/* 3D VIEWPORT BOTTOM EXPLODED CONTROLS BAR */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* EXPLODED VIEW SLIDER CARD */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#F79223]" />
            <span className="text-xs font-mono font-bold text-gray-800">
              Exploded Assembly:
            </span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.02" 
            value={explodeFactor} 
            onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
            className="w-32 sm:w-44 accent-[#F79223] cursor-pointer"
          />

          <span className="text-xs font-mono font-black text-[#F79223] w-12 text-right">
            {(explodeFactor * 100).toFixed(0)}%
          </span>

          <button
            onClick={() => setExplodeFactor(explodeFactor > 0.05 ? 0 : 0.8)}
            className={`text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              explodeFactor === 0 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                : 'bg-gray-100 text-gray-700 hover:bg-[#F79223] hover:text-white'
            }`}
          >
            {explodeFactor === 0 ? '✓ Assembled' : 'Assemble (0%)'}
          </button>
        </div>

        {/* INTERACTION HINT */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900/85 text-white/90 text-[10px] font-mono backdrop-blur-md border border-white/10 pointer-events-auto shadow-md">
          <span>🖱️ Click + Drag to Orbit • Scroll to Zoom • Right-click to Pan</span>
        </div>

      </div>

    </div>
  );
}

// ============================================================================
// DYNAMIC Z-AXIS EXPLOSION OFFSETS
// At factor = 0, every single layer is physically attached and flush (spacing = 0)
// ============================================================================
function applyExplodeOffsets(layers, projectId, factor) {
  const schematics = LAYER_SCHEMATICS[projectId] || LAYER_SCHEMATICS.case3;

  Object.entries(schematics).forEach(([layerKey, cfg]) => {
    if (layers[layerKey]) {
      layers[layerKey].position.z = cfg.baseZ + factor * cfg.deltaZ;
    }
  });
}

// ============================================================================
// THREE.JS PROCEDURAL FABRICATION GEOMETRIES BUILDER
// ============================================================================
function buildSignLayers(scene, project, layers, spotLightsList, conesList) {
  
  // --------------------------------------------------------------------------
  // CASE 3: J.STUDIO EXECUTIVE STANDOFF PLAQUE
  // --------------------------------------------------------------------------
  if (project.id === 'case3') {
    
    // 1. FINISHED INTERIOR DRYWALL (Front face sits exactly at Z = 0.0)
    const wallGroup = new THREE.Group();
    const wallGeo = new THREE.BoxGeometry(110, 68, 1.0);
    const wallMat = new THREE.MeshStandardMaterial({ 
      color: 0xF1F5F9, 
      roughness: 0.9, 
      metalness: 0.02 
    });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.position.set(0, 0, -0.5); // front face = 0.0
    wallMesh.receiveShadow = true;
    wallGroup.add(wallMesh);

    // Acoustic vertical wood slat accent panel on right side
    const slatMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
    for (let sx = 26; sx <= 48; sx += 4.5) {
      const slatGeo = new THREE.BoxGeometry(2.4, 66, 0.4);
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.set(sx, 0, 0.2);
      wallGroup.add(slat);
    }

    scene.add(wallGroup);
    layers.wall = wallGroup;

    // 2. GYFORD PRECISION STANDOFF BARRELS (6x Machined Stainless Steel)
    // Barrel length = 2.5 units. Base sits on wall at Z = 0.0, top rim = 2.5
    const barrelsGroup = new THREE.Group();
    const standoffCoords = [
      [-36, 17], [36, 17],    // top corners
      [-36, 0],  [36, 0],     // mid perimeter
      [-36, -17], [36, -17]   // bottom corners
    ];

    const barrelGeo = new THREE.CylinderGeometry(1.2, 1.2, 2.5, 32);
    barrelGeo.rotateX(Math.PI / 2);
    const ssMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xE2E8F0, 
      metalness: 0.95, 
      roughness: 0.18 
    });

    standoffCoords.forEach(([x, y]) => {
      const barrel = new THREE.Mesh(barrelGeo, ssMaterial);
      barrel.position.set(x, y, 1.25); // base = 0.0, top rim = 2.5
      barrel.castShadow = true;
      barrel.receiveShadow = true;
      barrelsGroup.add(barrel);
    });
    scene.add(barrelsGroup);
    layers.standoffBarrels = barrelsGroup;
    layers.standoffs = barrelsGroup;

    // 3. 3/8" FROSTED CLEAR ACRYLIC PLAQUE WITH FLAME-POLISHED EDGES
    // Plaque thickness = 0.6 units. Rests on barrel rims (Z = 2.5 to 3.1)
    const plaqueGroup = new THREE.Group();
    const plaqueGeo = new THREE.BoxGeometry(82, 46, 0.6);
    const plaqueMat = new THREE.MeshStandardMaterial({
      color: 0xE0F2FE,
      transparent: true,
      opacity: 0.42,
      roughness: 0.15,
      metalness: 0.08
    });
    const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaqueMesh.position.set(0, 0, 0.3); // local 0.0 to 0.6 (world 2.5 to 3.1)
    plaqueMesh.castShadow = true;
    plaqueMesh.receiveShadow = true;
    plaqueGroup.add(plaqueMesh);
    scene.add(plaqueGroup);
    layers.plaque = plaqueGroup;

    // 4. STANDOFF THREADED FACE CAPS (6x Clamping Caps)
    // Cap thickness = 0.3 units. Sits flush on front face of plaque (Z = 3.1 to 3.4)
    const capsGroup = new THREE.Group();
    const capGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.3, 32);
    capGeo.rotateX(Math.PI / 2);

    standoffCoords.forEach(([x, y]) => {
      const cap = new THREE.Mesh(capGeo, ssMaterial);
      cap.position.set(x, y, 0.15); // local 0.0 to 0.3 (world 3.1 to 3.4)
      cap.castShadow = true;
      capsGroup.add(cap);
    });
    scene.add(capsGroup);
    layers.standoffCaps = capsGroup;

    // 5. 1/4" LASER-CUT ACRYLIC DIMENSIONAL CORE SUBSTRATE
    // Mounted flush to front face of plaque (Z = 3.1 to 3.5, thickness = 0.4)
    const logoCoreGroup = new THREE.Group();

    const coreMat = new THREE.MeshStandardMaterial({ 
      color: 0x1E293B, 
      roughness: 0.35, 
      metalness: 0.15 
    });

    // Generate accurate 3D extruded shapes from official brand mark
    const brandShapes = getBrandLogoShapes();
    const coreExtrudeSettings = {
      steps: 1,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 3
    };

    // Position mark at optical top center of plaque (Y = 4.5)
    brandShapes.forEach((shape) => {
      const geo = new THREE.ExtrudeGeometry(shape, coreExtrudeSettings);
      const mesh = new THREE.Mesh(geo, coreMat);
      mesh.position.set(0, 4.5, 0); // local 0.0 to 0.4 (world 3.1 to 3.5)
      mesh.castShadow = true;
      logoCoreGroup.add(mesh);
    });

    scene.add(logoCoreGroup);
    layers.logoCore = logoCoreGroup;

    // 6. CHEMETAL METAL LAMINATE FACE (.030" Brushed Bronze & Satin Obsidian)
    // Bonded flush directly to front face of acrylic core (Z = 3.5 to 3.58, thickness = 0.08)
    const logoFaceGroup = new THREE.Group();

    const bronzeMat = new THREE.MeshStandardMaterial({ 
      color: 0xF79223, 
      metalness: 0.9, 
      roughness: 0.22 
    });
    const obsidianMat = new THREE.MeshStandardMaterial({ 
      color: 0x18181B, 
      metalness: 0.85, 
      roughness: 0.25 
    });

    const faceExtrudeSettings = {
      steps: 1,
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2
    };

    // Shapes 1 & 2 = Brushed Bronze (#F79223), Shapes 3 & 4 = Satin Obsidian (#18181B)
    brandShapes.forEach((shape, idx) => {
      const geo = new THREE.ExtrudeGeometry(shape, faceExtrudeSettings);
      const mesh = new THREE.Mesh(geo, idx < 2 ? bronzeMat : obsidianMat);
      mesh.position.set(0, 4.5, 0); // local 0.0 to 0.08 (world 3.5 to 3.58)
      mesh.castShadow = true;
      logoFaceGroup.add(mesh);
    });

    // High-resolution typographic lockup (NO GREY BOX - 100% TRANSPARENT BACKGROUND)
    const textFaceGeo = new THREE.PlaneGeometry(38, 11.2);
    const textTexture = createJStudioTextTexture();
    const textFaceMat = new THREE.MeshBasicMaterial({ 
      map: textTexture, 
      transparent: true,
      depthWrite: false
    });
    const textFaceMesh = new THREE.Mesh(textFaceGeo, textFaceMat);
    textFaceMesh.position.set(0, -9.8, 0.09); // on the face plane
    logoFaceGroup.add(textFaceMesh);

    scene.add(logoFaceGroup);
    layers.logoFace = logoFaceGroup;
    layers.logo = logoFaceGroup;

    // 7. ARCHITECTURAL GALLERY TRACK LIGHTING SYSTEM (3x 12W 3000K Spotlights)
    const lightGroup = new THREE.Group();

    // Black anodized aluminum ceiling/wall track rail
    const trackGeo = new THREE.BoxGeometry(64, 1.2, 1.6);
    const trackMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.9, roughness: 0.25 });
    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.position.set(0, 26, 7.5);
    lightGroup.add(trackMesh);

    // 3 Directional Gimbal Track Heads aimed downward at the sign plaque
    const headPositions = [-18, 0, 18];

    headPositions.forEach((hx) => {
      const headGroup = new THREE.Group();
      headGroup.position.set(hx, 26, 7.5);

      // Gimbal arm stem
      const stemGeo = new THREE.CylinderGeometry(0.3, 0.3, 2.2, 16);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.set(0, -1.1, 0);
      headGroup.add(stem);

      // Cylindrical fixture canister angled ~32° down toward sign
      const canGeo = new THREE.CylinderGeometry(1.5, 2.0, 3.8, 24);
      canGeo.rotateX(Math.PI / 4.2);
      const canMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, metalness: 0.85, roughness: 0.2 });
      const can = new THREE.Mesh(canGeo, canMat);
      can.position.set(0, -2.4, 1.1);
      headGroup.add(can);

      // Luminous 3000K warm LED emitter lens
      const lensGeo = new THREE.CircleGeometry(1.3, 24);
      lensGeo.rotateX(-Math.PI / 3.2);
      const lensMat = new THREE.MeshBasicMaterial({ color: 0xFFF3C4 });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.position.set(0, -3.5, 2.3);
      headGroup.add(lens);

      // REAL THREE.JS SPOTLIGHT PROJECTOR
      const spot = new THREE.SpotLight(0xFFF7ED, 4.0);
      spot.position.set(hx, 26, 9);
      spot.angle = 0.55;
      spot.penumbra = 0.65;
      spot.distance = 70;
      spot.decay = 1.0;
      spot.castShadow = true;
      spot.shadow.bias = -0.001;

      // Target object anchored on the sign face
      const target = new THREE.Object3D();
      target.position.set(hx * 0.6, 1, 3);
      scene.add(target);
      spot.target = target;
      scene.add(spot);
      spotLightsList.push(spot);

      // Visible volumetric warm light beam cone
      const coneGeo = new THREE.CylinderGeometry(1.3, 10, 24, 24, 1, true);
      coneGeo.rotateX(-Math.PI / 3.4);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0xFEF08A,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.set(0, -13, 8.5);
      headGroup.add(cone);
      conesList.push(cone);

      lightGroup.add(headGroup);
    });

    scene.add(lightGroup);
    layers.lighting = lightGroup;
  }

  // --------------------------------------------------------------------------
  // CASE 1: APEX DENTAL REVERSE HALO CHANNEL LETTERS
  // --------------------------------------------------------------------------
  else if (project.id === 'case1') {
    // 1. MASONRY WALL (Front face at Z = 0.0)
    const wallGroup = new THREE.Group();
    const wallGeo = new THREE.BoxGeometry(120, 65, 1.0);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.95 });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.position.set(0, 0, -0.5);
    wallGroup.add(wallMesh);
    scene.add(wallGroup);
    layers.wall = wallGroup;

    // 2. 3MM BLACK MATTE ACM BACKER PANEL (Z = 0.0 to 0.3, sits flush on wall)
    const backerGroup = new THREE.Group();
    const backerGeo = new THREE.BoxGeometry(100, 32, 0.3);
    const backerMat = new THREE.MeshStandardMaterial({ color: 0x090D16, roughness: 0.35, metalness: 0.7 });
    const backerMesh = new THREE.Mesh(backerGeo, backerMat);
    backerMesh.position.set(0, 0, 0.15);
    backerGroup.add(backerMesh);
    scene.add(backerGroup);
    layers.backer = backerGroup;

    // 3. 1.50" MACHINED THREADED STANDOFFS (Z = 0.3 to 2.8, sits on backer)
    const standoffsGroup = new THREE.Group();
    const standoffGeo = new THREE.CylinderGeometry(0.9, 0.9, 2.5, 24);
    standoffGeo.rotateX(Math.PI / 2);
    const ssMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, metalness: 0.9, roughness: 0.2 });

    const standoffPositions = [-38, -25, -12, 0, 12, 25, 38];
    standoffPositions.forEach((x) => {
      const st1 = new THREE.Mesh(standoffGeo, ssMat);
      st1.position.set(x, 4, 1.25);
      const st2 = new THREE.Mesh(standoffGeo, ssMat);
      st2.position.set(x, -4, 1.25);
      standoffsGroup.add(st1);
      standoffsGroup.add(st2);
    });
    scene.add(standoffsGroup);
    layers.standoffs = standoffsGroup;

    // 4. 3/16" CLEAR LEXAN POLYCARBONATE BACKS (Z = 2.8 to 3.1)
    const polyGroup = new THREE.Group();
    const polyGeo = new THREE.BoxGeometry(90, 16, 0.3);
    const polyMat = new THREE.MeshStandardMaterial({
      color: 0xBAE6FD,
      transparent: true,
      opacity: 0.5,
      roughness: 0.2,
      metalness: 0.1
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    polyMesh.position.set(0, 0, 0.15);
    polyGroup.add(polyMesh);
    scene.add(polyGroup);
    layers.polycarb = polyGroup;

    // 5. 12V IP67 HALO LED MODULES (inside return cans at Z = 3.2)
    const ledsGroup = new THREE.Group();
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xFEF08A });
    const ledGeo = new THREE.BoxGeometry(2.0, 1.0, 0.3);

    standoffPositions.forEach((x) => {
      const led1 = new THREE.Mesh(ledGeo, ledMat);
      led1.position.set(x, 4, 0.15);
      const led2 = new THREE.Mesh(ledGeo, ledMat);
      led2.position.set(x, -4, 0.15);
      ledsGroup.add(led1);
      ledsGroup.add(led2);
    });
    scene.add(ledsGroup);
    layers.leds = ledsGroup;

    // 6. .063" FABRICATED ALUMINUM RETURNS (can walls: Z = 3.1 to 6.6, depth = 3.5)
    const returnGroup = new THREE.Group();
    const returnGeo = new THREE.BoxGeometry(90, 16, 3.5);
    const returnMat = new THREE.MeshStandardMaterial({ 
      color: 0x1E293B, 
      metalness: 0.8, 
      roughness: 0.3 
    });
    const returnMesh = new THREE.Mesh(returnGeo, returnMat);
    returnMesh.position.set(0, 0, 1.75);
    returnGroup.add(returnMesh);
    scene.add(returnGroup);
    layers.return = returnGroup;

    // 7. .090" ROUTER-CUT SATIN BLACK ALUMINUM FACE (Z = 6.6 to 6.8)
    const faceGroup = new THREE.Group();
    const faceGeo = new THREE.BoxGeometry(90, 16, 0.2);
    const faceMat = new THREE.MeshStandardMaterial({ 
      color: 0x090D16, 
      roughness: 0.25, 
      metalness: 0.85 
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.set(0, 0, 0.1);
    faceGroup.add(faceMesh);
    scene.add(faceGroup);
    layers.face = faceGroup;
  }

  // --------------------------------------------------------------------------
  // CASE 2: METRO BURGER FRONT-LIT ON RACEWAY
  // --------------------------------------------------------------------------
  else if (project.id === 'case2') {
    // 1. STOREFRONT WALL (Front face at Z = 0.0)
    const wallGroup = new THREE.Group();
    const wallGeo = new THREE.BoxGeometry(130, 65, 1.0);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.9 });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.position.set(0, 0, -0.5);
    wallGroup.add(wallMesh);
    scene.add(wallGroup);
    layers.wall = wallGroup;

    // 2. 7" x 4.5" EXTRUDED ALUMINUM RACEWAY (Z = 0.0 to 4.5, mounted flush to wall)
    const racewayGroup = new THREE.Group();
    const racewayGeo = new THREE.BoxGeometry(105, 12, 4.5);
    const racewayMat = new THREE.MeshStandardMaterial({ color: 0xD6CEBE, metalness: 0.75, roughness: 0.35 });
    const racewayMesh = new THREE.Mesh(racewayGeo, racewayMat);
    racewayMesh.position.set(0, 0, 2.25);
    racewayGroup.add(racewayMesh);
    scene.add(racewayGroup);
    layers.raceway = racewayGroup;

    // 3. INTERNAL CLASS 2 DRIVERS (Inside raceway at Z = 2.2)
    const driversGroup = new THREE.Group();
    const driverGeo = new THREE.BoxGeometry(10, 4.0, 2.0);
    const driverMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, metalness: 0.6 });
    [-30, 0, 30].forEach((dx) => {
      const driver = new THREE.Mesh(driverGeo, driverMat);
      driver.position.set(dx, 0, 0);
      driversGroup.add(driver);
    });
    scene.add(driversGroup);
    layers.drivers = driversGroup;

    // 4. 5" WELDED CHANNEL LETTER RETURN CANS (Z = 4.5 to 8.0, welded to raceway face)
    const returnGroup = new THREE.Group();
    const returnGeo = new THREE.BoxGeometry(92, 18, 3.5);
    const returnMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.85, roughness: 0.3 });
    const returnMesh = new THREE.Mesh(returnGeo, returnMat);
    returnMesh.position.set(0, 0, 1.75);
    returnGroup.add(returnMesh);
    scene.add(returnGroup);
    layers.return = returnGroup;

    // 5. INTERNAL RED LED MODULES (inside return cans at Z = 6.0)
    const ledsGroup = new THREE.Group();
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xFF4D4D });
    const ledGeo = new THREE.BoxGeometry(1.8, 1.0, 0.3);
    [-35, -20, -5, 10, 25, 40].forEach((lx) => {
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(lx, 0, 0);
      ledsGroup.add(led);
    });
    scene.add(ledsGroup);
    layers.leds = ledsGroup;

    // 6. 3/16" TRANSLUCENT 2793 RED ACRYLIC FACE (Z = 8.0 to 8.3)
    const faceGroup = new THREE.Group();
    const faceGeo = new THREE.BoxGeometry(92, 18, 0.3);
    const faceMat = new THREE.MeshStandardMaterial({ 
      color: 0xEF4444, 
      roughness: 0.2 
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.set(0, 0, 0.15);
    faceGroup.add(faceMesh);
    scene.add(faceGroup);
    layers.face = faceGroup;

    // 7. 1" JEWELITE TRIM CAP (wrapped around face at Z = 7.9 to 8.5)
    const trimGroup = new THREE.Group();
    const trimGeo = new THREE.BoxGeometry(93.6, 19.6, 0.6);
    const trimMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.4, metalness: 0.6 });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.position.set(0, 0, 0.3);
    trimGroup.add(trimMesh);
    scene.add(trimGroup);
    layers.trim = trimGroup;
  }
}

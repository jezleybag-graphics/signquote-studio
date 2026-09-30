import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Maximize2, RotateCw, ZoomIn, ZoomOut, Layers, Eye, 
  Sparkles, RefreshCw, Compass, Sun, Moon, Info 
} from 'lucide-react';

export default function SignAssembly3D({ 
  project, 
  isNightMode, 
  activeInspector, 
  setActiveInspector 
}) {
  const mountRef = useRef(null);
  const [explodeFactor, setExplodeFactor] = useState(0.35); // 0 = assembled, 1 = fully exploded
  const [autoRotate, setAutoRotate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // References for three.js objects
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const layersGroupRef = useRef({});

  // Initialize and build 3D Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. SCENE & FOG
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const bgColor = isNightMode ? 0x090D16 : 0xF8FAFC;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.0035);

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(65, 35, 110);
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
    renderer.toneMappingExposure = isNightMode ? 1.4 : 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // prevent going too low
    controls.minDistance = 25;
    controls.maxDistance = 280;
    controls.target.set(0, 5, 0);
    controlsRef.current = controls;

    // 5. LIGHTING
    const ambientLight = new THREE.AmbientLight(
      isNightMode ? 0x1E293B : 0xFFFFFF, 
      isNightMode ? 0.6 : 1.2
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, isNightMode ? 0.8 : 1.8);
    dirLight.position.set(80, 100, 70);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(isNightMode ? 0x38BDF8 : 0xE2E8F0, isNightMode ? 0.9 : 0.6);
    rimLight.position.set(-60, 40, -50);
    scene.add(rimLight);

    // 6. BUILD PROCEDURAL 3D ARCHITECTURAL LAYERS
    const layerObjects = {};
    buildSignLayers(scene, project, layerObjects, isNightMode);
    layersGroupRef.current = layerObjects;

    setIsLoading(false);

    // 7. ANIMATION LOOP
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.2;
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
  }, [project.id, isNightMode]);

  // Update exploded view positions along Z-axis dynamically
  useEffect(() => {
    const layers = layersGroupRef.current;
    if (!layers) return;

    if (project.id === 'case3') {
      // J.STUDIO ACRYLIC STANDOFF PLAQUE EXPLODED OFFSETS
      if (layers.wall) layers.wall.position.z = -18;
      if (layers.standoffBarrels) layers.standoffBarrels.position.z = -10 - explodeFactor * 8;
      if (layers.plaque) layers.plaque.position.z = 0 + explodeFactor * 18;
      if (layers.standoffCaps) layers.standoffCaps.position.z = 4 + explodeFactor * 32;
      if (layers.logoCore) layers.logoCore.position.z = 10 + explodeFactor * 48;
      if (layers.logoFace) layers.logoFace.position.z = 16 + explodeFactor * 68;
      if (layers.lighting) layers.lighting.position.z = 35 + explodeFactor * 25;
    } else if (project.id === 'case1') {
      // APEX DENTAL REVERSE HALO CHANNEL LETTERS
      if (layers.wall) layers.wall.position.z = -25;
      if (layers.backer) layers.backer.position.z = -12;
      if (layers.standoffs) layers.standoffs.position.z = -4 + explodeFactor * 12;
      if (layers.leds) layers.leds.position.z = 4 + explodeFactor * 28;
      if (layers.polycarb) layers.polycarb.position.z = 10 + explodeFactor * 45;
      if (layers.return) layers.return.position.z = 18 + explodeFactor * 65;
      if (layers.face) layers.face.position.z = 26 + explodeFactor * 90;
    } else if (project.id === 'case2') {
      // METRO BURGER FRONT-LIT ON RACEWAY
      if (layers.wall) layers.wall.position.z = -25;
      if (layers.raceway) layers.raceway.position.z = -10;
      if (layers.drivers) layers.drivers.position.z = -4 + explodeFactor * 15;
      if (layers.return) layers.return.position.z = 8 + explodeFactor * 35;
      if (layers.leds) layers.leds.position.z = 14 + explodeFactor * 52;
      if (layers.face) layers.face.position.z = 24 + explodeFactor * 75;
      if (layers.trim) layers.trim.position.z = 28 + explodeFactor * 95;
    }
  }, [explodeFactor, project.id]);

  // Highlight active subassembly mesh when activeInspector changes
  useEffect(() => {
    const layers = layersGroupRef.current;
    if (!layers || !activeInspector) return;

    Object.entries(layers).forEach(([key, group]) => {
      const isMatch = activeInspector.id === key || 
        (activeInspector.id === 'metal-face' && key === 'face') ||
        (activeInspector.id === 'acrylic-face' && key === 'face');

      group.traverse((child) => {
        if (child.isMesh && child.material) {
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

  // Camera preset handlers
  const setCameraView = (type) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (type === 'front') {
      camera.position.set(0, 5, 115);
      controls.target.set(0, 5, 0);
    } else if (type === 'side') {
      camera.position.set(125, 5, 10);
      controls.target.set(0, 5, 0);
    } else if (type === 'iso') {
      camera.position.set(65, 35, 110);
      controls.target.set(0, 5, 0);
    } else if (type === 'top') {
      camera.position.set(0, 130, 20);
      controls.target.set(0, 0, 0);
    }
    controls.update();
  };

  return (
    <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-slate-950 flex flex-col select-none">
      
      {/* 3D VIEWPORT TOP OVERLAY CONTROLS */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* CAMERA PRESET BUTTONS */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-gray-200/80 shadow-md pointer-events-auto">
          <button 
            onClick={() => setCameraView('iso')} 
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
            title="Isometric 3D Perspective"
          >
            <Compass className="w-3.5 h-3.5 text-[#F79223]" />
            <span>3D ISO</span>
          </button>
          <button 
            onClick={() => setCameraView('front')} 
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            title="Orthographic Front Elevation"
          >
            Elevation
          </button>
          <button 
            onClick={() => setCameraView('side')} 
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            title="Cross-Section Profile"
          >
            Cross-Section
          </button>
          <button 
            onClick={() => setCameraView('top')} 
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            title="Top Plan View"
          >
            Plan
          </button>
        </div>

        {/* TURNTABLE & VIEWPORT ACTIONS */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-2xl border text-[11px] font-bold backdrop-blur-md shadow-md transition-all cursor-pointer flex items-center gap-1.5 ${
              autoRotate 
                ? 'bg-[#F79223] border-[#F79223] text-white' 
                : 'bg-white/90 dark:bg-slate-900/90 border-gray-200/80 text-gray-700 dark:text-gray-300'
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
        className="w-full h-[460px] sm:h-[520px] cursor-grab active:cursor-grabbing focus:outline-none"
      />

      {/* 3D VIEWPORT BOTTOM EXPLODED CONTROLS BAR */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* EXPLODED VIEW SLIDER CARD */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-gray-200/90 shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#F79223]" />
            <span className="text-xs font-mono font-bold text-gray-800 dark:text-gray-200">
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
            onClick={() => setExplodeFactor(explodeFactor > 0.05 ? 0 : 0.85)}
            className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-[#F79223] hover:text-white transition-all cursor-pointer"
          >
            {explodeFactor > 0.05 ? 'Assemble' : 'Explode'}
          </button>
        </div>

        {/* INTERACTION HINT */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/50 text-white/90 text-[10px] font-mono backdrop-blur-md border border-white/10 pointer-events-auto">
          <span>🖱️ Click + Drag to Orbit • Scroll to Zoom • Right-click to Pan</span>
        </div>

      </div>

    </div>
  );
}

// ============================================================================
// THREE.JS PROCEDURAL SIGNAGE FABRICATION BUILDER
// ============================================================================
function buildSignLayers(scene, project, layers, isNightMode) {
  
  // --------------------------------------------------------------------------
  // CASE 3: J.STUDIO EXECUTIVE STANDOFF PLAQUE
  // --------------------------------------------------------------------------
  if (project.id === 'case3') {
    // 1. REAR WALL (Drywall + Wood Slats)
    const wallGroup = new THREE.Group();
    const wallGeo = new THREE.BoxGeometry(110, 68, 2);
    const wallMat = new THREE.MeshStandardMaterial({ 
      color: isNightMode ? 0x0F172A : 0xF1F5F9, 
      roughness: 0.85, 
      metalness: 0.05 
    });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.receiveShadow = true;
    wallGroup.add(wallMesh);
    scene.add(wallGroup);
    layers.wall = wallGroup;

    // 2. GYFORD STANDOFF BARRELS (6x Machined Stainless Steel)
    const barrelsGroup = new THREE.Group();
    const standoffCoords = [
      [-36, 18], [36, 18],    // top-left, top-right
      [-36, 0],  [36, 0],     // mid-left, mid-right
      [-36, -18], [36, -18]   // bottom-left, bottom-right
    ];

    const barrelGeo = new THREE.CylinderGeometry(1.6, 1.6, 6, 32);
    barrelGeo.rotateX(Math.PI / 2);
    const ssMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xE2E8F0, 
      metalness: 0.95, 
      roughness: 0.18 
    });

    standoffCoords.forEach(([x, y]) => {
      const barrel = new THREE.Mesh(barrelGeo, ssMaterial);
      barrel.position.set(x, y, 0);
      barrel.castShadow = true;
      barrelsGroup.add(barrel);
    });
    scene.add(barrelsGroup);
    layers.standoffBarrels = barrelsGroup;
    layers.standoffs = barrelsGroup;

    // 3. 1/2" FROSTED CLEAR ACRYLIC PLAQUE WITH BEVELED EDGES
    const plaqueGroup = new THREE.Group();
    const plaqueGeo = new THREE.BoxGeometry(82, 46, 1.2);
    const plaqueMat = new THREE.MeshPhysicalMaterial({
      color: isNightMode ? 0x0284C7 : 0xE0F2FE,
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.22,
      ior: 1.49,
      thickness: 1.5,
      specularIntensity: 0.9
    });
    const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaqueMesh.castShadow = true;
    plaqueMesh.receiveShadow = true;
    plaqueGroup.add(plaqueMesh);
    scene.add(plaqueGroup);
    layers.plaque = plaqueGroup;

    // 4. STANDOFF THREADED CAPS (Front Face Fasteners)
    const capsGroup = new THREE.Group();
    const capGeo = new THREE.CylinderGeometry(1.7, 1.7, 1.2, 32);
    capGeo.rotateX(Math.PI / 2);
    standoffCoords.forEach(([x, y]) => {
      const cap = new THREE.Mesh(capGeo, ssMaterial);
      cap.position.set(x, y, 0);
      cap.castShadow = true;
      capsGroup.add(cap);
    });
    scene.add(capsGroup);
    layers.standoffCaps = capsGroup;

    // 5. 1/2" ACRYLIC LOGO CORE (Substrate Behind Chemetal)
    const logoCoreGroup = new THREE.Group();
    const coreMat = new THREE.MeshStandardMaterial({ 
      color: 0x1E293B, 
      roughness: 0.4, 
      metalness: 0.1 
    });

    // 4-Bar Soundwave Core Shapes
    const barConfigs = [
      { x: -7.5, y: -2, w: 2.8, h: 8.5 },
      { x: -2.5, y: 1,  w: 2.8, h: 14.5 },
      { x: 2.5,  y: 5.5, w: 2.8, h: 22.5 },
      { x: 7.5,  y: 1.5, w: 2.8, h: 15.5 }
    ];

    barConfigs.forEach(({ x, y, w, h }) => {
      const barGeo = new THREE.BoxGeometry(w, h, 1.2);
      const barMesh = new THREE.Mesh(barGeo, coreMat);
      barMesh.position.set(x, y + 2, 0);
      barMesh.castShadow = true;
      logoCoreGroup.add(barMesh);
    });

    // J.STUDIO Text Base Block
    const textBaseGeo = new THREE.BoxGeometry(34, 4.5, 1.0);
    const textBaseMesh = new THREE.Mesh(textBaseGeo, coreMat);
    textBaseMesh.position.set(0, -9.5, 0);
    logoCoreGroup.add(textBaseMesh);

    scene.add(logoCoreGroup);
    layers.logoCore = logoCoreGroup;

    // 6. CHEMETAL BRUSHED BRONZE & SATIN OBSIDIAN FACE
    const logoFaceGroup = new THREE.Group();
    const bronzeMat = new THREE.MeshStandardMaterial({ 
      color: 0xF79223, 
      metalness: 0.88, 
      roughness: 0.22 
    });
    const obsidianMat = new THREE.MeshStandardMaterial({ 
      color: 0x18181B, 
      metalness: 0.85, 
      roughness: 0.25 
    });

    barConfigs.forEach(({ x, y, w, h }, idx) => {
      const faceGeo = new THREE.BoxGeometry(w, h, 0.4);
      const faceMesh = new THREE.Mesh(faceGeo, idx < 2 ? bronzeMat : obsidianMat);
      faceMesh.position.set(x, y + 2, 0);
      faceMesh.castShadow = true;
      logoFaceGroup.add(faceMesh);
    });

    // J.STUDIO Lettering Plate
    const letterGeo = new THREE.BoxGeometry(34, 4.5, 0.4);
    const letterMesh = new THREE.Mesh(letterGeo, bronzeMat);
    letterMesh.position.set(0, -9.5, 0);
    logoFaceGroup.add(letterMesh);

    scene.add(logoFaceGroup);
    layers.logoFace = logoFaceGroup;
    layers.logo = logoFaceGroup;

    // 7. OVERHEAD GALLERY TRACK SPOTLIGHT
    const lightGroup = new THREE.Group();
    const spotGeo = new THREE.CylinderGeometry(1.8, 2.5, 5, 24);
    spotGeo.rotateX(Math.PI / 4);
    const spotMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
    const spotMesh = new THREE.Mesh(spotGeo, spotMat);
    spotMesh.position.set(0, 26, 8);
    lightGroup.add(spotMesh);

    // Warm 3000K Photometric Spotlight Cones
    const spotLight = new THREE.SpotLight(0xFDE047, isNightMode ? 3.5 : 1.8);
    spotLight.position.set(0, 26, 12);
    spotLight.target = plaqueMesh;
    spotLight.angle = Math.PI / 3.8;
    spotLight.penumbra = 0.5;
    spotLight.distance = 90;
    lightGroup.add(spotLight);

    scene.add(lightGroup);
    layers.lighting = lightGroup;
  }

  // --------------------------------------------------------------------------
  // CASE 1: APEX DENTAL REVERSE HALO CHANNEL LETTERS
  // --------------------------------------------------------------------------
  else if (project.id === 'case1') {
    // 1. SPLIT-FACE BRICK WALL
    const wallGroup = new THREE.Group();
    const wallGeo = new THREE.BoxGeometry(120, 65, 2);
    const wallMat = new THREE.MeshStandardMaterial({ 
      color: isNightMode ? 0x0F172A : 0x334155, 
      roughness: 0.95 
    });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallGroup.add(wallMesh);
    scene.add(wallGroup);
    layers.wall = wallGroup;

    // 2. 3MM BLACK ACM BACKER PANEL
    const backerGroup = new THREE.Group();
    const backerGeo = new THREE.BoxGeometry(100, 32, 1.0);
    const backerMat = new THREE.MeshStandardMaterial({ color: 0x090D16, roughness: 0.35, metalness: 0.7 });
    const backerMesh = new THREE.Mesh(backerGeo, backerMat);
    backerGroup.add(backerMesh);
    scene.add(backerGroup);
    layers.backer = backerGroup;

    // 3. 1.50" MACHINED STANDOFFS
    const standoffsGroup = new THREE.Group();
    const standoffGeo = new THREE.CylinderGeometry(1.2, 1.2, 5, 24);
    standoffGeo.rotateX(Math.PI / 2);
    const ssMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, metalness: 0.9, roughness: 0.2 });
    [-38, -18, 0, 18, 38].forEach((x) => {
      [-6, 6].forEach((y) => {
        const barrel = new THREE.Mesh(standoffGeo, ssMat);
        barrel.position.set(x, y, 0);
        standoffsGroup.add(barrel);
      });
    });
    scene.add(standoffsGroup);
    layers.standoffs = standoffsGroup;

    // 4. REVERSE HALO LED MODULES (Emits glow backwards toward backer)
    const ledsGroup = new THREE.Group();
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xFEF08A });
    [-32, -16, 0, 16, 32].forEach((x) => {
      const ledPill = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 1), ledMat);
      ledPill.position.set(x, 0, 0);
      ledsGroup.add(ledPill);

      if (isNightMode) {
        const pointLight = new THREE.PointLight(0xFEF08A, 2.5, 30);
        pointLight.position.set(x, 0, -2);
        ledsGroup.add(pointLight);
      }
    });
    scene.add(ledsGroup);
    layers.leds = ledsGroup;

    // 5. CLEAR POLYCARBONATE BACKS
    const polyGroup = new THREE.Group();
    const polyGeo = new THREE.BoxGeometry(84, 18, 0.6);
    const polyMat = new THREE.MeshPhysicalMaterial({ 
      color: 0xBAE6FD, 
      transmission: 0.85, 
      roughness: 0.15,
      transparent: true 
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    polyGroup.add(polyMesh);
    scene.add(polyGroup);
    layers.polycarb = polyGroup;

    // 6. 3.50" FABRICATED ALUMINUM RETURNS (Sidewalls)
    const returnGroup = new THREE.Group();
    const returnGeo = new THREE.BoxGeometry(84, 18, 8);
    const returnMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.85, roughness: 0.3 });
    const returnMesh = new THREE.Mesh(returnGeo, returnMat);
    returnGroup.add(returnMesh);
    scene.add(returnGroup);
    layers.return = returnGroup;

    // 7. SATIN BLACK ALUMINUM FACE (.063" 5052-H32)
    const faceGroup = new THREE.Group();
    const faceGeo = new THREE.BoxGeometry(84, 18, 0.8);
    const faceMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.25, metalness: 0.65 });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceGroup.add(faceMesh);
    scene.add(faceGroup);
    layers.face = faceGroup;
  }

  // --------------------------------------------------------------------------
  // CASE 2: METRO BURGER FRONT-LIT ON EXTRUDED RACEWAY
  // --------------------------------------------------------------------------
  else if (project.id === 'case2') {
    // 1. BUILDING FASCIA
    const wallGroup = new THREE.Group();
    const wallGeo = new THREE.BoxGeometry(125, 68, 2);
    const wallMat = new THREE.MeshStandardMaterial({ color: isNightMode ? 0x090D16 : 0x78350F, roughness: 0.9 });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallGroup.add(wallMesh);
    scene.add(wallGroup);
    layers.wall = wallGroup;

    // 2. 7" x 4.5" EXTRUDED RACEWAY (Wireway)
    const racewayGroup = new THREE.Group();
    const raceGeo = new THREE.BoxGeometry(105, 12, 10);
    const raceMat = new THREE.MeshStandardMaterial({ color: 0xD6CEBE, metalness: 0.7, roughness: 0.4 });
    const raceMesh = new THREE.Mesh(raceGeo, raceMat);
    racewayGroup.add(raceMesh);
    scene.add(racewayGroup);
    layers.raceway = racewayGroup;

    // 3. UL CLASS 2 DRIVERS INSIDE RACEWAY
    const driversGroup = new THREE.Group();
    const driverGeo = new THREE.BoxGeometry(12, 6, 6);
    const driverMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, metalness: 0.8 });
    [-30, 0, 30].forEach((x) => {
      const driver = new THREE.Mesh(driverGeo, driverMat);
      driver.position.set(x, 0, 0);
      driversGroup.add(driver);
    });
    scene.add(driversGroup);
    layers.drivers = driversGroup;

    // 4. 5.0" ALUMINUM RETURN SIDEWALLS
    const returnGroup = new THREE.Group();
    const returnGeo = new THREE.BoxGeometry(86, 20, 10);
    const returnMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.8, roughness: 0.35 });
    const returnMesh = new THREE.Mesh(returnGeo, returnMat);
    returnGroup.add(returnMesh);
    scene.add(returnGroup);
    layers.return = returnGroup;

    // 5. DUAL-ROW RED LED MODULES
    const ledsGroup = new THREE.Group();
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });
    [-28, -14, 0, 14, 28].forEach((x) => {
      const led = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.5, 1), ledMat);
      led.position.set(x, 0, 0);
      ledsGroup.add(led);

      if (isNightMode) {
        const pointLight = new THREE.PointLight(0xEF4444, 2.8, 25);
        pointLight.position.set(x, 0, 4);
        ledsGroup.add(pointLight);
      }
    });
    scene.add(ledsGroup);
    layers.leds = ledsGroup;

    // 6. 3/16" RED ACRYLIC TRANSLUCENT FACE
    const faceGroup = new THREE.Group();
    const faceGeo = new THREE.BoxGeometry(86, 20, 0.8);
    const faceMat = new THREE.MeshStandardMaterial({ 
      color: 0xDC2626, 
      roughness: 0.2, 
      emissive: isNightMode ? 0xEF4444 : 0x000000,
      emissiveIntensity: isNightMode ? 0.75 : 0
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceGroup.add(faceMesh);
    scene.add(faceGroup);
    layers.face = faceGroup;

    // 7. 1.0" JEWELITE BUTYRATE TRIM CAP
    const trimGroup = new THREE.Group();
    const trimGeo = new THREE.BoxGeometry(88, 22, 1.8);
    const trimMat = new THREE.MeshStandardMaterial({ color: 0x111213, roughness: 0.15, metalness: 0.6 });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimGroup.add(trimMesh);
    scene.add(trimGroup);
    layers.trim = trimGroup;
  }
}

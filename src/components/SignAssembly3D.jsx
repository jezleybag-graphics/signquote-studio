import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  RotateCw, Layers, Compass
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

// ============================================================================
// EXACT 3D VECTOR CONTOURS FOR J.STUDIO WORDMARK LETTERS
// Allows J.STUDIO letters to be 3D elevated identically to the logo mark
// ============================================================================
function getBrandWordmarkShapes() {
  const letters = [];
  
  // Letter 1: J
  {
    const s = new THREE.Shape();
    s.moveTo(-11.252, 3.6);
    s.lineTo(-11.972, 3.6);
    s.lineTo(-11.972, 1.105);
    s.lineTo(-12.073, 0.703);
    s.lineTo(-12.223, 0.586);
    s.lineTo(-12.525, 0.569);
    s.lineTo(-12.776, 0.753);
    s.lineTo(-12.86, 1.189);
    s.lineTo(-13.546, 1.139);
    s.lineTo(-13.546, 0.887);
    s.lineTo(-13.446, 0.502);
    s.lineTo(-13.312, 0.285);
    s.lineTo(-13.077, 0.084);
    s.lineTo(-12.675, -0.05);
    s.lineTo(-12.022, -0.017);
    s.lineTo(-11.671, 0.151);
    s.lineTo(-11.403, 0.452);
    s.lineTo(-11.302, 0.703);
    s.lineTo(-11.252, 1.055);
    s.closePath();
    letters.push(s);
  }

  // Letter 2: Dot .
  {
    const s = new THREE.Shape();
    s.moveTo(-9.896, 0.67);
    s.lineTo(-9.896, 0.0);
    s.lineTo(-9.209, 0.0);
    s.lineTo(-9.209, 0.67);
    s.closePath();
    letters.push(s);
  }

  // Letter 3: S
  {
    const s = new THREE.Shape();
    s.moveTo(-6.999, 3.533);
    s.lineTo(-7.418, 3.299);
    s.lineTo(-7.635, 2.997);
    s.lineTo(-7.719, 2.478);
    s.lineTo(-7.602, 2.11);
    s.lineTo(-7.334, 1.808);
    s.lineTo(-7.033, 1.641);
    s.lineTo(-5.827, 1.273);
    s.lineTo(-5.676, 1.122);
    s.lineTo(-5.66, 0.871);
    s.lineTo(-6.011, 0.536);
    s.lineTo(-6.53, 0.502);
    s.lineTo(-6.949, 0.72);
    s.lineTo(-7.133, 1.155);
    s.lineTo(-7.836, 1.105);
    s.lineTo(-7.736, 0.62);
    s.lineTo(-7.401, 0.167);
    s.lineTo(-6.982, -0.05);
    s.lineTo(-6.061, -0.117);
    s.lineTo(-5.66, -0.033);
    s.lineTo(-5.291, 0.167);
    s.lineTo(-5.007, 0.553);
    s.lineTo(-5.923, 0.871);
    s.lineTo(-5.007, 1.457);
    s.lineTo(-5.492, 1.942);
    s.lineTo(-6.832, 2.361);
    s.lineTo(-6.982, 2.495);
    s.lineTo(-7.016, 2.713);
    s.lineTo(-6.781, 2.93);
    s.lineTo(-6.212, 2.98);
    s.lineTo(-5.911, 2.83);
    s.lineTo(-5.76, 2.478);
    s.lineTo(-5.04, 2.495);
    s.lineTo(-5.107, 2.93);
    s.lineTo(-5.425, 3.349);
    s.lineTo(-5.844, 3.55);
    s.lineTo(-6.681, 3.6);
    s.closePath();
    letters.push(s);
  }

  // Letter 4: T
  {
    const s = new THREE.Shape();
    s.moveTo(-4.153, 3.6);
    s.lineTo(-4.153, 3.014);
    s.lineTo(-3.081, 2.997);
    s.lineTo(-3.081, 0.017);
    s.lineTo(-2.361, 0.017);
    s.lineTo(-2.361, 2.997);
    s.lineTo(-1.289, 3.014);
    s.lineTo(-1.289, 3.6);
    s.closePath();
    letters.push(s);
  }

  // Letter 5: U
  {
    const s = new THREE.Shape();
    s.moveTo(-0.251, 3.6);
    s.lineTo(-0.234, 1.088);
    s.lineTo(-0.184, 0.753);
    s.lineTo(0.0, 0.385);
    s.lineTo(0.452, 0.05);
    s.lineTo(0.887, -0.05);
    s.lineTo(1.641, -0.033);
    s.lineTo(2.177, 0.184);
    s.lineTo(2.478, 0.536);
    s.lineTo(2.595, 0.988);
    s.lineTo(2.612, 3.6);
    s.lineTo(1.892, 3.6);
    s.lineTo(1.875, 1.055);
    s.lineTo(1.792, 0.804);
    s.lineTo(1.39, 0.553);
    s.lineTo(0.787, 0.636);
    s.lineTo(0.502, 1.021);
    s.lineTo(0.469, 3.6);
    s.closePath();
    letters.push(s);
  }

  // Letter 6: D (with inner counter hole)
  {
    const s = new THREE.Shape();
    s.moveTo(3.801, 3.6);
    s.lineTo(3.801, 0.017);
    s.lineTo(5.509, 0.017);
    s.lineTo(5.927, 0.117);
    s.lineTo(6.212, 0.268);
    s.lineTo(6.463, 0.519);
    s.lineTo(6.664, 0.871);
    s.lineTo(6.815, 1.507);
    s.lineTo(6.815, 2.06);
    s.lineTo(6.748, 2.495);
    s.lineTo(6.463, 3.098);
    s.lineTo(6.112, 3.416);
    s.lineTo(5.743, 3.567);
    s.closePath();

    const h0 = new THREE.Path();
    h0.moveTo(4.554, 3.014);
    h0.lineTo(5.325, 2.997);
    h0.lineTo(5.593, 2.93);
    h0.lineTo(5.81, 2.78);
    h0.lineTo(5.978, 2.512);
    h0.lineTo(6.061, 2.127);
    h0.lineTo(6.045, 1.356);
    h0.lineTo(5.894, 0.904);
    h0.lineTo(5.676, 0.703);
    h0.lineTo(5.392, 0.62);
    h0.lineTo(4.538, 0.62);
    h0.closePath();
    s.holes.push(h0);
    letters.push(s);
  }

  // Letter 7: I
  {
    const s = new THREE.Shape();
    s.moveTo(7.836, 3.6);
    s.lineTo(7.836, 0.017);
    s.lineTo(8.556, 0.017);
    s.lineTo(8.556, 3.6);
    s.closePath();
    letters.push(s);
  }

  // Letter 8: O (with inner counter hole)
  {
    const s = new THREE.Shape();
    s.moveTo(10.649, 3.533);
    s.lineTo(10.331, 3.399);
    s.lineTo(10.063, 3.198);
    s.lineTo(9.846, 2.947);
    s.lineTo(9.661, 2.612);
    s.lineTo(9.527, 2.043);
    s.lineTo(9.527, 1.423);
    s.lineTo(9.645, 0.904);
    s.lineTo(9.946, 0.402);
    s.lineTo(10.482, 0.017);
    s.lineTo(10.984, -0.117);
    s.lineTo(11.537, -0.117);
    s.lineTo(11.922, -0.033);
    s.lineTo(12.424, 0.251);
    s.lineTo(12.709, 0.569);
    s.lineTo(12.86, 0.854);
    s.lineTo(13.01, 1.557);
    s.lineTo(12.993, 2.093);
    s.lineTo(12.876, 2.579);
    s.lineTo(12.558, 3.098);
    s.lineTo(12.039, 3.466);
    s.lineTo(11.537, 3.6);
    s.lineTo(10.984, 3.6);
    s.closePath();

    const h0 = new THREE.Path();
    h0.moveTo(11.085, 2.98);
    h0.lineTo(11.453, 2.98);
    h0.lineTo(11.637, 2.93);
    h0.lineTo(11.888, 2.78);
    h0.lineTo(12.106, 2.512);
    h0.lineTo(12.24, 2.093);
    h0.lineTo(12.257, 1.557);
    h0.lineTo(12.207, 1.256);
    h0.lineTo(12.106, 0.988);
    h0.lineTo(11.989, 0.82);
    h0.lineTo(11.805, 0.653);
    h0.lineTo(11.62, 0.553);
    h0.lineTo(11.436, 0.502);
    h0.lineTo(11.085, 0.502);
    h0.lineTo(10.867, 0.569);
    h0.lineTo(10.683, 0.687);
    h0.lineTo(10.415, 1.005);
    h0.lineTo(10.281, 1.44);
    h0.lineTo(10.281, 2.06);
    h0.lineTo(10.348, 2.344);
    h0.lineTo(10.432, 2.528);
    h0.lineTo(10.733, 2.847);
    h0.closePath();
    s.holes.push(h0);
    letters.push(s);
  }

  return letters;
}

// Crisp Subtitle Texture for UV-printed secondary text (transparent background)
function createSubtitleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 1024, 160);

  // Subtitle: ARCHITECTURAL DESIGN & SIGNAGE
  ctx.textAlign = 'center';
  ctx.font = '700 28px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#475569';
  ctx.letterSpacing = '6px';
  ctx.fillText('ARCHITECTURAL DESIGN & SIGNAGE', 512, 60);

  // Executive Identifier
  ctx.font = '600 20px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.letterSpacing = '3px';
  ctx.fillText('JEZREEL DAVE LEYBAG • EXECUTIVE SUITE 400', 512, 115);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  return texture;
}

// ============================================================================
// HIGH-PRECISION PROCEDURAL CHANNEL LETTER GEOMETRY GENERATOR
// Architectural Bold Sans-Serif font outlines (Helvetica/Gotham Bold standard)
// Normalized with standard height = 10 units, centered at (0, 0)
// ============================================================================
function getChannelLetterShape(char) {
  const s = new THREE.Shape();
  switch (char.toUpperCase()) {
    case 'A': {
      s.moveTo(-3.2, -5.0);
      s.lineTo(-1.1, 5.0);
      s.lineTo(1.1, 5.0);
      s.lineTo(3.2, -5.0);
      s.lineTo(1.6, -5.0);
      s.lineTo(1.0, -2.0);
      s.lineTo(-1.0, -2.0);
      s.lineTo(-1.6, -5.0);
      s.closePath();

      const h = new THREE.Path();
      h.moveTo(-0.7, -0.6);
      h.lineTo(0.7, -0.6);
      h.lineTo(0.0, 2.8);
      h.closePath();
      s.holes.push(h);
      return s;
    }

    case 'P': {
      s.moveTo(-2.8, -5.0);
      s.lineTo(-2.8, 5.0);
      s.lineTo(0.6, 5.0);
      s.absarc(0.6, 2.5, 2.5, Math.PI / 2, -Math.PI / 2, true);
      s.lineTo(-1.2, 0.0);
      s.lineTo(-1.2, -5.0);
      s.closePath();

      const h = new THREE.Path();
      h.moveTo(-1.2, 1.4);
      h.lineTo(0.4, 1.4);
      h.absarc(0.4, 2.5, 1.1, -Math.PI / 2, Math.PI / 2, false);
      h.lineTo(-1.2, 3.6);
      h.closePath();
      s.holes.push(h);
      return s;
    }

    case 'E': {
      s.moveTo(-2.8, -5.0);
      s.lineTo(-2.8, 5.0);
      s.lineTo(2.7, 5.0);
      s.lineTo(2.7, 3.5);
      s.lineTo(-1.2, 3.5);
      s.lineTo(-1.2, 0.8);
      s.lineTo(2.0, 0.8);
      s.lineTo(2.0, -0.7);
      s.lineTo(-1.2, -0.7);
      s.lineTo(-1.2, -3.5);
      s.lineTo(2.7, -3.5);
      s.lineTo(2.7, -5.0);
      s.closePath();
      return s;
    }

    case 'X': {
      const w = 2.8, h = 5.0, t = 1.4;
      s.moveTo(-w, -h);
      s.lineTo(-w + t, -h);
      s.lineTo(0, -1.2);
      s.lineTo(w - t, -h);
      s.lineTo(w, -h);
      s.lineTo(0.8, 0);
      s.lineTo(w, h);
      s.lineTo(w - t, h);
      s.lineTo(0, 1.2);
      s.lineTo(-w + t, h);
      s.lineTo(-w, h);
      s.lineTo(-0.8, 0);
      s.closePath();
      return s;
    }

    case 'D': {
      s.moveTo(-2.8, -5.0);
      s.lineTo(-2.8, 5.0);
      s.lineTo(0.2, 5.0);
      s.absellipse(0.2, 0.0, 3.0, 5.0, Math.PI / 2, -Math.PI / 2, true);
      s.lineTo(-2.8, -5.0);
      s.closePath();

      const h = new THREE.Path();
      h.moveTo(-1.3, -3.5);
      h.lineTo(0.2, -3.5);
      h.absellipse(0.2, 0.0, 1.6, 3.5, -Math.PI / 2, Math.PI / 2, false);
      h.lineTo(-1.3, 3.5);
      h.closePath();
      s.holes.push(h);
      return s;
    }

    case 'N': {
      s.moveTo(-2.8, -5.0);
      s.lineTo(-2.8, 5.0);
      s.lineTo(-1.2, 5.0);
      s.lineTo(1.2, -1.5);
      s.lineTo(1.2, 5.0);
      s.lineTo(2.8, 5.0);
      s.lineTo(2.8, -5.0);
      s.lineTo(1.2, -5.0);
      s.lineTo(-1.2, 1.5);
      s.lineTo(-1.2, -5.0);
      s.closePath();
      return s;
    }

    case 'T': {
      s.moveTo(-3.0, 5.0);
      s.lineTo(3.0, 5.0);
      s.lineTo(3.0, 3.5);
      s.lineTo(0.8, 3.5);
      s.lineTo(0.8, -5.0);
      s.lineTo(-0.8, -5.0);
      s.lineTo(-0.8, 3.5);
      s.lineTo(-3.0, 3.5);
      s.closePath();
      return s;
    }

    case 'L': {
      s.moveTo(-2.6, 5.0);
      s.lineTo(-1.1, 5.0);
      s.lineTo(-1.1, -3.5);
      s.lineTo(2.6, -3.5);
      s.lineTo(2.6, -5.0);
      s.lineTo(-2.6, -5.0);
      s.closePath();
      return s;
    }

    case 'M': {
      s.moveTo(-3.4, -5.0);
      s.lineTo(-3.4, 5.0);
      s.lineTo(-1.8, 5.0);
      s.lineTo(0.0, 1.2);
      s.lineTo(1.8, 5.0);
      s.lineTo(3.4, 5.0);
      s.lineTo(3.4, -5.0);
      s.lineTo(2.0, -5.0);
      s.lineTo(2.0, 2.2);
      s.lineTo(0.0, -1.8);
      s.lineTo(-2.0, 2.2);
      s.lineTo(-2.0, -5.0);
      s.closePath();
      return s;
    }

    case 'R': {
      s.moveTo(-2.8, -5.0);
      s.lineTo(-2.8, 5.0);
      s.lineTo(0.5, 5.0);
      s.absarc(0.5, 2.5, 2.5, Math.PI / 2, -Math.PI / 2, true);
      s.lineTo(0.8, 0.0);
      s.lineTo(2.8, -5.0);
      s.lineTo(1.1, -5.0);
      s.lineTo(-0.7, -0.2);
      s.lineTo(-1.2, -0.2);
      s.lineTo(-1.2, -5.0);
      s.closePath();

      const h = new THREE.Path();
      h.moveTo(-1.2, 1.4);
      h.lineTo(0.4, 1.4);
      h.absarc(0.4, 2.5, 1.1, -Math.PI / 2, Math.PI / 2, false);
      h.lineTo(-1.2, 3.6);
      h.closePath();
      s.holes.push(h);
      return s;
    }

    case 'O': {
      s.absellipse(0, 0, 3.0, 5.0, 0, Math.PI * 2, false, 0);
      const h = new THREE.Path();
      h.absellipse(0, 0, 1.5, 3.5, 0, Math.PI * 2, true, 0);
      s.holes.push(h);
      return s;
    }

    case 'B': {
      s.moveTo(-2.8, -5.0);
      s.lineTo(-2.8, 5.0);
      s.lineTo(0.4, 5.0);
      s.absarc(0.4, 2.6, 2.4, Math.PI / 2, -Math.PI / 2, true);
      s.lineTo(0.6, 0.2);
      s.absarc(0.6, -2.4, 2.6, Math.PI / 2, -Math.PI / 2, true);
      s.lineTo(-2.8, -5.0);
      s.closePath();

      const h1 = new THREE.Path();
      h1.moveTo(-1.2, 1.5);
      h1.lineTo(0.3, 1.5);
      h1.absarc(0.3, 2.6, 1.1, -Math.PI / 2, Math.PI / 2, false);
      h1.lineTo(-1.2, 3.7);
      h1.closePath();
      s.holes.push(h1);

      const h2 = new THREE.Path();
      h2.moveTo(-1.2, -3.7);
      h2.lineTo(0.5, -3.7);
      h2.absarc(0.5, -2.4, 1.3, -Math.PI / 2, Math.PI / 2, false);
      h2.lineTo(-1.2, -1.1);
      h2.closePath();
      s.holes.push(h2);
      return s;
    }

    case 'U': {
      s.moveTo(-2.8, 5.0);
      s.lineTo(-1.2, 5.0);
      s.lineTo(-1.2, -2.2);
      s.absarc(0, -2.2, 1.2, Math.PI, 0, false);
      s.lineTo(1.2, 5.0);
      s.lineTo(2.8, 5.0);
      s.lineTo(2.8, -2.2);
      s.absarc(0, -2.2, 2.8, 0, Math.PI, true);
      s.closePath();
      return s;
    }

    case 'G': {
      s.moveTo(1.2, 3.5);
      s.lineTo(2.5, 3.5);
      s.absellipse(0, 0, 3.0, 5.0, 0.75, -0.75, false, 0);
      s.lineTo(2.8, -1.5);
      s.lineTo(2.8, 0.5);
      s.lineTo(0.5, 0.5);
      s.lineTo(0.5, -0.8);
      s.lineTo(1.6, -0.8);
      s.absellipse(0, 0, 1.5, 3.5, -0.6, 0.75, true, 0);
      s.closePath();
      return s;
    }

    default:
      s.moveTo(-2, -5);
      s.lineTo(2, -5);
      s.lineTo(2, 5);
      s.lineTo(-2, 5);
      s.closePath();
      return s;
  }
}

// Medical Cross Logo Badge for Apex Dental
function getDentalEmblemShapes() {
  const badge = new THREE.Shape();
  const w = 4.8, h = 4.8, r = 1.4;
  badge.moveTo(-w + r, -h);
  badge.lineTo(w - r, -h);
  badge.absarc(w - r, -h + r, r, -Math.PI / 2, 0, false);
  badge.lineTo(w, h - r);
  badge.absarc(w - r, h - r, r, 0, Math.PI / 2, false);
  badge.lineTo(-w + r, h);
  badge.absarc(-w + r, h - r, r, Math.PI / 2, Math.PI, false);
  badge.lineTo(-w, -h + r);
  badge.absarc(-w + r, -h + r, r, Math.PI, Math.PI * 1.5, false);
  badge.closePath();

  const cross = new THREE.Shape();
  const cw = 3.2, ch = 1.0;
  cross.moveTo(-ch, -cw);
  cross.lineTo(ch, -cw);
  cross.lineTo(ch, -ch);
  cross.lineTo(cw, -ch);
  cross.lineTo(cw, ch);
  cross.lineTo(ch, ch);
  cross.lineTo(ch, cw);
  cross.lineTo(-ch, cw);
  cross.lineTo(-ch, ch);
  cross.lineTo(-cw, ch);
  cross.lineTo(-cw, -ch);
  cross.lineTo(-ch, -ch);
  cross.closePath();

  return { badge, cross };
}

// Procedural Running-Bond Charcoal Brick Facade Texture for Apex Dental
function createBrickWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1E293B';
  ctx.fillRect(0, 0, 1024, 512);

  const brickW = 64, brickH = 24, mortar = 4;
  const colors = ['#334155', '#38475C', '#2D3A4D', '#3B4A60', '#313F53'];

  for (let row = 0; row < 512 / (brickH + mortar); row++) {
    const y = row * (brickH + mortar);
    const offsetX = (row % 2 === 0) ? 0 : -(brickW + mortar) / 2;
    for (let col = -1; col < 1024 / (brickW + mortar) + 2; col++) {
      const x = col * (brickW + mortar) + offsetX;
      const color = colors[(row * 7 + col * 13) % colors.length];
      ctx.fillStyle = color;
      ctx.fillRect(x + mortar, y + mortar, brickW - mortar, brickH - mortar);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(x + mortar + 2, y + mortar + 2, brickW - mortar - 4, 3);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
      ctx.fillRect(x + mortar, y + brickH - 2, brickW - mortar, 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.anisotropy = 8;
  return texture;
}

// Procedural Horizontal Timber Cladding Facade Texture for Metro Burger
function createTimberWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1A0C06';
  ctx.fillRect(0, 0, 1024, 512);

  const plankH = 36, reveal = 4;
  const plankColors = ['#78350F', '#854D0E', '#6B2C0D', '#92400E', '#713F12'];

  for (let row = 0; row < 512 / (plankH + reveal); row++) {
    const y = row * (plankH + reveal);
    const color = plankColors[row % plankColors.length];
    ctx.fillStyle = color;
    ctx.fillRect(0, y + reveal, 1024, plankH - reveal);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    for (let g = 0; g < 4; g++) {
      ctx.fillRect(0, y + reveal + 6 + g * 7, 1024, 1.5);
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.fillRect(0, y + reveal + 1, 1024, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 1.5);
  texture.anisotropy = 8;
  return texture;
}

// High-Resolution Soft Halo Illumination Reflection Texture for Apex Dental ACM Backer
function createApexHaloTexture(letters, emblemPos) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 1024, 512);

  const scaleX = 1024 / 104;
  const scaleY = 512 / 30;

  function drawGlow(x, y, radius) {
    const cx = (x + 52) * scaleX;
    const cy = (15 - y) * scaleY;
    const r = radius * scaleX;

    const grad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 0.40)');
    grad.addColorStop(0.25, 'rgba(240, 249, 255, 0.22)');
    grad.addColorStop(0.55, 'rgba(224, 242, 254, 0.08)');
    grad.addColorStop(0.85, 'rgba(224, 242, 254, 0.02)');
    grad.addColorStop(1.0, 'rgba(224, 242, 254, 0.0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw soft glow for emblem
  drawGlow(emblemPos.x, emblemPos.y, 6.8);

  // Draw soft glow for each letter
  letters.forEach((item) => {
    drawGlow(item.x, item.y, 5.4);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// High-Resolution Subtitle Texture for Apex Dental ACM Backer
function createApexSubtitleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 1024, 160);

  ctx.textAlign = 'center';
  ctx.font = '800 36px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#38BDF8';
  ctx.letterSpacing = '10px';
  ctx.fillText('FAMILY & COSMETIC DENTISTRY', 512, 65);

  ctx.font = '600 20px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.letterSpacing = '4px';
  ctx.fillText('DR. RACHEL VANCE, DDS • SUITE 104 • NORTH ENTRANCE', 512, 120);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  return texture;
}

// Industrial Raceway Specification Texture for Metro Burger
function createMetroRacewayTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 1024, 128);

  ctx.textAlign = 'left';
  ctx.font = '800 20px "JetBrains Mono", monospace';
  ctx.fillStyle = '#57534E';
  ctx.letterSpacing = '2px';
  ctx.fillText('7" x 4.5" EXTRUDED WIREWAY • UL 48 ENCLOSURE', 36, 52);

  ctx.font = '600 16px "JetBrains Mono", monospace';
  ctx.fillStyle = '#78716C';
  ctx.fillText('QUALITY MANUFACTURING (LANCASTER, PA) • 120V 60Hz 1.2A', 36, 90);

  ctx.textAlign = 'right';
  ctx.font = '800 22px "JetBrains Mono", monospace';
  ctx.fillStyle = '#D97706';
  ctx.fillText('JOB #FS-2026-119', 988, 70);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  return texture;
}

// Retail Storefront Glass Transom Texture
function createStorefrontGlassTexture(unitText) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 1024, 160);

  ctx.textAlign = 'center';
  ctx.font = '700 24px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.letterSpacing = '5px';
  ctx.fillText(unitText, 512, 95);

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

  // References for three.js objects
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const layersGroupRef = useRef({});

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

    // 2. CAMERA (Airy, balanced framing)
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

    // 5. BALANCED DAYLIGHT LIGHTING
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.25);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1.3);
    dirLight.position.set(25, 45, 70);
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
    buildSignLayers(scene, project, layerObjects);
    layersGroupRef.current = layerObjects;

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

  // Handle Z-Axis Exploded Assembly Dynamic Offsets
  useEffect(() => {
    const layers = layersGroupRef.current;
    if (!layers) return;
    applyExplodeOffsets(layers, project.id, explodeFactor);
  }, [explodeFactor, project.id]);

  // Highlight active subassembly mesh when activeInspector changes
  useEffect(() => {
    const layers = layersGroupRef.current;
    if (!layers) return;

    Object.entries(layers).forEach(([key, group]) => {
      const isMatch = activeInspector && (
        activeInspector.id === key || 
        (activeInspector.id === 'metal-face' && key === 'face') ||
        (activeInspector.id === 'acrylic-face' && key === 'face') ||
        (activeInspector.id === 'logo' && (key === 'logo' || key === 'logoFace' || key === 'logoCore')) ||
        (activeInspector.id === 'standoffs' && (key === 'standoffBarrels' || key === 'standoffCaps' || key === 'standoffs')) ||
        (activeInspector.id === 'weep' && (key === 'return' || key === 'backer')) ||
        (activeInspector.id === 'polycarb' && key === 'polycarb') ||
        (activeInspector.id === 'trim' && key === 'trim') ||
        (activeInspector.id === 'drivers' && key === 'drivers') ||
        (activeInspector.id === 'raceway' && key === 'raceway')
      );

      group.traverse((child) => {
        if (child.isMesh && child.material) {
          if (child.userData.isAccent) return; // Preserve pristine brand accents like cyan medical cross
          if (!child.userData.origMaterial) {
            child.userData.origMaterial = child.material;
          }
          if (isMatch) {
            if (child.material.isMeshStandardMaterial) {
              child.material = child.material.clone();
              child.material.emissive = new THREE.Color(0xF79223);
              child.material.emissiveIntensity = 0.65;
            } else if (child.material.isMeshBasicMaterial) {
              child.material = child.material.clone();
              child.material.color = new THREE.Color(0xF79223);
            }
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

        {/* TOP RIGHT CONTROLS: TURNTABLE */}
        <div className="flex items-center gap-2 pointer-events-auto">
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
function buildSignLayers(scene, project, layers) {
  
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

    // 5. 1/4" LASER-CUT ACRYLIC DIMENSIONAL CORE SUBSTRATE (Z = 3.1 to 3.5, depth = 0.4)
    // Mounted flush to front face of plaque. Both Logo Mark AND Wordmark Letters have 3D acrylic core!
    const logoCoreGroup = new THREE.Group();

    const coreMat = new THREE.MeshStandardMaterial({ 
      color: 0x1E293B, 
      roughness: 0.35, 
      metalness: 0.15 
    });

    const coreExtrudeSettings = {
      steps: 1,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 3
    };

    // A. 3D LOGO MARK GLYPHS CORE (Positioned at Y = 5.5, top = 15.5, bottom = -4.5)
    const brandShapes = getBrandLogoShapes();
    brandShapes.forEach((shape) => {
      const geo = new THREE.ExtrudeGeometry(shape, coreExtrudeSettings);
      const mesh = new THREE.Mesh(geo, coreMat);
      mesh.position.set(0, 5.5, 0);
      mesh.castShadow = true;
      logoCoreGroup.add(mesh);
    });

    // B. 3D DIMENSIONAL J.STUDIO WORDMARK LETTERS CORE (Positioned at Y = -13.3)
    // Exact 5.2 unit graphic design breathing room between mark bottom (-4.5) and text top (-9.7)
    const wordmarkShapes = getBrandWordmarkShapes();
    wordmarkShapes.forEach((shape) => {
      const geo = new THREE.ExtrudeGeometry(shape, coreExtrudeSettings);
      const mesh = new THREE.Mesh(geo, coreMat);
      mesh.position.set(0, -13.3, 0);
      mesh.castShadow = true;
      logoCoreGroup.add(mesh);
    });

    scene.add(logoCoreGroup);
    layers.logoCore = logoCoreGroup;

    // 6. CHEMETAL METAL LAMINATE FACE (.030" Brushed Bronze & Satin Obsidian)
    // Bonded flush directly to front face of acrylic core (Z = 3.5 to 3.58, depth = 0.08)
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

    // A. 3D LOGO MARK GLYPHS FACE
    // Shapes 1 & 2 = Brushed Bronze (#F79223), Shapes 3 & 4 = Satin Obsidian (#18181B)
    brandShapes.forEach((shape, idx) => {
      const geo = new THREE.ExtrudeGeometry(shape, faceExtrudeSettings);
      const mesh = new THREE.Mesh(geo, idx < 2 ? bronzeMat : obsidianMat);
      mesh.position.set(0, 5.5, 0);
      mesh.castShadow = true;
      logoFaceGroup.add(mesh);
    });

    // B. 3D DIMENSIONAL J.STUDIO WORDMARK LETTERS FACE
    // Letters 1 & 2 (J.) = Brushed Bronze (#F79223)
    // Letters 3 to 8 (STUDIO) = Satin Obsidian (#18181B)
    wordmarkShapes.forEach((shape, idx) => {
      const geo = new THREE.ExtrudeGeometry(shape, faceExtrudeSettings);
      const mesh = new THREE.Mesh(geo, idx < 2 ? bronzeMat : obsidianMat);
      mesh.position.set(0, -13.3, 0);
      mesh.castShadow = true;
      logoFaceGroup.add(mesh);
    });

    // C. ARCHITECTURAL SECONDARY TAGLINE (Transparent UV-printed subtext, placed at Y = -17.0)
    const subGeo = new THREE.PlaneGeometry(36, 5.6);
    const subTexture = createSubtitleTexture();
    const subMat = new THREE.MeshBasicMaterial({ 
      map: subTexture, 
      transparent: true,
      depthWrite: false
    });
    const subMesh = new THREE.Mesh(subGeo, subMat);
    subMesh.position.set(0, -17.0, 0.09); // on the front face of the plaque
    logoFaceGroup.add(subMesh);

    scene.add(logoFaceGroup);
    layers.logoFace = logoFaceGroup;
    layers.logo = logoFaceGroup;
  }

  // --------------------------------------------------------------------------
  // CASE 1: APEX DENTAL REVERSE HALO CHANNEL LETTERS
  // --------------------------------------------------------------------------
  else if (project.id === 'case1') {
    // 1. SPLIT-FACE CHARCOAL BRICK FACADE WALL (Front face sits exactly at Z = 0.0)
    const wallGroup = new THREE.Group();
    const wallGeo = new THREE.BoxGeometry(125, 70, 1.0);
    const brickTexture = createBrickWallTexture();
    const wallMat = new THREE.MeshStandardMaterial({ 
      map: brickTexture,
      roughness: 0.92, 
      metalness: 0.06 
    });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.position.set(0, 0, -0.5);
    wallMesh.receiveShadow = true;
    wallGroup.add(wallMesh);

    // Architectural parapet coping cap along top edge
    const copingGeo = new THREE.BoxGeometry(127, 2.4, 1.8);
    const copingMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.85, roughness: 0.3 });
    const coping = new THREE.Mesh(copingGeo, copingMat);
    coping.position.set(0, 34, 0.4);
    wallGroup.add(coping);

    // Lower entrance vestibule glass transom windows at bottom
    const transomGeo = new THREE.PlaneGeometry(112, 12);
    const glassTexture = createStorefrontGlassTexture('SUITE 104 • ENTRANCE VESTIBULE GLASS');
    const transomMat = new THREE.MeshStandardMaterial({ 
      map: glassTexture, 
      color: 0x0F172A,
      roughness: 0.1, 
      metalness: 0.9 
    });
    const transom = new THREE.Mesh(transomGeo, transomMat);
    transom.position.set(0, -28, 0.02);
    wallGroup.add(transom);

    scene.add(wallGroup);
    layers.wall = wallGroup;

    // PROCEDURAL BRAND ASSET GEOMETRIES & TYPOGRAPHY LAYOUT DATA
    const { badge: emblemBadgeShape, cross: emblemCrossShape } = getDentalEmblemShapes();
    const emblemScale = 0.95;
    const emblemPos = { x: -37.5, y: 2.0 };

    const letterScale = 0.90;
    const apexLettersData = [
      { char: 'A', x: -26.0, y: 2.0 },
      { char: 'P', x: -19.2, y: 2.0 },
      { char: 'E', x: -12.6, y: 2.0 },
      { char: 'X', x:  -6.0, y: 2.0 },
      { char: 'D', x:   5.0, y: 2.0 },
      { char: 'E', x:  11.6, y: 2.0 },
      { char: 'N', x:  18.0, y: 2.0 },
      { char: 'T', x:  24.6, y: 2.0 },
      { char: 'A', x:  31.4, y: 2.0 },
      { char: 'L', x:  38.0, y: 2.0 }
    ];

    // 2. 3MM SATIN BLACK ACM BACKER PANEL (Z = 0.0 to 0.3)
    const backerGroup = new THREE.Group();
    const backerGeo = new THREE.BoxGeometry(104, 30, 0.3);
    const backerMat = new THREE.MeshStandardMaterial({ 
      color: 0x090D16, 
      roughness: 0.32, 
      metalness: 0.75 
    });
    const backerMesh = new THREE.Mesh(backerGeo, backerMat);
    backerMesh.position.set(0, 0, 0.15);
    backerMesh.receiveShadow = true;
    backerGroup.add(backerMesh);

    // Architectural perimeter tray flange edge (all 4 sides)
    const flangeMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.8, roughness: 0.3 });
    const flangeTop = new THREE.Mesh(new THREE.BoxGeometry(104.4, 0.6, 0.5), flangeMat);
    flangeTop.position.set(0, 15, 0.25);
    backerGroup.add(flangeTop);
    const flangeBot = new THREE.Mesh(new THREE.BoxGeometry(104.4, 0.6, 0.5), flangeMat);
    flangeBot.position.set(0, -15, 0.25);
    backerGroup.add(flangeBot);
    const flangeLeft = new THREE.Mesh(new THREE.BoxGeometry(0.6, 30.0, 0.5), flangeMat);
    flangeLeft.position.set(-52, 0, 0.25);
    backerGroup.add(flangeLeft);
    const flangeRight = new THREE.Mesh(new THREE.BoxGeometry(0.6, 30.0, 0.5), flangeMat);
    flangeRight.position.set(52, 0, 0.25);
    backerGroup.add(flangeRight);

    // Baffled weep slots along bottom edge
    const weepMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    [-40, -20, 0, 20, 40].forEach((wx) => {
      const weep = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.32), weepMat);
      weep.position.set(wx, -14.6, 0.16);
      backerGroup.add(weep);
    });

    // Soft architectural halo wash plane reflecting against the black ACM backer tray
    const haloGeo = new THREE.PlaneGeometry(104, 30);
    const haloTex = createApexHaloTexture(apexLettersData, emblemPos);
    const haloMat = new THREE.MeshBasicMaterial({
      map: haloTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const haloBackdropMesh = new THREE.Mesh(haloGeo, haloMat);
    haloBackdropMesh.position.set(0, 0, 0.302);
    haloBackdropMesh.userData.isAccent = true;
    backerGroup.add(haloBackdropMesh);

    // UV-Printed Secondary Subtitle ("FAMILY & COSMETIC DENTISTRY")
    const subGeo = new THREE.PlaneGeometry(64, 8.5);
    const subTexture = createApexSubtitleTexture();
    const subMat = new THREE.MeshBasicMaterial({ 
      map: subTexture, 
      transparent: true, 
      depthWrite: false 
    });
    const subMesh = new THREE.Mesh(subGeo, subMat);
    subMesh.position.set(5.8, -6.8, 0.303);
    subMesh.userData.isAccent = true;
    backerGroup.add(subMesh);

    scene.add(backerGroup);
    layers.backer = backerGroup;

    // 3. 1.50" MACHINED THREADED STANDOFF SPACERS (Z = 0.3 to 2.8, length = 2.5)
    const standoffsGroup = new THREE.Group();
    const standoffGeo = new THREE.CylinderGeometry(0.35, 0.35, 2.5, 16);
    standoffGeo.rotateX(Math.PI / 2);
    const standoffMat = new THREE.MeshStandardMaterial({ 
      color: 0xCBD5E1, 
      metalness: 0.92, 
      roughness: 0.22 
    });

    const addStandoff = (x, y) => {
      const st = new THREE.Mesh(standoffGeo, standoffMat);
      st.position.set(x, y, 1.25);
      st.castShadow = true;
      standoffsGroup.add(st);
    };

    // Dental emblem 4x mounting studs
    [-2.8, 2.8].forEach(sx => {
      [-2.8, 2.8].forEach(sy => {
        addStandoff(emblemPos.x + sx, emblemPos.y + sy);
      });
    });

    // Precise standoff relative anchor offsets per character (safely behind solid returns/faces)
    const APEX_STANDOFF_OFFSETS = {
      'A': [ [-1.8, -2.6], [1.8, -2.6], [0.0, 3.8] ],
      'P': [ [-2.0, -2.8], [-2.0, 2.5] ],
      'E': [ [-2.0, 3.0], [-2.0, -3.0], [1.2, 0.0] ],
      'X': [ [-1.6, 2.8], [1.6, -2.8], [1.6, 2.8], [-1.6, -2.8] ],
      'D': [ [-2.0, 2.8], [-2.0, -2.8], [2.2, 0.0] ],
      'N': [ [-2.0, 2.5], [-2.0, -2.5], [2.0, 2.5], [2.0, -2.5] ],
      'T': [ [-1.8, 4.2], [1.8, 4.2], [0.0, -2.5] ],
      'L': [ [-1.8, 2.5], [-1.8, -3.5], [1.4, -4.2] ]
    };

    apexLettersData.forEach((item) => {
      const offsets = APEX_STANDOFF_OFFSETS[item.char] || [[0, 0]];
      offsets.forEach(([ox, oy]) => {
        addStandoff(item.x + ox * letterScale, item.y + oy * letterScale);
      });
    });

    scene.add(standoffsGroup);
    layers.standoffs = standoffsGroup;

    // 4. 3/16" CLEAR LEXAN POLYCARBONATE BACKS (Z = 2.8 to 3.1)
    const polyGroup = new THREE.Group();
    const polyMat = new THREE.MeshStandardMaterial({
      color: 0xE0F2FE,
      transparent: true,
      opacity: 0.50,
      roughness: 0.15,
      metalness: 0.1
    });

    // 5. 12V HIGH-OUTPUT LED MODULES (Z = 3.2 to 3.55 inside cans)
    const ledsGroup = new THREE.Group();
    const ledMat = new THREE.MeshStandardMaterial({ 
      color: 0xFFFBEB, 
      emissive: 0xFEF08A, 
      emissiveIntensity: 0.85, 
      roughness: 0.3 
    });

    // 6. 3.5" FABRICATED SATIN BLACK ALUMINUM RETURNS (Z = 3.1 to 6.6)
    const returnGroup = new THREE.Group();
    const returnMat = new THREE.MeshStandardMaterial({ 
      color: 0x1E293B, 
      metalness: 0.85, 
      roughness: 0.28 
    });

    // 7. 0.063" ROUTER-CUT SATIN BLACK ALUMINUM FACE (Z = 6.6 to 6.8)
    const faceGroup = new THREE.Group();
    const faceMat = new THREE.MeshStandardMaterial({ 
      color: 0x0A0F1D, 
      roughness: 0.22, 
      metalness: 0.88 
    });

    // A. PROCEDURAL DENTAL EMBLEM (Badge + Medical Cross)
    // Emblem Polycarbonate back
    const emblemPolyGeo = new THREE.ExtrudeGeometry(emblemBadgeShape, { depth: 0.3, bevelEnabled: false });
    const emblemPolyMesh = new THREE.Mesh(emblemPolyGeo, polyMat);
    emblemPolyMesh.scale.set(emblemScale, emblemScale, 1.0);
    emblemPolyMesh.position.set(emblemPos.x, emblemPos.y, 0.15);
    polyGroup.add(emblemPolyMesh);

    // Emblem LED modules
    [-2, 2].forEach(lx => {
      [-2, 2].forEach(ly => {
        const ledMesh = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.35), ledMat);
        ledMesh.position.set(emblemPos.x + lx, emblemPos.y + ly, 0.2);
        ledsGroup.add(ledMesh);
      });
    });

    // Emblem Return can (depth 3.5)
    const emblemRetGeo = new THREE.ExtrudeGeometry(emblemBadgeShape, {
      depth: 3.5,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 2
    });
    const emblemRetMesh = new THREE.Mesh(emblemRetGeo, returnMat);
    emblemRetMesh.scale.set(emblemScale, emblemScale, 1.0);
    emblemRetMesh.position.set(emblemPos.x, emblemPos.y, 0);
    emblemRetMesh.castShadow = true;
    returnGroup.add(emblemRetMesh);

    // Emblem Face (satin black plate)
    const emblemFaceGeo = new THREE.ExtrudeGeometry(emblemBadgeShape, {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 2
    });
    const emblemFaceMesh = new THREE.Mesh(emblemFaceGeo, faceMat);
    emblemFaceMesh.scale.set(emblemScale, emblemScale, 1.0);
    emblemFaceMesh.position.set(emblemPos.x, emblemPos.y, 0);
    emblemFaceMesh.castShadow = true;
    faceGroup.add(emblemFaceMesh);

    // Medical Cross '+' relief in vibrant cyan (#38BDF8)
    const crossMat = new THREE.MeshStandardMaterial({ 
      color: 0x38BDF8, 
      emissive: 0x0284C7,
      emissiveIntensity: 0.2,
      metalness: 0.7, 
      roughness: 0.25 
    });
    const crossGeo = new THREE.ExtrudeGeometry(emblemCrossShape, {
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 2
    });
    const crossMesh = new THREE.Mesh(crossGeo, crossMat);
    crossMesh.scale.set(emblemScale, emblemScale, 1.0);
    crossMesh.position.set(emblemPos.x, emblemPos.y, 0.18);
    crossMesh.castShadow = true;
    crossMesh.userData.isAccent = true;
    faceGroup.add(crossMesh);

    // Fine concentric architectural accent ring
    const ringGeo = new THREE.RingGeometry(3.2, 3.45, 32);
    const ringMesh = new THREE.Mesh(ringGeo, crossMat);
    ringMesh.scale.set(emblemScale, emblemScale, 1.0);
    ringMesh.position.set(emblemPos.x, emblemPos.y, 0.20);
    ringMesh.userData.isAccent = true;
    faceGroup.add(ringMesh);

    // B. PROCEDURAL INDIVIDUAL CHANNEL LETTERS FOR "APEX DENTAL"
    apexLettersData.forEach((item) => {
      const shape = getChannelLetterShape(item.char);

      // Polycarb back
      const pGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: false });
      const pMesh = new THREE.Mesh(pGeo, polyMat);
      pMesh.scale.set(letterScale, letterScale, 1.0);
      pMesh.position.set(item.x, item.y, 0.15);
      polyGroup.add(pMesh);

      // Internal LED modules
      const ledMesh1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.35), ledMat);
      ledMesh1.position.set(item.x, item.y + 1.6, 0.2);
      const ledMesh2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.35), ledMat);
      ledMesh2.position.set(item.x, item.y - 1.6, 0.2);
      ledsGroup.add(ledMesh1);
      ledsGroup.add(ledMesh2);

      // 3.5" Formed Aluminum Return
      const rGeo = new THREE.ExtrudeGeometry(shape, {
        depth: 3.5,
        bevelEnabled: true,
        bevelThickness: 0.06,
        bevelSize: 0.06,
        bevelSegments: 2
      });
      const rMesh = new THREE.Mesh(rGeo, returnMat);
      rMesh.scale.set(letterScale, letterScale, 1.0);
      rMesh.position.set(item.x, item.y, 0);
      rMesh.castShadow = true;
      returnGroup.add(rMesh);

      // 0.063" Router-cut Face
      const fGeo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.04,
        bevelSegments: 2
      });
      const fMesh = new THREE.Mesh(fGeo, faceMat);
      fMesh.scale.set(letterScale, letterScale, 1.0);
      fMesh.position.set(item.x, item.y, 0);
      fMesh.castShadow = true;
      faceGroup.add(fMesh);
    });

    scene.add(polyGroup);
    layers.polycarb = polyGroup;

    scene.add(ledsGroup);
    layers.leds = ledsGroup;

    scene.add(returnGroup);
    layers.return = returnGroup;

    scene.add(faceGroup);
    layers.face = faceGroup;
  }

  // --------------------------------------------------------------------------
  // CASE 2: METRO BURGER FRONT-LIT ON RACEWAY
  // --------------------------------------------------------------------------
  else if (project.id === 'case2') {
    // 1. STOREFRONT WALL (Front face sits exactly at Z = 0.0)
    const wallGroup = new THREE.Group();
    const wallGeo = new THREE.BoxGeometry(135, 70, 1.0);
    const timberTexture = createTimberWallTexture();
    const wallMat = new THREE.MeshStandardMaterial({ 
      map: timberTexture, 
      roughness: 0.88, 
      metalness: 0.05 
    });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.position.set(0, 0, -0.5);
    wallMesh.receiveShadow = true;
    wallGroup.add(wallMesh);

    // Architectural parapet coping bar
    const copingGeo = new THREE.BoxGeometry(137, 2.4, 1.8);
    const copingMat = new THREE.MeshStandardMaterial({ color: 0x1C1917, metalness: 0.8, roughness: 0.3 });
    const coping = new THREE.Mesh(copingGeo, copingMat);
    coping.position.set(0, 34, 0.4);
    wallGroup.add(coping);

    // Lower retail storefront window
    const glassGeo = new THREE.PlaneGeometry(120, 12);
    const glassTexture = createStorefrontGlassTexture('UNIT 12 • SHOPPES AT LEGACY CREEK');
    const glassMat = new THREE.MeshStandardMaterial({ 
      map: glassTexture, 
      color: 0x0F172A,
      roughness: 0.1, 
      metalness: 0.9 
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(0, -28, 0.02);
    wallGroup.add(glass);

    scene.add(wallGroup);
    layers.wall = wallGroup;

    // 2. 7" x 4.5" EXTRUDED ALUMINUM RACEWAY (Z = 0.0 to 4.5)
    const racewayGroup = new THREE.Group();
    const racewayGeo = new THREE.BoxGeometry(122, 15, 4.5);
    const racewayMat = new THREE.MeshStandardMaterial({ 
      color: 0xD6CEBE, 
      metalness: 0.72, 
      roughness: 0.38 
    });
    const racewayMesh = new THREE.Mesh(racewayGeo, racewayMat);
    racewayMesh.position.set(0, 0, 2.25);
    racewayMesh.receiveShadow = true;
    racewayMesh.castShadow = true;
    racewayGroup.add(racewayMesh);

    // Commercial mounting angle brackets (3x heavy steel brackets securing raceway to wall studs)
    const bracketGeo = new THREE.BoxGeometry(2.4, 17, 0.4);
    const bracketMat = new THREE.MeshStandardMaterial({ color: 0x44403C, metalness: 0.9, roughness: 0.3 });
    [-52, 0, 52].forEach(bx => {
      const bTop = new THREE.Mesh(bracketGeo, bracketMat);
      bTop.position.set(bx, 0, 0.2);
      racewayGroup.add(bTop);
    });

    // 1/2" watertight conduit feed fitting on raceway top
    const conduitGeo = new THREE.CylinderGeometry(0.8, 0.8, 4.0, 16);
    const conduitMat = new THREE.MeshStandardMaterial({ color: 0x78716C, metalness: 0.85 });
    const conduit = new THREE.Mesh(conduitGeo, conduitMat);
    conduit.position.set(-54, 7.5, 2.25);
    racewayGroup.add(conduit);

    scene.add(racewayGroup);
    layers.raceway = racewayGroup;

    // 3. INTERNAL UL CLASS 2 DRIVERS (Inside raceway at Z = 2.2)
    const driversGroup = new THREE.Group();
    const driverGeo = new THREE.BoxGeometry(14, 4.8, 2.2);
    const driverMat = new THREE.MeshStandardMaterial({ 
      color: 0x0F172A, 
      metalness: 0.75, 
      roughness: 0.3 
    });

    [-34, 0, 34].forEach((dx) => {
      const driver = new THREE.Mesh(driverGeo, driverMat);
      driver.position.set(dx, 0, 0);
      driver.castShadow = true;
      driversGroup.add(driver);

      // Driver spec label plate
      const specPlate = new THREE.Mesh(
        new THREE.PlaneGeometry(12, 3.6),
        new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.85 })
      );
      specPlate.position.set(dx, 0, 1.12);
      driversGroup.add(specPlate);
    });

    // Toggle disconnect switch inside raceway
    const toggleGeo = new THREE.BoxGeometry(3.0, 4.0, 1.5);
    const toggleMat = new THREE.MeshStandardMaterial({ color: 0xDC2626 });
    const toggle = new THREE.Mesh(toggleGeo, toggleMat);
    toggle.position.set(-54, 0, 0);
    driversGroup.add(toggle);

    scene.add(driversGroup);
    layers.drivers = driversGroup;

    // 4. 5" WELDED CHANNEL LETTER RETURN CANS (Z = 4.5 to 8.0, depth = 3.5)
    const returnGroup = new THREE.Group();
    const returnMat = new THREE.MeshStandardMaterial({ 
      color: 0x1E293B, 
      metalness: 0.85, 
      roughness: 0.28 
    });

    // 5. INTERNAL RED LED MODULES (inside return cans at Z = 6.0)
    const ledsGroup = new THREE.Group();
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xFF2222 });

    // 6. 3/16" TRANSLUCENT 2793 RED ACRYLIC FACE (Z = 8.0 to 8.3)
    const faceGroup = new THREE.Group();
    const faceMat = new THREE.MeshStandardMaterial({ 
      color: 0xEF4444, 
      roughness: 0.18, 
      metalness: 0.15 
    });

    // 7. 1" JEWELITE TRIM CAP (wrapped around face at Z = 7.9 to 8.5)
    const trimGroup = new THREE.Group();
    const trimMat = new THREE.MeshStandardMaterial({ 
      color: 0x090D16, 
      roughness: 0.35, 
      metalness: 0.75 
    });

    // INDIVIDUAL CHANNEL LETTERS FOR "METRO BURGER"
    const metroLettersData = [
      { char: 'M', x: -48.9, y: 0 },
      { char: 'E', x: -39.1, y: 0 },
      { char: 'T', x: -29.8, y: 0 },
      { char: 'R', x: -20.3, y: 0 },
      { char: 'O', x: -10.9, y: 0 },
      { char: 'B', x:   3.4, y: 0 },
      { char: 'U', x:  12.5, y: 0 },
      { char: 'R', x:  21.8, y: 0 },
      { char: 'G', x:  31.1, y: 0 },
      { char: 'E', x:  40.3, y: 0 },
      { char: 'R', x:  49.5, y: 0 }
    ];

    const metroScale = 1.0;

    metroLettersData.forEach((item) => {
      const shape = getChannelLetterShape(item.char);

      // Return Can (depth 3.5, baseZ = 4.5)
      const rGeo = new THREE.ExtrudeGeometry(shape, {
        depth: 3.5,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.08,
        bevelSegments: 2
      });
      const rMesh = new THREE.Mesh(rGeo, returnMat);
      rMesh.scale.set(metroScale, metroScale, 1.0);
      rMesh.position.set(item.x, item.y, 0);
      rMesh.castShadow = true;
      returnGroup.add(rMesh);

      // Internal LED Modules (baseZ = 6.0)
      const l1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.4), ledMat);
      l1.position.set(item.x, item.y + 2.0, 0);
      const l2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.4), ledMat);
      l2.position.set(item.x, item.y - 2.0, 0);
      ledsGroup.add(l1);
      ledsGroup.add(l2);

      // 3/16" Red Acrylic Face (baseZ = 8.0)
      const fGeo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.04,
        bevelSegments: 2
      });
      const fMesh = new THREE.Mesh(fGeo, faceMat);
      fMesh.scale.set(metroScale, metroScale, 1.0);
      fMesh.position.set(item.x, item.y, 0);
      fMesh.castShadow = true;
      faceGroup.add(fMesh);

      // 1" Jewelite Trim Cap (baseZ = 7.95)
      const tGeo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.5,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.06,
        bevelSegments: 2
      });
      const tMesh = new THREE.Mesh(tGeo, trimMat);
      tMesh.scale.set(metroScale * 1.02, metroScale * 1.02, 1.0);
      tMesh.position.set(item.x, item.y, 0);
      tMesh.castShadow = true;
      trimGroup.add(tMesh);
    });

    scene.add(returnGroup);
    layers.return = returnGroup;

    scene.add(ledsGroup);
    layers.leds = ledsGroup;

    scene.add(faceGroup);
    layers.face = faceGroup;

    scene.add(trimGroup);
    layers.trim = trimGroup;
  }
}

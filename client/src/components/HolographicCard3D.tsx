import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, Shield, Zap } from 'lucide-react';

interface HolographicCard3DProps {
  cardTitle?: string;
  brandName?: string;
  network?: string;
  cardNumber?: string;
  badgeText?: string;
  accentColor?: string;
}

export function HolographicCard3D({
  cardTitle = "OnlyPayments Corporate",
  brandName = "A2A Multi-Rail",
  network = "SPEI / Pix / Stripe",
  cardNumber = "•••• •••• •••• 9820",
  badgeText = "SMART ROUTER",
}: HolographicCard3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dimensions
    const width = mount.clientWidth || 360;
    const height = mount.clientHeight || 220;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Card Geometry (Rounded bevel look)
    const cardShape = new THREE.Shape();
    const x = -1.6, y = -1.0, w = 3.2, h = 2.0, radius = 0.12;
    cardShape.moveTo(x + radius, y);
    cardShape.lineTo(x + w - radius, y);
    cardShape.quadraticCurveTo(x + w, y, x + w, y + radius);
    cardShape.lineTo(x + w, y + h - radius);
    cardShape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    cardShape.lineTo(x + radius, y + h);
    cardShape.quadraticCurveTo(x, y + h, x, y + h - radius);
    cardShape.lineTo(x, y + radius);
    cardShape.quadraticCurveTo(x, y, x + radius, y);

    const extrudeSettings = {
      steps: 1,
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3
    };

    const geometry = new THREE.ExtrudeGeometry(cardShape, extrudeSettings);
    geometry.center();

    // 3. Metallic Holographic Shader Material
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0f172a),
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      wireframe: false
    });

    const cardMesh = new THREE.Mesh(geometry, material);
    scene.add(cardMesh);

    // 4. Chip Element
    const chipGeo = new THREE.BoxGeometry(0.35, 0.28, 0.09);
    const chipMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf59e0b),
      metalness: 0.9,
      roughness: 0.3
    });
    const chipMesh = new THREE.Mesh(chipGeo, chipMat);
    chipMesh.position.set(-1.0, 0.3, 0.05);
    scene.add(chipMesh);

    // 5. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x0000ff, 2.5);
    mainLight.position.set(5, 5, 4);
    scene.add(mainLight);

    const cyanRim = new THREE.PointLight(0x00f5d4, 3.0, 10);
    cyanRim.position.set(-4, -2, 2);
    scene.add(cyanRim);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 2.0, 8);
    purpleLight.position.set(2, -3, 3);
    scene.add(purpleLight);

    // 6. Interaction Physics (Smooth Lerp Tilt)
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.35;
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // 7. Animation Loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle float oscillation
      const floatOffsetY = Math.sin(elapsedTime * 1.5) * 0.08;
      cardMesh.position.y = floatOffsetY;
      chipMesh.position.y = floatOffsetY + 0.3;

      // Smooth lerp rotation
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      cardMesh.rotation.x = currentRotX;
      cardMesh.rotation.y = currentRotY + Math.sin(elapsedTime * 0.5) * 0.05;

      chipMesh.rotation.x = cardMesh.rotation.x;
      chipMesh.rotation.y = cardMesh.rotation.y;

      // Orbit rim lights around card for holographic reflections
      cyanRim.position.x = Math.sin(elapsedTime * 1.2) * 3;
      purpleLight.position.y = Math.cos(elapsedTime * 1.5) * 3;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(reqId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      chipGeo.dispose();
      chipMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[380px] h-[230px] rounded-2xl p-6 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 border border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,238,0.25)] backdrop-blur-xl overflow-hidden group cursor-pointer"
    >
      {/* Three.js Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Holographic Overlay Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/10 to-indigo-500/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-between h-full pointer-events-none select-none">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#0000EE]/20 border border-[#0000EE]/40 text-[#0000EE] backdrop-blur-md">
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                {brandName}
              </span>
              <span className="text-xs font-extrabold text-white font-outfit tracking-wide">
                {cardTitle}
              </span>
            </div>
          </div>

          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
            {badgeText}
          </span>
        </div>

        {/* Middle Details */}
        <div className="my-auto pt-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="tracking-widest text-sm font-semibold">{cardNumber}</span>
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Multi-Rail Security</span>
          </div>
          <span className="text-[11px] font-mono text-slate-200 font-bold tracking-tight">
            {network}
          </span>
        </div>
      </div>
    </div>
  );
}

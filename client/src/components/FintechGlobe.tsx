import { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { trpc } from '@/lib/trpc';
import * as THREE from 'three';
import { Loader2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function FintechGlobe() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const { data: globeData, isLoading } = trpc.fintechs.globeData.useQuery();
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);

  // Handle container resize reliably
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0) {
          setWindowDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height || 500
          });
        }
      }
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isLoading]);

  // Configure globe auto-rotation and initial position
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls() as any;
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableZoom = false; // keep it aesthetic, or enable if you want
      }
      
      // Point camera to LATAM by default
      globeRef.current.pointOfView({ lat: 4.5, lng: -74.0, altitude: 1.8 }, 1000);
    }
  }, [globeData]);

  // Optimize colors based on theme, we assume dark mode as premium default
  const isDark = theme === 'dark' || true; // Enforcing dark aesthetic for the globe as requested

  // Since many fintechs can be in the same country, we can group them by country to show "Rings"
  // Or we can just use hexBin for density
  
  return (
    <div ref={containerRef} id="globe-container" className="w-full h-full min-h-[500px] flex items-center justify-center relative overflow-hidden rounded-xl bg-background/5 border border-white/5 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
      
      {isLoading ? (
        <Loader2 className="w-8 h-8 animate-spin text-primary z-20" />
      ) : windowDimensions.width > 0 && (
        <Globe
          ref={globeRef as any}
          width={windowDimensions.width}
          height={windowDimensions.height}
          
          // Globe aesthetics
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)" // Transparent background
          
          // Points configuration for individual companies
          pointsData={globeData || []}
          pointLat={(d: any) => d.lat}
          pointLng={(d: any) => d.lng}
          pointColor={() => '#4ade80'}
          pointAltitude={(d: any) => Math.max(d.size * 0.05, 0.02)}
          pointRadius={(d: any) => Math.max(d.size * 0.4, 0.2)}
          pointsMerge={true}
          
          // Tooltips are handled by point objects when hovered
          pointLabel={(d: any) => `
            <div style="background: rgba(0, 0, 0, 0.8); border: 1px solid rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 8px; backdrop-filter: blur(4px); font-family: 'Outfit', sans-serif;">
              <div style="color: #4ade80; font-weight: bold; font-size: 14px; margin-bottom: 4px;">${d.name}</div>
              <div style="color: #cbd5e1; font-size: 12px;">${d.industry}</div>
              <div style="color: #94a3b8; font-size: 11px; margin-top: 2px;">📍 ${d.country}</div>
            </div>
          `}
          
        />
      )}
    </div>
  );
}

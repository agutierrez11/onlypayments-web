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

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Find parent container dimensions to be responsive
      const container = document.getElementById('globe-container');
      if (container) {
        setWindowDimensions({
          width: container.clientWidth,
          height: container.clientHeight || 500
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Optimize colors based on theme, we assume dark mode as premium default
  const isDark = theme === 'dark' || true; // Enforcing dark aesthetic for the globe as requested

  // Since many fintechs can be in the same country, we can group them by country to show "Rings"
  // Or we can just use hexBin for density
  
  return (
    <div id="globe-container" className="w-full h-full min-h-[500px] flex items-center justify-center relative overflow-hidden rounded-xl bg-background/5 border border-white/5 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
      
      {windowDimensions.width > 0 && (
        <Globe
          ref={globeRef as any}
          width={windowDimensions.width}
          height={windowDimensions.height}
          
          // Globe aesthetics
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)" // Transparent background
          
          // Points / Hexbin configuration for density
          hexBinPointsData={globeData || []}
          hexBinPointWeight="size"
          hexAltitude={d => (d as any).sumWeight * 0.05}
          hexBinResolution={4}
          hexMargin={0.2}
          hexTopColor={() => '#4ade80'} // Green primary
          hexSideColor={() => '#16a34a'}
          hexBinMerge={true}
          
          // Labels/Tooltips for interaction
          labelsData={globeData || []}
          labelLat={d => (d as any).lat}
          labelLng={d => (d as any).lng}
          labelText={d => (d as any).name}
          labelSize={0.5}
          labelDotRadius={0.3}
          labelColor={() => 'rgba(255,255,255,0.8)'}
          labelResolution={2}
          
          // Custom tooltip HTML
          labelLabel={(d: any) => `
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

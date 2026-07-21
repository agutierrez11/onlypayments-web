import React from 'react';

export default function GlobeWidget() {
  return (
    <div className="relative w-full h-[600px] md:h-[750px] bg-[#020408] rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl">
      <iframe
        src="/latam-fintech-satellite.html"
        title="LATAM Fintech Hub 3D"
        className="w-full h-full border-0 block"
        allow="clipboard-write"
      />
    </div>
  );
}

import React from 'react';

export default function FintechGlobe() {
  return (
    <div className="w-full h-full min-h-[550px] relative overflow-hidden rounded-2xl bg-black/40 border border-cyan-500/20 backdrop-blur-md shadow-2xl">
      <iframe
        src="/latam-fintech-satellite.html"
        title="LATAM Fintech Satellite Tracking 3D"
        className="w-full h-full min-h-[550px] border-0 block"
      />
    </div>
  );
}

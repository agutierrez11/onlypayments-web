import React from 'react';

export default function FintechGlobe() {
  return (
    <div className="w-full h-full min-h-[550px] relative overflow-hidden rounded-2xl bg-[#020408] border border-cyan-500/20 backdrop-blur-md shadow-2xl">
      <iframe
        src="/obsidian-graph.html"
        title="LATAM Fintech — Obsidian Graph"
        className="w-full h-full min-h-[550px] border-0 block"
      />
    </div>
  );
}

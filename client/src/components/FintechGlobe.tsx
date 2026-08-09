import React, { useState } from 'react';
import { Radio, Network, Sparkles, Maximize2 } from 'lucide-react';

export default function FintechGlobe() {
  const [viewMode, setViewMode] = useState<'graph' | 'satellite'>('graph');

  return (
    <div className="w-full h-full min-h-[640px] relative overflow-hidden rounded-2xl bg-[#020617] border border-cyan-500/25 shadow-2xl flex flex-col">
      {/* Selector de Modo de Visualización Superior */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-slate-900/85 backdrop-blur-xl p-1 rounded-xl border border-slate-800 shadow-lg">
        <button
          onClick={() => setViewMode('graph')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            viewMode === 'graph'
              ? 'bg-cyan-500 text-slate-950 shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          Grafo de Nodos
        </button>
        <button
          onClick={() => setViewMode('satellite')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            viewMode === 'satellite'
              ? 'bg-cyan-500 text-slate-950 shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          Globo Satelital 3D
        </button>
      </div>

      <iframe
        key={viewMode}
        src={viewMode === 'graph' ? '/obsidian-graph.html?v=2026.3' : '/latam-fintech-satellite.html?v=2026.3'}
        title={viewMode === 'graph' ? 'OnlyPayments Ecosystem Graph' : 'LATAM Fintech Satellite 3D'}
        className="w-full h-full min-h-[640px] border-0 block flex-1"
        loading="lazy"
      />
    </div>
  );
}

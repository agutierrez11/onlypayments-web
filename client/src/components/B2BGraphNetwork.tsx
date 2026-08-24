import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Network, 
  Building2, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Globe, 
  ArrowRight, 
  Sparkles,
  Search,
  Info
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NodeItem {
  id: string;
  label: string;
  type: "hub" | "bank" | "rail" | "gateway";
  x: number;
  y: number;
  connections: string[];
  metrics: string;
  license: string;
  description: string;
  color: string;
}

const NODES_GRAPH: NodeItem[] = [
  {
    id: "hub",
    label: "OnlyPayments Switch",
    type: "hub",
    x: 400,
    y: 250,
    connections: ["spei", "pix", "bbva", "banorte", "stripe", "clip", "mercadopago"],
    metrics: "Smart Router A2A",
    license: "Bóveda PCI-DSS v4.0",
    description: "Núcleo central de enrutamiento dinámico y matching inteligente de comisiones.",
    color: "#0000EE"
  },
  {
    id: "spei",
    label: "SPEI (Banxico)",
    type: "rail",
    x: 200,
    y: 120,
    connections: ["bbva", "banorte", "conekta"],
    metrics: "Latencia 38ms • 24/7",
    license: "Cámara Compensación MX",
    description: "Sistema de Pagos Electrónicos Interbancarios del Banco de México.",
    color: "#10b981"
  },
  {
    id: "pix",
    label: "Pix (BCB)",
    type: "rail",
    x: 600,
    y: 120,
    connections: ["bradesco", "dlocal"],
    metrics: "92% Adopción Brasil",
    license: "Banco Central do Brasil",
    description: "Sistema de pagos instantáneos cuenta a cuenta en Brasil.",
    color: "#06b6d4"
  },
  {
    id: "bbva",
    label: "BBVA México",
    type: "bank",
    x: 180,
    y: 350,
    connections: ["openpay", "clip"],
    metrics: "Adquirente Principal",
    license: "Institución Banca Múltiple",
    description: "Banco adquirente líder en procesamiento de tarjetas en México.",
    color: "#6366f1"
  },
  {
    id: "banorte",
    label: "Banorte / Prosa",
    type: "bank",
    x: 320,
    y: 420,
    connections: ["conekta"],
    metrics: "Cámara de Procesamiento",
    license: "Banca Múltiple / Prosa",
    description: "Switch procesador transaccional en México.",
    color: "#f59e0b"
  },
  {
    id: "stripe",
    label: "Stripe LATAM",
    type: "gateway",
    x: 600,
    y: 360,
    connections: ["hub"],
    metrics: "MDR 3.60% + $3 MXN",
    license: "IFPE Regulada",
    description: "Pasarela global con adquirencia directa en México y Brasil.",
    color: "#8b5cf6"
  },
  {
    id: "clip",
    label: "Clip MX",
    type: "gateway",
    x: 480,
    y: 420,
    connections: ["bbva"],
    metrics: "Líder POS PyME",
    license: "Agregador Regulado",
    description: "Líder de aceptación de tarjetas físicas y digitales en comercios.",
    color: "#ec4899"
  },
  {
    id: "mercadopago",
    label: "Mercado Pago",
    type: "gateway",
    x: 260,
    y: 240,
    connections: ["hub"],
    metrics: "Ecosistema Regional",
    license: "IFPE / PSP LATAM",
    description: "Pasarela y agregador de pagos con cobertura regional.",
    color: "#0284c7"
  }
];

export function B2BGraphNetwork() {
  const [selectedNode, setSelectedNode] = useState<NodeItem>(NODES_GRAPH[0]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1320px] mx-auto p-4 sm:p-6 space-y-6 font-sans">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0000EE]/20 border border-[#0000EE]/40 text-cyan-400 text-xs font-mono font-bold mb-2">
            <Network className="w-3.5 h-3.5" />
            GRAFO B2B DE ALIANZAS • SKILL OSINTGRAPH & MAPCN
          </div>
          <h3 className="text-2xl font-black font-outfit text-white">
            Red de Interconexión de Rieles & Adquirentes
          </h3>
          <p className="text-sm text-slate-400 font-normal max-w-2xl">
            Explora las relaciones directas entre bancos adquirentes, pasarelas de pago y los rieles instantáneos SPEI y Pix.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-xs px-3 py-1.5">
            ● Node Engine Active
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive SVG Graph Area */}
        <div className="lg:col-span-2 relative min-h-[480px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-4 flex items-center justify-center shadow-2xl">
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

          {/* SVG Connections & Rays */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {NODES_GRAPH.map((node) => 
              node.connections.map((targetId) => {
                const targetNode = NODES_GRAPH.find(n => n.id === targetId);
                if (!targetNode) return null;
                
                const isHighlighted = 
                  selectedNode.id === node.id || 
                  selectedNode.id === targetNode.id ||
                  hoveredNode === node.id ||
                  hoveredNode === targetNode.id;

                return (
                  <g key={`${node.id}-${targetId}`}>
                    <line
                      x1={node.x}
                      y1={node.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isHighlighted ? "#00f5d4" : "#334155"}
                      strokeWidth={isHighlighted ? 2.5 : 1}
                      strokeDasharray={isHighlighted ? "6 6" : "none"}
                      className={isHighlighted ? "animate-pulse" : "opacity-40"}
                    />
                  </g>
                );
              })
            )}
          </svg>

          {/* Render Interactive Nodes */}
          {NODES_GRAPH.map((node) => {
            const isSelected = selectedNode.id === node.id;
            const isHovered = hoveredNode === node.id;

            return (
              <motion.div
                key={node.id}
                style={{ left: node.x - 36, top: node.y - 36 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute w-18 h-18 rounded-2xl cursor-pointer flex flex-col items-center justify-center p-2 text-center border shadow-xl transition-all ${
                  isSelected 
                    ? "bg-slate-900 border-cyan-400 ring-4 ring-cyan-500/30 z-30" 
                    : isHovered 
                    ? "bg-slate-900 border-indigo-400 z-20" 
                    : "bg-slate-900/90 border-slate-700/80 z-10 hover:border-slate-500"
                }`}
              >
                <div 
                  className="w-3 h-3 rounded-full mb-1" 
                  style={{ backgroundColor: node.color }} 
                />
                <span className="text-[10px] font-bold text-white leading-tight font-outfit truncate w-full text-center">
                  {node.label}
                </span>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">
                  {node.type}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Node Details Sidebar */}
        <Card className="p-6 bg-white border border-slate-200 shadow-xl flex flex-col justify-between rounded-2xl">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: selectedNode.color }} 
                />
                <h4 className="text-xl font-black text-slate-900 font-outfit">
                  {selectedNode.label}
                </h4>
              </div>
              <Badge className="bg-slate-100 text-slate-800 font-mono text-[10px] uppercase">
                {selectedNode.type}
              </Badge>
            </div>

            <div className="space-y-4 pt-4 text-xs font-sans">
              <div>
                <span className="text-slate-400 font-mono font-bold uppercase tracking-wider block mb-1">
                  Descripción
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Métrica KTI:</span>
                  <span className="font-extrabold text-slate-900">{selectedNode.metrics}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Licencia / Regulador:</span>
                  <span className="font-bold text-[#0000EE]">{selectedNode.license}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-mono font-bold uppercase tracking-wider block mb-2">
                  Conexiones Directas ({selectedNode.connections.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.connections.map((cId) => {
                    const connNode = NODES_GRAPH.find(n => n.id === cId);
                    return (
                      <span 
                        key={cId}
                        onClick={() => connNode && setSelectedNode(connNode)}
                        className="px-2.5 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-lg text-[11px] font-bold font-mono cursor-pointer hover:bg-indigo-100 transition-colors"
                      >
                        ⚡ {connNode?.label || cId}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Trazabilidad B2B 2026</span>
            <span className="text-[#0000EE] font-bold flex items-center gap-1 cursor-pointer">
              Ver Integración <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}

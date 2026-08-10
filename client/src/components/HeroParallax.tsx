import React, { useRef } from "react";
import { ArrowRight, ShieldCheck, Fingerprint, Database, Network, Zap, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function HeroParallax({
  onExplore,
  onApis,
}: {
  onExplore: () => void;
  onApis?: () => void;
  onRemittances?: () => void;
  onCommunity?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20
  });

  // Flow Shader Parallax Effects (Safe, non-colliding distances)
  const yText = useTransform(smoothProgress, [0, 1], [0, 80]);
  const opacityText = useTransform(smoothProgress, [0, 0.6], [1, 0.2]);
  
  const yCardLeft = useTransform(smoothProgress, [0, 1], [0, -40]);
  const yCardCenter = useTransform(smoothProgress, [0, 1], [0, -70]);
  const yCardRight = useTransform(smoothProgress, [0, 1], [0, -30]);

  return (
    <section 
      ref={containerRef} 
      className="relative z-10 overflow-hidden pt-24 pb-28 flex flex-col items-center justify-start bg-[#000000] text-white border-b border-[#1c1d24]"
    >
      {/* Background Gradients & Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[20%] w-[600px] h-[600px] bg-[#0000FF]/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[15%] w-[500px] h-[500px] bg-[#1BACFB]/12 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e2230_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
      </div>

      {/* Main Content Area */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="container max-w-5xl text-center space-y-8 z-20 relative px-6"
      >
        {/* Pill Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141414] border border-[#2a2d3d] shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1BACFB] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0000FF]"></span>
          </span>
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#abb8c3] font-mono">
            Infraestructura Financiera Institucional LATAM
          </span>
        </motion.div>
        
        {/* Main Headline with White -> Electric Cyan Gradient */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
        >
          El Ecosistema <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#9BE9FE] to-[#1BACFB]">
            Desnudo de Pagos
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-base sm:text-lg text-[#949494] max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Orquesta tu infraestructura técnica. Analiza stacks reales. Simula márgenes.
          El framework B2B definitivo para dominar los rieles y pasarelas en LATAM.
        </motion.p>

        {/* CTA Buttons - Pill Shaped, White on Black */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
          className="flex flex-col sm:flex-row gap-3.5 justify-center pt-2"
        >
          <button 
            onClick={onExplore}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FFFFFF] hover:bg-[#eaeaea] text-[#000000] transition-all duration-200 rounded-[50px] h-13 px-8 text-sm font-bold shadow-lg shadow-white/10 cursor-pointer hover:scale-[1.02]"
          >
            <span>Construir mi Stack</span>
            <ArrowRight className="w-4 h-4 text-[#000000]" />
          </button>
          
          <button 
            onClick={onApis}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#141414] hover:bg-[#1f2129] border border-[#2b2e3e] text-white transition-all duration-200 rounded-[50px] h-13 px-8 text-sm font-bold shadow-xs cursor-pointer hover:border-[#1BACFB]/40"
          >
            <span>Ver Radar y APIs</span>
            <Network className="w-4 h-4 text-[#1BACFB]" />
          </button>
        </motion.div>
      </motion.div>

      {/* Structured Bento Grid - Clean, Non-Colliding Multi-Plane Parallax */}
      <div className="container max-w-6xl mx-auto px-6 mt-16 z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: ID & Fraud Check */}
          <motion.div 
            style={{ y: yCardLeft }}
            className="p-5 rounded-[12px] bg-[#141414] border border-[#222430] hover:border-[#0000FF]/60 flex flex-col justify-between transition-all duration-300 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#0000FF]/15 border border-[#0000FF]/30 rounded-[8px]">
                  <Fingerprint className="w-5 h-5 text-[#1BACFB]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#abb8c3] uppercase tracking-wider font-bold">Prevención Fraude</div>
                  <div className="text-sm font-bold text-white">Liveness & KYC 24/7</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Activo
              </span>
            </div>
            
            <div className="space-y-2 pt-2 border-t border-[#1f212b]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#949494]">Precisión Biométrica</span>
                <span className="text-white font-mono font-bold">99.85%</span>
              </div>
              <div className="h-1.5 w-full bg-[#20222e] rounded-full overflow-hidden">
                <div className="h-full w-[99.85%] bg-gradient-to-r from-[#0000FF] to-[#1BACFB]" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: The Vault / Tokenization */}
          <motion.div 
            style={{ y: yCardCenter }}
            className="p-5 rounded-[12px] bg-[#141414] border border-[#2a2d3e] hover:border-[#1BACFB]/60 flex flex-col justify-between transition-all duration-300 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1BACFB] to-transparent" />
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#1BACFB]/15 border border-[#1BACFB]/30 rounded-[8px]">
                  <ShieldCheck className="w-5 h-5 text-[#1BACFB]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#1BACFB] uppercase tracking-wider font-bold">Bóveda PCI-DSS v4.0</div>
                  <div className="text-sm font-bold text-white">Tokenización Zero-Knowledge</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#0A0B10] rounded-[8px] border border-[#222433] flex items-center justify-between font-mono text-xs text-white my-2">
              <span className="tracking-widest">•••• •••• •••• 4242</span>
              <span className="text-emerald-400 font-bold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded">VAULT OK</span>
            </div>

            <div className="text-[11px] text-[#949494] flex items-center justify-between pt-1">
              <span>Cifrado AES-256</span>
              <span className="text-[#abb8c3] font-mono">Token Único Global</span>
            </div>
          </motion.div>

          {/* Card 3: Smart Routing Switch */}
          <motion.div 
            style={{ y: yCardRight }}
            className="p-5 rounded-[12px] bg-[#141414] border border-[#222430] hover:border-[#0000FF]/60 flex flex-col justify-between transition-all duration-300 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#0000FF]/15 border border-[#0000FF]/30 rounded-[8px]">
                  <Database className="w-5 h-5 text-[#1BACFB]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#abb8c3] uppercase tracking-wider font-bold">Orquestación</div>
                  <div className="text-sm font-bold text-white">Smart Routing A2A</div>
                </div>
              </div>
              <div className="h-2 w-2 rounded-full bg-[#1BACFB] animate-pulse" />
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#1f212b]">
              <div className="p-2 bg-[#0A0B10] rounded-[6px] border border-[#222433] flex items-center justify-between text-[11px] font-mono">
                <span className="text-white">Riel Primario SPEI/Pix</span>
                <span className="text-emerald-400 font-bold">Latency: 38ms</span>
              </div>
              <div className="p-2 bg-[#0A0B10] rounded-[6px] border border-[#222433] flex items-center justify-between text-[11px] font-mono opacity-60">
                <span className="text-[#949494]">Fallback Adquirente B</span>
                <span className="text-amber-400 font-bold">Standby</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

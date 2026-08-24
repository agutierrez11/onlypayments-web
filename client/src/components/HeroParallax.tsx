import React, { useRef } from "react";
import { ArrowRight, ShieldCheck, Fingerprint, Database, Network, Zap, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { HolographicCard3D } from "@/components/HolographicCard3D";

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

  // Parallax Transforms
  const yText = useTransform(smoothProgress, [0, 1], [0, 60]);
  const opacityText = useTransform(smoothProgress, [0, 0.6], [1, 0.3]);
  
  const yCardLeft = useTransform(smoothProgress, [0, 1], [0, -30]);
  const yCardCenter = useTransform(smoothProgress, [0, 1], [0, -50]);
  const yCardRight = useTransform(smoothProgress, [0, 1], [0, -25]);

  return (
    <section 
      ref={containerRef} 
      className="relative z-10 overflow-hidden pt-20 pb-24 flex flex-col items-center justify-start bg-[#F3F3F4] text-[#000000] border-b border-[#E5E6EA]"
    >
      {/* Subtle Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#E5E6EA_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Main Content Area */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="max-w-[1296px] mx-auto text-center space-y-6 z-20 relative px-4 sm:px-6"
      >
        {/* Pill Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-[#E5E6EA] text-[#0000EE] border border-[#E5E6EA]"
        >
          <span className="w-2 h-2 rounded-full bg-[#0000EE]" />
          <span className="text-[11px] font-bold tracking-widest uppercase font-mono">
            Infraestructura Financiera Institucional LATAM
          </span>
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.05 }}
          className="text-4xl sm:text-6xl lg:text-[75px] font-black tracking-tight leading-[1.05] text-[#000000]"
        >
          El Ecosistema <br />
          <span className="text-[#0000EE]">
            Desnudo de Pagos
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.1 }}
          className="text-lg sm:text-[24px] text-[#8B8F9A] max-w-2xl mx-auto font-normal leading-[1.15]"
        >
          Orquesta tu infraestructura técnica. Analiza stacks reales. Simula márgenes.
          El framework B2B definitivo para dominar los rieles y pasarelas en LATAM.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3.5 justify-center pt-3"
        >
          <button 
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2.5 bg-[#0000EE] hover:bg-[#0000BE] text-white transition-all duration-[0.12s] rounded-[12px] h-12 px-8 text-sm font-bold cursor-pointer"
          >
            <span>Construir mi Stack</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
          
          <button 
            onClick={onApis}
            className="inline-flex items-center justify-center gap-2.5 bg-[#FFFFFF] hover:bg-[#E5E6EA] border border-[#E5E6EA] text-[#000000] transition-all duration-[0.12s] rounded-[12px] h-12 px-8 text-sm font-bold cursor-pointer"
          >
            <span>Ver Radar y APIs</span>
            <Network className="w-4 h-4 text-[#0000EE]" />
          </button>
        </motion.div>

        {/* 3D WebGL Holographic Interactive Showcase (Skill: threeui-catalog) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="pt-10 flex flex-col items-center justify-center"
        >
          <HolographicCard3D 
            cardTitle="OnlyPayments Multi-Rail"
            brandName="Orquestador A2A LATAM"
            network="SPEI • Pix • Stripe • Clip"
            cardNumber="•••• •••• •••• 2026"
            badgeText="LIVE 3D ENGINE"
          />
          <span className="text-[11px] font-mono text-slate-500 mt-3 flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#0000EE]" />
            Mueve el cursor sobre la tarjeta para interactuar con la física 3D en tiempo real
          </span>
        </motion.div>
      </motion.div>

      {/* Structured Bento Grid — Flat White Cards on F3F3F4 */}
      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 mt-14 z-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: ID & Fraud Check */}
          <motion.div 
            style={{ y: yCardLeft }}
            className="p-6 rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA] hover:border-[#0000EE] flex flex-col justify-between transition-all duration-[0.12s]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#E5E6EA] rounded-[8px]">
                  <Fingerprint className="w-5 h-5 text-[#0000EE]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8B8F9A] uppercase tracking-wider font-bold">Prevención Fraude</div>
                  <div className="text-sm font-bold text-[#000000]">Liveness & KYC 24/7</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-emerald-100 text-emerald-800 font-bold">
                Activo
              </span>
            </div>
            
            <div className="space-y-2 pt-3 border-t border-[#E5E6EA]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#8B8F9A]">Precisión Biométrica</span>
                <span className="text-[#000000] font-bold">99.85%</span>
              </div>
              <div className="h-1.5 w-full bg-[#E5E6EA] rounded-full overflow-hidden">
                <div className="h-full w-[99.85%] bg-[#0000EE]" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: The Vault / Tokenization */}
          <motion.div 
            style={{ y: yCardCenter }}
            className="p-6 rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA] hover:border-[#0000EE] flex flex-col justify-between transition-all duration-[0.12s]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#E5E6EA] rounded-[8px]">
                  <ShieldCheck className="w-5 h-5 text-[#0000EE]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#0000EE] uppercase tracking-wider font-bold">Bóveda PCI-DSS v4.0</div>
                  <div className="text-sm font-bold text-[#000000]">Tokenización Zero-Knowledge</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#F3F3F4] rounded-[6px] border border-[#E5E6EA] flex items-center justify-between font-mono text-xs text-[#000000] my-2">
              <span className="tracking-widest">•••• •••• •••• 4242</span>
              <span className="text-emerald-700 font-bold text-[10px] bg-emerald-100 px-2 py-0.5 rounded-[2px]">VAULT OK</span>
            </div>

            <div className="text-[11px] text-[#8B8F9A] flex items-center justify-between pt-1">
              <span>Cifrado AES-256</span>
              <span className="text-[#000000] font-mono">Token Único Global</span>
            </div>
          </motion.div>

          {/* Card 3: Smart Routing Switch */}
          <motion.div 
            style={{ y: yCardRight }}
            className="p-6 rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA] hover:border-[#0000EE] flex flex-col justify-between transition-all duration-[0.12s]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#E5E6EA] rounded-[8px]">
                  <Database className="w-5 h-5 text-[#0000EE]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8B8F9A] uppercase tracking-wider font-bold">Orquestación</div>
                  <div className="text-sm font-bold text-[#000000]">Smart Routing A2A</div>
                </div>
              </div>
              <div className="h-2.5 w-2.5 rounded-full bg-[#0000EE]" />
            </div>

            <div className="space-y-1.5 pt-3 border-t border-[#E5E6EA]">
              <div className="p-2 bg-[#F3F3F4] rounded-[6px] border border-[#E5E6EA] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#000000]">Riel Primario SPEI/Pix</span>
                <span className="text-emerald-700 font-bold">Latency: 38ms</span>
              </div>
              <div className="p-2 bg-[#F3F3F4] rounded-[6px] border border-[#E5E6EA] flex items-center justify-between text-[11px] font-mono opacity-60">
                <span className="text-[#8B8F9A]">Fallback Adquirente B</span>
                <span className="text-amber-700 font-bold">Standby</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

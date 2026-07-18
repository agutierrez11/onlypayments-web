import React, { useRef } from "react";
import { ArrowRight, Lock, ShieldCheck, Fingerprint, RefreshCcw, Database, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroParallax({
  onExplore,
}: {
  onExplore: () => void;
  onRemittances: () => void;
  onCommunity: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Flow Shader Parallax Effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const yWidgetLeft = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yWidgetRight = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yWidgetBottom = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <section ref={containerRef} className="relative z-10 overflow-hidden min-h-[100vh] flex items-center justify-center bg-background">
      
      {/* Premium Flow Shader Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Dynamic mesh gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px] mix-blend-screen animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[160px] mix-blend-screen animate-pulse duration-[10000ms]" />
        <div className="absolute top-[20%] left-[40%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[140px] mix-blend-screen animate-pulse duration-[6000ms]" />
        
        {/* Extreme subtle grid */}
        <div className="absolute inset-0 opacity-[0.015] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="container max-w-6xl text-center space-y-10 z-20 relative px-6 mt-[-5%]"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-semibold tracking-widest uppercase text-white/90 font-mono">Arquitectura Fintech Latam</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[0.95] text-white"
        >
          El Ecosistema <br />
          <span className="text-gradient-primary">
            Desnudo
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-xl sm:text-2xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed tracking-wide"
        >
          Orquesta tu infraestructura técnica. Analiza stacks reales. Simula márgenes.
          El framework B2B definitivo para dominar los pagos en LATAM.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
        >
          <Button 
            size="lg" 
            onClick={onExplore}
            className="w-full sm:w-auto gap-3 bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300 rounded-2xl h-16 px-10 text-lg font-bold shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Construir mi Stack <ArrowRight className="w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="w-full sm:w-auto gap-3 glass-panel hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl h-16 px-10 text-lg font-bold text-white border-white/10"
          >
            Ver APIs <Network className="w-5 h-5 text-white/50" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Extreme Floating Bento Widgets */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden perspective-[1200px]">
        
        {/* Left Bento Widget - ID & Fraud */}
        <motion.div 
          style={{ y: yWidgetLeft }}
          initial={{ opacity: 0, x: -120, rotateY: -15, rotateX: 10 }}
          animate={{ opacity: 1, x: 0, rotateY: 10, rotateX: 5 }}
          transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
          className="hidden lg:flex absolute top-[15%] left-[2%] w-72 p-6 rounded-3xl glass-panel flex-col gap-4 transform-style-3d shadow-[0_0_80px_rgba(16,185,129,0.1)]"
        >
           <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <Fingerprint className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-bold">Liveness Check</div>
           </div>
           <div className="space-y-2">
             <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs">KYC Match</span>
                <span className="text-white font-mono text-sm">99.8%</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full w-[99.8%] bg-emerald-500" />
             </div>
           </div>
        </motion.div>

        {/* Right Bento Widget - Switch/Orchestrator */}
        <motion.div 
          style={{ y: yWidgetRight }}
          initial={{ opacity: 0, x: 120, rotateY: 15, rotateX: 10 }}
          animate={{ opacity: 1, x: 0, rotateY: -10, rotateX: 5 }}
          transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
          className="hidden lg:flex absolute top-[25%] right-[2%] w-80 p-6 rounded-3xl glass-panel flex-col gap-5 transform-style-3d shadow-[0_0_80px_rgba(59,130,246,0.1)]"
        >
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Database className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-blue-400 font-mono text-xs tracking-widest uppercase font-bold">Smart Routing</div>
              </div>
              <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
           </div>
           
           <div className="flex flex-col gap-3">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-white/60 text-xs font-mono">Adquirente A</span>
                <span className="text-emerald-400 text-xs font-mono font-bold">Latency: 45ms</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between opacity-50">
                <span className="text-white/40 text-xs font-mono">Adquirente B</span>
                <span className="text-rose-400 text-xs font-mono font-bold">Down</span>
              </div>
           </div>
        </motion.div>

        {/* Bottom Center Widget - The Vault */}
        <motion.div 
          style={{ y: yWidgetBottom }}
          initial={{ opacity: 0, y: 150, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }}
          className="absolute -bottom-[5%] left-1/2 -translate-x-1/2 w-[400px] p-8 rounded-[2rem] glass-panel flex flex-col gap-6 transform-style-3d shadow-[0_-20px_80px_rgba(255,255,255,0.05)] border-t border-white/20"
        >
           <div className="flex items-center gap-4">
             <div className="p-4 bg-white/10 rounded-2xl shadow-inner">
               <ShieldCheck className="w-8 h-8 text-white" />
             </div>
             <div>
               <div className="text-xs font-mono text-white/50 uppercase tracking-widest mb-1">Bóveda PCI-DSS</div>
               <div className="text-xl font-bold text-white tracking-tight">Tokenización Activa</div>
             </div>
           </div>
           <div className="space-y-3">
             <div className="h-12 w-full bg-white/5 rounded-xl border border-white/10 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  ))}
                  <span className="text-white/20 ml-2">····</span>
                  <span className="text-white/20 ml-2">····</span>
                </div>
                <span className="text-white font-mono font-bold">4242</span>
             </div>
           </div>
           <Button className="w-full h-14 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-white/90 rounded-xl">
             Autorizar $10,500.00
           </Button>
        </motion.div>

      </div>
    </section>
  );
}

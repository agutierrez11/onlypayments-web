import React, { useRef } from "react";
import { ArrowRight, ShieldCheck, Fingerprint, Database, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

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

  // Flow Shader Parallax Effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const yWidgetLeft = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yWidgetRight = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yWidgetBottom = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <section ref={containerRef} className="relative z-10 overflow-hidden pt-28 pb-64 lg:pb-80 flex flex-col items-center justify-start bg-slate-50">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-200/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-200/40 rounded-full blur-[160px]" />
        <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[140px]" />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="container max-w-5xl text-center space-y-8 z-20 relative px-6"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-300 shadow-xs"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <span className="text-xs font-extrabold tracking-widest uppercase text-slate-800 font-mono">Arquitectura Fintech Latam</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-slate-900"
        >
          El Ecosistema <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 font-black">
            Desnudo
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Orquesta tu infraestructura técnica. Analiza stacks reales. Simula márgenes.
          El framework B2B definitivo para dominar los pagos en LATAM.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Button 
            size="lg" 
            onClick={onExplore}
            className="w-full sm:w-auto gap-3 bg-cyan-600 hover:bg-cyan-700 text-white transition-all duration-200 rounded-xl h-14 px-8 text-base font-extrabold shadow-md cursor-pointer"
          >
            Construir mi Stack <ArrowRight className="w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={onApis}
            className="w-full sm:w-auto gap-3 bg-white border-2 border-slate-300 hover:bg-slate-100 text-slate-900 transition-all duration-200 rounded-xl h-14 px-8 text-base font-extrabold shadow-xs cursor-pointer"
          >
            Ver APIs <Network className="w-5 h-5 text-cyan-600" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating Bento Widgets */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        
        {/* Left Bento Widget - ID & Fraud */}
        <motion.div 
          style={{ y: yWidgetLeft }}
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="hidden lg:flex absolute top-[18%] left-[3%] w-72 p-5 rounded-2xl bg-white border border-slate-200 flex-col gap-3 shadow-lg"
        >
           <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 rounded-xl">
                <Fingerprint className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="text-emerald-800 font-mono text-xs tracking-widest uppercase font-extrabold">Liveness Check</div>
           </div>
           <div className="space-y-1.5">
             <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-bold">KYC Match</span>
                <span className="text-slate-900 font-mono font-bold">99.8%</span>
             </div>
             <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full w-[99.8%] bg-emerald-600" />
             </div>
           </div>
        </motion.div>

        {/* Right Bento Widget - Switch/Orchestrator */}
        <motion.div 
          style={{ y: yWidgetRight }}
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="hidden lg:flex absolute top-[25%] right-[3%] w-80 p-5 rounded-2xl bg-white border border-slate-200 flex-col gap-4 shadow-lg"
        >
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-cyan-100 rounded-xl">
                  <Database className="w-5 h-5 text-cyan-700" />
                </div>
                <div className="text-cyan-800 font-mono text-xs tracking-widest uppercase font-extrabold">Smart Routing</div>
              </div>
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-600 animate-pulse" />
           </div>
           
           <div className="flex flex-col gap-2">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-slate-700 text-xs font-mono font-bold">Adquirente A</span>
                <span className="text-emerald-700 text-xs font-mono font-bold">Latency: 45ms</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between opacity-60">
                <span className="text-slate-400 text-xs font-mono font-bold">Adquirente B</span>
                <span className="text-rose-600 text-xs font-mono font-bold">Down</span>
              </div>
           </div>
        </motion.div>

        {/* Bottom Center Widget - The Vault */}
        <motion.div 
          style={{ y: yWidgetBottom }}
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[380px] max-w-[90vw] p-6 rounded-2xl bg-white border border-slate-200 flex flex-col gap-4 shadow-xl"
        >
           <div className="flex items-center gap-3">
             <div className="p-3 bg-cyan-100 rounded-xl">
               <ShieldCheck className="w-6 h-6 text-cyan-700" />
             </div>
             <div>
               <div className="text-[10px] font-mono text-cyan-800 uppercase tracking-widest font-extrabold">Bóveda PCI-DSS</div>
               <div className="text-base font-black text-slate-900 tracking-tight">Tokenización Activa</div>
             </div>
           </div>
           <div className="space-y-2">
             <div className="h-10 w-full bg-slate-50 rounded-xl border border-slate-200 flex items-center px-4 justify-between text-slate-900 font-mono text-xs font-bold">
                <span>•••• •••• •••• 4242</span>
                <span className="text-emerald-700">OK</span>
             </div>
           </div>
           <Button className="w-full h-11 bg-slate-900 text-white font-black uppercase tracking-wider text-xs hover:bg-slate-800 rounded-xl cursor-pointer">
             Autorizar $10,500.00
           </Button>
        </motion.div>

      </div>
    </section>
  );
}

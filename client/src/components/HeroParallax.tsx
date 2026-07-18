import React, { useRef } from "react";
import { ArrowRight, Lock, ShieldCheck, Fingerprint, RefreshCcw } from "lucide-react";
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
  
  const yWidgetFront = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yWidgetBack = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="relative z-10 overflow-hidden min-h-[100vh] flex items-center justify-center bg-[#030305]">
      
      {/* Background Animated Blobs (Flow Shader Style) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[150px] mix-blend-screen" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="container max-w-5xl text-center space-y-8 z-20 relative px-6"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
          <span className="text-xs font-semibold tracking-wide uppercase text-white/80 font-mono">Motor de Inteligencia de Pagos</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white"
        >
          El Ecosistema <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-300% animate-gradient">
            Desnudo
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Diseña tu infraestructura técnica. Simula costos. Conecta con proveedores reales.
          El Hub B2B definitivo para LATAM.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <Button 
            size="lg" 
            onClick={onExplore}
            className="w-full sm:w-auto gap-2 bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-[1.02] hover:bg-blue-500 transition-all duration-300 rounded-xl h-14 px-8 text-base font-bold border border-blue-400/20"
          >
            Construir mi Stack <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating 3D Widgets (Parallax) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden perspective-[1200px]">
        
        {/* Left Widget - Anti-Fraud */}
        <motion.div 
          style={{ y: yWidgetBack }}
          initial={{ opacity: 0, x: -100, rotateY: -20 }}
          animate={{ opacity: 1, x: 0, rotateY: 15 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="hidden lg:flex absolute top-[25%] left-[5%] w-64 h-40 rounded-2xl border border-emerald-500/20 bg-black/40 backdrop-blur-xl shadow-2xl flex-col items-center justify-center gap-3 transform-style-3d"
        >
           <Fingerprint className="w-10 h-10 text-emerald-400" />
           <div className="text-emerald-400 font-mono text-xs tracking-widest uppercase">Motor Anti-Fraude</div>
           <div className="flex gap-2">
             <div className="h-1 w-12 bg-emerald-500/40 rounded-full" />
             <div className="h-1 w-8 bg-emerald-500/40 rounded-full" />
           </div>
        </motion.div>

        {/* Right Widget - Switch Central */}
        <motion.div 
          style={{ y: yWidgetBack }}
          initial={{ opacity: 0, x: 100, rotateY: 20 }}
          animate={{ opacity: 1, x: 0, rotateY: -15 }}
          transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
          className="hidden lg:flex absolute top-[30%] right-[5%] w-64 h-40 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl flex-col items-center justify-center gap-3 transform-style-3d"
        >
           <RefreshCcw className="w-10 h-10 text-white/50" />
           <div className="text-white/50 font-mono text-xs tracking-widest uppercase">Switch Central</div>
           <div className="w-3/4 h-1 bg-white/10 rounded-full overflow-hidden">
             <div className="w-1/2 h-full bg-white/40 animate-pulse" />
           </div>
        </motion.div>

        {/* Bottom Center Widget - Checkout Visual */}
        <motion.div 
          style={{ y: yWidgetFront }}
          initial={{ opacity: 0, y: 150, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 5 }}
          transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
          className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[340px] rounded-2xl border border-blue-500/30 bg-black/60 backdrop-blur-2xl shadow-[0_0_80px_rgba(37,99,235,0.15)] flex flex-col p-6 gap-4 transform-style-3d"
        >
           <div className="flex items-center gap-3 mb-2">
             <ShieldCheck className="w-6 h-6 text-blue-400" />
             <div className="text-sm font-bold text-white">Checkout Seguro</div>
           </div>
           <div className="space-y-3">
             <div className="h-10 w-full bg-white/5 rounded-lg border border-white/10" />
             <div className="grid grid-cols-2 gap-3">
               <div className="h-10 w-full bg-white/5 rounded-lg border border-white/10" />
               <div className="h-10 w-full bg-white/5 rounded-lg border border-white/10" />
             </div>
           </div>
           <div className="mt-4 h-12 w-full bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center uppercase text-sm tracking-widest shadow-lg shadow-blue-500/20">
             Pagar $1,500.00
           </div>
        </motion.div>

      </div>
    </section>
  );
}

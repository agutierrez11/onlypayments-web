import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Lock, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroParallax({
  onExplore,
  onRemittances,
  onCommunity
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

  // Parallax values
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative z-10 overflow-hidden py-32 lg:py-48 min-h-[90vh] flex items-center justify-center">
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: yFast }}
          className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-60 mix-blend-screen"
        />
        <motion.div
          style={{ y: ySlow }}
          className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] opacity-60 mix-blend-screen"
        />
      </div>

      {/* Floating Payment Graphics (The "Conviviendo" elements) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden perspective-[1000px]">
        {/* Gateway Card */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -400]), rotateY: 15, rotateX: 10 }}
          className="absolute top-32 left-[10%] w-32 h-44 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center gap-4"
        >
          <Lock className="w-8 h-8 text-primary/80" />
          <div className="h-1 w-12 bg-white/20 rounded-full" />
          <div className="h-1 w-8 bg-white/20 rounded-full" />
        </motion.div>

        {/* Acquirer Card */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]), rotateY: -15, rotateX: 5 }}
          className="absolute top-64 right-[12%] w-40 h-28 rounded-xl border border-white/20 bg-accent/10 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center gap-3"
        >
          <CreditCard className="w-10 h-10 text-accent/80" />
          <div className="h-1.5 w-16 bg-white/30 rounded-full" />
        </motion.div>

        {/* Network Shield */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -250]), scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]) }}
          className="absolute bottom-32 left-[20%] w-24 h-24 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md shadow-2xl flex items-center justify-center"
        >
          <ShieldCheck className="w-10 h-10 text-primary" />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ opacity, y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="container max-w-5xl text-center space-y-8 z-10 relative"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-md border border-border/50 shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
          <span className="text-xs font-semibold tracking-wide uppercase text-foreground font-mono">Diccionario & Quién es Quién v6.0</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1]"
        >
          El Mapa de Pagos <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">
            Global
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed"
        >
          Una plataforma interactiva para explorar métodos de pago locales, switches regulatorios, actores clave del ecosistema e inteligencia colectiva B2B.
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
            className="w-full sm:w-auto gap-2 bg-foreground text-background shadow-2xl hover:scale-[1.05] hover:bg-foreground/90 transition-all duration-300 rounded-xl h-14 px-8 text-base"
          >
            Explorar Países <ArrowRight className="w-4 h-4" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={onRemittances}
            className="w-full sm:w-auto border-border bg-background/50 backdrop-blur hover:bg-secondary/40 transition-all duration-300 rounded-xl h-14 px-8 text-base"
          >
            Mercado de Remesas
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={onCommunity}
            className="w-full sm:w-auto border-border bg-background/50 backdrop-blur hover:bg-secondary/40 transition-all duration-300 rounded-xl h-14 px-8 text-base"
          >
            Únete a los Debates
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

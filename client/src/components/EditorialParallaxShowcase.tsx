import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, Zap, Shield, Activity, Globe, Cpu, Layers, Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';

export default function EditorialParallaxShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  // Scroll Progress Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth Springs for Parallax Physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Multi-Plane Parallax Transforms
  const yBgText = useTransform(smoothProgress, [0, 1], [-100, 160]);
  const yCardLeft = useTransform(smoothProgress, [0, 1], [80, -120]);
  const yCardRight = useTransform(smoothProgress, [0, 1], [140, -180]);
  const yCardCenter = useTransform(smoothProgress, [0, 1], [40, -60]);
  const opacityFade = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const rotateSubtle = useTransform(smoothProgress, [0, 1], [-3, 3]);

  // Interactive 3D Cursor Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-300, 300], [6, -6]), { stiffness: 150, damping: 15 });
  const tiltY = useSpring(useTransform(mouseX, [-300, 300], [-6, 6]), { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const showcaseCards = [
    {
      index: "01",
      tag: "INFRAESTRUCTURA A2A",
      title: "Sovereign Settlement Mesh",
      subtitle: "Interoperabilidad nativa Pix (BCB), SPEI (Banxico) y Bre-B (Banco de la República).",
      metric: "< 820ms",
      metricLabel: "Tiempo de liquidación final",
      accent: "#0000EE",
      icon: Zap
    },
    {
      index: "02",
      tag: "ENRUTAMIENTO SMART",
      title: "Algorithmic MDR Optimizer",
      subtitle: "Cascada inteligente de adquirencia local con balanceo de carga y fallback 3DS 2.0.",
      metric: "96.4%",
      metricLabel: "Tasa de autorización",
      accent: "#3333F1",
      icon: Cpu
    },
    {
      index: "03",
      tag: "LIQUIDEZ TRANSFRONTERIZA",
      title: "Cross-Border On/Off-Ramp",
      subtitle: "Conversión institucional USD/Stablecoin a rieles domésticos sin fricción cambiaria.",
      metric: "$4.2B+",
      metricLabel: "Capacidad de volumen mensual",
      accent: "#0000EE",
      icon: Activity
    }
  ];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 py-32 bg-[#000000] text-white overflow-hidden border-t border-[#1c1d24]"
      style={{ perspective: 1200 }}
    >
      {/* GLOW DE FONDO AZUL ULTRA-SATURADO (#0000EE) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0000ee]/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-[#3333f1]/10 rounded-full blur-[140px]" />
        {/* Subtle 4px grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111116_1px,transparent_1px),linear-gradient(to_bottom,#111116_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
      </div>

      {/* TIPOGRAFÍA DE FONDO GIGANTE PARALLAX (ESTILO DOGSTUDIO) */}
      <motion.div 
        style={{ y: yBgText, opacity: 0.08 }}
        className="absolute top-12 left-0 right-0 text-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[120px] sm:text-[180px] lg:text-[240px] font-serif font-black tracking-tighter text-white uppercase whitespace-nowrap block">
          FINTECH TELEMETRY
        </span>
      </motion.div>

      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        
        {/* HEADER EDITORIAL CON SERIF GIGANTE */}
        <motion.div 
          style={{ opacity: opacityFade }}
          className="max-w-4xl mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#131419] border border-[#2a2b36] rounded-[4px] text-[#A0A8DC] text-xs font-mono font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0000ee] animate-pulse" />
            Vibe · High-Voltage Modern Editorial
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-white leading-[1.05]">
            La nueva velocidad del dinero en <span className="italic font-light text-[#A0A8DC]">América Latina.</span>
          </h2>

          <p className="text-[#949494] text-base sm:text-lg max-w-2xl font-sans font-normal leading-relaxed pt-2">
            Arquitectura de precisión suiza inspirada en contrastes puros, esquinas afiladas y telemetría transaccional en tiempo real.
          </p>
        </motion.div>

        {/* PARALLAX MULTI-PLANE CARD GRID (CON FÍSICA 3D Y CURVAS SUAVES) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {showcaseCards.map((card, i) => {
            // Asignar diferente velocidad de desplazamiento según la columna
            const cardY = i === 0 ? yCardLeft : i === 1 ? yCardCenter : yCardRight;

            return (
              <motion.div
                key={card.index}
                style={{ 
                  y: cardY,
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformStyle: "preserve-3d"
                }}
                transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 0.6 }}
                className="group relative bg-[#131419] hover:bg-[#181922] border border-[#22232d] hover:border-[#0000ee] rounded-[8px] p-7 flex flex-col justify-between transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
              >
                {/* LUZ DE BORDES AZUL ELÉCTRICO */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0000ee] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[8px]" />

                <div>
                  {/* TOP HEADER DE LA TARJETA */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#949494] pb-6 border-b border-[#1f202b]">
                    <span className="text-[#0000ee] font-bold text-sm tracking-wider">{card.index}</span>
                    <span className="tracking-widest uppercase text-[11px] px-2 py-0.5 bg-[#000000] border border-[#22232d] rounded-[3px] text-[#A0A8DC]">
                      {card.tag}
                    </span>
                  </div>

                  {/* ICONO Y TÍTULO EDITORIAL */}
                  <div className="mt-6 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[6px] bg-[#0000ee]/15 border border-[#0000ee]/30 flex items-center justify-center text-[#0000ee] group-hover:bg-[#0000ee] group-hover:text-white transition-all duration-300">
                      <card.icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif text-white tracking-tight mb-3 group-hover:text-[#A0A8DC] transition-colors duration-200">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#949494] font-sans leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                {/* MÉTRICAS DE IMPACTO Y BOTÓN */}
                <div className="mt-8 pt-6 border-t border-[#1f202b]">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight">
                        {card.metric}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#949494] mt-0.5">
                        {card.metricLabel}
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate('/latam-dashboard')}
                      className="w-10 h-10 rounded-[6px] bg-[#0000ee] hover:bg-[#3333f1] text-white flex items-center justify-center transition-all duration-200 shadow-md shadow-[#0000ee]/30 cursor-pointer group-hover:scale-105"
                      title="Explorar Telemetría"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BARRA DE ACCIÓN INFERIOR (CTA MONOLÍTICO) */}
        <motion.div 
          style={{ rotateZ: rotateSubtle }}
          className="mt-20 p-8 rounded-[8px] bg-[#141414] border border-[#262733] flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-[#0000ee]/20 to-transparent pointer-events-none" />
          
          <div className="space-y-1 text-center sm:text-left z-10">
            <h4 className="text-xl font-serif text-white">¿Listo para auditar la infraestructura de pagos en LATAM?</h4>
            <p className="text-xs text-[#949494] font-sans">Accede al radar satelital, comparador de pasarelas y matching B2B en un solo clic.</p>
          </div>

          <div className="flex items-center gap-3 z-10 shrink-0">
            <button
              onClick={() => navigate('/latam-dashboard')}
              className="px-6 py-3 rounded-[6px] bg-[#0000ee] hover:bg-[#3333f1] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 shadow-lg shadow-[#0000ee]/30 cursor-pointer flex items-center gap-2"
            >
              <span>Explorar Radar</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/b2b-intros')}
              className="px-6 py-3 rounded-[6px] bg-[#1a1b22] hover:bg-[#22232d] text-[#A0A8DC] hover:text-white border border-[#2f303e] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer"
            >
              Intros B2B
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

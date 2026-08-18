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
  const yBgText = useTransform(smoothProgress, [0, 1], [-80, 140]);
  const yCardLeft = useTransform(smoothProgress, [0, 1], [60, -80]);
  const yCardRight = useTransform(smoothProgress, [0, 1], [100, -120]);
  const yCardCenter = useTransform(smoothProgress, [0, 1], [30, -40]);
  const opacityFade = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  // Interactive 3D Cursor Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), { stiffness: 150, damping: 15 });
  const tiltY = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), { stiffness: 150, damping: 15 });

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
      accent: "#0000EE",
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
      className="relative z-10 py-28 bg-[#F3F3F4] text-[#000000] overflow-hidden border-t border-[#E5E6EA]"
      style={{ perspective: 1200 }}
    >
      {/* TIPOGRAFÍA DE FONDO GIGANTE PARALLAX EN GRIS CLARO */}
      <motion.div 
        style={{ y: yBgText, opacity: 0.04 }}
        className="absolute top-10 left-0 right-0 text-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[120px] sm:text-[180px] lg:text-[230px] font-black tracking-tighter text-[#000000] uppercase whitespace-nowrap block leading-[1.05]">
          FINTECH TELEMETRY
        </span>
      </motion.div>

      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 relative z-20">
        
        {/* HEADER EDITORIAL — VIBRANT LIGHT */}
        <motion.div 
          style={{ opacity: opacityFade }}
          className="max-w-4xl mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E5E6EA] rounded-[2px] text-[#0000EE] text-xs font-mono font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0000EE]" />
            Vibe · Vibrant Modern Editorial
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-[75px] font-black tracking-tight text-[#000000] leading-[1.05]">
            La nueva velocidad del dinero en <span className="text-[#0000EE]">América Latina.</span>
          </h2>

          <p className="text-[#8B8F9A] text-lg sm:text-[24px] max-w-2xl font-normal leading-[1.15] pt-1">
            Arquitectura de precisión suiza con contrastes puros, tipografía de alta densidad y telemetría transaccional en tiempo real.
          </p>
        </motion.div>

        {/* PARALLAX MULTI-PLANE CARD GRID (TARJETAS BLANCAS CON BORDE E5E6EA Y RADIO 12PX) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {showcaseCards.map((card, i) => {
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
                transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 0.12 }}
                className="group relative bg-[#FFFFFF] hover:border-[#0000EE] border border-[#E5E6EA] rounded-[12px] p-7 flex flex-col justify-between transition-all duration-[0.12s]"
              >
                <div>
                  {/* TOP HEADER DE LA TARJETA */}
                  <div className="flex items-center justify-between text-xs font-mono pb-5 border-b border-[#E5E6EA]">
                    <span className="text-[#0000EE] font-bold text-sm tracking-wider">{card.index}</span>
                    <span className="tracking-widest uppercase text-[10px] px-2.5 py-1 bg-[#E5E6EA] rounded-[2px] text-[#000000] font-bold">
                      {card.tag}
                    </span>
                  </div>

                  {/* ICONO Y TÍTULO EDITORIAL */}
                  <div className="mt-6 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[8px] bg-[#0000EE]/10 flex items-center justify-center text-[#0000EE] group-hover:bg-[#0000EE] group-hover:text-white transition-all duration-[0.12s]">
                      <card.icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#000000] tracking-tight mb-2 group-hover:text-[#0000EE] transition-colors duration-[0.12s] leading-[1.15]">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8B8F9A] font-sans leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                {/* MÉTRICAS DE IMPACTO Y BOTÓN */}
                <div className="mt-8 pt-6 border-t border-[#E5E6EA]">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-mono font-black text-[#000000] tracking-tight leading-[1.15]">
                        {card.metric}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#8B8F9A] mt-1">
                        {card.metricLabel}
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate('/latam-dashboard')}
                      className="w-10 h-10 rounded-[12px] bg-[#0000EE] hover:bg-[#0000BE] text-white flex items-center justify-center transition-all duration-[0.12s] cursor-pointer"
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

        {/* BARRA DE ACCIÓN INFERIOR (CTA EN BLANCO CON BORDES PLANOS) */}
        <div className="mt-16 p-8 rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-2xl font-bold text-[#000000] leading-[1.15]">¿Listo para auditar la infraestructura de pagos en LATAM?</h4>
            <p className="text-xs text-[#8B8F9A] font-sans">Accede al radar de hardware SmartPOS, comparador de terminales y matching B2B en un solo clic.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/hardware-pos')}
              className="px-5 py-3 rounded-[12px] bg-[#0000EE] hover:bg-[#0000BE] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-[0.12s] cursor-pointer flex items-center gap-2"
            >
              <span>SmartPOS Radar</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/latam-dashboard')}
              className="px-5 py-3 rounded-[12px] bg-[#F3F3F4] hover:bg-[#E5E6EA] text-[#000000] border border-[#E5E6EA] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-[0.12s] cursor-pointer flex items-center gap-2"
            >
              <span>Radar Latam</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/b2b-intros')}
              className="px-5 py-3 rounded-[12px] bg-[#F3F3F4] hover:bg-[#E5E6EA] text-[#000000] border border-[#E5E6EA] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-[0.12s] cursor-pointer"
            >
              Intros B2B
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

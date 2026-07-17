import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Landmark, Server, Zap, Building2, ArrowRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EcosystemFlows() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      id: "01",
      title: "EL ORIGEN",
      desc: "Todo comienza cuando un cliente inicia una compra. Ya sea ingresando una tarjeta de crédito o escaneando un código SPEI, los datos se encriptan al instante bajo estándares internacionales (PCI-DSS).",
      icon: User,
      color: "text-blue-500",
      flow: [
        { label: "Comprador", icon: User }
      ]
    },
    {
      id: "02",
      title: "LA PASARELA",
      desc: "El comercio no procesa la tarjeta directamente. Utiliza un Gateway o Pasarela (ej. Stripe, Mercado Pago) que orquesta la transacción, aplica reglas antifraude y tokeniza el PAN de la tarjeta para máxima seguridad.",
      icon: Server,
      color: "text-slate-400",
      flow: [
        { label: "Comprador", icon: User },
        { label: "Gateway", icon: Server, highlight: true }
      ]
    },
    {
      id: "03",
      title: "EL ADQUIRENTE",
      desc: "La pasarela envía la transacción enrutada al Banco Adquirente del comercio. Este es el responsable de solicitar los fondos a la red. Aquí se genera la famosa 'Tasa de Descuento'.",
      icon: Landmark,
      color: "text-indigo-400",
      flow: [
        { label: "Gateway", icon: Server },
        { label: "Adquirente", icon: Landmark, highlight: true }
      ]
    },
    {
      id: "04",
      title: "EL SWITCH / RED",
      desc: "Visa, Mastercard, o cámaras de compensación locales (como Prosa o e-Global) validan la ruta de la transacción y conectan el banco del comercio con el banco del comprador en milisegundos.",
      icon: Zap,
      color: "text-amber-500",
      flow: [
        { label: "Adquirente", icon: Landmark },
        { label: "Red / Switch", icon: Zap, highlight: true }
      ]
    },
    {
      id: "05",
      title: "EL EMISOR",
      desc: "Finalmente, el banco que emitió la tarjeta del comprador recibe la petición. Verifica saldo, reglas de riesgo y responde: APROBADA o RECHAZADA. El dinero inicia su camino de regreso confirmando la venta.",
      icon: Building2,
      color: "text-emerald-500",
      flow: [
        { label: "Red / Switch", icon: Zap },
        { label: "Emisor", icon: Building2, highlight: true }
      ]
    }
  ];

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % steps.length);
    }, 4500);
    
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <section className="relative w-full max-w-[1200px] mx-auto px-6 py-24 bg-background">
      
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">La Anatomía del Pago</h2>
        <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
          Descubre qué pasa exactamente en los <strong className="text-foreground">2 segundos</strong> que tarda en procesarse una transacción en América Latina.
        </p>
      </div>

      {/* Caja Negra Principal */}
      <div className="w-full bg-[#0a0a0c] rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="p-8 md:p-12 relative z-10 flex flex-col min-h-[600px]">
          
          {/* Navegación de Pasos */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-12">
            <div className="flex flex-wrap items-center gap-2 md:gap-6">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`flex items-center gap-3 text-sm font-mono tracking-widest transition-all duration-300 ${
                    activeIndex === idx 
                      ? 'text-primary' 
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    activeIndex === idx 
                      ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]' 
                      : 'bg-white/5 border-white/10'
                  }`}>
                    {step.id}
                  </span>
                  <span className="hidden md:block uppercase font-bold">{step.title}</span>
                </button>
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white/50 hover:text-white hover:bg-white/10 rounded-full"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>

          {/* Área de Visualización (El Dibujo) */}
          <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                className="flex items-center justify-center gap-4 md:gap-12 w-full max-w-3xl"
              >
                {steps[activeIndex].flow.map((node, idx, arr) => (
                  <React.Fragment key={idx}>
                    
                    {/* Nodo */}
                    <div className={`flex flex-col items-center justify-center gap-4 w-28 h-28 md:w-40 md:h-40 rounded-2xl md:rounded-3xl border backdrop-blur-md transition-all duration-500 relative ${
                      node.highlight 
                        ? 'bg-primary/20 border-primary/50 shadow-[0_0_40px_rgba(var(--primary),0.2)]' 
                        : 'bg-white/5 border-white/10'
                    }`}>
                      {node.highlight && (
                        <div className="absolute inset-0 rounded-3xl bg-primary/20 animate-ping opacity-20" />
                      )}
                      <node.icon className={`w-10 h-10 md:w-16 md:h-16 ${node.highlight ? 'text-primary' : 'text-white/50'}`} strokeWidth={1.5} />
                      <span className={`text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-center px-2 ${node.highlight ? 'text-primary' : 'text-white/50'}`}>
                        {node.label}
                      </span>
                    </div>

                    {/* Conector */}
                    {idx < arr.length - 1 && (
                      <div className="flex-1 h-[2px] bg-white/10 relative min-w-[40px]">
                         <motion.div 
                           initial={{ left: "0%" }}
                           animate={{ left: "100%" }}
                           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                           className="absolute top-1/2 w-4 h-4 md:w-8 md:h-[2px] -translate-y-1/2 bg-primary rounded-full md:rounded-none shadow-[0_0_10px_rgba(var(--primary),0.8)]" 
                         />
                         <ArrowRight className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 text-white/30 translate-x-full" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Área de Texto y Protocolos */}
          <div className="mt-auto pt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${activeIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-xl"
              >
                <h3 className="text-2xl font-bold font-mono text-white mb-3">
                  {steps[activeIndex].id} / {steps[activeIndex].title}
                </h3>
                <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">
                  {steps[activeIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`metrics-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-4 bg-black/50 border border-white/10 rounded-xl p-4 shrink-0"
              >
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono mb-1">Protocolo</span>
                  <span className="font-mono text-xs md:text-sm text-white font-bold">ISO 8583 / REST API</span>
                </div>
                <div className="w-px h-8 bg-white/10 mx-2" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono mb-1">Latencia Est.</span>
                  <span className="font-mono text-xs md:text-sm font-bold text-[#00f0ff]">~120ms</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

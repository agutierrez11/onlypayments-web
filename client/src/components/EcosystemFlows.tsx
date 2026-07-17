import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { User, Store, Landmark, CreditCard, Building2, Server, Zap, Coins, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function EcosystemFlows() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = [
    {
      title: "01 / EL ORIGEN",
      desc: "Todo comienza cuando un cliente inicia una compra. Ya sea ingresando una tarjeta de crédito en Santiago o escaneando un código SPEI en CDMX, los datos se encriptan al instante bajo estándares internacionales.",
      icon: User,
      color: "text-blue-500",
      flow: [
        { label: "Comprador", icon: User }
      ]
    },
    {
      title: "02 / LA PASARELA",
      desc: "El comercio no procesa la tarjeta directamente. Utiliza un Gateway o Pasarela (ej. Stripe, Mercado Pago) que orquesta la transacción, aplica reglas antifraude y tokeniza el PAN de la tarjeta.",
      icon: Server,
      color: "text-slate-400",
      flow: [
        { label: "Comprador", icon: User },
        { label: "Gateway", icon: Server, highlight: true }
      ]
    },
    {
      title: "03 / EL ADQUIRENTE",
      desc: "La pasarela envía la transacción al Banco Adquirente del comercio. Este es el responsable de solicitar los fondos a la red. Aquí se genera la famosa 'Tasa de Descuento'.",
      icon: Landmark,
      color: "text-indigo-400",
      flow: [
        { label: "Gateway", icon: Server },
        { label: "Adquirente", icon: Landmark, highlight: true }
      ]
    },
    {
      title: "04 / SWITCH LOCAL O GLOBAL",
      desc: "Dependiendo del país, la transacción viaja por la red de Visa/MC (4 partes global) o por un Switch Local como Prosa/E-Global en México para ser compensada.",
      icon: Zap,
      color: "text-amber-500",
      flow: [
        { label: "Adquirente", icon: Landmark },
        { label: "Red / Switch", icon: Zap, highlight: true }
      ]
    },
    {
      title: "05 / EL EMISOR",
      desc: "Finalmente, el banco que emitió la tarjeta del comprador recibe la petición. Verifica saldo, reglas de riesgo y responde: APROBADA o RECHAZADA. El dinero inicia su camino de regreso.",
      icon: Building2,
      color: "text-emerald-500",
      flow: [
        { label: "Red / Switch", icon: Zap },
        { label: "Emisor", icon: Building2, highlight: true }
      ]
    }
  ];

  useGSAP(() => {
    // Pin la columna derecha
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: rightColRef.current,
      pinSpacing: false
    });

    // Actualizar activeIndex basado en el scroll de la columna izquierda
    const textBlocks = gsap.utils.toArray(".text-block") as HTMLElement[];
    textBlocks.forEach((block, i) => {
      ScrollTrigger.create({
        trigger: block,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i)
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full max-w-[1400px] mx-auto px-6 bg-background pt-20">
      <div className="flex flex-col md:flex-row relative">
        
        {/* Columna Izquierda (Scroll) */}
        <div ref={leftColRef} className="w-full md:w-1/2 md:pr-16 pb-[50vh]">
          <div className="mb-32">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">La Anatomía del Pago</h2>
            <p className="text-muted-foreground font-light text-lg">
              Descubre qué pasa exactamente en los 2 segundos que tarda en procesarse una transacción en América Latina.
            </p>
          </div>

          <div className="space-y-[60vh]">
            {steps.map((step, i) => (
              <div key={i} className="text-block min-h-[40vh] flex flex-col justify-center">
                <h3 className={`text-2xl font-bold font-mono tracking-tight mb-6 transition-colors duration-500 ${activeIndex === i ? 'text-primary' : 'text-muted-foreground'}`}>
                  {step.title}
                </h3>
                <p className={`text-lg leading-relaxed font-light transition-opacity duration-500 ${activeIndex === i ? 'opacity-100' : 'opacity-40'}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha (Fija / Sticky Lienzo Técnico) */}
        <div className="hidden md:block w-1/2 relative">
          <div ref={rightColRef} className="h-screen w-full flex items-center justify-center p-8 absolute top-0">
            
            <div className="w-full h-[600px] rounded-3xl border border-white/10 bg-[#0f1115] shadow-2xl relative overflow-hidden flex items-center justify-center">
              
              {/* Background Grid del Lienzo */}
              <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:30px_30px]" />
              
              {/* Contenido Visual Dinámico */}
              <div className="z-10 w-full px-12">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="flex items-center justify-center gap-8 w-full"
                >
                  {steps[activeIndex].flow.map((node, idx, arr) => (
                    <React.Fragment key={idx}>
                      
                      <div className={`flex flex-col items-center justify-center gap-4 w-32 h-32 rounded-2xl border backdrop-blur-md transition-all duration-500 ${node.highlight ? 'bg-primary/20 border-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.3)]' : 'bg-white/5 border-white/10'}`}>
                        <node.icon className={`w-12 h-12 ${node.highlight ? 'text-primary' : 'text-white/50'}`} strokeWidth={1.5} />
                        <span className={`text-[11px] font-mono font-bold uppercase tracking-widest ${node.highlight ? 'text-primary' : 'text-white/50'}`}>
                          {node.label}
                        </span>
                      </div>

                      {idx < arr.length - 1 && (
                        <div className="flex-1 h-px bg-white/20 relative">
                           <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                           <ArrowRight className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 text-primary" />
                        </div>
                      )}

                    </React.Fragment>
                  ))}
                </motion.div>
                
                {/* Metadatos técnicos debajo */}
                <motion.div 
                  key={`meta-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-16 text-center"
                >
                  <div className="inline-flex gap-4 p-3 rounded-xl bg-black/50 border border-white/10">
                     <div className="text-left">
                       <div className="text-[9px] text-white/40 font-mono uppercase tracking-widest">Protocolo</div>
                       <div className="text-xs text-white/80 font-mono">ISO 8583 / REST API</div>
                     </div>
                     <div className="w-px h-8 bg-white/10" />
                     <div className="text-left">
                       <div className="text-[9px] text-white/40 font-mono uppercase tracking-widest">Latencia Est.</div>
                       <div className="text-xs text-emerald-400 font-mono">~120ms</div>
                     </div>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap, User, Store, Landmark, CreditCard, Building2, Coins, ArrowRight, Server, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ECOSYSTEM_ACTORS } from "../data";

export function EcosystemFlows() {
  const [activeFlowModel, setActiveFlowModel] = useState<'4partes' | 'mexico' | '3partes'>('mexico');
  const [selectedActorId, setSelectedActorId] = useState<string | null>(null);
  
  const actorsScrollRef = useRef<HTMLDivElement>(null);
  const flowsScrollRef = useRef<HTMLDivElement>(null);

  const scrollActors = (direction: 'left' | 'right') => {
    if (actorsScrollRef.current) {
      const scrollAmount = 400;
      actorsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollFlows = (direction: 'left' | 'right') => {
    if (flowsScrollRef.current) {
      const scrollAmount = 300;
      flowsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-16 max-w-[1400px] mx-auto px-6">
      
      {/* Selector de Modelos y Visualización del Diagrama */}
      <div className="space-y-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl border border-border bg-card/30 backdrop-blur shadow-sm gap-4">
          <div>
            <h4 className="text-sm font-bold">Esquemas de Procesamiento B2B</h4>
            <p className="text-xs text-muted-foreground font-light">Compara cómo viaja el dinero según el modelo regulatorio local.</p>
          </div>
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-secondary/30 border border-border">
            <button 
              onClick={() => setActiveFlowModel('4partes')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeFlowModel === '4partes' ? 'bg-primary text-primary-foreground shadow-md scale-105' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
            >
              4 Partes (Global)
            </button>
            <button 
              onClick={() => setActiveFlowModel('mexico')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeFlowModel === 'mexico' ? 'bg-primary text-primary-foreground shadow-md scale-105' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
            >
              Flujo México (Switches locales)
            </button>
            <button 
              onClick={() => setActiveFlowModel('3partes')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeFlowModel === '3partes' ? 'bg-primary text-primary-foreground shadow-md scale-105' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
            >
              3 Partes (Cerrados)
            </button>
          </div>
        </div>

        <Card className="p-8 md:p-12 border-border bg-background/50 backdrop-blur-xl shadow-2xl rounded-3xl relative group/flows overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-primary/10 blur-[80px] pointer-events-none rounded-full" />
          
          <button 
            onClick={() => scrollFlows('left')} 
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-background/80 backdrop-blur border border-border shadow-lg text-foreground opacity-100 md:opacity-0 md:group-hover/flows:opacity-100 transition-all hover:scale-110 hover:bg-background"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div ref={flowsScrollRef} className="overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <AnimatePresence mode="wait">
              {activeFlowModel === '4partes' && (
                <motion.div 
                  key="4partes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 min-w-max"
                >
                  <h5 className="text-sm font-bold text-accent uppercase font-mono tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Modelo de 4 Partes (Global)
                  </h5>
                  <div className="flex items-end justify-center gap-2 py-10 w-full overflow-x-auto min-w-max pb-12">
                    {[
                      { title: "Tarjetahabiente", icon: User, color: "text-blue-500", highlight: false },
                      { title: "Comercio", icon: Store, color: "text-indigo-400", highlight: false },
                      { title: "Adquirente", icon: Landmark, color: "text-indigo-500", highlight: false },
                      { title: "Red de tarjetas", icon: CreditCard, color: "text-blue-600", highlight: true },
                      { title: "Banco emisor", icon: Building2, color: "text-blue-700", highlight: false }
                    ].map((step, idx, arr) => (
                      <React.Fragment key={idx}>
                        {/* Actor Node */}
                        <motion.div 
                          whileHover={{ scale: 1.1, y: -5 }}
                          className={`flex flex-col items-center justify-end w-32 shrink-0 ${step.highlight ? 'drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]' : ''}`}
                        >
                          <div className={`p-4 rounded-2xl mb-4 ${step.highlight ? 'bg-primary/10' : 'bg-transparent'}`}>
                            <step.icon className={`w-16 h-16 ${step.color} drop-shadow-md`} strokeWidth={1.5} />
                          </div>
                          <span className={`text-sm font-bold text-center ${step.highlight ? 'text-primary' : 'text-foreground/80'}`}>
                            {step.title}
                          </span>
                        </motion.div>

                        {/* Connector Arrow */}
                        {idx < arr.length - 1 && (
                          <div className="flex flex-col items-center justify-end h-full pb-8 shrink-0 px-2 md:px-4">
                            <div className="w-8 h-8 rounded-full bg-secondary/80 border border-border flex items-center justify-center text-xs font-bold text-foreground shadow-sm mb-2">
                              {idx + 1}
                            </div>
                            <ArrowRight className="w-8 h-8 text-muted-foreground/50" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-4xl pt-4">
                    * El adquirente cobra una <strong className="text-foreground">tasa de descuento</strong> al comercio, y le paga una <strong className="text-foreground">tasa de intercambio</strong> al banco emisor. La marca de tarjeta actúa como la autopista que unifica la comunicación a nivel internacional.
                  </p>
                </motion.div>
              )}

              {activeFlowModel === 'mexico' && (
                <motion.div 
                  key="mexico"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 min-w-max"
                >
                  <h5 className="text-sm font-bold text-accent uppercase font-mono tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Flujo México (Cámaras de Compensación Domésticas)
                  </h5>
                  <div className="flex items-end justify-center gap-2 py-10 w-full overflow-x-auto min-w-max pb-12">
                    {[
                      { title: "Comprador", icon: User, color: "text-blue-500", highlight: false },
                      { title: "Gateway", icon: Server, color: "text-slate-500", highlight: false },
                      { title: "Adquirente", icon: Landmark, color: "text-indigo-500", highlight: false },
                      { title: "Switch Local", icon: Zap, color: "text-amber-500", highlight: true },
                      { title: "Emisor", icon: Building2, color: "text-blue-700", highlight: false },
                      { title: "SPEI (A2A)", icon: Coins, color: "text-green-500", highlight: false }
                    ].map((step, idx, arr) => (
                      <React.Fragment key={idx}>
                        {/* Actor Node */}
                        <motion.div 
                          whileHover={{ scale: 1.1, y: -5 }}
                          className={`flex flex-col items-center justify-end w-28 md:w-32 shrink-0 ${step.highlight ? 'drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]' : ''}`}
                        >
                          <div className={`p-4 rounded-2xl mb-4 ${step.highlight ? 'bg-accent/10' : 'bg-transparent'}`}>
                            <step.icon className={`w-14 h-14 md:w-16 md:h-16 ${step.color} drop-shadow-md`} strokeWidth={1.5} />
                          </div>
                          <span className={`text-sm font-bold text-center ${step.highlight ? 'text-accent' : 'text-foreground/80'}`}>
                            {step.title}
                          </span>
                        </motion.div>

                        {/* Connector Arrow */}
                        {idx < arr.length - 1 && (
                          <div className="flex flex-col items-center justify-end h-full pb-8 shrink-0 px-1 md:px-2">
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary/80 border border-border flex items-center justify-center text-[10px] md:text-xs font-bold text-foreground shadow-sm mb-2">
                              {idx + 1}
                            </div>
                            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground/50" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-4xl pt-4">
                    <strong>Particularidad de México:</strong> Si las tarjetas son emitidas y adquiridas localmente en México, la transacción no viaja por las redes globales de Visa/MC, sino que se enruta de forma doméstica a través de los switches locales <strong className="text-foreground">Prosa</strong> y <strong className="text-foreground">E-Global</strong> para su compensación.
                  </p>
                </motion.div>
              )}

              {activeFlowModel === '3partes' && (
                <motion.div 
                  key="3partes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 min-w-max"
                >
                  <h5 className="text-sm font-bold text-accent uppercase font-mono tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Modelo de 3 Partes (Bucle Cerrado)
                  </h5>
                  <div className="flex items-end justify-center gap-2 py-10 w-full overflow-x-auto min-w-max pb-12">
                    {[
                      { title: "Cliente", icon: User, color: "text-blue-500", highlight: false },
                      { title: "Banco emisor", icon: Building2, color: "text-indigo-500", highlight: false },
                      { title: "Transbank", icon: ShieldCheck, color: "text-purple-600", highlight: true },
                      { title: "Comercio", icon: Store, color: "text-indigo-400", highlight: false }
                    ].map((step, idx, arr) => (
                      <React.Fragment key={idx}>
                        {/* Actor Node */}
                        <motion.div 
                          whileHover={{ scale: 1.1, y: -5 }}
                          className={`flex flex-col items-center justify-end w-40 shrink-0 ${step.highlight ? 'drop-shadow-[0_0_15px_rgba(147,51,234,0.4)]' : ''}`}
                        >
                          <div className={`p-4 rounded-2xl mb-4 ${step.highlight ? 'bg-primary/10' : 'bg-transparent'}`}>
                            <step.icon className={`w-16 h-16 ${step.color} drop-shadow-md`} strokeWidth={1.5} />
                          </div>
                          <span className={`text-sm font-bold text-center ${step.highlight ? 'text-primary' : 'text-foreground/80'}`}>
                            {step.title}
                          </span>
                        </motion.div>

                        {/* Connector Arrow */}
                        {idx < arr.length - 1 && (
                          <div className="flex flex-col items-center justify-end h-full pb-8 shrink-0 px-4 md:px-8">
                            <div className="w-8 h-8 rounded-full bg-secondary/80 border border-border flex items-center justify-center text-xs font-bold text-foreground shadow-sm mb-2">
                              {idx + 1}
                            </div>
                            <ArrowRight className="w-8 h-8 text-muted-foreground/50" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-4xl pt-4">
                    * El esquema de bucle cerrado o de 3 partes significa que una sola empresa actúa como el emisor de la tarjeta, la red de procesamiento y el adquirente de los comercios (históricamente American Express).
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => scrollFlows('right')} 
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-background/80 backdrop-blur border border-border shadow-lg text-foreground opacity-100 md:opacity-0 md:group-hover/flows:opacity-100 transition-all hover:scale-110 hover:bg-background"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </Card>
      </div>

      {/* Actores Clave (Horizontal Scroll) */}
      <div className="space-y-8 pt-12">
        <h4 className="text-3xl font-extrabold tracking-tight text-center">Los {ECOSYSTEM_ACTORS.length} Actores Clave de la Cadena</h4>
        
        <div className="relative group/actors flex items-center -mx-6 px-6 md:mx-0 md:px-0">
          
          <button 
            onClick={() => scrollActors('left')} 
            className="absolute -left-4 z-30 p-3 rounded-full bg-background/90 backdrop-blur border border-border shadow-xl text-foreground opacity-100 md:opacity-0 md:group-hover/actors:opacity-100 transition-all hover:scale-110 hover:bg-background"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div 
            ref={actorsScrollRef} 
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-8 w-full no-scrollbar px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {ECOSYSTEM_ACTORS.map((actor, idx) => {
              const isSelected = selectedActorId === actor.id;
              return (
                <motion.button
                  key={actor.id}
                  onClick={() => setSelectedActorId(actor.id)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={`relative flex-shrink-0 snap-center w-[300px] h-[350px] p-8 rounded-3xl border text-left flex flex-col transition-all group overflow-hidden ${
                    isSelected
                      ? 'bg-primary/5 border-primary shadow-xl shadow-primary/10'
                      : 'bg-background hover:bg-secondary/20 border-border/60 shadow-lg'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'group-hover:opacity-100'}`} />
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-bold uppercase tracking-widest self-start mb-4">
                      {actor.role}
                    </span>
                    <h5 className="font-extrabold text-2xl tracking-tight leading-tight mb-4">{actor.title}</h5>
                    <p className={`text-sm font-light leading-relaxed flex-1 ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {actor.description}
                    </p>
                  </div>
                  
                  <div className="relative z-10 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center font-bold text-muted-foreground mt-4">
                    {idx + 1}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <button 
            onClick={() => scrollActors('right')} 
            className="absolute -right-4 z-30 p-3 rounded-full bg-background/90 backdrop-blur border border-border shadow-xl text-foreground opacity-100 md:opacity-0 md:group-hover/actors:opacity-100 transition-all hover:scale-110 hover:bg-background"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Crédito */}
        <div className="flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur max-w-3xl mx-auto">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent font-extrabold shadow-inner">FE</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Diagrama y contenidos basados en el{" "}
            <strong className="text-foreground">Diccionario de Medios de Pago v6.0 (2026)</strong>{" "}
            · Colaboración de{" "}
            <a
              href="https://www.linkedin.com/in/fernando-estevez-vazquez/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-bold hover:underline"
            >
              Fernando Estévez Vázquez ↗
            </a>
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}

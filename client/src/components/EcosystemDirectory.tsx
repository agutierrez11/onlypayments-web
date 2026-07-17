import React, { useRef, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { COUNTRIES, PAYMENT_METHODS, Country } from "../data";

export function EcosystemDirectory({
  selectedCountryKey,
  setSelectedCountryKey,
  suggestContribution,
}: {
  selectedCountryKey: string;
  setSelectedCountryKey: (key: string) => void;
  suggestContribution: (type: 'payment' | 'concept') => void;
}) {
  const selectedCountry = useMemo(() => COUNTRIES[selectedCountryKey] || COUNTRIES.MX, [selectedCountryKey]);
  const selectedCountryMethods = useMemo(() => PAYMENT_METHODS[selectedCountryKey] || [], [selectedCountryKey]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % selectedCountryMethods.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + selectedCountryMethods.length) % selectedCountryMethods.length);
  };

  return (
    <section className="relative py-32 bg-background overflow-hidden" id="explorador">
      {/* Luces de fondo */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      
      <div className="flex flex-col xl:flex-row w-full max-w-[1400px] mx-auto px-6 lg:px-12 items-center xl:items-start gap-16">
        
        {/* Intro Text & Country Selection */}
        <div className="w-full xl:w-1/3 flex flex-col z-20 xl:sticky xl:top-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-md border border-border/50">
               <Globe className="w-4 h-4 text-primary" />
               <span className="text-xs font-semibold tracking-wide uppercase text-foreground font-mono">Radar Global</span>
            </div>
            
            <h2 className="text-5xl font-extrabold tracking-tight">Marketplace 3D</h2>
            <p className="text-muted-foreground font-light text-xl leading-relaxed">
              Explora los métodos de pago líderes por región en una vista de ingeniería.
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {Object.keys(COUNTRIES).map(key => {
                const country = COUNTRIES[key];
                const isSelected = selectedCountryKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCountryKey(key);
                      setActiveIndex(0);
                    }}
                    className={`px-5 py-3 rounded-xl border text-sm font-semibold flex items-center gap-3 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] scale-105' 
                        : 'bg-background hover:bg-secondary/40 border-border/60 text-foreground'
                    }`}
                  >
                    <span className="text-2xl drop-shadow-sm">{country.flag}</span>
                    {country.name}
                  </button>
                );
              })}
            </div>
            
            <div className="pt-8 border-t border-white/5 mt-8">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl space-y-4">
                 <div>
                   <h3 className="text-2xl font-bold text-white">{selectedCountry.name}</h3>
                   <span className="text-xs text-white/50 font-mono uppercase tracking-widest mt-1 block">Moneda: {selectedCountry.currency}</span>
                 </div>
                 <p className="text-sm text-white/70 leading-relaxed font-light">{selectedCountry.description}</p>
                 
                 <div className="grid grid-cols-2 gap-4 pt-2">
                   <div className="space-y-1">
                     <span className="text-[10px] text-primary uppercase font-bold font-mono tracking-wider block">MRR Fintech</span>
                     <p className="text-xl font-extrabold text-white">{selectedCountry.mrr}</p>
                   </div>
                   <div className="space-y-1">
                     <span className="text-[10px] text-accent uppercase font-bold font-mono tracking-wider block">Crecimiento</span>
                     <p className="text-xl font-extrabold text-white">{selectedCountry.growth}</p>
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3D Cascading Carousel */}
        <div className="w-full xl:w-2/3 relative h-[600px] flex items-center justify-center perspective-[2000px]">
          
          {selectedCountryMethods.length > 0 ? (
            <div className="relative w-full max-w-[500px] h-full transform-style-3d">
              <AnimatePresence mode="popLayout">
                {selectedCountryMethods.map((method, idx) => {
                  // Calcular la distancia relativa al índice activo
                  let distance = idx - activeIndex;
                  // Manejar el wrap-around para hacerlo infinito visualmente
                  if (distance > selectedCountryMethods.length / 2) distance -= selectedCountryMethods.length;
                  if (distance < -selectedCountryMethods.length / 2) distance += selectedCountryMethods.length;

                  // Solo renderizamos las tarjetas que están "cerca" para optimizar
                  if (Math.abs(distance) > 2) return null;

                  const isCenter = distance === 0;
                  const xOffset = distance * 120;
                  const zOffset = -Math.abs(distance) * 150;
                  const rotateY = distance * -15;
                  const opacity = 1 - Math.abs(distance) * 0.3;
                  const zIndex = 10 - Math.abs(distance);

                  return (
                    <motion.div
                      key={`${selectedCountryKey}-${idx}`}
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ 
                        opacity, 
                        x: xOffset,
                        z: zOffset,
                        rotateY,
                        scale: isCenter ? 1 : 0.9,
                        zIndex
                      }}
                      exit={{ opacity: 0, scale: 0.8, y: -50 }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[450px]"
                    >
                      <Card className={`w-full h-full p-8 rounded-3xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                        isCenter 
                          ? 'border-primary/50 bg-[#0a0a0f]/90 shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_30px_rgba(var(--primary),0.2)]' 
                          : 'border-white/10 bg-[#0a0a0f]/50 shadow-xl pointer-events-none'
                      }`}>
                        
                        <div className="relative z-10 space-y-6">
                          <div className="flex items-center justify-between">
                            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-5xl shadow-inner border border-white/10">
                              {method.logo}
                            </div>
                            <span className="text-[10px] font-mono px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold tracking-widest uppercase border border-primary/30">
                              {method.type}
                            </span>
                          </div>
                          
                          <div>
                            <h5 className="font-extrabold text-4xl mb-3 tracking-tight text-white">{method.name}</h5>
                            <p className="text-base text-white/60 leading-relaxed font-light line-clamp-3">{method.description}</p>
                          </div>
                        </div>

                        <div className="relative z-10 p-6 rounded-2xl bg-black/40 border border-white/5 grid grid-cols-2 gap-6 mt-auto">
                          <div>
                            <span className="text-[10px] text-white/40 block uppercase font-mono font-bold tracking-wider mb-2">Liquidación</span>
                            <span className="font-bold text-white text-lg">{method.settlement}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-white/40 block uppercase font-mono font-bold tracking-wider mb-2">Comisión Avg.</span>
                            <span className="font-bold text-accent text-lg">{method.fee}</span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Controles del Carousel */}
              {selectedCountryMethods.length > 1 && (
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
                  <button 
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all backdrop-blur-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="text-xs font-mono text-white/50 tracking-widest">
                    {activeIndex + 1} / {selectedCountryMethods.length}
                  </div>
                  <button 
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all backdrop-blur-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full max-w-[500px] h-[450px] flex items-center justify-center">
              <Card className="w-full h-full p-8 border-dashed border-2 border-white/10 bg-white/5 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl backdrop-blur-md">
                <span className="text-6xl opacity-50 mb-4">🏜️</span>
                <p className="text-xl font-bold text-white">Infraestructura en Mapeo</p>
                <p className="text-sm text-white/50 max-w-[250px]">Nuestros agentes están analizando los datos regulatorios para este país.</p>
              </Card>
            </div>
          )}

        </div>
      </div>

      {/* Fuentes Oficiales */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 mt-32">
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/30 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span>Fuentes de Datos Oficiales</span>
            <span className="w-8 h-[1px] bg-white/10 mx-2" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <span className="hover:text-white/70 transition-colors">Carlos Javier Guel (Hey Banco)</span>
            <span className="hover:text-white/70 transition-colors">Asociación Fintech Guatemala</span>
            <span className="hover:text-white/70 transition-colors">LatamFintech Hub</span>
            <span className="hover:text-white/70 transition-colors">Utila</span>
          </div>
        </div>
      </div>
    </section>
  );
}

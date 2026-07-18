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
          </div>

          <div className="grid grid-cols-2 gap-3">
            {countryKeys.map((key) => {
              const country = COUNTRIES[key];
              const isSelected = key === selectedCountryKey;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCountryKey(key)}
                  className={`
                    relative p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 text-left overflow-hidden group
                    ${isSelected 
                      ? "bg-white/10 border-white/20 shadow-[0_0_30px_rgba(var(--primary),0.15)]" 
                      : "bg-transparent border-transparent hover:bg-white/5"}
                    border
                  `}
                >
                  {isSelected && (
                    <motion.div 
                      layoutId="activeCountryIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="text-3xl relative z-10 filter drop-shadow-md group-hover:scale-110 transition-transform">{country.flag}</span>
                  <div className="relative z-10">
                    <span className={`block font-bold text-lg tracking-tight ${isSelected ? "text-white" : "text-white/60"}`}>
                      {country.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCountryKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <h4 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-2">Panorama</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                {selectedCountryData.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Bento Grid of Methods */}
        <div className="w-full lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCountryKey}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.4, staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {selectedCountryMethods.length > 0 ? (
                selectedCountryMethods.map((method, idx) => (
                  <motion.div
                    key={method.id || method.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative"
                  >
                    <Card className="h-full p-6 lg:p-8 bg-[#0d0f12]/80 border-white/5 hover:border-white/20 transition-all duration-300 rounded-3xl overflow-hidden backdrop-blur-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative z-10 flex flex-col h-full space-y-6">
                        <div className="flex items-start justify-between">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                            {method.logo}
                          </div>
                          <span className="text-[9px] font-mono px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10 uppercase tracking-widest">
                            {method.type}
                          </span>
                        </div>
                        
                        <div className="flex-grow">
                          <h5 className="font-extrabold text-2xl mb-2 tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                            {method.name}
                          </h5>
                          <p className="text-sm text-white/50 leading-relaxed font-light line-clamp-3">
                            {method.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                          <div>
                            <span className="text-[10px] text-white/30 uppercase font-mono font-bold tracking-widest block mb-1">Liquidación</span>
                            <span className="font-bold text-white text-sm">{method.settlement}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-white/30 uppercase font-mono font-bold tracking-widest block mb-1">Comisión Avg</span>
                            <span className="font-bold text-primary text-sm">{method.fee}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full h-[400px] flex items-center justify-center">
                  <Card className="w-full max-w-sm p-12 border-dashed border-2 border-white/10 bg-white/5 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl backdrop-blur-md">
                    <span className="text-6xl opacity-50 mb-4">🏜️</span>
                    <p className="text-xl font-bold text-white">Infraestructura en Mapeo</p>
                    <p className="text-sm text-white/50">Nuestros agentes están analizando los datos regulatorios para este país.</p>
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

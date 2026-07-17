import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
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

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 480; // approximate card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-24 bg-background overflow-hidden" id="explorador">
      <div className="flex flex-col xl:flex-row gap-12 w-full max-w-[1600px] mx-auto px-6 lg:px-12 items-center xl:items-stretch">
        
        {/* Intro Text & Country Selection */}
        <div className="w-full xl:w-1/3 min-w-[300px] xl:min-w-[400px] flex flex-col justify-center z-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Added pt-12 to ensure title is not cut off by navbar */}
            <h2 className="text-4xl font-extrabold tracking-tight pt-12 xl:pt-0">Ecosistema Global</h2>
            <p className="text-muted-foreground font-light text-lg">
              Selecciona un país para analizar sus rieles y regulaciones de forma dinámica.
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {Object.keys(COUNTRIES).map(key => {
                const country = COUNTRIES[key];
                const isSelected = selectedCountryKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCountryKey(key)}
                    className={`px-4 py-2.5 rounded-full border text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-foreground text-background border-foreground shadow-xl scale-105' 
                        : 'bg-secondary/40 hover:bg-secondary/80 border-border text-foreground'
                    }`}
                  >
                    <span className="text-xl">{country.flag}</span>
                    {country.name}
                  </button>
                );
              })}
            </div>
            
            <div className="pt-8 border-t border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{selectedCountry.name}</h3>
                  <span className="text-xs text-muted-foreground font-mono uppercase">Moneda: {selectedCountry.currency}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed font-light">{selectedCountry.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 backdrop-blur-sm">
                  <span className="text-[10px] text-primary uppercase font-bold font-mono tracking-wider block mb-1">MRR Fintech</span>
                  <p className="text-xl font-extrabold text-foreground">{selectedCountry.mrr}</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 backdrop-blur-sm">
                  <span className="text-[10px] text-accent uppercase font-bold font-mono tracking-wider block mb-1">Crecimiento</span>
                  <p className="text-xl font-extrabold text-foreground">{selectedCountry.growth}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Scroll Area for APMs with Arrows */}
        <div className="w-full xl:w-2/3 relative flex items-center group/carousel mt-12 xl:mt-0">
          
          <button 
            onClick={() => scroll('left')} 
            className="absolute -left-4 xl:left-4 z-30 p-3 rounded-full bg-background/80 backdrop-blur border border-border shadow-lg text-foreground opacity-100 xl:opacity-0 xl:group-hover/carousel:opacity-100 transition-all hover:scale-110 hover:bg-background disabled:opacity-30"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div 
            ref={scrollContainerRef} 
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory py-10 px-4 xl:px-20 w-full no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {selectedCountryMethods.length > 0 ? (
              selectedCountryMethods.map((method, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-[380px] md:w-[450px] h-[500px] flex-shrink-0 snap-center"
                >
                  <Card className="w-full h-full p-8 rounded-3xl border-border/50 bg-background/40 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden relative group">
                    {/* Glowing background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="w-16 h-16 rounded-2xl bg-secondary/80 flex items-center justify-center text-4xl shadow-inner border border-white/5">
                          {method.logo}
                        </div>
                        <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-foreground text-background font-bold tracking-widest uppercase">
                          {method.type}
                        </span>
                      </div>
                      
                      <div>
                        <h5 className="font-extrabold text-3xl mb-2 tracking-tight">{method.name}</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed font-light">{method.description}</p>
                      </div>
                    </div>

                    <div className="relative z-10 p-5 rounded-2xl bg-secondary/40 border border-white/10 grid grid-cols-2 gap-4 mt-auto">
                      <div>
                        <span className="text-[10px] text-muted-foreground block uppercase font-mono font-bold tracking-wider mb-1">Liquidación</span>
                        <span className="font-bold text-foreground">{method.settlement}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground block uppercase font-mono font-bold tracking-wider mb-1">Comisión</span>
                        <span className="font-bold text-accent">{method.fee}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="w-[450px] h-[500px] flex items-center justify-center flex-shrink-0 snap-center mx-auto">
                <Card className="w-full h-full p-8 border-dashed border-2 border-border/50 bg-secondary/10 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl">
                  <span className="text-5xl opacity-50">🏜️</span>
                  <p className="text-lg font-bold">No hay métodos registrados</p>
                  <p className="text-sm text-muted-foreground">Esperando datos regulatorios para este país.</p>
                </Card>
              </div>
            )}
          </div>

          <button 
            onClick={() => scroll('right')} 
            className="absolute -right-4 xl:right-4 z-30 p-3 rounded-full bg-background/80 backdrop-blur border border-border shadow-lg text-foreground opacity-100 xl:opacity-0 xl:group-hover/carousel:opacity-100 transition-all hover:scale-110 hover:bg-background disabled:opacity-30"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* Internal CSS for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}

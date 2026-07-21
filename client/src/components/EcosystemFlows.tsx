import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Server, Landmark, User, ShieldAlert, TrendingDown, ArrowLeftRight, RotateCcw, Zap, Sparkles } from "lucide-react";
import fintechHubData from "../data/fintechHubData.json";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const FLOWS = {
  autorizacion: [
    { id: 'tarjetahabiente', label: 'Tarjetahabiente', icon: User, desc: 'Inicia Pago (0ms)', gradient: 'from-blue-500 to-cyan-400' },
    { id: 'comercio', label: 'Comercio', icon: Server, desc: 'Gateway / POS (45ms)', gradient: 'from-emerald-500 to-teal-400' },
    { id: 'adquirente', label: 'Adquirente / Agregador', icon: Building2, desc: 'Procesa (120ms)', gradient: 'from-amber-500 to-orange-400' },
    { id: 'emisor', label: 'Emisor', icon: Landmark, desc: 'Autoriza (300ms)', gradient: 'from-purple-500 to-pink-400' }
  ],
  contracargo: [
    { id: 'titular', label: 'Titular', icon: User, desc: 'No reconoce cargo (Día 1)', gradient: 'from-red-500 to-rose-400' },
    { id: 'emisor_c', label: 'Emisor', icon: Landmark, desc: 'Disputa 10.4 (Día 2)', gradient: 'from-orange-500 to-red-400' },
    { id: 'adquirente_c', label: 'Adquirente', icon: Building2, desc: 'Retiene fondos (Día 3)', gradient: 'from-amber-500 to-orange-400' },
    { id: 'comercio_c', label: 'Comercio', icon: ShieldAlert, desc: 'Envía pruebas (Día 5)', gradient: 'from-rose-500 to-pink-500' }
  ]
};

export function EcosystemFlows() {
  const [activeCountry, setActiveCountry] = useState<"mexico" | "brasil" | "colombia" | "chile">("mexico");
  const [activeFlowType, setActiveFlowType] = useState<"autorizacion" | "contracargo">("autorizacion");
  const [activeStep, setActiveStep] = useState(0);

  const countryData = fintechHubData.ecosistema_pagos_4_partes.tasas_por_pais[activeCountry];
  const adquirenteData = fintechHubData.ecosistema_pagos_4_partes.diferencia_adquirente_vs_agregador.adquirente;
  const agregadorData = fintechHubData.ecosistema_pagos_4_partes.diferencia_adquirente_vs_agregador.agregador;
  const currentFlow = FLOWS[activeFlowType];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % currentFlow.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [activeFlowType, currentFlow.length]);

  // Convert the dict of agregadores to an array for Mexico specifically
  const mexicoAgregadores = useMemo(() => {
    if (activeCountry === 'mexico' && countryData.tasas_descuento_agregadores_2026) {
      return Object.entries(countryData.tasas_descuento_agregadores_2026).map(([name, rate]) => ({
        name: name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        rate: typeof rate === 'string' ? rate.split('(')[0].trim() : rate
      }));
    }
    return [];
  }, [activeCountry, countryData]);

  return (
    <div className="w-full relative z-10 p-4 md:p-8 max-w-[1400px] mx-auto">
      
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold font-mono uppercase tracking-widest mb-6 shadow-[0_0_25px_rgba(var(--accent),0.3)] backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4" />
          Modelo Interactivo
        </motion.div>
        <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-6 text-foreground">
          El Ecosistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500 drop-shadow-sm">de Pagos</span>
        </h2>
        <p className="text-muted-foreground font-light text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
          Anatomía de una transacción y orquestación inteligente en LATAM.
        </p>
      </div>

      {/* Country Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {(["mexico", "brasil", "colombia", "chile"] as const).map((country) => (
          <button
            key={country}
            onClick={() => setActiveCountry(country)}
            className={`px-8 py-4 rounded-2xl text-sm font-black transition-all duration-300 uppercase tracking-widest ${
              activeCountry === country 
                ? 'bg-gradient-to-r from-accent to-indigo-500 text-white shadow-[0_10px_40px_rgba(var(--accent),0.5)] scale-105 border border-white/10' 
                : 'bg-card/40 backdrop-blur-lg border border-border/50 text-muted-foreground hover:bg-secondary/80 hover:border-accent/40 hover:text-foreground hover:shadow-lg'
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* 4-Part Diagram & Simulator */}
      <div className="w-full bg-card/20 backdrop-blur-3xl rounded-[3rem] border border-border/60 shadow-2xl p-8 md:p-16 relative mb-20 overflow-visible">
        {/* Deep Glowing Backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-accent/20 to-purple-500/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:60px_60px] pointer-events-none rounded-[3rem]" />

        <div className="flex flex-col md:flex-row justify-between items-center mb-16 relative z-10 gap-6">
          <h3 className="text-3xl md:text-4xl font-black flex items-center gap-4 text-foreground">
            {activeFlowType === "autorizacion" ? (
              <><ArrowLeftRight className="w-10 h-10 text-accent drop-shadow-[0_0_15px_rgba(var(--accent),0.5)]" /> Flujo de Autorización</>
            ) : (
              <><RotateCcw className="w-10 h-10 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" /> Flujo de Contracargo</>
            )}
          </h3>
          <div className="flex bg-background/60 backdrop-blur-xl p-1.5 rounded-2xl border border-border/50 shadow-inner">
            <button 
              onClick={() => { setActiveFlowType("autorizacion"); setActiveStep(0); }}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeFlowType === "autorizacion" ? 'bg-accent text-white shadow-[0_5px_20px_rgba(var(--accent),0.4)]' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}`}
            >
              Normal
            </button>
            <button 
              onClick={() => { setActiveFlowType("contracargo"); setActiveStep(0); }}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeFlowType === "contracargo" ? 'bg-rose-500 text-white shadow-[0_5px_20px_rgba(244,63,94,0.4)]' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}`}
            >
              Contracargo
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 py-12">
          {/* Animated Track */}
          <div className="hidden md:block absolute left-[12%] right-[12%] top-1/2 h-2 bg-secondary -translate-y-1/2 z-0 rounded-full border border-border/30 overflow-hidden shadow-inner">
            <motion.div 
              className={`h-full bg-gradient-to-r ${activeFlowType === 'autorizacion' ? 'from-accent to-purple-500' : 'from-rose-500 to-orange-500'}`}
              initial={{ width: "0%" }}
              animate={{ width: `${(activeStep / (currentFlow.length - 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>

          {/* Glowing dot moving along track */}
          <motion.div
            className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full items-center justify-center bg-white z-20 ${activeFlowType === 'autorizacion' ? 'shadow-[0_0_30px_rgba(var(--accent),1)]' : 'shadow-[0_0_30px_rgba(244,63,94,1)]'}`}
            initial={{ left: "12%" }}
            animate={{ left: `${12 + (activeStep / (currentFlow.length - 1)) * 76}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className={`w-3 h-3 rounded-full ${activeFlowType === 'autorizacion' ? 'bg-accent' : 'bg-rose-500'}`} />
          </motion.div>
          
          {currentFlow.map((actor, idx) => {
            const isActive = idx === activeStep;
            const isPast = idx <= activeStep;

            return (
              <div key={actor.id} className="relative z-30 flex flex-col items-center w-full md:w-1/4 group cursor-default perspective-1000">
                <motion.div 
                  className={`relative w-24 h-24 md:w-32 md:h-32 rounded-[2rem] flex items-center justify-center mb-6 transition-all duration-700 border-2 backdrop-blur-xl ${
                    isActive 
                      ? `bg-gradient-to-br ${actor.gradient} border-transparent text-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] scale-110 -translate-y-2` 
                      : isPast 
                        ? 'bg-card border-border/80 text-foreground shadow-lg' 
                        : 'bg-background/40 border-border/30 text-muted-foreground/40'
                  }`}
                  animate={isActive ? { rotateY: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <actor.icon className={`w-10 h-10 md:w-12 md:h-12 transition-colors ${isActive ? 'text-white drop-shadow-md' : isPast ? 'text-foreground' : 'text-muted-foreground/30'}`} />
                  
                  {/* Outer glow ring for active state */}
                  {isActive && (
                    <div className={`absolute -inset-2 rounded-[2.2rem] bg-gradient-to-br ${actor.gradient} opacity-30 blur-xl -z-10`} />
                  )}
                </motion.div>
                
                <span className={`font-black text-center text-lg md:text-xl transition-colors ${isActive ? 'text-foreground drop-shadow-sm' : isPast ? 'text-foreground/80' : 'text-muted-foreground/40'}`}>{actor.label}</span>
                <span className={`text-sm mt-3 text-center font-mono px-4 py-1.5 rounded-lg transition-colors font-semibold ${isActive ? `bg-gradient-to-r ${actor.gradient} text-white shadow-md` : isPast ? 'bg-secondary/80 text-foreground' : 'text-muted-foreground/30'}`}>{actor.desc}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tables & Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
        
        {/* Adquirente vs Agregador */}
        <Card className="bg-card/30 backdrop-blur-3xl border-border/40 p-8 md:p-12 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] hover:border-accent/40 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-accent/20 transition-colors duration-700" />
          
          <div className="flex items-center gap-5 mb-10 relative z-10">
            <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 rounded-2xl shadow-inner">
              <Building2 className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-3xl font-black tracking-tight text-foreground">Estructura Legal</h3>
          </div>
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b-2 border-border/50 text-muted-foreground font-mono text-xs uppercase tracking-widest">
                  <th className="pb-5 font-bold">Concepto</th>
                  <th className="pb-5 font-bold text-accent">Adquirente</th>
                  <th className="pb-5 font-bold text-emerald-500">Agregador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <tr className="hover:bg-secondary/40 transition-colors group/row">
                  <td className="py-6 font-bold text-foreground pr-4 group-hover/row:text-accent transition-colors">Definición</td>
                  <td className="py-6 text-muted-foreground pr-4 font-medium">{adquirenteData.definicion}</td>
                  <td className="py-6 text-muted-foreground font-medium">{agregadorData.definicion}</td>
                </tr>
                <tr className="hover:bg-secondary/40 transition-colors group/row">
                  <td className="py-6 font-bold text-foreground pr-4 group-hover/row:text-accent transition-colors">Licencia</td>
                  <td className="py-6 text-muted-foreground pr-4"><Badge variant="outline" className="bg-background/50">{adquirenteData.requiere}</Badge></td>
                  <td className="py-6 text-muted-foreground"><Badge variant="outline" className="bg-background/50">{agregadorData.requiere}</Badge></td>
                </tr>
                <tr className="hover:bg-secondary/40 transition-colors group/row">
                  <td className="py-6 font-bold text-foreground pr-4 group-hover/row:text-accent transition-colors">Tasa Típica</td>
                  <td className="py-6 text-accent pr-4 font-mono font-bold text-lg">{adquirenteData.tasa_tipica}</td>
                  <td className="py-6 text-emerald-500 font-mono font-bold text-lg">{agregadorData.tasa_tipica}</td>
                </tr>
                <tr className="hover:bg-secondary/40 transition-colors group/row">
                  <td className="py-6 font-bold text-foreground pr-4 group-hover/row:text-accent transition-colors">Risk/Kyc</td>
                  <td className="py-6 text-muted-foreground pr-4">{adquirenteData.relacion_comercio}</td>
                  <td className="py-6 text-muted-foreground">{agregadorData.relacion_comercio}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Dynamic Comissions */}
        <Card className="bg-card/30 backdrop-blur-3xl border-border/40 p-8 md:p-12 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] hover:border-purple-500/30 transition-all relative overflow-hidden flex flex-col group">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-700" />
          
          <div className="flex items-center gap-5 mb-12 relative z-10">
            <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 rounded-2xl shadow-inner">
              <TrendingDown className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tight text-foreground capitalize">Ecosistema {activeCountry}</h3>
              <p className="text-purple-400 text-xs font-mono mt-2 uppercase tracking-widest font-bold">Tasas & Regulación 2026</p>
            </div>
          </div>
          
          <div className="space-y-10 flex-1 relative z-10">
            {activeCountry === "mexico" && countryData.cuota_intercambio_propuesta_2026 && (
              <div className="p-8 rounded-[2rem] bg-gradient-to-br from-secondary/50 to-background/50 border border-border/50 hover:border-purple-500/30 hover:shadow-[0_10px_30px_rgba(168,85,247,0.1)] transition-all">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="text-sm font-black text-foreground flex items-center gap-3"><TrendingDown className="w-5 h-5 text-purple-500" /> Impacto Reducción CI</h4>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">Banxico 2026</Badge>
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-sm mb-3 font-mono">
                      <span className="text-muted-foreground font-semibold">Agregadores</span>
                      <span className="font-black text-foreground text-lg">{countryData.cuota_intercambio_propuesta_2026.credito.agregadores.split('(')[0]}</span>
                    </div>
                    <div className="h-4 bg-background rounded-full overflow-hidden flex border border-border/50 shadow-inner">
                      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="bg-gradient-to-r from-purple-600 to-fuchsia-500 w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-3 font-mono">
                      <span className="text-muted-foreground font-semibold">Retail Grandes Comercios</span>
                      <span className="font-black text-foreground text-lg">{countryData.cuota_intercambio_propuesta_2026.credito.retail}</span>
                    </div>
                    <div className="h-4 bg-background rounded-full overflow-hidden flex border border-border/50 shadow-inner">
                      <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }} className="bg-gradient-to-r from-pink-500 to-rose-400 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-[2rem] bg-gradient-to-br from-background/80 to-secondary/30 border border-border/50 hover:border-accent/30 transition-colors">
                <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-widest">Tasa Adquirente Crédito</h4>
                <div className="text-3xl font-black text-accent font-mono">{countryData.tasas_tarjeta?.credito || "1.5% - 2.5%"}</div>
              </div>
              <div className="p-6 rounded-[2rem] bg-gradient-to-br from-background/80 to-secondary/30 border border-border/50 hover:border-emerald-500/30 transition-colors">
                <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-widest">Tasa Adquirente Débito</h4>
                <div className="text-3xl font-black text-emerald-400 font-mono">{countryData.tasas_tarjeta?.debito || "0.75% - 1.5%"}</div>
              </div>
            </div>

            {activeCountry === 'mexico' && mexicoAgregadores.length > 0 && (
              <div className="pt-4">
                <h4 className="text-xs font-bold text-muted-foreground mb-5 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Mapa de Agregadores Locales
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {mexicoAgregadores.slice(0, 9).map((agr: any) => (
                    <div key={agr.name} className="flex flex-col p-4 rounded-2xl bg-card/50 border border-border/50 hover:bg-accent/10 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 group cursor-default">
                      <span className="font-extrabold text-sm text-foreground mb-1 group-hover:text-accent transition-colors">{agr.name}</span>
                      <span className="font-mono text-muted-foreground text-xs font-bold group-hover:text-accent/80 transition-colors">{agr.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeCountry !== 'mexico' && (
              <div className="p-6 rounded-[2rem] bg-secondary/30 border border-border/50 mt-4">
                <h4 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-widest">Observaciones Regulatorias</h4>
                <p className="text-base font-medium leading-relaxed text-foreground/90">{countryData.observacion || countryData.open_finance || countryData.sistemas_pago?.[0]}</p>
              </div>
            )}

          </div>
        </Card>
      </div>

    </div>
  );
}

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
  const [activeCountry, setActiveCountry] = useState<string>("mexico");
  const [activeFlowType, setActiveFlowType] = useState<"autorizacion" | "contracargo">("autorizacion");
  const [activeStep, setActiveStep] = useState(0);

  const countryData = (fintechHubData.ecosistema_pagos_4_partes.tasas_por_pais as any)[activeCountry] || fintechHubData.ecosistema_pagos_4_partes.tasas_por_pais.mexico;
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

  const allCountries = [
    { id: "mexico", name: "México" },
    { id: "brasil", name: "Brasil" },
    { id: "colombia", name: "Colombia" },
    { id: "chile", name: "Chile" },
    { id: "peru", name: "Perú" },
    { id: "argentina", name: "Argentina" },
    { id: "uruguay", name: "Uruguay" },
    { id: "ecuador", name: "Ecuador" },
    { id: "guatemala", name: "Guatemala" },
    { id: "el_salvador", name: "El Salvador" },
    { id: "costa_rica", name: "Costa Rica" },
    { id: "panama", name: "Panamá" },
    { id: "dominicana", name: "Rep. Dominicana" },
  ];

  return (
    <div className="w-full relative z-10 p-4 md:p-8 max-w-[1400px] mx-auto text-slate-900">
      
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-800 text-xs font-bold font-mono uppercase tracking-widest mb-4 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-cyan-600" />
          Modelo Interactivo
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-slate-900">
          El Ecosistema <span className="text-cyan-600">de Pagos</span>
        </h2>
        <p className="text-slate-600 font-medium text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Anatomía de una transacción y orquestación inteligente en LATAM.
        </p>
      </div>

      {/* Country Tabs - Scrollable Pill Bar for ALL countries */}
      <div className="mb-12">
        <p className="text-xs font-mono font-bold text-slate-600 uppercase text-center mb-3 tracking-wider">Selecciona País ({allCountries.length} Disponibles):</p>
        <div className="flex overflow-x-auto pb-4 gap-2.5 max-w-full no-scrollbar justify-start md:justify-center px-2">
          {allCountries.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCountry(c.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap uppercase tracking-wider border cursor-pointer ${
                activeCountry === c.id 
                  ? 'bg-cyan-600 text-white border-cyan-700 shadow-md scale-105' 
                  : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-cyan-700 shadow-xs'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Part Diagram & Simulator */}
      <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-md p-6 md:p-12 relative mb-16 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 relative z-10 gap-6">
          <h3 className="text-2xl md:text-3xl font-black flex items-center gap-3 text-slate-900">
            {activeFlowType === "autorizacion" ? (
              <><ArrowLeftRight className="w-8 h-8 text-cyan-600" /> Flujo de Autorización</>
            ) : (
              <><RotateCcw className="w-8 h-8 text-rose-600" /> Flujo de Contracargo</>
            )}
          </h3>
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 shadow-inner">
            <button 
              onClick={() => { setActiveFlowType("autorizacion"); setActiveStep(0); }}
              className={`px-5 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${activeFlowType === "autorizacion" ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'}`}
            >
              Normal
            </button>
            <button 
              onClick={() => { setActiveFlowType("contracargo"); setActiveStep(0); }}
              className={`px-5 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${activeFlowType === "contracargo" ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'}`}
            >
              Contracargo
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 py-6">
          {currentFlow.map((actor, idx) => {
            const isActive = idx === activeStep;
            const isPast = idx <= activeStep;

            return (
              <div key={actor.id} className="relative z-30 flex flex-col items-center w-full md:w-1/4 group cursor-default">
                <motion.div 
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-4 transition-all border-2 ${
                    isActive 
                      ? `bg-cyan-600 border-cyan-700 text-white shadow-md scale-105` 
                      : isPast 
                        ? 'bg-slate-100 border-slate-300 text-slate-900' 
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <actor.icon className={`w-8 h-8 ${isActive ? 'text-white' : isPast ? 'text-slate-800' : 'text-slate-400'}`} />
                </motion.div>
                
                <span className="font-extrabold text-center text-base text-slate-900">{actor.label}</span>
                <span className={`text-xs mt-2 text-center font-mono px-3 py-1 rounded-md font-bold ${isActive ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>{actor.desc}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tables & Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Estructura Legal - Optimized Table (NO HORIZONTAL SCROLLBAR) */}
        <Card className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-cyan-100 border border-cyan-300 rounded-xl">
              <Building2 className="w-6 h-6 text-cyan-700" />
            </div>
            <h3 className="text-2xl font-black tracking-tight text-slate-900">Estructura Legal</h3>
          </div>
          
          <div className="w-full">
            <table className="w-full text-xs text-left border-collapse table-fixed">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                  <th className="pb-3 font-bold w-[25%]">Concepto</th>
                  <th className="pb-3 font-bold text-cyan-700 w-[37.5%]">Adquirente</th>
                  <th className="pb-3 font-bold text-emerald-700 w-[37.5%]">Agregador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-extrabold text-slate-900 align-top">Definición</td>
                  <td className="py-4 text-slate-700 font-medium pr-2 break-words align-top">{adquirenteData.definicion}</td>
                  <td className="py-4 text-slate-700 font-medium break-words align-top">{agregadorData.definicion}</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-extrabold text-slate-900 align-top">Licencia</td>
                  <td className="py-4 text-slate-700 pr-2 break-words align-top"><Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-800 font-bold">{adquirenteData.requiere}</Badge></td>
                  <td className="py-4 text-slate-700 break-words align-top"><Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-800 font-bold">{agregadorData.requiere}</Badge></td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-extrabold text-slate-900 align-top">Tasa Típica</td>
                  <td className="py-4 text-cyan-700 pr-2 font-mono font-black text-sm break-words align-top">{adquirenteData.tasa_tipica}</td>
                  <td className="py-4 text-emerald-700 font-mono font-black text-sm break-words align-top">{agregadorData.tasa_tipica}</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-extrabold text-slate-900 align-top">Risk / KYC</td>
                  <td className="py-4 text-slate-700 pr-2 break-words align-top">{adquirenteData.relacion_comercio}</td>
                  <td className="py-4 text-slate-700 break-words align-top">{agregadorData.relacion_comercio}</td>
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
                  <h4 className="text-sm font-black text-foreground flex items-center gap-3">
                    <TrendingDown className="w-5 h-5 text-purple-500" /> 
                    Impacto Reducción CI <span className="text-xs font-semibold text-slate-500">(Cuota de Intercambio)</span>
                  </h4>
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

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Building2, Server, Landmark, User, ShieldAlert, TrendingDown, ArrowLeftRight, RotateCcw, Zap } from "lucide-react";
import fintechHubData from "../data/fintechHubData.json";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const FLOWS = {
  autorizacion: [
    { id: 'tarjetahabiente', label: 'Tarjetahabiente', icon: User, desc: 'Inicia Pago (0ms)' },
    { id: 'comercio', label: 'Comercio', icon: Server, desc: 'Gateway / POS (45ms)' },
    { id: 'adquirente', label: 'Adquirente / Agregador', icon: Building2, desc: 'Procesa (120ms)' },
    { id: 'emisor', label: 'Emisor', icon: Landmark, desc: 'Autoriza (300ms)' }
  ],
  contracargo: [
    { id: 'titular', label: 'Titular', icon: User, desc: 'No reconoce cargo (Día 1)' },
    { id: 'emisor_c', label: 'Emisor', icon: Landmark, desc: 'Disputa 10.4 (Día 2)' },
    { id: 'adquirente_c', label: 'Adquirente', icon: Building2, desc: 'Retiene fondos (Día 3)' },
    { id: 'comercio_c', label: 'Comercio', icon: ShieldAlert, desc: 'Envía pruebas (Día 5)' }
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
    }, 2000);
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
    <div className="w-full relative z-10">
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(var(--accent),0.2)]">
          <Zap className="w-3.5 h-3.5" />
          Modelo Interactivo
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">El Ecosistema de Pagos</h2>
        <p className="text-muted-foreground font-light text-lg md:text-xl max-w-2xl mx-auto">
          Anatomía de una transacción y orquestación inteligente en LATAM.
        </p>
      </div>

      {/* Country Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {(["mexico", "brasil", "colombia", "chile"] as const).map((country) => (
          <button
            key={country}
            onClick={() => setActiveCountry(country)}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border uppercase tracking-wider ${
              activeCountry === country 
                ? 'bg-accent/10 border-accent text-foreground shadow-[0_0_30px_rgba(var(--accent),0.3)] scale-105' 
                : 'bg-background/50 border-border text-muted-foreground hover:bg-secondary/50 hover:border-foreground/30 hover:text-foreground'
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* 4-Part Diagram & Simulator */}
      <div className="w-full bg-background/40 backdrop-blur-3xl rounded-[3rem] border border-border shadow-2xl p-8 md:p-14 relative mb-16 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

        <div className="flex justify-between items-center mb-12 relative z-10">
          <h3 className="text-3xl font-extrabold flex items-center gap-3">
            {activeFlowType === "autorizacion" ? (
              <><ArrowLeftRight className="w-8 h-8 text-accent" /> Flujo de Autorización</>
            ) : (
              <><RotateCcw className="w-8 h-8 text-destructive" /> Flujo de Contracargo</>
            )}
          </h3>
          <div className="flex bg-secondary/50 p-1 rounded-lg border border-border">
            <button 
              onClick={() => { setActiveFlowType("autorizacion"); setActiveStep(0); }}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeFlowType === "autorizacion" ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Transacción Normal
            </button>
            <button 
              onClick={() => { setActiveFlowType("contracargo"); setActiveStep(0); }}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeFlowType === "contracargo" ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Contracargo
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 py-10">
          <div className="hidden md:block absolute left-[12%] right-[12%] top-1/2 h-1 bg-border -translate-y-1/2 z-0 rounded-full" />
          
          <div className="hidden md:block absolute left-[12%] right-[12%] top-1/2 h-1 -translate-y-1/2 z-0 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${activeFlowType === 'autorizacion' ? 'bg-accent' : 'bg-destructive'}`}
              initial={{ width: "0%" }}
              animate={{ width: `${(activeStep / (currentFlow.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${activeFlowType === 'autorizacion' ? 'bg-accent shadow-[0_0_20px_var(--accent)]' : 'bg-destructive shadow-[0_0_20px_red]'} z-10`}
            initial={{ left: "12%" }}
            animate={{ left: `${12 + (activeStep / (currentFlow.length - 1)) * 76}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          
          {currentFlow.map((actor, idx) => {
            const isActive = idx === activeStep;
            const isPast = idx <= activeStep;
            const highlightColor = activeFlowType === 'autorizacion' ? 'text-accent border-accent bg-accent/10 shadow-[0_0_30px_rgba(var(--accent),0.3)]' : 'text-destructive border-destructive bg-destructive/10 shadow-[0_0_30px_rgba(255,0,0,0.3)]';

            return (
              <div key={actor.id} className="relative z-20 flex flex-col items-center w-full md:w-1/4 group cursor-default">
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 border-2 backdrop-blur-sm ${isActive ? highlightColor + ' scale-110' : isPast ? 'bg-background border-border text-foreground' : 'bg-background/50 border-border/50 text-muted-foreground'}`}>
                  <actor.icon className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${isActive ? (activeFlowType === 'autorizacion' ? 'text-accent' : 'text-destructive') : isPast ? 'text-foreground' : 'text-muted-foreground/50'}`} />
                </div>
                <span className={`font-bold text-center text-sm md:text-base transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{actor.label}</span>
                <span className={`text-xs mt-1 text-center font-mono px-2 py-1 rounded transition-colors ${isActive ? 'bg-secondary text-foreground' : 'text-muted-foreground/60'}`}>{actor.desc}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tables & Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Adquirente vs Agregador */}
        <Card className="bg-background/40 backdrop-blur-2xl border-border/50 p-8 md:p-10 rounded-[2.5rem] shadow-xl hover:border-accent/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-accent/10 transition-colors" />
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="p-3 bg-accent/10 rounded-xl">
              <Building2 className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-3xl font-extrabold tracking-tight">Adquirente vs Agregador</h3>
          </div>
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground font-mono text-xs uppercase tracking-wider">
                  <th className="pb-4 font-semibold">Característica</th>
                  <th className="pb-4 font-semibold">Adquirente</th>
                  <th className="pb-4 font-semibold">Agregador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                <tr className="hover:bg-secondary/40 transition-colors">
                  <td className="py-5 font-bold text-foreground pr-4">Definición</td>
                  <td className="py-5 text-muted-foreground pr-4">{adquirenteData.definicion}</td>
                  <td className="py-5 text-muted-foreground">{agregadorData.definicion}</td>
                </tr>
                <tr className="hover:bg-secondary/40 transition-colors">
                  <td className="py-5 font-bold text-foreground pr-4">Licencia</td>
                  <td className="py-5 text-muted-foreground pr-4">{adquirenteData.requiere}</td>
                  <td className="py-5 text-muted-foreground">{agregadorData.requiere}</td>
                </tr>
                <tr className="hover:bg-secondary/40 transition-colors">
                  <td className="py-5 font-bold text-foreground pr-4">Tasa Típica</td>
                  <td className="py-5 text-muted-foreground pr-4 font-mono">{adquirenteData.tasa_tipica}</td>
                  <td className="py-5 text-muted-foreground font-mono">{agregadorData.tasa_tipica}</td>
                </tr>
                <tr className="hover:bg-secondary/40 transition-colors">
                  <td className="py-5 font-bold text-foreground pr-4">Relación Comercio</td>
                  <td className="py-5 text-muted-foreground pr-4">{adquirenteData.relacion_comercio}</td>
                  <td className="py-5 text-muted-foreground">{agregadorData.relacion_comercio}</td>
                </tr>
                <tr className="hover:bg-secondary/40 transition-colors">
                  <td className="py-5 font-bold text-foreground pr-4">Ejemplos</td>
                  <td className="py-5 text-muted-foreground pr-4">{adquirenteData.ejemplos.join(", ")}</td>
                  <td className="py-5 text-muted-foreground">{agregadorData.ejemplos.join(", ")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Dynamic Comissions */}
        <Card className="bg-background/40 backdrop-blur-2xl border-border/50 p-8 md:p-10 rounded-[2.5rem] shadow-xl hover:border-accent/30 transition-all relative overflow-hidden flex flex-col">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="flex items-center gap-4 mb-10 relative z-10">
            <div className="p-3 bg-primary/10 rounded-xl">
              <TrendingDown className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold tracking-tight">Ecosistema {activeCountry}</h3>
              <p className="text-muted-foreground text-sm font-mono mt-1 uppercase tracking-widest">Tasas & Regulación</p>
            </div>
          </div>
          
          <div className="space-y-8 flex-1 relative z-10">
            {activeCountry === "mexico" && countryData.cuota_intercambio_propuesta_2026 && (
              <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2"><TrendingDown className="w-4 h-4 text-primary" /> Propuesta Reducción CI (2026)</h4>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Banxico</Badge>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-mono">
                      <span className="text-muted-foreground">Agregadores</span>
                      <span className="font-extrabold text-foreground">{countryData.cuota_intercambio_propuesta_2026.credito.agregadores.split('(')[0]}</span>
                    </div>
                    <div className="h-3 bg-background rounded-full overflow-hidden flex border border-border/50">
                      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1 }} className="bg-gradient-to-r from-red-500 to-red-400 w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-mono">
                      <span className="text-muted-foreground">Retail</span>
                      <span className="font-extrabold text-foreground">{countryData.cuota_intercambio_propuesta_2026.credito.retail}</span>
                    </div>
                    <div className="h-3 bg-background rounded-full overflow-hidden flex border border-border/50">
                      <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1, delay: 0.2 }} className="bg-gradient-to-r from-orange-500 to-amber-400 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-background/50 border border-border/50">
                <h4 className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">Tasa Adquirente Crédito</h4>
                <div className="text-xl font-black text-foreground font-mono">{countryData.tasas_tarjeta?.credito || "1.5% - 2.5%"}</div>
              </div>
              <div className="p-4 rounded-2xl bg-background/50 border border-border/50">
                <h4 className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">Tasa Adquirente Débito</h4>
                <div className="text-xl font-black text-foreground font-mono">{countryData.tasas_tarjeta?.debito || "0.75% - 1.5%"}</div>
              </div>
            </div>

            {activeCountry === 'mexico' && mexicoAgregadores.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">Mapa de Agregadores Locales</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {mexicoAgregadores.slice(0, 9).map((agr: any) => (
                    <div key={agr.name} className="flex flex-col p-3 rounded-xl bg-background/50 border border-border/50 hover:bg-secondary/50 hover:border-accent/40 transition-all group">
                      <span className="font-bold text-xs text-foreground mb-1">{agr.name}</span>
                      <span className="font-mono text-accent text-[10px] font-bold">{agr.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeCountry !== 'mexico' && (
              <div className="p-4 rounded-xl bg-background/50 border border-border/50 mt-4">
                <h4 className="text-sm font-bold text-muted-foreground mb-2">Observaciones</h4>
                <p className="text-sm text-foreground">{countryData.observacion || countryData.open_finance || countryData.sistemas_pago?.[0]}</p>
              </div>
            )}

          </div>
        </Card>
      </div>

    </div>
  );
}

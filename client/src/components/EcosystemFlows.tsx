import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Server, Landmark, User, ShieldAlert, ArrowRight, TrendingDown } from "lucide-react";
import fintechHubData from "../data/fintechHubData.json";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function EcosystemFlows() {
  const [activeCountry, setActiveCountry] = useState<"mexico" | "brasil" | "colombia" | "chile">("mexico");

  const countryData = fintechHubData.ecosistema_pagos_4_partes.tasas_por_pais[activeCountry];
  const { diferencias } = fintechHubData.ecosistema_pagos_4_partes;

  return (
    <section className="relative w-full max-w-[1200px] mx-auto px-6 py-24 z-10">
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold font-mono uppercase tracking-widest mb-6">
          <ShieldAlert className="w-3.5 h-3.5" />
          Modelo de 4 Partes
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">El Ecosistema de Pagos</h2>
        <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
          Anatomía de una transacción y arquitectura de orquestación.
        </p>
      </div>

      {/* Tabs / Scenarios */}
      <div className="flex justify-center gap-3 mb-10">
        {(["mexico", "brasil", "colombia", "chile"] as const).map((country) => (
          <button
            key={country}
            onClick={() => setActiveCountry(country)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border capitalize ${
              activeCountry === country 
                ? 'bg-accent/10 border-accent text-foreground shadow-[0_0_20px_rgba(var(--accent),0.2)] scale-105' 
                : 'bg-background/50 border-border text-muted-foreground hover:bg-secondary/50 hover:border-foreground/20 hover:text-foreground'
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* 4-Part Diagram */}
      <div className="w-full bg-card/40 backdrop-blur-2xl rounded-[2.5rem] border border-border shadow-2xl p-10 relative mb-12">
        <h3 className="text-2xl font-bold mb-8 text-center">Flujo de Autorización y Liquidación</h3>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
          {/* Path line background */}
          <div className="hidden md:block absolute left-[10%] right-[10%] top-1/2 h-1 bg-border -translate-y-1/2 z-0" />
          <motion.div 
            className="hidden md:block absolute left-[10%] right-[10%] top-1/2 h-1 bg-accent -translate-y-1/2 z-0"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          />
          
          {[
            { id: 'tarjetahabiente', label: 'Tarjetahabiente', icon: User, desc: 'Inicia Pago' },
            { id: 'comercio', label: 'Comercio', icon: Server, desc: 'Gateway / POS' },
            { id: 'adquirente', label: 'Adquirente / Agregador', icon: Building2, desc: 'Procesa Transacción' },
            { id: 'emisor', label: 'Emisor', icon: Landmark, desc: 'Dueño de Fondos' }
          ].map((actor, idx) => (
            <div key={actor.id} className="relative z-10 flex flex-col items-center bg-background border border-border rounded-2xl p-6 w-full md:w-1/4 shadow-lg hover:border-accent transition-all">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <actor.icon className="w-8 h-8 text-accent" />
              </div>
              <span className="font-bold text-foreground text-center">{actor.label}</span>
              <span className="text-xs text-muted-foreground mt-1 text-center">{actor.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tables & Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Adquirente vs Agregador */}
        <Card className="bg-card/40 backdrop-blur-md border-border p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-accent" />
            <h3 className="text-2xl font-bold">Adquirente vs Agregador</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-3 font-medium">CARACTERÍSTICA</th>
                  <th className="pb-3 font-medium">ADQUIRENTE</th>
                  <th className="pb-3 font-medium">AGREGADOR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {diferencias.map((row, i) => (
                  <tr key={i} className="hover:bg-accent/5 transition-colors">
                    <td className="py-4 font-semibold text-foreground">{row.caracteristica}</td>
                    <td className="py-4 text-muted-foreground">{row.adquirente}</td>
                    <td className="py-4 text-muted-foreground">{row.agregador}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Dynamic Comissions */}
        <Card className="bg-card/40 backdrop-blur-md border-border p-8 rounded-3xl flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-bold">Panorama de Comisiones ({activeCountry.toUpperCase()})</h3>
            </div>
          </div>
          
          <div className="space-y-8 flex-1">
            {activeCountry === "mexico" && (
              <>
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                  <h4 className="text-sm font-bold text-muted-foreground mb-3 uppercase">Propuesta Reducción CI (Banxico 2026)</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Agregadores</span>
                        <span className="font-bold">1.76% → 1.15%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden flex">
                        <div className="bg-red-500 w-[100%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Retail</span>
                        <span className="font-bold">1.53% → 1.15%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden flex">
                        <div className="bg-orange-500 w-[85%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase">Tasas Promedio Mercado</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="px-4 py-2 border-primary/30 bg-primary/5 text-sm">
                  Adquirentes Directos: <span className="font-bold ml-1 text-foreground">{countryData.adquirentes}</span>
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase">Principales Agregadores</h4>
              <div className="grid grid-cols-2 gap-3">
                {countryData.agregadores.map((agr: any) => (
                  <div key={agr.name} className="flex justify-between items-center p-3 rounded-lg bg-background border border-border hover:border-accent transition-colors">
                    <span className="font-medium">{agr.name}</span>
                    <span className="font-mono text-accent text-xs font-bold bg-accent/10 px-2 py-1 rounded">{agr.rate}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Card>
      </div>

    </section>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from "recharts";
import { 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Activity, 
  DollarSign, 
  Percent, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  Layers
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dataset real de comparativa de pasarelas B2B en LATAM 2026
const GATEWAY_METRICS_DATA = [
  { gateway: "Clip MX", mdr: 3.60, fixedFee: 0.00, approvalRate: 98.4, latencyMs: 120, payoutDays: "T+0" },
  { gateway: "Stripe LATAM", mdr: 3.60, fixedFee: 3.00, approvalRate: 99.1, latencyMs: 85, payoutDays: "T+2" },
  { gateway: "Mercado Pago", mdr: 3.49, fixedFee: 4.00, approvalRate: 97.8, latencyMs: 110, payoutDays: "T+0" },
  { gateway: "Conekta", mdr: 2.90, fixedFee: 2.50, approvalRate: 96.5, latencyMs: 140, payoutDays: "T+1" },
  { gateway: "Kushki", mdr: 2.80, fixedFee: 2.00, approvalRate: 98.9, latencyMs: 95, payoutDays: "T+1" },
  { gateway: "Openpay (BBVA)", mdr: 2.95, fixedFee: 2.50, approvalRate: 97.2, latencyMs: 130, payoutDays: "T+1" },
  { gateway: "dLocal", mdr: 2.75, fixedFee: 3.50, approvalRate: 99.3, latencyMs: 78, payoutDays: "T+1" }
];

export function FinancialTelemetryDashboard() {
  const [ticketAmount, setTicketAmount] = useState<number>(1000); // Ticket promedio $1,000 MXN

  // Cálculo de costo total de comisión según ticket promedio
  const calculatedData = GATEWAY_METRICS_DATA.map(item => {
    const variableCost = (ticketAmount * item.mdr) / 100;
    const totalCost = variableCost + item.fixedFee;
    const effectiveMdr = (totalCost / ticketAmount) * 100;
    return {
      ...item,
      totalCost: Number(totalCost.toFixed(2)),
      effectiveMdr: Number(effectiveMdr.toFixed(2))
    };
  });

  return (
    <div className="w-full max-w-[1320px] mx-auto p-4 sm:p-6 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            LIVE TELEMETRY ENGINE • SKILL LIVECHARTS2
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-outfit tracking-tight">
            Telemetría de Pasarelas & Rieles B2B
          </h2>
          <p className="text-sm text-slate-400 font-normal">
            Simulador multieje de costo real, latencia de respuesta y tasa efectiva de autorización en México y LATAM.
          </p>
        </div>

        {/* Ticket Selector Control */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-2 relative z-10 min-w-[260px]">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Ticket Promedio:</span>
            <span className="text-cyan-400 font-extrabold text-sm">${ticketAmount.toLocaleString()} MXN</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="10000" 
            step="100"
            value={ticketAmount}
            onChange={(e) => setTicketAmount(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>$100</span>
            <span>$5,000</span>
            <span>$10,000</span>
          </div>
        </div>
      </div>

      {/* Radial Gauges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gauge 1: Latencia Media */}
        <Card className="p-5 bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Latencia Media API</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">98.5 ms</h3>
            </div>
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Riel SPEI A2A:</span>
            <span className="font-mono font-bold text-emerald-600">Ultra-Rápido (38ms)</span>
          </div>
        </Card>

        {/* Gauge 2: Tasa de Autorización */}
        <Card className="p-5 bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Aprobación Promedio</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">98.4 %</h3>
            </div>
            <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">3D Secure v2.2:</span>
            <span className="font-mono font-bold text-indigo-600">Fricción Cero</span>
          </div>
        </Card>

        {/* Gauge 3: Liquidación T+0 vs T+2 */}
        <Card className="p-5 bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Liquidación Instantánea</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">T+0 Disponibilidad</h3>
            </div>
            <div className="p-2.5 bg-cyan-100 text-cyan-700 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Rieles Directos:</span>
            <span className="font-mono font-bold text-cyan-700">Clip / Mercado Pago</span>
          </div>
        </Card>

        {/* Gauge 4: Cobertura de Licencias */}
        <Card className="p-5 bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Licenciamiento CNBV</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">100% Regulado</h3>
            </div>
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Estatus CONDUSEF:</span>
            <span className="font-mono font-bold text-amber-700">Vigente 2026</span>
          </div>
        </Card>
      </div>

      {/* Main Dual Y-Axis Chart */}
      <Card className="p-6 bg-slate-950 border border-slate-800 text-white shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-xl font-bold font-outfit text-white">
              Gráfico Multieje: MDR Variable (%) vs Cuota Fija ($)
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Comparativa cruzada del impacto financiero por transacción de cada pasarela de cobro.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-3 bg-cyan-500 rounded-xs inline-block" /> Comisión % MDR
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3 h-3 bg-amber-400 rounded-xs inline-block" /> Cuota Fija ($ MXN)
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={calculatedData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="gateway" stroke="#64748b" fontSize={11} tickLine={false} />
              
              {/* Eje Izquierdo: % MDR */}
              <YAxis yAxisId="left" stroke="#38bdf8" fontSize={11} tickFormatter={(val) => `${val}%`} domain={[0, 5]} />
              
              {/* Eje Derecho: Cuota Fija $ */}
              <YAxis yAxisId="right" orientation="right" stroke="#fbbf24" fontSize={11} tickFormatter={(val) => `$${val}`} domain={[0, 6]} />
              
              <Tooltip 
                contentStyle={{ backgroundColor: "#090d16", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                formatter={(value: any, name: any) => {
                  if (name === "mdr") return [`${value}%`, "MDR Base"];
                  if (name === "fixedFee") return [`$${value} MXN`, "Cuota Fija"];
                  if (name === "totalCost") return [`$${value} MXN`, `Costo en $${ticketAmount}`];
                  return [value, name];
                }}
              />

              <Bar yAxisId="left" dataKey="mdr" fill="#0284c7" radius={[6, 6, 0, 0]} barSize={28} />
              <Line yAxisId="right" type="monotone" dataKey="fixedFee" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: "#f59e0b" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Breakdown Data Table */}
      <Card className="overflow-hidden border border-slate-200 bg-white shadow-xs">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-sm font-outfit">Tabla de Eficiencia Transaccional</h4>
            <p className="text-xs text-slate-500 font-mono">Calculado sobre un Ticket de ${ticketAmount.toLocaleString()} MXN</p>
          </div>
          <Badge className="bg-cyan-100 text-cyan-900 font-bold border-cyan-300">Live Simulation</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                <th className="p-3.5 font-bold">Pasarela / Provider</th>
                <th className="p-3.5 font-bold">MDR Base</th>
                <th className="p-3.5 font-bold">Cuota Fija</th>
                <th className="p-3.5 font-bold">Costo en Ticket (${ticketAmount})</th>
                <th className="p-3.5 font-bold">MDR Efectivo</th>
                <th className="p-3.5 font-bold">Tasa Aprobación</th>
                <th className="p-3.5 font-bold">Disponibilidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {calculatedData.map((row) => (
                <tr key={row.gateway} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-extrabold text-slate-900 font-sans">{row.gateway}</td>
                  <td className="p-3.5 text-cyan-700 font-bold">{row.mdr}%</td>
                  <td className="p-3.5 text-slate-600">${row.fixedFee.toFixed(2)} MXN</td>
                  <td className="p-3.5 font-extrabold text-indigo-700 bg-indigo-50/60">${row.totalCost} MXN</td>
                  <td className="p-3.5 font-bold text-slate-800">{row.effectiveMdr}%</td>
                  <td className="p-3.5 text-emerald-700 font-bold">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      {row.approvalRate}%
                    </span>
                  </td>
                  <td className="p-3.5">
                    <Badge variant="outline" className="font-mono text-[10px] border-slate-300">{row.payoutDays}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

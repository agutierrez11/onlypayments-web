import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe2, ArrowRight, TrendingDown, ArrowLeft, ShieldCheck, Banknote, Landmark, Building2 } from "lucide-react";
import { REMITTANCE_CORRIDORS, REMITTANCE_ACTORS } from "../data";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

export default function Remesas() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <SEO 
        title="Ecosistema de Remesas LATAM 2026 — OnlyPayments" 
        description="Análisis del volumen de $180B+ en remesas USA→LATAM, tarifas por corredor, infraestructura last-mile y neoremesadoras." 
      />

      {/* Header / Navigation */}
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xs">
        <div className="container py-3 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-700 hover:text-slate-900 font-bold cursor-pointer">
              <ArrowLeft className="w-4 h-4 text-cyan-600" />
              Volver al inicio
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-slate-900">OnlyPayments</span>
            <Badge className="bg-cyan-100 text-cyan-800 border-cyan-300 font-mono text-[10px] font-bold">REMESAS B2B</Badge>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="border-b border-slate-200 py-12 bg-white">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-cyan-100 border border-cyan-300 rounded-xl">
                <Globe2 className="w-7 h-7 text-cyan-700" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">Ecosistema de Remesas LATAM</h1>
            </div>
            <p className="text-lg md:text-xl text-slate-600 font-medium">
              El corredor transfronterizo más relevante del planeta. Análisis de volúmenes, comisiones FX y rieles de liquidación last-mile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 border-l-4 border-l-cyan-600 bg-slate-50 border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Volumen USA → LATAM</p>
              <p className="text-3xl font-black text-slate-900 font-mono">$180B+</p>
              <p className="text-xs text-slate-600 font-medium mt-1">Anual estimado 2026</p>
            </Card>
            <Card className="p-5 border-l-4 border-l-blue-600 bg-slate-50 border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Población Impactada</p>
              <p className="text-3xl font-black text-slate-900 font-mono">~120M</p>
              <p className="text-xs text-slate-600 font-medium mt-1">Personas receptoras finales</p>
            </Card>
            <Card className="p-5 border-l-4 border-l-amber-500 bg-slate-50 border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tarifa Promedio MTO</p>
              <p className="text-3xl font-black text-slate-900 font-mono">3.5%</p>
              <p className="text-xs text-slate-600 font-medium mt-1">Transferencias tradicionales</p>
            </Card>
            <Card className="p-5 border-l-4 border-l-emerald-600 bg-slate-50 border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tarifa A2A Optimizada</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-black text-emerald-700 font-mono">&lt; 1%</p>
                <TrendingDown className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1">Vía rieles locales (SPEI/PIX)</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl py-12 space-y-12">
        
        {/* Corridors Table */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 mb-1">Principales Corredores (USA → LATAM)</h2>
            <p className="text-slate-600 text-sm font-medium">
              Datos ordenados por volumen anual y penetración en el PIB de economías receptoras.
            </p>
          </div>
          
          <div className="w-full overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-500 uppercase font-mono text-[11px] tracking-wider bg-slate-50">
                  <th className="px-4 py-3 font-bold">Corredor</th>
                  <th className="px-4 py-3 font-bold text-right">Volumen Anual</th>
                  <th className="px-4 py-3 font-bold text-right">% PIB Receptor</th>
                  <th className="px-4 py-3 font-bold text-right">Tarifa Prom.</th>
                  <th className="px-4 py-3 font-bold">Riel Last-Mile</th>
                  <th className="px-4 py-3 font-bold">Dominantes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {REMITTANCE_CORRIDORS.map((corridor) => (
                  <tr key={corridor.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl" title={corridor.from}>{corridor.fromFlag}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xl" title={corridor.to}>{corridor.toFlag}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-black font-mono text-slate-900">
                      ${(corridor.volumeUSD / 1000).toFixed(1)}B
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Badge className={corridor.gdpPercent > 15 ? "bg-amber-100 text-amber-900 border-amber-300 font-extrabold" : "bg-slate-100 text-slate-800 border-slate-300 font-bold"}>
                        {corridor.gdpPercent}%
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-700">
                      {corridor.avgFeePercent.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {corridor.lastMile.map((lm, i) => (
                          <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                            {lm}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-slate-800 font-bold">
                        {corridor.dominantPlayers.join(", ")}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Actors Ecosystem */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 mb-1">Actores del Ecosistema</h2>
            <p className="text-slate-600 text-sm font-medium">
              Proveedores clave en la cadena de valor: captura en origen, conversión FX y pago en destino.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REMITTANCE_ACTORS.map((actor) => (
              <Card key={actor.id} className="p-5 flex flex-col justify-between bg-white border-slate-200 hover:border-cyan-500 transition-all shadow-xs rounded-xl">
                <div>
                  <Badge className="mb-3 bg-cyan-100 text-cyan-800 border-cyan-300 font-bold text-[10px]">{actor.category}</Badge>
                  <h3 className="text-base font-black text-slate-900 mb-2">{actor.name}</h3>
                  <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed">
                    {actor.description}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-extrabold uppercase text-slate-400 mb-1.5">Ejemplos Clave</p>
                  <div className="flex flex-wrap gap-1">
                    {actor.examples.map((ex, i) => (
                      <span key={i} className="text-[11px] bg-slate-100 border border-slate-300 text-slate-900 font-bold px-2 py-0.5 rounded">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Regulatory context */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-cyan-700" />
            Contexto Regulatorio y Cumplimiento AML
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-700">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-black text-sm mb-2 text-slate-900 flex items-center gap-2">
                <Banknote className="w-4 h-4 text-cyan-700" /> MSB (Money Services Business) & FinCEN
              </h3>
              <p className="font-medium text-slate-600">
                En EE. UU., los transmisores de dinero deben registrarse en la FinCEN como MSB y obtener licencias estado por estado (MTL). Esto exige rigurosos programas de AML/KYC y reporte de transacciones &gt; $3,000.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-black text-sm mb-2 text-slate-900 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-cyan-700" /> Corresponsalía Bancaria & Liquidación FX
              </h3>
              <p className="font-medium text-slate-600">
                Las neoremesadoras dependen de bancos corresponsales o proveedores de FX locales para inyectar liquidez en las cuentas de destino (vía SPEI, PIX o ACH en tiempo real).
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

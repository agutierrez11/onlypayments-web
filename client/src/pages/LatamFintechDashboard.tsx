import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Gamepad2, 
  Landmark, 
  Globe2, 
  Network,
  Banknote,
  Search,
  Zap,
  Radio,
  ArrowLeft
} from "lucide-react";
import { useLocation } from "wouter";
import fintechHubData from "../data/fintechHubData.json";
import { EcosystemFlows } from "../components/EcosystemFlows";
import { FintechDirectory } from "../components/FintechDirectory";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { SEO } from "../components/SEO";

type Tab = "satellite" | "pagos" | "igaming" | "openfinance" | "remesas" | "directorio";

export default function LatamFintechDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("satellite");
  const [, navigate] = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden relative font-sans">
      <SEO 
        title="Radar LATAM 2026 — OnlyPayments Hub" 
        description="Radar en tiempo real de regulación, Open Finance, iGaming y adquirencia regional en América Latina." 
      />
      
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 h-full bg-white border-r border-slate-200 flex flex-col justify-between p-4 z-20 relative shadow-sm">
        <div>
          {/* Botón Volver al Inicio */}
          <button 
            onClick={() => navigate('/')} 
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 border border-slate-300 hover:bg-slate-200 hover:text-slate-900 transition-all shadow-xs mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-600" />
            <span className="hidden md:inline">Volver al Inicio</span>
          </button>

          <div className="flex items-center gap-3 mb-6 px-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Zap className="w-5 h-5 text-white font-extrabold" />
            </div>
            <div className="hidden md:block">
              <h1 className="font-extrabold text-lg leading-tight tracking-tight text-slate-900">LATAM Hub</h1>
              <p className="text-[10px] text-cyan-700 uppercase tracking-widest font-mono font-bold">Radar 2026</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <NavItem 
              icon={Radio} 
              label="Radar Satelital 3D" 
              active={activeTab === "satellite"} 
              onClick={() => setActiveTab("satellite")} 
            />
            <NavItem 
              icon={ArrowLeftRight} 
              label="Pagos y Adquirencia" 
              active={activeTab === "pagos"} 
              onClick={() => setActiveTab("pagos")} 
            />
            <NavItem 
              icon={Gamepad2} 
              label="iGaming Payments" 
              active={activeTab === "igaming"} 
              onClick={() => setActiveTab("igaming")} 
            />
            <NavItem 
              icon={Network} 
              label="Open Finance" 
              active={activeTab === "openfinance"} 
              onClick={() => setActiveTab("openfinance")} 
            />
            <NavItem 
              icon={Globe2} 
              label="Remesas" 
              active={activeTab === "remesas"} 
              onClick={() => setActiveTab("remesas")} 
            />
            <NavItem 
              icon={Search} 
              label="Radares & Empresas" 
              active={activeTab === "directorio"} 
              onClick={() => setActiveTab("directorio")} 
            />
          </div>
        </div>
        
        <div className="hidden md:block p-4 rounded-2xl bg-slate-100 border border-slate-200 mb-4">
          <p className="text-xs font-mono text-cyan-800 mb-1 uppercase font-bold">Datos Mapeados</p>
          <p className="text-2xl font-black text-slate-900">{fintechHubData.meta.paises_mapeados} Países</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative z-10 scroll-smooth bg-slate-50">
        <AnimatePresence mode="wait">
          {activeTab === "satellite" && (
            <motion.div key="satellite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full h-full relative">
              <iframe
                src="/latam-fintech-satellite.html"
                title="LATAM Fintech Satellite 3D"
                className="w-full h-full border-0 block"
              />
            </motion.div>
          )}

          {activeTab === "pagos" && (
            <motion.div key="pagos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <EcosystemFlows />
            </motion.div>
          )}

          {activeTab === "igaming" && (
            <motion.div key="igaming" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-6 md:p-8 max-w-[1200px] mx-auto text-slate-900">
              <div className="mb-8">
                <Badge variant="outline" className="mb-3 border-purple-300 text-purple-800 bg-purple-100 font-bold"><Gamepad2 className="w-3.5 h-3.5 mr-2 text-purple-700"/> iGaming y Apuestas</Badge>
                <h2 className="text-3xl md:text-4xl font-black mb-2 text-slate-900">Mercado iGaming LATAM 2026</h2>
                <p className="text-lg text-slate-600 font-medium">Volumen GGR proyectado: <span className="font-mono text-purple-700 font-black">{fintechHubData.gaming_igaming.mercado_total_latam_2026}</span></p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(fintechHubData.gaming_igaming.por_pais).map(([pais, data]: [string, any]) => (
                  <Card key={pais} className="bg-white border border-slate-200 p-4 hover:border-purple-500 transition-all shadow-sm flex flex-col justify-between rounded-xl">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
                        <h3 className="text-lg font-black capitalize text-slate-900">{pais}</h3>
                        {data.estado.includes('✅') && <Badge className="bg-emerald-100 text-emerald-900 border-emerald-300 font-bold text-[10px]">Regulado</Badge>}
                        {data.estado.includes('⚠️') && <Badge className="bg-amber-100 text-amber-900 border-amber-300 font-bold text-[10px]">Gris / Transición</Badge>}
                        {data.estado.includes('❌') && <Badge className="bg-red-100 text-red-900 border-red-300 font-bold text-[10px]">Prohibido</Badge>}
                        {data.estado.includes('🔄') && <Badge className="bg-blue-100 text-blue-900 border-blue-300 font-bold text-[10px]">Desarrollo</Badge>}
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center"><span className="text-slate-500 font-bold">Regulador:</span><span className="font-extrabold text-slate-900">{data.regulador || "N/A"}</span></div>
                        {data.ley && <div className="flex justify-between items-start gap-2"><span className="text-slate-500 font-bold flex-shrink-0">Ley:</span><span className="font-mono text-[11px] text-slate-700 text-right font-medium">{data.ley}</span></div>}
                        {data.ggr_2026 && <div className="flex justify-between items-center"><span className="text-slate-500 font-bold">GGR 2026:</span><span className="font-mono font-black text-purple-700 text-sm">{data.ggr_2026}</span></div>}
                        {data.tax && <div className="flex justify-between items-start gap-2"><span className="text-slate-500 font-bold flex-shrink-0">Impuesto:</span><span className="font-semibold text-slate-800 text-right text-[11px]">{data.tax}</span></div>}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "openfinance" && (
            <motion.div key="openfinance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-6 md:p-8 max-w-[1200px] mx-auto text-slate-900">
               <div className="mb-8">
                <Badge variant="outline" className="mb-3 border-emerald-300 text-emerald-800 bg-emerald-100 font-bold"><Network className="w-3.5 h-3.5 mr-2 text-emerald-700"/> Open Finance & Regulador</Badge>
                <h2 className="text-3xl md:text-4xl font-black mb-2 text-slate-900">Regulación Fintech & Sandboxes</h2>
              </div>
              
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                      <th className="py-3.5 font-bold px-5">País</th>
                      <th className="py-3.5 font-bold px-5">Open Finance</th>
                      <th className="py-3.5 font-bold px-5">Regulación / Ley</th>
                      <th className="py-3.5 font-bold px-5">Crypto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Object.entries(fintechHubData.regulacion_fintech).map(([pais, data]: [string, any]) => (
                      <tr key={pais} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-5 font-black text-slate-900 capitalize">{pais}</td>
                        <td className="py-3.5 px-5 text-slate-700 font-medium">{data.open_finance}</td>
                        <td className="py-3.5 px-5 text-slate-700 font-medium">{data.ley_fintech}</td>
                        <td className="py-3.5 px-5 text-slate-700 font-medium">{data.crypto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "remesas" && (
            <motion.div key="remesas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-6 md:p-8 max-w-[1200px] mx-auto text-slate-900">
              <div className="mb-8">
                <Badge variant="outline" className="mb-3 border-cyan-300 text-cyan-800 bg-cyan-100 font-bold"><Globe2 className="w-3.5 h-3.5 mr-2 text-cyan-700"/> Remesas Transfronterizas</Badge>
                <h2 className="text-3xl md:text-4xl font-black mb-2 text-slate-900">Flujos de Remesas USA → LATAM</h2>
                <p className="text-lg text-slate-600 font-medium">Volumen Total 2025: <span className="font-mono text-cyan-700 font-black">{fintechHubData.remesas.volumen_total_2025}</span></p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl">
                  <h3 className="text-lg font-black text-slate-900 mb-3">Top Receptores LATAM</h3>
                  <div className="space-y-3">
                    {Object.entries(fintechHubData.remesas.top_receptores_2025).map(([pais, data]: [string, any]) => (
                      <div key={pais} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <p className="font-extrabold capitalize text-slate-900 text-sm">{pais}</p>
                          <p className="text-xs text-slate-500 font-medium">{data.origen_principal}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-black text-cyan-700 text-base">{data.monto}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl">
                  <h3 className="text-lg font-black text-slate-900 mb-3">Canales & Tendencias 2026</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    {fintechHubData.remesas.observacion_general}
                  </p>
                  <div className="space-y-2">
                    {fintechHubData.remesas.tendencias_2026.map((t: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                        <Banknote className="w-4 h-4 text-cyan-700 flex-shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

            </motion.div>
          )}

          {activeTab === "directorio" && (
            <motion.div key="directorio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full">
              <FintechDirectory />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

// ArrowLeftRight icon component
const ArrowLeftRight = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
);

function NavItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
        active 
          ? 'bg-cyan-100 text-cyan-900 border border-cyan-300 font-extrabold shadow-xs' 
          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-bold'
      }`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-cyan-700' : 'text-slate-500'}`} />
      <span className="hidden md:block text-sm text-left">{label}</span>
    </button>
  );
}

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
    <div className="flex h-screen bg-background overflow-hidden relative">
      <SEO 
        title="Radar LATAM 2026 — OnlyPayments Hub" 
        description="Radar en tiempo real de regulación, Open Finance, iGaming y adquirencia regional en América Latina." 
      />
      {/* Dynamic Background Glows based on active tab */}
      <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ${
        activeTab === 'satellite' ? 'bg-cyan-500/10' :
        activeTab === 'pagos' ? 'bg-accent/10' : 
        activeTab === 'igaming' ? 'bg-purple-500/10' : 
        activeTab === 'openfinance' ? 'bg-emerald-500/10' : 
        activeTab === 'directorio' ? 'bg-amber-500/10' : 'bg-blue-500/10'
      }`} />
      
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 h-full bg-slate-950/95 backdrop-blur-3xl border-r border-slate-800/80 flex flex-col justify-between p-4 z-20 relative">
        <div>
          {/* Botón Volver al Inicio */}
          <button 
            onClick={() => navigate('/')} 
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 hover:bg-cyan-900/80 hover:border-cyan-400 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Volver al Inicio</span>
          </button>

          <div className="flex items-center gap-3 mb-6 px-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Zap className="w-5 h-5 text-black font-extrabold" />
            </div>
            <div className="hidden md:block">
              <h1 className="font-extrabold text-lg leading-tight tracking-tight text-white">LATAM Hub</h1>
              <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-mono font-bold">Radar 2026</p>
            </div>
          </div>

          <div className="space-y-2">
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
        
        <div className="hidden md:block p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 mb-4">
          <p className="text-xs font-mono text-cyan-400 mb-1 uppercase font-bold">Datos Mapeados</p>
          <p className="text-2xl font-black text-white">{fintechHubData.meta.paises_mapeados} Países</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative z-10 scroll-smooth bg-[#020408]">
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
            <motion.div key="igaming" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-8 md:p-12 max-w-[1200px] mx-auto">
              <div className="mb-12">
                <Badge variant="outline" className="mb-4 border-purple-500/40 text-purple-300 bg-purple-500/20 font-bold"><Gamepad2 className="w-3.5 h-3.5 mr-2"/> iGaming y Apuestas</Badge>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Mercado iGaming LATAM 2026</h2>
                <p className="text-xl text-slate-300">Volumen GGR proyectado: <span className="font-mono text-cyan-400 font-bold">{fintechHubData.gaming_igaming.mercado_total_latam_2026}</span></p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(fintechHubData.gaming_igaming.por_pais).map(([pais, data]: [string, any]) => (
                  <Card key={pais} className="bg-slate-900/90 border-slate-800/90 p-6 hover:border-purple-500/50 transition-colors shadow-lg">
                    <h3 className="text-xl font-bold capitalize mb-2 flex items-center justify-between text-white">
                      {pais}
                      {data.estado.includes('✅') && <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold">Regulado</Badge>}
                      {data.estado.includes('⚠️') && <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold">Gris / Transición</Badge>}
                      {data.estado.includes('❌') && <Badge className="bg-red-500/20 text-red-300 border-red-500/40 font-bold">Prohibido</Badge>}
                      {data.estado.includes('🔄') && <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 font-bold">Desarrollo</Badge>}
                    </h3>
                    <div className="space-y-3 mt-4 text-sm">
                      {data.regulador && <div className="flex justify-between"><span className="text-slate-400 font-medium">Regulador:</span><span className="font-semibold text-white text-right">{data.regulador}</span></div>}
                      {data.ley && <div className="flex justify-between"><span className="text-slate-400 font-medium">Ley:</span><span className="font-mono text-xs text-slate-200 text-right max-w-[60%] font-semibold">{data.ley}</span></div>}
                      {data.ggr_2026 && <div className="flex justify-between"><span className="text-slate-400 font-medium">GGR 2026:</span><span className="font-mono font-bold text-purple-300 text-base">{data.ggr_2026}</span></div>}
                      {data.tax && <div className="flex justify-between"><span className="text-slate-400 font-medium">Tax:</span><span className="font-semibold text-slate-200 text-right max-w-[70%]">{data.tax}</span></div>}
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "openfinance" && (
            <motion.div key="openfinance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-8 md:p-12 max-w-[1200px] mx-auto">
               <div className="mb-12">
                <Badge variant="outline" className="mb-4 border-emerald-500/40 text-emerald-300 bg-emerald-500/20 font-bold"><Network className="w-3.5 h-3.5 mr-2"/> Open Finance & Regulador</Badge>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Regulación Fintech & Sandboxes</h2>
              </div>
              
              <div className="overflow-x-auto rounded-2xl border border-slate-800/90 shadow-2xl bg-slate-950/80">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-cyan-500/30 bg-slate-900/90 text-cyan-300 font-mono text-xs uppercase tracking-wider">
                      <th className="py-4 font-bold px-5">País</th>
                      <th className="py-4 font-bold px-5">Open Finance</th>
                      <th className="py-4 font-bold px-5">Regulación / Ley</th>
                      <th className="py-4 font-bold px-5">Crypto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {Object.entries(fintechHubData.regulacion_fintech).map(([pais, data]: [string, any]) => (
                      <tr key={pais} className="hover:bg-slate-900/90 transition-colors">
                        <td className="py-5 font-extrabold text-white px-5 capitalize text-base">{pais.replace('_', ' ')}</td>
                        <td className="py-5 px-5">
                          <span className="text-xs text-slate-100 font-medium leading-relaxed block">{data.open_finance}</span>
                        </td>
                        <td className="py-5 px-5">
                          <span className="font-mono text-xs text-cyan-400 font-bold block mb-1">{data.regulador}</span>
                          <span className="text-xs font-semibold text-slate-200 block">{data.ley}</span>
                        </td>
                        <td className="py-5 px-5 text-xs text-slate-200 font-medium leading-relaxed">{data.crypto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "remesas" && (
            <motion.div key="remesas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-8 md:p-12 max-w-[1200px] mx-auto">
               <div className="mb-12">
                <Badge variant="outline" className="mb-4 border-blue-500/40 text-blue-300 bg-blue-500/20 font-bold"><Globe2 className="w-3.5 h-3.5 mr-2"/> Corredores de Remesas</Badge>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Remesas LATAM 2025-2026</h2>
                <p className="text-xl text-slate-300">Volumen Total: <span className="font-mono text-cyan-400 font-bold">{fintechHubData.remesas.volumen_total_2025}</span></p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Receptores */}
                <Card className="bg-slate-900/90 border-slate-800/90 p-8 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 text-white">Top Receptores</h3>
                  <div className="space-y-4">
                    {Object.entries(fintechHubData.remesas.top_receptores_2025).map(([pais, data]: [string, any]) => (
                      <div key={pais} className="flex items-center justify-between p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 hover:border-blue-500/40 transition-colors">
                        <div>
                          <p className="font-bold capitalize text-white text-base">{pais}</p>
                          <p className="text-xs text-slate-400 font-medium">{data.origen_principal}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-blue-300 text-xl">{data.monto}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="space-y-8">
                  {/* Crecimiento por subregion */}
                  <Card className="bg-slate-900/90 border-slate-800/90 p-8 shadow-xl">
                    <h3 className="text-xl font-bold mb-6 text-white">Crecimiento por Subregión</h3>
                    <div className="grid grid-cols-2 gap-4">
                       {Object.entries(fintechHubData.remesas.por_subregion_2025).map(([region, data]: [string, any]) => (
                         <div key={region} className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80">
                           <p className="text-xs text-slate-400 capitalize mb-1 font-semibold">{region}</p>
                           <p className="font-mono font-bold text-white text-lg mb-1">{data.monto}</p>
                           <Badge variant="outline" className={`${data.crecimiento.startsWith('+') ? 'text-emerald-300 border-emerald-500/40 bg-emerald-500/20 font-bold' : 'text-red-300 border-red-500/40 bg-red-500/20 font-bold'}`}>{data.crecimiento}</Badge>
                         </div>
                       ))}
                    </div>
                  </Card>
                  
                  {/* Tendencias */}
                  <Card className="bg-slate-900/90 border-slate-800/90 p-8 shadow-xl">
                    <h3 className="text-xl font-bold mb-4 text-white">Tendencias de Mercado</h3>
                    <ul className="space-y-3">
                      {fintechHubData.remesas.tendencias.map((tendencia: string, i: number) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                          <span className="text-slate-200 font-medium">{tendencia}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
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
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
        active 
          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
          : 'text-slate-200 hover:bg-slate-800/80 hover:text-white font-medium'
      }`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
      <span className="hidden md:block text-sm text-left">{label}</span>
    </button>
  );
}

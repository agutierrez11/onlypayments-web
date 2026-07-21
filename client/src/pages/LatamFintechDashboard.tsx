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
  Zap
} from "lucide-react";
import fintechHubData from "../data/fintechHubData.json";
import { EcosystemFlows } from "../components/EcosystemFlows";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

type Tab = "pagos" | "igaming" | "openfinance" | "remesas";

export default function LatamFintechDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("pagos");

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Dynamic Background Glows based on active tab */}
      <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ${
        activeTab === 'pagos' ? 'bg-accent/10' : 
        activeTab === 'igaming' ? 'bg-purple-500/10' : 
        activeTab === 'openfinance' ? 'bg-emerald-500/10' : 'bg-blue-500/10'
      }`} />
      
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 h-full bg-card/50 backdrop-blur-3xl border-r border-border/50 flex flex-col justify-between p-4 z-20 relative">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2 mt-4">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(var(--accent),0.4)]">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden md:block">
              <h1 className="font-extrabold text-lg leading-tight tracking-tight">LATAM Hub</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Radar 2026</p>
            </div>
          </div>

          <div className="space-y-2">
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
          </div>
        </div>
        
        <div className="hidden md:block p-4 rounded-2xl bg-secondary/30 border border-border/50 mb-4">
          <p className="text-xs font-mono text-muted-foreground mb-1 uppercase">Datos Mapeados</p>
          <p className="text-2xl font-black">{fintechHubData.meta.paises_mapeados} Países</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative z-10 scroll-smooth">
        <AnimatePresence mode="wait">
          {activeTab === "pagos" && (
            <motion.div key="pagos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <EcosystemFlows />
            </motion.div>
          )}

          {activeTab === "igaming" && (
            <motion.div key="igaming" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-8 md:p-12 max-w-[1200px] mx-auto">
              <div className="mb-12">
                <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400 bg-purple-500/10"><Gamepad2 className="w-3 h-3 mr-2"/> iGaming y Apuestas</Badge>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Mercado iGaming LATAM 2026</h2>
                <p className="text-xl text-muted-foreground">Volumen GGR proyectado: <span className="font-mono text-foreground font-bold">{fintechHubData.gaming_igaming.mercado_total_latam_2026}</span></p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(fintechHubData.gaming_igaming.por_pais).map(([pais, data]: [string, any]) => (
                  <Card key={pais} className="bg-card/40 backdrop-blur-lg border-border/50 p-6 hover:border-purple-500/30 transition-colors">
                    <h3 className="text-xl font-bold capitalize mb-2 flex items-center justify-between">
                      {pais}
                      {data.estado.includes('✅') && <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Regulado</Badge>}
                      {data.estado.includes('⚠️') && <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Gris / Transición</Badge>}
                      {data.estado.includes('❌') && <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Prohibido</Badge>}
                      {data.estado.includes('🔄') && <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Desarrollo</Badge>}
                    </h3>
                    <div className="space-y-3 mt-4 text-sm">
                      {data.regulador && <div className="flex justify-between"><span className="text-muted-foreground">Regulador:</span><span className="font-semibold text-right">{data.regulador}</span></div>}
                      {data.ley && <div className="flex justify-between"><span className="text-muted-foreground">Ley:</span><span className="font-mono text-xs text-right max-w-[60%]">{data.ley}</span></div>}
                      {data.ggr_2026 && <div className="flex justify-between"><span className="text-muted-foreground">GGR 2026:</span><span className="font-mono font-bold text-purple-400">{data.ggr_2026}</span></div>}
                      {data.tax && <div className="flex justify-between"><span className="text-muted-foreground">Tax:</span><span className="font-semibold text-right max-w-[70%]">{data.tax}</span></div>}
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "openfinance" && (
            <motion.div key="openfinance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-8 md:p-12 max-w-[1200px] mx-auto">
               <div className="mb-12">
                <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/10"><Network className="w-3 h-3 mr-2"/> Open Finance & Regulador</Badge>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Regulación Fintech & Sandboxes</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-border/50 text-muted-foreground font-mono text-xs uppercase tracking-wider">
                      <th className="pb-4 font-semibold px-4">País</th>
                      <th className="pb-4 font-semibold px-4">Open Finance</th>
                      <th className="pb-4 font-semibold px-4">Regulación / Ley</th>
                      <th className="pb-4 font-semibold px-4">Crypto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {Object.entries(fintechHubData.regulacion_fintech).map(([pais, data]: [string, any]) => (
                      <tr key={pais} className="hover:bg-secondary/40 transition-colors">
                        <td className="py-5 font-bold text-foreground px-4 capitalize">{pais.replace('_', ' ')}</td>
                        <td className="py-5 px-4">
                          <span className="text-xs">{data.open_finance}</span>
                        </td>
                        <td className="py-5 px-4">
                          <span className="font-mono text-xs text-muted-foreground block mb-1">{data.regulador}</span>
                          <span className="text-xs font-semibold">{data.ley}</span>
                        </td>
                        <td className="py-5 px-4 text-xs">{data.crypto}</td>
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
                <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"><Globe2 className="w-3 h-3 mr-2"/> Corredores de Remesas</Badge>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Remesas LATAM 2025-2026</h2>
                <p className="text-xl text-muted-foreground">Volumen Total: <span className="font-mono text-foreground font-bold">{fintechHubData.remesas.volumen_total_2025}</span></p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Receptores */}
                <Card className="bg-card/40 backdrop-blur-lg border-border/50 p-8">
                  <h3 className="text-2xl font-bold mb-6">Top Receptores</h3>
                  <div className="space-y-4">
                    {Object.entries(fintechHubData.remesas.top_receptores_2025).map(([pais, data]: [string, any]) => (
                      <div key={pais} className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50 hover:border-blue-500/30 transition-colors">
                        <div>
                          <p className="font-bold capitalize">{pais}</p>
                          <p className="text-xs text-muted-foreground">{data.origen_principal}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-blue-400 text-lg">{data.monto}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="space-y-8">
                  {/* Crecimiento por subregion */}
                  <Card className="bg-card/40 backdrop-blur-lg border-border/50 p-8">
                    <h3 className="text-xl font-bold mb-6">Crecimiento por Subregión</h3>
                    <div className="grid grid-cols-2 gap-4">
                       {Object.entries(fintechHubData.remesas.por_subregion_2025).map(([region, data]: [string, any]) => (
                         <div key={region} className="p-4 bg-background/50 rounded-xl border border-border/50">
                           <p className="text-xs text-muted-foreground capitalize mb-1">{region}</p>
                           <p className="font-mono font-bold text-lg mb-1">{data.monto}</p>
                           <Badge variant="outline" className={`${data.crecimiento.startsWith('+') ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' : 'text-red-400 border-red-400/30 bg-red-400/10'}`}>{data.crecimiento}</Badge>
                         </div>
                       ))}
                    </div>
                  </Card>
                  
                  {/* Tendencias */}
                  <Card className="bg-card/40 backdrop-blur-lg border-border/50 p-8">
                    <h3 className="text-xl font-bold mb-4">Tendencias de Mercado</h3>
                    <ul className="space-y-3">
                      {fintechHubData.remesas.tendencias.map((tendencia: string, i: number) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{tendencia}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

// ArrowLeftRight icon was missing from lucide-react import in this file scope, so I add a simple component
const ArrowLeftRight = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
);

function NavItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
        active 
          ? 'bg-accent/10 text-accent font-bold' 
          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
      }`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-accent' : ''}`} />
      <span className="hidden md:block text-sm text-left">{label}</span>
    </button>
  );
}

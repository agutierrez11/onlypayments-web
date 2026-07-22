import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Building2, Server, ShieldCheck, CheckCircle2, ChevronRight, Filter, Network, Fingerprint, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Provider {
  id: string;
  name: string;
  category: "gateway" | "adquirente" | "antifraude" | "orquestador" | "switch" | "identidad";
  tier: "enterprise" | "growth" | "startup";
  coverage: string[];
  features: string[];
  website: string;
}

const PROVIDERS_DB: Provider[] = [
  // --- GATEWAYS / AGREGADORES ---
  { id: "stripe", name: "Stripe", category: "gateway", tier: "enterprise", coverage: ["Global", "MX", "BR"], features: ["API First", "Suscripciones", "Connect"], website: "stripe.com" },
  { id: "dlocal", name: "dLocal", category: "gateway", tier: "enterprise", coverage: ["Latam", "APAC", "EMEA"], features: ["Cross-border", "Alternative Methods", "Payouts"], website: "dlocal.com" },
  { id: "ebanx", name: "EBANX", category: "gateway", tier: "enterprise", coverage: ["Latam", "África", "Asia"], features: ["Pix", "Cross-border", "Local Acquiring"], website: "ebanx.com" },
  { id: "kushki", name: "Kushki", category: "gateway", tier: "enterprise", coverage: ["Latam"], features: ["Adquirencia Regional", "Suscripciones", "Pay by Link"], website: "kushkipagos.com" },
  { id: "conekta", name: "Conekta", category: "gateway", tier: "growth", coverage: ["MX"], features: ["OXXO Pay", "SPEI", "Tarjetas"], website: "conekta.com" },
  { id: "openpay", name: "Openpay", category: "gateway", tier: "growth", coverage: ["MX", "CO", "PE"], features: ["Red Paynet", "Antifraude Básico", "Billetera"], website: "openpay.mx" },
  { id: "payu", name: "PayU", category: "gateway", tier: "enterprise", coverage: ["Latam", "Global"], features: ["Integraciones Locales", "Múltiples Monedas"], website: "payu.com" },
  { id: "adyen", name: "Adyen", category: "gateway", tier: "enterprise", coverage: ["Global", "MX", "BR"], features: ["Adquirencia Directa", "Omnicanalidad", "Risk Management"], website: "adyen.com" },
  { id: "mercadopago", name: "Mercado Pago", category: "gateway", tier: "growth", coverage: ["Latam"], features: ["Billetera", "Crédito", "Agregador"], website: "mercadopago.com" },
  { id: "clip", name: "Clip", category: "gateway", tier: "growth", coverage: ["MX"], features: ["Agregador", "Terminales Físicas", "Préstamos"], website: "clip.mx" },

  // --- ORQUESTADORES ---
  { id: "8b", name: "8b", category: "orquestador", tier: "enterprise", coverage: ["MX", "Latam"], features: ["Scan to Pay", "A2A Routing", "Zero Fees Base"], website: "8b.world" },
  { id: "yuno", name: "Yuno", category: "orquestador", tier: "enterprise", coverage: ["Global", "Latam"], features: ["Smart Routing", "1 Click Checkout", "Dashboard Unificado"], website: "yuno.co" },
  { id: "deuna", name: "DEUNA", category: "orquestador", tier: "growth", coverage: ["Latam"], features: ["One-Click Checkout", "Orquestación Latam", "Aumento de Conversión"], website: "deuna.com" },
  { id: "toku", name: "Toku", category: "orquestador", tier: "growth", coverage: ["CL", "MX", "Latam"], features: ["Recaudación Automática", "Suscripciones B2B", "Smart Routing"], website: "trytoku.com" },
  { id: "orkestapay", name: "OrkestaPay", category: "orquestador", tier: "startup", coverage: ["MX"], features: ["Smart Routing MX", "Agnóstico", "Switch Multi-Adquirente"], website: "orkestapay.com" },
  { id: "paynau", name: "Paynau", category: "orquestador", tier: "startup", coverage: ["MX", "Latam"], features: ["Multi-Gateway", "Links de Pago", "Checkout Unificado"], website: "paynau.com" },
  { id: "primer", name: "Primer", category: "orquestador", tier: "enterprise", coverage: ["Global"], features: ["Workflows Drag & Drop", "Agnóstico", "Fallbacks"], website: "primer.io" },
  { id: "spreedly", name: "Spreedly", category: "orquestador", tier: "enterprise", coverage: ["Global"], features: ["Bóveda PCI", "Network Tokens", "API Agnóstica"], website: "spreedly.com" },
  { id: "gr4vy", name: "Gr4vy", category: "orquestador", tier: "enterprise", coverage: ["Global"], features: ["Cloud Native", "Infraestructura Dedicada", "Smart Routing"], website: "gr4vy.com" },

  // --- IDENTIDAD & KYC ---
  { id: "unico", name: "Unico", category: "identidad", tier: "enterprise", coverage: ["BR", "Latam"], features: ["Biometría Facial", "ID Tech", "Firma Electrónica"], website: "unico.io" },
  { id: "truora", name: "Truora", category: "identidad", tier: "growth", coverage: ["Latam"], features: ["KYC/KYB", "WhatsApp Onboarding", "Background Checks"], website: "truora.com" },
  { id: "sumsub", name: "Sumsub", category: "identidad", tier: "enterprise", coverage: ["Global", "Latam"], features: ["Full-cycle KYC", "AML Screening", "Orquestación Identidad"], website: "sumsub.com" },
  { id: "incode", name: "Incode", category: "identidad", tier: "enterprise", coverage: ["Global", "MX"], features: ["Biometría Pasiva", "Liveness", "Reconocimiento Facial"], website: "incode.com" },

  // --- ANTI-FRAUDE ---
  { id: "clearsale", name: "ClearSale", category: "antifraude", tier: "enterprise", coverage: ["Global", "BR", "MX"], features: ["Machine Learning", "Revisión Manual", "Chargeback Guarantee"], website: "clear.sale" },
  { id: "signifyd", name: "Signifyd", category: "antifraude", tier: "enterprise", coverage: ["Global", "Latam"], features: ["Garantía de Contracargo", "Decisión Instantánea", "SCA"], website: "signifyd.com" },
  { id: "riskified", name: "Riskified", category: "antifraude", tier: "enterprise", coverage: ["Global", "Latam"], features: ["Chargeback Guarantee", "Policy Protect", "Deco"], website: "riskified.com" },
  { id: "fraudio", name: "Fraudio", category: "antifraude", tier: "growth", coverage: ["Global", "Latam"], features: ["AI Anti-Fraud", "Red Centralizada", "Fricción Cero"], website: "fraudio.com" },
  { id: "konduto", name: "Konduto", category: "antifraude", tier: "growth", coverage: ["BR", "Latam"], features: ["Comportamiento de Navegación", "Reglas Custom", "ML"], website: "konduto.com" },
  { id: "auco", name: "Auco", category: "antifraude", tier: "startup", coverage: ["Latam"], features: ["Prevención IA", "Análisis Transaccional", "Rules Engine"], website: "auco.ai" },
  { id: "sift", name: "Sift", category: "antifraude", tier: "enterprise", coverage: ["Global"], features: ["Digital Trust", "Account Takeover", "Dispute Management"], website: "sift.com" },
  { id: "bayonet", name: "Bayonet", category: "antifraude", tier: "startup", coverage: ["MX", "Latam"], features: ["Graph Network Latam", "Alertas Tempranas", "Reglas Flexibles"], website: "bayonet.io" },
  { id: "cybersource", name: "Cybersource", category: "antifraude", tier: "enterprise", coverage: ["Global"], features: ["Decision Manager", "Visa Network", "Reglas Complejas"], website: "cybersource.com" },

  // --- ADQUIRENTES DIRECTOS (Bancos/Procesadores Core) ---
  { id: "fiserv", name: "Fiserv", category: "adquirente", tier: "enterprise", coverage: ["Global", "Latam"], features: ["Procesamiento Core", "Terminales POS", "Omnicanalidad"], website: "fiserv.com" },
  { id: "getnet", name: "Getnet", category: "adquirente", tier: "enterprise", coverage: ["Latam", "Global"], features: ["Adquirencia Directa", "E-commerce", "POS"], website: "getnet.com" },
  { id: "niubiz", name: "Niubiz", category: "adquirente", tier: "enterprise", coverage: ["PE"], features: ["Adquirencia Perú", "Pago con DNI", "E-commerce"], website: "niubiz.com.pe" },
  { id: "transbank", name: "Transbank", category: "adquirente", tier: "enterprise", coverage: ["CL"], features: ["Webpay", "Adquirencia Chile", "POS"], website: "transbank.cl" },

  // --- SWITCHES / CÁMARAS DE COMPENSACIÓN ---
  { id: "prosa", name: "Prosa", category: "switch", tier: "enterprise", coverage: ["MX"], features: ["Cámara de Compensación", "Switch Transaccional", "ATM"], website: "prosa.com.mx" },
  { id: "eglobal", name: "E-Global", category: "switch", tier: "enterprise", coverage: ["MX"], features: ["Switch", "Procesamiento Emisor/Adquirente"], website: "eglobal.com.mx" },
];

const categoryColors = {
  gateway: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  adquirente: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  antifraude: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  orquestador: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  switch: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  identidad: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
};

const categoryIcons = {
  gateway: Server,
  adquirente: Building2,
  antifraude: ShieldCheck,
  orquestador: Globe,
  switch: Network,
  identidad: Fingerprint,
};

export function EcosystemDirectory() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProviders = useMemo(() => {
    return PROVIDERS_DB.filter(p => {
      const matchCat = activeCategory ? p.category === activeCategory : true;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="marketplace">
      
      {/* Luces de fondo estilo Flow Shader */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-6xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 text-xs font-mono">
              <Server className="w-3 h-3 mr-2" />
              SaaS MARKETPLACE
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              El Stack de Pagos Perfecto
            </h2>
            <p className="text-muted-foreground text-lg">
              Compara la infraestructura de pagos B2B. Encuentra tu Gateway, Adquirente o Motor Antifraude ideal.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filtrar proveedor o feature..." 
              className="w-full bg-card/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
              activeCategory === null 
                ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                : 'bg-slate-900 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:text-white'
            }`}
          >
            Todos
          </button>
          {(Object.keys(categoryColors) as Array<keyof typeof categoryColors>).map((cat) => {
            const Icon = categoryIcons[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border capitalize ${
                  activeCategory === cat 
                    ? categoryColors[cat] + " border-opacity-70 shadow-md font-extrabold" 
                    : 'bg-slate-900 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat}
              </button>
            )
          })}
        </div>

        {/* Compact List Layout */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {filteredProviders.map((provider) => {
              const CatIcon = categoryIcons[provider.category];
              return (
                <motion.div 
                  key={provider.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800/90 hover:border-cyan-500/50 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer relative overflow-hidden shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${categoryColors[provider.category]}`}>
                      <CatIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="font-extrabold text-lg text-white flex items-center gap-2">
                        {provider.name}
                        <a href={`https://${provider.website}`} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors opacity-0 group-hover:opacity-100 hidden md:flex items-center gap-1">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <span className="text-xs text-cyan-400 font-mono font-bold capitalize">{provider.category}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 flex-1 items-center">
                    {provider.features.map((f, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-200 font-medium">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 md:min-w-[170px] justify-end">
                    {provider.coverage.slice(0,2).map(c => (
                      <span key={c} className="text-xs uppercase font-bold text-slate-200 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/80 font-mono">{c}</span>
                    ))}
                    {provider.coverage.length > 2 && <span className="text-xs font-bold text-slate-400 font-mono">+{provider.coverage.length - 2}</span>}
                    <Badge 
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ml-2 ${
                        provider.tier === 'enterprise'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : provider.tier === 'growth'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      }`}
                    >
                      {provider.tier}
                    </Badge>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        
        {filteredProviders.length === 0 && (
          <div className="text-center py-24 text-muted-foreground glass-panel rounded-3xl mt-8">
            <Server className="w-16 h-16 mx-auto mb-6 opacity-20" />
            <h3 className="text-xl font-bold text-white mb-2">No se encontraron resultados</h3>
            <p className="text-white/50">Intenta con otros filtros o términos de búsqueda.</p>
          </div>
        )}

      </div>
    </section>
  );
}

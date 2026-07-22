import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Building2, Server, ShieldCheck, ChevronRight, Filter, Network, Fingerprint, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  gateway: "text-blue-600 bg-blue-100 border-blue-300",
  adquirente: "text-emerald-600 bg-emerald-100 border-emerald-300",
  antifraude: "text-rose-600 bg-rose-100 border-rose-300",
  orquestador: "text-purple-600 bg-purple-100 border-purple-300",
  switch: "text-amber-600 bg-amber-100 border-amber-300",
  identidad: "text-indigo-600 bg-indigo-100 border-indigo-300",
};

const categoryIcons = {
  gateway: Server,
  adquirente: Building2,
  antifraude: ShieldCheck,
  orquestador: Globe,
  switch: Network,
  identidad: Fingerprint,
};

const ITEMS_PER_PAGE = 6;

export function EcosystemDirectory() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProviders = useMemo(() => {
    return PROVIDERS_DB.filter(p => {
      const matchCat = activeCategory ? p.category === activeCategory : true;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProviders.length / ITEMS_PER_PAGE) || 1;

  const paginatedProviders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProviders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProviders, currentPage]);

  const handleCategoryChange = (cat: string | null) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <section className="py-16 scroll-mt-24 bg-slate-50 border-y border-slate-200 text-slate-900 relative overflow-hidden z-10 font-sans" id="explorador">
      
      {/* Luces de fondo sutiles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-6xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3 text-xs font-mono border-slate-300 bg-white text-cyan-800 font-extrabold">
              <Server className="w-3 h-3 mr-2 text-cyan-600" />
              SAAS MARKETPLACE
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-2 text-slate-900">
              El Stack de Pagos Perfecto
            </h2>
            <p className="text-slate-600 text-base font-medium">
              Compara la infraestructura de pagos B2B. Encuentra tu Gateway, Adquirente o Motor Antifraude ideal.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filtrar proveedor o feature..." 
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-600 shadow-xs transition-colors"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all border cursor-pointer ${
              activeCategory === null 
                ? 'bg-cyan-600 text-white border-cyan-700 shadow-xs' 
                : 'bg-white border-slate-300 text-slate-800 font-bold hover:bg-slate-100 hover:text-cyan-700'
            }`}
          >
            Todos ({PROVIDERS_DB.length})
          </button>
          {(Object.keys(categoryColors) as Array<keyof typeof categoryColors>).map((cat) => {
            const Icon = categoryIcons[cat];
            const count = PROVIDERS_DB.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition-all border capitalize cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-cyan-600 text-white border-cyan-700 shadow-xs' 
                    : 'bg-white border-slate-300 text-slate-800 font-bold hover:bg-slate-100 hover:text-cyan-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat} ({count})
              </button>
            )
          })}
        </div>

        {/* Compact List Layout (Paginated) */}
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="wait">
            {paginatedProviders.map((provider) => {
              const CatIcon = categoryIcons[provider.category];
              return (
                <motion.div 
                  key={provider.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-cyan-500 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer relative overflow-hidden shadow-xs hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-4 min-w-[210px]">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${categoryColors[provider.category]}`}>
                      <CatIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="font-black text-lg text-slate-900 flex items-center gap-2 tracking-tight">
                        {provider.name}
                        <a href={`https://${provider.website}`} target="_blank" rel="noreferrer" className="text-cyan-600 hover:text-cyan-700 transition-colors opacity-0 group-hover:opacity-100 hidden md:flex items-center gap-1">
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                      <span className="text-[10px] text-cyan-800 font-mono font-black uppercase tracking-wider">{provider.category}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 flex-1 items-center">
                    {provider.features.map((f, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-300 text-slate-800 font-bold">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 md:min-w-[180px] justify-end">
                    {provider.coverage.slice(0,2).map(c => (
                      <span key={c} className="text-[11px] uppercase font-black text-slate-900 bg-slate-200 px-2 py-0.5 rounded border border-slate-300 font-mono">{c}</span>
                    ))}
                    {provider.coverage.length > 2 && <span className="text-xs font-bold text-slate-600 font-mono">+{provider.coverage.length - 2}</span>}
                    <Badge 
                      className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md border ml-2 ${
                        provider.tier === 'enterprise'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : provider.tier === 'growth'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-sky-100 text-sky-900 border-sky-300'
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
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 mt-4 p-8">
            <Server className="w-12 h-12 mx-auto mb-3 text-slate-400" />
            <h3 className="text-lg font-black text-slate-900 mb-1">No se encontraron proveedores</h3>
            <p className="text-xs text-slate-600 font-medium">Intenta con otros filtros o términos de búsqueda.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-600 font-medium">
              Mostrando <span className="font-extrabold text-slate-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> - <span className="font-extrabold text-slate-900">{Math.min(currentPage * ITEMS_PER_PAGE, filteredProviders.length)}</span> de <span className="font-extrabold text-slate-900">{filteredProviders.length}</span> proveedores
            </p>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="gap-1 font-bold text-xs border-slate-300 text-slate-800 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Anterior
              </Button>

              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      currentPage === page
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="gap-1 font-bold text-xs border-slate-300 text-slate-800 disabled:opacity-40 cursor-pointer"
              >
                Siguiente <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

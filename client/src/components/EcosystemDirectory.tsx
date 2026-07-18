import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Building2, Server, ShieldCheck, CheckCircle2, ChevronRight, Filter, Network } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Provider {
  id: string;
  name: string;
  category: "gateway" | "adquirente" | "antifraude" | "orquestador" | "switch";
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
  { id: "primer", name: "Primer", category: "orquestador", tier: "enterprise", coverage: ["Global"], features: ["Workflows Drag & Drop", "Agnóstico", "Fallbacks"], website: "primer.io" },
  { id: "spreedly", name: "Spreedly", category: "orquestador", tier: "enterprise", coverage: ["Global"], features: ["Bóveda PCI", "Network Tokens", "API Agnóstica"], website: "spreedly.com" },
  { id: "gr4vy", name: "Gr4vy", category: "orquestador", tier: "enterprise", coverage: ["Global"], features: ["Cloud Native", "Infraestructura Dedicada", "Smart Routing"], website: "gr4vy.com" },

  // --- ANTI-FRAUDE ---
  { id: "clearsale", name: "ClearSale", category: "antifraude", tier: "enterprise", coverage: ["Global", "BR", "MX"], features: ["Machine Learning", "Revisión Manual", "Chargeback Guarantee"], website: "clear.sale" },
  { id: "signifyd", name: "Signifyd", category: "antifraude", tier: "enterprise", coverage: ["Global", "Latam"], features: ["Garantía de Contracargo", "Decisión Instantánea", "SCA"], website: "signifyd.com" },
  { id: "riskified", name: "Riskified", category: "antifraude", tier: "enterprise", coverage: ["Global", "Latam"], features: ["Chargeback Guarantee", "Policy Protect", "Deco"], website: "riskified.com" },
  { id: "konduto", name: "Konduto", category: "antifraude", tier: "growth", coverage: ["BR", "Latam"], features: ["Comportamiento de Navegación", "Reglas Custom", "ML"], website: "konduto.com" },
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
};

const categoryIcons = {
  gateway: Server,
  adquirente: Building2,
  antifraude: ShieldCheck,
  orquestador: Globe,
  switch: Network,
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
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              activeCategory === null 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/80'
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
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all border capitalize ${
                  activeCategory === cat 
                    ? categoryColors[cat] + " border-opacity-50 shadow-sm" 
                    : 'bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Icon className="w-3 h-3" />
                {cat}
              </button>
            )
          })}
        </div>

        {/* Data Table */}
        <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/30 text-muted-foreground text-xs uppercase tracking-wider whitespace-nowrap">
                <tr>
                  <th className="px-6 py-4 font-semibold">Proveedor</th>
                  <th className="px-6 py-4 font-semibold">Categoría</th>
                  <th className="px-6 py-4 font-semibold">Tier Target</th>
                  <th className="px-6 py-4 font-semibold">Cobertura</th>
                  <th className="px-6 py-4 font-semibold">Features Clave</th>
                  <th className="px-6 py-4 font-semibold text-right">Integración</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <AnimatePresence>
                  {filteredProviders.map((provider) => {
                    const CatIcon = categoryIcons[provider.category];
                    return (
                      <motion.tr 
                        key={provider.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="hover:bg-muted/20 transition-colors group"
                      >
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="font-bold text-base text-foreground">{provider.name}</div>
                          <div className="text-xs text-muted-foreground">{provider.website}</div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${categoryColors[provider.category]}`}>
                            <CatIcon className="w-3 h-3" />
                            {provider.category}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                           <Badge variant={provider.tier === 'enterprise' ? 'default' : 'secondary'} className="text-[10px] uppercase">
                             {provider.tier}
                           </Badge>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex gap-1">
                            {provider.coverage.map(c => (
                              <span key={c} className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">{c}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap items-center gap-4">
                            {provider.features.slice(0, 2).map((f, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-muted-foreground text-xs whitespace-nowrap">
                                <CheckCircle2 className="w-3 h-3 text-primary" />
                                {f}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                          <button className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-semibold text-xs transition-colors opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
                            Ver Documentación
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </tbody>
            </table>
            
            {filteredProviders.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Server className="w-12 h-12 mx-auto mb-4 opacity-20" />
                No se encontraron proveedores con ese filtro.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

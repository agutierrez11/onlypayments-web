import React, { useState, useMemo } from "react";
import { 
  Building2, 
  Search, 
  Zap, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Network, 
  Users, 
  Upload, 
  FileSpreadsheet, 
  RefreshCw, 
  Globe2, 
  Filter, 
  TrendingUp, 
  CreditCard,
  ChevronRight,
  Database,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { toast } from "sonner";

// Datos iniciales de demostración de decisores y conexiones de confianza
const DEMO_DECISION_MAKERS = [
  {
    id: "CONN-8941",
    company: "Rappi",
    companyCategory: "SuperApp / Marketplace",
    role: "Head of Payments & Fraud Strategy",
    normalizedRole: "ROLE_PAYMENTS_HEAD",
    country: "México",
    connectorName: "Carlos M. (Fintech Bar CDMX)",
    reputation: 4.95,
    community: "Fintech Bar MX",
    techStack: ["Adyen", "Cybersource", "Kount"],
    dataTrustWeight: 0.95,
    privacyHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    matchingScore: 0.98,
    status: "VERIFIED"
  },
  {
    id: "CONN-7210",
    company: "Nu México (Nubank)",
    companyCategory: "Neobanco / Credit",
    role: "VP of Treasury & Merchant Acquiring",
    normalizedRole: "ROLE_FINANCE_CFO",
    country: "México",
    connectorName: "Valeria S. (PayTech Circle)",
    reputation: 4.90,
    community: "PayTech Latam",
    techStack: ["Local Acquiring", "Mastercard Send"],
    dataTrustWeight: 0.92,
    privacyHash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    matchingScore: 0.94,
    status: "VERIFIED"
  },
  {
    id: "CONN-6302",
    company: "Kavak",
    companyCategory: "E-Commerce / Retail",
    role: "Lead Payments Engineer & Orchestration",
    normalizedRole: "ROLE_TECH_CTO",
    country: "México",
    connectorName: "Alejandro R.",
    reputation: 4.88,
    community: "Engineering Leads MX",
    techStack: ["Stripe", "Spreedly", "ClearSale"],
    dataTrustWeight: 0.89,
    privacyHash: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    matchingScore: 0.91,
    status: "VERIFIED"
  },
  {
    id: "CONN-5519",
    company: "Mercado Libre",
    companyCategory: "Marketplace / Fintech",
    role: "Director de Prevención de Fraude Latam",
    normalizedRole: "ROLE_PAYMENTS_HEAD",
    country: "Argentina",
    connectorName: "Martin G. (Fintech BA)",
    reputation: 4.98,
    community: "Fintech Argentina",
    techStack: ["Mercado Pago", "In-house AI Fraud"],
    dataTrustWeight: 0.96,
    privacyHash: "5891525b9d9c3038a9e48736367825d67926b48d281a8b0d2d3a958b14e9f3b6",
    matchingScore: 0.88,
    status: "VERIFIED"
  },
  {
    id: "CONN-4109",
    company: "dLocal",
    companyCategory: "PayTech / Cross-Border",
    role: "Head of FX & Settlement Optimization",
    normalizedRole: "ROLE_FINANCE_CFO",
    country: "Uruguay",
    connectorName: "Sofia B.",
    reputation: 4.92,
    community: "Montevideo Fintech Hub",
    techStack: ["A2A Rails", "RippleNet", "Local Banking APIs"],
    dataTrustWeight: 0.94,
    privacyHash: "a6c71c47a969f91a27e7f6f1c4ecb819f72b14421b93f0b2f7041a77484a0d9e",
    matchingScore: 0.86,
    status: "VERIFIED"
  },
  {
    id: "CONN-3890",
    company: "Clip",
    companyCategory: "SmartPOS / Adquirencia",
    role: "VP of Hardware & Point of Sale",
    normalizedRole: "ROLE_TECH_CTO",
    country: "México",
    connectorName: "Roberto L.",
    reputation: 4.85,
    community: "Fintech Founders MX",
    techStack: ["Android POS", "PAX", "Nexgo"],
    dataTrustWeight: 0.91,
    privacyHash: "6c28f328994a55fbbfeb52458a2d1d36d80d19b48c3b7a5a8f90c8856a90a36b",
    matchingScore: 0.85,
    status: "VERIFIED"
  }
];

export default function IntroduccionesB2B() {
  const [, navigate] = useLocation();

  // Estados de Búsqueda y Filtros
  const [searchIntent, setSearchIntent] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("TODOS");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState("TODOS");
  const [isSearching, setIsSearching] = useState(false);

  // Estados del Flujo de Introducción y Pago
  const [selectedIntro, setSelectedIntro] = useState<any | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Estado del Motor de Cruce de Bases (Data-Crossing CSV)
  const [rawUploadText, setRawUploadText] = useState(
    `Empresa,Cargo,País\nClip,VP of Hardware & POS,México\nNubank,Head of Treasury,Brasil\nKushki,VP Payments,Colombia\nUalá,Head of Fraud,Argentina`
  );
  const [isCrossingData, setIsCrossingData] = useState(false);
  const [crossedResults, setCrossedResults] = useState<any[] | null>(null);

  // Estado de Simulación Split Payouts Stripe Connect
  const [simulatedVolume, setSimulatedVolume] = useState<number>(10);

  // Estado del Enjambre OSINT Fallback
  const [osintQuery, setOsintQuery] = useState("Bitso Head of Compliance");
  const [osintRunning, setOsintRunning] = useState(false);
  const [osintLogs, setOsintLogs] = useState<string[]>([]);

  // Filtrado reactivo de conexiones
  const filteredDecisionMakers = useMemo(() => {
    return DEMO_DECISION_MAKERS.filter((item) => {
      const matchCategory =
        selectedCategoryFilter === "TODOS" ||
        item.companyCategory.toLowerCase().includes(selectedCategoryFilter.toLowerCase());
      const matchCountry =
        selectedCountryFilter === "TODOS" || item.country === selectedCountryFilter;
      const matchSearch =
        searchIntent.trim() === "" ||
        item.company.toLowerCase().includes(searchIntent.toLowerCase()) ||
        item.role.toLowerCase().includes(searchIntent.toLowerCase()) ||
        item.techStack.some((t) => t.toLowerCase().includes(searchIntent.toLowerCase())) ||
        item.connectorName.toLowerCase().includes(searchIntent.toLowerCase());

      return matchCategory && matchCountry && matchSearch;
    });
  }, [searchIntent, selectedCategoryFilter, selectedCountryFilter]);

  // Simulación de Búsqueda Semántica Híbrida
  const handleSemanticSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchIntent.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 600);
  };

  // Simulación de Data Crossing (Enriquecimiento B2B)
  const handleRunDataCrossing = () => {
    setIsCrossingData(true);
    setCrossedResults(null);
    setTimeout(() => {
      const lines = rawUploadText.trim().split("\n").slice(1);
      const processed = lines.map((line, idx) => {
        const parts = line.split(",");
        const company = parts[0]?.trim() || "Empresa";
        const role = parts[1]?.trim() || "Ejecutivo";
        const country = parts[2]?.trim() || "Latam";

        // Taxonomía IA simulada
        const isCfo = role.toLowerCase().includes("cfo") || role.toLowerCase().includes("finance") || role.toLowerCase().includes("treasury");
        const normalizedRole = isCfo ? "ROLE_FINANCE_CFO" : "ROLE_PAYMENTS_HEAD";
        const trustScore = (85 + (idx * 3) % 14) / 100;
        const hasConnector = idx % 2 === 0;

        return {
          id: `CROSS-${1000 + idx}`,
          company,
          role,
          country,
          normalizedRole,
          trustScore,
          hasConnector,
          connectorName: hasConnector ? `Conector Verificado (${country})` : "Enjambre OSINT Sugerido",
          matchStatus: hasConnector ? "MATCH_DIRECTO" : "ENJAMBRE_OSINT",
          estimatedIntroHours: hasConnector ? "< 2 hrs" : "< 12 hrs"
        };
      });
      setCrossedResults(processed);
      setIsCrossingData(false);
    }, 1000);
  };

  // Simulación de Enjambre Fallback OSINT Python
  const handleRunOsintSwarm = () => {
    setOsintRunning(true);
    setOsintLogs([
      "🚀 [REDIS QUEUE] Iniciando tarea asíncrona de Fallback OSINT...",
      `🔍 [DUCKDUCKGO] Consulta site:linkedin.com "${osintQuery}"`,
      "🌐 [BEAUTIFULSOUP] Extrayendo DOM y snippets de búsqueda...",
      "🧠 [GPT-4o-mini] Normalizando nombres, cargos y URLs de perfiles...",
      "✅ [GRAFO UPDATE] Perfil identificado y hash generado con éxito."
    ]);
    setTimeout(() => {
      setOsintRunning(false);
    }, 1200);
  };

  // Simular pago Pay-per-Intro
  const handleConfirmPayPerIntro = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F3F3F4] text-[#000000] font-sans pb-24">
      {/* HEADER TOP NAV */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#E5E6EA] px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-[1296px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 rounded-[8px] bg-[#0000EE] flex items-center justify-center text-white font-mono font-black text-xs">
              OP
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-[#000000]">
                OnlyPayments B2B
              </span>
              <span className="ml-2 text-xs font-mono px-2 py-0.5 rounded-[2px] bg-[#E5E6EA] text-[#0000EE] font-bold">
                Introducciones v4.0
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-bold">
            <button onClick={() => navigate('/')} className="text-[#000000] hover:text-[#0000EE] transition-colors duration-[0.12s]">
              Inicio
            </button>
            <button onClick={() => navigate('/stacks')} className="text-[#000000] hover:text-[#0000EE] transition-colors duration-[0.12s]">
              Stacks de Pago
            </button>
            <button onClick={() => navigate('/hardware-pos')} className="text-[#000000] hover:text-[#0000EE] transition-colors duration-[0.12s]">
              SmartPOS Radar
            </button>
            <button onClick={() => navigate('/latam-dashboard')} className="text-[#000000] hover:text-[#0000EE] transition-colors duration-[0.12s]">
              Radar Latam
            </button>
            <span className="text-[#0000EE] border-b-2 border-[#0000EE] pb-1">
              Introducciones B2B
            </span>
          </div>

          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="border-[#E5E6EA] bg-[#FFFFFF] hover:bg-[#F3F3F4] text-[#000000] text-xs font-bold rounded-[12px]"
          >
            Volver a la App Principal
          </Button>
        </div>
      </header>

      {/* HERO HERO SECTION */}
      <section className="relative pt-12 pb-14 px-4 sm:px-6 bg-[#FFFFFF] border-b border-[#E5E6EA]">
        <div className="max-w-[1296px] mx-auto text-center relative z-10">
          <span className="bg-[#E5E6EA] text-[#0000EE] px-3.5 py-1 text-xs font-mono font-bold mb-4 rounded-[2px] inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Marketplace de Introducciones Calificadas B2B
          </span>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#000000] mb-4 leading-[1.05]">
            Mapeo Semántico de Confianza & <br />
            <span className="text-[#0000EE]">
              Data-Crossing de Stacks de Pago
            </span>
          </h1>

          <p className="text-[#8B8F9A] text-base md:text-lg max-w-3xl mx-auto mb-8 leading-[1.15] font-normal">
            Elimina el cold outreach ineficiente. Conecta con CFOs y Heads of Payments de Latam a través de 
            conectores verificados de la comunidad con un modelo Pay-per-Intro de <strong className="text-[#000000]">$150 USD</strong> e incentivos Stripe Connect directos.
          </p>

          {/* METRICAS HIGHLIGHT */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            <Card className="bg-[#F3F3F4] border border-[#E5E6EA] p-4 text-center rounded-[12px] shadow-xs">
              <p className="text-2xl font-black font-mono text-[#0000EE]">1,480+</p>
              <p className="text-xs text-[#8B8F9A] font-bold mt-1">Decisores Mapeados</p>
            </Card>
            <Card className="bg-[#F3F3F4] border border-[#E5E6EA] p-4 text-center rounded-[12px] shadow-xs">
              <p className="text-2xl font-black font-mono text-emerald-700">70% ($105 USD)</p>
              <p className="text-xs text-[#8B8F9A] font-bold mt-1">Payout Directo al Conector</p>
            </Card>
            <Card className="bg-[#F3F3F4] border border-[#E5E6EA] p-4 text-center rounded-[12px] shadow-xs">
              <p className="text-2xl font-black font-mono text-[#0000EE]">&lt; 10 ms</p>
              <p className="text-xs text-[#8B8F9A] font-bold mt-1">Búsqueda HNSW + Vector</p>
            </Card>
            <Card className="bg-[#F3F3F4] border border-[#E5E6EA] p-4 text-center rounded-[12px] shadow-xs">
              <p className="text-2xl font-black font-mono text-amber-700">SHA-256</p>
              <p className="text-xs text-[#8B8F9A] font-bold mt-1">Grafo Zero-Knowledge</p>
            </Card>
          </div>

          {/* CAJA DE BUSQUEDA HIBRIDA SEMÁNTICA */}
          <form onSubmit={handleSemanticSearch} className="max-w-3xl mx-auto mb-4">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#8B8F9A]">
                <Search className="w-5 h-5" />
              </div>
              <Input
                value={searchIntent}
                onChange={(e) => setSearchIntent(e.target.value)}
                placeholder="Ej. Head of Payments en México con fricción en contracargos..."
                className="w-full bg-[#FFFFFF] border-2 border-[#E5E6EA] focus:border-[#0000EE] text-[#000000] pl-12 pr-36 py-6 rounded-[12px] text-sm shadow-xs transition-all duration-[0.12s]"
              />
              <Button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 bg-[#0000EE] hover:bg-[#0000BE] text-white px-5 py-4 rounded-[8px] font-bold text-xs flex items-center gap-2 transition-colors duration-[0.12s]"
              >
                {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-white" />}
                Buscar Match
              </Button>
            </div>
            <p className="text-xs text-[#8B8F9A] mt-2 text-left px-2 font-mono flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#0000EE]" />
              Motor activo: <span className="text-[#000000]">pgvector + fuzzystrmatch + Levenshtein (&lt;3 dist)</span>
            </p>
          </form>
        </div>
      </section>

      {/* SECCIÓN PRINCIPAL: PESTAÑAS INTERACTIVAS */}
      <main className="max-w-[1296px] mx-auto px-4 sm:px-6 mt-8">
        <Tabs defaultValue="directory" className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E6EA] pb-4">
            <TabsList className="bg-[#E5E6EA] border border-[#E5E6EA] p-1 rounded-[12px]">
              <TabsTrigger value="directory" className="data-[state=active]:bg-[#0000EE] data-[state=active]:text-white text-xs font-bold px-4 py-2 rounded-[8px] transition-all duration-[0.12s]">
                <Users className="w-4 h-4 mr-2 inline" />
                Directorio de Decisores
              </TabsTrigger>
              <TabsTrigger value="datacrossing" className="data-[state=active]:bg-[#0000EE] data-[state=active]:text-white text-xs font-bold px-4 py-2 rounded-[8px] transition-all duration-[0.12s]">
                <FileSpreadsheet className="w-4 h-4 mr-2 inline" />
                Motor Data-Crossing (CSV)
              </TabsTrigger>
              <TabsTrigger value="stripe" className="data-[state=active]:bg-[#0000EE] data-[state=active]:text-white text-xs font-bold px-4 py-2 rounded-[8px] transition-all duration-[0.12s]">
                <DollarSign className="w-4 h-4 mr-2 inline" />
                Dispersión Stripe Connect
              </TabsTrigger>
              <TabsTrigger value="osint" className="data-[state=active]:bg-[#0000EE] data-[state=active]:text-white text-xs font-bold px-4 py-2 rounded-[8px] transition-all duration-[0.12s]">
                <Cpu className="w-4 h-4 mr-2 inline" />
                Enjambre Fallback OSINT
              </TabsTrigger>
            </TabsList>

            <span className="text-xs text-[#8B8F9A] font-mono hidden md:inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Algoritmo RLHF Activo (v4.0)
            </span>
          </div>

          {/* TAB 1: DIRECTORIO Y MATCHING SEMANTICO DE DECISORES */}
          <TabsContent value="directory" className="space-y-6">
            {/* FILTROS LATERALES */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#FFFFFF] border border-[#E5E6EA] p-4 rounded-[12px]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-[#8B8F9A] font-bold">
                  <Filter className="w-4 h-4 text-[#0000EE]" />
                  Categoría:
                </div>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] text-xs rounded-[6px] px-3 py-1.5 focus:border-[#0000EE] focus:outline-none font-bold"
                >
                  <option value="TODOS">Todas las industrias</option>
                  <option value="SuperApp">SuperApp / Marketplace</option>
                  <option value="Neobanco">Neobancos / Fintech</option>
                  <option value="E-Commerce">E-Commerce / Retail</option>
                  <option value="PayTech">PayTech / Remesas</option>
                </select>

                <div className="flex items-center gap-2 text-xs text-[#8B8F9A] font-bold ml-4">
                  <Globe2 className="w-4 h-4 text-[#0000EE]" />
                  País:
                </div>
                <select
                  value={selectedCountryFilter}
                  onChange={(e) => setSelectedCountryFilter(e.target.value)}
                  className="bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] text-xs rounded-[6px] px-3 py-1.5 focus:border-[#0000EE] focus:outline-none font-bold"
                >
                  <option value="TODOS">Todos los países</option>
                  <option value="México">México</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Colombia">Colombia</option>
                </select>
              </div>

              <div className="text-xs font-mono text-[#8B8F9A]">
                Mostrando <span className="text-[#0000EE] font-bold">{filteredDecisionMakers.length}</span> conexiones verificadas
              </div>
            </div>

            {/* GRILLA DE DECISORES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDecisionMakers.map((item) => (
                <Card key={item.id} className="bg-[#FFFFFF] border border-[#E5E6EA] hover:border-[#0000EE] transition-all duration-[0.12s] p-6 rounded-[12px] flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-[#E5E6EA] text-[#000000] text-[10px] font-mono font-bold px-2 py-0.5 rounded-[2px]">
                        {item.country} • {item.companyCategory}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-[2px]">
                        Match {(item.matchingScore * 100).toFixed(0)}%
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[#000000] tracking-tight mb-1">
                      {item.company}
                    </h3>
                    <p className="text-sm text-[#8B8F9A] font-normal mb-4 leading-[1.15]">
                      {item.role}
                    </p>

                    <div className="space-y-2 mb-6 border-t border-b border-[#E5E6EA] py-3 text-xs">
                      <div className="flex justify-between text-[#8B8F9A]">
                        <span>Taxonomía IA:</span>
                        <span className="font-mono text-[#000000] font-bold">{item.normalizedRole}</span>
                      </div>
                      <div className="flex justify-between text-[#8B8F9A]">
                        <span>Conector en Grafo:</span>
                        <span className="text-[#000000] font-bold">{item.connectorName}</span>
                      </div>
                      <div className="flex justify-between text-[#8B8F9A]">
                        <span>Comunidad Origin:</span>
                        <span className="text-[#0000EE] font-bold">{item.community}</span>
                      </div>
                      <div className="flex justify-between text-[#8B8F9A]">
                        <span>Stack Detectado:</span>
                        <span className="text-[#000000]">{item.techStack.join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#8B8F9A] mb-3">
                      <span>Hash Privacidad:</span>
                      <span className="truncate max-w-[140px] text-[#000000]">{item.privacyHash}</span>
                    </div>

                    <button
                      onClick={() => setSelectedIntro(item)}
                      className="w-full bg-[#0000EE] hover:bg-[#0000BE] text-white font-bold text-xs py-3 rounded-[12px] flex items-center justify-center gap-2 cursor-pointer transition-colors duration-[0.12s]"
                    >
                      <span>Solicitar Introducción ($150 USD)</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: MOTOR DE ENRIQUECIMIENTO B2B (DATA-CROSSING) */}
          <TabsContent value="datacrossing" className="space-y-6">
            <Card className="bg-[#FFFFFF] border border-[#E5E6EA] p-6 rounded-[12px]">
              <div className="max-w-3xl mb-6">
                <h2 className="text-xl font-black text-[#000000] flex items-center gap-2 mb-2 tracking-tight">
                  <FileSpreadsheet className="w-5 h-5 text-[#0000EE]" />
                  Cruce Semántico de Bases B2B (Data-Crossing)
                </h2>
                <p className="text-sm text-[#8B8F9A] leading-[1.15]">
                  Sube o pega tu listado de prospectos/cuentas objetivo. Nuestro motor cruzará las empresas contra el Grafo de Confianza de OnlyPayments para identificar quién tiene la relación directa y el stack de pagos activo.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-mono font-bold text-[#8B8F9A] mb-2 block">
                    Formatos soportados: CSV, Nombres de Empresa + Rol (Separado por comas)
                  </label>
                  <textarea
                    value={rawUploadText}
                    onChange={(e) => setRawUploadText(e.target.value)}
                    rows={8}
                    className="w-full bg-[#F3F3F4] border border-[#E5E6EA] text-[#000000] font-mono text-xs p-4 rounded-[6px] focus:outline-none focus:border-[#0000EE] mb-4"
                  />

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={handleRunDataCrossing}
                      disabled={isCrossingData}
                      className="bg-[#0000EE] hover:bg-[#0000BE] text-white font-bold text-xs px-6 py-2.5 rounded-[12px] flex items-center gap-2 cursor-pointer transition-colors duration-[0.12s]"
                    >
                      {isCrossingData ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Ejecutar Data-Crossing con Grafo
                    </Button>
                    <span className="text-xs text-[#8B8F9A] font-mono">
                      Normalización Zero-Knowledge
                    </span>
                  </div>
                </div>

                {/* RESULTADOS DEL DATA-CROSSING */}
                <div>
                  <h3 className="text-sm font-bold text-[#000000] mb-3 flex items-center justify-between">
                    <span>Resultado del Cruce en Grafo</span>
                    {crossedResults && (
                      <span className="text-xs font-mono text-[#0000EE] font-bold">
                        {crossedResults.filter(r => r.hasConnector).length} / {crossedResults.length} Matches Encontrados
                      </span>
                    )}
                  </h3>

                  {!crossedResults && !isCrossingData && (
                    <div className="bg-[#F3F3F4] border border-dashed border-[#E5E6EA] rounded-[12px] p-8 text-center text-[#8B8F9A] text-xs">
                      Presiona "Ejecutar Data-Crossing" para visualizar los conectores y stacks mapeados.
                    </div>
                  )}

                  {isCrossingData && (
                    <div className="bg-[#F3F3F4] border border-[#E5E6EA] rounded-[12px] p-8 text-center text-[#000000] text-xs flex flex-col items-center gap-3">
                      <RefreshCw className="w-6 h-6 text-[#0000EE] animate-spin" />
                      Calculando similitud cosenoidal con Embeddings & Trigram Index...
                    </div>
                  )}

                  {crossedResults && !isCrossingData && (
                    <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                      {crossedResults.map((res) => (
                        <div key={res.id} className="bg-[#F3F3F4] border border-[#E5E6EA] p-3.5 rounded-[8px] flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-[#000000] flex items-center gap-2">
                              {res.company}
                              <Badge className={res.hasConnector ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-amber-100 text-amber-800 border-amber-200"}>
                                {res.matchStatus}
                              </Badge>
                            </div>
                            <p className="text-[#8B8F9A] text-[11px] mt-0.5">
                              {res.role} ({res.country})
                            </p>
                          </div>

                          <div className="text-right">
                            <div className="text-[#0000EE] font-bold">
                              {res.connectorName}
                            </div>
                            <div className="text-[10px] text-[#8B8F9A] font-mono">
                              Respuesta est. {res.estimatedIntroHours}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* TAB 3: DISPERSIÓN FINANCIERA STRIPE CONNECT */}
          <TabsContent value="stripe" className="space-y-6">
            <Card className="bg-[#FFFFFF] border border-[#E5E6EA] p-8 rounded-[12px] space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E6EA] pb-6">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-black text-[#000000] flex items-center gap-3 mb-2 tracking-tight">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                    Arquitectura Financiera de Split Payouts (Stripe Connect Express)
                  </h2>
                  <p className="text-sm text-[#8B8F9A] leading-[1.15]">
                    Cada introducción calificada se cobra a <strong className="text-[#000000]">$150.00 USD</strong> y se dispersa en el mismo milisegundo a la cuenta Express del conector, el fondo de la comunidad y el software OnlyPayments.
                  </p>
                </div>

                {/* Control Dinámico de Volumen de Intros */}
                <div className="bg-[#F3F3F4] border border-[#E5E6EA] p-3 rounded-[12px] flex items-center gap-3">
                  <span className="text-xs text-[#000000] font-bold">Volumen:</span>
                  <div className="flex items-center gap-1.5">
                    {[1, 5, 10, 25, 50].map((num) => (
                      <button
                        key={num}
                        onClick={() => setSimulatedVolume(num)}
                        className={`px-2.5 py-1 rounded-[6px] text-xs font-mono font-bold transition-all duration-[0.12s] cursor-pointer ${
                          simulatedVolume === num 
                            ? "bg-[#0000EE] text-white" 
                            : "bg-[#FFFFFF] text-[#000000] border border-[#E5E6EA]"
                        }`}
                      >
                        {num}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tarjetas de Desglose en Vivo */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-[#F3F3F4] border border-[#E5E6EA] p-5 rounded-[12px]">
                  <div className="text-[11px] font-mono text-[#8B8F9A] mb-1 uppercase font-bold">Facturación Bruta ({simulatedVolume} intros)</div>
                  <div className="text-2xl font-black text-[#000000] font-mono mb-1">
                    ${(simulatedVolume * 150).toLocaleString()} USD
                  </div>
                  <p className="text-[10px] text-[#8B8F9A]">
                    Cobrado vía Stripe PaymentIntent.
                  </p>
                </Card>

                <Card className="bg-[#F3F3F4] border border-[#E5E6EA] p-5 rounded-[12px]">
                  <div className="text-[11px] font-mono text-emerald-700 mb-1 uppercase font-bold">70% Dispersión Conector</div>
                  <div className="text-2xl font-black text-emerald-700 font-mono mb-1">
                    ${(simulatedVolume * 105).toLocaleString()} USD
                  </div>
                  <p className="text-[10px] text-[#8B8F9A]">
                    Al miembro custodio tras confirmar 15 min.
                  </p>
                </Card>

                <Card className="bg-[#F3F3F4] border border-[#E5E6EA] p-5 rounded-[12px]">
                  <div className="text-[11px] font-mono text-[#0000EE] mb-1 uppercase font-bold">15% Fondo Comunidad</div>
                  <div className="text-2xl font-black text-[#0000EE] font-mono mb-1">
                    ${(simulatedVolume * 22.5).toLocaleString()} USD
                  </div>
                  <p className="text-[10px] text-[#8B8F9A]">
                    Caja del grupo o hub partner.
                  </p>
                </Card>

                <Card className="bg-[#F3F3F4] border border-[#E5E6EA] p-5 rounded-[12px]">
                  <div className="text-[11px] font-mono text-[#000000] mb-1 uppercase font-bold">15% Software Fee</div>
                  <div className="text-2xl font-black text-[#000000] font-mono mb-1">
                    ${(simulatedVolume * 22.5).toLocaleString()} USD
                  </div>
                  <p className="text-[10px] text-[#8B8F9A]">
                    Mantenimiento de infraestructura y API.
                  </p>
                </Card>
              </div>

              {/* Generador de Plantillas de Outreach MEDDIC (1 Clic) */}
              <div className="p-6 rounded-[12px] bg-[#F3F3F4] border border-[#E5E6EA] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E6EA] pb-3">
                  <div>
                    <h3 className="font-black text-[#000000] text-base flex items-center gap-2 tracking-tight">
                      <Sparkles className="w-4 h-4 text-[#0000EE]" />
                      Calificador MEDDIC & Generador de Outreach de 1 Clic
                    </h3>
                    <p className="text-xs text-[#8B8F9A]">
                      Plantillas ejecutivas optimizadas para que el conector introduzca tu solución por WhatsApp o Email sin fricción.
                    </p>
                  </div>
                  <span className="bg-[#E5E6EA] text-[#0000EE] font-mono text-[10px] font-bold px-2 py-0.5 rounded-[2px] self-start sm:self-auto">
                    SPICED / MEDDIC
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Plantilla WhatsApp */}
                  <div className="p-4 rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800 text-xs flex items-center gap-1.5">
                        💬 Formato WhatsApp Ejecutivo
                      </span>
                      <button
                        onClick={() => {
                          const text = `Hola [Nombre Decisor], espero que todo vaya excelente. Te escribo rápido porque sé que en [Empresa] están optimizando sus costos de adquirencia y contracargos. Un partner verificado de OnlyPayments con excelente reputación en la comunidad quiere presentarte una propuesta concreta que reduce comisiones en [País]. ¿Te parece si les abro un puente de 15 minutos esta semana?`;
                          navigator.clipboard.writeText(text);
                          toast.success("¡Plantilla de WhatsApp copiada al portapapeles!");
                        }}
                        className="text-[11px] px-3 py-1 rounded-[6px] bg-[#E5E6EA] text-[#000000] hover:bg-[#0000EE] hover:text-white font-bold transition-colors duration-[0.12s] cursor-pointer"
                      >
                        Copiar WhatsApp
                      </button>
                    </div>
                    <p className="text-xs text-[#000000] font-mono bg-[#F3F3F4] p-3 rounded-[6px] leading-relaxed border border-[#E5E6EA]">
                      "Hola [Nombre], te escribo rápido porque un partner de confianza de OnlyPayments tiene una solución para reducir tasas de adquirencia en [País]. ¿Te abro un puente de 15 min esta semana?"
                    </p>
                  </div>

                  {/* Plantilla Email / LinkedIn */}
                  <div className="p-4 rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0000EE] text-xs flex items-center gap-1.5">
                        ✉️ Formato Email / Nota LinkedIn
                      </span>
                      <button
                        onClick={() => {
                          const text = `Asunto: Introducción calificada — Optimización de Rieles de Pago\n\nEstimado/a [Nombre],\n\nA través de la red de OnlyPayments, hemos identificado una sinergia técnica para mitigar la fricción de pagos locales en su operación. Nos gustaría coordinar una llamada ejecutiva de 15 minutos para compartir métricas de aprobación.\n\nSaludos cordiales,\n[Conector Verificado]`;
                          navigator.clipboard.writeText(text);
                          toast.success("¡Plantilla de Email copiada al portapapeles!");
                        }}
                        className="text-[11px] px-3 py-1 rounded-[6px] bg-[#E5E6EA] text-[#000000] hover:bg-[#0000EE] hover:text-white font-bold transition-colors duration-[0.12s] cursor-pointer"
                      >
                        Copiar Email
                      </button>
                    </div>
                    <p className="text-xs text-[#000000] font-mono bg-[#F3F3F4] p-3 rounded-[6px] leading-relaxed border border-[#E5E6EA]">
                      "Asunto: Intro calificada — Optimización de Rieles de Pago. Sinergia técnica para mitigar fricción y contracargos en LATAM..."
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* TAB 4: ENJAMBRE FALLBACK OSINT */}
          <TabsContent value="osint" className="space-y-6">
            <Card className="bg-[#FFFFFF] border border-[#E5E6EA] p-8 rounded-[12px]">
              <div className="max-w-3xl mb-6">
                <h2 className="text-2xl font-black text-[#000000] flex items-center gap-3 mb-2 tracking-tight">
                  <Cpu className="w-6 h-6 text-[#0000EE]" />
                  Enjambre OSINT Fallback (Python Scraping + LLM Organigram)
                </h2>
                <p className="text-sm text-[#8B8F9A] leading-[1.15]">
                  Cuando la base local no devuelve coincidencias directas (NOT_FOUND), la cola de Redis activa un enjambre de raspado autónomo que busca en la web y extrae el organigrama actual.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={osintQuery}
                      onChange={(e) => setOsintQuery(e.target.value)}
                      placeholder="Empresa o Cargo..."
                      className="bg-[#F3F3F4] border border-[#E5E6EA] text-[#000000] font-mono text-xs rounded-[6px]"
                    />
                    <Button
                      onClick={handleRunOsintSwarm}
                      disabled={osintRunning}
                      className="bg-[#0000EE] hover:bg-[#0000BE] text-white font-bold text-xs px-5 rounded-[6px] transition-colors duration-[0.12s]"
                    >
                      {osintRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Ejecutar Enjambre"}
                    </Button>
                  </div>

                  <div className="bg-[#F3F3F4] border border-[#E5E6EA] p-4 rounded-[8px] text-xs font-mono text-[#8B8F9A] space-y-2">
                    <p className="text-[#000000] font-bold mb-1">Módulos Python en ejecución:</p>
                    <p>• <span className="text-[#0000EE] font-bold">requests + BeautifulSoup</span> - DuckDuckGo / Bing Search parser</p>
                    <p>• <span className="text-[#0000EE] font-bold">OpenAI gpt-4o-mini</span> - Extractor de organigrama B2B JSON</p>
                    <p>• <span className="text-emerald-700 font-bold">Redis Celery Queue</span> - Ejecución asíncrona no bloqueante</p>
                  </div>
                </div>

                {/* LOGS DE EJECUCIÓN DEL ENJAMBRE */}
                <div className="bg-[#F3F3F4] border border-[#E5E6EA] p-5 rounded-[8px] font-mono text-xs flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#000000] mb-3 flex items-center justify-between border-b border-[#E5E6EA] pb-2">
                      <span>Consola de Salida Enjambre (Worker #1)</span>
                      {osintRunning && <span className="text-[#0000EE] font-bold animate-pulse">PROCESANDO...</span>}
                    </div>

                    <div className="space-y-2 min-h-[140px]">
                      {osintLogs.length === 0 ? (
                        <p className="text-[#8B8F9A] italic">Esperando inicio de simulación...</p>
                      ) : (
                        osintLogs.map((log, i) => (
                          <div key={i} className="text-[#000000] leading-relaxed">
                            {log}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* MODAL DE SOLICITUD DE INTRO & PAGO */}
      {selectedIntro && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="bg-[#FFFFFF] border border-[#E5E6EA] max-w-lg w-full p-6 rounded-[12px] shadow-2xl relative text-[#000000]">
            <button
              onClick={() => { setSelectedIntro(null); setPaymentSuccess(false); }}
              className="absolute top-4 right-4 text-[#8B8F9A] hover:text-[#000000] cursor-pointer"
            >
              ✕
            </button>

            {!paymentSuccess ? (
              <>
                <span className="bg-[#E5E6EA] text-[#0000EE] font-mono font-bold mb-3 text-[10px] px-2 py-0.5 rounded-[2px] inline-block">
                  Confirmación Pay-per-Intro
                </span>
                <h3 className="text-xl font-black text-[#000000] mb-1 tracking-tight">
                  Introducción con {selectedIntro.company}
                </h3>
                <p className="text-xs text-[#8B8F9A] mb-4">
                  {selectedIntro.role} • Conector: <strong className="text-[#000000]">{selectedIntro.connectorName}</strong>
                </p>

                <div className="bg-[#F3F3F4] border border-[#E5E6EA] p-4 rounded-[8px] text-xs space-y-2 mb-6 font-mono">
                  <div className="flex justify-between text-[#8B8F9A]">
                    <span>Costo total:</span>
                    <span className="text-[#000000] font-bold">$150.00 USD</span>
                  </div>
                  <div className="flex justify-between text-[#8B8F9A]">
                    <span>Dispersión Conector (70%):</span>
                    <span className="text-emerald-700 font-bold">$105.00 USD</span>
                  </div>
                  <div className="flex justify-between text-[#8B8F9A]">
                    <span>Garantía de Llamada:</span>
                    <span className="text-[#0000EE] font-bold">15 min o reembolso</span>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmPayPerIntro}
                  disabled={isProcessingPayment}
                  className="w-full bg-[#0000EE] hover:bg-[#0000BE] text-white font-bold text-xs py-5 rounded-[12px] flex items-center justify-center gap-2 cursor-pointer transition-colors duration-[0.12s]"
                >
                  {isProcessingPayment ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Procesando Stripe PaymentIntent & Split...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Confirmar Pago de $150.00 USD
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#000000] mb-2 tracking-tight">¡Introducción Solicitada!</h3>
                <p className="text-xs text-[#8B8F9A] max-w-sm mx-auto mb-6 leading-[1.15]">
                  Se ha generado la transferencia automatizada en Stripe Connect para {selectedIntro.connectorName}. Recibirás la invitación de calendario en menos de 2 horas.
                </p>
                <Button
                  onClick={() => { setSelectedIntro(null); setPaymentSuccess(false); }}
                  className="bg-[#0000EE] hover:bg-[#0000BE] text-white text-xs font-bold px-6 py-2.5 rounded-[12px] cursor-pointer transition-colors duration-[0.12s]"
                >
                  Cerrar
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

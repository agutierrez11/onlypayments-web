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
    id: "CONN-4108",
    company: "Clip",
    companyCategory: "POS / Acquiring",
    role: "Chief Financial Officer (CFO)",
    normalizedRole: "ROLE_FINANCE_CFO",
    country: "México",
    connectorName: "Sofia L. (Ex-Clip)",
    reputation: 4.92,
    community: "CFO Circle Latam",
    techStack: ["Visa Direct", "Prosa", "BBVA Rail"],
    dataTrustWeight: 0.91,
    privacyHash: "e10713959142f3607f6f571340b15354924c7f0775d7966774620f4c39832c3f",
    matchingScore: 0.86,
    status: "VERIFIED"
  },
  {
    id: "CONN-3991",
    company: "dLocal",
    companyCategory: "PayTech / Cross-Border",
    role: "VP of Enterprise Merchant Solutions",
    normalizedRole: "ROLE_PAYMENTS_HEAD",
    country: "Uruguay",
    connectorName: "Gonzalo P.",
    reputation: 4.85,
    community: "CrossBorder Latam",
    techStack: ["dLocal Go", "Local Rail Routing"],
    dataTrustWeight: 0.87,
    privacyHash: "8677c770c36746cf5903901b0f55cf643f80c651167448c582570059c0d64389",
    matchingScore: 0.84,
    status: "VERIFIED"
  }
];

// Muestras para el cargador masivo (Data Crossing)
const SAMPLE_CSV_DATA = `Company,Role,Country
Bitso,Head of Compliance & AML,México
Kushki,Director of Merchant Acquiring,Ecuador
Belo,Chief Product Officer,Argentina
Bold,Lead Risk Analyst,Colombia
Platanus,Partner & Angel Investor,Chile
Tiendanube,VP of Checkout & Conversion,Brasil`;

export default function IntroduccionesB2B() {
  const [, navigate] = useLocation();

  // Búsqueda Semántica de Intención
  const [searchIntent, setSearchIntent] = useState("CFO o Head of Payments de e-commerce en México con contracargos altos");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("TODOS");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState("TODOS");
  const [isSearching, setIsSearching] = useState(false);
  const [searchExecuted, setSearchExecuted] = useState(true);

  // Modal / Proceso de Solicitud de Intro
  const [selectedIntro, setSelectedIntro] = useState<typeof DEMO_DECISION_MAKERS[0] | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Data Crossing Simulator
  const [rawUploadText, setRawUploadText] = useState(SAMPLE_CSV_DATA);
  const [isCrossingData, setIsCrossingData] = useState(false);
  const [crossedResults, setCrossedResults] = useState<any[] | null>(null);

  // Fallback OSINT Swarm Simulation Log
  const [osintQuery, setOsintQuery] = useState("Adyen CFO Mexico");
  const [osintRunning, setOsintRunning] = useState(false);
  const [osintLogs, setOsintLogs] = useState<string[]>([]);

  // Filtrado de decisores en la tabla
  const filteredDecisionMakers = useMemo(() => {
    return DEMO_DECISION_MAKERS.filter(item => {
      const matchCat = selectedCategoryFilter === "TODOS" || item.companyCategory.includes(selectedCategoryFilter);
      const matchCountry = selectedCountryFilter === "TODOS" || item.country === selectedCountryFilter;
      return matchCat && matchCountry;
    });
  }, [selectedCategoryFilter, selectedCountryFilter]);

  // Manejo de búsqueda semántica híbrida
  const handleSemanticSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchExecuted(true);
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
    }, 1200);
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
    }, 1500);
  };

  // Simular pago Pay-per-Intro
  const handleConfirmPayPerIntro = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans pb-24 selection:bg-cyan-500 selection:text-black">
      {/* HEADER TOP NAV */}
      <header className="sticky top-0 z-50 bg-[#050811]/90 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Network className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                OnlyPayments B2B
              </span>
              <span className="ml-2 text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                Introducciones v4.0
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white transition">
              Inicio
            </button>
            <button onClick={() => navigate('/stacks')} className="text-slate-400 hover:text-white transition">
              Stacks de Pago
            </button>
            <button onClick={() => navigate('/latam-dashboard')} className="text-slate-400 hover:text-white transition">
              Radar Finnovista
            </button>
            <button onClick={() => navigate('/diccionario')} className="text-slate-400 hover:text-white transition">
              Diccionario
            </button>
            <span className="text-cyan-400 border-b-2 border-cyan-400 pb-1 font-semibold">
              Introducciones B2B
            </span>
          </div>

          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-xs font-medium"
          >
            Volver a la App Principal
          </Button>
        </div>
      </header>

      {/* HERO HERO SECTION */}
      <section className="relative pt-12 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-3 py-1 text-xs font-mono mb-4 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Marketplace de Introducciones Calificadas B2B
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Mapeo Semántico de Confianza & <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Data-Crossing de Stacks de Pago
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            Elimina el cold outreach ineficiente. Conecta con CFOs y Heads of Payments de Latam a través de 
            conectores verificados de la comunidad con un modelo Pay-per-Intro de <strong className="text-cyan-300">$150 USD</strong> e incentivos Stripe Connect directos.
          </p>

          {/* METRICAS HIGHLIGHT */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <Card className="bg-slate-900/60 border-slate-800/80 p-4 text-center backdrop-blur-md">
              <p className="text-2xl font-bold font-mono text-cyan-400">1,480+</p>
              <p className="text-xs text-slate-400 font-medium">Decisores Mapeados</p>
            </Card>
            <Card className="bg-slate-900/60 border-slate-800/80 p-4 text-center backdrop-blur-md">
              <p className="text-2xl font-bold font-mono text-emerald-400">70% ($105 USD)</p>
              <p className="text-xs text-slate-400 font-medium">Payout Directo al Conector</p>
            </Card>
            <Card className="bg-slate-900/60 border-slate-800/80 p-4 text-center backdrop-blur-md">
              <p className="text-2xl font-bold font-mono text-indigo-400">&lt; 10 ms</p>
              <p className="text-xs text-slate-400 font-medium">Búsqueda HNSW + Vector</p>
            </Card>
            <Card className="bg-slate-900/60 border-slate-800/80 p-4 text-center backdrop-blur-md">
              <p className="text-2xl font-bold font-mono text-amber-400">SHA-256</p>
              <p className="text-xs text-slate-400 font-medium">Grafo Zero-Knowledge</p>
            </Card>
          </div>

          {/* CAJA DE BUSQUEDA HIBRIDA SEMÁNTICA */}
          <form onSubmit={handleSemanticSearch} className="max-w-3xl mx-auto mb-6">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-cyan-400">
                <Search className="w-5 h-5" />
              </div>
              <Input
                value={searchIntent}
                onChange={(e) => setSearchIntent(e.target.value)}
                placeholder="Ej. Head of Payments en México con fricción en contracargos..."
                className="w-full bg-slate-900/90 border-2 border-slate-700/80 focus:border-cyan-500 text-white pl-12 pr-36 py-7 rounded-2xl text-sm shadow-2xl backdrop-blur-xl transition"
              />
              <Button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white px-6 py-5 rounded-xl font-medium text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25"
              >
                {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-white" />}
                Buscar Match
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-left px-2 font-mono flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Motor activo: <span className="text-slate-300">pgvector + fuzzystrmatch + Levenshtein (&lt;3 dist)</span>
            </p>
          </form>
        </div>
      </section>

      {/* SECCIÓN PRINCIPAL: PESTAÑAS INTERACTIVAS DE FUNCIONALIDADES B2B */}
      <main className="max-w-7xl mx-auto px-6">
        <Tabs defaultValue="directory" className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <TabsList className="bg-slate-900/80 border border-slate-800 p-1 rounded-xl">
              <TabsTrigger value="directory" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black text-xs font-semibold px-4 py-2.5 rounded-lg">
                <Users className="w-4 h-4 mr-2 inline" />
                Directorio de Decisores
              </TabsTrigger>
              <TabsTrigger value="datacrossing" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black text-xs font-semibold px-4 py-2.5 rounded-lg">
                <FileSpreadsheet className="w-4 h-4 mr-2 inline" />
                Motor Data-Crossing (CSV)
              </TabsTrigger>
              <TabsTrigger value="stripe" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black text-xs font-semibold px-4 py-2.5 rounded-lg">
                <DollarSign className="w-4 h-4 mr-2 inline" />
                Dispersión Stripe Connect
              </TabsTrigger>
              <TabsTrigger value="osint" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black text-xs font-semibold px-4 py-2.5 rounded-lg">
                <Cpu className="w-4 h-4 mr-2 inline" />
                Enjambre Fallback OSINT
              </TabsTrigger>
            </TabsList>

            <span className="text-xs text-slate-400 font-mono hidden md:inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Algoritmo RLHF Activo (v4.0)
            </span>
          </div>

          {/* TAB 1: DIRECTORIO Y MATCHING SEMANTICO DE DECISORES */}
          <TabsContent value="directory" className="space-y-6">
            {/* FILTROS LATERALES */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Filter className="w-4 h-4 text-cyan-400" />
                  Categoría:
                </div>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
                >
                  <option value="TODOS">Todas las industrias</option>
                  <option value="SuperApp">SuperApp / Marketplace</option>
                  <option value="Neobanco">Neobancos / Fintech</option>
                  <option value="E-Commerce">E-Commerce / Retail</option>
                  <option value="PayTech">PayTech / Remesas</option>
                </select>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium ml-4">
                  <Globe2 className="w-4 h-4 text-indigo-400" />
                  País:
                </div>
                <select
                  value={selectedCountryFilter}
                  onChange={(e) => setSelectedCountryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
                >
                  <option value="TODOS">Todos los países</option>
                  <option value="México">México</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Colombia">Colombia</option>
                </select>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Mostrando <span className="text-cyan-400 font-bold">{filteredDecisionMakers.length}</span> conexiones verificadas
              </div>
            </div>

            {/* GRILLA DE DECISORES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDecisionMakers.map((item) => (
                <Card key={item.id} className="bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 transition-all p-6 rounded-2xl flex flex-col justify-between group backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-cyan-950 text-cyan-400 border-cyan-800/60 text-[10px] font-mono">
                        {item.country} • {item.companyCategory}
                      </Badge>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        Match {(item.matchingScore * 100).toFixed(0)}%
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition flex items-center gap-2">
                      {item.company}
                    </h3>
                    <p className="text-sm text-slate-300 font-medium mb-4 mt-1">
                      {item.role}
                    </p>

                    <div className="space-y-2 mb-6 border-t border-b border-slate-800/80 py-3 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Taxonomía IA:</span>
                        <span className="font-mono text-slate-200">{item.normalizedRole}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Conector en Grafo:</span>
                        <span className="text-slate-200 font-medium">{item.connectorName}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Comunidad Origin:</span>
                        <span className="text-cyan-400 font-medium">{item.community}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Stack Detectado:</span>
                        <span className="text-slate-300">{item.techStack.join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-3">
                      <span>Hash Privacidad:</span>
                      <span className="truncate max-w-[140px]">{item.privacyHash}</span>
                    </div>

                    <Button
                      onClick={() => setSelectedIntro(item)}
                      className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-xs py-5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-cyan-500/10"
                    >
                      Solicitar Introducción Calificada ($150 USD)
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: MOTOR DE ENRIQUECIMIENTO B2B (DATA-CROSSING) */}
          <TabsContent value="datacrossing" className="space-y-6">
            <Card className="bg-slate-900/60 border-slate-800 p-6 rounded-2xl backdrop-blur-md">
              <div className="max-w-3xl mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                  <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
                  Cruce Semántico de Bases B2B (Data-Crossing)
                </h2>
                <p className="text-sm text-slate-300">
                  Sube o pega tu listado de prospectos/cuentas objetivo. Nuestro motor cruzará las empresas contra el Grafo de Confianza de OnlyPayments para identificar quién tiene la relación directa y el stack de pagos activo.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-mono text-slate-400 mb-2 block">
                    Formatos soportados: CSV, Nombres de Empresa + Rol (Separado por comas)
                  </label>
                  <textarea
                    value={rawUploadText}
                    onChange={(e) => setRawUploadText(e.target.value)}
                    rows={8}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs p-4 rounded-xl focus:outline-none focus:border-cyan-500 mb-4"
                  />

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={handleRunDataCrossing}
                      disabled={isCrossingData}
                      className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs px-6 py-5 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                    >
                      {isCrossingData ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Ejecutar Data-Crossing con Grafo
                    </Button>
                    <span className="text-xs text-slate-500 font-mono">
                      Normalización Zero-Knowledge
                    </span>
                  </div>
                </div>

                {/* RESULTADOS DEL DATA-CROSSING */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center justify-between">
                    <span>Resultado del Cruce en Grafo</span>
                    {crossedResults && (
                      <span className="text-xs font-mono text-cyan-400">
                        {crossedResults.filter(r => r.hasConnector).length} / {crossedResults.length} Matches Encontrados
                      </span>
                    )}
                  </h3>

                  {!crossedResults && !isCrossingData && (
                    <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-8 text-center text-slate-500 text-xs">
                      Presiona "Ejecutar Data-Crossing" para visualizar los conectores y stacks mapeados.
                    </div>
                  )}

                  {isCrossingData && (
                    <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-8 text-center text-slate-300 text-xs flex flex-col items-center gap-3">
                      <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
                      Calculando similitud cosenoidal con OpenAI Embeddings & Trigram Index...
                    </div>
                  )}

                  {crossedResults && !isCrossingData && (
                    <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                      {crossedResults.map((res) => (
                        <div key={res.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              {res.company}
                              <Badge className={res.hasConnector ? "bg-emerald-950 text-emerald-400 border-emerald-800" : "bg-amber-950 text-amber-400 border-amber-800"}>
                                {res.matchStatus}
                              </Badge>
                            </div>
                            <p className="text-slate-400 text-[11px] mt-0.5">
                              {res.role} ({res.country})
                            </p>
                          </div>

                          <div className="text-right">
                            <div className="text-cyan-400 font-medium">
                              {res.connectorName}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
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
            <Card className="bg-slate-900/60 border-slate-800 p-8 rounded-2xl backdrop-blur-md">
              <div className="max-w-3xl mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                  Arquitectura Financiera de Split Payouts (Stripe Connect)
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Cada introducción calificada se cobra a <strong className="text-white">$150.00 USD</strong> y se dispersa en el mismo milisegundo a la cuenta Express del dueño del contacto y la caja de la comunidad.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-slate-950 border-emerald-500/30 p-6 rounded-xl relative overflow-hidden">
                  <div className="text-xs font-mono text-emerald-400 mb-1">70% DISPERSIÓN DIRECTA</div>
                  <div className="text-3xl font-extrabold text-white font-mono mb-2">$105.00 USD</div>
                  <p className="text-xs text-slate-400">
                    Al miembro de la comunidad que custodia el contacto y facilita la introducción de 15 min.
                  </p>
                </Card>

                <Card className="bg-slate-950 border-cyan-500/30 p-6 rounded-xl relative overflow-hidden">
                  <div className="text-xs font-mono text-cyan-400 mb-1">15% FONDO COMUNIDAD</div>
                  <div className="text-3xl font-extrabold text-white font-mono mb-2">$22.50 USD</div>
                  <p className="text-xs text-slate-400">
                    Directo al Administrador del Grupo (Fintech Bar / PayTech) para financiar meetups y eventos.
                  </p>
                </Card>

                <Card className="bg-slate-950 border-indigo-500/30 p-6 rounded-xl relative overflow-hidden">
                  <div className="text-xs font-mono text-indigo-400 mb-1">15% SOFTWARE FEE</div>
                  <div className="text-3xl font-extrabold text-white font-mono mb-2">$22.50 USD</div>
                  <p className="text-xs text-slate-400">
                    Mantenimiento de infraestructura pgvector, llamadas OpenAI y seguridad de la plataforma.
                  </p>
                </Card>
              </div>

              {/* SIMULADOR DE TRANSACCION EN TIEMPO REAL */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-3 mb-4">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    Simulador API stripe.transfers.create (Node.js)
                  </span>
                  <Badge className="bg-emerald-950 text-emerald-400 border-emerald-800">
                    LIVE ENDPOINT
                  </Badge>
                </div>

                <pre className="text-slate-300 bg-slate-900/80 p-4 rounded-lg overflow-x-auto text-[11px]">
{`// 1. Cobro off-session al comprador del lead
const paymentIntent = await stripe.paymentIntents.create({
    amount: 15000, // $150.00 USD
    currency: 'usd',
    payment_method: paymentMethodId,
    confirm: true
});

// 2. Dispersión al conector de la comunidad (70%)
await stripe.transfers.create({
    amount: 10500, // $105.00 USD
    currency: 'usd',
    destination: connectorStripeConnectId, // acct_1Mxxxxxxx
    transfer_group: 'group_lead_8941'
});`}
                </pre>
              </div>
            </Card>
          </TabsContent>

          {/* TAB 4: ENJAMBRE FALLBACK OSINT PYTHON */}
          <TabsContent value="osint" className="space-y-6">
            <Card className="bg-slate-900/60 border-slate-800 p-8 rounded-2xl backdrop-blur-md">
              <div className="max-w-3xl mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                  <Cpu className="w-6 h-6 text-indigo-400" />
                  Enjambre OSINT Fallback (Python Scraping + LLM Organigram)
                </h2>
                <p className="text-sm text-slate-300">
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
                      className="bg-slate-950 border-slate-800 text-white font-mono text-xs"
                    />
                    <Button
                      onClick={handleRunOsintSwarm}
                      disabled={osintRunning}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-5"
                    >
                      {osintRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Ejecutar Enjambre"}
                    </Button>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs font-mono text-slate-400 space-y-2">
                    <p className="text-slate-200 font-bold mb-1">Módulos Python en ejecución:</p>
                    <p>• <span className="text-cyan-400">requests + BeautifulSoup</span> - DuckDuckGo / Bing Search parser</p>
                    <p>• <span className="text-indigo-400">OpenAI gpt-4o-mini</span> - Extractor de organigrama B2B JSON</p>
                    <p>• <span className="text-emerald-400">Redis Celery Queue</span> - Ejecución asíncrona no bloqueante</p>
                  </div>
                </div>

                {/* LOGS DE EJECUCIÓN DEL ENJAMBRE */}
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl font-mono text-xs flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
                      <span>Consola de Salida Enjambre (Worker #1)</span>
                      {osintRunning && <span className="text-indigo-400 animate-pulse">PROCESANDO...</span>}
                    </div>

                    <div className="space-y-2 min-h-[140px]">
                      {osintLogs.length === 0 ? (
                        <p className="text-slate-600 italic">Esperando inicio de simulación...</p>
                      ) : (
                        osintLogs.map((log, i) => (
                          <div key={i} className="text-slate-300 leading-relaxed">
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="bg-slate-900 border-slate-700 max-w-lg w-full p-6 rounded-2xl shadow-2xl relative">
            <button
              onClick={() => { setSelectedIntro(null); setPaymentSuccess(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {!paymentSuccess ? (
              <>
                <Badge className="bg-cyan-950 text-cyan-400 border-cyan-800 mb-3 text-[10px]">
                  Confirmación Pay-per-Intro
                </Badge>
                <h3 className="text-xl font-bold text-white mb-1">
                  Introducción con {selectedIntro.company}
                </h3>
                <p className="text-xs text-slate-300 mb-4">
                  {selectedIntro.role} • Conector: {selectedIntro.connectorName}
                </p>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs space-y-2 mb-6">
                  <div className="flex justify-between text-slate-400">
                    <span>Costo total:</span>
                    <span className="text-white font-bold">$150.00 USD</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Dispersión Conector (70%):</span>
                    <span className="text-emerald-400">$105.00 USD</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Garantía de Llamada:</span>
                    <span className="text-cyan-400">15 min o reembolso</span>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmPayPerIntro}
                  disabled={isProcessingPayment}
                  className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs py-5 rounded-xl flex items-center justify-center gap-2"
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
                <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">¡Introducción Solicitada!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
                  Se ha generado la transferencia automatizada en Stripe Connect para {selectedIntro.connectorName}. Recibirás la invitación de calendario en menos de 2 horas.
                </p>
                <Button
                  onClick={() => { setSelectedIntro(null); setPaymentSuccess(false); }}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium px-6 py-4 rounded-xl"
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

import React, { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Scale, 
  Sliders, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  Sparkles, 
  Building2, 
  Smartphone, 
  Radio, 
  ChevronRight, 
  HelpCircle,
  Calculator,
  Download,
  Share2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  POSTerminal, 
  POS_TERMINALS, 
  POS_MANUFACTURERS, 
  FLEET_CALCULATOR_PRESETS 
} from "@/data/posTerminalsData";

export default function HardwarePOSRadar() {
  const [, navigate] = useLocation();

  // Filtros
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("ALL");
  const [selectedFormFactor, setSelectedFormFactor] = useState<string>("ALL");
  const [selectedRail, setSelectedRail] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Estado de Comparación
  const [compareList, setCompareList] = useState<POSTerminal[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Terminal Seleccionado para Detalle Completo
  const [activeDetailTerminal, setActiveDetailTerminal] = useState<POSTerminal | null>(null);

  // Modal de Cotización B2B
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteTerminal, setQuoteTerminal] = useState<POSTerminal | null>(null);
  const [quoteFormData, setQuoteFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "México",
    quantity: "500",
    useCase: "Retail / Comercios",
    comments: ""
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);

  // Calculadora de Flota
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [customMerchantsCount, setCustomMerchantsCount] = useState<number>(1500);

  // Lista filtrada
  const filteredTerminals = useMemo(() => {
    return POS_TERMINALS.filter((t) => {
      const matchMfg = selectedManufacturer === "ALL" || t.manufacturer === selectedManufacturer;
      const matchForm = selectedFormFactor === "ALL" || t.formFactor === selectedFormFactor;
      const matchRail = selectedRail === "ALL" || t.supportedRails.some(r => r.toLowerCase().includes(selectedRail.toLowerCase()));
      
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = query === "" || 
        t.model.toLowerCase().includes(query) ||
        t.manufacturer.toLowerCase().includes(query) ||
        t.tagline.toLowerCase().includes(query) ||
        t.os.toLowerCase().includes(query) ||
        t.processor.toLowerCase().includes(query) ||
        t.latamAdopters.some(a => a.toLowerCase().includes(query)) ||
        t.certifications.some(c => c.toLowerCase().includes(query));

      return matchMfg && matchForm && matchRail && matchSearch;
    });
  }, [selectedManufacturer, selectedFormFactor, selectedRail, searchQuery]);

  // Manejo de Comparación
  const toggleCompare = (terminal: POSTerminal) => {
    if (compareList.some(item => item.id === terminal.id)) {
      setCompareList(compareList.filter(item => item.id !== terminal.id));
    } else {
      if (compareList.length >= 3) {
        alert("Puedes comparar un máximo de 3 terminales a la vez.");
        return;
      }
      setCompareList([...compareList, terminal]);
    }
  };

  const handleOpenQuote = (terminal?: POSTerminal) => {
    setQuoteTerminal(terminal || null);
    setQuoteSubmitted(false);
    setIsQuoteModalOpen(true);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 font-sans selection:bg-[#0000EE] selection:text-white pb-24">
      
      {/* GLOW DE FONDO AMBIENTAL */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0000EE]/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[190px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111116_1px,transparent_1px),linear-gradient(to_bottom,#111116_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
      </div>

      {/* TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-xl border-b border-[#1c1d24] shadow-md">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors bg-[#131419] border border-[#262733] px-3 py-1.5 rounded-[6px] cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Volver</span>
              </button>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[6px] bg-gradient-to-br from-[#0000EE] to-[#00E5FF] flex items-center justify-center text-white font-mono font-extrabold text-xs shadow-md shadow-[#0000EE]/30">
                POS
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white hidden sm:inline">
                SmartPOS & Terminal Hardware Radar
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#131419] border border-[#2a2b38] text-[#A0A8DC]">
                LATAM 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0000EE] hover:bg-[#3333F1] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md shadow-[#0000EE]/40 cursor-pointer animate-pulse"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Comparar ({compareList.length})</span>
              </button>
            )}

            <button
              onClick={() => handleOpenQuote()}
              className="px-3.5 py-1.5 rounded-[6px] bg-[#141414] hover:bg-[#1a1b24] text-[#A0A8DC] hover:text-white border border-[#282937] text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Cotizar Flota</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 relative z-10 pt-10">
        
        {/* HERO SECTION */}
        <section className="mb-12 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#131419] border border-[#2a2b36] rounded-[4px] text-[#A0A8DC] text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
            Directorio & Benchmark de Hardware In-Person
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white leading-[1.1] mb-5">
            La infraestructura física donde aterrizan los pagos en <span className="italic text-[#00E5FF]">América Latina.</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed font-sans mb-8">
            Análisis técnico, arquitecturas de sistema operativo, certificaciones PCI PTS 6.x/7.x y compatibilidad con adquirentes regionales (PAX, Nexgo, Topwise, Sunmi, Ingenico, Castles). El benchmark para Fintechs que despliegan flotas de cobro presencial.
          </p>

          {/* QUICK STATS BENTO */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-[8px] bg-[#131419] border border-[#22232e]">
            <div>
              <span className="block text-2xl sm:text-3xl font-mono font-black text-white">7+</span>
              <span className="text-xs font-mono uppercase text-[#A0A8DC]">Fabricantes Homologados</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-mono font-black text-[#00E5FF]">100%</span>
              <span className="text-xs font-mono uppercase text-[#A0A8DC]">Android / Linux Seguro</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-mono font-black text-white">&lt; 300ms</span>
              <span className="text-xs font-mono uppercase text-[#A0A8DC]">Lectura QR Pix / CoDi / Bre-B</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-mono font-black text-[#8B5CF6]">PCI PTS 6/7</span>
              <span className="text-xs font-mono uppercase text-[#A0A8DC]">Criptografía Bancaria</span>
            </div>
          </div>
        </section>

        {/* FABRICANTES MARQUEE / GRID */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#A0A8DC] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#00E5FF]" />
              Fabricantes Clave en el Ecosistema LATAM
            </h2>
            <span className="text-[11px] font-mono text-slate-500">Filtrar por marca abajo</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {POS_MANUFACTURERS.map((mfg) => {
              const isSelected = selectedManufacturer === mfg.id;
              return (
                <button
                  key={mfg.id}
                  onClick={() => setSelectedManufacturer(isSelected ? "ALL" : mfg.id)}
                  className={`p-3.5 rounded-[8px] border text-left transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? "bg-[#1a1b26] border-[#00E5FF] shadow-lg shadow-[#00E5FF]/10 ring-1 ring-[#00E5FF]" 
                      : "bg-[#131419] border-[#22232e] hover:border-[#333547] hover:bg-[#161821]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-xs text-white">{mfg.name.split(" ")[0]}</span>
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: mfg.badgeColor }} 
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans line-clamp-1">
                    {mfg.keyClients.slice(0, 2).join(", ")}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* BARRA DE BÚSQUEDA Y FILTROS */}
        <section className="mb-8 p-6 rounded-[8px] bg-[#131419] border border-[#22232e] space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Buscador */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por modelo, procesador, Clip, Stone, Mercado Pago..."
                className="pl-10 bg-[#000000] border-[#2a2b38] text-white text-xs font-mono placeholder:text-slate-500 focus-visible:ring-[#0000EE] h-10 rounded-[6px]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Contador de resultados */}
            <div className="text-xs font-mono text-[#A0A8DC] flex items-center gap-2">
              <span>Mostrando <strong>{filteredTerminals.length}</strong> de {POS_TERMINALS.length} terminales</span>
              {(selectedManufacturer !== "ALL" || selectedFormFactor !== "ALL" || selectedRail !== "ALL" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedManufacturer("ALL");
                    setSelectedFormFactor("ALL");
                    setSelectedRail("ALL");
                    setSearchQuery("");
                  }}
                  className="text-xs text-[#00E5FF] hover:underline cursor-pointer ml-2"
                >
                  (Limpiar filtros)
                </button>
              )}
            </div>
          </div>

          {/* Filtros por Form Factor */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Form Factor / Tipo de Terminal</span>
            <div className="flex flex-wrap gap-2">
              {["ALL", "SmartPOS Móvil", "SmartPOS Mostrador (Dual Screen)", "Kiosco Desatendido", "QR Soundbox"].map((ff) => (
                <button
                  key={ff}
                  onClick={() => setSelectedFormFactor(ff)}
                  className={`px-3 py-1.5 rounded-[4px] text-xs font-mono transition-all cursor-pointer ${
                    selectedFormFactor === ff
                      ? "bg-[#0000EE] text-white font-bold shadow-md shadow-[#0000EE]/30"
                      : "bg-[#000000] text-slate-300 border border-[#2a2b38] hover:border-slate-500"
                  }`}
                >
                  {ff === "ALL" ? "Todos los Tipos" : ff}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros por Riel / Capacidad */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Rieles y Tecnologías Soportadas</span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "ALL", label: "Todos los Rieles" },
                { id: "Pix", label: "Pix QR Instantáneo" },
                { id: "CoDi", label: "CoDi / Dimo (México)" },
                { id: "Bre-B", label: "Bre-B (Colombia)" },
                { id: "Contactless", label: "NFC Contactless / Tap-to-Pay" },
                { id: "Chip", label: "Chip EMV L1/L2" }
              ].map((rail) => (
                <button
                  key={rail.id}
                  onClick={() => setSelectedRail(rail.id)}
                  className={`px-3 py-1.5 rounded-[4px] text-xs font-mono transition-all cursor-pointer ${
                    selectedRail === rail.id
                      ? "bg-[#00E5FF] text-black font-extrabold shadow-md shadow-[#00E5FF]/20"
                      : "bg-[#000000] text-slate-300 border border-[#2a2b38] hover:border-slate-500"
                  }`}
                >
                  {rail.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* GRID DE TERMINALES SMARTPOS */}
        <section className="mb-20">
          {filteredTerminals.length === 0 ? (
            <div className="text-center py-20 p-8 rounded-[8px] bg-[#131419] border border-[#22232e]">
              <Smartphone className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-serif text-white mb-2">No se encontraron terminales con esos filtros</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
                Prueba relajando los criterios de fabricante, rieles de pago o la palabra de búsqueda.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedManufacturer("ALL");
                  setSelectedFormFactor("ALL");
                  setSelectedRail("ALL");
                  setSearchQuery("");
                }}
                className="font-mono text-xs border-[#2a2b38] text-white hover:bg-[#1a1b24]"
              >
                Restablecer todos los filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTerminals.map((terminal) => {
                const isComparing = compareList.some((c) => c.id === terminal.id);

                return (
                  <motion.div
                    key={terminal.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`group relative rounded-[8px] bg-[#131419] hover:bg-[#161822] border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.6)] ${
                      terminal.highlight
                        ? "border-[#2a2d42] hover:border-[#0000EE]"
                        : "border-[#22232e] hover:border-[#333547]"
                    }`}
                  >
                    {/* Borde superior activo en hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0000EE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="p-6">
                      {/* HEADER DE TARJETA */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <Badge className="bg-[#000000] border-[#2a2b38] text-[#A0A8DC] font-mono text-[10px] uppercase tracking-wider">
                          {terminal.manufacturer}
                        </Badge>
                        
                        <div className="flex items-center gap-2">
                          {terminal.highlight && (
                            <span className="px-2 py-0.5 rounded-full bg-[#0000EE]/20 border border-[#0000EE]/40 text-[#00E5FF] text-[10px] font-mono font-bold">
                              ★ Flagship LATAM
                            </span>
                          )}
                          <span className="text-xs font-mono text-slate-400">
                            {terminal.formFactor}
                          </span>
                        </div>
                      </div>

                      {/* TÍTULO Y MODELO */}
                      <h3 className="text-2xl font-serif text-white tracking-tight mb-1 group-hover:text-[#A0A8DC] transition-colors">
                        {terminal.model}
                      </h3>
                      
                      <p className="text-xs text-slate-400 font-sans leading-relaxed mb-5 line-clamp-2">
                        {terminal.tagline}
                      </p>

                      {/* SPECS BENTO RESUMIDO */}
                      <div className="grid grid-cols-2 gap-2 p-3.5 rounded-[6px] bg-[#0c0d12] border border-[#1f202b] mb-5 text-[11px] font-mono">
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Sistema Operativo</span>
                          <span className="text-slate-200 font-bold truncate block">{terminal.os.split(" ")[0]} {terminal.os.split(" ")[1]}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Pantalla</span>
                          <span className="text-slate-200 font-bold truncate block">{terminal.display.split(" ")[0]}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Impresora</span>
                          <span className="text-slate-200 font-bold truncate block">{terminal.printer.includes("Sin") ? "Digital (Sin papel)" : "Térmica 58mm"}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Batería</span>
                          <span className="text-slate-200 font-bold truncate block">{terminal.battery.split(" ")[0]}</span>
                        </div>
                      </div>

                      {/* ADOPTADO POR (FINTECHS) */}
                      <div className="mb-4">
                        <span className="text-[10px] font-mono uppercase text-[#A0A8DC] tracking-wider block mb-1.5">
                          Flotas Desplegadas en LATAM:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {terminal.latamAdopters.slice(0, 4).map((client, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-[3px] bg-[#1a1b24] border border-[#282937] text-white text-[10px] font-mono"
                            >
                              {client}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CERTIFICACIONES CHIPS */}
                      <div className="flex flex-wrap gap-1 mb-5">
                        {terminal.certifications.slice(0, 3).map((cert, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-[#0c0d12] text-slate-400 border border-[#1f202b] text-[9px] font-mono"
                          >
                            ✓ {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* FOOTER Y ACCIONES */}
                    <div className="p-4 bg-[#0e0f14] border-t border-[#1f202b] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleCompare(terminal)}
                          className={`px-2.5 py-1.5 rounded-[4px] text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isComparing
                              ? "bg-[#0000EE] text-white"
                              : "bg-[#181922] text-slate-300 hover:text-white border border-[#2a2b38]"
                          }`}
                          title="Añadir a comparador"
                        >
                          <Scale className="w-3 h-3" />
                          <span>{isComparing ? "Comparando" : "Comparar"}</span>
                        </button>

                        <button
                          onClick={() => setActiveDetailTerminal(terminal)}
                          className="px-2.5 py-1.5 rounded-[4px] bg-[#181922] hover:bg-[#202230] text-[#A0A8DC] hover:text-white border border-[#2a2b38] text-[11px] font-mono font-bold transition-all cursor-pointer"
                        >
                          Ficha Técnica
                        </button>
                      </div>

                      <button
                        onClick={() => handleOpenQuote(terminal)}
                        className="px-3 py-1.5 rounded-[4px] bg-[#0000EE] hover:bg-[#3333F1] text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all shadow-sm shadow-[#0000EE]/30 cursor-pointer flex items-center gap-1"
                      >
                        <span>Cotizar</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* SIMULADOR / CALCULADORA DE FLOTAS DE HARDWARE */}
        <section className="mb-20 p-8 rounded-[8px] bg-[#131419] border border-[#22232e] relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#000000] border border-[#2a2b36] rounded-[4px] text-[#00E5FF] text-xs font-mono font-bold tracking-widest uppercase mb-3">
              <Calculator className="w-3.5 h-3.5" />
              Calculadora de TCO y Despliegue de Flotas
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-2">
              Planifica la inversión de hardware para tu adquirente o agregador
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Estima los costos de adquisición de terminales (CAPEX), licenciamiento TMS/MDM y capacidad de transacciones mensuales según el perfil de comercios.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Presets Selector */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-[#A0A8DC] tracking-wider block">1. Selecciona un Perfil de Despliegue</span>
              <div className="space-y-3">
                {FLEET_CALCULATOR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPresetIndex(idx)}
                    className={`w-full p-4 rounded-[6px] text-left border transition-all cursor-pointer ${
                      selectedPresetIndex === idx
                        ? "bg-[#1c1e2b] border-[#0000EE] ring-1 ring-[#0000EE]"
                        : "bg-[#0c0d12] border-[#22232e] hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif font-bold text-sm text-white">{preset.profile}</span>
                      <Badge className="bg-[#0000EE]/20 text-[#00E5FF] border-[#0000EE]/30 text-[10px] font-mono">
                        {preset.merchantsTarget.toLocaleString()} POS
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Inversión est: {preset.estimatedHardwareInvestmentUSD}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Mix de Terminales del Preset */}
            <div className="p-5 rounded-[6px] bg-[#0c0d12] border border-[#22232e] space-y-4">
              <span className="text-xs font-mono uppercase text-[#A0A8DC] tracking-wider block">2. Composición de Flota Recomendada</span>
              <div className="space-y-3">
                {FLEET_CALCULATOR_PRESETS[selectedPresetIndex].mix.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-slate-300">
                      <span className="truncate">{item.label}</span>
                      <span className="font-bold text-white ml-2">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#1c1d24] overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#0000EE] to-[#00E5FF]" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Métricas Estimadas de Retorno */}
            <div className="p-6 rounded-[6px] bg-gradient-to-br from-[#151724] to-[#0e1017] border border-[#2a2d42] space-y-5">
              <span className="text-xs font-mono uppercase text-[#00E5FF] tracking-wider block">3. Proyección de Costos & Capacidad</span>
              
              <div className="space-y-3 text-xs font-mono">
                <div className="pb-3 border-b border-[#22232e]">
                  <span className="text-slate-400 block text-[10px] uppercase">Inversión Estimada en Lote (CAPEX)</span>
                  <span className="text-xl font-bold text-white">{FLEET_CALCULATOR_PRESETS[selectedPresetIndex].estimatedHardwareInvestmentUSD}</span>
                </div>

                <div className="pb-3 border-b border-[#22232e]">
                  <span className="text-slate-400 block text-[10px] uppercase">Costo Mensual TMS / MDM (OPEX)</span>
                  <span className="text-sm font-bold text-[#A0A8DC]">{FLEET_CALCULATOR_PRESETS[selectedPresetIndex].monthlyTmsFeePerDeviceUSD} / terminal</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Capacidad Transaccional Mensual</span>
                  <span className="text-sm font-bold text-[#00E5FF]">{FLEET_CALCULATOR_PRESETS[selectedPresetIndex].expectedTransactionsPerMonth} txs/mes</span>
                </div>
              </div>

              <button
                onClick={() => handleOpenQuote()}
                className="w-full py-2.5 rounded-[4px] bg-[#0000EE] hover:bg-[#3333F1] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md shadow-[#0000EE]/30 cursor-pointer text-center block"
              >
                Solicitar Homologación de Flota
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* MODAL DETALLE COMPLETO (FICHA TÉCNICA) */}
      <AnimatePresence>
        {activeDetailTerminal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#131419] border border-[#2a2b38] rounded-[8px] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-white shadow-2xl relative"
            >
              <button
                onClick={() => setActiveDetailTerminal(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-[#1c1d24] border border-[#2a2b38]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-[#0000EE] text-white font-mono text-[10px] uppercase">
                  {activeDetailTerminal.manufacturer}
                </Badge>
                <span className="text-xs font-mono text-slate-400">{activeDetailTerminal.formFactor}</span>
              </div>

              <h2 className="text-3xl font-serif text-white mb-2">{activeDetailTerminal.model}</h2>
              <p className="text-sm text-slate-400 mb-6">{activeDetailTerminal.tagline}</p>

              {/* Grid de Specs Profundas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-[6px] bg-[#0c0d12] border border-[#22232e] mb-6 text-xs font-mono">
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Sistema Operativo</span>
                  <span className="text-slate-200 font-bold">{activeDetailTerminal.os}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Procesador & Criptografía</span>
                  <span className="text-slate-200 font-bold">{activeDetailTerminal.processor}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Memoria RAM / Flash</span>
                  <span className="text-slate-200 font-bold">{activeDetailTerminal.memory}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Pantalla Principal</span>
                  <span className="text-slate-200 font-bold">{activeDetailTerminal.display}</span>
                </div>
                {activeDetailTerminal.secondaryDisplay && (
                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">Pantalla Secundaria (Cliente)</span>
                    <span className="text-[#00E5FF] font-bold">{activeDetailTerminal.secondaryDisplay}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Impresora Térmica</span>
                  <span className="text-slate-200 font-bold">{activeDetailTerminal.printer}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Cámara y Lector de Códigos</span>
                  <span className="text-slate-200 font-bold">{activeDetailTerminal.cameraScanner}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Batería y Autonomía</span>
                  <span className="text-slate-200 font-bold">{activeDetailTerminal.battery}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Plataforma MDM / TMS</span>
                  <span className="text-[#A0A8DC] font-bold">{activeDetailTerminal.tmsPlatform}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Rango Precio Lote (FOB Est.)</span>
                  <span className="text-green-400 font-bold">{activeDetailTerminal.priceRangeUnitUSD}</span>
                </div>
              </div>

              {/* Ventajas Clave */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#00E5FF] mb-2">Ventajas Técnicas Diferenciadoras</h4>
                <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                  {activeDetailTerminal.keyAdvantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certificaciones y Rieles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#A0A8DC] mb-2">Certificaciones de Seguridad</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDetailTerminal.certifications.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#1a1b24] text-slate-300 border border-[#282937] text-[10px] font-mono">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#A0A8DC] mb-2">Rieles de Pago Aceptados</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDetailTerminal.supportedRails.map((r, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#1a1b24] text-[#00E5FF] border border-[#282937] text-[10px] font-mono">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#22232e]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveDetailTerminal(null)}
                  className="font-mono text-xs border-[#2a2b38] text-white hover:bg-[#1a1b24]"
                >
                  Cerrar
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    const t = activeDetailTerminal;
                    setActiveDetailTerminal(null);
                    handleOpenQuote(t);
                  }}
                  className="font-mono text-xs bg-[#0000EE] hover:bg-[#3333F1] text-white"
                >
                  Solicitar Cotización de Flota
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL COMPARADOR LADO A LADO */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-[#131419] border border-[#2a2b38] rounded-[8px] max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-white shadow-2xl relative"
            >
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-[#1c1d24] border border-[#2a2b38]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-5 h-5 text-[#00E5FF]" />
                <h2 className="text-2xl font-serif text-white">Comparativa Head-to-Head de Terminales</h2>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Comparando {compareList.length} modelos de SmartPOS para despliegue de flota en LATAM.
              </p>

              <div className="overflow-x-auto pb-4">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-[#22232e]">
                      <th className="text-left py-3 px-4 text-slate-400 w-36 uppercase text-[10px]">Especificación</th>
                      {compareList.map((terminal) => (
                        <th key={terminal.id} className="text-left py-3 px-4 text-white font-serif text-base min-w-[200px]">
                          <div className="flex items-center justify-between">
                            <span>{terminal.model}</span>
                            <button
                              onClick={() => toggleCompare(terminal)}
                              className="text-slate-500 hover:text-red-400 text-xs font-mono font-normal ml-2"
                              title="Quitar"
                            >
                              ✕
                            </button>
                          </div>
                          <span className="text-[10px] font-mono text-[#00E5FF] font-normal block">{terminal.manufacturer}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f202b]">
                    <tr>
                      <td className="py-3 px-4 text-slate-400 font-bold">Form Factor</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-slate-200">{t.formFactor}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-400 font-bold">Sistema Operativo</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-slate-200">{t.os}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-400 font-bold">Procesador</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-slate-200">{t.processor}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-400 font-bold">Pantalla</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-slate-200">
                          {t.display}
                          {t.secondaryDisplay && <div className="text-[#00E5FF] text-[10px] mt-1">+ Cliente: {t.secondaryDisplay}</div>}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-400 font-bold">Impresora</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-slate-200">{t.printer}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-400 font-bold">Batería</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-slate-200">{t.battery}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-400 font-bold">Plataforma MDM / TMS</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-[#A0A8DC] font-bold">{t.tmsPlatform}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-400 font-bold">Certificaciones</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-slate-300">
                          {t.certifications.slice(0, 3).join(", ")}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-400 font-bold">Precio Lote Est.</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-green-400 font-bold">{t.priceRangeUnitUSD}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#22232e]">
                <button
                  onClick={() => setCompareList([])}
                  className="text-xs font-mono text-slate-400 hover:text-red-400"
                >
                  Limpiar lista de comparación
                </button>

                <Button
                  size="sm"
                  onClick={() => {
                    setIsCompareModalOpen(false);
                    handleOpenQuote();
                  }}
                  className="font-mono text-xs bg-[#0000EE] hover:bg-[#3333F1] text-white"
                >
                  Solicitar Cotización de estos Modelos
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL DE COTIZACIÓN / HOMOLOGACIÓN DE FLOTA B2B */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#131419] border border-[#2a2b38] rounded-[8px] max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative"
            >
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-[#1c1d24] border border-[#2a2b38]"
              >
                <X className="w-4 h-4" />
              </button>

              {quoteSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-white">Solicitud Recibida</h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Hemos registrado tu solicitud para el despliegue de flota. Un especialista de OnlyPayments conectará con el equipo de distribución oficial de <strong>{quoteTerminal ? quoteTerminal.manufacturer : "los fabricantes seleccionados"}</strong> para coordinar cotización y kits de evaluación.
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setIsQuoteModalOpen(false)}
                    className="font-mono text-xs bg-[#0000EE] hover:bg-[#3333F1] text-white mt-4"
                  >
                    Entendido
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-[#00E5FF]" />
                      <h3 className="text-xl font-serif text-white">Solicitud de Cotización de Flota</h3>
                    </div>
                    <p className="text-xs text-slate-400 font-sans">
                      {quoteTerminal ? `Para modelo: ${quoteTerminal.model} (${quoteTerminal.manufacturer})` : "Para flota multimarca en LATAM"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="text-slate-400 block text-[10px] uppercase">Nombre y Apellido</label>
                      <Input
                        required
                        value={quoteFormData.name}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                        placeholder="Ej. Rodrigo Torres"
                        className="bg-[#000000] border-[#2a2b38] text-white text-xs h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 block text-[10px] uppercase">Email Corporativo</label>
                      <Input
                        required
                        type="email"
                        value={quoteFormData.email}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                        placeholder="rodrigo@fintech.com"
                        className="bg-[#000000] border-[#2a2b38] text-white text-xs h-9"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="text-slate-400 block text-[10px] uppercase">Empresa / Fintech</label>
                      <Input
                        required
                        value={quoteFormData.company}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, company: e.target.value })}
                        placeholder="Ej. PayLatam Tech"
                        className="bg-[#000000] border-[#2a2b38] text-white text-xs h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 block text-[10px] uppercase">País de Despliegue</label>
                      <select
                        value={quoteFormData.country}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, country: e.target.value })}
                        className="w-full bg-[#000000] border border-[#2a2b38] text-white rounded-[6px] px-3 text-xs h-9 font-mono"
                      >
                        <option value="México">México</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Chile">Chile</option>
                        <option value="Perú">Perú</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Centroamérica">Centroamérica</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="text-slate-400 block text-[10px] uppercase">Lote Estimado (Unidades)</label>
                      <select
                        value={quoteFormData.quantity}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, quantity: e.target.value })}
                        className="w-full bg-[#000000] border border-[#2a2b38] text-white rounded-[6px] px-3 text-xs h-9 font-mono"
                      >
                        <option value="50 - 200">50 - 200 (Piloto / Muestras)</option>
                        <option value="500">500 unidades</option>
                        <option value="1000 - 5000">1,000 - 5,000 unidades</option>
                        <option value="10000+">10,000+ unidades (Enterprise)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 block text-[10px] uppercase">Caso de Uso Principal</label>
                      <select
                        value={quoteFormData.useCase}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, useCase: e.target.value })}
                        className="w-full bg-[#000000] border border-[#2a2b38] text-white rounded-[6px] px-3 text-xs h-9 font-mono"
                      >
                        <option value="Retail / Comercios">Retail / Mostrador</option>
                        <option value="Gastronomía / Restaurantes">Gastronomía / Restaurantes</option>
                        <option value="Delivery / Movilidad">Delivery / Logística en ruta</option>
                        <option value="Micro-comercios / Soundbox">Micro-comercios / Soundbox</option>
                        <option value="Kioscos / Vending">Kioscos / Auto-atención</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs font-mono">
                    <label className="text-slate-400 block text-[10px] uppercase">Requerimientos Específicos (Opcional)</label>
                    <textarea
                      value={quoteFormData.comments}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, comments: e.target.value })}
                      placeholder="Ej. Requerimos integración con switch adquirente local, soporte de Pix QR dinámico y APK propia..."
                      rows={3}
                      className="w-full bg-[#000000] border border-[#2a2b38] text-white rounded-[6px] p-2.5 text-xs font-mono resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-mono text-xs bg-[#0000EE] hover:bg-[#3333F1] text-white py-2.5 font-bold uppercase tracking-wider shadow-md shadow-[#0000EE]/30"
                  >
                    Enviar Solicitud de Cotización
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

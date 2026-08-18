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
  FileText,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-[#F3F3F4] text-[#000000] font-sans antialiased selection:bg-[#0000EE] selection:text-white pb-24">
      
      {/* TOP NAVIGATION BAR — VIBRANT LIGHT EDITORIAL */}
      <nav className="sticky top-0 z-[2147483647] bg-[#FFFFFF] border-b border-[#E5E6EA] transition-all duration-[0.12s]">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#000000] hover:text-[#0000EE] transition-colors duration-[0.12s] bg-[#F3F3F4] border border-[#E5E6EA] px-3.5 py-1.5 rounded-[12px] cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5 text-[#0000EE]" />
                <span>Volver</span>
              </button>
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#0000EE] flex items-center justify-center text-white font-mono font-black text-xs">
                POS
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#000000] hidden sm:inline leading-[1.15]">
                SmartPOS & Terminal Hardware Radar
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[2px] bg-[#E5E6EA] text-[#000000] uppercase tracking-wider">
                LATAM 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-[12px] bg-[#0000EE] hover:bg-[#0000BE] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-[0.12s] cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Comparar ({compareList.length})</span>
              </button>
            )}

            <button
              onClick={() => handleOpenQuote()}
              className="px-4 py-2 rounded-[12px] bg-[#0000EE] hover:bg-[#0000BE] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-[0.12s] cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>Cotizar Flota</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1296px] mx-auto px-4 sm:px-6 relative z-10 pt-10">
        
        {/* HERO SECTION — CLEAN VIBRANT LIGHT */}
        <section className="mb-12 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E5E6EA] rounded-[2px] text-[#0000EE] text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0000EE]" />
            Directorio & Benchmark de Hardware In-Person
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[75px] font-black tracking-tight text-[#000000] leading-[1.05] mb-5">
            La infraestructura física de pagos en <span className="text-[#0000EE]">América Latina.</span>
          </h1>

          <p className="text-[#8B8F9A] text-lg sm:text-[24px] max-w-3xl leading-[1.15] font-normal mb-8">
            Análisis técnico, arquitecturas de sistema operativo, certificaciones PCI PTS 6.x/7.x y compatibilidad con adquirentes regionales (PAX, Nexgo, Topwise, Sunmi, Ingenico, Castles). El benchmark para Fintechs que despliegan flotas de cobro presencial.
          </p>

          {/* QUICK STATS BENTO — FLAT WHITE CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA]">
            <div>
              <span className="block text-3xl sm:text-4xl font-mono font-black text-[#000000] leading-[1.15]">7+</span>
              <span className="text-xs font-mono uppercase text-[#8B8F9A] tracking-wider">Fabricantes Homologados</span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-mono font-black text-[#0000EE] leading-[1.15]">100%</span>
              <span className="text-xs font-mono uppercase text-[#8B8F9A] tracking-wider">Android / Linux Seguro</span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-mono font-black text-[#000000] leading-[1.15]">&lt; 300ms</span>
              <span className="text-xs font-mono uppercase text-[#8B8F9A] tracking-wider">Lectura QR Pix / CoDi</span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-mono font-black text-[#0000EE] leading-[1.15]">PCI PTS 6/7</span>
              <span className="text-xs font-mono uppercase text-[#8B8F9A] tracking-wider">Criptografía Bancaria</span>
            </div>
          </div>
        </section>

        {/* FABRICANTES MARQUEE / GRID */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#8B8F9A] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0000EE]" />
              Fabricantes Clave en el Ecosistema LATAM
            </h2>
            <span className="text-[11px] font-mono text-[#8B8F9A]">Filtrar por marca abajo</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {POS_MANUFACTURERS.map((mfg) => {
              const isSelected = selectedManufacturer === mfg.id;
              return (
                <button
                  key={mfg.id}
                  onClick={() => setSelectedManufacturer(isSelected ? "ALL" : mfg.id)}
                  className={`p-3.5 rounded-[12px] border text-left transition-all duration-[0.12s] cursor-pointer ${
                    isSelected 
                      ? "bg-[#FFFFFF] border-[#0000EE] ring-2 ring-[#0000EE]" 
                      : "bg-[#FFFFFF] border-[#E5E6EA] hover:border-[#8B8F9A]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-xs text-[#000000]">{mfg.name.split(" ")[0]}</span>
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: mfg.badgeColor }} 
                    />
                  </div>
                  <p className="text-[10px] text-[#8B8F9A] font-sans line-clamp-1">
                    {mfg.keyClients.slice(0, 2).join(", ")}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* BARRA DE BÚSQUEDA Y FILTROS */}
        <section className="mb-10 p-6 rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA] space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Buscador */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#8B8F9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar modelo, procesador, Clip, Stone, Mercado Pago..."
                className="pl-10 bg-[#FFFFFF] border-[#E5E6EA] text-[#000000] text-xs font-mono placeholder:text-[#8B8F9A] focus-visible:ring-[#0000EE] h-10 rounded-[6px]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8F9A] hover:text-[#000000]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Contador de resultados */}
            <div className="text-xs font-mono text-[#8B8F9A] flex items-center gap-2">
              <span>Mostrando <strong className="text-[#000000]">{filteredTerminals.length}</strong> de {POS_TERMINALS.length} terminales</span>
              {(selectedManufacturer !== "ALL" || selectedFormFactor !== "ALL" || selectedRail !== "ALL" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedManufacturer("ALL");
                    setSelectedFormFactor("ALL");
                    setSelectedRail("ALL");
                    setSearchQuery("");
                  }}
                  className="text-xs text-[#0000EE] hover:underline cursor-pointer ml-2 font-bold"
                >
                  (Limpiar filtros)
                </button>
              )}
            </div>
          </div>

          {/* Filtros por Form Factor */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B8F9A] block">Form Factor / Tipo de Terminal</span>
            <div className="flex flex-wrap gap-2">
              {["ALL", "SmartPOS Móvil", "SmartPOS Mostrador (Dual Screen)", "Kiosco Desatendido", "QR Soundbox"].map((ff) => (
                <button
                  key={ff}
                  onClick={() => setSelectedFormFactor(ff)}
                  className={`px-3.5 py-1.5 rounded-[2px] text-xs font-mono transition-all duration-[0.12s] cursor-pointer ${
                    selectedFormFactor === ff
                      ? "bg-[#0000EE] text-white font-bold"
                      : "bg-[#F3F3F4] text-[#000000] border border-[#E5E6EA] hover:border-[#8B8F9A]"
                  }`}
                >
                  {ff === "ALL" ? "Todos los Tipos" : ff}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros por Riel / Capacidad */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B8F9A] block">Rieles y Tecnologías Soportadas</span>
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
                  className={`px-3.5 py-1.5 rounded-[2px] text-xs font-mono transition-all duration-[0.12s] cursor-pointer ${
                    selectedRail === rail.id
                      ? "bg-[#0000EE] text-white font-bold"
                      : "bg-[#F3F3F4] text-[#000000] border border-[#E5E6EA] hover:border-[#8B8F9A]"
                  }`}
                >
                  {rail.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* GRID DE TERMINALES SMARTPOS — WHITE CARDS WITH 12PX RADIUS */}
        <section className="mb-20">
          {filteredTerminals.length === 0 ? (
            <div className="text-center py-20 p-8 rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA]">
              <Smartphone className="w-12 h-12 text-[#8B8F9A] mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-[#000000] mb-2 leading-[1.15]">No se encontraron terminales con esos filtros</h3>
              <p className="text-xs text-[#8B8F9A] max-w-md mx-auto mb-6">
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
                className="font-mono text-xs border-[#E5E6EA] text-[#000000] hover:bg-[#F3F3F4] rounded-[12px]"
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
                    transition={{ duration: 0.12 }}
                    className="group relative rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA] hover:border-[#0000EE] transition-all duration-[0.12s] flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-6">
                      {/* HEADER DE TARJETA */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="bg-[#E5E6EA] text-[#000000] font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[2px]">
                          {terminal.manufacturer}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {terminal.highlight && (
                            <span className="px-2 py-0.5 rounded-[2px] bg-[#0000EE]/10 text-[#0000EE] text-[10px] font-mono font-bold">
                              ★ Flagship LATAM
                            </span>
                          )}
                          <span className="text-xs font-mono text-[#8B8F9A]">
                            {terminal.formFactor}
                          </span>
                        </div>
                      </div>

                      {/* TÍTULO Y MODELO */}
                      <h3 className="text-2xl font-bold text-[#000000] tracking-tight mb-1 group-hover:text-[#0000EE] transition-colors duration-[0.12s] leading-[1.15]">
                        {terminal.model}
                      </h3>
                      
                      <p className="text-xs text-[#8B8F9A] font-sans leading-relaxed mb-5 line-clamp-2">
                        {terminal.tagline}
                      </p>

                      {/* SPECS BENTO RESUMIDO */}
                      <div className="grid grid-cols-2 gap-2 p-3.5 rounded-[8px] bg-[#F3F3F4] border border-[#E5E6EA] mb-5 text-[11px] font-mono">
                        <div>
                          <span className="text-[#8B8F9A] block text-[9px] uppercase tracking-wider">Sistema Operativo</span>
                          <span className="text-[#000000] font-bold truncate block">{terminal.os.split(" ")[0]} {terminal.os.split(" ")[1]}</span>
                        </div>
                        <div>
                          <span className="text-[#8B8F9A] block text-[9px] uppercase tracking-wider">Pantalla</span>
                          <span className="text-[#000000] font-bold truncate block">{terminal.display.split(" ")[0]}</span>
                        </div>
                        <div>
                          <span className="text-[#8B8F9A] block text-[9px] uppercase tracking-wider">Impresora</span>
                          <span className="text-[#000000] font-bold truncate block">{terminal.printer.includes("Sin") ? "Digital (Sin papel)" : "Térmica 58mm"}</span>
                        </div>
                        <div>
                          <span className="text-[#8B8F9A] block text-[9px] uppercase tracking-wider">Batería</span>
                          <span className="text-[#000000] font-bold truncate block">{terminal.battery.split(" ")[0]}</span>
                        </div>
                      </div>

                      {/* ADOPTADO POR (FINTECHS) */}
                      <div className="mb-4">
                        <span className="text-[10px] font-mono uppercase text-[#8B8F9A] tracking-wider block mb-1.5">
                          Flotas Desplegadas en LATAM:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {terminal.latamAdopters.slice(0, 4).map((client, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-[2px] bg-[#E5E6EA] text-[#000000] text-[10px] font-mono font-medium"
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
                            className="px-1.5 py-0.5 rounded-[2px] bg-[#F3F3F4] text-[#8B8F9A] border border-[#E5E6EA] text-[9px] font-mono"
                          >
                            ✓ {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* FOOTER Y ACCIONES */}
                    <div className="p-4 bg-[#F3F3F4] border-t border-[#E5E6EA] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleCompare(terminal)}
                          className={`px-3 py-1.5 rounded-[12px] text-[11px] font-mono font-bold transition-all duration-[0.12s] cursor-pointer flex items-center gap-1.5 ${
                            isComparing
                              ? "bg-[#0000EE] text-white"
                              : "bg-[#FFFFFF] text-[#000000] hover:text-[#0000EE] border border-[#E5E6EA]"
                          }`}
                          title="Añadir a comparador"
                        >
                          <Scale className="w-3 h-3" />
                          <span>{isComparing ? "Comparando" : "Comparar"}</span>
                        </button>

                        <button
                          onClick={() => setActiveDetailTerminal(terminal)}
                          className="px-3 py-1.5 rounded-[12px] bg-[#FFFFFF] hover:bg-[#E5E6EA] text-[#000000] border border-[#E5E6EA] text-[11px] font-mono font-bold transition-all duration-[0.12s] cursor-pointer"
                        >
                          Ficha Técnica
                        </button>
                      </div>

                      <button
                        onClick={() => handleOpenQuote(terminal)}
                        className="px-3.5 py-1.5 rounded-[12px] bg-[#0000EE] hover:bg-[#0000BE] text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-[0.12s] cursor-pointer flex items-center gap-1"
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
        <section className="mb-20 p-8 rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA] relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E5E6EA] rounded-[2px] text-[#0000EE] text-xs font-mono font-bold tracking-widest uppercase mb-3">
              <Calculator className="w-3.5 h-3.5" />
              Calculadora de TCO y Despliegue de Flotas
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#000000] mb-2 leading-[1.15]">
              Planifica la inversión de hardware para tu adquirente o agregador
            </h2>
            <p className="text-xs sm:text-sm text-[#8B8F9A] font-sans">
              Estima los costos de adquisición de terminales (CAPEX), licenciamiento TMS/MDM y capacidad de transacciones mensuales según el perfil de comercios.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Presets Selector */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-[#8B8F9A] tracking-wider block">1. Selecciona un Perfil de Despliegue</span>
              <div className="space-y-3">
                {FLEET_CALCULATOR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPresetIndex(idx)}
                    className={`w-full p-4 rounded-[12px] text-left border transition-all duration-[0.12s] cursor-pointer ${
                      selectedPresetIndex === idx
                        ? "bg-[#F3F3F4] border-[#0000EE] ring-2 ring-[#0000EE]"
                        : "bg-[#FFFFFF] border-[#E5E6EA] hover:border-[#8B8F9A]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#000000] leading-[1.15]">{preset.profile}</span>
                      <span className="bg-[#0000EE]/10 text-[#0000EE] px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold">
                        {preset.merchantsTarget.toLocaleString()} POS
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8B8F9A] font-mono">
                      Inversión est: {preset.estimatedHardwareInvestmentUSD}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Mix de Terminales del Preset */}
            <div className="p-6 rounded-[12px] bg-[#F3F3F4] border border-[#E5E6EA] space-y-4">
              <span className="text-xs font-mono uppercase text-[#8B8F9A] tracking-wider block">2. Composición de Flota Recomendada</span>
              <div className="space-y-3">
                {FLEET_CALCULATOR_PRESETS[selectedPresetIndex].mix.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-[#000000]">
                      <span className="truncate">{item.label}</span>
                      <span className="font-bold text-[#0000EE] ml-2">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E5E6EA] overflow-hidden">
                      <div 
                        className="h-full bg-[#0000EE]" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Métricas Estimadas de Retorno */}
            <div className="p-6 rounded-[12px] bg-[#FFFFFF] border border-[#E5E6EA] space-y-5">
              <span className="text-xs font-mono uppercase text-[#0000EE] tracking-wider block font-bold">3. Proyección de Costos & Capacidad</span>
              
              <div className="space-y-3 text-xs font-mono">
                <div className="pb-3 border-b border-[#E5E6EA]">
                  <span className="text-[#8B8F9A] block text-[10px] uppercase">Inversión Estimada en Lote (CAPEX)</span>
                  <span className="text-xl font-bold text-[#000000]">{FLEET_CALCULATOR_PRESETS[selectedPresetIndex].estimatedHardwareInvestmentUSD}</span>
                </div>

                <div className="pb-3 border-b border-[#E5E6EA]">
                  <span className="text-[#8B8F9A] block text-[10px] uppercase">Costo Mensual TMS / MDM (OPEX)</span>
                  <span className="text-sm font-bold text-[#000000]">{FLEET_CALCULATOR_PRESETS[selectedPresetIndex].monthlyTmsFeePerDeviceUSD} / terminal</span>
                </div>

                <div>
                  <span className="text-[#8B8F9A] block text-[10px] uppercase">Capacidad Transaccional Mensual</span>
                  <span className="text-sm font-bold text-[#0000EE]">{FLEET_CALCULATOR_PRESETS[selectedPresetIndex].expectedTransactionsPerMonth} txs/mes</span>
                </div>
              </div>

              <button
                onClick={() => handleOpenQuote()}
                className="w-full py-3 rounded-[12px] bg-[#0000EE] hover:bg-[#0000BE] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-[0.12s] cursor-pointer text-center block"
              >
                Solicitar Homologación de Flota
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* MODAL DETALLE COMPLETO (FICHA TÉCNICA) — LIGHT THEME */}
      <AnimatePresence>
        {activeDetailTerminal && (
          <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              className="bg-[#FFFFFF] border border-[#E5E6EA] rounded-[12px] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-[#000000] relative"
            >
              <button
                onClick={() => setActiveDetailTerminal(null)}
                className="absolute top-5 right-5 text-[#8B8F9A] hover:text-[#000000] p-1.5 rounded-[8px] bg-[#F3F3F4] border border-[#E5E6EA]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#0000EE] text-white font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-[2px]">
                  {activeDetailTerminal.manufacturer}
                </span>
                <span className="text-xs font-mono text-[#8B8F9A]">{activeDetailTerminal.formFactor}</span>
              </div>

              <h2 className="text-3xl font-black text-[#000000] mb-2 leading-[1.15]">{activeDetailTerminal.model}</h2>
              <p className="text-sm text-[#8B8F9A] mb-6">{activeDetailTerminal.tagline}</p>

              {/* Grid de Specs Profundas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-[12px] bg-[#F3F3F4] border border-[#E5E6EA] mb-6 text-xs font-mono">
                <div>
                  <span className="text-[#8B8F9A] uppercase block text-[10px]">Sistema Operativo</span>
                  <span className="text-[#000000] font-bold">{activeDetailTerminal.os}</span>
                </div>
                <div>
                  <span className="text-[#8B8F9A] uppercase block text-[10px]">Procesador & Criptografía</span>
                  <span className="text-[#000000] font-bold">{activeDetailTerminal.processor}</span>
                </div>
                <div>
                  <span className="text-[#8B8F9A] uppercase block text-[10px]">Memoria RAM / Flash</span>
                  <span className="text-[#000000] font-bold">{activeDetailTerminal.memory}</span>
                </div>
                <div>
                  <span className="text-[#8B8F9A] uppercase block text-[10px]">Pantalla Principal</span>
                  <span className="text-[#000000] font-bold">{activeDetailTerminal.display}</span>
                </div>
                {activeDetailTerminal.secondaryDisplay && (
                  <div>
                    <span className="text-[#8B8F9A] uppercase block text-[10px]">Pantalla Secundaria (Cliente)</span>
                    <span className="text-[#0000EE] font-bold">{activeDetailTerminal.secondaryDisplay}</span>
                  </div>
                )}
                <div>
                  <span className="text-[#8B8F9A] uppercase block text-[10px]">Impresora Térmica</span>
                  <span className="text-[#000000] font-bold">{activeDetailTerminal.printer}</span>
                </div>
                <div>
                  <span className="text-[#8B8F9A] uppercase block text-[10px]">Cámara y Lector de Códigos</span>
                  <span className="text-[#000000] font-bold">{activeDetailTerminal.cameraScanner}</span>
                </div>
                <div>
                  <span className="text-[#8B8F9A] uppercase block text-[10px]">Batería y Autonomía</span>
                  <span className="text-[#000000] font-bold">{activeDetailTerminal.battery}</span>
                </div>
                <div>
                  <span className="text-[#8B8F9A] uppercase block text-[10px]">Plataforma MDM / TMS</span>
                  <span className="text-[#0000EE] font-bold">{activeDetailTerminal.tmsPlatform}</span>
                </div>
                <div>
                  <span className="text-[#8B8F9A] uppercase block text-[10px]">Rango Precio Lote (FOB Est.)</span>
                  <span className="text-emerald-700 font-bold">{activeDetailTerminal.priceRangeUnitUSD}</span>
                </div>
              </div>

              {/* Ventajas Clave */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#0000EE] mb-2 font-bold">Ventajas Técnicas Diferenciadoras</h4>
                <ul className="space-y-1.5 text-xs text-[#000000] font-sans">
                  {activeDetailTerminal.keyAdvantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0000EE] shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certificaciones y Rieles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B8F9A] mb-2">Certificaciones de Seguridad</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDetailTerminal.certifications.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-[2px] bg-[#E5E6EA] text-[#000000] text-[10px] font-mono">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B8F9A] mb-2">Rieles de Pago Aceptados</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDetailTerminal.supportedRails.map((r, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-[2px] bg-[#E5E6EA] text-[#0000EE] font-bold text-[10px] font-mono">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E6EA]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveDetailTerminal(null)}
                  className="font-mono text-xs border-[#E5E6EA] text-[#000000] hover:bg-[#F3F3F4] rounded-[12px]"
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
                  className="font-mono text-xs bg-[#0000EE] hover:bg-[#0000BE] text-white rounded-[12px]"
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
          <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.12 }}
              className="bg-[#FFFFFF] border border-[#E5E6EA] rounded-[12px] max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-[#000000] relative"
            >
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="absolute top-5 right-5 text-[#8B8F9A] hover:text-[#000000] p-1.5 rounded-[8px] bg-[#F3F3F4] border border-[#E5E6EA]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-5 h-5 text-[#0000EE]" />
                <h2 className="text-2xl font-black text-[#000000] leading-[1.15]">Comparativa Head-to-Head de Terminales</h2>
              </div>
              <p className="text-xs text-[#8B8F9A] mb-6">
                Comparando {compareList.length} modelos de SmartPOS para despliegue de flota en LATAM.
              </p>

              <div className="overflow-x-auto pb-4">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E6EA]">
                      <th className="text-left py-3 px-4 text-[#8B8F9A] w-36 uppercase text-[10px]">Especificación</th>
                      {compareList.map((terminal) => (
                        <th key={terminal.id} className="text-left py-3 px-4 text-[#000000] font-bold text-base min-w-[200px]">
                          <div className="flex items-center justify-between">
                            <span>{terminal.model}</span>
                            <button
                              onClick={() => toggleCompare(terminal)}
                              className="text-[#8B8F9A] hover:text-red-500 text-xs font-mono font-normal ml-2 cursor-pointer"
                              title="Quitar"
                            >
                              ✕
                            </button>
                          </div>
                          <span className="text-[10px] font-mono text-[#0000EE] font-normal block">{terminal.manufacturer}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E6EA]">
                    <tr>
                      <td className="py-3 px-4 text-[#8B8F9A] font-bold">Form Factor</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-[#000000]">{t.formFactor}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#8B8F9A] font-bold">Sistema Operativo</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-[#000000]">{t.os}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#8B8F9A] font-bold">Procesador</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-[#000000]">{t.processor}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#8B8F9A] font-bold">Pantalla</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-[#000000]">
                          {t.display}
                          {t.secondaryDisplay && <div className="text-[#0000EE] text-[10px] mt-1 font-bold">+ Cliente: {t.secondaryDisplay}</div>}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#8B8F9A] font-bold">Impresora</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-[#000000]">{t.printer}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#8B8F9A] font-bold">Batería</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-[#000000]">{t.battery}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#8B8F9A] font-bold">Plataforma MDM / TMS</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-[#0000EE] font-bold">{t.tmsPlatform}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#8B8F9A] font-bold">Certificaciones</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-[#000000]">
                          {t.certifications.slice(0, 3).join(", ")}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#8B8F9A] font-bold">Precio Lote Est.</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="py-3 px-4 text-emerald-700 font-bold">{t.priceRangeUnitUSD}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#E5E6EA]">
                <button
                  onClick={() => setCompareList([])}
                  className="text-xs font-mono text-[#8B8F9A] hover:text-red-500 cursor-pointer"
                >
                  Limpiar lista de comparación
                </button>

                <Button
                  size="sm"
                  onClick={() => {
                    setIsCompareModalOpen(false);
                    handleOpenQuote();
                  }}
                  className="font-mono text-xs bg-[#0000EE] hover:bg-[#0000BE] text-white rounded-[12px]"
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
          <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              className="bg-[#FFFFFF] border border-[#E5E6EA] rounded-[12px] max-w-lg w-full p-6 sm:p-8 text-[#000000] relative"
            >
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-5 right-5 text-[#8B8F9A] hover:text-[#000000] p-1.5 rounded-[8px] bg-[#F3F3F4] border border-[#E5E6EA]"
              >
                <X className="w-4 h-4" />
              </button>

              {quoteSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#0000EE]/10 text-[#0000EE] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-[#000000] leading-[1.15]">Solicitud Recibida</h3>
                  <p className="text-xs text-[#8B8F9A] font-sans leading-relaxed">
                    Hemos registrado tu solicitud para el despliegue de flota. Un especialista de OnlyPayments conectará con el equipo de distribución oficial de <strong>{quoteTerminal ? quoteTerminal.manufacturer : "los fabricantes seleccionados"}</strong> para coordinar cotización y kits de evaluación.
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setIsQuoteModalOpen(false)}
                    className="font-mono text-xs bg-[#0000EE] hover:bg-[#0000BE] text-white mt-4 rounded-[12px]"
                  >
                    Entendido
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-[#0000EE]" />
                      <h3 className="text-xl font-black text-[#000000] leading-[1.15]">Solicitud de Cotización de Flota</h3>
                    </div>
                    <p className="text-xs text-[#8B8F9A] font-sans">
                      {quoteTerminal ? `Para modelo: ${quoteTerminal.model} (${quoteTerminal.manufacturer})` : "Para flota multimarca en LATAM"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="text-[#8B8F9A] block text-[10px] uppercase">Nombre y Apellido</label>
                      <Input
                        required
                        value={quoteFormData.name}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                        placeholder="Ej. Rodrigo Torres"
                        className="bg-[#FFFFFF] border-[#E5E6EA] text-[#000000] text-xs h-9 rounded-[6px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[#8B8F9A] block text-[10px] uppercase">Email Corporativo</label>
                      <Input
                        required
                        type="email"
                        value={quoteFormData.email}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                        placeholder="rodrigo@fintech.com"
                        className="bg-[#FFFFFF] border-[#E5E6EA] text-[#000000] text-xs h-9 rounded-[6px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="text-[#8B8F9A] block text-[10px] uppercase">Empresa / Fintech</label>
                      <Input
                        required
                        value={quoteFormData.company}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, company: e.target.value })}
                        placeholder="Ej. PayLatam Tech"
                        className="bg-[#FFFFFF] border-[#E5E6EA] text-[#000000] text-xs h-9 rounded-[6px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[#8B8F9A] block text-[10px] uppercase">País de Despliegue</label>
                      <select
                        value={quoteFormData.country}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, country: e.target.value })}
                        className="w-full bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] rounded-[6px] px-3 text-xs h-9 font-mono"
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
                      <label className="text-[#8B8F9A] block text-[10px] uppercase">Lote Estimado (Unidades)</label>
                      <select
                        value={quoteFormData.quantity}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, quantity: e.target.value })}
                        className="w-full bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] rounded-[6px] px-3 text-xs h-9 font-mono"
                      >
                        <option value="50 - 200">50 - 200 (Piloto / Muestras)</option>
                        <option value="500">500 unidades</option>
                        <option value="1000 - 5000">1,000 - 5,000 unidades</option>
                        <option value="10000+">10,000+ unidades (Enterprise)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[#8B8F9A] block text-[10px] uppercase">Caso de Uso Principal</label>
                      <select
                        value={quoteFormData.useCase}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, useCase: e.target.value })}
                        className="w-full bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] rounded-[6px] px-3 text-xs h-9 font-mono"
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
                    <label className="text-[#8B8F9A] block text-[10px] uppercase">Requerimientos Específicos (Opcional)</label>
                    <textarea
                      value={quoteFormData.comments}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, comments: e.target.value })}
                      placeholder="Ej. Requerimos integración con switch adquirente local, soporte de Pix QR dinámico y APK propia..."
                      rows={3}
                      className="w-full bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] rounded-[6px] p-2.5 text-xs font-mono resize-none placeholder:text-[#8B8F9A]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-mono text-xs bg-[#0000EE] hover:bg-[#0000BE] text-white py-3 rounded-[12px] font-bold uppercase tracking-wider transition-all duration-[0.12s]"
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

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Building2, 
  ChevronLeft, 
  ChevronRight, 
  Activity, 
  ShoppingBag, 
  CreditCard, 
  Landmark, 
  Store, 
  Globe2, 
  Gamepad2, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Filter
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const ITEMS_PER_PAGE = 12;

// Utility function to clean UTF-8 encoding corruptions in JSON data
function cleanText(str: string | undefined): string {
  if (!str) return "";
  return str
    .replace(/CrÃ©dito Digital/g, "Crédito Digital")
    .replace(/GestiÃ³n de Finanzas/g, "Gestión de Finanzas")
    .replace(/Activos Digitales/g, "Activos Digitales")
    .replace(/Finanzas Personales/g, "Finanzas Personales")
    .replace(/Puntaje de CrÃ©dito/g, "Puntaje de Crédito")
    .replace(/180Â°/g, "180°")
    .replace(/Ã©/g, "é")
    .replace(/Ã³/g, "ó")
    .replace(/Ã¡/g, "á")
    .replace(/Ã­/g, "í")
    .replace(/Ãº/g, "ú")
    .replace(/Ã±/g, "ñ")
    .replace(/Â/g, "")
    .trim();
}

// 6 Cajitas Estructuradas de Categorías Principales (Estilo Solicitado)
const CATEGORY_CARDS = [
  {
    id: "e-commerce",
    segmentMatch: ["E-Commerce", "Marketplace", "Pagos"],
    icon: ShoppingBag,
    title: "E-commerce & Marketplaces",
    desc: "Tiendas online, marketplaces regionales, orquestación de pagos D2C y checkout.",
    color: "from-blue-500/10 to-cyan-500/10 border-blue-200 text-blue-900",
    iconBg: "bg-blue-600 text-white"
  },
  {
    id: "saas",
    segmentMatch: ["SaaS", "Gestión de Finanzas", "Billing"],
    icon: CreditCard,
    title: "SaaS / Subscripciones",
    desc: "Cobro recurrente, billing automatizado, tarjetas tokenizadas y métricas MRR.",
    color: "from-cyan-500/10 to-teal-500/10 border-cyan-200 text-cyan-900",
    iconBg: "bg-cyan-600 text-white"
  },
  {
    id: "fintech",
    segmentMatch: ["Neobancos", "Crédito Digital", "Crowdfunding"],
    icon: Landmark,
    title: "Fintech / Neobancos",
    desc: "Licencias de pago, BaaS (Banking-as-a-Service), tarjetas virtuales y compliance.",
    color: "from-indigo-500/10 to-purple-500/10 border-indigo-200 text-indigo-900",
    iconBg: "bg-indigo-600 text-white"
  },
  {
    id: "pyme",
    segmentMatch: ["PYME", "Retail", "Puntos de Venta"],
    icon: Store,
    title: "PYME / Retail",
    desc: "Terminales POS físicos, pagos por código QR, soluciones presenciales y conciliación.",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-900",
    iconBg: "bg-emerald-600 text-white"
  },
  {
    id: "remesas",
    segmentMatch: ["Remesas", "Cross-Border", "Activos Digitales"],
    icon: Globe2,
    title: "Remesas / Cross-border",
    desc: "Envío de dinero internacional, dispersiones en tiempo real (payouts) y FX.",
    color: "from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-900",
    iconBg: "bg-amber-600 text-white"
  },
  {
    id: "gaming",
    segmentMatch: ["Gaming", "Gambling", "iGaming"],
    icon: Gamepad2,
    title: "Gaming / Gambling",
    desc: "Procesamiento de alto riesgo (high-risk), pagos instantáneos A2A y prevención de fraude.",
    color: "from-purple-500/10 to-pink-500/10 border-purple-200 text-purple-900",
    iconBg: "bg-purple-600 text-white"
  }
];

export function FintechDirectory() {
  const [fintechsData, setFintechsData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [activeCategoryCard, setActiveCategoryCard] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    import('../data/fintechs_latam.json')
      .then((mod) => {
        const rawData = mod.default || mod;
        // Clean text encoding on import
        const cleaned = rawData.map((item: any) => ({
          ...item,
          Nombre: cleanText(item.Nombre),
          Segmento: cleanText(item.Segmento),
          Vertical: cleanText(item.Vertical),
          País: cleanText(item.País),
          Descripción: cleanText(item["Descripción"])
        }));
        setFintechsData(cleaned);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error("Error loading fintech dataset:", err);
        setLoadingData(false);
      });
  }, []);

  // Filtered dataset
  const filteredData = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return fintechsData.filter((company: any) => {
      const name = company.Nombre?.toLowerCase() || '';
      const desc = company.Descripción?.toLowerCase() || '';
      const seg = company.Segmento?.toLowerCase() || '';
      const vert = company.Vertical?.toLowerCase() || '';
      const country = company.País?.toLowerCase() || '';

      const matchesSearch = !q || name.includes(q) || desc.includes(q) || seg.includes(q) || vert.includes(q) || country.includes(q);
      const matchesSegment = activeSegment ? company.Segmento === activeSegment : true;

      let matchesCategoryCard = true;
      if (activeCategoryCard) {
        const cardObj = CATEGORY_CARDS.find(c => c.id === activeCategoryCard);
        if (cardObj) {
          matchesCategoryCard = cardObj.segmentMatch.some(sm => 
            seg.toLowerCase().includes(sm.toLowerCase()) || vert.toLowerCase().includes(sm.toLowerCase())
          );
        }
      }

      return matchesSearch && matchesSegment && matchesCategoryCard;
    });
  }, [searchTerm, activeSegment, activeCategoryCard, fintechsData]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeSegment, activeCategoryCard]);

  // Handle Cajitas click
  const handleCategoryCardClick = (cardId: string) => {
    if (activeCategoryCard === cardId) {
      setActiveCategoryCard(null);
    } else {
      setActiveCategoryCard(cardId);
      setActiveSegment(null);
    }
  };

  return (
    <div className="w-full relative z-10 max-w-[1400px] mx-auto p-4 md:p-8 font-sans bg-slate-50 text-slate-900">
      
      {/* Header Directora */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-800 text-xs font-black font-mono uppercase tracking-widest shadow-xs">
          <Activity className="w-3.5 h-3.5" />
          Directorio Oficial LATAM 2026
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
          Directorio de Empresas Fintech
        </h2>
        <p className="text-slate-600 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Explora y filtra las <strong className="text-slate-900 font-black">{fintechsData.length} empresas mapeadas</strong> según su modelo de negocio, vertical y regulación.
        </p>
      </div>

      {/* ── SECCIÓN DE CAJITAS ESTRUCTURADAS POR MODELO DE NEGOCIO (ESTILO SOLICITADO) ── */}
      <div className="mb-10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-700 uppercase font-mono tracking-wider flex items-center gap-2">
            <Filter className="w-4 h-4 text-cyan-600" />
            Selecciona tu modelo de negocio / vertical
          </h3>
          {activeCategoryCard && (
            <button
              onClick={() => setActiveCategoryCard(null)}
              className="text-xs font-black text-cyan-700 hover:text-cyan-800 underline cursor-pointer"
            >
              Ver todas las categorías
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORY_CARDS.map((card) => {
            const Icon = card.icon;
            const isSelected = activeCategoryCard === card.id;

            return (
              <div
                key={card.id}
                onClick={() => handleCategoryCardClick(card.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                  isSelected 
                    ? 'bg-cyan-600 text-white border-cyan-700 ring-2 ring-cyan-500 shadow-md scale-[1.02]' 
                    : 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-sm text-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-white text-cyan-700' : card.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-black uppercase font-mono px-2 py-0.5 rounded bg-white text-cyan-900">
                        Seleccionado
                      </span>
                    )}
                  </div>
                  <h4 className={`text-base font-black tracking-tight mb-1.5 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {card.title}
                  </h4>
                  <p className={`text-xs leading-relaxed font-medium ${isSelected ? 'text-cyan-100' : 'text-slate-600'}`}>
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controles de Búsqueda y Contador */}
      <div className="mb-8 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, vertical o país..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 font-medium focus:border-cyan-600 focus:outline-none shadow-xs"
          />
        </div>

        <div className="text-xs font-bold text-slate-700 font-mono">
          Mostrando <span className="text-cyan-700 font-black">{filteredData.length}</span> empresas encontradas
        </div>
      </div>

      {/* Grid de Tarjetas de Empresas de Alto Contraste */}
      {loadingData ? (
        <div className="text-center py-20 text-slate-500 space-y-3">
          <Activity className="w-8 h-8 mx-auto animate-spin text-cyan-600" />
          <p className="text-xs font-bold">Cargando directorio de empresas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <AnimatePresence mode="popLayout">
            {currentData.map((company: any, index: number) => (
              <motion.div
                key={`${company.Nombre}-${index}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Card className="h-full flex flex-col bg-white border-slate-200 hover:border-cyan-500 transition-all shadow-xs hover:shadow-md rounded-2xl p-5 justify-between group">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className="text-[10px] font-black uppercase font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                          📍 {company.País || "LATAM"}
                        </span>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight mt-1 group-hover:text-cyan-700 transition-colors">
                          {company.Nombre}
                        </h3>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4 h-4 text-slate-600" />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge className="bg-slate-100 text-slate-800 border-slate-300 font-extrabold text-[11px]">
                        {company.Segmento || "Fintech"}
                      </Badge>
                      {company.Vertical && company.Vertical !== company.Segmento && (
                        <Badge variant="outline" className="border-slate-200 text-slate-600 text-[10px] font-semibold">
                          {company.Vertical}
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {company.Descripción || `Plataforma especializada en ${company.Segmento || "tecnología financiera"} operando en la región de ${company.País || "LATAM"}.`}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-700">
                    <span>Mapeada en Radar 2026</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Ver Ficha <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      {!loadingData && filteredData.length === 0 && (
        <Card className="p-12 text-center bg-white border-dashed border-2 border-slate-300 rounded-2xl max-w-md mx-auto space-y-3">
          <Search className="w-10 h-10 mx-auto text-slate-400" />
          <h4 className="text-base font-black text-slate-900">No se encontraron resultados</h4>
          <p className="text-xs text-slate-600 font-medium">Intenta limpiar los filtros o buscar con otro término.</p>
          <button
            onClick={() => { setSearchTerm(''); setActiveSegment(null); setActiveCategoryCard(null); }}
            className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-extrabold hover:bg-cyan-700 transition-colors shadow-xs"
          >
            Limpiar Filtros
          </button>
        </Card>
      )}

      {/* Paginación de Alto Contraste */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 my-8">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-extrabold disabled:opacity-40 hover:bg-slate-100 transition-colors shadow-xs cursor-pointer flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>
          
          <div className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold shadow-xs">
            Página <span className="text-cyan-400 font-black">{currentPage}</span> de {totalPages}
          </div>

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-extrabold disabled:opacity-40 hover:bg-slate-100 transition-colors shadow-xs cursor-pointer flex items-center gap-1"
          >
            Siguiente <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

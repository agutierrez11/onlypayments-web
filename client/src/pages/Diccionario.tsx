import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Search, X, ExternalLink, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Zap, Activity
} from 'lucide-react';
import { Link } from 'wouter';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'comercial' | 'tecnico' | 'legal' | 'infraestructura';
  acronym?: string;
  source?: {
    name: string;
    url?: string;
  };
}

const mainCategories = [
  {
    id: 'comercial',
    num: '01',
    title: 'Comercial & Finanzas',
    subtitle: 'Adquirencia, MDR, Liquidación',
    desc: 'Reglas de adquirencia, comisión MDR, cuota de intercambio y ciclos de liquidación bancaria.',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'tecnico',
    num: '02',
    title: 'Técnico & Core',
    subtitle: 'PIX, SPEI, Bre-B, 3DS2',
    desc: 'Rieles de pago instantáneo (RTP), pasarelas, tokenización y protocolos de autenticación EMVCo.',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
  },
  {
    id: 'legal',
    num: '03',
    title: 'Legal & Compliance',
    subtitle: 'PCI DSS 4.0, KYC, PLD/FT',
    desc: 'Cumplimiento normativo, seguridad PCI DSS 4.0, verificación KYC/KYB y ley fintech.',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  },
  {
    id: 'infraestructura',
    num: '04',
    title: 'BaaS & Neobancos',
    subtitle: 'BaaS, Open Finance, IFPE',
    desc: 'Banking as a Service, finanzas abiertas, licencias de fondos de pago y wallets.',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
  }
];

const glossaryData: GlossaryTerm[] = [
  { 
    id: '1', 
    term: 'Adquirente', 
    definition: 'Entidad financiera regulada que procesa pagos con tarjeta en nombre del comercio y asume el riesgo de crédito inicial de las transacciones.', 
    category: 'comercial', 
    acronym: 'AQ',
    source: { name: 'Banco de México (Banxico)', url: 'https://www.banxico.org.mx/' }
  },
  { 
    id: '2', 
    term: 'Contracargo (Chargeback)', 
    definition: 'Mecanismo de disputa donde el titular de la tarjeta solicita a su banco emisor la devolución de un cargo, revirtiendo los fondos del comercio.', 
    category: 'legal',
    source: { name: 'Regulación Visa Core Rules' }
  },
  { 
    id: '3', 
    term: 'Pasarela de Pagos (Gateway)', 
    definition: 'Infraestructura tecnológica que encripta y transmite de forma segura los datos de pago desde el checkout hacia el procesador o adquirente.', 
    category: 'tecnico' 
  },
  { 
    id: '4', 
    term: 'Cuota de Intercambio (Interchange Fee)', 
    definition: 'Comisión que el banco adquirente paga al banco emisor por cada transacción con tarjeta, regulada o fijada por Visa / Mastercard.', 
    category: 'comercial',
    source: { name: 'Comisión Nacional Bancaria y de Valores (CNBV)' }
  },
  { 
    id: '5', 
    term: 'Liquidación (Settlement)', 
    definition: 'Proceso final donde el adquirente transfiere los fondos correspondientes a las ventas aprobadas hacia la cuenta bancaria del comercio.', 
    category: 'comercial' 
  },
  { 
    id: '6', 
    term: 'PCI DSS 4.0', 
    definition: 'Estándar de Seguridad de Datos para la Industria de Tarjeta de Pago. Normativa global obligatoria para procesar datos de tarjetas.', 
    category: 'legal', 
    acronym: 'PCI DSS',
    source: { name: 'PCI Security Standards Council', url: 'https://www.pcisecuritystandards.org/' }
  },
  { 
    id: '7', 
    term: 'PIX', 
    definition: 'Sistema de Pagos Instantáneos del Banco Central de Brasil que permite transferencias interbancarias 24/7 en tiempo real vía QR o llaves.', 
    category: 'tecnico',
    source: { name: 'Banco Central do Brasil (BCB)', url: 'https://www.bcb.gov.br/' }
  },
  { 
    id: '8', 
    term: 'SPEI / DiMo', 
    definition: 'Sistema de Pagos Electrónicos Interbancarios operado por Banco de México para transferencias 24/7 en tiempo real conectadas a celulares.', 
    category: 'tecnico',
    source: { name: 'Banco de México (Banxico)', url: 'https://www.banxico.org.mx/' }
  },
  { 
    id: '9', 
    term: 'Tokenización', 
    definition: 'Proceso de seguridad que reemplaza el PAN (número de tarjeta) por un token criptográfico único para compras recurrentes.', 
    category: 'tecnico',
    source: { name: 'EMVCo Tokenisation Specification' }
  },
  { 
    id: '10', 
    term: '3D Secure 2.0 (3DS2)', 
    definition: 'Protocolo de autenticación en compras online no presenciales que analiza datos biométricos y contextuales para reducir fraude.', 
    category: 'tecnico', 
    acronym: '3DS2',
    source: { name: 'EMVCo 3-D Secure Protocol' }
  },
  { 
    id: '11', 
    term: 'Bre-B (Colombia)', 
    definition: 'Nuevo riel de pagos inmediatos interoperable desarrollado por el Banco de la República de Colombia para unificar transferencias A2A.', 
    category: 'tecnico',
    source: { name: 'Banco de la República de Colombia' }
  },
  { 
    id: '12', 
    term: 'Merchant Discount Rate (MDR)', 
    definition: 'Porcentaje o tasa total que un comercio paga a su proveedor de pagos por cada transacción procesada.', 
    category: 'comercial' 
  },
  { 
    id: '13', 
    term: 'KYC / KYB', 
    definition: 'Proceso obligatorio de verificación de identidad de clientes y entidades jurídicas para prevención de lavado de dinero.', 
    category: 'legal',
    acronym: 'KYC'
  },
  { 
    id: '14', 
    term: 'Banking as a Service (BaaS)', 
    definition: 'Modelo que permite a fintechs y empresas ofrecer servicios bancarios (cuentas, tarjetas, pagos) vía APIs sin necesidad de licencia bancaria propia.', 
    category: 'infraestructura',
    acronym: 'BaaS'
  },
  { 
    id: '15', 
    term: 'Open Banking / Open Finance', 
    definition: 'Modelo que permite el intercambio seguro de datos de clientes y servicios financieros entre instituciones a través de APIs abiertas.', 
    category: 'infraestructura'
  },
  { 
    id: '16', 
    term: 'Licencia IFPE', 
    definition: 'Institución de Fondos de Pago Electrónico. Autorización otorgada por CNBV en México para emitir saldo digital y monederos electrónicos.', 
    category: 'infraestructura'
  }
];

interface Props {
  isEmbed?: boolean;
}

export default function Diccionario({ isEmbed }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const filteredTerms = glossaryData.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(search.toLowerCase()) ||
      term.definition.toLowerCase().includes(search.toLowerCase()) ||
      term.acronym?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 selection:bg-cyan-500 selection:text-white">
      {/* Header Navigation - Oculto en modo Marca Blanca / Embed */}
      {!isEmbed && (
        <div className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
          <div className="container max-w-5xl py-3.5 flex justify-between items-center px-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2 text-slate-700 hover:text-slate-900 text-xs font-bold border border-slate-300">
                  <ArrowLeft className="w-4 h-4 text-cyan-600" />
                  Volver al Inicio
                </Button>
              </Link>
              <span className="text-xs font-black text-cyan-700 flex items-center gap-2 font-mono">
                Diccionario de Medios de Pago LATAM
              </span>
            </div>

            <span className="text-[11px] font-mono font-bold text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
              25 Términos Verificados 2026
            </span>
          </div>
        </div>
      )}

      <div className="container max-w-5xl pt-8 px-4">
        {/* OPERATIONAL PANEL CONTAINER */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 mb-10 shadow-sm relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="text-xs font-mono text-slate-400 ml-2">Panel de Inteligencia · Diccionario OnlyPayments</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              En vivo
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-2">
              Diccionario de Medios de Pago v6.0
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Infraestructura conceptual y normativa del ecosistema Fintech en Latinoamérica por Fernando Estévez.
            </p>
          </div>

          {/* STEPPER: 4-STEP CONNECTED PIPELINE (INTELLIGENTIAL STYLE) */}
          <div className="mb-8">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest text-center mb-4">
              FLUJO DE CONOCIMIENTO FINTECH
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
              {mainCategories.map((cat, idx) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                    className={`text-left p-4 rounded-xl border transition-all relative z-10 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#121a2c] border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-400/40'
                        : 'bg-[#070b12]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#0d1424]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                          Completado
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white mb-1">{cat.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-snug">{cat.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* KPI METRIC CARDS (3 COLUMNS INTELLIGENTIAL STYLE) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-[#070b12]/90 border border-slate-800/80 rounded-xl p-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">TÉRMINOS VERIFICADOS</div>
              <div className="text-xl font-bold text-white font-mono mt-1">+25</div>
              <div className="text-[11px] text-emerald-400 mt-0.5">100% Normativa Banxico / EMVCo</div>
            </div>

            <div className="bg-[#070b12]/90 border border-slate-800/80 rounded-xl p-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">COBERTURA LATAM</div>
              <div className="text-xl font-bold text-white font-mono mt-1">6 Países</div>
              <div className="text-[11px] text-cyan-400 mt-0.5">MX, BR, CO, CL, PE, CR</div>
            </div>

            <div className="bg-[#070b12]/90 border border-slate-800/80 rounded-xl p-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">VERSIÓN AUTOR</div>
              <div className="text-xl font-bold text-white font-mono mt-1">v6.0</div>
              <div className="text-[11px] text-purple-400 mt-0.5">Por Fernando Estévez</div>
            </div>
          </div>

          {/* Search Box inside Panel */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar término, sigla o regulación (ej. SPEI, PIX, PCI DSS, BaaS)..."
              className="w-full bg-[#070b12] border border-slate-800 rounded-xl pl-11 pr-10 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* TERMS LIST (INTELLIGENTIAL ACTIVITY FEED STYLE) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {selectedCategory ? mainCategories.find(c => c.id === selectedCategory)?.title : 'REGISTROS ACTIVOS'}
            </span>
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)} className="text-xs font-mono text-emerald-400 hover:underline">
                Ver todos
              </button>
            )}
          </div>

          {filteredTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => setSelectedTerm(term)}
              className="bg-[#0b101b] border border-slate-800/80 hover:border-emerald-500/40 rounded-xl p-4 cursor-pointer transition-all hover:bg-[#0f1727] flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors font-sans truncate">
                      {term.term}
                    </span>
                    {term.acronym && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                        {term.acronym}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate max-w-xl">
                    {term.definition}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 text-slate-400 group-hover:text-emerald-400 transition-colors">
                <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">Ver detalle</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}

          {filteredTerms.length === 0 && (
            <div className="text-center py-12 bg-[#0b101b] rounded-xl border border-slate-800 text-slate-400 text-xs">
              No se encontraron términos para tu búsqueda.
            </div>
          )}
        </div>

        {/* Modal de Detalle */}
        <AnimatePresence>
          {selectedTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
              onClick={() => setSelectedTerm(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-[#0b101b] border border-emerald-500/40 rounded-2xl shadow-2xl p-6 relative overflow-hidden"
              >
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
                    {mainCategories.find(c => c.id === selectedTerm.category)?.title}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 font-sans flex items-center gap-2">
                  {selectedTerm.term}
                  {selectedTerm.acronym && (
                    <span className="text-xs font-mono text-emerald-400">({selectedTerm.acronym})</span>
                  )}
                </h2>

                <div className="bg-[#070b12] border border-slate-800/80 rounded-xl p-4 mb-5">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    {selectedTerm.definition}
                  </p>
                </div>

                {selectedTerm.source && (
                  <div className="p-3 rounded-lg bg-[#070b12] border border-slate-800/60 text-xs flex items-center justify-between text-slate-400 font-mono">
                    <span>Fuente Verificada:</span>
                    {selectedTerm.source.url ? (
                      <a href={selectedTerm.source.url} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1">
                        {selectedTerm.source.name} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-200">{selectedTerm.source.name}</span>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

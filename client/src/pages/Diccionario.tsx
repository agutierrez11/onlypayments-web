import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search, BookOpen, Scale, Cpu, DollarSign, X, ExternalLink, ArrowLeft, ArrowRight, ShieldCheck, Landmark, RefreshCw, Zap
} from 'lucide-react';
import { Link } from 'wouter';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'legal' | 'tecnico' | 'comercial' | 'infraestructura';
  acronym?: string;
  icon?: string;
  source?: {
    name: string;
    url?: string;
  };
}

const mainCategories = [
  {
    id: 'comercial',
    title: 'Comercial & Finanzas',
    icon: '💳',
    desc: 'Adquirencia, MDR, Cuota de Intercambio, Liquidación, Remesas',
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
  },
  {
    id: 'tecnico',
    title: 'Técnico & Core',
    icon: '⚡',
    desc: 'PIX, SPEI, Bre-B, Pasarelas, Tokenización, 3DS2, APIs',
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
  },
  {
    id: 'legal',
    title: 'Legal & Compliance',
    icon: '⚖️',
    desc: 'PCI DSS 4.0, KYC/KYB, PLD/FT, Ley Fintech México/Chile',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
  },
  {
    id: 'infraestructura',
    title: 'BaaS & Neobancos',
    icon: '🏛️',
    desc: 'BaaS, Open Finance, Licencias IFPE, Cuentas & Wallets',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
  }
];

const glossaryData: GlossaryTerm[] = [
  { 
    id: '1', 
    term: 'Adquirente', 
    definition: 'Entidad financiera regulada que procesa pagos con tarjeta en nombre del comercio y asume el riesgo de crédito inicial de las transacciones.', 
    category: 'comercial', 
    acronym: 'AQ',
    icon: '💳',
    source: { name: 'Banco de México (Banxico)', url: 'https://www.banxico.org.mx/' }
  },
  { 
    id: '2', 
    term: 'Contracargo (Chargeback)', 
    definition: 'Mecanismo de disputa donde el titular de la tarjeta solicita a su banco emisor la devolución de un cargo, revirtiendo los fondos del comercio.', 
    category: 'legal',
    icon: '🛡️',
    source: { name: 'Regulación Visa Core Rules' }
  },
  { 
    id: '3', 
    term: 'Pasarela de Pagos (Gateway)', 
    definition: 'Infraestructura tecnológica que encripta y transmite de forma segura los datos de pago desde el checkout hacia el procesador o adquirente.', 
    category: 'tecnico',
    icon: '🔌'
  },
  { 
    id: '4', 
    term: 'Cuota de Intercambio (Interchange Fee)', 
    definition: 'Comisión que el banco adquirente paga al banco emisor por cada transacción con tarjeta, regulada o fijada por Visa / Mastercard.', 
    category: 'comercial',
    icon: '📊',
    source: { name: 'Comisión Nacional Bancaria y de Valores (CNBV)' }
  },
  { 
    id: '5', 
    term: 'Liquidación (Settlement)', 
    definition: 'Proceso final donde el adquirente transfiere los fondos correspondientes a las ventas aprobadas hacia la cuenta bancaria del comercio.', 
    category: 'comercial',
    icon: '🏦'
  },
  { 
    id: '6', 
    term: 'PCI DSS 4.0', 
    definition: 'Estándar de Seguridad de Datos para la Industria de Tarjeta de Pago. Normativa global obligatoria para procesar datos de tarjetas.', 
    category: 'legal', 
    acronym: 'PCI DSS',
    icon: '🔐',
    source: { name: 'PCI Security Standards Council', url: 'https://www.pcisecuritystandards.org/' }
  },
  { 
    id: '7', 
    term: 'PIX', 
    definition: 'Sistema de Pagos Instantáneos del Banco Central de Brasil que permite transferencias interbancarias 24/7 en tiempo real vía QR o llaves.', 
    category: 'tecnico',
    icon: '🇧🇷',
    source: { name: 'Banco Central do Brasil (BCB)', url: 'https://www.bcb.gov.br/' }
  },
  { 
    id: '8', 
    term: 'SPEI / DiMo', 
    definition: 'Sistema de Pagos Electrónicos Interbancarios operado por Banco de México para transferencias 24/7 en tiempo real conectadas a celulares.', 
    category: 'tecnico',
    icon: '🇲🇽',
    source: { name: 'Banco de México (Banxico)', url: 'https://www.banxico.org.mx/' }
  },
  { 
    id: '9', 
    term: 'Tokenización', 
    definition: 'Proceso de seguridad que reemplaza el PAN (número de tarjeta) por un token criptográfico único para compras recurrentes.', 
    category: 'tecnico',
    icon: '🔑',
    source: { name: 'EMVCo Tokenisation Specification' }
  },
  { 
    id: '10', 
    term: '3D Secure 2.0 (3DS2)', 
    definition: 'Protocolo de autenticación en compras online no presenciales que analiza datos biométricos y contextuales para reducir fraude.', 
    category: 'tecnico', 
    acronym: '3DS2',
    icon: '🛡️',
    source: { name: 'EMVCo 3-D Secure Protocol' }
  },
  { 
    id: '11', 
    term: 'Bre-B (Colombia)', 
    definition: 'Nuevo riel de pagos inmediatos interoperable desarrollado por el Banco de la República de Colombia para unificar transferencias A2A.', 
    category: 'tecnico',
    icon: '🇨🇴',
    source: { name: 'Banco de la República de Colombia' }
  },
  { 
    id: '12', 
    term: 'Merchant Discount Rate (MDR)', 
    definition: 'Porcentaje o tasa total que un comercio paga a su proveedor de pagos por cada transacción procesada.', 
    category: 'comercial',
    icon: '💸'
  },
  { 
    id: '13', 
    term: 'KYC / KYB', 
    definition: 'Proceso obligatorio de verificación de identidad de clientes y entidades jurídicas para prevención de lavado de dinero.', 
    category: 'legal',
    acronym: 'KYC',
    icon: '🆔'
  },
  { 
    id: '14', 
    term: 'Banking as a Service (BaaS)', 
    definition: 'Modelo que permite a fintechs y empresas ofrecer servicios bancarios (cuentas, tarjetas, pagos) vía APIs sin necesidad de licencia bancaria propia.', 
    category: 'infraestructura',
    acronym: 'BaaS',
    icon: '🏛️'
  },
  { 
    id: '15', 
    term: 'Open Banking / Open Finance', 
    definition: 'Modelo que permite el intercambio seguro de datos de clientes y servicios financieros entre instituciones a través de APIs abiertas.', 
    category: 'infraestructura',
    icon: '🌐'
  },
  { 
    id: '16', 
    term: 'Licencia IFPE', 
    definition: 'Institución de Fondos de Pago Electrónico. Autorización otorgada por CNBV en México para emitir saldo digital y monederos electrónicos.', 
    category: 'infraestructura',
    icon: '📜'
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
    <div className="min-h-screen bg-[#020408] text-[#e8f4f8] font-sans pb-20 selection:bg-[#00f5d4] selection:text-black">
      {/* Header Bar */}
      <div className="border-b border-[rgba(0,245,212,0.1)] bg-[#020408]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="container max-w-5xl py-3.5 flex justify-between items-center px-4">
          <div className="flex items-center gap-3">
            {!isEmbed && (
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2 text-[#6b8a9a] hover:text-white text-xs">
                  <ArrowLeft className="w-4 h-4" />
                  Volver al inicio
                </Button>
              </Link>
            )}
            <span className="text-xs font-mono font-semibold text-[#00f5d4] flex items-center gap-2">
              Diccionario de Pagos
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#0a0e17] text-[#00f5d4] border border-[rgba(0,245,212,0.2)]">
                OnlyPayments
              </span>
            </span>
          </div>

          <span className="text-[11px] font-mono text-[#6b8a9a]">
            {filteredTerms.length} Términos Mapeados
          </span>
        </div>
      </div>

      <div className="container max-w-5xl pt-10 px-4">
        {/* Title Section */}
        <div className="text-center mb-10">
          <div className="inline-block bg-[rgba(0,245,212,0.08)] border border-[rgba(0,245,212,0.2)] text-[#00f5d4] px-4 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            LATAM Fintech Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display mb-4">
            Diccionario de Medios de Pago
          </h1>
          <p className="text-sm sm:text-base text-[#6b8a9a] max-w-2xl mx-auto leading-relaxed">
            Explora la terminología técnica, legal y comercial del ecosistema fintech en Latinoamérica. Selecciona una categoría o busca directamente.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b8a9a]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar término, sigla o concepto (ej. SPEI, PIX, PCI DSS, BaaS)..."
            className="w-full bg-[#0a0e17] border border-[rgba(0,245,212,0.2)] rounded-2xl pl-12 pr-12 py-4 text-sm sm:text-base text-white placeholder:text-[#6b8a9a] outline-none focus:border-[#00f5d4] focus:ring-1 focus:ring-[#00f5d4] shadow-2xl transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b8a9a] hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* ESTRUCTURA VISUAL MATCHER STYLE: Grid de 4 Categorías Principales */}
        {!search && (
          <div className="mb-12">
            <div className="text-xs font-mono text-[#6b8a9a] uppercase tracking-widest text-center mb-6">
              Selecciona una categoría para explorar:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mainCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                    className={`text-left p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-[#0e1626] border-[#00f5d4] shadow-[0_0_25px_rgba(0,245,212,0.15)] ring-1 ring-[#00f5d4]'
                        : 'bg-[#0a0e17] border-[rgba(0,245,212,0.1)] hover:border-[rgba(0,245,212,0.3)] hover:bg-[#0c121e] hover:-translate-y-1'
                    }`}
                  >
                    <div>
                      <div className="text-3xl mb-4 p-3 rounded-xl bg-[#020408] inline-block border border-[rgba(0,245,212,0.1)] shadow-md">
                        {cat.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00f5d4] transition-colors mb-2 font-display">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-[#6b8a9a] leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[rgba(0,245,212,0.08)] flex items-center justify-between text-xs text-[#00f5d4] font-mono">
                      <span>{isSelected ? 'Filtrado' : 'Explorar'}</span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Lista de Términos (Tarjetas Visuales Matcher Style) */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white font-display">
            {selectedCategory ? mainCategories.find(c => c.id === selectedCategory)?.title : 'Todos los Términos'}
          </h2>
          {selectedCategory && (
            <button onClick={() => setSelectedCategory(null)} className="text-xs font-mono text-[#00f5d4] hover:underline">
              Limpiar filtro ✕
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => setSelectedTerm(term)}
              className="text-left p-6 rounded-2xl border border-[rgba(0,245,212,0.1)] bg-[#0a0e17] hover:border-[rgba(0,245,212,0.3)] hover:bg-[#0c121e] transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{term.icon || '📄'}</span>
                    <div>
                      <h4 className="font-bold text-lg text-white group-hover:text-[#00f5d4] transition-colors font-display">
                        {term.term}
                      </h4>
                      {term.acronym && (
                        <span className="text-[10px] font-mono text-[#6b8a9a] bg-[#020408] px-2 py-0.5 rounded border border-[rgba(0,245,212,0.1)]">
                          {term.acronym}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#6b8a9a] group-hover:text-[#00f5d4] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-[#6b8a9a] line-clamp-2 leading-relaxed">
                  {term.definition}
                </p>
              </div>
            </div>
          ))}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-[#0a0e17] border border-[rgba(0,245,212,0.3)] rounded-2xl shadow-2xl p-6 relative"
              >
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="absolute top-4 right-4 text-[#6b8a9a] hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{selectedTerm.icon || '📄'}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">{selectedTerm.term}</h3>
                    {selectedTerm.acronym && (
                      <span className="text-xs font-mono text-[#00f5d4]">{selectedTerm.acronym}</span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-[#e8f4f8] leading-relaxed mb-6 bg-[#020408] p-4 rounded-xl border border-[rgba(0,245,212,0.1)]">
                  {selectedTerm.definition}
                </p>

                {selectedTerm.source && (
                  <div className="p-3.5 rounded-xl bg-[#020408] border border-[rgba(0,245,212,0.1)] text-xs">
                    <div className="text-[10px] font-mono text-[#6b8a9a] uppercase mb-1">Fuente Verificada</div>
                    {selectedTerm.source.url ? (
                      <a href={selectedTerm.source.url} target="_blank" rel="noreferrer" className="text-xs text-[#00f5d4] hover:underline flex items-center gap-1">
                        {selectedTerm.source.name} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-white">{selectedTerm.source.name}</span>
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

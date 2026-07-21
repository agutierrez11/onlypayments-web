import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search, Command, ArrowRight, BookOpen, Scale, Cpu, DollarSign, X, ExternalLink, ArrowLeft, Code, Copy, Check, Filter
} from 'lucide-react';
import { Link } from 'wouter';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'legal' | 'tecnico' | 'comercial';
  acronym?: string;
  source?: {
    name: string;
    url?: string;
  };
}

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
    definition: 'Mecanismo de disputa donde el titular de la tarjeta solicita a su banco emisor la devolución de un cargo, revirtiendo los fondos de la cuenta del comercio.', 
    category: 'legal',
    source: { name: 'Regulación Visa Core Rules' }
  },
  { 
    id: '3', 
    term: 'Pasarela de Pagos (Payment Gateway)', 
    definition: 'Infraestructura tecnológica que encripta y transmite de forma segura los datos de pago desde el checkout del comercio hacia el procesador o adquirente.', 
    category: 'tecnico' 
  },
  { 
    id: '4', 
    term: 'Cuota de Intercambio (Interchange Fee)', 
    definition: 'Comisión que el banco adquirente paga al banco emisor por cada transacción con tarjeta, regulada o determinada por las marcas (Visa / Mastercard).', 
    category: 'comercial',
    source: { name: 'Comisión Nacional Bancaria y de Valores (CNBV)' }
  },
  { 
    id: '5', 
    term: 'Liquidación (Settlement)', 
    definition: 'Proceso final donde el adquirente o agregador transfiere los fondos correspondientes a las ventas aprobadas hacia la cuenta bancaria del comercio.', 
    category: 'comercial' 
  },
  { 
    id: '6', 
    term: 'PCI DSS 4.0', 
    definition: 'Estándar de Seguridad de Datos para la Industria de Tarjetas de Pago. Normativa global obligatoria para cualquier entidad que procese, almacene o transmita datos de tarjetas.', 
    category: 'legal', 
    acronym: 'PCI DSS',
    source: { name: 'PCI Security Standards Council', url: 'https://www.pcisecuritystandards.org/' }
  },
  { 
    id: '7', 
    term: 'PIX', 
    definition: 'Sistema de Pagos Instantáneos creado por el Banco Central de Brasil que permite transferencias interbancarias 24/7 en tiempo real vía código QR o llaves.', 
    category: 'tecnico',
    source: { name: 'Banco Central do Brasil (BCB)', url: 'https://www.bcb.gov.br/' }
  },
  { 
    id: '8', 
    term: 'SPEI / DiMo', 
    definition: 'Sistema de Pagos Electrónicos Interbancarios operado por Banco de México para transferencias 24/7 en tiempo real conectadas a números celulares.', 
    category: 'tecnico',
    source: { name: 'Banco de México (Banxico)', url: 'https://www.banxico.org.mx/' }
  },
  { 
    id: '9', 
    term: 'Tokenización', 
    definition: 'Proceso de seguridad que reemplaza el PAN (Primary Account Number) de una tarjeta por un token criptográfico único para compras recurrentes e in-app.', 
    category: 'tecnico',
    source: { name: 'EMVCo Tokenisation Specification' }
  },
  { 
    id: '10', 
    term: '3D Secure 2.0 (3DS2)', 
    definition: 'Protocolo de autenticación en compras online no presenciales que analiza datos biométricos y contextuales para reducir fraude sin fricción.', 
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
    term: 'KYC / KYB (Know Your Customer / Business)', 
    definition: 'Proceso obligatorio de verificación de identidad de clientes y entidades jurídicas para prevención de lavado de dinero.', 
    category: 'legal',
    acronym: 'KYC'
  },
  { 
    id: '14', 
    term: 'PLD / FT', 
    definition: 'Prevención de Lavado de Dinero y Financiamiento al Terrorismo. Marco regulatorio internacional aplicado a entidades financieras y fintechs.', 
    category: 'legal' 
  },
  { 
    id: '15', 
    term: 'Rolling Reserve', 
    definition: 'Fondo de reserva retenido temporalmente por el procesador (ej. 10% por 180 días) para cubrir posibles contracargos o reembolsos en comercios de alto riesgo.', 
    category: 'comercial' 
  },
  { 
    id: '16', 
    term: 'Split Payments', 
    definition: 'Funcionalidad tecnológica que permite dividir automáticamente un único pago entre múltiples cuentas de vendedores en un Marketplace.', 
    category: 'tecnico' 
  },
  { 
    id: '17', 
    term: 'ISO 20022', 
    definition: 'Estándar internacional de mensajería financiera para el intercambio electrónico de datos entre instituciones bancarias a nivel global.', 
    category: 'tecnico' 
  },
  { 
    id: '18', 
    term: 'Agregador de Pagos', 
    definition: 'Entidad que agrupa a múltiples comercios bajo una sola cuenta adquirente propia para simplificar el cobro sin requerir cuenta directa en cada banco.', 
    category: 'comercial' 
  },
  { 
    id: '19', 
    term: 'Open Banking / Open Finance', 
    definition: 'Modelo que permite el intercambio seguro de datos de clientes y servicios financieros entre instituciones a través de APIs abiertas previa autorización.', 
    category: 'tecnico' 
  },
  { 
    id: '20', 
    term: 'Ley Fintech México (N° 2018)', 
    definition: 'Marco regulatorio que legisla las Instituciones de Tecnología Financiera (ITF), fondos de pago electrónico (IFPE) y financiamiento colectivo.', 
    category: 'legal' 
  },
  { 
    id: '21', 
    term: 'Ley Fintech Chile (N° 21.521)', 
    definition: 'Normativa de 2023 que regula la prestación de servicios financieros basados en tecnología, Open Banking y plataformas de crowdfunding en Chile.', 
    category: 'legal' 
  },
  { 
    id: '22', 
    term: 'Smart Routing (Enrutamiento Inteligente)', 
    definition: 'Algoritmo que selecciona automáticamente la mejor pasarela o adquirente para cada transacción en tiempo real según tasa de aprobación y costo.', 
    category: 'tecnico' 
  },
  { 
    id: '23', 
    term: 'Yape / Plin (Perú)', 
    definition: 'Ecosistema de billeteras digitales interoperables en Perú regulado por el Banco Central de Reserva del Perú (BCRP).', 
    category: 'tecnico' 
  },
  { 
    id: '24', 
    term: 'SINPE Móvil (Costa Rica)', 
    definition: 'Riel de pagos electrónicos inmediatos del Banco Central de Costa Rica (BCCR) ligado a números celulares.', 
    category: 'tecnico' 
  },
  { 
    id: '25', 
    term: 'Licencia IFPE', 
    definition: 'Institución de Fondos de Pago Electrónico. Autorización otorgada por CNBV en México para emitir saldo digital y monederos electrónicos.', 
    category: 'legal' 
  }
];

const categoryConfig = {
  legal: { label: 'Legal y Compliance', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10', icon: Scale },
  tecnico: { label: 'Técnico y Core', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10', icon: Cpu },
  comercial: { label: 'Comercial y Finanzas', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10', icon: DollarSign },
};

interface Props {
  isEmbed?: boolean;
}

export default function Diccionario({ isEmbed }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const filteredTerms = glossaryData.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(search.toLowerCase()) ||
      term.definition.toLowerCase().includes(search.toLowerCase()) ||
      term.acronym?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyQuote = (term: GlossaryTerm) => {
    navigator.clipboard.writeText(`"${term.term}": ${term.definition} — Fuente: OnlyPayments / Fernando Estévez`);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans pb-20 selection:bg-cyan-500 selection:text-black">
      {/* Header HUD Bar */}
      <div className="border-b border-slate-800/80 bg-[#0f172a]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="container max-w-6xl py-3 flex justify-between items-center px-4">
          <div className="flex items-center gap-3">
            {!isEmbed && (
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2 text-slate-400 hover:text-white text-xs">
                  <ArrowLeft className="w-4 h-4" />
                  Inicio
                </Button>
              </Link>
            )}
            <span className="text-xs font-mono font-semibold text-cyan-400 flex items-center gap-2">
              📖 DICCIONARIO FINTECH v6.0
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                Fernando Estévez
              </span>
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            {filteredTerms.length} Términos Verificados
          </span>
        </div>
      </div>

      <div className="container max-w-6xl pt-8 px-4">
        {/* Search & Filter Control Panel (Kimi SearchBox Style) */}
        <div className="bg-[#111827]/80 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar término, sigla (SPEI, PIX, PCI)..."
                className="w-full bg-[#0b0f19] border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-500 transition-colors font-mono"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                  selectedCategory === null
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                    : 'bg-[#0b0f19] text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                Todos ({glossaryData.length})
              </button>
              {(['legal', 'tecnico', 'comercial'] as const).map((cat) => {
                const config = categoryConfig[cat];
                const Icon = config.icon;
                const count = glossaryData.filter(t => t.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                      selectedCategory === cat
                        ? config.color + " font-bold shadow-sm"
                        : 'bg-[#0b0f19] text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {config.label.split(' ')[0]} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Layout: Grid Compacto + Panel HUD Lateral (Kimi Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Columna Izquierda: Grid de Tarjetas Compactas */}
          <div className={`${selectedTerm ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all duration-300`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
              {filteredTerms.map((term) => {
                const isSelected = selectedTerm?.id === term.id;
                const config = categoryConfig[term.category];
                return (
                  <button
                    key={term.id}
                    onClick={() => setSelectedTerm(isSelected ? null : term)}
                    className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-[#1e293b] border-cyan-500/60 shadow-lg ring-1 ring-cyan-500/30'
                        : 'bg-[#111827]/90 border-slate-800 hover:border-slate-700 hover:bg-[#162032]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors font-sans">
                          {term.term}
                        </span>
                        {term.acronym && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                            {term.acronym}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-mono text-[10px] text-slate-500">Clic para detalles</span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'group-hover:translate-x-0.5 text-slate-500'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredTerms.length === 0 && (
              <div className="text-center py-16 bg-[#111827]/50 rounded-2xl border border-slate-800 text-slate-400">
                No se encontraron términos para "{search}".
              </div>
            )}
          </div>

          {/* Columna Derecha: Panel Lateral Flotante Kimi DetailPanel */}
          <AnimatePresence>
            {selectedTerm && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:col-span-5 sticky top-20"
              >
                <div className="bg-[#111827] border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${categoryConfig[selectedTerm.category].color}`}>
                        {categoryConfig[selectedTerm.category].label}
                      </span>
                      <h2 className="text-xl font-bold text-white mt-2 font-sans flex items-center gap-2">
                        {selectedTerm.term}
                        {selectedTerm.acronym && (
                          <span className="text-xs font-mono text-cyan-400">({selectedTerm.acronym})</span>
                        )}
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedTerm(null)}
                      className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4">
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                        Definición Oficial
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {selectedTerm.definition}
                      </p>
                    </div>

                    {selectedTerm.source && (
                      <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-3.5">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                          Fuente Verificada
                        </div>
                        {selectedTerm.source.url ? (
                          <a
                            href={selectedTerm.source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1.5"
                          >
                            {selectedTerm.source.name}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-xs font-mono text-slate-300">{selectedTerm.source.name}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyQuote(selectedTerm)}
                      className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs gap-2 rounded-xl py-2.5"
                    >
                      {copiedQuote ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedQuote ? '¡Cita Copiada!' : 'Copiar Cita'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

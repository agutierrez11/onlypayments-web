import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search, Command, ArrowRight, BookOpen, Scale, Cpu, DollarSign, X, ExternalLink, ArrowLeft, Code, Copy, Check, Share2
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
    definition: 'Entidad financiera que procesa pagos con tarjeta en nombre del comercio y asume el riesgo de crédito inicial de las transacciones.', 
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
    definition: 'Infraestructura tecnológica que encripta y transmite de forma segura los datos de pago desde el sitio del comercio hacia el procesador o adquirente.', 
    category: 'tecnico' 
  },
  { 
    id: '4', 
    term: 'Cuota de Intercambio (Interchange Fee)', 
    definition: 'Comisión que el banco adquirente paga al banco emisor por cada transacción con tarjeta, determinada por las marcas (Visa/Mastercard).', 
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
    term: 'PCI DSS', 
    definition: 'Estándar de Seguridad de Datos para la Industria de Tarjeta de Pago. Requisito global para cualquier entidad que procese, almacene o transmita datos de tarjetas.', 
    category: 'legal', 
    acronym: 'PCI DSS',
    source: { name: 'PCI Security Standards Council', url: 'https://www.pcisecuritystandards.org/' }
  },
  { 
    id: '7', 
    term: 'PIX', 
    definition: 'Sistema de Pagos Instantáneos creado por el Banco Central de Brasil que permite transferencias 24/7 en tiempo real.', 
    category: 'tecnico',
    source: { name: 'Banco Central do Brasil (BCB)', url: 'https://www.bcb.gov.br/estabilidadefinanceira/pix' }
  },
  { 
    id: '8', 
    term: 'SPEI', 
    definition: 'Sistema de Pagos Electrónicos Interbancarios, operado por Banco de México, para pagos en tiempo real entre cuentas bancarias.', 
    category: 'tecnico',
    source: { name: 'Banco de México (Banxico)', url: 'https://www.banxico.org.mx/' }
  },
  { 
    id: '9', 
    term: 'Tokenización', 
    definition: 'Proceso de seguridad que reemplaza el PAN (Primary Account Number) de una tarjeta por un identificador digital único (Token) para evitar exponer datos sensibles.', 
    category: 'tecnico',
    source: { name: 'EMVCo Tokenisation Specification' }
  },
  { 
    id: '10', 
    term: '3D Secure', 
    definition: 'Protocolo de mensajería XML desarrollado para permitir la autenticación de titulares de tarjetas durante compras online no presenciales.', 
    category: 'tecnico', 
    acronym: '3DS',
    source: { name: 'EMVCo 3-D Secure Protocol' }
  },
];

const categoryConfig = {
  legal: { label: 'Legal y Compliance', color: 'bg-amber-500/15 text-amber-500 border-amber-500/20', icon: Scale },
  tecnico: { label: 'Técnico y Core', color: 'bg-blue-500/15 text-blue-500 border-blue-500/20', icon: Cpu },
  comercial: { label: 'Comercial y Finanzas', color: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/20', icon: DollarSign },
};

interface Props {
  isEmbed?: boolean;
}

export default function Diccionario({ isEmbed }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  
  // Estado para modal de código embebible
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [partnerUrl, setPartnerUrl] = useState('');
  const [partnerName, setPartnerName] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedTerm(null);
        setShowEmbedModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredTerms = glossaryData.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(search.toLowerCase()) ||
      term.definition.toLowerCase().includes(search.toLowerCase()) ||
      term.acronym?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://onlypayments-web.vercel.app';
  const embedCodeSnippet = `<iframe src="${baseUrl}/embed/diccionario${partnerUrl ? `?partner_url=${encodeURIComponent(partnerUrl)}&partner_name=${encodeURIComponent(partnerName || 'Partner')}` : ''}" width="100%" height="650" frameborder="0" style="border:1px solid rgba(255,255,255,0.1); border-radius:16px; overflow:hidden;" allow="clipboard-write"></iframe>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCodeSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header / Navigation */}
      {!isEmbed ? (
        <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
              </Button>
            </Link>

            <Button
              onClick={() => setShowEmbedModal(true)}
              variant="outline"
              size="sm"
              className="gap-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-xs font-mono"
            >
              <Code className="w-3.5 h-3.5" />
              Embeber Diccionario
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
          <div className="container py-3 flex justify-between items-center px-4">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              Diccionario de Pagos
              <Badge variant="secondary" className="bg-cyan-950 text-cyan-400 border-cyan-800 text-[10px]">
                OnlyPayments
              </Badge>
            </span>

            <a
              href={`${baseUrl}/diccionario`}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              Ver Diccionario Completo
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      <div className="container max-w-3xl pt-12">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="outline" className="text-xs bg-muted/50">
              <BookOpen className="w-3 h-3 mr-2" />
              INTELIGENCIA B2B
            </Badge>

            {!isEmbed && (
              <Badge 
                onClick={() => setShowEmbedModal(true)}
                className="cursor-pointer bg-cyan-950 text-cyan-400 border-cyan-800/80 hover:bg-cyan-900 text-xs gap-1.5"
              >
                <Share2 className="w-3 h-3" />
                Widget Embebible
              </Badge>
            )}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Diccionario de Pagos
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Toda la terminología del ecosistema Fintech. Verificada y estructurada para profesionales.
          </p>
        </div>

        {/* Search Trigger */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-xl border border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/50 transition-colors mb-8 group shadow-sm"
        >
          <Search className="w-5 h-5 group-hover:text-foreground transition-colors" />
          <span className="flex-1 text-left text-sm group-hover:text-foreground transition-colors">Buscar término, sigla o tecnología...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-background border border-border text-[10px] font-mono shadow-sm">
            <Command className="w-3 h-3" />K
          </kbd>
        </button>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(['legal', 'tecnico', 'comercial'] as const).map((cat) => {
            const config = categoryConfig[cat];
            const Icon = config.icon;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  selectedCategory === cat ? config.color + " shadow-sm" : 'bg-muted/30 text-muted-foreground border-transparent hover:bg-muted/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {config.label}
              </button>
            );
          })}
        </div>

        {/* Terms List */}
        <div className="space-y-3">
          {filteredTerms.map((term) => (
            <motion.button
              key={term.id}
              onClick={() => setSelectedTerm(term)}
              className="w-full text-left p-5 rounded-xl border border-border/40 bg-card/50 hover:bg-card hover:border-border transition-all group shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-bold text-lg group-hover:text-primary transition-colors">
                      {term.term}
                    </span>
                    {term.acronym && (
                      <Badge variant="secondary" className="text-[10px] font-mono">{term.acronym}</Badge>
                    )}
                    <Badge className={`text-[10px] uppercase tracking-wider ${categoryConfig[term.category].color}`}>
                      {categoryConfig[term.category].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{term.definition}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
            </motion.button>
          ))}
          {filteredTerms.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No se encontraron términos para tu búsqueda.
            </div>
          )}
        </div>

        {/* Modal de Código Embebible */}
        <AnimatePresence>
          {showEmbedModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
              onClick={() => setShowEmbedModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl bg-card border border-border/80 rounded-2xl shadow-2xl p-6 relative overflow-hidden"
              >
                <button
                  onClick={() => setShowEmbedModal(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xl font-bold text-foreground">Código de Inserción (Embed)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Copia este fragmento HTML para insertar el **Diccionario de Pagos de OnlyPayments** directamente en tu sitio web, blog o documentación B2B.
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-mono text-muted-foreground block mb-1">
                      Nombre de la Marca / Autor (Opcional):
                    </label>
                    <input
                      type="text"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      placeholder="Ej. MiFintech / Blog de Pagos"
                      className="w-full bg-muted/40 border border-border/60 text-foreground text-xs px-3 py-2 rounded-lg outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-muted-foreground block mb-1">
                      URL del Autor / Partner (Opcional):
                    </label>
                    <input
                      type="text"
                      value={partnerUrl}
                      onChange={(e) => setPartnerUrl(e.target.value)}
                      placeholder="https://mitarget.com"
                      className="w-full bg-muted/40 border border-border/60 text-foreground text-xs px-3 py-2 rounded-lg outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-cyan-400 block mb-1 flex items-center justify-between">
                      <span>Código iframe generado:</span>
                      <span className="text-[10px] text-muted-foreground">HTML Iframe</span>
                    </label>
                    <div className="relative">
                      <pre className="bg-slate-950 text-cyan-300 border border-border p-4 rounded-xl text-[11px] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-32">
                        {embedCodeSnippet}
                      </pre>
                      <Button
                        onClick={copyEmbedCode}
                        className="absolute top-2 right-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 shadow-md"
                      >
                        {copiedSnippet ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            ¡Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copiar Código
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/20 border border-border/40 p-3 rounded-xl text-[11px] text-muted-foreground flex items-center justify-between">
                  <span>URL Directa: <code className="text-foreground">{baseUrl}/embed/diccionario</code></span>
                  <a href={`${baseUrl}/embed/diccionario`} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 font-mono">
                    Probar Vista <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Command Palette Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl mx-4 bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-4 border-b border-border/40 bg-muted/10">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar término, sigla o definición..."
                    className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground"
                  />
                  <Badge variant="outline" className="hidden sm:inline-flex text-[10px] text-muted-foreground">ESC</Badge>
                  <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-muted ml-2 text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  {filteredTerms.slice(0, 8).map((term) => (
                    <button
                      key={term.id}
                      onClick={() => { setSelectedTerm(term); setIsOpen(false); }}
                      className="w-full text-left p-4 rounded-xl hover:bg-muted transition-colors flex items-start gap-4 group"
                    >
                      <div className={`p-2 rounded-lg ${categoryConfig[term.category].color} bg-opacity-20`}>
                        {(() => {
                          const Icon = categoryConfig[term.category].icon;
                          return <Icon className="w-5 h-5" />;
                        })()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm group-hover:text-primary transition-colors">{term.term}</span>
                          {term.acronym && <span className="text-[10px] text-muted-foreground font-mono bg-background px-1.5 py-0.5 rounded border border-border">{term.acronym}</span>}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{term.definition}</div>
                      </div>
                    </button>
                  ))}
                  {filteredTerms.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No hay resultados para "{search}"
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Term Detail Modal */}
        <AnimatePresence>
          {selectedTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
              onClick={() => setSelectedTerm(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className={`h-2 w-full ${categoryConfig[selectedTerm.category].color.split(' ')[0].replace('/15', '')}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <Badge className={`mb-3 text-[10px] uppercase tracking-wider ${categoryConfig[selectedTerm.category].color}`}>
                        {categoryConfig[selectedTerm.category].label}
                      </Badge>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold">{selectedTerm.term}</h3>
                        {selectedTerm.acronym && (
                          <Badge variant="outline" className="font-mono bg-muted/30">{selectedTerm.acronym}</Badge>
                        )}
                      </div>
                    </div>
                    <button onClick={() => setSelectedTerm(null)} className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Definición Oficial</h4>
                      <p className="text-foreground leading-relaxed text-sm">{selectedTerm.definition}</p>
                    </div>

                    {selectedTerm.source && (
                      <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                        <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Fuente Verificada</h4>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          {selectedTerm.source.url ? (
                            <a href={selectedTerm.source.url} target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-primary hover:underline flex items-center gap-1 transition-colors">
                              {selectedTerm.source.name}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-sm font-medium">{selectedTerm.source.name}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

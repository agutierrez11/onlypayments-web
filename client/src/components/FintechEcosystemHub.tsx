import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Building2,
  Coins,
  ShieldCheck,
  TrendingUp,
  Landmark,
  KeyRound,
  Users,
  Wallet,
  Gamepad2,
  Globe2,
  Sparkles,
  Search,
  ExternalLink,
  Calendar,
  Zap,
  ArrowRight,
  Filter,
  CheckCircle2,
  Radio,
  ChevronRight
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import fintechHubData from '../data/fintechHubData.json';

// =============================================================================
// 11 VERTICALES UNIVERSALES FINTECH (TAXONOMÍA ESTÁNDAR LATAM)
// =============================================================================
interface FinTechVertical {
  id: string;
  name: string;
  count: string;
  icon: any;
  color: string;
  bgLight: string;
  badgeBg: string;
  textColor: string;
  segmentMatch: string[];
  description: string;
}

const FINTECH_VERTICALS: FinTechVertical[] = [
  {
    id: 'paytech',
    name: 'Paytech & Adquirencia',
    count: '1,576',
    icon: CreditCard,
    color: '#0000EE',
    bgLight: '#eef0ff',
    badgeBg: 'bg-[#eef0ff] text-[#0000EE] border-[#0000EE]/20',
    textColor: 'text-[#0000EE]',
    segmentMatch: ['pagos', 'paytech', 'pasarela', 'adquirencia', 'e-commerce', 'checkout', 'pos', 'payment', 'gateway'],
    description: 'Pasarelas de pago, adquirentes, orquestadores y terminales de cobro presencial y digital.'
  },
  {
    id: 'lending',
    name: 'Crédito Digital & Lending',
    count: '647',
    icon: Coins,
    color: '#0284c7',
    bgLight: '#f0f9ff',
    badgeBg: 'bg-[#f0f9ff] text-[#0284c7] border-[#0284c7]/20',
    textColor: 'text-[#0284c7]',
    segmentMatch: ['crédito', 'credito', 'préstamo', 'prestamo', 'lending', 'bnpl', 'microcrédito', 'financiamiento'],
    description: 'Financiamiento digital, plataformas BNPL (Buy Now Pay Later) y créditos a PyMEs.'
  },
  {
    id: 'wealthtech',
    name: 'Wealthtech & Inversiones',
    count: '413',
    icon: TrendingUp,
    color: '#ea580c',
    bgLight: '#fff7ed',
    badgeBg: 'bg-[#fff7ed] text-[#ea580c] border-[#ea580c]/20',
    textColor: 'text-[#ea580c]',
    segmentMatch: ['wealthtech', 'inversión', 'inversion', 'trading', 'broker', 'patrimonio', 'bolsa'],
    description: 'Gestión patrimonial, plataformas de corretaje digital, ETFs y micro-inversiones.'
  },
  {
    id: 'openfinance',
    name: 'Open Finance & APIs',
    count: '368',
    icon: KeyRound,
    color: '#059669',
    bgLight: '#ecfdf5',
    badgeBg: 'bg-[#ecfdf5] text-[#059669] border-[#059669]/20',
    textColor: 'text-[#059669]',
    segmentMatch: ['open finance', 'open banking', 'api', 'agregación', 'agregador'],
    description: 'Infraestructura de datos abiertos, iniciación de pagos y APIs de conectividad bancaria.'
  },
  {
    id: 'regtech',
    name: 'Regtech & KYC',
    count: '363',
    icon: ShieldCheck,
    color: '#7c3aed',
    bgLight: '#f5f3ff',
    badgeBg: 'bg-[#f5f3ff] text-[#7c3aed] border-[#7c3aed]/20',
    textColor: 'text-[#7c3aed]',
    segmentMatch: ['regtech', 'kyc', 'aml', 'fraude', 'identidad', 'compliance', 'biometría'],
    description: 'Verificación biométrica de identidad, monitoreo AML y cumplimiento regulatorio automatizado.'
  },
  {
    id: 'insurtech',
    name: 'Insurtech & Seguros',
    count: '237',
    icon: ShieldCheck,
    color: '#e11d48',
    bgLight: '#fff1f2',
    badgeBg: 'bg-[#fff1f2] text-[#e11d48] border-[#e11d48]/20',
    textColor: 'text-[#e11d48]',
    segmentMatch: ['insurtech', 'seguro', 'póliza', 'poliza', 'insurance'],
    description: 'Seguros embebidos, microseguros bajo demanda y plataformas de suscripción digital.'
  },
  {
    id: 'crypto',
    name: 'Activos Digitales & Web3',
    count: '218',
    icon: Wallet,
    color: '#d97706',
    bgLight: '#fffbeb',
    badgeBg: 'bg-[#fffbeb] text-[#d97706] border-[#d97706]/20',
    textColor: 'text-[#d97706]',
    segmentMatch: ['crypto', 'cripto', 'activos digitales', 'blockchain', 'web3', 'stablecoin', 'bitcoin', 'usdt'],
    description: 'Exchanges, liquidación con stablecoins en dólares (USDT/USDC) y rampas fiat-to-crypto.'
  },
  {
    id: 'remesas',
    name: 'Remesas Cross-Border',
    count: '114',
    icon: Globe2,
    color: '#0d9488',
    bgLight: '#f0fdfa',
    badgeBg: 'bg-[#f0fdfa] text-[#0d9488] border-[#0d9488]/20',
    textColor: 'text-[#0d9488]',
    segmentMatch: ['remesas', 'cross-border', 'transferencia internacional', 'fx', 'divisas', 'payout'],
    description: 'Dispersión de remesas familiares en tiempo real, corredores USA-LATAM y pagos B2B transfronterizos.'
  },
  {
    id: 'neobanks',
    name: 'Neobancos & BaaS',
    count: '99',
    icon: Landmark,
    color: '#614ada',
    bgLight: '#f3f0ff',
    badgeBg: 'bg-[#f3f0ff] text-[#614ada] border-[#614ada]/20',
    textColor: 'text-[#614ada]',
    segmentMatch: ['neobanco', 'banca digital', 'baas', 'cuenta digital', 'digital bank'],
    description: 'Entidades de banca digital, tarjetas de débito/crédito virtuales y plataformas BaaS.'
  },
  {
    id: 'crowdfunding',
    name: 'Crowdfunding & P2P',
    count: '35',
    icon: Users,
    color: '#4f46e5',
    bgLight: '#eef2ff',
    badgeBg: 'bg-[#eef2ff] text-[#4f46e5] border-[#4f46e5]/20',
    textColor: 'text-[#4f46e5]',
    segmentMatch: ['crowdfunding', 'financiamiento colectivo', 'inmobiliario participativo'],
    description: 'Financiamiento colectivo de deuda, capital e inversión inmobiliaria participativa.'
  },
  {
    id: 'igaming',
    name: 'iGaming & High-Risk',
    count: '22',
    icon: Gamepad2,
    color: '#9333ea',
    bgLight: '#faf5ff',
    badgeBg: 'bg-[#faf5ff] text-[#9333ea] border-[#9333ea]/20',
    textColor: 'text-[#9333ea]',
    segmentMatch: ['gaming', 'gambling', 'igaming', 'apuestas', 'casino', 'sportsbook'],
    description: 'Procesamiento de pagos de alto volumen, pay-ins instantáneos Pix/SPEI y pay-outs automatizados.'
  }
];

// =============================================================================
// ÚLTIMOS MOVIMIENTOS DEL ECOSISTEMA (PULSO EN TIEMPO REAL 2025/2026)
// =============================================================================
interface Movement {
  id: string;
  category: 'lanzamientos' | 'inversiones' | 'licencias' | 'alianzas' | 'expansiones';
  categoryLabel: string;
  categoryColor: string;
  title: string;
  entity: string;
  country: string;
  date: string;
  description: string;
  impact: string;
}

const MOVEMENTS_DATA: Movement[] = [
  {
    id: 'm1',
    category: 'licencias',
    categoryLabel: 'Licenciamiento',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    title: 'Aprobación de 165+ licencias federales de apuestas y pagos en Brasil',
    entity: 'SPA / Ministerio de Fazenda',
    country: '🇧🇷 Brasil',
    date: 'Ene 2026',
    description: 'Entrada en vigor plena de la Ley 14.790/2023 con procesamiento exclusivo vía Pix e instituciones autorizadas por el BCB.',
    impact: 'Mercado GGR proyectado en $4.5B anuales'
  },
  {
    id: 'm2',
    category: 'lanzamientos',
    categoryLabel: 'Lanzamiento Core',
    categoryColor: 'bg-blue-50 text-blue-700 border-blue-200',
    title: 'Despliegue operativo de Bre-B para pagos interoperables inmediatos',
    entity: 'Banco de la República',
    country: '🇨🇴 Colombia',
    date: 'Sep 2025 / 2026',
    description: 'El nuevo sistema de pagos de bajo valor en tiempo real entra en fase de adopción masiva con llaves de identificación unificadas.',
    impact: 'Interconexión de bancos, billeteras y neobancos'
  },
  {
    id: 'm3',
    category: 'alianzas',
    categoryLabel: 'Alianza Estratégica',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    title: 'Integración de rieles de liquidación cross-border directa SPEI ↔ Pix',
    entity: 'dLocal + Clip',
    country: '🇲🇽 🇧🇷 Regional',
    date: 'Feb 2026',
    description: 'Solución de conversión instantánea multidivisa sin fricción bancaria tradicional para e-commerce regional.',
    impact: 'Reducción de tiempos de liquidación de T+2 a T+0'
  },
  {
    id: 'm4',
    category: 'inversiones',
    categoryLabel: 'Ronda de Inversión',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    title: 'Cierre de Serie B de $35M para expansión de infraestructura A2A en el Cono Sur',
    entity: 'Fintoc',
    country: '🇨🇱 🇲🇽 Chile / México',
    date: 'Nov 2025',
    description: 'Consolidación de la plataforma de iniciación de pagos cuenta a cuenta en Chile y aceleración en México.',
    impact: 'Más de 4.5M de transacciones mensuales procesadas'
  },
  {
    id: 'm5',
    category: 'expansiones',
    categoryLabel: 'Expansión Regional',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    title: 'Apertura de operaciones directas de adquirencia local en Perú y Ecuador',
    entity: 'Unlimit Latam',
    country: '🇵🇪 🇪🇨 Perú / Ecuador',
    date: 'Marzo 2026',
    description: 'Habilitación de procesamiento local de Yape, Plin y tarjetas nacionales para comercios globales y gaming.',
    impact: 'Aumento del 28% en tasa de aprobación de pagos'
  }
];

// =============================================================================
// ACTIVIDADES & SUMMITS DE LA INDUSTRIA (AGENDA 2026)
// =============================================================================
const EVENTS_DATA = [
  {
    date: '18 - 20 MAR',
    year: '2026',
    title: 'LATAM FinTech & Payments Summit 2026',
    location: 'Ciudad de México, México',
    badge: 'Presencial & VIP Deals',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  {
    date: '24 - 26 ABR',
    year: '2026',
    title: 'Open Finance & A2A Congress LATAM',
    location: 'Bogotá, Colombia',
    badge: 'Regulación & Bre-B',
    badgeColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    date: '12 - 14 MAY',
    year: '2026',
    title: 'SiGMA Americas & BiS Summit',
    location: 'São Paulo, Brasil',
    badge: 'iGaming Payments & Pix',
    badgeColor: 'bg-purple-100 text-purple-800'
  }
];

function cleanText(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/CrÃ©dito Digital/g, 'Crédito Digital')
    .replace(/GestiÃ³n de Finanzas/g, 'Gestión de Finanzas')
    .replace(/Activos Digitales/g, 'Activos Digitales')
    .replace(/Finanzas Personales/g, 'Finanzas Personales')
    .replace(/Puntaje de CrÃ©dito/g, 'Puntaje de Crédito')
    .replace(/180Â°/g, '180°')
    .replace(/Ã©/g, 'é')
    .replace(/Ã³/g, 'ó')
    .replace(/Ã¡/g, 'á')
    .replace(/Ã­/g, 'í')
    .replace(/Ãº/g, 'ú')
    .replace(/Ã±/g, 'ñ')
    .replace(/Â/g, '')
    .trim();
}

export function FintechEcosystemHub() {
  const [fintechs, setFintechs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
  const [movementTab, setMovementTab] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    import('../data/fintechs_latam_master.json')
      .then(mod => {
        const data = mod.default || mod;
        setFintechs(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to fintechs_latam.json
        import('../data/fintechs_latam.json').then(mod => {
          const data = mod.default || mod;
          setFintechs(data);
          setLoading(false);
        });
      });
  }, []);

  // Filtered Fintechs
  const filteredFintechs = useMemo(() => {
    let list = fintechs;

    if (selectedVertical) {
      const v = FINTECH_VERTICALS.find(item => item.id === selectedVertical);
      if (v) {
        list = list.filter((f: any) => {
          const seg = cleanText(f.Segmento || f.segment || '').toLowerCase();
          const vert = cleanText(f.Vertical || f.vertical || '').toLowerCase();
          const desc = cleanText(f.Descripción || f.description || '').toLowerCase();
          return v.segmentMatch.some(m => {
            const lowM = m.toLowerCase();
            return seg.includes(lowM) || vert.includes(lowM) || desc.includes(lowM);
          });
        });
      }
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((f: any) => {
        const name = (f.Nombre || f.name || '').toLowerCase();
        const desc = (f.Descripción || f.description || '').toLowerCase();
        const country = (f.País || f.country || '').toLowerCase();
        return name.includes(q) || desc.includes(q) || country.includes(q);
      });
    }

    return list;
  }, [fintechs, selectedVertical, searchTerm]);

  // Paginated
  const paginatedFintechs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFintechs.slice(start, start + itemsPerPage);
  }, [filteredFintechs, currentPage]);

  const totalPages = Math.ceil(filteredFintechs.length / itemsPerPage);

  // Filtered Movements
  const filteredMovements = useMemo(() => {
    if (movementTab === 'todos') return MOVEMENTS_DATA;
    return MOVEMENTS_DATA.filter(m => m.category === movementTab);
  }, [movementTab]);

  return (
    <div className="w-full bg-[#FFFFFF] text-[#333333] font-sans">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (VIBRANT & SOFT, CLEAN WHITE STYLE) */}
      {/* ========================================================================= */}
      <section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto border-b border-[#241bc01c]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef0ff] border border-[#614ada]/20 text-[#614ada] text-xs font-bold tracking-wide uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#614ada] animate-pulse" />
              Ecosistema Regional 2026
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#060606] tracking-tight leading-tight">
              Segmentos de Negocio FinTech
            </h1>
            <p className="text-sm sm:text-base text-[#7d797a] font-medium mt-2 max-w-2xl">
              Explora las 11 verticales tecnológicas, rieles de pago instantáneo y movimientos regulatorios en 20 países de América Latina.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-[#f8f8f8] border border-[#241bc01c] text-right">
              <span className="block text-[11px] font-mono text-[#7d797a] uppercase font-bold">Base Indexada</span>
              <span className="text-lg font-black text-[#0000EE] font-mono">2,659+ Entidades</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. BENTO GRID DE LAS 11 VERTICALES FINTECH (CHIP 8px / SOFT RADIUS) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {FINTECH_VERTICALS.map(vert => {
            const Icon = vert.icon;
            const isSelected = selectedVertical === vert.id;
            return (
              <button
                key={vert.id}
                onClick={() => {
                  setSelectedVertical(isSelected ? null : vert.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0000EE] text-white border-[#0000EE] shadow-md -translate-y-0.5'
                    : 'bg-white text-[#333333] border-[#241bc01c] hover:bg-[#eef0ff] hover:border-[#614ada]/30 hover:-translate-y-0.5'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#eef0ff] text-[#0000EE]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate">{vert.name}</div>
                  <div className={`text-[10px] font-mono font-medium ${isSelected ? 'text-blue-100' : 'text-[#7d797a]'}`}>
                    {vert.count}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedVertical && (
          <div className="mt-4 flex items-center justify-between bg-[#eef0ff] border border-[#614ada]/20 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#614ada]">
              <Filter className="w-3.5 h-3.5" />
              Filtrando por vertical: <span className="underline">{FINTECH_VERTICALS.find(v => v.id === selectedVertical)?.name}</span>
              <span className="text-[#7d797a] font-normal">({filteredFintechs.length} empresas encontradas)</span>
            </div>
            <button
              onClick={() => setSelectedVertical(null)}
              className="text-xs font-bold text-[#0000EE] hover:underline cursor-pointer"
            >
              Mostrar todas las categorías ✕
            </button>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 3. DOS COLUMNAS: ÚLTIMOS MOVIMIENTOS & AGENDA DE ACTIVIDADES */}
      {/* ========================================================================= */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda (2/3): Últimos Movimientos */}
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#060606] tracking-tight flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#0000EE] animate-pulse" />
                Últimos Movimientos de la Industria
              </h2>
              <p className="text-xs text-[#7d797a] font-medium">Hitos de financiamiento, licencias y alianzas transaccionales.</p>
            </div>

            {/* Tabs de Filtro de Movimientos */}
            <div className="flex items-center gap-1 bg-[#f8f8f8] p-1 rounded-xl border border-[#241bc01c] overflow-x-auto">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'licencias', label: 'Licencias' },
                { id: 'lanzamientos', label: 'Lanzamientos' },
                { id: 'alianzas', label: 'Alianzas' },
                { id: 'inversiones', label: 'Inversiones' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setMovementTab(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    movementTab === tab.id
                      ? 'bg-white text-[#0000EE] shadow-xs'
                      : 'text-[#7d797a] hover:text-[#333333]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Movimientos */}
          <div className="space-y-3">
            {filteredMovements.map(mov => (
              <div
                key={mov.id}
                className="p-4 rounded-xl bg-white border border-[#241bc01c] hover:border-[#614ada]/30 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${mov.categoryColor}`}>
                      {mov.categoryLabel}
                    </span>
                    <span className="text-xs font-bold text-[#060606]">{mov.country}</span>
                    <span className="text-[11px] text-[#7d797a] font-mono">● {mov.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#060606] leading-snug">{mov.title}</h3>
                  <p className="text-xs text-[#7d797a] font-medium leading-relaxed">{mov.description}</p>
                </div>
                <div className="sm:text-right flex-shrink-0 self-start sm:self-center">
                  <span className="inline-block text-[11px] font-mono text-[#0000EE] bg-[#eef0ff] px-2.5 py-1 rounded-lg font-bold">
                    {mov.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha (1/3): Actividades & Summits */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#060606] tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#614ada]" />
              Actividades & Summits
            </h2>
            <p className="text-xs text-[#7d797a] font-medium">Reuniones clave del ecosistema de pagos y fintech en 2026.</p>
          </div>

          <div className="space-y-3">
            {EVENTS_DATA.map((ev, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#f8f8f8] border border-[#241bc01c] hover:bg-white hover:shadow-xs transition-all flex items-start gap-3.5"
              >
                <div className="w-14 h-14 rounded-xl bg-white border border-[#241bc01c] flex flex-col items-center justify-center flex-shrink-0 text-center shadow-xs">
                  <span className="text-[10px] font-black text-[#0000EE] uppercase leading-none font-mono">
                    {ev.date.split(' ')[0]}
                  </span>
                  <span className="text-xs font-black text-[#060606] uppercase mt-0.5 leading-none">
                    {ev.date.split(' ')[2]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${ev.badgeColor} mb-1`}>
                    {ev.badge}
                  </span>
                  <h4 className="text-xs font-bold text-[#060606] leading-tight truncate">{ev.title}</h4>
                  <p className="text-[11px] text-[#7d797a] mt-0.5">{ev.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-[#eef0ff] border border-[#614ada]/20 text-center">
            <Sparkles className="w-5 h-5 text-[#0000EE] mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-[#060606]">¿Quieres listar tu evento o anuncio?</h4>
            <p className="text-[11px] text-[#7d797a] mt-1">Conecta con los 40,000+ tomadores de decisión del Hub.</p>
            <button className="mt-2.5 px-4 py-1.5 rounded-full bg-[#0000EE] text-white text-xs font-bold hover:bg-[#0000CC] transition-all cursor-pointer shadow-xs">
              Publicar Movimiento ↗
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. DIRECTORIO VINCULADO (TARJETAS LIMPIAS CON BOTÓN MATCH B2B) */}
      {/* ========================================================================= */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto border-t border-[#241bc01c]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#060606] tracking-tight">
              Directorio de Fintechs ({filteredFintechs.length})
            </h2>
            <p className="text-xs text-[#7d797a] font-medium">
              Explora soluciones de pago, adquirentes y proveedores de infraestructura autorizados.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7d797a]" />
            <input
              type="text"
              placeholder="Buscar por nombre, país o riel..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#f8f8f8] border border-[#241bc01c] rounded-xl pl-9 pr-3 py-2 text-xs text-[#333333] placeholder:text-[#7d797a] focus:outline-none focus:border-[#0000EE] focus:ring-1 focus:ring-[#0000EE] transition-all"
            />
          </div>
        </div>

        {/* Grid de Fintechs */}
        {loading ? (
          <div className="py-16 text-center text-xs font-mono text-[#7d797a]">Cargando base de datos fintech...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedFintechs.map((f: any, idx: number) => {
              const name = cleanText(f.Nombre || f.name || 'Fintech');
              const country = cleanText(f.País || f.country || 'LATAM');
              const segment = cleanText(f.Segmento || f.segment || 'Paytech');
              const vertical = cleanText(f.Vertical || f.vertical || '');
              const desc = cleanText(f.Descripción || f.description || 'Proveedor de infraestructura de pagos en América Latina.');
              const url = f.website || f.Sitio_Web || f.url || '';

              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-[#241bc01c] hover:border-[#614ada]/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div>
                        <h3 className="font-extrabold text-base text-[#060606] tracking-tight">{name}</h3>
                        <span className="text-[11px] font-mono text-[#7d797a] font-medium">📍 {country}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#eef0ff] text-[#0000EE] border border-[#0000EE]/20 text-[10px] font-bold">
                        {segment}
                      </span>
                    </div>

                    <p className="text-xs text-[#7d797a] font-medium leading-relaxed line-clamp-3 mb-3">
                      {desc}
                    </p>

                    {vertical && (
                      <div className="text-[11px] text-[#060606] font-semibold mb-3 flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-[#0000EE]" />
                        <span className="truncate">{vertical}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#241bc01c] flex items-center justify-between gap-2">
                    {url ? (
                      <a
                        href={url.startsWith('http') ? url : `https://${url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0000EE] hover:underline"
                      >
                        Visitar Web <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-[#7d797a] font-mono">Infraestructura Directa</span>
                    )}

                    <a
                      href={`/introducciones-b2b?target=${encodeURIComponent(name)}`}
                      className="px-3 py-1.5 rounded-full bg-[#060606] text-white text-[11px] font-bold hover:bg-[#0000EE] transition-all cursor-pointer"
                    >
                      Match B2B ⚡
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-3 py-1.5 rounded-xl border border-[#241bc01c] text-xs font-bold text-[#333333] hover:bg-[#f8f8f8] disabled:opacity-40 cursor-pointer"
            >
              Anterior
            </button>
            <span className="text-xs font-mono text-[#7d797a] px-2">
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-3 py-1.5 rounded-xl border border-[#241bc01c] text-xs font-bold text-[#333333] hover:bg-[#f8f8f8] disabled:opacity-40 cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 5. ASOCIACIONES Y CÁMARAS FINTECH OFICIALES POR PAÍS */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto border-t border-[#241bc01c] bg-[#f8f8f8]/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef0ff] border border-[#614ada]/20 text-[#614ada] text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              Red Gremial & Alianzas Institucionales
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#060606] tracking-tight">
              Asociaciones y Cámaras FinTech por País
            </h2>
            <p className="text-xs sm:text-sm text-[#7d797a] font-medium mt-1 max-w-2xl">
              Accede a los directorios de miembros, comités regulatorios y ecosistemas oficiales de cada país en América Latina.
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="https://alianzafintech.org/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0000EE] text-white text-xs font-bold hover:bg-[#0000CC] transition-all shadow-xs"
            >
              <Globe2 className="w-3.5 h-3.5" />
              Alianza Fintech Iberoamérica (18 Países) ↗
            </a>
          </div>
        </div>

        {/* Grid de Cámaras por País */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fintechHubData.camaras_asociaciones.por_pais.map((camara: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-[#241bc01c] hover:border-[#0000EE]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#241bc01c]">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{camara.bandera}</span>
                    <h3 className="font-extrabold text-sm text-[#060606]">{camara.pais}</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#7d797a] bg-[#f8f8f8] px-2 py-0.5 rounded-md">
                    {camara.codigo}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-[#060606] leading-snug mb-1.5">
                  {camara.asociacion}
                </h4>

                <p className="text-[11px] text-[#7d797a] font-medium leading-relaxed mb-3">
                  {camara.enfoque}
                </p>
              </div>

              <div className="pt-2.5 border-t border-[#241bc01c] flex items-center justify-between gap-2 text-xs">
                <a
                  href={camara.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-[#0000EE] hover:underline"
                >
                  Sitio Oficial <ExternalLink className="w-3 h-3" />
                </a>

                {camara.miembros_url && (
                  <a
                    href={camara.miembros_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-[#7d797a] hover:text-[#060606] hover:underline"
                  >
                    Miembros ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


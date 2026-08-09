import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Building2, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  Filter, 
  TrendingUp, 
  Globe2, 
  Send, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { toast } from 'sonner';
import masterFintechsData from '../data/fintechs_latam_master.json';

// =============================================================================
// DATOS DE LOS ESTADOS DE MÉXICO Y DENSIDAD FINTECH
// =============================================================================
interface StateGeo {
  id: string;
  name: string;
  code: string;
  count: number;
  hubCity: string;
  topRails: string[];
  svgPath: string;
  labelX: number;
  labelY: number;
}

// Polígonos SVG simplificados y estilizados para los estados de México (Escala 1000x600)
const MEXICO_STATES: StateGeo[] = [
  {
    id: 'cdmx',
    name: 'Ciudad de México',
    code: 'CDMX',
    count: 780,
    hubCity: 'Polanco / Juárez / Condesa',
    topRails: ['SPEI 24/7', 'CoDi', 'Dimo', 'Visa/Mastercard'],
    svgPath: 'M 545 425 L 555 420 L 560 430 L 550 435 Z',
    labelX: 550,
    labelY: 425
  },
  {
    id: 'jal',
    name: 'Jalisco',
    code: 'JAL',
    count: 240,
    hubCity: 'Guadalajara / Zapopan',
    topRails: ['SPEI', 'BNPL Kueski', 'Terminales'],
    svgPath: 'M 420 370 L 460 360 L 475 400 L 440 430 L 400 410 Z',
    labelX: 435,
    labelY: 395
  },
  {
    id: 'nl',
    name: 'Nuevo León',
    code: 'NL',
    count: 195,
    hubCity: 'Monterrey / San Pedro Garza García',
    topRails: ['SPEI', 'B2B PayTech', 'Cards'],
    svgPath: 'M 530 220 L 570 210 L 585 270 L 550 310 L 525 260 Z',
    labelX: 550,
    labelY: 260
  },
  {
    id: 'mex',
    name: 'Estado de México',
    code: 'MEX',
    count: 115,
    hubCity: 'Naucalpan / Tlalnepantla / Huixquilucan',
    topRails: ['SPEI', 'Tarjetas', 'OXXO Pay'],
    svgPath: 'M 525 410 L 565 405 L 570 445 L 530 445 Z',
    labelX: 538,
    labelY: 425
  },
  {
    id: 'qroo',
    name: 'Quintana Roo',
    code: 'QROO',
    count: 45,
    hubCity: 'Cancún / Riviera Maya / Playa del Carmen',
    topRails: ['SPEI Transfronterizo', 'Turismo Pay', 'USD FX'],
    svgPath: 'M 880 390 L 925 385 L 940 450 L 890 460 Z',
    labelX: 910,
    labelY: 420
  },
  {
    id: 'qro',
    name: 'Querétaro',
    code: 'QRO',
    count: 38,
    hubCity: 'Querétaro Capital / Juriquilla',
    topRails: ['SPEI', 'Datacenter PayTech'],
    svgPath: 'M 520 375 L 545 370 L 550 395 L 525 395 Z',
    labelX: 535,
    labelY: 385
  },
  {
    id: 'pue',
    name: 'Puebla',
    code: 'PUE',
    count: 32,
    hubCity: 'Puebla / Cholula / Angelópolis',
    topRails: ['SPEI', 'SOFOM Lending'],
    svgPath: 'M 565 425 L 610 415 L 620 460 L 575 455 Z',
    labelX: 590,
    labelY: 440
  },
  {
    id: 'yuc',
    name: 'Yucatán',
    code: 'YUC',
    count: 28,
    hubCity: 'Mérida',
    topRails: ['SPEI', 'E-commerce Sureste'],
    svgPath: 'M 830 360 L 890 355 L 895 400 L 835 405 Z',
    labelX: 860,
    labelY: 380
  },
  {
    id: 'bc',
    name: 'Baja California',
    code: 'BC',
    count: 24,
    hubCity: 'Tijuana / Mexicali',
    topRails: ['Cross-Border USD/MXN', 'SPEI', 'Remesas'],
    svgPath: 'M 100 80 L 170 120 L 140 220 L 80 160 Z',
    labelX: 125,
    labelY: 150
  },
  {
    id: 'son',
    name: 'Sonora',
    code: 'SON',
    count: 18,
    hubCity: 'Hermosillo',
    topRails: ['SPEI', 'AgroFintech'],
    svgPath: 'M 170 120 L 290 140 L 260 270 L 160 230 Z',
    labelX: 220,
    labelY: 190
  },
  {
    id: 'chih',
    name: 'Chihuahua',
    code: 'CHIH',
    count: 19,
    hubCity: 'Chihuahua / Ciudad Juárez',
    topRails: ['SPEI', 'Trade Finance'],
    svgPath: 'M 290 140 L 430 160 L 390 310 L 270 280 Z',
    labelX: 350,
    labelY: 220
  },
  {
    id: 'coah',
    name: 'Coahuila',
    code: 'COAH',
    count: 16,
    hubCity: 'Saltillo / Torreón',
    topRails: ['SPEI', 'Industrial PayTech'],
    svgPath: 'M 430 160 L 530 220 L 490 340 L 390 310 Z',
    labelX: 460,
    labelY: 250
  },
  {
    id: 'sin',
    name: 'Sinaloa',
    code: 'SIN',
    count: 14,
    hubCity: 'Culiacán / Mazatlán',
    topRails: ['SPEI', 'AgroPay'],
    svgPath: 'M 260 270 L 340 290 L 320 400 L 240 340 Z',
    labelX: 290,
    labelY: 340
  },
  {
    id: 'gto',
    name: 'Guanajuato',
    code: 'GTO',
    count: 17,
    hubCity: 'León / Silao',
    topRails: ['SPEI', 'Lending PYME'],
    svgPath: 'M 475 365 L 520 360 L 525 395 L 480 395 Z',
    labelX: 500,
    labelY: 380
  },
  {
    id: 'ver',
    name: 'Veracruz',
    code: 'VER',
    count: 15,
    hubCity: 'Veracruz / Boca del Río / Xalapa',
    topRails: ['SPEI', 'Port & Logistics Pay'],
    svgPath: 'M 610 415 L 720 440 L 740 500 L 630 470 Z',
    labelX: 670,
    labelY: 450
  }
];

// Países de LATAM para la vista continental
const LATAM_COUNTRIES = [
  { code: 'MX', name: 'México', count: 1431, dominantRail: 'SPEI / CoDi', remesas: '$62.5B', growth: '+24%' },
  { code: 'BR', name: 'Brasil', count: 1200, dominantRail: 'Pix (BCB)', remesas: '$4.8B', growth: '+38%' },
  { code: 'CO', name: 'Colombia', count: 819, dominantRail: 'Bre-B / PSE', remesas: '$10.4B', growth: '+22%' },
  { code: 'AR', name: 'Argentina', count: 320, dominantRail: 'Transferencias 3.0', remesas: '$1.9B', growth: '+18%' },
  { code: 'CL', name: 'Chile', count: 280, dominantRail: 'TEF / Khipu', remesas: '$350M', growth: '+15%' },
  { code: 'PE', name: 'Perú', count: 180, dominantRail: 'Yape / Plin', remesas: '$4.5B', growth: '+21%' },
  { code: 'EC', name: 'Ecuador', count: 90, dominantRail: 'SPI Dólar', remesas: '$5.2B', growth: '+12%' },
  { code: 'CR', name: 'Costa Rica', count: 70, dominantRail: 'SINPE Móvil', remesas: '$650M', growth: '+19%' },
  { code: 'PA', name: 'Panamá', count: 85, dominantRail: 'Yappy / ACH', remesas: '$890M', growth: '+14%' },
  { code: 'DO', name: 'Rep. Dominicana', count: 110, dominantRail: 'LBTR Inmediato', remesas: '$11.9B', growth: '+26%' },
  { code: 'GT', name: 'Guatemala', count: 60, dominantRail: 'ACH Pronto', remesas: '$19.8B', growth: '+28%' },
  { code: 'UY', name: 'Uruguay', count: 55, dominantRail: 'SPI Directo', remesas: '$220M', growth: '+16%' }
];

export default function LatamFintechGISRadar() {
  const [geoScope, setGeoScope] = useState<'mexico' | 'latam'>('mexico');
  const [selectedState, setSelectedState] = useState<string | null>('cdmx');
  const [selectedCountry, setSelectedCountry] = useState<string | null>('MX');
  const [hoveredState, setHoveredState] = useState<StateGeo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState('all');

  // Filtrado reactivo de empresas desde el dataset maestro (2,681 fintechs)
  const filteredFintechs = useMemo(() => {
    return (masterFintechsData as any[]).filter(item => {
      // 1. Filtro geográfico
      if (geoScope === 'mexico') {
        if (item.countryCode !== 'MX') return false;
        if (selectedState && selectedState !== 'all') {
          const st = MEXICO_STATES.find(s => s.id === selectedState);
          if (st && item.stateCode && item.stateCode !== st.code) return false;
        }
      } else {
        if (selectedCountry && selectedCountry !== 'ALL' && item.countryCode !== selectedCountry) {
          return false;
        }
      }

      // 2. Filtro de vertical
      if (selectedVertical !== 'all') {
        const v = (item.vertical || '').toLowerCase();
        if (selectedVertical === 'payments' && !v.includes('pay') && !v.includes('adquir') && !v.includes('pos')) return false;
        if (selectedVertical === 'neobanks' && !v.includes('bank') && !v.includes('account') && !v.includes('sofipo') && !v.includes('ifpe')) return false;
        if (selectedVertical === 'lending' && !v.includes('lend') && !v.includes('credit') && !v.includes('bnpl') && !v.includes('crédito')) return false;
        if (selectedVertical === 'crypto' && !v.includes('crypto') && !v.includes('cross-border') && !v.includes('blockchain')) return false;
      }

      // 3. Filtro de búsqueda
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (item.name || '').toLowerCase().includes(q);
        const matchDesc = (item.description || '').toLowerCase().includes(q);
        const matchState = (item.state || '').toLowerCase().includes(q);
        const matchVertical = (item.vertical || '').toLowerCase().includes(q);
        return matchName || matchDesc || matchState || matchVertical;
      }

      return true;
    });
  }, [geoScope, selectedState, selectedCountry, selectedVertical, searchQuery]);

  const activeStateObj = useMemo(() => {
    return MEXICO_STATES.find(s => s.id === selectedState) || null;
  }, [selectedState]);

  const handleOutreachClick = (fintechName: string, country: string) => {
    toast.success(`Pipeline B2B Activado para ${fintechName}`, {
      description: `Generada plantilla de co-selling para enrutamiento y pasarelas en ${country}.`,
      duration: 3500
    });
  };

  return (
    <section className="relative z-10 py-12 bg-slate-950/90 text-slate-100 font-sans border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* HEADER PRINCIPAL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              GIS Radar Ecosistema 2026
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-white">
              Mapa de <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">FinTechs & Rieles Transaccionales</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl font-light">
              Explora la densidad geográfica de más de 2,680+ empresas fintech, pasarelas adquirentes y rieles A2A en tiempo real.
            </p>
          </div>

          {/* SELECTOR DE ALCANCE: MÉXICO ESTATAL VS LATAM CONTINENTAL */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-xl">
            <button
              onClick={() => { setGeoScope('mexico'); setSelectedState('all'); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                geoScope === 'mexico'
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              🇲🇽 México (32 Estados)
            </button>
            <button
              onClick={() => { setGeoScope('latam'); setSelectedCountry('ALL'); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                geoScope === 'latam'
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              🌎 LATAM Continental (20 Países)
            </button>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 backdrop-blur-md">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Fintechs Mapeadas</div>
            <div className="text-xl font-mono font-extrabold text-cyan-400 mt-0.5">2,681+</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 backdrop-blur-md">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Cobertura Regional</div>
            <div className="text-xl font-mono font-extrabold text-white mt-0.5">20 Países / 32 Edos</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 backdrop-blur-md">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Rieles A2A Indexados</div>
            <div className="text-xl font-mono font-extrabold text-emerald-400 mt-0.5">Pix · SPEI · Bre-B</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 backdrop-blur-md">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Resultados en Vista</div>
            <div className="text-xl font-mono font-extrabold text-indigo-400 mt-0.5">{filteredFintechs.length}</div>
          </div>
        </div>

        {/* GRID PRINCIPAL: MAPA VECTORIAL + DIRECTORIO LATERAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUMNA IZQUIERDA: MAPA VECTORIAL INTERACTIVO */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col min-h-[580px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-300">
                  {geoScope === 'mexico' ? '🇲🇽 Radar Estatal de México' : '🌎 Radar Transfronterizo LATAM'}
                </span>
                <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                  Interactivo 2D
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Pasa el cursor o haz clic en un polígono
              </div>
            </div>

            {/* MAPA SVG VECTORIAL */}
            <div className="relative w-full flex-1 flex items-center justify-center bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 overflow-hidden">
              {geoScope === 'mexico' ? (
                // SVG INTERACTIVO DE MÉXICO
                <svg viewBox="0 0 1000 600" className="w-full h-full max-h-[460px] drop-shadow-[0_0_30px_rgba(0,245,212,0.1)]">
                  {/* Grid de fondo decorativo */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="1000" height="600" fill="url(#grid)" />

                  {/* Polígonos de los Estados */}
                  {MEXICO_STATES.map(state => {
                    const isSelected = selectedState === state.id;
                    const isHovered = hoveredState?.id === state.id;
                    
                    // Cálculo de opacidad y color según densidad
                    let fill = '#0f172a';
                    let stroke = '#1e293b';
                    if (state.count > 300) fill = 'rgba(0, 245, 212, 0.55)';
                    else if (state.count > 100) fill = 'rgba(14, 165, 233, 0.45)';
                    else if (state.count > 30) fill = 'rgba(99, 102, 241, 0.35)';
                    else fill = 'rgba(30, 41, 59, 0.5)';

                    if (isHovered || isSelected) {
                      fill = '#00f5d4';
                      stroke = '#ffffff';
                    }

                    return (
                      <g key={state.id} className="cursor-pointer transition-all duration-200">
                        <path
                          d={state.svgPath}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isSelected || isHovered ? 2.5 : 1.2}
                          className="transition-all duration-200 hover:brightness-125"
                          onMouseEnter={() => setHoveredState(state)}
                          onMouseLeave={() => setHoveredState(null)}
                          onClick={() => setSelectedState(state.id)}
                        />
                        {/* Etiqueta / Pin del Estado */}
                        <circle
                          cx={state.labelX}
                          cy={state.labelY}
                          r={state.count > 100 ? 5 : 3.5}
                          fill={isSelected ? '#020617' : '#ffffff'}
                          className="pointer-events-none"
                        />
                        <text
                          x={state.labelX}
                          y={state.labelY - 8}
                          fill={isSelected || isHovered ? '#00f5d4' : '#94a3b8'}
                          fontSize={state.count > 100 ? 11 : 9}
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          textAnchor="middle"
                          fontFamily="monospace"
                          className="pointer-events-none select-none"
                        >
                          {state.code} ({state.count})
                        </text>
                      </g>
                    );
                  })}
                </svg>
              ) : (
                // VISTA CONTINENTAL DE LATAM (CARDS / PAÍSES)
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 p-2">
                  {LATAM_COUNTRIES.map(country => {
                    const isSelected = selectedCountry === country.code;
                    return (
                      <div
                        key={country.code}
                        onClick={() => setSelectedCountry(country.code)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(0,245,212,0.2)]'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{country.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400 font-bold">
                            {country.count}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-2">
                          ⚡ {country.dominantRail}
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-800">
                          <span>Remesas: {country.remesas}</span>
                          <span className="text-emerald-400 font-bold">{country.growth}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TOOLTIP FLOTANTE EN HOVER */}
              <AnimatePresence>
                {hoveredState && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur-xl border border-cyan-400/40 rounded-xl p-3.5 shadow-2xl text-xs text-white pointer-events-none z-20"
                  >
                    <div className="flex items-center gap-2 font-bold text-cyan-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      {hoveredState.name} ({hoveredState.code})
                    </div>
                    <div className="text-slate-300 font-mono mt-1">
                      🔥 <strong className="text-white">{hoveredState.count}</strong> Fintechs Activas
                    </div>
                    <div className="text-slate-400 text-[11px] mt-1">
                      📍 Hub Principal: {hoveredState.hubCity}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hoveredState.topRails.map((r, i) => (
                        <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                          {r}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DETALLE DEL ESTADO / PAÍS SELECCIONADO */}
            {geoScope === 'mexico' && activeStateObj && (
              <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-400 font-mono">Filtro Activo: </span>
                  <span className="font-bold text-cyan-400">{activeStateObj.name}</span>
                  <span className="text-slate-400 ml-2 font-mono">({activeStateObj.count} registradas)</span>
                </div>
                <button
                  onClick={() => setSelectedState('all')}
                  className="px-2.5 py-1 text-[11px] rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  Limpiar Filtro Estatal (Ver Todo México)
                </button>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: DIRECTORIO SINCRONIZADO EN TIEMPO REAL */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col h-[580px]">
            
            {/* BUSCADOR Y FILTROS */}
            <div className="space-y-3 pb-3 border-b border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar fintech, riel o ciudad..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              {/* CHIPS DE VERTICALES */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                <button
                  onClick={() => setSelectedVertical('all')}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold shrink-0 cursor-pointer transition-all ${
                    selectedVertical === 'all' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setSelectedVertical('payments')}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold shrink-0 cursor-pointer transition-all ${
                    selectedVertical === 'payments' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ Pagos & A2A
                </button>
                <button
                  onClick={() => setSelectedVertical('neobanks')}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold shrink-0 cursor-pointer transition-all ${
                    selectedVertical === 'neobanks' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  🏛️ Neobancos / IFPE
                </button>
                <button
                  onClick={() => setSelectedVertical('lending')}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold shrink-0 cursor-pointer transition-all ${
                    selectedVertical === 'lending' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  💳 Crédito / BNPL
                </button>
                <button
                  onClick={() => setSelectedVertical('crypto')}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold shrink-0 cursor-pointer transition-all ${
                    selectedVertical === 'crypto' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  🌐 Cross-Border
                </button>
              </div>
            </div>

            {/* LISTA SCROLLEABLE DE FICHAS ENRIQUECIDAS */}
            <div className="flex-1 overflow-y-auto pr-1 mt-3 space-y-3">
              {filteredFintechs.length === 0 ? (
                <div className="text-center py-16 text-slate-500 font-mono text-xs">
                  No se encontraron fintechs con los filtros seleccionados.
                </div>
              ) : (
                filteredFintechs.slice(0, 100).map((fintech: any) => (
                  <div
                    key={fintech.id}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {fintech.name}
                          </h4>
                          {fintech.fundingStage && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                              {fintech.fundingStage}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{fintech.state ? `${fintech.state}, ` : ''}{fintech.country}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-300 font-semibold">{fintech.vertical}</span>
                        </div>
                      </div>

                      {fintech.website && (
                        <a
                          href={fintech.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                          title="Visitar sitio oficial"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 font-light mt-2 line-clamp-2 leading-relaxed">
                      {fintech.description}
                    </p>

                    {/* RIEL Y REGULACIÓN */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(fintech.rails) ? (
                          fintech.rails.slice(0, 2).map((r: string, idx: number) => (
                            <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                              ⚡ {r}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                            ⚡ SPEI / Pix
                          </span>
                        )}
                        {fintech.regulation && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            🏛️ {fintech.regulation.split('(')[0]}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleOutreachClick(fintech.name, fintech.country)}
                        className="flex items-center gap-1 text-[11px] font-mono font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-2.5 py-1 rounded-lg border border-cyan-500/30 transition-all cursor-pointer"
                      >
                        <span>Match B2B</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER DEL DIRECTORIO */}
            <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>Indexado con Finnovista Radars 2025-2026</span>
              <span>Total: {filteredFintechs.length} resultados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

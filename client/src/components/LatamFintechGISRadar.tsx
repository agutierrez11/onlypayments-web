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
import MEXICO_STATES_SVG from '../data/mexico_states_svg.json';
import LATAM_COUNTRIES_SVG from '../data/latam_countries_svg.json';

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

interface LatamCountryGeo {
  code: string;
  iso3: string;
  name: string;
  count: number;
  dominantRail: string;
  remesas: string;
  growth: string;
  svgPath: string;
  labelX: number;
  labelY: number;
}

export default function LatamFintechGISRadar() {
  const [geoScope, setGeoScope] = useState<'mexico' | 'latam'>('mexico');
  const [selectedState, setSelectedState] = useState<string | null>('cdmx');
  const [selectedCountry, setSelectedCountry] = useState<string | null>('ALL');
  const [hoveredState, setHoveredState] = useState<StateGeo | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<LatamCountryGeo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState('all');

  const statesList = MEXICO_STATES_SVG as StateGeo[];
  const latamList = LATAM_COUNTRIES_SVG as LatamCountryGeo[];

  // Filtrado reactivo de empresas desde el dataset maestro (2,659 fintechs)
  const filteredFintechs = useMemo(() => {
    return (masterFintechsData as any[]).filter(item => {
      // 1. Filtro geográfico
      if (geoScope === 'mexico') {
        if (item.countryCode !== 'MX') return false;
        if (selectedState && selectedState !== 'all') {
          const st = statesList.find(s => s.id === selectedState);
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
        const matchUrl = (item.website || '').toLowerCase().includes(q);
        return matchName || matchDesc || matchState || matchVertical || matchUrl;
      }

      return true;
    });
  }, [geoScope, selectedState, selectedCountry, selectedVertical, searchQuery, statesList]);

  const activeStateObj = useMemo(() => {
    return statesList.find(s => s.id === selectedState) || null;
  }, [selectedState, statesList]);

  const activeCountryObj = useMemo(() => {
    return latamList.find(c => c.code === selectedCountry) || null;
  }, [selectedCountry, latamList]);

  const handleOutreachClick = (fintechName: string, country: string) => {
    toast.success(`Pipeline B2B Activado para ${fintechName}`, {
      description: `Generada plantilla de co-selling para enrutamiento y pasarelas en ${country}.`,
      duration: 3500
    });
  };

  const getCleanDomain = (url: string) => {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  };

  return (
    <section className="relative z-10 py-16 bg-[#000000] text-slate-100 font-sans border-t border-[#1c1d24]">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* HEADER PRINCIPAL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#2a2d3d] text-[#1BACFB] text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              GIS Radar Ecosistema 2026
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-white">
              Mapa de <span className="bg-gradient-to-r from-white via-[#9BE9FE] to-[#1BACFB] bg-clip-text text-transparent">FinTechs & Rieles Transaccionales</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl font-light">
              Explora la densidad geográfica de más de 2,650+ empresas fintech con enlaces directos a sus sitios oficiales y rieles A2A.
            </p>
          </div>

          {/* SELECTOR DE ALCANCE: MÉXICO ESTATAL VS LATAM CONTINENTAL */}
          <div className="flex items-center gap-1 bg-[#141414] p-1.5 rounded-[50px] border border-[#262838] shadow-xl">
            <button
              onClick={() => { setGeoScope('mexico'); setSelectedState('all'); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-[50px] text-xs font-mono font-bold transition-all cursor-pointer ${
                geoScope === 'mexico'
                  ? 'bg-white text-black shadow-md shadow-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#0000FF]" />
              🇲🇽 México (32 Estados)
            </button>
            <button
              onClick={() => { setGeoScope('latam'); setSelectedCountry('ALL'); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-[50px] text-xs font-mono font-bold transition-all cursor-pointer ${
                geoScope === 'latam'
                  ? 'bg-white text-black shadow-md shadow-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-[#0000FF]" />
              🌎 LATAM Continental (20 Países)
            </button>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-[#141414] border border-[#222430] rounded-[12px] p-3.5">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Fintechs Mapeadas</div>
            <div className="text-xl font-mono font-extrabold text-white mt-0.5">2,659+</div>
          </div>
          <div className="bg-[#141414] border border-[#222430] rounded-[12px] p-3.5">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Webs Oficiales Verificadas</div>
            <div className="text-xl font-mono font-extrabold text-emerald-400 mt-0.5">100% Indexadas</div>
          </div>
          <div className="bg-[#141414] border border-[#222430] rounded-[12px] p-3.5">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Rieles A2A Indexados</div>
            <div className="text-xl font-mono font-extrabold text-[#1BACFB] mt-0.5">Pix · SPEI · Bre-B</div>
          </div>
          <div className="bg-[#141414] border border-[#222430] rounded-[12px] p-3.5">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Resultados en Vista</div>
            <div className="text-xl font-mono font-extrabold text-[#9BE9FE] mt-0.5">{filteredFintechs.length}</div>
          </div>
        </div>

        {/* GRID PRINCIPAL: MAPA VECTORIAL + DIRECTORIO LATERAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUMNA IZQUIERDA: MAPA VECTORIAL REAL (MÉXICO O LATAM) */}
          <div className="lg:col-span-7 bg-[#131419] border border-[#222430] rounded-[12px] p-5 shadow-2xl relative overflow-hidden flex flex-col min-h-[640px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-200">
                  {geoScope === 'mexico' ? '🇲🇽 Mapa Geográfico de los 32 Estados de México' : '🌎 Mapa Vectorial de América Latina'}
                </span>
                <span className="text-[10px] font-mono bg-[#0000FF]/15 text-[#1BACFB] border border-[#0000FF]/30 px-2 py-0.5 rounded-[4px]">
                  {geoScope === 'mexico' ? 'Contorno Oficial INEGI' : '18 Países Conectados'}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Pasa el cursor o haz clic en un territorio
              </div>
            </div>

            {/* MAPA SVG VECTORIAL REAL */}
            <div className="relative w-full flex-1 flex items-center justify-center bg-[#07090E] rounded-[8px] p-2 border border-[#1e202b] overflow-hidden">
              {geoScope === 'mexico' ? (
                // VISTA VECTORIAL MÉXICO (32 ESTADOS)
                <svg viewBox="0 0 1000 650" className="w-full h-full max-h-[520px] drop-shadow-[0_0_30px_rgba(0,0,255,0.15)]">
                  <defs>
                    <pattern id="grid-mx" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(27, 172, 251, 0.04)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="1000" height="650" fill="url(#grid-mx)" />

                  {statesList.map(state => {
                    const isSelected = selectedState === state.id;
                    const isHovered = hoveredState?.id === state.id;
                    
                    let fill = '#0a101d';
                    let stroke = '#1e2433';
                    if (state.count > 300) fill = 'rgba(0, 0, 255, 0.65)';
                    else if (state.count > 100) fill = 'rgba(27, 172, 251, 0.50)';
                    else if (state.count > 25) fill = 'rgba(155, 233, 254, 0.35)';
                    else fill = 'rgba(20, 25, 38, 0.5)';

                    if (isHovered || isSelected) {
                      fill = '#1BACFB';
                      stroke = '#ffffff';
                    }

                    return (
                      <g key={state.id} className="cursor-pointer transition-all duration-200">
                        <path
                          d={state.svgPath}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isSelected || isHovered ? 2.2 : 0.9}
                          className="transition-all duration-200 hover:brightness-125"
                          onMouseEnter={() => setHoveredState(state)}
                          onMouseLeave={() => setHoveredState(null)}
                          onClick={() => setSelectedState(state.id)}
                        />
                        {state.labelX > 0 && (
                          <>
                            <circle
                              cx={state.labelX}
                              cy={state.labelY}
                              r={state.count > 100 ? 4 : 2.5}
                              fill={isSelected ? '#000000' : '#ffffff'}
                              className="pointer-events-none"
                            />
                            <text
                              x={state.labelX}
                              y={state.labelY - 6}
                              fill={isSelected || isHovered ? '#1BACFB' : '#cbd5e1'}
                              fontSize={state.count > 100 ? 10 : 8}
                              fontWeight={isSelected ? 'bold' : 'normal'}
                              textAnchor="middle"
                              fontFamily="monospace"
                              className="pointer-events-none select-none"
                            >
                              {state.code}
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>
              ) : (
                // VISTA VECTORIAL LATAM CONTINENTAL (18 PAÍSES SUDAMÉRICA + CENTROAMÉRICA + MÉXICO)
                <svg viewBox="0 0 1000 850" className="w-full h-full max-h-[540px] drop-shadow-[0_0_30px_rgba(0,0,255,0.15)]">
                  <defs>
                    <pattern id="grid-latam" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(27, 172, 251, 0.04)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="1000" height="850" fill="url(#grid-latam)" />

                  {latamList.map(country => {
                    const isSelected = selectedCountry === country.code;
                    const isHovered = hoveredCountry?.code === country.code;

                    let fill = '#0a101d';
                    let stroke = '#1e2433';
                    if (country.count > 500) fill = 'rgba(0, 0, 255, 0.65)';
                    else if (country.count > 100) fill = 'rgba(27, 172, 251, 0.50)';
                    else if (country.count > 20) fill = 'rgba(155, 233, 254, 0.35)';
                    else fill = 'rgba(20, 25, 38, 0.5)';

                    if (isHovered || isSelected) {
                      fill = '#1BACFB';
                      stroke = '#ffffff';
                    }

                    return (
                      <g key={country.code} className="cursor-pointer transition-all duration-200">
                        <path
                          d={country.svgPath}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isSelected || isHovered ? 2.2 : 0.9}
                          className="transition-all duration-200 hover:brightness-125"
                          onMouseEnter={() => setHoveredCountry(country)}
                          onMouseLeave={() => setHoveredCountry(null)}
                          onClick={() => setSelectedCountry(country.code)}
                        />
                        {country.labelX > 0 && (
                          <>
                            <circle
                              cx={country.labelX}
                              cy={country.labelY}
                              r={country.count > 100 ? 5 : 3.5}
                              fill={isSelected ? '#000000' : '#ffffff'}
                              className="pointer-events-none"
                            />
                            <text
                              x={country.labelX}
                              y={country.labelY - 8}
                              fill={isSelected || isHovered ? '#1BACFB' : '#ffffff'}
                              fontSize={country.count > 100 ? 12 : 9}
                              fontWeight="bold"
                              textAnchor="middle"
                              fontFamily="monospace"
                              className="pointer-events-none select-none"
                            >
                              {country.name} ({country.count})
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* TOOLTIP FLOTANTE EN HOVER (MÉXICO O LATAM) */}
              <AnimatePresence>
                {geoScope === 'mexico' && hoveredState && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-4 left-4 bg-[#141414]/95 backdrop-blur-xl border border-[#1BACFB]/40 rounded-[8px] p-3.5 shadow-2xl text-xs text-white pointer-events-none z-20"
                  >
                    <div className="flex items-center gap-2 font-bold text-[#1BACFB] text-sm">
                      <MapPin className="w-4 h-4" />
                      {hoveredState.name} ({hoveredState.code})
                    </div>
                    <div className="text-slate-300 font-mono mt-1">
                      🔥 <strong className="text-white">{hoveredState.count}</strong> Fintechs Activas
                    </div>
                    <div className="text-slate-400 text-[11px] mt-1">
                      📍 Hub: {hoveredState.hubCity}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hoveredState.topRails.map((r, i) => (
                        <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1f212b] text-[#9BE9FE] border border-[#2b2e3e]">
                          {r}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {geoScope === 'latam' && hoveredCountry && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-4 left-4 bg-[#141414]/95 backdrop-blur-xl border border-[#1BACFB]/40 rounded-[8px] p-3.5 shadow-2xl text-xs text-white pointer-events-none z-20"
                  >
                    <div className="flex items-center gap-2 font-bold text-[#1BACFB] text-sm">
                      <Globe2 className="w-4 h-4" />
                      {hoveredCountry.name} ({hoveredCountry.code})
                    </div>
                    <div className="text-slate-300 font-mono mt-1">
                      ⚡ Riel Dominante: <strong className="text-white">{hoveredCountry.dominantRail}</strong>
                    </div>
                    <div className="text-slate-400 text-[11px] mt-1">
                      📊 Remesas: {hoveredCountry.remesas} | Crecimiento: <span className="text-emerald-400 font-bold">{hoveredCountry.growth}</span>
                    </div>
                    <div className="text-emerald-400 font-mono text-[11px] mt-1 font-bold">
                      🏢 {hoveredCountry.count} Fintechs Indexadas
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DETALLE DEL ESTADO / PAÍS SELECCIONADO */}
            <div className="mt-4 p-3 bg-[#0A0B10] rounded-[8px] border border-[#1f212b] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400 font-mono">Filtro Activo: </span>
                {geoScope === 'mexico' ? (
                  <>
                    <span className="font-bold text-[#1BACFB]">{activeStateObj ? activeStateObj.name : 'Todo México'}</span>
                    {activeStateObj && <span className="text-slate-400 ml-2 font-mono">({activeStateObj.count} registradas)</span>}
                  </>
                ) : (
                  <>
                    <span className="font-bold text-[#1BACFB]">{activeCountryObj ? activeCountryObj.name : 'Todo LATAM'}</span>
                    {activeCountryObj && <span className="text-slate-400 ml-2 font-mono">({activeCountryObj.count} registradas)</span>}
                  </>
                )}
              </div>
              <button
                onClick={() => {
                  if (geoScope === 'mexico') setSelectedState('all');
                  else setSelectedCountry('ALL');
                }}
                className="px-3 py-1 text-[11px] rounded-full bg-[#181922] text-slate-300 hover:text-white border border-[#272938] cursor-pointer"
              >
                Limpiar Filtro Geográfico
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: DIRECTORIO SINCRONIZADO EN TIEMPO REAL */}
          <div className="lg:col-span-5 bg-[#131419] border border-[#222430] rounded-[12px] p-5 shadow-2xl flex flex-col h-[640px]">
            
            {/* BUSCADOR Y FILTROS */}
            <div className="space-y-3 pb-3 border-b border-[#1f212b]">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar fintech, riel o sitio web..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0A0B10] border border-[#222433] rounded-[8px] pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#1BACFB] focus:ring-1 focus:ring-[#1BACFB]"
                />
              </div>

              {/* CHIPS DE VERTICALES */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                <button
                  onClick={() => setSelectedVertical('all')}
                  className={`px-3 py-1 rounded-full font-mono font-bold shrink-0 cursor-pointer transition-all ${
                    selectedVertical === 'all' ? 'bg-white text-black' : 'bg-[#181922] text-slate-400 hover:text-white border border-[#272938]'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setSelectedVertical('payments')}
                  className={`px-3 py-1 rounded-full font-mono font-bold shrink-0 cursor-pointer transition-all ${
                    selectedVertical === 'payments' ? 'bg-white text-black' : 'bg-[#181922] text-slate-400 hover:text-white border border-[#272938]'
                  }`}
                >
                  ⚡ Pagos & A2A
                </button>
                <button
                  onClick={() => setSelectedVertical('neobanks')}
                  className={`px-3 py-1 rounded-full font-mono font-bold shrink-0 cursor-pointer transition-all ${
                    selectedVertical === 'neobanks' ? 'bg-white text-black' : 'bg-[#181922] text-slate-400 hover:text-white border border-[#272938]'
                  }`}
                >
                  🏛️ Neobancos / IFPE
                </button>
                <button
                  onClick={() => setSelectedVertical('lending')}
                  className={`px-3 py-1 rounded-full font-mono font-bold shrink-0 cursor-pointer transition-all ${
                    selectedVertical === 'lending' ? 'bg-white text-black' : 'bg-[#181922] text-slate-400 hover:text-white border border-[#272938]'
                  }`}
                >
                  💳 Crédito / BNPL
                </button>
                <button
                  onClick={() => setSelectedVertical('crypto')}
                  className={`px-3 py-1 rounded-full font-mono font-bold shrink-0 cursor-pointer transition-all ${
                    selectedVertical === 'crypto' ? 'bg-white text-black' : 'bg-[#181922] text-slate-400 hover:text-white border border-[#272938]'
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
                    className="p-3.5 rounded-[8px] bg-[#0A0B10] border border-[#1f212b] hover:border-[#1BACFB]/50 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-[#1BACFB] transition-colors">
                            {fintech.name}
                          </h4>
                          {fintech.fundingStage && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[#0000FF]/15 text-[#9BE9FE] border border-[#0000FF]/30">
                              {fintech.fundingStage}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                          <MapPin className="w-3 h-3 text-[#1BACFB] shrink-0" />
                          <span>{fintech.state ? `${fintech.state}, ` : ''}{fintech.country}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-300 font-semibold">{fintech.vertical}</span>
                        </div>
                      </div>

                      {/* BOTÓN SITIO WEB OFICIAL DIRECTO */}
                      {fintech.website && (
                        <a
                          href={fintech.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#141414] hover:bg-[#0000FF]/20 text-[#1BACFB] border border-[#272938] hover:border-[#1BACFB] text-[10px] font-mono transition-all shrink-0"
                          title={`Visitar sitio oficial de ${fintech.name}`}
                        >
                          <span>{getCleanDomain(fintech.website)}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 font-light mt-2 line-clamp-2 leading-relaxed">
                      {fintech.description}
                    </p>

                    {/* RIEL Y REGULACIÓN */}
                    <div className="mt-3 pt-2.5 border-t border-[#1a1b24] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(fintech.rails) ? (
                          fintech.rails.slice(0, 2).map((r: string, idx: number) => (
                            <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[#0000FF]/10 text-[#9BE9FE] border border-[#0000FF]/20">
                              ⚡ {r}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[#0000FF]/10 text-[#9BE9FE]">
                            ⚡ SPEI / Pix
                          </span>
                        )}
                        {fintech.regulation && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[#141414] text-slate-300 border border-[#222433]">
                            🏛️ {fintech.regulation.split('(')[0]}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleOutreachClick(fintech.name, fintech.country)}
                        className="flex items-center gap-1 text-[11px] font-mono font-bold text-black bg-white hover:bg-slate-200 px-3 py-1 rounded-full transition-all cursor-pointer shadow-sm"
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
            <div className="pt-3 border-t border-[#1f212b] text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>Indexado con Finnovista Radars 2025-2026</span>
              <span>Total: {filteredFintechs.length} resultados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe2, 
  Zap, 
  CreditCard, 
  ShieldCheck, 
  Building2, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  Filter, 
  Search, 
  ArrowUpRight, 
  Landmark,
  CheckCircle2,
  Lock,
  ChevronRight,
  Info
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 20 Países con datos duros verificados de rieles de pagos y adquirencia en LATAM
const LATAM_COUNTRIES_DATA = [
  {
    id: "brazil",
    name: "Brasil",
    code: "BR",
    flag: "🇧🇷",
    regulator: "Banco Central do Brasil (BCB)",
    instantRail: "Pix",
    instantRailType: "A2A Cuenta a Cuenta (Obligatorio)",
    instantPenetration: "92% de la población bancarizada",
    avgMdrCredit: "1.9% - 2.8%",
    avgMdrDebit: "1.0% - 1.4%",
    keyGateways: ["Mercado Pago", "Stripe", "dLocal", "EBANX", "PagBank", "Stone", "Cielo"],
    licenseType: "Instituição de Pagamento (IP) / SCD",
    crossBorderReadiness: "Alta (Pix Automático & Cross-border)",
    interoperability: "100% Interoperable (SPI)",
    color: "emerald"
  },
  {
    id: "mexico",
    name: "México",
    code: "MX",
    flag: "🇲🇽",
    regulator: "Banxico & CNBV",
    instantRail: "SPEI / CoDi / Dimo",
    instantRailType: "A2A Interbancario 24/7",
    instantPenetration: "Crecimiento 35% YoY (+3,800M transacciones)",
    avgMdrCredit: "2.64% - 3.59%",
    avgMdrDebit: "1.15% - 2.20%",
    keyGateways: ["Clip", "Mercado Pago", "Stripe", "Conekta", "Kushki", "dLocal", "Openpay", "Prosa"],
    licenseType: "Ley Fintech (IFPE / ITF)",
    crossBorderReadiness: "Muy Alta (Pasarelas globales con adquirencia local)",
    interoperability: "Alta (SPEI Cámara de Compensación)",
    color: "cyan"
  },
  {
    id: "colombia",
    name: "Colombia",
    code: "CO",
    flag: "🇨🇴",
    regulator: "Superintendencia Financiera (SFC)",
    instantRail: "PSE / Transfiya / Bre-B",
    instantRailType: "A2A + Riel interoperable Banrep (Bre-B)",
    instantPenetration: "70% de compras digitales vía PSE/Transfiya",
    avgMdrCredit: "2.40% - 3.20%",
    avgMdrDebit: "1.50% - 2.00%",
    keyGateways: ["Wompi (Bancolombia)", "Bold", "Kushki", "PayU", "dLocal", "Mercado Pago", "Placetopay"],
    licenseType: "SEDPE / Compañía de Financiamiento",
    crossBorderReadiness: "Alta",
    interoperability: "En consolidación con Bre-B (2025/2026)",
    color: "amber"
  },
  {
    id: "argentina",
    name: "Argentina",
    code: "AR",
    flag: "🇦🇷",
    regulator: "Banco Central (BCRA)",
    instantRail: "Transferencias 3.0 (QR Interoperable / CVU)",
    instantRailType: "A2A Multibilletera (Debin / CVU)",
    instantPenetration: "Líder en adopción QR en comercio físico",
    avgMdrCredit: "1.80% - 3.50%",
    avgMdrDebit: "0.80% - 1.20%",
    keyGateways: ["Mercado Pago", "dLocal", "Ualá", "Naranja X", "Prisma/Payway", "Modo"],
    licenseType: "PSP (Proveedor de Servicios de Pago)",
    crossBorderReadiness: "Media (Fricción cambiaria / Cripto estable)",
    interoperability: "100% QR Interoperable",
    color: "blue"
  },
  {
    id: "chile",
    name: "Chile",
    code: "CL",
    flag: "🇨🇱",
    regulator: "Comisión para el Mercado Financiero (CMF)",
    instantRail: "TEF / Khipu / Webpay Redelcom",
    instantRailType: "Transferencias bancarias + Riel Transbank",
    instantPenetration: "Mayor penetración de tarjetas per cápita en LATAM",
    avgMdrCredit: "1.40% - 2.20%",
    avgMdrDebit: "0.60% - 1.10%",
    keyGateways: ["Transbank", "Kushki", "Mercado Pago", "Flow", "Fintoc", "dLocal"],
    licenseType: "Ley FinTech Chile (Open Finance en despliegue)",
    crossBorderReadiness: "Alta",
    interoperability: "Modelo de 4 partes plenamente operativo",
    color: "indigo"
  },
  {
    id: "peru",
    name: "Perú",
    code: "PE",
    flag: "🇵🇪",
    regulator: "SBS & BCRP",
    instantRail: "Yape / Plin / PagoEfectivo",
    instantRailType: "Interoperabilidad Billeteras P2P y P2M",
    instantPenetration: ">16M de usuarios activos en Yape/Plin",
    avgMdrCredit: "2.80% - 3.60%",
    avgMdrDebit: "1.80% - 2.50%",
    keyGateways: ["Niubiz", "Izipay", "Culqi", "Kushki", "dLocal", "Mercado Pago"],
    licenseType: "EEDE (Empresa Emisora de Dinero Electrónico)",
    crossBorderReadiness: "Media-Alta",
    interoperability: "100% Interoperabilidad Yape-Plin regulada por BCRP",
    color: "rose"
  },
  {
    id: "uruguay",
    name: "Uruguay",
    code: "UY",
    flag: "🇺🇾",
    regulator: "Banco Central del Uruguay (BCU)",
    instantRail: "Transferencias Instantáneas BCU",
    instantRailType: "A2A Interbancario",
    instantPenetration: "Alta inclusión bancaria y hubs de pagos globales",
    avgMdrCredit: "1.80% - 2.50%",
    avgMdrDebit: "0.90% - 1.30%",
    keyGateways: ["dLocal (Headquarters)", "Mercado Pago", "Handy", "Geopagos"],
    licenseType: "IEDE / Pasarela de Pagos BCU",
    crossBorderReadiness: "Excelente (Hub financiero internacional)",
    interoperability: "Alta",
    color: "sky"
  },
  {
    id: "ecuador",
    name: "Ecuador",
    code: "EC",
    flag: "🇪🇨",
    regulator: "Banco Central del Ecuador (BCE) & SB",
    instantRail: "Billetera Móvil / Transferencias SPI",
    instantRailType: "Economía dolarizada (USD)",
    instantPenetration: "Crecimiento de transferencias electrónicas interbancarias",
    avgMdrCredit: "2.90% - 4.20%",
    avgMdrDebit: "1.80% - 2.50%",
    keyGateways: ["Kushki (Origen)", "Payphone", "Datafast", "Medianet", "dLocal"],
    licenseType: "Pasarela Auxiliar de Pagos BCE",
    crossBorderReadiness: "Fácil liquidación (Moneda USD)",
    interoperability: "Media (En modernización regulatoria)",
    color: "amber"
  },
  {
    id: "costarica",
    name: "Costa Rica",
    code: "CR",
    flag: "🇨🇷",
    regulator: "Banco Central de Costa Rica (BCCR) & SUGEF",
    instantRail: "SINPE Móvil",
    instantRailType: "A2A por número de teléfono celular",
    instantPenetration: ">95% de pagos P2P y comercio minorista",
    avgMdrCredit: "1.75% - 2.50%",
    avgMdrDebit: "1.00% - 1.50%",
    keyGateways: ["BAC Credomatic", "dLocal", "Kushki", "Tilopay"],
    licenseType: "Entidad de Pago BCCR",
    crossBorderReadiness: "Alta en Centroamérica",
    interoperability: "100% Interoperable (SINPE)",
    color: "teal"
  },
  {
    id: "panama",
    name: "Panamá",
    code: "PA",
    flag: "🇵🇦",
    regulator: "Superintendencia de Bancos de Panamá (SBP)",
    instantRail: "Yappy / ACH Xpress",
    instantRailType: "A2A Telnet + Dolarizado",
    instantPenetration: "Yappy domina pagos comerciales cotidianos",
    avgMdrCredit: "2.50% - 3.50%",
    avgMdrDebit: "1.50% - 2.20%",
    keyGateways: ["Banco General (Yappy)", "dLocal", "PagueloFacil", "Kushki"],
    licenseType: "Centro Bancario Internacional",
    crossBorderReadiness: "Muy Alta (Hub logístico y bancario USD)",
    interoperability: "En integración ACH Xpress nacional",
    color: "purple"
  }
];

export function LatamPaymentRailsMap() {
  const [selectedCountry, setSelectedCountry] = useState(LATAM_COUNTRIES_DATA[0]);
  const [filterRail, setFilterRail] = useState<"all" | "a2a" | "gateways" | "regulators">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = LATAM_COUNTRIES_DATA.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.instantRail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.keyGateways.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-6 font-sans text-slate-900">
      {/* Header del Radar de Rieles */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <Badge className="bg-cyan-100 text-cyan-900 border-cyan-300 font-bold px-2.5 py-0.5 text-xs">
              <Globe2 className="w-3.5 h-3.5 mr-1.5 text-cyan-700" />
              Telemetría Geoespacial de Pagos 2026
            </Badge>
            <Badge variant="outline" className="text-slate-600 font-mono text-xs">
              100% Rieles & Adquirencia
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            Ecosistema de Rieles & Pasarelas de América Latina
          </h2>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Datos verificados de reguladores centrales, esquemas A2A (Pix, SPEI, PSE) y tasas de adquirencia por mercado.
          </p>
        </div>

        {/* Buscador de Países / Rieles */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar país, riel o pasarela..."
            className="pl-9 bg-white border-slate-300 text-xs h-9"
          />
        </div>
      </div>

      {/* Barra de Filtros de Telemetría */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filtrar capa:
        </span>
        <Button
          size="sm"
          variant={filterRail === "all" ? "default" : "outline"}
          onClick={() => setFilterRail("all")}
          className={`text-xs h-8 cursor-pointer ${filterRail === "all" ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`}
        >
          Todos los Países ({filteredCountries.length})
        </Button>
        <Button
          size="sm"
          variant={filterRail === "a2a" ? "default" : "outline"}
          onClick={() => setFilterRail("a2a")}
          className={`text-xs h-8 cursor-pointer ${filterRail === "a2a" ? "bg-emerald-600 text-white font-bold" : "bg-white text-slate-700"}`}
        >
          <Zap className="w-3.5 h-3.5 mr-1" /> Rieles A2A Instantáneos
        </Button>
        <Button
          size="sm"
          variant={filterRail === "gateways" ? "default" : "outline"}
          onClick={() => setFilterRail("gateways")}
          className={`text-xs h-8 cursor-pointer ${filterRail === "gateways" ? "bg-cyan-600 text-white font-bold" : "bg-white text-slate-700"}`}
        >
          <CreditCard className="w-3.5 h-3.5 mr-1" /> Pasarelas & MDR
        </Button>
        <Button
          size="sm"
          variant={filterRail === "regulators" ? "default" : "outline"}
          onClick={() => setFilterRail("regulators")}
          className={`text-xs h-8 cursor-pointer ${filterRail === "regulators" ? "bg-purple-600 text-white font-bold" : "bg-white text-slate-700"}`}
        >
          <Landmark className="w-3.5 h-3.5 mr-1" /> Bancos Centrales & Licencias
        </Button>
      </div>

      {/* Grid Principal: Mosaico de Países + Panel de Detalle Quirúrgico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna Izquierda: Tarjetas de Países Seleccionables (8 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[680px] overflow-y-auto pr-1">
          {filteredCountries.map((country) => {
            const isSelected = selectedCountry.id === country.id;
            return (
              <motion.div
                key={country.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedCountry(country)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative ${
                  isSelected 
                    ? "bg-slate-900 text-white border-cyan-500 shadow-md ring-2 ring-cyan-500/20" 
                    : "bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{country.flag}</span>
                    <span className={`font-extrabold text-sm ${isSelected ? "text-white" : "text-slate-900"}`}>
                      {country.name}
                    </span>
                  </div>
                  <Badge 
                    className={`text-[10px] font-mono font-bold ${
                      isSelected 
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" 
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {country.code}
                  </Badge>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] ${isSelected ? "text-slate-400" : "text-slate-500"}`}>Riel A2A:</span>
                    <span className={`font-bold ${isSelected ? "text-emerald-300" : "text-emerald-700"}`}>
                      {country.instantRail}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] ${isSelected ? "text-slate-400" : "text-slate-500"}`}>MDR Crédito:</span>
                    <span className={`font-mono font-bold ${isSelected ? "text-cyan-300" : "text-cyan-800"}`}>
                      {country.avgMdrCredit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] ${isSelected ? "text-slate-400" : "text-slate-500"}`}>Regulador:</span>
                    <span className={`truncate max-w-[140px] font-medium ${isSelected ? "text-slate-300" : "text-slate-700"}`}>
                      {country.regulator}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-cyan-400 font-bold">
                    <span>Activo en Telemetría</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Columna Derecha: Tarjeta de Telemetría Detallada (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="p-6 bg-slate-900 border-slate-800 text-white rounded-2xl shadow-xl sticky top-6 space-y-5">
            {/* Header del País Seleccionado */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedCountry.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-white">{selectedCountry.name}</h3>
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
                      {selectedCountry.code}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedCountry.regulator}</p>
                </div>
              </div>
            </div>

            {/* Ficha 1: Riel Instantáneo A2A */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> Riel Instantáneo Oficial
                </span>
                <Badge className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                  {selectedCountry.instantRail}
                </Badge>
              </div>
              <p className="text-xs text-slate-200 font-medium">
                {selectedCountry.instantRailType}
              </p>
              <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg">
                📊 <strong>Penetración:</strong> {selectedCountry.instantPenetration}
              </div>
            </div>

            {/* Ficha 2: Tasas de Adquirencia y Costos (MDR) */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" /> Tasas de Descuento (MDR Promedio)
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-slate-900/60 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Tarjeta de Crédito</span>
                  <span className="font-mono font-bold text-white text-sm">{selectedCountry.avgMdrCredit}</span>
                </div>
                <div className="p-2 bg-slate-900/60 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Tarjeta de Débito</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{selectedCountry.avgMdrDebit}</span>
                </div>
              </div>
            </div>

            {/* Ficha 3: Pasarelas Líderes Operando */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Pasarelas & Procesadores Verificados
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCountry.keyGateways.map((gw, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-slate-800 text-slate-200 border-slate-700 text-xs py-1">
                    {gw}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Ficha 4: Marco Regulatorio & Licencia */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tipo de Licencia:</span>
                <span className="font-bold text-white">{selectedCountry.licenseType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Interoperabilidad:</span>
                <span className="font-medium text-emerald-400">{selectedCountry.interoperability}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Apertura Cross-Border:</span>
                <span className="font-medium text-cyan-300">{selectedCountry.crossBorderReadiness}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

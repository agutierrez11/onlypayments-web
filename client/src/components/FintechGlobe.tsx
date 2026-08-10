import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Radio, 
  Search, 
  Zap, 
  ShieldCheck, 
  Building2, 
  Globe2, 
  Layers, 
  TrendingUp, 
  X, 
  Sparkles, 
  ChevronRight,
  Info,
  Maximize2,
  RefreshCw
} from 'lucide-react';

import globeLandPoints from '../data/globe_land_points.json';

// =============================================================================
// DATOS DEL ECOSISTEMA LATAM FINTECH (CERO ASUNCIONES - DATOS REALES 2025/2026)
// =============================================================================
interface NodeData {
  id: string;
  label: string;
  category: 'hub' | 'country' | 'rail' | 'regulator' | 'chamber';
  lat?: number;
  lon?: number;
  radius: number;
  color: string;
  glowColor: string;
  flag?: string;
  code?: string;
  metrics: string;
  dominantRail: string;
  regulator: string;
  activeGateways: string;
  avgMdr: string;
  a2aAdoption: string;
  description: string;
}

const NODES_DATA: NodeData[] = [
  {
    id: 'core',
    label: 'OnlyPayments Engine',
    category: 'hub',
    radius: 28,
    color: '#00f5d4',
    glowColor: 'rgba(0, 245, 212, 0.6)',
    metrics: '2,659+ Entidades Mapeadas',
    dominantRail: 'Multi-Rail A2A Hub',
    regulator: 'Inteligencia B2B Regional',
    activeGateways: 'Stripe, dLocal, Clip, Mercado Pago, Kushki',
    avgMdr: 'Optimizado por Riel',
    a2aAdoption: '100% Cobertura LATAM',
    description: 'Núcleo central de enrutamiento y matching semántico de pasarelas y rieles instantáneos.'
  },
  {
    id: 'mx',
    label: 'México',
    code: 'MX',
    flag: '🇲🇽',
    category: 'country',
    lat: 19.43,
    lon: -99.13,
    radius: 18,
    color: '#00f5d4',
    glowColor: 'rgba(0, 245, 212, 0.5)',
    metrics: '$62.5B Remesas · 650+ Fintechs',
    dominantRail: 'SPEI / CoDi / Dimo',
    regulator: 'Banxico & CNBV (Ley Fintech)',
    activeGateways: 'Clip, Mercado Pago, Stripe, Kushki, Conekta',
    avgMdr: '2.64% - 3.59%',
    a2aAdoption: '60M Usuarios Activos',
    description: 'Segundo mercado FinTech más grande de LATAM con ecosistema de transferencias 24/7 de alta adopción.'
  },
  {
    id: 'br',
    label: 'Brasil',
    code: 'BR',
    flag: '🇧🇷',
    category: 'country',
    lat: -23.55,
    lon: -46.63,
    radius: 22,
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    metrics: '$2.03B VC Funding · 1,200+ Fintechs',
    dominantRail: 'Pix (Banco Central do Brasil)',
    regulator: 'Banco Central do Brasil & CVM',
    activeGateways: 'Mercado Pago, Stripe, Stone, PagBank, Cielo',
    avgMdr: '1.90% - 2.80%',
    a2aAdoption: '95% Población Adulta',
    description: 'Líder global en pagos instantáneos A2A con más de 63B de transacciones anuales a través de Pix.'
  },
  {
    id: 'co',
    label: 'Colombia',
    code: 'CO',
    flag: '🇨🇴',
    category: 'country',
    lat: 4.71,
    lon: -74.07,
    radius: 16,
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    metrics: '410+ Fintechs · +22% Crecimiento',
    dominantRail: 'Bre-B / PSE / Transfiya',
    regulator: 'Superfinanciera & Banco de la República',
    activeGateways: 'Wompi, Bold, Kushki, PayU, dLocal',
    avgMdr: '2.40% - 3.20%',
    a2aAdoption: '70% E-commerce A2A',
    description: 'Ecosistema en despliegue de Bre-B para interoperabilidad total en pagos de bajo valor.'
  },
  {
    id: 'cl',
    label: 'Chile',
    code: 'CL',
    flag: '🇨🇱',
    category: 'country',
    lat: -33.44,
    lon: -70.66,
    radius: 15,
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    metrics: '280+ Fintechs · Ley N° 21.521',
    dominantRail: 'TEF / Khipu / Webpay',
    regulator: 'CMF Chile & Banco Central',
    activeGateways: 'Transbank, Kushki, Mercado Pago, Fintoc',
    avgMdr: '1.40% - 2.20%',
    a2aAdoption: 'Líder Tarjetas de Débito',
    description: 'Marco regulatorio avanzado de Open Finance bajo la Ley Fintech 21.521.'
  },
  {
    id: 'ar',
    label: 'Argentina',
    code: 'AR',
    flag: '🇦🇷',
    category: 'country',
    lat: -34.60,
    lon: -58.38,
    radius: 16,
    color: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.5)',
    metrics: '320+ Fintechs · Alto Talento Tech',
    dominantRail: 'Transferencias 3.0 / QR / DEBIN',
    regulator: 'Banco Central de la República Argentina (BCRA)',
    activeGateways: 'Mercado Pago, Ualá, dLocal, MODO, Payway',
    avgMdr: '1.80% - 3.50%',
    a2aAdoption: 'Pionero en QR Interoperable',
    description: 'Adopción masiva de pagos móviles con código QR interoperable y billeteras digitales multimoneda.'
  },
  {
    id: 'pe',
    label: 'Perú',
    code: 'PE',
    flag: '🇵🇪',
    category: 'country',
    lat: -12.04,
    lon: -77.04,
    radius: 14,
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    metrics: '180+ Fintechs · $4.5B Remesas',
    dominantRail: 'Yape / Plin / Interoperabilidad BCRP',
    regulator: 'SBS & Banco Central de Reserva del Perú',
    activeGateways: 'Niubiz, Izipay, Culqi, Kushki, dLocal',
    avgMdr: '2.80% - 3.60%',
    a2aAdoption: '16M+ Usuarios',
    description: 'Mandato de interoperabilidad total entre billeteras móviles (Yape y Plin) impulsado por el BCRP.'
  },
  {
    id: 'uy',
    label: 'Uruguay',
    code: 'UY',
    flag: '🇺🇾',
    category: 'country',
    lat: -34.90,
    lon: -56.16,
    radius: 13,
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    metrics: '55+ Fintechs · Sede dLocal HQ',
    dominantRail: 'SPI Directo (BCU)',
    regulator: 'Banco Central del Uruguay (BCU)',
    activeGateways: 'dLocal, Handy, Geopagos',
    avgMdr: '1.80% - 2.50%',
    a2aAdoption: 'Hub Cross-Border Global',
    description: 'Hub de exportación de servicios financieros e infraestructura cross-border para mercados emergentes.'
  },
  {
    id: 'ec',
    label: 'Ecuador',
    code: 'EC',
    flag: '🇪🇨',
    category: 'country',
    lat: -0.18,
    lon: -78.46,
    radius: 13,
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    metrics: '$5.2B Remesas · Dolarizado',
    dominantRail: 'SPI / BCE Pagos Inmediatos',
    regulator: 'Banco Central del Ecuador & SuperBancos',
    activeGateways: 'Kushki (HQ Origen), Payphone, Datafast',
    avgMdr: '2.90% - 4.20%',
    a2aAdoption: 'Economía Dolarizada USD',
    description: 'Mercado dolarizado de alto flujo de remesas y cuna de infraestructura de pagos moderna (Kushki).'
  },
  {
    id: 'cr',
    label: 'Costa Rica',
    code: 'CR',
    flag: '🇨🇷',
    category: 'country',
    lat: 9.92,
    lon: -84.09,
    radius: 12,
    color: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.5)',
    metrics: '70+ Fintechs · SINPE Móvil Líder',
    dominantRail: 'SINPE Móvil (BCCR)',
    regulator: 'Banco Central de Costa Rica & SUGEF',
    activeGateways: 'BAC Credomatic, Tilopay, dLocal',
    avgMdr: '1.75% - 2.50%',
    a2aAdoption: '88% Penetración Población',
    description: 'Uno de los casos de éxito de pagos móviles A2A más sólidos de Centroamérica a través de SINPE Móvil.'
  },
  {
    id: 'pa',
    label: 'Panamá',
    code: 'PA',
    flag: '🇵🇦',
    category: 'country',
    lat: 8.98,
    lon: -79.51,
    radius: 13,
    color: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.5)',
    metrics: '85+ Fintechs · Hub Bancario Regional',
    dominantRail: 'Yappy / ACH Xpress',
    regulator: 'Superintendencia de Bancos de Panamá',
    activeGateways: 'Banco General, PagueloFacil, dLocal',
    avgMdr: '2.50% - 3.50%',
    a2aAdoption: 'Centro Financiero Dolarizado',
    description: 'Centro bancario internacional clave para la canalización de flujos comerciales y pagos B2B.'
  },
  {
    id: 'do',
    label: 'Rep. Dominicana',
    code: 'DO',
    flag: '🇩🇴',
    category: 'country',
    lat: 18.48,
    lon: -69.93,
    radius: 12,
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    metrics: '$11.9B Remesas · 110+ Fintechs',
    dominantRail: 'LBTR Inmediato SIPARD',
    regulator: 'Banco Central de la Rep. Dominicana',
    activeGateways: 'CardNET, Azul, dLocal, MIO',
    avgMdr: '2.50% - 3.80%',
    a2aAdoption: 'Alta Densidad de Remesas',
    description: 'Mercado caribeño líder en volumen de remesas y modernización de pagos en tiempo real.'
  },
  {
    id: 'gt',
    label: 'Guatemala',
    code: 'GT',
    flag: '🇬🇹',
    category: 'country',
    lat: 14.63,
    lon: -90.50,
    radius: 12,
    color: '#0ea5e9',
    glowColor: 'rgba(14, 165, 233, 0.5)',
    metrics: '$19.8B Remesas · ACH Pronto',
    dominantRail: 'ACH Pronto / GuatePago',
    regulator: 'BANGUAT & Superintendencia de Bancos',
    activeGateways: 'Bam, Fri, NeoNet, dLocal',
    avgMdr: '3.00% - 4.50%',
    a2aAdoption: 'Mayor Corredor Remesas CA',
    description: 'Mayor receptor de remesas familiares en Centroamérica con digitalización acelerada de dispersiones.'
  },

  // RIELES INSTANTÁNEOS A2A
  {
    id: 'pix_rail',
    label: '⚡ Pix Protocol',
    category: 'rail',
    radius: 17,
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    metrics: '63B+ Transacciones / Año',
    dominantRail: 'RTP Instantáneo T+0',
    regulator: 'Banco Central do Brasil',
    activeGateways: 'Interoperable con todo el sistema bancario brasileño',
    avgMdr: '0.00% - 0.99%',
    a2aAdoption: 'Estándar Oficial',
    description: 'Protocolo de pagos instantáneos gubernamental de mayor éxito en el mundo occidental.'
  },
  {
    id: 'spei_rail',
    label: '⚡ SPEI 24/7',
    category: 'rail',
    radius: 16,
    color: '#00f5d4',
    glowColor: 'rgba(0, 245, 212, 0.6)',
    metrics: '3.8B Transacciones Anuales',
    dominantRail: 'Riel Bancario Central Banxico',
    regulator: 'Banco de México',
    activeGateways: 'Bancos, Fintechs IFPE y Participantes No Bancarios',
    avgMdr: '$0.50 - $4.00 MXN fijo',
    a2aAdoption: '60M Usuarios',
    description: 'Sistema de liquidación bruta en tiempo real para operaciones minoristas y mayoristas en México.'
  },
  {
    id: 'breb_rail',
    label: '⚡ Bre-B Interoperable',
    category: 'rail',
    radius: 14,
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.6)',
    metrics: 'Nuevo Estándar 2025/2026',
    dominantRail: 'Pagos Inmediatos Bajo Valor',
    regulator: 'Banco de la República de Colombia',
    activeGateways: 'Bancos, Billeteras y Neobancos',
    avgMdr: 'Bajo Costo Regulado',
    a2aAdoption: 'Interoperabilidad Total',
    description: 'Infraestructura central de pagos instantáneos con llaves únicas (cédula, teléfono, email).'
  },
  {
    id: 't3_rail',
    label: '⚡ Transferencias 3.0',
    category: 'rail',
    radius: 14,
    color: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.6)',
    metrics: 'QR Abierto Interbancario',
    dominantRail: 'DEBIN / CBU / CVU',
    regulator: 'BCRA',
    activeGateways: 'Mercado Pago, Modo, Billeteras PSP',
    avgMdr: '0.8% Máximo Regulado',
    a2aAdoption: 'Masiva en Comercios',
    description: 'Sistema nacional de pagos con transferencias inmediatas e interoperabilidad de códigos QR.'
  },

  // REGULADORES & BANCOS CENTRALES
  {
    id: 'banxico_reg',
    label: '🏛️ Banxico & CNBV',
    category: 'regulator',
    radius: 13,
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    metrics: 'Regulador Sistema Financiero MX',
    dominantRail: 'Administrador SPEI',
    regulator: 'Marco Ley Fintech 2018',
    activeGateways: 'Supervisión de IFPE, IFC y Modelos Novedosos',
    avgMdr: 'Regulación de Tasas de Intercambio',
    a2aAdoption: 'Líder Regulatorio',
    description: 'Autoridad rectora de la política monetaria y sistemas de pagos de México.'
  },
  {
    id: 'bcb_reg',
    label: '🏛️ Banco Central do Brasil',
    category: 'regulator',
    radius: 14,
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    metrics: 'Arquitecto Pix & Open Finance',
    dominantRail: 'Operador del Sistema SPI',
    regulator: 'BCB & CVM',
    activeGateways: 'Open Finance Brasil Fase 4',
    avgMdr: 'Normativa Pro-Competencia',
    a2aAdoption: 'Referente Global',
    description: 'Banco central pionero en diseño de infraestructuras públicas de pagos y Open Finance.'
  },

  // CÁMARAS & ASOCIACIONES FINTECH
  {
    id: 'fintech_mx_assoc',
    label: '🤝 Fintech México',
    category: 'chamber',
    radius: 13,
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    metrics: '180+ Empresas Miembro',
    dominantRail: 'Gremio y Políticas Públicas',
    regulator: 'Alianza con Reguladores',
    activeGateways: 'Asociación Gremial Oficial',
    avgMdr: 'Mesas de Trabajo de Pagos',
    a2aAdoption: 'Promotor de Ecosistema',
    description: 'Cámara oficial que agrupa a las fintechs y adquirentes más importantes de México.'
  },
  {
    id: 'abfintechs_assoc',
    label: '🤝 ABFintechs Brasil',
    category: 'chamber',
    radius: 14,
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    metrics: '650+ Fintechs Asociadas',
    dominantRail: 'Gremio Líder LATAM',
    regulator: 'Interlocutor BCB',
    activeGateways: 'Mayor Asociación del Continente',
    avgMdr: 'Defensa de Competencia',
    a2aAdoption: 'Impulsor de Innovación',
    description: 'La mayor asociación gremial de innovación financiera de América Latina.'
  },
  {
    id: 'alianza_ibero_assoc',
    label: '🤝 Alianza Iberoamericana',
    category: 'chamber',
    radius: 14,
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    metrics: '14 Cámaras Fintech Agrupadas',
    dominantRail: 'Corredores Transfronterizos',
    regulator: 'Pasaporte Regulatorio Regional',
    activeGateways: 'Puente LATAM - Europa',
    avgMdr: 'Armonización Regional',
    a2aAdoption: 'Cross-Border Alliance',
    description: 'Federación que agrupa a las cámaras de México, Brasil, Colombia, Chile, Argentina, España y Portugal.'
  }
];

const LINKS_DATA = [
  { source: 'core', target: 'mx' },
  { source: 'core', target: 'br' },
  { source: 'core', target: 'co' },
  { source: 'core', target: 'cl' },
  { source: 'core', target: 'ar' },
  { source: 'core', target: 'pe' },
  { source: 'core', target: 'uy' },
  { source: 'core', target: 'ec' },
  { source: 'core', target: 'cr' },
  { source: 'core', target: 'pa' },
  { source: 'core', target: 'do' },
  { source: 'core', target: 'gt' },
  { source: 'core', target: 'alianza_ibero_assoc' },

  // Links de Rieles
  { source: 'br', target: 'pix_rail' },
  { source: 'bcb_reg', target: 'pix_rail' },
  { source: 'mx', target: 'spei_rail' },
  { source: 'banxico_reg', target: 'spei_rail' },
  { source: 'co', target: 'breb_rail' },
  { source: 'ar', target: 't3_rail' },

  // Links de Cámaras
  { source: 'mx', target: 'fintech_mx_assoc' },
  { source: 'alianza_ibero_assoc', target: 'fintech_mx_assoc' },
  { source: 'br', target: 'abfintechs_assoc' },
  { source: 'alianza_ibero_assoc', target: 'abfintechs_assoc' }
];

export default function FintechGlobe() {
  const [viewMode, setViewMode] = useState<'graph' | 'satellite'>('graph');
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(NODES_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'country' | 'rail' | 'regulator' | 'chamber'>('all');

  // Canvas Refs
  const graphCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const threeMountRef = useRef<HTMLDivElement | null>(null);

  // ===========================================================================
  // MODO 1: GRAFO DE NODOS FORCE-DIRECTED CANVAS PRO CON GSAP & NEON HALOS
  // ===========================================================================
  useEffect(() => {
    if (viewMode !== 'graph' || !graphCanvasRef.current) return;

    const canvas = graphCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 640);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial Physics Setup
    const nodes = NODES_DATA.map((n, idx) => {
      const angle = (idx / NODES_DATA.length) * Math.PI * 2;
      const dist = n.category === 'hub' ? 0 : n.category === 'country' ? 220 + (idx % 3) * 40 : 380 + (idx % 2) * 40;
      return {
        ...n,
        x: width / 2 + Math.cos(angle) * dist,
        y: height / 2 + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        visible: true
      };
    });

    const nodeMap: Record<string, typeof nodes[0]> = {};
    nodes.forEach(n => (nodeMap[n.id] = n));

    const links = LINKS_DATA.map(l => ({
      source: nodeMap[l.source],
      target: nodeMap[l.target],
      particles: [Math.random(), Math.random()]
    })).filter(l => l.source && l.target);

    // Camera Transform & Interactivity
    let transform = { x: 0, y: 0, k: 0.95 };
    let targetTransform = { x: 0, y: 0, k: 0.95 };
    let isDragging = false;
    let dragNode: typeof nodes[0] | null = null;
    let prevMouse = { x: 0, y: 0 };
    let hoveredNode: typeof nodes[0] | null = null;

    const getCanvasPoint = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const screenX = clientX - rect.left;
      const screenY = clientY - rect.top;
      return {
        x: (screenX - transform.x) / transform.k,
        y: (screenY - transform.y) / transform.k
      };
    };

    const onMouseDown = (e: MouseEvent) => {
      const pt = getCanvasPoint(e.clientX, e.clientY);
      const hit = nodes.find(n => {
        if (!n.visible) return false;
        const dx = n.x - pt.x;
        const dy = n.y - pt.y;
        return Math.sqrt(dx * dx + dy * dy) <= n.radius + 8;
      });

      if (hit) {
        dragNode = hit;
        setSelectedNode(hit);
      } else {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (dragNode) {
        const pt = getCanvasPoint(e.clientX, e.clientY);
        dragNode.x = pt.x;
        dragNode.y = pt.y;
        dragNode.vx = 0;
        dragNode.vy = 0;
      } else if (isDragging) {
        targetTransform.x += e.clientX - prevMouse.x;
        targetTransform.y += e.clientY - prevMouse.y;
        prevMouse = { x: e.clientX, y: e.clientY };
      } else {
        const pt = getCanvasPoint(e.clientX, e.clientY);
        hoveredNode =
          nodes.find(n => {
            if (!n.visible) return false;
            const dx = n.x - pt.x;
            const dy = n.y - pt.y;
            return Math.sqrt(dx * dx + dy * dy) <= n.radius + 8;
          }) || null;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      dragNode = null;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
      const newK = Math.max(0.4, Math.min(2.5, targetTransform.k * zoomFactor));

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      targetTransform.x = mouseX - (mouseX - targetTransform.x) * (newK / targetTransform.k);
      targetTransform.y = mouseY - (mouseY - targetTransform.y) * (newK / targetTransform.k);
      targetTransform.k = newK;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // Physics Engine
    const updatePhysics = () => {
      const kRepel = 34000;
      const centerForce = 0.0008;

      nodes.forEach(n => {
        if (!n.visible) return;
        const dx = width / 2 - n.x;
        const dy = height / 2 - n.y;
        n.vx += dx * centerForce;
        n.vy += dy * centerForce;
      });

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        if (!n1.visible) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          if (!n2.visible) continue;
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 550) {
            const force = kRepel / (dist * dist);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            n1.vx -= fx;
            n1.vy -= fy;
            n2.vx += fx;
            n2.vy += fy;
          }
        }
      }

      links.forEach(l => {
        if (!l.source.visible || !l.target.visible) return;
        const dx = l.target.x - l.source.x;
        const dy = l.target.y - l.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = 170;
        const force = (dist - targetDist) * 0.035;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (l.source !== dragNode) {
          l.source.vx += fx;
          l.source.vy += fy;
        }
        if (l.target !== dragNode) {
          l.target.vx -= fx;
          l.target.vy -= fy;
        }
      });

      nodes.forEach(n => {
        if (n === dragNode) return;
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.88;
        n.vy *= 0.88;
      });
    };

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth Camera Lerp
      transform.x += (targetTransform.x - transform.x) * 0.1;
      transform.y += (targetTransform.y - transform.y) * 0.1;
      transform.k += (targetTransform.k - transform.k) * 0.1;

      ctx.save();
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      // 1. Draw Links with Particle Pulses
      links.forEach(l => {
        if (!l.source.visible || !l.target.visible) return;

        ctx.beginPath();
        ctx.moveTo(l.source.x, l.source.y);
        ctx.lineTo(l.target.x, l.target.y);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        l.particles.forEach((p, idx) => {
          l.particles[idx] = (p + 0.007) % 1;
          const px = l.source.x + (l.target.x - l.source.x) * l.particles[idx];
          const py = l.source.y + (l.target.y - l.source.y) * l.particles[idx];

          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#00f5d4';
          ctx.shadowColor = '#00f5d4';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      // 2. Draw Nodes
      nodes.forEach(n => {
        // Filter Matching
        const matchesFilter = activeFilter === 'all' || n.category === 'hub' || n.category === activeFilter;
        const matchesSearch = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase()) || n.description.toLowerCase().includes(searchQuery.toLowerCase());
        n.visible = matchesFilter && (matchesSearch || n.category === 'hub');

        if (!n.visible) return;

        const isHovered = hoveredNode === n;
        const isSelected = selectedNode?.id === n.id;

        // Radial Glow Halo
        const glowRad = n.radius * (isSelected ? 3.0 : isHovered ? 2.5 : 1.8);
        const grad = ctx.createRadialGradient(n.x, n.y, n.radius * 0.3, n.x, n.y, glowRad);
        grad.addColorStop(0, n.glowColor);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRad, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Node Body
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#ffffff' : isHovered ? '#ffffff' : n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isSelected ? 30 : isHovered ? 20 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Outer Ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = n.color;
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.stroke();

        // Label
        ctx.font = `${isSelected ? '800 13px' : isHovered ? '700 12px' : '600 11px'} 'Plus Jakarta Sans', sans-serif`;
        ctx.fillStyle = isSelected ? '#00f5d4' : isHovered ? '#ffffff' : '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#020617';
        ctx.shadowBlur = 6;
        ctx.fillText(n.label, n.x, n.y + n.radius + 16);
        ctx.shadowBlur = 0;
      });

      ctx.restore();
    };

    const loop = () => {
      updatePhysics();
      render();
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [viewMode, activeFilter, searchQuery, selectedNode]);

  // ===========================================================================
  // MODO 2: GLOBO 3D WEBGL SATELITAL THREE.JS (SHADERS + BEACONS + ARCOS BÉZIER)
  // ===========================================================================
  useEffect(() => {
    if (viewMode !== 'satellite' || !threeMountRef.current) return;

    const mount = threeMountRef.current;
    let animId: number;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 210;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Earth Core Sphere
    const R = 68;
    const innerGeo = new THREE.SphereGeometry(R - 0.5, 64, 64);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x030712, transparent: true, opacity: 0.96 });
    globeGroup.add(new THREE.Mesh(innerGeo, innerMat));

    // 2. Sci-Fi Wireframe
    const wireGeo = new THREE.IcosahedronGeometry(R, 3);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x0e7490, wireframe: true, transparent: true, opacity: 0.25 });
    globeGroup.add(new THREE.Mesh(wireGeo, wireMat));

    // 2B. Holographic Continental Landmass Point Cloud (1,200+ LATAM & Americas Points)
    const landCoords = globeLandPoints as [number, number][];
    const landPos = new Float32Array(landCoords.length * 3);
    const landColors = new Float32Array(landCoords.length * 3);
    const cCyan = new THREE.Color(0x00f5d4);
    const cBlue = new THREE.Color(0x1bacfb);

    landCoords.forEach(([lat, lon], idx) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const pRadius = R + 0.4;
      const x = -(pRadius * Math.sin(phi) * Math.cos(theta));
      const y = pRadius * Math.cos(phi);
      const z = pRadius * Math.sin(phi) * Math.sin(theta);

      landPos[idx * 3] = x;
      landPos[idx * 3 + 1] = y;
      landPos[idx * 3 + 2] = z;

      const col = (idx % 3 === 0) ? cCyan : cBlue;
      landColors[idx * 3] = col.r;
      landColors[idx * 3 + 1] = col.g;
      landColors[idx * 3 + 2] = col.b;
    });

    const landGeo = new THREE.BufferGeometry();
    landGeo.setAttribute('position', new THREE.BufferAttribute(landPos, 3));
    landGeo.setAttribute('color', new THREE.BufferAttribute(landColors, 3));
    const landMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    globeGroup.add(new THREE.Points(landGeo, landMat));

    // 3. Glowing Atmosphere Fresnel Shader
    const glowGeo = new THREE.SphereGeometry(R * 1.18, 32, 32);
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.0, 0.96, 0.83, 1.0) * intensity * 0.45;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    globeGroup.add(new THREE.Mesh(glowGeo, glowMat));

    // 4. Hub Nodes & Radar Beacons
    const latLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    const markers: THREE.Mesh[] = [];
    const ringBeacons: { mesh: THREE.Mesh; rate: number; maxScale: number }[] = [];
    const countryNodes = NODES_DATA.filter(n => n.lat !== undefined && n.lon !== undefined);

    const countryVectorMap: Record<string, THREE.Vector3> = {};

    countryNodes.forEach(node => {
      if (node.lat === undefined || node.lon === undefined) return;
      const pos = latLonToVector3(node.lat, node.lon, R);
      countryVectorMap[node.id] = pos;

      const sphereGeo = new THREE.SphereGeometry(2.4, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({ color: node.color });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.copy(pos);
      sphere.userData = node;
      globeGroup.add(sphere);
      markers.push(sphere);

      // Radar Ring Beacon
      const ringGeo = new THREE.RingGeometry(3.2, 5.0, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: node.color, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);
      ringBeacons.push({ mesh: ring, rate: 0.02 + Math.random() * 0.01, maxScale: 2.8 });
    });

    // 5. 3D Geodesic Transaction Arcs
    const routes = [
      { from: 'br', to: 'mx', color: 0x00f5d4 },
      { from: 'mx', to: 'co', color: 0x38bdf8 },
      { from: 'br', to: 'ar', color: 0x818cf8 },
      { from: 'co', to: 'pe', color: 0xf43f5e },
      { from: 'cl', to: 'pe', color: 0xa855f7 },
      { from: 'uy', to: 'br', color: 0x00f5d4 },
      { from: 'cr', to: 'pa', color: 0x14b8a6 },
      { from: 'mx', to: 'gt', color: 0x0ea5e9 }
    ];

    const pulseParticles: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; t: number; speed: number }[] = [];

    routes.forEach(route => {
      const v1 = countryVectorMap[route.from];
      const v2 = countryVectorMap[route.to];
      if (!v1 || !v2) return;

      const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
      const dist = v1.distanceTo(v2);
      mid.normalize().multiplyScalar(R + dist * 0.38);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      const pts = curve.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const arcMat = new THREE.LineBasicMaterial({ color: route.color, transparent: true, opacity: 0.45 });
      globeGroup.add(new THREE.Line(arcGeo, arcMat));

      // Light packet
      const pGeo = new THREE.SphereGeometry(1.3, 8, 8);
      const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      globeGroup.add(pMesh);
      pulseParticles.push({ mesh: pMesh, curve, t: Math.random(), speed: 0.004 + Math.random() * 0.003 });
    });

    // 6. Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 800;
      starPos[i + 1] = (Math.random() - 0.5) * 800;
      starPos[i + 2] = (Math.random() - 0.5) * 800;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 1.2, transparent: true, opacity: 0.4 });
    scene.add(new THREE.Points(starGeo, starMat));

    // Interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let targetRotation = { x: 0.35, y: -0.6 };
    let currentRotation = { x: 0.35, y: -0.6 };
    let autoRotate = true;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      autoRotate = false;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        targetRotation.y += dx * 0.006;
        targetRotation.x += dy * 0.006;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => (autoRotate = true), 3000);
    };

    const onGlobeClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markers);
      if (intersects.length > 0) {
        setSelectedNode(intersects[0].object.userData as NodeData);
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('click', onGlobeClick);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      if (autoRotate && !isDragging) {
        targetRotation.y += 0.0018;
      }
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

      globeGroup.rotation.x = currentRotation.x;
      globeGroup.rotation.y = currentRotation.y;

      ringBeacons.forEach(b => {
        let s = b.mesh.scale.x + b.rate;
        if (s > b.maxScale) s = 1;
        b.mesh.scale.set(s, s, 1);
        (b.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.7 - (s / b.maxScale) * 0.7);
      });

      pulseParticles.forEach(p => {
        p.t = (p.t + p.speed) % 1;
        p.mesh.position.copy(p.curve.getPoint(p.t));
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('click', onGlobeClick);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [viewMode]);

  return (
    <div className="w-full h-full min-h-[640px] relative overflow-hidden rounded-2xl bg-[#020617] border border-cyan-500/25 shadow-2xl flex flex-col font-sans">
      {/* SCANNING LINE DECORATOR */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse pointer-events-none z-10 opacity-40" />

      {/* TOP HEADER CONTROLS */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Brand Tag */}
        <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-xl px-4 py-2 rounded-xl border border-slate-800 shadow-xl pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shadow-[0_0_12px_#00f5d4]" />
          <div>
            <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              OnlyPayments Telemetry 2026
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              2,659+ Entidades Indexadas · 20 Países · 32 Estados
            </div>
          </div>
        </div>

        {/* Search, Filters & View Switcher */}
        <div className="flex items-center flex-wrap gap-2 pointer-events-auto">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar país, riel o entidad..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-slate-900/90 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 w-44 sm:w-56 transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/90 backdrop-blur-xl p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                activeFilter === 'all' ? 'bg-cyan-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter('country')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                activeFilter === 'country' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Países
            </button>
            <button
              onClick={() => setActiveFilter('rail')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                activeFilter === 'rail' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Rieles A2A
            </button>
            <button
              onClick={() => setActiveFilter('regulator')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                activeFilter === 'regulator' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Reguladores
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-900/95 backdrop-blur-xl p-1 rounded-xl border border-cyan-500/30 shadow-lg">
            <button
              onClick={() => setViewMode('graph')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                viewMode === 'graph'
                  ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Grafo
            </button>
            <button
              onClick={() => setViewMode('satellite')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                viewMode === 'satellite'
                  ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              Globo 3D
            </button>
          </div>
        </div>
      </div>

      {/* CANVAS RENDERING SURFACE */}
      <div className="w-full h-full min-h-[640px] flex-1 relative bg-radial from-slate-950 via-[#020617] to-[#01030d]">
        {viewMode === 'graph' ? (
          <canvas ref={graphCanvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
        ) : (
          <div ref={threeMountRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
        )}
      </div>

      {/* BOTTOM METRICS BAR */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Legend */}
        <div className="hidden sm:flex items-center gap-4 bg-slate-950/85 backdrop-blur-xl px-4 py-2 rounded-xl border border-slate-800 text-[11px] font-semibold text-slate-400 pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5d4]" />
            <span>Hub Core</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
            <span>Países LATAM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            <span>Rieles A2A</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]" />
            <span>Bancos Centrales</span>
          </div>
        </div>

        {/* Interaction Hint */}
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-900">
          Arrastra para Mover · Scroll para Zoom · Clic para Inspeccionar
        </div>
      </div>

      {/* INSPECTION DRAWER OVERLAY */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-20 right-4 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-5 shadow-2xl z-30 text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                {selectedNode.flag && <span className="text-2xl">{selectedNode.flag}</span>}
                <div>
                  <h4 className="text-lg font-bold font-heading text-white leading-tight">
                    {selectedNode.label}
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    {selectedNode.category === 'hub'
                      ? 'NÚCLEO REGIONAL'
                      : selectedNode.category === 'country'
                      ? 'PAÍS MAPEADO'
                      : selectedNode.category === 'rail'
                      ? 'RIEL A2A INSTANTÁNEO'
                      : 'REGULADOR FINANCIERO'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {selectedNode.description}
            </p>

            {/* Details Grid */}
            <div className="space-y-2.5 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  Riel Dominante:
                </span>
                <span className="font-mono font-bold text-cyan-400">
                  {selectedNode.dominantRail}
                </span>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  Regulación:
                </span>
                <span className="font-semibold text-slate-200 text-right text-[11px] max-w-[180px] truncate">
                  {selectedNode.regulator}
                </span>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  Gateways / Pasarelas:
                </span>
                <span className="font-semibold text-slate-200 text-right text-[11px] max-w-[170px] truncate">
                  {selectedNode.activeGateways}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">MDR Estimado</div>
                  <div className="text-sm font-mono font-extrabold text-cyan-400 mt-0.5">
                    {selectedNode.avgMdr}
                  </div>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Penetración A2A</div>
                  <div className="text-sm font-mono font-extrabold text-emerald-400 mt-0.5">
                    {selectedNode.a2aAdoption}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

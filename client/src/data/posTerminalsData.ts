export interface POSTerminal {
  id: string;
  model: string;
  manufacturer: "PAX" | "Nexgo" | "Topwise" | "Sunmi" | "Ingenico" | "Castles" | "Newland" | "MoreFun";
  tagline: string;
  formFactor: "SmartPOS Móvil" | "SmartPOS Mostrador (Dual Screen)" | "mPOS Bluetooth" | "Kiosco Desatendido" | "QR Soundbox";
  image: string;
  os: string;
  processor: string;
  memory: string;
  display: string;
  secondaryDisplay?: string;
  printer: string;
  cameraScanner: string;
  battery: string;
  connectivity: string[];
  certifications: string[];
  supportedRails: string[];
  latamAdopters: string[];
  tmsPlatform: string;
  priceRangeUnitUSD: string;
  idealUseCases: string[];
  keyAdvantages: string[];
  highlight: boolean;
}

export const POS_MANUFACTURERS = [
  {
    id: "PAX",
    name: "PAX Technology",
    hq: "Shenzhen, China / Jacksonville, FL",
    presenceLATAM: "Líder absoluto en Brasil, México, Colombia, Chile y Perú.",
    tms: "PAXSTORE (MDM Enterprise con >10M terminales conectados)",
    keyClients: ["Stone", "PagSeguro", "Clip", "Mercado Pago", "Bold", "Kushki", "Getnet"],
    badgeColor: "#0052FF"
  },
  {
    id: "Nexgo",
    name: "Nexgo (Xinguodu)",
    hq: "Shenzhen, China",
    presenceLATAM: "Presencia masiva en agregadores, neobancos y logística en LATAM.",
    tms: "Nexgo Cloud TMS",
    keyClients: ["Mercado Pago (Point Smart)", "Ualá Bis", "Redelcom", "Transbank"],
    badgeColor: "#00C389"
  },
  {
    id: "Topwise",
    name: "Topwise Technology",
    hq: "Shenzhen, China",
    presenceLATAM: "Crecimiento acelerado en proyectos OEM y Neobancos con Android 13/15.",
    tms: "Topwise MDM Cloud",
    keyClients: ["Agregadores White-Label", "Fintechs B2B", "Bancos Retail"],
    badgeColor: "#00E5FF"
  },
  {
    id: "Sunmi",
    name: "Sunmi Technology",
    hq: "Shanghai, China",
    presenceLATAM: "Dominante en Kioscos, Restaurantes, Retail y Delivery.",
    tms: "Sunmi Radmin / Sunmi Cloud OS",
    keyClients: ["Rappi Aliados", "iFood", "Comercios Gastronómicos", "Retail Omnicanal"],
    badgeColor: "#FF5A00"
  },
  {
    id: "Ingenico",
    name: "Ingenico (Worldline)",
    hq: "París, Francia",
    presenceLATAM: "Estándar bancario Tier-1 en adquirencia tradicional y grandes retailers.",
    tms: "Ingenico Estate Manager (TEM)",
    keyClients: ["Cielo", "Getnet Santander", "Niubiz", "Redeban", "BBVA"],
    badgeColor: "#8B5CF6"
  },
  {
    id: "Castles",
    name: "Castles Technology",
    hq: "Taipei, Taiwán",
    presenceLATAM: "Fuerte despliegue en adquirencia en Brasil, México y cono sur.",
    tms: "Castles Saturn Cloud TMS",
    keyClients: ["Redecard", "Adquirentes Enterprise", "Gasolineras & Retail"],
    badgeColor: "#EC4899"
  },
  {
    id: "Newland",
    name: "Newland NPT",
    hq: "Fuzhou, China",
    presenceLATAM: "Especialistas en lectura óptica QR y terminales de inclusión financiera.",
    tms: "Newland TOMS MDM",
    keyClients: ["Bancos de desarrollo", "Corresponsales bancarios", "Fintechs micro-crédito"],
    badgeColor: "#EAB308"
  }
];

export const POS_TERMINALS: POSTerminal[] = [
  {
    id: "pax-a920-pro",
    model: "PAX A920 Pro",
    manufacturer: "PAX",
    tagline: "El estándar de oro del SmartPOS Android en América Latina.",
    formFactor: "SmartPOS Móvil",
    image: "https://images.unsplash.com/photo-1556742049-0a67c57750c9?w=800&auto=format&fit=crop&q=80",
    os: "PayDroid basado en Android 10 / 11",
    processor: "ARM Cortex A53 Quad-Core 1.4GHz + Procesador de Seguridad Criptográfico Dedicado",
    memory: "2GB RAM + 16GB Flash (Expandible MicroSD hasta 128GB)",
    display: '5.5" IPS HD (720 x 1440) Capacitiva Multi-touch',
    printer: "Térmica rápida de alta resolución (80mm/s), rollo 40mm",
    cameraScanner: "Cámara trasera 5MP Auto-focus con flash + Lector dedicado de código de barras 1D/2D",
    battery: "5250mAh Li-ion recargable de larga duración (>12h continuas)",
    connectivity: ["4G LTE Cat 4", "3G / 2G", "Wi-Fi Dual Band (2.4GHz + 5GHz)", "Bluetooth 4.2", "GPS / GLONASS", "Dual SIM"],
    certifications: ["PCI PTS 6.x", "EMV L1 & L2", "EMV Contactless L1", "Visa payWave", "Mastercard PayPass", "Amex ExpressPay", "Discover D-PAS", "ABECS", "RoHS", "CE"],
    supportedRails: ["Tarjetas Chip EMV", "Contactless NFC", "Banda Magnética", "Pix QR Dinámico", "CoDi / Dimo QR", "Bre-B QR", "Billeteras Digitales (Apple Pay, Google Wallet)"],
    latamAdopters: ["Clip (Total)", "Stone Pagamentos", "Mercado Pago (Point Smart)", "Bold (Smart)", "Kushki POS", "PagSeguro"],
    tmsPlatform: "PAXSTORE (Marketplace de Apps y Gestión Remota OTA)",
    priceRangeUnitUSD: "$180 - $240 (según volumen de lote)",
    idealUseCases: ["Restaurantes con cobro en mesa", "Retail de moda y tecnología", "Rutas de entrega y logística", "Comercios de alto volumen"],
    keyAdvantages: [
      "Mayor ecosistema de desarrolladores y SDKs probados en LATAM",
      "Certificado con todos los procesadores y switches de la región",
      "Impresora de alta velocidad que no traba la línea en caja",
      "Gestión remota de flota mediante PAXSTORE sin necesidad de soporte presencial"
    ],
    highlight: true
  },
  {
    id: "nexgo-n86",
    model: "Nexgo N86",
    manufacturer: "Nexgo",
    tagline: "Ultra-ligero, resistente a caídas y diseñado para flotas de alto rendimiento.",
    formFactor: "SmartPOS Móvil",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop&q=80",
    os: "Android 11 / 12 Seguro",
    processor: "Quad-Core Cortex-A53 1.3GHz + Chip Criptográfico de Seguridad",
    memory: "1GB / 2GB RAM + 8GB / 16GB Flash",
    display: '5.0" HD (1280 x 720) IPS con recubrimiento anti-huella',
    printer: "Impresora térmica integrada (70mm/s), diámetro 40mm",
    cameraScanner: "Cámara 5MP con linterna LED para lectura ultra-rápida de QR (<300ms)",
    battery: "5000mAh (7.4V) con gestión inteligente de energía para +14h de turno",
    connectivity: ["4G Full Netcom", "Wi-Fi 802.11 b/g/n", "Bluetooth 4.2", "GPS / Beidou", "Dual SIM"],
    certifications: ["PCI PTS 6.x", "EMV L1/L2", "Mastercard TQM", "Visa payWave", "Amex", "UnionPay", "FCC", "CE"],
    supportedRails: ["NFC Contactless", "Chip EMV", "Banda Magnética", "Pix Instantáneo", "CoDi México", "Dimo", "Transfiya QR"],
    latamAdopters: ["Mercado Pago Brasil/México", "Ualá Bis Argentina/Colombia", "Redelcom Chile"],
    tmsPlatform: "Nexgo Cloud Platform (Despliegue de APKs por grupos y geo-cercas)",
    priceRangeUnitUSD: "$140 - $190 (excelente ROI para despliegues masivos)",
    idealUseCases: ["Repartidores y última milla", "Comercio de proximidad", "Cobro en ruta y ferias", "Micro-adquirencia"],
    keyAdvantages: [
      "Diseño ergonómico antideslizante con protección anticaída hasta 1.2m",
      "Tiempo récord de lectura de códigos QR de billeteras e instant payments",
      "Costo unitario optimizado para subsidio o colocación masiva por Fintechs",
      "Encendido rápido y arranque seguro con firma de llaves criptográficas"
    ],
    highlight: true
  },
  {
    id: "topwise-t6pro",
    model: "Topwise T6 Pro",
    manufacturer: "Topwise",
    tagline: "El SmartPOS de doble pantalla y arquitectura modular Android 13/15.",
    formFactor: "SmartPOS Mostrador (Dual Screen)",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&auto=format&fit=crop&q=80",
    os: "Android 13 (Listo para actualización Android 15 Enterprise)",
    processor: "Octa-Core High-Performance 2.0GHz + NPU para visión artificial",
    memory: "2GB / 3GB / 4GB LPDDR4 + 16GB / 32GB / 64GB UFS",
    display: '6.0" IPS FHD+ (1080 x 2160) Pantalla Principal',
    secondaryDisplay: 'Pantalla de Cliente trasera de 2.4" / 3.5" para confirmación de monto y QR dinámico',
    printer: "Impresora Seiko de alta precisión (100mm/s) con corte asistido",
    cameraScanner: "Cámara frontal y trasera con escáner de hardware 1D/2D Zebra integrado",
    battery: "7.7V / 2600mAh (equivalente a 5200mAh a 3.85V)",
    connectivity: ["5G Sub-6 / 4G LTE Cat 6", "Wi-Fi 6 (802.11ax)", "Bluetooth 5.2", "eSIM integrada + 2x Nano SIM", "NFC Avanzado"],
    certifications: ["PCI PTS 6.x", "EMV Contactless L1/L2", "PCI PPoC", "Visa", "Mastercard", "Amex", "JCB", "Discover"],
    supportedRails: ["NFC Tap-on-Glass", "EMV Chip", "Pix QR Dinámico en pantalla de cliente", "CoDi / Dimo", "Apple Pay / Google Pay"],
    latamAdopters: ["Agregadores Fintech en expansión", "Neobancos con oferta para Comercios", "Redes de Estaciones de Servicio"],
    tmsPlatform: "Topwise Cloud TMS + Soporte de Android Enterprise Zero-Touch",
    priceRangeUnitUSD: "$210 - $280",
    idealUseCases: ["Restaurantes de comida rápida (QSR)", "Cajas de retail moderno", "Farmacias y autoservicios", "Puntos de venta omnicanal"],
    keyAdvantages: [
      "Pantalla secundaria que evita que el comerciante tenga que girar el POS al cliente",
      "Procesador Octa-Core que permite correr apps pesadas de inventario, facturación y cobro simultáneo",
      "Soporte de Wi-Fi 6 y conectividad de ultra-baja latencia para transacciones <400ms",
      "Roadmap garantizado de parches de seguridad y versión Android 15"
    ],
    highlight: true
  },
  {
    id: "sunmi-p2-pro",
    model: "Sunmi P2 Pro",
    manufacturer: "Sunmi",
    tagline: "Elegancia industrial, escáner profesional Zebra y ecosistema Sunmi OS.",
    formFactor: "SmartPOS Móvil",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&auto=format&fit=crop&q=80",
    os: "Sunmi OS basado en Android 9.0 / 11",
    processor: "Qualcomm Snapdragon Quad-Core / Octa-Core",
    memory: "2GB RAM + 16GB ROM",
    display: '5.99" HD+ Pantalla Completa IPS Ultra-brillante',
    printer: "Impresora térmica de 58mm (70mm/s)",
    cameraScanner: "Motor de escaneo 1D/2D profesional para inventarios y pagos instantáneos",
    battery: "2580mAh (7.6V) de polímero de litio",
    connectivity: ["4G LTE Global", "Wi-Fi Dual Band", "Bluetooth 4.2", "GPS", "NFC"],
    certifications: ["PCI PTS 5.x / 6.x", "EMV L1/L2", "PayPass", "payWave", "CE", "FCC"],
    supportedRails: ["Contactless", "Chip Tarjeta", "Banda Magnética", "QR Pix / CoDi", "Wallet Digitales"],
    latamAdopters: ["iFood Brasil", "Rappi Aliados", "Cadenas de Cafeterías en México y Colombia"],
    tmsPlatform: "Sunmi Radmin (Control remoto de pantalla, kiosco mode y despliegue masivo)",
    priceRangeUnitUSD: "$190 - $250",
    idealUseCases: ["Comandas y cobro integrado en hostelería", "Toma de pedidos en mesa", "Retail de conveniencia", "Venta en piso de ventas"],
    keyAdvantages: [
      "Diseño estilizado ganador de premios de diseño internacional",
      "Modo Kiosco seguro nativo de Sunmi OS que bloquea la salida de la app de pago",
      "Integración nativa con los principales sistemas POS de restaurantes y retail de LATAM"
    ],
    highlight: false
  },
  {
    id: "ingenico-axium-dx8000",
    model: "Ingenico Axium DX8000",
    manufacturer: "Ingenico",
    tagline: "El buque insignia Android de la adquirencia bancaria global.",
    formFactor: "SmartPOS Móvil",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80",
    os: "Android 10 Seguro con Telium TETRA Engine embebido",
    processor: "ARM Quad-Core Cortex A53 + Módulo de Seguridad Criptográfico Aislado",
    memory: "2GB / 3GB RAM + 16GB / 32GB Flash",
    display: '6.0" HD IPS Táctil con Cristal Reforzado',
    printer: "Impresora de alta velocidad (>100mm/s)",
    cameraScanner: "Cámaras frontal de 2MP y trasera de 8MP con lector de código de barras",
    battery: "3350mAh (7.2V) de alta densidad",
    connectivity: ["4G LTE", "3G", "2G", "Wi-Fi 2.4/5GHz", "Bluetooth 4.2", "GPS"],
    certifications: ["PCI PTS 6.x", "EMV L1/L2", "Common Criteria", "Visa", "Mastercard", "Amex", "ABECS"],
    supportedRails: ["Tarjetas con Chip", "NFC / Contactless", "Banda Magnética", "Pix Presencial", "CoDi", "Dimo", "Bre-B"],
    latamAdopters: ["Getnet Brasil/Chile/México", "Cielo", "Niubiz Perú", "Redeban Colombia", "Bancos Tier-1"],
    tmsPlatform: "The Estate Manager (Ingenico TEM) con monitoreo transaccional en tiempo real",
    priceRangeUnitUSD: "$250 - $340",
    idealUseCases: ["Bancos e Instituciones Financieras Adquirentes", "Grandes Cadenas Departamentales", "Supermercados", "Empresas Corporativas"],
    keyAdvantages: [
      "La mayor confianza regulatoria y cumplimiento de seguridad bancaria del mercado",
      "Kernel criptográfico doble que aísla la lógica de pago de la lógica Android de negocio",
      "Soporte local directo en todos los países de LATAM por parte de Worldline/Ingenico"
    ],
    highlight: false
  },
  {
    id: "nexgo-un20",
    model: "Nexgo UN20",
    manufacturer: "Nexgo",
    tagline: "Módulo embebido desatendido para Kioscos, Vending, Estaciones y Transporte.",
    formFactor: "Kiosco Desatendido",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80",
    os: "Linux Seguro / Android Embebido",
    processor: "Dual-Core ARM Cortex + Coprocesador Seguro de 32 bits",
    memory: "512MB RAM + 512MB Flash",
    display: 'Pantalla color de 3.5" (480 x 320) con teclado PIN virtual resistente',
    printer: "Interfaz para impresora externa de kiosco (RS232/USB)",
    cameraScanner: "Lector óptico 1D/2D frontal de gran angular para boletos y códigos QR",
    battery: "Alimentación directa 9V-24V DC con soporte MDB / EVA",
    connectivity: ["4G LTE", "Ethernet RJ45", "RS232", "USB Host/Device", "MDB", "MMS"],
    certifications: ["PCI PTS 6.x (SRED + Open Protocols)", "EMV L1/L2", "IP65 (Resistente a agua y polvo)", "IK08 (Anti-vandalismo)"],
    supportedRails: ["NFC Contactless", "Chip EMV", "QR Dinámico", "Tarjetas de Transporte Público (Mifare / Calypso)"],
    latamAdopters: ["Sistemas de Peajes", "Máquinas Vending en México y Brasil", "Estaciones de Carga Eléctrica"],
    tmsPlatform: "Nexgo Unattended Cloud Management",
    priceRangeUnitUSD: "$220 - $310",
    idealUseCases: ["Kioscos de auto-pago en comida rápida", "Parquímetros y peajes", "Máquinas de vending", "Torniquetes de metro/bus"],
    keyAdvantages: [
      "Certificación anti-vandalismo IK08 y sellado IP65 para intemperie",
      "Protocolo MDB estándar para fácil conexión con cualquier máquina vending",
      "Acepta pagos de transporte público sin contacto y QR en un solo bloque"
    ],
    highlight: false
  },
  {
    id: "morefun-mf919",
    model: "MoreFun Soundbox QR",
    manufacturer: "MoreFun",
    tagline: "Altavoz inteligente de confirmación de voz instantánea para pagos QR (Pix/CoDi/Bre-B).",
    formFactor: "QR Soundbox",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    os: "RTOS Ultraligero Seguro",
    processor: "High-Efficiency 32-bit RISC SoC",
    memory: "64MB RAM + 128MB ROM",
    display: 'Pantalla frontal LED de 6 dígitos para monto + Display dinámico de QR opcional',
    printer: "Sin impresora (confirmación 100% digital por voz)",
    cameraScanner: "QR dinámico/estático con notificación en altavoz de 3W",
    battery: "2600mAh recargable (>48 horas de operación continua en mostrador)",
    connectivity: ["4G LTE Cat 1 / 2G", "Wi-Fi 2.4GHz", "eSIM integrada"],
    certifications: ["CE", "FCC", "RoHS"],
    supportedRails: ["Pix Brasil", "CoDi / Dimo México", "Bre-B Colombia", "Transferencias Móviles Instantáneas"],
    latamAdopters: ["PagBank Brasil", "Fintechs de Inclusión Financiera", "Tienditas de Abarrotes y Mercados Populares"],
    tmsPlatform: "MoreFun Cloud Audio Server (Cambio de mensajes de voz y promociones en tiempo real)",
    priceRangeUnitUSD: "$25 - $45 (Costo ultra-bajo para democratización masiva)",
    idealUseCases: ["Puestos callejeros y ferias", "Tiendas de conveniencia populares", "Comercios con alta rotación de pagos QR"],
    keyAdvantages: [
      "Elimina el fraude del comprobante falso: el altavoz canta el monto recibido en español/portugués en voz alta",
      "Costo 5 veces menor que un SmartPOS tradicional",
      "Batería que dura días sin necesidad de recargar constantemente"
    ],
    highlight: false
  }
];

export const FLEET_CALCULATOR_PRESETS = [
  {
    profile: "Startup / Fintech Adquirente Emergente",
    merchantsTarget: 1000,
    mix: [
      { terminalId: "nexgo-n86", percentage: 60, label: "SmartPOS Móvil N86 (Comercios medianos)" },
      { terminalId: "morefun-mf919", percentage: 30, label: "Soundbox QR (Micro-comercios)" },
      { terminalId: "topwise-t6pro", percentage: 10, label: "Dual Screen T6 Pro (Restaurantes/Retail)" }
    ],
    estimatedHardwareInvestmentUSD: "$110,000 - $145,000",
    monthlyTmsFeePerDeviceUSD: "$0.80 - $1.50",
    expectedTransactionsPerMonth: "180,000 - 350,000"
  },
  {
    profile: "Agregador de Gran Escala / Neobanco",
    merchantsTarget: 10000,
    mix: [
      { terminalId: "pax-a920-pro", percentage: 50, label: "PAX A920 Pro (El estándar probado)" },
      { terminalId: "nexgo-n86", percentage: 30, label: "Nexgo N86 (Rutas y Delivery)" },
      { terminalId: "topwise-t6pro", percentage: 15, label: "Topwise T6 Pro (Retail Mostrador)" },
      { terminalId: "nexgo-un20", percentage: 5, label: "Nexgo UN20 (Kioscos desatendidos)" }
    ],
    estimatedHardwareInvestmentUSD: "$1,600,000 - $2,100,000",
    monthlyTmsFeePerDeviceUSD: "$0.40 - $0.80 (por volumen)",
    expectedTransactionsPerMonth: "2,500,000 - 5,000,000"
  }
];

import { CreditCard, QrCode, ShieldAlert, RotateCcw, Building2, Zap, Server, User, Wifi, FileWarning, Landmark } from 'lucide-react';

export const PAYMENT_SCENARIOS = [
  {
    id: 'tarjeta-estandar',
    name: 'Pago con Tarjeta',
    description: 'El flujo tradicional de 4 partes (Four-Party Model).',
    icon: CreditCard,
    steps: [
      { id: 1, name: 'ORIGEN', label: 'El Origen', icon: User, desc: 'Comprador ingresa tarjeta en el Checkout.', protocol: 'HTTPS', latency: '0ms' },
      { id: 2, name: 'PASARELA', label: 'Gateway', icon: Server, desc: 'Tokenización y reglas básicas antifraude.', protocol: 'REST API', latency: '45ms' },
      { id: 3, name: 'ADQUIRENTE', label: 'Adquirente', icon: Building2, desc: 'Solicita fondos a la red y cobra Tasa de Descuento.', protocol: 'ISO 8583', latency: '120ms' },
      { id: 4, name: 'RED', label: 'Switch / Red', icon: Zap, desc: 'Visa/MC rutea la transacción al emisor.', protocol: 'ISO 8583', latency: '180ms' },
      { id: 5, name: 'EMISOR', label: 'Emisor', icon: Landmark, desc: 'Aprueba o rechaza por fondos y riesgo.', protocol: 'Core Bancario', latency: '300ms' },
    ]
  },
  {
    id: '8b-qr',
    name: '8b Scan to Pay',
    description: 'Flujo moderno A2A vía código QR impulsado por 8b.',
    icon: QrCode,
    steps: [
      { id: 1, name: 'ORIGEN', label: 'Comercio', icon: Zap, desc: 'Cajero genera QR dinámico de 8b.', protocol: 'WebSockets', latency: '0ms' },
      { id: 2, name: 'ESCÁNER', label: 'Usuario', icon: User, desc: 'Usuario escanea el QR desde su app bancaria.', protocol: 'Deep Link', latency: '200ms' },
      { id: 3, name: 'ORQUESTADOR', label: '8b', icon: Server, desc: '8b traduce y orquesta la solicitud entre bancos.', protocol: 'API REST', latency: '350ms' },
      { id: 4, name: 'RED A2A', label: 'SPEI / PIX', icon: Building2, desc: 'Liquidación interbancaria inmediata sin marcas de tarjeta.', protocol: 'ISO 20022', latency: '800ms' },
      { id: 5, name: 'CONFIRMACIÓN', label: '8b Push', icon: Wifi, desc: 'Cajero recibe notificación push de pago exitoso.', protocol: 'WebSockets', latency: '950ms' },
    ]
  },
  {
    id: 'fraude',
    name: 'Detección Fraude',
    description: 'Cómo opera un orquestador de fraude (ej. Signifyd o ClearSale) en milisegundos.',
    icon: ShieldAlert,
    steps: [
      { id: 1, name: 'ORIGEN', label: 'Checkout', icon: User, desc: 'Ingreso de tarjeta robada.', protocol: 'HTTPS', latency: '0ms' },
      { id: 2, name: 'FINGERPRINT', label: 'Dispositivo', icon: Wifi, desc: 'Captura de IP, User-Agent, y velocidad de tecleo.', protocol: 'Telemetry', latency: '15ms' },
      { id: 3, name: 'ORQUESTADOR', label: 'Anti-Fraude', icon: ShieldAlert, desc: 'Machine Learning evalúa cientos de variables.', protocol: 'gRPC', latency: '80ms' },
      { id: 4, name: 'DECISIÓN', label: 'Rechazo', icon: Server, desc: 'Score de riesgo muy alto. Transacción bloqueada antes de ir al banco.', protocol: 'REST API', latency: '110ms' },
    ]
  },
  {
    id: 'contracargo',
    name: 'El Contracargo',
    description: 'El temido Chargeback: Proceso de disputa post-transacción.',
    icon: RotateCcw,
    steps: [
      { id: 1, name: 'RECLAMO', label: 'Titular', icon: User, desc: '"Yo no reconozco este cargo". Llama al banco.', protocol: 'Teléfono/App', latency: 'Día 1' },
      { id: 2, name: 'EMISOR', label: 'Emisor', icon: Building2, desc: 'Inicia el código de disputa (ej. Visa 10.4).', protocol: 'VROL/Mastercom', latency: 'Día 2' },
      { id: 3, name: 'RETIRO', label: 'Adquirente', icon: Server, desc: 'Se retira el dinero de la cuenta del comercio.', protocol: 'ACH', latency: 'Día 3' },
      { id: 4, name: 'DEFENSA', label: 'Comercio', icon: FileWarning, desc: 'El comercio envía pruebas (compilante de entrega).', protocol: 'Portal Adquirente', latency: 'Día 5' },
      { id: 5, name: 'RESOLUCIÓN', label: 'Red', icon: Zap, desc: 'Arbitraje falla a favor de una de las partes.', protocol: 'Reglas Marca', latency: 'Día 30+' },
    ]
  }
];

export interface Country {
  name: string;
  flag: string;
  currency: string;
  description: string;
  mrr: string;
  growth: string;
  fintechChamber?: {
    name: string;
    url: string;
  };
}

export interface PaymentMethod {
  name: string;
  type: string;
  logo: string;
  settlement: string;
  fee: string;
  description: string;
  compliance: string;
  providers: string[];
}

export interface EcosystemActor {
  id: number;
  title: string;
  role: string;
  description: string;
}

export interface PaymentProvider {
  name: string;
  role: string;
  countries: string;
  desc: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export const COUNTRIES: Record<string, Country> = {
  MX: {
    name: "México",
    flag: "🇲🇽",
    currency: "MXN",
    description: "Mercado dominado por transferencias SPEI rápidas, pagos en efectivo (OXXO Pay) y un crecimiento acelerado de wallets digitales y BNPL.",
    mrr: "$4.2M USD est.",
    growth: "+24% YoY",
    fintechChamber: {
      name: "Fintech México",
      url: "https://fintechmexico.org/"
    }
  },
  BR: {
    name: "Brasil",
    flag: "🇧🇷",
    currency: "BRL",
    description: "El gigante de pagos de LATAM. Impulsado por el éxito arrollador de PIX (y el nuevo PIX Automático) junto a esquemas locales de tarjetas y cuotas (Parcelas).",
    mrr: "$8.7M USD est.",
    growth: "+32% YoY",
    fintechChamber: {
      name: "ABFintechs",
      url: "https://abfintechs.com.br/"
    }
  },
  CO: {
    name: "Colombia",
    flag: "🇨🇴",
    currency: "COP",
    description: "Dominado por PSE para pagos interbancarios en tiempo real, junto a redes de recaudo físico (Efecty) y billeteras móviles como Nequi y Daviplata.",
    mrr: "$2.9M USD est.",
    growth: "+19% YoY",
    fintechChamber: {
      name: "Colombia Fintech",
      url: "https://colombiafintech.co/"
    }
  },
  PE: {
    name: "Perú",
    flag: "🇵🇪",
    currency: "PEN",
    description: "Transformado por la interoperabilidad total entre billeteras móviles como Yape y Plin, que lideran la digitalización financiera del país.",
    mrr: "$1.4M USD est.",
    growth: "+28% YoY",
    fintechChamber: {
      name: "Fintech Perú",
      url: "https://fintechperu.com/"
    }
  },
  CL: {
    name: "Chile",
    flag: "🇨🇱",
    currency: "CLP",
    description: "Mercado con altísima bancarización. Liderado por Webpay (Transbank) y transferencias bancarias simplificadas (Khipu).",
    mrr: "$2.1M USD est.",
    growth: "+15% YoY",
    fintechChamber: {
      name: "FinteChile",
      url: "https://www.fintechile.cl/"
    }
  },
  AR: {
    name: "Argentina",
    flag: "🇦🇷",
    currency: "ARS",
    description: "Contexto de alta inflación que ha forzado la adopción masiva de transferencias inmediatas (Transferencias 3.0), QR interoperables y billeteras cripto.",
    mrr: "$1.8M USD est.",
    growth: "+40% YoY (nominal)",
    fintechChamber: {
      name: "Cámara Argentina de Fintech",
      url: "https://www.camarafintech.org.ar/"
    }
  },
  UY: {
    name: "Uruguay",
    flag: "🇺🇾",
    currency: "UYU",
    description: "Mercado pequeño pero con alto PIB per cápita. Redes locales de cobranza física (Redpagos, Abitab) y pagos con tarjetas de débito/crédito locales.",
    mrr: "$0.5M USD est.",
    growth: "+12% YoY",
    fintechChamber: {
      name: "Cámara Uruguaya de Fintech",
      url: "https://www.fintech.org.uy/"
    }
  },
  EC: {
    name: "Ecuador",
    flag: "🇪🇨",
    currency: "USD",
    description: "Economía dolarizada. Redes de corresponsales no bancarios (Banco del Barrio) y transferencias bancarias directas (Deuna!).",
    mrr: "$0.8M USD est.",
    growth: "+16% YoY",
    fintechChamber: {
      name: "Asofintech Ecuador",
      url: "https://asofintech.ec/"
    }
  },
  CR: {
    name: "Costa Rica",
    flag: "🇨🇷",
    currency: "CRC",
    description: "Mercado altamente bancarizado y digital. Liderado ampliamente por el sistema de pagos instantáneos SINPE Móvil.",
    mrr: "$0.4M USD est.",
    growth: "+22% YoY",
    fintechChamber: {
      name: "ASOFINTECH Costa Rica",
      url: "https://asofintechcr.com/"
    }
  },
  PA: {
    name: "Panamá",
    flag: "🇵🇦",
    currency: "USD",
    description: "Centro financiero regional. Dominado por la billetera móvil Yappy (Banco General) y transacciones de tarjeta internacional.",
    mrr: "$0.6M USD est.",
    growth: "+14% YoY",
    fintechChamber: {
      name: "Cámara Fintech de Panamá",
      url: "https://fintechpanama.org/"
    }
  },
  BO: {
    name: "Bolivia",
    flag: "🇧🇴",
    currency: "BOB",
    description: "Ecosistema digital en rápido crecimiento gracias a la adopción nacional de los códigos QR interoperables 'Simple'.",
    mrr: "$0.3M USD est.",
    growth: "+35% YoY",
    fintechChamber: {
      name: "Cámara Boliviana de Fintech",
      url: "https://cbf.bo/"
    }
  },
  PY: {
    name: "Paraguay",
    flag: "🇵🇾",
    currency: "PYG",
    description: "Mercado con fuerte expansión digital, dominado por el operador local Bancard y sus redes de Pago Móvil y QR.",
    mrr: "$0.3M USD est.",
    growth: "+26% YoY",
    fintechChamber: {
      name: "Cámara Paraguaya de Fintech",
      url: "https://fintech.org.py/"
    }
  },
  GT: {
    name: "Guatemala",
    flag: "🇬🇹",
    currency: "GTQ",
    description: "El mayor mercado de Centroamérica. Influenciado fuertemente por transferencias, billeteras como Tigo Money y remesas.",
    mrr: "$0.5M USD est.",
    growth: "+18% YoY",
    fintechChamber: {
      name: "Fintech Guatemala",
      url: "https://guatemalafintech.com/"
    }
  },
  DO: {
    name: "República Dominicana",
    flag: "🇩🇴",
    currency: "DOP",
    description: "Hub turístico y comercial del Caribe. Creciente digitalización bancaria liderada por la plataforma interbancaria tPago.",
    mrr: "$0.6M USD est.",
    growth: "+20% YoY",
    fintechChamber: {
      name: "ADOFINTECH",
      url: "https://adofintech.org/"
    }
  }
};

export const PAYMENT_METHODS: Record<string, PaymentMethod[]> = {
  MX: [
    {
      name: "SPEI",
      type: "A2A / Transferencia Inmediata",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "Tarifa plana muy baja o gratis",
      description: "El Sistema de Pagos Electrónicos Interbancarios desarrollado por Banco de México. Permite transferencias inmediatas irrevocables las 24/7 a través de números CLABE de 18 dígitos o números celulares.",
      compliance: "Sin contracargos. Cero riesgo de disputas para el comercio.",
      providers: ["Bancos mexicanos", "Stripe", "Conekta", "Openpay", "Kushki"]
    },
    {
      name: "OXXO Pay",
      type: "Efectivo / Voucher",
      logo: "🏪",
      settlement: "D+1",
      fee: "3.5% - 4.5% + $10 MXN",
      description: "La red de tiendas de conveniencia más grande de México. Permite a los clientes pagar sus compras en línea en efectivo mediante un código de barra digital de 14 dígitos en tiempo real.",
      compliance: "Sin contracargos. Muy seguro contra fraudes pero dependiente de que el cliente realice la acción física.",
      providers: ["Conekta", "Openpay", "Stripe", "PayU", "Mercado Pago"]
    }
  ],
  BR: [
    {
      name: "PIX",
      type: "A2A / Pago Instantáneo",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "0.2% - 0.9% o gratis para personas",
      description: "El sistema de pagos instantáneos del Banco Central de Brasil. Utiliza llaves (email, teléfono, CPF) y códigos QR.",
      compliance: "Cero contracargo tradicional. Dispone de un mecanismo de devolución especial (MED) exclusivo en casos de fraude comprobado.",
      providers: ["Bancos brasileños", "dLocal", "EBANX", "Stripe", "Mercado Pago"]
    },
    {
      name: "Boleto Bancário",
      type: "Efectivo / Voucher bancario",
      logo: "📄",
      settlement: "D+1 a D+2",
      fee: "Tarifa fija por boleto liquidado",
      description: "Método de pago oficial brasileño regulado por Febraban. Es un documento impreso o digital con código de barras.",
      compliance: "Sin contracargos. Conversión de compra moderada (alrededor de 50% de boletos emitidos se pagan).",
      providers: ["dLocal", "EBANX", "Stripe Brasil", "Asaas"]
    }
  ],
  CO: [
    {
      name: "PSE (Pagos Seguros en Línea)",
      type: "A2A / Débito Bancario",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "Tarifa plana por transacción",
      description: "La pasarela interbancaria unificada de Colombia. Permite debitar fondos directamente de la cuenta corriente o de ahorros.",
      compliance: "Sin riesgo de contracargo tradicional para el comercio.",
      providers: ["Wompi", "PayU", "ePayco", "Mercado Pago Colombia"]
    },
    {
      name: "Efecty",
      type: "Efectivo / Redes locales",
      logo: "🏪",
      settlement: "D+1",
      fee: "3.0% - 4.0%",
      description: "Redes físicas de giros y recaudos masivos en Colombia.",
      compliance: "Cero contracargo. Útil para inclusión financiera.",
      providers: ["PayU", "ePayco", "Wompi", "dLocal"]
    }
  ],
  PE: [
    {
      name: "Yape / Plin",
      type: "A2A / Billetera Móvil",
      logo: "📱",
      settlement: "Inmediato",
      fee: "0.5% - 2.8% o gratis para usuarios",
      description: "Las dos billeteras móviles interoperables dominantes en Perú. Permiten pagar escaneando un código QR único o mediante número celular.",
      compliance: "Liquidación inmediata, autenticación biométrica y límites de transacciones diarias.",
      providers: ["Yape Directo", "Plin Directo", "Culqi", "Niubiz", "IziPay"]
    }
  ],
  CL: [
    {
      name: "Webpay Plus",
      type: "Tarjeta de Débito/Crédito local",
      logo: "💳",
      settlement: "D+1 (Débito), D+2 (Crédito)",
      fee: "1.2% - 2.9%",
      description: "La red de procesamiento de Transbank que conecta todas las tarjetas chilenas en el e-commerce. Soporta cuotas sin intereses y Redcompra.",
      compliance: "Sujeto a contracargos. Requiere autenticación 3DS forzada en la mayoría de bancos chilenos.",
      providers: ["Transbank directo", "Getnet Chile", "Flow Chile", "Pago Fácil"]
    }
  ],
  AR: [
    {
      name: "Transferencias Inmediatas (MODO / QR)",
      type: "A2A / QR Interoperable",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "0.8% - 1.5%",
      description: "QR interoperable que unifica a los bancos tradicionales para transferencias inmediatas de cuenta a cuenta.",
      compliance: "Sin contracargos. Muy ventajoso debido al bajísimo arancel y liquidación inmediata para el comercio.",
      providers: ["Mercado Pago", "Ualá Bis", "Prisma (Payway)", "dLocal"]
    }
  ],
  UY: [
    {
      name: "Redpagos / Abitab",
      type: "Efectivo / Redes locales",
      logo: "🏪",
      settlement: "D+1",
      fee: "3.5% - 4.5%",
      description: "Redes físicas de pagos en Uruguay con cobertura nacional. El cliente emite un voucher digital y paga en efectivo.",
      compliance: "Sin riesgo de contracargo.",
      providers: ["dLocal", "Sistarbanc", "Uruguay directo"]
    }
  ],
  EC: [
    {
      name: "Deuna!",
      type: "Billetera Móvil / A2A",
      logo: "📱",
      settlement: "Inmediato",
      fee: "1.5% - 2.5%",
      description: "La billetera móvil impulsada por el Banco Pichincha. Permite transferir dinero a cualquier persona con su número celular.",
      compliance: "Sin contracargos.",
      providers: ["Banco Pichincha directo", "Kushki"]
    }
  ],
  CR: [
    {
      name: "SINPE Móvil",
      type: "A2A / Transferencia Móvil",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "Tarifa plana muy baja o gratis",
      description: "El sistema de transferencias interbancarias en tiempo real líder en Costa Rica.",
      compliance: "Cero contracargo. Muy seguro.",
      providers: ["BAC Credomatic", "Banco Nacional", "Banco de Costa Rica"]
    }
  ],
  PA: [
    {
      name: "Yappy (Banco General)",
      type: "A2A / Billetera Móvil",
      logo: "📱",
      settlement: "Inmediato",
      fee: "1.0% - 1.5%",
      description: "Billetera digital y canal de pago de Banco General en Panamá. Permite enviar dinero usando el número de celular.",
      compliance: "Sin contracargos. Fuerte control contra el fraude.",
      providers: ["Banco General directo", "PixelPay"]
    }
  ],
  BO: [
    {
      name: "QR Simple Bolivia",
      type: "A2A / Pago por QR",
      logo: "✨",
      settlement: "Inmediato",
      fee: "0.5% - 1.0%",
      description: "La solución nacional interoperable de códigos QR en Bolivia.",
      compliance: "Transferencia directa de cuenta a cuenta.",
      providers: ["Bancos bolivianos asociados", "Kushki"]
    }
  ],
  PY: [
    {
      name: "Pago Móvil (Bancard)",
      type: "Red de Cobros / App",
      logo: "🏪",
      settlement: "D+1",
      fee: "2.5% - 3.5%",
      description: "La plataforma de cobros del procesador local Bancard en Paraguay.",
      compliance: "Conexión directa con la adquirencia de Bancard.",
      providers: ["Bancard", "dLocal"]
    }
  ],
  GT: [
    {
      name: "Tigo Money Guatemala",
      type: "Billetera Móvil",
      logo: "📱",
      settlement: "Inmediato",
      fee: "2.0% - 3.5%",
      description: "Billetera móvil y servicio de dinero electrónico en Guatemala.",
      compliance: "Asume el control transaccional del balance móvil.",
      providers: ["Tigo Money directo", "PixelPay"]
    }
  ],
  DO: [
    {
      name: "tPago",
      type: "A2A / Red Interbancaria",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "1.0% - 2.0%",
      description: "Plataforma que vincula las cuentas bancarias de los principales bancos de República Dominicana.",
      compliance: "Requiere autenticación robusta mediante PIN tPago.",
      providers: ["Banco Popular", "Banreservas", "tPago directo"]
    }
  ]
};

export const ECOSYSTEM_ACTORS: EcosystemActor[] = [
  {
    id: 1,
    title: "1. Tarjetahabiente",
    role: "El comprador",
    description: "El consumidor final que posee una tarjeta de débito, crédito o prepago emitida por un banco o fintech."
  },
  {
    id: 2,
    title: "2. Comercio (Merchant)",
    role: "El vendedor",
    description: "El establecimiento comercial que vende el bien o servicio y requiere procesar cobros electrónicos."
  },
  {
    id: 3,
    title: "3. Gateway de Pagos",
    role: "El transportador seguro de datos",
    description: "El software que captura y encripta de forma segura los datos de la tarjeta en el checkout. Ej: Stripe, Conekta."
  },
  {
    id: 4,
    title: "4. Adquirente / Procesador",
    role: "El banco cobrador",
    description: "La institución financiera que procesa la transacción en nombre del comercio, solicitando la autorización al emisor. Ej: Getnet, Rede, Cielo."
  },
  {
    id: 5,
    title: "5. Red de Tarjetas (Scheme)",
    role: "La red de comunicación",
    description: "La marca que conecta a los adquirentes y emisores en todo el mundo. Ej: Visa, Mastercard, American Express."
  },
  {
    id: 6,
    title: "6. Banco Emisor (Issuer)",
    role: "El dueño del dinero",
    description: "El banco que otorgó la tarjeta al tarjetahabiente. Verifica fondos, fraude y aprueba o rechaza el cobro."
  },
  {
    id: 7,
    title: "7. Agregador / PSP / PayFac",
    role: "Simplificador de afiliación",
    description: "Empresa que facilita a los comercios cobrar con tarjeta sin que tengan que contratar una terminal con un banco adquirente. Ej: Clip, Mercado Pago."
  },
  {
    id: 8,
    title: "8. Orquestador de Pagos",
    role: "Ruteador inteligente",
    description: "Plataforma tecnológica que conecta al comercio con múltiples adquirentes y gateways simultáneamente."
  }
];

export const PAYMENT_PROVIDERS: Record<string, PaymentProvider[]> = {
  REGIONAL: [
    { name: "dLocal", role: "Agregador Regional / PayFac", countries: "Uruguay, Brasil, México, Colombia, Chile, Argentina, Perú", desc: "Infraestructura unificada de cobros y dispersiones (payouts) para mercados emergentes." },
    { name: "EBANX", role: "Agregador Regional / Procesador", countries: "Brasil, México, Colombia, Chile, Argentina, Perú, Ecuador", desc: "Especialista en conectar comercios globales con métodos de pago locales." },
    { name: "Mercado Pago", role: "Agregador / Billetera Digital", countries: "Argentina, Brasil, México, Colombia, Chile, Perú", desc: "El ecosistema fintech más grande de la región. Pasarela, links y procesamiento físico." },
    { name: "PayU", role: "Gateway / Agregador", countries: "Colombia, México, Brasil, Argentina, Chile, Perú", desc: "Pionera en el procesamiento de pagos en LATAM." },
    { name: "Stripe", role: "Gateway / Adquirente", countries: "México, Brasil (Soporte local)", desc: "El estándar tecnológico para cobros online. APIs premium." }
  ],
  MX: [
    { name: "Openpay", role: "Pasarela / Agregador (BBVA)", countries: "México", desc: "Propiedad de BBVA. Alta tasa de aprobación y red Paynet." },
    { name: "Conekta", role: "Agregador de Pagos", countries: "México", desc: "Especialista en pagos con tarjeta y efectivo offline mediante OXXO Pay." },
    { name: "Clip", role: "Agregador físico & Online", countries: "México", desc: "Líder indiscutible de cobros presenciales para pymes." }
  ],
  BR: [
    { name: "PagBank", role: "Adquirente / Wallet", countries: "Brasil", desc: "Pionero de la agregación de pagos en Brasil." },
    { name: "Stone", role: "Adquirente e Infraestructura", countries: "Brasil", desc: "Líder en cobros físicos y pasarelas en e-commerce." }
  ],
  CO: [
    { name: "Wompi", role: "Pasarela / Agregador (Bancolombia)", countries: "Colombia", desc: "La pasarela oficial de Bancolombia." },
    { name: "Bold", role: "Agregador Pyme", countries: "Colombia", desc: "Datáfonos móviles y botones de PSE simples." }
  ],
  AR: [
    { name: "Payway", role: "Adquirente (Prisma)", countries: "Argentina", desc: "La red principal que procesa y gestiona la interoperabilidad del código QR MODO." },
    { name: "Ualá Bis", role: "Agregador de Pagos", countries: "Argentina", desc: "Cobros inmediatos acreditados en la cuenta de Ualá." }
  ],
  CL: [
    { name: "Transbank", role: "Adquirente histórico", countries: "Chile", desc: "El operador que históricamente monopolizó el procesamiento de tarjetas." },
    { name: "Getnet Chile", role: "Adquirente competidor (Santander)", countries: "Chile", desc: "Introdujo el modelo de 4 partes en Chile rompiendo el monopolio." }
  ],
  PE: [
    { name: "Niubiz", role: "Adquirente y Gateway Principal", countries: "Perú", desc: "Anteriormente VisaNet Perú. El procesador más grande del país." },
    { name: "IziPay", role: "Adquirente multimarca", countries: "Perú", desc: "Unifica el procesamiento de Visa y Mastercard." }
  ],
  REST: [
    { name: "Kushki", role: "Orquestador / Adquirente regional", countries: "Ecuador, Colombia, México, Chile, Perú", desc: "Opera como adquirente no bancario regional y orquestador tecnológico." },
    { name: "BAC Credomatic", role: "Adquirente líder", countries: "Centroamérica (CR, PA, GT, SV, HN)", desc: "El banco adquirente y procesador de pagos más grande de Centroamérica." }
  ]
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Adquirente (Acquirer)",
    definition: "Banco o institución financiera autorizada por las marcas de tarjetas (Visa, Mastercard, etc.) para afiliar comercios y procesar sus transacciones de pago con tarjetas de crédito o débito domésticas o internacionales."
  },
  {
    term: "Emisor (Issuer)",
    definition: "La institución financiera (banco tradicional o fintech / neobanco) que otorga tarjetas de débito, crédito o prepago a los usuarios finales y administra las cuentas bancarias de los tarjetahabientes."
  },
  {
    term: "Agregador de Pagos (Payment Facilitator / PayFac)",
    definition: "Empresa tecnológica que actúa como intermediaria para permitir a pequeños y medianos comercios aceptar pagos electrónicos sin necesidad de abrir una cuenta merchant directa con un banco adquirente tradicional. Ejemplo: Clip en México o Bold en Colombia."
  },
  {
    term: "Cámara de Compensación (Clearing House)",
    definition: "Entidad que actúa como intermediaria para procesar, validar e intercambiar transacciones financieras entre diferentes bancos. En México, Prosa y E-Global actúan como las cámaras principales para transacciones de tarjeta domésticas."
  },
  {
    term: "Gateway de Pagos (Pasarela)",
    definition: "Software y servicio técnico encargado de capturar y cifrar los datos de la tarjeta en el checkout de la tienda online para transferirlos de manera segura a los adquirentes y redes de pago."
  },
  {
    term: "Orquestador de Pagos (Payment Orchestrator)",
    definition: "Plataforma de software que permite unificar múltiples gateways, adquirentes y métodos de pago alternativos en una sola integración. Rutea dinámicamente cada transacción hacia el canal con mayor tasa de conversión y menores costos."
  },
  {
    term: "Tasa de Intercambio (Interchange Fee)",
    definition: "Tarifa que el banco adquirente le paga al banco emisor por procesar una transacción con tarjeta. Es fijada por las marcas de tarjetas (Visa, Mastercard) y representa el costo base de aceptar un pago electrónico."
  },
  {
    term: "D+N (Liquidación)",
    definition: "Término que indica el plazo que transcurre desde que se realiza una transacción hasta que los fondos son transferidos a la cuenta bancaria del comercio. D+1 indica un día hábil después del cobro, mientras que D+0 o inmediato es la liquidación al instante."
  },
  {
    term: "Contracargo (Chargeback)",
    definition: "Proceso de disputa iniciado por un tarjetahabiente ante su banco emisor debido a un cargo no reconocido, fraude, o insatisfacción con el producto recibido. El monto de la transacción suele ser retenido al comercio."
  },
  {
    term: "Tokenización de Tarjetas",
    definition: "Tecnología que reemplaza los datos sensibles de una tarjeta (como el número PAN de 16 dígitos) por un identificador seguro único (token) para evitar fraudes en compras recurrentes o transacciones en un solo clic."
  },
  {
    term: "3D Secure (3DS)",
    definition: "Protocolo de seguridad XML diseñado para ser una capa de autenticación adicional para transacciones con tarjeta en línea. El usuario suele verificar su identidad a través de un código OTP en el móvil o huella digital en su app bancario."
  },
  {
    term: "BNPL (Buy Now Pay Later)",
    definition: "Modelo de financiamiento a plazos corto que permite al consumidor adquirir un bien online u offline de manera inmediata y dividir el pago en cuotas fijas periódicas, frecuentemente sin intereses y sin necesitar tarjeta de crédito. Ej. Kueski Pay en México."
  },
  {
    term: "Open Banking (Banca Abierta)",
    definition: "Práctica de compartir datos bancarios e iniciar transferencias de manera segura a través de APIs, previa autorización del usuario. Permite pagos de cuenta a cuenta directos de alta conversión y menor costo en el comercio electrónico."
  },
  {
    term: "Embedded Payments (Pagos Embebidos)",
    definition: "La integración directa de flujos de pago nativos dentro de plataformas y experiencias no financieras como apps de delivery, transporte (Uber, Rappi) o SaaS, haciendo que la transacción ocurra en segundo plano de manera invisible."
  },
  {
    term: "Real-Time Payments (RTP)",
    definition: "Sistemas de transferencias electrónicas inmediatas, irrevocables y operativas las 24 horas del día. Ejemplos en LATAM son PIX en Brasil, SPEI en México, Transferencias 3.0 en Argentina y SINPE Móvil en Costa Rica."
  },
  {
    term: "PCI-DSS",
    definition: "Estándar de Seguridad de Datos para la Industria de Tarjetas de Pago. Es un conjunto de requisitos y políticas de seguridad obligatorias para cualquier empresa que procese, almacene o transmita datos de tarjetas bancarias."
  },
  {
    term: "Pay-in (Recaudo)",
    definition: "El flujo de transacciones entrantes donde un comercio recibe y recolecta el dinero del cliente por una compra en línea."
  },
  {
    term: "Pay-out (Dispersión)",
    definition: "El flujo de transacciones salientes donde una empresa envía fondos a cuentas bancarias de terceros (ej. pago de comisiones, sueldos de repartidores, reembolsos a clientes)."
  },
  {
    term: "Pre-funding",
    definition: "Práctica comercial en la cual un comercio deposita saldo por adelantado en las cuentas de una pasarela o adquirente para garantizar fondos inmediatos en operaciones de dispersión (payout) de alta velocidad."
  },
  {
    term: "Tasa de Aceptación (Approval Rate)",
    definition: "El porcentaje de transacciones aprobadas con éxito en comparación con el total de intentos de cobro iniciados en una plataforma de comercio."
  },
  {
    term: "KYC / AML",
    definition: "Procesos regulatorios obligatorios ('Know Your Customer' y 'Anti-Money Laundering') que exigen a las fintechs y bancos verificar rigurosamente la identidad de sus clientes y comercios para mitigar actividades ilegales."
  }
];

// ─── EXPERTOS ────────────────────────────────────────────────────────────────

export interface ExpertProfile {
  id: string;
  name: string;
  title: string;
  country: string;
  photo: string;
  linkedin: string;
  bio: string;
  specialties: string[];
  highlights: string[];
}

export const EXPERTS: ExpertProfile[] = [
  {
    id: "antonio",
    name: "Antonio Gutiérrez",
    title: "Fundador · OnlyPayments",
    country: "México",
    photo: "/expert-antonio.png",
    linkedin: "https://www.linkedin.com/in/antoniogtzj/",
    bio: "Ejecutivo de ventas B2B especialista en el ecosistema de Medios de Pago y Fintech en LATAM. Con trayectoria en Clip y Fiserv, combina prospección inteligente, automatización y análisis de datos. Fundador de Nerv (MVP) y co-fundador de la comunidad LATAM Payments & eCommerce (+500 profesionales).",
    specialties: ["Ventas B2B Fintech", "Go-to-Market en LATAM", "Adquirencia y ecosistema pagos", "Automatización comercial"],
    highlights: [
      "Trayectoria en Clip y Fiserv LATAM",
      "Fundador de Nerv y co-fundador de LATAM Payments & eCommerce (+500 miembros)",
      "Especialista en estrategias GTM con herramientas de Sales Intelligence"
    ],
    need: "¿Buscas crecer comercialmente en pagos LATAM?"
  },
  {
    id: "fernando",
    name: "Fernando Estévez Vázquez",
    title: "Fintech Executive · PayPal · PagSeguro · Shift4",
    country: "Lisboa, Portugal · LATAM & Europa",
    photo: "/expert-fernando.png",
    linkedin: "https://www.linkedin.com/in/fernando-estevez-vazquez/",
    bio: "Ejecutivo fintech con más de 20 años en pagos y e-commerce, especializado en escalado operativo, expansión internacional e infraestructura de pagos en LATAM y Europa. Ex directivo de PayPal, PagSeguro International y Shift4. Actualmente lidera el GTM de Scan to Pay en 8B (Lisboa) con enfoque en exchanges cripto, PSPs, gateways y neobancos.",
    specialties: ["Infraestructura de pagos", "Expansión internacional", "Compliance y riesgo operativo", "Partnerships estratégicos B2B"],
    highlights: [
      "Ex ejecutivo de PayPal, PagSeguro International y Shift4",
      "20+ años liderando equipos de operaciones, producto y compliance",
      "GTM Lead de Scan to Pay · exchanges, PSPs, gateways y neobancos"
    ],
    need: "¿Necesitas escalar operaciones o expandirte a nuevos mercados?"
  },
  {
    id: "samantha",
    name: "Samantha Beltrán",
    title: "Consultora · Compliance & Regulación Fintech",
    country: "LATAM",
    photo: "/expert-samantha.png",
    linkedin: "https://www.linkedin.com/in/samanthabeltran15081985/",
    bio: "Consultora con 20+ años en compliance, regulación financiera e innovación fintech. Ha acompañado a instituciones tradicionales y startups en el diseño de estrategias de cumplimiento normativo, open finance e inclusión financiera. Panelista en más de 50 foros internacionales y líder de comunidades de mujeres en payments y e-commerce.",
    specialties: ["Compliance y regulación fintech", "Open Finance e Insurtech", "Inclusión financiera", "Educación financiera"],
    highlights: [
      "20+ años en compliance y regulación del sector financiero",
      "Panelista en más de 50 foros internacionales de la industria",
      "Líder de comunidades de mujeres en payments y e-commerce"
    ],
    need: "¿Tienes dudas regulatorias o necesitas una estrategia de compliance?"
  },
  {
    id: "alfredo",
    name: "Alfredo Bernacchi",
    title: "Fintech Executive · CEO & Founder",
    country: "México · Brasil · Argentina",
    photo: "/expert-alfredo.png",
    linkedin: "https://www.linkedin.com/in/abernacchi/",
    bio: "Ejecutivo fintech multilingüe con 20+ años construyendo plataformas de pagos en LATAM. Ex CEO de Edenred Fintech Brasil, donde escaló una plataforma open-loop de cero a millones de usuarios b2b2c y cientos de millones de dólares de volumen anual en 5 años. Asesora startups fintech en licenciamiento, tech stacks y posicionamiento ante inversores.",
    specialties: ["Plataformas open-loop b2b2c", "Licenciamiento (SAT-MX, Banco Central BR)", "Go-to-market en LATAM", "P&L y optimización de rentabilidad"],
    highlights: [
      "Ex CEO de Edenred Fintech Brasil (millones de usuarios b2b2c)",
      "Licenciamiento ante SAT México y Banco Central de Brasil",
      "Co-founder de Fusion4X y B2B Experts"
    ],
    need: "¿Quieres lanzar o licenciar una fintech en LATAM?"
  }
];


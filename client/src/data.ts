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
  isPartner?: boolean;
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
      description: "El Sistema de Pagos Electrónicos Interbancarios desarrollado por Banco de México. Opera 24/7 con transferencias irrevocables via CLABE de 18 dígitos. Es la columna vertebral de todos los pagos digitales en México.",
      compliance: "Sin contracargos. Cero riesgo de disputas para el comercio. Regulado directamente por Banxico.",
      providers: ["Bancos mexicanos", "Stripe", "Conekta", "Openpay", "Kushki", "STP", "Arcus"]
    },
    {
      name: "STP (Sistema de Transferencias y Pagos)",
      type: "Infraestructura SPEI / IFPE",
      logo: "🔧",
      settlement: "Inmediato",
      fee: "Tarifa por transferencia (mayorista)",
      description: "El 'motor oculto' detrás de las fintechs mexicanas. STP es la IFPE (Institución de Fondos de Pago Electrónico) regulada por Banxico que actúa como puente tecnológico para que wallets, neobancos, exchanges cripto y plataformas de dispersión (payouts) puedan emitir y recibir transferencias SPEI 24/7 sin ser bancos directamente. Sin STP, no existe Clip, Mercado Pago MX, ni la mayoría de las fintechs.",
      compliance: "Regulado como IFPE por la Ley Fintech. Requiere apertura de cuenta de concentración. Sin contracargos.",
      providers: ["STP directo", "Arcus (Mastercard)", "Cuenca", "Conekta", "Kushki"]
    },
    {
      name: "Billeteras Digitales (Wallets)",
      type: "Wallet Móvil / Stored Value",
      logo: "📱",
      settlement: "Inmediato",
      fee: "0% entre usuarios · 2.5% - 3.9% comercios",
      description: "Plataformas de dinero electrónico de alto crecimiento que eliminan la necesidad de cuentas bancarias tradicionales. Dominan pagos P2P, pago de servicios y cobros con QR en puntos de venta físicos. Mercado Pago lidera con más de 25M de usuarios activos en México. Spin by OXXO integra los 20,000 puntos OXXO como red de cash-in. Baz (Azteca) apunta a la base de la pirámide. Klar es el neobanco sin comisiones.",
      compliance: "Reguladas como IFPEs o Bancos. Límites de transacción por nivel de KYC del usuario.",
      providers: ["Mercado Pago", "Spin by OXXO", "Baz (Banco Azteca)", "Klar", "Cuenca", "Stori"]
    },
    {
      name: "DiMo (Dinero Móvil)",
      type: "A2A / Transferencia por Celular",
      logo: "📲",
      settlement: "Inmediato",
      fee: "Gratis para el usuario final",
      description: "Iniciativa oficial de Banco de México montada sobre la infraestructura SPEI. Permite enviar y recibir dinero usando únicamente el número de teléfono celular de 10 dígitos, sin necesidad de conocer la CLABE interbancaria. Fue lanzado en 2023 y está disponible en los principales bancos y fintechs participantes.",
      compliance: "Regulado directamente por Banxico. Requiere alta del número celular en el banco. Sin contracargos.",
      providers: ["BBVA México", "Banamex", "Santander", "Banorte", "HSBC", "Mercado Pago", "Nu México"]
    },
    {
      name: "OXXO Pay",
      type: "Efectivo / Voucher",
      logo: "🏪",
      settlement: "D+1",
      fee: "3.5% - 4.5% + $10 MXN",
      description: "La red de tiendas de conveniencia más grande de México con más de 22,000 puntos. Permite a los clientes pagar compras en línea en efectivo mediante un código de barra de 14 dígitos. Es el APM más importante para segmentos sub-bancarizados.",
      compliance: "Sin contracargos. Muy seguro contra fraudes pero dependiente de que el cliente realice la acción física.",
      providers: ["Conekta", "Openpay", "Stripe", "PayU", "Mercado Pago"]
    },
    {
      name: "CoDi (Cobro Digital)",
      type: "A2A / QR SPEI",
      logo: "📸",
      settlement: "Inmediato",
      fee: "Gratis o tarifa muy baja",
      description: "Plataforma de cobros digitales desarrollada por Banxico sobre la infraestructura SPEI. Funciona generando un código QR o una liga de pago que, al ser escaneada con la app bancaria del pagador, detona una transferencia SPEI inmediata. Lanzado en 2019, ha tenido adopción moderada pero es el precursor directo de DiMo. Ideal para comercios físicos y profesionales independientes que buscan cobros sin comisiones de tarjeta.",
      compliance: "Regulado por Banxico. Sin contracargos. Requiere que el comercio y el pagador estén en un banco participante de SPEI con soporte CoDi.",
      providers: ["BBVA México", "Banamex", "Banorte", "Santander", "HSBC", "Scotiabank"]
    },
    {
      name: "Paynet y Redes de Efectivo Alternas",
      type: "Efectivo / Corresponsalía",
      logo: "🏬",
      settlement: "D+1",
      fee: "2.5% - 3.9%",
      description: "La principal alternativa a OXXO Pay. Paynet (operada por Openpay/BBVA) conecta más de 40,000 puntos de pago en efectivo incluyendo 7-Eleven, Farmacias del Ahorro, Walmart, Bodega Aurrera y Sam's Club. Esencial para llegar a segmentos que no tienen acceso a OXXO o que buscan distribución geográfica más amplia.",
      compliance: "Sin contracargos. Cada punto de pago actúa como corresponsal no bancario regulado por CNBV.",
      providers: ["Openpay (Paynet)", "PayU", "Conekta", "Banorte", "Banamex"]
    }
  ],
  BR: [
    {
      name: "PIX",
      type: "A2A / Pago Instantáneo",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "0.2% - 0.9% o gratis para personas",
      description: "El sistema de pagos instantáneos del Banco Central de Brasil, lanzado en 2020. Utiliza llaves (email, teléfono, CPF) y códigos QR. Con más de 800 millones de transacciones mensuales, Pix es el sistema de pagos instantáneos más exitoso del mundo después del UPI de India. Ha suplantado a las tarjetas de crédito y efectivo como método preferido de pago en Brasil, incluyendo comercio online, POS y P2P.",
      compliance: "Cero contracargo tradicional. MED (Mecanismo Especial de Devolución) para fraudes. Irrevocable, Regulado por el Banco Central do Brasil.",
      providers: ["Bancos brasileños", "dLocal", "EBANX", "Stripe", "Mercado Pago", "PagBank", "Stone"]
    },
    {
      name: "PIX Automático",
      type: "A2A / Pagos Recurrentes",
      logo: "🔄",
      settlement: "Inmediato",
      fee: "0.2% - 0.5% por cobro automático",
      description: "La evolución del Pix lanzada en junio de 2025. Permite programar cobros recurrentes autorizados por el usuario (servicios, suscripciones, gimnasios, servicios públicos) sin necesitar tarjeta de crédito. El usuario autoriza una vez y el banco lo notifica antes de cada débito, manteniendo control total. Es el mayor competidor del débito automático bancario tradicional y de las tarjetas de crédito para pagos recurrentes en Brasil.",
      compliance: "Regulado por el BACEN. El usuario puede cancelar la autorización en cualquier momento. Sin contracargos.",
      providers: ["Bancos brasileños", "PagBank", "Asaas", "Iugu", "EBANX", "dLocal"]
    },
    {
      name: "Boleto Bancário",
      type: "Efectivo / Voucher bancario",
      logo: "📄",
      settlement: "D+1 a D+2",
      fee: "Tarifa fija por boleto liquidado",
      description: "Método de pago oficial brasileño regulado por Febraban. Es un documento impreso o digital con código de barras que puede pagarse en bancos, loterías o apps bancarias. Aunque PIX lo ha reemplazado en muchos contextos, el boleto sigue siendo relevante para facturas de empresas grandes y cobros formales.",
      compliance: "Sin contracargos. Conversión de compra moderada (alrededor de 50% de boletos emitidos se pagan).",
      providers: ["dLocal", "EBANX", "Stripe Brasil", "Asaas", "PagBank"]
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
      name: "Bre-B",
      type: "A2A / Pagos Inmediatos Interoperables",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "Gratis entre personas · tarifa baja para comercios",
      description: "El sistema de pagos instantáneos interoperables de Colombia impulsado por la Superintendencia Financiera y el Banco de la República, lanzado en 2024. Inspirado en el éxito de PIX (Brasil) y SPEI (México), Bre-B permite transferencias de cuenta a cuenta en segundos usando alias (celular, email, cédula) entre todos los bancos y fintechs participantes. Representa la mayor reforma a la infraestructura de pagos en Colombia en dos décadas y rivaliza directamente con PSE en el segmento digital.",
      compliance: "Regulado por la Superintendencia Financiera de Colombia. Sin contracargos. Irrevocable.",
      providers: ["Bancolombia", "Davivienda", "BBVA Colombia", "Nequi", "Daviplata", "Wompi", "Bold"]
    },
    {
      name: "Nequi / Daviplata",
      type: "Wallet Móvil / A2A",
      logo: "📱",
      settlement: "Inmediato",
      fee: "Gratis P2P · 2.0% - 3.5% comercios",
      description: "Las dos billeteras digitales dominantes en Colombia, cada una con más de 18 millones de usuarios activos. Nequi (Bancolombia) y Daviplata (Davivienda) permiten pagos por QR, transferencias P2P, pago de servicios y acceso a microcrédito. Son el principal canal de inclusión financiera digital del país, especialmente en zonas rurales donde el efectivo dominaba.",
      compliance: "Reguladas como depósitos de bajo monto por la Superintendencia Financiera. Límites diarios según nivel de verificación KYC.",
      providers: ["Nequi directo", "Daviplata directo", "PayU", "Wompi", "ePayco"]
    },
    {
      name: "Efecty",
      type: "Efectivo / Redes locales",
      logo: "🏪",
      settlement: "D+1",
      fee: "3.0% - 4.0%",
      description: "Una de las redes físicas de giros y recaudos más grandes de Colombia con más de 12,000 puntos. Cubre regiones donde la bancarización digital es baja. El cliente paga en efectivo con un código de referencia generado en el checkout online.",
      compliance: "Cero contracargo. Útil para inclusión financiera en segmentos rurales y semi-urbanos.",
      providers: ["PayU", "ePayco", "Wompi", "dLocal"]
    }
  ],
  PE: [
    {
      name: "Yape (BCP)",
      type: "A2A / Billetera Móvil",
      logo: "📱",
      settlement: "Inmediato",
      fee: "Gratis P2P · 1.5% - 2.8% comercios",
      description: "La billetera digital del Banco de Crédito del Perú (BCP) y la app de pagos más descargada del país con más de 15 millones de usuarios. Permite transferencias P2P instantáneas usando número de celular, pagos con QR en comercios físicos y online, y compras en marketplaces. Tiene la particularidad de que no se requiere ser cliente BCP para usarla, ampliando masivamente su alcance. En 2023 se convirtió en interoperable con Plin.",
      compliance: "Regulada por la SBS (Superintendencia de Banca y Seguros). Autenticación biométrica. Límites diarios por nivel KYC.",
      providers: ["Yape Directo (BCP)", "Culqi", "Niubiz", "IziPay", "Mercado Pago Perú"]
    },
    {
      name: "Plin",
      type: "A2A / Billetera Móvil Interoperable",
      logo: "💜",
      settlement: "Inmediato",
      fee: "Gratis P2P · 1.5% - 2.5% comercios",
      description: "La plataforma de pagos instantáneos interoperables creada por la alianza de BBVA Perú, Interbank, Scotiabank y Banbif. Permite transferencias entre usuarios de cualquiera de estos bancos usando solo el número de celular. En 2023 se estableció la interoperabilidad técnica con Yape, consolidando un duopolio que cubre más del 85% de los pagos digitales del Perú.",
      compliance: "Regulada por la SBS. Cada banco participante es responsable del KYC de sus usuarios. Irrevocable.",
      providers: ["BBVA Perú", "Interbank", "Scotiabank Perú", "Banbif", "Culqi"]
    },
    {
      name: "BIM (Billetera Móvil)",
      type: "Wallet Móvil / Inclusión Financiera",
      logo: "🌍",
      settlement: "Inmediato",
      fee: "Gratis o tarifa mínima",
      description: "Iniciativa pública-privada única en LATAM, impulsada por la Asociación de Bancos del Perú (ASBANC). BIM está diseñada para la inclusión financiera de los 7+ millones de peruanos sin cuenta bancaria. Funciona en cualquier celular (incluso sin smartphone) usando SMS/USSD y permite recibir pagos del Estado, remesas y realizar compras.",
      compliance: "Regulada por la SBS y el BCRP. Identificación simplificada para usuarios sin documentos. Límites muy bajos de transacción.",
      providers: ["Bancos miembros de ASBANC", "Operadoras móviles (Claro, Movistar, Entel)"]
    }
  ],
  CL: [
    {
      name: "Khipu",
      type: "A2A / Open Banking",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "0.5% - 1.5%",
      description: "El líder de pagos A2A en Chile, procesando ~1% del PIB nacional y más de 4M de transacciones mensuales. Funciona conectando directamente al usuario con su app bancaria via Open Finance para autorizar transferencias instantáneas a comercios, sin necesidad de ingresar datos de tarjeta. Es 6x más barato que las tarjetas tradicionales para el comercio y no tiene contracargos. Muy popular en e-commerce y servicios universitarios.",
      compliance: "Sin contracargos. Irrevocable. Regulado por la CMF. Integra Open Finance para conexión segura con bancos.",
      providers: ["Khipu directo", "Flow Chile", "EBANX", "dLocal"]
    },
    {
      name: "MACH (BCI)",
      type: "Wallet Móvil / P2P",
      logo: "📱",
      settlement: "Inmediato P2P · D+1 comercios",
      fee: "Gratis P2P · 1.8% - 2.5% comercios",
      description: "La billetera digital del BCI y una de las más populares en Chile con millones de usuarios. Permite pagos P2P instantáneos, pagar servicios, recargar el celular, comprar en el extranjero con una tarjeta MACH Visa Prepago y pagar en e-commerce tanto en Chile como internacionalmente sin tarjeta de crédito bancaria tradicional.",
      compliance: "Regulada por la CMF como emisor de dinero electrónico. KYC simplificado para onboarding. Sin contracargos en P2P.",
      providers: ["MACH directo (BCI)", "Flow Chile", "Getnet Chile"]
    },
    {
      name: "Webpay Plus",
      type: "Tarjeta de Débito/Crédito local",
      logo: "💳",
      settlement: "D+1 (Débito), D+2 (Crédito)",
      fee: "1.2% - 2.9%",
      description: "La red de procesamiento de Transbank que conecta todas las tarjetas chilenas en el e-commerce. Soporta cuotas sin intereses y Redcompra. Históricamente fue el método dominante, aunque está siendo competido por soluciones A2A más baratas como Khipu.",
      compliance: "Sujeto a contracargos. Requiere autenticación 3DS forzada en la mayoría de bancos chilenos.",
      providers: ["Transbank directo", "Getnet Chile", "Flow Chile", "Pago Fácil"]
    }
  ],
  AR: [
    {
      name: "Transferencias 3.0 (QR Interoperable)",
      type: "A2A / QR Nacional Interoperable",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "0.8% - 1.5%",
      description: "La iniciativa del Banco Central de la República Argentina (BCRA) para unificar todos los QR de pago del país en un solo estándar interoperable. Cualquier app bancaria o billetera (Mercado Pago, MODO, Ualá) puede escanear cualquier QR y hacer la transferencia instantánea. Es el método de pago digital de mayor crecimiento en Argentina, superando incluso a las tarjetas en muchos puntos de venta físicos.",
      compliance: "Sin contracargos. Regulado por el BCRA. Irrevocable. Muy conveniente por el arancel bajo comparado con tarjetas.",
      providers: ["Mercado Pago", "MODO", "Ualá Bis", "Prisma (Payway)", "dLocal", "Naranja X"]
    },
    {
      name: "MODO",
      type: "A2A / Super Wallet Bancaria",
      logo: "📱",
      settlement: "Inmediato",
      fee: "Gratis P2P · 0.8% - 1.2% comercios",
      description: "La billetera digital impulsada por la alianza de más de 30 bancos argentinos, actuando como la capa de experiencia de usuario sobre el QR interoperable de Transferencias 3.0. MODO permite pagar con cualquier tarjeta de débito bancaria, crédito o cuenta en pesos de forma instantánea escaneando un QR. En 2026 integró la capacidad de pagar con códigos QR de PIX en Brasil.",
      compliance: "Regulada por el BCRA. KYC bancario completo. Sin contracargos en transferencias A2A.",
      providers: ["MODO directo", "Prisma (Payway)", "dLocal"]
    },
    {
      name: "Ualá Bis",
      type: "Wallet / Agregador Pyme",
      logo: "💜",
      settlement: "Inmediato",
      fee: "1.5% - 2.5%",
      description: "La división para comercios del neobanco Ualá. Permite a pequeños y medianos negocios cobrar con QR, links de pago y datafónos móviles, con liquidación inmediata en la cuenta Ualá y acceso a microcréditos basados en el historial transaccional.",
      compliance: "Regulada como Proveedor de Servicios de Pago (PSP) por el BCRA. Sin contracargos en transferencias.",
      providers: ["Ualá Bis directo", "dLocal"]
    }
  ],
  UY: [
    {
      name: "Transferencias Instantáneas (BROU / Itaú)",
      type: "A2A / Banca Digital",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "Gratis o tarifa mínima",
      description: "Uruguay tiene uno de los niveles de bancarización más altos de LATAM (~80%). Las transferencias bancarias instantáneas entre cuentas de los principales bancos (BROU, Itú, Santander, BBVA) son el método A2A predominante. El BROU (Banco República Oriental del Uruguay) ofrece transferencias interbancarias 24/7 con liquidación inmediata como estándar.",
      compliance: "Regulado por el Banco Central del Uruguay (BCU). Sin contracargos.",
      providers: ["BROU directo", "Itaú Uruguay", "Santander Uruguay", "dLocal", "Paganza"]
    },
    {
      name: "Redpagos / Abitab",
      type: "Efectivo / Redes locales",
      logo: "🏪",
      settlement: "D+1",
      fee: "3.5% - 4.5%",
      description: "Redes físicas de pagos en Uruguay con cobertura nacional que incluyen más de 2,000 agencias combinadas entre Redpagos y Abitab. Son el canal de pago de facturas, recargas y servicios del gobierno. El cliente emite un voucher digital y paga en efectivo en el punto más cercano.",
      compliance: "Sin riesgo de contracargo. Reguladas por el BCU como redes de cobranza.",
      providers: ["dLocal", "Sistarbanc", "Paganza", "Uruguay directo"]
    }
  ],
  EC: [
    {
      name: "Deuna!",
      type: "Wallet Móvil / A2A",
      logo: "📱",
      settlement: "Inmediato",
      fee: "1.0% - 2.5%",
      description: "La billetera digital líder en Ecuador respaldada por Banco Pichincha con más de 6 millones de usuarios. Permite pagos P2P y P2B (persona a comercio) mediante códigos QR o número de celular, pago de servicios, recargas y transferencias. Destaca por funcionar incluso sin conexión a internet y por 'Deuna Veci', su red de puntos físicos para depósitos y retiros de efectivo. Es la plataforma de inclusión financiera digital más exitosa del país.",
      compliance: "Sin contracargos. Regulada por la Superintendencia de Bancos del Ecuador. KYC simplificado.",
      providers: ["Banco Pichincha directo", "Kushki", "PayPhone Ecuador"]
    },
    {
      name: "PayPhone",
      type: "A2A / Botones de Pago",
      logo: "📲",
      settlement: "Inmediato",
      fee: "1.5% - 3.0%",
      description: "La pasarela y billetera digital ecuatoriana más utilizada por comercios. Permite cobrar con botones de pago en apps, links, redes sociales y QR. Soporta pagos con tarjetas y A2A desde cuentas bancarias. Muy popular en pymes y profesionales independientes.",
      compliance: "Regulada por la Superintendencia de Bancos. Sin contracargos en A2A.",
      providers: ["PayPhone directo", "Kushki"]
    }
  ],
  CR: [
    {
      name: "SINPE Móvil",
      type: "A2A / RTP Interbancario Nacional",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "Gratis o tarifa mínima (₡500 por transacción)",
      description: "El sistema de pagos móviles instantáneos administrado por el Banco Central de Costa Rica (BCCR). Es uno de los modelos más maduros de interoperabilidad total en LATAM: cualquier usuario de cualquier banco puede enviar o recibir dinero instantáneamente usando solo el número de teléfono. Sin necesidad de IBAN o número de cuenta. Tiene cobertura en prácticamente todas las entidades financieras del país, incluyendo cooperativas.",
      compliance: "Regulado por el BCCR. Sin contracargos. Irrevocable. Considerado benchmark regional de interoperabilidad.",
      providers: ["BAC Credomatic", "Banco Nacional", "Banco de Costa Rica", "Scotiabank CR", "Promerica"]
    },
    {
      name: "SINPE (Transferencias Bancarias)",
      type: "A2A / Sistema Interbancario",
      logo: "🏦",
      settlement: "Inmediato (SINPE LBTR) · D+1 (SINPE ACH)",
      fee: "Gratis para montos pequeños · tarifa plana altos montos",
      description: "La infraestructura madre del sistema financiero costarricense. SINPE LBTR (Liquidación Bruta en Tiempo Real) procesa transferencias de alto valor entre instituciones financieras en tiempo real. Es el backbone sobre el cual opera SINPE Móvil.",
      compliance: "Regulado directamente por el BCCR. Para uso corporativo principalmente.",
      providers: ["Todos los bancos regulados en Costa Rica"]
    }
  ],
  PA: [
    {
      name: "Yappy (Banco General)",
      type: "A2A / Billetera Móvil",
      logo: "📱",
      settlement: "Inmediato",
      fee: "Gratis P2P · 1.0% - 1.5% comercios",
      description: "La plataforma de pagos móviles más popular de Panamá, operada por Banco General. Permite enviar dinero instantáneamente usando el número de celular, pagar facturas del gobierno, servicios públicos y realizar cobros en comercios. Ha expandido su ecosistema para incluir Caja de Ahorros y otras instituciones. Integra APIs para que negocios automaticen sus cobros P2B.",
      compliance: "Sin contracargos. Regulada por la Superintendencia de Bancos de Panamá. Fuerte autenticación biométrica.",
      providers: ["Banco General directo", "Caja de Ahorros", "PixelPay"]
    },
    {
      name: "tPago",
      type: "A2A / Multi-banco Digital",
      logo: "📲",
      settlement: "Inmediato",
      fee: "1.0% - 2.0%",
      description: "Plataforma digital panameña que permite centralizar múltiples cuentas bancarias y tarjetas de diferentes bancos en una sola app. Facilita transferencias instantáneas entre cuentas, pago de servicios y transacciones a comercios participantes. A diferencia de Yappy (mono-banco), tPago es multi-banco y cubre Banistmo, Banvivienda y otras instituciones.",
      compliance: "Regulada por la Superintendencia de Bancos de Panamá. KYC bancario completo.",
      providers: ["Banistmo", "Banvivienda", "tPago directo"]
    }
  ],
  BO: [
    {
      name: "QR Simple Bolivia",
      type: "A2A / QR Interoperable Nacional",
      logo: "✨",
      settlement: "Inmediato",
      fee: "0.5% - 1.0%",
      description: "La solución nacional interoperable de códigos QR en Bolivia impulsada por el Banco Central de Bolivia (BCB). Permite a los usuarios de cualquier banco o billetera pagar escaneando un único código QR. Es uno de los sistemas de QR interoperable de mayor adopción en la región andina, con cobertura en bancos, cooperativas y microfinancieras. Ha impulsado enormemente la inclusión financiera en zonas rurales.",
      compliance: "Regulado por el BCB y la ASFI (Autoridad de Supervisión del Sistema Financiero). Sin contracargos.",
      providers: ["Bancos bolivianos asociados", "BNB", "Banco Mercantil Santa Cruz", "Kushki"]
    },
    {
      name: "Billeteras Móviles (Tigo Money)",
      type: "Wallet Móvil / Fintech",
      logo: "📱",
      settlement: "Inmediato",
      fee: "1.5% - 3.0%",
      description: "Las billeteras móviles de operadoras de telecomunicaciones y fintechs complementan el ecosistema de pagos boliviano. Tigo Money es la dominante, con fuerte penetración en zonas donde la bancarización tradicional es baja. Permite envío de remesas internas, pago de servicios y cobros P2P.",
      compliance: "Reguladas por la ASFI. Funcionan sobre redes celulares (incluso sin smartphone). Límites de transacción por nivel KYC.",
      providers: ["Tigo Money", "Banco Fíe", "bancos microfinancieros"]
    }
  ],
  PY: [
    {
      name: "Giros Tigo (Tigo Money Paraguay)",
      type: "Wallet Móvil / Remesas Internas",
      logo: "📱",
      settlement: "Inmediato",
      fee: "1.5% - 3.0%",
      description: "Tigo Money es el líder del dinero móvil en Paraguay, con penetración masiva en zonas rurales donde no hay sucursales bancarias. Permite enviar y recibir dinero, pagar facturas y realizar recargas. Es el canal principal para remesas internas (Ciudad del Este → Asunción) y tiene alta adopción en trabajadores rurales y agrícolas.",
      compliance: "Regulado por el Banco Central del Paraguay (BCP). Requiere verificación de identidad para envíos sobre G 2,000,000.",
      providers: ["Tigo Money directo", "dLocal", "Bancard"]
    },
    {
      name: "Pago Electrónico (Bancard)",
      type: "Red Adquirente / A2A",
      logo: "🏦",
      settlement: "D+1",
      fee: "2.5% - 3.5%",
      description: "Bancard es el procesador y adquirente líder de Paraguay. Su plataforma de pagos electrónicos conecta a comercios con todos los bancos locales. También opera la red de cajeros automáticos más grande del país y es el backbone del sistema de pagos digitales paraguayo.",
      compliance: "Regulado por el BCP. Sin contracargos en pagos directos A2A.",
      providers: ["Bancard", "dLocal"]
    }
  ],
  GT: [
    {
      name: "Tigo Money Guatemala",
      type: "Billetera Móvil / Remesas",
      logo: "📱",
      settlement: "Inmediato",
      fee: "2.0% - 3.5%",
      description: "Tigo Money es la billetera móvil dominante en Guatemala y uno de los canales más usados para recibir remesas desde Estados Unidos. Con más de 2 millones de usuarios activos, permite recibir dinero en efectivo en tiendas Tigo o retirarlo en la red de agentes. Es vital entender que Guatemala es uno de los mayores receptores de remesas de LATAM (~$21B anuales, equivalente al 20% del PIB), principalmente del corredor USA→Guatemala, siendo Tigo Money el canal preferido para quienes no tienen cuenta bancaria.",
      compliance: "Regulado por la Superintendencia de Bancos de Guatemala (SIB). KYC por número de teléfono. Límites de balance por nivel de verificación.",
      providers: ["Tigo Money directo", "PixelPay", "PayCash (puntos físicos)"]
    },
    {
      name: "Transferencias Bancarias (G&T / Banrural)",
      type: "A2A / Banca Tradicional",
      logo: "🏦",
      settlement: "Inmediato (dentro del mismo banco) · D+1 (interbancario)",
      fee: "Q25 - Q50 por transacción",
      description: "Las transferencias interbancarias en Guatemala operan a través del Sistema de Pagos del Banco de Guatemala (SIPAGO). Banrural es el banco más grande por número de agencias rurales y es el principal canal para que población indígena y rural reciba remesas en zonas donde no llegan los ATMs de bancos urbanos. G&T Continental es el banco más grande por activos.",
      compliance: "Regulado por la SIB y el Banco de Guatemala. SIPAGO como infraestructura de compensación interbancaria.",
      providers: ["G&T Continental", "Banrural", "BAM", "Industrial", "dLocal"]
    }
  ],
  DO: [
    {
      name: "tPago (Transacción Interbancaria)",
      type: "A2A / RTP Interbancario",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "1.0% - 2.0%",
      description: "El sistema de pagos inmediatos interbancarios de República Dominicana impulsado por el Banco Central (BCRD). tPago vincula las cuentas bancarias de los principales bancos (Banco Popular, Banreservas, BHD León, Scotiabank RD) para transferencias instantáneas usando número de celular o código QR. República Dominicana es uno de los mayores receptores de remesas del Caribe (~$10B anuales, ~10% del PIB), principalmente desde el corredor USA→DO.",
      compliance: "Regulado por el BCRD y la SB (Superintendencia de Bancos). KYC obligatorio. Límites diarios por tipo de cuenta.",
      providers: ["Banco Popular", "Banreservas", "BHD León", "tPago directo"]
    },
    {
      name: "Vuelve (Remesas & Wallets)",
      type: "Wallet / Pago de Remesas",
      logo: "💸",
      settlement: "Inmediato",
      fee: "Gratis para receptor · tarifa fija para remitente",
      description: "La principal plataforma digital de recepción de remesas en República Dominicana. Permite al receptor en RD recibir la remesa directamente en su celular y usarla para pagar servicios, hacer transferencias P2P o retirar en efectivo en puntos autorizados. Compite con puntos de pago de Western Union y MoneyGram pero con tarifas mucho menores para el receptor.",
      compliance: "Regulado por el BCRD como proveedor de servicios de pago. Sujeto a regulación AML/KYC del GAFI.",
      providers: ["Vuelve directo", "PayCash (red física)", "dLocal"]
    }
  ],
  HN: [
    {
      name: "Transferencias LBTR (BCH)",
      type: "A2A / Sistema Interbancario",
      logo: "⚡",
      settlement: "Inmediato (LBTR) · D+1 (ACH)",
      fee: "L 25 - L 80 por transacción",
      description: "El Sistema de Liquidación Bruta en Tiempo Real del Banco Central de Honduras (BCH). Es la infraestructura madre del sistema de pagos interbanarios del país. Honduras es el país con mayor dependencia de remesas en LATAM: ~$9B anuales equivalen al ~27% del PIB. El corredor principal es USA→Honduras (especialmente Florida, Louisiana y Texas). La mayoría de los hondureños receptores de remesas vive en áreas rurales sin acceso bancario.",
      compliance: "Regulado por el BCH y la Comisión Nacional de Bancos y Seguros (CNBS). AML/KYC obligatorio.",
      providers: ["Todos los bancos regulados en Honduras", "BAC Honduras", "Ficohsa", "Atlántida"]
    },
    {
      name: "Tigo Money Honduras",
      type: "Wallet Móvil / Remesas Last-Mile",
      logo: "📱",
      settlement: "Inmediato",
      fee: "2.0% - 3.5%",
      description: "La billetera móvil más importante para el last-mile de remesas en Honduras. Dado que el 45%+ de la población no tiene cuenta bancaria, Tigo Money es el canal principal para que los receptores de remesas en zonas rurales reciban y usen su dinero. Permite recibir envíos desde Western Union, MoneyGram y plataformas digitales, retirar en efectivo en agentes Tigo y pagar servicios básicos.",
      compliance: "Regulado por el BCH y la CNBS. KYC por número de teléfono y DPI. Límites de transacción por nivel KYC.",
      providers: ["Tigo Money directo", "PayCash (8,614 puntos)", "Western Union", "dLocal"]
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
  },
  {
    id: 9,
    title: "9. KYC, AML & Fraud Prevention",
    role: "Identidad y Cumplimiento",
    description: "Procesos y herramientas para verificar identidad, prevenir fraude y cumplir normativas contra lavado de dinero."
  }
];

export const PAYMENT_PROVIDERS: Record<string, PaymentProvider[]> = {
  REGIONAL: [
    { name: "Toku", role: "Optimización de Pagos Recurrentes", countries: "México, Chile, LATAM", desc: "Plataforma líder para pagos de suscripción con recuperación inteligente de fallos (SaaS B2B).", isPartner: true },
    { name: "dLocal", role: "Agregador Regional / PayFac", countries: "LATAM", desc: "Infraestructura unificada de cobros y dispersiones (payouts) para mercados emergentes." },
    { name: "EBANX", role: "Agregador Regional / Procesador", countries: "LATAM", desc: "Especialista en conectar comercios globales con métodos de pago locales." },
    { name: "Mercado Pago", role: "Agregador / Billetera Digital", countries: "LATAM", desc: "El ecosistema fintech más grande de la región. Pasarela, links y procesamiento físico." },
    { name: "PayU", role: "Gateway / Agregador", countries: "LATAM", desc: "Pionera en el procesamiento de pagos en LATAM." },
    { name: "Stripe", role: "Gateway / Adquirente", countries: "México, Brasil (Soporte local)", desc: "El estándar tecnológico para cobros online. APIs premium." },
    { name: "Belvo", role: "Open Finance / APIs", countries: "LATAM", desc: "Plataforma líder de APIs de banca abierta e iniciación de pagos." },
    { name: "Prometeo", role: "Open Banking", countries: "LATAM", desc: "Infraestructura de interoperabilidad y pagos cuenta a cuenta (A2A)." },
    { name: "Pomelo", role: "Emisión de Tarjetas", countries: "LATAM", desc: "Infraestructura moderna para lanzar y escalar negocios de tarjetas y pagos." },
    { name: "Dock", role: "BaaS / Emisión", countries: "Brasil, LATAM", desc: "Soluciones completas de Banking as a Service y emisión de tarjetas." },
    { name: "Geopagos", role: "Infraestructura Adquirente", countries: "LATAM", desc: "Tecnología de marca blanca para adquirentes y agregadores en toda la región." },
    { name: "8B (8b.world)", role: "Scan to Pay / Pagos con QR", countries: "Global (Mercados Emergentes)", desc: "Core especializado en orquestación de pagos con código QR, conectando métodos locales transfronterizos.", isPartner: true },
    { name: "Kushki", role: "Orquestador / Adquirente regional", countries: "LATAM", desc: "Opera como adquirente no bancario regional y orquestador tecnológico." },
    { name: "Matera", role: "Core Banking & Pix", countries: "LATAM", desc: "Infraestructura de core bancario y procesamiento instantáneo." },
    { name: "Volt", role: "Open Banking Payments", countries: "Global, Brasil", desc: "Red global de pagos A2A e iniciación de pagos en tiempo real." }
  ],
  MX: [
    { name: "Netpay", role: "Adquirente Omnicanal", countries: "México", desc: "Soluciones de terminales físicas y e-commerce con condiciones comerciales preferenciales.", isPartner: true },
    { name: "EfevoPay", role: "Agregador / B2B", countries: "México", desc: "Gestión de adquirencia para comercios tradicionales con alto margen de personalización.", isPartner: true },
    { name: "Broxel", role: "Billetera / Pagos B2B", countries: "México", desc: "Soluciones de medios de pago, tarjetas corporativas y remesas.", isPartner: true },
    { name: "Planet", role: "Agregador / Fintech", countries: "México, Global", desc: "Soluciones de pago integradas para retail y hospitality.", isPartner: true },
    { name: "Prosepago", role: "Agregador de Pagos", countries: "México", desc: "Agregador de pagos con enfoque en PYMES.", isPartner: true },
    { name: "Paibo", role: "Agregador de Pagos", countries: "México", desc: "Soluciones de cobro y terminales.", isPartner: true },
    { name: "Bzpay", role: "Agregador de Pagos", countries: "México", desc: "Servicios y procesamiento de pagos.", isPartner: true },
    { name: "Axxi Pay", role: "Agregador de Pagos", countries: "México", desc: "Plataforma de adquirencia.", isPartner: true },
    { name: "Previvale", role: "Vales y Beneficios", countries: "México", desc: "Vales de despensa y beneficios para empleados.", isPartner: true },
    { name: "Openpay", role: "Pasarela / Agregador", countries: "México", desc: "Propiedad de BBVA. Alta tasa de aprobación y red Paynet." },
    { name: "Conekta", role: "Agregador de Pagos", countries: "México", desc: "Especialista en pagos con tarjeta y efectivo offline mediante OXXO Pay." },
    { name: "Clip", role: "Agregador físico & Online", countries: "México", desc: "Líder indiscutible de cobros presenciales para pymes." },
    { name: "Bitso", role: "Crypto / Pagos", countries: "México", desc: "Exchange líder habilitando remesas y pagos B2B con criptomonedas." },
    { name: "Clara", role: "Gestión de Gastos B2B", countries: "México", desc: "Tarjetas corporativas y control de gastos inteligente para empresas." },
    { name: "Xepelin", role: "Pagos B2B / Factoraje", countries: "México", desc: "Plataforma de pagos B2B y financiamiento corporativo." },
    { name: "Stori", role: "Neobanco / Tarjetas", countries: "México", desc: "Inclusión financiera con tarjetas de crédito y cuentas de alto rendimiento." },
    { name: "Klar", role: "Neobanco / Pagos", countries: "México", desc: "Alternativa digital a la banca tradicional con cuentas y crédito." },
    { name: "Aplazo", role: "BNPL", countries: "México", desc: "Plataforma de Buy Now, Pay Later para e-commerce y tiendas físicas." },
    { name: "Kueski Pay", role: "BNPL", countries: "México", desc: "El ecosistema de pagos a plazos (BNPL) más grande de México." },
    { name: "Spin by OXXO", role: "Billetera Digital", countries: "México", desc: "Ecosistema de pagos y tarjetas vinculado a la red OXXO." },
    { name: "STP", role: "Infraestructura SPEI", countries: "México", desc: "Principal conexión corporativa e infraestructura para transferencias SPEI directas." },
    { name: "Albo", role: "Neobanco / B2B", countries: "México", desc: "Cuentas digitales para consumidores y herramientas financieras empresariales." },
    { name: "Billpocket", role: "mPOS", countries: "México", desc: "Agregador físico adquirido por Kushki para terminales punto de venta móviles." },
    { name: "Sr. Pago", role: "mPOS / Agregador", countries: "México", desc: "Terminales móviles para pymes y no bancarizados (adquirida por Konfío)." },
    { name: "Fondeadora", role: "Billetera Empresarial", countries: "México", desc: "Tarjetas corporativas e individuales de diseño impecable." },
    { name: "Konfío", role: "Pagos B2B / Crédito", countries: "México", desc: "Plataforma financiera integral para pequeñas y medianas empresas." },
    { name: "Covalto", role: "B2B / Banco PYME", countries: "México", desc: "Banco digital especializado en factoraje y crédito PYME." },
    { name: "Swap", role: "Billetera / P2P", countries: "México", desc: "Pagos persona a persona sin comisiones a cualquier tarjeta o CLABE." },
    { name: "Zettle (PayPal)", role: "mPOS", countries: "México", desc: "Terminales y soluciones integrales de punto de venta (anteriormente iZettle)." }
  ],
  BR: [
    { name: "PagBank", role: "Adquirente / Wallet", countries: "Brasil", desc: "Pionero de la agregación de pagos en Brasil." },
    { name: "Stone", role: "Adquirente e Infraestructura", countries: "Brasil", desc: "Líder en cobros físicos y pasarelas en e-commerce." },
    { name: "Cielo", role: "Adquirente / Procesador", countries: "Brasil", desc: "Una de las redes de pago más grandes de Brasil." },
    { name: "Rede", role: "Adquirente (Itaú)", countries: "Brasil", desc: "Brazo de adquirencia del banco Itaú Unibanco." },
    { name: "Getnet", role: "Adquirente Global", countries: "Brasil", desc: "Plataforma de adquirencia originada en Brasil, propiedad del Santander." },
    { name: "Nubank", role: "Neobanco / Emisor", countries: "Brasil", desc: "El banco digital más grande de América Latina fuera de Asia." },
    { name: "PicPay", role: "Billetera / Súper App", countries: "Brasil", desc: "Red social de pagos líder en P2P y QR en Brasil." },
    { name: "Pagar.me", role: "Pasarela / Agregador", countries: "Brasil", desc: "Solución robusta de e-commerce (parte de StoneCo)." },
    { name: "Zoop", role: "Fintech as a Service", countries: "Brasil", desc: "Plataforma white-label de adquirencia y BaaS." },
    { name: "C6 Bank", role: "Neobanco", countries: "Brasil", desc: "Banco digital completo con infraestructura de pagos propia." }
  ],
  CO: [
    { name: "Wompi", role: "Pasarela (Bancolombia)", countries: "Colombia", desc: "La pasarela oficial de Bancolombia para pagos online." },
    { name: "Bold", role: "Agregador Pyme", countries: "Colombia", desc: "Datáfonos móviles y botones de PSE simples." },
    { name: "Addi", role: "BNPL", countries: "Colombia", desc: "La plataforma líder de Buy Now, Pay Later en Colombia y Brasil." },
    { name: "Nequi", role: "Billetera Digital", countries: "Colombia", desc: "La súper app financiera más utilizada para P2P en Colombia." },
    { name: "DaviPlata", role: "Billetera Digital", countries: "Colombia", desc: "Ecosistema de pagos móviles nativo del Banco Davivienda." },
    { name: "ePayco", role: "Agregador / Pasarela", countries: "Colombia", desc: "Ecosistema de pagos integrales, recaudos y dispersiones." },
    { name: "Credibanco", role: "Red de Adquirencia", countries: "Colombia", desc: "Red histórica de procesamiento de tarjetas (Visa) en Colombia." },
    { name: "Redeban", role: "Red de Adquirencia", countries: "Colombia", desc: "Red de procesamiento (Mastercard) e infraestructura financiera central." }
  ],
  AR: [
    { name: "Payway", role: "Adquirente (Prisma)", countries: "Argentina", desc: "Red que procesa y gestiona la interoperabilidad del código QR MODO." },
    { name: "Ualá", role: "Billetera / Agregador", countries: "Argentina", desc: "Ecosistema financiero y cobros inmediatos acreditados en la cuenta (Ualá Bis)." },
    { name: "MODO", role: "Billetera de Bancos", countries: "Argentina", desc: "Solución unificada de pagos QR y A2A de los bancos tradicionales argentinos." },
    { name: "Naranja X", role: "Emisor y Wallet", countries: "Argentina", desc: "Fintech con fuerte penetración en emisión de tarjetas y créditos." },
    { name: "Fiserv Arg", role: "Adquirente Global", countries: "Argentina", desc: "Operador de la marca Posnet y principal procesador junto a Prisma." },
    { name: "Todo Pago", role: "Agregador / Billetera", countries: "Argentina", desc: "Solución de Prisma Medios de Pago para e-commerce." }
  ],
  CL: [
    { name: "Transbank", role: "Adquirente histórico", countries: "Chile", desc: "El operador que históricamente monopolizó el procesamiento de tarjetas." },
    { name: "Getnet Chile", role: "Adquirente competidor", countries: "Chile", desc: "Introdujo el modelo de 4 partes en Chile rompiendo el monopolio." },
    { name: "Mach", role: "Billetera Digital (Bci)", countries: "Chile", desc: "Cuenta digital prepago con mayor crecimiento en el país." },
    { name: "Tenpo", role: "Neobanco", countries: "Chile", desc: "Primera fintech emisora de cuentas digitales y tarjetas prepago en Chile." },
    { name: "Fintoc", role: "Open Banking / A2A", countries: "Chile", desc: "APIs para iniciación de pagos de cuenta a cuenta en Chile y México." },
    { name: "PagoFácil", role: "Agregador / Pasarela", countries: "Chile", desc: "Solución sencilla de pagos online para pymes chilenas." }
  ],
  PE: [
    { name: "Niubiz", role: "Adquirente y Gateway", countries: "Perú", desc: "Anteriormente VisaNet Perú. El procesador más grande del país." },
    { name: "IziPay", role: "Adquirente multimarca", countries: "Perú", desc: "Unifica el procesamiento de Visa y Mastercard." },
    { name: "Yape", role: "Billetera Digital (BCP)", countries: "Perú", desc: "La aplicación de pagos P2P y QR dominante en Perú." },
    { name: "Plin", role: "Red de Pagos A2A", countries: "Perú", desc: "Red interoperable de pagos inmediatos entre bancos (Interbank, BBVA, Scotiabank)." },
    { name: "Culqi", role: "Pasarela / Agregador", countries: "Perú", desc: "Plataforma de pagos omnicanal propiedad de BCP/Krealo." },
    { name: "PagoEfectivo", role: "Pagos Alternativos", countries: "Perú", desc: "El método líder de pagos en efectivo e internet (adquirida por Paysafe)." }
  ],
  REST: [
    { name: "BAC Credomatic", role: "Adquirente líder", countries: "Centroamérica", desc: "El banco adquirente y procesador de pagos más grande de Centroamérica." },
    { name: "Hugo", role: "Súper App / Wallet", countries: "Centroamérica", desc: "Plataforma de delivery que evolucionó a servicios financieros (adquirida por Delivery Hero)." },
    { name: "PagueloFacil", role: "Pasarela / Agregador", countries: "Panamá", desc: "Solución robusta de pagos en línea en Panamá." },
    { name: "Kash", role: "P2P Transfers", countries: "Centroamérica", desc: "Aplicación móvil para transferencias respaldada por Mastercard." }
  ],
  KYC_AML: [
    { name: "Unico", role: "Identidad Digital Integral", countries: "LATAM, Global", desc: "Líder en validación de identidad y firma electrónica con alto nivel de conversión.", isPartner: true },
    { name: "YG Consultores", role: "Compliance y Regulación", countries: "LATAM", desc: "Firma especializada en el diseño e implementación de marcos legales para Fintechs.", isPartner: true },
    { name: "Incode", role: "Biometría e Identidad Omnicanal", countries: "México, Global", desc: "Plataforma líder en onboarding automatizado de extremo a extremo." },
    { name: "Sumsub", role: "KYC/KYB Integral", countries: "Global", desc: "Verificación completa KYC/KYB y AML, con gran tracción en iGaming." },
    { name: "Riskified", role: "Prevención de Fraude AI", countries: "Global", desc: "Gestión de fraude transaccional impulsada por Inteligencia Artificial y machine learning." },
    { name: "Truora", role: "Background Checks / Auth", countries: "Colombia, LATAM", desc: "Autenticación fluida por WhatsApp y validación de antecedentes penales." },
    { name: "MetaMap", role: "KYC/KYB", countries: "Global, LATAM", desc: "Solución integral de onboarding ampliamente adoptada por fintechs regionales." },
    { name: "KYC SYSTEMS", role: "Regtech / AML", countries: "México", desc: "Solución especializada en normativa local de la CNBV y UIF para prevención de lavado." },
    { name: "Onfido", role: "KYC e Identidad AI", countries: "Global", desc: "Plataforma de verificación de identidad escalable basada en biometría e IA." },
    { name: "Shufti Pro", role: "Verificación de Identidad KYC", countries: "Global", desc: "Automatización global de flujos de verificación KYC." },
    { name: "LexisNexis", role: "Inteligencia de Identidad y AML", countries: "Global", desc: "Análisis masivo de riesgo, listas sancionadas (OFAC) y compliance global." },
    { name: "Auco", role: "Automatización de Cumplimiento", countries: "México, LATAM", desc: "Automatización de flujos de cumplimiento normativo y KYC corporativo." },
    { name: "Velafi", role: "Validación y Prevención de Fraude", countries: "México, LATAM", desc: "Especialista en prevención de fraude, validación de identidad y verificación de empresas." },
    { name: "ClearSale", role: "Prevención de Fraude B2C", countries: "Brasil, LATAM", desc: "Gigante brasileño en revisión manual y automática de fraude e-commerce." },
    { name: "Kount", role: "Prevención de Fraude Digital", countries: "Global", desc: "Plataforma de Equifax basada en inteligencia artificial para gestión de identidades y pagos." },
    { name: "Signifyd", role: "Garantía de Fraude e-commerce", countries: "Global", desc: "Prevención de fraude con modelo de garantía financiera (chargeback protection) para comercios." },
    { name: "Konduto", role: "Análisis de Comportamiento Antifraude", countries: "Brasil, LATAM", desc: "Adquirida por Boa Vista, pionera en el uso de IA y análisis de navegación para prevenir fraude en e-commerce." },
    { name: "CyberSource", role: "Gateway y Fraude (Visa)", countries: "Global", desc: "Plataforma global de Visa con motor de decisión de riesgo avanzado." }
  ],
  ORQUESTADORES: [
    { name: "Yuno", role: "Orquestador de Pagos", countries: "LATAM, Global", desc: "Permite a los comercios integrar múltiples métodos de pago y ruteo inteligente con una sola API.", isPartner: true },
    { name: "DEUNA", role: "Orquestador y Checkout One-Click", countries: "LATAM", desc: "Plataforma de orquestación de pagos que optimiza la conversión con una experiencia de checkout unificada." },
    { name: "OrquestaPay", role: "Orquestador de Pagos", countries: "LATAM", desc: "Orquestación y enrutamiento inteligente de transacciones para optimizar tasas de aceptación." },
    { name: "Toku", role: "Orquestador de Pagos Recurrentes", countries: "Chile, México, LATAM", desc: "Especialista en orquestación de pagos recurrentes, suscripciones y cobranza automatizada." }
  ],
  HUBS_POR_VERTICAL: [
    { name: "Paynau", role: "Hub de Pagos por Vertical", countries: "México, LATAM", desc: "Agregador y hub de pagos especializado en resolver necesidades específicas por vertical (B2B, corporativo, etc)." }
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
  need?: string;
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

export type RemittanceCorridor = {
  id: string;
  from: string;
  to: string;
  fromFlag: string;
  toFlag: string;
  volumeUSD: number;
  gdpPercent: number;
  avgFeePercent: number;
  lastMile: string[];
  dominantPlayers: string[];
  informalChannel?: string;
};

export const REMITTANCE_CORRIDORS: RemittanceCorridor[] = [
  {
    id: "us-mx",
    from: "US", to: "MX",
    fromFlag: "🇺🇸", toFlag: "🇲🇽",
    volumeUSD: 67000,
    gdpPercent: 3.5,
    avgFeePercent: 3.2,
    lastMile: ["SPEI", "Efectivo (Corresponsales)", "Wallets"],
    dominantPlayers: ["Remitly", "Western Union", "Ria", "Vigo"],
    informalChannel: "Zelle P2P"
  },
  {
    id: "us-gt",
    from: "US", to: "GT",
    fromFlag: "🇺🇸", toFlag: "🇬🇹",
    volumeUSD: 21000,
    gdpPercent: 20.0,
    avgFeePercent: 4.1,
    lastMile: ["Tigo Money", "Banca Rural (Efectivo)"],
    dominantPlayers: ["Western Union", "MoneyGram", "Remitly"],
    informalChannel: "Efectivo por encomiendas"
  },
  {
    id: "us-hn",
    from: "US", to: "HN",
    fromFlag: "🇺🇸", toFlag: "🇭🇳",
    volumeUSD: 9000,
    gdpPercent: 27.0,
    avgFeePercent: 4.5,
    lastMile: ["Tigo Money", "Efectivo en puntos de venta"],
    dominantPlayers: ["Western Union", "MoneyGram", "Ria"],
  },
  {
    id: "us-do",
    from: "US", to: "DO",
    fromFlag: "🇺🇸", toFlag: "🇩🇴",
    volumeUSD: 10000,
    gdpPercent: 10.0,
    avgFeePercent: 3.8,
    lastMile: ["tPago", "Vuelve", "Efectivo local"],
    dominantPlayers: ["Vimenca (Western Union)", "Caribe Express", "Remitly"],
  },
  {
    id: "us-co",
    from: "US", to: "CO",
    fromFlag: "🇺🇸", toFlag: "🇨🇴",
    volumeUSD: 11000,
    gdpPercent: 2.5,
    avgFeePercent: 3.5,
    lastMile: ["Nequi", "Daviplata", "Efecty"],
    dominantPlayers: ["Remitly", "WorldRemit", "Western Union"],
  },
  {
    id: "us-pe",
    from: "US", to: "PE",
    fromFlag: "🇺🇸", toFlag: "🇵🇪",
    volumeUSD: 4500,
    gdpPercent: 1.9,
    avgFeePercent: 3.6,
    lastMile: ["Yape", "BIM", "Cajas Municipales"],
    dominantPlayers: ["GlobalNet", "Western Union", "Jet Perú"],
  },
  {
    id: "us-br",
    from: "US", to: "BR",
    fromFlag: "🇺🇸", toFlag: "🇧🇷",
    volumeUSD: 4000,
    gdpPercent: 0.2,
    avgFeePercent: 3.0,
    lastMile: ["PIX (Cross-border)"],
    dominantPlayers: ["Wise", "Remessa Online", "Nomad"],
  },
  {
    id: "us-sv",
    from: "US", to: "SV",
    fromFlag: "🇺🇸", toFlag: "🇸🇻",
    volumeUSD: 8000,
    gdpPercent: 24.0,
    avgFeePercent: 4.2,
    lastMile: ["Chivo Wallet (Crypto/USD)", "Efectivo"],
    dominantPlayers: ["Western Union", "MoneyGram", "Ria"],
  },
  {
    id: "us-ec",
    from: "US", to: "EC",
    fromFlag: "🇺🇸", toFlag: "🇪🇨",
    volumeUSD: 4500,
    gdpPercent: 3.9,
    avgFeePercent: 3.5,
    lastMile: ["Deuna!", "Pichincha Mi Vecino"],
    dominantPlayers: ["Delgado Travel", "Western Union", "MoneyGram"],
  }
];

export type RemittanceActor = {
  id: string;
  name: string;
  category: "MTO Incumbente" | "Neoremesadora" | "Infraestructura Last-Mile" | "Canal Informal";
  description: string;
  examples: string[];
};

export const REMITTANCE_ACTORS: RemittanceActor[] = [
  {
    id: "mto",
    name: "MTOs Tradicionales",
    category: "MTO Incumbente",
    description: "Operadores tradicionales de transferencia de dinero con gran presencia de sucursales físicas para envío y recepción en efectivo.",
    examples: ["Western Union", "MoneyGram", "Ria Money Transfer"]
  },
  {
    id: "neo",
    name: "Fintechs / Neoremesadoras",
    category: "Neoremesadora",
    description: "Plataformas digitales (App/Web) que ofrecen mejores tasas de cambio y menores comisiones operando sobre rieles bancarios e infraestructura local de terceros.",
    examples: ["Remitly", "Wise", "WorldRemit", "Zepz (Sendwave)"]
  },
  {
    id: "lastmile",
    name: "Redes Last-Mile y Corresponsales",
    category: "Infraestructura Last-Mile",
    description: "Proveedores de infraestructura local, billeteras y puntos físicos en el país receptor que entregan el dinero al usuario final (bancarizado o no).",
    examples: ["Billeteras (Tigo Money, Nequi)", "Redes de Efectivo (OXXO, Farmacias)"]
  },
  {
    id: "informal",
    name: "Canales Informales (P2P)",
    category: "Canal Informal",
    description: "Sistemas peer-to-peer usados para remesas mediante triangulación de saldos o cripto, evadiendo controles formales de money transfer.",
    examples: ["Zelle (USA a cuentas US en LATAM)", "Cripto P2P (Binance P2P)", "Encomiendas físicas"]
  }
];

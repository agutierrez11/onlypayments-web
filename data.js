// data.js - Base de datos estática para el micrositio Onlypayments LATAM

const CONTRIBUTORS = [
  {
    id: "fernando",
    name: "Fernando Estévez Vázquez",
    avatar: "https://ui-avatars.com/api/?name=Fernando+Estevez&background=7c3aed&color=fff&size=100&bold=true",
    role: "Especialista en Ecosistemas de Pagos & Fintech",
    bio: "Más de 10 años de experiencia en la industria de pagos de la región. Autor del Diccionario de Medios de Pagos v6.0 y el marco interactivo '¿Quién es Quién en Pagos?'.",
    linkedin: "https://www.linkedin.com/in/fernando-estevez-vazquez/",
    verified: true,
    contributions: ["Diccionario de Medios de Pago 2.0", "¿Quién es Quién en el Ecosistema de Pagos?"]
  },
  {
    id: "antonio",
    name: "Antonio Gutiérrez",
    avatar: "https://ui-avatars.com/api/?name=Antonio+Gutierrez&background=0d9488&color=fff&size=100&bold=true",
    role: "RevOps & Growth Strategist",
    bio: "Apasionado por la optimización de flujos comerciales, conversión y la reducción de fricción en checkouts cross-border en mercados emergentes.",
    linkedin: "#",
    verified: true,
    contributions: ["Estructura del Micrositio", "Sección Comunidad Abierta"]
  }
];

const COUNTRIES = {
  MX: {
    name: "México",
    flag: "🇲🇽",
    currency: "MXN",
    description: "Mercado dominado por transferencias SPEI rápidas, pagos en efectivo (OXXO Pay) y un crecimiento acelerado de wallets digitales y BNPL.",
    mrr: "$4.2M USD est.",
    growth: "+24% YoY"
  },
  BR: {
    name: "Brasil",
    flag: "🇧🇷",
    currency: "BRL",
    description: "El gigante de pagos de LATAM. Impulsado por el éxito arrollador de PIX (y el nuevo PIX Automático) junto a esquemas locales de tarjetas y cuotas (Parcelas).",
    mrr: "$8.7M USD est.",
    growth: "+32% YoY"
  },
  CO: {
    name: "Colombia",
    flag: "🇨🇴",
    currency: "COP",
    description: "Dominado por PSE para pagos interbancarios en tiempo real, junto a redes de recaudo físico (Efecty) y billeteras móviles como Nequi y Daviplata.",
    mrr: "$2.9M USD est.",
    growth: "+19% YoY"
  },
  PE: {
    name: "Perú",
    flag: "🇵🇪",
    currency: "PEN",
    description: "Transformado por la interoperabilidad total entre billeteras móviles como Yape y Plin, que lideran la digitalización financiera del país.",
    mrr: "$1.4M USD est.",
    growth: "+28% YoY"
  },
  CL: {
    name: "Chile",
    flag: "🇨🇱",
    currency: "CLP",
    description: "Mercado con altísima bancarización. Liderado por Webpay (Transbank) y transferencias bancarias simplificadas (Khipu).",
    mrr: "$2.1M USD est.",
    growth: "+15% YoY"
  },
  AR: {
    name: "Argentina",
    flag: "🇦🇷",
    currency: "ARS",
    description: "Contexto de alta inflación que ha forzado la adopción masiva de transferencias inmediatas (Transferencias 3.0), QR interoperables y billeteras cripto.",
    mrr: "$1.8M USD est.",
    growth: "+40% YoY (nominal)"
  },
  UY: {
    name: "Uruguay",
    flag: "🇺🇾",
    currency: "UYU",
    description: "Mercado pequeño pero con alto PIB per cápita. Redes locales de cobranza física (Redpagos, Abitab) y pagos con tarjetas de débito/crédito locales.",
    mrr: "$0.5M USD est.",
    growth: "+12% YoY"
  },
  EC: {
    name: "Ecuador",
    flag: "🇪🇨",
    currency: "USD",
    description: "Economía dolarizada. Redes de corresponsales no bancarios (Banco del Barrio) y transferencias bancarias directas (Deuna!).",
    mrr: "$0.8M USD est.",
    growth: "+16% YoY"
  },
  CR: {
    name: "Costa Rica",
    flag: "🇨🇷",
    currency: "CRC",
    description: "Mercado altamente bancarizado y digital. Liderado ampliamente por el sistema de pagos instantáneos SINPE Móvil.",
    mrr: "$0.4M USD est.",
    growth: "+22% YoY"
  },
  PA: {
    name: "Panamá",
    flag: "🇵🇦",
    currency: "USD",
    description: "Centro financiero regional. Dominado por la billetera móvil Yappy (Banco General) y transacciones de tarjeta internacional.",
    mrr: "$0.6M USD est.",
    growth: "+14% YoY"
  },
  BO: {
    name: "Bolivia",
    flag: "🇧🇴",
    currency: "BOB",
    description: "Ecosistema digital en rápido crecimiento gracias a la adopción nacional de los códigos QR interoperables 'Simple'.",
    mrr: "$0.3M USD est.",
    growth: "+35% YoY"
  },
  PY: {
    name: "Paraguay",
    flag: "🇵🇾",
    currency: "PYG",
    description: "Mercado con fuerte expansión digital, dominado por el operador local Bancard y sus redes de Pago Móvil y QR.",
    mrr: "$0.3M USD est.",
    growth: "+26% YoY"
  },
  GT: {
    name: "Guatemala",
    flag: "🇬🇹",
    currency: "GTQ",
    description: "El mayor mercado de Centroamérica. Influenciado fuertemente por transferencias, billeteras como Tigo Money y remesas.",
    mrr: "$0.5M USD est.",
    growth: "+18% YoY"
  },
  DO: {
    name: "República Dominicana",
    flag: "🇩🇴",
    currency: "DOP",
    description: "Hub turístico y comercial del Caribe. Creciente digitalización bancaria liderada por la plataforma interbancaria tPago.",
    mrr: "$0.6M USD est.",
    growth: "+20% YoY"
  }
};

const PAYMENT_METHODS = {
  MX: [
    {
      name: "OXXO Pay",
      type: "Efectivo / Voucher",
      logo: "🏪",
      settlement: "D+1 a D+2",
      fee: "3.5% - 4.5% + $10 MXN",
      description: "El método de pago físico favorito. El cliente genera un código de barras de 14 dígitos en el checkout y paga en efectivo en cualquiera de las más de 20,000 tiendas OXXO del país. Conciliación en tiempo real tras el pago.",
      compliance: "Bajo riesgo de contracargo. Límites máximos por transacción de $10,000 MXN.",
      providers: ["Conekta", "Mercado Pago", "OXXO directo", "dLocal", "PayU"]
    },
    {
      name: "SPEI (Transferencia Bancaria)",
      type: "A2A (Account to Account)",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "0.5% - 1.5% o tarifa plana ($5-$10 MXN)",
      description: "Sistema de Pagos Electrónicos Interbancarios administrado por el Banco de México. Permite transferencias las 24 horas, los 7 días de la semana de forma inmediata usando una CLABE única asignada por transacción para conciliación automática.",
      compliance: "Sin contracargos. Requiere validación de origen en transacciones de alto volumen para evitar fraude/lavado.",
      providers: ["Kushki", "Conekta", "Stripe", "dLocal", "Mercado Pago"]
    },
    {
      name: "Tarjetas Locales (Carnet)",
      type: "Tarjeta de Débito/Crédito",
      logo: "💳",
      settlement: "D+1 (Débito) / D+2 (Crédito)",
      fee: "2.3% - 3.4% + $3 MXN",
      description: "Esquema local de tarjetas de débito y vales en México. Es vital soportar el procesamiento local y la redirección a Carnet para mejorar las tasas de aceptación y reducir los declives por emisores locales.",
      compliance: "Riesgo medio de contracargo. Recomendado usar 3D Secure 2.0 (3DS) para mitigar disputas.",
      providers: ["Kushki", "Conekta", "Stripe", "Adyen", "Nuvei"]
    },
    {
      name: "Kueski Pay / BNPL",
      type: "Buy Now Pay Later",
      logo: "⏳",
      settlement: "D+2",
      fee: "5.0% - 7.5%",
      description: "Líder de 'Compre ahora, pague después' en México. Permite a los clientes pagar a plazos quincenales sin necesidad de una tarjeta de crédito. Muy popular entre la población joven y no bancarizada.",
      compliance: "Kueski asume el riesgo de impago y fraude de identidad.",
      providers: ["Kueski Pay directo", "Conekta", "Yuno"]
    }
  ],
  BR: [
    {
      name: "PIX",
      type: "A2A / Pago Instantáneo",
      logo: "✨",
      settlement: "Instantáneo (segundos)",
      fee: "0.2% - 0.95% (muy bajo)",
      description: "El sistema de pago instantáneo desarrollado por el Banco Central de Brasil. Utiliza llaves (teléfono, email, CPF) o códigos QR dinámicos. Ha reemplazado casi por completo al efectivo y reduce radicalmente los costos para comercios.",
      compliance: "Sin contracargos. Límites de seguridad nocturnos impuestos por regulación del Banco Central para prevenir secuestros exprés.",
      providers: ["EBANX", "dLocal", "PagSeguro", "Cielo", "Stone", "Fitbank"]
    },
    {
      name: "PIX Automático",
      type: "A2A / Suscripción recurrente",
      logo: "🔄",
      settlement: "Instantáneo",
      fee: "0.3% - 1.0%",
      description: "Nueva funcionalidad del Banco Central para debitar facturas recurrentes de forma automática desde la cuenta del cliente (servicios públicos, suscripciones, escuelas) previa autorización única en la app bancaria del usuario.",
      compliance: "Permite cancelación del débito recurrente de forma sencilla por el usuario, evitando cargos forzados.",
      providers: ["EBANX", "Fitbank", "Banco Central do Brasil APIs"]
    },
    {
      name: "Boleto Bancário",
      type: "Cash/Voucher",
      logo: "📄",
      settlement: "D+1 a D+2",
      fee: "Tarifa fija por Boleto liquidado (R$ 2.00 - R$ 5.00)",
      description: "Documento oficial con código de barras regulado por FEBRABAN. Se puede pagar en bancos, cajeros automáticos, oficinas postales o mediante banca en línea. Sigue siendo muy relevante para pagos corporativos o compras de alto valor.",
      compliance: "Cero riesgo de contracargo. Puede presentar demoras de conciliación de hasta 48 horas hábiles.",
      providers: ["EBANX", "dLocal", "PagSeguro", "Itaú", "Bradesco"]
    },
    {
      name: "Cartão de Crédito Local",
      type: "Tarjeta de Crédito",
      logo: "💳",
      settlement: "D+30 (estándar brasileño si no se anticipa)",
      fee: "2.8% - 4.5% (tasas más altas para parcelas)",
      description: "Soporte esencial para esquemas locales como Elo e Hipercard. Los brasileños exigen pagar en cuotas ('Parcelas' de hasta 12x). Los comercios suelen anticipar los cobros cobrando tasas adicionales de descuento financiero.",
      compliance: "Riesgo alto de contracargo. El uso de herramientas de prevención de fraude locales (ej. Konduto, ClearSale) es obligatorio.",
      providers: ["Cielo", "Rede", "Stone", "Adyen", "EBANX", "dLocal"]
    }
  ],
  CO: [
    {
      name: "PSE (Pagos Seguros en Línea)",
      type: "A2A / Débito Bancario",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "Tarifa fija (COP $1,500 - $3,500) o 1.0% - 1.8%",
      description: "El sistema de débito directo que conecta más de 20 bancos colombianos en una sola interfaz. El cliente es redirigido a su banca virtual para autorizar el débito en tiempo real. Indispensable en cualquier ecommerce en Colombia.",
      compliance: "Cero riesgo de contracargo. Alto nivel de seguridad provisto directamente por los bancos.",
      providers: ["Wompi", "PayU", "Mercado Pago", "Bold", "Kushki", "Placetopay"]
    },
    {
      name: "Nequi / Daviplata",
      type: "Billetera Móvil",
      logo: "📱",
      settlement: "Inmediato",
      fee: "1.0% - 2.0%",
      description: "Las dos billeteras móviles más grandes del país (Nequi de Bancolombia y Daviplata de Davivienda). Soportan pagos vía número de celular, notificaciones push de cobro directo y lectura de códigos QR.",
      compliance: "Bajo riesgo de fraude. Límites mensuales regulados por topes de cuentas de trámite simplificado (cerca de 8 millones de COP).",
      providers: ["Wompi", "PayU", "Mercado Pago", "Bold", "Nequi directo"]
    },
    {
      name: "Efecty / Vía Baloto",
      type: "Efectivo / Redes físicas",
      logo: "🏪",
      settlement: "D+1",
      fee: "3.0% - 4.0%",
      description: "Puntos de recaudación física distribuidos por todo el territorio colombiano. El cliente acude al punto físico con un número de convenio y referencia y realiza el pago en efectivo.",
      compliance: "Cero contracargos. Muy útil para llegar a segmentos rurales y no bancarizados.",
      providers: ["Efecty directo", "PayU", "dLocal", "Mercado Pago"]
    },
    {
      name: "Addi",
      type: "BNPL / Financiamiento",
      logo: "⏳",
      settlement: "D+1",
      fee: "4.5% - 6.0%",
      description: "Buy Now Pay Later líder en Colombia. Otorga préstamos de consumo instantáneos a plazos en el checkout sin requerir tarjetas. Muy alto incremento del ticket promedio del comercio.",
      compliance: "Addi gestiona el cobro y asume el riesgo de cartera vencida.",
      providers: ["Addi API directo", "Mercado Pago", "PayU"]
    }
  ],
  PE: [
    {
      name: "Yape",
      type: "Billetera Móvil / A2A",
      logo: "📱",
      settlement: "Inmediato",
      fee: "2.5% - 3.0%",
      description: "Billetera móvil insignia del Banco de Crédito del Perú (BCP). Cuenta con más de 12 millones de usuarios. Permite transferencias rápidas escaneando códigos QR Yape o ingresando el número de celular del destinatario.",
      compliance: "Interoperable con Plin. Límites diarios de envío y recepción de hasta S/ 950 por cuenta estándar.",
      providers: ["Culqi", "Niubiz", "Kushki", "Izi Pay", "Yape para empresas"]
    },
    {
      name: "Plin",
      type: "Billetera Móvil / A2A",
      logo: "💚",
      settlement: "Inmediato",
      fee: "2.5% - 3.0%",
      description: "Billetera móvil de BBVA, Interbank y Scotiabank. Funciona integrándose directamente dentro de las aplicaciones móviles bancarias de los bancos asociados. Ahora 100% interoperable con Yape.",
      compliance: "Sin contracargos. La verificación se realiza por token SMS en el app del banco.",
      providers: ["Niubiz", "Culqi", "Izi Pay", "Mercado Pago"]
    },
    {
      name: "PagoEfectivo",
      type: "Efectivo / Código CIP",
      logo: "🏪",
      settlement: "D+1",
      fee: "3.5% - 4.5%",
      description: "Permite comprar por internet y pagar mediante banca por internet, banca móvil o de forma presencial en bodegas, agentes y agencias autorizadas a través de un código CIP único de pago.",
      compliance: "Ideal para ecommerce sin riesgo de contracargos de tarjetas.",
      providers: ["PagoEfectivo directo (Grupo El Comercio)", "dLocal", "Kushki"]
    }
  ],
  CL: [
    {
      name: "Webpay Plus (Transbank)",
      type: "Gateway / Red de Tarjetas",
      logo: "💳",
      settlement: "D+1 (Débito) / D+2 (Crédito)",
      fee: "1.2% - 1.8% (Débito) / 2.2% - 3.0% (Crédito)",
      description: "El portal de pagos dominante en Chile, operado históricamente por Transbank. Conecta todas las tarjetas de débito (Redcompra), crédito y prepago del país bajo un flujo de autenticación obligatoria (Webpay OneClick).",
      compliance: "Implementación de 3DS obligatoria. Tasas muy bajas de contracargo gracias a la autenticación bancaria de dos factores.",
      providers: ["Transbank", "Flow", "Pago Fácil", "Mercado Pago"]
    },
    {
      name: "Khipu",
      type: "A2A / Pago por Transferencia",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "1.0% - 1.5%",
      description: "Servicio de automatización de transferencias bancarias simplificado. Utiliza una interfaz intuitiva para guiar al usuario a realizar una transferencia electrónica directa de forma segura y veloz.",
      compliance: "Opera como un iniciador de pagos seguro sin almacenar credenciales de banca en línea.",
      providers: ["Khipu directo", "Flow", "Yuno"]
    },
    {
      name: "MACH",
      type: "Billetera Digital / Prepago",
      logo: "📱",
      settlement: "Inmediato",
      fee: "1.5% - 2.5%",
      description: "Billetera virtual prepago respaldada por el Banco Bci. Muy popular en el público joven chileno para compras en línea e internacionales sin tener tarjeta de crédito tradicional.",
      compliance: "Bajo riesgo. Opera bajo el esquema de prepago regulado por la CMF.",
      providers: ["MACH directo", "Flow", "Mercado Pago"]
    },
    {
      name: "Cuenta RUT / Débito BancoEstado",
      type: "Tarjeta de Débito local",
      logo: "🇨🇱",
      settlement: "D+1",
      fee: "1.2% - 1.8%",
      description: "La cuenta vista más extendida de Chile (más de 13 millones de usuarios). Funciona como tarjeta de débito local. Es indispensable para habilitar el comercio masivo.",
      compliance: "Opera bajo rieles estándar de tarjeta de débito pero con límites máximos de saldo más bajos.",
      providers: ["Transbank (Webpay)", "Flow", "Mercado Pago"]
    }
  ],
  AR: [
    {
      name: "Transferencias 3.0 (PCT)",
      type: "A2A / Pago Instantáneo",
      logo: "✨",
      settlement: "Inmediato",
      fee: "0.8% (máximo regulado)",
      description: "Iniciativa del Banco Central de la República Argentina (BCRA) para crear un ecosistema interoperable de transferencias instantáneas (Pagos con Transferencia). Permite abonar mediante códigos QR desde cualquier billetera bancaria o fintech.",
      compliance: "Sin contracargos. Muy ventajoso debido al bajísimo arancel y liquidación inmediata para el comercio en época inflacionaria.",
      providers: ["Mercado Pago", "Ualá Bis", "Prisma (Payway)", "dLocal"]
    },
    {
      name: "Mercado Pago Wallet",
      type: "Billetera Digital",
      logo: "📱",
      settlement: "Inmediato",
      fee: "0.99% - 3.99% (varía según plazo de cobro)",
      description: "La billetera digital dominante en Argentina. Permite pagar con saldo en cuenta, tarjetas asociadas, Mercado Crédito o escaneando QR. Su penetración es masiva tanto en comercio online como físico.",
      compliance: "Mecanismos internos robustos de prevención de fraude basados en el perfil del usuario de Mercado Libre.",
      providers: ["Mercado Pago directo"]
    },
    {
      name: "Pago Fácil / Rapipago",
      type: "Efectivo / Voucher",
      logo: "🏪",
      settlement: "D+1",
      fee: "3.0% - 4.5%",
      description: "Redes extrabancarias de cobro en efectivo. El usuario acude a las sucursales con una boleta física o digital para liquidar su compra online.",
      compliance: "Cero contracargo. Muy sensible a la inflación y devaluación si hay demoras de pago por el cliente.",
      providers: ["dLocal", "PayU", "Mercado Pago"]
    }
  ],
  UY: [
    {
      name: "Redpagos / Abitab",
      type: "Efectivo / Redes locales",
      logo: "🏪",
      settlement: "D+1",
      fee: "3.5% - 4.5%",
      description: "Redes físicas de pagos en Uruguay con cobertura nacional. El cliente emite un voucher digital y paga en efectivo en las ventanillas de estas tiendas. Muy utilizado para pagos de servicios públicos y ecommerce.",
      compliance: "Sin riesgo de contracargo. Excelente opción de inclusión financiera en el país.",
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
      description: "La billetera móvil impulsada por el Banco Pichincha, el banco más grande de Ecuador. Permite transferir dinero a cualquier persona con su número celular o escaneando QRs de comercios locales en dólares.",
      compliance: "Sin contracargos. Límites diarios de transferencia y alta adopción en el sector informal y micropagos.",
      providers: ["Banco Pichincha directo", "Kushki"]
    },
    {
      name: "Banco del Barrio",
      type: "Corresponsal No Bancario",
      logo: "🏪",
      settlement: "D+1",
      fee: "2.0% - 3.0%",
      description: "Red de corresponsales no bancarios del Banco Guayaquil. Permite a los usuarios realizar depósitos y pagos de compras online en efectivo en tiendas de barrio autorizadas.",
      compliance: "Cero riesgo de contracargo. Excelente capilaridad en zonas rurales.",
      providers: ["Banco Guayaquil directo", "Kushki"]
    }
  ],
  CR: [
    {
      name: "SINPE Móvil",
      type: "A2A / Transferencia Móvil",
      logo: "⚡",
      settlement: "Inmediato",
      fee: "Tarifa plana muy baja ($0.10 - $0.50 USD) o gratis",
      description: "El sistema de transferencias interbancarias en tiempo real líder en Costa Rica. El usuario asocia su cuenta bancaria a su número de teléfono y puede realizar pagos inmediatos desde la app de su banco.",
      compliance: "Cero contracargo. Muy seguro. Límites diarios por cuenta para evitar fraudes.",
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
      description: "Billetera digital y canal de pago de Banco General que se ha convertido en el estándar de pagos interpersonales y comerciales en Panamá. Permite enviar dinero y pagar usando el número de celular del comercio.",
      compliance: "Sin contracargos. Fuerte control contra el fraude mediante doble factor en el app bancario.",
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
      description: "La solución nacional interoperable de códigos QR en Bolivia. Permite a los clientes pagar escaneando el código QR de un comercio desde cualquier aplicación bancaria boliviana.",
      compliance: "Transferencia directa de cuenta a cuenta sin riesgo de disputas de tarjetas.",
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
      description: "La plataforma de cobros del procesador local Bancard en Paraguay. Permite pagar facturas, servicios y compras online mediante tarjetas nacionales de débito/crédito o transferencia.",
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
      description: "Billetera móvil y servicio de dinero electrónico muy extendido en Guatemala para la población no bancarizada. Permite recargas, retiros físicos y pagos online.",
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
      description: "Plataforma que vincula las cuentas bancarias de los principales bancos de República Dominicana a los teléfonos móviles de los usuarios para realizar transferencias y compras en segundos.",
      compliance: "Requiere autenticación robusta mediante PIN tPago en el celular.",
      providers: ["Banco Popular", "Banreservas", "tPago directo"]
    }
  ]
};

const NEWS = [
  {
    id: 1,
    title: "El Banco Central de Brasil anuncia la fecha definitiva para PIX Automático",
    summary: "La esperada funcionalidad de cobros recurrentes automáticos entrará en vigor en junio de 2026. Promete revolucionar los cobros de servicios y suscripciones desplazando a las tarjetas.",
    content: "El Banco Central de Brasil (BCB) ha confirmado que PIX Automático estará disponible para el público a partir de junio de 2026. Esta herramienta permitirá a las empresas facturar servicios recurrentes (como luz, agua, escuelas, suscripciones y seguros) debitando directamente de la cuenta del usuario de forma inmediata y automática, sin necesidad de emitir boletos o procesar tarjetas de crédito. A diferencia del débito automático tradicional, PIX Automático tendrá un estándar tecnológico abierto y democratizará los cobros recurrentes con tarifas mucho menores que las redes de tarjetas.",
    tag: "Brasil",
    subtag: "Regulación",
    date: "16 de Julio, 2026",
    reads: "1,240",
    author: "Fernando Estévez Vázquez"
  },
  {
    id: 2,
    title: "Interoperabilidad de QRs en Perú: Yape y Plin completan su integración total",
    summary: "Se elimina la fricción de transferencias interbancarias móviles en Perú. Ahora cualquier comercio con Yape puede recibir pagos de Plin y viceversa sin comisiones adicionales.",
    content: "La interoperabilidad de billeteras en Perú entra en su fase de madurez total. Las dos plataformas líderes, Yape (BCP) y Plin (BBVA, Interbank, Scotiabank), han completado la integración técnica mandated por el Banco Central de Reserva del Perú (BCRP). Esta interoperabilidad ha catalizado la digitalización de más de 15 millones de peruanos, integrando comercios informales y permitiendo transacciones interbancarias en segundos sin costo para el usuario de a pie.",
    tag: "Regulación",
    subtag: "Perú",
    date: "12 de Julio, 2026",
    reads: "850",
    author: "Redacción Onlypayments"
  },
  {
    id: 3,
    title: "Stablecoins de cara al cross-border: PYUSD y USDC crecen en el mercado de remesas en México",
    summary: "El volumen de remesas procesadas usando stablecoins de bajo costo en la frontera EUA-México alcanza un nuevo récord histórico impulsado por las tarifas planas de red de capa 2.",
    content: "Las stablecoins como USDC y PayPal USD (PYUSD) sobre redes de capa 2 (L2) como Base y Solana están ganando tracción masiva en los corredores de remesas cross-border entre Estados Unidos y México. Al operar con comisiones inferiores a $0.05 USD y liquidar en menos de 10 segundos, los intermediarios financieros y Fintechs están reemplazando a las redes tradicionales de remesas (como Western Union o remesas bancarias) ofreciendo un mejor tipo de cambio al cliente final.",
    tag: "Cripto",
    subtag: "México",
    date: "8 de Julio, 2026",
    reads: "1,100",
    author: "Antonio Gutiérrez"
  },
  {
    id: 4,
    title: "BNPL bajo la lupa regulatoria en Colombia y Chile: ¿Crédito de consumo encubierto?",
    summary: "Las autoridades financieras debaten si regular las plataformas de compre ahora y pague después como entidades crediticias tradicionales ante el alza en los niveles de endeudamiento juvenil.",
    content: "Los servicios de Buy Now Pay Later (BNPL) como Addi en Colombia o Kueski en México se encuentran bajo el radar de las superintendencias financieras. Se debate si estas facilidades que no exigen tarjeta deben cumplir con las mismas regulaciones de protección al consumidor y reporte de historial crediticio que la banca tradicional, en un intento de evitar el sobreendeudamiento en poblaciones de bajos recursos.",
    tag: "BNPL",
    subtag: "Regulación",
    date: "3 de Julio, 2026",
    reads: "620",
    author: "Fernando Estévez Vázquez"
  }
];

const ECOSYSTEM_ACTORS = [
  {
    id: 1,
    title: "1. Tarjetahabiente (User)",
    role: "Inicia el pago",
    description: "El comprador final que posee la tarjeta de crédito o débito emitida por su banco local y desea realizar una transacción de compra en el comercio."
  },
  {
    id: 2,
    title: "2. Comercio (Merchant)",
    role: "Vendedor de bienes/servicios",
    description: "El negocio que ofrece el producto y solicita el pago a través de su plataforma online o tienda física."
  },
  {
    id: 3,
    title: "3. Gateway de Pagos",
    role: "El transportador seguro de datos",
    description: "El software que captura y encripta de forma segura los datos de la tarjeta en el checkout del comercio y los envía a los procesadores/adquirentes. Ej: Stripe, Conekta, Kushki."
  },
  {
    id: 4,
    title: "4. Adquirente / Procesador",
    role: "El banco cobrador",
    description: "La institución financiera que procesa la transacción en nombre del comercio, solicitando la autorización al emisor a través de la marca de tarjeta. Ej: Getnet, Rede, Cielo, BBVA."
  },
  {
    id: 5,
    title: "5. Red de Tarjetas (Scheme)",
    role: "La red de comunicación",
    description: "La marca que conecta a los adquirentes y emisores en todo el mundo, dictando las reglas operativas y de seguridad. Ej: Visa, Mastercard, American Express, Carnet."
  },
  {
    id: 6,
    title: "6. Banco Emisor (Issuer)",
    role: "El dueño del dinero del usuario",
    description: "El banco que otorgó la tarjeta al tarjetahabiente. Verifica si hay fondos suficientes, si la transacción no es fraude y aprueba o rechaza el cobro."
  },
  {
    id: 7,
    title: "7. Agregador / PSP / PayFac",
    role: "Simplificador de afiliación",
    description: "Empresa que facilita a los comercios cobrar con tarjeta sin que tengan que contratar una terminal directamente con un banco adquirente tradicional. Ej: Clip, Mercado Pago, dLocal."
  },
  {
    id: 8,
    title: "8. Orquestador de Pagos",
    role: "Ruteador inteligente multiterminal",
    description: "Plataforma tecnológica que conecta al comercio con múltiples adquirentes y gateways simultáneamente para enrutar cada transacción al procesador con mayor probabilidad de aceptación y menor costo."
  }
];

const INITIAL_POSTS = [
  {
    id: "post-1",
    title: "¿PIX Automático va a matar a las Tarjetas de Crédito en Brasil para suscripciones?",
    body: "Con el lanzamiento de PIX Automático para 2026, veo muy difícil que los brasileños sigan usando sus tarjetas de crédito para servicios recurrentes (Netflix, gimnasio, luz). La comisión es ínfima para el comercio (cerca de 0.5% vs 3.5% de tarjeta) y el usuario no ocupa cupo/límite de su tarjeta de crédito. ¿Ustedes qué opinan?",
    author: "Fernando Estévez",
    authorTitle: "Colaborador Destacado",
    tag: "Opinión",
    country: "🇧🇷 Brasil",
    upvotes: 42,
    commentsCount: 7,
    comments: [
      {
        id: "c1-1",
        author: "Pedro S.",
        body: "Totalmente de acuerdo. En Brasil la penetración de PIX es ridícula. Lo único que salvaba a las tarjetas era la conveniencia de no tener que hacer el pago manual cada mes. Con el débito recurrente automatizado nativo de PIX, la tarjeta solo se usará para financiar compras grandes.",
        time: "Hace 16 horas",
        upvotes: 12
      },
      {
        id: "c1-2",
        author: "Lucia M. (Fintech Product)",
        body: "Ojo con el tema de la reversión de cargos. Las tarjetas tienen procesos de chargeback muy consolidados que dan seguridad al usuario ante estafas. Si PIX Automático no tiene un esquema de protección fuerte al comprador, la gente dudará en usarlo en comercios no tan conocidos.",
        time: "Hace 14 horas",
        upvotes: 9
      },
      {
        id: "c1-3",
        author: "Thiago Silva",
        body: "Como comercio brasileño, estoy ansioso. Tarjetas de crédito nos cuestan caro y los contracargos injustificados son un dolor de cabeza. PIX Automático va a cambiar las reglas del juego.",
        time: "Hace 8 horas",
        upvotes: 5
      }
    ],
    time: "Hace 18 horas"
  },
  {
    id: "post-2",
    title: "¿Cuáles son las tasas de conversión reales de PSE en Colombia comparado con Tarjetas?",
    body: "Estoy optimizando un checkout para Colombia. Actualmente convertimos un 68% con Tarjeta de Crédito, pero PSE se nos cae mucho a nivel de pasarela por abandonos en el portal del banco del usuario. ¿Es normal tener tasas del 55%-60% en PSE debido a los redirects?",
    author: "Antonio Gutiérrez",
    authorTitle: "Colaborador",
    tag: "Pregunta",
    country: "🇨🇴 Colombia",
    upvotes: 28,
    commentsCount: 4,
    comments: [
      {
        id: "c2-1",
        author: "Esteban R. (PayFac)",
        body: "Sí, es normal. La fricción del redirect de PSE es legendaria: el usuario debe registrarse en PSE, luego elegir el banco, luego autenticarse en su banco (a veces con token físico o SMS) y finalmente pagar. Billeteras como Nequi/Daviplata por cobro push están convirtiendo mucho mejor (hasta 75%-80%) para tickets medianos/bajos.",
        time: "Hace 1 día",
        upvotes: 15
      },
      {
        id: "c2-2",
        author: "Juliana Medina",
        body: "A nosotros nos ayudó colocar un minitutorial visual antes de redirigir a PSE. Le explicamos al cliente qué datos va a necesitar de su banco. Subimos 5 puntos la conversión.",
        time: "Hace 18 horas",
        upvotes: 7
      }
    ],
    time: "Hace 1 día"
  },
  {
    id: "post-3",
    title: "Stablecoins como riel de liquidación B2B para evitar controles cambiarios en Argentina",
    body: "Para importadores y exportadores de servicios en Argentina, el riel de stablecoins (USDT/USDC) se ha convertido en el estándar de facto ante las trabas cambiarias y brecha de divisas. ¿Qué pasarelas de pago recomiendan para automatizar la facturación local en pesos pero liquidación final en cripto?",
    author: "Martin P. (SaaS Founder)",
    authorTitle: "Miembro",
    tag: "Análisis",
    country: "🇦🇷 Argentina",
    upvotes: 35,
    commentsCount: 3,
    comments: [
      {
        id: "c3-1",
        author: "Carlos Lopez",
        body: "Recomiendo revisar Bitso Business o plataformas como dLocal que están explorando liquidaciones Web3. El cumplimiento KYC/KYB y la facturación fiscal local es lo más delicado para que el comercio esté en regla.",
        time: "Hace 2 días",
        upvotes: 11
      }
    ],
    time: "Hace 2 días"
  }
];

const PAYMENT_PROVIDERS = {
  REGIONAL: [
    { name: "dLocal", role: "Agregador Regional / PayFac", countries: "Uruguay, Brasil, México, Colombia, Chile, Argentina, Perú", desc: "Infraestructura unificada de cobros y dispersiones (payouts) para mercados emergentes. Permite recibir pagos locales y liquidar cross-border con una única integración." },
    { name: "EBANX", role: "Agregador Regional / Procesador", countries: "Brasil, México, Colombia, Chile, Argentina, Perú, Ecuador", desc: "Especialista en conectar comercios globales con métodos de pago locales en LATAM. Fuerte foco en adquirencia local y procesamiento cross-border." },
    { name: "Mercado Pago", role: "Agregador / Billetera Digital", countries: "Argentina, Brasil, México, Colombia, Chile, Perú", desc: "El ecosistema fintech más grande de la región. Ofrece pasarela de pagos web, links de cobro, procesamiento físico y cobro mediante su propia wallet." },
    { name: "PayU", role: "Gateway / Agregador", countries: "Colombia, México, Brasil, Argentina, Chile, Perú", desc: "Pionera en el procesamiento de pagos en LATAM. Ofrece robustez en procesamiento de tarjetas locales, efectivo y transferencias bajo un modelo agregador." },
    { name: "Stripe", role: "Gateway / Adquirente", countries: "México, Brasil (Soporte local); Resto de LATAM (Cross-border)", desc: "El estándar tecnológico para cobros online. En MX y BR opera como adquirente y gateway directo ofreciendo una de las mejores APIs del mundo." },
    { name: "Adyen", role: "Adquirente Global / Pasarela", countries: "Brasil, México (Local); Regional (Global)", desc: "Infraestructura de pagos de extremo a extremo que conecta directamente con Visa, Mastercard y métodos clave globales. Ideal para grandes multinacionales." }
  ],
  MX: [
    { name: "Openpay", role: "Pasarela / Agregador (BBVA)", countries: "México", desc: "Propiedad de BBVA. Destaca por su altísima tasa de aprobación local en tarjetas de débito/crédito y su red de cobranza en efectivo Paynet." },
    { name: "Conekta", role: "Agregador de Pagos", countries: "México", desc: "Especialista en habilitar pagos con tarjeta y efectivo offline mediante OXXO Pay. Muy enfocada en simplificar el compliance y contracargos." },
    { name: "Clip", role: "Agregador físico mPOS & Online", countries: "México", desc: "Líder indiscutible de cobros presenciales para pymes. Ha expandido su suite a enlaces de pago online y pasarelas de ecommerce simplificadas." },
    { name: "NetPay", role: "Gateway & Procesador", countries: "México", desc: "Ofrece terminales inteligentes (SmartPOS) y pasarela de cobro web orientada tanto a minoristas como a grandes corporativos." },
    { name: "Fiserv México", role: "Adquirente tradicional", countries: "México", desc: "Procesamiento de pagos masivo y adquirencia directa para grandes empresas y corporativos multinacionales." },
    { name: "Kueski Pay", role: "Proveedor BNPL", countries: "México", desc: "El mayor emisor de préstamos BNPL (Buy Now Pay Later) en México. Asume todo el riesgo crediticio del usuario, incrementando las ventas del comercio." }
  ],
  BR: [
    { name: "PagBank", role: "Adquirente / Wallet (antiguo PagSeguro)", countries: "Brasil", desc: "Uno de los pioneros de la agregación de pagos. Ofrece adquirencia, procesamiento de tarjetas locales brasileñas y una de las cuentas digitales más usadas." },
    { name: "Stone", role: "Adquirente e Infraestructura", countries: "Brasil", desc: "Líder en cobros físicos y pasarelas en e-commerce. Posee un fuerte servicio de atención al cliente y herramientas robustas de conciliación." },
    { name: "Cielo", role: "Adquirente tradicional", countries: "Brasil", desc: "La red de procesamiento de tarjetas y pasarela más grande del país. Conecta directamente con la banca tradicional brasileña." },
    { name: "Rede", role: "Adquirente (Itaú)", countries: "Brasil", desc: "Procesador oficial del Banco Itaú. Ofrece tarifas competitivas y alta tasa de aceptación para tarjetas de crédito nacionales." },
    { name: "Asaas", role: "Automatización de cobros", countries: "Brasil", desc: "Plataforma especializada en la gestión de cobros recurrentes y facturación automática mediante Pix y Boleto Bancário." },
    { name: "PicPay", role: "Billetera Digital y Pagos", countries: "Brasil", desc: "Billetera digital con más de 30 millones de usuarios. Permite transferencias inmediatas y pagos con código QR integrados en e-commerce." }
  ],
  CO: [
    { name: "Wompi", role: "Pasarela / Agregador (Bancolombia)", countries: "Colombia", desc: "La pasarela oficial de Bancolombia. Ofrece la mejor conversión para cuentas de Bancolombia, botón PSE directo, Nequi y tarjetas de crédito." },
    { name: "Bold", role: "Agregador Pyme", countries: "Colombia", desc: "Revolucionó el cobro móvil (datáfonos) en Colombia y ahora ofrece pasarela de cobro web simplificada y botones de PSE." },
    { name: "ePayco (Payco)", role: "Agregador y Pasarela", countries: "Colombia", desc: "Suite muy completa de herramientas de cobro para desarrolladores y pymes: cobro por redes sociales, emails, links y API." },
    { name: "Tucompra", role: "Pasarela Corporativa", countries: "Colombia", desc: "Una de las pasarelas pioneras. Especializada en grandes volúmenes transaccionales y pasarelas a la medida para corporaciones." },
    { name: "Placetopay", role: "Procesador (Evertec)", countries: "Colombia, Ecuador", desc: "Propiedad del gigante tecnológico Evertec. Muy utilizada por aerolíneas, universidades y grandes retailers por su seguridad certificada." }
  ],
  AR: [
    { name: "Payway", role: "Adquirente e Infraestructura (Prisma)", countries: "Argentina", desc: "La red principal que procesa la mayoría de las marcas de tarjetas del país y gestiona la interoperabilidad del código QR MODO." },
    { name: "Naranja X", role: "Emisor y Agregador local", countries: "Argentina", desc: "Gran arraigo en el interior del país. Ofrece herramientas de cobro físico (Toque) y pasarelas integradas para tarjetas locales." },
    { name: "Ualá Bis", role: "Agregador de Pagos (Ualá)", countries: "Argentina", desc: "La división de cobros de la fintech Ualá. Permite cobrar online y físico liquidando los fondos al instante en la cuenta de Ualá." },
    { name: "Mobbex", role: "Agregador flexible", countries: "Argentina", desc: "Permite una configuración muy ágil de promociones y planes de cuotas bancarias o fintechs (ej. Ahora 12) bajo una sola API." },
    { name: "Getnet Argentina", role: "Adquirente (Santander)", countries: "Argentina", desc: "La solución global de adquirencia del Banco Santander. Permite cobrar con QR, links de pago y datáfonos integrados." }
  ],
  CL: [
    { name: "Transbank", role: "Adquirente histórico", countries: "Chile", desc: "El operador que históricamente monopolizó el procesamiento de tarjetas en Chile. Maneja Webpay, Webpay OneClick y Redcompra." },
    { name: "Getnet Chile", role: "Adquirente competidor (Santander)", countries: "Chile", desc: "La alternativa de Santander que introdujo el modelo de 4 partes en Chile rompiendo el monopolio de Transbank." },
    { name: "Mercado Pago Chile", role: "Agregador / Billetera", countries: "Chile", desc: "Emisor de tarjetas de prepago digitales e integrador de pasarela de checkout rápido para miles de comercios chilenos." },
    { name: "Pago Fácil", role: "Gateway e Integrador", countries: "Chile", desc: "Muy popular por sus plugins prediseñados para Shopify, WooCommerce y PrestaShop, simplificando la burocracia de Transbank." },
    { name: "Flow", role: "Agregador de pagos", countries: "Chile", desc: "Permite recibir transferencias bancarias simplificadas, Webpay y tarjetas comerciales en una sola cuenta sin contratos complejos." }
  ],
  PE: [
    { name: "Niubiz", role: "Adquirente y Gateway Principal", countries: "Perú", desc: "Anteriormente VisaNet Perú. Es el procesador más grande del país, gestionando tarjetas de crédito/débito y la infraestructura de pagos QR." },
    { name: "IziPay", role: "Adquirente multimarca", countries: "Perú", desc: "Nació para unificar el procesamiento de Visa y Mastercard en una sola terminal física. Ofrece pasarela web y links de cobro." },
    { name: "Culqi", role: "Gateway y Agregador", countries: "Perú", desc: "Plataforma de pagos nativa digital del Grupo Credicorp. Muy valorada por los desarrolladores por la simplicidad de sus APIs y librerías." },
    { name: "PagoEfectivo", role: "Líder de efectivo offline", countries: "Perú", desc: "Permite a los usuarios realizar pagos de compras en línea mediante un código de pago CIP en miles de agentes físicos del país." }
  ],
  REST: [
    { name: "Kushki", role: "Orquestador / Adquirente regional", countries: "Ecuador, Colombia, México, Chile, Perú", desc: "Nacida en Ecuador y expandida a toda la región. Opera como adquirente no bancario regional y orquestador tecnológico masivo." },
    { name: "Payphone", role: "Billetera Digital y Pasarela", countries: "Ecuador", desc: "Billetera digital ecuatoriana que permite procesar cobros con tarjeta y saldo móvil reduciendo radicalmente el contracargo." },
    { name: "Bamboo Payment Systems", role: "Procesador cross-border", countries: "Uruguay, Colombia, Perú, Chile", desc: "Especialista en procesamiento de pagos recurrentes y cobros locales en el cono sur para empresas globales." },
    { name: "BAC Credomatic", role: "Adquirente líder", countries: "Centroamérica (CR, PA, GT, SV, HN)", desc: "El banco adquirente y procesador de pagos físicos y digitales más grande de Centroamérica, con soporte multimoneda." },
    { name: "PixelPay", role: "Gateway y Pasarela de pagos", countries: "Honduras, Guatemala, El Salvador", desc: "La plataforma de pagos moderna de Centroamérica para comercio electrónico, conectada con adquirencia local." },
    { name: "Pagadito", role: "Agregador y pasarela de cobros", countries: "Centroamérica, Panamá", desc: "Permite a comercios centroamericanos vender en línea sin poseer cuentas merchant directas mediante una cuenta agregadora." }
  ]
};

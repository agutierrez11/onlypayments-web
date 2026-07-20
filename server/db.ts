import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertGuide, InsertNews, InsertPaymentStack, InsertSubscriber, InsertUser, InsertCommunityPost, InsertCommunityComment, guides, news, paymentStacks, subscribers, users, communityPosts, communityComments } from "../drizzle/schema";
import { ENV } from './_core/env';
import fs from 'fs';
import path from 'path';
import { getCoordinates } from '../shared/countryCoordinates';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ── MEMORIA DE RESPALDO LOCAL PARA DESARROLLO SIN BASE DE DATOS ──

const localUsers: any[] = [];
const localNews: any[] = [
  {
    id: 1,
    title: "PIX Automático revolucionará los pagos recurrentes en Brasil en 2026",
    summary: "El Banco Central de Brasil prepara el lanzamiento del Pix Automático, diseñado para reemplazar los débitos automáticos y simplificar el cobro recurrente para SaaS y suscripciones con aranceles inferiores al 0.5%.",
    content: "El Banco Central de Brasil ha confirmado los detalles técnicos del Pix Automático, programado para iniciar operaciones masivas. Esta funcionalidad permitirá a empresas cobrar servicios recurrentes de forma automatizada previa autorización del usuario, compitiendo directamente con las tarjetas de crédito y reduciendo la fricción en el checkout.",
    impactAndTools: "## Impacto para SaaS y Suscripciones\n- **Costo de transacción:** Reducción drástica del fee de procesamiento (promedio 0.4% vs 2.5% de tarjeta).\n- **Tasa de aprobación:** Cero riesgo de tarjetas vencidas o robadas, lo que reduce el churn involuntario.\n\n## Pasarelas recomendadas:\n- **dLocal:** Ya cuenta con soporte Beta de Pix Automático para integraciones regionales.\n- **Asaas:** API brasileña especializada en automatización de cobranza con Pix y Boleto.",
    sourceUrl: "https://www.bcb.gov.br/",
    imageUrl: "",
    publishedAt: new Date(2026-7-10),
    country: "Brasil",
    category: "A2A",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: "México impulsa DiMo: Transferencias interbancarias vinculadas al celular",
    summary: "El Banco de México reporta un aumento del 45% en transacciones mediante DiMo (Dinero Móvil), el riel de pago que simplifica SPEI permitiendo enviar fondos con solo ingresar el número de teléfono del destinatario.",
    content: "DiMo se consolida como una de las iniciativas clave de inclusión financiera. Al asociar la clave CLABE de 18 dígitos al número móvil del usuario, las transacciones se realizan en menos de 5 segundos, reduciendo la dependencia del efectivo en comercios minoristas y retail.",
    impactAndTools: "## Beneficios Clave\n- **Simplicidad:** Los clientes no necesitan recordar números CLABE extensos.\n- **Gratuidad:** Sin costos transaccionales para transferencias de bajo monto.\n\n## Herramientas para Comercios\n- **Openpay & Conekta:** Cuentan con SDKs para integrar links de cobro asociados a SPEI y flujos de conciliación automática en tiempo real.",
    sourceUrl: "https://www.banxico.org.mx/",
    imageUrl: "",
    publishedAt: new Date(2026-7-12),
    country: "México",
    category: "A2A",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: "Regulación de interoperabilidad QR en Colombia: El rol del Banco de la República",
    summary: "El Banco de la República de Colombia emitió la circular reglamentaria que obliga a la interoperabilidad total de los códigos QR bancarios y fintech a nivel nacional, unificando rieles de pago.",
    content: "La nueva normativa exige a los actores del ecosistema financiero (bancos, pasarelas de pago y billeteras digitales como Nequi y Daviplata) permitir la lectura cruzada de códigos QR. Esto facilitará que cualquier usuario pague en cualquier comercio sin importar la aplicación bancaria de origen.",
    impactAndTools: "## Impacto Regulatorio\n- **Competencia justa:** Fin de los ecosistemas cerrados que monopolizaban ciertos comercios.\n- **Reducción de aranceles:** El Banco Central regulará las tasas de intercambio máximas para transferencias inmediatas.\n\n## Pasarelas de Integración\n- **Wompi (Grupo Bancolombia):** Pasarela que ya unifica botones de cobro PSE, Nequi y QRs interoperables locales.",
    sourceUrl: "https://www.banrep.gov.co/",
    imageUrl: "",
    publishedAt: new Date(2026-7-14),
    country: "Colombia",
    category: "regulación",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const localPaymentStacks: any[] = [
  {
    id: 1,
    name: "SaaS B2B en México",
    description: "Stack ideal para plataformas de suscripción orientadas a empresas en México. Combina procesamiento global y facturación fiscal automatizada.",
    country: "México",
    businessModel: "SaaS",
    components: "### Arquitectura de Pagos Recomendada\n1. **Procesador Principal:** [Stripe México](https://stripe.com/mx) para suscripciones con tarjeta y tokenización segura.\n2. **Riel Alternativo:** [SPEI (vía Stripe o Openpay)](https://openpay.mx) para clientes corporativos que prefieren transferencias interbancarias directas de altos montos.\n3. **Facturación Fiscal (CFDI):** Integración con [Facturama](https://facturama.mx) o [Finkargo] para la emisión automatizada de facturas XML y PDF requeridas por el SAT tras cada cobro exitoso.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "E-commerce Masivo en Brasil",
    description: "Estructura optimizada para comercios electrónicos de alto volumen en el mercado brasileño con foco en Pix y cuotas bancarias.",
    country: "Brasil",
    businessModel: "e-commerce",
    components: "### Arquitectura de Pagos Recomendada\n1. **Core Gateway:** [Adyen Brasil](https://www.adyen.com) o [EBANX](https://www.ebanx.com) para procesamiento local con enrutamiento inteligente.\n2. **Pix Dynamic QR:** Implementación de Pix con actualización de estado en tiempo real (Webhooks D+0).\n3. **Financiamiento local:** Soporte obligatorio para *Parcelas* (compras en cuotas con tarjeta local) e integración con Boleto Bancário simplificado.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: "iGaming & Apuestas Deportivas LATAM",
    description: "Stack especializado para operadores de iGaming y apuestas, enfocado en altas tasas de conversión sin contracargos mediante pagos A2A y e-wallets, junto con onboarding automatizado (KYC/AML).",
    country: "LATAM",
    businessModel: "iGaming",
    components: "### Arquitectura de Pagos Recomendada\n1. **Procesador Regional:** [dLocal](https://dlocal.com) o [Kushki](https://kushkipagos.com) para cobrar localmente sin entidad legal en cada país.\n2. **Rieles Cero Contracargos (Pay-In):** Pix (Brasil), SPEI (México), Bre-B / PSE (Colombia), Yape/Plin (Perú).\n3. **Prevención de Fraude & KYC:** [Sumsub](https://sumsub.com) (especializado en iGaming), [Incode](https://incode.com) u [Onfido](https://onfido.com) para onboarding y anti-lavado.\n4. **Dispersiones Rápidas (Pay-Out):** APIs de pagos en tiempo real para retiro de premios instantáneo.",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const localGuides: any[] = [
  {
    id: 1,
    title: "Guía paso a paso: Integración del botón de pago PSE en Colombia",
    content: "### Introducción\nEl botón de PSE (Pagos Seguros en Línea) es el método preferido de pago interbancario en Colombia. Esta guía detalla cómo integrarlo usando Webhooks para evitar órdenes huérfanas.\n\n### Flujo Técnico\n1. **Creación de Transacción:** El cliente selecciona su banco en el checkout.\n2. **Redirección:** La pasarela redirige al usuario a la interfaz bancaria oficial de PSE.\n3. **Autenticación:** El usuario aprueba la transacción en su portal bancario.\n4. **Retorno y Webhook:** La pasarela notifica el cambio de estado (`APPROVED`, `DECLINED`, `PENDING`) a tu servidor.\n\n> [!IMPORTANT]\n> Debido a que las sesiones de PSE pueden tardar hasta 20 minutos por parte del usuario, **nunca** asumas el éxito de la transacción solo en la redirección de retorno. Escucha siempre el Webhook asíncrono para liberar el servicio.",
    category: "Integraciones",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const localSubscribers: any[] = [];

const localCommunityPosts: any[] = [
  {
    id: "post_1",
    title: "¿Modelo de 3 partes o de 4 partes en México? Entendiendo a Prosa y E-Global",
    body: "En México, el procesamiento de tarjetas es único debido a la fuerte presencia de dos cámaras de compensación locales: Prosa y E-Global. A diferencia del modelo de 4 partes estándar global (donde Visa/Mastercard conectan directamente al emisor y adquirente), en transacciones domésticas en México los datos viajan a través de estos switches locales. Esto reduce costos transaccionales locales pero a veces añade burocracia para los procesadores internacionales.",
    author: "Fernando Estévez",
    authorTitle: "Colaborador",
    tag: "Debate",
    country: "México",
    upvotes: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "post_2",
    title: "La batalla por la interoperabilidad móvil: Yape vs Plin en Perú",
    body: "Hasta hace un par de años, el ecosistema de billeteras digitales en Perú estaba fragmentado. Si usabas Yape (del BCP) no podías transferirle a alguien con Plin (del BBVA/Interbank). Hoy en día, gracias a la regulación del Banco Central, la interoperabilidad es del 100%. ¿Qué impacto ha tenido esto en los comercios físicos? Se ha visto una reducción masiva del uso de efectivo en comercios minoristas y bodegas a nivel nacional.",
    author: "Elena Quiroga",
    authorTitle: "Miembro",
    tag: "Opinión",
    country: "Perú",
    upvotes: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const localCommunityComments: any[] = [
  {
    id: "comment_1",
    postId: "post_1",
    author: "Carlos Gómez",
    body: "Exacto. Por eso las pasarelas que usan adquirencia internacional a veces tienen tasas de rechazo más altas en México si no rutean localmente por Prosa/E-Global.",
    upvotes: 4,
    createdAt: new Date()
  },
  {
    id: "comment_2",
    postId: "post_2",
    author: "Mateo Rojas",
    body: "La interoperabilidad de Yape y Plin ha sido el mayor acierto fintech en Perú en los últimos 5 años. Logró bancarizar a millones de personas.",
    upvotes: 2,
    createdAt: new Date()
  }
];

// ── USER QUERIES ──

export async function upsertUser(user: InsertUser): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available. Saving to local memory.");
    const existing = localUsers.find(u => u.openId === user.openId);
    if (existing) {
      Object.assign(existing, user, { updatedAt: new Date(), lastSignedIn: new Date() });
    } else {
      localUsers.push({
        id: localUsers.length + 1,
        ...user,
        role: user.role || (user.openId === ENV.ownerOpenId ? "admin" : "user"),
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date()
      });
    }
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    return localUsers.find(u => u.openId === openId);
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ── NEWS QUERIES ──

export async function insertNews(item: InsertNews) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert news: database not available. Saving to memory.");
    localNews.push({ id: localNews.length + 1, ...item, createdAt: new Date(), updatedAt: new Date() });
    return;
  }
  await db.insert(news).values(item);
}

export async function getNews(limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) {
    return localNews.slice(offset, offset + limit).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }
  return db.select().from(news).limit(limit).offset(offset).orderBy(desc(news.publishedAt));
}

export async function getNewsById(id: number) {
  const db = await getDb();
  if (!db) {
    return localNews.find(n => n.id === id);
  }
  const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ── PAYMENT STACKS QUERIES ──

export async function insertPaymentStack(item: InsertPaymentStack) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert payment stack: database not available. Saving to memory.");
    localPaymentStacks.push({ id: localPaymentStacks.length + 1, ...item, createdAt: new Date(), updatedAt: new Date() });
    return;
  }
  await db.insert(paymentStacks).values(item);
}

export async function getPaymentStacks(limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) {
    return localPaymentStacks.slice(offset, offset + limit);
  }
  return db.select().from(paymentStacks).limit(limit).offset(offset).orderBy(desc(paymentStacks.createdAt));
}

// ── GUIDES QUERIES ──

export async function insertGuide(item: InsertGuide) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert guide: database not available. Saving to memory.");
    localGuides.push({ id: localGuides.length + 1, ...item, createdAt: new Date(), updatedAt: new Date() });
    return;
  }
  await db.insert(guides).values(item);
}

export async function getGuides(limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) {
    return localGuides.slice(offset, offset + limit);
  }
  return db.select().from(guides).limit(limit).offset(offset).orderBy(desc(guides.createdAt));
}

// ── SUBSCRIBERS QUERIES ──

export async function subscribeUser(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot subscribe user: database not available. Saving to memory.");
    const existing = localSubscribers.find(s => s.email === email);
    if (!existing) {
      localSubscribers.push({ id: localSubscribers.length + 1, email, subscribedAt: new Date(), isActive: 1 });
    }
    return;
  }
  await db.insert(subscribers).values({ email });
}

export async function getSubscribers() {
  const db = await getDb();
  if (!db) {
    return localSubscribers.filter(s => s.isActive === 1);
  }
  return db.select().from(subscribers).where(eq(subscribers.isActive, 1));
}

export async function unsubscribeUser(email: string) {
  const db = await getDb();
  if (!db) {
    const existing = localSubscribers.find(s => s.email === email);
    if (existing) {
      existing.isActive = 0;
      existing.unsubscribedAt = new Date();
    }
    return;
  }
  await db.update(subscribers).set({ isActive: 0, unsubscribedAt: new Date() }).where(eq(subscribers.email, email));
}

export async function getSubscriberByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    return localSubscribers.find(s => s.email === email);
  }
  const result = await db.select().from(subscribers).where(eq(subscribers.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ── CONSULTAS DE COMUNIDAD (COMMUNITY) ──

export async function getCommunityPosts(sort: 'hot' | 'new' | 'top' = 'hot') {
  const db = await getDb();
  if (!db) {
    const list = [...localCommunityPosts];
    if (sort === 'new') {
      return list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sort === 'top') {
      return list.sort((a, b) => b.upvotes - a.upvotes);
    } else {
      // hot por defecto: votos primero, luego fecha
      return list.sort((a, b) => {
        if (b.upvotes !== a.upvotes) {
          return b.upvotes - a.upvotes;
        }
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    }
  }

  let query = db.select().from(communityPosts);
  if (sort === 'new') {
    return query.orderBy(desc(communityPosts.createdAt));
  } else if (sort === 'top') {
    return query.orderBy(desc(communityPosts.upvotes));
  } else {
    return query.orderBy(desc(communityPosts.upvotes), desc(communityPosts.createdAt));
  }
}

export async function insertCommunityPost(post: InsertCommunityPost) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert community post: database not available. Saving to memory.");
    localCommunityPosts.push({
      ...post,
      upvotes: post.upvotes ?? 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return;
  }
  await db.insert(communityPosts).values(post);
}

export async function getCommentsByPostId(postId: string) {
  const db = await getDb();
  if (!db) {
    return localCommunityComments.filter(c => c.postId === postId).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
  return db.select().from(communityComments).where(eq(communityComments.postId, postId)).orderBy(communityComments.createdAt);
}

export async function insertCommunityComment(comment: InsertCommunityComment) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert community comment: database not available. Saving to memory.");
    localCommunityComments.push({
      ...comment,
      upvotes: comment.upvotes ?? 0,
      createdAt: new Date()
    });
    return;
  }
  await db.insert(communityComments).values(comment);
}

export async function upvotePost(postId: string) {
  const db = await getDb();
  if (!db) {
    const post = localCommunityPosts.find(p => p.id === postId);
    if (post) {
      post.upvotes += 1;
    }
    return;
  }
  
  const postsList = await db.select().from(communityPosts).where(eq(communityPosts.id, postId)).limit(1);
  if (postsList.length > 0) {
    const currentUpvotes = postsList[0].upvotes;
    await db.update(communityPosts)
      .set({ upvotes: currentUpvotes + 1 })
      .where(eq(communityPosts.id, postId));
  }
}

export async function upvoteComment(commentId: string) {
  const db = await getDb();
  if (!db) {
    const comment = localCommunityComments.find(c => c.id === commentId);
    if (comment) {
      comment.upvotes += 1;
    }
    return;
  }

  const commentsList = await db.select().from(communityComments).where(eq(communityComments.id, commentId)).limit(1);
  if (commentsList.length > 0) {
    const currentUpvotes = commentsList[0].upvotes;
    await db.update(communityComments)
      .set({ upvotes: currentUpvotes + 1 })
      .where(eq(communityComments.id, commentId));
  }
}

let cachedGlobeData: any[] | null = null;

export const getFintechGlobeData = async () => {
  if (cachedGlobeData) return cachedGlobeData;
  
  try {
    let data: any[] = [];
    try {
      // Import directly so the bundler includes it in the serverless output
      const importedData = require('../verified_fintech_gold.json');
      data = importedData.default || importedData;
    } catch (e) {
      console.warn("[getFintechGlobeData] JSON data file not found or failed to parse:", e);
      return [];
    }
    
    // Process and optimize data for the globe
    const globeData = data.map((item: any) => {
      const [baseLat, baseLng] = getCoordinates(item.pais);
      // Add slight jitter so that hundreds of points in "Mexico" don't overlap on the exact same pixel
      const lat = baseLat + (Math.random() - 0.5) * 3.0;
      const lng = baseLng + (Math.random() - 0.5) * 3.0;
      
      return {
        name: item.nombre,
        industry: item.vertical,
        country: item.pais,
        lat,
        lng,
        // Calculate a relative size based on score or default to 0.5
        size: item.fintech_score ? Math.min(item.fintech_score / 10, 1.5) : 0.5
      };
    }).filter((item: any) => item.lat !== 0 || item.lng !== 0); // exclude defaults if desired, or keep them if LatAm generic

    cachedGlobeData = globeData;
    return globeData;
  } catch (error) {
    console.error("[getFintechGlobeData] Error processing globe data:", error);
    return [];
  }
};

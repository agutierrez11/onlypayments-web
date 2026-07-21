# 🚀 ONLYPAYMENTS — DOSSIER EJECUTIVO DE ARQUITECTURA Y MODELO DE NEGOCIO (2026)

---

## 📋 1. VISIÓN EJECUTIVA Y PROPUESTA DE VALOR

**OnlyPayments** es la **Plataforma de Inteligencia Operativa y Marketplace B2B de Introducciones Calificadas** para el ecosistema Fintech, Neobancos y Medios de Pago en Latinoamérica.

A diferencia de un directorio estático o portal de noticias convencional, OnlyPayments resuelve la fricción comercial del *cold outreach* ineficiente mediante una propuesta de valor de **Riesgo Cero**:

> **"Zero cost · Sin mensualidades · Sin contratos obligatorios. Paga únicamente por introducciones B2B calificadas o al cerrar deals de procesamiento."**

---

## 🧠 2. ESTRATEGIA DE NAVEGACIÓN Y CONVERSIÓN (REVOPS 70/30 RULE)

El frontend está estructurado bajo una separación psicológica estricta entre la **Zona Informativa (70% del Scroll)** para construir autoridad indiscutible y SEO, y la **Zona de Negocio (30% del Scroll)** para capturar demanda calificada:

```
┌─────────────────────────────────────────────────────────────────┐
│                    ONLYPAYMENTS.COM MAPA                       │
├─────────────────────────────────────────────────────────────────┤
│ /            ← Landing Informativa (Hero 3D → Radar → Insights) │
│ /ecosistema  ← Grafo Satelital 3D de 20 Países                  │
│ /insights    ← Blog de Datos del Ecosistema (PIX, Bre-B, Remesas) │
│ /rankings    ← Tablas Sorteables de las Top 50+ Fintechs        │
│ /matcher     ← 🔥 Fintech Matcher (Diagnóstico & Captura Lead)  │
│ /consultoria ← Servicios Premium e Introducciones B2B ($150 USD)│
└─────────────────────────────────────────────────────────────────┘
```

| Zona UI | Porcentaje Scroll | Paleta de Color | Tono & Copys | Objetivo Comercial |
| :--- | :--- | :--- | :--- | :--- |
| **Informativa** | **70%** | Pizarras y Neutros (`#020408`) | *"Te enseñamos el mapa"* | Educar, posicionamiento SEO, autoridad técnica. |
| **Negocio** | **30%** | Neón Cyan (`#00f5d4`) | *"Te ayudamos a negociar"* | Captura de Leads (Matcher) y agendamiento B2B. |

---

## 💵 3. MOTOR DE MONETIZACIÓN (5 FLUJOS DE INGRESO)

1. **Consultoría Gratuita → Comisión (Success Fee)**: Brokerage de procesamiento B2B. Zero cost para el comprador; cobro de comisión al provider/adquirente al cerrar el contrato.
2. **Sponsored Listings (Listados Destacados)**: Marcas y pasarelas pagan suscripción mensual ($500 - $2,500 USD) para posicionarse en el top del Mapa 3D y Rankings.
3. **Informes Premium (Market Intelligence)**: Suscripciones ejecutivas a reportes de regulaciones iGaming, rieles A2A y mercado de remesas.
4. **API de Datos B2B**: Venta de API Keys para consultar la base de 1,047+ fintechs y sus stacks de pagos activos.
5. **Matchmaking Pay-per-Intro ($150 USD)**: Introducción calificada de 15 minutos con decisores (CFOs/CTOs), dispersando 70% al conector, 15% a la comunidad y 15% a la plataforma vía **Stripe Connect**.

---

## 🛰️ 4. RADAR SATELITAL 3D Y DATOS REGIONALES (20 PAÍSES)

Visualizador interactivo Three.js con geometría Icosaedro dual, shaders GLSL de brillo aditivo, física de inercia y tooltips por raycasting en tiempo real:

- **🇲🇽 México**: 650+ fintechs · $62.5B USD remesas · Riel SPEI / DiMo · Ley Fintech 2018/2026.
- **🇧🇷 Brasil**: 1,200+ fintechs · $2.03B USD VC funding · Riel PIX (95% adopción, 63B tx) · Open Finance Fase 4.
- **🇨🇴 Colombia**: 410+ fintechs · $2.1B USD remesas · Riel Bre-B / PSE · Decreto Open Banking.
- **🇦🇷 Argentina**: 320+ fintechs · Transferencias 3.0 · QR Interoperable BCRA · Ualá / Nuvemshop.
- **🇨🇱 Chile**: 280+ fintechs · $110M VC H1 · Ley Fintech N° 21.521 · TEF / CMF Instant.
- **🇵🇪 Perú**: 180+ fintechs · $4.5B USD remesas · Yape / Plin Interoperable BCRP.
- **🇸🇻 El Salvador**: Remesas $8.3B USD · Moneda legal Bitcoin / Chivo Wallet.
- **🌎 Resto de LATAM**: Ecuador (Dolarizado), Costa Rica (SINPE Móvil 88%), Panamá (Hub ACH), Rep. Dominicana ($11.9B remesas), Uruguay, Bolivia, Paraguay, Honduras, Nicaragua, Venezuela, Jamaica, Puerto Rico, Cuba.

---

## ⚙️ 5. ARQUITECTURA TÉCNICA DE LA PLATAFORMA

- **Frontend**: React 19 + TypeScript + Vite + Wouter + TailwindCSS (Aesthetica Dark Premium, Orbitron & JetBrains Mono) + Three.js + Framer Motion.
- **Backend & Database**: Node.js + Express + tRPC v11 + Drizzle ORM + PostgreSQL (`pgvector` para matching de cargos).
- **Despliegue CI/CD**: Cloud Pipeline automatizado en GitHub (`agutierrez11/onlypayments-web`) listo para Cloudflare Pages / Cloud Run.

---

*OnlyPayments — Documento Ejecutivo de Arquitectura y Estrategia B2B 2026*

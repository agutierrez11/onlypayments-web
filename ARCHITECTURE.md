# 🏛️ ARQUITECTURA GENERAL DEL SISTEMA (El Core Híbrido)

El proyecto no es un directorio estático; es un **Marketplace B2B de Intención de Compra Basado en Capital Social**. 
Su infraestructura se divide en 3 capas de ingeniería:

```text
[Frontend Web / Next.js] ──> [Backend Node.js + pgvector] ──> [Engine de WhatsApp (WA API)]
                                  │               │
                                  ▼               ▼
                       [Python Swarm / OSINT]   [Stripe Connect API]
```

---

## 🗄️ 1. CAPA DE DATOS Y PRIVACIDAD (PostgreSQL Core)

Para proteger la soberanía de los datos de tus usuarios y cumplir con regulaciones de privacidad, implementas una arquitectura de doble capa con cifrado local.

*   **Protocolo Zero-Knowledge (Soberanía de Datos):** Cuando un miembro de la comunidad arrastra su CSV de LinkedIn a tu web, el código frontend ejecuta un algoritmo criptográfico SHA-256 local en el navegador antes de que toque tu servidor.
    *   *Entrada:* Juan Pérez, CFO en Clip
    *   *Tu Base de Datos recibe únicamente:* `a8f5c2d3e91b... + Tag: TECH_GATEWAY`. No guardas nombres ni correos de terceros.
*   **Prioridad Dinámica (Conciliación de Datos):** Los datos coexistirán bajo dos pesos de confianza para mitigar el desfase temporal de LinkedIn (por ejemplo, si tu perfil aún dice Fiserv pero saliste en octubre de 2025):
    *   *Capa Core (`SOURCE_MANUAL`):* Lo que el usuario escribe a mano hoy en tu web. **Peso de confianza: 1.00.**
    *   *Capa Shadow (`SOURCE_LINKEDIN`):* Datos históricos extraídos del CSV. **Peso de confianza: 0.50** (o 0.20 si contradice la data manual).
    *   *Capa Verificada (`RLHF_VERIFIED`):* Datos validados por un humano vía WhatsApp. **Peso de confianza: 1.00.**

---

## 🧠 2. MOTOR DE BÚSQUEDA HÍBRIDA TOTAL (Los 3 Rieles)

Cuando un comercio o pasarela escribe en tu bot de WhatsApp, el backend procesa la petición en menos de 10 milisegundos cruzando tres tecnologías en una sola consulta de base de datos:

1.  **Taxonomía Cerrada (Keywords Estrictas):** Un pipeline de IA traduce strings sucios a diccionarios técnicos estandarizados de roles (`ROLE_FINANCE_CFO`, `ROLE_TECH_CTO`) y soluciones (`TECH_GATEWAY`, `TECH_ANTI_FRAUDE`).
2.  **Distancia de Levenshtein + Trigramas:** Corrige "dedazos" o errores tipográficos en nombres de marcas ("Fiservv" o "Fizerb" por Fiserv). El índice de trigramas hace un pre-filtro veloz para no saturar la CPU, y Levenshtein calcula el cambio exacto de caracteres (Max 3 errores).
3.  **Embeddings Vectoriales (pgvector):** Utiliza el modelo `text-embedding-3-small` de OpenAI (1536 dimensiones) indexado con estructuras HNSW. Resuelve consultas abstractas o conceptuales ("necesito rutar cobros locales" o "software para timbrar facturas").

**Cálculo del Score Compuesto en Código:**
`Score Total = (Similitud Vectorial × Peso de la Fuente) - (Distancia Levenshtein × 0.05)`

---

## 🤖 3. ORQUESTADOR CONVERSACIONAL Y ENJAMBRE DE REPETICIÓN (WhatsApp + Python)

*   **El Ciclo RLHF en Tiempo Real:** El bot de WhatsApp actúa como el validador de datos. Cuando el motor encuentra un match potencial de LinkedIn, le abre un chat privado al conector: *"Iván, un partner busca al CFO de Clip. ¿Sigue vigente tu relación con él? [Sí] [No]"*. Si responde [No], el enjambre desactiva la relación en la BD y "aprende" el cambio sin necesidad de otro scraping masivo.
*   **Enjambre Fallback (Python OSINT):** Si tu grafo de PostgreSQL tira un `NOT_FOUND` ante un requerimiento, tu backend de Node.js dispara una tarea en cola hacia un script de Python. Este ejecuta un raspado (web scraping) difuso en la nube (DuckDuckGo/LinkedIn) y usa GPT-4o-mini como extractor para estructurar y devolver el organigrama actual de la empresa en JSON.

---

## 💳 4. EL MODELO DE NEGOCIO Y RIEL DE PAGOS (Stripe Connect)

Tu plataforma se posiciona como una herramienta de adquisición de clientes seria, neutral e institucional. Es gratuita para la comunidad y cobra exclusivamente a la demanda corporativa (las pasarelas que buscan vender).

### Los Esquemas de Monetización:
*   **Modelo Pay-per-Intro (Pago por Introducción Calificada):** Las empresas B2B pagan una tarifa fija ($150 USD) en el momento exacto en que se agenda y confirma una llamada de 15 minutos con un tomador de decisiones interesado. No pagan por datos muertos, pagan por el acceso al puente de confianza.
*   **Sponsorship Híbrido Recurrente (SaaS + Lead Gen):** Transforma el patrocinio tradicional de eventos presenciales en un ingreso mensual recurrente (Stripe Billing). El sponsor (ej. Adyen o Riskified) paga una membresía premium que le incluye el stand físico y un paquete mensual de créditos de introducción automatizada mediante el radar semántico del bot.

### La Ingeniería del Split Payment (Dispersión Automatizada):
Para evitar problemas fiscales de triangulación de capitales en Latam, utilizas **Stripe Connect Express**. Cuando se procesa un pago, los fondos se dividen en el mismo milisegundo desde la API:
*   **Escenario por Conector (70% / 15% / 15%):** $105 USD van directo al miembro de la comunidad que aportó el contacto; $22.50 USD van a la caja de Fintech Bar (el socio de comunidad); y $22.50 USD se quedan en tu cuenta por el software.
*   **Escenario Match Directo / Cercanía Cero (90% / 10%):** Si el objetivo de la búsqueda ya es un usuario registrado en el bot, el dinero le pertenece 100% a él (menos tu 10% de infraestructura). El bot le paga por su atención: *"Carlos, un proveedor pagó $135 USD por presentarte una propuesta. Da clic aquí para aceptar la llamada y recibir tus fondos"*.

---

## 💡 Resumen ejecutivo para el lunes con Luis Fernando:

1.  **Suiza Neutral:** El modelo de él (Riskified) o los patrocinios tradicionales (Adyen) están sesgados corporativamente. Tu software es la "Suiza de las Fintech": una infraestructura neutral basada en datos técnicos puros y reputación algorítmica.
2.  **El Gemelo Digital de Fintech Bar:** Fintech Bar ya resolvió la parte más difícil: romper el hielo cara a cara en sus desayunos presenciales. Tu software es la infraestructura que toma esa confianza y la vuelve continua, medible y monetizable las 24 horas del día de lunes a domingo.
3.  **La Alianza 50/50:** Él pone la masa crítica de su comunidad de WhatsApp (+500 tomadores de decisiones) para el laboratorio beta de 2 semanas; tú pones todo este ecosistema de software y código que ya tienes listo, y dividen los ingresos de los matches.

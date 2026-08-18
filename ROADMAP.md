# 🗺️ Roadmap Estratégico — OnlyPayments (2026)

Este documento detalla las iniciativas, arquitecturas y módulos planificados para OnlyPayments en sus siguientes fases de producto, monetización y crecimiento.

---

## 📌 Estado de Módulos: En Standby / Backlog Priorizado

---

### 1. 🌐 Integración de Datos Abiertos & APIs Públicas Low-Cost (Costo $0)
* **Objetivo**: Conectar OnlyPayments directamente a las fuentes primarias oficiales de bancos centrales y gobiernos de LATAM sin intermediarios costosos.
* **Fuentes y Conectores**:
  - 🇲🇽 **Banxico API (SIE)**: Consulta automatizada cada 6 horas de tipo de cambio oficial (FIX/DOF), tasas TIIE y volumen transaccional de SPEI.
  - 🇲🇽 **INEGI (DENUE API) & SAT Lista 69-B**: Validación de giros comerciales y detección preventiva de empresas no localizadas (EFOs).
  - 🇧🇷 **BrasilAPI (`brasilapi.com.br`)**: Endpoint abierto y gratuito para validación de CNPJ (Receita Federal), código bancario COMPE y datos de Pix.
  - 🇨🇴 **Datos.gov.co (Socrata API)**: TRM oficial del dólar y registro mercantil de empresas supervisadas.
  - 🇦🇷 **Datos.gob.ar & BCRA**: Padrones fiscales y comunicaciones oficiales del régimen Transferencias 3.0.
* **Aplicación en Producto**:
  - Ticker/Widget en vivo de tipos de cambio y volumen de rieles A2A en la Home.
  - Enriquecimiento automático de perfiles en el formulario de Introducciones B2B.

---

### 2. 💼 Generador de RFPs B2B para Flotas de SmartPOS (Lead-Gen Premium)
* **Objetivo**: Monetizar la demanda de cadenas de retail, franquicias y fintechs que buscan adquirir lotes de terminales Android (Topwise, PAX, Sunmi, Nexgo).
* **Modelo Comercial**:
  - **Posicionamiento**: Broker / Pre-calificador técnico neutral (modelo *G2 / Capterra*). No colisiona con canales oficiales de fabricantes.
  - **Calificación BANT/MEDDIC**: Recopila país, volumen (ej. 50 a 5,000 unidades), arquitectura de software (Android / Linux) y pasarela deseada.
  - **Monetización**: Cobro por Lead Calificado (**CPL de $50 – $250 USD**) o comisión por colocación con distribuidores mayoristas autorizados.

---

### 3. 📉 Calculadora Interactiva de Fuga de Ingresos (MDR & Rechazos)
* **Objetivo**: Mecanismo de adquisición viral (Growth Loop) dirigido a CFOs, VPs de Finanzas y Heads of Payments.
* **Funcionalidad**:
  - El usuario ingresa su facturación mensual y países de operación.
  - El algoritmo calcula la pérdida estimada por falsos positivos (rechazos bancarios) y sobrecostos de adquirencia cross-border.
  - Genera un diagnóstico inmediato y permite exportar un **One-Pager Ejecutivo en PDF** o solicitar una introducción B2B con la pasarela óptima.

---

### 4. 🧪 Playground de APIs de Pagos (Inspirado en Openapi.com para LATAM)
* **Objetivo**: Convertir a OnlyPayments en el centro de pruebas técnicas de referencia para desarrolladores y arquitectos de software en la región.
* **Funcionalidad**:
  - Consola web interactiva donde desarrolladores pueden probar en sandbox payloads de endpoints de **Stripe, dLocal, Mercado Pago, Clip, Kushki y terminales POS** sin salir del navegador.

---

### 5. 📑 Reportes de Inteligencia de Mercado Institucionales (Paywall de Datos)
* **Objetivo**: Venta de reportes ejecutivos de grado institucional para fondos de VC, bancos y adquirentes ($299 – $999 USD).
* **Metodología de Cero Asunciones**:
  - Cruce de datos oficiales de 6 Bancos Centrales (Banxico, BCB, BCRA, BCRP, BanRepública, CMF).
  - Análisis de reportes financieros auditados bajo estándar SEC (Formularios 10-K y 20-F de Mercado Libre, StoneCo, PagBank y dLocal).
  - Benchmarks validados de comisiones efectivas (Take Rates) y tasas de contracargo por industria.

---

*Documento actualizado y gestionado por la Célula de Agentes de OnlyPayments.*

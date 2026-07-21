# Resumen Ejecutivo del Proyecto — OnlyPayments (2026)

Este documento contiene la bitácora completa de arquitectura, enlaces de producción y archivos clave para futuras sesiones de trabajo.

---

## 📌 Enlaces Activos en Producción (Cloudflare Pages)

- **Landing Master Principal**: [onlypayments.pages.dev](https://onlypayments.pages.dev/)
- **Diccionario de Pagos v6.0 (Vista Principal)**: [onlypayments.pages.dev/diccionario](https://onlypayments.pages.dev/diccionario)
- **Diccionario de Pagos v6.0 (Embed Exclusivo Fernando Estévez)**: [onlypayments.pages.dev/embed/diccionario](https://onlypayments.pages.dev/embed/diccionario)
- **Fintech Matcher (Diagnostic Lead Magnet)**: [onlypayments.pages.dev/matcher](https://onlypayments.pages.dev/matcher)
- **Obsidian Graph Interactivo LATAM**: [onlypayments.pages.dev/obsidian-graph.html](https://onlypayments.pages.dev/obsidian-graph.html)

---

## 🛠️ Arquitectura y Componentes Desarrollados

### 1. Diccionario de Medios de Pago v6.0 (Fernando Estévez)
- **Ubicación**: `client/src/pages/Diccionario.tsx`
- **Diseño**: Inspirado en Kimi HUD + Panel de Operaciones estilo Intelligential / Stripe Docs (`#070b12` / `#0b101b`).
- **Modos de Operación**:
  - `/diccionario`: Vista pública con buscador y filtros de categorías.
  - `/embed/diccionario` (`isEmbed={true}`): Widget exclusivo para el sitio web de Fernando. No incluye botones de "Embeber", ni modales de compartir, ni enlaces externos hacia la vista pública.
- **Dataset**: 25+ términos técnicos, legales y comerciales verificados (PIX, SPEI, Bre-B, PCI DSS 4.0, BaaS, Open Banking, etc.).

### 2. Obsidian Ecosystem Graph (Grafo Interactivo LATAM)
- **Ubicación**: `client/public/obsidian-graph.html` (Wrapper React en `client/src/components/FintechGlobe.tsx`).
- **Características**: Grafo de fuerza 2D en Canvas con 20 países de LATAM, dataset de volúmenes reales ($62.5B SPEI, $2.03B PIX, etc.), enlaces de partículas y buscador en vivo.

### 3. Single-Page Master Landing & Matcher
- **Ubicación**: `client/src/pages/Home.tsx` & `client/public/fintech-matcher.html`.
- **Estructura**: Hero 100vh -> Barra de Estadísticas -> Obsidian Graph -> Insights -> How It Works -> Fintech Matcher Inline -> Footer.

---

## ⚙️ Reglas de Despliegue CI/CD
1. **GitHub Trigger**: El proyecto despliega automáticamente en Cloudflare Pages al hacer `git push origin main`.
2. **Estado de Git**: La rama `main` se encuentra sincronizada y limpia (`working tree clean`).

---

*Documento generado por Antigravity Copilot para Antonio Gutiérrez.*

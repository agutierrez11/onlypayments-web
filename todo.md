# Project TODO

## Planificación y Arquitectura
- [x] Definir esquema de base de datos para noticias, stacks de pago, guías y suscriptores.
- [x] Planificar la integración del motor LLM y la automatización del newsletter.

## Base de Datos
- [x] Implementar esquema de base de datos (`drizzle/schema.ts`).
- [x] Generar migraciones SQL (`pnpm drizzle-kit generate`).
- [x] Aplicar migraciones SQL (`webdev_execute_sql`).
- [x] Crear helpers de consulta en `server/db.ts` para las nuevas tablas.

## Interfaz de Usuario (UI) - Componentes Base
- [x] Definir paleta de colores, tipografía y espaciado en `client/src/index.css`.
- [x] Crear componentes UI base (botones, tarjetas, etc.) si no existen en shadcn/ui o necesitan personalización.

## Landing Page
- [x] Diseñar y desarrollar la sección hero con propuesta de valor clara.
- [x] Implementar bloques destacados de noticias recientes en la landing page.

## Feed de Noticias
- [x] Crear la página de feed de noticias (`client/src/pages/NewsFeed.tsx`).
- [x] Implementar la visualización de noticias con resumen de 3 líneas, impacto y herramientas.
- [x] Desarrollar filtros por país, categoría (A2A, transfronterizo, IA, regulación) y fecha.
- [x] Implementar funcionalidad de búsqueda de noticias.

## Detalle de Noticia
- [x] Crear la página de detalle de noticia (`client/src/pages/NewsDetail.tsx`).
- [x] Implementar la sección "Impacto y Herramientas" con contenido accionable.

## Directorio de Stacks de Pago
- [x] Crear la página del directorio de "Stacks de Pago" (`client/src/pages/PaymentStacks.tsx`).
- [x] Implementar la visualización de stacks organizados por país y modelo de negocio (e-commerce, SaaS, remesas).

## Guías Prácticas ("How-to")
- [x] Crear la página de guías prácticas (`client/src/pages/HowToGuides.tsx`).
- [x] Implementar contenido sobre implementación de pasarelas, regulaciones y optimización.

## Motor LLM y Automatización de Contenido
- [x] Desarrollar el script del motor LLM para procesar fuentes RSS/web.
- [x] Implementar la generación de resúmenes de 3 líneas y la sección "Impacto y Herramientas".
- [x] Configurar la ejecución diaria autónoma del motor LLM.

## Newsletter y Automatización
- [x] Diseñar el formulario de suscripción al newsletter.
- [x] Implementar la lógica de registro de suscriptores en la base de datos.
- [x] Desarrollar el script para generar el resumen semanal curado de noticias y guías.
- [x] Configurar el envío automático semanal del newsletter.

## Pruebas y Refinamientos
- [x] Realizar pruebas funcionales de todas las características.
- [x] Refinar el diseño visual para asegurar una estética premium y elegante.
- [x] Realizar pruebas de rendimiento y optimización.
- [x] Crear checkpoint final del proyecto.

## Próximos Pasos Estratégicos (Roadmap Fase 2)
- [x] **Motor de Enriquecimiento B2B (Data-Crossing)**: Implementar la funcionalidad core de monetización donde los usuarios pueden subir sus bases de datos / contactos de LinkedIn y el sistema cruza la data para identificar el stack de pagos de esas empresas.
- [x] **Dashboard B2B para Usuarios Enterprise & Marketplace Pay-per-Intro**: Panel interactivo donde los usuarios gestionan sus intros calificadas ($150 USD), simulan la dispersión Stripe Connect (70%/15%/15%) y prueban la búsqueda semántica híbrida.
- [ ] **Migración a Next.js 14+ (App Router)**: Mover la arquitectura a Next.js para lograr SSR/SSG nativo, habilitar SEO por página/país/método de pago, y consolidar el backend usando Route Handlers y Server Actions.

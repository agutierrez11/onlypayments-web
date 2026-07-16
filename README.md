# Onlypayments 💸

**Onlypayments** es una plataforma interactiva premium diseñada para creadores independientes, permitiéndoles gestionar y simular ingresos recurrentes por suscripciones de forma simple, privada y sin intermediarios.

## Características Clave

* **Diseño Ultra Estético:** Paleta de colores HSL en un tema oscuro inmersivo, tipografías Outfit y JetBrains Mono, glassmorphism y transiciones fluidas de micro-interacción.
* **Dashboard Financiero:** Análisis de MRR, Suscriptores activos, tarifas de pasarela estimadas y payouts proyectados.
* **Simulación en Tiempo Real:** Integración con Chart.js que dibuja curvas de ingresos y cobros simulados en tiempo real.
* **Generador de PayLinks:** Crea enlaces personalizados para productos o suscripciones periódicas y pruébalos con una pasarela de pago (Secure Checkout) interactiva.
* **Simulador de Tráfico Orgánico:** Configura embudos de conversión para observar visitas, clics en checkout y tasas de éxito en vivo.
* **Webhook Tester:** Envía payloads automáticos en formato JSON a tus endpoints del backend para pruebas de desarrollo de integraciones API.

## Estructura del Proyecto

```bash
onlypayments/
├── index.html     # Estructura del panel de control y checkout
├── style.css      # Hoja de estilos con variables HSL y animaciones
├── app.js         # Lógica interactiva del simulador de transacciones y embudo
├── .gitignore     # Exclusiones de Git
└── README.md      # Documentación
```

## Uso Local

1. Abre el archivo `index.html` en cualquier navegador web moderno.
2. Explora las secciones (Dashboard, PayLinks, Suscriptores, Tráfico y Webhooks).
3. Utiliza el botón **Simular Venta Inmediata** en el Dashboard para ver los gráficos de ingresos y transacciones actualizarse en tiempo real.
4. Genera nuevos links en la pestaña **PayLinks** y haz clic en **Probar Checkout** para interactuar con la pasarela simulada.

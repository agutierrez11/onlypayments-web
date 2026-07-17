# Reglas del Proyecto OnlyPayments

## 🚀 Regla Crítica de Despliegue (CI/CD)
**NUNCA USES VERCEL CLI DIRECTAMENTE.** 
Todo el flujo de trabajo y despliegue de este proyecto está atado a GitHub. 

Si el usuario (Antonio) pide "subir cambios", "desplegar", o "actualizar el proyecto", DEBES:
1. Hacer `git add .`
2. Hacer `git commit -m "mensaje"`
3. Hacer `git push origin main`

El despliegue en Vercel se activa automáticamente a través de la integración nativa con GitHub. No uses comandos de Vercel en la terminal bajo ninguna circunstancia.

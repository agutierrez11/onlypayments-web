// Telemetria en Tiempo Real
const BOT_TOKEN = '8618367908:AAH1wQ9dPcCCMHciOHR89iAGd-XQg3NjyAo';
const CHAT_ID = '1373770013';
const TELEGRAM_API = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage';

async function sendTelegramAlert(text: string) {
  try {
    const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (isDev && !text.includes('CRASH')) {
      console.log('[TELEMETRY DEV LOG]:\n' + text);
      return;
    }

    await fetch(TELEGRAM_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.warn('[Telemetry] Failed to dispatch alert:', err);
  }
}

export async function trackPageView() {
  if (typeof window === 'undefined') return;

  const sessionKey = 'op_visit_reported';
  if (sessionStorage.getItem(sessionKey)) {
    return;
  }

  sessionStorage.setItem(sessionKey, '1');

  const referrer = document.referrer || 'Acceso Directo / Bookmark';
  const screen = window.screen.width + 'x' + window.screen.height;
  const path = window.location.pathname + window.location.search + window.location.hash;
  const userAgent = navigator.userAgent;

  let browser = 'Navegador Web';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Edge')) browser = 'Edge';

  let os = 'Desktop';
  if (/Android/i.test(userAgent)) os = 'Android';
  else if (/iPhone|iPad/i.test(userAgent)) os = 'iOS';
  else if (/Windows/i.test(userAgent)) os = 'Windows PC';
  else if (/Mac/i.test(userAgent)) os = 'Mac';
  else if (/Linux/i.test(userAgent)) os = 'Linux';

  let locationStr = 'Obteniendo ubicacion...';
  try {
    const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const geo = await res.json();
      const city = geo.city || 'Ciudad Desconocida';
      const country = geo.country || 'Pais Desconocido';
      const flag = geo.country_code ? '[' + geo.country_code + ']' : '';
      const org = geo.connection && geo.connection.isp ? '(' + geo.connection.isp + ')' : '';
      locationStr = city + ', ' + country + ' ' + flag + ' ' + org;
    }
  } catch {
    locationStr = 'Ubicacion reservada';
  }

  const alertMessage = 
    'NUEVA VISITA EN ONLYPAYMENTS\n' +
    '-----------------------------------\n' +
    'Ubicacion: ' + locationStr + '\n' +
    'Origen (Referer): ' + referrer + '\n' +
    'Ruta: ' + path + '\n' +
    'Dispositivo: ' + os + ' - ' + browser + ' (' + screen + ')\n' +
    'Hora: ' + new Date().toLocaleTimeString() + '\n' +
    '-----------------------------------';

  sendTelegramAlert(alertMessage);
}

export function trackLeadCapture(lead: {
  businessName?: string;
  contactEmail?: string;
  country?: string;
  volume?: string;
  vertical?: string;
  recommendedGateway?: string;
  score?: number | string;
}) {
  const alertMessage = 
    'NUEVO LEAD FINTECH MATCHING\n' +
    '-----------------------------------\n' +
    'Empresa: ' + (lead.businessName || 'No especificado') + '\n' +
    'Contacto: ' + (lead.contactEmail || 'Anonimo / Consulta') + '\n' +
    'Pais: ' + (lead.country || 'No especificado') + '\n' +
    'Volumen: ' + (lead.volume || 'No especificado') + '\n' +
    'Vertical: ' + (lead.vertical || 'General') + '\n' +
    'Adquirente sugerido: ' + (lead.recommendedGateway || 'En evaluacion') + '\n' +
    'Aprobacion Tecnica: ' + (lead.score || '+95%') + '\n' +
    '-----------------------------------';

  sendTelegramAlert(alertMessage);
}

export function trackCrash(error: Error | string, errorInfo?: string) {
  const errorMsg = typeof error === 'string' ? error : error.message;
  const stack = typeof error === 'object' && error.stack ? error.stack.slice(0, 700) : 'Sin stack';
  const path = typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '/';

  const alertMessage = 
    'CRASH EN TIEMPO REAL\n' +
    '-----------------------------------\n' +
    'URL: ' + path + '\n' +
    'Mensaje: ' + errorMsg + '\n' +
    (errorInfo ? 'Contexto: ' + errorInfo + '\n' : '') +
    'Stack: ' + stack + '\n' +
    '-----------------------------------';

  sendTelegramAlert(alertMessage);
}

if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (event.filename && event.filename.includes('chrome-extension://')) return;
    trackCrash(event.error || event.message, 'Archivo: ' + event.filename + ':' + event.lineno);
  });

  window.addEventListener('unhandledrejection', (event) => {
    trackCrash(event.reason && event.reason.message ? event.reason.message : String(event.reason), 'Unhandled Promise Rejection');
  });

  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'ONLYPAYMENTS_LEAD_CAPTURED') {
      trackLeadCapture(event.data.lead);
    }
  });
}

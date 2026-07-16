/* ==========================================================================
   ONLYPAYMENTS CORE APPLICATION LOGIC
   ========================================================================== */

// Estado Global
const S = {
  activeSection: 'dashboard',
  mrr: 199.90, // MRR inicial
  totalSubs: 10,
  fees: 3.99,   // 2% de comisión
  payout: 195.91,
  
  // PayLinks iniciales
  links: [
    { id: 1, name: "Acceso VIP Premium Antonio", price: 19.99, frequency: "Mensual", visits: 142, conversions: 8, url: "" },
    { id: 2, name: "Tip de Apoyo Creador", price: 5.00, frequency: "Pago Único", visits: 85, conversions: 2, url: "" }
  ],
  
  // Suscriptores iniciales
  subscribers: [
    { name: "Cristian Bautista", plan: "Acceso VIP Premium", price: 19.99, totalContributed: 59.97, lastPaid: "Hace 2 días", status: "Activo" },
    { name: "Lilia Velarde", plan: "Acceso VIP Premium", price: 19.99, totalContributed: 39.98, lastPaid: "Hace 5 días", status: "Activo" },
    { name: "Daniel Muñoz", plan: "Acceso VIP Premium", price: 19.99, totalContributed: 19.99, lastPaid: "Hace 12 días", status: "Activo" },
    { name: "Rahul Naidu", plan: "Tip de Apoyo Creador", price: 5.00, totalContributed: 5.00, lastPaid: "Hace 1 hora", status: "Pago Único" }
  ],
  
  // Tráfico y Embudo
  visits: 227,
  clicks: 34,
  sales: 10,
  
  // Historial de ingresos para la gráfica (últimas 10 transacciones/horas)
  incomeHistory: [80, 100, 115, 120, 140, 155, 160, 180, 195, 199.90],
  
  // Tráfico automático
  simInterval: null,
  simSpeed: 'medium', // off, slow, medium, fast
  simConversion: 15    // porcentaje
};

// Variable para el gráfico de Chart.js
let incomeChart = null;

// Inicialización de la aplicación
window.addEventListener('DOMContentLoaded', () => {
  generatePayLinkUrls();
  initChart();
  renderAll();
  startAutoSimulation();
});

// Generar URLs simuladas de PayLinks
function generatePayLinkUrls() {
  S.links.forEach(link => {
    link.url = `https://onlypayments.to/antonio-vip/pay/${link.id}`;
  });
}

// Inicializar Gráfico Financiero
function initChart() {
  const ctx = document.getElementById('chart-income').getContext('2d');
  const isLight = document.body.classList.contains('light-theme');
  const textClr = isLight ? '#475569' : '#94a3b8';
  const gridClr = isLight ? '#e2e8f0' : '#1e293b';
  
  incomeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({length: S.incomeHistory.length}, (_, i) => `T-${S.incomeHistory.length - 1 - i}h`),
      datasets: [{
        label: 'MRR Acumulado (USD)',
        data: S.incomeHistory,
        borderColor: '#f43f5e', // Rosa neón
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ec4899',
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { 
          grid: { color: gridClr },
          ticks: { color: textClr, font: { family: 'Outfit', size: 10 } }
        },
        y: {
          grid: { color: gridClr },
          ticks: { 
            color: textClr, 
            font: { family: 'Outfit', size: 10 },
            callback: (v) => `$${v}`
          }
        }
      }
    }
  });
}

// Actualizar gráfico tras una nueva venta
function updateChartValue(val) {
  if (!incomeChart) return;
  S.incomeHistory.shift();
  S.incomeHistory.push(val);
  incomeChart.data.datasets[0].data = S.incomeHistory;
  incomeChart.update();
}

// Navegación
function navigate(sec) {
  S.activeSection = sec;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  const targetSec = document.getElementById('sec-' + sec);
  const targetNav = document.querySelector(`[data-section="${sec}"]`);
  
  if (targetSec) targetSec.classList.add('active');
  if (targetNav) targetNav.classList.add('active');
  
  if (sec === 'dashboard' && incomeChart) {
    // Redibujar gráfico para evitar bugs de redimensionado
    setTimeout(() => incomeChart.resize(), 50);
  }
}

// Alternar Tema (Claro / Oscuro)
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const btn = document.getElementById('theme-btn');
  const isLight = document.body.classList.contains('light-theme');
  btn.textContent = isLight ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
  
  // Reiniciar gráfico para ajustar los colores de las fuentes y rejilla
  if (incomeChart) {
    incomeChart.destroy();
    initChart();
  }
}

// RENDERIZAR TODO
function renderAll() {
  // KPIs
  document.getElementById('kpi-mrr').textContent = `$${S.mrr.toFixed(2)}`;
  document.getElementById('kpi-subs').textContent = S.totalSubs;
  document.getElementById('kpi-fees').textContent = `$${S.fees.toFixed(2)}`;
  document.getElementById('kpi-payout').textContent = `$${S.payout.toFixed(2)}`;
  
  // Badges Sidebar
  document.getElementById('badge-links-count').textContent = S.links.length;
  document.getElementById('badge-sub-count').textContent = S.subscribers.length;
  
  // Tabla de PayLinks
  renderPayLinksTable();
  
  // Tabla de Suscriptores
  renderSubscribersTable();
  
  // Métricas del embudo
  document.getElementById('funnel-visits').textContent = S.visits;
  document.getElementById('funnel-clicks').textContent = S.clicks;
  document.getElementById('funnel-sales').textContent = S.sales;
}

// Renderizar Tabla de PayLinks
function renderPayLinksTable() {
  const tbody = document.getElementById('links-tbody');
  if (!tbody) return;
  
  tbody.innerHTML = S.links.map(link => {
    const convRate = link.visits > 0 ? ((link.conversions / link.visits) * 100).toFixed(1) : "0.0";
    return `
      <tr>
        <td><div class="td-title">${link.name}</div></td>
        <td class="td-mono" style="font-weight:700;">$${link.price.toFixed(2)}</td>
        <td><span class="badge ${link.frequency === 'Mensual' ? 'badge-purple' : 'badge-green'}">${link.frequency}</span></td>
        <td class="td-mono">${link.visits}</td>
        <td class="td-mono">${convRate}%</td>
        <td class="td-mono" style="color:var(--accent); font-size:11px;">
          <a href="#" onclick="openCheckout(${link.id}); return false;" style="color:var(--accent); text-decoration:none; font-weight:600;">onlypayments.to/.../${link.id} ↗</a>
        </td>
        <td style="text-align:right; white-space:nowrap;">
          <button class="btn" style="padding:4px 10px; font-size:10px;" onclick="openCheckout(${link.id})">Probar Checkout</button>
        </td>
      </tr>
    `;
  }).join('');
}

// Renderizar Tabla de Suscriptores
function renderSubscribersTable() {
  const tbody = document.getElementById('subs-tbody');
  if (!tbody) return;
  
  tbody.innerHTML = S.subscribers.map(sub => {
    const planBadge = sub.status === 'Activo' ? 'badge-purple' : 'badge-green';
    return `
      <tr>
        <td><div class="td-title">${sub.name}</div></td>
        <td><span class="badge ${planBadge}">${sub.plan}</span></td>
        <td class="td-mono">$${sub.price.toFixed(2)}</td>
        <td class="td-mono" style="font-weight:700; color:var(--green)">$${sub.totalContributed.toFixed(2)}</td>
        <td style="color:var(--text-muted)">${sub.lastPaid}</td>
        <td><span class="badge badge-green">${sub.status === 'Activo' ? 'Suscrito' : 'Pagado'}</span></td>
      </tr>
    `;
  }).join('');
}

// ==========================================================================
// OPERACIONES DEL CHECKOUT & SIMULADOR DE COBRO
// ==========================================================================
let currentCheckoutLinkId = null;

// Abrir Modal de Checkout para un PayLink
function openCheckout(linkId) {
  const link = S.links.find(l => l.id === linkId);
  if (!link) return;
  
  currentCheckoutLinkId = linkId;
  document.getElementById('checkout-product-title').textContent = link.name;
  document.getElementById('checkout-product-price').textContent = `$${link.price.toFixed(2)} / ${link.frequency === 'Mensual' ? 'mes' : 'pago único'}`;
  
  // Incrementar click de embudo y visitas del link
  link.visits += 1;
  S.visits += 1;
  S.clicks += 1;
  renderAll();
  
  document.getElementById('modal-checkout').classList.add('active');
}

function closeCheckoutModal() {
  document.getElementById('modal-checkout').classList.remove('active');
}

// Procesar Pago en el Checkout
function submitSimulatedPayment() {
  const btn = document.getElementById('btn-pay-submit');
  btn.textContent = "Procesando pago seguro...";
  btn.disabled = true;
  
  setTimeout(() => {
    // Restaurar botón
    btn.textContent = "Pagar Seguro";
    btn.disabled = false;
    
    // Ejecutar lógica de cobro exitoso
    const link = S.links.find(l => l.id === currentCheckoutLinkId);
    if (link) {
      processSuccessfulSale(link, document.getElementById('chk-card-name').value || 'Usuario Anónimo');
    }
    
    closeCheckoutModal();
  }, 1500);
}

// Procesar Venta / Suscripción Exitosa
function processSuccessfulSale(link, buyerName) {
  // Incrementar ventas generales e individuales
  link.conversions += 1;
  S.sales += 1;
  S.totalSubs += 1;
  
  // Si es mensual, incrementar el MRR
  if (link.frequency === 'Mensual') {
    S.mrr += link.price;
  }
  
  // Calcular comisiones y payouts
  const feePct = 0.02; // 2%
  const saleFee = link.price * feePct;
  S.fees += saleFee;
  S.payout += (link.price - saleFee);
  
  // Agregar suscriptor a la lista
  const existingSub = S.subscribers.find(s => s.name === buyerName);
  if (existingSub) {
    existingSub.totalContributed += link.price;
    existingSub.lastPaid = "Hace unos instantes";
  } else {
    S.subscribers.unshift({
      name: buyerName,
      plan: link.name,
      price: link.price,
      totalContributed: link.price,
      lastPaid: "Hace unos instantes",
      status: link.frequency === 'Mensual' ? 'Activo' : 'Pago Único'
    });
  }
  
  // Agregar al feed de transacciones
  addTransactionToFeed(buyerName, link.name, link.price);
  
  // Actualizar gráfica de ingresos
  updateChartValue(S.mrr);
  
  // Disparar Webhook si hay URL configurada
  triggerWebhookEvent('payment.succeeded', {
    event: 'payment.succeeded',
    created: Math.floor(Date.now() / 1000),
    data: {
      buyer_name: buyerName,
      product_name: link.name,
      amount: link.price,
      currency: 'usd',
      frequency: link.frequency,
      commission_fee: saleFee
    }
  });
  
  renderAll();
}

// Simular una Venta Manual Rápida
function simulatePayment() {
  const names = ["Antonio Gutiérrez", "Juan Pérez", "Sofía Vergara", "Elon Musk", "Ada Lovelace", "Steve Jobs", "Linus Torvalds"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomLink = S.links[Math.floor(Math.random() * S.links.length)];
  
  processSuccessfulSale(randomLink, randomName);
}

// Añadir elemento visual de transacción al feed
function addTransactionToFeed(user, product, amount) {
  const feed = document.getElementById('transaction-feed');
  if (!feed) return;
  
  // Eliminar placeholder
  const placeholder = feed.querySelector('.feed-placeholder');
  if (placeholder) placeholder.remove();
  
  const initials = user.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  const item = document.createElement('div');
  item.className = 'feed-item';
  item.innerHTML = `
    <div class="feed-avatar">${initials}</div>
    <div class="feed-details">
      <div class="feed-user">${user}</div>
      <div class="feed-prod">${product}</div>
    </div>
    <div class="feed-meta">
      <div class="feed-amount">+$${amount.toFixed(2)}</div>
      <div class="feed-time">Ahora mismo</div>
    </div>
  `;
  
  feed.insertBefore(item, feed.firstChild);
  
  // Limitar feed a 5 elementos
  if (feed.children.length > 5) {
    feed.removeChild(feed.lastChild);
  }
}

// ==========================================================================
// CREACIÓN DE NUEVOS ENLACES (MODAL)
// ==========================================================================
function openCreateLinkModal() {
  document.getElementById('modal-create-link').classList.add('active');
}

function closeCreateLinkModal() {
  document.getElementById('modal-create-link').classList.remove('active');
}

function saveNewPayLink() {
  const name = document.getElementById('new-link-name').value.trim();
  const price = parseFloat(document.getElementById('new-link-price').value) || 0;
  const frequency = document.getElementById('new-link-frequency').value;
  
  if (!name) {
    alert("⚠️ Por favor ingresa el nombre del producto.");
    return;
  }
  
  const newId = S.links.length + 1;
  S.links.push({
    id: newId,
    name: name,
    price: price,
    frequency: frequency,
    visits: 0,
    conversions: 0,
    url: `https://onlypayments.to/antonio-vip/pay/${newId}`
  });
  
  // Limpiar campos
  document.getElementById('new-link-name').value = '';
  document.getElementById('new-link-price').value = '19.99';
  
  closeCreateLinkModal();
  renderAll();
}

// ==========================================================================
// SIMULACIÓN AUTOMÁTICA DE TRÁFICO
// ==========================================================================
function startAutoSimulation() {
  const speed = document.getElementById('sim-speed').value;
  if (S.simInterval) clearInterval(S.simInterval);
  
  if (speed === 'off') return;
  
  let ms = 2000;
  if (speed === 'slow') ms = 5000;
  if (speed === 'fast') ms = 400; // 2.5 visitas por segundo
  
  S.simInterval = setInterval(() => {
    simulateTrafficVisit();
  }, ms);
}

function toggleAutoSimulation() {
  const btn = document.getElementById('btn-toggle-sim');
  const speedSelect = document.getElementById('sim-speed');
  
  if (S.simInterval) {
    clearInterval(S.simInterval);
    S.simInterval = null;
    btn.textContent = "Iniciar Simulación";
    btn.classList.remove('btn-primary');
    speedSelect.value = 'off';
  } else {
    speedSelect.value = 'medium';
    startAutoSimulation();
    btn.textContent = "Pausar Simulación";
    btn.classList.add('btn-primary');
  }
}

// Escuchar cambios de velocidad
document.getElementById('sim-speed').addEventListener('change', () => {
  const val = document.getElementById('sim-speed').value;
  const btn = document.getElementById('btn-toggle-sim');
  
  if (val === 'off') {
    if (S.simInterval) {
      clearInterval(S.simInterval);
      S.simInterval = null;
    }
    btn.textContent = "Iniciar Simulación";
    btn.classList.remove('btn-primary');
  } else {
    startAutoSimulation();
    btn.textContent = "Pausar Simulación";
    btn.classList.add('btn-primary');
  }
});

// Simular una Visita de Tráfico Orgánico al Embudo
function simulateTrafficVisit() {
  S.visits += 1;
  
  // Elegir un link aleatorio
  const link = S.links[Math.floor(Math.random() * S.links.length)];
  link.visits += 1;
  
  // Tasa de conversión seleccionada
  const convRate = parseInt(document.getElementById('sim-conversion').value) || 15;
  const rand = Math.random() * 100;
  
  // Simular clicks en checkout (2x la tasa de conversión)
  if (rand < (convRate * 2.2)) {
    S.clicks += 1;
  }
  
  // Simular venta exitosa
  if (rand < convRate) {
    const randomBuyers = ["Andrés Manuel", "Roberto Gómez", "Carmen Salinas", "Guillermo del Toro", "Salma Hayek", "Checo Pérez", "Chicharito", "Luis Miguel", "Eiza González"];
    const buyer = randomBuyers[Math.floor(Math.random() * randomBuyers.length)];
    processSuccessfulSale(link, buyer);
  } else {
    renderAll();
  }
}

// ==========================================================================
// INTEGRACIÓN DE WEBHOOKS & API
// ==========================================================================
function triggerWebhookEvent(eventType, payload) {
  const url = document.getElementById('webhook-url').value.trim();
  if (!url) return;
  
  console.log(`[Webhook Event] Dispatching ${eventType} to ${url}`);
  
  // Si la URL es la de prueba por defecto (httpbin), hacemos el post real
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Onlypayments-Event': eventType
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    // Mostrar log
    const box = document.getElementById('webhook-log-box');
    const log = document.getElementById('webhook-log');
    if (box && log) {
      box.style.display = 'block';
      log.textContent = JSON.stringify(data, null, 2);
    }
  })
  .catch(err => {
    const box = document.getElementById('webhook-log-box');
    const log = document.getElementById('webhook-log');
    if (box && log) {
      box.style.display = 'block';
      log.textContent = `Error enviando Webhook: ${err.message}`;
    }
  });
}

// Probar webhook manualmente con datos mock
function testWebhook() {
  const mockPayload = {
    event: 'test.webhook',
    created: Math.floor(Date.now() / 1000),
    data: {
      message: '¡Prueba de Webhook de Onlypayments exitosa!',
      antonio_creator_active: true,
      mrr_current: S.mrr,
      platform: 'Onlypayments v1.0.0-Beta'
    }
  };
  
  triggerWebhookEvent('test.webhook', mockPayload);
}

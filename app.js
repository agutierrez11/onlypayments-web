// app.js - Interactividad del micrositio Onlypayments LATAM

// Inicialización de datos de la comunidad en localStorage para interactividad real
let communityPosts = [];

function initCommunityData() {
  const saved = localStorage.getItem("onlypayments_posts");
  if (saved) {
    try {
      communityPosts = JSON.parse(saved);
    } catch (e) {
      communityPosts = [...INITIAL_POSTS];
    }
  } else {
    communityPosts = [...INITIAL_POSTS];
    localStorage.setItem("onlypayments_posts", JSON.stringify(communityPosts));
  }
}

// ── DOM LOAD ──
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCommunityData();
  
  // Render inicial de métodos de pago (México por defecto)
  selectCountry("MX", document.querySelector('[data-country="MX"]'));
  
  // Render inicial de proveedores de pago (Regional por defecto)
  selectProviderRegion("REGIONAL", document.querySelector('[data-region="REGIONAL"]'));

  // Render de Ecosistema
  renderEcosystem();
  
  // Inicializar estilo del botón activo de la biblioteca
  const defaultLibBtn = document.getElementById("btn-tab-quien");
  if (defaultLibBtn) {
    defaultLibBtn.style.background = "rgba(124, 58, 237, 0.1)";
    defaultLibBtn.style.borderColor = "var(--primary)";
  }

  // Render de Noticias
  renderNews("all");
  
  // Render de Comunidad
  renderPosts();
  
  // Render de Colaboradores
  renderContributors();

  // Actualizar stats
  updateStats();
});

// Menú móvil
function toggleMobileMenu() {
  const menu = document.getElementById("nav-mobile");
  menu.classList.toggle("open");
}

// ── MÉTODOS DE PAGO ──
function selectCountry(countryCode, element) {
  // Activar botón del selector
  const buttons = document.querySelectorAll(".country-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (element) {
    element.classList.add("active");
  } else {
    const btn = document.querySelector(`[data-country="${countryCode}"]`);
    if (btn) btn.classList.add("active");
  }

  const country = COUNTRIES[countryCode];
  const methods = PAYMENT_METHODS[countryCode] || [];

  // Actualizar banner del país
  const banner = document.getElementById("country-banner");
  const fintechLink = country.fintechChamber
    ? `<a href="${country.fintechChamber.url}" target="_blank" rel="noopener" class="fintech-chamber-link" style="color:var(--secondary); font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:4px; border-bottom: 1px dotted var(--secondary);">🏛️ ${country.fintechChamber.name} ↗</a>`
    : '';

  banner.innerHTML = `
    <div class="country-banner-inner">
      <span class="country-banner-flag">${country.flag}</span>
      <div>
        <h3 class="country-banner-title">Ecosistema de Pagos en ${country.name}</h3>
        <p class="country-banner-desc">${country.description}</p>
        <div class="country-banner-meta">
          <span><strong>Moneda local:</strong> ${country.currency}</span>
          <span><strong>MRR Transaccionado (est.):</strong> ${country.mrr}</span>
          <span><strong>Crecimiento anual:</strong> ${country.growth}</span>
          ${fintechLink ? `<span><strong>Cámara Fintech:</strong> ${fintechLink}</span>` : ''}
        </div>
      </div>
    </div>
  `;

  // Renderizar tarjetas de métodos de pago
  const grid = document.getElementById("methods-grid");
  if (methods.length === 0) {
    grid.innerHTML = `<div class="empty-state">No hay métodos registrados para este país aún. ¡Sé el primero en colaborar!</div>`;
    return;
  }

  grid.innerHTML = methods.map(method => {
    const providersList = method.providers && method.providers.length > 0
      ? method.providers.map(p => `<span class="provider-tag">${p}</span>`).join("")
      : `<span class="provider-tag">Varios</span>`;

    return `
      <div class="method-card">
        <div class="method-header">
          <span class="method-logo" role="img">${method.logo}</span>
          <div>
            <h4 class="method-name">${method.name}</h4>
            <span class="method-badge">${method.type}</span>
          </div>
        </div>
        <p class="method-desc">${method.description}</p>
        <div class="method-details">
          <div class="method-detail-item">
            <span class="method-detail-label">Liquidación (Settlement)</span>
            <span class="method-detail-val">${method.settlement}</span>
          </div>
          <div class="method-detail-item">
            <span class="method-detail-label">Comisión estimada</span>
            <span class="method-detail-val">${method.fee}</span>
          </div>
        </div>
        <div class="method-providers">
          <span class="providers-label">Procesadores / Gateways:</span>
          <div class="providers-list">${providersList}</div>
        </div>
        <div class="method-compliance">
          <strong>⚠️ Compliance / Riesgo:</strong> ${method.compliance}
        </div>
      </div>
    `;
  }).join("");
}

// ── ECOSISTEMA ──
let currentFlowType = '4partes';

function renderEcosystem() {
  const grid = document.getElementById("actors-grid");
  grid.innerHTML = ECOSYSTEM_ACTORS.map(actor => `
    <div class="actor-card" onclick="highlightEcosystemStep(${actor.id})">
      <div class="actor-header">
        <h4 class="actor-title">${actor.title}</h4>
      </div>
      <div class="actor-role">${actor.role}</div>
      <p class="actor-desc">${actor.description}</p>
    </div>
  `).join("");

  // Inicializar diagrama en el modelo de 4 partes
  switchFlowDiagram('4partes', document.querySelector('.flow-btn.active'));
}

function switchFlowDiagram(flowType, element) {
  currentFlowType = flowType;
  
  // Activar botón del selector
  const buttons = document.querySelectorAll(".flow-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (element) {
    element.classList.add("active");
  }

  const diagram = document.getElementById("flow-diagram");
  
  if (flowType === '4partes') {
    diagram.innerHTML = `
      <div class="flow-steps-container">
        <div class="flow-step" id="flow-step-1">
          <div class="flow-step-num">1</div>
          <div class="flow-step-text">Usuario compra</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step" id="flow-step-3">
          <div class="flow-step-num">3</div>
          <div class="flow-step-text">Gateway encripta</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step" id="flow-step-4">
          <div class="flow-step-num">4</div>
          <div class="flow-step-text">Adquirente procesa</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step" id="flow-step-5">
          <div class="flow-step-num">5</div>
          <div class="flow-step-text">Red valida (Visa/MC)</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step" id="flow-step-6">
          <div class="flow-step-num">6</div>
          <div class="flow-step-text">Emisor aprueba fondos</div>
        </div>
      </div>
      <div class="flow-explanation-box">
        <strong>Modelo estándar internacional de 4 partes:</strong> Separa al tarjetahabiente (1), al comercio (2), al adquirente (4 - ej. Getnet, BBVA) y al emisor (6 - ej. Santander, Nu). Las marcas globales (5 - Visa, Mastercard) interconectan a todos y cobran comisiones en base a la Tasa de Intercambio.
      </div>
      <div class="flow-caption">Haz clic en cualquier actor de la grilla de arriba para ver su rol en la cadena.</div>
    `;
  } else if (flowType === 'mexico') {
    diagram.innerHTML = `
      <div class="flow-steps-container">
        <div class="flow-step" id="flow-step-1">
          <div class="flow-step-num">1</div>
          <div class="flow-step-text">Usuario compra</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step" id="flow-step-3">
          <div class="flow-step-num">3</div>
          <div class="flow-step-text">Gateway encripta</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step" id="flow-step-4">
          <div class="flow-step-num">4</div>
          <div class="flow-step-text">Adquirente local</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step" id="flow-step-custom-mex" style="border-color: var(--secondary); background: rgba(13, 148, 136, 0.05);">
          <div class="flow-step-num" style="color:var(--secondary)">⚡</div>
          <div class="flow-step-text" style="color:var(--secondary); font-weight:600;">Switch Local (Prosa / E-Global)</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step" id="flow-step-6">
          <div class="flow-step-num">6</div>
          <div class="flow-step-text">Emisor mexicano</div>
        </div>
      </div>
      <div class="flow-explanation-box">
        <strong>Flujo doméstico en México con Cámaras de Compensación:</strong> Para tarjetas mexicanas cobradas en terminales o checkouts mexicanos, la transacción no sale a las redes globales de Visa/Mastercard. En su lugar, se rutea mediante **Prosa** o **E-Global** (cámaras de compensación locales reguladas) directo al emisor mexicano. Esto reduce los costos de marcas extranjeras y agiliza la compensación.
      </div>
      <div class="flow-caption">Las cámaras de compensación locales son el switch transaccional doméstico de México.</div>
    `;
  } else if (flowType === '3partes') {
    diagram.innerHTML = `
      <div class="flow-steps-container">
        <div class="flow-step" id="flow-step-1">
          <div class="flow-step-num">1</div>
          <div class="flow-step-text">Tarjetahabiente</div>
        </div>
        <div class="flow-arrow">⇄</div>
        <div class="flow-step" id="flow-step-custom-3p" style="border-color: var(--primary); background: rgba(124, 58, 237, 0.05);">
          <div class="flow-step-num">🏢</div>
          <div class="flow-step-text" style="color:var(--primary-light); font-weight:600;">Entidad Única (Emisor + Adquirente)</div>
        </div>
        <div class="flow-arrow">⇄</div>
        <div class="flow-step" id="flow-step-2">
          <div class="flow-step-num">2</div>
          <div class="flow-step-text">Comercio (Merchant)</div>
        </div>
      </div>
      <div class="flow-explanation-box">
        <strong>Modelo cerrado de 3 partes:</strong> El emisor y el adquirente son el mismo actor (ej. American Express, que emite la tarjeta y a la vez afilia al comercio directamente). En **Chile, el modelo histórico de Transbank** operaba como un modelo de 3 partes de facto al concentrar la adquirencia y el mandato exclusivo de emisión bancaria bajo un único operador.
      </div>
      <div class="flow-caption">Un esquema cerrado de 3 partes que centraliza las comisiones en una única entidad reguladora.</div>
    `;
  }
}

function highlightEcosystemStep(id) {
  // Quitar clase activa a todas las tarjetas de actores
  const cards = document.querySelectorAll(".actor-card");
  cards.forEach((card, idx) => {
    if (idx === id - 1) {
      card.classList.add("active-highlight");
    } else {
      card.classList.remove("active-highlight");
    }
  });

  // Resaltar en el diagrama si aplica
  const steps = document.querySelectorAll(".flow-step");
  steps.forEach(step => step.classList.remove("active-step"));
  
  const activeStep = document.getElementById(`flow-step-${id}`);
  if (activeStep) {
    activeStep.classList.add("active-step");
  }
}

// ── BIBLIOTECA DE EXPERTOS ──
function switchLibraryTab(tabName, element) {
  // Desactivar todas las pestañas
  const tabBtns = document.querySelectorAll(".lib-tab-btn");
  tabBtns.forEach(btn => {
    btn.classList.remove("active");
    btn.style.background = "var(--bg-card)";
    btn.style.borderColor = "var(--border)";
  });

  // Activar botón pulsado
  if (element) {
    element.classList.add("active");
    element.style.background = "rgba(124, 58, 237, 0.1)";
    element.style.borderColor = "var(--primary)";
  }

  // Ocultar todos los contenidos de pestaña
  const tabContents = document.querySelectorAll(".lib-tab-content");
  tabContents.forEach(content => content.style.display = "none");

  // Mostrar el correspondiente
  const activeContent = document.getElementById(`lib-content-${tabName}`);
  if (activeContent) {
    activeContent.style.display = "block";
  }

  // Si abrimos la pestaña de diccionario, renderizar glosario por primera vez
  if (tabName === 'diccionario') {
    renderGlossary();
  }
}

function renderGlossary(filteredTerms = null) {
  const grid = document.getElementById("glossary-grid");
  const terms = filteredTerms || GLOSSARY_TERMS;

  if (terms.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 32px;">No se encontraron conceptos para tu búsqueda.</div>`;
    return;
  }

  grid.innerHTML = terms.map(t => `
    <div class="glossary-card" style="background:var(--bg-card); border:1px solid var(--border); border-radius:10px; padding:20px; transition:var(--transition); position:relative; overflow:hidden; text-align:left;">
      <div style="position:absolute; top:0; left:0; width:4px; height:100%; background:var(--primary);"></div>
      <h4 style="font-size:16px; font-weight:700; margin-bottom:8px; color:var(--text-main);">${t.term}</h4>
      <p style="font-size:13px; color:var(--text-muted); line-height:1.5; margin:0;">${t.definition}</p>
    </div>
  `).join("");
}

function searchGlossary() {
  const query = document.getElementById("glossary-search").value.toLowerCase().trim();
  
  if (!query) {
    renderGlossary();
    return;
  }

  const filtered = GLOSSARY_TERMS.filter(t => 
    t.term.toLowerCase().includes(query) || 
    t.definition.toLowerCase().includes(query)
  );

  renderGlossary(filtered);
}

// ── NOTICIAS ──
function filterNews(tag, element) {
  const buttons = document.querySelectorAll(".news-filter");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (element) element.classList.add("active");

  renderNews(tag);
}

function renderNews(tag) {
  const grid = document.getElementById("news-grid");
  const filtered = tag === "all" ? NEWS : NEWS.filter(n => n.tag === tag || n.subtag === tag);

  grid.innerHTML = filtered.map(item => `
    <article class="news-card">
      <div class="news-header">
        <span class="news-tag">${item.tag}</span>
        <span class="news-subtag">${item.subtag}</span>
        <span class="news-date">${item.date}</span>
      </div>
      <h3 class="news-title">${item.title}</h3>
      <p class="news-summary">${item.summary}</p>
      <div class="news-body-content" id="news-body-${item.id}" style="display: none;">
        <p>${item.content}</p>
      </div>
      <div class="news-footer">
        <span class="news-author">Por: <strong>${item.author}</strong></span>
        <button class="news-expand-btn" onclick="toggleNews(${item.id}, this)">Leer completo ↓</button>
      </div>
    </article>
  `).join("");
}

function toggleNews(id, btn) {
  const body = document.getElementById(`news-body-${id}`);
  if (body.style.display === "none") {
    body.style.display = "block";
    btn.textContent = "Cerrar ↑";
  } else {
    body.style.display = "none";
    btn.textContent = "Leer completo ↓";
  }
}

// ── COLABORADORES ──
function renderContributors() {
  const grid = document.getElementById("contributors-grid");
  grid.innerHTML = CONTRIBUTORS.map(c => `
    <div class="contributor-card">
      <img src="${c.avatar}" alt="${c.name}" class="contributor-avatar">
      <h3 class="contributor-name">
        ${c.name}
        ${c.verified ? '<span class="verified-badge" title="Colaborador verificado">✓</span>' : ''}
      </h3>
      <div class="contributor-role">${c.role}</div>
      <p class="contributor-bio">${c.bio}</p>
      <div class="contributor-tags">
        ${c.contributions.map(tag => `<span class="contributor-tag">${tag}</span>`).join("")}
      </div>
      <a href="${c.linkedin}" target="_blank" rel="noopener" class="contributor-linkedin-btn">
        Conectar en LinkedIn
      </a>
    </div>
  `).join("");
}

// ── COMUNIDAD / REDDIT ──
let currentSort = "hot";

function sortPosts(sortBy, element) {
  currentSort = sortBy;
  const buttons = document.querySelectorAll(".sort-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (element) element.classList.add("active");

  renderPosts();
}

function renderPosts() {
  const feed = document.getElementById("posts-feed");
  
  // Clonar y ordenar posts
  let posts = [...communityPosts];
  if (currentSort === "new") {
    posts.reverse(); // El orden original tiene los más viejos primero
  } else if (currentSort === "top") {
    posts.sort((a, b) => b.upvotes - a.upvotes);
  } else {
    // Hot logic simplificada: votos + comentarios
    posts.sort((a, b) => (b.upvotes + b.commentsCount * 2) - (a.upvotes + a.commentsCount * 2));
  }

  feed.innerHTML = posts.map(post => `
    <div class="post-card" id="post-${post.id}">
      <div class="post-vote-col">
        <button class="vote-btn upvote-btn" onclick="votePost('${post.id}', 1)" title="Votar positivo">▲</button>
        <span class="vote-count">${post.upvotes}</span>
        <button class="vote-btn downvote-btn" onclick="votePost('${post.id}', -1)" title="Votar negativo">▼</button>
      </div>
      <div class="post-main">
        <div class="post-header-info">
          <span class="post-badge-tag">${post.tag}</span>
          ${post.country ? `<span class="post-badge-country">${post.country}</span>` : ""}
          <span class="post-meta-text">Publicado por <strong>${post.author}</strong> (${post.authorTitle || 'Miembro'}) · ${post.time || 'Hace poco'}</span>
        </div>
        <h3 class="post-title-text">${post.title}</h3>
        <p class="post-body-text">${post.body}</p>
        
        <div class="post-actions-row">
          <button class="action-btn" onclick="toggleComments('${post.id}')">
            💬 ${post.commentsCount} Comentarios
          </button>
          <button class="action-btn" onclick="sharePost('${post.id}')">
            🔗 Compartir
          </button>
        </div>

        <!-- Sección de comentarios expandible -->
        <div class="comments-section" id="comments-sec-${post.id}" style="display: none;">
          <div class="comments-list">
            ${post.comments.map(c => `
              <div class="comment-item">
                <div class="comment-header">
                  <span class="comment-author">${c.author}</span>
                  <span class="comment-time">${c.time}</span>
                </div>
                <p class="comment-body">${c.body}</p>
                <div class="comment-actions">
                  <button class="comment-vote" onclick="voteComment('${post.id}', '${c.id}')">▲ ${c.upvotes || 0}</button>
                </div>
              </div>
            `).join("")}
          </div>
          <!-- Formulario de nuevo comentario -->
          <div class="new-comment-form">
            <input type="text" placeholder="Tu nombre..." class="comment-input comment-author-input" id="c-author-${post.id}">
            <textarea placeholder="Escribe tu comentario/respuesta..." class="comment-input comment-body-input" id="c-body-${post.id}" rows="2"></textarea>
            <button class="btn btn-primary btn-sm" onclick="submitComment('${post.id}')">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function votePost(postId, val) {
  const post = communityPosts.find(p => p.id === postId);
  if (post) {
    post.upvotes += val;
    localStorage.setItem("onlypayments_posts", JSON.stringify(communityPosts));
    renderPosts();
    updateStats();
  }
}

function voteComment(postId, commentId) {
  const post = communityPosts.find(p => p.id === postId);
  if (post) {
    const comment = post.comments.find(c => c.id === commentId);
    if (comment) {
      comment.upvotes = (comment.upvotes || 0) + 1;
      localStorage.setItem("onlypayments_posts", JSON.stringify(communityPosts));
      renderPosts();
      // Mantener la sección de comentarios abierta
      document.getElementById(`comments-sec-${postId}`).style.display = "block";
    }
  }
}

function toggleComments(postId) {
  const sec = document.getElementById(`comments-sec-${postId}`);
  if (sec.style.display === "none") {
    sec.style.display = "block";
  } else {
    sec.style.display = "none";
  }
}

function submitPost() {
  const title = document.getElementById("post-title").value.trim();
  const body = document.getElementById("post-body").value.trim();
  const tag = document.getElementById("post-tag").value;
  const country = document.getElementById("post-country").value;
  let author = document.getElementById("post-author").value.trim();

  if (!title) {
    alert("Por favor ingresa un título para la discusión.");
    return;
  }

  if (!author) {
    author = "Anónimo";
  }

  const newPost = {
    id: "post-" + Date.now(),
    title: title,
    body: body,
    author: author,
    authorTitle: "Miembro",
    tag: tag,
    country: country || null,
    upvotes: 1,
    commentsCount: 0,
    comments: [],
    time: "Hace unos segundos"
  };

  communityPosts.unshift(newPost); // Agregar al inicio
  localStorage.setItem("onlypayments_posts", JSON.stringify(communityPosts));
  
  // Limpiar formulario
  document.getElementById("post-title").value = "";
  document.getElementById("post-body").value = "";
  document.getElementById("post-author").value = "";

  renderPosts();
  updateStats();
  alert("¡Publicación enviada con éxito!");
}

function submitComment(postId) {
  const authorInput = document.getElementById(`c-author-${postId}`);
  const bodyInput = document.getElementById(`c-body-${postId}`);
  
  const author = authorInput.value.trim() || "Anónimo";
  const body = bodyInput.value.trim();

  if (!body) {
    alert("El comentario no puede estar vacío.");
    return;
  }

  const post = communityPosts.find(p => p.id === postId);
  if (post) {
    const newComment = {
      id: "comment-" + Date.now(),
      author: author,
      body: body,
      time: "Hace unos segundos",
      upvotes: 0
    };
    
    post.comments.push(newComment);
    post.commentsCount = post.comments.length;
    localStorage.setItem("onlypayments_posts", JSON.stringify(communityPosts));
    
    // Limpiar inputs
    authorInput.value = "";
    bodyInput.value = "";
    
    renderPosts();
    // Dejar la sección abierta
    document.getElementById(`comments-sec-${postId}`).style.display = "block";
  }
}

function sharePost(postId) {
  const dummy = document.createElement('input');
  const text = window.location.href.split('#')[0] + "#post-" + postId;
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  alert("¡Enlace copiado al portapapeles! Comparte este debate.");
}

// ── STATS ──
function updateStats() {
  // Métodos
  let totalMethods = 0;
  for (let country in PAYMENT_METHODS) {
    totalMethods += PAYMENT_METHODS[country].length;
  }
  document.getElementById("stat-methods").textContent = `${totalMethods}+`;
  
  // Discusiones
  document.getElementById("stat-posts").textContent = communityPosts.length;
}

// ── PROVEEDORES DE PAGO ──
function selectProviderRegion(regionCode, element) {
  // Activar botón del selector
  const filterBtns = document.querySelectorAll(".provider-filter-btn");
  filterBtns.forEach(btn => btn.classList.remove("active"));
  if (element) {
    element.classList.add("active");
  } else {
    const btn = document.querySelector(`[data-region="${regionCode}"]`);
    if (btn) btn.classList.add("active");
  }

  const providers = PAYMENT_PROVIDERS[regionCode] || [];
  const grid = document.getElementById("providers-grid");

  if (providers.length === 0) {
    grid.innerHTML = `<div class="empty-state">No hay proveedores registrados para esta región aún.</div>`;
    return;
  }

  grid.innerHTML = providers.map(p => `
    <div class="provider-card">
      <div class="provider-card-header">
        <h4 class="provider-card-title">${p.name}</h4>
        <span class="provider-card-role">${p.role}</span>
      </div>
      <p class="provider-card-desc">${p.desc}</p>
      <div class="provider-card-footer">
        <span class="provider-card-label">Cobertura:</span>
        <span class="provider-card-countries">${p.countries}</span>
      </div>
    </div>
  `).join("");
}

// ── GESTIÓN DE TEMA CLARO / OSCURO ──
function initTheme() {
  const savedTheme = localStorage.getItem("onlypayments_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeUI(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("onlypayments_theme", newTheme);
  updateThemeUI(newTheme);
}

function updateThemeUI(theme) {
  const toggleBtn = document.getElementById("theme-toggle");
  const toggleBtnMobile = document.getElementById("theme-toggle-mobile");
  
  if (theme === "light") {
    if (toggleBtn) toggleBtn.textContent = "☀️";
    if (toggleBtnMobile) toggleBtnMobile.textContent = "☀️ Modo Claro";
  } else {
    if (toggleBtn) toggleBtn.textContent = "🌙";
    if (toggleBtnMobile) toggleBtnMobile.textContent = "🌙 Modo Oscuro";
  }
}

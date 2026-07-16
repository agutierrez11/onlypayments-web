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
  initCommunityData();
  
  // Render inicial de métodos de pago (México por defecto)
  selectCountry("MX", document.querySelector('[data-country="MX"]'));
  
  // Render de Ecosistema
  renderEcosystem();
  
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

  grid.innerHTML = methods.map(method => `
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
      <div class="method-compliance">
        <strong>⚠️ Compliance / Riesgo:</strong> ${method.compliance}
      </div>
    </div>
  `).join("");
}

// ── ECOSISTEMA ──
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

  // Dibujar el diagrama de flujo simplificado
  const diagram = document.getElementById("flow-diagram");
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
    <div class="flow-caption">Haz clic en cualquier actor de la grilla de arriba para ver su rol en la cadena.</div>
  `;
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

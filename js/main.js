/* =========================================================
   PORTFOLIO LIVA MARIO — V4
   ---------------------------------------------------------
   POUR PERSONNALISER :
   1. Modifiez le tableau PROJECTS juste en dessous
      (titres, textes, noms des fichiers photos / vidéo).
   2. Déposez vos fichiers dans assets/photos/ et assets/videos/
      avec EXACTEMENT les noms indiqués.
   ========================================================= */

const PROJECTS = [
  {
    id: 1, code: 'P-01', sheet: 'A-02.1',
    title: 'Projet Manakara',
    tagline: 'Habitation à étage — modélisation 3D & visite virtuelle',
    place: 'Manakara',
    desc: "Modélisation d'une habitation à étage et rendu réaliste sous Lumion pour une visite virtuelle du projet avant construction : volumes, façades, aménagements extérieurs et ambiance du site.",
    meta: [
      ['LIEU', 'Manakara, Madagascar'],
      ['TYPOLOGIE', 'Bâtiment — R+1'],
      ['OUTILS', 'ArchiCAD · Lumion'],
      ['MISSION', 'Modélisation & rendu 3D']
    ],
    cover: 'assets/videos/projet-manakara.jpg',
    video: { file: 'assets/videos/projet-manakara.mp4', poster: 'assets/videos/projet-manakara.jpg', label: 'Visite virtuelle du projet' },
    photos: [
      { file: 'assets/photos/1 (1).png', label: 'Façade principale' },
      { file: 'assets/photos/1 (2).png', label: 'Vue sur le jardin' },
      { file: 'assets/photos/1 (4).png', label: 'Plan de masse' },
      { file: 'assets/photos/1 (5).png', label: 'Ambiance extérieure' }
    ]
  },
  {
    id: 2, code: 'P-02', sheet: 'A-02.2',
    title: 'Suite du projet Manakara',
    tagline: 'Contrôle qualité, sécurité et avancement des travaux',
    place: 'Madagascar',
    desc: "Pilotage de chantier au quotidien : lecture des plans, contrôle de la qualité d'exécution, encadrement des équipes et suivi de l'avancement, avec un taux de conformité de 95 % aux normes applicables.",
    meta: [
      ['LIEU', 'Madagascar'],
      ['TYPOLOGIE', 'Bâtiment — gros œuvre'],
      ['ENTREPRISE', 'Ma-Variana'],
      ['MISSION', 'Chef de chantier']
    ],
    cover: 'assets/photos/1 (6).png',
    video: { file: 'assets/videos/projet-manakara-2.mp4', poster: 'assets/videos/suivi-qualite.jpg', label: 'Suivi qualité sur site' },
    photos: [
      { file: 'assets/photos/1 (6).png', label: 'Vue générale du chantier' },
      { file: 'assets/photos/1 (7).png', label: 'Contrôle qualité' },
      { file: 'assets/photos/1 (8).png', label: 'Équipe sur site' },
      { file: 'assets/photos/1 (9).png', label: 'Lecture de plans' }
    ]
  }
];

const TOOLS = [
  { k: 'CAD', n: 'AutoCAD', s: 'Dessin et mise à jour de plans', c: 'sw-cad' },
  { k: 'A',   n: 'ArchiCAD', s: 'Modélisation 2D et 3D, rendu et plans architecturaux', c: 'sw-archi' },
  { k: 'L',   n: 'Lumion', s: 'Rendu réaliste du modèle pour une visite virtuelle du projet', c: 'sw-lum' },
  { k: 'R',   n: 'Robot Structural Analysis', s: 'Connaissance de base sur les calculs de structures', c: 'sw-rob' },
  { k: 'G',   n: 'GanttProject', s: 'Planification et suivi de projet', c: 'sw-gantt' },
  { k: 'X',   n: 'Excel', s: 'Tableaux et calculs', c: 'sw-xls' },
  { k: 'W',   n: 'Word', s: 'Rédaction et mise en forme de documents techniques', c: 'sw-word' },
  { k: 'P',   n: 'PowerPoint', s: 'Présentations professionnelles', c: 'sw-ppt' }
];

/* ========================================================= */
(() => {
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const html = document.documentElement, body = document.body;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const byId = id => PROJECTS.find(p => p.id === id);
  const pad = n => String(n).padStart(2, '0');

  /* ---------- découpe de titres en mots (révélation) ---------- */
  function splitNode(node, st) {
    [...node.childNodes].forEach(ch => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach(tok => {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const s = document.createElement('span'); s.textContent = tok; s.style.setProperty('--wi', st.i++);
          w.appendChild(s); frag.appendChild(w);
        });
        ch.replaceWith(frag);
      } else if (ch.nodeType === 1) splitNode(ch, st);
    });
  }
  $$('[data-split]').forEach(el => { el.setAttribute('aria-label', el.textContent.trim()); splitNode(el, { i: 0 }); });
  const h1 = $('.hero-h1'); h1.style.setProperty('--base', '900ms');

  /* ---------- élévation architecturale (SVG dessiné) ---------- */
  (function buildElevation() {
    const svg = $('#elevation'); if (!svg) return;
    const out = []; let k = 0;
    const L = (x1, y1, x2, y2, c = '') => out.push(`<line class="draw ${c}" style="--k:${k++}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`);
    const R = (x, y, w, h, c = '') => out.push(`<rect class="draw ${c}" style="--k:${k++}" x="${x}" y="${y}" width="${w}" height="${h}"/>`);
    const P = (d, c = '') => out.push(`<path class="draw ${c}" style="--k:${k++}" d="${d}"/>`);
    const T = (x, y, t, c = '', a = 'middle') => out.push(`<text class="txt ${c}" x="${x}" y="${y}" text-anchor="${a}">${t}</text>`);
    const grid = (x, y, cols, rows, w, h, gx, gy) => { for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) R(x + c * (w + gx), y + r * (h + gy), w, h); };

    const G = 200; // ligne de sol
    L(0, G, 1200, G, 'ground');
    // repère de niveau ±0.00
    P(`M36 ${G} l8 -12 l8 12 z`, 'or'); T(66, G - 4, '±0.00', 'or', 'start');

    // A — maison à étage, toiture à deux pentes
    R(110, 105, 200, 95); L(110, 152, 310, 152);
    P('M92 105 L210 52 L328 105 Z');
    L(210, 52, 210, 105, 'dim');
    grid(132, 118, 3, 1, 36, 24, 26, 0);
    grid(130, 164, 2, 1, 34, 24, 90, 0);
    R(196, 160, 28, 40, 'or');
    // dimension A
    L(110, 222, 310, 222, 'dim'); L(110, 216, 110, 228, 'dim'); L(310, 216, 310, 228, 'dim'); T(210, 240, '8.00', '');

    // B — immeuble 3 niveaux, toit-terrasse
    R(430, 60, 310, 140); L(430, 107, 740, 107); L(430, 153, 740, 153);
    R(424, 50, 322, 10, 'or');
    grid(447, 73, 7, 1, 28, 22, 14, 0);
    grid(447, 120, 7, 1, 28, 22, 14, 0);
    grid(447, 166, 3, 1, 28, 22, 14, 0);
    grid(627, 166, 3, 1, 28, 22, 14, 0);
    R(573, 163, 34, 37, 'or');
    // dimension B (largeur) + hauteur
    L(430, 222, 740, 222, 'dim'); L(430, 216, 430, 228, 'dim'); L(740, 216, 740, 228, 'dim'); T(585, 240, '12.40', '');
    L(772, 50, 772, G, 'dim'); L(766, 50, 778, 50, 'dim'); L(766, G, 778, G, 'dim'); T(782, 128, '+10.50', 'or', 'start');

    // C — annexe à toiture monopente
    R(800, 150, 100, 50); P('M790 150 L912 134');
    grid(818, 164, 2, 1, 24, 22, 14, 0); L(800, G, 900, G);

    // grue à tour
    out.push('<g class="crane">');
    L(1044, G, 1044, 30, ''); L(1058, G, 1058, 30, '');
    let z = ''; for (let y = G; y > 34; y -= 24) z += `M1044 ${y} L1058 ${y - 24} M1058 ${y} L1044 ${y - 24} `; P(z, 'dim');
    out.push('<g class="crane-jib">');
    L(950, 30, 1160, 30, 'or'); L(950, 30, 950, 40, 'or'); L(1044, 30, 1051, 14, 'dim'); L(1058, 30, 1051, 14, 'dim');
    L(1051, 14, 970, 30, 'dim'); L(1051, 14, 1150, 30, 'dim');
    L(1118, 30, 1118, 96, 'dim'); R(1106, 96, 24, 14, 'or');
    L(1160, 30, 1160, 42, 'or'); R(1150, 42, 20, 12, '');
    out.push('</g></g>');
    T(1051, 8, 'GRUE', '', 'middle');

    svg.innerHTML = out.join('');
    $$('.draw', svg).forEach(el => el.setAttribute('pathLength', '1'));
  })();

  /* ---------- outils (boîte à outils) ---------- */
  (function tools() {
    const grid = $('#toolGrid'), name = $('#tpName'), sub = $('#tpSub'), sw = $('#tpSwatch'), panel = $('#toolPanel');
    grid.innerHTML = TOOLS.map((t, i) => `<button class="tool" role="tab" aria-selected="false" data-i="${i}"><span class="sw ${t.c}">${esc(t.k)}</span><span>${esc(t.n.split(' ')[0])}</span></button>`).join('');
    const btns = $$('.tool', grid);
    const select = i => {
      const t = TOOLS[i];
      btns.forEach((b, j) => { b.classList.toggle('active', i === j); b.setAttribute('aria-selected', i === j); });
      name.textContent = t.n; sub.textContent = t.s; sw.className = 'tp-swatch ' + t.c;
      [name, sub].forEach(e => { e.classList.remove('swap'); void e.offsetWidth; e.classList.add('swap'); });
    };
    btns.forEach((b, i) => b.addEventListener('click', () => select(i)));
    select(0);
  })();

  /* ---------- jauges de langues ---------- */
  $$('.scale').forEach(s => {
    const on = +s.dataset.on;
    s.innerHTML = Array.from({ length: 8 }, (_, i) => `<i class="${i < on ? 'on' : ''}" style="--n:${i}"></i>`).join('');
  });

  /* ---------- cartes projets ---------- */
  $('#cards').innerHTML = PROJECTS.map((p, i) => `
    <a href="#/projet/${p.id}" class="card" data-id="${p.id}" data-cursor="Ouvrir" style="transition-delay:${i * .12}s" aria-label="Ouvrir le projet ${esc(p.title)}">
      <div class="card-top mono"><span><b>${p.code}</b> · PLANCHE ${p.sheet}</span><span>${esc(p.place.toUpperCase())}</span></div>
      <div class="card-img">
        <span class="c tl"></span><span class="c tr"></span><span class="c bl"></span><span class="c br"></span>
        <img src="${esc(p.cover)}" alt="" loading="lazy">
        <div class="ghost mono"><b>${p.code}</b>${esc(p.cover)}</div>
        <div class="card-badges mono"><span>▶ 1 VIDÉO</span><span>${p.photos.length} PHOTOS</span></div>
      </div>
      <div class="card-body">
        <h3>${esc(p.title)}</h3><p>${esc(p.tagline)}</p>
        <div class="card-go mono"><span>OUVRIR LA PLANCHE</span><span class="arr">→</span></div>
      </div>
    </a>`).join('');
  $$('.card-img img').forEach(img => {
    const miss = () => img.parentNode.classList.add('missing');
    img.addEventListener('error', miss); if (img.complete && !img.naturalWidth) miss();
  });

  /* ---------- révélations au scroll ---------- */
  function observe(root, sel) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { root, threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    $$(sel, root || document).forEach(el => { if (!el.classList.contains('hero-h1')) io.observe(el); });
  }
  observe(null, '.rv,[data-split],.sec-head,.card,.gauge,.rod');

  /* ---------- navigation : état, lien actif, mire ---------- */
  const nav = $('#nav'), mire = $('#mire'), mark = $('#mireMark');
  const secs = ['apropos', 'projets', 'parcours', 'competences', 'contact'].map(id => $('#' + id));
  const links = $$('.nav-links a, .nav-cta');
  let ticking = false;
  function onScroll() {
    const y = scrollY, max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = Math.min(1, Math.max(0, y / max));
    nav.classList.toggle('scrolled', y > 30);
    mark.textContent = '+' + (p * 18).toFixed(2) + ' m';
    mark.style.top = (p * 100) + '%';
    let cur = null; secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.dataset.sec === cur));
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  const burger = $('#burger');
  const setMenu = o => { body.classList.toggle('menu-open', o); burger.setAttribute('aria-expanded', o); $('#menu').setAttribute('aria-hidden', !o); };
  burger.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  $$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ---------- curseur ---------- */
  if (fine && !reduce) {
    const cur = $('#cursor'), lab = $('#curLabel');
    html.classList.add('has-cursor');
    let tx = -100, ty = -100, x = tx, y = ty;
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; cur.classList.add('on'); }, { passive: true });
    document.addEventListener('mouseleave', () => cur.classList.remove('on'));
    (function loop() { x += (tx - x) * 0.2; y += (ty - y) * 0.2; cur.style.transform = `translate(${x}px,${y}px)`; requestAnimationFrame(loop); })();
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('[data-cursor],a,button');
      const label = t && t.dataset.cursor;
      cur.classList.toggle('hov', !!t && !label);
      cur.classList.toggle('lbl', !!label);
      if (label) lab.textContent = label;
    });
    // léger parallaxe de l'élévation
    const elev = $('#elevation');
    addEventListener('mousemove', e => {
      const mx = e.clientX / innerWidth - .5;
      elev.style.transform = `translateX(${(-mx * 18).toFixed(1)}px)`;
    }, { passive: true });
  }

  /* =======================================================
     VUE PROJET
     ======================================================= */
  const pv = $('#pv'), pvBody = $('#pvBody'), curtainTxt = $('#pvCurtainTxt');
  let currentId = null, lastOrigin = null, closeTimer = null, swapping = false, pvObserver = null;

  const photoHTML = (ph, i) => `
    <figure class="ph ph-${i + 1} rv2" data-cursor="Agrandir" data-src="${esc(ph.file)}" data-label="${esc(ph.label)}">
      <div class="ph-frame"><img src="${esc(ph.file)}" alt="${esc(ph.label)}" loading="lazy">
        <div class="fb mono"><b>${pad(i + 1)}</b>Déposez la photo :<br>${esc(ph.file)}</div>
        <span class="zoom">⤢</span></div>
      <figcaption><span class="mono">FIG. ${pad(i + 1)}</span>${esc(ph.label)}</figcaption>
    </figure>`;

  function viewHTML(p) {
    const idx = PROJECTS.indexOf(p), next = PROJECTS[(idx + 1) % PROJECTS.length];
    return `
    <div class="pv-head">
      <div>
        <p class="pv-code mono pv-a" style="--i:0">${p.code} — PLANCHE ${p.sheet}</p>
        <h2 class="pv-title" aria-label="${esc(p.title)}">${esc(p.title)}</h2>
        <p class="pv-sub pv-a" style="--i:3">${esc(p.tagline)}</p>
      </div>
      <div class="pv-meta pv-a" style="--i:4">${p.meta.map(([k, v]) => `<div><span class="k mono">${esc(k)}</span><span class="v">${esc(v)}</span></div>`).join('')}</div>
    </div>
    <p class="pv-desc pv-a" style="--i:5">${esc(p.desc)}</p>

    <div class="vid rv2">
      <div class="pv-label mono">01 — VIDÉO</div>
      <div class="vid-frame ${p.video.poster ? '' : 'noposter'}" data-cursor="Lire">
        <span class="c tl"></span><span class="c tr"></span><span class="c bl"></span><span class="c br"></span>
        ${p.video.poster ? `<img class="vid-poster" src="${esc(p.video.poster)}" alt="">` : ''}
        <video preload="metadata" playsinline src="${esc(p.video.file)}"></video>
        <div class="nofile mono">Déposez votre vidéo ici :<br>${esc(p.video.file)}</div>
        <span class="nofile-pill mono">VIDÉO À AJOUTER</span>
        <button class="vid-play" aria-label="Lire la vidéo">▶</button>
        <div class="tag mono"><b>VIDÉO</b> — ${esc(p.video.label)}</div>
      </div>
    </div>

    <div class="pv-label mono rv2">02 — PHOTOS · ${p.photos.length} VUES</div>
    <div class="photos">${p.photos.map(photoHTML).join('')}</div>

    <a class="pv-next rv2" href="#/projet/${next.id}" data-next="${next.id}">
      <span class="k mono">PROJET SUIVANT — ${next.code} / ${pad(PROJECTS.length)}</span>
      <span class="t"><b>${esc(next.title)}</b><i>→</i></span>
      <span class="s">${esc(next.tagline)}</span>
    </a>
    <div class="pv-foot mono"><span>${p.code} — ${esc(p.title.toUpperCase())}</span><span>LIVA MARIO RATOVOMALALA · INGÉNIEUR BTP</span></div>`;
  }

  function renderPV(p) {
    $$('video', pvBody).forEach(v => v.pause());
    pvBody.innerHTML = viewHTML(p);
    $('#pvCount').textContent = `${p.code} / ${pad(PROJECTS.length)}`;
    splitNode($('.pv-title', pvBody), { i: 0 });

    // vidéo
    const frame = $('.vid-frame', pvBody), video = $('video', frame), poster = $('.vid-poster', frame), btn = $('.vid-play', frame);
    const missing = () => frame.classList.add('missing');
    video.addEventListener('error', missing);
    if (poster) poster.addEventListener('error', () => { poster.classList.add('gone'); frame.classList.add('noposter'); });
    const play = () => { if (frame.classList.contains('missing') || frame.classList.contains('playing')) return; frame.classList.add('playing'); video.controls = true; video.play().catch(() => {}); };
    btn.addEventListener('click', e => { e.stopPropagation(); play(); });
    frame.addEventListener('click', play);

    // photos
    $$('.ph', pvBody).forEach((fig, i) => {
      const img = $('img', fig);
      const miss = () => { fig.classList.add('missing'); fig.removeAttribute('data-cursor'); };
      img.addEventListener('error', miss);
      fig.addEventListener('click', () => { if (!fig.classList.contains('missing')) openLB(fig); });
    });

    // navigation « projet suivant »
    $('.pv-next', pvBody).addEventListener('click', e => {
      e.preventDefault(); const id = +e.currentTarget.dataset.next;
      swapTo(id, true);
    });

    if (pvObserver) pvObserver.disconnect();
    pvObserver = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); pvObserver.unobserve(e.target); }
    }), { root: pv, threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    setTimeout(() => $$('.rv2, .ph', pvBody).forEach(el => pvObserver.observe(el)), 120);
  }

  // historique (tolérant : certains navigateurs refusent pushState en file://)
  const hist = (type, id) => {
    try {
      const url = id ? '#/projet/' + id : location.pathname + location.search;
      history[type + 'State'](id ? { pv: id } : null, '', url); return true;
    } catch (e) { return false; }
  };

  function openPV(id, origin, push) {
    const p = byId(id); if (!p) return;
    if (pv.classList.contains('open')) { if (id !== currentId) swapTo(id, push); return; }
    clearTimeout(closeTimer);
    lastOrigin = origin || lastOrigin;
    renderPV(p); currentId = id; pv.scrollTop = 0;
    let start = 'inset(50% 0 50% 0)';
    if (origin && !reduce) {
      const r = origin.getBoundingClientRect();
      start = `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px)`;
    }
    pv.style.transition = 'none'; pv.style.clipPath = start;
    pv.classList.remove('in'); pv.classList.add('open'); pv.setAttribute('aria-hidden', 'false');
    html.classList.add('locked'); body.classList.add('pv-open');
    void pv.offsetWidth;
    pv.style.transition = ''; pv.style.clipPath = 'inset(0px 0px 0px 0px)';
    setTimeout(() => { pv.classList.add('in'); $('#pvClose').focus({ preventScroll: true }); }, reduce ? 0 : 520);
    if (push) hist('push', id);
  }

  function closePV() {
    if (!pv.classList.contains('open')) return;
    $$('video', pvBody).forEach(v => v.pause());
    closeLB(true);
    pv.classList.remove('in');
    let end = 'inset(50% 0 50% 0)';
    const card = $(`.card[data-id="${currentId}"]`);
    if (card && !reduce) {
      const r = card.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) end = `inset(${Math.max(0, r.top)}px ${Math.max(0, innerWidth - r.right)}px ${Math.max(0, innerHeight - r.bottom)}px ${Math.max(0, r.left)}px)`;
    }
    pv.style.clipPath = end;
    closeTimer = setTimeout(() => {
      pv.classList.remove('open', 'swap-in', 'swap-out'); pv.setAttribute('aria-hidden', 'true');
      html.classList.remove('locked'); body.classList.remove('pv-open');
      pv.style.clipPath = ''; pvBody.innerHTML = ''; currentId = null; swapping = false;
      if (lastOrigin) lastOrigin.focus({ preventScroll: true });
    }, reduce ? 0 : 980);
  }

  function requestClose() {
    if (history.state && history.state.pv) { history.back(); }
    else { hist('replace', null); closePV(); }
  }

  function swapTo(id, push) {
    const p = byId(id); if (!p || swapping || id === currentId) return;
    swapping = true; closeLB(true);
    curtainTxt.textContent = `${p.code} — ${p.title}`;
    pv.classList.remove('swap-out'); pv.classList.add('swap-in');
    if (push) hist('replace', id);
    setTimeout(() => {
      pv.classList.remove('in'); renderPV(p); currentId = id; pv.scrollTop = 0; void pv.offsetWidth;
      pv.classList.remove('swap-in'); pv.classList.add('swap-out');
      setTimeout(() => pv.classList.add('in'), 250);
      setTimeout(() => { pv.classList.remove('swap-out'); swapping = false; }, 900);
    }, reduce ? 0 : 1000);
  }

  function route() {
    const m = location.hash.match(/^#\/projet\/(\d+)/);
    if (m) {
      const id = +m[1]; if (!byId(id)) return;
      if (!pv.classList.contains('open')) openPV(id, lastOrigin, false); else if (id !== currentId) swapTo(id, false);
    } else if (pv.classList.contains('open')) closePV();
  }
  addEventListener('popstate', route);

  $$('.card').forEach(c => c.addEventListener('click', e => {
    e.preventDefault(); lastOrigin = c; openPV(+c.dataset.id, c, true);
  }));
  $('#pvClose').addEventListener('click', requestClose);
  $('#pvX').addEventListener('click', requestClose);

  /* ---------- lightbox ---------- */
  const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  let lbList = [], lbIdx = 0;
  function showLB(i, animate) {
    lbIdx = (i + lbList.length) % lbList.length;
    const it = lbList[lbIdx];
    const set = () => { lbImg.src = it.src; lbImg.alt = it.label; lbCap.textContent = `FIG. ${pad(it.n)} — ${it.label.toUpperCase()}  ·  ${lbIdx + 1}/${lbList.length}`; lbImg.classList.remove('swap'); };
    if (animate) { lbImg.classList.add('swap'); setTimeout(set, 260); } else set();
  }
  function openLB(fig) {
    lbList = $$('.ph:not(.missing)', pvBody).map(f => ({ src: f.dataset.src, label: f.dataset.label, n: +f.className.match(/ph-(\d)/)[1], el: f }));
    const i = lbList.findIndex(o => o.el === fig);
    showLB(i, false);
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    $('#lbX').focus({ preventScroll: true });
  }
  function closeLB(quick) { if (!lb.classList.contains('open')) return; lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); }
  $('#lbX').addEventListener('click', closeLB);
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  $('#lbPrev').addEventListener('click', () => showLB(lbIdx - 1, true));
  $('#lbNext').addEventListener('click', () => showLB(lbIdx + 1, true));
  let tsx = 0;
  lb.addEventListener('touchstart', e => { tsx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - tsx; if (Math.abs(d) > 50) showLB(lbIdx + (d < 0 ? 1 : -1), true); });

  addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (lb.classList.contains('open')) closeLB();
      else if (pv.classList.contains('open')) requestClose();
      else if (body.classList.contains('menu-open')) setMenu(false);
    }
    if (lb.classList.contains('open')) {
      if (e.key === 'ArrowRight') showLB(lbIdx + 1, true);
      if (e.key === 'ArrowLeft') showLB(lbIdx - 1, true);
    }
  });

  /* =======================================================
     PRÉLOADER → ENTRÉE
     ======================================================= */
  const plCount = $('#plCount'), plBar = $('#plBar');
  const dur = reduce ? 200 : 1800, t0 = performance.now();
  function finish() {
    setTimeout(() => {
      body.classList.add('ready'); h1.classList.add('in');
      setTimeout(() => { body.classList.add('done'); route(); }, reduce ? 0 : 1100);
    }, 250);
  }
  (function tick(t) {
    const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    plCount.textContent = pad(Math.round(e * 100)).padStart(3, '0');
    plBar.style.width = (e * 100) + '%';
    p < 1 ? requestAnimationFrame(tick) : finish();
  })(t0);
})();

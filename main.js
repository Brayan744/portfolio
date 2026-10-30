(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };

  /* ---------------- i18n ---------------- */
  const EN = {
    "nav.about": "About", "nav.projects": "Projects", "nav.journey": "Journey", "nav.certs": "Certificates", "nav.contact": "Contact",
    "hero.status": "Available for freelance projects",
    "hero.hi": "Hi, I'm",
    "hero.lead": "Systems Engineer. I build software that solves real problems: booking systems, inventory tools and AI assistants — from idea to production.",
    "hero.cta1": "See projects", "hero.cta2": "Download CV",
    "hero.fc1a": "Systems Engineer", "hero.fc1b": "Meritorious · 2026",
    "hero.fc2b": "AI assistant", "hero.fc3a": "App in production", "hero.fc3b": "Real client", "hero.scroll": "scroll",
    "about.title": "Engineering with real impact, not just code.",
    "about.p1": "I'm a <b>Systems Engineer from Universidad del Magdalena</b>. My capstone — a natural-language chatbot for the academic community — received a <b>meritorious distinction</b>.",
    "about.p2": "As a freelance developer I work with small businesses end to end: I understand their problem, design the database, build the solution, ship it to production and maintain it. Today a barbershop runs all its appointments on a system I built, and a neighborhood store tracks its inventory and digital payments.",
    "about.p3": "I'm passionate about where <b>software meets artificial intelligence</b>: LLMs, RAG, automation with n8n and APIs. I learn fast, write clear documentation and care about details.",
    "about.s1": "certifications", "about.s2": "projects delivered", "about.s3": "GitHub contributions", "about.s4": "hours of English (SENA)",
    "term.hint": "Type <b>help</b> to see commands. Try: skills, projects, contact.",
    "skills.lang": "Languages", "skills.web": "Web & Backend", "skills.data": "Data", "skills.model": "Relational modeling", "skills.ai": "AI & Automation", "skills.tools": "Tools",
    "proj.title": "Things I've built.", "proj.sub": "Real projects with real clients, and the research that led me into artificial intelligence.",
    "proj.live": "In production",
    "proj.jm": "Booking PWA for a real barbershop. Customers book on their own, the barber manages the schedule, VIP hours and blocked slots, and everyone gets automatic push reminders.",
    "proj.cut": "Pro haircut", "proj.src": "RAG · 3 sources", "d.mon": "Mon", "d.tue": "Tue", "d.wed": "Wed", "d.thu": "Thu", "d.fri": "Fri",
    "proj.push": "Reminder: your appointment is tomorrow at 11:00", "proj.code": "View code",
    "proj.merit": "Meritorious distinction", "proj.thesis": "NLP Chatbot · Thesis",
    "proj.ai": "Virtual assistant for the Systems Engineering academic community (Unimagdalena). It uses LLMs with Retrieval-Augmented Generation to answer from institutional sources; I evaluated its answers for accuracy and hallucinations.",
    "proj.q": "When does elective registration open?", "proj.a": "According to the academic calendar, February 3–7 on the institutional platform.",
    "proj.camino": "Bible-study app for couples: chapter progress, a chat per chapter with photos and voice notes, streaks, maps and timelines.",
    "proj.client": "Client", "proj.storeT": "Inventory & Sales",
    "proj.store": "System for a neighborhood store: real-time inventory, sales and electronic payments (Nequi and bank transfers) with full traceability.",
    "proj.dm": "Data modeling",
    "proj.sec": "API security practice: finding and fixing vulnerabilities in an intentionally vulnerable REST API.",
    "jour.title": "The road so far.", "jour.now": "Now",
    "jour.fl": "Freelance Software Developer",
    "jour.flp": "Custom systems for businesses: barbershop bookings (in production), inventory and sales for a store. Full cycle: requirements, database, development, testing, deployment, training and support.",
    "jour.ing": "B.S. Systems Engineering · Universidad del Magdalena",
    "jour.ingp": "Graduated September 4, 2026. Research internship with meritorious distinction: an NLP-based chatbot as a virtual assistant for the academic community.",
    "jour.en": "English Does Work · Levels 1–9 · SENA", "jour.enp": "432 hours of English training, completed in July 2026.",
    "jour.kt": "Android Apps with Kotlin · Udemy", "jour.ktp": "67.5 hours of native mobile app development.",
    "jour.itsa": "Technical Degree in Computer Systems · ITSA",
    "jour.itsap": "My first technical training; that same year I completed the Programming course (60 h) from Colombia's ICT Ministry with Universidad Tecnológica de Pereira.",
    "cert.title": "Training that backs the work.", "cert.sub": "Click any certificate to view it. Personal data is hidden.",
    "cert.all": "All", "cert.degree": "Degrees", "cert.tech": "Technology", "cert.lang": "Languages", "cert.other": "Other",
    "contact.title": "Got a project in mind?",
    "contact.sub": "Tell me what you need. I reply fast and propose a clear solution with defined scope and timeline.",
    "contact.copy": "Copy",
    "footer.made": "Handmade in Barranquilla · HTML, CSS & JS", "footer.top": "Back to top ↑",
  };
  const ES = {};
  $$("[data-i18n]").forEach((el) => { ES[el.dataset.i18n] = el.innerHTML; });

  const UI = {
    es: {
      roles: ["Ingeniero de Sistemas", "Desarrollador Full-Stack", "Apps con IA · LLM + RAG", "Automatización con n8n", "Freelance para negocios reales"],
      copied: "Correo copiado ✓", palPh: "Busca una sección o acción…", title: "Brayan Muñoz · Ingeniero de Sistemas & Desarrollador",
    },
    en: {
      roles: ["Systems Engineer", "Full-Stack Developer", "AI apps · LLM + RAG", "Automation with n8n", "Freelancer for real businesses"],
      copied: "Email copied ✓", palPh: "Search a section or action…", title: "Brayan Muñoz · Systems Engineer & Developer",
    },
  };

  let lang = store.get("lang") || ((navigator.language || "es").startsWith("es") ? "es" : "en");
  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    const dict = l === "en" ? EN : ES;
    $$("[data-i18n]").forEach((el) => { const v = dict[el.dataset.i18n]; if (v != null) el.innerHTML = v; });
    $("#palIn").placeholder = UI[l].palPh;
    document.title = UI[l].title;
    store.set("lang", l);
    renderCerts();
    renderPalette("");
  }
  $("#langToggle").addEventListener("click", () => applyLang(lang === "es" ? "en" : "es"));

  /* ---------------- typed roles ---------------- */
  const typed = $("#typed");
  let ri = 0, ci = 0, del = false;
  function tick() {
    const roles = UI[lang].roles; const word = roles[ri % roles.length];
    if (reduce) { typed.textContent = word; return; }
    ci += del ? -1 : 1;
    typed.textContent = word.slice(0, ci);
    let t = del ? 35 : 70;
    if (!del && ci === word.length) { del = true; t = 1700; }
    else if (del && ci === 0) { del = false; ri++; t = 300; }
    setTimeout(tick, t);
  }

  /* ---------------- background canvas ---------------- */
  const cv = $("#bg"), ctx = cv.getContext("2d");
  let W, H, pts = [], mouse = { x: -999, y: -999 };
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(90, Math.floor((W * H) / 18000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 140) { p.x += dx / d * .6; p.y += dy / d * .6; }
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) { ctx.strokeStyle = `rgba(110,255,193,${(1 - d / 130) * .13})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      ctx.fillStyle = "rgba(160,190,255,.35)"; ctx.fillRect(pts[i].x - 1, pts[i].y - 1, 2, 2);
    }
    requestAnimationFrame(draw);
  }
  addEventListener("resize", resize);
  addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  resize();
  if (!reduce) draw();

  /* ---------------- nav ---------------- */
  const nav = $("#nav");
  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 30), { passive: true });
  const menuBtn = $("#menuBtn");
  menuBtn.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  $$(".nav-links a").forEach((a) => a.addEventListener("click", () => { document.body.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", "false"); }));
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("section[id]").forEach((s) => sectionObs.observe(s));

  /* ---------------- reveal + counters ---------------- */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      $$("[data-count]", e.target).forEach(count);
      revObs.unobserve(e.target);
    });
  }, { threshold: .12 });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; revObs.observe(el); });
  function count(el) {
    const end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now(), dur = 1400;
    const step = (t) => { const k = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - k, 3))); el.textContent = v + (k === 1 ? suf : ""); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  /* ---------------- tilt + glow ---------------- */
  const portrait = $("#portrait");
  if (!reduce && matchMedia("(hover:hover)").matches) {
    portrait.addEventListener("pointermove", (e) => {
      const r = portrait.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      portrait.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
    });
    portrait.addEventListener("pointerleave", () => { portrait.style.transform = ""; });
  }
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest?.("[data-glow]"); if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`); card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  /* ---------------- certificates ---------------- */
  const CERTS = [
    { img: "ingenieria-sistemas", cat: "degree", es: ["Ingeniero de Sistemas", "Universidad del Magdalena · 2026"], en: ["B.S. Systems Engineering", "Universidad del Magdalena · 2026"] },
    { img: "acta-grado", cat: "degree", es: ["Acta de grado · Reconocimiento meritorio", "Universidad del Magdalena · 2026"], en: ["Graduation record · Meritorious distinction", "Universidad del Magdalena · 2026"] },
    { img: "itsa-tecnico", cat: "degree", es: ["Técnico Laboral en Auxiliar de Sistemas Informáticos", "ITSA · 2020"], en: ["Technical Degree, Computer Systems Assistant", "ITSA · 2020"] },
    { img: "kotlin-udemy", cat: "tech", es: ["Programación de Apps Android con Kotlin", "Udemy · 2025 · 67,5 h"], en: ["Android App Development with Kotlin", "Udemy · 2025 · 67.5 h"] },
    { img: "programacion-utp", cat: "tech", es: ["Programación", "MinTIC · U. Tecnológica de Pereira · 2020 · 60 h"], en: ["Programming", "ICT Ministry · U. Tecnológica de Pereira · 2020 · 60 h"] },
    { img: "excel-vba", cat: "tech", es: ["Programación en Excel con VBA", "Corporación Educativa Formar · 2020 · 16 h"], en: ["Excel Programming with VBA", "Corporación Educativa Formar · 2020 · 16 h"] },
    { img: "ingles-sena", cat: "lang", es: ["English Does Work · Niveles 1 a 9", "SENA · 2024–2026 · 432 h"], en: ["English Does Work · Levels 1 to 9", "SENA · 2024–2026 · 432 h"] },
    { img: "emprendimiento", cat: "other", es: ["Plataformas Digitales para el Emprendimiento", "Corporación Educativa Formar · 2020 · 4 h"], en: ["Digital Platforms for Entrepreneurship", "Corporación Educativa Formar · 2020 · 4 h"] },
    { img: "etica", cat: "other", es: ["Ética y Transformación del Entorno", "Corporación Educativa Formar · 2020 · 16 h"], en: ["Ethics and Transforming One's Environment", "Corporación Educativa Formar · 2020 · 16 h"] },
  ];
  const grid = $("#certGrid");
  let filter = "all";
  function renderCerts() {
    grid.innerHTML = CERTS.map((c, i) => {
      const [t, s] = c[lang];
      return `<button class="cert${filter !== "all" && c.cat !== filter ? " hide" : ""}" data-i="${i}">
        <div class="cert-img"><img src="assets/certs/${c.img}.webp" alt="${t}" loading="lazy" /></div>
        <div class="cert-body"><h3>${t}</h3><span>${s}</span></div></button>`;
    }).join("");
  }
  $$(".filters button").forEach((b) => b.addEventListener("click", () => {
    filter = b.dataset.filter;
    $$(".filters button").forEach((x) => x.classList.toggle("on", x === b));
    $$(".cert", grid).forEach((el) => el.classList.toggle("hide", filter !== "all" && CERTS[el.dataset.i].cat !== filter));
  }));
  const lb = $("#lightbox");
  grid.addEventListener("click", (e) => {
    const b = e.target.closest(".cert"); if (!b) return;
    const c = CERTS[b.dataset.i];
    $("#lbImg").src = `assets/certs/${c.img}.webp`; $("#lbImg").alt = c[lang][0];
    $("#lbCap").textContent = c[lang].join(" — ");
    lb.showModal();
  });
  $("#lbClose").addEventListener("click", () => lb.close());
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });

  /* ---------------- copy + toast ---------------- */
  const toast = $("#toast");
  function showToast(msg) { toast.textContent = msg; toast.classList.add("show"); clearTimeout(showToast.t); showToast.t = setTimeout(() => toast.classList.remove("show"), 2000); }
  async function copyEmail() {
    const email = "brayanmunioz6@gmail.com";
    try { await navigator.clipboard.writeText(email); showToast(UI[lang].copied); }
    catch { location.href = "mailto:" + email; }
  }
  $("#copyEmail").addEventListener("click", copyEmail);

  /* ---------------- terminal ---------------- */
  const tb = $("#termBody"), tin = $("#termIn");
  const T = {
    es: {
      help: `Comandos disponibles:
  <span class="k">about</span>     quién soy
  <span class="k">skills</span>    mi stack
  <span class="k">projects</span>  lo que he construido
  <span class="k">edu</span>       formación
  <span class="k">contact</span>   cómo hablar conmigo
  <span class="k">cv</span>        descargar mi hoja de vida
  <span class="k">lang</span>      cambiar a inglés
  <span class="k">clear</span>     limpiar la terminal`,
      about: "Brayan Muñoz — Ingeniero de Sistemas (Unimagdalena, 2026).\nDesarrollador freelance. Construyo software y asistentes con IA para negocios reales.",
      skills: `<span class="k">lenguajes</span>  <span class="v">Python · JavaScript · TypeScript · SQL · Kotlin</span>
<span class="k">web</span>        <span class="v">Next.js · React · Node.js · Angular · Tailwind</span>
<span class="k">datos</span>      <span class="v">PostgreSQL · MySQL · SQL Server · Supabase</span>
<span class="k">ia</span>         <span class="v">LLMs · RAG · Prompt engineering · n8n</span>`,
      projects: `<span class="k">01</span> JMbarber Studio — PWA de reservas (en producción)
<span class="k">02</span> Chatbot con PLN — tesis meritoria
<span class="k">03</span> Camino de la Palabra — Next.js + PostgreSQL
<span class="k">04</span> Inventario & Ventas — tienda de barrio
<span class="k">05</span> RESTaurant API — seguridad en APIs`,
      edu: "Ingeniería de Sistemas — Universidad del Magdalena (2021–2026)\nTécnico en Sistemas Informáticos — ITSA (2020)\nInglés 1–9 — SENA (432 h) · Kotlin — Udemy (67,5 h)",
      contact: `email     <a href="mailto:brayanmunioz6@gmail.com">brayanmunioz6@gmail.com</a>
whatsapp  <a href="https://wa.me/573115851187" target="_blank" rel="noopener">+57 311 585 1187</a>
github    <a href="https://github.com/Brayan744" target="_blank" rel="noopener">github.com/Brayan744</a>`,
      cv: "Descargando CV…", unknown: (c) => `comando no encontrado: ${c}. Escribe help.`,
      sudo: "Buen intento 😄. Pero sí: contrátame.",
    },
    en: {
      help: `Available commands:
  <span class="k">about</span>     who I am
  <span class="k">skills</span>    my stack
  <span class="k">projects</span>  what I've built
  <span class="k">edu</span>       education
  <span class="k">contact</span>   how to reach me
  <span class="k">cv</span>        download my résumé
  <span class="k">lang</span>      switch to Spanish
  <span class="k">clear</span>     clear the terminal`,
      about: "Brayan Muñoz — Systems Engineer (Unimagdalena, 2026).\nFreelance developer. I build software and AI assistants for real businesses.",
      skills: `<span class="k">languages</span>  <span class="v">Python · JavaScript · TypeScript · SQL · Kotlin</span>
<span class="k">web</span>        <span class="v">Next.js · React · Node.js · Angular · Tailwind</span>
<span class="k">data</span>       <span class="v">PostgreSQL · MySQL · SQL Server · Supabase</span>
<span class="k">ai</span>         <span class="v">LLMs · RAG · Prompt engineering · n8n</span>`,
      projects: `<span class="k">01</span> JMbarber Studio — booking PWA (in production)
<span class="k">02</span> NLP Chatbot — meritorious thesis
<span class="k">03</span> Camino de la Palabra — Next.js + PostgreSQL
<span class="k">04</span> Inventory & Sales — neighborhood store
<span class="k">05</span> RESTaurant API — API security`,
      edu: "B.S. Systems Engineering — Universidad del Magdalena (2021–2026)\nComputer Systems Technician — ITSA (2020)\nEnglish 1–9 — SENA (432 h) · Kotlin — Udemy (67.5 h)",
      contact: `email     <a href="mailto:brayanmunioz6@gmail.com">brayanmunioz6@gmail.com</a>
whatsapp  <a href="https://wa.me/573115851187" target="_blank" rel="noopener">+57 311 585 1187</a>
github    <a href="https://github.com/Brayan744" target="_blank" rel="noopener">github.com/Brayan744</a>`,
      cv: "Downloading CV…", unknown: (c) => `command not found: ${c}. Type help.`,
      sudo: "Nice try 😄. But yes: hire me.",
    },
  };
  const hist = []; let hi = -1;
  function out(cmd, html) {
    const p1 = document.createElement("p"); p1.className = "cmd"; p1.textContent = cmd;
    const p2 = document.createElement("p"); p2.className = "out"; p2.innerHTML = html;
    tb.append(p1, p2); tb.scrollTop = tb.scrollHeight;
  }
  function run(raw) {
    const c = raw.trim().toLowerCase(); if (!c) return;
    hist.unshift(c); hi = -1;
    const t = T[lang];
    if (c === "clear") { tb.innerHTML = ""; return; }
    if (c === "lang") { applyLang(lang === "es" ? "en" : "es"); out(c, lang === "es" ? "Idioma: español" : "Language: English"); return; }
    if (c === "cv") { out(c, t.cv); const a = document.createElement("a"); a.href = "assets/Brayan_Munoz_CV.pdf"; a.download = ""; a.click(); return; }
    if (c.startsWith("sudo")) { out(c, t.sudo); return; }
    if (c === "whoami") { out(c, t.about); return; }
    if (c === "ls") { out(c, "about  skills  projects  edu  contact  cv"); return; }
    if (t[c] && typeof t[c] === "string") { out(c, t[c]); return; }
    out(c, t.unknown(c.replace(/</g, "&lt;")));
  }
  $("#termForm").addEventListener("submit", (e) => { e.preventDefault(); run(tin.value); tin.value = ""; });
  tin.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && hist.length) { hi = Math.min(hi + 1, hist.length - 1); tin.value = hist[hi]; e.preventDefault(); }
    if (e.key === "ArrowDown") { hi = Math.max(hi - 1, -1); tin.value = hi < 0 ? "" : hist[hi]; e.preventDefault(); }
  });
  $("#terminal").addEventListener("click", (e) => { if (!e.target.closest("a")) tin.focus({ preventScroll: true }); });

  /* ---------------- command palette ---------------- */
  const pal = $("#palette"), palIn = $("#palIn"), palList = $("#palList");
  const ACTIONS = () => [
    { i: "◎", es: "Ir a Sobre mí", en: "Go to About", k: "#sobre-mi", run: () => go("#sobre-mi") },
    { i: "◆", es: "Ir a Proyectos", en: "Go to Projects", k: "#proyectos", run: () => go("#proyectos") },
    { i: "↯", es: "Ir a Trayectoria", en: "Go to Journey", k: "#trayectoria", run: () => go("#trayectoria") },
    { i: "✦", es: "Ir a Certificados", en: "Go to Certificates", k: "#certificados", run: () => go("#certificados") },
    { i: "✉", es: "Ir a Contacto", en: "Go to Contact", k: "#contacto", run: () => go("#contacto") },
    { i: "⧉", es: "Copiar mi correo", en: "Copy my email", k: "email", run: copyEmail },
    { i: "↓", es: "Descargar CV (PDF)", en: "Download CV (PDF)", k: "pdf", run: () => { const a = document.createElement("a"); a.href = "assets/Brayan_Munoz_CV.pdf"; a.download = ""; a.click(); } },
    { i: "☏", es: "Escribir por WhatsApp", en: "Message on WhatsApp", k: "wa", run: () => open("https://wa.me/573115851187", "_blank", "noopener") },
    { i: "in", es: "Abrir LinkedIn", en: "Open LinkedIn", k: "linkedin", run: () => open("https://www.linkedin.com/in/brayan-de-jesus-mu%C3%B1oz-acu%C3%B1a-335444349/", "_blank", "noopener") },
    { i: "</>", es: "Abrir GitHub", en: "Open GitHub", k: "github", run: () => open("https://github.com/Brayan744", "_blank", "noopener") },
    { i: "Aa", es: "Switch to English", en: "Cambiar a español", k: "lang", run: () => applyLang(lang === "es" ? "en" : "es") },
  ];
  let palItems = [], sel = 0;
  function go(h) { document.querySelector(h).scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
  function renderPalette(q) {
    q = q.toLowerCase();
    palItems = ACTIONS().filter((a) => (a[lang] + " " + a.k).toLowerCase().includes(q));
    sel = 0;
    palList.innerHTML = palItems.map((a, i) => `<li role="option" data-i="${i}" class="${i === 0 ? "sel" : ""}"><span class="pi">${a.i}</span>${a[lang]}<small>${a.k}</small></li>`).join("");
  }
  function openPal() { renderPalette(""); palIn.value = ""; pal.showModal(); palIn.focus(); }
  function exec(i) { const a = palItems[i]; if (!a) return; pal.close(); a.run(); }
  $("#openPalette").addEventListener("click", openPal);
  palIn.addEventListener("input", () => renderPalette(palIn.value));
  palIn.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + palItems.length) % palItems.length;
      $$("li", palList).forEach((li, i) => li.classList.toggle("sel", i === sel));
      $$("li", palList)[sel]?.scrollIntoView({ block: "nearest" });
    }
    if (e.key === "Enter") { e.preventDefault(); exec(sel); }
  });
  palList.addEventListener("click", (e) => { const li = e.target.closest("li"); if (li) exec(+li.dataset.i); });
  pal.addEventListener("click", (e) => { if (e.target === pal) pal.close(); });
  addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.open ? pal.close() : openPal(); }
  });

  /* ---------------- init ---------------- */
  $("#year").textContent = new Date().getFullYear();
  applyLang(lang);
  tick();
})();

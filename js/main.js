/* ============================================================
   ETERNAMENTE — main.js
   1. Hero particles canvas (sparkles)
   2. Scroll reveal (IntersectionObserver)
   3. FAQ accordion
   4. Plan toggle (monthly / one-time)
   5. Nav: scroll class + active link highlight + hamburger
============================================================ */

/* ─────────────────────────────────────────────
   1. HERO PARTICLES
───────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  const isMobile = () => window.innerWidth < 768;

  function resize() {
    canvas.width  = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }, { passive: true });

  const COUNT = isMobile() ? 16 : 36;

  /* Cool sparkle palette */
  const colors = [
    'rgba(110,143,224,',   /* light blue */
    'rgba(50,79,162,',     /* primary blue */
    'rgba(220,230,248,',   /* gold light equiv */
    'rgba(220,228,245,',   /* lavender light equiv */
    'rgba(255,255,255,',   /* white */
  ];

  function makeParticle() {
    return {
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      r:      Math.random() * 2.2 + 0.6,
      dx:     (Math.random() - 0.5) * 0.28,
      dy:     -(Math.random() * 0.42 + 0.18),
      alpha:  Math.random() * 0.55 + 0.1,
      dAlpha: (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
      colorIdx: Math.floor(Math.random() * colors.length),
      rotation: Math.random() * Math.PI * 2,
      dRotation: (Math.random() - 0.5) * 0.02,
    };
  }

  const particles = Array.from({ length: COUNT }, makeParticle);

  function drawSparkle(ctx, x, y, r, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    /* 4-pointed star */
    const arms = 4;
    const outer = r;
    const inner = r * 0.3;
    ctx.beginPath();
    for (let i = 0; i < arms * 2; i++) {
      const angle = (i * Math.PI) / arms;
      const rr = i % 2 === 0 ? outer : inner;
      if (i === 0) ctx.moveTo(rr * Math.cos(angle), rr * Math.sin(angle));
      else         ctx.lineTo(rr * Math.cos(angle), rr * Math.sin(angle));
    }
    ctx.closePath();
    ctx.restore();
  }

  let animId;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      const color = colors[p.colorIdx];
      const alpha = Math.max(0, Math.min(0.8, p.alpha));

      ctx.fillStyle = color + alpha + ')';
      drawSparkle(ctx, p.x, p.y, p.r * 3.5, p.rotation);
      ctx.fill();

      /* Tiny center dot for sparkle effect */
      ctx.fillStyle = color + Math.min(alpha * 1.4, 0.9) + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
      ctx.fill();

      /* Update */
      p.x += p.dx;
      p.y += p.dy;
      p.alpha += p.dAlpha;
      p.rotation += p.dRotation;

      if (p.alpha >= 0.65 || p.alpha <= 0.08) p.dAlpha *= -1;

      /* Wrap */
      if (p.y < -12)                   p.y = canvas.height + 12;
      if (p.x < -12)                   p.x = canvas.width + 12;
      if (p.x > canvas.width + 12)     p.x = -12;
      if (p.y > canvas.height + 12)    { Object.assign(p, makeParticle()); p.y = canvas.height + 12; }
    }

    animId = requestAnimationFrame(draw);
  }

  /* Pause when tab not visible */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });

  draw();
})();


/* ─────────────────────────────────────────────
   2. SCROLL REVEAL
───────────────────────────────────────────── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  /* Graceful degradation */
  if (!window.IntersectionObserver) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        /* Stagger siblings in the same grid parent */
        const parent = entry.target.closest('.features__grid, .how__steps, .plans__grid, .cemetery__grid, .testimonials__grid, .faq__list');
        if (parent) {
          const siblings = Array.from(parent.querySelectorAll('.reveal:not(.visible)'));
          const idx = siblings.indexOf(entry.target);
          const delay = Math.max(0, idx) * 90;
          setTimeout(() => entry.target.classList.add('visible'), delay);
        } else {
          entry.target.classList.add('visible');
        }

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  items.forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────────
   3. FAQ ACCORDION
───────────────────────────────────────────── */
(function initFAQ() {
  const buttons = document.querySelectorAll('.faq__btn');
  if (!buttons.length) return;

  /* Remove hidden attr so CSS transitions work */
  document.querySelectorAll('.faq__answer').forEach(a => {
    a.removeAttribute('hidden');
  });

  function closeAll(except) {
    buttons.forEach(btn => {
      if (btn === except) return;
      btn.setAttribute('aria-expanded', 'false');
      const id = btn.getAttribute('aria-controls');
      const answer = document.getElementById(id);
      if (answer) answer.classList.remove('open');
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      if (expanded) {
        /* Close current */
        btn.setAttribute('aria-expanded', 'false');
        const id = btn.getAttribute('aria-controls');
        const answer = document.getElementById(id);
        if (answer) answer.classList.remove('open');
      } else {
        /* Close others, open this */
        closeAll(btn);
        btn.setAttribute('aria-expanded', 'true');
        const id = btn.getAttribute('aria-controls');
        const answer = document.getElementById(id);
        if (answer) {
          /* Force reflow before adding transition class */
          answer.getBoundingClientRect();
          answer.classList.add('open');
        }
      }
    });

    /* Keyboard: Enter / Space already handled by button role */
  });
})();


/* ─────────────────────────────────────────────
   4. PLAN TOGGLE (monthly / one-time)
───────────────────────────────────────────── */
(function initPlanToggle() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  if (!toggleBtns.length) return;

  function showPlan(plan) {
    toggleBtns.forEach(btn => {
      const isActive = btn.dataset.plan === plan;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    document.querySelectorAll('.price').forEach(price => {
      price.hidden = !price.classList.contains(plan);
    });
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => showPlan(btn.dataset.plan));
  });

  /* Init: ensure monthly visible */
  showPlan('monthly');
})();


/* ─────────────────────────────────────────────
   5. NAV — scroll class + active section + hamburger
───────────────────────────────────────────── */
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  /* Scroll shadow */
  function handleScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Active section highlight */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  if (sections.length && navLinks.length && window.IntersectionObserver) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              link.classList.toggle(
                'nav__link--active',
                link.getAttribute('href') === '#' + id
              );
            });
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach(s => sectionObserver.observe(s));
  }

  /* Hamburger menu */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.hidden = !open;
    });

    /* Close on link click */
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });

    /* Close on outside click */
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenu.hidden) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      }
    });
  }
})();


/* ─────────────────────────────────────────────
   6. CREATE MEMORIAL FLOW
───────────────────────────────────────────── */
(function initCreateFlow() {

  const modal = document.getElementById('create-modal');
  if (!modal) return;

  /* ── State ── */
  const state = {
    name: '', species: 'dog', born: '', died: '', story: '',
    photos: [], animId: null, genTimer: null,
  };

  /* ── DOM ── */
  const backdrop    = document.getElementById('modal-backdrop');
  const closeBtn    = document.getElementById('modal-close');
  const dots        = modal.querySelectorAll('.modal__dot');
  const pages       = {
    p1: document.getElementById('modal-p1'),
    p2: document.getElementById('modal-p2'),
    p3: document.getElementById('modal-p3'),
    p4: document.getElementById('modal-p4'),
  };

  const petNameInp   = document.getElementById('pet-name');
  const petSpecies   = document.getElementById('pet-species');
  const petBorn      = document.getElementById('pet-born');
  const petDied      = document.getElementById('pet-died');
  const petStory     = document.getElementById('pet-story');
  const step1Next    = document.getElementById('step1-next');

  const nameStep2    = document.getElementById('pet-name-step2');
  const uploadZone   = document.getElementById('upload-zone');
  const photoInput   = document.getElementById('photo-input');
  const photoGrid    = document.getElementById('photo-grid');
  const photoCount   = document.getElementById('photo-count');
  const step2Back    = document.getElementById('step2-back');
  const step2Next    = document.getElementById('step2-next');

  const nameStep3    = document.getElementById('pet-name-step3');
  const genCanvas    = document.getElementById('gen-canvas');
  const genFill      = document.getElementById('gen-fill');
  const genStatus    = document.getElementById('gen-status');

  const resultName   = document.getElementById('result-name');
  const resultDates  = document.getElementById('result-dates');
  const resultStory  = document.getElementById('result-story');
  const resultSaveName = document.getElementById('result-save-name');
  const resultCanvas = document.getElementById('result-canvas');
  const resultSave   = document.getElementById('result-save');
  const resultNew    = document.getElementById('result-new');

  /* ── Open / close ── */
  function openModal(mode) {
    if (mode === 'example') loadExample();
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    goTo(mode === 'example' ? 4 : 1);
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    cancelAnimationFrame(state.animId);
    clearTimeout(state.genTimer);
  }

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });

  /* Global trigger: any element with data-modal="create" or "example" */
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-modal]');
    if (!el) return;
    e.preventDefault();
    openModal(el.dataset.modal);
  });

  /* ── Page navigation ── */
  function goTo(n) {
    Object.values(pages).forEach((p, i) => { p.hidden = (i + 1 !== n); });
    const dotIdx = Math.min(n, 3) - 1;
    dots.forEach((d, i) => d.classList.toggle('active', i === dotIdx && n <= 3));
    cancelAnimationFrame(state.animId);
    clearTimeout(state.genTimer);
    if (n === 3) startGeneration();
    if (n === 4) startResult();
  }

  /* ── Step 1 → 2 ── */
  step1Next.addEventListener('click', () => {
    const name = petNameInp.value.trim();
    if (!name) {
      petNameInp.classList.add('error');
      petNameInp.focus();
      return;
    }
    petNameInp.classList.remove('error');
    state.name    = name;
    state.species = petSpecies.value;
    state.born    = petBorn.value;
    state.died    = petDied.value;
    state.story   = petStory.value.trim();
    nameStep2.textContent = state.name;
    goTo(2);
  });
  petNameInp.addEventListener('input', () => petNameInp.classList.remove('error'));

  /* ── Step 2: photos ── */
  uploadZone.addEventListener('dragover', e => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });
  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
  uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    addFiles(e.dataTransfer.files);
  });
  photoInput.addEventListener('change', () => addFiles(photoInput.files));

  function addFiles(files) {
    const slots = 10 - state.photos.length;
    Array.from(files).slice(0, slots).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = ev => {
        state.photos.push(ev.target.result);
        renderGrid();
      };
      reader.readAsDataURL(file);
    });
  }

  function renderGrid() {
    photoGrid.innerHTML = '';
    state.photos.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'photo-thumb';
      img.alt = `Foto ${i + 1}`;
      img.title = 'Click para quitar';
      img.addEventListener('click', () => { state.photos.splice(i, 1); renderGrid(); });
      photoGrid.appendChild(img);
    });
    if (state.photos.length > 0) {
      photoCount.textContent = `${state.photos.length} foto${state.photos.length > 1 ? 's' : ''} cargada${state.photos.length > 1 ? 's' : ''}`;
      photoCount.hidden = false;
    } else {
      photoCount.hidden = true;
    }
  }

  step2Back.addEventListener('click', () => goTo(1));
  step2Next.addEventListener('click', () => {
    nameStep3.textContent = state.name;
    goTo(3);
  });

  /* ── Step 3: generation animation ── */
  const GEN_MESSAGES = [
    'Analizando fotos…',
    'Detectando rasgos únicos…',
    'Construyendo el avatar…',
    'Aplicando inteligencia artificial…',
    '¡Tu mascota está lista!',
  ];

  function startGeneration() {
    let frame = 0;
    let progress = 0;
    genFill.style.width = '0%';
    genStatus.textContent = GEN_MESSAGES[0];

    function draw() {
      frame++;
      drawAvatar(genCanvas, state.species, frame, Math.min(1, progress / 55));
      state.animId = requestAnimationFrame(draw);
    }
    draw();

    const TOTAL = 4200;
    const TICK  = 70;
    const steps = TOTAL / TICK;
    let t = 0;

    function tick() {
      t++;
      progress = (t / steps) * 100;
      genFill.style.width = Math.min(100, progress) + '%';
      const mi = Math.min(
        GEN_MESSAGES.length - 1,
        Math.floor((progress / 100) * (GEN_MESSAGES.length - 1))
      );
      genStatus.textContent = GEN_MESSAGES[mi];
      if (progress < 100) {
        state.genTimer = setTimeout(tick, TICK);
      } else {
        state.genTimer = setTimeout(() => goTo(4), 550);
      }
    }
    state.genTimer = setTimeout(tick, TICK);
  }

  /* ── Step 4: result ── */
  function startResult() {
    resultName.textContent     = state.name;
    resultSaveName.textContent = state.name;

    const by = state.born ? state.born.slice(0, 4) : null;
    const dy = state.died ? state.died.slice(0, 4) : null;
    if (by && dy)   resultDates.textContent = `${by} – ${dy}`;
    else if (by)    resultDates.textContent = `Nació en ${by}`;
    else            resultDates.textContent = 'Para siempre en nuestros corazones';

    resultStory.textContent = state.story ||
      `Descansá en paz, ${state.name}. Siempre en nuestros corazones.`;

    let frame = 0;
    function draw() {
      frame++;
      drawAvatar(resultCanvas, state.species, frame, 1);
      state.animId = requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── Example data ── */
  function loadExample() {
    state.name    = 'Luna';
    state.species = 'dog';
    state.born    = '2010-03-15';
    state.died    = '2023-08-22';
    state.story   = 'Trece años de amor incondicional. Nunca dejó pasar una tarde sin traer su pelota favorita.';
    state.photos  = [];
  }

  /* ── CTAs in result ── */
  resultSave.addEventListener('click', () => {
    const orig = resultSave.innerHTML;
    resultSave.disabled = true;
    resultSave.innerHTML = '¡Gracias! Proximamente abrimos registro.';
    showToast(`Memorial de ${state.name} guardado ♡`);
    setTimeout(() => {
      resultSave.innerHTML = orig;
      resultSave.disabled = false;
    }, 3500);
  });

  resultNew.addEventListener('click', () => {
    state.name = ''; state.species = 'dog';
    state.born = ''; state.died = ''; state.story = '';
    state.photos = [];
    petNameInp.value = '';
    petSpecies.value = 'dog';
    petBorn.value = ''; petDied.value = ''; petStory.value = '';
    photoGrid.innerHTML = '';
    photoCount.hidden = true;
    goTo(1);
    setTimeout(() => petNameInp.focus(), 80);
  });

  /* ── Toast ── */
  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('toast--hide'), 2800);
    setTimeout(() => t.remove(), 3200);
  }

  /* ── Avatar canvas renderer ── */
  function drawAvatar(canvas, species, frame, alpha) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const scale = W / 280;
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.scale(scale, scale);
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

    const cx = 140, cy = 140;
    const breathe = Math.sin(frame * 0.025) * 3.5;
    const blinkCycle = frame % 220;
    const blink = blinkCycle < 8
      ? Math.max(0.05, 1 - Math.abs(blinkCycle - 4) * 0.45)
      : 1;

    const SPECS = {
      dog:     { h: 28,  s: 42, l: 73, ear: 'floppy',  eyeC: 'hsl(28,50%,26%)',   nose: 'hsl(8,42%,44%)'  },
      cat:     { h: 215, s: 18, l: 68, ear: 'pointed', eyeC: 'hsl(138,52%,28%)',  nose: 'hsl(340,55%,64%)' },
      rabbit:  { h: 30,  s: 22, l: 87, ear: 'long',    eyeC: 'hsl(0,48%,33%)',   nose: 'hsl(340,55%,72%)' },
      bird:    { h: 174, s: 55, l: 54, ear: 'none',    eyeC: 'hsl(44,82%,38%)',  nose: null               },
      hamster: { h: 22,  s: 52, l: 72, ear: 'round',   eyeC: 'hsl(0,0%,12%)',    nose: 'hsl(340,45%,65%)' },
      other:   { h: 270, s: 36, l: 72, ear: 'round',   eyeC: 'hsl(270,32%,30%)', nose: 'hsl(270,30%,54%)' },
    };
    const sp = SPECS[species] || SPECS.other;
    const { h, s, l } = sp;
    const mainC  = `hsl(${h},${s}%,${l}%)`;
    const darkC  = `hsl(${h},${s - 4}%,${l - 14}%)`;
    const lightC = `hsl(${h},${s - 10}%,${l + 9}%)`;

    /* Glow */
    const glow = ctx.createRadialGradient(cx, cy, 6, cx, cy, 108);
    glow.addColorStop(0, `hsla(${h},${s + 12}%,${l + 6}%,0.38)`);
    glow.addColorStop(1, `hsla(${h},${s}%,${l}%,0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, 108, 0, Math.PI * 2);
    ctx.fill();

    /* Ears */
    ctx.save();
    ctx.translate(cx, cy + breathe);
    if (sp.ear === 'floppy') {
      ctx.fillStyle = darkC;
      ctx.beginPath(); ctx.ellipse(-36, -16, 16, 28, -0.26, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse( 36, -16, 16, 28,  0.26, 0, Math.PI * 2); ctx.fill();
    } else if (sp.ear === 'pointed') {
      ctx.fillStyle = mainC;
      ctx.beginPath(); ctx.moveTo(-36, -28); ctx.lineTo(-22, -62); ctx.lineTo(-8, -28); ctx.fill();
      ctx.beginPath(); ctx.moveTo( 36, -28); ctx.lineTo( 22, -62); ctx.lineTo( 8, -28); ctx.fill();
      ctx.fillStyle = 'hsla(340,58%,80%,0.72)';
      ctx.beginPath(); ctx.moveTo(-32, -30); ctx.lineTo(-22, -56); ctx.lineTo(-12, -30); ctx.fill();
      ctx.beginPath(); ctx.moveTo( 32, -30); ctx.lineTo( 22, -56); ctx.lineTo( 12, -30); ctx.fill();
    } else if (sp.ear === 'long') {
      const sway = Math.sin(frame * 0.018) * 4;
      ctx.fillStyle = lightC;
      ctx.beginPath(); ctx.ellipse(-17 + sway, -60, 12, 34, -0.12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse( 17 - sway, -60, 12, 34,  0.12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'hsla(340,58%,82%,0.6)';
      ctx.beginPath(); ctx.ellipse(-17 + sway, -60, 5.5, 24, -0.12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse( 17 - sway, -60, 5.5, 24,  0.12, 0, Math.PI * 2); ctx.fill();
    } else if (sp.ear === 'round') {
      ctx.fillStyle = mainC;
      ctx.beginPath(); ctx.arc(-36, -28, 15, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc( 36, -28, 15, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'hsla(340,52%,80%,0.5)';
      ctx.beginPath(); ctx.arc(-36, -28, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc( 36, -28, 8, 0, Math.PI * 2); ctx.fill();
    } else if (species === 'bird') {
      const fc = [`hsl(${h+30},${s}%,${l-10}%)`, mainC, `hsl(${h-20},${s+10}%,${l+5}%)`];
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = fc[i];
        ctx.beginPath();
        ctx.ellipse(-6 + i * 6, -42 - i * 5 + Math.sin(frame * 0.03 + i) * 3, 5, 17, i * 0.15 - 0.15, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    /* Body */
    ctx.fillStyle = mainC;
    ctx.beginPath();
    ctx.ellipse(cx, cy + breathe + 18, 48, 38, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = lightC;
    ctx.beginPath();
    ctx.ellipse(cx, cy + breathe + 22, 30, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    /* Tail (behind head but drawn before) */
    if (species === 'dog' || species === 'hamster' || species === 'other') {
      const wag = Math.sin(frame * 0.07) * 22;
      ctx.strokeStyle = darkC; ctx.lineWidth = 12; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx + 38, cy + breathe + 18);
      ctx.quadraticCurveTo(cx + 62 + wag, cy + breathe + 4, cx + 56 + wag * 0.6, cy + breathe - 18);
      ctx.stroke();
      ctx.strokeStyle = mainC; ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(cx + 38, cy + breathe + 18);
      ctx.quadraticCurveTo(cx + 62 + wag, cy + breathe + 4, cx + 56 + wag * 0.6, cy + breathe - 18);
      ctx.stroke();
    } else if (species === 'cat') {
      const curl = Math.sin(frame * 0.04) * 14;
      ctx.strokeStyle = darkC; ctx.lineWidth = 11; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx + 36, cy + breathe + 28);
      ctx.quadraticCurveTo(cx + 66, cy + breathe + 50 + curl, cx + 52 + curl, cy + breathe + 14);
      ctx.stroke();
      ctx.strokeStyle = mainC; ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(cx + 36, cy + breathe + 28);
      ctx.quadraticCurveTo(cx + 66, cy + breathe + 50 + curl, cx + 52 + curl, cy + breathe + 14);
      ctx.stroke();
    } else if (species === 'rabbit') {
      ctx.fillStyle = 'rgba(255,255,255,0.94)';
      ctx.beginPath();
      ctx.arc(cx + 38, cy + breathe + 20, 9, 0, Math.PI * 2);
      ctx.fill();
    }

    /* Head */
    ctx.fillStyle = mainC;
    ctx.beginPath();
    ctx.arc(cx, cy + breathe - 14, 37, 0, Math.PI * 2);
    ctx.fill();

    /* Muzzle + nose */
    if (species !== 'bird') {
      ctx.fillStyle = lightC;
      ctx.beginPath();
      ctx.ellipse(cx, cy + breathe - 3, 18, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = sp.nose;
      if (species === 'dog') {
        ctx.beginPath();
        ctx.ellipse(cx, cy + breathe - 7, 7.5, 5.5, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(cx, cy + breathe - 8.5, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = darkC;
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx, cy + breathe - 2);
      ctx.lineTo(cx, cy + breathe + 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 7.5, cy + breathe + 3);
      ctx.quadraticCurveTo(cx - 3.5, cy + breathe + 8, cx, cy + breathe + 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 7.5, cy + breathe + 3);
      ctx.quadraticCurveTo(cx + 3.5, cy + breathe + 8, cx, cy + breathe + 3);
      ctx.stroke();
    } else {
      ctx.fillStyle = 'hsl(38,90%,54%)';
      ctx.beginPath();
      ctx.moveTo(cx - 11, cy + breathe - 13);
      ctx.lineTo(cx + 15, cy + breathe - 9);
      ctx.lineTo(cx - 11, cy + breathe - 4);
      ctx.fill();
      ctx.fillStyle = 'hsl(38,72%,44%)';
      ctx.beginPath();
      ctx.moveTo(cx - 11, cy + breathe - 9);
      ctx.lineTo(cx + 15, cy + breathe - 9);
      ctx.lineTo(cx - 11, cy + breathe - 4);
      ctx.fill();
    }

    /* Eyes */
    const eyeY = cy + breathe - 19;
    ctx.fillStyle = 'rgba(255,255,255,0.93)';
    ctx.beginPath();
    ctx.ellipse(cx - 14, eyeY, 9, 9 * blink, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 14, eyeY, 9, 9 * blink, 0, 0, Math.PI * 2);
    ctx.fill();
    if (blink > 0.25) {
      ctx.fillStyle = sp.eyeC;
      ctx.beginPath();
      ctx.ellipse(cx - 14, eyeY, 6.5, 6.5 * blink, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + 14, eyeY, 6.5, 6.5 * blink, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(8,4,0,0.88)';
      if (species === 'cat') {
        ctx.beginPath();
        ctx.ellipse(cx - 14, eyeY, 2, 5.5 * blink, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx + 14, eyeY, 2, 5.5 * blink, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(cx - 14, eyeY, 3.8 * Math.min(1, blink), 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + 14, eyeY, 3.8 * Math.min(1, blink), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = 'rgba(255,255,255,0.86)';
      ctx.beginPath(); ctx.arc(cx - 11, eyeY - 3, 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 17, eyeY - 3, 2.6, 0, Math.PI * 2); ctx.fill();
    }

    /* Orbiting sparkles */
    for (let i = 0; i < 6; i++) {
      const angle = (frame * 0.007 + i * ((Math.PI * 2) / 6));
      const r  = 70 + Math.sin(frame * 0.05 + i * 1.2) * 11;
      const sx = cx + Math.cos(angle) * r;
      const sy = (cy + breathe) + Math.sin(angle) * r * 0.52;
      const sa = (Math.sin(frame * 0.05 + i * 1.7) + 1) * 0.22 + 0.06;
      const sr = 3.5 + Math.sin(frame * 0.08 + i) * 1.5;
      ctx.fillStyle = i % 2 === 0 ? `rgba(110,143,224,${sa})` : `rgba(50,79,162,${sa})`;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(frame * 0.025 + i);
      ctx.beginPath();
      for (let j = 0; j < 8; j++) {
        const a = (j * Math.PI) / 4;
        const rr = j % 2 === 0 ? sr : sr * 0.3;
        if (j === 0) ctx.moveTo(rr * Math.cos(a), rr * Math.sin(a));
        else         ctx.lineTo(rr * Math.cos(a), rr * Math.sin(a));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
  }

})();

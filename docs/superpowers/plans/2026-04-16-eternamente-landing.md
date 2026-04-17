# Eternamente Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive, emotionally-driven landing page for "Eternamente" — a virtual pet memorial platform — as a static HTML/CSS/JS site viewable locally via browser.

**Architecture:** Three-file static site (`index.html` + `css/styles.css` + `js/main.js`). No build step, no dependencies except Google Fonts loaded via CDN. All icons are inline SVGs. Visual verification replaces automated tests (open in browser after each task).

**Tech Stack:** HTML5, CSS3 custom properties, Vanilla JS (ES6), Google Fonts (Cormorant Garamond + DM Sans), Canvas API for particles, IntersectionObserver for scroll reveals.

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Full page structure, all 10 sections, semantic HTML |
| `css/styles.css` | Custom properties, reset, layout, components, responsive, animations |
| `js/main.js` | Particles canvas, scroll reveal, FAQ accordion, smooth scroll, plan toggle |

---

### Task 1: Project scaffold + CSS foundation

**Files:**
- Create: `index.html`
- Create: `css/styles.css`
- Create: `js/main.js`

- [ ] **Step 1: Create `index.html` with full HTML skeleton**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Eternamente — El lugar donde tu mascota vive para siempre. Memorials digitales con avatar animado generado por IA." />
  <title>Eternamente · El lugar donde tu mascota vive para siempre</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <!-- SKIP TO CONTENT -->
  <a href="#main" class="skip-link">Saltar al contenido</a>

  <!-- NAV -->
  <nav class="nav" role="navigation" aria-label="Navegación principal">
    <div class="nav__inner container">
      <a href="#" class="nav__logo" aria-label="Eternamente — inicio">
        <span class="nav__logo-word">Eternamente</span>
      </a>
      <ul class="nav__links">
        <li><a href="#como-funciona">Cómo funciona</a></li>
        <li><a href="#planes">Planes</a></li>
        <li><a href="#comunidad">Comunidad</a></li>
        <li><a href="#planes" class="btn btn--primary btn--sm">Crear memorial</a></li>
      </ul>
    </div>
  </nav>

  <main id="main">
    <!-- SECTION 1: HERO -->
    <section class="hero" id="inicio" aria-labelledby="hero-heading">
      <canvas class="hero__particles" id="particles" aria-hidden="true"></canvas>
      <div class="hero__content container">
        <p class="hero__eyebrow">Más de 12.000 mascotas ya tienen su lugar aquí.</p>
        <h1 class="hero__title" id="hero-heading">El lugar donde tu<br/><em>mascota vive para siempre</em></h1>
        <p class="hero__subtitle">Convertimos tus fotos reales en un avatar digital de tu mascota. Un espacio permanente para el recuerdo, el amor y el duelo.</p>
        <div class="hero__ctas">
          <a href="#planes" class="btn btn--primary btn--lg">Crear el memorial de tu mascota</a>
          <a href="#comunidad" class="btn btn--ghost btn--lg">Ver un ejemplo de memorial</a>
        </div>
      </div>
      <div class="hero__silhouettes" aria-hidden="true">
        <!-- SVG silhouettes injected inline below -->
        <svg class="silhouette silhouette--dog" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="70" rx="35" ry="22" fill="currentColor"/>
          <circle cx="60" cy="42" r="18" fill="currentColor"/>
          <ellipse cx="45" cy="32" rx="7" ry="11" fill="currentColor" transform="rotate(-20 45 32)"/>
          <ellipse cx="75" cy="32" rx="7" ry="11" fill="currentColor" transform="rotate(20 75 32)"/>
        </svg>
        <svg class="silhouette silhouette--cat" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="65" rx="30" ry="20" fill="currentColor"/>
          <circle cx="50" cy="38" r="16" fill="currentColor"/>
          <polygon points="34,26 30,10 44,22" fill="currentColor"/>
          <polygon points="66,26 70,10 56,22" fill="currentColor"/>
        </svg>
      </div>
    </section>

    <!-- SECTION 2: QUÉ ES ESTO -->
    <section class="features" id="que-es" aria-labelledby="features-heading">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title" id="features-heading">Más que un recuerdo. Una presencia.</h2>
          <p class="section-subtitle">Publicar una foto en Instagram es un gesto hermoso, pero el algoritmo la entierra en días. Eternamente es un espacio construido específicamente para que el vínculo con tu mascota no tenga fecha de vencimiento.</p>
        </div>
        <div class="features__grid">
          <article class="feature-card reveal">
            <div class="feature-card__icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="12" width="22" height="28" rx="3" stroke="currentColor" stroke-width="2.5"/>
                <circle cx="19" cy="22" r="5" stroke="currentColor" stroke-width="2.5"/>
                <path d="M8 32l7-5 5 4 5-6 7 8" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
                <path d="M34 8l4 4-4 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M38 12h-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="feature-card__title">Tus fotos + nuestra IA = tu mascota animada</h3>
            <p class="feature-card__desc">Subís las fotos que ya tenés en el celular. Nosotros generamos un avatar animado que la representa tal como era. Sin tecnicismos, sin conocimiento especial.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-card__icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 42s-16-10-16-22a16 16 0 0132 0c0 12-16 22-16 22z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
                <path d="M24 20v8M20 24h8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="feature-card__title">Un espacio permanente que no desaparece</h3>
            <p class="feature-card__desc">Sin algoritmos, sin publicidades, sin expiración. El memorial de tu mascota existe mientras vos quieras. Protegido, privado o público según tu elección.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-card__icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="20" r="7" stroke="currentColor" stroke-width="2.5"/>
                <circle cx="32" cy="20" r="7" stroke="currentColor" stroke-width="2.5"/>
                <path d="M4 40c0-6.627 5.373-12 12-12h16c6.627 0 12 5.373 12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="feature-card__title">Una comunidad de personas que entienden lo que sentís</h3>
            <p class="feature-card__desc">El duelo por una mascota es real y profundo. Aquí estás rodeado de personas que lo saben. Sin tener que explicar por qué llorás.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- SECTION 3: ASÍ FUNCIONA -->
    <section class="how" id="como-funciona" aria-labelledby="how-heading">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title" id="how-heading">Así funciona</h2>
          <p class="section-subtitle">En cuatro pasos simples, tu mascota tiene su espacio para siempre.</p>
        </div>
        <ol class="how__steps" aria-label="Pasos para crear un memorial">
          <li class="how__step reveal">
            <div class="how__step-number" aria-hidden="true">1</div>
            <div class="how__step-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="16" width="32" height="24" rx="3" stroke="currentColor" stroke-width="2.5"/>
                <circle cx="24" cy="28" r="6" stroke="currentColor" stroke-width="2.5"/>
                <path d="M18 16l3-6h6l3 6" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="how__step-content">
              <h3>Subís fotos y videos desde el celular</h3>
              <p>Elegís las imágenes que más la/lo representen. Cuantas más, mejor — pero con tres o cuatro alcanza para empezar.</p>
            </div>
          </li>
          <li class="how__step reveal">
            <div class="how__step-number" aria-hidden="true">2</div>
            <div class="how__step-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8l4 8 9 1.3-6.5 6.3 1.5 9L24 28l-8 4.6 1.5-9L11 17.3l9-1.3z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
                <path d="M16 36s-4 2-4 6M32 36s4 2 4 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="how__step-content">
              <h3>Nuestra IA genera un avatar animado</h3>
              <p>En minutos, el sistema crea un avatar digital que representa a tu mascota tal como era. Podés editarlo hasta que sea perfecto.</p>
            </div>
          </li>
          <li class="how__step reveal">
            <div class="how__step-number" aria-hidden="true">3</div>
            <div class="how__step-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="8" width="28" height="32" rx="3" stroke="currentColor" stroke-width="2.5"/>
                <path d="M16 18h16M16 24h10M16 30h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="34" cy="34" r="6" fill="var(--lavender)" stroke="none"/>
                <path d="M31 34l2 2 4-3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="how__step-content">
              <h3>Personalizás su espacio</h3>
              <p>Escribís su historia de vida, añadís recuerdos, elegís música de fondo. El espacio es tan único como ella/él.</p>
            </div>
          </li>
          <li class="how__step reveal">
            <div class="how__step-number" aria-hidden="true">4</div>
            <div class="how__step-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="36" cy="12" r="6" stroke="currentColor" stroke-width="2.5"/>
                <circle cx="12" cy="24" r="6" stroke="currentColor" stroke-width="2.5"/>
                <circle cx="36" cy="36" r="6" stroke="currentColor" stroke-width="2.5"/>
                <path d="M18 21l12-6M18 27l12 6" stroke="currentColor" stroke-width="2.5"/>
              </svg>
            </div>
            <div class="how__step-content">
              <h3>Compartís con familia y amigos</h3>
              <p>Enviás el link a quienes también la/lo quisieron. Pueden dejar mensajes, fotos y recuerdos. Cuando quieran, desde donde quieran.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- SECTION 4: PLANES -->
    <section class="plans" id="planes" aria-labelledby="plans-heading">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title" id="plans-heading">Elegí el lugar que se merece</h2>
          <p class="section-subtitle">Sin contratos. Sin complicaciones. Podés cambiar de plan cuando quieras.</p>
        </div>
        <div class="plans__toggle reveal" role="group" aria-label="Tipo de pago">
          <button class="toggle-btn active" data-plan="monthly" aria-pressed="true">Mensual</button>
          <button class="toggle-btn" data-plan="once" aria-pressed="false">Pago único</button>
        </div>
        <div class="plans__grid">
          <article class="plan-card reveal" aria-label="Plan Recuerdo">
            <div class="plan-card__header">
              <h3 class="plan-card__name">Recuerdo</h3>
              <div class="plan-card__price">
                <span class="price monthly">$9.99<small>/mes</small></span>
                <span class="price once" hidden>$49<small> único</small></span>
              </div>
              <p class="plan-card__tagline">Para honrar su memoria</p>
            </div>
            <ul class="plan-card__features" aria-label="Incluye">
              <li><span class="check" aria-hidden="true">✓</span> Perfil conmemorativo con foto principal</li>
              <li><span class="check" aria-hidden="true">✓</span> Galería de hasta 30 fotos</li>
              <li><span class="check" aria-hidden="true">✓</span> Historia de vida en texto libre</li>
              <li><span class="check" aria-hidden="true">✓</span> Acceso público o privado</li>
              <li><span class="check" aria-hidden="true">✓</span> Sin fecha de expiración</li>
            </ul>
            <a href="#" class="btn btn--outline btn--full">Empezar con Recuerdo</a>
          </article>

          <article class="plan-card plan-card--featured reveal" aria-label="Plan Memorial — más elegido">
            <div class="plan-card__badge">Más elegido</div>
            <div class="plan-card__header">
              <h3 class="plan-card__name">Memorial</h3>
              <div class="plan-card__price">
                <span class="price monthly">$19.99<small>/mes</small></span>
                <span class="price once" hidden>$99<small> único</small></span>
              </div>
              <p class="plan-card__tagline">Con avatar animado</p>
            </div>
            <ul class="plan-card__features" aria-label="Incluye">
              <li><span class="check" aria-hidden="true">✓</span> Todo lo del plan Recuerdo</li>
              <li><span class="check" aria-hidden="true">✓</span> <strong>Avatar 2D animado generado por IA</strong></li>
              <li><span class="check" aria-hidden="true">✓</span> Galería ilimitada (hasta 5 GB)</li>
              <li><span class="check" aria-hidden="true">✓</span> Música de fondo personalizable</li>
              <li><span class="check" aria-hidden="true">✓</span> Mensajes de condolencia de familia y amigos</li>
              <li><span class="check" aria-hidden="true">✓</span> Árbol familiar de mascotas</li>
              <li><span class="check" aria-hidden="true">✓</span> Acceso prioritario a nuevas funciones</li>
            </ul>
            <a href="#" class="btn btn--primary btn--full">Empezar con Memorial</a>
          </article>

          <article class="plan-card reveal" aria-label="Plan Legado">
            <div class="plan-card__header">
              <h3 class="plan-card__name">Legado</h3>
              <div class="plan-card__price">
                <span class="price monthly">$39.99<small>/mes</small></span>
                <span class="price once" hidden>$199<small> único</small></span>
              </div>
              <p class="plan-card__tagline">El homenaje más completo</p>
            </div>
            <ul class="plan-card__features" aria-label="Incluye">
              <li><span class="check" aria-hidden="true">✓</span> Todo lo del plan Memorial</li>
              <li><span class="check" aria-hidden="true">✓</span> <strong>Avatar 3D fotorrealista</strong> con movimiento procedural</li>
              <li><span class="check" aria-hidden="true">✓</span> Video memorial generado automáticamente</li>
              <li><span class="check" aria-hidden="true">✓</span> Inclusión en el Cementerio Mundial</li>
              <li><span class="check" aria-hidden="true">✓</span> Descarga de assets en alta resolución</li>
              <li><span class="check" aria-hidden="true">✓</span> Badge especial y página destacada</li>
              <li><span class="check" aria-hidden="true">✓</span> 1 sesión con especialista en duelo animal</li>
            </ul>
            <a href="#" class="btn btn--outline btn--full">Empezar con Legado</a>
          </article>
        </div>
      </div>
    </section>

    <!-- SECTION 5: CEMENTERIO MUNDIAL -->
    <section class="cemetery" id="comunidad" aria-labelledby="cemetery-heading">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title" id="cemetery-heading">Mascotas de todo el mundo que ya tienen su lugar aquí</h2>
          <p class="section-subtitle">Cada punto en el mapa es una vida amada, recordada para siempre.</p>
        </div>
        <div class="cemetery__grid" aria-label="Galería de mascotas memorizadas">
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--dog" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Luna</p>
              <p class="pet-card__location">Buenos Aires · 2010–2023</p>
            </div>
          </article>
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--cat" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Copito</p>
              <p class="pet-card__location">Córdoba · 2015–2024</p>
            </div>
          </article>
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--dog2" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Max</p>
              <p class="pet-card__location">Madrid · 2012–2023</p>
            </div>
          </article>
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--rabbit" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Nube</p>
              <p class="pet-card__location">Montevideo · 2018–2024</p>
            </div>
          </article>
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--cat2" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Mochi</p>
              <p class="pet-card__location">Santiago · 2016–2025</p>
            </div>
          </article>
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--dog3" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Rocky</p>
              <p class="pet-card__location">Bogotá · 2013–2023</p>
            </div>
          </article>
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--cat3" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Mía</p>
              <p class="pet-card__location">México DF · 2017–2024</p>
            </div>
          </article>
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--dog4" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Simba</p>
              <p class="pet-card__location">Lima · 2014–2025</p>
            </div>
          </article>
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--dog5" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Bella</p>
              <p class="pet-card__location">Barcelona · 2011–2023</p>
            </div>
          </article>
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--cat4" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Oliver</p>
              <p class="pet-card__location">Lisboa · 2019–2024</p>
            </div>
          </article>
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--dog6" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Coco</p>
              <p class="pet-card__location">Asunción · 2016–2025</p>
            </div>
          </article>
          <article class="pet-card reveal" tabindex="0">
            <div class="pet-card__avatar pet-card__avatar--cat5" aria-hidden="true"></div>
            <div class="pet-card__overlay">
              <p class="pet-card__name">Perla</p>
              <p class="pet-card__location">Rosario · 2012–2024</p>
            </div>
          </article>
        </div>
        <div class="cemetery__cta reveal">
          <a href="#" class="btn btn--primary">Explorar el cementerio mundial</a>
        </div>
      </div>
    </section>

    <!-- SECTION 6: TESTIMONIOS -->
    <section class="testimonials" id="testimonios" aria-labelledby="testimonials-heading">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title" id="testimonials-heading">Lo que dicen quienes ya los visitan</h2>
        </div>
        <div class="testimonials__grid">
          <blockquote class="testimonial-card reveal">
            <p class="testimonial-card__quote">"No podía creer verla moverse de nuevo. Fue un llanto de alivio. Como si una parte de ella todavía estuviera aquí."</p>
            <footer class="testimonial-card__author">
              <div class="testimonial-card__avatar" aria-hidden="true">V</div>
              <div>
                <cite class="testimonial-card__name">Valentina</cite>
                <p class="testimonial-card__location">32 años · Buenos Aires</p>
              </div>
            </footer>
          </blockquote>
          <blockquote class="testimonial-card reveal">
            <p class="testimonial-card__quote">"Mis hijos entran al memorial de Copito todas las semanas. Les ayudó muchísimo a entender que el amor no se va aunque el cuerpo sí."</p>
            <footer class="testimonial-card__author">
              <div class="testimonial-card__avatar" aria-hidden="true">M</div>
              <div>
                <cite class="testimonial-card__name">Martín</cite>
                <p class="testimonial-card__location">41 años · Córdoba</p>
              </div>
            </footer>
          </blockquote>
          <blockquote class="testimonial-card reveal">
            <p class="testimonial-card__quote">"Lo compartí con mi mamá que estaba destrozada. No sé qué hubiéramos hecho sin esto. Le dio un lugar para ir a visitarlo."</p>
            <footer class="testimonial-card__author">
              <div class="testimonial-card__avatar" aria-hidden="true">S</div>
              <div>
                <cite class="testimonial-card__name">Sofía</cite>
                <p class="testimonial-card__location">28 años · Montevideo</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- SECTION 7: POR QUÉ NO ALCANZA CON INSTAGRAM -->
    <section class="compare" id="comparacion" aria-labelledby="compare-heading">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title" id="compare-heading">¿Por qué no alcanza con Instagram?</h2>
          <p class="section-subtitle">Las redes sociales no fueron diseñadas para el duelo.</p>
        </div>
        <div class="compare__table reveal" role="table" aria-label="Comparación entre redes sociales y Eternamente">
          <div class="compare__row compare__row--header" role="row">
            <div role="columnheader">Redes Sociales</div>
            <div role="columnheader">Eternamente</div>
          </div>
          <div class="compare__row" role="row">
            <div role="cell"><span class="compare__x" aria-hidden="true">✗</span> Los posts se pierden con el algoritmo</div>
            <div role="cell"><span class="compare__check" aria-hidden="true">✓</span> Permanente, sin algoritmo</div>
          </div>
          <div class="compare__row" role="row">
            <div role="cell"><span class="compare__x" aria-hidden="true">✗</span> Sin comunidad real de pet parents</div>
            <div role="cell"><span class="compare__check" aria-hidden="true">✓</span> Comunidad que entiende tu dolor</div>
          </div>
          <div class="compare__row" role="row">
            <div role="cell"><span class="compare__x" aria-hidden="true">✗</span> Solo fotos estáticas</div>
            <div role="cell"><span class="compare__check" aria-hidden="true">✓</span> Avatar animado de tu mascota</div>
          </div>
          <div class="compare__row" role="row">
            <div role="cell"><span class="compare__x" aria-hidden="true">✗</span> La cuenta puede borrarse o bloquearse</div>
            <div role="cell"><span class="compare__check" aria-hidden="true">✓</span> Espacio protegido y perpetuo</div>
          </div>
          <div class="compare__row" role="row">
            <div role="cell"><span class="compare__x" aria-hidden="true">✗</span> Nadie entiende por qué llorás por un animal</div>
            <div role="cell"><span class="compare__check" aria-hidden="true">✓</span> Aquí todos entienden tu dolor</div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 8: PSICOLOGÍA / AVAL -->
    <section class="science" id="ciencia" aria-labelledby="science-heading">
      <div class="container">
        <div class="science__inner reveal">
          <div class="science__text">
            <p class="section-eyebrow">Respaldo científico</p>
            <h2 class="section-title" id="science-heading">El duelo por una mascota es real. La ciencia lo respalda.</h2>
            <blockquote class="science__quote">
              <p>"Mantener un vínculo simbólico con quien perdiste no prolonga el dolor: lo integra."</p>
              <footer>— Modelo Continuing Bonds · Klass, Silverman & Nickman (1996)</footer>
            </blockquote>
            <p>Los vínculos que mantenemos simbólicamente con quienes perdemos forman parte natural del proceso de duelo. Eternamente está diseñado con este principio como base: no para negar la pérdida, sino para honrar el amor que sigue.</p>
            <a href="#" class="btn btn--ghost">Aprendé más sobre el duelo y las mascotas</a>
          </div>
          <div class="science__logos" aria-label="Respaldo profesional">
            <p class="science__logos-label">Avalado por profesionales</p>
            <div class="science__logos-grid">
              <div class="science__logo-placeholder">Psic. Animal Argentina</div>
              <div class="science__logo-placeholder">Asoc. de Duelo Pet</div>
              <div class="science__logo-placeholder">Colegio de Psicólogos</div>
              <div class="science__logo-placeholder">PetGrief Institute</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 9: FAQ -->
    <section class="faq" id="faq" aria-labelledby="faq-heading">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title" id="faq-heading">Preguntas frecuentes</h2>
        </div>
        <dl class="faq__list">
          <div class="faq__item reveal">
            <dt class="faq__question">
              <button class="faq__btn" aria-expanded="false" aria-controls="faq-1">
                ¿Cómo se genera el avatar de mi mascota?
                <span class="faq__icon" aria-hidden="true"></span>
              </button>
            </dt>
            <dd class="faq__answer" id="faq-1" hidden>
              <p>Subís entre 3 y 10 fotos de tu mascota desde distintos ángulos y con buena iluminación. Nuestro sistema de inteligencia artificial analiza las fotos para capturar sus rasgos únicos — color de pelaje, forma de la cara, postura característica — y genera un avatar animado en minutos. No necesitás ningún conocimiento técnico.</p>
            </dd>
          </div>
          <div class="faq__item reveal">
            <dt class="faq__question">
              <button class="faq__btn" aria-expanded="false" aria-controls="faq-2">
                ¿Qué pasa con el memorial si cancelo mi suscripción?
                <span class="faq__icon" aria-hidden="true"></span>
              </button>
            </dt>
            <dd class="faq__answer" id="faq-2" hidden>
              <p>El perfil conmemorativo básico permanece activo siempre, aunque dejes de pagar. Las funciones premium (avatar animado, galería extendida, música) quedan pausadas, pero todo el contenido y las fotos se conservan. Cuando quieras reactivar, el memorial sigue exactamente donde lo dejaste.</p>
            </dd>
          </div>
          <div class="faq__item reveal">
            <dt class="faq__question">
              <button class="faq__btn" aria-expanded="false" aria-controls="faq-3">
                ¿Pueden acceder otras personas al memorial?
                <span class="faq__icon" aria-hidden="true"></span>
              </button>
            </dt>
            <dd class="faq__answer" id="faq-3" hidden>
              <p>Vos elegís. Podés configurarlo como público (visible para cualquier persona con el link), privado (solo vos), o compartido (solo las personas que vos invitás con un código). Podés cambiar esta configuración en cualquier momento.</p>
            </dd>
          </div>
          <div class="faq__item reveal">
            <dt class="faq__question">
              <button class="faq__btn" aria-expanded="false" aria-controls="faq-4">
                ¿Qué fotos necesito subir para el avatar?
                <span class="faq__icon" aria-hidden="true"></span>
              </button>
            </dt>
            <dd class="faq__answer" id="faq-4" hidden>
              <p>Con 3 fotos podés empezar — idealmente una de frente, una de perfil y una de cuerpo entero. Fotos con buena luz natural funcionan mucho mejor que fotos con flash. Mientras más fotos subas, más fiel será el avatar. Podés usar fotos del celular sin ningún problema, no hace falta equipo de fotografía.</p>
            </dd>
          </div>
          <div class="faq__item reveal">
            <dt class="faq__question">
              <button class="faq__btn" aria-expanded="false" aria-controls="faq-5">
                ¿Es seguro subir fotos personales?
                <span class="faq__icon" aria-hidden="true"></span>
              </button>
            </dt>
            <dd class="faq__answer" id="faq-5" hidden>
              <p>Absolutamente. Las fotos se almacenan con cifrado en servidores seguros y nunca se comparten con terceros ni se usan para entrenar modelos de IA de otros. Solo vos (y las personas que vos autorices) pueden verlas. Podés eliminarlas en cualquier momento desde tu panel.</p>
            </dd>
          </div>
          <div class="faq__item reveal">
            <dt class="faq__question">
              <button class="faq__btn" aria-expanded="false" aria-controls="faq-6">
                ¿Puedo crear un memorial para más de una mascota?
                <span class="faq__icon" aria-hidden="true"></span>
              </button>
            </dt>
            <dd class="faq__answer" id="faq-6" hidden>
              <p>Sí. Podés crear tantos memoriales como necesites desde la misma cuenta. Cada mascota tiene su propio espacio, perfil y avatar. Con el plan Memorial podés vincularlos en el árbol familiar de mascotas para mostrar todas sus historias juntas.</p>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <p class="footer__logo">Eternamente</p>
          <p class="footer__tagline">El lugar donde tu mascota vive para siempre.</p>
        </div>
        <nav class="footer__nav" aria-label="Links del footer">
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#planes">Planes</a></li>
            <li><a href="#comunidad">Comunidad</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Soporte</a></li>
            <li><a href="#">Términos</a></li>
            <li><a href="#">Privacidad</a></li>
          </ul>
        </nav>
        <div class="footer__social" aria-label="Redes sociales">
          <a href="#" aria-label="Instagram de Eternamente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="#" aria-label="TikTok de Eternamente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
          </a>
          <a href="#" aria-label="Facebook de Eternamente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="footer__copy">© 2026 Eternamente. Todos los derechos reservados.</p>
        <p class="footer__closing">Porque el amor no tiene fecha de vencimiento.</p>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `css/styles.css`** — see Task 2
- [ ] **Step 3: Create `js/main.js`** — see Task 3
- [ ] **Step 4: Open `index.html` in browser and verify structure renders**

Open file directly: `c:/Users/salva/Desktop/tp juli mi amor/index.html`
Expected: bare page with correct font loading, nav visible, all sections present in DOM

---

### Task 2: Full CSS styles

**Files:**
- Create: `css/styles.css`

- [ ] **Step 1: Write complete CSS**

```css
/* ============================================
   ETERNAMENTE — styles.css
   Custom properties → Reset → Typography → 
   Layout → Nav → Hero → Sections → Components → 
   Responsive → Animations
============================================ */

/* ---- CUSTOM PROPERTIES ---- */
:root {
  --cream:          #F9F5F0;
  --cream-dark:     #EDE7DF;
  --lavender:       #C4A8D4;
  --lavender-dark:  #A88BBF;
  --lavender-light: #E8DDEF;
  --gold:           #E8C97A;
  --gold-dark:      #D4AE55;
  --brown:          #2C1A0E;
  --brown-mid:      #5C3D2A;
  --surface:        #FFFFFF;
  --shadow-sm:      0 2px 8px rgba(44,26,14,0.06);
  --shadow-md:      0 8px 32px rgba(44,26,14,0.10);
  --shadow-lg:      0 16px 48px rgba(44,26,14,0.14);
  --radius-sm:      8px;
  --radius-md:      16px;
  --radius-lg:      24px;
  --radius-full:    9999px;
  --transition:     300ms ease;
  --font-display:   'Cormorant Garamond', Georgia, serif;
  --font-body:      'DM Sans', system-ui, sans-serif;
  --max-width:      1200px;
}

/* ---- RESET ---- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: var(--font-body);
  background: var(--cream);
  color: var(--brown);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* ---- SKIP LINK ---- */
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  background: var(--brown);
  color: var(--cream);
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  z-index: 1000;
  transition: top var(--transition);
  font-family: var(--font-body);
}
.skip-link:focus { top: 16px; }

/* ---- CONTAINER ---- */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

/* ---- TYPOGRAPHY ---- */
h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 400; line-height: 1.15; }
h1 { font-size: clamp(40px, 6vw, 68px); }
h2 { font-size: clamp(28px, 4vw, 44px); }
h3 { font-size: clamp(20px, 2.5vw, 26px); }
p { font-size: 17px; line-height: 1.7; }
em { font-style: italic; color: var(--lavender-dark); }

/* ---- SECTION SHARED ---- */
section { padding: 96px 0; }
.section-header { text-align: center; max-width: 680px; margin: 0 auto 64px; }
.section-title { margin-bottom: 16px; }
.section-subtitle { color: var(--brown-mid); font-size: 18px; }
.section-eyebrow {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--lavender-dark);
  margin-bottom: 12px;
}

/* ---- BUTTONS ---- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  transition: all var(--transition);
  white-space: nowrap;
}
.btn:focus-visible {
  outline: 3px solid var(--lavender);
  outline-offset: 2px;
}
.btn--primary {
  background: var(--lavender);
  color: var(--brown);
}
.btn--primary:hover {
  background: var(--lavender-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.btn--outline {
  border: 2px solid var(--lavender);
  color: var(--brown);
}
.btn--outline:hover {
  background: var(--lavender-light);
  transform: translateY(-1px);
}
.btn--ghost {
  color: var(--brown-mid);
  text-decoration: underline;
  text-underline-offset: 3px;
  padding: 14px 4px;
}
.btn--ghost:hover { color: var(--brown); }
.btn--lg { padding: 18px 36px; font-size: 17px; }
.btn--sm { padding: 10px 20px; font-size: 14px; }
.btn--full { width: 100%; }

/* ---- NAV ---- */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(249,245,240,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(196,168,212,0.2);
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}
.nav__logo-word {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  color: var(--brown);
  letter-spacing: -0.02em;
}
.nav__links {
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 15px;
  color: var(--brown-mid);
}
.nav__links a:not(.btn):hover { color: var(--brown); }

/* ---- HERO ---- */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 120px 0 80px;
  background: linear-gradient(160deg, var(--cream) 0%, #F0EAF8 60%, var(--cream-dark) 100%);
}
.hero__particles {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hero__content {
  position: relative;
  z-index: 2;
  max-width: 760px;
}
.hero__eyebrow {
  font-size: 14px;
  font-weight: 500;
  color: var(--lavender-dark);
  margin-bottom: 20px;
  letter-spacing: 0.04em;
}
.hero__title {
  margin-bottom: 24px;
  color: var(--brown);
}
.hero__subtitle {
  font-size: 20px;
  color: var(--brown-mid);
  max-width: 560px;
  margin-bottom: 40px;
  line-height: 1.65;
}
.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}
.hero__silhouettes {
  position: absolute;
  right: -40px;
  bottom: 0;
  display: flex;
  gap: 24px;
  align-items: flex-end;
  opacity: 0.08;
  pointer-events: none;
  z-index: 1;
}
.silhouette {
  color: var(--lavender-dark);
}
.silhouette--dog { width: 280px; }
.silhouette--cat { width: 220px; margin-bottom: 24px; }

/* ---- FEATURES ---- */
.features { background: var(--surface); }
.features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.feature-card {
  background: var(--cream);
  border-radius: var(--radius-lg);
  padding: 40px 32px;
  transition: transform var(--transition), box-shadow var(--transition);
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.feature-card__icon {
  width: 56px;
  height: 56px;
  color: var(--lavender-dark);
  margin-bottom: 24px;
}
.feature-card__title {
  margin-bottom: 12px;
  font-size: 22px;
}
.feature-card__desc {
  color: var(--brown-mid);
  font-size: 16px;
}

/* ---- HOW IT WORKS ---- */
.how { background: var(--cream-dark); }
.how__steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  position: relative;
}
.how__steps::before {
  content: '';
  position: absolute;
  top: 40px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: linear-gradient(90deg, var(--lavender-light), var(--lavender), var(--lavender-light));
  z-index: 0;
}
.how__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}
.how__step-number {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--surface);
  border: 3px solid var(--lavender);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  color: var(--lavender-dark);
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}
.how__step-icon {
  width: 40px;
  height: 40px;
  color: var(--lavender-dark);
  margin-bottom: 16px;
}
.how__step-content h3 {
  font-size: 18px;
  margin-bottom: 8px;
}
.how__step-content p {
  color: var(--brown-mid);
  font-size: 15px;
}

/* ---- PLANS ---- */
.plans { background: var(--surface); }
.plans__toggle {
  display: flex;
  justify-content: center;
  gap: 4px;
  background: var(--cream-dark);
  border-radius: var(--radius-full);
  padding: 4px;
  width: fit-content;
  margin: 0 auto 56px;
}
.toggle-btn {
  padding: 10px 24px;
  border-radius: var(--radius-full);
  font-size: 15px;
  font-weight: 500;
  color: var(--brown-mid);
  transition: all var(--transition);
}
.toggle-btn.active {
  background: var(--surface);
  color: var(--brown);
  box-shadow: var(--shadow-sm);
}
.plans__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: start;
}
.plan-card {
  background: var(--cream);
  border-radius: var(--radius-lg);
  padding: 40px 32px;
  position: relative;
  transition: transform var(--transition), box-shadow var(--transition);
}
.plan-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.plan-card--featured {
  background: var(--brown);
  color: var(--cream);
  transform: scale(1.04);
  box-shadow: var(--shadow-lg);
}
.plan-card--featured:hover { transform: scale(1.04) translateY(-4px); }
.plan-card__badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gold);
  color: var(--brown);
  font-size: 13px;
  font-weight: 600;
  padding: 6px 20px;
  border-radius: var(--radius-full);
  white-space: nowrap;
  letter-spacing: 0.04em;
}
.plan-card__header { margin-bottom: 32px; }
.plan-card__name {
  font-family: var(--font-display);
  font-size: 28px;
  margin-bottom: 8px;
}
.plan-card--featured .plan-card__name { color: var(--cream); }
.plan-card__price {
  font-family: var(--font-display);
  font-size: 42px;
  font-weight: 300;
  line-height: 1;
  margin-bottom: 8px;
}
.plan-card__price small {
  font-size: 18px;
  font-weight: 400;
}
.plan-card--featured .plan-card__price { color: var(--gold); }
.plan-card__tagline { font-size: 14px; opacity: 0.7; }
.plan-card__features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
  font-size: 15px;
}
.plan-card--featured .plan-card__features { color: rgba(249,245,240,0.85); }
.check { color: var(--lavender-dark); font-weight: 700; margin-right: 8px; }
.plan-card--featured .check { color: var(--gold); }
.plan-card--featured .btn--outline {
  border-color: var(--lavender-light);
  color: var(--cream);
}
.plan-card--featured .btn--primary {
  background: var(--lavender);
  color: var(--brown);
}

/* ---- CEMETERY ---- */
.cemetery { background: var(--cream-dark); }
.cemetery__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 48px;
}
.pet-card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
  background: var(--cream);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition), box-shadow var(--transition);
}
.pet-card:hover, .pet-card:focus-visible {
  transform: scale(1.04);
  box-shadow: var(--shadow-md);
  outline: none;
}
.pet-card:focus-visible { outline: 3px solid var(--lavender); outline-offset: 2px; }
.pet-card__avatar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
}
/* Each avatar has a unique pastel background + emoji */
.pet-card__avatar--dog    { background: #EEE0F5; }
.pet-card__avatar--dog::before    { content: '🐕'; }
.pet-card__avatar--cat    { background: #F5EEE0; }
.pet-card__avatar--cat::before    { content: '🐈'; }
.pet-card__avatar--dog2   { background: #E0EFF5; }
.pet-card__avatar--dog2::before   { content: '🐩'; }
.pet-card__avatar--rabbit { background: #F5E0EE; }
.pet-card__avatar--rabbit::before { content: '🐇'; }
.pet-card__avatar--cat2   { background: #EEF5E0; }
.pet-card__avatar--cat2::before   { content: '🐱'; }
.pet-card__avatar--dog3   { background: #F0E8D8; }
.pet-card__avatar--dog3::before   { content: '🦮'; }
.pet-card__avatar--cat3   { background: #E8D8F0; }
.pet-card__avatar--cat3::before   { content: '😺'; }
.pet-card__avatar--dog4   { background: #D8EEE8; }
.pet-card__avatar--dog4::before   { content: '🐶'; }
.pet-card__avatar--dog5   { background: #EEE4D8; }
.pet-card__avatar--dog5::before   { content: '🐕‍🦺'; }
.pet-card__avatar--cat4   { background: #D8E4EE; }
.pet-card__avatar--cat4::before   { content: '🐈‍⬛'; }
.pet-card__avatar--dog6   { background: #EDD8EE; }
.pet-card__avatar--dog6::before   { content: '🐾'; }
.pet-card__avatar--cat5   { background: #D8EDEE; }
.pet-card__avatar--cat5::before   { content: '🐾'; }
.pet-card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(44,26,14,0.85) 0%, transparent 100%);
  padding: 20px 14px 14px;
  transform: translateY(100%);
  transition: transform var(--transition);
}
.pet-card:hover .pet-card__overlay,
.pet-card:focus-visible .pet-card__overlay { transform: translateY(0); }
.pet-card__name {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--cream);
  font-weight: 400;
}
.pet-card__location { font-size: 12px; color: rgba(249,245,240,0.7); }
.cemetery__cta { text-align: center; }

/* ---- TESTIMONIALS ---- */
.testimonials { background: var(--cream); }
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.testimonial-card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 36px 32px;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition), box-shadow var(--transition);
}
.testimonial-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.testimonial-card__quote {
  font-family: var(--font-display);
  font-size: 20px;
  font-style: italic;
  color: var(--brown);
  margin-bottom: 28px;
  line-height: 1.5;
}
.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: 14px;
}
.testimonial-card__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--lavender);
  color: var(--brown);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  flex-shrink: 0;
}
.testimonial-card__name {
  font-weight: 600;
  font-size: 15px;
  font-style: normal;
  display: block;
}
.testimonial-card__location { font-size: 13px; color: var(--brown-mid); }

/* ---- COMPARE ---- */
.compare { background: var(--cream-dark); }
.compare__table {
  max-width: 760px;
  margin: 0 auto;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}
.compare__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.compare__row--header {
  background: var(--brown);
  color: var(--cream);
}
.compare__row--header div {
  padding: 20px 32px;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  text-align: center;
}
.compare__row:not(.compare__row--header) {
  background: var(--surface);
  border-bottom: 1px solid var(--cream-dark);
}
.compare__row:not(.compare__row--header):last-child { border-bottom: none; }
.compare__row:not(.compare__row--header) div {
  padding: 18px 32px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.compare__row:not(.compare__row--header) div:first-child {
  background: #FFF8F5;
  color: var(--brown-mid);
  border-right: 1px solid var(--cream-dark);
}
.compare__row:not(.compare__row--header) div:last-child { color: var(--brown); }
.compare__x { color: #D4836A; font-weight: 700; }
.compare__check { color: var(--lavender-dark); font-weight: 700; }

/* ---- SCIENCE ---- */
.science { background: var(--surface); }
.science__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.science__text .section-title { text-align: left; margin-bottom: 24px; }
.science__quote {
  background: var(--lavender-light);
  border-left: 4px solid var(--lavender);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 24px 28px;
  margin: 28px 0;
}
.science__quote p {
  font-family: var(--font-display);
  font-size: 20px;
  font-style: italic;
  color: var(--brown);
  margin-bottom: 10px;
}
.science__quote footer { font-size: 13px; color: var(--brown-mid); }
.science__text > p { color: var(--brown-mid); margin-bottom: 32px; }
.science__logos { }
.science__logos-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brown-mid);
  margin-bottom: 20px;
}
.science__logos-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.science__logo-placeholder {
  background: var(--cream-dark);
  border-radius: var(--radius-sm);
  padding: 20px 16px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: var(--brown-mid);
  border: 1px dashed rgba(92,61,42,0.2);
}

/* ---- FAQ ---- */
.faq { background: var(--cream); }
.faq__list {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.faq__item { border-bottom: 1px solid rgba(196,168,212,0.3); }
.faq__item:first-child { border-top: 1px solid rgba(196,168,212,0.3); }
.faq__question { }
.faq__btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  font-size: 18px;
  font-family: var(--font-display);
  font-weight: 400;
  color: var(--brown);
  text-align: left;
  gap: 16px;
  transition: color var(--transition);
}
.faq__btn:hover { color: var(--lavender-dark); }
.faq__btn[aria-expanded="true"] { color: var(--lavender-dark); }
.faq__icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--lavender);
  flex-shrink: 0;
  position: relative;
  transition: background var(--transition), transform var(--transition);
}
.faq__icon::before, .faq__icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  background: var(--lavender-dark);
  border-radius: 2px;
  transition: transform var(--transition), opacity var(--transition);
}
.faq__icon::before {
  width: 10px;
  height: 2px;
  transform: translate(-50%, -50%);
}
.faq__icon::after {
  width: 2px;
  height: 10px;
  transform: translate(-50%, -50%);
}
.faq__btn[aria-expanded="true"] .faq__icon::after { transform: translate(-50%, -50%) rotate(90deg); opacity: 0; }
.faq__btn[aria-expanded="true"] .faq__icon { background: var(--lavender-light); }
.faq__answer {
  overflow: hidden;
  max-height: 0;
  transition: max-height 350ms ease, padding 350ms ease;
}
.faq__answer.open { max-height: 400px; }
.faq__answer p {
  padding: 0 0 24px;
  color: var(--brown-mid);
  font-size: 16px;
}

/* ---- FOOTER ---- */
.footer {
  background: var(--brown);
  color: var(--cream);
  padding: 64px 0 32px;
}
.footer__top {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 48px;
  align-items: start;
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(249,245,240,0.15);
}
.footer__logo {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}
.footer__tagline { font-size: 14px; opacity: 0.6; }
.footer__nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
}
.footer__nav a {
  font-size: 14px;
  opacity: 0.7;
  transition: opacity var(--transition);
}
.footer__nav a:hover { opacity: 1; }
.footer__social {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}
.footer__social a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(249,245,240,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition);
}
.footer__social a:hover { background: rgba(196,168,212,0.3); }
.footer__social svg { width: 18px; height: 18px; }
.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer__copy { font-size: 13px; opacity: 0.4; }
.footer__closing {
  font-family: var(--font-display);
  font-size: 16px;
  font-style: italic;
  opacity: 0.6;
}

/* ---- SCROLL REVEAL ---- */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 600ms ease, transform 600ms ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ---- RESPONSIVE: TABLET (768px) ---- */
@media (max-width: 900px) {
  section { padding: 72px 0; }
  .nav__links { gap: 16px; }
  .nav__links li:not(:last-child):nth-child(n+3) { display: none; }
  .features__grid { grid-template-columns: 1fr; gap: 20px; }
  .how__steps {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  .how__steps::before { display: none; }
  .plans__grid {
    grid-template-columns: 1fr;
    max-width: 440px;
    margin: 0 auto;
  }
  .plan-card--featured { transform: none; }
  .plan-card--featured:hover { transform: translateY(-4px); }
  .cemetery__grid { grid-template-columns: repeat(3, 1fr); }
  .testimonials__grid { grid-template-columns: 1fr; max-width: 520px; margin: 0 auto; }
  .science__inner { grid-template-columns: 1fr; gap: 48px; }
  .footer__top { grid-template-columns: 1fr; gap: 32px; }
  .footer__social { justify-content: flex-start; }
  .footer__bottom { flex-direction: column; gap: 12px; text-align: center; }
}

/* ---- RESPONSIVE: MOBILE (480px) ---- */
@media (max-width: 480px) {
  section { padding: 56px 0; }
  .container { padding: 0 16px; }
  .nav__inner { height: 60px; }
  .nav__links { display: none; }
  .hero { min-height: 100svh; padding: 100px 0 60px; }
  .hero__ctas { flex-direction: column; align-items: flex-start; }
  .btn--lg { width: 100%; }
  .how__steps { grid-template-columns: 1fr; }
  .cemetery__grid { grid-template-columns: repeat(2, 1fr); }
  .compare__row--header div,
  .compare__row:not(.compare__row--header) div { padding: 14px 16px; font-size: 14px; }
  .footer__top { gap: 24px; }
}

/* ---- REDUCED MOTION ---- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  .reveal { opacity: 1; transform: none; }
}
```

- [ ] **Step 2: Open in browser and verify styles**

Open `index.html`. Expected: fonts load from Google, layout shows hero with gradient, nav sticky at top, all sections styled correctly.

---

### Task 3: JavaScript — particles, scroll reveal, FAQ, plan toggle

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Write complete JS**

```js
/* ============================================
   ETERNAMENTE — main.js
   1. Hero particles canvas
   2. Scroll reveal (IntersectionObserver)
   3. FAQ accordion
   4. Plan toggle (monthly / one-time)
   5. Smooth scroll fallback
============================================ */

/* ---------- 1. HERO PARTICLES ---------- */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const isMobile = () => window.innerWidth < 768;
  const COUNT = isMobile() ? 18 : 38;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* Particle factory */
  function makeParticle() {
    return {
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      r:      Math.random() * 2.5 + 0.5,
      dx:     (Math.random() - 0.5) * 0.35,
      dy:     -(Math.random() * 0.45 + 0.15),
      alpha:  Math.random() * 0.5 + 0.15,
      dAlpha: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
    };
  }

  const particles = Array.from({ length: COUNT }, makeParticle);

  /* Gold / lavender palette for sparkles */
  const colors = ['#E8C97A', '#C4A8D4', '#F0D898', '#D4B8E8'];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.beginPath();
      /* Draw a 4-pointed star sparkle */
      const arms = 4, outer = p.r, inner = p.r * 0.35;
      for (let i = 0; i < arms * 2; i++) {
        const angle = (i * Math.PI) / arms - Math.PI / 2;
        const rr = i % 2 === 0 ? outer : inner;
        if (i === 0) ctx.moveTo(p.x + rr * Math.cos(angle), p.y + rr * Math.sin(angle));
        else         ctx.lineTo(p.x + rr * Math.cos(angle), p.y + rr * Math.sin(angle));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      /* Update position */
      p.x += p.dx;
      p.y += p.dy;
      p.alpha += p.dAlpha;

      /* Reverse fade direction at bounds */
      if (p.alpha >= 0.65 || p.alpha <= 0.05) p.dAlpha *= -1;

      /* Wrap around edges */
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
    }
    requestAnimationFrame(draw);
  }

  /* Only run if user hasn't asked for reduced motion */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    draw();
  }
})();


/* ---------- 2. SCROLL REVEAL ---------- */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!window.IntersectionObserver) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          /* Stagger children inside grids */
          const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
          let delay = 0;
          siblings.forEach((sib, i) => {
            if (sib === entry.target || entry.target.contains(sib)) {
              delay = i * 80;
            }
          });
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(el => observer.observe(el));
})();


/* ---------- 3. FAQ ACCORDION ---------- */
(function initFAQ() {
  const buttons = document.querySelectorAll('.faq__btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answer   = document.getElementById(answerId);
      if (!answer) return;

      /* Close all others */
      buttons.forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherId = other.getAttribute('aria-controls');
          const otherAnswer = document.getElementById(otherId);
          if (otherAnswer) {
            otherAnswer.classList.remove('open');
            otherAnswer.hidden = false; /* keep in DOM for animation */
          }
        }
      });

      /* Toggle current */
      if (expanded) {
        btn.setAttribute('aria-expanded', 'false');
        answer.classList.remove('open');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
        /* Force reflow before adding class for CSS transition */
        answer.getBoundingClientRect();
        answer.classList.add('open');
      }
    });
  });

  /* Remove 'hidden' from all answers on init so CSS transition works */
  document.querySelectorAll('.faq__answer').forEach(a => { a.hidden = false; });
})();


/* ---------- 4. PLAN TOGGLE ---------- */
(function initPlanToggle() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  if (!toggleBtns.length) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;

      /* Update button states */
      toggleBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });

      /* Show/hide prices */
      document.querySelectorAll('.price').forEach(price => {
        if (price.classList.contains(plan)) {
          price.hidden = false;
        } else {
          price.hidden = true;
        }
      });
    });
  });
})();


/* ---------- 5. NAV ACTIVE LINK ---------- */
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'nav__link--active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html`. Expected:
- Sparkle particles float upward in hero
- Sections fade in as you scroll down
- FAQ items open/close with smooth animation
- Plan toggle switches between monthly and one-time prices

---

### Task 4: Final polish and cross-browser check

**Files:**
- Modify: `css/styles.css` (minor additions only)

- [ ] **Step 1: Add nav active link style**

Add to end of `css/styles.css`:
```css
/* ---- NAV ACTIVE LINK ---- */
.nav__link--active {
  color: var(--lavender-dark) !important;
  font-weight: 500;
}
```

- [ ] **Step 2: Open in browser, scroll full page**

Verify checklist:
- [ ] Fonts render as Cormorant Garamond (display) + DM Sans (body)
- [ ] Hero particles visible
- [ ] All 10 sections present and styled
- [ ] Plan toggle works (click Pago único, prices change)
- [ ] FAQ accordion opens/closes
- [ ] Pet cards show overlay on hover
- [ ] No horizontal scrollbar on mobile (resize window to 375px)
- [ ] Compare table is readable
- [ ] Footer shows correctly
- [ ] Sticky nav works during scroll

- [ ] **Step 3: Done — open `index.html` in browser to view site**

The site is fully local at:
`c:/Users/salva/Desktop/tp juli mi amor/index.html`

# Eternamente — Cementerio Virtual de Mascotas
## Design Spec · 2026-04-16

---

## Nombre y posicionamiento

**Nombre:** Eternamente  
**Tagline:** "El lugar donde tu mascota vive para siempre."  
**Concepto central:** Memorial de vida digital con avatar generado por IA. No es un álbum de fotos ni red social — el usuario viene a *visitar* a su mascota.

---

## Identidad visual

### Paleta
| Token | Valor | Uso |
|-------|-------|-----|
| `--cream` | `#F9F5F0` | Fondo principal |
| `--lavender` | `#C4A8D4` | Acento primario, CTAs |
| `--gold` | `#E8C97A` | Acento secundario, badges |
| `--brown` | `#2C1A0E` | Texto principal |
| `--surface` | `#FFFFFF` | Cards, superficies |
| `--cream-dark` | `#EDE7DF` | Fondo secciones alternas |
| `--lavender-dark` | `#A88BBF` | Hover de acento |

### Tipografía
- **Display:** Cormorant Garamond (Google Fonts) — serif atemporal
- **Body:** DM Sans (Google Fonts) — sans-serif suave
- Tamaños: h1 64px / h2 40px / h3 28px / body 17px

### Animaciones
- Scroll reveal: fade-in + translateY(20px) con IntersectionObserver
- Hover cards: scale(1.02) + sombra más pronunciada
- Partículas flotantes: canvas con destellos dorados sutiles en el hero
- Transiciones: 300ms ease

---

## Arquitectura del archivo

Proyecto estático de un solo HTML con CSS y JS embebidos en archivos separados:

```
tp juli mi amor/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── (SVGs inline, sin imágenes externas)
```

---

## Secciones (10)

### 1. Hero
- H1: "El lugar donde tu mascota vive para siempre"
- Subtítulo + 2 CTAs
- Canvas con partículas doradas
- Prueba social: "Más de 12.000 mascotas ya tienen su lugar aquí"
- Fondo: degradado crema con siluetas difusas de mascotas (SVG)

### 2. ¿Qué es esto?
- Párrafo diferenciador vs Instagram
- 3 cards con ícono SVG + título + descripción
- Pilares: IA→Avatar / Permanente / Comunidad

### 3. Así funciona
- Timeline de 4 pasos con íconos y texto
- Diseño horizontal en desktop, vertical en mobile

### 4. Planes
- 3 cards: Recuerdo / Memorial (destacado) / Legado
- Toggle mensual/único (visual, sin lógica de pago)
- Memorial con badge "Más elegido" en lavanda

### 5. Cementerio Mundial
- Grid de mascotas con hover effect (nombre + años de vida)
- 12 cards ficticias con nombres y ciudades latam/España
- CTA explorar comunidad

### 6. Testimonios
- 3 cards con avatar circular + nombre + ciudad + quote
- Fondo cream-dark

### 7. ¿Por qué no alcanza con Instagram?
- Tabla comparativa 2 columnas
- Redes Sociales vs Eternamente

### 8. Psicología / Aval
- Bloque con cita sobre Continuing Bonds
- Logos placeholder de psicólogos/instituciones

### 9. FAQ
- Accordion con 6 preguntas, animación de apertura suave

### 10. Footer
- Logo + tagline + links + redes + frase emocional

---

## Decisiones técnicas

- **Stack:** HTML5 + CSS custom properties + JS vanilla
- **Sin frameworks** — zero dependencies excepto Google Fonts
- **Responsive:** mobile-first, breakpoints: 480px / 768px / 1200px
- **Accesibilidad:** contraste AA, alt text, focus visible, skip-to-content
- **Performance:** SVGs inline, lazy loading en imágenes, sin imágenes externas
- **Scroll:** smooth-scroll nativo + IntersectionObserver para reveals
- **Partículas:** canvas 2D nativo, máx 40 partículas, reducidas en mobile

---

## Copy y datos

- Nombre plataforma: **Eternamente**
- Precio Básico: $9.99/mes o $49 único
- Precio Memorial: $19.99/mes o $99 único
- Precio Legado: $39.99/mes o $199 único
- Testimonios: Valentina (BsAs), Martín (Córdoba), Sofía (Montevideo)
- Mascotas cementerio: nombres ficticios de LATAM + España + Europa

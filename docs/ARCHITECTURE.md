# Architecture

## Current: Zero-Dependency Static (v1)

Legacya Sphere is deliberately a single-file static website. This is not a limitation — it is a considered architectural choice.

### Request Flow

```
User opens legacyasphere.com
  │
  └─ Browser fetches index.html (CDN-cached)
       │
       ├─ Inline <style id="ls-critical">
       │    Locks layout immediately → no FOUC
       │    Shows splash screen overlay
       │
       ├─ <script> sets html.ls-loading
       │    Ensures content stays hidden until ready
       │
       ├─ Tailwind CDN (deferred)
       │    Parses custom config (colors, fonts, keyframes)
       │    Generates utility classes JIT
       │
       ├─ Google Fonts (async)
       │    Fraunces, Instrument Serif, Inter, JetBrains Mono
       │
       └─ Inline <script> (bottom of body)
            Runs after DOM is parsed
            ├─ SplashController      → hides overlay when fonts+styles ready
            ├─ RevealObserver        → IntersectionObserver on .reveal elements
            ├─ ScrollTracker         → rAF loop for scroll-position features
            ├─ CardFlipController    → 3D transform on brand section
            ├─ SlideshowEngine       → project image carousel
            ├─ MobileMenuController  → drawer + Escape key
            ├─ FormHandler           → mailto + honeypot guard
            └─ BrowserDetector       → Chrome recommendation toast
```

### JavaScript Module Responsibilities

| Module | Trigger | Key API |
|--------|---------|---------|
| `SplashController` | `document.fonts.ready` + Tailwind load | `classList.add('is-done')` |
| `RevealObserver` | `DOMContentLoaded` | `IntersectionObserver` |
| `ScrollTracker` | `scroll` event (passive) | `requestAnimationFrame` |
| `CardFlipController` | `ScrollTracker` callback | CSS `transform: rotateY()` |
| `SlideshowEngine` | `mouseenter` / `mouseleave` | `setInterval` + index state |
| `MobileMenuController` | `click`, `keydown` | ARIA `aria-expanded` |
| `FormHandler` | `submit` | `window.location.href = 'mailto:...'` |
| `BrowserDetector` | `DOMContentLoaded` | `navigator.userAgent` |

### Performance Budget

| Resource | Size | Notes |
|----------|------|-------|
| `index.html` | ~90KB | Includes all markup, inline CSS, inline JS |
| Tailwind CDN | ~100KB | Cached aggressively by CDN |
| Google Fonts | ~30KB | Subset by `display=swap` |
| Images (WebP) | 15–40KB each | Lazy-loaded |
| Images (PNG) | 80–560KB | Only for hi-res case study |
| **Total (first load)** | **~400KB** | Below 500KB budget |

---

## Planned: Component-Based Static (v2)

As the site grows with more case studies and a potential blog, a lightweight build step becomes worthwhile.

### Proposed Structure

```
legacya-sphere/
├── src/
│   ├── components/
│   │   ├── splash.html
│   │   ├── nav.html
│   │   ├── hero.html
│   │   ├── services.html
│   │   ├── manifesto.html
│   │   ├── process.html
│   │   ├── projects.html
│   │   ├── contact.html
│   │   └── footer.html
│   ├── scripts/
│   │   ├── animations.js      # RevealObserver + ScrollTracker
│   │   ├── slideshow.js       # SlideshowEngine
│   │   ├── menu.js            # MobileMenuController
│   │   └── form.js            # FormHandler + BrowserDetector
│   ├── styles/
│   │   ├── tokens.css         # Design tokens as CSS custom properties
│   │   └── critical.css       # Inline-able critical styles
│   └── data/
│       └── projects.json      # Project metadata (title, images, tags)
├── public/
│   └── img/                   # Optimized image assets
├── dist/                      # Build output (gitignored)
├── build.js                   # concat + minify, no bundler
└── package.json               # devDependencies only (build tools)
```

### Build Pipeline

```
build.js
  ├── Read component HTML files
  ├── Inject into shell template
  ├── Inline critical CSS
  ├── Minify JS modules → concat
  ├── Hash asset filenames for cache busting
  └── Write dist/index.html
```

No webpack. No Vite. A 50-line Node.js script with `fs` and `path`.

---

## Planned: SaaS-Adjacent (v3)

If Legacya Sphere evolves into a client-facing platform with a portal:

```
legacya-sphere/
├── site/               # Public marketing site (v2 above)
├── portal/             # Client portal (SvelteKit or Astro)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   └── projects/[id]/
│   │   └── lib/
│   │       ├── auth.ts        # Auth.js or Lucia
│   │       └── db.ts          # Drizzle ORM
│   └── drizzle/
│       └── schema.ts
├── api/                # Edge functions (Cloudflare Workers)
│   ├── contact.ts      # Replace mailto with real form submission
│   ├── brief.ts        # AI project brief generator (Claude API)
│   └── bookings.ts     # Cal.com webhook handler
└── shared/
    └── types.ts
```

**Technology choices for v3:**
- **Framework:** Astro (content-first) or SvelteKit (interactive)
- **Database:** Turso (SQLite on the edge) or PlanetScale
- **Auth:** Lucia or Clerk
- **AI:** Anthropic Claude API (brief generation, content suggestions)
- **Deployment:** Cloudflare Pages + Workers (global, cheap)

---

## Design Token System

All visual decisions derive from a core palette defined in the Tailwind config:

```
Backgrounds
  bg      #F7F4ED  ← warm white (main canvas)
  cream   #FAF8F2  ← off-white (elevated surfaces)
  sand    #EDE6D6  ← warm sand (subtle sections)
  warm    #F2EBDA  ← warmer sand (borders, dividers)

Text
  ink     #1C1A17  ← near-black (primary text)
  ink-2   #13110F  ← deep black (headings on light)
  ink-soft #5A5650 ← medium gray (secondary text)
  mute    #8A847A  ← light gray (captions, meta)

Accent
  gold    #B8956A  ← warm gold (primary accent, CTAs)
  gold-soft #D6BC95← light gold (hover states)
  clay    #C9A582  ← clay (tertiary accent)

Borders
  line      #E6DFD0 ← light border (on cream bg)
  line-dark #2A2722 ← dark border (on ink bg)
```

This warm, earthy palette is a deliberate brand choice — it differentiates from the cold blue/gray palette common in tech portfolios.

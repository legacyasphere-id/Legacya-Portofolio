<div align="center">

<br />

<img src="public/img-15.webp" alt="Legacya Sphere" width="68" />

<br /><br />

# Legacya Sphere — AI-Native Founder OS

### Portfolio v2 · React + Vite + TypeScript

*Not a portfolio. A system.*

<br />

[![Live Site](https://img.shields.io/badge/Live-legacya--portofolio.vercel.app-B8956A?style=flat-square&logo=vercel&logoColor=white)](https://legacya-portofolio.vercel.app)
[![GitHub Pages](https://img.shields.io/badge/Mirror-GitHub_Pages-181717?style=flat-square&logo=github)](https://legacyasphere-id.github.io/Legacya-Portofolio/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Claude Certified](https://img.shields.io/badge/Anthropic-Claude_101_+_Code_101-CC785C?style=flat-square&logo=anthropic&logoColor=white)](https://anthropic.com)

<br />

</div>

---

## What Is This?

**Legacya Sphere Portfolio v2** is a production-grade React application that frames identity as an operating system, not a CV. Built entirely with Claude as co-engineer across architecture, implementation, and deployment.

> *"I don't build features. I build systems. AI is my co-engineer."*

This is a complete rewrite of the original v1 single-file HTML portfolio. Every UI section, data layer, and deployment pipeline was designed and shipped using Claude Code as the primary engineering partner.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 (StrictMode, concurrent) |
| Language | TypeScript 5 (strict, noUnusedLocals) |
| Build | Vite 5 (ESM, tree-shaking, content hashing) |
| Styling | Tailwind CSS v3 (custom warm palette tokens) |
| Typography | Fraunces · Inter · JetBrains Mono · Playfair Display |
| Images | WebP + JPG (lazy-loaded, BASE_URL-safe) |
| Deployment | Vercel (primary) · GitHub Pages (mirror) |

---

## Design System

Warm cream/gold palette — a deliberate departure from standard neon-on-dark developer portfolios.

| Token | Value | Use |
|-------|-------|-----|
| `bg` | `#F7F4ED` | Page background |
| `surface` | `#FAF8F2` | Card surface |
| `raised` | `#EDE6D6` | Elevated sections |
| `border` | `#E6DFD0` | All borders |
| `text` | `#1C1A17` | Primary text |
| `muted` | `#8A847A` | Secondary text |
| `dim` | `#B5AFA4` | Tertiary / labels |
| `cyan` | `#B8956A` | Gold accent (CTAs, links) |
| `purple` | `#7A8B6A` | Sage accent |
| `green` | `#5A8A6A` | Forest accent (status) |

---

## Page Sections

| # | Section | Description |
|---|---------|-------------|
| — | **Nav** | Sticky warm-cream navigation with GitHub + CTA |
| 1 | **Hero** | Identity badges, headline, metrics bar |
| 2 | **Founder OS** | 4 operating principles + 4-stage workflow pipeline |
| 3 | **Case Studies** | Featured project + 3-column grid with expandable breakdowns |
| 4 | **AI Flow** | Build pipeline: Idea → Architecture → Code → Deploy |
| 5 | **Evolution** | Live learning tracks + Verified Credentials |
| 6 | **Contact** | Mailto-based inquiry form with honeypot protection |
| — | **Footer** | Wordmark, nav columns, availability status |

---

## Project Structure

```
Legacya-Portofolio/
├── public/                     # Static assets (images, certificates)
│   ├── img-04.webp             # Founder portrait
│   ├── img-15.webp             # Legacya Sphere logo
│   ├── img-16/17/18.webp       # InventoryOS screenshots
│   ├── img-06/07/08.webp       # Legacya POS UI screenshots
│   ├── img-09/10/11.webp       # Hybrid Dashboard screenshots
│   ├── daenuna-*.jpg           # daenuna.co screenshots
│   └── assets/certificates/    # PDF certificates
│
├── src/
│   ├── core/                   # Site-wide constants
│   │   ├── config.ts           # Nav links, site metadata
│   │   ├── founder-os.ts       # Principles + workflow data
│   │   ├── identity.ts         # Single source of truth for all copy
│   │   └── principles.ts       # Operating principles definitions
│   │
│   ├── data/                   # Page data (no hardcoded UI content)
│   │   ├── profile.ts          # Personal info, credentials
│   │   ├── projects.ts         # 4 case studies with full breakdowns
│   │   ├── roadmap.ts          # Learning tracks with status
│   │   └── stack.ts            # Tech stack grouped by category
│   │
│   ├── types/                  # TypeScript interfaces
│   ├── utils/
│   │   └── asset.ts            # BASE_URL-aware image path helper
│   ├── components/             # Reusable UI units
│   ├── sections/               # Page-level compositions
│   ├── App.tsx                 # Root — composes all sections
│   ├── main.tsx                # React 18 createRoot entry
│   └── index.css               # Tailwind directives + base styles
│
├── index.html                  # Vite entry — splash screen, fonts
├── vite.config.ts              # base: '/' (Vercel) / '/Legacya-Portofolio/' (Pages)
├── tailwind.config.js          # Warm palette tokens + font families
├── vercel.json                 # SPA rewrites
└── .github/workflows/
    └── deploy.yml              # Validate → build → deploy to GitHub Pages
```

---

## Key Engineering Notes

### Asset Path Utility

Images in `public/` are referenced through `src/utils/asset.ts` so paths work on both Vercel and GitHub Pages:

```typescript
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
```

`asset('img-04.webp')` → `/img-04.webp` on Vercel, `/Legacya-Portofolio/img-04.webp` on GitHub Pages.

### Dual-Target Base URL

```typescript
// vite.config.ts
base: process.env.VERCEL ? '/' : '/Legacya-Portofolio/',
```

Vercel sets `VERCEL=1` automatically. GitHub Actions does not — so both deploy targets get the correct prefix without extra config.

### Splash Screen

`index.html` renders an inline CSS splash before JS loads. React removes it via `useEffect` on first render. A 30-second fallback clears it if JS never loads:

```html
<script>
  window.__spl = false;
  setTimeout(function() {
    if (window.__spl) return;
    var s = document.getElementById('ls-splash');
    if (s) { s.style.opacity = '0'; setTimeout(() => s.remove(), 520); }
  }, 30000);
</script>
```

---

## Getting Started

```bash
# Clone
git clone https://github.com/legacyasphere-id/Legacya-Portofolio.git
cd Legacya-Portofolio

# Install
npm install

# Dev server (hot reload)
npm run dev

# Type-check + production build
npm run build

# Preview production build locally
npm run preview
```

Open `http://localhost:5173`.

---

## Deployment

### Vercel (Primary — auto-deploy on push to `main`)

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import `legacyasphere-id/Legacya-Portofolio`
3. Build command: `npm run build` · Output directory: `dist`
4. Every push to `main` deploys in ~30s

### GitHub Pages (Mirror — auto-deploy via Actions)

Configured in `.github/workflows/deploy.yml`. Triggers on every push to `main`:
1. Validates source files
2. Runs `npm ci && npm run build`
3. Deploys `dist/` as a Pages artifact

| Environment | URL |
|-------------|-----|
| **Vercel (primary)** | [legacya-portofolio.vercel.app](https://legacya-portofolio.vercel.app) |
| **GitHub Pages (mirror)** | [legacyasphere-id.github.io/Legacya-Portofolio](https://legacyasphere-id.github.io/Legacya-Portofolio/) |

---

## Verified Credentials

| Credential | Issuer | Date |
|------------|--------|------|
| Claude 101 | Anthropic | May 2026 |
| Claude Code 101 | Anthropic | 2026 |

Certificates are displayed in the **System Evolution** section of the live site.

---

## Author

**Yoga Pratama Effendi**  
Founder · Legacya Sphere · Bekasi, Indonesia · GMT+7

*AI-Native Founder. Building operational software systems with Claude as co-engineer at every stage.*

[![Live Site](https://img.shields.io/badge/Site-legacya--portofolio.vercel.app-B8956A?style=flat-square)](https://legacya-portofolio.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-legacyasphere--id-181717?style=flat-square&logo=github)](https://github.com/legacyasphere-id)
[![Email](https://img.shields.io/badge/Email-legacyasphere%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:legacyasphere@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yoga_Pratama_Effendi-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/yoga-pratamaeffendi-59b376245)

---

## License

[MIT](LICENSE) — Code is open for inspiration. Brand, copy, and client work belong to Legacya Sphere.

---

<div align="center">

*Built with Claude. Shipped as a system.*

**[View Live Site](https://legacya-portofolio.vercel.app) · [GitHub Pages Mirror](https://legacyasphere-id.github.io/Legacya-Portofolio/)**

</div>

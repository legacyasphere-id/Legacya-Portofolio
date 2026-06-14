<div align="center">

<br />

<img src="public/img-15.webp" alt="Legacya Sphere" width="68" />

<br /><br />

# Legacya Sphere — Operational Systems Studio

### Portfolio v2 · React + Vite + TypeScript

*Not a portfolio. A system.*

<br />

[![Live Site](https://img.shields.io/badge/Live-legacya--portofolio.vercel.app-B8956A?style=flat-square&logo=vercel&logoColor=white)](https://legacya-portofolio.vercel.app)
[![GitHub Pages](https://img.shields.io/badge/Mirror-GitHub_Pages-181717?style=flat-square&logo=github)](https://legacyasphere-id.github.io/Legacya-Portofolio/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tests](https://img.shields.io/badge/Playwright-32_passing-22C55E?style=flat-square)](https://playwright.dev)
[![Claude Certified](https://img.shields.io/badge/Anthropic-Claude_101_+_Code_101-CC785C?style=flat-square&logo=anthropic&logoColor=white)](https://anthropic.com)

<br />

</div>

---

## What Is This?

**Legacya Sphere Portfolio v2** is a production-grade React application positioning Legacya Sphere as a **premium operational systems studio** — not a CV, not a generic portfolio. Built entirely with Claude as co-engineer.

> *"I don't build features. I build systems. AI is my co-engineer."*

This is a complete rewrite of the v1 single-file HTML portfolio. Every UI section, data layer, and deployment pipeline was designed and shipped using Claude Code.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 (StrictMode, concurrent) |
| Language | TypeScript 5 (strict, noUnusedLocals) |
| Build | Vite 5 (ESM, tree-shaking, content hashing) |
| Styling | Tailwind CSS v3 (custom cream/blue design tokens) |
| Typography | Sora · Inter · Geist Mono |
| Images | WebP + JPG (lazy-loaded, BASE_URL-safe) |
| Testing | Playwright (32 tests passing) |
| Deployment | Vercel (primary) · GitHub Pages (mirror) |

---

## Design System

Premium cream/blue palette — studio-grade, not generic developer dark mode.

| Token | Value | Use |
|-------|-------|-----|
| `bg` | `#F7F4ED` | Page background |
| `surface` | `#FAF8F2` | Card surface |
| `border` | `#E6DFD0` | All borders |
| `text` | `#1C1A17` | Primary text |
| `muted` | `#8A847A` | Secondary text |
| `accent` | `#B8956A` | Gold/warm accent |
| `blue` | studio blue | CTA, active states |

Typography: **Sora** (headings) · **Inter** (body) · **Geist Mono** (code/labels)

---

## Page Sections

| # | Section | Description |
|---|---------|-------------|
| — | **Nav** | Sticky navigation with GitHub link + CTA |
| 1 | **Hero** | Outcome-first positioning with real swirl logo |
| 2 | **Case Studies** | Structured project cards with outcome metrics |
| 3 | **OS Status** | Live board showing active systems + status |
| 4 | **Services / Approach** | What the studio builds and how |
| 5 | **Evolution** | Learning tracks + Verified Credentials |
| 6 | **Contact** | Inquiry form with honeypot protection |
| — | **Footer** | Wordmark, nav columns, availability status |

---

## Project Structure

```
Legacya-Portofolio/
├── public/                     # Static assets (images, certificates)
├── src/
│   ├── core/                   # Site-wide constants
│   │   ├── config.ts           # Nav links, site metadata
│   │   ├── founder-os.ts       # Principles + workflow data
│   │   ├── identity.ts         # Single source of truth for all copy
│   │   └── principles.ts       # Operating principles definitions
│   ├── data/                   # Page data (no hardcoded UI content)
│   │   ├── profile.ts          # Personal info, credentials
│   │   ├── projects.ts         # Case studies with outcome breakdowns
│   │   ├── roadmap.ts          # Learning tracks with status
│   │   └── stack.ts            # Tech stack grouped by category
│   ├── types/                  # TypeScript interfaces
│   ├── utils/
│   │   └── asset.ts            # BASE_URL-aware image path helper
│   ├── components/             # Reusable UI units
│   ├── sections/               # Page-level compositions
│   ├── App.tsx                 # Root — composes all sections
│   ├── main.tsx                # React 18 createRoot entry
│   └── index.css               # Tailwind directives + base styles
├── index.html                  # Vite entry — splash screen, fonts
├── vite.config.ts              # base: '/' (Vercel) / '/Legacya-Portofolio/' (Pages)
├── tailwind.config.js          # Design tokens + font families
├── vercel.json                 # SPA rewrites
└── .github/workflows/
    └── deploy.yml              # Validate → build → deploy to GitHub Pages
```

---

## Key Engineering Notes

### Asset Path Utility

```typescript
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
```

Works on both Vercel (`/`) and GitHub Pages (`/Legacya-Portofolio/`).

### Dual-Target Base URL

```typescript
base: process.env.VERCEL ? '/' : '/Legacya-Portofolio/',
```

Vercel sets `VERCEL=1` automatically; GitHub Actions does not.

### Splash Screen

Inline CSS splash renders before JS loads; React removes it via `useEffect`. 30-second fallback clears it if JS never loads.

---

## Getting Started

```bash
git clone https://github.com/legacyasphere-id/Legacya-Portofolio.git
cd Legacya-Portofolio
npm install
npm run dev        # → http://localhost:5173
npm run build      # Type-check + production build
npm run preview    # Preview production build locally
```

---

## Deployment

| Environment | URL |
|-------------|-----|
| **Vercel (primary)** | [legacya-portofolio.vercel.app](https://legacya-portofolio.vercel.app) |
| **GitHub Pages (mirror)** | [legacyasphere-id.github.io/Legacya-Portofolio](https://legacyasphere-id.github.io/Legacya-Portofolio/) |

Every push to `main` auto-deploys on both targets.

---

## Changelog

| Date | What changed |
|------|--------------|
| Jun 14, 2026 | **Full redesign** — Operational Systems Studio: cream/blue design system, Sora/Inter/Geist Mono typography, real swirl logo, outcome-first hero, structured case studies, OS Status board. 32 Playwright tests. |
| Jun 10, 2026 | Antikode-style brand portfolio: rotating sphere hero, sticky work deck, scroll-reveal animations, mobile burger menu |
| Jun 5, 2026 | README polished — tighter wording and clean structure |

---

## Verified Credentials

| Credential | Issuer | Date |
|------------|--------|------|
| Claude 101 | Anthropic | May 2026 |
| Claude Code 101 | Anthropic | 2026 |

---

## Author

**Yoga Pratama Effendi**
Founder · Legacya Sphere · Bekasi, Indonesia · GMT+7

*Operational systems builder. Claude as co-engineer at every stage.*

[![Live Site](https://img.shields.io/badge/Site-legacya--portofolio.vercel.app-B8956A?style=flat-square)](https://legacya-portofolio.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-legacyasphere--id-181717?style=flat-square&logo=github)](https://github.com/legacyasphere-id)
[![Email](https://img.shields.io/badge/Email-legacyasphere%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:legacyasphere@gmail.com)

---

## License

[MIT](LICENSE) — Code is open for inspiration. Brand, copy, and client work belong to Legacya Sphere.

---

<div align="center">

*Built with Claude. Shipped as a system.*

**[View Live Site](https://legacya-portofolio.vercel.app)**

</div>

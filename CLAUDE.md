# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Institutional website for **OrtoArt Materiais Cirúrgicos Ltda.** — a B2B surgical materials distributor (spinal surgery + sports medicine) based in Curitiba, PR, Brazil. The site is informational only (no e-commerce). All copy is in Brazilian Portuguese.

## Commands

All commands run from the repository root:

```bash
npm run dev      # dev server on localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

There is no test suite configured.

## ⚠️ Next.js Version Warning

This project uses **Next.js 16.2.1** with **React 19**. APIs and conventions may differ significantly from training data. Before writing any Next.js-specific code, check `node_modules/next/dist/docs/` for current documentation. The App Router is used (no Pages Router).

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout — Header + main + Footer + WhatsAppButton
│   ├── globals.css         # Tailwind v4 @theme tokens + global resets
│   ├── page.tsx            # Home (/)
│   └── (pages)/            # Route group (no URL segment)
│       ├── quem-somos/
│       ├── coluna/
│       ├── medicina-esportiva/
│       ├── parceiros/
│       ├── blog/
│       └── contato/
├── components/
│   ├── layout/             # Header.tsx, Footer.tsx
│   ├── ui/                 # WhatsAppButton.tsx
│   └── sections/           # Empty — page sections go here
└── lib/
    └── utils.ts            # cn() = clsx + tailwind-merge
```

Path alias: `@/*` → `src/*`

## Styling

Tailwind v4 (new `@tailwindcss/postcss` plugin — no `tailwind.config.ts`). The design token theme is defined inline in `globals.css` under `@theme`:

| Token | Value | Semantic use |
|---|---|---|
| `navy` / `primary` | `#0D1F3C` | Primary dark blue — backgrounds, headers |
| `navy-light` | `#1a3a6e` | Slightly lighter navy |
| `blue` / `secondary` | `#4B8AB0` | Secondary — hover states |
| `sky` / `accent` | `#87CEEB` | Accent — logo color, CTAs |
| `sky-light` | `#ADD8E6` | Soft backgrounds, cards |

Font: **Montserrat** (Google Fonts, loaded via `next/font/google`, variable `--font-montserrat`).

## Current State

All pages are skeleton stubs. Only three components are implemented: `Header`, `Footer`, and `WhatsAppButton`. The `sections/` directory is empty. Detailed content and section specs live in `planejamento/` (one file per page: 01–07).

## Reference Materials

- `planejamento/` — Per-page section specs and copy direction
- `old/` — Scraped markdown content from the previous WordPress site (22 blog articles + page content for migration reference)
- `Briefing.md` — Client overview, brand identity, business objectives
- `Branding/` — `logotype.pdf`
- `downloads/synthorix/` — Local mirror of the Framer reference site used as implementation base

## Known Pending Items

- WhatsApp number in `WhatsAppButton.tsx` is a placeholder (`5541999999999`) — needs real number from client
- All page sections need to be built out per specs in `planejamento/`
- Real photos, product images, and partner logos pending from client
- Instagram feed integration not yet started
- Google Maps embed for `/contato` not yet started
- LGPD cookie consent banner not yet implemented

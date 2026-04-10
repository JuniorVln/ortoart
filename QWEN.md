# OrtoArt — Site Institucional

## Visão Geral

Site institucional da **OrtoArt Materiais Cirúrgicos Ltda.** — distribuidora B2B de materiais cirúrgicos para **coluna vertebral** e **medicina esportiva**, sediada em Curitiba, PR, Brasil. O site é **apenas informativo** (sem e-commerce). Todo o conteúdo é em **português brasileiro**.

O projeto foi construído do zero com Next.js 16 como uma revitalização completa do antigo site WordPress da empresa.

## Stack Tecnológica

| Tecnologia | Versão |
|---|---|
| **Next.js** | 16.2.1 (App Router) |
| **React** | 19.2.4 |
| **TypeScript** | 5.x |
| **Tailwind CSS** | v4 (com `@tailwindcss/postcss`, sem `tailwind.config.ts`) |
| **React Hook Form** | 7.x |
| **Zod** | 4.x |
| **Lucide React** | ícones |

## Comandos

Todos os comandos são executados a partir da raiz do repositório:

```bash
npm run dev       # Dev server em localhost:3000 (com Turbopack)
npm run build     # Build de produção
npm run start     # Inicia servidor de produção
npm run lint      # ESLint
```

**Mirror de referência** (site base clonado):

```bash
python -m http.server 4173 --bind 127.0.0.1 --directory downloads/synthorix
# Abrir: http://127.0.0.1:4173/pages/index.html
```

## ⚠️ Atenção — Next.js 16 + React 19

Este projeto usa **Next.js 16.2.1** com **React 19**. APIs e convenções podem diferir significativamente do dado de treinamento. **Antes de escrever código Next.js**, consulte `node_modules/next/dist/docs/` para a documentação atual.

## Arquitetura

```
src/
├── app/
│   ├── layout.tsx              # Root layout — Header + main + Footer + WhatsAppButton
│   ├── globals.css             # Tailwind v4 @theme tokens + resets globais
│   ├── page.tsx                # Home (/)
│   └── (pages)/                # Route group (sem segmento na URL)
│       ├── quem-somos/
│       ├── coluna/
│       ├── medicina-esportiva/
│       ├── parceiros/
│       ├── blog/
│       └── contato/
├── components/
│   ├── layout/                 # Header.tsx, Footer.tsx
│   ├── ui/                     # WhatsAppButton.tsx, SiteLogo.tsx
│   └── sections/               # Vazio — seções de páginas vão aqui
└── lib/
    └── utils.ts                # cn() = clsx + tailwind-merge
```

**Path alias:** `@/*` → `src/*`

## Styling — Design Tokens

Tailwind v4 com tema definido inline em `globals.css` sob `@theme`:

| Token | Valor | Uso semântico |
|---|---|---|
| `navy` / `primary` | `#0D1F3C` | Primária escura — fundos, headers |
| `navy-light` | `#1a3a6e` | Azul marinho mais claro |
| `blue` / `secondary` | `#4B8AB0` | Secundária — hover states |
| `sky` / `accent` | `#87CEEB` | Acento — logo, CTAs |
| `sky-light` | `#ADD8E6` | Fundos suaves, cards |

**Tipografia:** **Montserrat** (Google Fonts, via `next/font/google`, variável `--font-montserrat`). Pesos: 300–800.

## Estado Atual

- **Páginas:** Skeleton stubs com estrutura básica de rotas
- **Componentes implementados:** `Header`, `Footer`, `WhatsAppButton`, `SiteLogo`
- **Seções (`sections/`):** Vazio — a construir
- **Conteúdo:** Especificações detalhadas em `planejamento/` (um arquivo por página: 01–07)

## Estrutura de Páginas (Planejamento)

| Página | Rota | Objetivo |
|---|---|---|
| **Home** | `/` | Credibilidade rápida + navegação para áreas |
| **Quem Somos** | `/quem-somos` | Autoridade e conexão humana (história do CEO) |
| **Coluna** | `/coluna` | Portfólio de produtos para cirurgia de coluna |
| **Medicina Esportiva** | `/medicina-esportiva` | Portfólio de produtos para med. esportiva |
| **Parceiros** | `/parceiros` | Credibilidade via fabricantes representados |
| **Blog** | `/blog` | Tráfego orgânico + posicionamento técnico |
| **Contato** | `/contato` | Formulário + dados + mapa |

## Componentes Globais

| Componente | Descrição |
|---|---|
| **Header** | Logo + menu principal + botão CTA + hambúrguer mobile |
| **Footer** | Logo + links rápidos + contato + CNPJ + políticas LGPD + redes sociais |
| **WhatsAppButton** | Botão flutuante fixo (canto inferior direito) em todas as páginas |
| **Banner de Cookies** | LGPD — aceitar / gerenciar preferências *(a implementar)* |

## Funcionalidades Obrigatórias

| Funcionalidade | Status |
|---|---|
| WhatsApp flutuante | ✅ Implementado (número placeholder) |
| Formulário de contato/orçamento | ❌ Pendente |
| Feed do Instagram | ❌ Pendente |
| Links para fabricantes (nova aba) | ❌ Pendente |
| Google Maps no contato | ❌ Pendente |
| Banner de cookies (LGPD) | ❌ Pendente |
| Blog/CMS | ❌ Pendente |
| SEO (OG, sitemap, meta) | Parcial (metadata configurada) |
| Responsivo (mobile-first) | ❌ Pendente |

## Pastas de Apoio

| Pasta | Conteúdo |
|---|---|
| `planejamento/` | Especificações por página + logos de parceiros |
| `old/` | Conteúdo extraído do antigo site WordPress (22 artigos) |
| `Branding/` | Materiais de marca (`logotype.pdf`) |
| `downloads/synthorix/` | Mirror estático do site de referência (base visual) |

## Pendências Conhecidas

- Número real do WhatsApp (atualmente placeholder `5541999999999`)
- Todas as seções de conteúdo por página (conforme `planejamento/`)
- Fotos reais, imagens de produtos e logos de parceiros (aguardando cliente)
- Integração com feed do Instagram
- Google Maps embed na página de contato
- Banner de consentimento LGPD
- Política de Privacidade e Termos de Uso (páginas legais)

## Convenções

- **Sem testes** configurados no momento
- **ESLint:** Config com `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`, ignorando `.next/`, `out/`, `build/`, `downloads/`
- **TypeScript:** `strict: true`, com path alias `@/*`
- **Linguagem:** Todo texto e copy em **português brasileiro** (pt-BR)
- **Layout:** Flex-col no `body` para empurrar footer para baixo (`flex-1` no `main`)

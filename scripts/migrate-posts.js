#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const OLD_DIR = path.join(__dirname, "..", "old");
const OUT_DIR = path.join(__dirname, "..", "src", "content", "posts");

const POSTS = [
  {
    src: "blog_alimentacao-ossos.md",
    slug: "o-papel-da-alimentacao-saudavel-e-do-exercicio-para-a-saude-dos-ossos",
    date: "2022-06-14",
    category: "Ortopedia",
    image: "/blog/o-papel-da-alimentacao-saudavel-e-do-exercicio-para-a-saude-dos-ossos.jpg",
    alt: "Alimentos saudáveis para fortalecer os ossos",
  },
  {
    src: "blog_artroplastia-joelho.md",
    slug: "artroplastia-do-joelho-atividade-fisica-e-implante-ortopedico",
    date: "2022-07-25",
    category: "Ortopedia",
    image: "/blog/artroplastia-do-joelho-atividade-fisica-e-implante-ortopedico.jpg",
    alt: "Cirurgia de artroplastia do joelho",
  },
  {
    src: "blog_artrose-joelho.md",
    slug: "artrose-de-joelho-e-a-rotina-familiar-como-lidar-com-dores-cronicas-e-mobilidade-reduzida",
    date: "2022-07-18",
    category: "Ortopedia",
    image: "/blog/artrose-de-joelho-e-a-rotina-familiar-como-lidar-com-dores-cronicas-e-mobilidade-reduzida.jpg",
    alt: "Pessoa com dor no joelho devido à artrose",
  },
  {
    src: "blog_cotovelo-tenista.md",
    slug: "voce-sabe-o-que-e-o-cotovelo-de-tenista",
    date: "2022-03-14",
    category: "Medicina Esportiva",
    image: "/blog/voce-sabe-o-que-e-o-cotovelo-de-tenista.jpg",
    alt: "Tenista com dor no cotovelo",
  },
  {
    src: "blog_cuidados-cirurgia-quadril.md",
    slug: "cuidados-apos-a-cirurgia-de-substituicao-do-quadril",
    date: "2022-03-21",
    category: "Ortopedia",
    image: "/blog/cuidados-apos-a-cirurgia-de-substituicao-do-quadril.jpg",
    alt: "Paciente em recuperação após cirurgia de quadril",
  },
  {
    src: "blog_distribuidores-mercado.md",
    slug: "distribuidores-investem-na-qualidade-das-proteses-cirurgicas-ortopedicas-e-ganham-mercado",
    date: "2022-04-18",
    category: "Coluna",
    image: "/blog/distribuidores-investem-na-qualidade-das-proteses-cirurgicas-ortopedicas-e-ganham-mercado.jpg",
    alt: "Distribuidor de próteses cirúrgicas ortopédicas",
  },
  {
    src: "blog_dor-no-quadril.md",
    slug: "como-se-livrar-da-dor-no-quadril-sintomas-e-tratamentos",
    date: "2022-05-11",
    category: "Ortopedia",
    image: "/blog/como-se-livrar-da-dor-no-quadril-sintomas-e-tratamentos.jpg",
    alt: "Pessoa com dor no quadril",
  },
  {
    src: "blog_dores-articulacoes-frio.md",
    slug: "dores-nas-articulacoes-pioram-no-frio",
    date: "2022-07-25",
    category: "Ortopedia",
    image: "/blog/dores-nas-articulacoes-pioram-no-frio.jpg",
    alt: "Pessoa com dores nas articulações no frio",
  },
  {
    src: "blog_espondilite-anquilosante.md",
    slug: "voce-ja-ouviu-falar-em-espondilite-anquilosante",
    date: "2022-05-22",
    category: "Coluna",
    image: "/blog/voce-ja-ouviu-falar-em-espondilite-anquilosante.jpg",
    alt: "Ilustração da coluna vertebral com espondilite anquilosante",
  },
  {
    src: "blog_fratura-femur.md",
    slug: "entenda-a-fratura-do-femur-e-como-preveni-la",
    date: "2022-05-08",
    category: "Ortopedia",
    image: "/blog/entenda-a-fratura-do-femur-e-como-preveni-la.jpg",
    alt: "Raio-X mostrando fratura do fêmur",
  },
  {
    src: "blog_fratura-tornozelo.md",
    slug: "fratura-do-tornozelo-e-a-mais-comum-do-membro-inferior",
    date: "2022-07-21",
    category: "Medicina Esportiva",
    image: "/blog/fratura-do-tornozelo-e-a-mais-comum-do-membro-inferior.jpg",
    alt: "Tornozelo com fratura imobilizado",
  },
  {
    src: "blog_idade-implantes.md",
    slug: "existe-uma-idade-para-a-colocacao-de-implantes-ortopedicos-cirurgicos",
    date: "2022-06-27",
    category: "Ortopedia",
    image: "/blog/existe-uma-idade-para-a-colocacao-de-implantes-ortopedicos-cirurgicos.jpg",
    alt: "Médico conversando com paciente idoso sobre implante ortopédico",
  },
  {
    src: "blog_implantes-qualidade-vida.md",
    slug: "implantes-e-proteses-como-garantir-a-qualidade-de-vida-e-conforto-do-paciente-lesionado",
    date: "2022-02-22",
    category: "Ortopedia",
    image: "/blog/implantes-e-proteses-como-garantir-a-qualidade-de-vida-e-conforto-do-paciente-lesionado.jpg",
    alt: "Paciente com implante ortopédico retomando atividades",
  },
  {
    src: "blog_joelho-depois-protese.md",
    slug: "como-fica-o-meu-joelho-depois-da-protese",
    date: "2022-02-22",
    category: "Ortopedia",
    image: "/blog/como-fica-o-meu-joelho-depois-da-protese.jpg",
    alt: "Ilustração da prótese de joelho implantada",
  },
  {
    src: "blog_nanotecnologia-proteses.md",
    slug: "proteses-cirurgicas-com-nanotecnologia-evitam-rejeicao-e-duram-cada-vez-mais",
    date: "2022-02-22",
    category: "Ortopedia",
    image: "/blog/proteses-cirurgicas-com-nanotecnologia-evitam-rejeicao-e-duram-cada-vez-mais.png",
    alt: "Prótese cirúrgica com tecnologia avançada",
  },
  {
    src: "blog_ortopedia-esportiva.md",
    slug: "avanco-na-ortopedia-esportiva-na-ultima-decada-garante-longevidade-a-atletas",
    date: "2022-02-22",
    category: "Medicina Esportiva",
    image: "/blog/avanco-na-ortopedia-esportiva-na-ultima-decada-garante-longevidade-a-atletas.jpg",
    alt: "Atleta em campo com equipamento esportivo",
  },
  {
    src: "blog_osteoporose.md",
    slug: "osteoporose-prevencao-tratamento-e-o-papel-das-proteses-ortopedicas-cirurgicas",
    date: "2022-06-07",
    category: "Ortopedia",
    image: "/blog/osteoporose-prevencao-tratamento-e-o-papel-das-proteses-ortopedicas-cirurgicas.jpg",
    alt: "Raio-X de osso com osteoporose",
  },
  {
    src: "blog_por-que-proteses-ombro.md",
    slug: "por-que-as-proteses-cirurgicas-de-ombro-sao-indicadas",
    date: "2022-05-31",
    category: "Ortopedia",
    image: "/blog/por-que-as-proteses-cirurgicas-de-ombro-sao-indicadas.jpg",
    alt: "Modelo anatômico do ombro com prótese",
  },
  {
    src: "blog_preciso-protese.md",
    slug: "preciso-de-uma-protese-cirurgica-e-agora",
    date: "2022-02-22",
    category: "Ortopedia",
    image: "/blog/preciso-de-uma-protese-cirurgica-e-agora.jpg",
    alt: "Médico explicando prótese cirúrgica ao paciente",
  },
  {
    src: "blog_proteses-ombro.md",
    slug: "quando-sao-indicadas-as-proteses-de-ombro",
    date: "2022-06-27",
    category: "Ortopedia",
    image: "/blog/quando-sao-indicadas-as-proteses-de-ombro.jpg",
    alt: "Cirurgião analisando prótese de ombro",
  },
  {
    src: "blog_reavaliar-protese.md",
    slug: "quando-e-hora-de-reavaliar-a-sua-protese",
    date: "2022-02-22",
    category: "Ortopedia",
    image: "/blog/quando-e-hora-de-reavaliar-a-sua-protese.jpg",
    alt: "Médico avaliando implante ortopédico do paciente",
  },
];

function extractBody(raw, title) {
  // Find the title line index
  const lines = raw.split("\n");
  let titleIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === `# ${title}`) {
      titleIdx = i;
      break;
    }
  }
  if (titleIdx === -1) {
    // Try partial match
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("# ") && lines[i].includes(title.substring(0, 20))) {
        titleIdx = i;
        break;
      }
    }
  }
  if (titleIdx === -1) return "";

  // Find end marker
  let endIdx = lines.length;
  for (let i = titleIdx + 1; i < lines.length; i++) {
    if (lines[i].startsWith("### Add Comment") || lines[i].startsWith("#### Posts recentes")) {
      endIdx = i;
      break;
    }
  }

  let body = lines.slice(titleIdx + 1, endIdx).join("\n");

  // Remove image line at top (lines starting with ![)
  body = body.replace(/^!\[.*?\]\(.*?\)\s*\n/m, "");
  // Remove date+category line (e.g. "14 de junho de 2022 [Blog](...)")
  body = body.replace(/^\d{1,2} de \w+ de \d{4}.*\n/m, "");
  // Remove "‍" zero-width joiner
  body = body.replace(/‍/g, "");
  // Remove press-release contact blocks (Atendimento à imprensa)
  body = body.replace(/\*\*Atendimento à imprensa[\s\S]*$/m, "");
  // Remove "Sobre a Ortoart" blocks at the end
  body = body.replace(/\*\*Sobre a Ortoart\*\*[\s\S]*$/m, "");
  // Trim
  body = body.trim();

  return body;
}

function extractSummary(body) {
  const lines = body.split("\n");
  for (const line of lines) {
    const clean = line.replace(/\*\*/g, "").replace(/^_|_$/g, "").trim();
    // Skip headings, images, italic-only lines, very short lines
    if (!clean || clean.startsWith("#") || clean.startsWith("!") || clean.startsWith("_") || clean.length < 60) continue;
    if (clean.length <= 220) return clean;
    const cut = clean.substring(0, 220);
    const lastDot = cut.lastIndexOf(".");
    return lastDot > 100 ? cut.substring(0, lastDot + 1) : cut + "...";
  }
  return "";
}

function titleFromFile(raw) {
  for (const line of raw.split("\n")) {
    if (line.startsWith("# ")) return line.slice(2).trim();
  }
  return "";
}

let created = 0;
let skipped = 0;

for (const post of POSTS) {
  const srcPath = path.join(OLD_DIR, post.src);
  const outPath = path.join(OUT_DIR, post.slug + ".md");

  // Skip the already-curated main post
  if (post.slug === "estresse-e-lesoes-osseas-em-atletas") {
    skipped++;
    continue;
  }

  const raw = fs.readFileSync(srcPath, "utf-8");
  const title = titleFromFile(raw);
  const body = extractBody(raw, title);

  if (!body) {
    console.warn(`WARN: no body found for ${post.src}`);
    continue;
  }

  const summary = extractSummary(body);

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: ${post.slug}
category: ${post.category}
coverImage: ${post.image}
coverAlt: ${post.alt}
summary: "${summary.replace(/"/g, '\\"')}"
published: true
date: ${post.date}
---

`;

  fs.writeFileSync(outPath, frontmatter + body + "\n");
  console.log(`OK: ${post.slug}.md`);
  created++;
}

console.log(`\nCriados: ${created} | Pulados: ${skipped}`);

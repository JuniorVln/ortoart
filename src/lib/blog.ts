import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

export type BlogCategory = "Coluna" | "Medicina Esportiva" | "Ortopedia";

export type BlogPostBlock = {
  type: "heading" | "paragraph";
  text: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  coverImage: string;
  coverAlt: string;
  summary: string;
  excerpt: string;
  dateLabel: string;
  dateISO: string;
  readingTime: number;
  blocks: BlogPostBlock[];
};

type LegacyBlogSource = {
  fileName: string;
  slug: string;
  category: BlogCategory;
  coverImage: string;
};

const legacyBlogSources: readonly LegacyBlogSource[] = [
  {
    fileName: "blog_artroplastia-joelho.md",
    slug: "artroplastia-do-joelho-atividade-fisica-e-implante-ortopedico",
    category: "Ortopedia",
    coverImage:
      "/blog/artroplastia-do-joelho-atividade-fisica-e-implante-ortopedico.jpg",
  },
  {
    fileName: "blog_dores-articulacoes-frio.md",
    slug: "dores-nas-articulacoes-pioram-no-frio",
    category: "Ortopedia",
    coverImage: "/blog/dores-nas-articulacoes-pioram-no-frio.jpg",
  },
  {
    fileName: "blog_fratura-tornozelo.md",
    slug: "fratura-do-tornozelo-e-a-mais-comum-do-membro-inferior",
    category: "Ortopedia",
    coverImage:
      "/blog/fratura-do-tornozelo-e-a-mais-comum-do-membro-inferior.jpg",
  },
  {
    fileName: "blog_artrose-joelho.md",
    slug: "artrose-de-joelho-e-a-rotina-familiar-como-lidar-com-dores-cronicas-e-mobilidade-reduzida",
    category: "Ortopedia",
    coverImage:
      "/blog/artrose-de-joelho-e-a-rotina-familiar-como-lidar-com-dores-cronicas-e-mobilidade-reduzida.jpg",
  },
  {
    fileName: "blog_proteses-ombro.md",
    slug: "quando-sao-indicadas-as-proteses-de-ombro",
    category: "Ortopedia",
    coverImage: "/blog/quando-sao-indicadas-as-proteses-de-ombro.jpg",
  },
  {
    fileName: "blog_idade-implantes.md",
    slug: "existe-uma-idade-para-a-colocacao-de-implantes-ortopedicos-cirurgicos",
    category: "Ortopedia",
    coverImage:
      "/blog/existe-uma-idade-para-a-colocacao-de-implantes-ortopedicos-cirurgicos.jpg",
  },
  {
    fileName: "blog_alimentacao-ossos.md",
    slug: "o-papel-da-alimentacao-saudavel-e-do-exercicio-para-a-saude-dos-ossos",
    category: "Ortopedia",
    coverImage:
      "/blog/o-papel-da-alimentacao-saudavel-e-do-exercicio-para-a-saude-dos-ossos.jpg",
  },
  {
    fileName: "blog_osteoporose.md",
    slug: "osteoporose-prevencao-tratamento-e-o-papel-das-proteses-ortopedicas-cirurgicas",
    category: "Ortopedia",
    coverImage:
      "/blog/osteoporose-prevencao-tratamento-e-o-papel-das-proteses-ortopedicas-cirurgicas.jpg",
  },
  {
    fileName: "blog_por-que-proteses-ombro.md",
    slug: "por-que-as-proteses-cirurgicas-de-ombro-sao-indicadas",
    category: "Ortopedia",
    coverImage:
      "/blog/por-que-as-proteses-cirurgicas-de-ombro-sao-indicadas.jpg",
  },
  {
    fileName: "blog_espondilite-anquilosante.md",
    slug: "voce-ja-ouviu-falar-em-espondilite-anquilosante",
    category: "Coluna",
    coverImage: "/blog/voce-ja-ouviu-falar-em-espondilite-anquilosante.jpg",
  },
  {
    fileName: "blog_dor-no-quadril.md",
    slug: "como-se-livrar-da-dor-no-quadril-sintomas-e-tratamentos",
    category: "Ortopedia",
    coverImage:
      "/blog/como-se-livrar-da-dor-no-quadril-sintomas-e-tratamentos.jpg",
  },
  {
    fileName: "blog_fratura-femur.md",
    slug: "entenda-a-fratura-do-femur-e-como-preveni-la",
    category: "Ortopedia",
    coverImage: "/blog/entenda-a-fratura-do-femur-e-como-preveni-la.jpg",
  },
  {
    fileName: "blog_distribuidores-mercado.md",
    slug: "distribuidores-investem-na-qualidade-das-proteses-cirurgicas-ortopedicas-e-ganham-mercado",
    category: "Ortopedia",
    coverImage:
      "/blog/distribuidores-investem-na-qualidade-das-proteses-cirurgicas-ortopedicas-e-ganham-mercado.jpg",
  },
  {
    fileName: "blog_cuidados-cirurgia-quadril.md",
    slug: "cuidados-apos-a-cirurgia-de-substituicao-do-quadril",
    category: "Ortopedia",
    coverImage:
      "/blog/cuidados-apos-a-cirurgia-de-substituicao-do-quadril.jpg",
  },
  {
    fileName: "blog_estresse-lesoes-atletas.md",
    slug: "estresse-e-lesoes-osseas-em-atletas",
    category: "Medicina Esportiva",
    coverImage: "/blog/estresse-e-lesoes-osseas-em-atletas.jpg",
  },
  {
    fileName: "blog_cotovelo-tenista.md",
    slug: "voce-sabe-o-que-e-o-cotovelo-de-tenista",
    category: "Medicina Esportiva",
    coverImage: "/blog/voce-sabe-o-que-e-o-cotovelo-de-tenista.jpg",
  },
  {
    fileName: "blog_reavaliar-protese.md",
    slug: "quando-e-hora-de-reavaliar-a-sua-protese",
    category: "Ortopedia",
    coverImage: "/blog/quando-e-hora-de-reavaliar-a-sua-protese.jpg",
  },
  {
    fileName: "blog_preciso-protese.md",
    slug: "preciso-de-uma-protese-cirurgica-e-agora",
    category: "Ortopedia",
    coverImage: "/blog/preciso-de-uma-protese-cirurgica-e-agora.jpg",
  },
  {
    fileName: "blog_joelho-depois-protese.md",
    slug: "como-fica-o-meu-joelho-depois-da-protese",
    category: "Ortopedia",
    coverImage: "/blog/como-fica-o-meu-joelho-depois-da-protese.jpg",
  },
  {
    fileName: "blog_nanotecnologia-proteses.md",
    slug: "proteses-cirurgicas-com-nanotecnologia-evitam-rejeicao-e-duram-cada-vez-mais",
    category: "Ortopedia",
    coverImage:
      "/blog/proteses-cirurgicas-com-nanotecnologia-evitam-rejeicao-e-duram-cada-vez-mais.png",
  },
  {
    fileName: "blog_ortopedia-esportiva.md",
    slug: "avanco-na-ortopedia-esportiva-na-ultima-decada-garante-longevidade-a-atletas",
    category: "Medicina Esportiva",
    coverImage:
      "/blog/avanco-na-ortopedia-esportiva-na-ultima-decada-garante-longevidade-a-atletas.jpg",
  },
  {
    fileName: "blog_implantes-qualidade-vida.md",
    slug: "implantes-e-proteses-como-garantir-a-qualidade-de-vida-e-conforto-do-paciente-lesionado",
    category: "Ortopedia",
    coverImage:
      "/blog/implantes-e-proteses-como-garantir-a-qualidade-de-vida-e-conforto-do-paciente-lesionado.jpg",
  },
] as const;

export const blogFilterOptions = [
  "Todos",
  "Coluna",
  "Medicina Esportiva",
  "Ortopedia",
] as const;

export type BlogFilter = (typeof blogFilterOptions)[number];

const oldDirectory = path.join(process.cwd(), "old");

const monthMap: Record<string, number> = {
  janeiro: 0,
  fevereiro: 1,
  março: 2,
  marco: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11,
};

function cleanText(text: string) {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\[\.\.\.\]/g, "")
    .replace(/\[\u2026\]/g, "")
    .replace(/\\\[/g, "[")
    .replace(/\\\]/g, "]")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(text: string, limit: number) {
  if (text.length <= limit) {
    return text;
  }

  const shortened = text.slice(0, limit).trim();
  const lastSpaceIndex = shortened.lastIndexOf(" ");

  return `${shortened.slice(0, lastSpaceIndex > 0 ? lastSpaceIndex : limit)}…`;
}

function parseBrazilianDate(dateLabel: string) {
  const match = dateLabel.match(/(\d{1,2}) de ([a-zçã]+) de (\d{4})/i);

  if (!match) {
    return "";
  }

  const [, day, monthName, year] = match;
  const monthIndex = monthMap[monthName.toLowerCase()] ?? 0;

  return new Date(Number(year), monthIndex, Number(day)).toISOString();
}

function isSummaryCandidate(line: string) {
  const trimmed = line.trim();

  return (
    Boolean(trimmed) &&
    !trimmed.startsWith("!") &&
    !trimmed.startsWith("#") &&
    !/^\*\*.*\*\*$/.test(trimmed)
  );
}

function shouldStopParsing(line: string) {
  return (
    /^### Add Comment/i.test(line) ||
    /^#### Posts recentes/i.test(line) ||
    /^## SOBRE/i.test(line) ||
    /^#### Comentários/i.test(line) ||
    /^#### Arquivos/i.test(line) ||
    /^#### Categorias/i.test(line) ||
    /^#### Meta/i.test(line) ||
    /^Atendimento à imprensa/i.test(line) ||
    /^\*\*Atendimento à imprensa/i.test(line) ||
    /^\*\*Sobre a Ortoart\*\*$/i.test(line)
  );
}

function buildContentBlocks(lines: string[], summary: string): BlogPostBlock[] {
  const blocks: BlogPostBlock[] = [];
  let paragraphBuffer: string[] = [];
  let summarySkipped = false;

  const flushParagraph = () => {
    const text = cleanText(paragraphBuffer.join(" "));

    if (text) {
      blocks.push({ type: "paragraph", text });
    }

    paragraphBuffer = [];
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    if (
      shouldStopParsing(trimmed) ||
      trimmed.startsWith("- [") ||
      trimmed.startsWith("|")
    ) {
      flushParagraph();
      break;
    }

    if (trimmed.startsWith("![")) {
      continue;
    }

    const cleaned = cleanText(trimmed);

    if (!cleaned) {
      continue;
    }

    if (!summarySkipped && summary && cleaned === summary) {
      summarySkipped = true;
      continue;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      flushParagraph();
      const heading = cleanText(trimmed.replace(/^#{1,6}\s+/, ""));

      if (heading && !shouldStopParsing(heading)) {
        blocks.push({ type: "heading", text: heading });
      }

      continue;
    }

    if (/^\*\*.*\*\*$/.test(trimmed)) {
      flushParagraph();
      const heading = cleanText(trimmed);

      if (heading && !shouldStopParsing(heading)) {
        blocks.push({ type: "heading", text: heading });
      }

      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();

  return blocks;
}

function parseLegacyBlogPost(source: LegacyBlogSource): BlogPost {
  const raw = fs.readFileSync(path.join(oldDirectory, source.fileName), "utf8");
  const lines = raw.split(/\r?\n/).map((line) => line.replace(/\u00a0/g, " "));
  const titleIndex = lines.findIndex((line) => line.startsWith("# "));
  const dateIndex = lines.findIndex((line) =>
    /^\d{1,2} de [a-zçã]+ de \d{4}/i.test(line.trim())
  );

  if (titleIndex === -1 || dateIndex === -1) {
    throw new Error(`Não foi possível analisar o artigo legado ${source.fileName}.`);
  }

  const title = cleanText(lines[titleIndex].replace(/^# /, ""));
  const dateLabel = cleanText(
    lines[dateIndex].match(/^(\d{1,2} de [a-zçã]+ de \d{4})/i)?.[1] ?? ""
  );
  const preDateSummary = lines
    .slice(titleIndex + 1, dateIndex)
    .find((line) => isSummaryCandidate(line));
  const postDateSummary = lines
    .slice(dateIndex + 1)
    .find((line) => isSummaryCandidate(line));
  const summary = cleanText(preDateSummary ?? postDateSummary ?? "");
  const blocks = buildContentBlocks(lines.slice(dateIndex + 1), summary);
  const firstParagraph =
    blocks.find((block) => block.type === "paragraph")?.text ?? summary;
  const excerpt = truncateText(summary || firstParagraph, 180);
  const wordCount = blocks.reduce(
    (count, block) => count + block.text.split(/\s+/).filter(Boolean).length,
    0
  );

  return {
    slug: source.slug,
    title,
    category: source.category,
    coverImage: source.coverImage,
    coverAlt: title,
    summary,
    excerpt,
    dateLabel,
    dateISO: parseBrazilianDate(dateLabel),
    readingTime: Math.max(1, Math.ceil(wordCount / 220)),
    blocks,
  };
}

export const getAllBlogPosts = cache(() => {
  return legacyBlogSources
    .map(parseLegacyBlogPost)
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO));
});

export const getBlogPostBySlug = cache((slug: string) => {
  return getAllBlogPosts().find((post) => post.slug === slug);
});

export const getRelatedBlogPosts = cache((slug: string, limit = 3) => {
  const currentPost = getBlogPostBySlug(slug);

  if (!currentPost) {
    return [];
  }

  return getAllBlogPosts()
    .filter(
      (post) =>
        post.slug !== currentPost.slug && post.category === currentPost.category
    )
    .slice(0, limit);
});

import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

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
  contentHtml: string;
};

export const blogFilterOptions = [
  "Todos",
  "Coluna",
  "Medicina Esportiva",
  "Ortopedia",
] as const;

export type BlogFilter = (typeof blogFilterOptions)[number];

type RawPost = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  content: string;
  published: boolean;
};

const months = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

function htmlToBlocks(html: string): BlogPostBlock[] {
  const blocks: BlogPostBlock[] = [];
  if (!html) return blocks;

  const parts = html.split(/(<\/?(?:h[1-6]|p)[^>]*>)/gi);
  let currentTag = "";
  let currentText = "";

  for (const part of parts) {
    const tagMatch = part.match(/^<\/?(h[1-6]|p)[^>]*>$/i);
    if (tagMatch) {
      if (tagMatch[1].startsWith("h")) {
        currentTag = "heading";
      } else if (tagMatch[1] === "p") {
        currentTag = "paragraph";
      }
      continue;
    }

    if (part === "" || part === "</" + currentTag + ">") {
      if (currentText.trim()) {
        const cleanText = currentText
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .trim();
        if (cleanText) {
          blocks.push({ type: currentTag as "heading" | "paragraph", text: cleanText });
        }
        currentText = "";
      }
      if (part.startsWith("</")) currentTag = "";
      continue;
    }

    currentText += part;
  }

  if (currentText.trim()) {
    const cleanText = currentText
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (cleanText) {
      blocks.push({ type: "paragraph", text: cleanText });
    }
  }

  return blocks;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRawPostToBlogPost(data: Record<string, any>, contentHtml: string): BlogPost {
  const dateObj = data.date ? new Date(data.date) : new Date();
  const dateLabel = `${dateObj.getDate()} de ${months[dateObj.getMonth()]} de ${dateObj.getFullYear()}`;

  const blocks = htmlToBlocks(contentHtml);
  const firstParagraph = blocks.find((b) => b.type === "paragraph")?.text ?? (data.summary as string) ?? "";
  const excerpt = firstParagraph.length > 180
    ? firstParagraph.slice(0, 177) + "…"
    : firstParagraph;
  const wordCount = blocks.reduce(
    (count, block) => count + block.text.split(/\s+/).filter(Boolean).length,
    0
  );

  return {
    slug: (data.slug as string) ?? "",
    title: (data.title as string) ?? "",
    category: (data.category as BlogCategory) ?? "Ortopedia",
    coverImage: (data.coverImage as string) ?? "/blog/default.jpg",
    coverAlt: (data.coverAlt as string) ?? (data.title as string) ?? "",
    summary: (data.summary as string) ?? "",
    excerpt,
    dateLabel,
    dateISO: dateObj.toISOString(),
    readingTime: Math.max(1, Math.ceil(wordCount / 220)),
    blocks,
    contentHtml,
  };
}

function readRawPosts(): RawPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    return {
      data,
      content,
      published: data.published !== false,
    };
  });
}

export function getAllBlogPosts(): BlogPost[] {
  return readRawPosts()
    .filter((p) => p.published)
    .map((p) => mapRawPostToBlogPost(p.data, marked(p.content) as string))
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const post = readRawPosts().find(
    (p) => p.published && (p.data.slug as string) === slug
  );
  if (!post) return undefined;
  return mapRawPostToBlogPost(post.data, marked(post.content) as string);
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(slug);
  if (!currentPost) return [];

  return getAllBlogPosts()
    .filter((p) => p.slug !== slug && p.category === currentPost.category)
    .slice(0, limit);
}

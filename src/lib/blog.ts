import "server-only";

import { cache } from "react";
import { getDb } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

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

function htmlToBlocks(html: string): BlogPostBlock[] {
  const blocks: BlogPostBlock[] = [];
  if (!html) return blocks;

  // Simple regex-based HTML parsing for headings and paragraphs
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

  // Flush remaining
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

function mapDbPostToBlogPost(post: typeof blogPosts.$inferSelect): BlogPost {
  const dateObj = new Date(post.createdAt);
  const months = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ];
  const dateLabel = `${dateObj.getDate()} de ${months[dateObj.getMonth()]} de ${dateObj.getFullYear()}`;

  const blocks = htmlToBlocks(post.contentHtml);
  const firstParagraph = blocks.find((b) => b.type === "paragraph")?.text ?? post.summary;
  const excerpt = firstParagraph.length > 180
    ? firstParagraph.slice(0, 177) + "…"
    : firstParagraph;
  const wordCount = blocks.reduce((count, block) => count + block.text.split(/\s+/).filter(Boolean).length, 0);

  return {
    slug: post.slug,
    title: post.title,
    category: post.category as BlogCategory,
    coverImage: post.coverImage ?? "/blog/default.jpg",
    coverAlt: post.coverAlt ?? post.title,
    summary: post.summary,
    excerpt,
    dateLabel,
    dateISO: post.createdAt.toISOString(),
    readingTime: Math.max(1, Math.ceil(wordCount / 220)),
    blocks,
    contentHtml: post.contentHtml,
  };
}

export const getAllBlogPosts = cache((): BlogPost[] => {
  const db = getDb();
  const posts = db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.createdAt))
    .all();

  return posts.map(mapDbPostToBlogPost);
});

export const getAllBlogPostsAdmin = cache((): BlogPost[] => {
  const db = getDb();
  const posts = db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt))
    .all();

  return posts.map(mapDbPostToBlogPost);
});

export const getBlogPostBySlug = cache((slug: string): BlogPost | undefined => {
  const db = getDb();
  const post = db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1)
    .get();

  if (!post || !post.published) return undefined;
  return mapDbPostToBlogPost(post);
});

export const getBlogPostBySlugAdmin = cache((slug: string): BlogPost | undefined => {
  const db = getDb();
  const post = db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1)
    .get();

  if (!post) return undefined;
  return mapDbPostToBlogPost(post);
});

export const getRelatedBlogPosts = cache((slug: string, limit = 3): BlogPost[] => {
  const currentPost = getBlogPostBySlug(slug);
  if (!currentPost) return [];

  const db = getDb();
  const posts = db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.published, true), eq(blogPosts.category, currentPost.category)))
    .orderBy(desc(blogPosts.createdAt))
    .all();

  return posts
    .filter((p) => p.slug !== slug)
    .slice(0, limit)
    .map(mapDbPostToBlogPost);
});

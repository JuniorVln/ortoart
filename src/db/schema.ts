import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ── Usuários (autenticação CMS) ──────────────────────────────────────
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// ── Posts do Blog ─────────────────────────────────────────────────────
export const blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(), // "Coluna" | "Medicina Esportiva" | "Ortopedia"
  coverImage: text("cover_image"),       // caminho da imagem de capa
  coverAlt: text("cover_alt"),           // alt da imagem de capa
  summary: text("summary").notNull(),    // resumo curto para cards
  contentHtml: text("content_html").notNull(), // HTML do TipTap
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// ── Conteúdo de Páginas Institucionais ────────────────────────────────
// Cada "seção" de uma página é uma linha independente
export const pageSections = sqliteTable("page_sections", {
  id: text("id").primaryKey(),
  pageSlug: text("page_slug").notNull(),  // "quem-somos", "coluna", "medicina-esportiva", "parceiros", "contato", "home"
  sectionKey: text("section_key").notNull(), // "hero", "history", "mission", "products", etc.
  title: text("title"),                    // título da seção (opcional)
  contentHtml: text("content_html"),       // conteúdo rich text
  imageData: text("image_data"),           // JSON com caminhos de imagens da seção
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// ── Mídia / Uploads ──────────────────────────────────────────────────
export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  path: text("path").notNull().unique(),  // caminho relativo em public/uploads/
  uploadedAt: integer("uploaded_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

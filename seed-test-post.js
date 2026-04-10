const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");

const dbPath = path.resolve(__dirname, "ortoart.db");
const db = new Database(dbPath);

// Check existing posts
const existing = db.prepare("SELECT COUNT(*) as count FROM blog_posts").get();
console.log(`Existing posts: ${existing.count}`);

// Insert a test published post
const now = Math.floor(Date.now() / 1000);
const id = crypto.randomUUID();

try {
  db.prepare(`
    INSERT INTO blog_posts (id, slug, title, category, cover_image, cover_alt, summary, content_html, published, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
  `).run(
    id,
    "primeiro-post-do-novo-cms",
    "Primeiro post do novo CMS da OrtoArt",
    "Coluna",
    null,
    "Primeiro post publicado via CMS",
    "Este é o primeiro post publicado no novo sistema de gerenciamento de conteúdo da OrtoArt. O CMS permite criar, editar e publicar artigos diretamente pelo painel administrativo.",
    "<h2>Bem-vindo ao novo CMS</h2><p>Este post foi criado para testar o funcionamento do novo sistema de blog da OrtoArt.</p><p>O novo CMS permite:</p><ul><li>Criar e editar posts com editor rich-text</li><li>Gerenciar imagens de capa</li><li>Publicar ou salvar como rascunho</li><li>Organizar por categorias</li></ul>",
    now,
    now
  );
  console.log("Test post created successfully!");
} catch (err) {
  console.log("Post already exists or error:", err.message);
}

db.close();

import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq, like } from "drizzle-orm";
import crypto from "crypto";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const db = getDb();

  if (id) {
    const post = db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1)
      .get();
    if (!post) {
      return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
    }
    return NextResponse.json(post);
  }

  // List all
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  let posts: typeof blogPosts.$inferSelect[];

  if (category) {
    posts = db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.category, category))
      .orderBy(desc(blogPosts.createdAt))
      .all();
    return NextResponse.json(posts);
  }

  if (q) {
    posts = db
      .select()
      .from(blogPosts)
      .where(like(blogPosts.title, `%${q}%`))
      .orderBy(desc(blogPosts.createdAt))
      .all();
    return NextResponse.json(posts);
  }

  posts = db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt))
    .all();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();

    const id = crypto.randomUUID();
    const now = new Date();

    await db.insert(blogPosts).values({
      id,
      slug: body.slug,
      title: body.title,
      category: body.category,
      summary: body.summary,
      coverImage: body.coverImage,
      coverAlt: body.coverAlt,
      contentHtml: body.contentHtml,
      published: body.published ?? false,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ id, message: "Post criado com sucesso" }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao criar post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID do post é obrigatório" }, { status: 400 });
    }

    const body = await request.json();
    const db = getDb();

    await db
      .update(blogPosts)
      .set({
        slug: body.slug,
        title: body.title,
        category: body.category,
        summary: body.summary,
        coverImage: body.coverImage,
        coverAlt: body.coverAlt,
        contentHtml: body.contentHtml,
        published: body.published,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id));

    return NextResponse.json({ message: "Post atualizado com sucesso" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao atualizar post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID do post é obrigatório" }, { status: 400 });
    }

    const db = getDb();
    await db.delete(blogPosts).where(eq(blogPosts.id, id));

    return NextResponse.json({ message: "Post excluído com sucesso" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao excluir post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

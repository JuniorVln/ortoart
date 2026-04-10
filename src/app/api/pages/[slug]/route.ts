import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { pageSections } from "@/db/schema";
import { eq, asc, and } from "drizzle-orm";
import crypto from "crypto";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = getDb();

    const sections = db
      .select()
      .from(pageSections)
      .where(eq(pageSections.pageSlug, slug))
      .orderBy(asc(pageSections.sortOrder))
      .all();

    return NextResponse.json(sections);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao carregar página";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const db = getDb();

    if (!body.sections || !Array.isArray(body.sections)) {
      return NextResponse.json({ error: "Seções são obrigatórias" }, { status: 400 });
    }

    const now = new Date();

    for (const section of body.sections) {
      const existing = db
        .select()
        .from(pageSections)
        .where(and(eq(pageSections.pageSlug, slug), eq(pageSections.sectionKey, section.sectionKey)))
        .limit(1)
        .get();

      if (existing) {
        db
          .update(pageSections)
          .set({
            title: section.title,
            contentHtml: section.contentHtml,
            imageData: section.imageData,
            sortOrder: section.sortOrder,
            updatedAt: now,
          })
          .where(eq(pageSections.id, existing.id))
          .run();
      } else {
        db.insert(pageSections).values({
          id: crypto.randomUUID(),
          pageSlug: slug,
          sectionKey: section.sectionKey,
          title: section.title,
          contentHtml: section.contentHtml,
          imageData: section.imageData,
          sortOrder: section.sortOrder ?? 0,
          updatedAt: now,
        }).run();
      }
    }

    return NextResponse.json({ message: "Página atualizada com sucesso" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao atualizar página";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

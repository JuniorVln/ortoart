import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { getDb } from "@/db";
import { media } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Arquivo é obrigatório" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${crypto.randomUUID()}.${ext}`;
    const uploadDir = path.resolve(process.env.UPLOAD_DIR ?? "public/uploads");

    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {
      // Directory may already exist
    }

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Save to database
    const id = crypto.randomUUID();
    const dbPath = `/uploads/${filename}`;
    const db = getDb();

    await db.insert(media).values({
      id,
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      path: dbPath,
    });

    return NextResponse.json(
      { id, path: dbPath, filename: file.name },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro no upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

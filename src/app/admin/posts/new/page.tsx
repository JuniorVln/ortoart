"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import TipTapEditor from "@/components/admin/TipTapEditor";

const CATEGORIES = ["Coluna", "Medicina Esportiva", "Ortopedia"];

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverAlt, setCoverAlt] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
    if (!slug) {
      setSlug(
        value
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  }, [slug]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Erro no upload");
      const data = await res.json();
      setCoverImage(data.path);
    } catch {
      setError("Erro ao fazer upload da imagem.");
    } finally {
      setUploading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          category,
          summary,
          coverImage: coverImage || null,
          coverAlt: coverAlt || null,
          contentHtml,
          published,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao criar post");
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Novo Post</h1>
          <p className="mt-1 text-sm text-gray-500">Crie um novo artigo para o blog</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title + Slug */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#4B8AB0] focus:outline-none focus:ring-1 focus:ring-[#4B8AB0]"
              placeholder="Título do artigo"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#4B8AB0] focus:outline-none focus:ring-1 focus:ring-[#4B8AB0]"
              placeholder="titulo-do-artigo"
            />
          </div>
        </div>

        {/* Category + Summary */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#4B8AB0] focus:outline-none focus:ring-1 focus:ring-[#4B8AB0]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Resumo</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#4B8AB0] focus:outline-none focus:ring-1 focus:ring-[#4B8AB0]"
              placeholder="Breve resumo do artigo (aparece nos cards)"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">Imagem de Capa</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50">
              {uploading ? "Enviando..." : "Upload"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            {coverImage && (
              <span className="text-sm text-gray-600">
                ✅ {coverImage}
              </span>
            )}
          </div>
          {coverImage && (
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-gray-500">Alt da imagem</label>
              <input
                type="text"
                value={coverAlt}
                onChange={(e) => setCoverAlt(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#4B8AB0] focus:outline-none focus:ring-1 focus:ring-[#4B8AB0]"
                placeholder="Descrição da imagem para acessibilidade"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Conteúdo</label>
          <TipTapEditor content={contentHtml} onChange={setContentHtml} />
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
              published ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
                published ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-gray-700">
            {published ? "Publicar imediatamente" : "Salvar como rascunho"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#0D1F3C] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a3a6e] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Criar Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

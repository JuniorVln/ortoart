"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TipTapEditor from "@/components/admin/TipTapEditor";

const CATEGORIES = ["Coluna", "Medicina Esportiva", "Ortopedia"];

interface PostData {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  coverImage: string | null;
  coverAlt: string | null;
  contentHtml: string;
  published: boolean;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [post, setPost] = useState<PostData | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverAlt, setCoverAlt] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Load post
  useEffect(() => {
    fetch(`/api/posts?id=${postId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post não encontrado");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setSlug(data.slug);
        setCategory(data.category);
        setSummary(data.summary);
        setCoverImage(data.coverImage);
        setCoverAlt(data.coverAlt || "");
        setContentHtml(data.contentHtml);
        setPublished(data.published);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar o post");
        setLoading(false);
      });
  }, [postId]);

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

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/posts?id=${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          category,
          summary,
          coverImage,
          coverAlt,
          contentHtml,
          published,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar");
      }

      setSuccess("Post salvo com sucesso!");
      router.refresh();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/posts?id=${postId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      router.push("/admin/posts");
      router.refresh();
    } catch {
      setError("Erro ao excluir o post");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="py-16 text-center text-sm text-gray-500">Carregando...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Post</h1>
          <p className="mt-1 text-sm text-gray-500">{title}</p>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          {deleting ? "Excluindo..." : "Excluir"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {success && (
        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#4B8AB0] focus:outline-none focus:ring-1 focus:ring-[#4B8AB0]"
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
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#4B8AB0] focus:outline-none focus:ring-1 focus:ring-[#4B8AB0]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
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
            />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">Imagem de Capa</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50">
              {uploading ? "Enviando..." : "Trocar imagem"}
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
            </label>
            {coverImage && <span className="text-sm text-gray-600">✅ {coverImage}</span>}
          </div>
          {coverImage && (
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-gray-500">Alt da imagem</label>
              <input
                type="text"
                value={coverAlt}
                onChange={(e) => setCoverAlt(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#4B8AB0] focus:outline-none focus:ring-1 focus:ring-[#4B8AB0]"
              />
            </div>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Conteúdo</label>
          <TipTapEditor content={contentHtml} onChange={setContentHtml} />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${published ? "bg-green-600" : "bg-gray-300"}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${published ? "translate-x-5" : "translate-x-0"}`} />
          </button>
          <span className="text-sm font-medium text-gray-700">
            {published ? "Publicado" : "Rascunho"}
          </span>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#0D1F3C] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a3a6e] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}

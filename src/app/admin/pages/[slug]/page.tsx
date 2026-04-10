"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import TipTapEditor from "@/components/admin/TipTapEditor";

interface SectionData {
  id: string;
  sectionKey: string;
  title: string | null;
  contentHtml: string | null;
  imageData: string | null;
  sortOrder: number;
}

const PAGE_SECTIONS_CONFIG: Record<string, { key: string; label: string; hasContent: boolean; hasTitle: boolean; hasImage: boolean }[]> = {
  "home": [
    { key: "hero", label: "Hero Principal", hasContent: true, hasTitle: true, hasImage: true },
    { key: "value-props", label: "Proposta de Valor", hasContent: true, hasTitle: false, hasImage: false },
    { key: "areas", label: "Áreas de Atuação", hasContent: true, hasTitle: true, hasImage: false },
    { key: "about-teaser", label: "Teaser Sobre", hasContent: true, hasTitle: true, hasImage: true },
    { key: "cta-final", label: "CTA Final", hasContent: true, hasTitle: true, hasImage: false },
  ],
  "quem-somos": [
    { key: "headline", label: "Headline", hasContent: false, hasTitle: true, hasImage: false },
    { key: "history", label: "História (CEO)", hasContent: true, hasTitle: true, hasImage: true },
    { key: "mission", label: "Missão, Visão e Valores", hasContent: true, hasTitle: false, hasImage: false },
    { key: "team", label: "Nosso Time", hasContent: true, hasTitle: true, hasImage: true },
  ],
  "coluna": [
    { key: "hero", label: "Hero da Área", hasContent: true, hasTitle: true, hasImage: true },
    { key: "intro", label: "Introdução", hasContent: true, hasTitle: false, hasImage: false },
    { key: "products", label: "Produtos e Soluções", hasContent: true, hasTitle: true, hasImage: false },
    { key: "differential", label: "Diferencial (Instrumentadores)", hasContent: true, hasTitle: true, hasImage: false },
  ],
  "medicina-esportiva": [
    { key: "hero", label: "Hero da Área", hasContent: true, hasTitle: true, hasImage: true },
    { key: "intro", label: "Introdução", hasContent: true, hasTitle: false, hasImage: false },
    { key: "products", label: "Produtos e Soluções", hasContent: true, hasTitle: true, hasImage: false },
  ],
  "parceiros": [
    { key: "headline", label: "Headline", hasContent: false, hasTitle: true, hasImage: false },
    { key: "positioning", label: "Texto de Posicionamento", hasContent: true, hasTitle: false, hasImage: false },
  ],
  "contato": [
    { key: "headline", label: "Headline", hasContent: false, hasTitle: true, hasImage: false },
    { key: "info", label: "Informações de Contato", hasContent: true, hasTitle: false, hasImage: false },
  ],
};

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const pageSlug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  const config = PAGE_SECTIONS_CONFIG[pageSlug] ?? [];

  // Load sections
  useEffect(() => {
    fetch(`/api/pages/${pageSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar página");
        return res.json();
      })
      .then((data) => {
        setSections(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar as seções");
        setLoading(false);
      });
  }, [pageSlug]);

  const handleFileUpload = useCallback(async (sectionKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [sectionKey]: true }));
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Erro no upload");
      const data = await res.json();

      setSections((prev) =>
        prev.map((s) =>
          s.sectionKey === sectionKey
            ? { ...s, imageData: JSON.stringify({ cover: data.path }) }
            : s
        )
      );
    } catch {
      setError("Erro ao fazer upload da imagem.");
    } finally {
      setUploading((prev) => ({ ...prev, [sectionKey]: false }));
    }
  }, []);

  const updateSection = useCallback((sectionKey: string, updates: Partial<SectionData>) => {
    setSections((prev) =>
      prev.map((s) => (s.sectionKey === sectionKey ? { ...s, ...updates } : s))
    );
  }, []);

  const handleSaveAll = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/pages/${pageSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar");
      }

      setSuccess("Conteúdo salvo com sucesso!");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-16 text-center text-sm text-gray-500">Carregando...</div>;
  }

  const pageName = pageSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar: {pageName}</h1>
          <p className="mt-1 text-sm text-gray-500">Edite as seções desta página</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="rounded-lg bg-[#0D1F3C] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a3a6e] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar Tudo"}
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>}

      <div className="space-y-8">
        {config.map((sectionCfg) => {
          const section = sections.find((s) => s.sectionKey === sectionCfg.key);
          if (!section) return null;

          const imageData = section.imageData ? JSON.parse(section.imageData) : {};

          return (
            <div key={sectionCfg.key} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-base font-semibold text-gray-900">{sectionCfg.label}</h3>

              <div className="space-y-4">
                {sectionCfg.hasTitle && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Título</label>
                    <input
                      type="text"
                      value={section.title || ""}
                      onChange={(e) => updateSection(sectionCfg.key, { title: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#4B8AB0] focus:outline-none focus:ring-1 focus:ring-[#4B8AB0]"
                    />
                  </div>
                )}

                {sectionCfg.hasImage && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Imagem</label>
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50">
                        {uploading[sectionCfg.key] ? "Enviando..." : imageData?.cover ? "Trocar" : "Upload"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(sectionCfg.key, e)}
                          className="hidden"
                          disabled={uploading[sectionCfg.key]}
                        />
                      </label>
                      {imageData?.cover && (
                        <span className="text-sm text-gray-600">✅ {imageData.cover}</span>
                      )}
                    </div>
                  </div>
                )}

                {sectionCfg.hasContent && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Conteúdo</label>
                    <TipTapEditor
                      content={section.contentHtml || ""}
                      onChange={(html) => updateSection(sectionCfg.key, { contentHtml: html })}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

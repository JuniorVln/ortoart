import { getDb } from "@/db";
import { media } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function MediaPage() {
  const db = getDb();
  const files = await db.select().from(media).orderBy(desc(media.uploadedAt));

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  function formatBytes(bytes: number) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / k ** i).toFixed(1)} ${sizes[i]}`;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mídia</h1>
        <p className="mt-1 text-sm text-gray-500">
          {files.length} arquivo{files.length !== 1 ? "s" : ""} · {formatBytes(totalSize)} total
        </p>
      </div>

      {files.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white py-16 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <p className="mt-3 text-sm text-gray-500">Nenhuma imagem enviada ainda</p>
          <p className="mt-1 text-xs text-gray-400">
            Faça upload de imagens ao criar posts ou editar páginas
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              {file.mimeType.startsWith("image/") ? (
                <div className="relative h-40 w-full bg-gray-100">
                  <img
                    src={file.path}
                    alt={file.originalName}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center bg-gray-100">
                  <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
              )}
              <div className="p-3">
                <p className="truncate text-sm font-medium text-gray-900" title={file.originalName}>
                  {file.originalName}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {formatBytes(file.size)} · {new Date(file.uploadedAt).toLocaleDateString("pt-BR")}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin + file.path);
                    }}
                    className="rounded px-2 py-1 text-xs font-medium text-[#4B8AB0] hover:bg-[#87CEEB]/20"
                  >
                    Copiar URL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

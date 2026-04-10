import { getDb } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq, like } from "drizzle-orm";
import Link from "next/link";

const CATEGORIES = ["Coluna", "Medicina Esportiva", "Ortopedia"];

export default async function PostsListPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const db = getDb();
  const category = searchParams.category;
  const q = searchParams.q;

  let posts: typeof blogPosts.$inferSelect[];

  if (q) {
    posts = await db
      .select()
      .from(blogPosts)
      .where(like(blogPosts.title, `%${q}%`))
      .orderBy(desc(blogPosts.createdAt));
  } else if (category && CATEGORIES.includes(category)) {
    posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.category, category))
      .orderBy(desc(blogPosts.createdAt));
  } else {
    posts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts do Blog</h1>
          <p className="mt-1 text-sm text-gray-500">
            {posts.length} {posts.length === 1 ? "post encontrado" : "posts encontrados"}
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-[#0D1F3C] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a3a6e]"
        >
          + Novo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <form className="flex items-center gap-2">
          <input
            type="text"
            name="q"
            placeholder="Buscar por título..."
            defaultValue={q}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#4B8AB0] focus:outline-none focus:ring-1 focus:ring-[#4B8AB0]"
          />
          <button
            type="submit"
            className="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Buscar
          </button>
        </form>
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={category === cat ? "/admin/posts" : `/admin/posts?category=${cat}`}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${category === cat
                  ? "bg-[#0D1F3C] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white py-16 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <p className="mt-3 text-sm text-gray-500">Nenhum post criado ainda</p>
          <Link
            href="/admin/posts/new"
            className="mt-3 inline-flex text-sm font-medium text-[#4B8AB0] hover:underline"
          >
            Criar primeiro post →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{post.title}</p>
                    <p className="text-xs text-gray-500">{post.slug}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-[#87CEEB]/20 px-2.5 py-0.5 text-xs font-medium text-[#0D1F3C]">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${post.published
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {post.published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="text-sm font-medium text-[#4B8AB0] hover:text-[#0D1F3C]"
                      >
                        Editar
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

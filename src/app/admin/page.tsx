import { getDb } from "@/db";
import { blogPosts, pageSections } from "@/db/schema";
import Link from "next/link";
import { count, eq } from "drizzle-orm";

export default async function AdminDashboard() {
  const db = getDb();

  const totalPosts = await db.select({ count: count() }).from(blogPosts);
  const publishedPosts = await db
    .select({ count: count() })
    .from(blogPosts)
    .where(eq(blogPosts.published, true));
  const totalSections = await db.select({ count: count() }).from(pageSections);

  const stats = [
    {
      label: "Total de Posts",
      value: totalPosts[0].count,
      href: "/admin/posts",
      color: "bg-[#0D1F3C]",
    },
    {
      label: "Posts Publicados",
      value: publishedPosts[0].count,
      href: "/admin/posts",
      color: "bg-green-600",
    },
    {
      label: "Seções de Páginas",
      value: totalSections[0].count,
      href: "/admin/pages",
      color: "bg-[#4B8AB0]",
    },
  ];

  const quickActions = [
    { label: "Novo Post", href: "/admin/posts/new", icon: "plus" },
    { label: "Editar Páginas", href: "/admin/pages", icon: "pencil" },
    { label: "Gerenciar Mídia", href: "/admin/media", icon: "image" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Bem-vindo ao painel administrativo da OrtoArt
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                <span className="text-lg font-bold text-white">{stat.value}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Ações Rápidas</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-[#0D1F3C]"
            >
              {action.icon === "plus" && (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )}
              {action.icon === "pencil" && (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              )}
              {action.icon === "image" && (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              )}
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

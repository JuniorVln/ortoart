import { getDb } from "@/db";
import { pageSections } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import Link from "next/link";

const PAGES = [
  { slug: "home", name: "Home", icon: "🏠" },
  { slug: "quem-somos", name: "Quem Somos", icon: "👥" },
  { slug: "coluna", name: "Coluna", icon: "🦴" },
  { slug: "medicina-esportiva", name: "Medicina Esportiva", icon: "🏃" },
  { slug: "parceiros", name: "Parceiros", icon: "🤝" },
  { slug: "contato", name: "Contato", icon: "📞" },
];

export default async function PagesListPage() {
  const db = getDb();

  const pages = await Promise.all(
    PAGES.map(async (page) => {
      const sections = await db
        .select()
        .from(pageSections)
        .where(eq(pageSections.pageSlug, page.slug))
        .orderBy(asc(pageSections.sortOrder));
      return { ...page, sections };
    })
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Páginas do Site</h1>
        <p className="mt-1 text-sm text-gray-500">
          Edite o conteúdo de cada página do site
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/pages/${page.slug}`}
            className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl">{page.icon}</span>
                <h3 className="mt-2 text-base font-semibold text-gray-900 group-hover:text-[#0D1F3C]">
                  {page.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {page.sections.length} {page.sections.length === 1 ? "seção" : "seções"}
                </p>
              </div>
              <svg className="h-5 w-5 text-gray-400 group-hover:text-[#0D1F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            {page.sections.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {page.sections.slice(0, 3).map((s) => (
                  <span
                    key={s.sectionKey}
                    className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600"
                  >
                    {s.sectionKey}
                  </span>
                ))}
                {page.sections.length > 3 && (
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                    +{page.sections.length - 3}
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

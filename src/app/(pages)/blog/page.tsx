import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdo e conhecimento sobre coluna vertebral, medicina esportiva e ortopedia. Blog OrtoArt.",
};

export default function BlogPage() {
  return (
    <>
      {/* TODO: Headline */}
      {/* TODO: Filtros por categoria */}
      {/* TODO: Grade de artigos */}
      <div className="min-h-screen flex items-center justify-center text-[#0D1F3C]">
        <p className="text-lg font-semibold">Blog — em construção</p>
      </div>
    </>
  );
}

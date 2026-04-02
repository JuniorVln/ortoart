"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { useScrollReveal } from "@/components/sections/useScrollReveal";

type BlogCategory = "Coluna" | "Medicina Esportiva" | "Ortopedia";
type BlogFilter = "Todos" | BlogCategory;

type BlogListItem = {
  slug: string;
  title: string;
  category: BlogCategory;
  coverImage: string;
  coverAlt: string;
  excerpt: string;
  dateLabel: string;
  readingTime: number;
};

const filterOptions: readonly BlogFilter[] = [
  "Todos",
  "Coluna",
  "Medicina Esportiva",
  "Ortopedia",
];

const categoryStyles: Record<BlogCategory, string> = {
  Coluna: "bg-[#dff2fb] text-[#0D1F3C]",
  "Medicina Esportiva": "bg-[#e5f6ef] text-[#115c3d]",
  Ortopedia: "bg-[#edf2ff] text-[#243b7f]",
};

export default function BlogPageSections({ posts }: { posts: BlogListItem[] }) {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState<BlogFilter>("Todos");

  const filteredPosts =
    activeFilter === "Todos"
      ? posts
      : posts.filter((post) => post.category === activeFilter);
  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <>
      <section className="relative overflow-hidden bg-[#080f1e] pb-20 pt-28 text-white sm:pb-24 sm:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 14% 0%, rgba(135,206,235,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 60% at 100% 35%, rgba(75,138,176,0.16) 0%, transparent 55%), linear-gradient(180deg, rgba(8,15,30,0.96) 0%, rgba(8,15,30,0.99) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.16) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="hero-fade-up inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB] backdrop-blur-sm">
              Conteúdo e conhecimento
            </span>
            <h1 className="hero-fade-up mt-7 text-[clamp(2.5rem,5vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white">
              Blog OrtoArt
            </h1>
            <p className="hero-fade-up mt-6 max-w-[58ch] text-base leading-8 text-white/60 sm:text-lg">
              Um acervo com artigos sobre ortopedia, coluna e medicina
              esportiva para ampliar repertório, orientar decisões e reforçar a
              autoridade técnica da OrtoArt.
            </p>
          </div>

          <div className="hero-fade-up mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { label: "artigos", value: String(posts.length) },
              { label: "publicações do acervo", value: "2022" },
              { label: "frentes editoriais", value: "3" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] px-6 py-6 backdrop-blur-sm"
              >
                <p className="text-[2rem] font-bold tracking-[-0.04em] text-white">
                  {item.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/52">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fb] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            data-reveal
            className="oa-reveal flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                Filtros por categoria
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0D1F3C] sm:text-4xl">
                Explore os artigos por tema.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    activeFilter === filter
                      ? "bg-[#0D1F3C] text-white"
                      : "border border-[#0D1F3C]/10 bg-white text-[#0D1F3C]/68 hover:bg-[#0D1F3C]/[0.04]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {featuredPost ? (
            <div
              data-reveal
              className="oa-reveal mt-12 overflow-hidden rounded-[2rem] border border-[#0D1F3C]/10 bg-white shadow-[0_24px_70px_rgba(13,31,60,0.08)]"
            >
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[320px]">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.coverAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${categoryStyles[featuredPost.category]}`}
                    >
                      {featuredPost.category}
                    </span>
                    <h3 className="mt-5 text-[clamp(1.8rem,3vw,2.65rem)] font-bold leading-[1.08] tracking-tight text-[#0D1F3C]">
                      {featuredPost.title}
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-[#0D1F3C]/46">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="size-4 text-[#4B8AB0]" />
                        {featuredPost.dateLabel}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock3 className="size-4 text-[#4B8AB0]" />
                        {featuredPost.readingTime} min de leitura
                      </span>
                    </div>
                    <p className="mt-6 max-w-[48ch] text-base leading-8 text-[#0D1F3C]/60">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0D1F3C]"
                  >
                    Ler artigo completo
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {gridPosts.map((post, index) => (
              <article
                key={post.slug}
                data-reveal
                className="oa-reveal overflow-hidden rounded-[1.75rem] border border-[#0D1F3C]/10 bg-white shadow-[0_20px_56px_rgba(13,31,60,0.06)]"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-[230px]">
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt}
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${categoryStyles[post.category]}`}
                  >
                    {post.category}
                  </span>
                  <h3 className="mt-4 text-xl font-bold leading-[1.16] tracking-tight text-[#0D1F3C]">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#0D1F3C]/46">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="size-4 text-[#4B8AB0]" />
                      {post.dateLabel}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="size-4 text-[#4B8AB0]" />
                      {post.readingTime} min
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#0D1F3C]/58">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0D1F3C]"
                  >
                    Ler mais
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div
            data-reveal
            className="oa-reveal mt-16 rounded-[2rem] bg-[#0D1F3C] px-8 py-10 text-white shadow-[0_28px_70px_rgba(13,31,60,0.16)] sm:px-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
                  Precisa de orientação?
                </span>
                <h3 className="mt-4 max-w-[24ch] text-3xl font-bold tracking-tight sm:text-4xl">
                  A OrtoArt pode ajudar no seu próximo procedimento.
                </h3>
                <p className="mt-4 max-w-[54ch] text-base leading-7 text-white/58">
                  Use o conteúdo para aprofundar o repertório e fale com nossa
                  equipe quando precisar transformar informação em suporte
                  prático de sala.
                </p>
              </div>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#87CEEB] px-7 py-3.5 text-sm font-semibold text-[#0D1F3C] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a8ddf2]"
              >
                Falar com a OrtoArt
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

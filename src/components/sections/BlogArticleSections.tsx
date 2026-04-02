import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
} from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { whatsappUrl } from "@/lib/contact";

const categoryStyles: Record<BlogPost["category"], string> = {
  Coluna: "bg-[#dff2fb] text-[#0D1F3C]",
  "Medicina Esportiva": "bg-[#e5f6ef] text-[#115c3d]",
  Ortopedia: "bg-[#edf2ff] text-[#243b7f]",
};

export default function BlogArticleSections({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  return (
    <>
      <section className="bg-[#f4f7fb] pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0D1F3C]/68 transition-colors hover:text-[#0D1F3C]"
          >
            <ArrowLeft className="size-4" />
            Voltar ao blog
          </Link>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#0D1F3C]/10 bg-white shadow-[0_28px_80px_rgba(13,31,60,0.08)]">
            <div className="relative h-[300px] sm:h-[420px] lg:h-[540px]">
              <Image
                src={post.coverImage}
                alt={post.coverAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${categoryStyles[post.category]}`}
              >
                {post.category}
              </span>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-[#0D1F3C]/46">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4 text-[#4B8AB0]" />
                  {post.dateLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="size-4 text-[#4B8AB0]" />
                  {post.readingTime} min de leitura
                </span>
              </div>
              <h1 className="mt-5 max-w-[22ch] text-[clamp(2rem,4vw,3.8rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#0D1F3C]">
                {post.title}
              </h1>
              <p className="mt-6 max-w-[60ch] text-lg leading-8 text-[#0D1F3C]/60">
                {post.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="space-y-8">
              {post.blocks.map((block, index) =>
                block.type === "heading" ? (
                  <h2
                    key={`${block.text}-${index}`}
                    className="text-2xl font-bold tracking-tight text-[#0D1F3C] sm:text-[2rem]"
                  >
                    {block.text}
                  </h2>
                ) : (
                  <p
                    key={`${block.text.slice(0, 48)}-${index}`}
                    className="text-base leading-8 text-[#0D1F3C]/70"
                  >
                    {block.text}
                  </p>
                )
              )}
            </div>

            <div className="mt-16 overflow-hidden rounded-[2rem] bg-[#0D1F3C] px-8 py-10 text-white shadow-[0_28px_70px_rgba(13,31,60,0.16)]">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
                Próximo passo
              </span>
              <h2 className="mt-4 max-w-[22ch] text-3xl font-bold tracking-tight sm:text-4xl">
                Gostou do conteúdo? A OrtoArt pode ajudar no seu próximo
                procedimento.
              </h2>
              <p className="mt-4 max-w-[52ch] text-base leading-7 text-white/58">
                Se você quer aprofundar uma aplicação clínica, entender
                disponibilidade de material ou alinhar suporte em sala, nossa
                equipe está pronta para conversar.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#87CEEB] px-7 py-3.5 text-sm font-semibold text-[#0D1F3C] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a8ddf2]"
                >
                  Chamar no WhatsApp
                  <ArrowUpRight className="size-4" />
                </a>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                >
                  Entre em contato
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[1.75rem] border border-[#0D1F3C]/10 bg-[#f8fafc] p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                Sobre este artigo
              </span>
              <ul className="mt-5 space-y-4 text-sm text-[#0D1F3C]/60">
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#0D1F3C]/38">
                    Categoria
                  </span>
                  <span className="mt-1 block">{post.category}</span>
                </li>
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#0D1F3C]/38">
                    Publicação
                  </span>
                  <span className="mt-1 block">{post.dateLabel}</span>
                </li>
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#0D1F3C]/38">
                    Leitura estimada
                  </span>
                  <span className="mt-1 block">{post.readingTime} min</span>
                </li>
              </ul>
            </div>

            {relatedPosts.length ? (
              <div className="rounded-[1.75rem] border border-[#0D1F3C]/10 bg-white p-6 shadow-[0_18px_48px_rgba(13,31,60,0.06)]">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                  Artigos relacionados
                </span>
                <div className="mt-6 space-y-5">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group flex gap-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1rem]">
                        <Image
                          src={relatedPost.coverImage}
                          alt={relatedPost.coverAlt}
                          fill
                          sizes="80px"
                          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${categoryStyles[relatedPost.category]}`}
                        >
                          {relatedPost.category}
                        </span>
                        <p className="mt-2 text-sm font-semibold leading-6 text-[#0D1F3C]">
                          {relatedPost.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
}

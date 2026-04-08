"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Globe2,
  MapPin,
  Phone,
} from "lucide-react";
import { whatsappUrl } from "@/lib/contact";
import { partnerRecords } from "@/lib/partners";
import { useScrollReveal } from "@/components/sections/useScrollReveal";

const positioningPoints = [
  {
    title: "Tecnologia global, operação local",
    description:
      "A OrtoArt conecta fabricantes reconhecidos internacionalmente ao dia a dia dos cirurgiões e hospitais de Curitiba e região.",
  },
  {
    title: "Curadoria de portfólio",
    description:
      "Cada marca entra no nosso ecossistema para resolver demandas reais de coluna e medicina esportiva com segurança e consistência.",
  },
  {
    title: "Suporte que acompanha a cirurgia",
    description:
      "Além do produto, entregamos disponibilidade, organização e presença em sala para tornar o procedimento mais fluido.",
  },
];

const stats = [
  { value: "6", label: "fabricantes estratégicos no portfólio atual" },
  { value: "+15", label: "anos conectando tecnologia e centro cirúrgico" },
  { value: "2", label: "frentes principais: coluna e medicina esportiva" },
];

export default function PartnersPageSections() {
  useScrollReveal();

  return (
    <>
      <section className="relative overflow-hidden bg-[#080f1e] pb-20 pt-28 text-white sm:pb-24 sm:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 15% 0%, rgba(135,206,235,0.18) 0%, transparent 58%), radial-gradient(ellipse 55% 60% at 100% 35%, rgba(75,138,176,0.16) 0%, transparent 55%), linear-gradient(180deg, rgba(8,15,30,0.96) 0%, rgba(8,15,30,0.98) 100%)",
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
              Parceiros e fabricantes
            </span>
            <h1 className="hero-fade-up mt-7 max-w-[24ch] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.028em] text-white">
              Representamos o que há de mais moderno no mundo.
            </h1>
            <p className="hero-fade-up mt-6 max-w-[58ch] text-base leading-8 text-white/60 sm:text-lg">
              A OrtoArt aproxima o cirurgião brasileiro de fabricantes
              reconhecidos globalmente, transformando tecnologia de ponta em
              disponibilidade real, suporte técnico e resposta ágil no centro
              cirúrgico.
            </p>
          </div>

          <div className="hero-fade-up mt-12 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] px-6 py-6 backdrop-blur-sm"
              >
                <p className="text-[2rem] font-bold tracking-[-0.04em] text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/52">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fb] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div data-reveal className="oa-reveal">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                Posicionamento
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0D1F3C] sm:text-4xl">
                O elo entre a inovação global e a cirurgia feita com precisão no
                Brasil.
              </h2>
            </div>

            <div
              data-reveal
              className="oa-reveal"
              style={{ transitionDelay: "90ms" }}
            >
              <p className="text-base leading-8 text-[#0D1F3C]/60">
                Mais do que distribuir marcas, a OrtoArt estrutura um ecossistema
                de suporte para que médicos, hospitais e equipes tenham acesso a
                soluções confiáveis, atualização constante e apoio técnico em cada
                etapa do procedimento. Hoje, a representação exclusiva da
                Orthofix reforça esse papel de curadoria e credibilidade.
              </p>
            </div>
          </div>

          <div
            data-reveal
            className="oa-reveal mt-10 grid gap-4 lg:grid-cols-3 lg:col-start-2"
            style={{ transitionDelay: "150ms" }}
          >
            {positioningPoints.map((point, index) => (
              <div
                key={point.title}
                className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-6 shadow-[0_14px_32px_rgba(13,31,60,0.05)]"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <p className="text-sm font-semibold text-[#0D1F3C]">
                  {point.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#0D1F3C]/56">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            data-reveal
            className="oa-reveal flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                Grade de parceiros
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0D1F3C] sm:text-4xl">
                Fabricantes que elevam o padrão do nosso portfólio.
              </h2>
              <p className="mt-4 max-w-[60ch] text-base leading-8 text-[#0D1F3C]/60">
                A mesma base de parceiros que sustenta o trabalho da OrtoArt na
                Home aparece aqui em detalhe, com acesso rápido aos sites
                oficiais e uma leitura objetiva de cada especialidade.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#0D1F3C]/10 bg-[#f4f7fb] px-4 py-2 text-sm font-medium text-[#0D1F3C]/60">
              <Globe2 className="size-4 text-[#4B8AB0]" />
              Links oficiais em nova aba
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {partnerRecords.map((partner, index) => (
              <article
                key={partner.slug}
                data-reveal
                className="oa-reveal flex h-full flex-col rounded-[2rem] border border-[#0D1F3C]/10 bg-[#f8fafc] p-5 shadow-[0_20px_50px_rgba(13,31,60,0.06)]"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="relative flex h-[148px] items-center justify-center overflow-hidden rounded-[1.6rem] border border-[#0D1F3C]/8 bg-white px-6">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-20"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(135,206,235,0.18) 0%, rgba(135,206,235,0) 100%)",
                    }}
                  />
                  <Image
                    src={partner.logoSrc}
                    alt={`Logo ${partner.name}`}
                    width={220}
                    height={72}
                    className="relative h-auto max-h-16 w-auto max-w-full object-contain"
                  />
                </div>

                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B8AB0]">
                      {partner.eyebrow}
                    </span>
                    <h3 className="mt-2 text-[1.8rem] font-bold leading-[1.08] tracking-tight text-[#0D1F3C]">
                      {partner.name}
                    </h3>
                  </div>
                  {partner.exclusive ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#0D1F3C] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#87CEEB]">
                      <BadgeCheck className="size-3.5" />
                      Exclusivo
                    </span>
                  ) : null}
                </div>

                <p className="mt-4 text-sm leading-7 text-[#0D1F3C]/60">
                  {partner.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {partner.focusAreas.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#0D1F3C]/68 ring-1 ring-inset ring-[#0D1F3C]/8"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#0D1F3C]/8 pt-5">
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0D1F3C] transition-colors duration-200 hover:text-[#1a3a6e]"
                  >
                    Visitar site
                    <ArrowUpRight className="size-4" />
                  </a>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0D1F3C]/36">
                    Site oficial
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fb] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            data-reveal
            className="oa-reveal relative overflow-hidden rounded-3xl bg-[#0D1F3C] px-8 py-14 text-white shadow-[0_32px_80px_rgba(13,31,60,0.2)] sm:px-12 sm:py-16"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 55% 65% at 0% 0%, rgba(135,206,235,0.18) 0%, transparent 55%), radial-gradient(ellipse 45% 55% at 100% 100%, rgba(75,138,176,0.14) 0%, transparent 50%)",
              }}
            />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
                  Próximo passo
                </span>
                <h2 className="mt-4 max-w-[24ch] text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                  Dúvidas sobre os produtos disponíveis? Fale com a gente.
                </h2>
                <p className="mt-5 max-w-[54ch] text-base leading-7 text-white/58">
                  Se você quer entender disponibilidade, fabricante indicado ou
                  suporte para um caso específico, nossa equipe responde com
                  agilidade e orientação objetiva.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#87CEEB] px-7 py-3.5 text-sm font-semibold text-[#0D1F3C] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a8ddf2] hover:shadow-[0_8px_28px_rgba(135,206,235,0.32)]"
                  >
                    Falar no WhatsApp
                    <ArrowUpRight className="size-4" />
                  </a>
                  <Link
                    href="/contato"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                  >
                    Enviar mensagem
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm lg:min-w-[235px]">
                <ul className="space-y-5 text-sm text-white/68">
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-[#87CEEB]" />
                    <span>(41) 3151-5454</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-[#87CEEB]" />
                    <span>
                      Av. Winston Churchill 1824, sala 208
                      <br />
                      Pinheirinho, Curitiba — PR
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

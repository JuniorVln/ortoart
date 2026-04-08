"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Cpu,
  Crosshair,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useScrollReveal } from "@/components/sections/useScrollReveal";

const companyStats = [
  {
    value: "+15",
    unit: "anos",
    label: "de atuação no mercado ortopédico",
  },
  {
    value: "30",
    unit: "circ./dia",
    label: "em média em Curitiba e região",
  },
  {
    value: "2",
    unit: "frentes",
    label: "de especialidade: coluna e medicina esportiva",
  },
  {
    value: "100%",
    unit: "local",
    label: "operação própria com suporte próximo",
  },
];

const timeline = [
  {
    label: "Origem",
    title: "Curitiba como ponto de partida",
    description:
      "A OrtoArt nasce próxima aos hospitais e centros cirúrgicos, com foco em disponibilidade e resposta rápida.",
  },
  {
    label: "Especialização",
    title: "Atuação orientada por procedimento",
    description:
      "A operação se estrutura em torno de coluna e medicina esportiva, unindo portfólio, técnica e rotina cirúrgica.",
  },
  {
    label: "Parcerias",
    title: "Marcas globais, presença local",
    description:
      "A empresa consolida relações com fabricantes de referência para ampliar o acesso a soluções de alta performance.",
  },
  {
    label: "Hoje",
    title: "Suporte próximo em escala regional",
    description:
      "Mais de quinze anos de mercado, média de 30 cirurgias por dia e uma equipe preparada para acompanhar cada etapa.",
  },
];

const principles = [
  {
    icon: Crosshair,
    eyebrow: "Missão",
    title: "Entregar precisão com suporte próximo.",
    description:
      "Conectar cirurgiões a materiais cirúrgicos de alta performance com organização, disponibilidade e apoio técnico em sala.",
  },
  {
    icon: Cpu,
    eyebrow: "Visão",
    title: "Ser a referência regional em parceria técnica.",
    description:
      "Ser lembrada por unir tecnologia, agilidade operacional e relacionamento confiável em cada procedimento.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Valores",
    title: "A base que sustenta a operação.",
    points: [
      "Precisão clínica",
      "Proximidade no atendimento",
      "Responsabilidade com cada detalhe",
      "Disponibilidade quando a cirurgia exige resposta",
    ],
  },
];

const teamRoles = [
  {
    icon: Users,
    title: "Instrumentação cirúrgica",
    description:
      "Profissionais preparados para acompanhar procedimentos e dar fluidez ao centro cirúrgico.",
  },
  {
    icon: Crosshair,
    title: "Suporte técnico",
    description:
      "Orientação próxima sobre portfólio, aplicação e disponibilidade para cada necessidade clínica.",
  },
  {
    icon: Cpu,
    title: "Portfólio especializado",
    description:
      "Soluções organizadas para coluna e medicina esportiva, com foco em performance e segurança.",
  },
  {
    icon: Building2,
    title: "Operação e relacionamento",
    description:
      "Uma estrutura local para responder rápido, alinhar agendas e sustentar relações de longo prazo.",
  },
];

export default function AboutPageSections() {
  useScrollReveal();

  return (
    <>
      <section className="relative overflow-hidden bg-[#08111f] text-white">
        <Image
          src="/Images/Hero%20background.png"
          alt=""
          fill
          priority
          className="pointer-events-none object-cover object-center opacity-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(112deg, rgba(8,17,31,0.96) 0%, rgba(8,17,31,0.82) 48%, rgba(8,17,31,0.55) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 18% 0%, rgba(135,206,235,0.15) 0%, transparent 65%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
            <div data-reveal className="oa-reveal">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB] backdrop-blur-sm">
                Quem Somos
              </span>
              <h1 className="mt-7 max-w-[24ch] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.028em]">
                Mais de 15 anos levando precisão e cuidado aos cirurgiões.
              </h1>
              <p className="mt-6 max-w-[60ch] text-base leading-8 text-white/62 sm:text-lg">
                De Curitiba para a rotina de hospitais e centros cirúrgicos, a
                OrtoArt cresceu conectando tecnologia, disponibilidade e suporte
                próximo em cada procedimento.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/coluna"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#87CEEB] px-7 text-sm font-semibold text-[#08111f] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a8ddf2] hover:shadow-[0_8px_28px_rgba(135,206,235,0.3)]"
                >
                  Conheça nossos produtos
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-7 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                >
                  Entre em contato
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>

            <div
              data-reveal
              className="oa-reveal rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm"
              style={{ transitionDelay: "90ms" }}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
                    OrtoArt
                  </span>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    Tecnologia, suporte técnico e operação próxima.
                  </p>
                </div>
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/90">
                  <Image
                    src="/logo-ortoart-completo.png"
                    alt="Logo OrtoArt"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Curitiba como base de operação",
                  "Foco em coluna e medicina esportiva",
                  "Instrumentadores qualificados em sala",
                  "Relação próxima com médicos e hospitais",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-[#0D1F3C]/55 px-4 py-4 text-sm leading-6 text-white/72"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            data-reveal
            className="oa-reveal mt-16 grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 lg:p-6"
            style={{ transitionDelay: "140ms" }}
          >
            {companyStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-white/8 bg-[#09111f]/68 px-5 py-5"
              >
                <p className="text-[2rem] font-bold tracking-[-0.04em] text-white">
                  {stat.value}
                  <span className="ml-1.5 text-base font-medium text-[#87CEEB]">
                    {stat.unit}
                  </span>
                </p>
                <p className="mt-2 text-sm leading-6 text-white/48">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fb] py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch lg:gap-20 lg:px-8">
          <div
            data-reveal
            className="oa-reveal relative flex h-full flex-col overflow-hidden rounded-[2.4rem] bg-[#0D1F3C] p-2 shadow-[0_24px_70px_rgba(13,31,60,0.18)]"
          >
            <div className="relative min-h-[440px] grow overflow-hidden rounded-[1.9rem] lg:min-h-0">
              <Image
                src="/Images/Quem somos.png"
                alt="Equipe e suporte cirúrgico da OrtoArt"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13,31,60,0.08) 0%, rgba(13,31,60,0.3) 100%)",
                }}
              />
            </div>
            <div className="absolute inset-x-7 bottom-7 rounded-[1.6rem] border border-white/10 bg-[#08111f]/78 px-5 py-5 text-white backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
                Nossa trajetória
              </span>
              <p className="mt-3 text-sm leading-7 text-white/72">
                Uma operação construída no detalhe para responder quando a
                cirurgia não pode esperar.
              </p>
            </div>
          </div>

          <div data-reveal className="oa-reveal" style={{ transitionDelay: "80ms" }}>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
              História da empresa
            </span>
            <h2 className="mt-4 max-w-[22ch] text-3xl font-bold tracking-tight text-[#0D1F3C] sm:text-4xl lg:text-[2.9rem] lg:leading-[1.08]">
              Uma empresa feita para estar próxima da realidade cirúrgica.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-[#0D1F3C]/62">
              <p>
                A OrtoArt nasceu em Curitiba e construiu sua reputação apoiando
                médicos, hospitais e equipes com uma combinação clara:
                disponibilidade, tecnologia e acompanhamento próximo.
              </p>
              <p>
                Ao longo dessa trajetória, a empresa consolidou sua atuação em
                coluna e medicina esportiva, estruturando um portfólio
                especializado, operação própria e suporte técnico capaz de dar
                mais confiança ao procedimento.
              </p>
              <p>
                Mais do que intermediar materiais cirúrgicos, a OrtoArt organiza
                a jornada ao redor da cirurgia para que cada detalhe responda à
                precisão que o cirurgião precisa alcançar.
              </p>
            </div>

            <div className="mt-8 rounded-[1.8rem] border border-[#0D1F3C]/10 bg-white px-6 py-6 shadow-[0_12px_36px_rgba(13,31,60,0.06)]">
              <p className="text-lg font-semibold tracking-tight text-[#0D1F3C]">
                &ldquo;Não entregamos apenas material. Entramos na rotina
                cirúrgica para oferecer segurança, clareza e resposta quando
                cada minuto importa.&rdquo;
              </p>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-[#4B8AB0]">
                Posicionamento OrtoArt
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            data-reveal
            className="oa-reveal flex max-w-3xl items-start gap-4"
          >
            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#4B8AB0]" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                Marcos da empresa
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D1F3C] sm:text-4xl">
                Uma trajetória construída por presença, especialização e
                consistência.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {timeline.map((item, index) => (
              <div
                key={item.title}
                data-reveal
                className="oa-reveal relative overflow-hidden rounded-[2rem] border border-[#0D1F3C]/10 bg-[#f4f7fb] px-6 py-7"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-1 bg-[#87CEEB]"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                  {item.label}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#0D1F3C]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#0D1F3C]/58">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf1f8] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            data-reveal
            className="oa-reveal flex max-w-3xl items-start gap-4"
          >
            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0D1F3C]" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                Missão, visão e valores
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D1F3C] sm:text-4xl">
                O que orienta a OrtoArt no detalhe de cada decisão.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {principles.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.eyebrow}
                  data-reveal
                  className="oa-reveal rounded-[2rem] bg-white p-7 shadow-[0_16px_44px_rgba(13,31,60,0.08)]"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0D1F3C]">
                    <Icon className="size-5 text-[#87CEEB]" />
                  </div>
                  <span className="mt-6 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                    {item.eyebrow}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#0D1F3C]">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-4 text-sm leading-7 text-[#0D1F3C]/58">
                      {item.description}
                    </p>
                  ) : null}
                  {item.points ? (
                    <ul className="mt-5 space-y-3">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="rounded-full bg-[#f4f7fb] px-4 py-2 text-sm font-medium text-[#0D1F3C]/72"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div data-reveal className="oa-reveal">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                Nosso time
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0D1F3C] sm:text-4xl">
                Uma estrutura próxima da cirurgia e preparada para responder.
              </h2>
              <p className="mt-6 max-w-[54ch] text-base leading-8 text-[#0D1F3C]/60">
                Enquanto as fotos e perfis individuais entram na próxima etapa,
                a página já traduz a lógica da equipe: instrumentação,
                relacionamento técnico, operação própria e suporte consultivo
                atuando em conjunto.
              </p>

              <div className="mt-8 rounded-[2rem] bg-[#0D1F3C] p-7 text-white shadow-[0_20px_60px_rgba(13,31,60,0.16)]">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
                  Estrutura OrtoArt
                </span>
                <p className="mt-4 text-[2.7rem] font-bold leading-none tracking-[-0.05em]">
                  1 operação
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  alinhada do agendamento ao suporte em sala.
                </p>
                <p className="mt-5 text-sm leading-7 text-white/58">
                  O objetivo é simples: reduzir atrito operacional e manter o
                  cirurgião focado no procedimento.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {teamRoles.map((role, index) => {
                const Icon = role.icon;

                return (
                  <div
                    key={role.title}
                    data-reveal
                    className="oa-reveal rounded-[2rem] border border-[#0D1F3C]/10 bg-[#f4f7fb] p-6"
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                      <Icon className="size-5 text-[#0D1F3C]" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#0D1F3C]">
                      {role.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#0D1F3C]/58">
                      {role.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fb] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            data-reveal
            className="oa-reveal relative overflow-hidden rounded-[2.6rem] bg-[#0D1F3C] px-8 py-14 text-white shadow-[0_30px_80px_rgba(13,31,60,0.2)] sm:px-12 sm:py-16"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 45% 60% at 0% 0%, rgba(135,206,235,0.18) 0%, transparent 60%), radial-gradient(ellipse 40% 55% at 100% 100%, rgba(75,138,176,0.18) 0%, transparent 50%)",
              }}
            />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
                  Próximo passo
                </span>
                <h2 className="mt-4 max-w-[22ch] text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.8rem] lg:leading-[1.08]">
                  Conheça as especialidades em que a OrtoArt atua de forma mais
                  próxima.
                </h2>
                <p className="mt-5 max-w-[54ch] text-base leading-7 text-white/58">
                  A mesma lógica de precisão, presença em sala e suporte técnico
                  aparece nas áreas de coluna e medicina esportiva.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/coluna"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#87CEEB] px-7 text-sm font-semibold text-[#0D1F3C] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a8ddf2]"
                >
                  Conheça nossos produtos
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-7 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                >
                  Entre em contato
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

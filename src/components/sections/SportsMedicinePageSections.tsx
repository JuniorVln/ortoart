"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  HeartPulse,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useScrollReveal } from "@/components/sections/useScrollReveal";

const sportsStats = [
  {
    value: "+15",
    unit: "anos",
    label: "de atuação ao lado de cirurgiões e hospitais",
  },
  {
    value: "3",
    unit: "frentes",
    label: "principais: joelho, ombro e tornozelo",
  },
  {
    value: "100%",
    unit: "suporte",
    label: "local para rotina cirúrgica em Curitiba e região",
  },
];

const sportsDifferentials = [
  {
    icon: Activity,
    title: "Foco em retorno ao movimento",
    description:
      "Soluções organizadas para procedimentos voltados a estabilidade, reparo e recuperação funcional.",
  },
  {
    icon: Users,
    title: "Cirurgias de pacientes ativos",
    description:
      "Uma frente preparada para atletas profissionais, amadores e pacientes que precisam voltar à rotina com segurança.",
  },
  {
    icon: ShieldCheck,
    title: "Suporte próximo em sala",
    description:
      "Instrumentadores qualificados e operação própria para reduzir atrito e dar mais confiança ao procedimento.",
  },
];

const sportsSolutions = [
  {
    category: "Joelho",
    title: "Reconstrução ligamentar e estabilidade",
    description:
      "Soluções para reparos ligamentares e estabilidade articular, com foco em fluidez técnica e retorno funcional consistente.",
    image: "/medicina-esportiva/knotless-peek-cf.jpg",
    imageClassName: "object-contain bg-white p-8",
    href: "https://www.medacta.us.com/EN/sports-med-knee",
  },
  {
    category: "Ombro",
    title: "Âncoras e reparo do manguito",
    description:
      "Linhas voltadas a reparos de partes moles e estabilização do ombro, com soluções que favorecem precisão intraoperatória.",
    image: "/medicina-esportiva/ancoras-ti-sinfix.jpg",
    imageClassName: "object-contain bg-white p-8",
    href: "https://www.medacta.us.com/EN/sports-med-shoulder",
  },
  {
    category: "Pé e tornozelo",
    title: "Fixação e reparo para tornozelo",
    description:
      "Soluções orientadas a instabilidades e lesões do tornozelo, com foco em segurança de fixação e recuperação funcional.",
    image: "/medicina-esportiva/produto-sintegra.jpg",
    imageClassName: "object-contain bg-white p-8",
    href: "https://www.medacta.us.com/EN/ankle-stabilization",
  },
  {
    category: "Artroscopia",
    title: "Acesso e instrumentação artroscópica",
    description:
      "Instrumentais para suporte ao procedimento com atenção à ergonomia, organização do fluxo e familiaridade técnica da equipe.",
    image: "/medicina-esportiva/canula-nacional.jpg",
    imageClassName: "object-contain bg-white p-8",
    href: "https://hortron.com.br/",
  },
  {
    category: "Suporte esportivo",
    title: "Portfólio para ortopedia esportiva geral",
    description:
      "Uma base de soluções para diferentes estratégias cirúrgicas em joelho, ombro e tornozelo, com apoio local na escolha do caminho técnico.",
    image: "/Images/Medicina%20esportiva.png",
    imageClassName: "object-contain bg-white p-6",
    href: "https://sintegrasurgical.com.br/",
  },
];

const supportPillars = [
  {
    icon: HeartPulse,
    title: "Preparação orientada ao caso",
    description:
      "A leitura da necessidade clínica começa antes da cirurgia, com alinhamento prévio de material, agenda e fluxo.",
  },
  {
    icon: Cpu,
    title: "Domínio do instrumental",
    description:
      "Conhecimento prático das linhas e etapas do procedimento para apoiar a equipe com mais clareza no intraoperatório.",
  },
  {
    icon: Users,
    title: "Presença técnica próxima",
    description:
      "Acompanhamento em sala e comunicação direta com a equipe para manter ritmo, previsibilidade e confiança no procedimento.",
  },
];

export default function SportsMedicinePageSections() {
  useScrollReveal();

  return (
    <>
      <section className="relative overflow-hidden bg-[#08111f] text-white">
        <Image
          src="/areas/medicina-bg.jpg"
          alt=""
          fill
          priority
          className="pointer-events-none object-cover object-center opacity-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(8,17,31,0.96) 0%, rgba(8,17,31,0.82) 44%, rgba(8,17,31,0.54) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 15% 0%, rgba(135,206,235,0.18) 0%, transparent 65%)",
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
              "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
            <div data-reveal className="oa-reveal">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB] backdrop-blur-sm">
                Especialidade · Medicina Esportiva
              </span>
              <h1 className="mt-7 max-w-[10ch] text-[clamp(2.4rem,5vw,5rem)] font-bold leading-[0.98] tracking-[-0.05em]">
                Alta performance também dentro do centro cirúrgico.
              </h1>
              <p className="mt-6 max-w-[58ch] text-base leading-8 text-white/62 sm:text-lg">
                A OrtoArt estrutura portfólio, instrumentação e suporte técnico
                para procedimentos de medicina esportiva com foco em joelho,
                ombro, tornozelo e retorno seguro ao movimento.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contato"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#87CEEB] px-7 text-sm font-semibold text-[#08111f] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a8ddf2] hover:shadow-[0_8px_28px_rgba(135,206,235,0.32)]"
                >
                  Solicitar orientação
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="tel:+554131515454"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-7 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                >
                  Falar com a equipe
                  <Phone className="size-4" />
                </a>
              </div>
            </div>

            <div
              data-reveal
              className="oa-reveal overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.06] backdrop-blur-sm"
              style={{ transitionDelay: "90ms" }}
            >
              <div className="relative min-h-[340px] overflow-hidden rounded-[1.9rem] border border-white/8 bg-[#0d1527] p-3">
                <div className="relative h-full min-h-[314px] overflow-hidden rounded-[1.5rem] bg-white">
                  <Image
                    src="/Images/Medicina%20esportiva.png"
                    alt="Produto de medicina esportiva"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-contain p-6"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(8,17,31,0.02) 0%, rgba(8,17,31,0.18) 100%)",
                    }}
                  />
                </div>
                <div className="absolute inset-x-8 bottom-8 rounded-[1.6rem] border border-white/10 bg-[#08111f]/78 px-5 py-5 text-white backdrop-blur-sm">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
                    Frente de atuação
                  </span>
                  <p className="mt-3 text-lg font-semibold tracking-tight">
                    Soluções para ortopedia esportiva com suporte técnico e
                    operação próxima.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            data-reveal
            className="oa-reveal mt-16 grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:grid-cols-3 lg:p-6"
            style={{ transitionDelay: "140ms" }}
          >
            {sportsStats.map((stat) => (
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
            <div data-reveal className="oa-reveal">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                Atuação em medicina esportiva
              </span>
              <h2 className="mt-4 max-w-[13ch] text-3xl font-bold tracking-tight text-[#0D1F3C] sm:text-4xl lg:text-[2.8rem] lg:leading-[1.08]">
                Uma operação pensada para joelho, ombro e tornozelo.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-[#0D1F3C]/62">
                <p>
                  A frente de Medicina Esportiva da OrtoArt foi estruturada para
                  apoiar cirurgiões que tratam pacientes ativos, atletas
                  amadores e profissionais com necessidade de retorno funcional
                  seguro.
                </p>
                <p>
                  O foco está em procedimentos de joelho, ombro, tornozelo e em
                  soluções para ortopedia esportiva geral, com uma lógica de
                  suporte muito próxima da realidade do centro cirúrgico.
                </p>
                <p>
                  Nesta primeira versão, a grade abaixo organiza as áreas de
                  solução e os parceiros já visíveis no acervo antigo da
                  OrtoArt, deixando o detalhamento final por linha pronto para a
                  próxima etapa com o cliente.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {sportsDifferentials.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    data-reveal
                    className="oa-reveal rounded-[2rem] bg-white p-6 shadow-[0_16px_40px_rgba(13,31,60,0.08)]"
                    style={{ transitionDelay: `${index * 70}ms` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0D1F3C]">
                      <Icon className="size-5 text-[#87CEEB]" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-[#0D1F3C]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#0D1F3C]/56">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            data-reveal
            className="oa-reveal flex max-w-4xl items-start gap-4"
          >
            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#4B8AB0]" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                Produtos e soluções
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D1F3C] sm:text-4xl">
                Uma grade inicial para organizar as frentes da ortopedia esportiva.
              </h2>
              <p className="mt-4 max-w-[64ch] text-base leading-8 text-[#0D1F3C]/60">
                Estrutura inicial baseada no planejamento e no material antigo da
                OrtoArt, com assets locais e links oficiais verificados para os
                parceiros já identificados.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {sportsSolutions.map((item, index) => (
              <article
                key={item.title}
                data-reveal
                className="oa-reveal overflow-hidden rounded-[2rem] border border-[#0D1F3C]/10 bg-[#f8fafc] shadow-[0_16px_42px_rgba(13,31,60,0.06)]"
                style={{ transitionDelay: `${index * 55}ms` }}
              >
                <div className="relative min-h-[240px] overflow-hidden bg-white">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 26vw, (min-width: 1024px) 40vw, 100vw"
                    className={item.imageClassName}
                  />
                </div>
                <div className="px-6 py-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                    {item.category}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#0D1F3C]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#0D1F3C]/58">
                    {item.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#0D1F3C]/42">
                      Referência oficial
                    </span>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0D1F3C] transition-opacity duration-200 hover:opacity-72"
                    >
                      Saiba mais
                      <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#08111f] py-24 text-white sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-center lg:px-8">
          <div data-reveal className="oa-reveal">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
              Suporte em sala
            </span>
            <h2 className="mt-4 max-w-[13ch] text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.8rem] lg:leading-[1.08]">
              A mesma proximidade técnica também acompanha os procedimentos esportivos.
            </h2>
            <p className="mt-6 max-w-[60ch] text-base leading-8 text-white/62">
              O diferencial humano da OrtoArt também aparece na medicina
              esportiva: preparação do caso, domínio do instrumental e apoio
              próximo da equipe durante todo o fluxo intraoperatório.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {supportPillars.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    data-reveal
                    className="oa-reveal rounded-[1.8rem] border border-white/10 bg-white/[0.06] px-5 py-5 backdrop-blur-sm"
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                      <Icon className="size-5 text-[#87CEEB]" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/56">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            data-reveal
            className="oa-reveal overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm"
            style={{ transitionDelay: "120ms" }}
          >
            <div className="relative min-h-[520px] overflow-hidden rounded-[1.8rem]">
              <Image
                src="/Images/Nosso%20diferencial.png"
                alt="Suporte de instrumentadores OrtoArt"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,17,31,0.08) 0%, rgba(8,17,31,0.4) 100%)",
                }}
              />
              <div className="absolute inset-x-7 bottom-7 rounded-[1.6rem] border border-white/10 bg-[#08111f]/74 px-5 py-5 text-white backdrop-blur-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
                  Diferencial humano
                </span>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Técnica, presença em sala e apoio próximo para procedimentos
                  que exigem ritmo, precisão e resposta rápida.
                </p>
              </div>
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
                  CTA orçamento
                </span>
                <h2 className="mt-4 max-w-[20ch] text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.8rem] lg:leading-[1.08]">
                  Precisa de suporte para o próximo procedimento?
                </h2>
                <p className="mt-5 max-w-[54ch] text-base leading-7 text-white/58">
                  Fale com a equipe da OrtoArt para alinhar disponibilidade,
                  portfólio e apoio técnico para a sua necessidade em medicina
                  esportiva.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/contato"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#87CEEB] px-7 text-sm font-semibold text-[#0D1F3C] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a8ddf2]"
                >
                  Solicitar orçamento
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="tel:+554131515454"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-7 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                >
                  Ligar agora
                  <Phone className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

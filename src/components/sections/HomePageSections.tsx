"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Phone, Cpu, Crosshair, Users } from "lucide-react";
import { partnerBrands } from "@/lib/partners";
import { useScrollReveal } from "@/components/sections/useScrollReveal";

const pillars = [
  {
    icon: Cpu,
    title: "Tecnologia de Ponta",
    description:
      "Portfólios cirúrgicos de alta performance com foco em segurança, inovação e confiabilidade clínica.",
  },
  {
    icon: Crosshair,
    title: "Precisão Cirúrgica",
    description:
      "Instrumentadores qualificados acompanham cada procedimento para dar fluidez ao centro cirúrgico.",
  },
  {
    icon: Users,
    title: "Relação Próxima",
    description:
      "Atendimento consultivo, agendamento próprio e suporte contínuo para médicos, hospitais e operadoras.",
  },
];

const specialties = [
  {
    href: "/coluna",
    eyebrow: "Especialidade",
    title: "Coluna",
    description:
      "Solucoes completas para cirurgia de coluna, com portfolio especializado, representacao exclusiva Orthofix e suporte tecnico em sala.",
    bullets: [
      "Fixacao posterior toracolombar",
      "TLIF e corpectomia",
      "Coluna cervical",
    ],
    bgImage: "/areas/coluna-bg.jpg",
    frameImage: "/areas/coluna-frame.jpg",
    badge: "01",
  },
  {
    href: "/medicina-esportiva",
    eyebrow: "Especialidade",
    title: "Medicina Esportiva",
    description:
      "Produtos e suporte para joelho, ombro e tornozelo, com foco em retorno seguro, performance e precisao cirurgica.",
    bullets: [
      "Joelho, ombro e tornozelo",
      "Atletas e pacientes ativos",
      "Suporte especializado em sala",
    ],
    bgImage: "/areas/medicina-bg.jpg",
    frameImage: "/Images/Medicina%20esportiva.png",
    badge: "02",
  },
];

export default function HomePageSections() {
  useScrollReveal();
  const [activeSpecialtyHref, setActiveSpecialtyHref] = useState(
    specialties[0].href
  );
  const marqueeCards = [...partnerBrands, ...partnerBrands];

  return (
    <>
      {/* ─── 1. HERO — sticky so sections slide over it ───────────── */}
      <section className="sticky top-0 z-[1] min-h-screen overflow-hidden bg-[#080f1e] text-white">
        {/* Background image */}
        <Image
          src="/Images/Hero%20background.png"
          alt=""
          fill
          priority
          className="pointer-events-none object-cover object-center opacity-30"
        />

        {/* Dark gradient scrim — keeps text legible over the photo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(8,15,30,0.92) 0%, rgba(8,15,30,0.72) 45%, rgba(8,15,30,0.38) 100%)",
          }}
        />

        {/* Atmospheric colour glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(75,138,176,0.28) 0%, transparent 60%), radial-gradient(ellipse 45% 60% at 100% 40%, rgba(135,206,235,0.08) 0%, transparent 50%)",
          }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 80%)",
          }}
        />

        <div className="relative mx-auto grid min-h-screen max-w-7xl grid-rows-[1fr_auto] px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="flex items-center">
            <div className="w-full max-w-[52rem] pb-10 sm:pb-12 lg:pb-16">
              {/* Badge */}
              <span
                className="hero-fade-up inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB] backdrop-blur-sm"
                style={{ animationDelay: "0ms" }}
              >
                Coluna&nbsp;·&nbsp;Medicina Esportiva
              </span>

              {/* Headline */}
              <h1
                className="hero-fade-up mt-7 max-w-[22ch] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.028em] text-white"
                style={{ animationDelay: "90ms" }}
              >
                Tecnologia e cuidado{" "}
                <span className="text-[#87CEEB]">onde o cirurgião</span> mais
                precisa.
              </h1>

              {/* Sub */}
              <p
                className="hero-fade-up mt-6 max-w-[52ch] text-base leading-[1.8] text-white/56 sm:text-lg"
                style={{ animationDelay: "180ms" }}
              >
                Materiais cirúrgicos de alta precisão para coluna e medicina
                esportiva. Suporte técnico, instrumentadores qualificados e
                operação própria — tudo em um só parceiro.
              </p>

              {/* CTAs */}
              <div
                className="hero-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "260ms" }}
              >
                {/* Primary CTA — circle slides right → left over text */}
                <Link
                  href="/coluna"
                  className="group relative inline-flex h-[52px] items-center overflow-hidden rounded-full bg-[#87CEEB] pl-5 pr-[52px] text-sm font-semibold text-[#080f1e] transition-colors duration-300 hover:bg-[#a8ddf2] hover:shadow-[0_8px_28px_rgba(135,206,235,0.38)]"
                >
                  <span className="relative z-[1] whitespace-nowrap transition-transform duration-[420ms] ease-in-out group-hover:translate-x-8 motion-reduce:transform-none">
                    Conheça nossos produtos
                  </span>
                  <span className="absolute left-[calc(100%-44px)] top-1/2 z-[2] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white transition-[left] duration-[420ms] ease-in-out group-hover:left-2">
                    <ArrowRight size={15} className="shrink-0 text-[#080f1e]" strokeWidth={2.5} />
                  </span>
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/contato"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-7 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                >
                  Fale com a OrtoArt
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div
            className="hero-fade-up grid grid-cols-1 divide-y divide-white/8 border-t border-white/10 pb-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:pb-10 lg:pb-12"
            style={{ animationDelay: "350ms" }}
          >
            {[
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
                value: "100%",
                unit: "local",
                label: "operação própria com suporte próximo",
              },
            ].map((stat) => (
              <div key={stat.label} className="py-8 sm:px-8 sm:first:pl-0">
                <p className="text-[2rem] font-bold tracking-[-0.03em] text-white sm:text-[2.5rem]">
                  {stat.value}
                  <span className="ml-1.5 text-base font-medium text-[#87CEEB]">
                    {stat.unit}
                  </span>
                </p>
                <p className="mt-1.5 text-sm leading-6 text-white/44">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sections 2-6 slide over the sticky hero ─────────────── */}
      <div className="relative z-[2]">

        {/* ─── 2. PILLARS ──────────────────────────────────────────── */}
        <section className="bg-[#f4f7fb] py-24 shadow-[0_-12px_40px_rgba(0,0,0,0.18)] sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Row 1: eyebrow (col 1) + statement (cols 2-4) */}
            <div className="grid items-start gap-y-8 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-0">
              <div data-reveal className="oa-reveal flex items-center gap-3 lg:pt-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#4B8AB0]" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0D1F3C]/50">
                  Nosso diferencial
                </span>
              </div>
              <p
                data-reveal
                className="oa-reveal text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.25] tracking-tight text-[#0D1F3C] lg:col-span-3"
                style={{ transitionDelay: "60ms" }}
              >
                Mais de 15 anos ao lado de cirurgiões, combinando tecnologia de
                ponta, precisão em sala e um relacionamento que vai além da
                venda.
              </p>
            </div>

            {/* Row 2: image (col 1) + divider + 3 features (cols 2-4) */}
            <div className="mt-12 grid items-start gap-y-10 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-0">

              {/* Image — col 1, spans full height of row */}
              <div
                data-reveal
                className="oa-reveal overflow-hidden rounded-2xl lg:row-span-2"
                style={{ transitionDelay: "80ms" }}
              >
                <div className="relative aspect-[3/4] w-full lg:aspect-auto lg:h-full lg:min-h-[340px]">
                  <Image
                    src="/Images/Nosso diferencial.png"
                    alt="Instrumentadores em procedimento cirúrgico"
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(8,15,30,0.04) 0%, rgba(8,15,30,0.16) 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Divider — cols 2-4 */}
              <div className="hidden lg:col-span-3 lg:block">
                <hr className="border-[#0D1F3C]/[0.1]" />
              </div>

              {/* 3 feature columns — cols 2-4 */}
              <div className="grid gap-10 sm:grid-cols-3 lg:col-span-3 lg:pt-10">
                {pillars.map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      data-reveal
                      className="oa-reveal"
                      style={{ transitionDelay: `${(i + 2) * 80}ms` }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0D1F3C]">
                        <Icon size={20} className="text-[#87CEEB]" strokeWidth={1.75} />
                      </div>
                      <h3 className="mt-5 text-[15px] font-bold text-[#0D1F3C]">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[#0D1F3C]/55">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* ─── 3. AREAS ────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-24 sm:py-28">
          {specialties.map((spec) => (
            <Image
              key={spec.href}
              src={spec.bgImage}
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
              className={`pointer-events-none object-cover object-center transition-all duration-500 ${activeSpecialtyHref === spec.href
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
                }`}
              style={{ filter: "blur(1px)" }}
            />
          ))}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#0D1F3C]/40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,16,31,0.18) 0%, rgba(7,16,31,0.36) 100%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              data-reveal
              className="oa-reveal overflow-hidden rounded-[2.6rem] border border-white/55 bg-[#f4efe6]/92 p-5 shadow-[0_26px_90px_rgba(7,16,31,0.18)] backdrop-blur-sm sm:p-7 lg:p-9"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.85fr)] lg:items-stretch">
                <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] sm:min-h-[420px] lg:min-h-[610px]">
                  {specialties.map((spec) => (
                    <Image
                      key={spec.href}
                      src={spec.frameImage}
                      alt={spec.title}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className={`object-cover object-center transition-all duration-500 ${activeSpecialtyHref === spec.href
                        ? "scale-100 opacity-100"
                        : "scale-105 opacity-0"
                        }`}
                    />
                  ))}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-3 px-2 py-2 text-[#09133c]">
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#1b74d1]" />
                    <h2 className="min-w-0 text-[clamp(1.55rem,1.85vw,2.45rem)] font-bold leading-[1.02] tracking-[-0.04em] lg:whitespace-nowrap">
                      Áreas de Atuação
                    </h2>
                  </div>

                  <div className="mt-7 space-y-4">
                    {specialties.map((spec) => {
                      const active = activeSpecialtyHref === spec.href;

                      return (
                        <div
                          key={spec.href}
                          onMouseEnter={() => setActiveSpecialtyHref(spec.href)}
                          className={`overflow-hidden rounded-[2rem] border transition-all duration-300 ${active
                            ? "border-[#d9d0c4] bg-[#e9dfd4] shadow-[0_14px_30px_rgba(9,19,60,0.08)]"
                            : "border-transparent bg-transparent hover:bg-white/20"
                            }`}
                        >
                          <button
                            type="button"
                            onFocus={() => setActiveSpecialtyHref(spec.href)}
                            onClick={() => setActiveSpecialtyHref(spec.href)}
                            className="flex w-full items-start gap-5 px-4 py-4 text-left sm:px-5 sm:py-5"
                          >
                            <span
                              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border text-sm font-semibold tracking-[0.16em] transition-colors ${active
                                ? "border-white bg-white text-[#0D1F3C]"
                                : "border-[#e2d7cb] bg-[#efe7dd] text-[#4B8AB0]"
                                }`}
                            >
                              {spec.badge}
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B8AB0]">
                                {spec.eyebrow}
                              </span>
                              <span className="mt-1 block text-[1.85rem] font-bold leading-[1.1] tracking-tight text-[#09133c]">
                                {spec.title}
                              </span>

                              <span
                                className={`grid transition-all duration-300 ${active
                                  ? "mt-4 grid-rows-[1fr] opacity-100"
                                  : "mt-0 grid-rows-[0fr] opacity-0"
                                  }`}
                              >
                                <span className="overflow-hidden">
                                  <span className="block max-w-[30ch] text-sm leading-7 text-[#0D1F3C]/64">
                                    {spec.description}
                                  </span>
                                  <span className="mt-4 flex flex-wrap gap-2">
                                    {spec.bullets.map((bullet) => (
                                      <span
                                        key={bullet}
                                        className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[#0D1F3C]/72"
                                      >
                                        {bullet}
                                      </span>
                                    ))}
                                  </span>
                                </span>
                              </span>
                            </span>
                          </button>
                          <div
                            className={`grid px-4 pb-4 transition-all duration-300 sm:px-5 sm:pb-5 ${active
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                              }`}
                          >
                            <div className="overflow-hidden">
                              <Link
                                href={spec.href}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0D1F3C]"
                              >
                                Explorar área
                                <ArrowRight className="size-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. ABOUT TEASER ─────────────────────────────────────── */}
        <section className="bg-[#f4f7fb] py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
            {/* Left — text */}
            <div data-reveal className="oa-reveal">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                Sobre a OrtoArt
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0D1F3C] sm:text-4xl">
                Mais de quinze anos conectando tecnologia, cirurgia e cuidado
                humano.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#0D1F3C]/60">
                A OrtoArt nasceu em Curitiba e construiu sua reputação com
                operação próxima, portfólio de alta tecnologia e uma equipe
                preparada para apoiar médicos, hospitais e pacientes em cada
                etapa do procedimento cirúrgico.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/quem-somos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D1F3C] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a3a6e]"
                >
                  Conheça nossa história
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0D1F3C]/12 px-7 py-3.5 text-sm font-semibold text-[#0D1F3C] transition-all duration-200 hover:bg-[#0D1F3C]/[0.04]"
                >
                  Fale com um consultor
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Right — stat cards */}
            <div
              data-reveal
              className="oa-reveal grid gap-4"
              style={{ transitionDelay: "130ms" }}
            >
              <div className="rounded-2xl bg-[#0D1F3C] p-8 text-white">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
                  OrtoArt
                </span>
                <p className="mt-4 text-[4.5rem] font-bold leading-none tracking-[-0.04em]">
                  +15
                </p>
                <p className="mt-3 text-sm leading-7 text-white/56">
                  anos de atuação no mercado ortopédico, com foco em
                  disponibilidade e cuidado.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: "Representação",
                    name: "Orthofix",
                    desc: "Portfólio de coluna e ortopedia com foco em resultados consistentes.",
                  },
                  {
                    label: "Operação",
                    name: "Agendamento Próprio",
                    desc: "Um fluxo organizado para acelerar o atendimento com as equipes.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white p-6 shadow-[0_2px_14px_rgba(13,31,60,0.06)]"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4B8AB0]">
                      {item.label}
                    </span>
                    <p className="mt-3 text-base font-semibold text-[#0D1F3C]">
                      {item.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#0D1F3C]/56">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. PARTNERS MARQUEE ─────────────────────────────────── */}
        <section className="overflow-hidden border-y border-[#0D1F3C]/[0.07] bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              data-reveal
              className="oa-reveal mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                  Nossos parceiros
                </span>
                <p className="mt-2 text-xl font-semibold text-[#0D1F3C]">
                  Distribuição exclusiva das melhores marcas do mundo.
                </p>
              </div>
              <Link
                href="/parceiros"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#0D1F3C]/12 px-5 py-2.5 text-sm font-semibold text-[#0D1F3C] transition-all duration-200 hover:bg-[#0D1F3C]/[0.04]"
              >
                Ver parceiros
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="sr-only">
            <ul>
              {partnerBrands.map((brand) => (
                <li key={brand.name}>{brand.name}</li>
              ))}
            </ul>
          </div>

          <div className="oa-marquee-wrap mt-2" aria-hidden="true">
            <div className="oa-marquee-track gap-4 py-2 pr-4">
              {marqueeCards.map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-[1.65rem] border border-[#0D1F3C]/10 bg-white h-[92px] w-[210px] px-6"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-16"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(135,206,235,0.16) 0%, rgba(135,206,235,0) 100%)",
                    }}
                  />
                  <img
                    src={`/partners/${brand.name.toLowerCase()}.png`}
                    alt={brand.name}
                    className="relative h-[48px] w-[160px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 6. CTA FINAL ────────────────────────────────────────── */}
        <section className="bg-[#f4f7fb] py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              data-reveal
              className="oa-reveal relative overflow-hidden rounded-3xl bg-[#0D1F3C] px-8 py-14 text-white shadow-[0_32px_80px_rgba(13,31,60,0.22)] sm:px-12 sm:py-16"
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
                  <h2 className="max-w-[28ch] text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                    Vamos conversar sobre o que a OrtoArt pode fazer pelo seu
                    próximo procedimento?
                  </h2>
                  <p className="mt-5 max-w-[52ch] text-base leading-7 text-white/56">
                    Fale com nossa equipe, entenda o portfólio e transforme a
                    necessidade cirúrgica em uma conversa objetiva.
                  </p>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contato"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#87CEEB] px-7 py-3.5 text-sm font-semibold text-[#0D1F3C] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a8ddf2] hover:shadow-[0_8px_28px_rgba(135,206,235,0.32)]"
                    >
                      Enviar mensagem
                      <ArrowRight className="size-4" />
                    </Link>
                    <a
                      href="tel:+554131515454"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                    >
                      Ligar agora
                      <Phone className="size-4" />
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm lg:min-w-[220px]">
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

      </div>{/* end slide-over wrapper */}
    </>
  );
}

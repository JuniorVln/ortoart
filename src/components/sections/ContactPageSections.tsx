"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { contactInfo, whatsappUrl } from "@/lib/contact";
import { useScrollReveal } from "@/components/sections/useScrollReveal";

const areaOptions = [
  { value: "Coluna", label: "Coluna" },
  { value: "Medicina Esportiva", label: "Medicina Esportiva" },
  { value: "Outro", label: "Outro" },
] as const;

const interestValues = ["Coluna", "Medicina Esportiva", "Outro"] as const;

const contactFormSchema = z.object({
  fullName: z.string().trim().min(3, "Informe seu nome completo."),
  email: z.string().trim().email("Informe um e-mail válido."),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value.replace(/\D/g, "").length >= 10,
      "Informe um telefone ou WhatsApp válido."
    ),
  interests: z
    .array(z.enum(interestValues))
    .min(1, "Selecione ao menos uma área de interesse."),
  message: z
    .string()
    .trim()
    .min(20, "Escreva uma mensagem com pelo menos 20 caracteres."),
  companyWebsite: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type SubmissionState =
  | {
      mailtoHref: string;
      contactName: string;
    }
  | null;

function buildMailtoHref(values: ContactFormValues) {
  const subject = `Contato via site OrtoArt - ${values.fullName}`;
  const body = [
    "Olá, equipe OrtoArt!",
    "",
    "Segue uma nova mensagem enviada pelo site:",
    "",
    `Nome: ${values.fullName}`,
    `E-mail: ${values.email}`,
    `Telefone / WhatsApp: ${values.phone}`,
    `Área de interesse: ${values.interests.join(", ")}`,
    "",
    "Mensagem:",
    values.message,
  ].join("\n");

  return `mailto:${contactInfo.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export default function ContactPageSections() {
  useScrollReveal();
  const [submission, setSubmission] = useState<SubmissionState>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      interests: [],
      message: "",
      companyWebsite: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    if (values.companyWebsite?.trim()) {
      reset();
      return;
    }

    const mailtoHref = buildMailtoHref(values);
    setSubmission({ mailtoHref, contactName: values.fullName });
    reset();

    if (typeof window !== "undefined") {
      window.open(mailtoHref, "_self");
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#080f1e] pb-20 pt-28 text-white sm:pb-24 sm:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 12% 0%, rgba(135,206,235,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 60% at 100% 35%, rgba(75,138,176,0.16) 0%, transparent 55%), linear-gradient(180deg, rgba(8,15,30,0.96) 0%, rgba(8,15,30,0.99) 100%)",
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
              Contato e atendimento
            </span>
            <h1 className="hero-fade-up mt-7 max-w-[12ch] text-[clamp(2.5rem,5vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white">
              Estamos prontos para atender você.
            </h1>
            <p className="hero-fade-up mt-6 max-w-[58ch] text-base leading-8 text-white/60 sm:text-lg">
              Fale com a nossa equipe e descubra como a OrtoArt pode apoiar o
              seu próximo procedimento com disponibilidade, suporte técnico e
              resposta rápida.
            </p>
          </div>

          <div className="hero-fade-up mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Phone,
                label: "Telefone",
                value: contactInfo.phoneDisplay,
              },
              {
                icon: Mail,
                label: "E-mail",
                value: contactInfo.email,
              },
              {
                icon: Clock3,
                label: "Atendimento",
                value: contactInfo.hours,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] px-6 py-6 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <Icon className="size-4 text-[#87CEEB]" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/44">
                      {item.label}
                    </span>
                  </div>
                  <p className="mt-4 text-base font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fb] py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start lg:px-8">
          <div
            data-reveal
            className="oa-reveal rounded-[2rem] border border-[#0D1F3C]/10 bg-white p-6 shadow-[0_24px_64px_rgba(13,31,60,0.08)] sm:p-8"
          >
            <div className="flex flex-col gap-3 border-b border-[#0D1F3C]/8 pb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                Formulário de contato
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#0D1F3C]">
                Conte o que você precisa e nós direcionamos o atendimento.
              </h2>
              <p className="text-sm leading-7 text-[#0D1F3C]/56">
                Médicos, hospitais, operadoras ou pacientes podem usar este
                canal para orçamento, disponibilidade de materiais ou dúvidas
                técnicas.
              </p>
            </div>

            {submission ? (
              <div className="mt-6 rounded-[1.5rem] border border-[#87CEEB]/40 bg-[#eef8fc] p-5 text-[#0D1F3C]">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D1F3C]">
                    <ShieldCheck className="size-4 text-[#87CEEB]" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">
                      Mensagem preparada para {submission.contactName}.
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#0D1F3C]/60">
                      Abrimos o seu aplicativo de e-mail com os dados do
                      formulário preenchidos. Se isso não aconteceu, use o botão
                      abaixo para abrir manualmente.
                    </p>
                    <a
                      href={submission.mailtoHref}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0D1F3C]"
                    >
                      Abrir e-mail novamente
                      <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            ) : null}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-8 space-y-6"
            >
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                {...register("companyWebsite")}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-[#0D1F3C]">
                    Nome completo
                  </span>
                  <input
                    type="text"
                    {...register("fullName")}
                    className="mt-2 w-full rounded-2xl border border-[#0D1F3C]/10 bg-[#f8fafc] px-4 py-3 text-sm text-[#0D1F3C] outline-none transition-colors focus:border-[#4B8AB0]"
                    placeholder="Seu nome"
                  />
                  {errors.fullName ? (
                    <span className="mt-2 block text-xs font-medium text-[#c2410c]">
                      {errors.fullName.message}
                    </span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#0D1F3C]">
                    E-mail
                  </span>
                  <input
                    type="email"
                    {...register("email")}
                    className="mt-2 w-full rounded-2xl border border-[#0D1F3C]/10 bg-[#f8fafc] px-4 py-3 text-sm text-[#0D1F3C] outline-none transition-colors focus:border-[#4B8AB0]"
                    placeholder="voce@empresa.com"
                  />
                  {errors.email ? (
                    <span className="mt-2 block text-xs font-medium text-[#c2410c]">
                      {errors.email.message}
                    </span>
                  ) : null}
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-[#0D1F3C]">
                  Telefone / WhatsApp
                </span>
                <input
                  type="tel"
                  {...register("phone")}
                  className="mt-2 w-full rounded-2xl border border-[#0D1F3C]/10 bg-[#f8fafc] px-4 py-3 text-sm text-[#0D1F3C] outline-none transition-colors focus:border-[#4B8AB0]"
                  placeholder="(41) 99999-9999"
                />
                {errors.phone ? (
                  <span className="mt-2 block text-xs font-medium text-[#c2410c]">
                    {errors.phone.message}
                  </span>
                ) : null}
              </label>

              <fieldset>
                <legend className="text-sm font-semibold text-[#0D1F3C]">
                  Área de interesse
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {areaOptions.map((option) => (
                    <label
                      key={option.value}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#0D1F3C]/10 bg-[#f8fafc] px-4 py-2 text-sm font-medium text-[#0D1F3C]/72 transition-colors hover:border-[#4B8AB0]/40"
                    >
                      <input
                        type="checkbox"
                        value={option.value}
                        {...register("interests")}
                        className="h-4 w-4 rounded border-[#0D1F3C]/20 text-[#0D1F3C] focus:ring-[#4B8AB0]"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                {errors.interests ? (
                  <span className="mt-2 block text-xs font-medium text-[#c2410c]">
                    {errors.interests.message}
                  </span>
                ) : null}
              </fieldset>

              <label className="block">
                <span className="text-sm font-semibold text-[#0D1F3C]">
                  Mensagem
                </span>
                <textarea
                  rows={6}
                  {...register("message")}
                  className="mt-2 w-full rounded-[1.5rem] border border-[#0D1F3C]/10 bg-[#f8fafc] px-4 py-3 text-sm leading-7 text-[#0D1F3C] outline-none transition-colors focus:border-[#4B8AB0]"
                  placeholder="Descreva o procedimento, a necessidade de material ou a dúvida que sua equipe quer resolver."
                />
                {errors.message ? (
                  <span className="mt-2 block text-xs font-medium text-[#c2410c]">
                    {errors.message.message}
                  </span>
                ) : null}
              </label>

              <div className="flex flex-col gap-3 border-t border-[#0D1F3C]/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[44ch] text-xs leading-6 text-[#0D1F3C]/48">
                  Ao enviar, o site abre seu aplicativo de e-mail com o conteúdo
                  do formulário preenchido. Isso evita perder leads enquanto o
                  canal de CRM ainda não foi configurado.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D1F3C] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a3a6e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="size-4" />
                  {isSubmitting ? "Preparando..." : "Enviar mensagem"}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div
              data-reveal
              className="oa-reveal rounded-[2rem] bg-[#0D1F3C] p-6 text-white shadow-[0_24px_64px_rgba(13,31,60,0.14)] sm:p-8"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87CEEB]">
                Contato direto
              </span>
              <div className="mt-6 space-y-5">
                {[
                  {
                    icon: Phone,
                    label: "Telefone",
                    value: contactInfo.phoneDisplay,
                    href: contactInfo.phoneHref,
                  },
                  {
                    icon: Mail,
                    label: "E-mail",
                    value: contactInfo.email,
                    href: `mailto:${contactInfo.email}`,
                  },
                  {
                    icon: Clock3,
                    label: "Horário",
                    value: contactInfo.hours,
                    href: undefined,
                  },
                  {
                    icon: MapPin,
                    label: "Endereço",
                    value: `${contactInfo.addressLine1}, ${contactInfo.addressLine2}`,
                    href: contactInfo.googleMapsDirectionsUrl,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] px-4 py-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                          <Icon className="size-4 text-[#87CEEB]" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              target={
                                item.href.startsWith("http") ? "_blank" : undefined
                              }
                              rel={
                                item.href.startsWith("http")
                                  ? "noreferrer"
                                  : undefined
                              }
                              className="mt-2 block text-sm font-medium leading-7 text-white transition-colors hover:text-[#87CEEB]"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="mt-2 text-sm font-medium leading-7 text-white">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={contactInfo.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#87CEEB] px-5 py-3 text-sm font-semibold text-[#0D1F3C] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a8ddf2]"
                >
                  Ligar agora
                  <Phone className="size-4" />
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                >
                  Enviar e-mail
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>

            <div
              data-reveal
              className="oa-reveal overflow-hidden rounded-[2rem] border border-[#0D1F3C]/10 bg-white shadow-[0_24px_64px_rgba(13,31,60,0.08)]"
              style={{ transitionDelay: "90ms" }}
            >
              <div className="border-b border-[#0D1F3C]/8 px-6 py-5">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4B8AB0]">
                  Mapa e acesso
                </span>
                <h3 className="mt-3 text-xl font-bold text-[#0D1F3C]">
                  Venha até a OrtoArt
                </h3>
              </div>
              <iframe
                title="Mapa OrtoArt"
                src={contactInfo.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0"
              />
              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <p className="text-sm leading-7 text-[#0D1F3C]/56">
                  {contactInfo.addressLine1}
                  <br />
                  {contactInfo.addressLine2}, {contactInfo.postalCode}
                </p>
                <a
                  href={contactInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#0D1F3C]/10 px-4 py-2 text-sm font-semibold text-[#0D1F3C] transition-colors hover:bg-[#0D1F3C]/[0.04]"
                >
                  Como chegar
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>

            <div
              data-reveal
              className="oa-reveal overflow-hidden rounded-[2rem] bg-[#25D366] p-6 text-[#072a16] shadow-[0_20px_50px_rgba(37,211,102,0.18)]"
              style={{ transitionDelay: "180ms" }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#072a16]/68">
                WhatsApp em destaque
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">
                Precisa agilizar o contato?
              </h3>
              <p className="mt-3 max-w-[34ch] text-sm leading-7 text-[#072a16]/76">
                Abra a conversa com uma mensagem já pronta e fale com a equipe
                da OrtoArt por um canal mais direto.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0D1F3C] transition-all duration-200 hover:-translate-y-0.5"
              >
                Chamar no WhatsApp
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

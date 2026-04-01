import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a OrtoArt. Estamos prontos para atender médicos, hospitais e planos de saúde.",
};

export default function ContatoPage() {
  return (
    <>
      {/* TODO: Headline */}
      {/* TODO: Formulário + dados de contato */}
      {/* TODO: Mapa Google Maps */}
      {/* TODO: Botão WhatsApp em destaque */}
      <div className="min-h-screen flex items-center justify-center text-[#0D1F3C]">
        <p className="text-lg font-semibold">Contato — em construção</p>
      </div>
    </>
  );
}

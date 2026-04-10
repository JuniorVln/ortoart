import type { Metadata } from "next";
import ContactPageSections from "@/components/sections/ContactPageSections";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a OrtoArt. Estamos prontos para atender médicos, hospitais e planos de saúde.",
};

export default function ContatoPage() {
  return <ContactPageSections />;
}

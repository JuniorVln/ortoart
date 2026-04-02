import type { Metadata } from "next";
import PartnersPageSections from "@/components/sections/PartnersPageSections";

export const metadata: Metadata = {
  title: "Parceiros e Fabricantes",
  description:
    "A OrtoArt representa os melhores fabricantes mundiais de materiais cirúrgicos. Conheça nossos parceiros.",
};

export default function ParceirosPage() {
  return <PartnersPageSections />;
}

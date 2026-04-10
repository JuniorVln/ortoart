import type { Metadata } from "next";
import SportsMedicinePageSections from "@/components/sections/SportsMedicinePageSections";

export const metadata: Metadata = {
  title: "Medicina Esportiva",
  description:
    "Alta performance também dentro do centro cirúrgico. Materiais cirúrgicos para medicina esportiva com suporte especializado.",
};

export default function MedicinaEsportivaPage() {
  return <SportsMedicinePageSections />;
}

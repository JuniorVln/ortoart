import type { Metadata } from "next";
import AboutPageSections from "@/components/sections/AboutPageSections";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a história da OrtoArt, mais de 15 anos levando precisão e cuidado aos cirurgiões de coluna e medicina esportiva.",
};

export default function QuemSomosPage() {
  return <AboutPageSections />;
}

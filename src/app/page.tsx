import type { Metadata } from "next";
import HomePageSections from "@/components/sections/HomePageSections";

export const metadata: Metadata = {
  title: "OrtoArt Materiais Cirúrgicos",
  description:
    "Tecnologia e cuidado onde o cirurgião mais precisa. Materiais cirúrgicos para coluna e medicina esportiva em Curitiba – PR.",
};

export default function HomePage() {
  return <HomePageSections />;
}

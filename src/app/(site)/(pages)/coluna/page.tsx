import type { Metadata } from "next";
import SpinePageSections from "@/components/sections/SpinePageSections";

export const metadata: Metadata = {
  title: "Coluna",
  description:
    "Soluções completas para cirurgia de coluna vertebral. Instrumentadores qualificados e os melhores materiais do mercado.",
};

export default function ColunaPage() {
  return <SpinePageSections />;
}

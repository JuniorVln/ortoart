import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "OrtoArt Materiais Cirúrgicos",
    template: "%s | OrtoArt",
  },
  description:
    "Materiais cirúrgicos de alta precisão para coluna e medicina esportiva. Representante exclusivo das melhores marcas do mundo em Curitiba – PR.",
  keywords: ["materiais cirúrgicos", "coluna", "medicina esportiva", "ortopedia", "Curitiba", "instrumentadores"],
  openGraph: {
    siteName: "OrtoArt Materiais Cirúrgicos",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

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
    <html lang="pt-BR" className={`${montserrat.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

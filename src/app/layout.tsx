import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
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
      <body className="antialiased">
        {children}
        {/* Netlify Identity Widget — redireciona o usuário após login no /admin */}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">{`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", function(user) {
              if (!user) {
                window.netlifyIdentity.on("login", function() {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        `}</Script>
      </body>
    </html>
  );
}

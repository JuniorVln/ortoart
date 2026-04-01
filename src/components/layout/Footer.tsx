import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import SiteLogo from "@/components/ui/SiteLogo";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const links = [
  { href: "/", label: "Home" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/coluna", label: "Coluna" },
  { href: "/medicina-esportiva", label: "Medicina Esportiva" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

const legal = [
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/politica-de-cookies", label: "Política de Cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D1F3C] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Marca */}
          <div>
            <SiteLogo className="mb-4" imageClassName="w-[188px] sm:w-[208px]" />
            <p className="text-sm leading-relaxed">
              Tecnologia e cuidado onde o cirurgião mais precisa. Representante dos melhores fabricantes mundiais em Curitiba – PR.
            </p>
            <a
              href="https://www.instagram.com/ortoartbr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[#87CEEB] hover:text-white transition-colors text-sm"
            >
              <InstagramIcon size={16} />
              @ortoartbr
            </a>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegação
            </p>
            <nav className="flex flex-col gap-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm hover:text-[#87CEEB] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contato */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contato
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#87CEEB] mt-0.5 shrink-0" />
                <span>Av. Winston Churchill 1824, sala 208, Pinheirinho, Curitiba – PR</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#87CEEB] shrink-0" />
                <a href="tel:+554131515454" className="hover:text-[#87CEEB] transition-colors">
                  (+55) 41 3151-5454
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#87CEEB] shrink-0" />
                <a href="mailto:contato@ortoart.com.br" className="hover:text-[#87CEEB] transition-colors">
                  contato@ortoart.com.br
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/40">
              Seg – Sex: 9h às 17h
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} OrtoArt Materiais Cirúrgicos Ltda. — CNPJ: 09.530.330/0001-63</p>
          <nav className="flex gap-4 flex-wrap justify-center">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

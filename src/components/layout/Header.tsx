"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import SiteLogo from "@/components/ui/SiteLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/coluna", label: "Coluna" },
  { href: "/medicina-esportiva", label: "Medicina Esportiva" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

/* ─── "Fale Conosco" CTA with animated arrow ─────────────────── */
function CtaButton() {
  return (
    <Link
      href="/contato"
      className="group inline-flex h-11 items-center gap-0 rounded-full border border-white/[0.18] bg-[#0b1828] px-5 text-[13px] font-semibold text-white transition-all duration-300 ease-out hover:gap-2.5 hover:border-[#87CEEB]/40 hover:pr-2"
    >
      <span className="whitespace-nowrap">Fale Conosco</span>
      <span className="flex h-0 w-0 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white transition-all duration-300 ease-out group-hover:h-7 group-hover:w-7">
        <ArrowRight size={13} className="shrink-0 text-[#0D1F3C]" strokeWidth={2.5} />
      </span>
    </Link>
  );
}

/* ─── Header ─────────────────────────────────────────────────── */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080f1e]/90 shadow-[0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

        {/* ── Logo ─────────────────────────────────────────── */}
        <SiteLogo priority imageClassName="w-[148px] sm:w-[172px]" />

        {/* ── Pill nav (centered, absolute) ────────────────── */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 xl:block">
          <ul className="flex items-center gap-0.5 rounded-full border border-white/[0.13] bg-white/[0.05] p-1 backdrop-blur-sm">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-all duration-150 ${
                      active
                        ? "bg-white/[0.14] text-white"
                        : "text-white/60 hover:bg-white/[0.07] hover:text-white/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Right side ───────────────────────────────────── */}
        <div className="ml-auto flex items-center gap-3">
          {/* CTA — desktop */}
          <div className="hidden lg:block">
            <CtaButton />
          </div>

          {/* Hamburger — mobile / tablet */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="xl:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.15] text-white/80 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ──────────────────────────────────── */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/[0.08] bg-[#080f1e]/95 px-4 pb-5 pt-3 backdrop-blur-md">
          <nav className="flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/[0.1] text-white"
                      : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4">
            <CtaButton />
          </div>
        </div>
      </div>
    </header>
  );
}

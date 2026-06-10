"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, Settings2, X } from "lucide-react";
import {
  OPEN_COOKIE_PREFERENCES_EVENT,
  acceptAllCookiePreferences,
  defaultCookiePreferences,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentRecord,
  type CookiePreferences,
} from "@/lib/cookies/consent";

type CookieCategoryConfig = {
  id: keyof Omit<CookiePreferences, "necessary">;
  title: string;
  description: string;
};

const optionalCategories: CookieCategoryConfig[] = [
  {
    id: "preferences",
    title: "Preferências",
    description:
      "Permitem lembrar escolhas do usuário, como idioma ou região, para personalizar a experiência.",
  },
  {
    id: "statistics",
    title: "Estatísticas",
    description:
      "Ajudam a entender como os visitantes interagem com o site, de forma agregada e anônima.",
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Utilizados para exibir conteúdos e anúncios relevantes e medir a eficácia de campanhas.",
  },
];

function CategoryToggle({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-xs leading-6 text-white/56">{description}</p>
        </div>
        {disabled ? (
          <span className="shrink-0 rounded-full bg-[#87CEEB]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#87CEEB]">
            Sempre ativo
          </span>
        ) : (
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={`Ativar cookies de ${title}`}
            onClick={() => onChange?.(!checked)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
              checked ? "bg-[#87CEEB]" : "bg-white/20"
            }`}
          >
            <span
              className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${
                checked ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}

function getInitialConsentState() {
  const existing = readCookieConsent();
  return {
    hasConsent: Boolean(existing),
    visible: !existing,
  };
}

export default function CookieConsentBanner() {
  const [consentState, setConsentState] = useState(getInitialConsentState);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draft, setDraft] = useState<CookiePreferences>(defaultCookiePreferences());

  useEffect(() => {
    const openPreferences = () => {
      const current = readCookieConsent();
      setDraft(current?.preferences ?? defaultCookiePreferences());
      setShowPreferences(true);
      setConsentState({ hasConsent: Boolean(current), visible: true });
    };

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
  }, []);

  const { visible, hasConsent } = consentState;

  function persist(status: CookieConsentRecord["status"], preferences: CookiePreferences) {
    writeCookieConsent({
      status,
      preferences,
      updatedAt: new Date().toISOString(),
    });
    setConsentState({ hasConsent: true, visible: false });
    setShowPreferences(false);
  }

  function handleAcceptAll() {
    persist("accepted", acceptAllCookiePreferences());
  }

  function handleRejectOptional() {
    persist("rejected", defaultCookiePreferences());
  }

  function handleSavePreferences() {
    const allAccepted =
      draft.preferences && draft.statistics && draft.marketing;
    const allRejected =
      !draft.preferences && !draft.statistics && !draft.marketing;

    persist(
      allAccepted ? "accepted" : allRejected ? "rejected" : "custom",
      draft
    );
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0D1F3C] shadow-[0_24px_80px_rgba(8,15,30,0.45)]">
        <div className="flex items-start gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#87CEEB]/15 text-[#87CEEB]">
            <Cookie className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id="cookie-consent-title" className="text-base font-bold text-white sm:text-lg">
              Cookies e privacidade
            </h2>
            <p className="mt-2 text-sm leading-7 text-white/62">
              Utilizamos cookies para melhorar sua experiência de navegação. Você pode aceitar
              todos, recusar os opcionais ou personalizar suas preferências. Saiba mais em nossa{" "}
              <Link href="/politica-de-cookies/" className="font-semibold text-[#87CEEB] hover:underline">
                Política de Cookies
              </Link>
              ,{" "}
              <Link href="/politica-de-privacidade/" className="font-semibold text-[#87CEEB] hover:underline">
                Política de Privacidade
              </Link>{" "}
              e{" "}
              <Link href="/termos-de-uso/" className="font-semibold text-[#87CEEB] hover:underline">
                Termos de Uso
              </Link>
              .
            </p>
          </div>
          {hasConsent ? (
            <button
              type="button"
              aria-label="Fechar preferências de cookies"
              onClick={() => setConsentState((current) => ({ ...current, visible: false }))}
              className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>

        {showPreferences ? (
          <div className="space-y-3 px-5 py-5 sm:px-6">
            <CategoryToggle
              title="Funcionais"
              description="Essenciais para o funcionamento do site, como salvar suas preferências de cookies e garantir a navegação segura."
              checked
              disabled
            />
            {optionalCategories.map((category) => (
              <CategoryToggle
                key={category.id}
                title={category.title}
                description={category.description}
                checked={draft[category.id]}
                onChange={(value) =>
                  setDraft((current) => ({ ...current, [category.id]: value }))
                }
              />
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-6">
          {!showPreferences ? (
            <button
              type="button"
              onClick={() => setShowPreferences(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:mr-auto"
            >
              <Settings2 className="size-4" />
              Preferências
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowPreferences(false)}
              className="inline-flex items-center justify-center rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:mr-auto"
            >
              Voltar
            </button>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleRejectOptional}
              className="rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Recusar opcionais
            </button>
            {showPreferences ? (
              <button
                type="button"
                onClick={handleSavePreferences}
                className="rounded-full bg-[#87CEEB] px-5 py-3 text-sm font-semibold text-[#0D1F3C] transition-colors hover:bg-[#a8ddf2]"
              >
                Salvar preferências
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAcceptAll}
                className="rounded-full bg-[#87CEEB] px-5 py-3 text-sm font-semibold text-[#0D1F3C] transition-colors hover:bg-[#a8ddf2]"
              >
                Aceitar todos
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

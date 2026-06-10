"use client";

import { openCookiePreferences } from "@/lib/cookies/consent";

export default function CookiePreferencesTrigger() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="hover:text-white transition-colors"
    >
      Gerenciar cookies
    </button>
  );
}

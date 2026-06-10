export const COOKIE_CONSENT_STORAGE_KEY = "ortoart-cookie-consent-v1";
export const OPEN_COOKIE_PREFERENCES_EVENT = "ortoart:open-cookie-preferences";

export type CookieCategory = "preferences" | "statistics" | "marketing";

export type CookiePreferences = {
  necessary: true;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};

export type CookieConsentRecord = {
  status: "accepted" | "rejected" | "custom";
  preferences: CookiePreferences;
  updatedAt: string;
};

export const defaultCookiePreferences = (): CookiePreferences => ({
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
});

export const acceptAllCookiePreferences = (): CookiePreferences => ({
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: true,
});

export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentRecord;
  } catch {
    return null;
  }
}

export function writeCookieConsent(record: CookieConsentRecord) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
  window.dispatchEvent(new CustomEvent("ortoart:cookie-consent-updated", { detail: record }));
}

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT));
}

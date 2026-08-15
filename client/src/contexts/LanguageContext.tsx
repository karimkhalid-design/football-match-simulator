import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "ar" | "en";

type LanguageContextValue = {
  language: Language;
  isArabic: boolean;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const STORAGE_KEY = "kora-keda-language";
const defaultLanguageContext: LanguageContextValue = {
  language: "ar",
  isArabic: true,
  setLanguage: () => undefined,
  toggleLanguage: () => undefined,
};
const LanguageContext = createContext<LanguageContextValue>(defaultLanguageContext);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "ar";
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ar";
  } catch {
    return "ar";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    } catch {
      // Private browsing or restricted storage should not block the switch.
    }
  };

  useEffect(() => {
    const direction = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    isArabic: language === "ar",
    setLanguage,
    toggleLanguage: () => setLanguage(language === "ar" ? "en" : "ar"),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export const languageLabels = {
  ar: { self: "العربية", switchTo: "English", aria: "تغيير اللغة إلى الإنجليزية" },
  en: { self: "English", switchTo: "العربية", aria: "Switch language to Arabic" },
} as const;

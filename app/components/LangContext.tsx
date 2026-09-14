"use client";

import { createContext, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "../lib/types";
import { getLangFromPathname, localizePath, stripLocalePrefix } from "../lib/i18n";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  mounted: boolean;
};

const LangContext = createContext<LangContextType>({
  lang: "is",
  setLang: () => {},
  mounted: true,
});

/**
 * The language is derived entirely from the URL (/en/... vs unprefixed),
 * so it is correct on the very first server render — no hydration mismatch
 * and no flash of the wrong language.
 */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const lang = getLangFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (target: Lang) => {
    if (target === lang) return;
    router.push(localizePath(stripLocalePrefix(pathname), target));
  };

  return (
    <LangContext.Provider value={{ lang, setLang, mounted: true }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/** Kept for compatibility with existing call sites; lang is always accurate now, on server and client alike. */
export function useSafeLang() {
  return useContext(LangContext);
}

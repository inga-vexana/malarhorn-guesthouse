"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Lang } from "../lib/types";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  mounted: boolean;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  mounted: false,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("malarhorn-lang") as Lang | null;
    if (stored === "is" || stored === "en") setLangState(stored);
    setMounted(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("malarhorn-lang", l);
  };

  return <LangContext.Provider value={{ lang, setLang, mounted }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Skilar alltaf "en" þar til eftir hydration til að koma í veg fyrir mismun milli server og client */
export function useSafeLang() {
  const { lang, setLang, mounted } = useContext(LangContext);
  return { lang: mounted ? lang : "en" as Lang, setLang, mounted };
}

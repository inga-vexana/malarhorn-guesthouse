"use client";

import { createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "../lib/types";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  mounted: boolean;
};

const LangContext = createContext<LangContextType | null>(null);

/** Strips a leading "/en" segment from a pathname, e.g. "/en/about" -> "/about". */
function stripEnPrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const lang: Lang = pathname.startsWith("/en") ? "en" : "is";

  const setLang = (l: Lang) => {
    const base = stripEnPrefix(pathname);
    const query = typeof window !== "undefined" ? window.location.search : "";
    const nextPath = l === "en" ? (base === "/" ? "/en" : `/en${base}`) : base;
    router.push(`${nextPath}${query}`);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, mounted: true }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}

/** Lang is derived from the URL, so it is always correct on both server and client — no hydration guard needed. */
export function useSafeLang() {
  return useLang();
}

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

/**
 * Icelandic and English pages live at different slugs (e.g. "/gisting" vs
 * "/accommodation"), so switching languages needs an explicit mapping rather
 * than a shared path with a "/en" prefix.
 */
const IS_TO_EN: Record<string, string> = {
  "/gisting": "/accommodation",
  "/veitingastadur": "/restaurant",
  "/siglingar": "/sailing",
  "/um-okkur": "/about",
  "/gestir": "/guest",
  "/bokun": "/booking",
  "/gjafakort": "/giftcard",
};

const EN_TO_IS: Record<string, string> = Object.fromEntries(
  Object.entries(IS_TO_EN).map(([is, en]) => [en, is])
);

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

    let nextBase = base;
    if (l === "en" && base !== "/") {
      nextBase = IS_TO_EN[base] ?? base;
    } else if (l === "is" && base !== "/") {
      nextBase = EN_TO_IS[base] ?? base;
    }

    const nextPath = l === "en" ? (nextBase === "/" ? "/en" : `/en${nextBase}`) : nextBase;
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

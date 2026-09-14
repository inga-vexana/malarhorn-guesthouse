import type { Lang } from "./types";

/** English lives under this URL prefix; Icelandic is the unprefixed default locale. */
export const LOCALE_PREFIX = "/en";

export function getLangFromPathname(pathname: string): Lang {
  return pathname === LOCALE_PREFIX || pathname.startsWith(`${LOCALE_PREFIX}/`) ? "en" : "is";
}

/** Returns the canonical (Icelandic) path for any given pathname, dropping the /en prefix if present. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === LOCALE_PREFIX) return "/";
  if (pathname.startsWith(`${LOCALE_PREFIX}/`)) return pathname.slice(LOCALE_PREFIX.length) || "/";
  return pathname;
}

/** Prefixes a canonical (Icelandic) path with /en when targeting the English locale. */
export function localizePath(path: string, lang: Lang): string {
  if (lang !== "en") return path;
  return path === "/" ? LOCALE_PREFIX : `${LOCALE_PREFIX}${path}`;
}

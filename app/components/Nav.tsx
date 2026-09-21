"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSafeLang } from "./LangContext";
import { translations } from "../lib/constants";
import { BookingLink } from "./BookingLink";

const LOGO = "/Untitled-200-x-200-px.png";

const pageToPath: Record<string, { is: string; en: string }> = {
  home: { is: "/", en: "/" },
  accommodation: { is: "/gisting", en: "/accommodation" },
  restaurant: { is: "/veitingastadur", en: "/restaurant" },
  sailing: { is: "/siglingar", en: "/sailing" },
  about: { is: "/um-okkur", en: "/about" },
  guest: { is: "/gestir", en: "/guest" },
  booking: { is: "/bokun", en: "/booking" },
  giftcard: { is: "/gjafakort", en: "/giftcard" },
  events: { is: "/vidburdir", en: "/vidburdir" },
};

export default function Nav() {
  const { lang, setLang, mounted } = useSafeLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = translations[mounted ? lang : "en"];
  const activeLang = mounted ? lang : "en";

  const localize = (key: string) => {
    const path = pageToPath[key][activeLang];
    if (activeLang === "en") return path === "/" ? "/en" : `/en${path}`;
    return path;
  };

  const isActive = (key: string) => {
    const path = pageToPath[key][activeLang];
    const currentPath = pathname.startsWith("/en")
      ? pathname === "/en"
        ? "/"
        : pathname.slice(3)
      : pathname;
    if (key === "home") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <>
      <nav className="nav">
        <Link className="logo" href={localize("home")} aria-label="Malarhorn home">
          <img src={LOGO} alt="Malarhorn" />
        </Link>
        <ul className="nl">
          {t.nav.map(([key, label]) => (
            <li key={key}>
              {key === "restaurant" ? (
                <Link
                  className={`navLinkButton ${isActive(key) ? "on" : ""}`}
                  href={localize(key)}
                >
                  {label}
                </Link>
              ) : key === "about" ? (
                <>
                  <Link
                    className={`navLinkButton ${isActive(key) ? "on" : ""}`}
                    href={localize(key)}
                  >
                    {label}
                  </Link>
                  <div className="drop">
                    <Link href={localize("about")}>{label}</Link>
                    <Link href={localize("guest")}>{t.guest}</Link>
                    {lang === "is" && <Link href={localize("events")}>{t.events}</Link>}
                  </div>
                </>
              ) : (
                <Link
                  className={`navLinkButton ${isActive(key) ? "on" : ""}`}
                  href={localize(key)}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="nr">
          <div className="lgt" aria-label="Language">
            <button className={`lb ${lang === "en" ? "on" : ""}`} onClick={() => setLang("en")}>
              EN
            </button>
            <button className={`lb ${lang === "is" ? "on" : ""}`} onClick={() => setLang("is")}>
              IS
            </button>
          </div>
          <BookingLink className="bkbtn">{t.book}</BookingLink>
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Loka valmynd" : "Opna valmynd"}
            aria-expanded={menuOpen}
          >
            <span className={`hbar ${menuOpen ? "hbar1-open" : ""}`} />
            <span className={`hbar ${menuOpen ? "hbar2-open" : ""}`} />
            <span className={`hbar ${menuOpen ? "hbar3-open" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="mobileMenuOverlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className={`mobileMenu ${menuOpen ? "mobileMenuOpen" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="mobileMenuList">
          {t.nav.map(([key, label]) => (
            <li key={key}>
              <Link
                className={`mobileMenuLink ${isActive(key) ? "on" : ""}`}
                href={localize(key)}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className="mobileMenuLink"
              href={localize("guest")}
              onClick={() => setMenuOpen(false)}
            >
              {t.guest}
            </Link>
          </li>
          {lang === "is" && (
            <li>
              <Link
                className="mobileMenuLink"
                href={localize("events")}
                onClick={() => setMenuOpen(false)}
              >
                {t.events}
              </Link>
            </li>
          )}
        </ul>
        <div className="mobileMenuFooter">
          <div className="lgt" aria-label="Language">
            <button
              className={`lb ${lang === "en" ? "on" : ""}`}
              onClick={() => {
                setLang("en");
              }}
            >
              EN
            </button>
            <button
              className={`lb ${lang === "is" ? "on" : ""}`}
              onClick={() => {
                setLang("is");
              }}
            >
              IS
            </button>
          </div>
          <BookingLink className="bp" onClick={() => setMenuOpen(false)}>
            {t.book}
          </BookingLink>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSafeLang } from "./LangContext";
import { translations, BV_BOOK } from "../lib/constants";

const LOGO = "/Untitled-200-x-200-px.png";

const pageToPath: Record<string, string> = {
  home: "/",
  accommodation: "/accommodation",
  restaurant: "/restaurant",
  sailing: "/sailing",
  about: "/about",
  guest: "/guest",
  booking: "/booking",
};

export default function Nav() {
  const { lang, setLang, mounted } = useSafeLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = translations[mounted ? lang : "en"];

  const isActive = (key: string) => {
    const path = pageToPath[key];
    if (key === "home") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav className="nav">
        <Link className="logo" href="/" aria-label="Malarhorn home">
          <img src={LOGO} alt="Malarhorn" />
        </Link>
        <ul className="nl">
          {t.nav.map(([key, label]) => (
            <li key={key}>
              {key === "restaurant" ? (
                <Link
                  className={`navLinkButton ${isActive(key) ? "on" : ""}`}
                  href={pageToPath[key]}
                >
                  {label}
                </Link>
              ) : key === "about" ? (
                <>
                  <Link
                    className={`navLinkButton ${isActive(key) ? "on" : ""}`}
                    href={pageToPath[key]}
                  >
                    {label}
                  </Link>
                  <div className="drop">
                    <Link href="/about">{label}</Link>
                    <Link href="/guest">{t.guest}</Link>
                  </div>
                </>
              ) : (
                <Link
                  className={`navLinkButton ${isActive(key) ? "on" : ""}`}
                  href={pageToPath[key]}
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
          <button className="bkbtn" onClick={() => window.open(BV_BOOK, "_blank")}>
            {t.book}
          </button>
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
                href={pageToPath[key]}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className="mobileMenuLink"
              href="/guest"
              onClick={() => setMenuOpen(false)}
            >
              {t.guest}
            </Link>
          </li>
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
          <button
            className="bp"
            onClick={() => {
              window.open(BV_BOOK, "_blank");
              setMenuOpen(false);
            }}
          >
            {t.book}
          </button>
        </div>
      </div>
    </>
  );
}

"use client";

import { useSafeLang } from "./LangContext";
import { translations } from "../lib/constants";

export default function Footer() {
  const { lang } = useSafeLang();
  const t = translations[lang];

  return (
    <footer>
      <div className="fgd">
        <div className="fb">
          <img src="/logo-dark.png" alt="Malarhorn" className="footer-logo" />
          <p>{t.footerDescription}</p>
        </div>
        <div className="fc">
          <h4>{t.find}</h4>
          <p>Grundargata 17</p>
          <p>520 Drangsnes, Iceland</p>
        </div>
        <div className="fc">
          <h4>{t.contact}</h4>
          <p className="ft-label">
            {lang === "en" ? "Reception (08:00–21:00)" : "Móttaka (08:00–21:00)"}
          </p>
          <a href="tel:+3544614345">+354 461 4345</a>
          <p className="ft-label">
            {lang === "en" ? "24/7 Assistance" : "Aðstoð utan opnunartíma"}
          </p>
          <a href="tel:+3544192801">+354 419 2801</a>
          <a href="mailto:malarhorn@malarhornguesthouse.is">
            malarhorn@malarhornguesthouse.is
          </a>
        </div>
      </div>
      <div className="fb2">
        <p>&copy; 2026 Malarhorn Guesthouse</p>
        <div className="fso">
          <a
            href="https://www.facebook.com/profile.php?id=100063630351484"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/malarhornguesthouse/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

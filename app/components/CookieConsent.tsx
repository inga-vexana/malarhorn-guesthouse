"use client";

import { useEffect, useState } from "react";
import { useSafeLang } from "./LangContext";
import { applyConsent, readConsentCookie, writeConsentCookie } from "../lib/consent";

/** Dispatched by the footer's "Cookie settings" link to reopen the preferences window. */
export const OPEN_COOKIE_PREFERENCES_EVENT = "open-cookie-preferences";

const COOKIE_POLICY_PATH = { is: "/vafrakokur", en: "/en/cookie-policy" };

export default function CookieConsent() {
  const { lang } = useSafeLang();
  const isIs = lang === "is";

  const [bannerVisible, setBannerVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = readConsentCookie();
    if (stored) {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
    } else {
      setBannerVisible(true);
    }

    const openHandler = () => {
      const current = readConsentCookie();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setPreferencesOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openHandler);
  }, []);

  function saveAndClose(nextAnalytics: boolean, nextMarketing: boolean) {
    writeConsentCookie(nextAnalytics, nextMarketing);
    applyConsent(nextAnalytics, nextMarketing);
    setAnalytics(nextAnalytics);
    setMarketing(nextMarketing);
    setBannerVisible(false);
    setPreferencesOpen(false);
  }

  const acceptAll = () => saveAndClose(true, true);
  const rejectOptional = () => saveAndClose(false, false);
  const savePreferences = () => saveAndClose(analytics, marketing);

  const t = isIs
    ? {
        title: "Vafrakökur á Malarhorn.is",
        text: "Við notum nauðsynlegar vafrakökur til að tryggja virkni síðunnar. Með þínu samþykki notum við einnig vafrakökur til að mæla heimsóknir, bæta upplifun þína og mæla árangur auglýsinga.",
        acceptAll: "Samþykkja allar",
        rejectAll: "Hafna valfrjálsum",
        manage: "Stilla vafrakökur",
        readMore: "Lesa meira um vafrakökur",
        necessaryTitle: "Nauðsynlegar vafrakökur",
        necessaryDesc:
          "Þessar vafrakökur eru nauðsynlegar fyrir grunnvirkni vefsíðunnar og er ekki hægt að afvirkja þær.",
        analyticsTitle: "Tölfræðivafrakökur",
        analyticsDesc: "Þessar vafrakökur hjálpa okkur að skilja hvernig gestir nota vefsíðuna.",
        marketingTitle: "Markaðsvafrakökur",
        marketingDesc:
          "Þessar vafrakökur eru notaðar til að mæla árangur auglýsinga og styðja við viðeigandi markaðssetningu.",
        alwaysOn: "Alltaf virkt",
        save: "Vista stillingar",
        preferencesTitle: "Stillingar vafrakökur",
        close: "Loka",
      }
    : {
        title: "Cookies on Malarhorn.is",
        text: "We use necessary cookies to ensure that the website functions correctly. With your consent, we also use cookies to measure visits, improve your experience and measure advertising performance.",
        acceptAll: "Accept all",
        rejectAll: "Reject optional cookies",
        manage: "Manage preferences",
        readMore: "Read more about cookies",
        necessaryTitle: "Necessary cookies",
        necessaryDesc:
          "These cookies are required for the basic operation of the website and cannot be disabled.",
        analyticsTitle: "Analytics cookies",
        analyticsDesc: "These cookies help us understand how visitors use the website.",
        marketingTitle: "Marketing cookies",
        marketingDesc:
          "These cookies are used to measure advertising performance and support relevant advertising.",
        alwaysOn: "Always active",
        save: "Save preferences",
        preferencesTitle: "Cookie preferences",
        close: "Close",
      };

  const policyHref = isIs ? COOKIE_POLICY_PATH.is : COOKIE_POLICY_PATH.en;

  return (
    <>
      {bannerVisible && !preferencesOpen && (
        <div className="cc-banner" role="dialog" aria-modal="false" aria-label={t.title}>
          <div className="cc-banner-inner">
            <div className="cc-banner-copy">
              <p className="cc-title">{t.title}</p>
              <p className="cc-text">
                {t.text}{" "}
                <a href={policyHref} className="cc-link">
                  {t.readMore}
                </a>
              </p>
            </div>
            <div className="cc-banner-actions">
              <button type="button" className="cc-btn cc-btn-outline" onClick={rejectOptional}>
                {t.rejectAll}
              </button>
              <button
                type="button"
                className="cc-btn cc-btn-ghost"
                onClick={() => setPreferencesOpen(true)}
              >
                {t.manage}
              </button>
              <button type="button" className="cc-btn cc-btn-primary" onClick={acceptAll}>
                {t.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}

      {preferencesOpen && (
        <div className="cc-overlay" role="presentation" onClick={() => setPreferencesOpen(false)}>
          <div
            className="cc-modal"
            role="dialog"
            aria-modal="true"
            aria-label={t.preferencesTitle}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cc-modal-header">
              <h2 className="cc-modal-title">{t.preferencesTitle}</h2>
              <button
                type="button"
                className="cc-close"
                onClick={() => setPreferencesOpen(false)}
                aria-label={t.close}
              >
                &times;
              </button>
            </div>
            <p className="cc-text">{t.text}</p>

            <div className="cc-category">
              <div className="cc-category-head">
                <span className="cc-category-title">{t.necessaryTitle}</span>
                <span
                  className="cc-toggle-track cc-toggle-on cc-toggle-disabled"
                  aria-hidden="true"
                >
                  <span className="cc-toggle-thumb" />
                </span>
              </div>
              <p className="cc-category-desc">{t.necessaryDesc}</p>
              <span className="cc-always-on">{t.alwaysOn}</span>
            </div>

            <div className="cc-category">
              <div className="cc-category-head">
                <span className="cc-category-title" id="cc-analytics-label">
                  {t.analyticsTitle}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  aria-labelledby="cc-analytics-label"
                  className={`cc-toggle-track ${analytics ? "cc-toggle-on" : ""}`}
                  onClick={() => setAnalytics((v) => !v)}
                >
                  <span className="cc-toggle-thumb" />
                </button>
              </div>
              <p className="cc-category-desc">{t.analyticsDesc}</p>
            </div>

            <div className="cc-category">
              <div className="cc-category-head">
                <span className="cc-category-title" id="cc-marketing-label">
                  {t.marketingTitle}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={marketing}
                  aria-labelledby="cc-marketing-label"
                  className={`cc-toggle-track ${marketing ? "cc-toggle-on" : ""}`}
                  onClick={() => setMarketing((v) => !v)}
                >
                  <span className="cc-toggle-thumb" />
                </button>
              </div>
              <p className="cc-category-desc">{t.marketingDesc}</p>
            </div>

            <a href={policyHref} className="cc-link cc-modal-readmore">
              {t.readMore}
            </a>

            <div className="cc-modal-actions">
              <button type="button" className="cc-btn cc-btn-outline" onClick={rejectOptional}>
                {t.rejectAll}
              </button>
              <button type="button" className="cc-btn cc-btn-outline" onClick={savePreferences}>
                {t.save}
              </button>
              <button type="button" className="cc-btn cc-btn-primary" onClick={acceptAll}>
                {t.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { PageHeader } from "../components/shared";
import { OPEN_COOKIE_PREFERENCES_EVENT } from "../components/CookieConsent";

export default function CookiePolicyPage() {
  const openPreferences = () => {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT));
  };

  return (
    <>
      <PageHeader
        eyebrow="Persónuvernd"
        title="Vafrakökur"
        text="Hér má sjá hvaða vafrakökur Malarhorn.is notar, í hvaða tilgangi, og hvernig þú getur breytt eða dregið samþykki þitt til baka."
      />
      <section className="sec">
        <div className="si2">
          <div className="ib" style={{ display: "block" }}>
            <h2 style={{ marginBottom: "0.75rem" }}>Hvað eru vafrakökur?</h2>
            <p className="bt" style={{ marginBottom: "1.5rem" }}>
              Vafrakökur eru litlar textaskrár sem vefsíður vista í vafra þínum. Þær hjálpa
              vefsíðum að virka rétt, minnast stillinga þinna og, ef þú samþykkir það, mæla
              heimsóknir og árangur auglýsinga.
            </p>

            <h2 style={{ marginBottom: "0.75rem" }}>Hvaða vafrakökur notum við?</h2>

            <h3 style={{ marginBottom: "0.4rem" }}>Nauðsynlegar vafrakökur</h3>
            <p className="bt" style={{ marginBottom: "1.25rem" }}>
              Þessar vafrakökur eru alltaf virkar og nauðsynlegar fyrir grunnvirkni vefsíðunnar,
              t.d. til að vista samþykkisstillingar þínar á vafrakökum (
              <code>malarhorn_cookie_consent</code>) og til að bókunarferlið virki rétt. Þær er
              ekki hægt að afvirkja.
            </p>

            <h3 style={{ marginBottom: "0.4rem" }}>Tölfræðivafrakökur</h3>
            <p className="bt" style={{ marginBottom: "1.25rem" }}>
              Með samþykki þínu notum við Google Analytics (GA4), sett upp í gegnum Google Tag
              Manager, til að skilja hvernig gestir nota vefsíðuna og bæta upplifun þeirra.
            </p>

            <h3 style={{ marginBottom: "0.4rem" }}>Markaðsvafrakökur</h3>
            <p className="bt" style={{ marginBottom: "1.25rem" }}>
              Með samþykki þínu notum við Meta Pixel (Facebook/Instagram), sett upp í gegnum
              Google Tag Manager, til að mæla árangur auglýsinga og sýna þér viðeigandi efni.
            </p>

            <h2 style={{ marginBottom: "0.75rem" }}>Hversu langan tíma gildir samþykki?</h2>
            <p className="bt" style={{ marginBottom: "1.5rem" }}>
              Samþykkisstillingar þínar eru vistaðar í allt að 6 mánuði, eftir það er þú spurð(ur)
              að nýju.
            </p>

            <h2 style={{ marginBottom: "0.75rem" }}>Breyta eða draga samþykki til baka</h2>
            <p className="bt" style={{ marginBottom: "1.5rem" }}>
              Þú getur breytt vali þínu eða dregið samþykki til baka hvenær sem er með því að
              smella á hnappinn hér að neðan.
            </p>
            <button type="button" className="cc-btn cc-btn-primary" onClick={openPreferences}>
              Stilla vafrakökur
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

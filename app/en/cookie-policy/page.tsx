"use client";

import { PageHeader } from "../../components/shared";
import { OPEN_COOKIE_PREFERENCES_EVENT } from "../../components/CookieConsent";

export default function CookiePolicyEnPage() {
  const openPreferences = () => {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT));
  };

  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Cookie Policy"
        text="Here you can see which cookies Malarhorn.is uses, for what purpose, and how you can change or withdraw your consent."
      />
      <section className="sec">
        <div className="si2">
          <div className="ib" style={{ display: "block" }}>
            <h2 style={{ marginBottom: "0.75rem" }}>What are cookies?</h2>
            <p className="bt" style={{ marginBottom: "1.5rem" }}>
              Cookies are small text files that websites store in your browser. They help
              websites function correctly, remember your preferences, and, if you consent, measure
              visits and advertising performance.
            </p>

            <h2 style={{ marginBottom: "0.75rem" }}>Which cookies do we use?</h2>

            <h3 style={{ marginBottom: "0.4rem" }}>Necessary cookies</h3>
            <p className="bt" style={{ marginBottom: "1.25rem" }}>
              These cookies are always active and required for the basic operation of the
              website, such as storing your cookie consent choices (
              <code>malarhorn_cookie_consent</code>) and enabling the booking flow to work
              correctly. They cannot be disabled.
            </p>

            <h3 style={{ marginBottom: "0.4rem" }}>Analytics cookies</h3>
            <p className="bt" style={{ marginBottom: "1.25rem" }}>
              With your consent, we use Google Analytics (GA4), configured through Google Tag
              Manager, to understand how visitors use the website and improve their experience.
            </p>

            <h3 style={{ marginBottom: "0.4rem" }}>Marketing cookies</h3>
            <p className="bt" style={{ marginBottom: "1.25rem" }}>
              With your consent, we use Meta Pixel (Facebook/Instagram), configured through Google
              Tag Manager, to measure advertising performance and show you relevant content.
            </p>

            <h2 style={{ marginBottom: "0.75rem" }}>How long does consent last?</h2>
            <p className="bt" style={{ marginBottom: "1.5rem" }}>
              Your consent choices are stored for up to 6 months, after which you will be asked
              again.
            </p>

            <h2 style={{ marginBottom: "0.75rem" }}>Change or withdraw your consent</h2>
            <p className="bt" style={{ marginBottom: "1.5rem" }}>
              You can change your choice or withdraw your consent at any time by clicking the
              button below.
            </p>
            <button type="button" className="cc-btn cc-btn-primary" onClick={openPreferences}>
              Cookie settings
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

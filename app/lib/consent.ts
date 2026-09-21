/**
 * Google Consent Mode v2 (Basic Consent Mode) implementation.
 *
 * GTM (container GTM-5HNKH2TD) is the only tracking script loaded directly by
 * this app — GA4 and Meta Pixel are configured as tags *inside* that GTM
 * container. Per the Basic Consent Mode model, GTM itself must not be
 * requested from Google's servers until the visitor has granted at least one
 * optional consent category; once loaded, GTM's own consent checks (wired to
 * `analytics_storage` / `ad_storage` / `ad_user_data` / `ad_personalization`)
 * gate whether the GA4 and Meta Pixel tags inside it actually fire.
 */

export const CONSENT_COOKIE_NAME = "malarhorn_cookie_consent";
export const CONSENT_VERSION = "1";
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 182; // ~6 months
export const GTM_ID = "GTM-5HNKH2TD";
export const GTM_SCRIPT_ELEMENT_ID = "gtm-script-tag";

export type ConsentChoice = {
  v: string;
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

function isConsentChoice(value: unknown): value is ConsentChoice {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  return (
    typeof c.v === "string" &&
    typeof c.analytics === "boolean" &&
    typeof c.marketing === "boolean" &&
    typeof c.ts === "number"
  );
}

export function isConsentValid(choice: unknown): choice is ConsentChoice {
  if (!isConsentChoice(choice)) return false;
  if (choice.v !== CONSENT_VERSION) return false;
  const ageMs = Date.now() - choice.ts;
  return ageMs >= 0 && ageMs < CONSENT_MAX_AGE_SECONDS * 1000;
}

/** Reads and validates the stored consent cookie. Returns null if missing, malformed, expired, or from an old consent version. */
export function readConsentCookie(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    return isConsentValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsentCookie(analytics: boolean, marketing: boolean): void {
  if (typeof document === "undefined") return;
  const choice: ConsentChoice = { v: CONSENT_VERSION, analytics, marketing, ts: Date.now() };
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(choice)
  )}; path=/; max-age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax`;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function pushToDataLayer(...args: unknown[]): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/** Dynamically injects the GTM container script. Safe to call multiple times — it only loads once. */
export function loadGTM(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(GTM_SCRIPT_ELEMENT_ID)) return;
  const first = document.getElementsByTagName("script")[0];
  const script = document.createElement("script");
  script.id = GTM_SCRIPT_ELEMENT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  if (first?.parentNode) {
    first.parentNode.insertBefore(script, first);
  } else {
    document.head.appendChild(script);
  }
}

/** Best-effort removal of first-party GA4 / Meta Pixel cookies when consent is withdrawn. */
function deleteCookiesByPrefix(prefixes: string[]): void {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((c) => c.trim().split("=")[0])
    .filter(Boolean);
  const hostname = window.location.hostname;
  const rootHostname = hostname.replace(/^www\./, "");
  const domains = Array.from(
    new Set([hostname, `.${hostname}`, rootHostname, `.${rootHostname}`])
  );

  for (const name of names) {
    if (!prefixes.some((prefix) => name.startsWith(prefix))) continue;
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    for (const domain of domains) {
      document.cookie = `${name}=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }
}

/**
 * Applies a consent decision: updates Consent Mode state, pushes a
 * `consent_update` dataLayer event, loads GTM if any optional category was
 * granted, and cleans up tracking cookies for any category that was denied.
 */
export function applyConsent(analytics: boolean, marketing: boolean): void {
  pushToDataLayer("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });

  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "consent_update",
      necessary_consent: true,
      analytics_consent: analytics,
      marketing_consent: marketing,
      consent_version: CONSENT_VERSION,
    });
  }

  if (analytics || marketing) {
    loadGTM();
  }
  if (!analytics) {
    deleteCookiesByPrefix(["_ga", "_gid", "_gat"]);
  }
  if (!marketing) {
    deleteCookiesByPrefix(["_fbp", "_fbc"]);
  }
}

/**
 * Returns the inline script (as a string) that must run in `<head>` before
 * anything else: it initializes `dataLayer`, sets Consent Mode defaults
 * (denied unless a valid, unexpired consent cookie says otherwise), pushes a
 * `consent_initialized` event, and — only if a stored choice already granted
 * an optional category — loads GTM immediately so returning visitors don't
 * see the banner again or lose previously-granted tracking.
 */
export function getConsentInitScript(): string {
  return `(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  var stored = null;
  try {
    var match = document.cookie.match(/(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)/);
    if (match) {
      var parsed = JSON.parse(decodeURIComponent(match[1]));
      if (
        parsed &&
        parsed.v === "${CONSENT_VERSION}" &&
        typeof parsed.ts === "number" &&
        (Date.now() - parsed.ts) >= 0 &&
        (Date.now() - parsed.ts) < ${CONSENT_MAX_AGE_SECONDS * 1000}
      ) {
        stored = parsed;
      }
    }
  } catch (e) {}
  var analytics = stored ? !!stored.analytics : false;
  var marketing = stored ? !!stored.marketing : false;
  gtag('consent', 'default', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
    wait_for_update: 500
  });
  window.dataLayer.push({
    event: 'consent_initialized',
    necessary_consent: true,
    analytics_consent: analytics,
    marketing_consent: marketing,
    consent_version: '${CONSENT_VERSION}'
  });
  if (stored && (analytics || marketing) && !document.getElementById('${GTM_SCRIPT_ELEMENT_ID}')) {
    var f = document.getElementsByTagName('script')[0];
    var j = document.createElement('script');
    j.id = '${GTM_SCRIPT_ELEMENT_ID}';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';
    f.parentNode.insertBefore(j, f);
  }
})();`;
}

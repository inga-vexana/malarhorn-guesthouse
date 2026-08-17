/**
 * Client-only utility for preserving ad-attribution click IDs / UTM params
 * across the jump from our domain to the BookVisit booking engine.
 *
 * All access is guarded so it can never throw during SSR or in browsers
 * that block sessionStorage (e.g. private browsing).
 */

const BOOKING_BASE_URL =
  "https://online.bookvisit.com/accommodation?channelId=5780d487-02bc-4988-8121-30c65f421168";

const TRACKED_PARAMS = [
  "fbclid",
  "gclid",
  "ttclid",
  "msclkid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const STORAGE_PREFIX = "mh_";

/**
 * Reads tracking params from the current URL and saves any that are present
 * to sessionStorage, so they survive navigation between pages. An existing
 * stored value is never overwritten with an empty one.
 */
export function captureTrackingParams(): void {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);

    for (const key of TRACKED_PARAMS) {
      const value = params.get(key);
      if (value) {
        sessionStorage.setItem(`${STORAGE_PREFIX}${key}`, value);
      }
    }
  } catch {
    // sessionStorage unavailable (private browsing, disabled storage, etc.) — ignore.
  }
}

/**
 * Returns the BookVisit booking URL with any stored/current tracking params
 * appended, keeping the existing channelId param intact.
 */
export function getBookingUrl(): string {
  if (typeof window === "undefined") return BOOKING_BASE_URL;

  try {
    const url = new URL(BOOKING_BASE_URL);
    const currentParams = new URLSearchParams(window.location.search);

    for (const key of TRACKED_PARAMS) {
      const current = currentParams.get(key);
      const stored = current ? null : sessionStorage.getItem(`${STORAGE_PREFIX}${key}`);
      const value = current || stored;
      if (value) {
        url.searchParams.set(key, value);
      }
    }

    return url.toString();
  } catch {
    return BOOKING_BASE_URL;
  }
}

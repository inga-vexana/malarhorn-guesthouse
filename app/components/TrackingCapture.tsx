"use client";

import { useEffect } from "react";
import { captureTrackingParams } from "../lib/booking-url";

/**
 * Mounted once in the root layout so ad-attribution click IDs / UTM params
 * are captured into sessionStorage on every page load, not just the homepage.
 */
export default function TrackingCapture() {
  useEffect(() => {
    captureTrackingParams();
  }, []);

  return null;
}

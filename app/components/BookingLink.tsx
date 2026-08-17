"use client";

import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import { BOOKING_BASE_URL, getBookingUrl } from "../lib/booking-url";

type BookingLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  children: ReactNode;
};

/**
 * Renders the BookVisit booking link as a real anchor element.
 *
 * The server (and the first client render, to avoid a hydration mismatch)
 * always renders the plain base URL, which is a valid, clickable link on
 * its own. Once mounted, the href is swapped for the tracking-aware URL
 * from getBookingUrl(), which depends on sessionStorage/window.location and
 * can only be computed on the client.
 */
export function BookingLink({ children, ...props }: BookingLinkProps) {
  const [href, setHref] = useState<string>(BOOKING_BASE_URL);

  useEffect(() => {
    setHref(getBookingUrl());
  }, []);

  return (
    <a href={href} target="_blank" rel="noopener" {...props}>
      {children}
    </a>
  );
}

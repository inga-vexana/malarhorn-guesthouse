import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  INQUIRY_TYPES,
  LIMITS,
  validateContact,
  type ContactErrorCode,
  type ContactPayload,
  type InquiryType,
} from "../../lib/contact";

const RECIPIENT = "malarhorn@malarhornguesthouse.is";
const MIN_FILL_TIME_MS = 3000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const INQUIRY_LABELS: Record<InquiryType, string> = {
  group_quote: "Request a group quote / Óska eftir tilboði fyrir hóp",
  accommodation: "Accommodation / Gisting",
  boat_tour: "Grímsey Island boat tour / Sigling til Grímseyjar",
  other: "Other / Annað",
};

// Best-effort limiter: state lives per serverless instance, which is enough to blunt casual abuse.
const recentRequests = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recentRequests.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) {
    recentRequests.set(key, hits);
    return true;
  }
  hits.push(now);
  recentRequests.set(key, hits);
  return false;
}

function fail(error: ContactErrorCode, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: false, error, ...extra }, { status });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Collapses control characters so user input can never inject extra headers into the subject. */
function singleLine(value: string): string {
  return value.replace(/[\r\n\t\u0000-\u001f\u007f]+/g, " ").trim();
}

function text(value: unknown, max: number): string | null {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;
  return value.length > max * 2 ? null : value;
}

function parsePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;

  const name = text(b.name, LIMITS.name);
  const email = text(b.email, LIMITS.email);
  const phone = text(b.phone, LIMITS.phone);
  const guests = text(b.guests, LIMITS.guests);
  const dates = text(b.dates, LIMITS.dates);
  const message = text(b.message, LIMITS.message);
  const website = text(b.website, 200);
  const submissionId = text(b.submissionId, 100);
  if (
    name === null ||
    email === null ||
    phone === null ||
    guests === null ||
    dates === null ||
    message === null ||
    website === null ||
    submissionId === null
  ) {
    return null;
  }

  const rawInquiries = Array.isArray(b.inquiries) ? b.inquiries : [];
  const inquiries = INQUIRY_TYPES.filter((type) => rawInquiries.includes(type));

  const openedAt = typeof b.openedAt === "number" ? b.openedAt : 0;

  return { name, email, phone, inquiries, guests, dates, message, website, openedAt, submissionId };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("invalid_request", 400);
  }

  const payload = parsePayload(body);
  if (!payload) return fail("invalid_request", 400);

  // Bots tend to fill hidden fields or submit instantly. Pretend success so they learn nothing.
  const tooFast = Date.now() - payload.openedAt < MIN_FILL_TIME_MS;
  if (payload.website.trim() !== "" || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwarded || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(clientKey)) return fail("rate_limited", 429);

  const fieldErrors = validateContact(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return fail("invalid_request", 400, { fieldErrors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!apiKey || !domain) {
    console.error("Contact form: RESEND_API_KEY or RESEND_EMAIL_DOMAIN is not configured");
    return fail("send_failed", 500);
  }

  const name = singleLine(payload.name);
  const email = singleLine(payload.email);
  const phone = singleLine(payload.phone);
  const guests = singleLine(payload.guests);
  const dates = singleLine(payload.dates);
  const message = payload.message.trim();
  const includesGroup = payload.inquiries.includes("group_quote");
  const inquiryLabels = payload.inquiries.map((type) => INQUIRY_LABELS[type]);

  const rows: [string, string][] = [
    ["Full name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Inquiry type", inquiryLabels.length ? inquiryLabels.join(", ") : "Not specified"],
  ];
  if (includesGroup) {
    rows.push(["Number of guests", guests || "Not provided"]);
    rows.push(["Preferred dates", dates || "Not provided"]);
  }

  const plain = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1a1814;max-width:600px">
      <h2 style="font-weight:400;margin:0 0 16px">New website inquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:8px 12px 8px 0;color:#7a6a52;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="font-weight:400;margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escapeHtml(message)}</p>
    </div>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send(
    {
      from: `Malarhorn Website <contact@${domain}>`,
      to: [RECIPIENT],
      replyTo: email,
      subject: `New Website Inquiry – ${name}`,
      text: plain,
      html,
    },
    payload.submissionId ? { idempotencyKey: `contact-form/${payload.submissionId}` } : undefined,
  );

  if (error) {
    console.error("Contact form: Resend rejected the email", error.name, error.message);
    return fail("send_failed", 502);
  }

  return NextResponse.json({ ok: true });
}

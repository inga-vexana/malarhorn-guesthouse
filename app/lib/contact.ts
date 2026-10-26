export const INQUIRY_TYPES = ["group_quote", "accommodation", "boat_tour", "other"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  inquiries: InquiryType[];
  guests: string;
  dates: string;
  message: string;
  /** Honeypot: real visitors never see or fill this field. */
  website: string;
  /** Epoch ms when the form was first shown; used to reject instant bot submissions. */
  openedAt: number;
  /** Client-generated id, used as the Resend idempotency key so retries never double-send. */
  submissionId: string;
};

export type ContactErrorCode =
  | "name_required"
  | "email_required"
  | "email_invalid"
  | "phone_invalid"
  | "message_required"
  | "too_long"
  | "invalid_request"
  | "rate_limited"
  | "send_failed";

export const LIMITS = {
  name: 100,
  email: 200,
  phone: 40,
  guests: 50,
  dates: 200,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE_PATTERN = /^[+\d\s().-]{5,}$/;

export type FieldErrors = Partial<Record<"name" | "email" | "phone" | "message", ContactErrorCode>>;

/** Shared by the browser (instant feedback) and the API route (authoritative check). */
export function validateContact(
  input: Pick<ContactPayload, "name" | "email" | "phone" | "message">,
): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();

  if (!name) errors.name = "name_required";
  else if (name.length > LIMITS.name) errors.name = "too_long";

  if (!email) errors.email = "email_required";
  else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) errors.email = "email_invalid";

  if (phone && (phone.length > LIMITS.phone || !PHONE_PATTERN.test(phone))) {
    errors.phone = "phone_invalid";
  }

  if (!message) errors.message = "message_required";
  else if (message.length > LIMITS.message) errors.message = "too_long";

  return errors;
}

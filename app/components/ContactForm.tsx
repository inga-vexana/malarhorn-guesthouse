"use client";

import { useRef, useState } from "react";
import { useSafeLang } from "./LangContext";
import {
  INQUIRY_TYPES,
  LIMITS,
  validateContact,
  type ContactErrorCode,
  type FieldErrors,
  type InquiryType,
} from "../lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

const copy = {
  is: {
    name: "Nafn",
    email: "Netfang",
    phone: "Símanúmer",
    optional: "valfrjálst",
    help: "Hvað getum við aðstoðað þig með?",
    inquiries: {
      group_quote: "Óska eftir tilboði fyrir hóp",
      accommodation: "Gisting",
      other: "Annað",
    } as Record<InquiryType, string>,
    guests: "Fjöldi gesta",
    dates: "Áætlaðar dagsetningar",
    datesPlaceholder: "T.d. 12.–15. júní",
    message: "Skilaboð",
    submit: "Senda fyrirspurn",
    submitting: "Sendi…",
    successTitle: "Takk fyrir!",
    success:
      "Takk fyrir að hafa samband! Við höfum móttekið fyrirspurnina þína og svörum eins fljótt og auðið er.",
    errors: {
      name_required: "Vinsamlegast sláðu inn nafn.",
      email_required: "Vinsamlegast sláðu inn netfang.",
      email_invalid: "Netfangið virðist ekki vera rétt.",
      phone_invalid: "Símanúmerið virðist ekki vera rétt.",
      message_required: "Vinsamlegast skrifaðu skilaboð.",
      too_long: "Textinn er of langur.",
      invalid_request: "Ekki tókst að senda fyrirspurnina. Vinsamlegast athugaðu upplýsingarnar og reyndu aftur.",
      rate_limited: "Of margar tilraunir. Vinsamlegast reyndu aftur eftir nokkrar mínútur.",
      send_failed:
        "Ekki tókst að senda fyrirspurnina. Vinsamlegast reyndu aftur eða sendu okkur tölvupóst á malarhorn@malarhornguesthouse.is.",
    } as Record<ContactErrorCode, string>,
  },
  en: {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    optional: "optional",
    help: "What can we help you with?",
    inquiries: {
      group_quote: "Request a group quote",
      accommodation: "Accommodation",
      other: "Other",
    } as Record<InquiryType, string>,
    guests: "Number of guests",
    dates: "Preferred dates",
    datesPlaceholder: "e.g. 12–15 June",
    message: "Message",
    submit: "Send Inquiry",
    submitting: "Sending…",
    successTitle: "Thank you!",
    success:
      "Thank you for contacting us! We've received your inquiry and will get back to you as soon as possible.",
    errors: {
      name_required: "Please enter your name.",
      email_required: "Please enter your email address.",
      email_invalid: "Please enter a valid email address.",
      phone_invalid: "Please enter a valid phone number.",
      message_required: "Please write a message.",
      too_long: "This text is too long.",
      invalid_request: "We couldn't send your inquiry. Please check your details and try again.",
      rate_limited: "Too many attempts. Please try again in a few minutes.",
      send_failed:
        "We couldn't send your inquiry. Please try again or email us at malarhorn@malarhornguesthouse.is.",
    } as Record<ContactErrorCode, string>,
  },
};

const focusOnMount = (node: HTMLElement | null) => {
  node?.focus({ preventScroll: false });
};

export default function ContactForm() {
  const { lang } = useSafeLang();
  const t = copy[lang];

  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<ContactErrorCode | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [inquiries, setInquiries] = useState<InquiryType[]>([]);
  const openedAt = useRef(Date.now());
  const submissionId = useRef(crypto.randomUUID());

  const showGroupFields = inquiries.includes("group_quote");
  const submitting = status === "submitting";

  const toggleInquiry = (type: InquiryType) => {
    setInquiries((current) =>
      current.includes(type) ? current.filter((i) => i !== type) : [...current, type],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const data = new FormData(event.currentTarget);
    const read = (key: string) => String(data.get(key) ?? "");
    const values = {
      name: read("name"),
      email: read("email"),
      phone: read("phone"),
      message: read("message"),
    };

    const errors = validateContact(values);
    setFieldErrors(errors);
    setFormError(null);
    if (Object.keys(errors).length > 0) {
      setStatus("idle");
      const first = (["name", "email", "phone", "message"] as const).find((k) => errors[k]);
      if (first) (event.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          inquiries,
          guests: showGroupFields ? read("guests") : "",
          dates: showGroupFields ? read("dates") : "",
          website: read("website"),
          openedAt: openedAt.current,
          submissionId: submissionId.current,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: ContactErrorCode;
        fieldErrors?: FieldErrors;
      } | null;

      if (response.ok && result?.ok) {
        setStatus("success");
        return;
      }
      if (result?.fieldErrors) setFieldErrors(result.fieldErrors);
      setFormError(result?.error ?? "send_failed");
      setStatus("error");
    } catch {
      setFormError("send_failed");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="cf-success" role="status" tabIndex={-1} ref={focusOnMount}>
        <h3>{t.successTitle}</h3>
        <p>{t.success}</p>
      </div>
    );
  }

  const fieldError = (key: keyof FieldErrors) =>
    fieldErrors[key] ? (
      <p className="cf-error" id={`cf-${key}-error`}>
        {t.errors[fieldErrors[key] as ContactErrorCode]}
      </p>
    ) : null;

  const describedBy = (key: keyof FieldErrors) =>
    fieldErrors[key] ? `cf-${key}-error` : undefined;

  return (
    <form className="cf" onSubmit={handleSubmit} noValidate>
      <div className="cf-field">
        <label htmlFor="cf-name">
          {t.name} <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={LIMITS.name}
          aria-invalid={!!fieldErrors.name}
          aria-describedby={describedBy("name")}
          disabled={submitting}
        />
        {fieldError("name")}
      </div>

      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="cf-email">
            {t.email} <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={describedBy("email")}
            disabled={submitting}
          />
          {fieldError("email")}
        </div>
        <div className="cf-field">
          <label htmlFor="cf-phone">
            {t.phone} <span className="cf-opt">({t.optional})</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={describedBy("phone")}
            disabled={submitting}
          />
          {fieldError("phone")}
        </div>
      </div>

      <fieldset className="cf-field" disabled={submitting}>
        <legend>{t.help}</legend>
        <div className="cf-checks-list">
          {INQUIRY_TYPES.map((type) => (
            <label className="cf-check" key={type}>
              <input
                type="checkbox"
                checked={inquiries.includes(type)}
                onChange={() => toggleInquiry(type)}
              />
              <span>{t.inquiries[type]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {showGroupFields && (
        <div className="cf-row cf-group">
          <div className="cf-field">
            <label htmlFor="cf-guests">{t.guests}</label>
            <input
              id="cf-guests"
              name="guests"
              type="text"
              inputMode="numeric"
              maxLength={LIMITS.guests}
              disabled={submitting}
            />
          </div>
          <div className="cf-field">
            <label htmlFor="cf-dates">{t.dates}</label>
            <input
              id="cf-dates"
              name="dates"
              type="text"
              placeholder={t.datesPlaceholder}
              maxLength={LIMITS.dates}
              disabled={submitting}
            />
          </div>
        </div>
      )}

      <div className="cf-field">
        <label htmlFor="cf-message">
          {t.message} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={7}
          required
          maxLength={LIMITS.message}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={describedBy("message")}
          disabled={submitting}
        />
        {fieldError("message")}
      </div>

      <div className="cf-hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p className="cf-alert" role="alert">
          {t.errors[formError]}
        </p>
      )}

      <button type="submit" className="bp cf-submit" disabled={submitting} aria-busy={submitting}>
        {submitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}

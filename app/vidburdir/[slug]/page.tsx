"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "../../components/shared";
import { events_data, formatEventDate, pick } from "../../lib/constants";

// This route is Icelandic-only (there is no /en/vidburdir equivalent), so the
// locale is a fixed constant rather than derived from any client-side
// context. That keeps the server-rendered HTML and the initial client render
// byte-identical, with no possibility of a hydration mismatch.
const LANG = "is" as const;

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const event = events_data.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const backHref = "/vidburdir";
  const d = event.detail;

  return (
    <>
      <section className="evtDetailHero">
        {event.image ? (
          <Photo
            src={event.image}
            className="evtDetailImage"
          />
        ) : null}
        <div className="evtDetailHeroOverlay" />
      </section>

      <section className="evtDetailSection">
        <Link href={backHref} className="evtBack">
          &larr; Allir viðburðir
        </Link>

        <p className="evtDate evtDetailDate">
          {formatEventDate(event.startDate, LANG)}
          {event.endDate && event.endDate !== event.startDate
            ? ` – ${formatEventDate(event.endDate, LANG)}`
            : ""}
          {event.time ? ` · ${event.time}` : ""}
        </p>

        <h1 className="evtDetailTitle">{pick(event.title, LANG)}</h1>
        {event.subtitle ? (
          <p className="evtDetailSubtitle">{pick(event.subtitle, LANG)}</p>
        ) : null}
        {event.location ? (
          <p className="evtLocation evtDetailLocation">{event.location}</p>
        ) : null}

        {d?.intro ? (
          <div className="evtDetailProse">
            {d.intro.map((p, i) => (
              <p key={i}>{pick(p, LANG)}</p>
            ))}
          </div>
        ) : null}

        {d?.forWhomList ? (
          <div className="evtDetailBlock">
            {d.forWhomTitle ? (
              <h2 className="evtDetailBlockTitle">{pick(d.forWhomTitle, LANG)}</h2>
            ) : null}
            {d.forWhomIntro ? (
              <p className="evtDetailBlockIntro">{pick(d.forWhomIntro, LANG)}</p>
            ) : null}
            <ul className="evtDetailList">
              {d.forWhomList.map((item, i) => (
                <li key={i}>{pick(item, LANG)}</li>
              ))}
            </ul>
            {d.forWhomOutro ? (
              <p className="evtDetailBlockOutro">{pick(d.forWhomOutro, LANG)}</p>
            ) : null}
          </div>
        ) : null}

        {d?.includedList ? (
          <div className="evtDetailBlock">
            {d.includedTitle ? (
              <h2 className="evtDetailBlockTitle">{pick(d.includedTitle, LANG)}</h2>
            ) : null}
            <ul className="evtDetailList">
              {d.includedList.map((item, i) => (
                <li key={i}>{pick(item, LANG)}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {d?.priceList ? (
          <div className="evtDetailBlock evtDetailPriceBlock">
            {d.priceTitle ? (
              <h2 className="evtDetailBlockTitle">{pick(d.priceTitle, LANG)}</h2>
            ) : null}
            <ul className="evtDetailPriceList">
              {d.priceList.map((item, i) => (
                <li key={i}>{pick(item, LANG)}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {d?.closing ? (
          <p className="evtDetailClosing">{pick(d.closing, LANG)}</p>
        ) : null}

        <div className="evtDetailCta">
          {d?.bookingEmail ? (
            <p className="evtDetailBookingText evtDetailBookingTextLg">
              Bókanir og frekari upplýsingar: {d.bookingEmail}
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}

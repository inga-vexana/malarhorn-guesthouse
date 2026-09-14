"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useSafeLang } from "../../components/LangContext";
import { Photo } from "../../components/shared";
import { BookingLink } from "../../components/BookingLink";
import { events_data, formatEventDate, pick } from "../../lib/constants";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { lang } = useSafeLang();
  const is = lang === "is";
  const event = events_data.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const backHref = is ? "/vidburdir" : "/en/vidburdir";
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
          &larr; {is ? "Allir viðburðir" : "All events"}
        </Link>

        <p className="evtDate evtDetailDate">
          {formatEventDate(event.startDate, lang)}
          {event.endDate && event.endDate !== event.startDate
            ? ` – ${formatEventDate(event.endDate, lang)}`
            : ""}
          {event.time ? ` · ${event.time}` : ""}
        </p>

        <h1 className="evtDetailTitle">{pick(event.title, lang)}</h1>
        {event.subtitle ? (
          <p className="evtDetailSubtitle">{pick(event.subtitle, lang)}</p>
        ) : null}
        {event.location ? (
          <p className="evtLocation evtDetailLocation">{event.location}</p>
        ) : null}

        {d?.intro ? (
          <div className="evtDetailProse">
            {d.intro.map((p, i) => (
              <p key={i}>{pick(p, lang)}</p>
            ))}
          </div>
        ) : null}

        {d?.forWhomList ? (
          <div className="evtDetailBlock">
            {d.forWhomTitle ? (
              <h2 className="evtDetailBlockTitle">{pick(d.forWhomTitle, lang)}</h2>
            ) : null}
            {d.forWhomIntro ? (
              <p className="evtDetailBlockIntro">{pick(d.forWhomIntro, lang)}</p>
            ) : null}
            <ul className="evtDetailList">
              {d.forWhomList.map((item, i) => (
                <li key={i}>{pick(item, lang)}</li>
              ))}
            </ul>
            {d.forWhomOutro ? (
              <p className="evtDetailBlockOutro">{pick(d.forWhomOutro, lang)}</p>
            ) : null}
          </div>
        ) : null}

        {d?.includedList ? (
          <div className="evtDetailBlock">
            {d.includedTitle ? (
              <h2 className="evtDetailBlockTitle">{pick(d.includedTitle, lang)}</h2>
            ) : null}
            <ul className="evtDetailList">
              {d.includedList.map((item, i) => (
                <li key={i}>{pick(item, lang)}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {d?.priceList ? (
          <div className="evtDetailBlock evtDetailPriceBlock">
            {d.priceTitle ? (
              <h2 className="evtDetailBlockTitle">{pick(d.priceTitle, lang)}</h2>
            ) : null}
            <ul className="evtDetailPriceList">
              {d.priceList.map((item, i) => (
                <li key={i}>{pick(item, lang)}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {d?.closing ? (
          <p className="evtDetailClosing">{pick(d.closing, lang)}</p>
        ) : null}

        <div className="evtDetailCta">
          {d?.bookingEmail ? (
            <p className="evtDetailBookingText">
              {is ? "Bókanir og frekari upplýsingar:" : "Bookings and further information:"}{" "}
              <a href={`mailto:${d.bookingEmail}`} className="evtEmptyLink">
                {d.bookingEmail}
              </a>
            </p>
          ) : null}
          <BookingLink className="bp">
            {is ? "Bóka gistingu" : "Book your stay"}
          </BookingLink>
        </div>
      </section>
    </>
  );
}

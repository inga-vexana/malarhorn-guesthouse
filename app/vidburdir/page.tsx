"use client";

import Link from "next/link";
import { useSafeLang } from "../components/LangContext";
import { PageHeader, Photo } from "../components/shared";
import { BookingLink } from "../components/BookingLink";
import { events_data, formatEventDate, pick } from "../lib/constants";

export default function EventsPage() {
  const { lang } = useSafeLang();
  const is = lang === "is";
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events_data
    .filter((e) => (e.endDate ?? e.startDate) >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  return (
    <>
      <PageHeader
        eyebrow={is ? "Á Malarhorni" : "At Malarhorn"}
        title={is ? "Viðburðir" : "Events"}
        text={
          is
            ? "Fylgstu með því sem er í gangi á Malarhorni — frá árstíðabundnum viðburðum til sérstakra kvölda í Malarkaffi."
            : "Keep up with what's happening at Malarhorn — from seasonal happenings to special evenings at Malarkaffi."
        }
      />

      <section className="evtSection">
        {upcoming.length === 0 ? (
          <div className="evtEmpty">
            <p className="evtEmptyTitle">
              {is
                ? "Engir viðburðir eru skráðir í augnablikinu"
                : "No events are currently scheduled"}
            </p>
            <p className="evtEmptyText">
              {is
                ? "Við erum alltaf að skipuleggja eitthvað nýtt. Kíktu við aftur síðar eða hafðu samband við okkur til að fá nýjustu fréttir af viðburðum á Malarhorni."
                : "We're always planning something new. Check back soon, or get in touch with us for the latest news on events at Malarhorn."}
            </p>
            <a href="mailto:info@malarhorn.is" className="evtEmptyLink">
              info@malarhorn.is
            </a>
          </div>
        ) : (
          <div className="evtGrid">
            {upcoming.map((e) => {
              const href = is ? `/vidburdir/${e.slug}` : `/en/vidburdir/${e.slug}`;
              return (
                <article className="evtCard" key={e.id}>
                  {e.image ? (
                    <Link href={href} className="evtImageLink" aria-label={pick(e.title, lang)}>
                      <Photo src={e.image} className="evtImage" />
                    </Link>
                  ) : null}
                  <div className="evtCardBody">
                    <p className="evtDate">
                      {formatEventDate(e.startDate, lang)}
                      {e.endDate && e.endDate !== e.startDate
                        ? ` – ${formatEventDate(e.endDate, lang)}`
                        : ""}
                      {e.time ? ` · ${e.time}` : ""}
                    </p>
                    <h2 className="evtTitle">
                      <Link href={href} className="evtTitleLink">
                        {pick(e.title, lang)}
                      </Link>
                    </h2>
                    <p className="evtDesc">{pick(e.description, lang)}</p>
                    {e.location ? (
                      <p className="evtLocation">{e.location}</p>
                    ) : null}
                    <Link href={href} className="evtMore">
                      {is ? "Skoða viðburð" : "View event"} &rarr;
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="evtCta">
          <p className="evtCtaText">
            {is
              ? "Viltu tryggja þér gistingu fyrir næsta viðburð?"
              : "Want to secure a room for an upcoming event?"}
          </p>
          <BookingLink className="bp">
            {is ? "Bóka gistingu" : "Book your stay"}
          </BookingLink>
        </div>
      </section>
    </>
  );
}

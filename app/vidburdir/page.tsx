import Link from "next/link";
import { PageHeader, Photo } from "../components/shared";
import { events_data, formatEventDate, pick } from "../lib/constants";

// This page is Icelandic-only by design (there is no /en/vidburdir route),
// so it renders a fixed "is" locale rather than deriving language from any
// client-side context. That guarantees the server-rendered HTML and the
// initial client render are byte-identical, with no possibility of a
// hydration mismatch.
const LANG = "is" as const;

export default function EventsPage() {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events_data
    .filter((e) => (e.endDate ?? e.startDate) >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  return (
    <>
      <PageHeader
        eyebrow="Á Malarhorni"
        title="Viðburðir"
        text="Fylgstu með því sem er í gangi á Malarhorni."
      />

      <section className="evtSection">
        {upcoming.length === 0 ? (
          <div className="evtEmpty">
            <p className="evtEmptyTitle">
              Engir viðburðir eru skráðir í augnablikinu
            </p>
            <p className="evtEmptyText">
              Við erum alltaf að skipuleggja eitthvað nýtt. Kíktu við aftur
              síðar eða hafðu samband við okkur til að fá nýjustu fréttir af
              viðburðum á Malarhorni.
            </p>
            <a href="mailto:info@malarhorn.is" className="evtEmptyLink">
              info@malarhorn.is
            </a>
          </div>
        ) : (
          <div className="evtGrid">
            {upcoming.map((e) => {
              const href = `/vidburdir/${e.slug}`;
              return (
                <article className="evtCard" key={e.id}>
                  {e.image ? (
                    <Link href={href} className="evtImageLink" aria-label={pick(e.title, LANG)}>
                      <Photo src={e.image} className="evtImage" />
                    </Link>
                  ) : null}
                  <div className="evtCardBody">
                    <p className="evtDate">
                      {formatEventDate(e.startDate, LANG)}
                      {e.endDate && e.endDate !== e.startDate
                        ? ` – ${formatEventDate(e.endDate, LANG)}`
                        : ""}
                      {e.time ? ` · ${e.time}` : ""}
                    </p>
                    <h2 className="evtTitle">
                      <Link href={href} className="evtTitleLink">
                        {pick(e.title, LANG)}
                      </Link>
                    </h2>
                    <p className="evtDesc">{pick(e.description, LANG)}</p>
                    {e.location ? (
                      <p className="evtLocation">{e.location}</p>
                    ) : null}
                    <Link href={href} className="evtMore">
                      Skoða viðburð &rarr;
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

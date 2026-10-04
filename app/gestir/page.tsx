"use client";

import Link from "next/link";
import { useSafeLang } from "../components/LangContext";
import { GuestSection } from "../components/shared";
import { BookingLink } from "../components/BookingLink";

const LOGO = "/Untitled-200-x-200-px.png";

export default function GuestPage() {
  const { lang } = useSafeLang();
  const is = lang === "is";

  return (
    <>
      <section className="gst-hero">
        <img src={LOGO} alt="Malarhorn" />
        <h1>{is ? "Velkomin á Malarhorn" : "Welcome to Malarhorn"}</h1>
        <p>Grundargata 17 · 520 Drangsnes</p>
      </section>
      <div className="gst-body">
        <GuestSection
          title="WiFi"
          rows={[
            [is ? "Netfang" : "Network", "Malarhorn"],
            [is ? "Lykilorð" : "Password", "borealis"],
          ]}
        />
        <GuestSection
          title={is ? "Morgunmatur" : "Breakfast"}
          note={
            is
              ? "Morgunverður er ekki í boði eins og er og er aðeins í boði yfir sumartímann."
              : "Breakfast is currently unavailable and is only offered during the summer season."
          }
          rows={[
            [
              is ? "Staða" : "Status",
              is ? "Ekki í boði eins og er" : "Currently unavailable",
            ],
            [
              is ? "Tímabil" : "Season",
              is ? "Aðeins yfir sumartímann" : "Summer only",
            ],
          ]}
        />
        <GuestSection
          title={is ? "Heitir pottar" : "Hot Tubs"}
          note={
            is
              ? "Rétt við sjávarsíðuna með útsýni yfir Grímsey. Ókeypis og alltaf opið."
              : "Right on the shoreline with views of Grímsey. Always open and free of charge; a small donation is appreciated."
          }
          rows={[
            [is ? "Opnunartími" : "Open", is ? "Alltaf opið" : "Always open"],
            [is ? "Aðgangur" : "Entry", is ? "Ókeypis" : "Free of charge"],
          ]}
        />
        <GuestSection
          title={is ? "Sundlaug" : "Swimming Pool"}
          rows={[
            [
              is ? "Vetraropnun" : "Winter hours",
              is
                ? "Þriðjudaga, miðvikudaga og föstudaga 15:00 - 18:00"
                : "Tuesdays, Wednesdays and Fridays 15:00 - 18:00",
            ],
            [
              is ? "Helgaropnun (vetur)" : "Weekends (winter)",
              is
                ? "Laugardaga og sunnudaga 13:00 - 17:00"
                : "Saturdays and Sundays 13:00 - 17:00",
            ],
            [
              is ? "Sumartími" : "Summer season",
              is
                ? "Hefst í byrjun júní og er til miðjan eða lok ágúst"
                : "Starts in early June and runs until mid or late August",
            ],
            [
              is ? "Sumaropnun" : "Summer hours",
              is ? "Alla daga 11:00 - 18:00" : "Every day 11:00 - 18:00",
            ],
          ]}
        />
        <GuestSection
          title={is ? "Siglingar til Grímsey" : "Sailing to Grímsey"}
          note={
            is
              ? "Bátsferðirnar út í Grímsey eru aðeins í boði yfir sumartímann (júní–ágúst). Ekki er siglt utan þess tímabils."
              : "Boat trips to Grímsey are only available during the summer season (June–August). There are no sailings outside this period."
          }
          rows={[
            [
              is ? "Tímabil" : "Season",
              is ? "15. júní til miðjan ágúst" : "June 15 to mid August",
            ],
            [
              is ? "Mætingarstaður" : "Meeting point",
              is ? "Bryggjan á Drangsnesi" : "Drangsnes harbour",
            ],
          ]}
        />
        <GuestSection
          title="Mini Market"
          note={
            is
              ? "Smá dagverslun á Drangsnesi."
              : "A small local mini market in Drangsnes."
          }
          rows={[
            [
              is ? "Vetraropnun" : "Winter hours",
              is
                ? "Alla virka daga 09:30 - 10:30 og 13:00 - 18:00"
                : "Weekdays 09:30 - 10:30 and 13:00 - 18:00",
            ],
            [
              is ? "Helgar (vetur)" : "Weekends (winter)",
              is ? "Lokað" : "Closed",
            ],
            [
              is ? "Sumaropnun" : "Summer hours",
              is
                ? "Mánudaga - fimmtudaga 09:00 - 18:00"
                : "Monday - Thursday 09:00 - 18:00",
            ],
            [
              is ? "Föstudagar (sumar)" : "Fridays (summer)",
              "09:00 - 19:00",
            ],
            [
              is ? "Laugardagar (sumar)" : "Saturdays (summer)",
              "11:00 - 15:00",
            ],
            [
              is ? "Sunnudagar (sumar)" : "Sundays (summer)",
              is ? "Lokað" : "Closed",
            ],
          ]}
        />
        <GuestSection
          title={is ? "Inn- og útskráning" : "Check-in & Check-out"}
          rows={[
            [is ? "Innritun" : "Check-in", is ? "Frá kl. 15:00" : "From 15:00"],
            [is ? "Útritun" : "Check-out", is ? "Fyrir kl. 11:00" : "Before 11:00"],
            [is ? "Sími" : "Phone", "+354 461-4345"],
          ]}
        />
        <GuestSection
          title={is ? "Neyðarnúmer" : "Emergency Numbers"}
          rows={[["Malarhorn", "+354 896-0337 or +354 896-8837"]]}
        />
        <section className="gst-section">
          <h2>{is ? "Staðsetning" : "Location"}</h2>
          <p className="gst-note">
            Grundargata 17, 520 Drangsnes
            {is ? ", Vestfirðir, Ísland" : ", Westfjords, Iceland"}
          </p>
        </section>
        <BookingLink className="gst-bk bp">
          {is ? "Bóka næstu gistingu" : "Book your next stay"}
        </BookingLink>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useLang } from "../components/LangContext";
import { GuestSection } from "../components/shared";
import { BV_BOOK } from "../lib/constants";

const LOGO = "/Untitled-200-x-200-px.png";

export default function GuestPage() {
  const { lang } = useLang();
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
          rows={[
            [is ? "Tími" : "Time", "08:00 - 10:00"],
            [
              is ? "Staður" : "Location",
              is ? "Malarkaffi, sama bygging" : "Malarkaffi, same building",
            ],
            [
              is ? "Innifalið" : "Included",
              is ? "Já, innifalið í gistingu" : "Yes, included in your stay",
            ],
          ]}
        />
        <GuestSection
          title={is ? "Heitir pottar" : "Hot Tubs"}
          note={
            is
              ? "Rétt við sjávarsíðuna með útsýni yfir Grímsey. Ókeypis og alltaf opið."
              : "Right on the shoreline with views of Grimsey. Always open and free of charge; a small donation is appreciated."
          }
          rows={[
            [is ? "Opnunartími" : "Open", is ? "Alltaf opið" : "Always open"],
            [is ? "Aðgangur" : "Entry", is ? "Ókeypis" : "Free of charge"],
          ]}
        />
        <GuestSection
          title={is ? "Sundlaug" : "Swimming Pool"}
          rows={[[is ? "Opnunartími" : "Open", "11:00 - 18:00"]]}
        />
        <GuestSection
          title={is ? "Siglingar til Grímsey" : "Sailing to Grimsey"}
          note={
            is
              ? "Við bjóðum upp á þrjár leiðsagðar ferðir til Grímsey. Bókaðu beint við móttökuna eða sendu okkur tölvupóst."
              : "We offer three guided tours to Grimsey island. Book directly at reception or get in touch."
          }
          rows={[
            [
              is ? "Sjóævintýrið" : "Sea Safari",
              is ? "1 klukkustund · 8.900 kr." : "1 hour · ISK 8,900",
            ],
            [
              is ? "Grímseyjarupplifun" : "Wildlife Tour",
              is ? "2 klukkustundir · 13.900 kr." : "2 hours · ISK 13,900",
            ],
            [
              is ? "Lundaganga" : "Puffin Walk",
              is ? "3 klukkustundir · 18.900 kr." : "3 hours · ISK 18,900",
            ],
            [
              is ? "Tímabil" : "Season",
              is ? "15. júní til miðjan ágúst" : "June 15 to mid August",
            ],
            [
              is ? "Mætingarstaður" : "Meeting point",
              is ? "Drangsneshöfn" : "Drangsnes harbour",
            ],
          ]}
          action={{
            onClick: () => (window.location.href = "/sailing"),
            text: is ? "Bóka siglingu" : "Book tour",
          }}
        />
        <GuestSection
          title="Mini Market"
          note={
            is
              ? "Smá dagverslun á Drangsnesi."
              : "A small local mini market in Drangsnes."
          }
          rows={[
            [is ? "Sumar" : "Summer", "09:00 - 18:00"],
            [
              is ? "Vetur" : "Winter",
              `09:30 - 10:30 ${is ? "og" : "and"} 13:00 - 17:00`,
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
        <button className="gst-bk bp" onClick={() => window.open(BV_BOOK, "_blank")}>
          {is ? "Bóka næstu gistingu" : "Book your next stay"}
        </button>
      </div>
    </>
  );
}

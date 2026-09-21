"use client";

import { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { useSafeLang } from "./components/LangContext";
import { Photo } from "./components/shared";
import { images, addDays } from "./lib/constants";
import { BookingLink } from "./components/BookingLink";

type SearchParams = {
  arrival: string;
  departure: string;
  adults: number;
  children: number;
  promoCode: string;
};

const BASE_URL = "https://www.malarhorn.is";

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${BASE_URL}/#lodging`,
  name: "Malarhorn Guesthouse",
  alternateName: "Malarhorn",
  url: BASE_URL,
  description:
    "Malarhorn Guesthouse is nestled in the peaceful fishing village of Drangsnes in the Westfjords, surrounded by breathtaking nature and beautiful sea views. Choose from cosy double and twin rooms, spacious family rooms or fully equipped apartments. During the summer, guests can enjoy breakfast, dine at Malarkaffi and explore the area on scenic boat tours. The geothermal swimming pool and seaside hot tubs are just a short walk away.",
  image: [
    `${BASE_URL}${images.stayDine}`,
    `${BASE_URL}${images.about}`,
    `${BASE_URL}${images.guesthouse}`,
    `${BASE_URL}${images.hotPots}`,
  ],
  telephone: "+3544614345",
  email: "malarhorn@malarhornguesthouse.is",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Grundargata 17",
    postalCode: "520",
    addressLocality: "Drangsnes",
    addressRegion: "Westfjords",
    addressCountry: "IS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 65.689684,
    longitude: -21.435367,
  },
  checkinTime: "15:00",
  checkoutTime: "11:00",
  hasMap: "https://www.google.com/maps/search/?api=1&query=Grundargata+17%2C+520+Drangsnes%2C+Iceland",
  sameAs: [
    "https://www.facebook.com/profile.php?id=100063630351484",
    "https://www.instagram.com/malarhornguesthouse/",
    "https://www.tiktok.com/@malarhorn",
    "https://www.youtube.com/@MalarhornGuesthouse",
    "https://www.rednote.com/user/profile/6a83afdb000000000301d20d",
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://online.bookvisit.com/accommodation?channelId=5780d487-02bc-4988-8121-30c65f421168",
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "LodgingReservation",
      name: "Book accommodation at Malarhorn Guesthouse",
    },
  },
};

export default function HomePage() {
  const { lang } = useSafeLang();
  const is = lang === "is";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="hero">
        <div className="ht">
          <span className="htag">{is ? "Vestfirðir, Ísland" : "Westfjords, Iceland"}</span>
          <h1>
            {is ? "Velkomin á" : "Welcome to"}
            <br />
            <em>Malarhorn</em>
            <br />
            Guesthouse
          </h1>
          <p className="hd">
            {is
              ? "Friðsæll staður þar sem hafið, fjöllin og náttúran skapa einstaka upplifun í hjarta Strandanna."
              : "A peaceful retreat where the ocean, mountains and nature create a truly unique experience in the Strandir region."}
          </p>
          <div className="ctas">
            <BookingLink className="bp">{is ? "Bóka herbergi" : "Book room"}</BookingLink>
          </div>
          <div className="hst">
            <div>
              <div className="sn">5</div>
              <div className="snl">{is ? "Gistimöguleikar" : "Room types"}</div>
            </div>
            <div>
              <div className="sn">3</div>
              <div className="snl">{is ? "Heitir pottar skammt frá" : "Hot pots nearby"}</div>
            </div>
            <div>
              <div className="sn">2008</div>
              <div className="snl">{is ? "Stofnað" : "Est."}</div>
            </div>
          </div>
        </div>
        <div className="him">
          <div className="himg">
            <video autoPlay muted loop playsInline>
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hbg">
            <div className="hbt">{is ? "Strandir · Vestfirðir" : "Drangsnes · Strandir"}</div>
            <div className="hbs">{is ? "Ísland" : "Westfjords"}</div>
          </div>
        </div>
      </section>

      <section className="sv">
        <div className="sg">
          {[
            [
              is ? "/gisting" : "/accommodation",
              is ? "Gisting" : "Accommodation",
              is
                ? "Þægileg herbergi og íbúðir með útsýni yfir hafið."
                : "Comfortable rooms and apartments with ocean views.",
            ],
            [
              is ? "/veitingastadur" : "/restaurant",
              is ? "Veitingastaður" : "Restaurant",
              is
                ? "Ferskt íslenskt hráefni í hlýu andrúmslofti."
                : "Fresh local cuisine in a warm atmosphere.",
              is ? "Aðeins á sumrin, lokar 30. september" : "Summer season only, closes September 30",
            ],
            [
              is ? "/siglingar" : "/sailing",
              is ? "Siglingar" : "Sailing",
              is
                ? "Ævintýrasigling út í Grímsey."
                : "Explore the Westfjords on an unforgettable adventure.",
              is ? "Aðeins á sumrin" : "Summer season only",
            ],
          ].map(([href, title, text, seasonTag]) => (
            <Link className="sc" key={href} href={href}>
              <h3>{title}</h3>
              <p>{text}</p>
              {seasonTag && <span className="sct">{seasonTag}</span>}
              <span className="scl">{is ? "Frekari upplýsingar →" : "Learn more →"}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="ab">
        <div className="ai">
          <div className="aw">
            <Photo src={images.about} />
            <div className="af">
              <div className="afn">2008</div>
              <div className="afl">{is ? "Stofnað" : "Est."}</div>
            </div>
          </div>
          <div className="at">
            <p className="ey">{is ? "Staður fyrir þig" : "A place for you"}</p>
            <h2 className="st">{is ? "Meira en bara gisting" : "More than a place to stay"}</h2>
            <div className="dv" />
            <p>
              {is
                ? "Á Malarhorni færðu rólega dvöl í einstöku umhverfi, persónulega þjónustu og aðgang að náttúrulífi sem fæst varla annars staðar."
                : "At Malarhorn, you get more than a place to stay: a peaceful retreat, personal service, and access to nature you will hardly find anywhere else."}
            </p>
            <ul className="cl">
              {(is
                ? [
                    "Stórkostlegt útsýni yfir haf og fjöll",
                    "Stutt ganga að heitu pottunum",
                    "Siglingar til Grímsey",
                    "Ferskur matur úr íslenskum hráefnum",
                    "Persónuleg þjónusta í sjávarþorpi",
                  ]
                : [
                    "Stunning ocean and mountain views",
                    "Short walk to the Drangsnes hot pots",
                    "Sailing trips to Grímsey island",
                    "Fresh, locally inspired restaurant",
                    "Personal service in a seaside village",
                  ]
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <BookingLink className="bp">{is ? "Bóka gistingu" : "Book your stay"}</BookingLink>
          </div>
        </div>
      </section>

      <section className="hp">
        <div className="hpi">
          <div className="hpt">
            <p className="ey">{is ? "Slökun við sjóinn" : "Local attraction"}</p>
            <h2 className="st">
              {is ? "Upplifðu heitu pottana á Drangsnesi" : "Drangsnes hot pots by the ocean"}
            </h2>
            <div className="dv" />
            <p>
              {is
                ? "Heitu pottarnir á Drangsnesi bjóða upp á einstaka slökun við sjávarsíðuna með útsýni yfir hafið og Grímsey."
                : "The hot pots in Drangsnes are set right on the shoreline with uninterrupted views of the ocean and Grímsey island."}
            </p>
            <BookingLink className="bp">{is ? "Bóka gistingu" : "Book your stay"}</BookingLink>
          </div>
          <Photo src={images.hotPots} />
        </div>
      </section>
    </>
  );
}

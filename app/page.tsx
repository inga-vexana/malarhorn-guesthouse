"use client";

import { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { useLang } from "./components/LangContext";
import { Photo } from "./components/shared";
import { BV_BOOK, images, addDays } from "./lib/constants";

type SearchParams = {
  arrival: string;
  departure: string;
  adults: number;
  children: number;
  promoCode: string;
};

export default function HomePage() {
  const { lang } = useLang();
  const is = lang === "is";

  return (
    <>
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
            <button className="bp" onClick={() => window.open(BV_BOOK, "_blank")}>
              {is ? "Bóka herbergi" : "Book room"}
            </button>
            <style>{`
              #bokun_d38dbce3_2050_4f22_839c_044b2b887d68 {
                display: inline-block;
                padding: 1.1rem 2.8rem;
                background: transparent;
                border: 1px solid #1a1814;
                border-radius: 0;
                box-shadow: none;
                font-family: Jost, Arial, sans-serif;
                font-weight: 500;
                font-size: 0.72rem;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                text-decoration: none;
                text-align: center;
                color: #1a1814;
                cursor: pointer;
                transition: background 0.25s, color 0.25s;
                white-space: nowrap;
              }
              #bokun_d38dbce3_2050_4f22_839c_044b2b887d68:hover {
                background: #1a1814;
                color: #faf7f2;
              }
            `}</style>
            <Script
              src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=96789794-5a10-4ca1-96e4-8190ad1ff7fb"
              strategy="lazyOnload"
            />
            <button
              className="bokunButton"
              id="bokun_d38dbce3_2050_4f22_839c_044b2b887d68"
              data-src="https://widgets.bokun.io/online-sales/96789794-5a10-4ca1-96e4-8190ad1ff7fb/product-list/109538?partialView=1"
              data-testid="widget-book-button"
            >
              {is ? "Bóka siglingu" : "Book tour"}
            </button>
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
              "/accommodation",
              is ? "Gisting" : "Accommodation",
              is
                ? "Þægileg herbergi og íbúðir með útsýni yfir hafið."
                : "Comfortable rooms and apartments with ocean views.",
            ],
            [
              "/restaurant",
              is ? "Veitingastaður" : "Restaurant",
              is
                ? "Ferskt íslenskt hráefni í hlýu andrúmslofti. Opið aðeins á sumrin."
                : "Fresh local cuisine in a warm atmosphere. Open in summer.",
            ],
            [
              "/sailing",
              is ? "Siglingar" : "Sailing",
              is
                ? "Ævintýrasigling út í Grímsey."
                : "Explore the Westfjords on an unforgettable adventure.",
            ],
          ].map(([href, title, text]) => (
            <Link className="sc" key={href} href={href}>
              <h3>{title}</h3>
              <p>{text}</p>
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
                    "Sailing trips to Grimsey island",
                    "Fresh, locally inspired restaurant",
                    "Personal service in a seaside village",
                  ]
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button className="bp" onClick={() => window.open(BV_BOOK, "_blank")}>
              {is ? "Bóka gistingu" : "Book your stay"}
            </button>
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
                : "The hot pots in Drangsnes are set right on the shoreline with uninterrupted views of the ocean and Grimsey island."}
            </p>
            <button className="bp" onClick={() => window.open(BV_BOOK, "_blank")}>
              {is ? "Bóka gistingu" : "Book your stay"}
            </button>
          </div>
          <Photo src={images.hotPots} />
        </div>
      </section>
    </>
  );
}

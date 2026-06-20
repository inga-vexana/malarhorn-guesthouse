"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
import Script from "next/script";
const LOGO =
  "https://malarhornguesthouse.is/wp-content/uploads/Untitled-200-x-200-px.png";
const MENU = "https://malarhornguesthouse.is/wp-content/uploads/Matsedill-Malarhorn.pdf";

type Lang = "en" | "is";
type Page = "home" | "accommodation" | "restaurant" | "sailing" | "about" | "guest" | "booking";

type BookingRoom = {
  id: string;
  name: string;
  description: string;
  image?: string;
  available: number;
  price: number | null;
  currency: string;
  rateName?: string | null;
  hitKey?: string | null;
  size?: string | null;
  maxGuests?: number | null;
};

type BookingSearchResponse = {
  configured?: boolean;
  bookingUrl: string;
  resultId?: string;
  message?: string;
  error?: string;
  alerts?: string[];
  rooms: BookingRoom[];
};

type BookingStep = "search" | "rooms" | "guest" | "paying" | "confirmed";

type SearchParams = {
  arrival: string;
  departure: string;
  adults: number;
  children: number;
  promoCode: string;
};

type GuestInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requests: string;
};

const translations = {
  en: {
    book: "Book Now",
    footerDescription: "A peaceful seaside retreat in Drangsnes, Iceland.",
    find: "Find Us",
    contact: "Get in Touch",
    guest: "Guest Info",
    nav: [
      ["home", "Home"],
      ["accommodation", "Accommodation"],
      ["restaurant", "Restaurant"],
      ["sailing", "Sailing"],
      ["about", "Malarhorn"],
    ] as [Page, string][],
  },
  is: {
    book: "Bóka Gistingu",
    footerDescription: "Friðsæll staður við sjávarsíðuna á Drangsnesi, Ísland.",
    find: "Hvar erum við",
    contact: "Hafðu samband",
    guest: "Gestaupplýsingar",
    nav: [
      ["home", "Heim"],
      ["accommodation", "Gisting"],
      ["restaurant", "Veitingastaður"],
      ["sailing", "Sigling til Grímsey"],
      ["about", "Malarhorn"],
    ] as [Page, string][],
  },
};

const images = {
  about: "https://malarhornguesthouse.is/wp-content/uploads/IMG_0529-1-scaled.jpg",
  hotPots: "https://malarhornguesthouse.is/wp-content/uploads/IMG_8748-scaled.jpeg",
  restaurant:
    "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-68-scaled.jpg",
  sailing: "https://malarhornguesthouse.is/wp-content/uploads/Untitled-design-14.png",
  guesthouse: "https://malarhornguesthouse.is/wp-content/uploads/Untitled-design-12.png",
  stayDine:
    "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg",
  unwind: "https://malarhornguesthouse.is/wp-content/uploads/6-10.png",
};

const BV = "https://images.bookvisit.com/img/";
const BV_BOOK = "https://online.bookvisit.com/accommodation?channelId=5780d487-02bc-4988-8121-30c65f421168";

const rooms_data = {
  en: [
    {
      type: "Family",
      name: "Family Room",
      text: "Spacious 27 m² ground-floor room with double bed, single bed and bunk bed for up to 5 guests.",
      tags: ["27 m²", "Up to 5 guests", "Sea view", "Ground floor"],
      imgs: [`${BV}5473107d-6caa-40f0-83ba-f877244230d0.jpg`, `${BV}899ec191-7515-4021-8ac8-1cde319b8fcf.jpg`, `${BV}3b1d468c-674e-48fb-b5e6-7397334727a5.jpg`],
      featured: true,
    },
    {
      type: "Standard",
      name: "Standard Double Room with Private Bathroom",
      text: "Bright 28 m² room on the 2nd floor with double and single bed, sea view and private bathroom.",
      tags: ["28 m²", "Up to 3 guests", "Sea view", "Private bathroom"],
      imgs: [`${BV}d6cfeb13-7e00-40fb-91bc-57814a501fb0.jpg`, `${BV}988fc3e8-444f-42a0-bef7-2d68c124c148.jpg`, `${BV}17d06c2c-453a-48ca-bfb8-35f5dc2ef747.jpg`],
    },
    {
      type: "Classic",
      name: "Double Room with Private Bathroom",
      text: "Cozy 17 m² room with wooden-clad walls, private bathroom and sea view. Ideal for couples.",
      tags: ["17 m²", "Up to 2 guests", "Sea view", "Private bathroom"],
      imgs: [`${BV}af29ddd1-811f-4d85-8cab-889b95d37bd4.jpg`, `${BV}d8f82eb0-99f0-4069-95c2-7d14808dc587.jpg`, `${BV}51994990-6272-4daf-a59b-c668a33c2b27.jpg`],
    },
    {
      type: "Superior",
      name: "Superior Double Room with Terrace",
      text: "28 m² ground-floor room with double bed, private terrace and sea views.",
      tags: ["28 m²", "Up to 2 guests", "Private terrace", "Sea view"],
      imgs: [`${BV}4f177dcc-2ac9-47fa-a8e7-2aef8ef55992.jpg`, `${BV}112cce01-c569-4916-9267-2796fbfcf949.jpg`, `${BV}4edc5876-30b5-424c-8694-3fef65204d01.jpg`],
    },
    {
      type: "Twin Room",
      name: "Twin Room with Shared Bathroom",
      text: "Compact and cozy 6 m² room with two single beds and shared bathroom. Perfect for budget travellers.",
      tags: ["6 m²", "Up to 2 guests", "Shared bathroom", "Sea view"],
      imgs: [`${BV}8ade4c7a-9f0a-40a8-b01b-d9b78858a7a1.jpg`, `${BV}503ff220-f973-48cb-ba00-474c5491f476.jpg`, `${BV}da7f1371-a74d-4b1b-ac16-5aaf7f15a63f.jpg`],
    },
    {
      type: "Apartment",
      name: "Two-Bedroom Apartment",
      text: "Fully equipped apartment with two bedrooms, kitchen, living room and dining area. Ideal for groups.",
      tags: ["2 bedrooms", "Up to 6 guests", "Full kitchen", "Living room"],
      imgs: [`${BV}a39c468b-49d1-445c-9307-1b764eb7e8fc.jpg`, `${BV}aa36fbed-0668-4b69-b4e2-46a7dca3aa8f.jpg`, `${BV}a1fa3987-9ec4-4400-acf9-c3affb7ddb23.jpg`],
    },
  ],
  is: [
    {
      type: "Fjölskylda",
      name: "Fjölskylduherbergi",
      text: "Rúmgott 27 m² herbergi á jarðhæð með tvöföldu rúmi, einbreið rúmi og koju fyrir allt að 5 gesti.",
      tags: ["27 m²", "Allt að 5 gestir", "Sjávarútsýni", "Jarðhæð"],
      imgs: [`${BV}5473107d-6caa-40f0-83ba-f877244230d0.jpg`, `${BV}899ec191-7515-4021-8ac8-1cde319b8fcf.jpg`, `${BV}3b1d468c-674e-48fb-b5e6-7397334727a5.jpg`],
      featured: true,
    },
    {
      type: "Standard",
      name: "Standard tveggja manna herbergi með einkabaðherbergi",
      text: "Bjart 28 m² herbergi á 2. hæð með tvöföldu rúmi og einbreið rúmi, sjávarútsýni og einkabaðherbergi.",
      tags: ["28 m²", "Allt að 3 gestir", "Sjávarútsýni", "Einkabaðherbergi"],
      imgs: [`${BV}d6cfeb13-7e00-40fb-91bc-57814a501fb0.jpg`, `${BV}988fc3e8-444f-42a0-bef7-2d68c124c148.jpg`, `${BV}17d06c2c-453a-48ca-bfb8-35f5dc2ef747.jpg`],
    },
    {
      type: "Hefðbundið",
      name: "Tveggja manna herbergi með einkabaðherbergi",
      text: "Hlýlegt 17 m² herbergi með viðarklæddum veggjum, einkabaðherbergi og sjávarútsýni. Tilvalið fyrir pör.",
      tags: ["17 m²", "Allt að 2 gestir", "Sjávarútsýni", "Einkabaðherbergi"],
      imgs: [`${BV}af29ddd1-811f-4d85-8cab-889b95d37bd4.jpg`, `${BV}d8f82eb0-99f0-4069-95c2-7d14808dc587.jpg`, `${BV}51994990-6272-4daf-a59b-c668a33c2b27.jpg`],
    },
    {
      type: "Superior",
      name: "Superior tveggja manna herbergi með verönd",
      text: "28 m² herbergi á jarðhæð með tvöföldu rúmi, einkaveröndinni og sjávarútsýni.",
      tags: ["28 m²", "Allt að 2 gestir", "Einkaverönd", "Sjávarútsýni"],
      imgs: [`${BV}4f177dcc-2ac9-47fa-a8e7-2aef8ef55992.jpg`, `${BV}112cce01-c569-4916-9267-2796fbfcf949.jpg`, `${BV}4edc5876-30b5-424c-8694-3fef65204d01.jpg`],
    },
    {
      type: "Tveggja manna",
      name: "Tveggja manna herbergi með sameiginlegu baðherbergi",
      text: "Þægilegt 6 m² herbergi með tveimur einbreið rúmum og sameiginlegu baðherbergi. Tilvalið fyrir ferðamann.",
      tags: ["6 m²", "Allt að 2 gestir", "Sameiginlegt baðherbergi", "Sjávarútsýni"],
      imgs: [`${BV}8ade4c7a-9f0a-40a8-b01b-d9b78858a7a1.jpg`, `${BV}503ff220-f973-48cb-ba00-474c5491f476.jpg`, `${BV}da7f1371-a74d-4b1b-ac16-5aaf7f15a63f.jpg`],
    },
    {
      type: "Íbúð",
      name: "Tveggja svefnherbergja íbúð",
      text: "Fullbúin íbúð með tveimur svefnherbergjum, eldhúsi, stofu og borðstofu. Tilvalið fyrir hópa.",
      tags: ["2 svefnherbergi", "Allt að 6 gestir", "Fullbúið eldhús", "Stofa"],
      imgs: [`${BV}a39c468b-49d1-445c-9307-1b764eb7e8fc.jpg`, `${BV}aa36fbed-0668-4b69-b4e2-46a7dca3aa8f.jpg`, `${BV}a1fa3987-9ec4-4400-acf9-c3affb7ddb23.jpg`],
    },
  ],
};

function Photo({ src, className = "" }: { src: string; className?: string }) {
  return <div className={`photo ${className}`} style={{ backgroundImage: `url("${src}")` }} />;
}

export default function MalarhornPage() {
const [lang, setLang] = useState<Lang>("en");
const [page, setPage] = useState<Page>("home");
const { data: heroVideoData } = useSWR<{ url: string | null }>("/api/hero-video", fetcher);
  const [pendingSearch, setPendingSearch] = useState<SearchParams | null>(null);
  const [preferredRoom, setPreferredRoom] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.hash === "#guest") setPage("guest");
  }, []);

  const t = translations[lang];
  const goTo = (nextPage: Page) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookFromHome = (params: SearchParams) => {
    setPendingSearch(params);
    setPreferredRoom(null);
    goTo("booking");
  };

  const handleBookRoom = (roomIdx: number) => {
    setPreferredRoom(rooms_data.en[roomIdx].name);
    goTo("booking");
  };

  const content = useMemo(() => {
    switch (page) {
      case "accommodation":
        return <Accommodation lang={lang} goTo={goTo} onBookRoom={handleBookRoom} />;
      case "restaurant":
        return <Restaurant lang={lang} />;
      case "sailing":
        return <Sailing lang={lang} />;
      case "about":
        return <About lang={lang} goTo={goTo} />;
      case "guest":
        return <GuestInfo lang={lang} goTo={goTo} />;
      case "booking":
        return <BookingPage lang={lang} initialSearch={pendingSearch ?? undefined} preferredRoom={preferredRoom ?? undefined} />;
      default:
        return <Home lang={lang} goTo={goTo} onBook={handleBookFromHome} />;
    }
  }, [lang, page, pendingSearch, preferredRoom]);

  return (
    <>
      <nav className="nav">
        <button className="logo" onClick={() => goTo("home")} aria-label="Malarhorn home">
          <img src={LOGO} alt="Malarhorn" />
        </button>
        <ul className="nl">
          {t.nav.map(([key, label]) => (
            <li key={key}>
              {key === "restaurant" ? (
                <button
                  className={`navLinkButton ${page === key ? "on" : ""}`}
                  onClick={() => goTo(key)}
                >
                  {label}
                </button>
              ) : key === "about" ? (
                <>
                  <button
                    className={`navLinkButton ${page === key ? "on" : ""}`}
                    onClick={() => goTo(key)}
                  >
                    {label}
                  </button>
                  <div className="drop">
                    <button onClick={() => goTo("about")}>{label}</button>
                    <button onClick={() => goTo("guest")}>{t.guest}</button>
                  </div>
                </>
              ) : (
                <button
                  className={`navLinkButton ${page === key ? "on" : ""}`}
                  onClick={() => goTo(key)}
                >
                  {label}
                </button>
              )}
            </li>
          ))}
        </ul>
        <div className="nr">
          <div className="lgt" aria-label="Language">
            <button className={`lb ${lang === "en" ? "on" : ""}`} onClick={() => setLang("en")}>
              EN
            </button>
            <button className={`lb ${lang === "is" ? "on" : ""}`} onClick={() => setLang("is")}>
              IS
            </button>
          </div>
          <button className="bkbtn" onClick={() => window.open(BV_BOOK, "_blank")}>
            {t.book}
          </button>
        </div>
      </nav>

      <main>{content}</main>

      <footer>
        <div className="fgd">
          <div className="fb">
            <img src="/logo-dark.png" alt="Malarhorn" className="footer-logo" />
            <p>{t.footerDescription}</p>
          </div>
          <div className="fc">
            <h4>{t.find}</h4>
            <p>Grundargata 17</p>
            <p>520 Drangsnes, Iceland</p>
          </div>
          <div className="fc">
            <h4>{t.contact}</h4>
            <p className="ft-label">{lang === "en" ? "Reception (08:00–21:00)" : "Móttaka (08:00–21:00)"}</p>
            <a href="tel:+3544614345">+354 461 4345</a>
            <p className="ft-label">{lang === "en" ? "24/7 Assistance" : "Aðstoð utan opnunartíma"}</p>
            <a href="tel:+3544192801">+354 419 2801</a>
            <a href="mailto:malarhorn@malarhornguesthouse.is">
              malarhorn@malarhornguesthouse.is
            </a>
          </div>
        </div>
        <div className="fb2">
          <p>&copy; 2026 Malarhorn Guesthouse</p>
          <div className="fso">
            <a href="https://www.facebook.com/profile.php?id=100063630351484" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://www.instagram.com/malarhornguesthouse/" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function Home({ lang, goTo, onBook }: { lang: Lang; goTo: (page: Page) => void; onBook: (p: SearchParams) => void }) {
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
            <button
              className="bokunButton bs"
              id="bokun_acf4a461_fba1_498b_827d_3a67889b1ee3"
              data-src="https://widgets.bokun.io/online-sales/96789794-5a10-4ca1-96e4-8190ad1ff7fb/product-list/109538?partialView=1"
              data-testid="widget-book-button"
            >
              {is ? "Bóka siglingu" : "Book sailing"}
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
            {heroVideoData?.url ? (
              <video autoPlay muted loop playsInline key={heroVideoData.url}>
                <source src={heroVideoData.url} type="video/mp4" />
              </video>
            ) : (
              <div className="heroVideoPlaceholder" />
            )}
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
            ["accommodation", "", is ? "Gisting" : "Accommodation", is ? "Þægileg herbergi og íbúðir með útsýni yfir hafið." : "Comfortable rooms and apartments with ocean views."],
            ["restaurant", "", is ? "Veitingastaður" : "Restaurant", is ? "Ferskt íslenskt hráefni í hlýu andrúmslofti. Opið aðeins á sumrin." : "Fresh local cuisine in a warm atmosphere. Open in summer."],
            ["sailing", "", is ? "Siglingar" : "Sailing", is ? "Ævintýrasigling út í Grímsey." : "Explore the Westfjords on an unforgettable adventure."],
          ].map(([target, , title, text]) => (
            <button className="sc" key={target} onClick={() => goTo(target as Page)}>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="scl">{is ? "Frekari upplýsingar →" : "Learn more →"}</span>
            </button>
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
                ? ["Stórkostlegt útsýni yfir haf og fjöll", "Stutt ganga að heitu pottunum", "Siglingar til Grímsey", "Ferskur matur úr íslenskum hráefnum", "Persónuleg þjónusta í sjávarþorpi"]
                : ["Stunning ocean and mountain views", "Short walk to the Drangsnes hot pots", "Sailing trips to Grimsey island", "Fresh, locally inspired restaurant", "Personal service in a seaside village"]
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

function HomeBookingWidget({ lang, onBook }: { lang: Lang; onBook: (p: SearchParams) => void }) {
  const is = lang === "is";
  const [arrival, setArrival] = useState(addDays(14));
  const [departure, setDeparture] = useState(addDays(15));
  const [adults, setAdults] = useState(2);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="hwid"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        onBook({ arrival, departure, adults, children: 0, promoCode: "" });
      }}
    >
      <div className="hwidField">
        <label htmlFor="hw-arrival">{is ? "Koma" : "Check in"}</label>
        <input
          id="hw-arrival"
          type="date"
          min={addDays(0)}
          value={arrival}
          onChange={(e) => {
            setArrival(e.target.value);
            if (departure <= e.target.value) setDeparture(addDays(1));
          }}
          required
        />
      </div>
      <div className="hwidField">
        <label htmlFor="hw-departure">{is ? "Brottför" : "Check out"}</label>
        <input
          id="hw-departure"
          type="date"
          min={arrival}
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          required
        />
      </div>
      <button className="hwidBtn" type="submit" disabled={loading}>
        {loading ? "..." : is ? "Leita" : "Search"}
      </button>
    </form>
  );
}

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}


function BookingPage({ lang, initialSearch, preferredRoom }: { lang: Lang; initialSearch?: SearchParams; preferredRoom?: string }) {
  const is = lang === "is";
  const [step, setStep] = useState<BookingStep>("search");
  const [searchParams, setSearchParams] = useState<SearchParams>(
    initialSearch ?? { arrival: addDays(14), departure: addDays(15), adults: 2, children: 0, promoCode: "" },
  );
  const didAutoSearch = useRef(false);
  const [rooms, setRooms] = useState<BookingRoom[]>([]);
  const [resultId, setResultId] = useState<string>("");
  const [bookingUrl, setBookingUrl] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<BookingRoom | null>(null);
  const [searchStatus, setSearchStatus] = useState<"idle" | "loading" | "error">("idle");
  const [searchError, setSearchError] = useState<string>("");
  const [payStatus, setPayStatus] = useState<"idle" | "loading" | "error">("idle");
  const [payError, setPayError] = useState<string>("");
  const [confirmedCode, setConfirmedCode] = useState<string>("");
  const [paymentHtml, setPaymentHtml] = useState<string>("");
  const [paymentIframeUrl, setPaymentIframeUrl] = useState<string>("");

  useEffect(() => {
    if (initialSearch && !didAutoSearch.current) {
      didAutoSearch.current = true;
      void handleSearch(initialSearch);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSearch(params: SearchParams) {
    setSearchStatus("loading");
    setSearchError("");
    setSearchParams(params);
    try {
      const response = await fetch("/api/bookvisit/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const data = (await response.json()) as BookingSearchResponse;
      if (!response.ok) {
        setSearchError(data.error ?? (is ? "Villa við leit" : "Search failed"));
        setSearchStatus("error");
        return;
      }
      setRooms(data.rooms);
      setResultId(data.resultId ?? "");
      setBookingUrl(data.bookingUrl);
      setSearchStatus("idle");
      if (preferredRoom) {
        const keyword = preferredRoom.split(" ")[0].toLowerCase();
        const match = data.rooms.find((r) => r.name.toLowerCase().includes(keyword));
        if (match) {
          setSelectedRoom(match);
          setStep("guest");
          return;
        }
      }
      setStep("rooms");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSearchError(is ? "Tenging mistókst" : "Connection failed");
      setSearchStatus("error");
    }
  }

  function handleSelectRoom(room: BookingRoom) {
    setSelectedRoom(room);
    setPayError("");
    setPayStatus("idle");
    setStep("guest");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCheckout(guest: GuestInfo) {
    if (!selectedRoom?.hitKey || !resultId) {
      window.location.href = bookingUrl;
      return;
    }
    setPayStatus("loading");
    setPayError("");
    try {
      const response = await fetch("/api/bookvisit/basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultId, hitKey: selectedRoom.hitKey, guest }),
      });
      const data = (await response.json()) as {
        paymentUrl?: string;
        thirdPartyHtml?: string;
        confirmed?: boolean;
        bookingCode?: string;
        error?: string;
      };
      if (!response.ok || data.error) {
        setPayError(data.error ?? (is ? "Bókun mistókst" : "Booking failed"));
        setPayStatus("error");
        return;
      }
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      } else if (data.thirdPartyHtml) {
        setPaymentHtml(data.thirdPartyHtml);
        setPaymentIframeUrl("");
        setStep("paying");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (data.confirmed) {
        setConfirmedCode(data.bookingCode ?? "");
        setStep("confirmed");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setPayError(is ? "Engin staðfesting fékkst" : "No confirmation received");
        setPayStatus("error");
      }
    } catch {
      setPayError(is ? "Tenging mistókst" : "Connection failed");
      setPayStatus("error");
    }
  }

  const nights =
    step !== "search" && searchParams.arrival && searchParams.departure
      ? Math.max(
          1,
          Math.round(
            (new Date(searchParams.departure).getTime() - new Date(searchParams.arrival).getTime()) /
              86400000,
          ),
        )
      : 0;

  return (
    <>
      <BookingProgressBar step={step} is={is} />

      {step === "search" && (
        <BookingSearchStep
          lang={lang}
          initial={searchParams}
          status={searchStatus}
          error={searchError}
          onSearch={handleSearch}
        />
      )}

      {step === "rooms" && (
        <BookingRoomsStep
          lang={lang}
          rooms={rooms}
          nights={nights}
          searchParams={searchParams}
          bookingUrl={bookingUrl}
          onSelect={handleSelectRoom}
          onBack={() => setStep("search")}
        />
      )}

      {step === "guest" && selectedRoom && (
        <BookingGuestStep
          lang={lang}
          room={selectedRoom}
          nights={nights}
          searchParams={searchParams}
          status={payStatus}
          error={payError}
          onSubmit={handleCheckout}
          onBack={() => setStep("rooms")}
        />
      )}

      {step === "paying" && (
        <div className="bkPayOverlay">
          <button className="bkPayOverlayBack" onClick={() => setStep("guest")}>
            ← {is ? "Til baka" : "Back"}
          </button>
          {paymentHtml ? (
            <div
              className="bkPayInline"
              dangerouslySetInnerHTML={{ __html: paymentHtml }}
            />
          ) : paymentIframeUrl ? (
            <iframe
              src={paymentIframeUrl}
              className="bkPayIframe"
              title={is ? "Greiðsla" : "Payment"}
              allow="payment"
            />
          ) : null}
        </div>
      )}

      {step === "confirmed" && selectedRoom && (
        <BookingConfirmedStep
          lang={lang}
          room={selectedRoom}
          nights={nights}
          searchParams={searchParams}
          bookingCode={confirmedCode}
        />
      )}
    </>
  );
}

function BookingProgressBar({ step, is }: { step: BookingStep; is: boolean }) {
  const steps = [
    { key: "search", label: is ? "Dagsetningar" : "Dates" },
    { key: "rooms", label: is ? "Herbergi" : "Rooms" },
    { key: "guest", label: is ? "Upplýsingar" : "Details" },
    { key: "paying", label: is ? "Greiðsla" : "Payment" },
    { key: "confirmed", label: is ? "Staðfest" : "Confirmed" },
  ] as const;
  const current = steps.findIndex((s) => s.key === step);
  return (
    <div className="bkProgress">
      {steps.map((s, i) => (
        <div key={s.key} className={`bkProgressStep ${i <= current ? "bkProgressActive" : ""}`}>
          <div className="bkProgressDot">{i < current ? "✔" : i + 1}</div>
          <span>{s.label}</span>
          {i < steps.length - 1 && <div className="bkProgressLine" />}
        </div>
      ))}
    </div>
  );
}

function BookingSearchStep({
  lang,
  initial,
  status,
  error,
  onSearch,
}: {
  lang: Lang;
  initial: SearchParams;
  status: "idle" | "loading" | "error";
  error: string;
  onSearch: (p: SearchParams) => void;
}) {
  const is = lang === "is";
  const [arrival, setArrival] = useState(initial.arrival);
  const [departure, setDeparture] = useState(initial.departure);
  const [adults, setAdults] = useState(initial.adults);
  const [children, setChildren] = useState(initial.children);
  const [promoCode, setPromoCode] = useState(initial.promoCode);

  return (
    <section className="bkSection">
      <div className="bkInner">
        <p className="ey">{is ? "Bóka gistingu" : "Book your stay"}</p>
        <h1 className="st">{is ? "Veldu dagsetningar" : "Choose your dates"}</h1>
        <div className="dv" />
        <form
          className="bkSearchForm"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch({ arrival, departure, adults, children, promoCode });
          }}
        >
          <div className="bkField">
            <label htmlFor="bk-arrival">{is ? "Koma" : "Arrival"}</label>
            <input
              id="bk-arrival"
              type="date"
              min={addDays(0)}
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              required
            />
          </div>
          <div className="bkField">
            <label htmlFor="bk-departure">{is ? "Brottför" : "Departure"}</label>
            <input
              id="bk-departure"
              type="date"
              min={arrival}
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              required
            />
          </div>
          <div className="bkField">
            <label htmlFor="bk-adults">{is ? "Fullorðnir" : "Adults"}</label>
            <input
              id="bk-adults"
              type="number"
              min="1"
              max="8"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              required
            />
          </div>
          <div className="bkField">
            <label htmlFor="bk-children">{is ? "Börn" : "Children"}</label>
            <input
              id="bk-children"
              type="number"
              min="0"
              max="6"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
            />
          </div>
          <div className="bkField bkFieldWide">
            <label htmlFor="bk-promo">{is ? "Kynningarkóði" : "Promo code"}</label>
            <input
              id="bk-promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder={is ? "Valfrjálst" : "Optional"}
            />
          </div>
          <button className="bp bkSubmit" type="submit" disabled={status === "loading"}>
            {status === "loading"
              ? is ? "Leitar..." : "Searching..."
              : is ? "Leita að herbergjum" : "Search rooms"}
          </button>
        </form>
        {error && <p className="bkError">{error}</p>}
      </div>
    </section>
  );
}

function BookingConfirmedStep({
  lang,
  room,
  nights,
  searchParams,
  bookingCode,
}: {
  lang: Lang;
  room: BookingRoom;
  nights: number;
  searchParams: SearchParams;
  bookingCode: string;
}) {
  const is = lang === "is";
  return (
    <section className="bkSection">
      <div className="bkInner">
        <div className="bkConfirmed">
          <div className="bkConfirmedIcon">✔</div>
          <h1>{is ? "Bókun staðfest!" : "Booking confirmed!"}</h1>
          {bookingCode && (
            <p className="bkConfirmedCode">
              {is ? "Bókunarnúmer" : "Booking reference"}:{" "}
              <strong>{bookingCode}</strong>
            </p>
          )}
          <div className="bkSummaryCard" style={{ marginTop: "2rem", textAlign: "left" }}>
            {room.image && (
              <div className="bkSummaryImg" style={{ backgroundImage: `url("${room.image}")` }} />
            )}
            <div className="bkSummaryInfo">
              <p className="ey">{is ? "Herbergi" : "Room"}</p>
              <h3>{room.name}</h3>
              <p className="bkSummaryDates">
                {new Date(searchParams.arrival).toLocaleDateString(is ? "is-IS" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}
                {" – "}
                {new Date(searchParams.departure).toLocaleDateString(is ? "is-IS" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}
                {" · "}
                {nights} {is ? (nights === 1 ? "nótt" : "nætur") : nights === 1 ? "night" : "nights"}
              </p>
            </div>
          </div>
          <p className="bkConfirmedNote">
            {is
              ? "Við hlökkum til að taka á móti þér á Malarhorni. Staðfesting hefur verið send á netfangið þitt."
              : "We look forward to welcoming you to Malarhorn. A confirmation has been sent to your email."}
          </p>
        </div>
      </div>
    </section>
  );
}

function BookingRoomsStep({
  lang,
  rooms,
  nights,
  searchParams,
  bookingUrl,
  onSelect,
  onBack,
}: {
  lang: Lang;
  rooms: BookingRoom[];
  nights: number;
  searchParams: SearchParams;
  bookingUrl: string;
  onSelect: (room: BookingRoom) => void;
  onBack: () => void;
}) {
  const is = lang === "is";
  return (
    <section className="bkSection">
      <div className="bkInner">
        <button className="bkBack" onClick={onBack}>
          ← {is ? "Breyta dagsetningum" : "Change dates"}
        </button>
        <p className="ey">
          {nights} {is ? (nights === 1 ? "nótt" : "nætur") : nights === 1 ? "night" : "nights"} ·{" "}
          {new Date(searchParams.arrival).toLocaleDateString(is ? "is-IS" : "en-GB", { day: "numeric", month: "short" })}
          {" – "}
          {new Date(searchParams.departure).toLocaleDateString(is ? "is-IS" : "en-GB", { day: "numeric", month: "short" })}
          {" · "}
          {searchParams.adults} {is ? "fullorðnir" : "adults"}
          {searchParams.children ? `, ${searchParams.children} ${is ? "börn" : "children"}` : ""}
        </p>
        <h1 className="st">{is ? "Veldu herbergi" : "Choose your room"}</h1>
        <div className="dv" />

        {rooms.length === 0 ? (
          <div className="bkEmpty">
            <p>{is ? "Engin herbergi laus á völdum dagsetningum." : "No rooms available for the selected dates."}</p>
            <a href={bookingUrl} className="rl" target="_blank" rel="noreferrer">
              {is ? "Skoða á Bookvisit" : "View on Bookvisit"}
            </a>
          </div>
        ) : (
          <div className="bkRooms">
            {rooms.map((room) => {
              const localList = is ? rooms_data.is : rooms_data.en;
              const local = localList.find((r) => room.name.toLowerCase().includes(r.name.split(" ")[0].toLowerCase()));
              const desc = local?.text ?? room.description;
              const tags = local?.tags ?? [];
              const pricePerNight = room.price && nights > 0 ? Math.round(room.price / nights) : null;
              return (
                <article className="bkRoom" key={room.id}>
                  {room.image && (
                    <div className="bkRoomImg" style={{ backgroundImage: `url("${room.image}")` }} />
                  )}
                  <div className="bkRoomBody">
                    {tags.length > 0 && (
                      <div className="bkRoomMeta">
                        {tags.map((tag) => <span className="ch" key={tag}>{tag}</span>)}
                      </div>
                    )}
                    <h2 className="bkRoomName">{room.name}</h2>
                    {desc && <p className="bkRoomDesc">{desc}</p>}
                    <div className="bkRoomFooter">
                      <div className="bkRoomPrice">
                        {room.price ? (
                          <>
                            <span className="bkPriceAmount">
                              {Math.round(room.price).toLocaleString()} {room.currency}
                            </span>
                            <span className="bkPriceLabel">
                              {is ? `/ ${nights} nætur` : `/ ${nights} nights`}
                              {pricePerNight && ` · ${pricePerNight.toLocaleString()} ${room.currency} ${is ? "/ nótt" : "/ night"}`}
                            </span>
                          </>
                        ) : (
                          <span className="bkPriceAmount">{is ? "Verð á eftir" : "Price on request"}</span>
                        )}
                      </div>
                      <button className="bp bpsm" onClick={() => onSelect(room)}>
                        {is ? "Velja herbergi" : "Select room"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function BookingGuestStep({
  lang,
  room,
  nights,
  searchParams,
  status,
  error,
  onSubmit,
  onBack,
}: {
  lang: Lang;
  room: BookingRoom;
  nights: number;
  searchParams: SearchParams;
  status: "idle" | "loading" | "error";
  error: string;
  onSubmit: (g: GuestInfo) => void;
  onBack: () => void;
}) {
  const is = lang === "is";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");

  return (
    <section className="bkSection">
      <div className="bkInner">
        <button className="bkBack" onClick={onBack}>
          ← {is ? "Velja annað herbergi" : "Choose different room"}
        </button>

        <div className="bkSummaryCard">
          {room.image && (
            <div className="bkSummaryImg" style={{ backgroundImage: `url("${room.image}")` }} />
          )}
          <div className="bkSummaryInfo">
            <p className="ey">{is ? "Valið herbergi" : "Selected room"}</p>
            <h3>{room.name}</h3>
            <p className="bkSummaryDates">
              {new Date(searchParams.arrival).toLocaleDateString(is ? "is-IS" : "en-GB", { day: "numeric", month: "long" })}
              {" – "}
              {new Date(searchParams.departure).toLocaleDateString(is ? "is-IS" : "en-GB", { day: "numeric", month: "long" })}
              {" · "}
              {nights} {is ? (nights === 1 ? "nótt" : "nætur") : nights === 1 ? "night" : "nights"}
              {" · "}
              {searchParams.adults} {is ? "fullorðnir" : "adults"}
            </p>
            {room.price && (
              <p className="bkSummaryPrice">
                {Math.round(room.price).toLocaleString()} {room.currency}
              </p>
            )}
          </div>
        </div>

        <h1 className="st" style={{ marginTop: "2rem" }}>
          {is ? "Upplýsingar um gesti" : "Guest details"}
        </h1>
        <div className="dv" />

        <form
          className="bkGuestForm"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ firstName, lastName, email, phone, requests });
          }}
        >
          <div className="bkGuestRow">
            <div className="bkField">
              <label htmlFor="bk-fname">{is ? "Fornafn" : "First name"}</label>
              <input
                id="bk-fname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={is ? "Fornafnið þitt" : "Your first name"}
                required
              />
            </div>
            <div className="bkField">
              <label htmlFor="bk-lname">{is ? "Eftirnafn" : "Last name"}</label>
              <input
                id="bk-lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={is ? "Eftirnafnið þitt" : "Your last name"}
                required
              />
            </div>
          </div>
          <div className="bkField bkFieldWide">
            <label htmlFor="bk-email">{is ? "Tölvupóstur" : "Email"}</label>
            <input
              id="bk-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="bkField bkFieldWide">
            <label htmlFor="bk-phone">{is ? "Sími" : "Phone"}</label>
            <input
              id="bk-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+354..."
              required
            />
          </div>
          <div className="bkField bkFieldWide">
            <label htmlFor="bk-requests">{is ? "Sérstakar óskir" : "Special requests"}</label>
            <textarea
              id="bk-requests"
              value={requests}
              onChange={(e) => setRequests(e.target.value)}
              placeholder={is ? "Valfrjálst" : "Optional"}
              rows={3}
            />
          </div>

          {error && <p className="bkError">{error}</p>}

          <button className="bp bkSubmit" type="submit" disabled={status === "loading"}>
            {status === "loading"
              ? is ? "Tengist greiðslukerfi..." : "Connecting to payment..."
              : is ? "Halda áfram í greiðslu →" : "Continue to payment →"}
          </button>
          <p className="bkSecureNote">
            {is ? "Örugg greiðsla í gegnum Bookvisit" : "Secure payment via Bookvisit"}
          </p>
        </form>
      </div>
    </section>
  );
}

function RoomCarousel({ imgs }: { imgs: string[] }) {
  const [idx, setIdx] = useState(0);
  if (imgs.length === 0) return null;
  const prev = () => setIdx((i) => (i - 1 + imgs.length) % imgs.length);
  const next = () => setIdx((i) => (i + 1) % imgs.length);
  return (
    <div className="rcar">
      <div className="rp" style={{ backgroundImage: `url("${imgs[idx]}")` }} />
      {imgs.length > 1 && (
        <>
          <button className="rcarBtn rcarPrev" onClick={prev} aria-label="Previous">&#8249;</button>
          <button className="rcarBtn rcarNext" onClick={next} aria-label="Next">&#8250;</button>
          <div className="rcarDots">
            {imgs.map((_, i) => (
              <button
                key={i}
                className={`rcarDot ${i === idx ? "rcarDotOn" : ""}`}
                onClick={() => setIdx(i)}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

type RoomEntry = typeof rooms_data.en[number];

function RoomDetail({ room, lang, onBook }: { room: RoomEntry; lang: Lang; goTo: (p: Page) => void; onClose: () => void; onBook: () => void }) {
  const is = lang === "is";
  return (
    <div className="rdet">
      <div className="rdetInner">
        <div className="rdetImg">
          <RoomCarousel imgs={room.imgs} />
        </div>
        <div className="rdetInfo">
          <div className="rty">{room.type}</div>
          <h2 className="rn" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>{room.name}</h2>
          <p className="rd" style={{ marginBottom: "1.2rem" }}>{room.text}</p>
          <div className="chs" style={{ marginBottom: "1.8rem" }}>
            {room.tags.map((tag) => (
              <span className="ch" key={tag}>{tag}</span>
            ))}
          </div>
          <button className="bp" onClick={() => window.open(BV_BOOK, "_blank")}>
            {is ? "Bóka núna" : "Book now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Accommodation({ lang, goTo, onBookRoom }: { lang: Lang; goTo: (page: Page) => void; onBookRoom: (idx: number) => void }) {
  const is = lang === "is";
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = rooms_data[lang][selectedIdx];

  return (
    <>
      <PageHeader
        eyebrow={is ? "Gisting við hafið" : "Stay with us"}
        title={is ? "Gisting" : "Accommodation"}
        text={
          is
            ? "Frá notalegum tveggja manna herbergjum til rúmgóðra fjölskylduíbúða."
            : "From cozy twin rooms to spacious family apartments, every space at Malarhorn is warm and welcoming."
        }
      />

      <RoomDetail room={selected} lang={lang} goTo={goTo} onClose={() => {}} onBook={() => onBookRoom(selectedIdx)} />

      <section className="sec">
        <div className="si2">
          <div className="rg rg6">
            {rooms_data[lang].map((room, i) => (
              <article
                className={`rc sm${selectedIdx === i ? " rcSel" : ""}`}
                key={room.name}
                onClick={() => setSelectedIdx(i)}
                style={{ cursor: "pointer" }}
              >
                <RoomCarousel imgs={room.imgs} />
                <div className="rb">
                  <div className="rty">{room.type}</div>
                  <h2 className="rn">{room.name}</h2>
                  <p className="rd">{room.text}</p>
                  <div className="chs">
                    {room.tags.map((tag) => (
                      <span className="ch" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button className="bp bpsm" onClick={(e) => { e.stopPropagation(); window.open(BV_BOOK, "_blank"); }}>
                    {is ? "Bóka núna" : "Book now"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Restaurant({ lang }: { lang: Lang }) {
  const is = lang === "is";
  const [menuTab, setMenuTab] = useState<"lunch" | "dinner" | "drinks">("lunch");

  type MenuItem = { nameIs: string; nameEn: string; descIs: string; descEn: string; price: number; vegan?: boolean };
  type DrinkItem = { name: string; desc: string; price: string };

  const lunchMains: MenuItem[] = [
    { nameIs: "Fiskborgari", nameEn: "Fish Burger", descIs: "Fiskborgari með lauk, salati, tómati, osti og sósu, borinn fram með stökkum frönskum", descEn: "Fish burger with onion, lettuce, tomato, cheese and sauce, served with crispy fries", price: 3390 },
    { nameIs: "Hamborgari", nameEn: "Hamburger", descIs: "Hamborgari með lauk, salati, tómati, osti og sósu, borinn fram með stökkum frönskum", descEn: "Hamburger with onion, lettuce, tomato, cheese and sauce, served with crispy fries", price: 3390 },
    { nameIs: "Plokkfiskur með rúgbrauði", nameEn: "Icelandic Fish Stew", descIs: "Klassískur íslenskur plokkfiskur borinn fram með volgu rúgbrauði", descEn: "Traditional Icelandic fish stew served with warm rye bread", price: 3190 },
    { nameIs: "Fiskisúpa", nameEn: "Fish Soup", descIs: "Heimagerð, rjómalöguð fiskisúpa, rík af fersku sjávarbragði, borin fram með nýbökuðu brauði", descEn: "Homemade fish soup, creamy and rich in fresh seafood flavors, served with freshly baked bread", price: 2990 },
    { nameIs: "Rjómalöguð sveppasúpa", nameEn: "Creamy Mushroom Soup", descIs: "Heimagerð, rjómalöguð sveppasúpa með ríkulegu sveppabragði, borin fram með nýbökuðu brauði", descEn: "Homemade creamy mushroom soup, rich in mushroom flavor, served with freshly baked bread", price: 2390 },
  ];
  const lunchChildren: MenuItem[] = [
    { nameIs: "Kjúklinganaggar", nameEn: "Chicken Nuggets", descIs: "Stökkir kjúklinganaggar, bornir fram með frönskum", descEn: "Crispy chicken nuggets served with fries", price: 1990 },
    { nameIs: "Ristuð samloka", nameEn: "Toasted Sandwich", descIs: "Ristuð samloka með skinku og osti, borin fram með frönskum", descEn: "Toasted ham and cheese sandwich, served with fries", price: 1990 },
  ];
  const lunchDesserts: MenuItem[] = [
    { nameIs: "Volg eplakaka", nameEn: "Warm Apple Pie", descIs: "Heimabökuð volg eplakaka með mildum kanilkeim, borin fram með rjóma", descEn: "Homemade warm apple pie with a hint of cinnamon, served with whipped cream", price: 1390 },
    { nameIs: "Súkkulaðikaka", nameEn: "Chocolate Cake", descIs: "Rík og mjúk súkkulaðikaka með rjóma, sannkallað sælkeragóðgæti", descEn: "Rich and moist chocolate cake with whipped cream, a true indulgence", price: 1390 },
    { nameIs: "Gulrótakaka", nameEn: "Carrot Cake", descIs: "Mjúk og safarík gulrótarkaka með silkimjúku rjómaostakremi, borin fram með þeyttum rjóma", descEn: "Soft and moist carrot cake with silky cream cheese frosting, served with whipped cream", price: 1390 },
    { nameIs: "Vaffla", nameEn: "Waffle", descIs: "Ljúffeng nýbökuð vaffla með sultu og þeyttum rjóma", descEn: "Delicious freshly baked waffle served with jam and whipped cream", price: 1590 },
  ];

  const dinnerStarters: MenuItem[] = [
    { nameIs: "Bragð af Íslandi", nameEn: "Taste of Iceland", descIs: "Smakkplatti með úrvali af íslenskum sérkennum og hráefni af svæðinu, fullkominn til að deila", descEn: "House tasting platter with a selection of Icelandic specialties and local ingredients", price: 3990 },
    { nameIs: "Fiskisúpa", nameEn: "Fish Soup", descIs: "Heimagerð, rjómalöguð fiskisúpa, rík af fersku sjávarbragði, borin fram með nýbökuðu brauði", descEn: "Homemade fish soup, creamy and rich in fresh seafood flavors, served with freshly baked bread", price: 2690 },
    { nameIs: "Hvítlauksbrauð", nameEn: "Garlic Bread", descIs: "Heitt brauð með hvítlaukssmjöri, létt stökkt að utan og mjúkt að innan", descEn: "Warm garlic bread with aromatic garlic butter, crispy on the outside and soft on the inside", price: 1290 },
    { nameIs: "Ferskt salat", nameEn: "Fresh Salad", descIs: "Litríkt salat með fersku og stökku grænmeti, toppað með léttri og frískandi dressingu", descEn: "Fresh and vibrant salad with crisp vegetables, finished with a light and refreshing dressing", price: 1990, vegan: true },
  ];
  const dinnerMains: MenuItem[] = [
    { nameIs: "Fiskur dagsins", nameEn: "Catch of the Day", descIs: "Nýveiddur fiskur, borinn fram með sætkartöflu, silkimjúkri hollandaise sósu, fersku grænmeti og smælki", descEn: "Catch of the day served with sweet potato, creamy hollandaise sauce, seasonal vegetables and baby potatoes", price: 5690 },
    { nameIs: "Lambafillet", nameEn: "Lamb Fillet", descIs: "Lambafillet, borið fram með ofnbakaðri kartöflu, fersku grænmeti og ríkulegri piparsósu", descEn: "Lamb fillet served with baked potato, vegetables and rich pepper sauce", price: 6990 },
    { nameIs: "Fiskborgari", nameEn: "Fish Burger", descIs: "Fiskborgari með lauk, salati, tómati, osti og sósu, borinn fram með stökkum frönskum", descEn: "Fish burger with onion, lettuce, tomato, cheese and sauce, served with crispy fries", price: 3690 },
    { nameIs: "Hamborgari", nameEn: "Hamburger", descIs: "Hamborgari með lauk, salati, tómati, osti og sósu, borinn fram með stökkum frönskum", descEn: "Hamburger with onion, lettuce, tomato, cheese and sauce, served with crispy fries", price: 3690 },
    { nameIs: "Plokkfiskur með rúgbrauði", nameEn: "Icelandic Fish Stew", descIs: "Klassískur íslenskur plokkfiskur borinn fram með volgu rúgbrauði", descEn: "Traditional Icelandic fish stew served with warm rye bread", price: 3290 },
    { nameIs: "Fiskisúpa", nameEn: "Fish Soup", descIs: "Heimagerð, rjómalöguð fiskisúpa, rík af fersku sjávarbragði, borin fram með nýbökuðu brauði", descEn: "Homemade fish soup, creamy and rich in fresh seafood flavors, served with freshly baked bread", price: 3490 },
    { nameIs: "Kjúklingasalat", nameEn: "Chicken Salad", descIs: "Létt og ferskt salat með kjúklingi, fersku grænmeti og frískandi dressingu", descEn: "A light and fresh salad with chicken, fresh vegetables and a refreshing dressing", price: 3690 },
    { nameIs: "Grænmetislasagna", nameEn: "Vegetarian Lasagna", descIs: "Heimagerð lasagna með grænmeti og osti", descEn: "Homemade vegetarian lasagna with flavorful vegetables and cheese", price: 3590, vegan: true },
    { nameIs: "Kjúklingbaunasalat", nameEn: "Chickpea Salad", descIs: "Létt og ferskt salat með kjúklingabaunum og frískandi dressingu", descEn: "A light and fresh salad with chickpea and a refreshing dressing", price: 3690, vegan: true },
  ];
  const dinnerDesserts: MenuItem[] = [
    { nameIs: "Volg eplakaka", nameEn: "Warm Apple Pie", descIs: "Heimabökuð volg eplakaka með mildum kanilkeim, borin fram með rjóma", descEn: "Homemade warm apple pie with a hint of cinnamon, served with whipped cream", price: 2200 },
    { nameIs: "Súkkulaðikaka", nameEn: "Chocolate Cake", descIs: "Rík og mjúk súkkulaðikaka með rjóma, sannkallað sælkeragóðgæti", descEn: "Rich and moist chocolate cake with whipped cream, a true indulgence", price: 2200 },
    { nameIs: "Skyrkaka hússins", nameEn: "House Skyr Cake", descIs: "Silkimjúk skyrkaka með mjúkum svampbotni, með ferskum ávöxtum, borin fram með ávaxtasósu", descEn: "Creamy skyr cake with a soft sponge base, with fresh fruits, served with a fruity sauce", price: 2200 },
  ];
  const dinnerChildren: MenuItem[] = [
    { nameIs: "Hamborgari (90g)", nameEn: "Hamburger (90g)", descIs: "Hamborgari með fersku salati og sósu, borinn fram með stökkum frönskum", descEn: "Hamburger with fresh salad and sauce, served with crispy fries", price: 2290 },
    { nameIs: "Kjúklinganaggar", nameEn: "Chicken Nuggets", descIs: "Stökkir kjúklinganaggar, bornir fram með frönskum", descEn: "Crispy chicken nuggets served with golden fries", price: 1990 },
    { nameIs: "Pizza", nameEn: "Pizza", descIs: "Stökkbotna pizza með tómatsósu og bræddum osti, toppuð með ferskum kryddjurtum eða skinku", descEn: "Crispy thin-crust pizza with tomato sauce and melted cheese, topped with fresh herbs or ham of your choice", price: 1990 },
  ];

  const drinksBeer: DrinkItem[] = [
    { name: "Boli", desc: "Icelandic premium lager 5.6%, 500ml", price: "1.690 kr." },
    { name: "Gull", desc: "Icelandic lager 5.0%, 500ml", price: "1.690 kr." },
    { name: "Gull Lite", desc: "Gluten-free lager 5.0%, 500ml", price: "1.690 kr." },
    { name: "Galdr", desc: "Icelandic pilsner 4.6%, 330ml", price: "1.390 kr." },
    { name: "Kukl", desc: "Icelandic lager 5.0%, 330ml", price: "1.390 kr." },
    { name: "Brío", desc: "Alcohol-free pilsner 0.0%, 330ml", price: "690 kr." },
  ];
  const drinksRed: DrinkItem[] = [
    { name: "Ramon Bilbao", desc: "14%, 750ml", price: "8.190 kr." },
    { name: "Ramon Bilbao", desc: "14%, glas / glass", price: "2.090 kr." },
    { name: "Cabernet Sauvignon Nero d'Avola", desc: "13.5%, 750ml", price: "7.790 kr." },
    { name: "Cabernet Sauvignon Nero d'Avola", desc: "13.5%, glas / glass", price: "1.990 kr." },
  ];
  const drinksWhite: DrinkItem[] = [
    { name: "Laroche Chardonnay", desc: "13%, 750ml", price: "7.790 kr." },
    { name: "Laroche Chardonnay", desc: "13%, glas / glass", price: "1.990 kr." },
    { name: "Pinot Grigio", desc: "13.5%, 750ml", price: "7.390 kr." },
    { name: "Pinot Grigio", desc: "13.5%, glas / glass", price: "1.890 kr." },
  ];
  const drinksProsecco: DrinkItem[] = [
    { name: "Piccini Prosecco", desc: "11%, 750ml", price: "7.790 kr." },
    { name: "Piccini Prosecco", desc: "11%, glas / glass", price: "1.990 kr." },
  ];
  const drinksSpirits: DrinkItem[] = [
    { name: "Cognac Larsen VSOP", desc: "4cl", price: "1.990 kr." },
    { name: "Hennessy", desc: "4cl", price: "1.990 kr." },
    { name: "Whisky Black Label", desc: "4cl", price: "1.990 kr." },
    { name: "Gin Tanqueray", desc: "4cl", price: "1.990 kr." },
    { name: "Vor Icelandic Berry Gin", desc: "4cl", price: "1.990 kr." },
    { name: "Vodka Smirnoff", desc: "4cl", price: "1.890 kr." },
    { name: "Brennivín", desc: "4cl", price: "1.890 kr." },
    { name: "Campari", desc: "4cl", price: "1.890 kr." },
    { name: "Flóki Icelandic Whisky", desc: "4cl", price: "1.890 kr." },
  ];
  const drinksKokteill: DrinkItem[] = [
    { name: "Gin & Tonic", desc: "Gin and tonic", price: "2.490 kr." },
    { name: "Moscow Mule", desc: "Vodka, ginger ale and lime", price: "2.690 kr." },
    { name: "Aperol Spritz", desc: "Aperol, prosecco, and soda water", price: "2.690 kr." },
    { name: "Whisky Ginger", desc: "Whisky and ginger ale", price: "2.690 kr." },
    { name: "Vodka & Tonic", desc: "Vodka and tonic", price: "2.490 kr." },
    { name: "Basil Gimlet", desc: "Gin, lime juice, basil syrup, and basil", price: "2.690 kr." },
    { name: "Vodka & Coke", desc: "Vodka and coke", price: "2.290 kr." },
  ];
  const drinksIrish: DrinkItem[] = [
    { name: "Irish Coffee", desc: "Irish whiskey, hot coffee and cream", price: "2.590 kr." },
  ];
  const drinksLikjor: DrinkItem[] = [
    { name: "Baileys", desc: "Baileys Irish Cream", price: "1.790 kr." },
  ];
  const drinksSoda: DrinkItem[] = [
    { name: "Tonic", desc: "Glass bottle", price: "590 kr." },
    { name: "Ginger Ale", desc: "Glass bottle", price: "490 kr." },
    { name: "Pepsi", desc: "330ml", price: "490 kr." },
    { name: "Pepsi Max", desc: "330ml", price: "490 kr." },
    { name: "Appelsín", desc: "330ml", price: "490 kr." },
    { name: "Kristall", desc: "330ml", price: "490 kr." },
  ];

  const VeganBadge = () => (
    <span className="veganBadge" title="Vegan" aria-label="Vegan">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 13c1.5-4 4-6 9-6-1 5-3.5 8-9 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 13c1 0 2.5.5 3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span>Vegan</span>
    </span>
  );

  const MenuItems = ({ items }: { items: MenuItem[] }) => (
    <div className="mnuItems">
      {items.map((item, i) => (
        <div key={i} className="mnuItem">
          <div className="mnuItemRow">
            <span className="mnuItemName">
              {is ? item.nameIs : item.nameEn}
              {item.vegan && <VeganBadge />}
            </span>
            <span className="mnuItemPrice">{item.price.toLocaleString("is-IS")} kr.</span>
          </div>
          <p className="mnuItemDesc">{is ? item.descIs : item.descEn}</p>
        </div>
      ))}
    </div>
  );

  const DrinkItems = ({ items }: { items: DrinkItem[] }) => (
    <div className="mnuItems">
      {items.map((item, i) => (
        <div key={i} className="mnuItem">
          <div className="mnuItemRow">
            <span className="mnuItemName">{item.name}</span>
            <span className="mnuItemPrice">{item.price}</span>
          </div>
          <p className="mnuItemDesc">{item.desc}</p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow={is ? "Matur og drykkur" : "Food & drink"}
        title={is ? "Veitingastaður" : "Restaurant"}
        text={
          is
            ? "Ferskt íslenskt hráefni í hlýu andrúmslofti rétt við hafið."
            : "Fresh Icelandic flavors in a warm, welcoming atmosphere right by the sea."
        }
      />
      <section className="sec">
        <div className="si2">
          <div className="rg2">
            <Photo src={images.restaurant} />
            <div>
              <p className="ey">Malarkaffi</p>
              <h2 className="st">{is ? "Opið á sumrin" : "Open during the summer season only"}</h2>
              <div className="dv" />
              <p className="bt">
                {is
                  ? "Malarkaffi er fjölskyldurekinn veitingastaður með ferskan fisk, íslenskt lambakjöt og heimilislegan mat úr staðbundnu hráefni."
                  : "Malarkaffi is a family-run restaurant offering fresh Icelandic ingredients, fresh fish, Icelandic lamb, traditional soups, and homemade bread."}
              </p>
              <p className="bt">
                {is ? "Velkomin á Malarkaffi." : "Open daily during summer for breakfast, lunch, and dinner."}
              </p>
              <div className="bq">
                {is
                  ? "Velkomin á Malarkaffi, þar sem góður matur, hlýleg gestrisni og hafið mætast."
                  : "Welcome to Malarkaffi, where good food, warm hospitality and the ocean come together."}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mnuWrap">
        <div className="mnuInner">
          <div className="mnuTabs">
            <button className={`mnuTab${menuTab === "lunch" ? " on" : ""}`} onClick={() => setMenuTab("lunch")}>
              {is ? "Hádegismatseðill" : "Lunch Menu"}
            </button>
            <button className={`mnuTab${menuTab === "dinner" ? " on" : ""}`} onClick={() => setMenuTab("dinner")}>
              {is ? "Kvöldmatseðill" : "Dinner Menu"}
            </button>
            <button className={`mnuTab${menuTab === "drinks" ? " on" : ""}`} onClick={() => setMenuTab("drinks")}>
              {is ? "Drykkjarlisti" : "Drinks"}
            </button>
          </div>
          {menuTab === "lunch" && (
            <>
              <p className="mnuCatHd">{is ? "Aðalréttir" : "Main Courses"}</p>
              <MenuItems items={lunchMains} />
              <p className="mnuCatHd">{is ? "Barnamatseðill" : "Children's Menu"}</p>
              <MenuItems items={lunchChildren} />
              <p className="mnuCatHd">{is ? "Eftirréttir" : "Desserts"}</p>
              <MenuItems items={lunchDesserts} />
            </>
          )}
          {menuTab === "dinner" && (
            <>
              <p className="mnuCatHd">{is ? "Forréttir" : "Starters"}</p>
              <MenuItems items={dinnerStarters} />
              <p className="mnuCatHd">{is ? "Aðalréttir" : "Main Courses"}</p>
              <MenuItems items={dinnerMains} />
              <p className="mnuCatHd">{is ? "Eftirréttir" : "Desserts"}</p>
              <MenuItems items={dinnerDesserts} />
              <p className="mnuCatHd">{is ? "Barnamatseðill" : "Children's Menu"}</p>
              <MenuItems items={dinnerChildren} />
            </>
          )}
          {menuTab === "drinks" && (
            <>
              <p className="mnuCatHd">{is ? "Bjór" : "Beer"}</p>
              <DrinkItems items={drinksBeer} />
              <p className="mnuCatHd">{is ? "Rauðvín" : "Red Wine"}</p>
              <DrinkItems items={drinksRed} />
              <p className="mnuCatHd">{is ? "Hvítvín" : "White Wine"}</p>
              <DrinkItems items={drinksWhite} />
              <p className="mnuCatHd">{is ? "Freyðivín" : "Prosecco"}</p>
              <DrinkItems items={drinksProsecco} />
              <p className="mnuCatHd">{is ? "Kokteill" : "Cocktails"}</p>
              <DrinkItems items={drinksKokteill} />
              <p className="mnuCatHd">{is ? "Írskt kaffi" : "Irish Coffee"}</p>
              <DrinkItems items={drinksIrish} />
              <p className="mnuCatHd">{is ? "Líkjör" : "Liqueur"}</p>
              <DrinkItems items={drinksLikjor} />
              <p className="mnuCatHd">{is ? "Sterkt vín" : "Spirits"}</p>
              <DrinkItems items={drinksSpirits} />
              <p className="mnuCatHd">{is ? "Gos" : "Soft Drinks"}</p>
              <DrinkItems items={drinksSoda} />
            </>
          )}
        </div>
      </section>
    </>
  );
}

function Sailing({ lang }: { lang: Lang }) {
  const is = lang === "is";
  const [selectedTour, setSelectedTour] = useState<number | null>(null);

  const tours = [
    {
      nameIs: "Lundaganga í Grímsey",
      nameEn: "Grímsey Puffin Walk",
      providerIs: "Grímseyjarferðir með Malarhorni",
      providerEn: "Grímsey Tours by Malarhorn",
      price: 18900,
      img: "https://malarhornguesthouse.is/wp-content/uploads/Untitled-design-14.png",
      descIs: [
        "Komdu með í okkar vinsælustu og heildstæðustu Grímseyjarupplifun,leiðsagða bátsferð og göngu frá Drangsnesi til Grímseyjar á Steingrímsfirði.",
        "Eftir stutta siglingu frá Drangsnesi göngum við í land í Grímsey og könnum eyjuna fótgangandi með leiðsögn heimamanns. Ferðin leggur áherslu á fjölbreytt fuglalíf, fallega strandlengju og kyrrláta náttúru eyjarinnar. Yfir sumartímann er Grímsey sérstaklega þekkt fyrir lundann og gefst gestum kostur á að heimsækja lundabyggðina og fylgjast með fuglunum af virðingarfjarlægð.",
        "Á leiðinni segir leiðsögumaðurinn frá sögu eyjarinnar, náttúru hennar, fuglalífi og nærumhverfi. Þetta er róleg og notaleg náttúruupplifun sem hentar vel þeim sem vilja gefa sér tíma til að njóta útsýnisins og upplifa eina eftirminnilegustu dýralífsferð Vestfjarða.",
        "Þessi ferð er sérstaklega tilvalin fyrir náttúruunnendur, ljósmyndara og þá sem vilja upplifa Grímsey til fulls.",
      ],
      descEn: [
        "Join us for our most complete Grímsey experience,a guided boat trip and island walk from Drangsnes to Grímsey on Steingrímsfjörður.",
        "After a short boat ride from Drangsnes, we go ashore on Grímsey and explore the island on foot with a local guide. The tour focuses on the island's rich birdlife, beautiful coastal scenery and peaceful nature. During the summer season, Grímsey is especially known for its puffins, and guests will have the opportunity to visit and view the puffin colony from a respectful distance.",
        "Along the way, your guide will share stories about the island, its nature, birdlife and local surroundings. This is a relaxed nature experience, ideal for travellers who want to take their time, enjoy the scenery and experience one of the most memorable wildlife tours in the Westfjords.",
        "This tour is our best choice for nature lovers, photographers and guests who want the full Grímsey experience.",
      ],
      noteIs: "Dýralífsskoðun er háð náttúrulegum aðstæðum og því er ekki hægt að ábyrgjast að tiltekin dýr sjáist. Allar ferðir eru háðar veðri og sjólagi.",
      noteEn: "Wildlife sightings depend on nature and cannot be guaranteed. All tours are subject to weather and sea conditions.",
      highlightsIs: [
        "Leiðsögð bátsferð frá Drangsnesi til Grímseyjar",
        "Ganga um Grímsey með leiðsögn heimamanns",
        "Heimsókn að lundasvæðinu yfir lundatímann",
        "Sjófuglar, stórbrotið strandútsýni og friðsæl eyjanáttúra",
        "Ferð í litlum hópi, fjarri mannmergðinni",
      ],
      highlightsEn: [
        "Guided boat trip from Drangsnes to Grímsey",
        "Walk on Grímsey island with a local guide",
        "Visit to the puffin area during puffin season",
        "Seabirds, coastal views and peaceful island nature",
        "Small-group experience away from the crowds",
      ],
      infoIs: [
        ["Lengd", "3 klukkustundir"],
        ["Brottför", "09:00"],
        ["Heimkoma", "12:00"],
        ["Verð", "18.900 kr. á fullorðinn"],
        ["Mætingarstaður", "Drangsneshöfn / móttaka Malarhorns"],
        ["Erfiðleikastig", "Létt til miðlungs ganga á náttúrulegum gönguleiðum"],
        ["Mælt er með að taka með", "Hlý föt, góða gönguskó, myndavél og vatn"],
      ] as [string, string][],
      infoEn: [
        ["Duration", "3 hours"],
        ["Departure", "09:00"],
        ["Return", "12:00"],
        ["Price", "ISK 18,900 per adult"],
        ["Meeting point", "Drangsnes harbour / Malarhorn reception"],
        ["Difficulty", "Easy to moderate walking on natural terrain"],
        ["What to bring", "Warm clothes, good shoes, camera and water"],
      ] as [string, string][],
      cancellationIs: "Bókanir eru ekki endurgreiddar. Allar bókanir eru bindandi og endanlegar.",
      cancellation: "Bookings are non-refundable. All sales are final.",
    },
    {
      nameIs: "Grímseyjarupplifun",
      nameEn: "Grímsey Wildlife Tour",
      providerIs: "Grímseyjarferðir með Malarhorni",
      providerEn: "Grímsey Tours by Malarhorn",
      price: 13900,
      img: "https://malarhornguesthouse.is/wp-content/uploads/Untitled-design-14.png",
      descIs: [
        "Upplifðu Grímsey í leiðsagðri tveggja tíma náttúruferð frá Drangsnesi.",
        "Eftir stutta siglingu yfir Steingrímsfjörð göngum við í land í Grímsey og könnum hluta eyjarinnar með leiðsögn heimamanns. Ferðin veitir gestum góða innsýn í náttúru eyjarinnar, fuglalíf og rólegt andrúmsloft, án þess að fara í lengri þriggja tíma göngu.",
        "Yfir sumarmánuðina er lundinn eitt helsta aðdráttaraflið ásamt öðrum sjófuglum og fallegu strandlandslagi. Ferðin er farin á rólegum hraða með nægum tíma til að njóta umhverfisins, taka myndir og fræðast um eyjuna og dýralíf hennar.",
        "Þessi ferð hentar flestum gestum vel,nógu löng til að veita raunverulega eyjaupplifun en samt auðvelt að koma henni fyrir í dagskrá dagsins.",
      ],
      descEn: [
        "Experience Grímsey on a guided 2-hour nature tour from Drangsnes.",
        "After a short boat ride across Steingrímsfjörður, we go ashore on Grímsey and walk through part of the island with a local guide. This tour gives guests a real taste of Grímsey's nature, birdlife and quiet island atmosphere, without committing to the full three-hour walk.",
        "During the summer season, puffins are one of the main highlights, along with other seabirds and coastal scenery. The pace is relaxed, with time to enjoy the surroundings, take photos and learn more about the island and its wildlife.",
        "This is a great choice for most visitors,long enough to feel like a proper island visit, but easy to fit into a travel day.",
      ],
      noteIs: "Dýralífsskoðun er háð náttúrulegum aðstæðum og því er ekki hægt að ábyrgjast að tiltekin dýr sjáist. Allar ferðir eru háðar veðri og sjólagi.",
      noteEn: "Wildlife sightings depend on nature and cannot be guaranteed. All tours are subject to weather and sea conditions.",
      highlightsIs: [
        "Leiðsögð bátsferð frá Drangsnesi",
        "Stutt ganga um Grímsey með leiðsögn",
        "Lundar og aðrir sjófuglar yfir sumartímann",
        "Fallegt strandútsýni og friðsæl náttúra",
        "Kjörinn millivegur á milli Sjóævintýrisins og Lundagöngunnar",
      ],
      highlightsEn: [
        "Guided boat trip from Drangsnes",
        "Short walk on Grímsey island",
        "Puffins and seabirds during the summer season",
        "Coastal views and peaceful nature",
        "Ideal middle option between the Sea Safari and Puffin Walk",
      ],
      infoIs: [
        ["Lengd", "2 klukkustundir"],
        ["Brottför", "15:30"],
        ["Heimkoma", "17:30"],
        ["Verð", "13.900 kr. á fullorðinn"],
        ["Mætingarstaður", "Drangsneshöfn / móttaka Malarhorns"],
        ["Erfiðleikastig", "Létt til miðlungs ganga á náttúrulegum gönguleiðum"],
        ["Mælt er með að taka með", "Hlý föt, góða gönguskó, myndavél og vatn"],
      ] as [string, string][],
      infoEn: [
        ["Duration", "2 hours"],
        ["Departure", "15:30"],
        ["Return", "17:30"],
        ["Price", "ISK 13,900 per adult"],
        ["Meeting point", "Drangsnes harbour / Malarhorn reception"],
        ["Difficulty", "Easy to moderate walking on natural terrain"],
        ["What to bring", "Warm clothes, good shoes, camera and water"],
      ] as [string, string][],
      cancellationIs: "Bókanir eru ekki endurgreiddar. Allar bókanir eru bindandi og endanlegar.",
      cancellation: "Bookings are non-refundable. All sales are final.",
    },
    {
      nameIs: "Sjóævintýrið í Grímsey",
      nameEn: "Grímsey Sea Safari",
      providerIs: "Grímseyjarferðir með Malarhorni",
      providerEn: "Grímsey Tours by Malarhorn",
      price: 8900,
      img: "https://malarhornguesthouse.is/wp-content/uploads/Untitled-design-14.png",
      descIs: [
        "Njóttu stuttrar og fallegrar bátsferðar í kringum Grímseyjareyju frá Drangsneshöfn.",
        "Þetta eins tíma sjóævintýri er tilvalið fyrir gesti sem vilja upplifa Grímsey frá sjónum án þess að ganga í land. Við siglum í kringum eyjuna og leitum að lundum, sjófuglum og öðru dýralífi meðfram ströndinni. Útsýnið til eyjarinnar, strandlengjunnar og Steingrímsfjörðar gerir þetta að fallegri og aðgengilegri náttúruupplifun.",
        "Alltaf er möguleiki á að sjá seli eða hval á svæðinu, þótt ekki sé hægt að ábyrgjast slíkt. Ef aðstæður leyfa gætu gestir einnig fengið tækifæri til að reyna sig í einfaldri stangveiði í ferðinni.",
        "Þetta er frábær kostur fyrir fjölskyldur, börn, gesti með takmarkaðan tíma eða þá sem vilja njóta léttar og eftirminnilegrar bátsferðar frá Drangsnesi.",
      ],
      descEn: [
        "Enjoy a short and scenic boat tour around Grímsey island, departing from Drangsnes harbour.",
        "This one-hour sea safari is the perfect choice for guests who want to experience Grímsey from the sea without going ashore. We sail around the island and look for puffins, seabirds and other wildlife along the coast. The views towards the island, the coastline and Steingrímsfjörður make this a beautiful and accessible nature experience.",
        "There is always a chance of seeing seals or whales in the area, although sightings can never be guaranteed. If conditions allow, guests may also have the chance to try simple sea angling during the tour.",
        "This is a great option for families, children, guests with limited time, or anyone who wants a light and memorable boat trip from Drangsnes.",
      ],
      noteIs: "Þessi ferð felur ekki í sér lending á Grímsey. Dýralífsskoðun er háð náttúrulegum aðstæðum og ekki hægt að ábyrgjast. Allar ferðir eru háðar veðri og sjólagi.",
      noteEn: "This tour does not include landing on Grímsey. Wildlife sightings depend on nature and cannot be guaranteed. All tours are subject to weather and sea conditions.",
      highlightsIs: [
        "Eins tíma bátsferð í kringum Grímsey",
        "Lundar og sjófuglar skoðaðir af sjónum",
        "Fallegt strandútsýni",
        "Möguleiki á að sjá seli eða hval",
        "Hugsanleg styttri stangveiðiupplifun ef aðstæður leyfa",
      ],
      highlightsEn: [
        "1-hour boat trip around Grímsey",
        "Puffins and seabirds viewed from the sea",
        "Beautiful coastal scenery",
        "Chance of seeing seals or whales",
        "Possible short sea-angling experience if conditions allow",
      ],
      infoIs: [
        ["Lengd", "1 klukkustund"],
        ["Brottför", "13:30"],
        ["Heimkoma", "14:30"],
        ["Verð", "8.900 kr. á fullorðinn"],
        ["Mætingarstaður", "Drangsneshöfn / móttaka Malarhorns"],
        ["Erfiðleikastig", "Auðvelt"],
        ["Mælt er með að taka með", "Hlý föt, myndavél og sólgleraugu ef sólríkt"],
      ] as [string, string][],
      infoEn: [
        ["Duration", "1 hour"],
        ["Departure", "13:30"],
        ["Return", "14:30"],
        ["Price", "ISK 8,900 per adult"],
        ["Meeting point", "Drangsnes harbour / Malarhorn reception"],
        ["Difficulty", "Easy"],
        ["What to bring", "Warm clothes, camera and sunglasses if sunny"],
      ] as [string, string][],
      cancellationIs: "Bókanir eru ekki endurgreiddar. Allar bókanir eru bindandi og endanlegar.",
      cancellation: "Bookings are non-refundable. All sales are final.",
    },
  ];

  const sel = selectedTour !== null ? tours[selectedTour] : null;

  return (
    <>
      <PageHeader
        eyebrow={is ? "Ævintýri" : "Adventure"}
        title={is ? "Siglingar út í Grímsey" : "Sailing to Grimsey"}
        text={
          is
            ? "Best geymda leyndarmálið á Ströndum, nálgastu lundana í náttúrulegu umhverfi."
            : "A hidden gem in the Strandir region, explore Iceland's largest puffin colony by boat."
        }
      />
      <section className="sec">
        <div className="si2">
          <div className="sfeat">
            <div>
              <p className="ey">{is ? "Um Grímsey" : "About Grimsey"}</p>
              <h2 className="st">{is ? "Sannkölluð náttúruperla" : "A true natural gem"}</h2>
              <div className="dv" />
              <p className="bt">
                {is
                  ? "Grímsey í Steingrímsfirði er ein stærsta lundabyggð landsins, áætlað 25 til 30 þúsund pör á hverju sumri."
                  : "Grimsey in Steingrimsfjordur is home to one of Iceland's largest puffin colonies, with an estimated 25,000 to 30,000 breeding pairs each summer."}
              </p>
              <p className="bt">
                {is
                  ? "Malarhorn býður upp á fallegar siglingar til Grímseyjar á sumrin."
                  : "Malarhorn offers regular scenic sailings to Grimsey during summer."}
              </p>
              <button
                className="bokunButton bp"
                id="bokun_acf4a461_fba1_498b_827d_3a67889b1ee3"
                data-src="https://widgets.bokun.io/online-sales/96789794-5a10-4ca1-96e4-8190ad1ff7fb/product-list/109538?partialView=1"
                data-testid="widget-book-button"
                style={{ marginTop: "1.5rem" }}
              >
                {is ? "Bóka ferð" : "Book now"}
              </button>
            </div>
            <Photo src={images.sailing} />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="si2">
          <Script
            src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=96789794-5a10-4ca1-96e4-8190ad1ff7fb"
            strategy="lazyOnload"
          />
          <div
            className="bokunWidget"
            data-src="https://widgets.bokun.io/online-sales/96789794-5a10-4ca1-96e4-8190ad1ff7fb/product-list/109538"
          />
          <noscript>Please enable javascript in your browser to book</noscript>
        </div>
      </section>

      {sel && (
        <section className="rdet">
          <div className="rdetInner">
            <div className="rdetImg">
              <Photo src={sel.img} />
            </div>
            <div className="rdetInfo">
              <p className="ey">{is ? sel.providerIs : sel.providerEn}</p>
              <h3 className="st" style={{ fontSize: "1.6rem" }}>{is ? sel.nameIs : sel.nameEn}</h3>
              <div className="dv" />
              {(is ? sel.descIs : sel.descEn).map((p, i) => (
                <p key={i} className="bt" style={{ marginBottom: "0.7rem" }}>{p}</p>
              ))}
              <p className="tourNote"><strong>{is ? "Athugið:" : "Please note:"}</strong> {is ? sel.noteIs : sel.noteEn}</p>
              <p className="tourInclHd">{is ? "Helstu atriði" : "Highlights"}</p>
              <ul className="tourIncl">
                {(is ? sel.highlightsIs : sel.highlightsEn).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="tourInclHd">{is ? "Hagnýtar upplýsingar" : "Practical info"}</p>
              <InfoBox rows={is ? sel.infoIs : sel.infoEn} />
              {sel.cancellation && (
                <p className="tourNote" style={{ marginTop: "1rem" }}><strong>{is ? "Afbókunarskilmálar:" : "Cancellation policy:"}</strong> {is ? sel.cancellationIs : sel.cancellation}</p>
              )}
              <a
                href={`mailto:malarhorn@malarhornguesthouse.is?subject=${encodeURIComponent(is ? sel.nameIs : sel.nameEn)}`}
                className="bp"
                style={{ marginTop: "1.5rem" }}
              >
                {is ? "Bóka / Fyrirspurn" : "Book / Enquire"}
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}


function About({ lang, goTo }: { lang: Lang; goTo: (page: Page) => void }) {
  const is = lang === "is";
  return (
    <>
      <section className="sec">
        <div className="si2">
          <div className="apg">
            <div>
              <p className="ey">{is ? "Slakaðu á við sjóinn á Ströndum" : "Relax by the sea in the Westfjords"}</p>
              <h2 className="st">{is ? "Malarhorn" : "Our guesthouse"}</h2>
              <div className="dv" />
              <p className="bt">
                {is
                  ? "Malarhorn Guesthouse var stofnað árið 2008 af hjónunum Valgerði Magnúsdóttur og Ásbirni Magnússon, og hefur frá upphafi verið rekið af fjölskyldu sem brennur fyrir gestrisni, góðri þjónustu og því að miðla fegurð Stranda til gesta hvaðanæva að úr heiminum."
                  : "Malarhorn Guesthouse was founded in 2008 by Valgerður Magnúsdóttir and Ásbjörn Magnússon, and has from the very beginning been run by a family passionate about hospitality, excellent service, and sharing the beauty of the Strandir region with guests from all over the world."}
              </p>
              <p className="bt">
                {is
                  ? "Hér geta gestir notið rólegs umhverfis, útsýnis yfir Grímsey og fersks sjávarlofts."
                  : "Located by the shore in peaceful Drangsnes, we offer sea views, fresh coastal air, and easy access to hot pots and unspoiled nature."}
              </p>
            </div>
            <Photo src="/founders.jpg" className="founders-photo" />
          </div>
        </div>
      </section>
      <section className="hp">
        <div className="hpi">
          <div>
            <p className="ey">{is ? "Gisting og matur" : "Stay & dine"}</p>
            <h2 className="st">{is ? "Gisting & Malarkaffi" : "Accommodation & restaurant"}</h2>
            <div className="dv" />
            <p className="bt">
              {is
                ? "Við bjóðum upp á hlýleg herbergi, rúmgóðar íbúðir og Malarkaffi er opið á sumrin með ferskt íslenskt hráefni."
                : "Cozy rooms and spacious apartments for couples, families, and groups. Malarkaffi restaurant is open in summer."}
            </p>
          </div>
          <Photo src={images.stayDine} />
        </div>
      </section>
      <section className="ab">
        <div className="ai">
          <Photo src={images.unwind} />
          <div>
            <p className="ey">{is ? "Tími til að slaka á" : "Time to unwind"}</p>
            <h2 className="st">{is ? "Staður til að hægja á sér" : "A place to slow down"}</h2>
            <div className="dv" />
            <p className="bt">
              {is
                ? "Hvort sem það er í heitu pottunum, á veröndinni eða í göngu um Steingrímsfjörð, Malarhorn er staður til að hægja á sér."
                : "Malarhorn is a place to truly slow down and enjoy the natural surroundings."}
            </p>
            <button className="bp" onClick={() => window.open(BV_BOOK, "_blank")}>
              {is ? "Bóka gistingu" : "Book your stay"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function GuestInfo({ lang, goTo }: { lang: Lang; goTo: (page: Page) => void }) {
  const is = lang === "is";
  return (
    <>
      <section className="gst-hero">
        <img src={LOGO} alt="Malarhorn" />
        <h1>{is ? "Velkomin á Malarhorn" : "Welcome to Malarhorn"}</h1>
        <p>Grundargata 17 · 520 Drangsnes</p>
      </section>
      <div className="gst-body">
        <GuestSection title="WiFi" rows={[[is ? "Netfang" : "Network", "Malarhorn"], [is ? "Lykilorð" : "Password", "borealis"]]} />
        <GuestSection
          title={is ? "Morgunmatur" : "Breakfast"}
          rows={[[is ? "Tími" : "Time", "08:00 - 10:00"], [is ? "Staður" : "Location", is ? "Malarkaffi, sama bygging" : "Malarkaffi, same building"], [is ? "Innifalið" : "Included", is ? "Já, innifalið í gistingu" : "Yes, included in your stay"]]}
        />
        <GuestSection
          title={is ? "Heitir pottar" : "Hot Tubs"}
          note={is ? "Rétt við sjávarsíðuna með útsýni yfir Grímsey. Ókeypis og alltaf opið." : "Right on the shoreline with views of Grimsey. Always open and free of charge; a small donation is appreciated."}
          rows={[[is ? "Opnunartími" : "Open", is ? "Alltaf opið" : "Always open"], [is ? "Aðgangur" : "Entry", is ? "Ókeypis" : "Free of charge"]]}
        />
        <GuestSection title={is ? "Sundlaug" : "Swimming Pool"} rows={[[is ? "Opnunartími" : "Open", "11:00 - 18:00"]]} />
        <GuestSection
          title={is ? "Siglingar til Grímsey" : "Sailing to Grimsey"}
          note={is ? "Við bjóðum upp á þrjár leiðsagðar ferðir til Grímsey. Bókaðu beint við móttökuna eða sendu okkur tölvupóst." : "We offer three guided tours to Grimsey island. Book directly at reception or get in touch."}
          rows={[
            [is ? "Sjóævintýrið" : "Sea Safari", is ? "1 klukkustund · 8.900 kr." : "1 hour · ISK 8,900"],
            [is ? "Grímseyjarupplifun" : "Wildlife Tour", is ? "2 klukkustundir · 13.900 kr." : "2 hours · ISK 13,900"],
            [is ? "Lundaganga" : "Puffin Walk", is ? "3 klukkustundir · 18.900 kr." : "3 hours · ISK 18,900"],
            [is ? "Tímabil" : "Season", is ? "15. júní til miðjan ágúst" : "June 15 to mid August"],
            [is ? "Mætingarstaður" : "Meeting point", is ? "Drangsneshöfn" : "Drangsnes harbour"],
          ]}
          action={{ onClick: () => goTo("sailing"), text: is ? "Bóka siglingu" : "Book sailing" }}
        />
        <GuestSection
          title="Mini Market"
          note={is ? "Smá dagverslun á Drangsnesi." : "A small local mini market in Drangsnes."}
          rows={[[is ? "Sumar" : "Summer", "09:00 - 18:00"], [is ? "Vetur" : "Winter", `09:30 - 10:30 ${is ? "og" : "and"} 13:00 - 17:00`]]}
        />
        <GuestSection
          title={is ? "Inn- og útskráning" : "Check-in & Check-out"}
          rows={[[is ? "Innritun" : "Check-in", is ? "Frá kl. 15:00" : "From 15:00"], [is ? "Útritun" : "Check-out", is ? "Fyrir kl. 11:00" : "Before 11:00"], [is ? "Sími" : "Phone", "+354 461-4345"]]}
        />
        <GuestSection title={is ? "Neyðarnúmer" : "Emergency Numbers"} rows={[["Malarhorn", "+354 896-0337 or +354 896-8837"]]} />
        <section className="gst-section">
          <h2>{is ? "Staðsetning" : "Location"}</h2>
          <p className="gst-note">Grundargata 17, 520 Drangsnes{is ? ", Vestfirðir, Ísland" : ", Westfjords, Iceland"}</p>
        </section>
        <button className="gst-bk bp" onClick={() => window.open(BV_BOOK, "_blank")}>
          {is ? "Bóka næstu gistingu" : "Book your next stay"}
        </button>
      </div>
    </>
  );
}

function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="ph">
      <div className="phi">
        <p className="ey">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

function InfoBox({ rows }: { rows: [string, string][] }) {
  return (
    <div className="ib">
      {rows.map(([label, value]) => (
        <div className="ir" key={label}>
          <span className="il">{label}</span>
          <span className="iv">{value}</span>
        </div>
      ))}
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="fg">
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} placeholder={placeholder} required={required} />
    </div>
  );
}

function GuestSection({
  title,
  note,
  rows,
  link,
  action,
}: {
  title: string;
  note?: string;
  rows: [string, string][];
  link?: { href: string; text: string };
  action?: { onClick: () => void; text: string };
}) {
  return (
    <section className="gst-section">
      <h2>{title}</h2>
      {note ? <p className="gst-note">{note}</p> : null}
      {rows.map(([label, value]) => (
        <div className="gst-row" key={label}>
          <span className="gst-lbl">{label}</span>
          <span className="gst-val">{value}</span>
        </div>
      ))}
      {link ? (
        <a href={link.href} className="gst-textlink" target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
          {link.text}
        </a>
      ) : null}
      {action ? (
        <button className="gst-textlink gst-action-btn" onClick={action.onClick}>
          {action.text}
        </button>
      ) : null}
    </section>
  );
}

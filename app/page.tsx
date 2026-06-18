"use client";

import { useEffect, useMemo, useState } from "react";
const LOGO =
  "https://malarhornguesthouse.is/wp-content/uploads/Untitled-200-x-200-px.png";
const MENU = "https://malarhornguesthouse.is/wp-content/uploads/Matsedill-Malarhorn.pdf";

type Lang = "en" | "is";
type Page = "home" | "accommodation" | "restaurant" | "sailing" | "contact" | "about" | "guest" | "booking";

type BookingRate = {
  hitKey: string;
  name: string;
  price: number;
  currency: string;
  refundable: boolean;
  freeCancellationUntil?: string | null;
};

type BookingRoom = {
  id: string;
  name: string;
  description: string;
  fullDescription?: string | null;
  image?: string;
  available: number;
  price: number | null;
  currency: string;
  rateName?: string | null;
  hitKey?: string | null;
  size?: string | null;
  maxGuests?: number | null;
  minGuests?: number | null;
  ordinaryBeds?: number | null;
  extraBeds?: number | null;
  facilities?: string[] | null;
  rates?: BookingRate[] | null;
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

type BookingStep = "search" | "rooms" | "guest" | "paying" | "widget";

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
    designedBy: "Website designed and developed by",
    footerDescription: "A peaceful seaside retreat in Drangsnes, Iceland.",
    find: "Find Us",
    contact: "Get in Touch",
    guest: "Guest Info",
    nav: [
      ["home", "Home"],
      ["accommodation", "Accommodation"],
      ["restaurant", "Restaurant"],
      ["sailing", "Sailing"],
      ["contact", "Contact"],
      ["about", "Malarhorn"],
    ] as [Page, string][],
  },
  is: {
    book: "Bóka Gistingu",
    designedBy: "Vefsíðan er hönnuð og þróuð af",
    footerDescription: "Friðsæll staður við sjávarsíðuna á Drangsnesi, Ísland.",
    find: "Hvar erum við",
    contact: "Hafðu samband",
    guest: "Gestaupplýsingar",
    nav: [
      ["home", "Heim"],
      ["accommodation", "Gisting"],
      ["restaurant", "Veitingastaður"],
      ["sailing", "Sigling til Grímsey"],
      ["contact", "Hafðu samband"],
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

const rooms = {
  en: [
    {
      type: "Twin room",
      name: "Twin room, shared bathroom",
      text: "Two single beds with shared bathroom and kitchen.",
      tags: ["Shared bathroom", "Shared kitchen"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-113-scaled.jpg",
      featured: true,
    },
    {
      type: "Apartment",
      name: "Two bedroom apartment",
      text: "Full kitchen, living room, terrace, and outdoor BBQ.",
      tags: ["Full kitchen", "Terrace", "BBQ"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/aa36fbed-0668-4b69-b4e2-46a7dca3aa8f.jpg",
    },
    {
      type: "Family",
      name: "Family room",
      text: "27 m2 for up to 5 guests.",
      tags: ["27 m2", "Up to 5 guests"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-95-scaled.jpg",
    },
    {
      type: "Standard",
      name: "Standard double with private bathroom",
      text: "28 m2, 2nd floor.",
      tags: ["28 m2", "Private bathroom"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-133-scaled.jpg",
    },
    {
      type: "Classic",
      name: "Double with private bathroom",
      text: "Warm 17 m2 room with wooden-clad walls.",
      tags: ["17 m2", "Wooden walls"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-120-scaled.jpg",
    },
    {
      type: "Budget friendly",
      name: "Twin room, shared bathroom",
      text: "Two single beds with shared facilities.",
      tags: ["Shared bathroom", "Shared kitchen"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-89-scaled.jpg",
    },
  ],
  is: [
    {
      type: "Hagkvæmt",
      name: "Tveggja manna herbergi, sameiginlegt baðherbergi",
      text: "Tvö einbreið rúm með sameiginlegu baðherbergi og eldhúsi.",
      tags: ["Sameiginlegt baðherbergi", "Sameiginlegt eldhús"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-113-scaled.jpg",
      featured: true,
    },
    {
      type: "Íbúð",
      name: "Tveggja svefnherbergja íbúð",
      text: "Fullbúið eldhús, verönd og útigrill.",
      tags: ["Fullbúið eldhús", "Verönd"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/aa36fbed-0668-4b69-b4e2-46a7dca3aa8f.jpg",
    },
    {
      type: "Fjölskylda",
      name: "Fjölskylduherbergi",
      text: "27 m2 fyrir allt að 5 gesti.",
      tags: ["27 m2", "Allt að 5 gestir"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-95-scaled.jpg",
    },
    {
      type: "Standard",
      name: "Standard tveggja manna herbergi",
      text: "28 m2 á 2. hæð.",
      tags: ["28 m2", "Einkabaðherbergi"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-133-scaled.jpg",
    },
    {
      type: "Hefðbundið",
      name: "Tveggja manna herbergi, einkabaðherbergi",
      text: "Hlýlegt 17 m2 herbergi með viðarklæddum veggjum.",
      tags: ["17 m2", "Viðarveggir"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-120-scaled.jpg",
    },
    {
      type: "Hagkvæmt",
      name: "Tveggja manna herbergi, sameiginlegt baðherbergi",
      text: "Tvö einbreið rúm með sameiginlegri aðstöðu.",
      tags: ["Sameiginlegt baðherbergi"],
      img: "https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Arjan-Wilmsen-89-scaled.jpg",
    },
  ],
};

function Photo({ src, className = "" }: { src: string; className?: string }) {
  return <div className={`photo ${className}`} style={{ backgroundImage: `url("${src}")` }} />;
}

export default function MalarhornPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [page, setPage] = useState<Page>("home");
  const [heroSearch, setHeroSearch] = useState<SearchParams | null>(null);

  useEffect(() => {
    if (window.location.hash === "#guest") setPage("guest");
  }, []);

  const t = translations[lang];
  const goTo = (nextPage: Page) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToBookingWithSearch = (params: SearchParams) => {
    setHeroSearch(params);
    setPage("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const content = useMemo(() => {
    switch (page) {
      case "accommodation":
        return <Accommodation lang={lang} goTo={goTo} />;
      case "restaurant":
        return <Restaurant lang={lang} />;
      case "sailing":
        return <Sailing lang={lang} />;
      case "contact":
        return <Contact lang={lang} />;
      case "about":
        return <About lang={lang} goTo={goTo} />;
      case "guest":
        return <GuestInfo lang={lang} goTo={goTo} />;
      case "booking":
        return <BookingPage lang={lang} initialSearch={heroSearch} onSearchConsumed={() => setHeroSearch(null)} />;
      default:
        return <Home lang={lang} goTo={goTo} onHeroSearch={goToBookingWithSearch} />;
    }
  }, [lang, page, heroSearch]);

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
                <>
                  <button
                    className={`navLinkButton ${page === key ? "on" : ""}`}
                    onClick={() => goTo(key)}
                  >
                    {label}
                  </button>
                  <div className="drop">
                    <button onClick={() => goTo("restaurant")}>
                      {lang === "en" ? "About Malarkaffi" : "Um Malarkaffi"}
                    </button>
                    <a href={MENU} target="_blank" rel="noreferrer">
                      {lang === "en" ? "View menu" : "Skoða matseðil"}
                    </a>
                  </div>
                </>
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
          <button className="bkbtn" onClick={() => goTo("booking")}>
            {t.book}
          </button>
        </div>
      </nav>

      <main>{content}</main>

      <footer>
        <div className="fgd">
          <div className="fb">
            <img src={LOGO} alt="Malarhorn" />
            <p>{t.footerDescription}</p>
          </div>
          <div className="fc">
            <h4>{t.find}</h4>
            <p>Grundargata 17</p>
            <p>520 Drangsnes, Iceland</p>
          </div>
          <div className="fc">
            <h4>{t.contact}</h4>
            <a href="tel:+3544102801">+354 410-2801</a>
            <a href="tel:+3544614345">+354 461-4345</a>
            <a href="mailto:malarhorn@malarhornguesthouse.is">
              malarhorn@malarhornguesthouse.is
            </a>
          </div>
        </div>
        <div className="fb2">
          <p>&copy; 2026 Malarhorn Guesthouse</p>
          <p className="fcredit">
            {t.designedBy}{" "}
            <a href="https://vexana.is" target="_blank" rel="noreferrer">
              Vexana
            </a>
          </p>
          <div className="fso">
            <a
              href="https://www.facebook.com/profile.php?id=100063630351484"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/malarhornguesthouse/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function Home({ lang, goTo, onHeroSearch }: { lang: Lang; goTo: (page: Page) => void; onHeroSearch: (p: SearchParams) => void }) {
  const is = lang === "is";
  return (
    <>
      <div className="heroWrap">
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
            <button className="bp" onClick={() => goTo("booking")}>
              {is ? "Bóka gistingu" : "Book your stay"}
            </button>
            <button className="bs" onClick={() => goTo("about")}>
              {is ? "Um Malarhorn" : "Discover more"}
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
              <source
                src="https://malarhornguesthouse.is/wp-content/uploads/Malarhorn-Guesthouse-Drangsnes-Iceland_1080p.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="hbg">
            <div className="hbt">{is ? "Strandir · Vestfirðir" : "Drangsnes · Strandir"}</div>
            <div className="hbs">{is ? "Ísland" : "Westfjords"}</div>
          </div>
        </div>
      </section>
      <HeroBookingBar lang={lang} onSearch={onHeroSearch} />
      </div>

      <section className="sv">
        <div className="sg">
          {[
            ["accommodation", "🛏", is ? "Gisting" : "Accommodation", is ? "Þægileg herbergi og íbúðir með útsýni yfir hafið." : "Comfortable rooms and apartments with ocean views."],
            ["restaurant", "🍽", is ? "Veitingastaður" : "Restaurant", is ? "Ferskt íslenskt hráefni í hlýu andrúmslofti. Opið aðeins á sumrin." : "Fresh local cuisine in a warm atmosphere. Open in summer."],
            ["sailing", "⛵", is ? "Siglingar" : "Sailing", is ? "Ævintýrasigling út í Grímsey." : "Explore the Westfjords on an unforgettable adventure."],
          ].map(([target, icon, title, text]) => (
            <button className="sc" key={target} onClick={() => goTo(target as Page)}>
              <div className="si">{icon}</div>
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
            <button className="bp" onClick={() => goTo("booking")}>
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
            <button className="bp" onClick={() => goTo("booking")}>
              {is ? "Bóka gistingu" : "Book your stay"}
            </button>
          </div>
          <Photo src={images.hotPots} />
        </div>
      </section>
    </>
  );
}

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}


function BookingPage({ lang, initialSearch, onSearchConsumed }: { lang: Lang; initialSearch?: SearchParams | null; onSearchConsumed?: () => void }) {
  const is = lang === "is";
  const [step, setStep] = useState<BookingStep>("search");
  const [searchParams, setSearchParams] = useState<SearchParams>(
    initialSearch ?? {
      arrival: addDays(14),
      departure: addDays(15),
      adults: 2,
      children: 0,
      promoCode: "",
    }
  );

  useEffect(() => {
    if (initialSearch) {
      onSearchConsumed?.();
      handleSearch(initialSearch);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [rooms, setRooms] = useState<BookingRoom[]>([]);
  const [resultId, setResultId] = useState<string>("");
  const [bookingUrl, setBookingUrl] = useState<string>("");
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<BookingRoom | null>(null);
  const [searchStatus, setSearchStatus] = useState<"idle" | "loading" | "error">("idle");
  const [searchError, setSearchError] = useState<string>("");
  const [payStatus, setPayStatus] = useState<"idle" | "loading" | "error">("idle");
  const [payError, setPayError] = useState<string>("");

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
      setBookingUrl(data.bookingUrl);
      if (data.configured === false) {
        // No live API key configured: embed the standard Bookvisit booking
        // widget so guests can complete a booking just like on the old site.
        setEmbedUrl(data.bookingUrl);
        setStep("widget");
        setSearchStatus("idle");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setRooms(data.rooms);
      setResultId(data.resultId ?? "");
      setStep("rooms");
      setSearchStatus("idle");
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
        body: JSON.stringify({ resultId, hitKey: selectedRoom.hitKey }),
      });
      const data = (await response.json()) as {
        paymentUrl?: string;
        thirdPartyHtml?: string;
        paymentAction?: string;
        error?: string;
      };
      if (!response.ok || data.error) {
        setPayError(data.error ?? (is ? "Bókun mistókst" : "Booking failed"));
        setPayStatus("error");
        return;
      }
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        setPayError(is ? "Engin greiðslutengill fékkst" : "No payment URL received");
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
      {step !== "widget" && <BookingProgressBar step={step} is={is} />}

      {step === "search" && (
        <BookingSearchStep
          lang={lang}
          initial={searchParams}
          status={searchStatus}
          error={searchError}
          onSearch={handleSearch}
        />
      )}

      {step === "widget" && (
        <BookingWidgetStep
          lang={lang}
          embedUrl={embedUrl}
          searchParams={searchParams}
          onBack={() => setStep("search")}
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
        <div className="bkPaying">
          <div className="bkPayingSpinner" />
          <p>{is ? "Tengist greiðslukerfi..." : "Connecting to payment..."}</p>
        </div>
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
  ] as const;
  const current = steps.findIndex((s) => s.key === step);
  return (
    <div className="bkProgress">
      {steps.map((s, i) => (
        <div key={s.key} className={`bkProgressStep ${i <= current ? "bkProgressActive" : ""}`}>
          <div className="bkProgressDot">{i < current ? "✓" : i + 1}</div>
          <span>{s.label}</span>
          {i < steps.length - 1 && <div className="bkProgressLine" />}
        </div>
      ))}
    </div>
  );
}

function HeroBookingBar({ lang, onSearch }: { lang: Lang; onSearch: (p: SearchParams) => void }) {
  const is = lang === "is";
  const [arrival, setArrival] = useState(addDays(14));
  const [departure, setDeparture] = useState(addDays(15));
  const [adults, setAdults] = useState(2);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch({ arrival, departure, adults, children: 0, promoCode: "" });
  }

  return (
    <div className="hbBar">
      <form className="hbForm" onSubmit={handleSubmit}>
        <div className="hbField">
          <label htmlFor="hb-arrival">{is ? "Koma" : "Check in"}</label>
          <input
            id="hb-arrival"
            type="date"
            min={addDays(0)}
            value={arrival}
            onChange={(e) => {
              setArrival(e.target.value);
              if (e.target.value >= departure) setDeparture(addDays(1));
            }}
            required
          />
        </div>
        <div className="hbSep" aria-hidden="true" />
        <div className="hbField">
          <label htmlFor="hb-departure">{is ? "Brottför" : "Check out"}</label>
          <input
            id="hb-departure"
            type="date"
            min={arrival}
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            required
          />
        </div>
        <div className="hbSep" aria-hidden="true" />
        <div className="hbField hbFieldNarrow">
          <label htmlFor="hb-adults">{is ? "Gestir" : "Guests"}</label>
          <input
            id="hb-adults"
            type="number"
            min="1"
            max="8"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            required
          />
        </div>
        <button className="hbBtn" type="submit">
          {is ? "Leita" : "Search"}
        </button>
      </form>
    </div>
  );
}

function BookingWidgetStep({
  lang,
  embedUrl,
  searchParams,
  onBack,
}: {
  lang: Lang;
  embedUrl: string;
  searchParams: SearchParams;
  onBack: () => void;
}) {
  const is = lang === "is";
  return (
    <section className="bkSection">
      <div className="bkWidgetInner">
        <button className="bkBack" onClick={onBack}>
          ← {is ? "Breyta dagsetningum" : "Change dates"}
        </button>
        <p className="ey">
          {new Date(searchParams.arrival).toLocaleDateString(is ? "is-IS" : "en-GB", { day: "numeric", month: "short" })}
          {" – "}
          {new Date(searchParams.departure).toLocaleDateString(is ? "is-IS" : "en-GB", { day: "numeric", month: "short" })}
          {" · "}
          {searchParams.adults} {is ? "fullorðnir" : "adults"}
          {searchParams.children ? `, ${searchParams.children} ${is ? "börn" : "children"}` : ""}
        </p>
        <h1 className="st">{is ? "Veldu herbergi og bókaðu" : "Choose a room & book"}</h1>
        <div className="dv" />
        <div className="bkWidget">
          <iframe
            src={embedUrl}
            title={is ? "Bókunarvél Malarhorn" : "Malarhorn booking engine"}
            className="bkWidgetFrame"
            loading="lazy"
            allow="payment"
          />
        </div>
        <p className="bkWidgetNote">
          <a href={embedUrl} className="rl" target="_blank" rel="noreferrer">
            {is ? "Opna bókunarvélina í nýjum glugga" : "Open the booking engine in a new window"}
          </a>
        </p>
      </div>
    </section>
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          <div className="hrList">
            {rooms.map((room) => {
              const isOpen = expandedId === room.id;
              const toggle = () => setExpandedId(isOpen ? null : room.id);
              const arrivalDate = new Date(searchParams.arrival).toLocaleDateString(is ? "is-IS" : "en-GB", { weekday: "short", day: "numeric", month: "short" });
              const departureDate = new Date(searchParams.departure).toLocaleDateString(is ? "is-IS" : "en-GB", { weekday: "short", day: "numeric", month: "short" });

              return (
                <article key={room.id} className={`hrRow${isOpen ? " hrRowOpen" : ""}`}>

                  {/* Collapsed row — image + text + price */}
                  <div
                    className="hrHeader"
                    onClick={toggle}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggle(); }}
                  >
                    {room.image && (
                      <div className="hrThumb" style={{ backgroundImage: `url("${room.image}")` }} aria-hidden="true" />
                    )}
                    <div className="hrHeaderLeft">
                      <h2 className="hrName">{room.name}</h2>
                      <p className="hrShort">
                        {room.description
                          ? room.description.length > 120
                            ? room.description.slice(0, room.description.lastIndexOf(" ", 120)) + "…"
                            : room.description
                          : ""}
                      </p>
                      <div className="hrMeta">
                        {room.maxGuests && <span>{is ? `Allt að ${room.maxGuests} gestir` : `Up to ${room.maxGuests} guests`}</span>}
                        {room.size && <span>{room.size}</span>}
                        {room.ordinaryBeds != null && room.ordinaryBeds > 0 && (
                          <span>{room.ordinaryBeds} {is ? (room.ordinaryBeds === 1 ? "rúm" : "rúm") : room.ordinaryBeds === 1 ? "bed" : "beds"}</span>
                        )}
                      </div>
                    </div>
                    <div className="hrHeaderRight">
                      {room.price ? (
                        <p className="hrPrice">
                          {is ? "Frá" : "From"} {Math.round(room.price).toLocaleString()} <span>{room.currency}</span>
                        </p>
                      ) : null}
                      <span className="hrToggle" aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  {/* Expanded detail panel */}
                  {isOpen && (
                    <div className="hrDetail">
                      {/* Left column */}
                      <div className="hrDetailLeft">
                        {/* Full description */}
                        {(room.fullDescription || room.description) && (
                          <p className="hrDesc">{room.fullDescription || room.description}</p>
                        )}

                        {/* Rates table */}
                        {room.rates && room.rates.length > 0 && (
                          <div className="hrRates">
                            <h3 className="hrSectionTitle">{is ? "Verð" : "Available rates"}</h3>
                            <p className="hrRatesMeta">
                              {arrivalDate} – {departureDate}, {nights} {is ? (nights === 1 ? "nótt" : "nætur") : nights === 1 ? "night" : "nights"}, {searchParams.adults} {is ? "gestir" : "guests"}
                            </p>
                            <table className="hrRateTable">
                              <thead>
                                <tr>
                                  <th>{is ? "Verðlag" : "Rate"}</th>
                                  <th>{is ? "Skilmálar" : "Terms"}</th>
                                  <th>{is ? "Verð" : "Price"}</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {room.rates.map((rate) => (
                                  <tr key={rate.hitKey}>
                                    <td className="hrRateName">{rate.name}</td>
                                    <td className="hrRateTerms">
                                      {rate.refundable ? (
                                        <>
                                          <span className="hrRefundable">{is ? "Endurgreiðanlegt" : "Free cancellation"}</span>
                                          {rate.freeCancellationUntil && (
                                            <span className="hrCancelDate">
                                              {is ? "til" : "until"} {new Date(rate.freeCancellationUntil).toLocaleDateString(is ? "is-IS" : "en-GB", { day: "numeric", month: "short" })}
                                            </span>
                                          )}
                                        </>
                                      ) : (
                                        <span className="hrNonRefundable">{is ? "Ekki endurgreiðanlegt" : "Non-refundable"}</span>
                                      )}
                                    </td>
                                    <td className="hrRatePrice">
                                      <strong>{Math.round(rate.price).toLocaleString()} {rate.currency}</strong>
                                      <span>{is ? `fyrir ${searchParams.adults} gesti` : `for ${searchParams.adults} guests`}</span>
                                    </td>
                                    <td>
                                      <button className="bp hrChooseBtn" onClick={() => onSelect({ ...room, hitKey: rate.hitKey, rateName: rate.name, price: rate.price })}>
                                        {is ? "Velja" : "Choose"}
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Capacity */}
                        {(room.maxGuests || room.ordinaryBeds != null) && (
                          <div className="hrCapacity">
                            <h3 className="hrSectionTitle">{is ? "Rýmisupplýsingar" : "Capacity"}</h3>
                            <div className="hrCapGrid">
                              {room.maxGuests && <div><span>{is ? "Hámark gesta" : "Max guests"}</span><strong>{room.maxGuests}</strong></div>}
                              {room.minGuests && <div><span>{is ? "Lágmark gesta" : "Min guests"}</span><strong>{room.minGuests}</strong></div>}
                              {room.ordinaryBeds != null && <div><span>{is ? "Rúm" : "Beds"}</span><strong>{room.ordinaryBeds}</strong></div>}
                              {room.extraBeds != null && room.extraBeds > 0 && <div><span>{is ? "Auka rúm" : "Extra beds"}</span><strong>{room.extraBeds}</strong></div>}
                              {room.size && <div><span>{is ? "Stærð" : "Size"}</span><strong>{room.size}</strong></div>}
                            </div>
                          </div>
                        )}

                        {/* Amenities */}
                        {room.facilities && room.facilities.length > 0 && (
                          <div className="hrAmenities">
                            <h3 className="hrSectionTitle">{is ? "Búnaður" : "Amenities"}</h3>
                            <div className="hrAmenGrid">
                              {room.facilities.map((f) => (
                                <span key={f}>{f}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right column — image */}
                      {room.image && (
                        <div
                          className="hrImage"
                          style={{ backgroundImage: `url("${room.image}")` }}
                          role="img"
                          aria-label={room.name}
                        />
                      )}
                    </div>
                  )}
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
            🔒 {is ? "Örugg greiðsla í gegnum Bookvisit" : "Secure payment via Bookvisit"}
          </p>
        </form>
      </div>
    </section>
  );
}

function Accommodation({ lang, goTo }: { lang: Lang; goTo: (page: Page) => void }) {
  const is = lang === "is";
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
      <section className="sec">
        <div className="si2">
          <div className="rg">
            {rooms[lang].map((room) => (
              <article className={`rc ${room.featured ? "ft" : "sm"}`} key={`${room.name}-${room.img}`}>
                <div className="rp" style={{ backgroundImage: `url("${room.img}")` }} />
                <div className="rb">
                  <div className="rty">{room.type}</div>
                  <h2 className="rn">{room.name}</h2>
                  <p className="rd">{room.text}</p>
                  <div className="chs">
                    {room.tags.map((tag) => (
                      <span className="ch" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="rl" onClick={() => goTo("booking")}>
                    {is ? "Bóka →" : "Book now →"}
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
              <a href={MENU} className="bp" target="_blank" rel="noreferrer">
                {is ? "Skoða matseðil →" : "View menu →"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Sailing({ lang }: { lang: Lang }) {
  const is = lang === "is";
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
            </div>
            <Photo src={images.sailing} />
          </div>
        </div>
      </section>
      <section className="sd2">
        <div className="si2">
          <p className="ey">{is ? "Ferðalagið" : "The journey"}</p>
          <h2 className="st">{is ? "Stígðu um borð í Sundhana ST 3" : "Step on board Sundhana ST 3"}</h2>
          <div className="dv" />
          <InfoBox
            rows={
              is
                ? [
                    ["Brottfararstaður", "Bryggjan á Drangsnesi"],
                    ["Morgunferð", "Kl. 09:00"],
                    ["Hádegisferð", "Kl. 12:00"],
                    ["Lengd", "~3 klukkustundir"],
                    ["Tímabil", "15. júní til miðjan ágúst"],
                  ]
                : [
                    ["Departure", "Harbour in Drangsnes"],
                    ["Morning", "09:00"],
                    ["Midday", "12:00"],
                    ["Duration", "~3 hours"],
                    ["Season", "June 15 to mid August"],
                  ]
            }
          />
          <a href="mailto:malarhorn@malarhornguesthouse.is" className="bp" style={{ marginTop: "1.8rem" }}>
            {is ? "Fyrirspurn um siglingar" : "Enquire about sailings"}
          </a>
        </div>
      </section>
    </>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const is = lang === "is";
  return (
    <>
      <PageHeader
        eyebrow={is ? "Við hlökkum til að heyra frá þér" : "We'd love to hear from you"}
        title={is ? "Hafðu samband" : "Contact"}
        text={is ? "Hafðu samband, við erum alltaf til staðar." : "Get in touch. Happy to help with bookings, questions, or anything else."}
      />
      <section className="sec">
        <div className="si2">
          <div className="cly">
            <div className="ci">
              <p className="ey">{is ? "Hvernig getur þú náð í okkur" : "Get in touch"}</p>
              <h2 className="st" style={{ fontSize: "1.8rem" }}>
                {is ? "Við erum hér til aðstoðar" : "We're here to help"}
              </h2>
              <div className="dv" />
              <h3>{is ? "Sími" : "Phone"}</h3>
              <a href="tel:+3544102801">+354 410-2801</a>
              <h3>{is ? "Tölvupóstur" : "Email"}</h3>
              <a href="mailto:malarhorn@malarhornguesthouse.is">malarhorn@malarhornguesthouse.is</a>
              <h3>{is ? "Heimilisfang" : "Address"}</h3>
              <p>
                Grundargata 17
                <br />
                520 Drangsnes, {is ? "Ísland" : "Iceland"}
              </p>
              <div className="mp">📍 Drangsnes, {is ? "Vestfirðir, Ísland" : "Westfjords, Iceland"}</div>
            </div>
            <div className="cf">
              <h3>{is ? "Sendu okkur skilaboð" : "Send us a message"}</h3>
              <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: "none" }}>
                  <input name="bot-field" aria-label="Do not fill this field" />
                </p>
                <Field label={is ? "Nafn" : "Name"} name="name" placeholder={is ? "Nafnið þitt" : "Your name"} />
                <Field label={is ? "Tölvupóstur" : "Email"} name="email" type="email" placeholder={is ? "postur@example.com" : "your@email.com"} />
                <Field label={is ? "Sími" : "Phone"} name="phone" type="tel" placeholder="+354..." required={false} />
                <div className="fg">
                  <label htmlFor="message">{is ? "Skilaboð" : "Message"}</label>
                  <textarea id="message" name="message" placeholder={is ? "Hvernig getum við aðstoðað?" : "How can we help?"} required />
                </div>
                <button type="submit" className="bp" style={{ width: "100%" }}>
                  {is ? "Senda skilaboð" : "Send message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
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
                  ? "Malarhorn Guesthouse var stofnað árið 2008 og hefur verið rekið af fjölskyldu sem brennur fyrir gestrisni og góðri þjónustu."
                  : "Malarhorn was founded in 2008 and is run by a family passionate about hospitality and the natural beauty of the Strandir region."}
              </p>
              <p className="bt">
                {is
                  ? "Hér geta gestir notið rólegs umhverfis, útsýnis yfir Grímsey og fersks sjávarlofts."
                  : "Located by the shore in peaceful Drangsnes, we offer sea views, fresh coastal air, and easy access to hot pots and unspoiled nature."}
              </p>
              <div className="bq">
                {is
                  ? "Hér geta gestir notið rólegs umhverfis, útsýnis yfir Grímsey og fersks sjávarlofts."
                  : "Here, guests can enjoy peaceful surroundings, views of Grimsey island, and the fresh sea air that defines coastal life."}
              </div>
            </div>
            <Photo src={images.guesthouse} />
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
            <button className="bp" onClick={() => goTo("booking")}>
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
          title="Malarkaffi"
          note={is ? "Fjölskyldurekinn veitingastaður með ferskt íslenskt hráefni. Opið á sumrin." : "Family-run restaurant with fresh Icelandic ingredients. Open in summer."}
          rows={[[is ? "Kvöldmatur" : "Dinner", "18:00 - 20:00"], [is ? "Drykkir til" : "Drinks until", "21:00"]]}
          link={{ href: MENU, text: is ? "Skoða matseðil" : "View menu" }}
        />
        <GuestSection
          title={is ? "Heitir pottar" : "Hot Tubs"}
          note={is ? "Rétt við sjávarsíðuna með útsýni yfir Grímsey. Ókeypis og alltaf opið." : "Right on the shoreline with views of Grimsey. Always open and free of charge; a small donation is appreciated."}
          rows={[[is ? "Opnunartími" : "Open", is ? "Alltaf opið" : "Always open"], [is ? "Aðgangur" : "Entry", is ? "Ókeypis" : "Free of charge"]]}
        />
        <GuestSection title={is ? "Sundlaug" : "Swimming Pool"} rows={[[is ? "Opnunartími" : "Open", "11:00 - 18:00"]]} />
        <GuestSection
          title={is ? "Siglingar til Grímsey" : "Sailing to Grimsey"}
          note={is ? "Við bjóðum upp á lundasiglingar til Grímsey. Ferðin tekur um 3 klukkustundir." : "We offer fantastic puffin tours to Grimsey. The tour takes about 3 hours."}
          rows={[[is ? "Lengd" : "Duration", is ? "~3 klukkustundir" : "~3 hours"], [is ? "Tímabil" : "Season", is ? "15. júní til miðjan ágúst" : "June 15 to mid August"]]}
          link={{ href: "mailto:malarhorn@malarhornguesthouse.is", text: is ? "Senda fyrirspurn" : "Enquire" }}
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
          <div className="gst-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d862.2!2d-21.432!3d65.6891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjXCsDQxJzIwLjgiTiAyMcKwMjUnNTUuMiJX!5e0!3m2!1sen!2sis!4v1716000000000"
              loading="lazy"
              title="Malarhorn map"
            />
          </div>
          <a href="https://maps.google.com/?q=Malarhorn+Guesthouse+Drangsnes+Iceland" className="gst-textlink" target="_blank" rel="noreferrer" style={{ marginTop: ".8rem" }}>
            {is ? "Opna í Google Maps" : "Open in Google Maps"}
          </a>
        </section>
        <button className="gst-bk bp" onClick={() => goTo("booking")}>
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
}: {
  title: string;
  note?: string;
  rows: [string, string][];
  link?: { href: string; text: string };
}) {
  return (
    <section className="gst-section">
      <h2>{title}</h2>
      {note ? <p className="gst-note">{note}</p> : null}
      {rows.map(([label, value]) => (
        <div className="gst-row" key={label}>
          <span className="gst-lbl">{label}</span>
          <span className="gst-val">
            <strong>{value}</strong>
          </span>
        </div>
      ))}
      {link ? (
        <a href={link.href} className="gst-textlink" target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
          {link.text}
        </a>
      ) : null}
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../components/LangContext";
import { rooms_data, addDays } from "../lib/constants";
import type { BookingRoom, BookingSearchResponse, BookingStep, SearchParams, GuestInfo } from "../lib/types";

// ── Progress bar ─────────────────────────────────────────────────────────────

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

// ── Search step ───────────────────────────────────────────────────────────────

function BookingSearchStep({
  is,
  initial,
  status,
  error,
  onSearch,
}: {
  is: boolean;
  initial: SearchParams;
  status: "idle" | "loading" | "error";
  error: string;
  onSearch: (p: SearchParams) => void;
}) {
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
              ? is
                ? "Leitar..."
                : "Searching..."
              : is
              ? "Leita að herbergjum"
              : "Search rooms"}
          </button>
        </form>
        {error && <p className="bkError">{error}</p>}
      </div>
    </section>
  );
}

// ── Rooms step ────────────────────────────────────────────────────────────────

function BookingRoomsStep({
  is,
  rooms,
  nights,
  searchParams,
  bookingUrl,
  onSelect,
  onBack,
}: {
  is: boolean;
  rooms: BookingRoom[];
  nights: number;
  searchParams: SearchParams;
  bookingUrl: string;
  onSelect: (room: BookingRoom) => void;
  onBack: () => void;
}) {
  return (
    <section className="bkSection">
      <div className="bkInner">
        <button className="bkBack" onClick={onBack}>
          ← {is ? "Breyta dagsetningum" : "Change dates"}
        </button>
        <p className="ey">
          {nights}{" "}
          {is ? (nights === 1 ? "nótt" : "nætur") : nights === 1 ? "night" : "nights"} ·{" "}
          {new Date(searchParams.arrival).toLocaleDateString(is ? "is-IS" : "en-GB", {
            day: "numeric",
            month: "short",
          })}
          {" – "}
          {new Date(searchParams.departure).toLocaleDateString(is ? "is-IS" : "en-GB", {
            day: "numeric",
            month: "short",
          })}{" "}
          · {searchParams.adults} {is ? "fullorðnir" : "adults"}
          {searchParams.children
            ? `, ${searchParams.children} ${is ? "börn" : "children"}`
            : ""}
        </p>
        <h1 className="st">{is ? "Veldu herbergi" : "Choose your room"}</h1>
        <div className="dv" />

        {rooms.length === 0 ? (
          <div className="bkEmpty">
            <p>
              {is
                ? "Engin herbergi laus á völdum dagsetningum."
                : "No rooms available for the selected dates."}
            </p>
            <a href={bookingUrl} className="rl" target="_blank" rel="noreferrer">
              {is ? "Skoða á Bookvisit" : "View on Bookvisit"}
            </a>
          </div>
        ) : (
          <div className="bkRooms">
            {rooms.map((room) => {
              const localList = is ? rooms_data.is : rooms_data.en;
              const local = localList.find((r) =>
                room.name.toLowerCase().includes(r.name.split(" ")[0].toLowerCase())
              );
              const desc = local?.text ?? room.description;
              const tags = local?.tags ?? [];
              const pricePerNight =
                room.price && nights > 0 ? Math.round(room.price / nights) : null;
              return (
                <article className="bkRoom" key={room.id}>
                  {room.image && (
                    <div
                      className="bkRoomImg"
                      style={{ backgroundImage: `url("${room.image}")` }}
                    />
                  )}
                  <div className="bkRoomBody">
                    {tags.length > 0 && (
                      <div className="bkRoomMeta">
                        {tags.map((tag) => (
                          <span className="ch" key={tag}>
                            {tag}
                          </span>
                        ))}
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
                              {pricePerNight &&
                                ` · ${pricePerNight.toLocaleString()} ${room.currency} ${
                                  is ? "/ nótt" : "/ night"
                                }`}
                            </span>
                          </>
                        ) : (
                          <span className="bkPriceAmount">
                            {is ? "Verð á eftir" : "Price on request"}
                          </span>
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

// ── Guest step ────────────────────────────────────────────────────────────────

function BookingGuestStep({
  is,
  room,
  nights,
  searchParams,
  status,
  error,
  onSubmit,
  onBack,
}: {
  is: boolean;
  room: BookingRoom;
  nights: number;
  searchParams: SearchParams;
  status: "idle" | "loading" | "error";
  error: string;
  onSubmit: (g: GuestInfo) => void;
  onBack: () => void;
}) {
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
            <div
              className="bkSummaryImg"
              style={{ backgroundImage: `url("${room.image}")` }}
            />
          )}
          <div className="bkSummaryInfo">
            <p className="ey">{is ? "Valið herbergi" : "Selected room"}</p>
            <h3>{room.name}</h3>
            <p className="bkSummaryDates">
              {new Date(searchParams.arrival).toLocaleDateString(is ? "is-IS" : "en-GB", {
                day: "numeric",
                month: "long",
              })}
              {" – "}
              {new Date(searchParams.departure).toLocaleDateString(is ? "is-IS" : "en-GB", {
                day: "numeric",
                month: "long",
              })}{" "}
              · {nights}{" "}
              {is ? (nights === 1 ? "nótt" : "nætur") : nights === 1 ? "night" : "nights"} ·{" "}
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
              ? is
                ? "Tengist greiðslukerfi..."
                : "Connecting to payment..."
              : is
              ? "Halda áfram í greiðslu →"
              : "Continue to payment →"}
          </button>
          <p className="bkSecureNote">
            {is ? "Örugg greiðsla í gegnum Bookvisit" : "Secure payment via Bookvisit"}
          </p>
        </form>
      </div>
    </section>
  );
}

// ── Confirmed step ────────────────────────────────────────────────────────────

function BookingConfirmedStep({
  is,
  room,
  nights,
  searchParams,
  bookingCode,
}: {
  is: boolean;
  room: BookingRoom;
  nights: number;
  searchParams: SearchParams;
  bookingCode: string;
}) {
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
              <div
                className="bkSummaryImg"
                style={{ backgroundImage: `url("${room.image}")` }}
              />
            )}
            <div className="bkSummaryInfo">
              <p className="ey">{is ? "Herbergi" : "Room"}</p>
              <h3>{room.name}</h3>
              <p className="bkSummaryDates">
                {new Date(searchParams.arrival).toLocaleDateString(
                  is ? "is-IS" : "en-GB",
                  { day: "numeric", month: "long", year: "numeric" }
                )}
                {" – "}
                {new Date(searchParams.departure).toLocaleDateString(
                  is ? "is-IS" : "en-GB",
                  { day: "numeric", month: "long", year: "numeric" }
                )}{" "}
                · {nights}{" "}
                {is ? (nights === 1 ? "nótt" : "nætur") : nights === 1 ? "night" : "nights"}
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

// ── Main booking page ─────────────────────────────────────────────────────────

export default function BookingPage() {
  const { lang } = useLang();
  const is = lang === "is";

  const [step, setStep] = useState<BookingStep>("search");
  const [searchParams, setSearchParams] = useState<SearchParams>({
    arrival: addDays(14),
    departure: addDays(15),
    adults: 2,
    children: 0,
    promoCode: "",
  });
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

  const nights =
    step !== "search" && searchParams.arrival && searchParams.departure
      ? Math.max(
          1,
          Math.round(
            (new Date(searchParams.departure).getTime() -
              new Date(searchParams.arrival).getTime()) /
              86400000
          )
        )
      : 0;

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

  return (
    <>
      <BookingProgressBar step={step} is={is} />

      {step === "search" && (
        <BookingSearchStep
          is={is}
          initial={searchParams}
          status={searchStatus}
          error={searchError}
          onSearch={handleSearch}
        />
      )}

      {step === "rooms" && (
        <BookingRoomsStep
          is={is}
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
          is={is}
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
            <div className="bkPayInline" dangerouslySetInnerHTML={{ __html: paymentHtml }} />
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
          is={is}
          room={selectedRoom}
          nights={nights}
          searchParams={searchParams}
          bookingCode={confirmedCode}
        />
      )}
    </>
  );
}

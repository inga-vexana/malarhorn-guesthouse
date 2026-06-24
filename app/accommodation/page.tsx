"use client";

import { useState } from "react";
import { useSafeLang } from "../components/LangContext";
import { PageHeader, RoomCarousel } from "../components/shared";
import { rooms_data, BV_BOOK } from "../lib/constants";

type RoomEntry = (typeof rooms_data.en)[number];

function RoomDetail({ room, lang }: { room: RoomEntry; lang: "en" | "is" }) {
  const is = lang === "is";
  return (
    <div className="rdet">
      <div className="rdetInner">
        <div className="rdetImg">
          <RoomCarousel imgs={room.imgs} />
        </div>
        <div className="rdetInfo">
          <div className="rty">{room.type}</div>
          <h2 className="rn" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
            {room.name}
          </h2>
          <p className="rd" style={{ marginBottom: "1.2rem" }}>
            {room.text}
          </p>
          <div className="chs" style={{ marginBottom: "1.8rem" }}>
            {room.tags.map((tag) => (
              <span className="ch" key={tag}>
                {tag}
              </span>
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

export default function AccommodationPage() {
  const { lang } = useSafeLang();
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

      <RoomDetail room={selected} lang={lang} />

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
                      <span className="ch" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    className="bp bpsm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(BV_BOOK, "_blank");
                    }}
                  >
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

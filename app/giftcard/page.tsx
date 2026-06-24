"use client";

import { useSafeLang } from "../components/LangContext";
import { PageHeader } from "../components/shared";

const RESERVA_URL = "https://gjafabref.reserva.is/malarhornguesthouse";

const giftCards = [
  {
    id: 1,
    name_is: "Tvær vetrarnætur á Malarhorni",
    name_en: "Two Winter Nights at Malarhorn",
    desc_is:
      "Gisting fyrir tvo í tvær vetrarnætur í standard herbergi á Malarhorni á Drangsnesi. Morgunverður er ekki innifalinn.",
    desc_en:
      "Accommodation for two for two winter nights in a standard room at Malarhorn in Drangsnes. Breakfast is not included.",
    price: 31960,
    originalPrice: 39950,
  },
  {
    id: 2,
    name_is: "Vetrarnótt á Malarhorni",
    name_en: "A Winter Night at Malarhorn",
    desc_is:
      "Gisting fyrir tvo yfir eina vetrarnótt í standard herbergi á Malarhorni á Drangsnesi. Morgunverður er ekki innifalinn.",
    desc_en:
      "Accommodation for two for one winter night in a standard room at Malarhorn in Drangsnes. Breakfast is not included.",
    price: 17560,
    originalPrice: 21950,
  },
  {
    id: 3,
    name_is: "Einnar nætur gisting á Malarhorni - allt árið",
    name_en: "One Night Stay at Malarhorn - Year Round",
    desc_is:
      "Gisting fyrir tvo í eina nótt í standard herbergi á Malarhorni á Drangsnesi, ásamt morgunverði. Allan ársins hring.",
    desc_en:
      "Accommodation for two for one night in a standard room at Malarhorn in Drangsnes, including breakfast. Available year-round.",
    price: 25560,
    originalPrice: 31950,
  },
  {
    id: 4,
    name_is: "Tveggja nátta gisting á Malarhorni - allt árið",
    name_en: "Two Night Stay at Malarhorn - Year Round",
    desc_is:
      "Gisting fyrir tvo í tvær nætur í standard herbergi á Malarhorni á Drangsnesi, ásamt morgunverði. Allan ársins hring.",
    desc_en:
      "Accommodation for two for two nights in a standard room at Malarhorn in Drangsnes, including breakfast. Available year-round.",
    price: 45560,
    originalPrice: 56950,
  },
  {
    id: 5,
    name_is: "Einnar nætur gisting ásamt siglingu út í Grímsey",
    name_en: "One Night Stay with Sailing to Grímsey",
    desc_is:
      "Gisting fyrir tvo í eina nótt í standard herbergi á Malarhorni á Drangsnesi, ásamt morgunverði og siglingu út í Grímsey.",
    desc_en:
      "Accommodation for two for one night in a standard room at Malarhorn in Drangsnes, including breakfast and a sailing trip to Grímsey.",
    price: 46360,
    originalPrice: 57950,
  },
];

function formatPrice(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function DiscountBadge({ original, sale }: { original: number; sale: number }) {
  const pct = Math.round((1 - sale / original) * 100);
  return <span className="gcBadge">-{pct}%</span>;
}

function GiftCardItem({
  card,
  is,
  onBuy,
}: {
  card: (typeof giftCards)[number];
  is: boolean;
  onBuy: () => void;
}) {
  return (
    <article className="gcCard">
      <div className="gcCardTop">
        <div className="gcIcon" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="3" y="12" width="30" height="21" rx="2" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="12" width="30" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
            <line x1="18" y1="12" x2="18" y2="33" stroke="currentColor" strokeWidth="2" />
            <path d="M18 12 C18 12 13 6 10 8 C7 10 10 14 14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 12 C18 12 23 6 26 8 C29 10 26 14 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="gcCardMeta">
          <h2 className="gcCardName">{is ? card.name_is : card.name_en}</h2>
          <p className="gcCardDesc">{is ? card.desc_is : card.desc_en}</p>
        </div>
      </div>
      <div className="gcCardBottom">
        <div className="gcPricing">
          <span className="gcPrice">{formatPrice(card.price)} kr.</span>
          <span className="gcOriginal">{formatPrice(card.originalPrice)} kr.</span>
          <DiscountBadge original={card.originalPrice} sale={card.price} />
        </div>
        <button className="gcBtn" onClick={onBuy}>
          {is ? "Kaupa gjafabréf" : "Buy gift card"}
        </button>
      </div>
    </article>
  );
}

export default function GiftCardPage() {
  const { lang } = useSafeLang();
  const is = lang === "is";

  return (
    <>
      <PageHeader
        eyebrow={is ? "Gefðu eitthvað ógleymanlegt" : "Give something unforgettable"}
        title={is ? "Gjafabréf" : "Gift Cards"}
        text={
          is
            ? "Gefðu ástvin þínum upplifun sem varir - dvöl við hafið á Malarhorni."
            : "Give your loved ones an experience that lasts — a stay by the sea at Malarhorn."
        }
      />

      <section className="gcSection">
        <div className="gcGrid">
          {giftCards.map((card) => (
            <GiftCardItem
              key={card.id}
              card={card}
              is={is}
              onBuy={() => window.open(RESERVA_URL, "_blank")}
            />
          ))}
        </div>

        <div className="gcNote">
          <p>
            {is
              ? "Gjafabréfin eru keypt í gegnum Reserva. Þú verður vísað á örugga greiðslusíðu þegar þú smellir á \"Kaupa gjafabréf\"."
              : "Gift cards are purchased through Reserva. You will be redirected to a secure payment page when you click \"Buy gift card\"."}
          </p>
        </div>
      </section>
    </>
  );
}

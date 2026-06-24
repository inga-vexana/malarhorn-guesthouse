"use client";

import Image from "next/image";
import { useSafeLang } from "../components/LangContext";
import { PageHeader } from "../components/shared";

const giftCards = [
  {
    id: 1,
    url: "https://gjafabref.reserva.is/malarhornguesthouse/1356",
    image: "/images/giftcards/gc1.png",
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
    url: "https://gjafabref.reserva.is/malarhornguesthouse/1357",
    image: "/images/giftcards/gc2.jpg",
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
    url: "https://gjafabref.reserva.is/malarhornguesthouse/1370",
    image: "/images/giftcards/gc3.jpg",
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
    url: "https://gjafabref.reserva.is/malarhornguesthouse/1371",
    image: "/images/giftcards/gc4.jpg",
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
    url: "https://gjafabref.reserva.is/malarhornguesthouse/1379",
    image: "/images/giftcards/gc5.jpg",
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


function GiftCardItem({
  card,
  is,
}: {
  card: (typeof giftCards)[number];
  is: boolean;
}) {
  return (
    <article className="gcCard">
      <a href={card.url} target="_blank" rel="noopener noreferrer" className="gcImageLink" aria-label={is ? card.name_is : card.name_en}>
        <Image
          src={card.image}
          alt={is ? card.name_is : card.name_en}
          width={400}
          height={260}
          className="gcImage"
        />
      </a>
      <div className="gcCardContent">
        <div className="gcCardMeta">
          <h2 className="gcCardName">{is ? card.name_is : card.name_en}</h2>
          <p className="gcCardDesc">{is ? card.desc_is : card.desc_en}</p>
        </div>
        <div className="gcCardBottom">
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gcBtn"
          >
            {is ? "Skoða gjafabréf" : "View gift card"}
          </a>
        </div>
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
            <GiftCardItem key={card.id} card={card} is={is} />
          ))}
        </div>

        <div className="gcNote">
          <p>
            {is
              ? <>Öll gjafabréf eru afgreidd í gegnum Reserva. Með því að smella á &#8222;Skoða gjafabréf&#8220; opnast örugg greiðslusíða þar sem þú getur lokið kaupunum.</>
              : <>Gift cards are purchased through Reserva. You will be redirected to a secure payment page when you click &ldquo;View gift card&rdquo;.</>}
          </p>
        </div>
      </section>
    </>
  );
}

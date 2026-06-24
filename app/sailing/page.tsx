"use client";

import { useState } from "react";
import Script from "next/script";
import { useSafeLang } from "../components/LangContext";
import { PageHeader, Photo, InfoBox } from "../components/shared";
import { images } from "../lib/constants";

const tours = [
  {
    nameIs: "Lundaganga í Grímsey",
    nameEn: "Grímsey Puffin Walk",
    providerIs: "Grímseyjarferðir með Malarhorni",
    providerEn: "Grímsey Tours by Malarhorn",
    price: 18900,
    img: "/Untitled-design-14.png",
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
    img: "/Untitled-design-14.png",
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
    img: "/Untitled-design-14.png",
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

export default function SailingPage() {
  const { lang } = useSafeLang();
  const is = lang === "is";
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const sel = selectedTour !== null ? tours[selectedTour] : null;

  return (
    <>
      <PageHeader
        eyebrow={is ? "Ævintýri" : "Adventure"}
        title={is ? "Siglingar út í Grímsey" : "Sailing to Grimsey"}
        text={
          is
            ? "Best geymda leyndarmálið á Ströndum, nálgaðu lundana í náttúrulegu umhverfi."
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
              <h3 className="st" style={{ fontSize: "1.6rem" }}>
                {is ? sel.nameIs : sel.nameEn}
              </h3>
              <div className="dv" />
              {(is ? sel.descIs : sel.descEn).map((p, i) => (
                <p key={i} className="bt" style={{ marginBottom: "0.7rem" }}>
                  {p}
                </p>
              ))}
              <p className="tourNote">
                <strong>{is ? "Athugið:" : "Please note:"}</strong>{" "}
                {is ? sel.noteIs : sel.noteEn}
              </p>
              <p className="tourInclHd">{is ? "Helstu atriði" : "Highlights"}</p>
              <ul className="tourIncl">
                {(is ? sel.highlightsIs : sel.highlightsEn).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="tourInclHd">{is ? "Hagnýtar upplýsingar" : "Practical info"}</p>
              <InfoBox rows={is ? sel.infoIs : sel.infoEn} />
              {sel.cancellation && (
                <p className="tourNote" style={{ marginTop: "1rem" }}>
                  <strong>{is ? "Afbókunarskilmálar:" : "Cancellation policy:"}</strong>{" "}
                  {is ? sel.cancellationIs : sel.cancellation}
                </p>
              )}
              <a
                href={`mailto:malarhorn@malarhornguesthouse.is?subject=${encodeURIComponent(
                  is ? sel.nameIs : sel.nameEn
                )}`}
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

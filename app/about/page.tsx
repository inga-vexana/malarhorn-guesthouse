"use client";

import { useLang } from "../components/LangContext";
import { Photo } from "../components/shared";
import { BV_BOOK, images } from "../lib/constants";

export default function AboutPage() {
  const { lang } = useLang();
  const is = lang === "is";

  return (
    <>
      <section className="sec">
        <div className="si2">
          <div className="apg">
            <div>
              <p className="ey">
                {is ? "Slakaðu á við sjóinn á Ströndum" : "Relax by the sea in the Westfjords"}
              </p>
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

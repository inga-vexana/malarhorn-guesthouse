"use client";

import { useSafeLang } from "../components/LangContext";
import { Photo } from "../components/shared";
import { images } from "../lib/constants";
import { BookingLink } from "../components/BookingLink";

export default function AboutPage() {
  const { lang } = useSafeLang();
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
                ? "Við bjóðum upp á hlýleg herbergi og rúmgóðar íbúðir við sjávarsíðuna á Drangsnesi, þar sem kyrrðin og falleg náttúra er allt um kring. Á sumrin er Malarkaffi opið og þar er boðið upp á góðan mat úr fersku íslensku hráefni. Hvort sem þú ert á ferð um Vestfirði eða vilt njóta rólegra daga á Ströndum er Malarhorn notalegur staður til að dvelja á og njóta þess sem svæðið hefur upp á að bjóða."
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
                ? "Hvort sem þú slakar á í heitu pottunum, nýtur kyrrðarinnar á veröndinni eða kannar náttúruna við Steingrímsfjörð, þá býður Malarhorn upp á notalegt umhverfi þar sem gott er að hægja á sér. Hér getur þú tekið þér tíma, notið útsýnisins og upplifað kyrrðina sem einkennir Strandir."
                : "Malarhorn is a place to truly slow down and enjoy the natural surroundings."}
            </p>
            <BookingLink className="bp">{is ? "Bóka gistingu" : "Book your stay"}</BookingLink>
          </div>
        </div>
      </section>
    </>
  );
}

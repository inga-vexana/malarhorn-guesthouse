import Image from "next/image";

const facilities = [
  {
    title: "Gisting",
    text: "Þægileg gistiaðstaða þar sem hópurinn getur dvalið saman og notið þess sem Drangsnes og nágrenni hefur upp á að bjóða.",
  },
  {
    title: "Eldunaraðstaða",
    text: "Eldunaraðstaða er í boði fyrir hópa sem vilja sjá sjálfir um matseld og njóta sameiginlegra máltíða.",
  },
  {
    title: "Samkomuhúsið",
    text: "Möguleiki er á að fá samkomuhúsið til afnota fyrir sérstök tilefni, svo sem minni árshátíðir, samkomur og aðra viðburði.",
  },
  {
    title: "Sundlaugin á Drangsnesi",
    text: "Hægt er að kanna möguleika á að leigja sundlaugina utan hefðbundins opnunartíma fyrir hópinn.",
  },
];

export default function GroupsFacilities() {
  return (
    <section className="gp-sec" aria-labelledby="gp-facilities-title">
      <div className="gp-in gp-split">
        <div className="gp-photo gp-photo-tall">
          <Image
            src="/guesthouse-exterior.jpg"
            alt="Gistiheimilið Malarhorn á Drangsnesi"
            fill
            sizes="(max-width: 900px) 100vw, 480px"
            className="ct-cover"
          />
        </div>
        <div className="gp-body">
          <h2 id="gp-facilities-title" className="st">
            Allt til staðar fyrir góða samveru.
          </h2>
          <p className="gp-lead">
            Á Malarhorni er hægt að njóta samverunnar í rólegu umhverfi, fjarri amstri hversdagsins.
            Hér er gistiaðstaða fyrir hópa og ýmsir möguleikar til að skipuleggja dvölina eftir
            tilefni og þörfum hvers hóps.
          </p>
          <ul className="gp-list">
            {facilities.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
          <p className="gp-note">
            Samkomuhúsið og sundlaugin eru ekki rekin af Malarhorni. Framboð og fyrirkomulag þarf að
            staðfesta sérstaklega.
          </p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

const occasions = [
  {
    title: "Árshátíðir og starfsmannaferðir",
    text: "Komið hópnum saman og gerið eitthvað öðruvísi.",
  },
  {
    title: "Vina- og fjölskylduferðir",
    text: "Njótið samverunnar, eldið saman og eigið góða helgi.",
  },
  {
    title: "Hópefli og samverustundir",
    text: "Breytið um umhverfi og gefið ykkur tíma til að styrkja tengslin.",
  },
];

export default function GroupsOccasions() {
  return (
    <section className="gp-sec gp-sec-alt" aria-labelledby="gp-occasions-title">
      <div className="gp-in">
        <div className="gp-split gp-split-reverse">
          <div className="gp-body">
            <h2 id="gp-occasions-title" className="st">
              Það þarf ekki alltaf stórt tilefni.
            </h2>
            <p className="gp-lead">
              Stundum er nóg að breyta um umhverfi og gefa sér tíma saman. Helgi á Drangsnesi getur
              verið tilvalin leið til að hrista hópinn saman, halda upp á áfanga eða einfaldlega
              njóta góðra stunda í skemmtilegum félagsskap.
            </p>
          </div>
          <div className="gp-photo gp-photo-wide">
            <Image
              src="/Malarhorn-Guesthouse-Arjan-Wilmsen-68-scaled.jpg"
              alt="Tvær vinkonur skála yfir máltíð á veitingastaðnum á Malarhorni"
              fill
              sizes="(max-width: 900px) 100vw, 560px"
              className="ct-cover"
            />
          </div>
        </div>
        <ul className="gp-occasions">
          {occasions.map((o) => (
            <li key={o.title}>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

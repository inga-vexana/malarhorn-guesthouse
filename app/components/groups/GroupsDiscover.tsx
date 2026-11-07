import Image from "next/image";

export default function GroupsDiscover() {
  return (
    <section className="gp-sec" aria-labelledby="gp-discover-title">
      <div className="gp-in gp-split">
        <figure className="gp-figure">
          <div className="gp-photo gp-photo-wide">
            <Image
              src="/IMG_8748-scaled.jpeg"
              alt="Heitu pottarnir við sjóinn á Drangsnesi í ljósaskiptunum með fjöllin handan fjarðarins"
              fill
              sizes="(max-width: 900px) 100vw, 620px"
              className="ct-cover"
            />
          </div>
          <figcaption>Heitu pottarnir við sjóinn á Drangsnesi</figcaption>
        </figure>
        <div className="gp-body">
          <h2 id="gp-discover-title" className="st">
            Meira en bara gisting.
          </h2>
          <p className="gp-lead">
            Drangsnes er lítill og notalegur sjávarbær á Ströndum þar sem náttúran og kyrrðin eru
            aldrei langt undan. Hér er hægt að njóta gönguferða, sjávarútsýnis og þess að vera saman
            án þess að þurfa að fylla hverja mínútu af dagskrá.
          </p>
        </div>
      </div>
    </section>
  );
}

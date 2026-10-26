import Image from "next/image";

type Props = {
  heading: string;
  imageAlt: string;
  emailLabel: string;
  phoneLabel: string;
  assistanceLabel: string;
  locationLabel: string;
};

export default function ContactInfo({
  heading,
  imageAlt,
  emailLabel,
  phoneLabel,
  assistanceLabel,
  locationLabel,
}: Props) {
  return (
    <aside className="ct-info" aria-labelledby="ct-info-title">
      <div className="ct-info-photo">
        <Image
          src="/6-10.png"
          alt={imageAlt}
          fill
          sizes="(max-width: 900px) 100vw, 380px"
          className="ct-cover"
        />
      </div>
      <h2 id="ct-info-title" className="ct-info-title">
        {heading}
      </h2>
      <dl className="ct-info-list">
        <div>
          <dt>{emailLabel}</dt>
          <dd>
            <a href="mailto:malarhorn@malarhornguesthouse.is">malarhorn@malarhornguesthouse.is</a>
          </dd>
        </div>
        <div>
          <dt>{phoneLabel}</dt>
          <dd>
            <a href="tel:+3544614345">+354 461 4345</a>
          </dd>
        </div>
        <div>
          <dt>{assistanceLabel}</dt>
          <dd>
            <a href="tel:+3544192801">+354 419 2801</a>
          </dd>
        </div>
        <div>
          <dt>{locationLabel}</dt>
          <dd>
            Grundargata 17
            <br />
            520 Drangsnes, Iceland
          </dd>
        </div>
      </dl>
    </aside>
  );
}

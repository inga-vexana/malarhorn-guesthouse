import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
};

export default function ContactHero({ eyebrow, title, text, cta }: Props) {
  return (
    <section className="ct-hero">
      <Image
        src="/IMG_0529-1-scaled.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="ct-hero-img"
      />
      <div className="ct-hero-shade" aria-hidden="true" />
      <div className="ct-hero-in">
        <p className="ct-hero-ey">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="ct-hero-text">{text}</p>
        <a href="#cf-form" className="ct-hero-cta">
          {cta}
        </a>
      </div>
    </section>
  );
}

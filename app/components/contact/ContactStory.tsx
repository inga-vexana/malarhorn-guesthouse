import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  imageAlt: string;
};

export default function ContactStory({ eyebrow, title, text, imageAlt }: Props) {
  return (
    <section className="ct-story">
      <div className="ct-story-in">
        <div className="ct-story-text">
          <p className="ey">{eyebrow}</p>
          <h2 className="st">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="ct-story-photo">
          <Image
            src="/guesthouse-exterior.jpg"
            alt={imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 520px"
            className="ct-cover"
          />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function GroupsHero() {
  return (
    <section className="ct-hero gp-hero">
      <Image
        src="/Untitled-design-12.png"
        alt="Gistihúsin á Malarhorni við sjóinn á Drangsnesi í kvöldsól"
        fill
        priority
        sizes="100vw"
        className="ct-hero-img"
      />
      <div className="ct-hero-shade" aria-hidden="true" />
      <div className="ct-hero-in">
        <h1>Góðar stundir verða enn betri saman.</h1>
        <p className="ct-hero-text">
          Hvort sem tilefnið er árshátíð, starfsmannaferð, vinahelgi eða einfaldlega löngun til að
          koma hópnum saman, þá tökum við vel á móti ykkur á Malarhorni á Drangsnesi.
        </p>
        <Link href="/hafa-samband" className="ct-hero-cta">
          Hafðu samband
        </Link>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function GroupsCta() {
  return (
    <section className="gp-cta" aria-labelledby="gp-cta-title">
      <div className="gp-cta-in">
        <h2 id="gp-cta-title">Ertu að skipuleggja ferð fyrir hóp?</h2>
        <p>
          Við tökum vel á móti fyrirspurnum frá hópum og aðstoðum ykkur við að kanna hvaða
          möguleikar henta best fyrir ykkar tilefni.
        </p>
        <p>
          Hafðu samband og segðu okkur aðeins frá hópnum, fyrirhugaðri dagsetningu og því sem þið
          hafið í huga.
        </p>
        <Link href="/hafa-samband" className="gp-cta-btn">
          Sendu okkur fyrirspurn
        </Link>
      </div>
    </section>
  );
}

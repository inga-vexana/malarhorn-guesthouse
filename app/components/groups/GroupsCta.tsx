import ContactForm from "../ContactForm";
import { CONTACT_FORM_ENABLED, GROUPS_EMAIL } from "../../lib/contact-config";

export default function GroupsCta() {
  return (
    <section className="gp-cta" id="fyrirspurn" aria-labelledby="gp-cta-title">
      <div className="gp-cta-in">
        <h2 id="gp-cta-title">Ertu að skipuleggja ferð fyrir hóp?</h2>
        <p>
          Við tökum vel á móti fyrirspurnum frá hópum og aðstoðum ykkur við að kanna hvaða
          möguleikar henta best fyrir ykkar tilefni.
        </p>
        <p>
          Segðu okkur aðeins frá hópnum, fyrirhugaðri dagsetningu og því sem þið hafið í huga.
        </p>
        {CONTACT_FORM_ENABLED ? (
          <div className="gp-form-card">
            <ContactForm variant="groups" />
          </div>
        ) : (
          <a href={`mailto:${GROUPS_EMAIL}?subject=${encodeURIComponent("Hópafyrirspurn")}`} className="gp-cta-btn">
            Sendu okkur fyrirspurn
          </a>
        )}
      </div>
    </section>
  );
}

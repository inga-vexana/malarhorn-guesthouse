"use client";

import { useSafeLang } from "../components/LangContext";
import { PageHeader } from "../components/shared";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  const { lang } = useSafeLang();
  const is = lang === "is";

  return (
    <>
      <PageHeader
        eyebrow={is ? "Fyrirspurnir" : "Enquiries"}
        title={is ? "Hafðu samband" : "Contact Us"}
        text={
          is
            ? "Ertu með fyrirspurn eða viltu fá tilboð? Sendu okkur skilaboð og við höfum samband við þig eins fljótt og auðið er."
            : "Have a question or would you like to request a quote? Send us a message and we'll get back to you as soon as possible."
        }
      />
      <section className="sec">
        <div className="si2 cf-wrap">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

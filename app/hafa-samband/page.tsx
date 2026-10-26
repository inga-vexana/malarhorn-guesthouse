"use client";

import { useSafeLang } from "../components/LangContext";
import ContactForm from "../components/ContactForm";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactStory from "../components/contact/ContactStory";

const copy = {
  is: {
    hero: {
      eyebrow: "Malarhorn · Drangsnes",
      title: "Hafðu samband",
      text: "Hvort sem þú ert að leita að gistingu, skipuleggja hópferð eða langar bara að spyrja okkur að einhverju, þá hlökkum við til að heyra frá þér.",
      cta: "Senda skilaboð",
    },
    form: {
      title: "Sendu okkur línu",
      text: "Segðu okkur hvað þér liggur á hjarta og við svörum eins fljótt og auðið er.",
    },
    info: {
      heading: "Eða hafðu beint samband",
      imageAlt: "Sólsetur yfir fjörunni á Drangsnesi",
      email: "Netfang",
      phone: "Sími",
      assistance: "Aðstoð utan opnunartíma",
      location: "Staðsetning",
    },
    story: {
      eyebrow: "Drangsnes",
      title: "Notalegur staður við sjóinn",
      text: "Við bjóðum upp á hlýleg herbergi og rúmgóðar íbúðir við sjávarsíðuna á Drangsnesi, þar sem kyrrðin og falleg náttúra er allt um kring. Hvort sem þú ert á ferð um Vestfirði eða vilt njóta rólegra daga á Ströndum er Malarhorn notalegur staður til að dvelja á.",
      imageAlt: "Gistiheimilið Malarhorn við sjóinn á Drangsnesi",
    },
  },
  en: {
    hero: {
      eyebrow: "Malarhorn · Drangsnes",
      title: "Contact Us",
      text: "Whether you are looking for a place to stay, planning a trip with a group, or simply have a question, we would love to hear from you.",
      cta: "Write to us",
    },
    form: {
      title: "Send us a message",
      text: "Tell us what is on your mind and we will get back to you as soon as possible.",
    },
    info: {
      heading: "Or reach us directly",
      imageAlt: "Sunset over the shore at Drangsnes",
      email: "Email",
      phone: "Phone",
      assistance: "24/7 assistance",
      location: "Location",
    },
    story: {
      eyebrow: "Drangsnes",
      title: "A welcoming place by the sea",
      text: "We offer cosy rooms and spacious apartments by the sea in Drangsnes, surrounded by the peaceful nature of Strandir. Whether you are travelling through the Westfjords or looking to spend a few quiet days in Strandir, Malarhorn is a welcoming place to stay.",
      imageAlt: "Malarhorn Guesthouse by the sea in Drangsnes",
    },
  },
};

export default function ContactPage() {
  const { lang } = useSafeLang();
  const t = copy[lang === "is" ? "is" : "en"];

  return (
    <>
      <ContactHero {...t.hero} />

      <section className="ct-main">
        <div className="ct-main-in">
          <div className="ct-form-panel" id="cf-form">
            <h2 className="ct-form-title">{t.form.title}</h2>
            <p className="ct-form-text">{t.form.text}</p>
            <ContactForm />
          </div>
          <ContactInfo
            heading={t.info.heading}
            imageAlt={t.info.imageAlt}
            emailLabel={t.info.email}
            phoneLabel={t.info.phone}
            assistanceLabel={t.info.assistance}
            locationLabel={t.info.location}
          />
        </div>
      </section>

      <ContactStory {...t.story} />
    </>
  );
}

import type { EventItem, Lang, LocalizedText, Page } from "./types";

export function pick(text: LocalizedText, lang: Lang): string {
  return typeof text === "string" ? text : text[lang];
}

export const BV = "https://images.bookvisit.com/img/";
export const LOGO = "/Untitled-200-x-200-px.png";
export const MENU = "/Matsedill-Malarhorn.pdf";

export const images = {
  about: "/IMG_0529-1-scaled.jpg",
  hotPots: "/IMG_8748-scaled.jpeg",
  restaurant: "/Malarhorn-Guesthouse-Arjan-Wilmsen-68-scaled.jpg",
  sailing: "/Untitled-design-14.png",
  guesthouse: "/Untitled-design-12.png",
  stayDine: "/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg",
  unwind: "/6-10.png",
};

export const translations = {
  en: {
    book: "Book Now",
    footerDescription: "A peaceful seaside retreat in Drangsnes, Iceland.",
    find: "Find Us",
    contact: "Get in Touch",
    guest: "Guest Info",
    events: "Events",
    nav: [
      ["home", "Home"],
      ["accommodation", "Accommodation"],
      ["restaurant", "Restaurant"],
      ["sailing", "Sailing"],
      ["about", "Malarhorn"],
      ["giftcard", "Gift Cards"],
    ] as [Page, string][],
  },
  is: {
    book: "Bóka Gistingu",
    footerDescription: "Friðsæll staður við sjávarsíðuna á Drangsnesi, Ísland.",
    find: "Hvar erum við",
    contact: "Hafðu samband",
    guest: "Gestaupplýsingar",
    events: "Viðburðir",
    nav: [
      ["home", "Heim"],
      ["accommodation", "Gisting"],
      ["restaurant", "Veitingastaður"],
      ["sailing", "Sigling til Grímsey"],
      ["about", "Malarhorn"],
      ["giftcard", "Gjafabréf"],
    ] as [Page, string][],
  },
};

// Populate this list with real, confirmed events. Each event only needs to be
// added once — it automatically appears in both the Icelandic (/vidburdir)
// and English (/en/vidburdir) pages, sorted by date.
export const events_data: EventItem[] = [
  {
    id: "hjartad-nordur-a-drangsnes",
    slug: "hjartad-nordur-a-drangsnes",
    title: {
      is: "Hjartað norður á Drangsnes",
      en: "Heart North to Drangsnes",
    },
    subtitle: {
      is: "Retreat með Helga Jean á Malarhorni",
      en: "A retreat with Helgi Jean at Malarhorn",
    },
    startDate: "2026-10-02",
    endDate: "2026-10-04",
    location: "Malarhorn, Grundargötu 17, 520 Drangsnes",
    description: {
      is: "Gefðu þér helgi til að hægja á, stíga út úr amstri dagsins og finna innri ró í kyrrðinni við sjóinn — með einlægum vinnustofum, kakóathöfn og pottastundum.",
      en: "Give yourself a weekend to slow down, step out of the rush of everyday life, and find inner calm by the sea — with heartfelt workshops, a cacao ceremony, and time in the hot tubs.",
    },
    image: "/hjartad-nordur-a-drangsnes-retreat.png",
    imageAlt: {
      is: "Hjartað norður á Drangsnes — Retreat með Helga Jean á Malarhorni",
      en: "Heart North to Drangsnes — retreat with Helgi Jean at Malarhorn",
    },
    detail: {
      intro: [
        {
          is: "Komdu norður á Strandir og gefðu þér helgi til að hægja á, stíga út úr amstri dagsins og finna innri ró í kyrrðinni við sjóinn.",
          en: "Come north to Strandir and give yourself a weekend to slow down, step out of the rush of everyday life, and find inner calm by the sea.",
        },
        {
          is: "Á þessu retreati leiðir Helgi Jean þátttakendur í gegnum einlægar vinnustofur og samtöl ásamt öndun, hreyfingu, kakóathöfn og leiddri slökun. Inn á milli verður rúmur tími til að hvíla sig, ganga um Drangsnes, njóta náttúrunnar og slaka á í heitu pottunum við sjóinn.",
          en: "On this retreat, Helgi Jean guides participants through heartfelt workshops and conversations, along with breathwork, movement, a cacao ceremony, and guided relaxation. In between, there will be plenty of time to rest, walk around Drangsnes, enjoy nature, and relax in the hot tubs by the sea.",
        },
        {
          is: "Þetta verður hvorki stíft námskeið né hátíðlegt eða „djúpt andlegt“ retreat. Helgin einkennist af einlægni, hlýju, húmor, léttleika og afslöppuðu andrúmslofti.",
          en: "This will be neither a strict course nor a solemn or \"deeply spiritual\" retreat. The weekend is defined by sincerity, warmth, humor, lightness, and a relaxed atmosphere.",
        },
        {
          is: "Þú þarft ekki að hafa farið á retreat áður, kunna að hugleiða eða hafa reynslu af kakóathöfnum. Þú mátt einfaldlega koma eins og þú ert.",
          en: "You don't need to have been on a retreat before, know how to meditate, or have experience with cacao ceremonies. You can simply come as you are.",
        },
      ],
      forWhomTitle: { is: "Fyrir hverja er retreatið? 🍂", en: "Who is this retreat for? 🍂" },
      forWhomIntro: { is: "Retreatið er fyrir fullorðið fólk sem:", en: "The retreat is for adults who:" },
      forWhomList: [
        { is: "Er þreytt á hraða og stöðugu áreiti", en: "Are tired of the pace and constant stimulation of everyday life" },
        { is: "Langar að finna meiri ró, frelsi eða skýrleika", en: "Want to find more calm, freedom, or clarity" },
        { is: "Stendur á tímamótum í lífinu", en: "Are at a turning point in life" },
        { is: "Vill tengjast sjálfu sér og öðru fólki", en: "Want to connect with themselves and other people" },
        { is: "Hefur áhuga á sjálfsvinnu án þess að fara á stíft námskeið", en: "Are interested in inner work without a strict course format" },
        { is: "Langar að prófa retreat í öruggu og afslöppuðu umhverfi", en: "Want to try a retreat in a safe and relaxed setting" },
      ],
      forWhomOutro: {
        is: "Þú þarft ekki að laga þig þessa helgi. Þú færð einfaldlega rými til að hægja á, hlusta og vera þú sjálf/ur.",
        en: "You don't have to fix yourself this weekend. You'll simply be given space to slow down, listen, and be yourself.",
      },
      includedTitle: { is: "Innifalið ✨", en: "Included ✨" },
      includedList: [
        { is: "Gisting á Malarhorni í tvær nætur", en: "Two nights' accommodation at Malarhorn" },
        { is: "Allar máltíðir frá föstudegi til sunnudags", en: "All meals from Friday to Sunday" },
        { is: "Öll dagskrá og leiðsögn Helga Jean", en: "Full program and guidance from Helgi Jean" },
        { is: "Kakóathöfn", en: "Cacao ceremony" },
        { is: "Morgunæfingar og leidd slökun", en: "Morning exercises and guided relaxation" },
        { is: "Vinnustofur", en: "Workshops" },
        { is: "Náttúrutími, sund og pottastundir", en: "Time in nature, swimming, and hot tub sessions" },
      ],
      priceTitle: { is: "Verð á mann", en: "Price per person" },
      priceList: [
        { is: "Einstaklingsherbergi – 94.900 kr.", en: "Single room – ISK 94,900" },
        { is: "Tveir saman í herbergi – 87.900 kr.", en: "Two sharing a room – ISK 87,900" },
        { is: "Þrír eða fleiri í herbergi – 78.900 kr.", en: "Three or more sharing a room – ISK 78,900" },
      ],
      bookingEmail: "malarhorn@malarhorn.is",
      closing: {
        is: "Komdu með hjartað norður og gefðu þér helgi án hraðans, hávaðans og pressunnar um að þurfa alltaf að vera að gera eitthvað.",
        en: "Bring your heart north and give yourself a weekend free from the rush, the noise, and the pressure to always be doing something.",
      },
    },
  },
];

export function formatEventDate(dateStr: string, lang: Lang): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString(lang === "is" ? "is-IS" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const rooms_data = {
  en: [
    {
      type: "Family",
      name: "Family Room",
      text: "Spacious 27 m² ground-floor room with double bed, single bed and bunk bed for up to 5 guests.",
      tags: ["27 m²", "Up to 5 guests", "Sea view", "Ground floor"],
      imgs: [
        `${BV}5473107d-6caa-40f0-83ba-f877244230d0.jpg`,
        `${BV}899ec191-7515-4021-8ac8-1cde319b8fcf.jpg`,
        `${BV}3b1d468c-674e-48fb-b5e6-7397334727a5.jpg`,
      ],
      featured: true,
    },
    {
      type: "Standard",
      name: "Standard Double Room with Private Bathroom",
      text: "Bright 28 m² room on the 2nd floor with double and single bed, sea view and private bathroom.",
      tags: ["28 m²", "Up to 3 guests", "Sea view", "Private bathroom"],
      imgs: [
        `${BV}d6cfeb13-7e00-40fb-91bc-57814a501fb0.jpg`,
        `${BV}988fc3e8-444f-42a0-bef7-2d68c124c148.jpg`,
        `${BV}17d06c2c-453a-48ca-bfb8-35f5dc2ef747.jpg`,
      ],
    },
    {
      type: "Classic",
      name: "Double Room with Private Bathroom",
      text: "Cozy 17 m² room with wooden-clad walls, private bathroom and sea view. Ideal for couples.",
      tags: ["17 m²", "Up to 2 guests", "Sea view", "Private bathroom"],
      imgs: [
        `${BV}af29ddd1-811f-4d85-8cab-889b95d37bd4.jpg`,
        `${BV}d8f82eb0-99f0-4069-95c2-7d14808dc587.jpg`,
        `${BV}51994990-6272-4daf-a59b-c668a33c2b27.jpg`,
      ],
    },
    {
      type: "Superior",
      name: "Superior Double Room with Terrace",
      text: "28 m² ground-floor room with double bed, private terrace and sea views.",
      tags: ["28 m²", "Up to 2 guests", "Private terrace", "Sea view"],
      imgs: [
        `${BV}4f177dcc-2ac9-47fa-a8e7-2aef8ef55992.jpg`,
        `${BV}112cce01-c569-4916-9267-2796fbfcf949.jpg`,
        `${BV}4edc5876-30b5-424c-8694-3fef65204d01.jpg`,
      ],
    },
    {
      type: "Twin Room",
      name: "Twin Room with Shared Bathroom",
      text: "Compact and cozy 6 m² room with two single beds and shared bathroom. Perfect for budget travellers.",
      tags: ["6 m²", "Up to 2 guests", "Shared bathroom", "Sea view"],
      imgs: [
        `${BV}8ade4c7a-9f0a-40a8-b01b-d9b78858a7a1.jpg`,
        `${BV}503ff220-f973-48cb-ba00-474c5491f476.jpg`,
        `${BV}da7f1371-a74d-4b1b-ac16-5aaf7f15a63f.jpg`,
      ],
    },
    {
      type: "Apartment",
      name: "Two-Bedroom Apartment",
      text: "Fully equipped apartment with two bedrooms, kitchen, living room and dining area. Ideal for groups.",
      tags: ["2 bedrooms", "Up to 6 guests", "Full kitchen", "Living room"],
      imgs: [
        `${BV}a39c468b-49d1-445c-9307-1b764eb7e8fc.jpg`,
        `${BV}aa36fbed-0668-4b69-b4e2-46a7dca3aa8f.jpg`,
        `${BV}a1fa3987-9ec4-4400-acf9-c3affb7ddb23.jpg`,
      ],
    },
  ],
  is: [
    {
      type: "Fjölskylda",
      name: "Fjölskylduherbergi",
      text: "Rúmgott 27 m² herbergi á jarðhæð með tvöföldu rúmi, einbreið rúmi og koju fyrir allt að 5 gesti.",
      tags: ["27 m²", "Allt að 5 gestir", "Sjávarútsýni", "Jarðhæð"],
      imgs: [
        `${BV}5473107d-6caa-40f0-83ba-f877244230d0.jpg`,
        `${BV}899ec191-7515-4021-8ac8-1cde319b8fcf.jpg`,
        `${BV}3b1d468c-674e-48fb-b5e6-7397334727a5.jpg`,
      ],
      featured: true,
    },
    {
      type: "Standard",
      name: "Standard tveggja manna herbergi með einkabaðherbergi",
      text: "Bjart 28 m² herbergi á 2. hæð með tvöföldu rúmi og einbreið rúmi, sjávarútsýni og einkabaðherbergi.",
      tags: ["28 m²", "Allt að 3 gestir", "Sjávarútsýni", "Einkabaðherbergi"],
      imgs: [
        `${BV}d6cfeb13-7e00-40fb-91bc-57814a501fb0.jpg`,
        `${BV}988fc3e8-444f-42a0-bef7-2d68c124c148.jpg`,
        `${BV}17d06c2c-453a-48ca-bfb8-35f5dc2ef747.jpg`,
      ],
    },
    {
      type: "Hefðbundið",
      name: "Tveggja manna herbergi með einkabaðherbergi",
      text: "Hlýlegt 17 m² herbergi með viðarklæddum veggjum, einkabaðherbergi og sjávarútsýni. Tilvalið fyrir pör.",
      tags: ["17 m²", "Allt að 2 gestir", "Sjávarútsýni", "Einkabaðherbergi"],
      imgs: [
        `${BV}af29ddd1-811f-4d85-8cab-889b95d37bd4.jpg`,
        `${BV}d8f82eb0-99f0-4069-95c2-7d14808dc587.jpg`,
        `${BV}51994990-6272-4daf-a59b-c668a33c2b27.jpg`,
      ],
    },
    {
      type: "Superior",
      name: "Superior tveggja manna herbergi með verönd",
      text: "28 m² herbergi á jarðhæð með tvöföldu rúmi, einkaveröndinni og sjávarútsýni.",
      tags: ["28 m²", "Allt að 2 gestir", "Einkaverönd", "Sjávarútsýni"],
      imgs: [
        `${BV}4f177dcc-2ac9-47fa-a8e7-2aef8ef55992.jpg`,
        `${BV}112cce01-c569-4916-9267-2796fbfcf949.jpg`,
        `${BV}4edc5876-30b5-424c-8694-3fef65204d01.jpg`,
      ],
    },
    {
      type: "Tveggja manna",
      name: "Tveggja manna herbergi með sameiginlegu baðherbergi",
      text: "Þægilegt 6 m² herbergi með tveimur einbreið rúmum og sameiginlegu baðherbergi. Tilvalið fyrir ferðamann.",
      tags: ["6 m²", "Allt að 2 gestir", "Sameiginlegt baðherbergi", "Sjávarútsýni"],
      imgs: [
        `${BV}8ade4c7a-9f0a-40a8-b01b-d9b78858a7a1.jpg`,
        `${BV}503ff220-f973-48cb-ba00-474c5491f476.jpg`,
        `${BV}da7f1371-a74d-4b1b-ac16-5aaf7f15a63f.jpg`,
      ],
    },
    {
      type: "Íbúð",
      name: "Tveggja svefnherbergja íbúð",
      text: "Fullbúin íbúð með tveimur svefnherbergjum, eldhúsi, stofu og borðstofu. Tilvalið fyrir hópa.",
      tags: ["2 svefnherbergi", "Allt að 6 gestir", "Fullbúið eldhús", "Stofa"],
      imgs: [
        `${BV}a39c468b-49d1-445c-9307-1b764eb7e8fc.jpg`,
        `${BV}aa36fbed-0668-4b69-b4e2-46a7dca3aa8f.jpg`,
        `${BV}a1fa3987-9ec4-4400-acf9-c3affb7ddb23.jpg`,
      ],
    },
  ],
};

export function addDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

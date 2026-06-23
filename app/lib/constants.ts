import type { Lang, Page } from "./types";

export const BV = "https://images.bookvisit.com/img/";
export const BV_BOOK =
  "https://online.bookvisit.com/accommodation?channelId=5780d487-02bc-4988-8121-30c65f421168";
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
    nav: [
      ["home", "Home"],
      ["accommodation", "Accommodation"],
      ["restaurant", "Restaurant"],
      ["sailing", "Sailing"],
      ["about", "Malarhorn"],
    ] as [Page, string][],
  },
  is: {
    book: "Bóka Gistingu",
    footerDescription: "Friðsæll staður við sjávarsíðuna á Drangsnesi, Ísland.",
    find: "Hvar erum við",
    contact: "Hafðu samband",
    guest: "Gestaupplýsingar",
    nav: [
      ["home", "Heim"],
      ["accommodation", "Gisting"],
      ["restaurant", "Veitingastaður"],
      ["sailing", "Sigling til Grímsey"],
      ["about", "Malarhorn"],
    ] as [Page, string][],
  },
};

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

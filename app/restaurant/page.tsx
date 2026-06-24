"use client";

import { useState } from "react";
import { useSafeLang } from "../components/LangContext";
import { PageHeader, Photo } from "../components/shared";
import { images } from "../lib/constants";

type MenuItem = {
  nameIs: string;
  nameEn: string;
  descIs: string;
  descEn: string;
  price: number;
  vegan?: boolean;
};
type DrinkItem = { name: string; desc: string; price: string };

const lunchMains: MenuItem[] = [
  { nameIs: "Fiskborgari", nameEn: "Fish Burger", descIs: "Fiskborgari með lauk, salati, tómati, osti og sósu, borinn fram með stökkum frönskum", descEn: "Fish burger with onion, lettuce, tomato, cheese and sauce, served with crispy fries", price: 3390 },
  { nameIs: "Hamborgari", nameEn: "Hamburger", descIs: "Hamborgari með lauk, salati, tómati, osti og sósu, borinn fram með stökkum frönskum", descEn: "Hamburger with onion, lettuce, tomato, cheese and sauce, served with crispy fries", price: 3390 },
  { nameIs: "Plokkfiskur með rúgbrauði", nameEn: "Icelandic Fish Stew", descIs: "Klassískur íslenskur plokkfiskur borinn fram með volgu rúgbrauði", descEn: "Traditional Icelandic fish stew served with warm rye bread", price: 3190 },
  { nameIs: "Fiskisúpa", nameEn: "Fish Soup", descIs: "Heimagerð, rjómalöguð fiskisúpa, rík af fersku sjávarbragði, borin fram með nýbökuðu brauði", descEn: "Homemade fish soup, creamy and rich in fresh seafood flavors, served with freshly baked bread", price: 2990 },
  { nameIs: "Rjómalöguð sveppasúpa", nameEn: "Creamy Mushroom Soup", descIs: "Heimagerð, rjómalöguð sveppasúpa með ríkulegu sveppabragði, borin fram með nýbökuðu brauði", descEn: "Homemade creamy mushroom soup, rich in mushroom flavor, served with freshly baked bread", price: 2390 },
];
const lunchChildren: MenuItem[] = [
  { nameIs: "Kjúklinganaggar", nameEn: "Chicken Nuggets", descIs: "Stökkir kjúklinganaggar, bornir fram með frönskum", descEn: "Crispy chicken nuggets served with fries", price: 1990 },
  { nameIs: "Ristuð samloka", nameEn: "Toasted Sandwich", descIs: "Ristuð samloka með skinku og osti, borin fram með frönskum", descEn: "Toasted ham and cheese sandwich, served with fries", price: 1990 },
];
const lunchDesserts: MenuItem[] = [
  { nameIs: "Volg eplakaka", nameEn: "Warm Apple Pie", descIs: "Heimabökuð volg eplakaka með mildum kanilkeim, borin fram með rjóma", descEn: "Homemade warm apple pie with a hint of cinnamon, served with whipped cream", price: 1390 },
  { nameIs: "Súkkulaðikaka", nameEn: "Chocolate Cake", descIs: "Rík og mjúk súkkulaðikaka með rjóma, sannkallað sælkeragóðgæti", descEn: "Rich and moist chocolate cake with whipped cream, a true indulgence", price: 1390 },
  { nameIs: "Gulrótakaka", nameEn: "Carrot Cake", descIs: "Mjúk og safarík gulrótarkaka með silkimjúku rjómaostakremi, borin fram með þeyttum rjóma", descEn: "Soft and moist carrot cake with silky cream cheese frosting, served with whipped cream", price: 1390 },
  { nameIs: "Vaffla", nameEn: "Waffle", descIs: "Ljúffeng nýbökuð vaffla með sultu og þeyttum rjóma", descEn: "Delicious freshly baked waffle served with jam and whipped cream", price: 1590 },
];
const dinnerStarters: MenuItem[] = [
  { nameIs: "Bragð af Íslandi", nameEn: "Taste of Iceland", descIs: "Smakkplatti með úrvali af íslenskum sérkennum og hráefni af svæðinu, fullkominn til að deila", descEn: "House tasting platter with a selection of Icelandic specialties and local ingredients", price: 3990 },
  { nameIs: "Fiskisúpa", nameEn: "Fish Soup", descIs: "Heimagerð, rjómalöguð fiskisúpa, rík af fersku sjávarbragði, borin fram með nýbökuðu brauði", descEn: "Homemade fish soup, creamy and rich in fresh seafood flavors, served with freshly baked bread", price: 2690 },
  { nameIs: "Hvítlauksbrauð", nameEn: "Garlic Bread", descIs: "Heitt brauð með hvítlaukssmjöri, létt stökkt að utan og mjúkt að innan", descEn: "Warm garlic bread with aromatic garlic butter, crispy on the outside and soft on the inside", price: 1290 },
  { nameIs: "Ferskt salat", nameEn: "Fresh Salad", descIs: "Litríkt salat með fersku og stökku grænmeti, toppað með léttri og frískandi dressingu", descEn: "Fresh and vibrant salad with crisp vegetables, finished with a light and refreshing dressing", price: 1990, vegan: true },
];
const dinnerMains: MenuItem[] = [
  { nameIs: "Fiskur dagsins", nameEn: "Catch of the Day", descIs: "Nýveiddur fiskur, borinn fram með sætkartöflu, silkimjúkri hollandaise sósu, fersku grænmeti og smælki", descEn: "Catch of the day served with sweet potato, creamy hollandaise sauce, seasonal vegetables and baby potatoes", price: 5690 },
  { nameIs: "Lambafillet", nameEn: "Lamb Fillet", descIs: "Lambafillet, borið fram með ofnbakaðri kartöflu, fersku grænmeti og ríkulegri piparsósu", descEn: "Lamb fillet served with baked potato, vegetables and rich pepper sauce", price: 6990 },
  { nameIs: "Fiskborgari", nameEn: "Fish Burger", descIs: "Fiskborgari með lauk, salati, tómati, osti og sósu, borinn fram með stökkum frönskum", descEn: "Fish burger with onion, lettuce, tomato, cheese and sauce, served with crispy fries", price: 3690 },
  { nameIs: "Hamborgari", nameEn: "Hamburger", descIs: "Hamborgari með lauk, salati, tómati, osti og sósu, borinn fram með stökkum frönskum", descEn: "Hamburger with onion, lettuce, tomato, cheese and sauce, served with crispy fries", price: 3690 },
  { nameIs: "Plokkfiskur með rúgbrauði", nameEn: "Icelandic Fish Stew", descIs: "Klassískur íslenskur plokkfiskur borinn fram með volgu rúgbrauði", descEn: "Traditional Icelandic fish stew served with warm rye bread", price: 3290 },
  { nameIs: "Fiskisúpa", nameEn: "Fish Soup", descIs: "Heimagerð, rjómalöguð fiskisúpa, rík af fersku sjávarbragði, borin fram með nýbökuðu brauði", descEn: "Homemade fish soup, creamy and rich in fresh seafood flavors, served with freshly baked bread", price: 3490 },
  { nameIs: "Kjúklingasalat", nameEn: "Chicken Salad", descIs: "Létt og ferskt salat með kjúklingi, fersku grænmeti og frískandi dressingu", descEn: "A light and fresh salad with chicken, fresh vegetables and a refreshing dressing", price: 3690 },
  { nameIs: "Grænmetislasagna", nameEn: "Vegetarian Lasagna", descIs: "Heimagerð lasagna með grænmeti og osti", descEn: "Homemade vegetarian lasagna with flavorful vegetables and cheese", price: 3590, vegan: true },
  { nameIs: "Kjúklingbaunasalat", nameEn: "Chickpea Salad", descIs: "Létt og ferskt salat með kjúklingabaunum og frískandi dressingu", descEn: "A light and fresh salad with chickpea and a refreshing dressing", price: 3690, vegan: true },
];
const dinnerDesserts: MenuItem[] = [
  { nameIs: "Volg eplakaka", nameEn: "Warm Apple Pie", descIs: "Heimabökuð volg eplakaka með mildum kanilkeim, borin fram með rjóma", descEn: "Homemade warm apple pie with a hint of cinnamon, served with whipped cream", price: 2200 },
  { nameIs: "Súkkulaðikaka", nameEn: "Chocolate Cake", descIs: "Rík og mjúk súkkulaðikaka með rjóma, sannkallað sælkeragóðgæti", descEn: "Rich and moist chocolate cake with whipped cream, a true indulgence", price: 2200 },
  { nameIs: "Skyrkaka hússins", nameEn: "House Skyr Cake", descIs: "Silkimjúk skyrkaka með mjúkum svampbotni, með ferskum ávöxtum, borin fram með ávaxtasósu", descEn: "Creamy skyr cake with a soft sponge base, with fresh fruits, served with a fruity sauce", price: 2200 },
];
const dinnerChildren: MenuItem[] = [
  { nameIs: "Hamborgari (90g)", nameEn: "Hamburger (90g)", descIs: "Hamborgari með fersku salati og sósu, borinn fram með stökkum frönskum", descEn: "Hamburger with fresh salad and sauce, served with crispy fries", price: 2290 },
  { nameIs: "Kjúklinganaggar", nameEn: "Chicken Nuggets", descIs: "Stökkir kjúklinganaggar, bornir fram með frönskum", descEn: "Crispy chicken nuggets served with golden fries", price: 1990 },
  { nameIs: "Pizza", nameEn: "Pizza", descIs: "Stökkbotna pizza með tómatsósu og bræddum osti, toppuð með ferskum kryddjurtum eða skinku", descEn: "Crispy thin-crust pizza with tomato sauce and melted cheese, topped with fresh herbs or ham of your choice", price: 1990 },
];
const drinksBeer: DrinkItem[] = [
  { name: "Boli", desc: "Icelandic premium lager 5.6%, 500ml", price: "1.690 kr." },
  { name: "Gull", desc: "Icelandic lager 5.0%, 500ml", price: "1.690 kr." },
  { name: "Gull Lite", desc: "Gluten-free lager 5.0%, 500ml", price: "1.690 kr." },
  { name: "Galdr", desc: "Icelandic pilsner 4.6%, 330ml", price: "1.390 kr." },
  { name: "Kukl", desc: "Icelandic lager 5.0%, 330ml", price: "1.390 kr." },
  { name: "Brío", desc: "Alcohol-free pilsner 0.0%, 330ml", price: "690 kr." },
];
const drinksRed: DrinkItem[] = [
  { name: "Ramon Bilbao", desc: "14%, 750ml", price: "8.190 kr." },
  { name: "Ramon Bilbao", desc: "14%, glas / glass", price: "2.090 kr." },
  { name: "Cabernet Sauvignon Nero d'Avola", desc: "13.5%, 750ml", price: "7.790 kr." },
  { name: "Cabernet Sauvignon Nero d'Avola", desc: "13.5%, glas / glass", price: "1.990 kr." },
];
const drinksWhite: DrinkItem[] = [
  { name: "Laroche Chardonnay", desc: "13%, 750ml", price: "7.790 kr." },
  { name: "Laroche Chardonnay", desc: "13%, glas / glass", price: "1.990 kr." },
  { name: "Pinot Grigio", desc: "13.5%, 750ml", price: "7.390 kr." },
  { name: "Pinot Grigio", desc: "13.5%, glas / glass", price: "1.890 kr." },
];
const drinksProsecco: DrinkItem[] = [
  { name: "Piccini Prosecco", desc: "11%, 750ml", price: "7.790 kr." },
  { name: "Piccini Prosecco", desc: "11%, glas / glass", price: "1.990 kr." },
];
const drinksSpirits: DrinkItem[] = [
  { name: "Cognac Larsen VSOP", desc: "4cl", price: "1.990 kr." },
  { name: "Hennessy", desc: "4cl", price: "1.990 kr." },
  { name: "Whisky Black Label", desc: "4cl", price: "1.990 kr." },
  { name: "Gin Tanqueray", desc: "4cl", price: "1.990 kr." },
  { name: "Vor Icelandic Berry Gin", desc: "4cl", price: "1.990 kr." },
  { name: "Vodka Smirnoff", desc: "4cl", price: "1.890 kr." },
  { name: "Brennivín", desc: "4cl", price: "1.890 kr." },
  { name: "Campari", desc: "4cl", price: "1.890 kr." },
  { name: "Flóki Icelandic Whisky", desc: "4cl", price: "1.890 kr." },
];
const drinksKokteill: DrinkItem[] = [
  { name: "Gin & Tonic", desc: "Gin and tonic", price: "2.490 kr." },
  { name: "Moscow Mule", desc: "Vodka, ginger ale and lime", price: "2.690 kr." },
  { name: "Aperol Spritz", desc: "Aperol, prosecco, and soda water", price: "2.690 kr." },
  { name: "Whisky Ginger", desc: "Whisky and ginger ale", price: "2.690 kr." },
  { name: "Vodka & Tonic", desc: "Vodka and tonic", price: "2.490 kr." },
  { name: "Basil Gimlet", desc: "Gin, lime juice, basil syrup, and basil", price: "2.690 kr." },
  { name: "Vodka & Coke", desc: "Vodka and coke", price: "2.290 kr." },
];
const drinksIrish: DrinkItem[] = [
  { name: "Irish Coffee", desc: "Irish whiskey, hot coffee and cream", price: "2.590 kr." },
];
const drinksLikjor: DrinkItem[] = [
  { name: "Baileys", desc: "Baileys Irish Cream", price: "1.790 kr." },
];
const drinksSoda: DrinkItem[] = [
  { name: "Tonic", desc: "Glass bottle", price: "590 kr." },
  { name: "Ginger Ale", desc: "Glass bottle", price: "490 kr." },
  { name: "Pepsi", desc: "330ml", price: "490 kr." },
  { name: "Pepsi Max", desc: "330ml", price: "490 kr." },
  { name: "Appelsín", desc: "330ml", price: "490 kr." },
  { name: "Kristall", desc: "330ml", price: "490 kr." },
];

function VeganBadge() {
  return (
    <span className="veganBadge" title="Vegan" aria-label="Vegan">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M7 13c1.5-4 4-6 9-6-1 5-3.5 8-9 8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 13c1 0 2.5.5 3 2"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span>Vegan</span>
    </span>
  );
}

function MenuItems({ items, is }: { items: MenuItem[]; is: boolean }) {
  return (
    <div className="mnuItems">
      {items.map((item, i) => (
        <div key={i} className="mnuItem">
          <div className="mnuItemRow">
            <span className="mnuItemName">
              {is ? item.nameIs : item.nameEn}
              {item.vegan && <VeganBadge />}
            </span>
            <span className="mnuItemPrice">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} kr.</span>
          </div>
          <p className="mnuItemDesc">{is ? item.descIs : item.descEn}</p>
        </div>
      ))}
    </div>
  );
}

function DrinkItems({ items }: { items: DrinkItem[] }) {
  return (
    <div className="mnuItems">
      {items.map((item, i) => (
        <div key={i} className="mnuItem">
          <div className="mnuItemRow">
            <span className="mnuItemName">{item.name}</span>
            <span className="mnuItemPrice">{item.price}</span>
          </div>
          <p className="mnuItemDesc">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function RestaurantPage() {
  const { lang } = useSafeLang();
  const is = lang === "is";
  const [menuTab, setMenuTab] = useState<"lunch" | "dinner" | "drinks">("lunch");

  return (
    <>
      <PageHeader
        eyebrow={is ? "Matur og drykkur" : "Food & drink"}
        title={is ? "Veitingastaður" : "Restaurant"}
        text={
          is
            ? "Ferskt íslenskt hráefni í hlýu andrúmslofti rétt við hafið."
            : "Fresh Icelandic flavors in a warm, welcoming atmosphere right by the sea."
        }
      />
      <section className="sec">
        <div className="si2">
          <div className="rg2">
            <Photo src={images.restaurant} />
            <div>
              <p className="ey">Malarkaffi</p>
              <h2 className="st">{is ? "Opið á sumrin" : "Enjoy lunch, dinner and drinks with beautiful ocean views"}</h2>
              <div className="dv" />
              <p className="bt">
                {is
                  ? "Malarkaffi er fjölskyldurekinn veitingastaður með ferskan fisk, íslenskt lambakjöt og heimilislegan mat úr staðbundnu hráefni."
                  : "Malarkaffi is a family-run restaurant offering fresh Icelandic ingredients, fresh fish, Icelandic lamb, traditional soups, and homemade bread."}
              </p>
              <p className="bt">
                {is ? "Velkomin á Malarkaffi." : "Open daily during summer for breakfast, lunch, and dinner."}
              </p>
              <div className="bq">
                {is
                  ? "Velkomin á Malarkaffi, þar sem góður matur, hlýleg gestrisni og hafið mætast."
                  : "Welcome to Malarkaffi, where good food, warm hospitality and the ocean come together."}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mnuWrap">
        <div className="mnuInner">
          <div className="mnuTabs">
            <button
              className={`mnuTab${menuTab === "lunch" ? " on" : ""}`}
              onClick={() => setMenuTab("lunch")}
            >
              {is ? "Hádegismatseðill" : "Lunch Menu"}
            </button>
            <button
              className={`mnuTab${menuTab === "dinner" ? " on" : ""}`}
              onClick={() => setMenuTab("dinner")}
            >
              {is ? "Kvöldmatseðill" : "Dinner Menu"}
            </button>
            <button
              className={`mnuTab${menuTab === "drinks" ? " on" : ""}`}
              onClick={() => setMenuTab("drinks")}
            >
              {is ? "Drykkjarlisti" : "Drinks"}
            </button>
          </div>
          {menuTab === "lunch" && (
            <>
              <p className="mnuCatHd">{is ? "Aðalréttir" : "Main Courses"}</p>
              <MenuItems items={lunchMains} is={is} />
              <p className="mnuCatHd">{is ? "Barnamatseðill" : "Children's Menu"}</p>
              <MenuItems items={lunchChildren} is={is} />
              <p className="mnuCatHd">{is ? "Eftirréttir" : "Desserts"}</p>
              <MenuItems items={lunchDesserts} is={is} />
            </>
          )}
          {menuTab === "dinner" && (
            <>
              <p className="mnuCatHd">{is ? "Forréttir" : "Starters"}</p>
              <MenuItems items={dinnerStarters} is={is} />
              <p className="mnuCatHd">{is ? "Aðalréttir" : "Main Courses"}</p>
              <MenuItems items={dinnerMains} is={is} />
              <p className="mnuCatHd">{is ? "Eftirréttir" : "Desserts"}</p>
              <MenuItems items={dinnerDesserts} is={is} />
              <p className="mnuCatHd">{is ? "Barnamatseðill" : "Children's Menu"}</p>
              <MenuItems items={dinnerChildren} is={is} />
            </>
          )}
          {menuTab === "drinks" && (
            <>
              <p className="mnuCatHd">{is ? "Bjór" : "Beer"}</p>
              <DrinkItems items={drinksBeer} />
              <p className="mnuCatHd">{is ? "Rauðvín" : "Red Wine"}</p>
              <DrinkItems items={drinksRed} />
              <p className="mnuCatHd">{is ? "Hvítvín" : "White Wine"}</p>
              <DrinkItems items={drinksWhite} />
              <p className="mnuCatHd">{is ? "Freyðivín" : "Prosecco"}</p>
              <DrinkItems items={drinksProsecco} />
              <p className="mnuCatHd">{is ? "Kokteill" : "Cocktails"}</p>
              <DrinkItems items={drinksKokteill} />
              <p className="mnuCatHd">{is ? "Írskt kaffi" : "Irish Coffee"}</p>
              <DrinkItems items={drinksIrish} />
              <p className="mnuCatHd">{is ? "Líkjör" : "Liqueur"}</p>
              <DrinkItems items={drinksLikjor} />
              <p className="mnuCatHd">{is ? "Sterkt vín" : "Spirits"}</p>
              <DrinkItems items={drinksSpirits} />
              <p className="mnuCatHd">{is ? "Gos" : "Soft Drinks"}</p>
              <DrinkItems items={drinksSoda} />
            </>
          )}
        </div>
      </section>
    </>
  );
}

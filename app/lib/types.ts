export type Lang = "en" | "is";
export type Page = "home" | "accommodation" | "restaurant" | "sailing" | "about" | "guest" | "booking" | "giftcard" | "events";

export type LocalizedText = string | { is: string; en: string };

export type EventDetail = {
  intro?: LocalizedText[];
  forWhomTitle?: LocalizedText;
  forWhomIntro?: LocalizedText;
  forWhomList?: LocalizedText[];
  forWhomOutro?: LocalizedText;
  includedTitle?: LocalizedText;
  includedList?: LocalizedText[];
  priceTitle?: LocalizedText;
  priceList?: LocalizedText[];
  bookingEmail?: string;
  closing?: LocalizedText;
};

export type EventItem = {
  id: string;
  slug: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  startDate: string;
  endDate?: string;
  time?: string;
  location?: string;
  description: LocalizedText;
  image?: string;
  imageAlt?: LocalizedText;
  detail?: EventDetail;
};

export type BookingRoom = {
  id: string;
  name: string;
  description: string;
  image?: string;
  available: number;
  price: number | null;
  currency: string;
  rateName?: string | null;
  hitKey?: string | null;
  size?: string | null;
  maxGuests?: number | null;
};

export type BookingSearchResponse = {
  configured?: boolean;
  bookingUrl: string;
  resultId?: string;
  message?: string;
  error?: string;
  alerts?: string[];
  rooms: BookingRoom[];
};

export type BookingStep = "search" | "rooms" | "guest" | "paying" | "confirmed";

export type SearchParams = {
  arrival: string;
  departure: string;
  adults: number;
  children: number;
  promoCode: string;
};

export type GuestInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requests: string;
};

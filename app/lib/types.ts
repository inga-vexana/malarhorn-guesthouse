export type Lang = "en" | "is";
export type Page = "home" | "accommodation" | "restaurant" | "sailing" | "about" | "guest" | "booking";

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

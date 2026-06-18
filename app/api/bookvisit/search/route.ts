import { NextResponse } from "next/server";
import { bookvisitHtmlToText } from "../../../lib/bookvisitText";

const BOOKVISIT_BASE_URL = "https://restapi.bookvisit.com";
const DEFAULT_CHANNEL_ID = "5780d487-02bc-4988-8121-30c65f421168";

type SearchRequest = {
  arrival: string;
  departure: string;
  adults: number;
  children?: number;
  promoCode?: string;
};

type BookvisitRoomResult = {
  roomId?: string;
  name?: string | null;
  nrAvailable?: number;
  cheapestPrice?: number | null;
  cheapestPriceNoLock?: number | null;
  rateAlternatives?: {
    currency?: string | null;
    displayName?: string | null;
    ratesPerRoomConfig?: {
      hitKey?: string | null;
      totalPrice?: { amount?: number | null } | null;
      lastFreeCancellationDate?: string | null;
      nonRefundableCancellationPolicy?: boolean;
    }[] | null;
  }[] | null;
};

type BookvisitRoomContent = {
  id?: string;
  name?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  images?: { uri?: string | null; rank?: number | null }[] | null;
  roomDetailedContent?: {
    size?: string | null;
    maxGuests?: number;
    ordinaryBeds?: number;
    facilities?: string[] | null;
  } | null;
};

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

function toBookvisitDate(value: string) {
  return `${value}T00:00:00`;
}

function bookingUrl(channelId: string, search: SearchRequest) {
  const params = new URLSearchParams({
    channelId,
    startDate: search.arrival,
    endDate: search.departure,
    adults: String(search.adults),
  });

  if (search.children) params.set("children", String(search.children));
  if (search.promoCode) params.set("promoCode", search.promoCode);

  return `https://online.bookvisit.com/accommodation?${params.toString()}`;
}

async function getToken(apiKey: string, channelId: string) {
  const url = new URL("/api/authentication/token-v2", BOOKVISIT_BASE_URL);
  url.searchParams.set("ApiKey", apiKey);
  url.searchParams.set("ChannelId", channelId);
  url.searchParams.set("LanguageId", "2");
  url.searchParams.set("Json", "true");

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Bookvisit token request failed (${response.status})`);
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text.replace(/^"|"$/g, "");
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.BOOKVISIT_API_KEY ?? process.env.API_KEY;
  const channelId = process.env.BOOKVISIT_CHANNEL_ID ?? DEFAULT_CHANNEL_ID;
  const body = (await request.json()) as Partial<SearchRequest>;

  const arrival = String(body.arrival ?? "");
  const departure = String(body.departure ?? "");
  const adults = Number(body.adults ?? 2);
  const children = Math.max(0, Number(body.children ?? 0));
  const promoCode = String(body.promoCode ?? "").trim();

  if (!isValidDate(arrival) || !isValidDate(departure) || arrival >= departure) {
    return NextResponse.json(
      { error: "Choose valid arrival and departure dates.", bookingUrl: bookingUrl(channelId, { arrival, departure, adults, children, promoCode }) },
      { status: 400 },
    );
  }

  if (!Number.isInteger(adults) || adults < 1 || adults > 8) {
    return NextResponse.json({ error: "Choose between 1 and 8 adults." }, { status: 400 });
  }

  const fallbackBookingUrl = bookingUrl(channelId, { arrival, departure, adults, children, promoCode });

  if (!apiKey) {
    return NextResponse.json({
      configured: false,
      bookingUrl: fallbackBookingUrl,
      rooms: [],
      message: "Add BOOKVISIT_API_KEY to enable live availability from Bookvisit.",
    });
  }

  try {
    const token = await getToken(apiKey, channelId);
    const searchResponse = await fetch(`${BOOKVISIT_BASE_URL}/accommodation/search-v1`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channelId,
        startDate: toBookvisitDate(arrival),
        endDate: toBookvisitDate(departure),
        roomConfigs: [{ adults, childAges: Array.from({ length: children }, () => 8) }],
        filter: {
          includeRooms: true,
          includePackages: true,
          includeFullyBooked: false,
          roomContent: "Full",
          packageContent: "Full",
        },
      }),
      cache: "no-store",
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      throw new Error(errorText || `Bookvisit search failed (${searchResponse.status})`);
    }

    const result = await searchResponse.json();
    const content = new Map<string, BookvisitRoomContent>(
      ((result.roomContent ?? []) as BookvisitRoomContent[]).map((room) => [String(room.id), room]),
    );

    const rooms = ((result.roomsResult ?? []) as BookvisitRoomResult[]).map((room) => {
      const details = content.get(String(room.roomId));
      const image = details?.images?.slice().sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))[0]?.uri;
      const firstRate = room.rateAlternatives?.[0];
      const hitKey = firstRate?.ratesPerRoomConfig?.[0]?.hitKey ?? null;

      return {
        id: room.roomId,
        name: details?.name ?? room.name ?? "Accommodation",
        description: bookvisitHtmlToText(details?.shortDescription ?? details?.description),
        image,
        available: room.nrAvailable ?? 0,
        price: room.cheapestPrice ?? room.cheapestPriceNoLock ?? null,
        currency: firstRate?.currency ?? result.currencyCode ?? "ISK",
        rateName: firstRate?.displayName ?? null,
        hitKey,
        size: details?.roomDetailedContent?.size ?? null,
        maxGuests: details?.roomDetailedContent?.maxGuests ?? null,
      };
    });

    return NextResponse.json({
      configured: true,
      bookingUrl: fallbackBookingUrl,
      currencyCode: result.currencyCode,
      resultId: result.resultId,
      alerts: result.searchResultAlerts ?? [],
      rooms,
    });
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        bookingUrl: fallbackBookingUrl,
        rooms: [],
        error: error instanceof Error ? error.message : "Bookvisit search failed.",
      },
      { status: 502 },
    );
  }
}

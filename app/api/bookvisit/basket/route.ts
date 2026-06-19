import { NextResponse } from "next/server";

const BOOKVISIT_BASE_URL = "https://restapi.bookvisit.com";
const DEFAULT_CHANNEL_ID = "5780d487-02bc-4988-8121-30c65f421168";

type GuestInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requests: string;
};

async function getToken(apiKey: string, channelId: string): Promise<string> {
  const url = new URL("/api/authentication/token-v2", BOOKVISIT_BASE_URL);
  url.searchParams.set("ApiKey", apiKey);
  url.searchParams.set("ChannelId", channelId);
  url.searchParams.set("LanguageId", "2");
  url.searchParams.set("Json", "true");

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Auth failed (${response.status})`);

  const text = await response.text();
  try {
    const parsed = JSON.parse(text);
    return typeof parsed === "string" ? parsed : (parsed.token ?? parsed.access_token ?? text);
  } catch {
    return text.replace(/^"|"$/g, "");
  }
}

function getSessionIdFromToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8"));
    return payload.SessionId ?? payload.jti ?? payload.sid ?? payload.sessionId ?? payload.sub ?? null;
  } catch {
    return null;
  }
}

async function bvFetch(url: string, token: string, method = "GET", body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const text = await res.text();
  let json: unknown;
  try { json = JSON.parse(text); } catch { json = text; }
  if (!res.ok) throw new Error(`${method} ${url} failed (${res.status}): ${text.slice(0, 200)}`);
  return json;
}

export async function POST(request: Request) {
  const apiKey = process.env.BOOKVISIT_API_KEY;
  const channelId = process.env.BOOKVISIT_CHANNEL_ID ?? DEFAULT_CHANNEL_ID;
  const isTest = process.env.NODE_ENV !== "production";

  if (!apiKey) {
    return NextResponse.json({ error: "API not configured" }, { status: 503 });
  }

  const body = (await request.json()) as {
    resultId?: string;
    hitKey?: string;
    guest?: GuestInput;
  };
  const { resultId, hitKey, guest } = body;

  if (!resultId || !hitKey) {
    return NextResponse.json({ error: "resultId and hitKey are required" }, { status: 400 });
  }

  try {
    const token = await getToken(apiKey, channelId);
    const sessionId = getSessionIdFromToken(token);
    if (!sessionId) throw new Error("Could not determine session ID from token");

    // 1. Add room to basket
    const basketAdd = (await bvFetch(
      `${BOOKVISIT_BASE_URL}/baskets/rooms/add-v1`,
      token,
      "PATCH",
      { channelId, resultId, hitkey: hitKey, nrOfUnits: 1, useExistingBasket: false },
    )) as { success?: boolean; errorString?: string | null };

    if (!basketAdd.success) {
      throw new Error(basketAdd.errorString ?? "Failed to add room to basket");
    }

    // 2. Get basket to retrieve bookingCode
    const basketData = (await bvFetch(
      `${BOOKVISIT_BASE_URL}/baskets/basket-v1?ChannelId=${channelId}`,
      token,
    )) as { booking?: { bookingCode?: string } };

    const bookingCode = basketData.booking?.bookingCode;
    if (!bookingCode) throw new Error("Could not retrieve booking code from basket");

    // 3. Update basket with customer data
    if (guest) {
      const requestsNote = [
        guest.requests,
        isTest ? "[TEST BOOKING — PLEASE DELETE]" : "",
      ].filter(Boolean).join(" | ");

      await bvFetch(
        `${BOOKVISIT_BASE_URL}/baskets/update-basket-v1`,
        token,
        "PUT",
        {
          channelId,
          bookingCode,
          customer: {
            firstName: guest.firstName,
            lastName: guest.lastName,
            email: guest.email,
            phoneNumber: guest.phone,
          },
          roomGuests: [
            {
              firstName: guest.firstName,
              lastName: guest.lastName,
              email: guest.email,
              phoneNumber: guest.phone,
              sameAsCustomer: true,
              isPrimaryGuestInRoom: true,
              specialRequests: requestsNote || undefined,
            },
          ],
        },
      );
    }

    // 4. Init payment
    const payment = (await bvFetch(
      `${BOOKVISIT_BASE_URL}/payment/init-payment-v1`,
      token,
      "POST",
      { channelId, sessionId },
    )) as {
      paymentAction?: string;
      paymentUrl?: string | null;
      thirdPartyHtml?: string | null;
    };

    // 5a. Prefer embedded payment form on our site
    if (payment.thirdPartyHtml) {
      return NextResponse.json({ thirdPartyHtml: payment.thirdPartyHtml });
    }

    // 5b. NothingToCommit or ShowPaymentPage — attempt direct commit
    try {
      const commit = (await bvFetch(
        `${BOOKVISIT_BASE_URL}/bookings/commit-v1`,
        token,
        "POST",
        { channelId },
      )) as {
        status?: string;
        bookingCode?: string;
        bookingGuid?: string;
        redirectUrl?: string;
        error?: string;
        commitReservationError?: string;
      };

      if (commit.bookingCode || commit.bookingGuid) {
        return NextResponse.json({
          confirmed: true,
          bookingCode: commit.bookingCode ?? bookingCode,
          bookingGuid: commit.bookingGuid,
        });
      }

      // Commit failed — redirect to BookVisit checkout with basket pre-filled
      // so user only needs to complete card guarantee, not re-search
      const checkoutUrl =
        `https://reservations.bookvisit.com/?channelId=${channelId}&bookingCode=${bookingCode}&step=payment`;
      return NextResponse.json({ paymentUrl: checkoutUrl });
    } catch {
      // Fall back to BookVisit checkout with basket pre-filled
      const checkoutUrl =
        `https://reservations.bookvisit.com/?channelId=${channelId}&bookingCode=${bookingCode}&step=payment`;
      return NextResponse.json({ paymentUrl: checkoutUrl });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Booking failed" },
      { status: 502 },
    );
  }
}

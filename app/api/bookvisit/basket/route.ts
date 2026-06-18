import { NextResponse } from "next/server";

const BOOKVISIT_BASE_URL = "https://restapi.bookvisit.com";
const DEFAULT_CHANNEL_ID = "5780d487-02bc-4988-8121-30c65f421168";

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
    return payload.jti ?? payload.sid ?? payload.sessionId ?? payload.sub ?? null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.BOOKVISIT_API_KEY ?? process.env.API_KEY;
  const channelId = process.env.BOOKVISIT_CHANNEL_ID ?? DEFAULT_CHANNEL_ID;

  if (!apiKey) {
    return NextResponse.json({ error: "API not configured" }, { status: 503 });
  }

  const body = (await request.json()) as { resultId?: string; hitKey?: string };
  const { resultId, hitKey } = body;

  if (!resultId || !hitKey) {
    return NextResponse.json({ error: "resultId and hitKey are required" }, { status: 400 });
  }

  try {
    const token = await getToken(apiKey, channelId);

    const basketResponse = await fetch(`${BOOKVISIT_BASE_URL}/baskets/rooms/add-v1`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channelId,
        resultId,
        hitkey: hitKey,
        nrOfUnits: 1,
        useExistingBasket: false,
      }),
      cache: "no-store",
    });

    if (!basketResponse.ok) {
      const errText = await basketResponse.text();
      throw new Error(`Basket failed (${basketResponse.status}): ${errText}`);
    }

    const basketResult = (await basketResponse.json()) as {
      success?: boolean;
      errorString?: string | null;
    };

    if (!basketResult.success) {
      throw new Error(basketResult.errorString ?? "Failed to add room to basket");
    }

    const sessionId = getSessionIdFromToken(token);

    if (!sessionId) {
      return NextResponse.json(
        { error: "Could not determine session ID from token" },
        { status: 502 },
      );
    }

    const paymentResponse = await fetch(`${BOOKVISIT_BASE_URL}/payment/init-payment-v1`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channelId, sessionId }),
      cache: "no-store",
    });

    if (!paymentResponse.ok) {
      const errText = await paymentResponse.text();
      throw new Error(`Payment init failed (${paymentResponse.status}): ${errText}`);
    }

    const paymentResult = (await paymentResponse.json()) as {
      paymentAction?: string;
      paymentUrl?: string | null;
      thirdPartyHtml?: string | null;
    };

    return NextResponse.json({
      paymentAction: paymentResult.paymentAction,
      paymentUrl: paymentResult.paymentUrl,
      thirdPartyHtml: paymentResult.thirdPartyHtml,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Booking failed" },
      { status: 502 },
    );
  }
}

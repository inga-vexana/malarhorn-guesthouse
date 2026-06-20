import { put } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("video/")) {
      return NextResponse.json(
        { error: "File must be a video" },
        { status: 400 }
      );
    }

    const blob = await put("hero.mp4", file, {
      access: "public",
      contentType: file.type,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[v0] Upload error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "hero.mp4" });
    const video = blobs.find((b) => b.pathname === "hero.mp4");
    return NextResponse.json({ url: video?.url ?? null });
  } catch (error) {
    console.error("Error fetching hero video:", error);
    return NextResponse.json({ url: null });
  }
}

import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { blobs } = await list();
    // Match by contentType or by file extension as fallback
    const videos = blobs.filter(
      (b) =>
        b.contentType?.startsWith("video/") ||
        /\.(mp4|mov|webm)$/i.test(b.pathname)
    );
    const latest = videos.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    return NextResponse.json({ url: latest?.url ?? null });
  } catch (error) {
    console.error("[v0] Error fetching hero video:", error);
    return NextResponse.json({ url: null });
  }
}

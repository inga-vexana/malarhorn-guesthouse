import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { blobs } = await list();
    const videos = blobs.filter((b) => b.contentType?.startsWith("video/"));
    const latest = videos.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    return NextResponse.json({ url: latest?.url ?? null });
  } catch (error) {
    console.error("[v0] Error fetching hero video:", error);
    return NextResponse.json({ url: null });
  }
}

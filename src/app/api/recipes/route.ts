import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query") || "";
  const cuisine = url.searchParams.get("cuisine") || "";
  const maxReadyTime = url.searchParams.get("maxReadyTime") || "";

  const params = new URLSearchParams({
    apiKey: process.env.SPOONACULAR_API_KEY!,
    query,
    cuisine,
    maxReadyTime,
  });
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data.results || []);
}
